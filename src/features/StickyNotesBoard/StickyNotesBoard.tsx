import StickyNote from "./StickyNote.tsx";
import { NOTE_DEFAULTS } from "./constants";
import { useNotes } from "../../context/notes.tsx";
import { useUser } from "../../context/user.tsx";

function StickyNotesBoard() {
  const { notes, createNote } = useNotes();
  const { current } = useUser();

  console.log("notes", notes);

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

        if (!current) return;

        createNote({
          body: "",
          title: "",
          x: e.clientX,
          y: e.clientY,
          $id: `temp-${new Date().getTime().toString()}`,
          width: NOTE_DEFAULTS.width,
          height: NOTE_DEFAULTS.height,
          $createdAt: "",
          userId: current?.$id,
        });
      }}
    >
      {notes.map((note) => (
        <StickyNote note={note} />
      ))}
    </div>
  );
}

export default StickyNotesBoard;
