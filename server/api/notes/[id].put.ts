import { defineEventHandler, readBody } from "h3";
import { readData, writeData } from "../../utils/notesDataUtils";

export default defineEventHandler(async (event) => {
    try {
        const idParam = event.context.params?.id;
        if (!idParam) {
            throw new Error("Missing note id parameter");
        }

        const id = parseInt(idParam, 10);
        if (isNaN(id)) {
            throw new Error("Invalid note id parameter");
        }

        const updatedNote = await readBody(event);
        console.log("Received updated note:", updatedNote);

        const notesData = await readData();
        const index = notesData.findIndex((note) => note.id === id);
        if (index === -1) {
            throw new Error(`Note with id ${id} not found`);
        }

        notesData[index] = updatedNote;
        await writeData(notesData);

        console.log("Updated notesData:", notesData);
        return updatedNote;
    } catch (error) {
        console.error("Error handling request:", error);
        return { success: false, error: error };
    }
});