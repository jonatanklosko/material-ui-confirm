import React, { Fragment, useEffect } from "react";
import { action } from "@storybook/addon-actions";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import { ConfirmProvider, useConfirm } from "../src/index";
import { confirm as staticConfirm } from "../src/index";

const closeAction = action("closed");

const ConfirmationDialog = (options) => {
  const confirm = useConfirm();
  return (
    <Button
      onClick={() => {
        confirm(options).then(closeAction);
      }}
    >
      Click
    </Button>
  );
};

export default {
  title: "Confirmation dialog",
  decorators: [(getStory) => <ConfirmProvider>{getStory()}</ConfirmProvider>],
  component: ConfirmationDialog,
};

export const Basic = {
  args: {},
};

export const StaticMethod = {
  render: () => {
    return (
      <Button onClick={() => staticConfirm().then(closeAction)}>Click</Button>
    );
  },
};

export const WithDescription = {
  args: { description: "This action is permanent!" },
};

export const WithCustomText = {
  args: {
    title: "Reset setting?",
    description: "This will reset your device to its factory settings.",
    confirmationText: "Accept",
    cancellationText: "Cancel",
  },
};

export const WithDialogProps = {
  args: {
    dialogProps: { fullWidth: false, disableEscapeKeyDown: true },
  },
};

export const WithDialogActionsProps = {
  args: {
    dialogActionsProps: { sx: { justifyContent: "flex-start" } },
  },
};

export const WithCustomButtonProps = {
  args: {
    confirmationButtonProps: { color: "secondary", variant: "outlined" },
    cancellationButtonProps: { variant: "outlined" },
  },
};

export const WithCustomElements = {
  args: {
    title: (
      <Tooltip title="Fancy tooltip here!">
        <span>Reset setting?</span>
      </Tooltip>
    ),
    description: <LinearProgress />,
    confirmationText: "Accept",
    cancellationText: "Cancel",
  },
};

export const WithCustomContent = {
  args: {
    content: (
      <div>
        <LinearProgress />
        <Box p={2}>This isn't wrapped in DialogContentText.</Box>
      </div>
    ),
  },
};

export const WithNaturalCloseDisabled = {
  args: {
    allowClose: false,
  },
};

export const WithConfirmationKeyword = {
  args: {
    description:
      'This action is permanent. Please enter "DELETE" to confirm the action.',
    confirmationKeyword: "DELETE",
  },
};

export const WithConfirmationKeywordAndCustomTextFieldProps = {
  args: {
    confirmationKeyword: "DELETE",
    confirmationKeywordTextFieldProps: {
      label: "Enter DELETE",
      variant: "standard",
    },
  },
};

export const WithReversedButtons = {
  args: {
    buttonOrder: ["confirm", "cancel"],
  },
};

export const WithCustomLabelAcknowledgeCheckbox = {
  args: {
    acknowledgement: "I confirm and understand the risk",
  },
};

export const WithEnabledAcknowledgeCheckboxAndCustomFormControlLabelProps = {
  args: {
    acknowledgement: "I confirm and understand the risk",
    acknowledgementFormControlLabelProps: {
      color: "warning",
    },
  },
};

export const WithEnabledAcknowledgeCheckboxAndCustomCheckboxProps = {
  args: {
    acknowledgement: "I confirm and understand the risk",
    acknowledgementCheckboxProps: {
      disableRipple: true,
    },
  },
};

function ParentUnmountComponent() {
  const [flip, setFlip] = React.useState(false);
  React.useEffect(() => {
    const interval = setInterval(() => setFlip((flip) => !flip), 2000);
    return () => {
      clearInterval(interval);
    };
  });
  return (
    <Fragment>
      {flip && <ConfirmationDialog title="Dialog A" />}
      {!flip && <ConfirmationDialog title="Dialog B" />}
    </Fragment>
  );
}

export const WithParentUnmount = {
  render: () => <ParentUnmountComponent />,
};
