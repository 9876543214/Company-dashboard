<template>
    <div class="header">
      <v-app-bar class="header" :elevation="5">
        <v-app-bar-title>Company Dashboard</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn @click="$emit('toggleGrid2')">Edit components</v-btn>
      </v-app-bar>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Header',
  };
  </script>
  
  <style scoped>
  .header {
    position: relative !important;
    height: 4vh;
  }
  </style>