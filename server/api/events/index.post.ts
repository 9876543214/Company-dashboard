import { defineEventHandler, readBody } from "h3";
import { writeEventData } from "../../utils/eventsDataUtils";

export default defineEventHandler(async (event) => {
    try {
        const newEvent = await readBody(event);
        console.log("Received new event:", newEvent);

        await writeEventData(newEvent);

        console.log("Created new event:", newEvent);
        return newEvent;
    } catch (error) {
        console.error("Error handling request:", error);
        throw error;
    }
});