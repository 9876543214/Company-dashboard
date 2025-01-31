<template>
  <v-app class="body">
    <div class="grid-stack">
      <div class="grid-stack-item" gs-w="12" gs-h="1">
        <v-app-bar class="header" :elevation="5">
          <v-app-bar-title>Company Dashboard</v-app-bar-title>
          <!-- <selectComponents @update:selectedComponents="updateSelectedComponents" /> -->
        </v-app-bar>
      </div>
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
    <dialog>
      <v-select></v-select>
    </dialog>
  </v-app>
</template>

<script setup>
import 'gridstack/dist/gridstack.min.css';
import { GridStack } from 'gridstack';
import { onMounted, ref } from 'vue';
import selectComponents from './components/editComponents.vue';
import SupportTickets from './components/SupportTickets.vue';
import Events from './components/Events.vue';
import ServiceStatus from './components/ServiceStatus.vue';
import NotesComponent from './components/NotesComponent.vue';

const allComponents = ['Support Tickets', 'Events', 'Service Status', 'Notes'];
const selectedComponents = ref([...allComponents]);

const updateSelectedComponents = (components) => {
  selectedComponents.value = components;
  console.log(selectedComponents.value); 
};

const getComponentName = (component) => {
  switch (component) {
    case 'Support Tickets':
      return SupportTickets;
    case 'Events':
      return Events;
    case 'Service Status':
      return ServiceStatus;
    case 'Notes':
      return NotesComponent;
    default:
      return null;
  }
};

const getGridClass = (component) => {
  switch (component) {
    case 'Support Tickets':
      return 'grid-support';
    case 'Events':
      return 'grid-events';
    case 'Service Status':
      return 'grid-service';
    case 'Notes':
      return 'grid-notes';
    default:
      return '';
  }
};

onMounted(() => {
  const grid = GridStack.init({
    column: 12,
    row: 25,
    cellHeight: '4vh',
    float: true,
    margin: 10,
    resizable: {
      handles: 'e, se, s, sw, w'
    },
  });
});
</script>

<style>
.header {
  position:  relative !important;
  height: 4vh;
}

.body {
  width: 100%;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
}

.grid-stack-item {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  transition: transform 0.2s, box-shadow 0.2s;
}
#grid-support,
#grid-events,
#grid-service,
#grid-notes {
  padding: 5px;
  background-color: black;
}

.grid-stack {
  position: relative;
}

.component {
  position: relative;
  height: 100%;
}
</style>