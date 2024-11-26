import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Link,
} from "@mui/material";
import Button from "@mui/material/Button";
import { useUser } from "../../../context/user";
import { Link as RouterLink } from "react-router-dom";

type Props = {
  handleClose: () => void;
};

function ContentWithMagicURL({ handleClose }: Props) {
  // Register and login use the same action in this case
  const { registerWithMagicURL } = useUser(); // TODO I think we could avoid register and use login syntax (now we have loginWithSecret but it requires userId as arg?)

  return (
    <form
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());
        const email = formJson.email;
        registerWithMagicURL(email);
        handleClose();
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
          Send login link
        </Button>
      </DialogActions>
    </form>
  );
}

export default ContentWithMagicURL;
