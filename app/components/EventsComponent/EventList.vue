  <script setup>
import { ref, watch, nextTick, onMounted } from "vue";
import EventListItem from "./EventListItem.vue";

const props = defineProps({
  events: Array,
  showPastEvents: Boolean,
  nextEvent: Object,
  filteredEvents: Array,
  headerText: String,
});

const emit = defineEmits(["toggle-past-events", "show-event-details"]);

const delayedFilteredEvents = ref([]);
const delayedNextEvent = ref(null);
const isButtonDisabled = ref(false);

function handleTogglePastEvents() {
  isButtonDisabled.value = true;
  emit("toggle-past-events");
  setTimeout(() => {
    isButtonDisabled.value = false;
  }, 540);
}

function handleShowEventDetails(eventItem) {
  console.log("EventList: handleShowEventDetails", eventItem);
  emit("show-event-details", eventItem);
}

function handleBeforeEnter(element) {
  element.style.opacity = 0;
  element.style.transform = "translateY(30px)";
}

function handleAfterEnter(element) {
  element.style.transition = "all 0.5s ease";
  element.style.opacity = 1;
  element.style.transform = "translateY(0)";
}

watch(
  () => props.filteredEvents,
  (newEvents) => {
    delayedFilteredEvents.value = [];
    delayedNextEvent.value = null;
    nextTick(() => {
      setTimeout(() => {
        delayedFilteredEvents.value = newEvents;
        delayedNextEvent.value = props.nextEvent;
      }, 530);
    });
  }
);

onMounted(() => {
  delayedFilteredEvents.value = props.filteredEvents;
  delayedNextEvent.value = props.nextEvent;
});
</script>

<template>
  <div>
    <div class="card-header">
      <h1>{{ headerText }}</h1>
      <v-btn :disabled="isButtonDisabled" @click="handleTogglePastEvents">
        {{ showPastEvents ? "Show Upcoming Events" : "Show Past Events" }}
      </v-btn>
    </div>
    <v-list lines="one" class="events-list">
      <transition-group name="event-transition" tag="div">
        <div
          v-if="!showPastEvents && delayedNextEvent"
          class="next-event"
          key="next-event"
        >
          <EventListItem
            :event="delayedNextEvent"
            :show-details="true"
            @show-event-details="handleShowEventDetails"
          />
        </div>
        <h2
          v-if="!showPastEvents && delayedFilteredEvents.length"
          class="upcoming-events-header"
          key="upcoming-events-header"
        >
          Upcoming Events
        </h2>
        <div v-for="eventItem in delayedFilteredEvents" :key="eventItem.id">
          <EventListItem
            :event="eventItem"
            :show-details="false"
            @show-event-details="handleShowEventDetails"
          />
        </div>
      </transition-group>
    </v-list>
  </div>
</template>
  

  
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

.event-transition-enter-active,
.event-transition-leave-active {
  transition: all 0.5s ease;
}

.event-transition-enter,
.event-transition-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>