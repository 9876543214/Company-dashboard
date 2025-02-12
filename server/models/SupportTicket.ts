import mongoose, { Document, Schema } from 'mongoose';

interface ISupportTicket extends Document {
    customer: string;
    title: string;
    priority: string;
    description: string;
    timestamp: string;
}

const SupportTicketSchema: Schema = new Schema({
    customer: { type: String, required: true },
    title: { type: String, required: true },
    priority: { type: String, required: true },
    description: { type: String, required: true },
    timestamp: { type: String, required: true },
});

export default mongoose.model<ISupportTicket>('SupportTicket', SupportTicketSchema); 