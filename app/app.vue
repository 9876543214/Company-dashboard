<template>
  <v-app class="body">
    <v-app-bar :elevation="5">
      <v-app-bar-title>Company Dashboard</v-app-bar-title>
    </v-app-bar>
    <div class="grid-stack">
      <div class="grid-stack-item" data-gs-width="6" data-gs-height="6">
        <support-tickets />
        <p></p>
      </div>
      <div class="grid-stack-item" data-gs-width="6" data-gs-height="6">
        <events />
      </div>
      <div class="grid-stack-item" data-gs-width="6" data-gs-height="6">
        <service-status />
      </div>
      <div class="grid-stack-item" data-gs-width="6" data-gs-height="6">
        <notes-component />
      </div>
    </div>
  </v-app>
</template>

<script setup>
import 'gridstack/dist/gridstack.min.css';
import { GridStack } from 'gridstack';
import { onMounted } from 'vue';

onMounted(() => {
  const grid = GridStack.init({
    column: 12,
    cellHeight: '100px', // Set a fixed cell height
    verticalMargin: 10,
    resizable: {
      handles: 'e, se, s, sw, w'
    }
  });
});
</script>

<style>
.body {
  width: 100%;
  height: 100vh;
}

.grid-stack-item {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
}
</style>