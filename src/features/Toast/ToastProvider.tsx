// ToastProvider.tsx
import React, { useState, useEffect } from "react";
import Toast from "./Toast";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastEventDetail {
  type: ToastType;
  message: string;
}

interface ToastWithKey extends ToastEventDetail {
  key: number;
}

function ToastProvider() {
  const [toasts, setToasts] = useState<ToastWithKey[]>([]);

  useEffect(() => {
    const handleToast = (event: Event) => {
      const customEvent = event as CustomEvent<ToastEventDetail>;
      const toast = customEvent.detail;
      setToasts((prevToasts) => [
        ...prevToasts,
        { ...toast, key: new Date().getTime() + Math.random() },
      ]);
    };

    Toast.addEventListener(handleToast);

    return () => {
      Toast.removeEventListener(handleToast);
    };
  }, []);

  const handleClose =
    (key: number) =>
    (_: Event | React.SyntheticEvent, reason?: SnackbarCloseReason) => {
      if (reason === "clickaway") {
        return;
      }
      setToasts((prevToasts) =>
        prevToasts.filter((toast) => toast.key !== key),
      );
    };

  return (
    <>
      {toasts.map((toast) => (
        <Snackbar
          key={toast.key}
          open
          autoHideDuration={6000}
          onClose={handleClose(toast.key)}
        >
          <Alert
            onClose={handleClose(toast.key)}
            severity={toast.type}
            sx={{ width: "100%" }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
}

export default ToastProvider;
