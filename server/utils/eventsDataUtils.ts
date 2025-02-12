import mongoose from 'mongoose';
import connectDB from './db';

connectDB();

interface Event {
    id: number;
    title: string;
    description: string;
    timestamp: string;
    importance: string;
}

const eventSchema = new mongoose.Schema<Event>({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    timestamp: { type: String, required: true },
    importance: { type: String, required: true },
});

const EventModel = mongoose.model<Event>('Event', eventSchema);

export async function readEventData(): Promise<Event[]> {
    try {
        return await EventModel.find().exec();
    } catch (error) {
        console.error('Error reading event data:', error);
        return [];
    }
}

export async function writeEventData(data: Event[]): Promise<void> {
    try {
        await EventModel.insertMany(data);
    } catch (error) {
        console.error('Error writing event data:', error);
    }
}