  <script setup>
import { defineProps, defineEmits, watch, onMounted } from "vue";

const props = defineProps({
  dialog: Boolean,
  event: Object,
});

const emit = defineEmits(["update:dialog"]);

function closeDialog() {
  console.log("EventDetailsDialog: closeDialog");
  emit("update:dialog", false);
}

watch(
  () => props.dialog,
  (newVal) => {
    console.log("EventDetailsDialog: dialog prop changed", newVal);
  }
);

watch(
  () => props.event,
  (newVal) => {
    console.log("EventDetailsDialog: event prop changed", newVal);
  }
);

onMounted(() => {
  console.log("EventDetailsDialog: mounted", props.dialog, props.event);
});
</script>

<template>
  <v-dialog
    :model-value="dialog"
    @update:model-value="$emit('update:dialog', $event)"
    max-width="500"
    @click:outside="closeDialog"
  >
    <v-card>
      <v-card-title>Event Details</v-card-title>
      <v-card-text v-if="event">
        <p><strong>Description:</strong> {{ event.description }}</p>
        <p>
          <strong>Timestamp:</strong>
          {{ new Date(event.timestamp).toLocaleString() }}
        </p>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="closeDialog">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
  
