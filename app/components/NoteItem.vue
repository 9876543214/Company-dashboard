<template>
    <v-list-item-content>
      <v-list-item-title>{{ note.title }}</v-list-item-title>
      <v-list-item-text>{{ note.content }}</v-list-item-text>
    </v-list-item-content>
  </template>
  
  <script>
  export default {
    name: 'NoteItem',
    props: {
      note: Object,
    },
  };
  </script>