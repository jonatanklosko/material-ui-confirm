import React, { Fragment, useState, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const defaultOptions = {
  title: 'Are you sure?',
  description: '',
  confirmationText: 'Ok',
  cancellationText: 'Cancel',
  dialogProps: {},
  onClose: () => {},
  onCancel: () => {},
};

const withConfirm = WrappedComponent => props => {
  const [onConfirm, setOnConfirm] = useState(null);
  const [options, setOptions] = useState(defaultOptions);
  const [args, setArgs] = useState([]);
  const {
    title,
    description,
    confirmationText,
    cancellationText,
    dialogProps,
    onClose,
    onCancel
  } = options;

  const handleClose = useCallback(() => {
    onClose();
    setOnConfirm(null);
  }, [onClose]);
  const handleCancel = useCallback(() => {
    onCancel();
    handleClose();
  }, [onCancel, handleClose]);
  const handleConfirm = useCallback(() => {
    onConfirm(...args);
    handleClose();
  }, [onConfirm, args, handleClose]);

  /* Returns function opening the dialog, passed to the wrapped component. */
  const confirm = useCallback((onConfirm, options = {}) => (...args) => {
    setOnConfirm(() => onConfirm);
    setOptions({ ...defaultOptions, ...options });
    setArgs(args);
  }, []);

  return (
    <Fragment>
      <WrappedComponent {...props} confirm={confirm} />
      <Dialog fullWidth {...dialogProps} open={!!onConfirm} onClose={handleCancel}>
        {title && (
          <DialogTitle>{title}</DialogTitle>
        )}
        {description && (
          <DialogContent>
            <DialogContentText>{description}</DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleCancel}>
            {cancellationText}
          </Button>
          <Button onClick={handleConfirm} color="primary">
            {confirmationText}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default withConfirm;
