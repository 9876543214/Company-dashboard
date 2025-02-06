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
      <GridItem
        v-for="component in selectedComponents"
        :key="component"
        :component="component"
      />
    </div>
  </div>
</template>
  
  <script>
import { ref, onMounted } from "vue";
import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.min.css";
import GridItem from "@/components/Gridsystem/GridItem.vue";

export default {
  components: {
    GridItem,
  },
  props: {
    showGrid2: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    const selectedComponents = ref([
      "Support Tickets",
      "Events",
      "Service Status",
      "Notes",
    ]);

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

      grid2.on("added", (event, items) => {
        items.forEach((item) => {
          grid2.update(item.el, { width: 6, height: 12, noResize: true });
        });
      });

      grid1.on("added", (event, items) => {
        items.forEach((item) => {
          if (item.grid === grid1) {
            grid1.update(item.el, { noResize: false });
          }
        });
      });

      grid2.on("change", (event, items) => {
        items.forEach((item) => {
          if (item.grid === grid2) {
            grid2.update(item.el, { width: 6, height: 12, noResize: true });
          }
        });
      });
    };

    onMounted(() => {
      initializeGrids();
      document.addEventListener("touchstart", () => {}, { passive: true });
      document.addEventListener("touchmove", () => {}, { passive: true });
    });

    return {
      selectedComponents,
    };
  },
};
</script>
  