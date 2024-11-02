/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useRef } from "react";
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
  const [isMouseOverTextareaResizeHandle, setIsMouseOverTextareaResizeHandle] =
    useState(false);

  const noteRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setText(note.text);
  }, [note.text]);

  const handleBlur = () => {
    onUpdateNote(noteIndex, { ...note, text });
    setIsFocused(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (noteRef.current) {
      const rect = noteRef.current.getBoundingClientRect();

      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top;

      const isAtRightBottomCorner =
        relativeX >= note.width - 30 &&
        relativeX <= note.width &&
        relativeY >= note.height - 30 &&
        relativeY <= note.height;

      setIsMouseOverTextareaResizeHandle(isAtRightBottomCorner);
    }
  };

  const handleDragStop: DraggableEventHandler = (_, data) => {
    console.log("will update note due to dragStop");
    onUpdateNote(noteIndex, {
      ...note,
      x: data.x,
      y: data.y,
    });
  };

  const handleTextAreaMouseUp = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    const textareaWidth = e.currentTarget.offsetWidth;
    const textareaHeight = e.currentTarget.offsetHeight;

    console.log("Textarea dimensions:", {
      width: textareaWidth,
      height: textareaHeight,
    });

    if (textareaWidth != note.width || textareaHeight != note.height) {
      onUpdateNote(noteIndex, {
        ...note,
        width: textareaWidth,
        height: textareaHeight,
      });
    }
  };

  return (
    <Draggable
      defaultPosition={{ x: note.x, y: note.y }}
      onStop={handleDragStop}
      disabled={isMouseOverTextareaResizeHandle}
    >
      <div
        ref={noteRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsMouseOverTextareaResizeHandle(false);
        }}
        onFocus={() => {
          setIsFocused(true);
        }}
        style={{
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
            top: -15,
          }}
          onClick={() => onDeleteNote(noteIndex)}
        >
          ✖
        </button>
        <textarea
          ref={textareaRef}
          onMouseUp={handleTextAreaMouseUp}
          css={css`
            background-color: yellow;
            border: none;
            border-radius: 4px;
            box-shadow: 2px 2px 0px black;
            width: ${note.width}px;
            height: ${note.height}px;
            resize: both; // Allow resizing in both directions

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
