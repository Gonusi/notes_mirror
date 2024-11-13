import { toggleSignupDialog } from "../../../redux/reducers/ui.ts";
import { AppDispatch } from "../../../redux/store.ts";
import { useDispatch, useSelector } from "react-redux";
import SignupDialog from "../presentational/SignupDialog.tsx";
import { RootState } from "../../../types.ts";
import { client } from "../../../appwrite/appwrite.ts";
import { Account, ID } from "appwrite";

function SignupDialogContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const { isSignupDialogOpen } = useSelector((state: RootState) => state.ui);

  const handleClose = () => {
    dispatch(toggleSignupDialog(false));
  };

  const handleSignup = async (email: string, password: string) => {
    const account = new Account(client);

    const promise = account.create(ID.unique(), email, password);

    promise.then(
      function (response) {
        console.log(response); // Success
      },
      function (error) {
        console.log(error); // Failure
      },
    );
  };

  return (
    <SignupDialog
      handleSignup={handleSignup}
      handleClose={handleClose}
      isOpen={isSignupDialogOpen}
    />
  );
}

export default SignupDialogContainer;
