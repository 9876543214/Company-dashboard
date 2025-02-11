<script>
import GridComponent from "@/components/Gridsystem/GridComponent.vue";
import { ref } from "vue";

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

<template>
  <v-app class="body">
    <div class="header">
      <v-app-bar class="header" :elevation="5">
        <v-app-bar-title>Company Dashboard</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn @click="toggleGrid2">Edit components</v-btn>
      </v-app-bar>
    </div>
    <GridComponent :showGrid2="showGrid2" />
  </v-app>
</template>

<style>
.header {
  position: relative;
  height: 4vh;
}

.body {
  width: 100%;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: black;
  overflow: hidden;
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

.grid-container-container {
  display: flex;
  width: 100%;
  height: 95.4vh;
  align-items: center;
  justify-content: center;
}

.grid-container {
  display: flex;
  width: 99vw;
  height: calc(100vh - 5vh);
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
  flex: 0.25;
  height: 93vh !important;
  margin-top: 1.5vh;
  margin-right: 0.5vw;
  margin-left: 0.5vw;
  width: 100%;
  background-color: gray;
  border-radius: 19px;
}

#grid1.expanded {
  flex: 0.75;
}

.grid-stack-item-content {
  color: white;
  text-align: center;
}

button {
  margin-top: 20px;
}
</style>