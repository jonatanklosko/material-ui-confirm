import * as React from 'react';
import { DialogProps } from '@material-ui/core/Dialog';

export interface ConfirmOptions {
  title?: string;
  description?: string;
  confirmationText?: string;
  cancellationText?: string;
  dialogProps?: DialogProps;
}

export interface ConfirmProviderProps {
  defaultOptions?: ConfirmOptions;
}

export const ConfirmProvider: React.ComponentType<ConfirmProviderProps>;

export const useConfirm: () => (options?: ConfirmOptions) => Promise<void>;
