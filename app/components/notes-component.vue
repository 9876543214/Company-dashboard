<template>
    <div>
        <v-card class="notes-card">
            <div class="card-header">
                <h1>Notes</h1>
                <v-btn color="primary" @click="dialog = true">+</v-btn>
            </div>

            <v-list lines="one" class="notes-list">
                <v-list-item
                    v-for="note in notes"
                    :key="note.id"
                    variant="simple"
                    class="note-item"
                >
                    <v-list-item-content>
                        <v-list-item-title>{{ note.title }}</v-list-item-title>
                        <v-list-item-text>{{ note.content }}</v-list-item-text>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-card>
        <v-dialog v-model="dialog" max-width="500" persistent>
            <v-card>
                <v-card-title>Add Note</v-card-title>
                <v-card-text>
                    <v-textarea v-model="newNote.title" label="Title" rows="1"></v-textarea>
                    <v-textarea v-model="newNote.content" label="Content" rows="4" auto-grow></v-textarea>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="addNote">Submit</v-btn>
                    <v-btn @click="dialog = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { notesData } from '../data/testdata.js';

export default {
    name: 'Notes',
    data() {
        return {
            notes: notesData,
            dialog: false,
            newNote: {
                title: '',
                content: ''
            }
        };
    },
    methods: {
        addNote() {
            if (this.newNote.title && this.newNote.content) {
                this.notes.push({ ...this.newNote, id: Date.now() });
                this.newNote.title = '';
                this.newNote.content = '';
                this.dialog = false;
            }
        }
    }
};
</script>

<style scoped>

.notes-list {
    height: 44.1vh;
    overflow-y: auto;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    height: 6.6vh;
}

.note-item {
    width: 99%;
    border-radius: 10px;
    margin-bottom: 8px;
    margin-left: 0.5%;
    background-color: rgb(47, 47, 47);
    display: flex;
    flex-direction: row;
    position: relative;
    align-items: center;
}
</style>