<template>
  <v-list-item-content @click="editNote">
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
  methods: {
    editNote() {
      this.$emit('edit-note', this.note);
    },
  },
};
</script>