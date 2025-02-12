import mongoose, { Document, Schema } from 'mongoose';

interface IEvent extends Document {
    title: string;
    description: string;
    timestamp: string;
    importance: string;
}

const EventSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    timestamp: { type: String, required: true },
    importance: { type: String, required: true },
});

export default mongoose.model<IEvent>('Event', EventSchema);