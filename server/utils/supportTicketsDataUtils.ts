import SupportTicketModel from '../models/SupportTicket';
import connectDB from './db';

connectDB();

interface SupportTicket {
    customer: string;
    title: string;
    priority: string;
    description: string;
    timestamp: string;
}

export async function readSupportTicketsData(): Promise<SupportTicket[]> {
    try {
        return await SupportTicketModel.find() as SupportTicket[];
    } catch (error) {
        console.error('Error reading support tickets data:', error);
        return [];
    }
}

export async function writeSupportTicketsData(data: SupportTicket[]): Promise<void> {
    try {
        await SupportTicketModel.insertMany(data);
    } catch (error) {
        console.error('Error writing support tickets data:', error);
    }
}