import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

type Props = {
  email: string | null;
  handleLoginClick: () => void;
  handleLogoutClick: () => void;
};

function Header({ handleLoginClick, handleLogoutClick, email }: Props) {
  return (
    <AppBar
      position="static"
      sx={{ position: "sticky", top: 0, left: 0, zIndex: 1000 }}
    >
      <Toolbar variant={"dense"}>
        <IconButton
          size="small"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Notes & Mirror {email && `| ${email}`}
        </Typography>

        {!email && (
          <Button onClick={handleLoginClick} color="inherit">
            Login
          </Button>
        )}

        {email && (
          <Button onClick={handleLogoutClick} color="inherit">
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
