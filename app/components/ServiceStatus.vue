<template>
    <v-card class="service-status-card">
        <div class="card-header">
            <h1>Service Status</h1>
        </div>
        
        <v-list lines="one" class="service-status">
            <v-list-item
            v-for="service in services"
            :key="service.id"
            variant="simple"
            class="service-item"
            @click="showServiceDetails(service)"
            >
                <v-list-item-content>
                    <v-list-item-title>{{ service.name }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                    <v-chip :color="getStatusColor(service.status)" class="status">{{ service.status }}</v-chip>
                </v-list-item-action>
            </v-list-item>
        </v-list>

        <v-dialog v-model="dialog" max-width="500">
            <v-card>
                <v-card-title>Service Details</v-card-title>
                <v-card-text>
                    <p><strong>Status:</strong> {{ selectedService.status }}</p>
                    <p v-if="selectedService.status === 'down'"><strong>Error Message:</strong> {{ selectedService.errorMessage }}</p>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="dialog = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script>
import { servicesData } from '../data/testdata.js'; // Import service data

export default {
    name: 'ServiceStatus',
    data() {
        return {
            services: servicesData,
            dialog: false,
            selectedService: {},
        };
    },
    methods: {
        getStatusColor(status) {
            const colors = {
                active: 'green',
                down: 'red'
            };
            return colors[status];
        },
        showServiceDetails(service) {
            this.selectedService = service;
            this.dialog = true;
        },
    }
};
</script>

<style scoped>

.service-status-card {
    height: 100%;
    color: white;
}
.service-item {
    width: 99%;
    border-radius: 10px;
    margin-bottom: 8px;
    margin-left: 0.5%;
    background-color: rgb(47, 47, 47);
    display: flex;
    flex-direction: row;
    cursor: pointer;
}

.service-status {
    height: calc(100% - 6.6vh);
    overflow-y: auto;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    height: 6.6vh;
}

.status {
    position: absolute;
    top: 17%;
    right: 2%;
}
</style>