import { promises as fs } from 'fs';
import { join } from 'path';

const dataFilePath = join(process.cwd(), 'server/data/supportTicketsData.json');

interface SupportTicket {
    id: number;
    customer: string;
    title: string;
    priority: string;
    description: string;
    timestamp: string;
}

export async function readSupportTicketsData(): Promise<SupportTicket[]> {
    try {
        const data = await fs.readFile(dataFilePath, 'utf-8');
        return JSON.parse(data) as SupportTicket[];
    } catch (error) {
        console.error('Error reading support tickets data:', error);
        return [];
    }
}

export async function writeSupportTicketsData(data: SupportTicket[]): Promise<void> {
    try {
        await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error writing support tickets data:', error);
    }
}