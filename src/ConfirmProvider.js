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
  const [state, setState] = useState(null);
  const [key, setKey] = useState(0);

  const confirmBase = useCallback((parentId, options = {}) => {
    return new Promise((resolve, reject) => {
      setKey((key) => key + 1);
      setState({ options, resolve, reject, parentId, open: true });
    });
  }, []);

  const closeOnParentUnmount = useCallback((parentId) => {
    setState((state) => {
      if (state && state.parentId === parentId) {
        return {...state, open: false};
      } else {
        return state;
      }
    });
  }, []);

  const handleClose = useCallback(() => {
    setState((state) => ({...state, open: false}));
  }, []);

  const handleCancel = useCallback(() => {
    setState((state) => {
      state && state.reject();
      return {...state, open: false};
    });
  }, []);

  const handleConfirm = useCallback(() => {
    setState((state) => {
      state && state.resolve();
      return {...state, open: false};
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
        open={state?.open ?? false}
        options={buildOptions(defaultOptions, state ? state.options : {})}
        onClose={handleClose}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </Fragment>
  );
};

export default ConfirmProvider;
export { confirmGlobal as confirm };
