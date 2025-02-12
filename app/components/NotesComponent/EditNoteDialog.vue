<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  dialog: Boolean,
  note: Object,
});

const emit = defineEmits(["update:dialog", "save-note", "delete-note"]);

const localNote = ref({ ...props.note });

watch(
  () => props.note,
  (newNote) => {
    localNote.value = { ...newNote };
  }
);

function closeDialog() {
  emit("update:dialog", false);
}

function saveNote() {
  emit("save-note", localNote.value);
  closeDialog();
}

function deleteNote() {
  emit("delete-note", localNote.value);
  closeDialog();
}
</script>

<template>
  <v-dialog
    :model-value="dialog"
    @update:model-value="$emit('update:dialog', $event)"
    max-width="500"
    persistent
  >
    <v-card>
      <v-card-title>Edit Note</v-card-title>
      <v-card-text>
        <v-textarea
          v-model="localNote.title"
          label="Title"
          rows="1"
        ></v-textarea>
        <v-textarea
          v-model="localNote.content"
          label="Content"
          rows="4"
          auto-grow
        ></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="saveNote">Save</v-btn>
        <v-btn @click="closeDialog">Cancel</v-btn>
        <v-btn color="error" @click="deleteNote">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>