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
  closeOnParentUnmount: true,
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
  // We must accept 'false' values, if present.
  const closeOnParentUnmount = typeof options.closeOnParentUnmount !== 'undefined' ?
    options.closeOnParentUnmount :
    typeof defaultOptions.closeOnParentUnmount !== 'undefined' ?
      defaultOptions.closeOnParentUnmount :
      DEFAULT_OPTIONS.closeOnParentUnmount;

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
    closeOnParentUnmount,
  };
};

let confirmGlobal;

const ConfirmProvider = ({ children, defaultOptions = {} }) => {
  // State that we clear on close (to avoid dangling references to resolve and
  // reject). If this is null, the dialog is closed.
  const [state, setState] = useState(null);
  // Options for rendering the dialog, which aren't reset on close so that we
  // keep rendering the same modal during close animation
  const [options, setOptions] = useState({});
  const [key, setKey] = useState(0);

  const dialogOptions = buildOptions(defaultOptions, options ?? {});

  const confirmBase = useCallback((parentId, options = {}) => {
    return new Promise((resolve, reject) => {
      setKey((key) => key + 1);
      setOptions(options);
      setState({resolve, reject, parentId});
    });
  }, []);

  const closeOnParentUnmount = useCallback((parentId) => {
    setState((state) => {
      if (dialogOptions.closeOnParentUnmount && state && state.parentId === parentId) {
        return null;
      } else {
        return state;
      }
    });
  }, []);

  const handleClose = useCallback(() => {
    setState(null);
  }, []);

  const handleCancel = useCallback(() => {
    setState((state) => {
      state && state.reject();
      return null;
    });
  }, []);

  const handleConfirm = useCallback(() => {
    setState((state) => {
      state && state.resolve();
      return null;
    });
  }, []);

  confirmGlobal = useCallback((options) => {
    return confirmBase("global", options);
  });

  return (
    <Fragment>
      <ConfirmContext.Provider value={{ confirmBase, closeOnParentUnmount }}>
        {children}
      </ConfirmContext.Provider>
      <ConfirmationDialog
        key={key}
        open={state !== null}
        options={dialogOptions}
        onClose={handleClose}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </Fragment>
  );
};

export default ConfirmProvider;
export { confirmGlobal as confirm };
