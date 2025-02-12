<template>
  <div>
    <h1>Events</h1>
    <ul>
      <li v-for="event in events" :key="event.id">{{ event.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      events: [],
    };
  },
  created() {
    this.fetchEvents();
  },
  methods: {
    async fetchEvents() {
      try {
        const response = await fetch("/api/events");
        console.log("Response:", response);
        const data = await response.json();
        console.log("Fetched events:", data);
        this.events = data;
        console.log("Events:", this.events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    },
  },
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  color: white;
}
</style>