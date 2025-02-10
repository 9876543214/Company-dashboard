export default defineEventHandler(async (event) => {
    const eventsData = [
        { id: 1, title: 'Customer meeting', description: 'Event details', timestamp: "2025-01-30T12:00:00Z", importance: 'medium' },
        { id: 2, title: 'Team building', description: 'Event details', timestamp: "2025-02-03T15:30:00Z", importance: 'low' },
        { id: 3, title: 'Board meeting', description: 'Event details', timestamp: "2025-02-07T09:45:00Z", importance: 'high' },
        { id: 4, title: 'Client presentation', description: 'Event details', timestamp: "2025-02-14T08:20:00Z", importance: 'high' },
        { id: 5, title: 'Company dinner', description: 'Event details', timestamp: "2025-02-18T18:00:00Z", importance: 'low' },
        { id: 6, title: 'Past event 1', description: 'Past event details', timestamp: "2024-12-15T10:00:00Z", importance: 'low' },
        { id: 7, title: 'Past event 2', description: 'Past event details', timestamp: "2024-11-20T14:00:00Z", importance: 'medium' },
        { id: 8, title: 'Past event 3', description: 'Past event details', timestamp: "2024-10-05T09:00:00Z", importance: 'high' }
    ];
    return eventsData
})