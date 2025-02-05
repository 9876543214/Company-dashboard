<template>
    <v-list-item
        :key="event.id"
        variant="simple"
        class="event-item"
        @click="showEventDetails"
    >
        <v-list-item-content>
            <v-list-item-title>{{ event.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ new Date(event.timestamp).toLocaleString() }}</v-list-item-subtitle>
            <div v-if="showDetails">
                <p> {{ event.description }}</p>
            </div>
        </v-list-item-content>
    </v-list-item>
</template>

<script>
export default {
    name: 'EventListItem',
    props: {
        event: {
            type: Object,
            required: true
        },
        showDetails: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        showEventDetails() {
            console.log('EventListItem: showEventDetails', this.event);
            this.$emit('show-event-details', this.event);
        }
    }
};
</script>

<style scoped>
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