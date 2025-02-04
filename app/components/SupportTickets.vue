<template>
  <v-card class="support-ticket-card">
    <div class="card-header">
      <h1>Support tickets</h1>
      <v-btn color="primary" @click="filterDialog = true">Filter & Sort</v-btn>
    </div>

    <v-list lines="one" class="support-tickets">
      <TicketListItem
        v-for="ticket in filteredAndSortedTickets"
        :key="ticket.id"
        :ticket="ticket"
        @show-ticket-details="showTicketDetails"
      />
    </v-list>

    <TicketDetailsDialog
      :key="selectedTicket ? selectedTicket.id : null"
      :dialog.sync="dialog"
      :selectedTicket="selectedTicket"
    />

    <FilterSortDialog
      :filterDialog.sync="filterDialog"
      :customerOptions="customerOptions"
      :filterCustomer.sync="filterCustomer"
      :priorityOptions="priorityOptions"
      :filterPriority.sync="filterPriority"
      :sortCriterion.sync="sortCriterion"
      :sortOptions="sortOptions"
      :selectAllCustomers="selectAllCustomers"
      :selectSomeCustomers="selectSomeCustomers"
      @toggle-select-all-customers="toggleSelectAllCustomers"
    />
  </v-card>
</template>

<script>
import { supportTicketsData } from '../data/testdata.js';
import TicketListItem from './TicketListItem.vue';
import TicketDetailsDialog from './TicketDetailsDialog.vue';
import FilterSortDialog from './FilterSortDialog.vue';

export default {
  name: 'SupportTickets',
  components: {
    TicketListItem,
    TicketDetailsDialog,
    FilterSortDialog,
  },
  data() {
    return {
      tickets: supportTicketsData,
      dialog: false,
      filterDialog: false,
      selectedTicket: null,
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
    selectAllCustomers() {
      return this.filterCustomer.length === this.customerOptions.length;
    },
    selectSomeCustomers() {
      return this.filterCustomer.length > 0;
    },
  },
  methods: {
    showTicketDetails(ticket) {
      console.log('Showing ticket details:', ticket);
      this.selectedTicket = ticket;
      console.log('Selected ticket set:', this.selectedTicket);
      this.dialog = true;
      console.log('Dialog set to true:', this.dialog);
    },
    toggleSelectAllCustomers() {
      if (this.selectAllCustomers) {
        this.filterCustomer = [];
      } else {
        this.filterCustomer = this.customerOptions.slice();
      }
    },
  },
};
</script>

<style scoped>
.support-ticket-card {
  height: 100%;
  color: white;
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
</style>