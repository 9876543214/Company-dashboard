<template>
    <v-card class="notes-card">
      <div class="card-header">
        <h1>Notes</h1>
        <NoteDialog :dialog="dialog" :newNote="newNote" @update:notes="updateNotes" @update:dialog="updateDialog" />
      </div>
  
      <v-list lines="one" class="notes-list">
        <v-list-item
          v-for="note in notes"
          :key="note.id"
          variant="simple"
          class="note-item"
        >
          <NoteItem :note="note" />
        </v-list-item>
      </v-list>
    </v-card>
  </template>
  
  <script>
  import { notesData } from '../data/testdata.js';
  import NoteItem from './NoteItem.vue';
  import NoteDialog from './NoteDialog.vue';
  
  export default {
    name: 'Notes',
    components: {
      NoteItem,
      NoteDialog,
    },
    data() {
      return {
        notes: notesData,
        newNote: {
          title: '',
          content: '',
        },
        dialog: false,
      };
    },
    methods: {
      updateNotes(updatedNotes) {
        console.log('updateNotes called with:', updatedNotes);
        this.notes = updatedNotes;
      },
      updateDialog(value) {
        console.log('updateDialog in NotesComponent called with value:', value);
        this.dialog = value;
      }
    },
  };
  </script>
  
  <style scoped>
  .notes-card {
    height: 100%;
    display: flex;
    flex-direction: column;
    color: white;
  }
  
  .notes-list {
    height: 100%;
    position: relative;
    overflow-y: auto;
  }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    height: 6.6vh;
  }
  
  .note-item {
    width: 99%;
    border-radius: 10px;
    margin-bottom: 8px;
    margin-left: 0.5%;
    background-color: rgb(47, 47, 47);
    display: flex;
    flex-direction: row;
    position: relative;
    align-items: center;
  }
  </style>