import React, { useCallback } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ConfirmationDialog = ({ open, options, onCancel, onConfirm }) => {
  const {
    title,
    description,
    confirmationText,
    cancellationText,
    dialogProps,
  } = options;

  return (
    <Dialog fullWidth {...dialogProps} open={open} onClose={onCancel}>
      {title && (
        <DialogTitle>{title}</DialogTitle>
      )}
      {description && (
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={onCancel}>
          {cancellationText}
        </Button>
        <Button onClick={onConfirm} color="primary">
          {confirmationText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
