import Mirror from "./features/mirror/presentational/Mirror";
import store from "./redux/store.ts";
import { Provider } from "react-redux";
import StickyNotesContainer from "./features/stickyNotes/container/StickyNotesContainer.tsx";
import CssBaseline from "@mui/material/CssBaseline";
import HeaderContainer from "./features/header/container/HeaderContainer.tsx";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import { APP_BAR_HEIGHT } from "./constants.ts";
import LoginDialogContainer from "./features/loginDialog/container/LoginDialogContainer.tsx";
import SignupDialogContainer from "./features/signupDialog/container/SignupDialogContainer.tsx";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={darkTheme}>
        <Provider store={store}>
          <HeaderContainer />
          <Box
            sx={{
              width: "100%",
              height: `calc(100vh - ${APP_BAR_HEIGHT}px)`,
              position: "relative",
            }}
          >
            {/*<Mirror />*/}
            <StickyNotesContainer />
          </Box>
          <LoginDialogContainer />
          <SignupDialogContainer />
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
