// import * as fs from 'fs';
// import * as path from 'path';
// import { promisify } from 'util';
// import connectDB from './db.cjs';
// import SupportTicketModel from '../models/SupportTicket';
// import ServiceModel from '../models/Service';
// import NoteModel from '../models/Note';
// import EventModel from '../models/Event';

// const readFile = promisify(fs.readFile);

// const insertData = async () => {
//     try {
//         // Connect to MongoDB
//         await connectDB();

//         // Read and insert support tickets data
//         const supportTicketsDataPath = path.join(__dirname, '../data/supportTicketsData.json');
//         const supportTicketsFileContent = await readFile(supportTicketsDataPath, 'utf-8');
//         const supportTicketsData = JSON.parse(supportTicketsFileContent);
//         await SupportTicketModel.insertMany(supportTicketsData);
//         console.log('Support tickets data inserted successfully');

//         // Read and insert service data
//         const serviceDataPath = path.join(__dirname, '../data/serviceData.json');
//         const serviceFileContent = await readFile(serviceDataPath, 'utf-8');
//         const serviceData = JSON.parse(serviceFileContent);
//         await ServiceModel.insertMany(serviceData);
//         console.log('Service data inserted successfully');

//         // Read and insert notes data
//         const notesDataPath = path.join(__dirname, '../data/notesData.json');
//         const notesFileContent = await readFile(notesDataPath, 'utf-8');
//         const notesData = JSON.parse(notesFileContent);
//         await NoteModel.insertMany(notesData);
//         console.log('Notes data inserted successfully');

//         // Read and insert events data
//         const eventsDataPath = path.join(__dirname, '../data/eventsData.json');
//         const eventsFileContent = await readFile(eventsDataPath, 'utf-8');
//         const eventsData = JSON.parse(eventsFileContent);
//         await EventModel.insertMany(eventsData);
//         console.log('Events data inserted successfully');
//     } catch (error) {
//         console.error('Error inserting data:', error);
//     }
// };

// insertData();