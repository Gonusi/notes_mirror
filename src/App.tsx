import Mirror from "./features/mirror/presentational/Mirror";
import store from "./redux/store.ts";
import { Provider } from "react-redux";
import StickyNotesContainer from "./features/stickyNotes/container/StickyNotesContainer.tsx";

function App() {
  return (
    <Provider store={store}>
      <div style={{ width: "100%", height: "100vh" }}>
        <Mirror />
        <StickyNotesContainer />
      </div>
    </Provider>
  );
}

export default App;
