import { defineEventHandler, readBody } from "h3";
import { updateNoteById } from "../../utils/notesDataUtils";

export default defineEventHandler(async (event) => {
    try {
        const updatedNoteData = await readBody(event);
        console.log("Received updated note data:", updatedNoteData);

        const updatedNote = await updateNoteById(updatedNoteData);
        return updatedNote;
    } catch (error) {
        console.error("Error handling request:", error);
        throw error;
    }
});