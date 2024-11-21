type ToastType = "success" | "error" | "info" | "warning";

interface ToastEventDetail {
  type: ToastType;
  message: string;
}

class ToastEmitter {
  private eventTarget: EventTarget;

  constructor() {
    this.eventTarget = new EventTarget();
  }

  success(message: string) {
    const event = new CustomEvent<ToastEventDetail>("toast", {
      detail: { type: "success", message },
    });
    this.eventTarget.dispatchEvent(event);
  }

  error(message: string) {
    const event = new CustomEvent<ToastEventDetail>("toast", {
      detail: { type: "error", message },
    });
    this.eventTarget.dispatchEvent(event);
  }

  info(message: string) {
    const event = new CustomEvent<ToastEventDetail>("toast", {
      detail: { type: "info", message },
    });
    this.eventTarget.dispatchEvent(event);
  }

  warning(message: string) {
    const event = new CustomEvent<ToastEventDetail>("toast", {
      detail: { type: "warning", message },
    });
    this.eventTarget.dispatchEvent(event);
  }

  addEventListener(listener: (event: CustomEvent<ToastEventDetail>) => void) {
    this.eventTarget.addEventListener("toast", listener as EventListener);
  }

  removeEventListener(
    listener: (event: CustomEvent<ToastEventDetail>) => void,
  ) {
    this.eventTarget.removeEventListener("toast", listener as EventListener);
  }
}

const Toast = new ToastEmitter();

export default Toast;
