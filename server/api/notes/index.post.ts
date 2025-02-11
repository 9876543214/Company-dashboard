import { defineEventHandler, readBody } from "h3";
import { readData, writeData } from "../../utils/notesDataUtils";

export default defineEventHandler(async (event) => {
    try {
        console.log("Received event:", event);
        const newNote = await readBody(event);
        console.log("Received new note:", newNote);

        const notesData = await readData();
        newNote.id = notesData.length + 1;
        notesData.push(newNote);
        await writeData(notesData);

        console.log("Updated notesData:", notesData);
        return newNote;
    } catch (error) {
        console.error("Error handling request:", error);
        throw error;
    }
});