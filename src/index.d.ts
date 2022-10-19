import * as React from "react";
import { DialogProps } from "@mui/material/Dialog";
import { DialogActionsProps } from "@mui/material/DialogActions";
import { DialogTitleProps } from "@mui/material/DialogTitle";
import { DialogContentProps } from "@mui/material/DialogContent";
import { ButtonProps } from "@mui/material/Button";
import { TextFieldProps } from "@mui/material/TextField";

export interface ConfirmOptions {
  title?: React.ReactNode;
  titleProps?: DialogTitleProps;
  description?: React.ReactNode;
  content?: React.ReactNode | null;
  contentProps?: DialogContentProps;
  confirmationText?: React.ReactNode;
  cancellationText?: React.ReactNode;
  dialogProps?: Omit<DialogProps, "open">;
  dialogActionsProps?: DialogActionsProps;
  confirmationButtonProps?: ButtonProps;
  cancellationButtonProps?: ButtonProps;
  allowClose?: boolean;
  getConfirmationKeywordPlaceholder?: (keyword: string) => string;
  confirmationKeyword?: string;
  confirmationKeywordTextFieldProps?: TextFieldProps;
}

export interface ConfirmProviderProps {
  children: React.ReactNode;
  defaultOptions?: ConfirmOptions;
}

export const ConfirmProvider: React.ComponentType<ConfirmProviderProps>;

export const useConfirm: () => (options?: ConfirmOptions) => Promise<void>;
