import { promises as fs } from 'fs';
import { join } from 'path';

const dataFilePath = join(process.cwd(), 'server/data/serviceData.json');

interface Service {
    id: number;
    name: string;
    status: string;
    errorMessage?: string;
}

export async function readServiceData(): Promise<Service[]> {
    try {
        const data = await fs.readFile(dataFilePath, 'utf-8');
        return JSON.parse(data) as Service[];
    } catch (error) {
        console.error('Error reading service data:', error);
        return [];
    }
}