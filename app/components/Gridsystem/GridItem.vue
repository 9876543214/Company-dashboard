<template>
  <div :id="gridClass" class="grid-stack-item" gs-w="6" gs-h="12">
    <component :is="componentName" class="component" />
  </div>
</template>
  
  <script>
import SupportTickets from "@/components/Supporttickets/SupportTickets.vue";
import Events from "@/components/EventsComponent/Events.vue";
import ServiceStatus from "@/components/ServiceStatus.vue";
import NotesComponent from "@/components/NotesComponent.vue";

export default {
  props: {
    component: {
      type: String,
      required: true,
    },
  },
  components: {
    SupportTickets,
    Events,
    ServiceStatus,
    NotesComponent,
  },
  computed: {
    componentName() {
      switch (this.component) {
        case "Support Tickets":
          return "SupportTickets";
        case "Events":
          return "Events";
        case "Service Status":
          return "ServiceStatus";
        case "Notes":
          return "NotesComponent";
        default:
          return null;
      }
    },
    gridClass() {
      switch (this.component) {
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
    },
  },
};
</script>
