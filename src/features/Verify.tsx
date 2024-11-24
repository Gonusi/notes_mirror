import { useEffect, useRef } from "react";
import { useUser } from "../context/user.tsx";
import Toast from "./Toast/Toast.tsx";
import { useNavigate } from "react-router-dom";

function Verify() {
  const urlParams = new URLSearchParams(window.location.search);
  const secret = urlParams.get("secret");
  const userId = urlParams.get("userId");

  const { current, loginWithSecret } = useUser();
  const navigate = useNavigate();
  const isLoginCalled = useRef(false);

  useEffect(() => {
    if (!userId || !secret) {
      Toast.error(
        "It seems your login link is not valid. Please double check your link.",
      );
      return;
    }

    if (!current && !isLoginCalled.current) {
      isLoginCalled.current = true;
      loginWithSecret(userId, secret);
      navigate("/");
    }
  }, [secret, userId, isLoginCalled]);

  // Not sure if I wish to show something here yet, if not, consider moving to a hook or similar
  return null;
}

export default Verify;
