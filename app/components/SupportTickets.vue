<template>
    <div>
        <v-card class="support-tickets-card">
            <div class="card-header">
                <h1>Support tickets</h1> <!-- select hvor du kan sortere billetter-->
                <v-select
                    v-model="sortCriterion"
                    :items="sortOptions"
                    item-text="text"
                    item-value="value"
                    label="Sort by"
                    density="comfortable"
                    class="sort-select"
                ></v-select>
            </div>

            <v-list lines="one" class="support-tickets"> <!-- Ticket -->
                <v-list-item
                    v-for="ticket in sortedTickets"
                    :key="ticket.id"
                    variant="simple"
                    class="support-ticket"
                    @click="showTicketDetails(ticket)"
                >
                <div :class="getTimeClass(ticket.timestamp)" class="wait-time"></div>
                    <v-list-item-content>
                        <v-list-item-title>{{ ticket.title }}</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                        <v-chip :color="getPriorityColor(ticket.priority)" class="priority-level">{{ ticket.priority }}</v-chip>
                    </v-list-item-action>
                </v-list-item>
            </v-list>
        </v-card>
        <v-dialog v-model="dialog" max-width="500">
            <v-card>
                <v-card-title>Ticket Details</v-card-title>  <!-- popup når du trykker på en ticket -->
                <v-card-text>
                    <p><strong>Customer:</strong> {{ selectedTicket.customer }}</p>
                    <p><strong>Priority:</strong> {{ selectedTicket.priority }}</p>
                    <p><strong>Description:</strong> {{ selectedTicket.description }}</p>
                    <p><strong>Timestamp:</strong> {{ new Date(selectedTicket.timestamp).toLocaleString() }}</p>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="dialog = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
    </template>


<script>
export default {
    name: 'SupportTickets',
    data() {
        return {
            tickets: [ //testdata
            { id: 1, customer: "customer 1", title: 'Ticket 1', priority: 'low', description: 'ticket details', timestamp: "2025-01-27T12:00:00Z" },
                { id: 2, customer: "customer 2", title: 'Ticket 2', priority: 'low', description: 'ticket details', timestamp: "2025-01-26T15:30:00Z" },
                { id: 3, customer: "customer 3", title: 'Ticket 3', priority: 'medium', description: 'ticket details', timestamp: "2025-01-27T09:45:00Z" },
                { id: 4, customer: "customer 4", title: 'Ticket 4', priority: 'high', description: 'ticket details', timestamp: "2025-01-27T08:20:00Z" },
                { id: 5, customer: "customer 5", title: 'Ticket 5', priority: 'low', description: 'ticket details', timestamp: "2025-01-24T18:00:00Z" },
                { id: 6, customer: "customer 6", title: 'Ticket 6', priority: 'low', description: 'ticket details', timestamp: "2025-01-27T14:10:00Z" },
                { id: 7, customer: "customer 7", title: 'Ticket 7', priority: 'low', description: 'ticket details', timestamp: "2025-01-25T11:00:00Z" },
                { id: 8, customer: "customer 8", title: 'Ticket 8', priority: 'high', description: 'ticket details', timestamp: "2025-01-27T16:30:00Z" },
                { id: 9, customer: "customer 9", title: 'Ticket 9', priority: 'low', description: 'ticket details', timestamp: "2025-01-26T10:15:00Z" },
                { id: 10, customer: "customer 10", title: 'Ticket 10', priority: 'low', description: 'ticket details', timestamp: "2025-01-27T13:45:00Z" },
                { id: 11, customer: "customer 11", title: 'Ticket 11', priority: 'medium', description: 'ticket details', timestamp: "2025-01-27T07:30:00Z" },
                { id: 12, customer: "customer 12", title: 'Ticket 12', priority: 'low', description: 'ticket details', timestamp: "2025-01-27T10:00:00Z" },
                { id: 13, customer: "customer 13", title: 'Ticket 13', priority: 'high', description: 'ticket details', timestamp: "2025-01-25T14:45:00Z" },
                { id: 14, customer: "customer 14", title: 'Ticket 14', priority: 'low', description: 'ticket details', timestamp: "2025-01-26T09:00:00Z" },
                { id: 15, customer: "customer 15", title: 'Ticket 15', priority: 'low', description: 'ticket details', timestamp: "2025-01-26T12:30:00Z" },
                { id: 16, customer: "customer 16", title: 'Ticket 16', priority: 'low', description: 'ticket details', timestamp: "2025-01-27T11:15:00Z" },
                { id: 17, customer: "customer 17", title: 'Ticket 17', priority: 'low', description: 'ticket details', timestamp: "2025-01-25T08:00:00Z" }
            ],
            dialog: false,
            selectedTicket: {},
            sortCriterion: 'Date asc',
            sortOptions: [ // forskjellige valg når du sorterer
                'Date asc',
                'Date desc',
                'Priority asc',
                'Priority desc' 
            ]
        };
    },
    computed: {
        sortedTickets() { // sorterer billettene
            return this.tickets.slice().sort((a, b) => {
                if (this.sortCriterion === 'Date asc') {
                    return new Date(b.timestamp) - new Date(a.timestamp);
                } else if (this.sortCriterion === 'Date desc') {
                    return new Date(a.timestamp) - new Date(b.timestamp)
                } else if (this.sortCriterion === 'Priority asc') {
                    const priorityOrder = { low: 1, medium: 2, high: 3 };
                    return priorityOrder[b.priority] - priorityOrder[a.priority];
                } else if (this.sortCriterion === 'Priority desc') {
                    const priorityOrder = { low: 1, medium: 2, high: 3 };
                    return priorityOrder[a.priority] - priorityOrder[b.priority]
                }
                return 0;
            });
        }
    },
    methods: {
        showTicketDetails(ticket) { // viser popup når du trykker på en billett
            this.selectedTicket = ticket;
            this.dialog = true;
        },
        getTimeClass(timestamp) { // sjekker hvor lenge siden billetten kom
            const now = new Date();
            const ticketDate = new Date(timestamp);
            const diffTime = Math.abs(now - ticketDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays <= 1) {
                return 'short-wait';
            } else if (diffDays <= 2) {
                return 'medium-wait';
            } else {
                return 'long-wait';
            }
        },
        getPriorityColor(priority) {
            const colors = {
                low: 'green',
                medium: 'orange',
                high: 'red'
            };
            return colors[priority];
        }
    }
};
</script>

<style scoped>
 .support-ticket{ /* styling  */
    width: 99%;
    border-radius: 10px;
    margin-bottom: 8px;
    margin-left: 0.5%;
    background-color: rgb(47, 47, 47);
    display: flex;
    flex-direction: row; 
}
.support-tickets-card {
    height: 50vh;

}
.support-tickets {
    height: 44.1vh;
    overflow-y: auto;

}
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
}
.sort-select {
    margin-top: 2%;
    padding: 3px;
    width: 60px;
}

.wait-time {
    width: 8px;
    height: 100%;
    transition: width 0.3s;
    position: absolute;
    left: 0%;
    top: 0%;
}

.long-wait {
    background-color: red;
}

.medium-wait {
    background-color: orange;
}

.short-wait {
    background-color: green;
}

.priority-level {
    position: absolute;
    top: 17%;
    right: 2%;
}

</style>