<template>
  <GridContainer :showGrid2="showGrid2" />
</template>

<script>
import GridContainer from "@/components/Gridsystem/GridContainer.vue";

export default {
  components: {
    GridContainer,
  },
  props: {
    showGrid2: {
      type: Boolean,
      required: true,
    },
  },
};
</script>