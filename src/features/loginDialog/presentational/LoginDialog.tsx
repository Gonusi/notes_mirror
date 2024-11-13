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
  handleLogin: (email: string, password: string) => void;
  isOpen: boolean;
};

function LoginDialog({ handleClose, handleLogin, isOpen }: Props) {
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
          handleLogin(email, password);
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
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
}

export default LoginDialog;