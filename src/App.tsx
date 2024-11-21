import Mirror from "./features/Mirror";
import StickyNotesBoard from "./features/StickyNotesBoard";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./features/Header";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import { APP_BAR_HEIGHT } from "./constants.ts";
import LoginDialog from "./features/LoginDialog.tsx";
import SignupDialog from "./features/SignupDialog.tsx";
import { UserProvider } from "./context/user.tsx";
import { NotesProvider } from "./context/notes.tsx";
import { Outlet, Route, Routes } from "react-router-dom";
import ToastProvider from "./features/Toast/ToastProvider.tsx";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <>
      <ToastProvider />
      <UserProvider>
        <NotesProvider>
          <CssBaseline />
          <ThemeProvider theme={darkTheme}>
            <Header />
            <Routes>
              <Route path={"/"} element={<CommonLayout />}>
                <Route path={"/login"} element={<LoginDialog />} />
                <Route path={"/signup"} element={<SignupDialog />} />
              </Route>
            </Routes>
          </ThemeProvider>
        </NotesProvider>
      </UserProvider>
    </>
  );
}

export default App;

function CommonLayout() {
  return (
    <Box
      sx={{
        background: "black",
        width: "100%",
        height: `calc(100vh - ${APP_BAR_HEIGHT}px)`,
        position: "relative",
      }}
    >
      <Mirror />
      <StickyNotesBoard />
      <Outlet />
    </Box>
  );
}
