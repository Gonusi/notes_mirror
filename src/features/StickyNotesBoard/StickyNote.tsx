/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useRef } from "react";
import Draggable, { DraggableEventHandler } from "react-draggable";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useNotes, Note } from "../../context/notes.tsx";

type Props = {
  note: Note;
};

const StickyNote: React.FC<Props> = ({ note }) => {
  const { updateNote, deleteNote } = useNotes();

  const [body, setBody] = useState(note.body || "");
  const [, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  useState(false);

  const noteRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setBody(note.body);
  }, [note.body]);

  const handleBlur = () => {
    updateNote({ ...note, body });
    setIsFocused(false);
  };

  const handleDragStop: DraggableEventHandler = (_, data) => {
    updateNote({
      ...note,
      x: data.x,
      y: data.y,
    });
  };

  const handleTextAreaMouseUp = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    const textareaWidth = e.currentTarget.offsetWidth;
    const textareaHeight = e.currentTarget.offsetHeight;

    if (textareaWidth != note.width || textareaHeight != note.height) {
      updateNote({
        ...note,
        width: textareaWidth,
        height: textareaHeight,
      });
    }
  };

  const handleDelete = (note: Note) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      deleteNote(note.$id);
    }
  };

  return (
    <Draggable
      defaultPosition={{ x: note.x, y: note.y }}
      onStop={handleDragStop}
      handle={`.dragHandle-${note.$id}`}
      nodeRef={noteRef}
    >
      <Box
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
        sx={{
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
        <Box
          sx={{
            cursor: "move",
            borderTopLeftRadius: "4px",
            padding: " 4px 8px",
            borderTopRightRadius: "4px",
            background: "#ffd170",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          className={`dragHandle-${note.$id}`}
        >
          <Typography fontSize={14} fontWeight={600}>
            {new Date(note.$createdAt).toLocaleDateString(navigator.language)}
          </Typography>
          <IconButton
            tabIndex={1}
            onClick={() => handleDelete(note)}
            size="small"
          >
            <CloseIcon htmlColor="black" fontSize="small" />
          </IconButton>
        </Box>

        <textarea
          ref={textareaRef}
          onMouseUp={handleTextAreaMouseUp}
          value={body}
          onChange={(e) => setBody(e.target.value)}
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
      </Box>
    </Draggable>
  );
};

export default StickyNote;
