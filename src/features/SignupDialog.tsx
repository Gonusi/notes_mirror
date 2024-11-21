import {
  Alert,
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
import CheckIcon from "@mui/icons-material/Check";

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
          Signup is very simple and uses just your email address and password
          combination. We will not use your email for anything but updates about
          this app.
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
      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" type="submit">
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SignupDialog;
