import React, { useState, useEffect } from "react";
import { Note } from "../../../types";
import { css } from "@emotion/react";
import Draggable, { DraggableEventHandler } from "react-draggable";

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
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setText(note.text);
  }, [note.text]);

  const handleBlur = () => {
    onUpdateNote(noteIndex, { ...note, text });
    setIsFocused(false);
  };

  const handleDragStop: DraggableEventHandler = (_, data) => {
    onUpdateNote(noteIndex, {
      ...note,
      x: data.x,
      y: data.y,
    });
  };

  return (
    <Draggable
      defaultPosition={{ x: note.x, y: note.y }}
      onStop={handleDragStop}
    >
      <div
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
        onFocus={() => {
          setIsFocused(true);
        }}
        style={{
          paddingTop: "30px",
          position: "absolute",
          borderRadius: "4px",
        }}
      >
        <button
          style={{
            borderRadius: "100%",
            width: 30,
            height: 30,
            alignItems: "center",
            justifyContent: "center",
            display: isHovered || isFocused ? "flex" : "none",
            position: "absolute",
            right: -15,
            top: 15,
          }}
          onClick={() => onDeleteNote(noteIndex)}
        >
          ✖
        </button>
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
      </div>
    </Draggable>
  );
};

export default StickyNote;
