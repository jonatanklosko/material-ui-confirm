import { createContext } from "react";

export default createContext({
  confirmBase() {
    throw new Error("Missing ConfirmProvider");
  },
  closeOnParentUnmount() {},
});
