import mongoose, { Document, Schema } from 'mongoose';

interface IService extends Document {
    name: string;
    status: string;
    errorMessage?: string;
}

const ServiceSchema: Schema = new Schema({
    name: { type: String, required: true },
    status: { type: String, required: true },
    errorMessage: { type: String },
});

export default mongoose.model<IService>('Service', ServiceSchema);