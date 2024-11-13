import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";

type Props = {
  handleClose: () => void;
  handleSignup: (email: string, password: string) => void;
  isOpen: boolean;
};

function SignupDialog({ handleClose, handleSignup, isOpen }: Props) {
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          const email = formJson.email;
          const password = formJson.password;
          handleSignup(email, password);
          handleClose();
        },
      }}
    >
      <DialogTitle>Signup</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <p>
            You don't need to signup to use the app. Your data will still be
            saved, but only on your local browser. This has the benefit of the
            data not being sent to any server, however you will not be able to
            sync the data between devices this way. Once logged in, your notes
            will be saved to the server and you will be able to see them on any
            device after logging in.{" "}
          </p>
          <p>
            Please understand that this is a one man operation, so don't expect
            enterprise level security - don't put extremely sensitive
            information into the notes, like your passwords etc.
          </p>
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          name="email"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />

        <TextField
          required
          margin="dense"
          name="password"
          label="Password"
          type="password"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
}

export default SignupDialog;
