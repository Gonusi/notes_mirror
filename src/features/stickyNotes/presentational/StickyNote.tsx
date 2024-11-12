/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useRef } from "react";
import { Note } from "../../../types";
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
  const [, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
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

  // const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  //   if (noteRef.current) {
  //     const rect = noteRef.current.getBoundingClientRect();
  //
  //     const relativeX = e.clientX - rect.left;
  //     const relativeY = e.clientY - rect.top;
  //
  //     const isAtRightBottomCorner =
  //       relativeX >= note.width - 30 &&
  //       relativeX <= note.width &&
  //       relativeY >= note.height - 30 &&
  //       relativeY <= note.height;
  //
  //     setIsMouseOverTextareaResizeHandle(isAtRightBottomCorner);
  //   }
  // };

  const handleDragStop: DraggableEventHandler = (_, data) => {
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
      handle={`.dragHandle-${note.id}`}
      nodeRef={noteRef}
    >
      <div
        ref={noteRef}
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
          position: "absolute",
          backgroundColor: "yellow",
          border: "none",
          borderRadius: "4px",
          boxShadow: isFocused ? "3px 3px 1px black" : "2px 2px 0px black",
          padding: "0",
          display: "flex",
          flexDirection: "column",
          borderBottomLeftRadius: "4px",
          borderBottomRightRadius: "4px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            cursor: "move",
            borderTopLeftRadius: "4px",
            padding: " 4px 8px",
            borderTopRightRadius: "4px",
            background: "#ffd170",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          className={`dragHandle-${note.id}`}
        >
          {new Date(note.id).toLocaleDateString(navigator.language)}
          <button
            tabIndex={1}
            style={{
              width: 26,
              height: 26,
              alignItems: "center",
              justifyContent: "center",
              background: "transparent",
              border: "none",
              borderRadius: "4px",
              position: "absolute",
              right: 0,
              top: 0,
              cursor: "pointer",
            }}
            onClick={() => onDeleteNote(noteIndex)}
          >
            ✖
          </button>
        </div>

        <textarea
          ref={textareaRef}
          onMouseUp={handleTextAreaMouseUp}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleBlur}
          tabIndex={0}
          style={{
            width: `${note.width}px`,
            height: `${note.height}px`,
            border: "none",
            outline: "none",
            padding: "8px",
            backgroundColor: "#ffdd99",
          }}
        />
      </div>
    </Draggable>
  );
};

export default StickyNote;
