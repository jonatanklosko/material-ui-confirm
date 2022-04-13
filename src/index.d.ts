import * as React from 'react';
import { DialogProps } from '@mui/material/Dialog';
import { DialogTitleProps } from '@mui/material/DialogTitle';
import { DialogContentProps } from '@mui/material/DialogContent';
import { ButtonProps } from '@mui/material/Button';

export interface ConfirmOptions {
  title?: React.ReactNode;
  titleProps?: DialogTitleProps;
  description?: React.ReactNode;
  content?: React.ReactNode | null;
  contentProps?: DialogContentProps;
  confirmationText?: React.ReactNode;
  cancellationText?: React.ReactNode;
  dialogProps?: Omit<DialogProps, "open">;
  confirmationButtonProps?: ButtonProps;
  cancellationButtonProps?: ButtonProps;
  allowClose?: boolean;
}

export interface ConfirmProviderProps {
  children: React.ReactNode;
  defaultOptions?: ConfirmOptions;
}

export const ConfirmProvider: React.ComponentType<ConfirmProviderProps>;

export const useConfirm: () => (options?: ConfirmOptions) => Promise<void>;
