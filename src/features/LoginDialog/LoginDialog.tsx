import { Box, Dialog, Tab, Tabs } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ContentWithPassword from "./components/ContentWithPassword.tsx";
import { useState } from "react";
import ContentWithMagicURL from "./components/ContentWithMagicURL.tsx";

enum LoginTab {
  magicURL = "magicURL",
  password = "password",
}

function LoginDialogWithPassword() {
  const navigate = useNavigate();

  const [currTab, setCurrTab] = useState(LoginTab.magicURL);

  const handleClose = () => {
    navigate("/");
  };

  const handleChange = (_: unknown, newTab: LoginTab) => {
    setCurrTab(newTab);
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", pl: 1, pr: 1 }}>
        <Tabs
          value={currTab}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Magic email link" value={LoginTab.magicURL} />
          <Tab label="Password" value={LoginTab.password} />
        </Tabs>
      </Box>

      {currTab === LoginTab.magicURL && (
        <ContentWithMagicURL handleClose={handleClose} />
      )}

      {currTab === LoginTab.password && (
        <ContentWithPassword handleClose={handleClose} />
      )}
    </Dialog>
  );
}

export default LoginDialogWithPassword;
