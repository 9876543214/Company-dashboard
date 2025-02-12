import { defineEventHandler } from "h3";
import { deleteNoteById } from "../../utils/notesDataUtils";

export default defineEventHandler(async (event) => {
    try {
        const idParam = event.context.params?.id;
        if (!idParam) {
            throw new Error("Missing note id parameter");
        }

        console.log("Received delete request for note id:", idParam);

        await deleteNoteById(idParam);

        console.log("Note deleted successfully");
        return { success: true };
    } catch (error) {
        console.error("Error handling request:", error);
        return { success: false, error: error };
    }
});