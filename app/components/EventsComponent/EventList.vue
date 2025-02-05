<template>
    <div>
        <div class="card-header">
            <h1>{{ headerText }}</h1>
            <v-btn :disabled="isButtonDisabled" @click="handleTogglePastEvents">
                {{ showPastEvents ? 'Show Upcoming Events' : 'Show Past Events' }}
            </v-btn>
        </div>
        <v-list lines="one" class="events-list">
            <transition-group name="event-transition" tag="div">
                <div v-if="!showPastEvents && delayedNextEvent" class="next-event" key="next-event">
                    <event-list-item
                        :event="delayedNextEvent"
                        :show-details="true"
                        @show-event-details="handleShowEventDetails"
                    />
                </div>
                <h2 v-if="!showPastEvents && delayedFilteredEvents.length" class="upcoming-events-header" key="upcoming-events-header">Upcoming Events</h2>
                <transition
                    v-for="eventItem in delayedFilteredEvents"
                    :key="eventItem.id"
                    name="event-transition"
                    @before-enter="handleBeforeEnter"
                    @after-enter="handleAfterEnter"
                >
                    <event-list-item
                        :event="eventItem"
                        :show-details="false"
                        @show-event-details="handleShowEventDetails"
                    />
                </transition>
            </transition-group>
        </v-list>
    </div>
</template>

<script>
import EventListItem from './EventListItem.vue';

export default {
    name: 'EventsList',
    components: {
        EventListItem
    },
    props: {
        events: Array,
        showPastEvents: Boolean,
        nextEvent: Object,
        filteredEvents: Array,
        headerText: String
    },
    data() {
        return {
            delayedFilteredEvents: [],
            delayedNextEvent: null,
            isButtonDisabled: false
        };
    },
    methods: {
        handleTogglePastEvents() {
            this.isButtonDisabled = true;
            this.$emit('toggle-past-events');
            setTimeout(() => {
                this.isButtonDisabled = false;
            }, 540);
        },
        handleShowEventDetails(eventItem) {
            console.log('EventList: handleShowEventDetails', eventItem);
            this.$emit('show-event-details', eventItem);
        },
        handleBeforeEnter(element) {
            element.style.opacity = 0;
            element.style.transform = 'translateY(30px)';
        },
        handleAfterEnter(element) {
            element.style.transition = 'all 0.5s ease';
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        }
    },
    watch: {
        filteredEvents(newEvents) {
            this.delayedFilteredEvents = [];
            this.delayedNextEvent = null;
            this.$nextTick(() => {
                setTimeout(() => {
                    this.delayedFilteredEvents = newEvents;
                    this.delayedNextEvent = this.nextEvent;
                }, 530); 
            });
        }
    },
    mounted() {
        this.delayedFilteredEvents = this.filteredEvents;
        this.delayedNextEvent = this.nextEvent;
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

.next-event {
    margin-bottom: 16px;
}

.upcoming-events-header {
    margin-top: 16px;
    font-size: 1.5em;
    font-weight: bold;
}

.event-transition-enter-active, .event-transition-leave-active {
    transition: all 0.5s ease;
}

.event-transition-enter, .event-transition-leave-to {
    opacity: 0;
    transform: translateY(30px);
}
</style>