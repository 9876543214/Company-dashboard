import mongoose, { Document, Schema } from 'mongoose';

interface INote extends Document {
    title: string;
    content: string;
    _id: string;
}

const NoteSchema: Schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    _id: { type: String, required: true },
});

export default mongoose.model<INote>('Note', NoteSchema);