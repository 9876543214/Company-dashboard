import { defineEventHandler } from 'h3';
import { readServiceData } from '../../utils/serviceDataUtils';

export default defineEventHandler(async (event) => {
    const servicesData = await readServiceData();
    return servicesData;
});