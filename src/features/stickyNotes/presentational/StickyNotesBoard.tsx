import { Note } from "../../../types.ts";
import StickyNote from "./StickyNote.tsx";
import { NOTE_DEFAULTS } from "../constants.ts";

type Props = {
  onCreateNote: (note: Note) => void;
  onUpdateNote: (noteIndex: number, note: Note) => void;
  onDeleteNote: (noteIndex: number) => void;
  notes: Note[];
};

function StickyNotesBoard({
  onCreateNote,
  onUpdateNote,
  onDeleteNote,
  notes,
}: Props) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        border: "10px solid black",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: "2",
      }}
      onDoubleClick={(e) => {
        if (e.target !== e.currentTarget) return;

        onCreateNote({
          text: "",
          x: e.clientX,
          y: e.clientY,
          id: new Date().getTime(),
          width: NOTE_DEFAULTS.width,
          height: NOTE_DEFAULTS.height,
        });
      }}
    >
      {notes.map((note, index) => (
        <StickyNote
          note={note}
          key={note.id}
          noteIndex={index}
          onUpdateNote={onUpdateNote}
          onDeleteNote={onDeleteNote}
        />
      ))}
    </div>
  );
}

export default StickyNotesBoard;
