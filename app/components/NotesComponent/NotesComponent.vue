<script setup>
import { ref } from "vue";
import { useFetch } from "#app";
import NoteItem from "./NoteItem.vue";
import NoteDialog from "./NoteDialog.vue";
import EditNoteDialog from "./EditNoteDialog.vue";

const notes = ref([]);
const newNote = ref({
  title: "",
  content: "",
});
const dialog = ref(false);
const editDialog = ref(false);
const selectedNote = ref(null);

async function getnotes() {
  try {
    const { data } = await useFetch("/api/notes");
    notes.value = data.value;
    console.log("Fetched notes:", notes.value);
  } catch (error) {
    console.error("Error fetching notes:", error);
  }
}

getnotes();

function updateNotes(updatedNotes) {
  notes.value = updatedNotes;
}

async function addNote() {
  console.log("addNote function called");
  if (newNote.value.title && newNote.value.content) {
    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        body: JSON.stringify(newNote.value),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to add note:", errorData);
        return;
      }

      const addedNote = await response.json();
      console.log("Added note:", addedNote);

      getnotes();

      newNote.value.title = "";
      newNote.value.content = "";
      updateDialog(false);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  }
}

async function saveNote(editedNote) {
  console.log("saveNote function called");
  try {
    const response = await fetch(`/api/notes/${editedNote.id}`, {
      method: "PUT",
      body: JSON.stringify(editedNote),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to save note:", errorData);
      return;
    }

    const updatedNote = await response.json();
    console.log("Updated note:", updatedNote);

    getnotes();
    updateEditDialog(false);
  } catch (error) {
    console.error("Error saving note:", error);
  }
}

async function deleteNote(note) {
  console.log("deleteNote function called");
  try {
    const response = await fetch(`/api/notes/${note.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to delete note:", errorData);
      return;
    }

    console.log("Deleted note:", note);

    getnotes();
  } catch (error) {
    console.error("Error deleting note:", error);
  }
}

function updateDialog(value) {
  dialog.value = value;
}

function updateEditDialog(value) {
  editDialog.value = value;
}

function editNote(note) {
  selectedNote.value = { ...note };
  updateEditDialog(true);
}
</script>

<template>
  <v-card class="notes-card">
    <div class="card-header">
      <h1>Notes</h1>
      <NoteDialog
        :dialog="dialog"
        :newNote="newNote"
        @update:notes="updateNotes"
        @update:dialog="updateDialog"
        :addNote="addNote"
      />
    </div>

    <v-list lines="one" class="notes-list">
      <template v-if="notes?.length">
        <v-list-item
          v-for="note in notes"
          :key="note.id"
          variant="simple"
          class="note-item"
          @click="editNote(note)"
        >
          <NoteItem :note="note" />
          <v-icon class="edit-icon">mdi-pencil-outline</v-icon>
        </v-list-item>
      </template>
      <template v-else>
        <div class="no-notes-message">No current notes</div>
      </template>
    </v-list>

    <EditNoteDialog
      :dialog="editDialog"
      :note="selectedNote"
      @update:dialog="updateEditDialog"
      @save-note="saveNote"
      @delete-note="deleteNote"
    />
  </v-card>
</template>

<style scoped>
.notes-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  color: white;
}

.notes-list {
  height: 100%;
  position: relative;
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

.edit-icon {
  position: absolute;
  right: 2%;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
  transition: opacity 0.3s;
}

.note-item:hover .edit-icon {
  opacity: 0.7;
}

.no-notes-message {
  text-align: center;
  color: gray;
  font-style: italic;
  margin-top: 20px;
}
</style>