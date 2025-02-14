<script setup>
import { ref, computed, watch } from "vue";
import { VTimePicker } from "vuetify/labs/VTimePicker";

const props = defineProps({
  modelValue: Boolean,
  newEvent: {
    type: Object,
    default: () => ({
      title: "",
      description: "",
      timestamp: null,
    }),
  },
});

const emit = defineEmits(["update:modelValue", "add-event", "event-added"]);

const localEvent = ref({ ...props.newEvent });

watch(
  () => props.newEvent,
  (newVal) => {
    localEvent.value = { ...newVal };
  }
);

function updateDialog(value) {
  emit("update:modelValue", value);
}

async function addEvent() {
  try {
    const response = await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(localEvent.value),
    });
    if (!response.ok) {
      throw new Error("Failed to add event");
    }
    const newEvent = await response.json();
    emit("add-event", newEvent);
    emit("event-added");
    updateDialog(false);
  } catch (error) {
    console.error("Error adding event:", error);
  }
}

const eventTimestamp = computed({
  get() {
    return localEvent.value.timestamp
      ? new Date(localEvent.value.timestamp)
      : null;
  },
  set(value) {
    localEvent.value.timestamp = value ? value.toISOString() : "";
  },
});

const datePickerDialog = ref(false);
const timePickerDialog = ref(false);
const eventTime = ref(
  eventTimestamp.value ? eventTimestamp.value.toTimeString().slice(0, 5) : null
);

function openDatePicker() {
  datePickerDialog.value = true;
}

function closeDatePicker() {
  datePickerDialog.value = false;
}

function openTimePicker() {
  timePickerDialog.value = true;
}

function closeTimePicker() {
  if (eventTimestamp.value) {
    const [hours, minutes] = eventTime.value.split(":");
    eventTimestamp.value.setHours(hours, minutes);
  }
  timePickerDialog.value = false;
}
</script>

<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="updateDialog"
    max-width="500"
    persistent
  >
    <v-card>
      <v-card-title>Add Event</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="localEvent.title"
          label="Title"
          required
        ></v-text-field>
        <v-textarea
          v-model="localEvent.description"
          label="Description"
          rows="4"
          auto-grow
          required
        ></v-textarea>
        <v-btn @click="openDatePicker" class="matgin-r">Select Date</v-btn>
        <v-btn @click="openTimePicker">Select Time</v-btn>
        <p v-if="eventTimestamp">{{ eventTimestamp.toLocaleString() }}</p>
        <v-dialog v-model="datePickerDialog" max-width="330">
          <v-card>
            <v-date-picker
              show-adjacent-months
              v-model="eventTimestamp"
              type="datetime-local"
              @input="closeDatePicker"
            ></v-date-picker>
            <v-card-actions>
              <v-btn text @click="closeDatePicker">OK</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="timePickerDialog" max-width="330">
          <v-card>
            <v-time-picker
              v-model="eventTime"
              full-width
              @input="closeTimePicker"
              format="24hr"
            ></v-time-picker>
            <v-card-actions>
              <v-btn text @click="closeTimePicker">OK</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="addEvent">Submit</v-btn>
        <v-btn @click="updateDialog(false)">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
#timestampText {
  margin-left: 3.7%;
}

.matgin-r {
  margin-right: 2.5%;
}
</style>