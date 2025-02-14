<script setup>
import { ref, watch, nextTick, onMounted } from "vue";
import EventListItem from "./EventListItem.vue";
import AddEventDialog from "./AddEventDialog.vue";

const props = defineProps({
  events: Array,
  showPastEvents: Boolean,
  nextEvent: Object,
  filteredEvents: Array,
  headerText: String,
});

const emit = defineEmits([
  "toggle-past-events",
  "show-event-details",
  "add-event",
]);

const delayedFilteredEvents = ref([]);
const delayedNextEvent = ref(null);
const isButtonDisabled = ref(false);
const isFirstLoad = ref(true);
const addEventDialog = ref(false);
const newEvent = ref({
  title: "",
  description: "",
  timestamp: "",
});

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

function handleAddEvent() {
  emit("add-event", newEvent.value);
  addEventDialog.value = false;
}

watch(
  () => props.filteredEvents,
  (newEvents) => {
    delayedFilteredEvents.value = [];
    delayedNextEvent.value = null;
    nextTick(() => {
      if (isFirstLoad.value) {
        delayedFilteredEvents.value = newEvents;
        delayedNextEvent.value = props.nextEvent;
        isFirstLoad.value = false;
      } else {
        setTimeout(() => {
          delayedFilteredEvents.value = newEvents;
          delayedNextEvent.value = props.nextEvent;
        }, 530);
      }
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
    <AddEventDialog
      v-model="addEventDialog"
      :newEvent="newEvent"
      @add-event="handleAddEvent"
    />
  </div>
</template>

<style scoped>
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