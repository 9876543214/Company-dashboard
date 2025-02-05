<template>
    <v-list-item
      :key="ticket.id"
      variant="simple"
      class="support-ticket"
      @click="showTicketDetails(ticket)"
    >
      <div :class="getTimeClass(ticket.timestamp)" class="wait-time"></div>
      <v-list-item-content>
        <v-list-item-title>{{ ticket.title }}</v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-chip :color="getPriorityColor(ticket.priority)" class="priority-level">{{ ticket.priority }}</v-chip>
      </v-list-item-action>
    </v-list-item>
  </template>
  
  <script>
  export default {
    props: {
      ticket: Object,
    },
    methods: {
      showTicketDetails(ticket) {
        this.$emit('show-ticket-details', ticket);
      },
      getTimeClass(timestamp) {
        const now = new Date("2025-01-28T11:15:00Z");
        const ticketDate = new Date(timestamp);
        const diffTime = Math.abs(now - ticketDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
        if (diffDays <= 1) {
          return 'short-wait';
        } else if (diffDays <= 2) {
          return 'medium-wait';
        } else {
          return 'long-wait';
        }
      },
      getPriorityColor(priority) {
        const colors = {
          low: 'green',
          medium: 'orange',
          high: 'red'
        };
        return colors[priority];
      },
    },
  };
  </script>
  
  <style scoped>
  .support-ticket {
    width: 99%;
    border-radius: 10px;
    margin-bottom: 8px;
    margin-left: 0.5%;
    background-color: rgb(47, 47, 47);
    display: flex;
    flex-direction: row;
  }
  .wait-time {
    width: 8px;
    height: 100%;
    transition: width 0.3s;
    position: absolute;
    left: 0%;
    top: 0%;
  }
  .long-wait {
    background-color: red;
  }
  .medium-wait {
    background-color: orange;
  }
  .short-wait {
    background-color: green;
  }
  .priority-level {
    position: absolute;
    top: 17%;
    right: 2%;
  }
  </style>