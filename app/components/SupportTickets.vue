<template>
    <v-card>
        <h1>Support tickets</h1>
        <v-list lines="one" class="support-tickets">
        <v-list-item
            v-for="ticket in tickets"
            :key="ticket.id"
            :title="ticket.title"
            :value="item"
            variant="default"
            subtitle="Ticket description"
            class="support-ticket"
        ></v-list-item>
        </v-list>
    </v-card>
</template>

<script>
export default {
    name: 'SupportTickets',
    data() {
        return {
            tickets: [
                { id: 1, title: 'Ticket 1' },
                { id: 2, title: 'Ticket 2' },
                { id: 3, title: 'Ticket 3' }
            ]
        };
    }
};
</script>

<style scoped>


</style>