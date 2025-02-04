<!-- <template>
    <v-app class="body">
      <div class="grid-stack" id="grid1">
        <div class="grid-stack-item" gs-w="12" gs-h="1">
          <v-app-bar class="header" :elevation="5">
            <v-app-bar-title>Company Dashboard</v-app-bar-title>
            <v-spacer></v-spacer>
            <v-btn @click="toggleGrid2">Toggle Grid 2</v-btn>
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
      <div class="grid-stack" id="grid2" v-show="showGrid2"></div>
      <dialog>
        <v-select></v-select>
      </dialog>
    </v-app>
  </template>
  
  <script setup>
  import 'gridstack/dist/gridstack.min.css';
  import { GridStack } from 'gridstack';
  import { onMounted, ref } from 'vue';
  import selectComponents from '../components/editComponents.vue';
  import SupportTickets from '../components/SupportTickets.vue';
  import Events from '../components/Events.vue';
  import ServiceStatus from '../components/ServiceStatus.vue';
  import NotesComponent from '../components/NotesComponent.vue';
  
  const allComponents = ['Support Tickets', 'Events', 'Service Status', 'Notes'];
  const selectedComponents = ref([...allComponents]);
  const showGrid2 = ref(false);
  
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
  
  const toggleGrid2 = () => {
    showGrid2.value = !showGrid2.value;
  };
  
  onMounted(() => {
    const grid1 = GridStack.init({
      column: 12,
      row: 25,
      cellHeight: '4vh',
      float: true,
      margin: 10,
      resizable: {
        handles: 'e, se, s, sw, w'
      },
    }, '#grid1');
  
    const grid2 = GridStack.init({
      column: 12,
      row: 25,
      cellHeight: '4vh',
      float: true,
      margin: 10,
      resizable: {
        handles: 'e, se, s, sw, w'
      },
    }, '#grid2');
  
    // Create HTML elements for the widgets
    const widget1 = document.createElement('div');
    widget1.classList.add('grid-stack-item');
    widget1.innerHTML = '<div class="grid-stack-item-content">Item 1</div>';
    grid1.makeWidget(widget1);
    widget1.setAttribute('gs-width', '2');
    widget1.setAttribute('gs-height', '2');
  
    const widget2 = document.createElement('div');
    widget2.classList.add('grid-stack-item');
    widget2.innerHTML = '<div class="grid-stack-item-content">Item 2</div>';
    grid1.makeWidget(widget2);
    widget2.setAttribute('gs-width', '2');
    widget2.setAttribute('gs-height', '2');
  
    const widget3 = document.createElement('div');
    widget3.classList.add('grid-stack-item');
    widget3.innerHTML = '<div class="grid-stack-item-content">Item 3</div>';
    grid1.makeWidget(widget3);
    widget3.setAttribute('gs-width', '2');
    widget3.setAttribute('gs-height', '2');
  
    const widget4 = document.createElement('div');
    widget4.classList.add('grid-stack-item');
    widget4.innerHTML = '<div class="grid-stack-item-content">Item 4</div>';
    grid1.makeWidget(widget4);
    widget4.setAttribute('gs-width', '2');
    widget4.setAttribute('gs-height', '2');
  });
  </script>
  
  <style>
  .header {
    position: relative !important;
    height: 4vh;
  }
  
  .body {
    width: 100%;
    max-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: black;
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
  </style> -->




  <template>
    <v-app>
      <div class="header">
        <v-app-bar class="header" :elevation="5">
          <v-app-bar-title>Company Dashboard</v-app-bar-title>
          <v-spacer></v-spacer>
          <v-btn @click="toggleGrid2">Edit components</v-btn>
        </v-app-bar>
      </div>
      <GridComponent />
    </v-app>
  </template>
  
  <script>
  import GridComponent from "@/components/GridComponent.vue";
  
  export default {
    components: {
      GridComponent,
    },
    setup() {
      const showGrid2 = ref(false);
  
      const toggleGrid2 = () => {
        showGrid2.value = !showGrid2.value;
      };
  
      return {
        showGrid2,
        toggleGrid2,
      };
    },
  };
  </script>
  
  <style>
  .header {
    position: relative !important;
    height: 4vh;
  }
  
  .body {
    width: 100%;
    max-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: black;
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
  
  .grid-container {
    display: flex;
    width: 100vw;
    height: calc(100vh - 4vh);
    overflow: hidden; 
  }
  
  .grid-stack {
    background: black;
    margin-bottom: 20px;
    transition: flex 0.3s ease-in-out;
  }
  
  #grid1 {
    flex: 1;
  }
  
  #grid2 {
    flex: 0;
  }
  
  #grid2:not(.hidden) {
    flex: 0.15;
  }
  
  #grid1.expanded {
    flex: 0.85; 
  }
  
  .grid-stack-item-content {
    color: white;
    text-align: center;
  }
  
  button {
    margin-top: 20px;
  }
  </style>