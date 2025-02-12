import { defineEventHandler, readBody } from "h3";
import { readData, writeData } from "../../utils/notesDataUtils";

export default defineEventHandler(async (event) => {
    try {
        const newNote = await readBody(event);
        console.log("Received new note:", newNote);

        await writeData(newNote);

        console.log("Created new note:", newNote);
        return newNote;
    } catch (error) {
        console.error("Error handling request:", error);
        throw error;
    }
});