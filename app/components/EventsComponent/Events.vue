<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useFetch } from "#app";
import EventsList from "@/components/EventsComponent/EventList.vue";
import EventDetailsDialog from "@/components/EventsComponent/EventDetailsDialog.vue";

const events = ref([]);
const dialog = ref(false);
const selectedEvent = ref({});
const showPastEvents = ref(false);
const headerText = ref("");

async function fetchEvents() {
  try {
    const { data } = await useFetch("/api/events");
    console.log("Events: fetchEvents", data);
    events.value = data.value || [];
  } catch (error) {
    console.error("Error fetching events:", error);
    events.value = [];
  } finally {
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
  return sortedEvents.value.find((event) => new Date(event.timestamp) > now);
});

const filteredEvents = computed(() => {
  const now = new Date("2025-01-30T11:00:00Z");
  if (showPastEvents.value) {
    return sortedEvents.value
      .filter((event) => new Date(event.timestamp) <= now)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  } else {
    return sortedEvents.value.filter(
      (event) =>
        new Date(event.timestamp) > now && event.id !== nextEvent.value?.id
    );
  }
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
    <EventsList
      :events="events"
      :show-past-events="showPastEvents"
      :next-event="nextEvent"
      :filtered-events="filteredEvents"
      :header-text="headerText"
      @toggle-past-events="togglePastEvents"
      @show-event-details="showEventDetails"
    />
    <EventDetailsDialog
      :model-value="dialog"
      :event="selectedEvent"
      @update:dialog="dialog = $event"
    />
  </v-card>
</template>

<style scoped>
.events-card {
  height: 100%;
  color: white;
}
</style>