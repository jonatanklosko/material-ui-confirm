import React, { useState, useCallback, Fragment } from 'react';
import ConfirmContext from './ConfirmContext';
import ConfirmationDialog from './ConfirmationDialog';
import ConfirmDialogCancellationError from './ConfirmDialogCancellationError';

const DEFAULT_OPTIONS = {
  title: 'Are you sure?',
  description: '',
  confirmationText: 'Ok',
  cancellationText: 'Cancel',
  dialogProps: {},
  confirmationButtonProps: {},
  cancellationButtonProps: {},
  rejectionPayload: new ConfirmDialogCancellationError(),
};

const buildOptions = (defaultOptions, options) => {
  const dialogProps = {
    ...(defaultOptions.dialogProps || DEFAULT_OPTIONS.dialogProps),
    ...(options.dialogProps || {}),
  };
  const confirmationButtonProps = {
    ...(defaultOptions.confirmationButtonProps || DEFAULT_OPTIONS.confirmationButtonProps),
    ...(options.confirmationButtonProps || {}),
  };
  const cancellationButtonProps = {
    ...(defaultOptions.cancellationButtonProps || DEFAULT_OPTIONS.cancellationButtonProps),
    ...(options.cancellationButtonProps || {}),
  };

  const rejectionPayload = options.rejectionPayload || defaultOptions.rejectionPayload || DEFAULT_OPTIONS.rejectionPayload;

  return {
    ...DEFAULT_OPTIONS,
    ...defaultOptions,
    ...options,
    dialogProps,
    confirmationButtonProps,
    cancellationButtonProps,
    rejectionPayload,
  }
};

const ConfirmProvider = ({ children, defaultOptions = {} }) => {
  const [options, setOptions] = useState({ ...DEFAULT_OPTIONS, ...defaultOptions });
  const [resolveReject, setResolveReject] = useState([]);
  const [resolve, reject] = resolveReject;

  const confirm = useCallback((options = {}) => {
    return new Promise((resolve, reject) => {
      setOptions(buildOptions(defaultOptions, options));
      setResolveReject([resolve, reject]);
    });
  }, []);

  const handleClose = useCallback(() => {
    setResolveReject([]);
  }, []);

  const handleCancel = useCallback(() => {
    const rejectionPayload = typeof options.rejectionPayload === 'function'
      ? options.rejectionPayload()
      : options.rejectionPayload;
    reject(rejectionPayload);
    handleClose();
  }, [reject, handleClose]);

  const handleConfirm = useCallback(() => {
    resolve();
    handleClose();
  }, [resolve, handleClose]);

  return (
    <Fragment>
      <ConfirmContext.Provider value={confirm}>
        {children}
      </ConfirmContext.Provider>
      <ConfirmationDialog
        open={resolveReject.length === 2}
        options={options}
        onClose={handleClose}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </Fragment>
  );
};

export default ConfirmProvider;
