import React, { useState, useCallback, Fragment, useEffect } from "react";
import ConfirmContext from "./ConfirmContext";
import ConfirmationDialog from "./ConfirmationDialog";

const DEFAULT_OPTIONS = {
  title: "Are you sure?",
  description: "",
  content: null,
  confirmationText: "Ok",
  cancellationText: "Cancel",
  dialogProps: {},
  dialogActionsProps: {},
  confirmationButtonProps: {},
  cancellationButtonProps: {},
  titleProps: {},
  contentProps: {},
  allowClose: true,
  confirmationKeywordTextFieldProps: {},
  hideCancelButton: false,
  buttonOrder: ["cancel", "confirm"],
  acknowledgement: false,
  acknowledgementFormControlLabelProps: {},
  acknowledgementCheckboxProps: {},
};

const buildOptions = (defaultOptions, options) => {
  const dialogProps = {
    ...(defaultOptions.dialogProps || DEFAULT_OPTIONS.dialogProps),
    ...(options.dialogProps || {}),
  };
  const dialogActionsProps = {
    ...(defaultOptions.dialogActionsProps ||
      DEFAULT_OPTIONS.dialogActionsProps),
    ...(options.dialogActionsProps || {}),
  };
  const confirmationButtonProps = {
    ...(defaultOptions.confirmationButtonProps ||
      DEFAULT_OPTIONS.confirmationButtonProps),
    ...(options.confirmationButtonProps || {}),
  };
  const cancellationButtonProps = {
    ...(defaultOptions.cancellationButtonProps ||
      DEFAULT_OPTIONS.cancellationButtonProps),
    ...(options.cancellationButtonProps || {}),
  };
  const titleProps = {
    ...(defaultOptions.titleProps || DEFAULT_OPTIONS.titleProps),
    ...(options.titleProps || {}),
  };
  const contentProps = {
    ...(defaultOptions.contentProps || DEFAULT_OPTIONS.contentProps),
    ...(options.contentProps || {}),
  };
  const confirmationKeywordTextFieldProps = {
    ...(defaultOptions.confirmationKeywordTextFieldProps ||
      DEFAULT_OPTIONS.confirmationKeywordTextFieldProps),
    ...(options.confirmationKeywordTextFieldProps || {}),
  };
  const acknowledgementFormControlLabelProps = {
    ...(defaultOptions.acknowledgementFormControlLabelProps ||
      DEFAULT_OPTIONS.acknowledgementFormControlLabelProps),
    ...(options.acknowledgementFormControlLabelProps || {}),
  };
  const acknowledgementCheckboxProps = {
    ...(defaultOptions.acknowledgementCheckboxProps ||
      DEFAULT_OPTIONS.acknowledgementCheckboxProps),
    ...(options.acknowledgementCheckboxProps || {}),
  };

  return {
    ...DEFAULT_OPTIONS,
    ...defaultOptions,
    ...options,
    dialogProps,
    dialogActionsProps,
    confirmationButtonProps,
    cancellationButtonProps,
    titleProps,
    contentProps,
    confirmationKeywordTextFieldProps,
    acknowledgementFormControlLabelProps,
    acknowledgementCheckboxProps,
  };
};

let confirmGlobal;

const ConfirmProvider = ({ children, defaultOptions = {} }) => {
  const [options, setOptions] = useState({});
  const [resolveReject, setResolveReject] = useState([]);
  const [key, setKey] = useState(0);
  const [resolve, reject] = resolveReject;

  const confirm = useCallback((options = {}) => {
    return new Promise((resolve, reject) => {
      setKey((key) => key + 1);
      setOptions(options);
      setResolveReject([resolve, reject]);
    });
  }, []);

  const handleClose = useCallback(() => {
    setResolveReject([]);
  }, []);

  const handleCancel = useCallback(() => {
    if (reject) {
      reject();
      handleClose();
    }
  }, [reject, handleClose]);

  const handleConfirm = useCallback(() => {
    if (resolve) {
      resolve();
      handleClose();
    }
  }, [resolve, handleClose]);

  confirmGlobal = confirm;

  return (
    <Fragment>
      <ConfirmContext.Provider value={confirm}>
        {children}
      </ConfirmContext.Provider>
      <ConfirmationDialog
        key={key}
        open={resolveReject.length === 2}
        options={buildOptions(defaultOptions, options)}
        onClose={handleClose}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </Fragment>
  );
};

export default ConfirmProvider;
export { confirmGlobal as confirm };
