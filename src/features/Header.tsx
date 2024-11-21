import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useUser } from "../context/user.tsx";
import { Link } from "react-router-dom";
import { grey } from "@mui/material/colors";

function Header() {
  const { current, logout } = useUser();

  return (
    <AppBar
      position="static"
      sx={{
        position: "sticky",
        top: 0,
        left: 0,
        zIndex: 1000,
        backgroundColor: `rgba(0, 0, 0, 0.1)`,
        color: grey["800"],
      }}
    >
      <Toolbar variant={"dense"}>
        {/*<IconButton*/}
        {/*  size="small"*/}
        {/*  edge="start"*/}
        {/*  color="inherit"*/}
        {/*  aria-label="menu"*/}
        {/*  sx={{ mr: 2 }}*/}
        {/*>*/}
        {/*  <MenuIcon />*/}
        {/*</IconButton>*/}

        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontStyle: "italic" }}
        >
          Notes & Mirror {current?.email && `| ${current.email}`}
        </Typography>

        {!current?.email && (
          <Button component={Link} color="inherit" to={"/login"}>
            Login
          </Button>
        )}

        {!current?.email && (
          <Button component={Link} color="inherit" to={"/signup"}>
            Signup
          </Button>
        )}

        {current?.email && (
          <Button onClick={logout} color="inherit">
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
