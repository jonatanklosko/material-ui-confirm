import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const ConfirmationDialog = ({ open, options, onCancel, onConfirm, onClose }) => {
  const {
    title,
    description,
    content,
    confirmationText,
    cancellationText,
    dialogProps,
    dialogActionsProps,
    confirmationButtonProps,
    cancellationButtonProps,
    titleProps,
    contentProps,
    allowClose,
  } = options;

  return (
    <Dialog fullWidth {...dialogProps} open={open} onClose={allowClose ? onClose : null}>
      {title && (
        <DialogTitle {...titleProps}>{title}</DialogTitle>
      )}
      {content ? (
        <DialogContent {...contentProps}>
          {content}
        </DialogContent>
      ) : (
        description && (
          <DialogContent {...contentProps}>
            <DialogContentText>{description}</DialogContentText>
          </DialogContent>
        )
      )}
      <DialogActions {...dialogActionsProps}>
        <Button {...cancellationButtonProps} onClick={onCancel}>
          {cancellationText}
        </Button>
        <Button color="primary" {...confirmationButtonProps} onClick={onConfirm}>
          {confirmationText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
