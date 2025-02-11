import { promises as fs } from 'fs';
import { join } from 'path';

const dataFilePath = join(process.cwd(), 'server/data/notesData.json');

interface Note {
  id: number;
  title: string;
  content: string;
}

export async function readData(): Promise<Note[]> {
  try {
    const data = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(data) as Note[];
  } catch (error) {
    console.error('Error reading data:', error);
    return [];
  }
}

export async function writeData(data: Note[]): Promise<void> {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing data:', error);
  }
}