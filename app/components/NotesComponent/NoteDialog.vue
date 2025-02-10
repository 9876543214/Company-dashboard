<script setup>
const props = defineProps({
  dialog: Boolean,
  newNote: Object,
});

const emit = defineEmits(["update:dialog", "update:notes"]);

function updateDialog(value) {
  emit("update:dialog", value);
}

function addNote() {
  if (props.newNote.title && props.newNote.content) {
    notesStore.addNote({ ...props.newNote });
    emit("update:notes", notesStore.notes);
    props.newNote.title = "";
    props.newNote.content = "";
    updateDialog(false);
  }
}
</script>

<template>
  <v-dialog
    :model-value="dialog"
    @update:model-value="updateDialog"
    max-width="500"
    persistent
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        v-bind="attrs"
        v-on="on"
        @click="updateDialog(true)"
        >+</v-btn
      >
    </template>
    <v-card>
      <v-card-title>Add Note</v-card-title>
      <v-card-text>
        <v-textarea v-model="newNote.title" label="Title" rows="1"></v-textarea>
        <v-textarea
          v-model="newNote.content"
          label="Content"
          rows="4"
          auto-grow
        ></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="addNote">Submit</v-btn>
        <v-btn @click="updateDialog(false)">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

