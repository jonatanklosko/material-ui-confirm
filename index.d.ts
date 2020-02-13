import { DialogProps } from "@material-ui/core/Dialog";
import React from "react";

interface WithConfirmOptions {
  title?: React.ReactNode;
  description?: React.ReactNode;
  confirmationText?: React.ReactNode;
  cancellationText?: React.ReactNode;
  dialogProps?: DialogProps;
  onClose?(): void;
  onCancel?(): void;
}
export interface WithConfirmProps {
  confirm(onConfirm: () => void, options: WithConfirmOptions): () => void;
}
declare const withConfirm: <T extends WithConfirmProps = WithConfirmProps>(
  WrappedComponent: React.ComponentType<T>,
) => React.ComponentType<Omit<T, "confirm">>;
 
export default withConfirm;
