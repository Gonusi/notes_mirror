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

function SignupDialogMagicURL() {
  const { registerWithMagicURL } = useUser();
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
          registerWithMagicURL(email);
          handleClose();
        },
      }}
    >
      <DialogTitle>Signup</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter your email and we'll send you a login link. If you wish, you can
          later create a password too.
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

export default SignupDialogMagicURL;
