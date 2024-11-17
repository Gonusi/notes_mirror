import StickyNote from "./StickyNote.tsx";
import { NOTE_DEFAULTS } from "./constants";
import { useNotes } from "../../context/notes.tsx";

function StickyNotesBoard() {
  const { notes, createNote } = useNotes();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: "2",
      }}
      onDoubleClick={(e) => {
        if (e.target !== e.currentTarget) return;

        createNote({
          text: "",
          x: e.clientX,
          y: e.clientY,
          id: `temp-${new Date().getTime().toString()}`,
          width: NOTE_DEFAULTS.width,
          height: NOTE_DEFAULTS.height,
        });
      }}
    >
      {Object.keys(notes).map((id) => (
        <StickyNote note={notes[id]} key={id} />
      ))}
    </div>
  );
}

export default StickyNotesBoard;
