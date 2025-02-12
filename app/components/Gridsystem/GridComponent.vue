<script setup>
import GridContainer from "@/components/Gridsystem/GridContainer.vue";

const props = defineProps({
  showGrid2: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <GridContainer :showGrid2="showGrid2" />
</template>

