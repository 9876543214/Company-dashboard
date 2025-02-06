<template>
    <v-card class="events-card">
        <events-list
            :events="events"
            :show-past-events="showPastEvents"
            :next-event="nextEvent"
            :filtered-events="filteredEvents"
            :header-text="headerText"
            @toggle-past-events="togglePastEvents"
            @show-event-details="showEventDetails"
        />
        <event-details-dialog
            :model-value="dialog"
            :event="selectedEvent"
            @update:dialog="dialog = $event"
        />
    </v-card>
</template>

<script>
import EventsList from '@/components/EventsComponent/EventList.vue';
import EventDetailsDialog from '@/components/EventsComponent/EventDetailsDialog.vue';
import { eventsData } from '../../data/testdata.js';

export default {
    name: 'Events',
    components: {
        EventsList,
        EventDetailsDialog
    },
    data() {
        return {
            events: eventsData,
            dialog: false,
            selectedEvent: {},
            showPastEvents: false,
            headerText: ''
        };
    },
    computed: {
        sortedEvents() {
            return this.events.slice().sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        },
        nextEvent() {
            const now = new Date();
            return this.sortedEvents.find(event => new Date(event.timestamp) > now);
        },
        filteredEvents() {
            const now = new Date();
            if (this.showPastEvents) {
                return this.sortedEvents
                    .filter(event => new Date(event.timestamp) <= now)
                    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Sort past events in descending order
            } else {
                return this.sortedEvents.filter(event => new Date(event.timestamp) > now && event.id !== this.nextEvent?.id);
            }
        }
    },
    methods: {
        showEventDetails(eventItem) {
            console.log('Events: showEventDetails', eventItem);
            this.selectedEvent = eventItem;
            this.dialog = true;
        },
        togglePastEvents() {
            this.showPastEvents = !this.showPastEvents;
            this.updateHeaderText(true);
        },
        updateHeaderText(withDelay = false) {
            if (withDelay) {
                setTimeout(() => {
                    this.headerText = this.showPastEvents ? 'Past Events' : 'Next Event';
                }, 530);
            } else {
                this.headerText = this.showPastEvents ? 'Past Events' : 'Next Event';
            }
        }
    },
    watch: {
        showPastEvents() {
            this.updateHeaderText(true);
        }
    },
    mounted() {
        this.updateHeaderText();
    }
};
</script>

<style scoped>
.events-card {
    height: 100%;
    color: white;
}
</style>