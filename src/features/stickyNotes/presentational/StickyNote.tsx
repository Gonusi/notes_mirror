import React, { useState, useEffect } from "react";
import { Note } from "../../../types";

type Props = {
  note: Note;
  onUpdateNote: (noteIndex: number, note: Note) => void;
  onDeleteNote: (noteIndex: number) => void;
  noteIndex: number;
};

const StickyNote: React.FC<Props> = ({
  note,
  onUpdateNote,
  noteIndex,
  onDeleteNote,
}) => {
  const [text, setText] = useState(note.text || "");

  useEffect(() => {
    setText(note.text);
  }, [note.text]);

  const handleBlur = () => {
    console.log("blur, will update note with", { ...note, text });
    onUpdateNote(noteIndex, { ...note, text });
  };

  return (
    <div
      style={{
        position: "absolute",
        top: note.y,
        left: note.x,
        border: "1px solid black",
        padding: "5px",
        backgroundColor: "yellow",
      }}
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleBlur}
      />
      <button onClick={() => onDeleteNote(noteIndex)}>Delete</button>
    </div>
  );
};

export default StickyNote;
