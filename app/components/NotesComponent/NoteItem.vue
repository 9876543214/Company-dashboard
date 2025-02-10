<script setup>
const props = defineProps({
  note: Object,
});

const emit = defineEmits(["edit-note"]);

function editNote() {
  emit("edit-note", props.note);
}
</script>

<template>
  <v-list-item-content @click="editNote">
    <v-list-item-title>{{ note.title }}</v-list-item-title>
    <v-list-item-text>{{ note.content }}</v-list-item-text>
  </v-list-item-content>
</template>

