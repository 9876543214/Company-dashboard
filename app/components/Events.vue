<template>
    <v-card>
        <v-card class="events-card">
            <div class="card-header">
                <h1>Upcoming Events</h1>
            </div>

            <v-list lines="one" class="events-list">
                <v-list-item
                    v-for="event in sortedEvents"
                    :key="event.id"
                    variant="simple"
                    class="event-item"
                    @click="showEventDetails(event)"
                >
                    <v-list-item-content>
                        <v-list-item-title>{{ event.title }}</v-list-item-title>
                        <v-list-item-subtitle>{{ new Date(event.timestamp).toLocaleString() }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-card>
        <v-dialog v-model="dialog" max-width="500">
            <v-card>
                <v-card-title>Event Details</v-card-title>
                <v-card-text>
                    <p><strong>Description:</strong> {{ selectedEvent.description }}</p>
                    <p><strong>Timestamp:</strong> {{ new Date(selectedEvent.timestamp).toLocaleString() }}</p>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="dialog = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script>
import { eventsData } from '../data/testdata.js';

export default {
    name: 'Events',
    data() {
        return {
            events: eventsData,
            dialog: false,
            selectedEvent: {},
        };
    },
    computed: {
        sortedEvents() {
            return this.events.slice().sort((a, b) => {
                if (this.sortCriterion === 'Date desc') {
                    return new Date(b.timestamp) - new Date(a.timestamp);
                } else if (this.sortCriterion === 'Date asc') {
                    return new Date(a.timestamp) - new Date(b.timestamp);
                }
                return 0;
            });
        }
    },
    methods: {
        showEventDetails(event) {
            this.selectedEvent = event;
            this.dialog = true;
        }
    }
};
</script>

<style scoped>

.events-list {
    height: 44.1vh;
    overflow-y: auto;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    height: 6.6vh;
}

.sort-select {
    margin-top: 2%;
    padding: 3px;
    width: 60px;
}

.event-item {
    width: 99%;
    border-radius: 10px;
    margin-bottom: 8px;
    margin-left: 0.5%;
    background-color: rgb(47, 47, 47);
    display: flex;
    flex-direction: row;
    position: relative;
    align-items: center;
}
</style>