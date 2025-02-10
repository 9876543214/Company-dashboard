<template>
  <v-dialog :model-value="filterDialog" @update:model-value="$emit('update:filterDialog', $event)" max-width="600">
    <v-card>
      <v-card-title>Filter & Sort Tickets</v-card-title>
      <v-card-text>
        <v-form>
          <v-select
            clearable
            multiple
            chips
            :items="customerOptions"
            :model-value="filterCustomer"
            @update:model-value="onFilterCustomerUpdate"
            label="Customer"
          >
            <template v-slot:selection="{ item, index }">
              <v-chip v-if="index < 3">
                <span>{{ item }}</span>
              </v-chip>
              <span
                v-if="index === 3"
                class="text-grey text-caption align-self-center"
              >
                (+{{ filterCustomer.length - 3 }} others)
              </span>
            </template>
            <template v-slot:prepend-item>
              <v-list-item title="Select All" @click="toggleSelectAllCustomers">
                <template v-slot:prepend>
                  <v-checkbox-btn
                    :color="selectSomeCustomers ? 'indigo-darken-4' : undefined"
                    :indeterminate="selectSomeCustomers && !selectAllCustomers"
                    :model-value="selectAllCustomers"
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
            :model-value="filterPriority"
            @update:model-value="$emit('update:filterPriority', $event)"
            label="Priority"
          ></v-select>
          <v-select
            :model-value="sortCriterion"
            @update:model-value="$emit('update:sortCriterion', $event)"
            :items="sortOptions"
            label="Sort by"
          ></v-select>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" text @click="$emit('update:filterDialog', false)">Finish</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    filterDialog: Boolean,
    customerOptions: Array,
    filterCustomer: Array,
    priorityOptions: Array,
    filterPriority: Array,
    sortCriterion: String,
    sortOptions: Array,
    selectAllCustomers: Boolean,
    selectSomeCustomers: Boolean,
  },
  methods: {
    toggleSelectAllCustomers() {
      console.log('toggleSelectAllCustomers called');
      this.$emit('toggle-select-all-customers');
    },
    onFilterCustomerUpdate(value) {
      console.log('filterCustomer updated:', value);
      this.$emit('update:filterCustomer', value);
    },
  },
};
</script>