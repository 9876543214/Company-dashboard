<template>
    <v-card>
      <div class="card-header">
        <h1>Support tickets</h1>
        <v-btn color="primary" @click="filterDialog = true">Filter & Sort</v-btn>
      </div>
      
      <v-list lines="one" class="support-tickets">
        <v-list-item
        v-for="ticket in filteredAndSortedTickets"
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
      </v-list>
      
      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-card-title>Ticket Details</v-card-title>
          <v-card-text>
            <p><strong>Customer:</strong> {{ selectedTicket.customer }}</p>
            <p><strong>Priority:</strong> {{ selectedTicket.priority }}</p>
            <p><strong>Description:</strong> {{ selectedTicket.description }}</p>
            <p><strong>Timestamp:</strong> {{ new Date(selectedTicket.timestamp).toLocaleString() }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="dialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  
      <v-dialog v-model="filterDialog" max-width="600">
        <v-card>
          <v-card-title>Filter & Sort Tickets</v-card-title>
          <v-card-text>
            <v-form>
              <v-select
              clearable
              multiple
              chips
              :items="customerOptions"
              v-model="filterCustomer"
              label="Customer"
              >
              <template v-slot:prepend-item>
                <v-list-item title="Select All" @click="toggleSelectAllCustomers">
                  <template v-slot:prepend>
                    <v-checkbox-btn
                    :color="likesSomeCustomers ? 'indigo-darken-4' : undefined"
                    :indeterminate="likesSomeCustomers && !likesAllCustomers"
                    :model-value="likesAllCustomers"
                    ></v-checkbox-btn>
                  </template>
                </v-list-item>
                <v-divider class="mt-2"></v-divider>
              </template>
            </v-select>
            <v-select
            clearable
            chips
            multiple
            :items="priorityOptions"
            v-model="filterPriority"
            label="Priority"
            ></v-select>
            <v-select
            v-model="sortCriterion"
            :items="sortOptions"
            label="Sort by"
            ></v-select>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="filterDialog = false">Finish</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>

  </template>
  
  <script>
  import { supportTicketsData } from '../data/testdata.js'; //importerer testdata
  
  export default {
    name: 'SupportTickets',
    data() {
      return {
        tickets: supportTicketsData,
        dialog: false,
        filterDialog: false,
        selectedTicket: {},
        sortCriterion: 'Date asc',
        sortOptions: ['Date asc', 'Date desc'],
        priorityOptions: ['Low', 'Medium', 'High'],
        filterCustomer: [],
        filterPriority: [],
        filterDate: '',
      };
    },
    computed: {
      customerOptions() {
        const customers = this.tickets.map(ticket => String(ticket.customer));
        const uniqueCustomers = [...new Set(customers)];
        return uniqueCustomers.sort();
      },
      filteredAndSortedTickets() {
        let tickets = this.tickets;
  
        if (this.filterCustomer.length) {
          tickets = tickets.filter(ticket => this.filterCustomer.includes(ticket.customer));
        }
  
        if (this.filterPriority.length) {
          tickets = tickets.filter(ticket => this.filterPriority.map(p => p.toLowerCase()).includes(ticket.priority.toLowerCase()));
        }
  
        if (this.filterDate) {
          tickets = tickets.filter(ticket => new Date(ticket.timestamp).toLocaleDateString() === new Date(this.filterDate).toLocaleDateString());
        }
  
        if (this.sortCriterion) {
          tickets = tickets.sort((a, b) => {
            if (this.sortCriterion === 'Date asc') {
              return new Date(a.timestamp) - new Date(b.timestamp);
            } else if (this.sortCriterion === 'Date desc') {
              return new Date(b.timestamp) - new Date(a.timestamp);
            }
          });
        }
  
        return tickets;
      },
      likesAllCustomers() {
        return this.filterCustomer.length === this.customerOptions.length;
      },
      likesSomeCustomers() {
        return this.filterCustomer.length > 0;
      },
    },
    methods: {
      showTicketDetails(ticket) {
        this.selectedTicket = ticket;
        this.dialog = true;
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
      toggleSelectAllCustomers() {
        if (this.likesAllCustomers) {
          this.filterCustomer = [];
        } else {
          this.filterCustomer = this.customerOptions.slice();
        }
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
  .support-tickets {
    height: calc(100% - 6.6vh);
    position: relative;
    overflow-y: auto;
  }
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    height: 6.6vh;
  }
  .sort-select {
    margin-top: 2%;
    padding: 3px;
    width: 60px;
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
  .select_all {
    margin-bottom: 1vh;
    border: 1px solid gray;
  }
  </style>