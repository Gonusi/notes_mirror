import Mirror from "./components/Mirror";
import { Box } from "@mui/material";
import StickyNotesBoard from "./components/StickyNotesBoard.tsx";

function App() {
  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <Mirror />
      <StickyNotesBoard />
    </Box>
  );
}

export default App;
