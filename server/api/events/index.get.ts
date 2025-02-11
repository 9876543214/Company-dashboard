import { defineEventHandler } from 'h3';
import { readEventData } from '../../utils/eventsDataUtils';

export default defineEventHandler(async (event) => {
    const eventsData = await readEventData();
    return eventsData;
});