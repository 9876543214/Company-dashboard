<template>
    <div :class="gridClass" :id="gridId">
      <div
        v-for="component in components"
        :key="component"
        :id="getGridClass(component)"
        class="grid-stack-item"
        gs-w="6"
        gs-h="12"
      >
        <component :is="getComponentName(component)" class="component" />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Grid',
    props: {
      gridClass: String,
      gridId: String,
      components: Array,
      getGridClass: Function,
      getComponentName: Function,
    },
  };
  </script>
  
  <style scoped>
  .grid-stack {
    background: black;
    margin-bottom: 20px;
    transition: flex 0.3s ease-in-out;
  }
  .grid-stack-item {
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 16px;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  </style>