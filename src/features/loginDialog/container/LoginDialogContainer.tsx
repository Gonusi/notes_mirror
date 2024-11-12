import { toggleLoginDialog } from "../../../redux/reducers/ui.ts";
import { AppDispatch } from "../../../redux/store.ts";
import { useDispatch, useSelector } from "react-redux";
import LoginDialog from "../presentational/LoginDialog.tsx";
import { RootState } from "../../../types.ts";
import { setUserDetails } from "../../../redux/reducers/user.ts";

function LoginDialogContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoginDialogOpen } = useSelector((state: RootState) => state.ui);

  const handleClose = () => {
    dispatch(toggleLoginDialog(false));
  };

  const handleLogin = (email: string) => {
    dispatch(setUserDetails({ email, name: "John Doe", id: "123" }));
  };

  return (
    <LoginDialog
      handleLogin={handleLogin}
      handleClose={handleClose}
      isOpen={isLoginDialogOpen}
    />
  );
}

export default LoginDialogContainer;
