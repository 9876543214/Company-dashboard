<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
  showDetails: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["show-event-details"]);

function showEventDetails() {
  console.log("EventListItem: showEventDetails", props.event);
  emit("show-event-details", props.event);
}
const eventDate = new Date(props.event.timestamp);
</script>

<template>
  <v-list-item
    :key="event.id"
    variant="simple"
    class="event-item"
    @click="showEventDetails"
  >
    <v-list-item-content>
      <v-list-item-title>{{ event.title }}</v-list-item-title>
      <v-list-item-subtitle>{{
        eventDate.toLocaleString()
      }}</v-list-item-subtitle>
      <div v-if="showDetails">
        <p>{{ event.description }}</p>
      </div>
    </v-list-item-content>
  </v-list-item>
</template>

<style scoped>
.event-item {
  width: 99%;
  border-radius: 10px;
  margin-bottom: 8px;
  margin-left: 0.5%;
  background-color: rgb(47, 47, 47);
  display: flex;
  flex-direction: row;
  position: relative;
  align-items: center;
}
</style>