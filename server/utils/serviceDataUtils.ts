import mongoose from 'mongoose';
import connectDB from './db';

connectDB();

interface Service {
    id: number;
    name: string;
    status: string;
    errorMessage?: string;
}

const serviceSchema = new mongoose.Schema<Service>({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    status: { type: String, required: true },
    errorMessage: { type: String },
});

const ServiceModel = mongoose.model<Service>('Service', serviceSchema);

export async function readServiceData(): Promise<Service[]> {
    try {
        return await ServiceModel.find().exec();
    } catch (error) {
        console.error('Error reading service data:', error);
        return [];
    }
}

export async function writeServiceData(data: Service[]): Promise<void> {
    try {
        await ServiceModel.insertMany(data);
    } catch (error) {
        console.error('Error writing service data:', error);
    }
}