<template>
    <v-dialog :model-value="dialog" @update:model-value="$emit('update:dialog', $event)" max-width="500" @click:outside="closeDialog">
        <v-card>
            <v-card-title>Event Details</v-card-title>
            <v-card-text v-if="event">
                <p><strong>Description:</strong> {{ event.description }}</p>
                <p><strong>Timestamp:</strong> {{ new Date(event.timestamp).toLocaleString() }}</p>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click="closeDialog">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'EventDetailsDialog',
    props: {
        dialog: Boolean,
        event: Object
    },
    methods: {
        closeDialog() {
            console.log('EventDetailsDialog: closeDialog');
            this.$emit('update:dialog', false);
        }
    },
    watch: {
        dialog(newVal) {
            console.log('EventDetailsDialog: dialog prop changed', newVal);
        },
        event(newVal) {
            console.log('EventDetailsDialog: event prop changed', newVal);
        }
    },
    mounted() {
        console.log('EventDetailsDialog: mounted', this.dialog, this.event);
    }
};
</script>