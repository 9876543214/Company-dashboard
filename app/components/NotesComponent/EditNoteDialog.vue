<template>
    <v-dialog :model-value="dialog" @update:model-value="$emit('update:dialog', $event)" max-width="500" persistent>
      <v-card>
        <v-card-title>Edit Note</v-card-title>
        <v-card-text>
          <v-textarea v-model="note.title" label="Title" rows="1"></v-textarea>
          <v-textarea v-model="note.content" label="Content" rows="4" auto-grow></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="saveNote">Save</v-btn>
          <v-btn @click="closeDialog">Cancel</v-btn>
          <v-btn color="error" @click="deleteNote">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    name: 'EditNoteDialog',
    props: {
      dialog: Boolean,
      note: Object,
    },
    methods: {
      closeDialog() {
        this.$emit('update:dialog', false);
      },
      saveNote() {
        this.$emit('save-note', this.note);
        this.closeDialog();
      },
      deleteNote() {
        this.$emit('delete-note', this.note);
        this.closeDialog();
      },
    },
  };
  </script>