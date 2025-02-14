import mongoose, { Document, Schema } from 'mongoose';

interface IEvent extends Document {
    _id: string;
    title: string;
    description: string;
    timestamp: string;
    importance: string;
}

const EventSchema: Schema = new Schema({
    _id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    timestamp: { type: String, required: true },
    importance: { type: String, required: false },
});

export default mongoose.model<IEvent>('Event', EventSchema);