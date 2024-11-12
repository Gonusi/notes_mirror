import { toggleLoginDialog } from "../../../redux/reducers/ui.ts";
import { AppDispatch } from "../../../redux/store.ts";
import { useDispatch, useSelector } from "react-redux";
import LoginDialog from "../presentational/LoginDialog.tsx";
import { RootState } from "../../../types.ts";

function LoginDialogContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoginDialogOpen } = useSelector((state: RootState) => state.ui);

  const handleClose = () => {
    dispatch(toggleLoginDialog(false));
  };

  return <LoginDialog handleClose={handleClose} isOpen={isLoginDialogOpen} />;
}

export default LoginDialogContainer;
