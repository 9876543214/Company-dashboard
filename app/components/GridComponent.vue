<template>
    <div class="grid-container">
      <div
        class="grid-stack"
        id="grid2"
        :class="[
          'gs-12 gs-id-5 grid-stack-animate ui-droppable',
          { hidden: !showGrid2 },
        ]"
      ></div>
      <div
        class="grid-stack"
        id="grid1"
        :class="[
          'gs-12 gs-id-0 grid-stack-animate ui-droppable',
          { expanded: showGrid2 },
        ]"
      >
        <div
          v-for="component in selectedComponents"
          :key="component"
          :id="getGridClass(component)"
          class="grid-stack-item"
          gs-w="6"
          gs-h="12"
        >
          <component :is="getComponentName(component)" class="component" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import { GridStack } from "gridstack";
  import "gridstack/dist/gridstack.min.css";
  import Events from "@/components/Events.vue";
  import NotesComponent from "@/components/NotesComponent.vue";
  import ServiceStatus from "@/components/ServiceStatus.vue";
  import SupportTickets from "@/components/SupportTickets.vue";
  
  export default {
    components: {
      Events,
      NotesComponent,
      ServiceStatus,
      SupportTickets,
    },
    setup() {
      const allComponents = [
        "Support Tickets",
        "Events",
        "Service Status",
        "Notes",
      ];
      const selectedComponents = ref([...allComponents]);
      const showGrid2 = ref(false);
  
      const getComponentName = (component) => {
        switch (component) {
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
      };
  
      const getGridClass = (component) => {
        switch (component) {
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
      };
  
      const initializeGrids = () => {
        const grid1 = GridStack.init(
          {
            acceptWidgets: true,
            column: 12,
            row: 24,
            cellHeight: "4vh",
            float: true,
            margin: 10,
          },
          "#grid1"
        );
  
        const grid2 = GridStack.init(
          {
            column: 12,
            row: 48,
            cellHeight: "2vh",
            acceptWidgets: true,
          },
          "#grid2"
        );
  
        grid2.on('added', (event, items) => {
          items.forEach((item) => {
            grid2.update(item.el, { width: 6, height: 12, noResize: true });
          });
        });
  
        grid1.on('added', (event, items) => {
          items.forEach((item) => {
            if (item.grid === grid1) {
              grid1.update(item.el, { noResize: false });
            }
          });
        });
  
        grid2.on('change', (event, items) => {
          items.forEach((item) => {
            if (item.grid === grid2) {
              grid2.update(item.el, { width: 6, height: 12, noResize: true });
            }
          });
        });
      };
  
      onMounted(() => {
        initializeGrids();
      });
  
      return {
        selectedComponents,
        showGrid2,
        getComponentName,
        getGridClass,
      };
    },
  };
  </script>
  