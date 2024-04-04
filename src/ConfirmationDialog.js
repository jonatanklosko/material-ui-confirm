import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const ConfirmationDialog = ({
  open,
  options,
  onCancel,
  onConfirm,
  onClose,
}) => {
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
    confirmationKeyword,
    confirmationKeywordTextFieldProps,
    hideCancelButton,
    buttonOrder,
    acknowledgement,
    acknowledgementFormControlLabelProps,
    acknowledgementCheckboxProps,
  } = options;

  const [confirmationKeywordValue, setConfirmationKeywordValue] =
    React.useState("");
  const [acknowledgeAccept, setAcknowledgeAccept] = React.useState(false);

  const isAcknowledgeCheckboxEnabled =
    (typeof acknowledgement === "boolean" && acknowledgement) ||
    typeof acknowledgement === "string";
  const acknowledgeCheckboxLabel =
    typeof acknowledgement === "string" ? acknowledgement : "Please confirm";

  const confirmationButtonDisabled = Boolean(
    (confirmationKeyword && confirmationKeywordValue !== confirmationKeyword) ||
      (isAcknowledgeCheckboxEnabled && !acknowledgeAccept),
  );

  const acknowledgeCheckbox = (
    <>
      {isAcknowledgeCheckboxEnabled && (
        <FormControlLabel
          {...acknowledgementFormControlLabelProps}
          control={
            <Checkbox
              {...acknowledgementCheckboxProps}
              value={acknowledgeAccept}
              onChange={(_, val) => setAcknowledgeAccept(val)}
            />
          }
          label={acknowledgeCheckboxLabel}
        />
      )}
    </>
  );

  const confirmationContent = (
    <>
      {confirmationKeyword && (
        <TextField
          onChange={(e) => setConfirmationKeywordValue(e.target.value)}
          value={confirmationKeywordValue}
          fullWidth
          {...confirmationKeywordTextFieldProps}
        />
      )}
    </>
  );

  const dialogActions = buttonOrder.map((buttonType) => {
    if (buttonType === "cancel") {
      return (
        !hideCancelButton && (
          <Button key="cancel" {...cancellationButtonProps} onClick={onCancel}>
            {cancellationText}
          </Button>
        )
      );
    }

    if (buttonType === "confirm") {
      return (
        <Button
          key="confirm"
          color="primary"
          disabled={confirmationButtonDisabled}
          {...confirmationButtonProps}
          onClick={onConfirm}
        >
          {confirmationText}
        </Button>
      );
    }

    throw new Error(
      `Supported button types are only "confirm" and "cancel", got: ${buttonType}`,
    );
  });

  return (
    <Dialog
      fullWidth
      {...dialogProps}
      open={open}
      onClose={allowClose ? onClose : null}
    >
      {title && <DialogTitle {...titleProps}>{title}</DialogTitle>}
      {content ? (
        <DialogContent {...contentProps}>
          {content}
          {confirmationContent}
          {acknowledgeCheckbox}
        </DialogContent>
      ) : description ? (
        <DialogContent {...contentProps}>
          <DialogContentText>{description}</DialogContentText>
          {confirmationContent}
          {acknowledgeCheckbox}
        </DialogContent>
      ) : (
        (confirmationKeyword || acknowledgeCheckbox) && (
          <DialogContent {...contentProps}>
            {confirmationContent}
            {acknowledgeCheckbox}
          </DialogContent>
        )
      )}
      <DialogActions {...dialogActionsProps}>{dialogActions}</DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
