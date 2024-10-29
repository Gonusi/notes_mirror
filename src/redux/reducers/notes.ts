import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Note } from "../../types.ts";

type NotesState = Note[];

const initialState: NotesState = [];

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    createNote: (state, action: PayloadAction<Note>) => {
      console.log("createNote", action.payload);
      state.push(action.payload);
    },
    updateNote: (
      state,
      action: PayloadAction<{ noteIndex: number; note: Note }>,
    ) => {
      console.log("updateNote", action.payload);
      state[action.payload.noteIndex] = action.payload.note;
    },
    deleteNote: (state, action: PayloadAction<number>) => {
      console.log("deleteNote", action.payload);
      state.splice(action.payload, 1);
    },
  },
});

export const { createNote, updateNote, deleteNote } = notesSlice.actions;
export default notesSlice.reducer;
