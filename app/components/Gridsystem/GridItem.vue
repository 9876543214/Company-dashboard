<script setup>
import { computed } from "vue";
import SupportTickets from "@/components/SupportTicketsComponent/SupportTickets.vue";
import Events from "@/components/EventsComponent/Events.vue";
import ServiceStatus from "@/components/ServiceStatus.vue";
import NotesComponent from "@/components/NotesComponent/NotesComponent.vue";

const props = defineProps({
  component: {
    type: String,
    required: true,
  },
});

const componentName = computed(() => {
  switch (props.component) {
    case "Support Tickets":
      return SupportTickets;
    case "Events":
      return Events;
    case "Service Status":
      return ServiceStatus;
    case "Notes":
      return NotesComponent;
    default:
      return null;
  }
});

const gridClass = computed(() => {
  switch (props.component) {
    case "Support Tickets":
      return "grid-support";
    case "Events":
      return "grid-events";
    case "Service Status":
      return "grid-service";
    case "Notes":
      return "grid-notes";
    default:
      return "";
  }
});
</script>

<template>
  <div :id="gridClass" class="grid-stack-item" gs-w="6" gs-h="12">
    <component :is="componentName" class="component" />
  </div>
</template>

