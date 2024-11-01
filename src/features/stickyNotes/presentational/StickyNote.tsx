import React, { useState, useEffect } from "react";
import { Note } from "../../../types";
import { css } from "@emotion/react";
import Draggable from "react-draggable";

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
    onUpdateNote(noteIndex, { ...note, text });
  };

  return (
    <Draggable defaultPosition={{ x: note.x, y: note.y }}>
      <div
        style={{
          background: "red",
          paddingTop: "30px",
          position: "absolute",
          borderRadius: "4px",
        }}
      >
        <textarea
          css={css`
            background-color: yellow;
            border: none;
            border-radius: 4px;
            box-shadow: 2px 2px 0px black;
            width: ${note.width}px;
            height: ${note.height}px;

            &:focus {
              box-shadow: 4px 4px 0px black;
            }
          `}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleBlur}
        />
        <button onClick={() => onDeleteNote(noteIndex)}>Delete</button>
      </div>
    </Draggable>
  );
};

export default StickyNote;
