import React, { useCallback } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ConfirmationDialog = ({ open, options, onCancel, onConfirm, onClose }) => {
  const {
    title,
    description,
    content,
    confirmationText,
    cancellationText,
    dialogProps,
    confirmationButtonProps,
    cancellationButtonProps,
    titleProps,
    contentProps,
  } = options;

  return (
    <Dialog fullWidth {...dialogProps} open={open} onClose={onClose}>
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
      <DialogActions>
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
