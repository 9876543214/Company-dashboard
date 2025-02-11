import { promises as fs } from 'fs';
import { join } from 'path';

const dataFilePath = join(process.cwd(), 'server/data/eventsData.json');

interface Event {
    id: number;
    title: string;
    description: string;
    timestamp: string;
    importance: string;
}

export async function readEventData(): Promise<Event[]> {
    try {
        const data = await fs.readFile(dataFilePath, 'utf-8');
        return JSON.parse(data) as Event[];
    } catch (error) {
        console.error('Error reading event data:', error);
        return [];
    }
}

export async function writeEventData(data: Event[]): Promise<void> {
    try {
        await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error writing event data:', error);
    }
}