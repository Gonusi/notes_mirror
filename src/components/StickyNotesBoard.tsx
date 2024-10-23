import { Box } from "@mui/material";

function StickyNotesBoard() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        border: "10px solid black",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: "2",
      }}
    ></Box>
  );
}

export default StickyNotesBoard;
