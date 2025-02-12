<script setup>
import { ref, computed, onMounted } from "vue";
import { useFetch } from "#app";
import TicketListItem from "./TicketListItem.vue";
import TicketDetailsDialog from "./TicketDetailsDialog.vue";
import FilterSortDialog from "./FilterSortDialog.vue";

const tickets = ref([]);
const dialog = ref(false);
const filterDialog = ref(false);
const selectedTicket = ref(null);
const sortCriterion = ref("Date asc");
const sortOptions = ref(["Date asc", "Date desc"]);
const priorityOptions = ref(["Low", "Medium", "High"]);
const filterCustomer = ref([]);
const filterPriority = ref([]);
const filterDate = ref("");

async function fetchTickets() {
  const { data } = await useFetch("/api/supporttickets");
  tickets.value = data.value;
}

fetchTickets();

const customerOptions = computed(() => {
  const customers = tickets.value.map((ticket) => String(ticket.customer));
  const uniqueCustomers = [...new Set(customers)];
  return uniqueCustomers.sort();
});

const filteredAndSortedTickets = computed(() => {
  let filteredTickets = tickets.value;

  if (filterCustomer.value.length) {
    filteredTickets = filteredTickets.filter((ticket) =>
      filterCustomer.value.includes(ticket.customer)
    );
  }

  if (filterPriority.value.length) {
    filteredTickets = filteredTickets.filter((ticket) =>
      filterPriority.value
        .map((p) => p.toLowerCase())
        .includes(ticket.priority.toLowerCase())
    );
  }

  if (filterDate.value) {
    filteredTickets = filteredTickets.filter(
      (ticket) =>
        new Date(ticket.timestamp).toLocaleDateString() ===
        new Date(filterDate.value).toLocaleDateString()
    );
  }

  if (sortCriterion.value) {
    filteredTickets = filteredTickets.sort((a, b) => {
      if (sortCriterion.value === "Date asc") {
        return new Date(a.timestamp) - new Date(b.timestamp);
      } else if (sortCriterion.value === "Date desc") {
        return new Date(b.timestamp) - new Date(a.timestamp);
      }
    });
  }
  return filteredTickets;
});

const selectAllCustomers = computed(
  () => filterCustomer.value.length === customerOptions.value.length
);
const selectSomeCustomers = computed(
  () => filterCustomer.value.length > 0 && !selectAllCustomers.value
);

function showTicketDetails(ticket) {
  selectedTicket.value = ticket;
  dialog.value = true;
}

function toggleSelectAllCustomers() {
  if (selectAllCustomers.value) {
    filterCustomer.value = [];
  } else {
    filterCustomer.value = [...customerOptions.value];
  }
}
</script>

<template>
  <v-card class="support-ticket-card">
    <div class="card-header">
      <h1>Support tickets</h1>
      <v-btn color="primary" @click="filterDialog = true">Filter & Sort</v-btn>
    </div>

    <v-list lines="one" class="support-tickets" v-if="tickets?.length">
      <TicketListItem
        v-for="ticket in filteredAndSortedTickets"
        :key="ticket.id"
        :ticket="ticket"
        @show-ticket-details="showTicketDetails"
      />
    </v-list>

    <TicketDetailsDialog
      :dialog="dialog"
      :selectedTicket="selectedTicket"
      @update:dialog="dialog = $event"
    />

    <FilterSortDialog
      :filterDialog="filterDialog"
      :customerOptions="customerOptions"
      :filterCustomer="filterCustomer"
      :priorityOptions="priorityOptions"
      :filterPriority="filterPriority"
      :sortCriterion="sortCriterion"
      :sortOptions="sortOptions"
      :selectAllCustomers="selectAllCustomers"
      :selectSomeCustomers="selectSomeCustomers"
      @update:filterDialog="filterDialog = $event"
      @update:filterCustomer="filterCustomer = $event"
      @update:filterPriority="filterPriority = $event"
      @update:sortCriterion="sortCriterion = $event"
      @toggle-select-all-customers="toggleSelectAllCustomers"
    />
  </v-card>
</template>

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