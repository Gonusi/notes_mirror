import StickyNote from "./StickyNote.tsx";
import { NOTE_DEFAULTS } from "./constants";
import { useNotes } from "../../context/notes.tsx";
import { useUser } from "../../context/user.tsx";
import IconButton from "@mui/material/IconButton";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function StickyNotesBoard() {
  const { notes, createNote } = useNotes();
  const { current } = useUser();
  const navigate = useNavigate();

  const handleCreateNote = (x = 200, y = 200) => {
    if (!current) {
      navigate("/login");
      return;
    }

    createNote({
      body: "",
      title: "",
      x,
      y,
      $id: `temp-${new Date().getTime().toString()}`,
      width: NOTE_DEFAULTS.width,
      height: NOTE_DEFAULTS.height,
      $createdAt: new Date().toString(),
      userId: current?.$id,
    });
  };

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

        handleCreateNote(e.clientX, e.clientY);
      }}
    >
      {notes.map((note) => (
        <StickyNote key={note.$id} note={note} />
      ))}
      <IconButton
        onClick={() => handleCreateNote()}
        aria-label="create note"
        sx={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          backgroundColor: "primary.main",
          color: "white",
          "&:hover": {
            backgroundColor: "primary.dark",
          },
          position: "fixed",
          bottom: 50,
          right: 50,
        }}
      >
        <Add htmlColor={"black"} fontSize={"large"} />
      </IconButton>
    </div>
  );
}

export default StickyNotesBoard;
