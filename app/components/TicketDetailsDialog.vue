<template>
  <v-dialog v-model="internalDialog" max-width="500" @click:outside="closeDialog">
    <v-card>
      <v-card-title>Ticket Details</v-card-title>
      <v-card-text v-if="selectedTicket">
        <p><strong>Customer:</strong> {{ selectedTicket.customer }}</p>
        <p><strong>Priority:</strong> {{ selectedTicket.priority }}</p>
        <p><strong>Description:</strong> {{ selectedTicket.description }}</p>
        <p><strong>Timestamp:</strong> {{ new Date(selectedTicket.timestamp).toLocaleString() }}</p>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="closeDialog">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: Boolean,
    selectedTicket: Object,
  },
  data() {
    return {
      internalDialog: this.dialog,
    };
  },
  watch: {
    dialog(val) {
      console.log('Dialog prop changed:', val);
      this.internalDialog = val;
    },
    internalDialog(val) {
      console.log('Internal dialog changed:', val);
      this.$emit('update:dialog', val);
    },
    selectedTicket(newTicket) {
      console.log('Selected ticket changed:', newTicket);
      if (newTicket) {
        this.internalDialog = true;
      }
    },
  },
  methods: {
    closeDialog() {
      console.log('Closing dialog');
      this.internalDialog = false;
      this.$emit('update:dialog', false);
    },
  },
};
</script>