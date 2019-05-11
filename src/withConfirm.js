import React, { Fragment, useState, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const withConfirm = WrappedComponent => props => {
  const [onConfirm, setOnConfirm] = useState(null);
  const [message, setMessage] = useState('');
  const closeDialog = useCallback(() => setOnConfirm(null), []);
  const confirmAndCloseDialog = useCallback((...args) => {
    onConfirm(...args);
    closeDialog();
  }, [onConfirm]);
  const confirm = useCallback((onConfirm, message) => () => {
    setOnConfirm(() => onConfirm);
    setMessage(message);
  }, []);

  return (
    <Fragment>
      <WrappedComponent {...props} confirm={confirm} />
      <Dialog open={!!onConfirm} onClose={closeDialog} fullWidth>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>
            No
          </Button>
          <Button onClick={confirmAndCloseDialog} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default withConfirm;
