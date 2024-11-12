import Header from "../presentational/Header.tsx";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store.ts";
import { toggleLoginDialog } from "../../../redux/reducers/ui.ts";

function HeaderContainer() {
  const dispatch = useDispatch<AppDispatch>();

  const handleLoginClick = () => {
    dispatch(toggleLoginDialog(true));
  };

  return <Header handleLoginClick={handleLoginClick} />;
}

export default HeaderContainer;
