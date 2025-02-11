import { defineEventHandler } from 'h3';
import { readData } from '../../utils/notesDataUtils';

export default defineEventHandler(async (event) => {
    const notesData = await readData();
    return notesData;
});