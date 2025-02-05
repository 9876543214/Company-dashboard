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
            :value="filterCustomer"
            @input="$emit('update:filterCustomer', $event)"
            label="Customer"
          >
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
            :value="filterPriority"
            @input="$emit('update:filterPriority', $event)"
            label="Priority"
          ></v-select>
          <v-select
            :value="sortCriterion"
            @input="$emit('update:sortCriterion', $event)"
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
      this.$emit('toggle-select-all-customers');
    },
  },
};
</script>