import StickyNotesBoard from "../presentational/StickyNotesBoard.tsx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store.ts";
import {
  createNote,
  updateNote,
  deleteNote,
} from "../../../redux/reducers/notes.ts";
import { Note } from "../../../types.ts";

function StickyNote() {
  const notes = useSelector((state: RootState) => state.notes);
  const dispatch = useDispatch<AppDispatch>();

  const handleCreateNote = (note: Note) => {
    dispatch(createNote(note));
  };

  const handleUpdateNote = (noteIndex: number, note: Note) => {
    dispatch(updateNote({ noteIndex, note: note }));
  };

  const handleDeleteNote = (noteIndex: number) => {
    dispatch(deleteNote(noteIndex));
  };

  return (
    <StickyNotesBoard
      notes={notes}
      onCreateNote={handleCreateNote}
      onUpdateNote={handleUpdateNote}
      onDeleteNote={handleDeleteNote}
    />
  );
}

export default StickyNote;
