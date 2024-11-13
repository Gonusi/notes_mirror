import { toggleLoginDialog } from "../../../redux/reducers/ui.ts";
import { AppDispatch } from "../../../redux/store.ts";
import { useDispatch, useSelector } from "react-redux";
import LoginDialog from "../presentational/LoginDialog.tsx";
import { RootState } from "../../../types.ts";
import { setUserDetails } from "../../../redux/reducers/user.ts";
import { client } from "../../../appwrite/appwrite.ts";
import { Account } from "appwrite";
import { useState } from "react";

function LoginDialogContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoginDialogOpen } = useSelector((state: RootState) => state.ui);
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    dispatch(toggleLoginDialog(false));
  };

  const handleLogin = async (email: string, password: string) => {
    const account = new Account(client);

    try {
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      dispatch(
        setUserDetails({ email: user.email, name: user.name, id: user.$id }),
      );
    } catch (error: unknown) {
      console.log("error", error);
      setError("Invalid email or password");
    }
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
