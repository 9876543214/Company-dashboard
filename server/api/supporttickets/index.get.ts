import { defineEventHandler } from 'h3';
import { readSupportTicketsData } from '../../utils/supportTicketsDataUtils';

export default defineEventHandler(async (event) => {
    const supportTicketsData = await readSupportTicketsData();
    return supportTicketsData;
});