export default defineEventHandler(async (event) => {  
    const servicesData = [
        { id: 1, name: 'Service A', status: 'active' },
        { id: 2, name: 'Service B', status: 'down', errorMessage: 'Network issue' },
        { id: 3, name: 'Service C', status: 'active' },
    ];  
    return servicesData
})