<template>
  <v-card>
    <v-row>
      <v-col cols="3">
        <v-card>
          <v-card-title>Removed Components</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item
                v-for="component in removedComponents"
                :key="component"
                @click="restoreComponent(component)"
              >
                <v-list-item-content>{{ component }}</v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="9">
        <v-card>
          <v-card-title>Components</v-card-title>
          <v-card-text>
            <v-row>
              <v-col
                v-for="component in selectedComponents"
                :key="component"
                cols="12"
                md="6"
                lg="4"
              >
                <v-card class="component-card">
                  <v-card-title>
                    {{ component }}
                    <v-btn icon @click="removeComponent(component)">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-card-title>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "selectComponents",
  data() {
    return {
      selectedComponents: ['Support Tickets', 'Events', 'Service Status', 'Notes'],
      removedComponents: []
    };
  },
  methods: {
    removeComponent(component) {
      this.selectedComponents = this.selectedComponents.filter(c => c !== component);
      this.removedComponents.push(component);
      this.emitSelectedComponents();
    },
    restoreComponent(component) {
      this.removedComponents = this.removedComponents.filter(c => c !== component);
      this.selectedComponents.push(component);
      this.emitSelectedComponents();
    },
    emitSelectedComponents() {
      this.$emit('update:selectedComponents', this.selectedComponents);
    }
  }
};
</script>

<style scoped>
.component-card {
  position: relative;
}
</style>