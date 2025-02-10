<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  dialog: Boolean,
  selectedTicket: Object,
});

const emit = defineEmits(["update:dialog"]);

function closeDialog() {
  console.log("Closing dialog");
  emit("update:dialog", false);
}
</script>

<template>
  <v-dialog
    :model-value="dialog"
    @update:model-value="$emit('update:dialog', $event)"
    max-width="500"
    @click:outside="closeDialog"
  >
    <v-card>
      <v-card-title>Ticket Details</v-card-title>
      <v-card-text v-if="selectedTicket">
        <p><strong>Customer:</strong> {{ selectedTicket.customer }}</p>
        <p><strong>Priority:</strong> {{ selectedTicket.priority }}</p>
        <p><strong>Description:</strong> {{ selectedTicket.description }}</p>
        <p>
          <strong>Timestamp:</strong>
          {{ new Date(selectedTicket.timestamp).toLocaleString() }}
        </p>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="closeDialog">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

