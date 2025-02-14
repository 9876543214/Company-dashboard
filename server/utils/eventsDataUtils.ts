import mongoose from 'mongoose';
import connectDB from './db';
import Event from '../models/Event';

connectDB();

export async function readEventData(): Promise<any[]> {
    try {
        console.log('Reading event data from the database...');
        const events = await Event.find().exec();
        const eventsWithStringId = events.map(event => ({
            ...event.toObject(),
            _id: event._id.toString(),
        }));
        console.log('Event data read successfully:', eventsWithStringId);
        return eventsWithStringId;
    } catch (error) {
        console.error('Error reading event data:', error);
        return [];
    }
}

export async function writeEventData(data: any): Promise<void> {
    try {
        console.log('Writing event data to the database:', data);
        const eventWithId = {
            ...data,
            _id: new mongoose.Types.ObjectId(),
        };
        console.log('Event with id:', eventWithId);
        await Event.create(eventWithId);
        console.log('Event data written successfully');
    } catch (error) {
        console.error('Error writing event data:', error);
    }
}

export async function deleteEventById(id: string): Promise<void> {
    try {
        console.log(`Deleting event with id: ${id}`);
        await Event.findByIdAndDelete(new mongoose.Types.ObjectId(id)).exec();
        console.log('Event deleted successfully');
    } catch (error) {
        console.error('Error deleting event:', error);
    }
}

export async function updateEventById(updatedEventData: any): Promise<any | null> {
    try {
        console.log(`Updating event with id: ${updatedEventData._id}`, updatedEventData);

        const updatedEvent = await Event.findByIdAndUpdate(
            updatedEventData._id,
            updatedEventData,
            { new: true, runValidators: true }
        ).exec();

        if (!updatedEvent) {
            throw new Error(`Event with id ${updatedEventData._id} not found`);
        }

        console.log('Event updated successfully:', updatedEvent);
        return updatedEvent;
    } catch (error) {
        console.error('Error updating event:', error);
        return null;
    }
}