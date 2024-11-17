import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import { useUser } from "../context/user.tsx";
import { useNavigate } from "react-router-dom";

function SignupDialog() {
  const { register } = useUser();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          const email = formJson.email;
          const password = formJson.password;
          register(email, password);
          handleClose();
        },
      }}
    >
      <DialogTitle>Signup</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You don't need to signup to use the app. Your data will still be
          saved, but only on your local browser. This has the benefit of the
          data not being sent to any server, however you will not be able to
          sync the data between devices this way. Once logged in, your notes
          will be saved to the server and you will be able to see them on any
          device after logging in.{" "}
        </DialogContentText>

        <DialogContentText>
          Please understand that this is a one man operation, so don't expect
          enterprise level security - don't put extremely sensitive information
          into the notes, like your passwords etc.
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
