<script setup>
import { ref, computed, watch, onMounted } from "vue";
import EventsList from "@/components/EventsComponent/EventList.vue";
import EventDetailsDialog from "@/components/EventsComponent/EventDetailsDialog.vue";
import AddEventDialog from "@/components/EventsComponent/AddEventDialog.vue";

const events = ref([]);
const dialog = ref(false);
const addEventDialog = ref(false);
const selectedEvent = ref({});
const showPastEvents = ref(false);
const headerText = ref("");

async function fetchEvents() {
  try {
    const response = await fetch("/api/events");
    console.log("Fetch response:", response);
    const data = await response.json();
    console.log("Fetched events:", data);

    if (!Array.isArray(data)) {
      throw new Error("Invalid data format");
    }

    events.value = data;
    console.log("Fetched events:", events.value);
  } catch (error) {
    console.error("Error fetching events:", error);
    events.value = [];
  }
}

onMounted(() => {
  fetchEvents();
  updateHeaderText();
});

const sortedEvents = computed(() => {
  if (!Array.isArray(events.value) || !events.value.length) return [];
  return events.value
    .slice()
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
});

const nextEvent = computed(() => {
  const now = new Date("2025-01-30T11:00:00Z");
  const next = sortedEvents.value.find(
    (event) => new Date(event.timestamp) > now
  );
  console.log("Next event:", next);
  return next;
});

const filteredEvents = computed(() => {
  const now = new Date("2025-01-30T11:00:00Z");
  let filtered;
  console.log("Show past events:", showPastEvents.value);
  if (showPastEvents.value) {
    filtered = sortedEvents.value
      .filter((event) => new Date(event.timestamp) <= now)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  } else {
    console.log("Sorted events:", sortedEvents.value);
    filtered = sortedEvents.value.filter(
      (event) => new Date(event.timestamp) >= now && event !== nextEvent.value
    );
  }
  console.log("Filtered events:", filtered);
  return filtered;
});

function showEventDetails(eventItem) {
  console.log("Events: showEventDetails", eventItem);
  selectedEvent.value = eventItem;
  dialog.value = true;
}

function togglePastEvents() {
  showPastEvents.value = !showPastEvents.value;
  updateHeaderText(true);
}

function updateHeaderText(withDelay = false) {
  if (withDelay) {
    setTimeout(() => {
      headerText.value = showPastEvents.value ? "Past Events" : "Next Event";
    }, 530);
  } else {
    headerText.value = showPastEvents.value ? "Past Events" : "Next Event";
  }
}

watch(showPastEvents, () => {
  updateHeaderText(true);
});
</script>

<template>
  <v-card class="events-card">
    <div class="card-header">
      <h1>{{ headerText }}</h1>
      <v-btn :disabled="isButtonDisabled" @click="togglePastEvents">
        {{ showPastEvents ? "Show Upcoming Events" : "Show Past Events" }}
      </v-btn>
      <v-btn color="primary" @click="addEventDialog = true">Add Event</v-btn>
    </div>
    <EventsList
      :events="events"
      :show-past-events="showPastEvents"
      :next-event="nextEvent"
      :filtered-events="filteredEvents"
      :header-text="headerText"
      class="events-list"
      @toggle-past-events="togglePastEvents"
      @show-event-details="showEventDetails"
    />
    <EventDetailsDialog
      :model-value="dialog"
      :event="selectedEvent"
      @update:dialog="dialog = $event"
    />
    <AddEventDialog
      v-model="addEventDialog"
      :newEvent="{ title: '', description: '', timestamp: null }"
      @event-added="fetchEvents"
    />
  </v-card>
</template>

<style scoped>
.events-card {
  height: 100%;
  color: white;
}

.events-list {
  height: calc(100% - 6.6vh);
  position: relative;
  overflow-y: auto;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  height: 6.6vh;
}
</style>