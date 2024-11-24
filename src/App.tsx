import Mirror from "./features/Mirror";
import StickyNotesBoard from "./features/StickyNotesBoard";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./features/Header";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import { APP_BAR_HEIGHT } from "./constants";
import LoginDialog from "./features/LoginDialog";
import { UserProvider } from "./context/user.tsx";
import { NotesProvider } from "./context/notes";
import { Outlet, Route, Routes } from "react-router-dom";
import ToastProvider from "./features/Toast/ToastProvider";
import SignupDialogMagicURL from "./features/SignupDialogMagicURL";
import Verify from "./features/Verify";

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
                <Route path={"/verify"} element={<Verify />} />
                <Route path={"/login"} element={<LoginDialog />} />
                <Route path={"/signup"} element={<SignupDialogMagicURL />} />
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
