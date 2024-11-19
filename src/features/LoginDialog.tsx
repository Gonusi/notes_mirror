import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Link,
} from "@mui/material";
import Button from "@mui/material/Button";
import { useUser } from "../context/user.tsx";
import { Link as RouterLink, useNavigate } from "react-router-dom";

function LoginDialog() {
  const { login } = useUser();
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
          login(email, password);
          handleClose();
        },
      }}
    >
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter your email. You'll receive a link which will log you in
          automatically. No password needed.
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
        <Link
          fontSize={"small"}
          sx={{ marginRight: "auto", ml: 1 }}
          component={RouterLink}
          to={"/signup"}
        >
          Not a user? Click here to Sign Up!
        </Link>
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

export default LoginDialog;
