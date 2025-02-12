import mongoose from 'mongoose';
import connectDB from './db';
import Note from '../models/Note';

connectDB();

export async function readData(): Promise<any[]> {
  try {
    console.log('Reading data from the database...');
    const notes = await Note.find().exec();
    const notesWithStringId = notes.map(note => ({
      ...note.toObject(),
      _id: note._id.toString(),
    }));
    console.log('Data read successfully:', notesWithStringId);
    return notesWithStringId;
  } catch (error) {
    console.error('Error reading data:', error);
    return [];
  }
}

export async function writeData(data: any): Promise<void> {
  try {
    console.log('Writing data to the database:', data);
    const noteWithId = {
      ...data,
      _id: new mongoose.Types.ObjectId(),
    };
    console.log('Note with id:', noteWithId);
    await Note.create(noteWithId);
    console.log('Data written successfully');
  } catch (error) {
    console.error('Error writing data:', error);
  }
}

export async function deleteNoteById(id: string): Promise<void> {
  try {
    console.log(`Deleting note with id: ${id}`);
    await Note.findByIdAndDelete(new mongoose.Types.ObjectId(id)).exec();
    console.log('Note deleted successfully');
  } catch (error) {
    console.error('Error deleting note:', error);
  }
}

export async function updateNoteById(updatedNoteData: any): Promise<any | null> {
  try {
    console.log(`Updating note with id: ${updatedNoteData._id}`, updatedNoteData);

    const updatedNote = await Note.findByIdAndUpdate(
      updatedNoteData._id,
      updatedNoteData,
      { new: true, runValidators: true }
    ).exec();

    if (!updatedNote) {
      throw new Error(`Note with id ${updatedNoteData._id} not found`);
    }

    console.log('Note updated successfully:', updatedNote);
    return updatedNote;
  } catch (error) {
    console.error('Error updating note:', error);
    return null;
  }
}

// export async function updateNoteById(id: string, updatedNote: Partial<any>): Promise<any | null> {
//   try {
//     console.log(`Updating note with id: ${id}`, updatedNote);

//     // Fetch all notes to print their ids
//     const allNotes = await Note.find().exec();
//     const allNoteIds = allNotes.map(note => note._id);
//     console.log('All note ids in the database:', allNoteIds);

//     const objectId = new mongoose.Types.ObjectId(id);
//     console.log('ObjectId:', objectId);

//     // Find and update the note
//     const note = await Note.findByIdAndUpdate(id, updatedNote, { new: true }).exec();

//     if (allNoteIds[1] == id) {
//       console.log('id matching');
//     } else {
//       const str_id = allNoteIds[1].toString();
//       if (str_id == id) {
//         console.log('string id matching');
//       }
//     }
//     if (!note) {
//       console.error(`Note with id ${id} not found`);
//     } else {
//       console.log('Note updated successfully:', note);
//     }
//     return note;

//   } catch (error) {
//     console.error('Error updating note:', error);
//     return null;
//   }
// }