<template>
    <v-dialog :model-value="dialog" @update:model-value="updateDialog" max-width="500" persistent>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" v-bind="attrs" v-on="on" @click="updateDialog(true)">+</v-btn>
      </template>
      <v-card>
        <v-card-title>Add Note</v-card-title>
        <v-card-text>
          <v-textarea v-model="newNote.title"  label="Title" rows="1"></v-textarea>
          <v-textarea v-model="newNote.content" label="Content" rows="4" auto-grow></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="addNote">Submit</v-btn>
          <v-btn @click="updateDialog(false)">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  import { notesData } from '../data/testdata.js';
  
  export default {
    name: 'NoteDialog',
    props: {
      dialog: Boolean,
      newNote: Object,
    },
    methods: {
      updateDialog(value) {
        console.log('updateDialog called with value:', value);
        this.$emit('update:dialog', value);
      },
      addNote() {
        console.log('addNote called');
        if (this.newNote.title && this.newNote.content) {
          console.log('Adding note:', this.newNote);
          notesData.push({ ...this.newNote, id: notesData.length + 1 });
          this.$emit('update:notes', notesData);
          this.newNote.title = '';
          this.newNote.content = '';
          this.updateDialog(false);
        } else {
          console.log('Title or content is missing');
        }
      }
    }
  };
  </script>