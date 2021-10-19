import * as React from 'react';
import { DialogProps } from '@material-ui/core/Dialog';
import { DialogTitleProps } from '@material-ui/core/DialogTitle';
import { DialogContentProps } from '@material-ui/core/DialogContent';
import { ButtonProps } from '@material-ui/core/Button';

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
}

export interface ConfirmProviderProps {
  defaultOptions?: ConfirmOptions;
}

export const ConfirmProvider: React.ComponentType<ConfirmProviderProps>;

export const useConfirm: () => (options?: ConfirmOptions) => Promise<void>;
