import Header from "../presentational/Header.tsx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store.ts";
import {
  toggleLoginDialog,
  toggleSignupDialog,
} from "../../../redux/reducers/ui.ts";
import { RootState } from "../../../types.ts";
import { clearUserDetails } from "../../../redux/reducers/user.ts";

function HeaderContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const { email } = useSelector((state: RootState) => state.user);

  const handleLoginClick = () => {
    dispatch(toggleLoginDialog(true));
  };

  const handleSignupClick = () => {
    dispatch(toggleSignupDialog(true));
  };

  const handleLogoutClick = () => {
    dispatch(clearUserDetails());
  };

  return (
    <Header
      handleLoginClick={handleLoginClick}
      handleLogoutClick={handleLogoutClick}
      email={email}
      handleSignupClick={handleSignupClick}
    />
  );
}

export default HeaderContainer;
