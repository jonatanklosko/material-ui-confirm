import React from "react";
import { action } from "@storybook/addon-actions";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import { storiesOf } from "@storybook/react";
import { ConfirmProvider, useConfirm } from "../src/index";
import { confirm as staticConfirm } from "../src/index";

const confirmationAction = action("confirmed");
const cancellationAction = action("cancelled");

const Basic = () => {
  const confirm = useConfirm();
  return (
    <Button onClick={() => confirm().then(confirmationAction)}>Click</Button>
  );
};

const StaticMethod = () => {
  return (
    <Button onClick={() => staticConfirm().then(confirmationAction)}>
      Click
    </Button>
  );
};

const WithDescription = () => {
  const confirm = useConfirm();
  return (
    <Button
      onClick={() => {
        confirm({ description: "This action is permanent!" }).then(
          confirmationAction,
        );
      }}
    >
      Click
    </Button>
  );
};

const WithCustomText = () => {
  const confirm = useConfirm();
  return (
    <Button
      onClick={() => {
        confirm({
          title: "Reset setting?",
          description: "This will reset your device to its factory settings.",
          confirmationText: "Accept",
          cancellationText: "Cancel",
        }).then(confirmationAction);
      }}
    >
      Click
    </Button>
  );
};

const WithDialogProps = () => {
  const confirm = useConfirm();
  return (
    <Button
      onClick={() => {
        confirm({
          dialogProps: { fullWidth: false, disableEscapeKeyDown: true },
        }).then(confirmationAction);
      }}
    >
      Click
    </Button>
  );
};

const WithDialogActionsProps = () => {
  const confirm = useConfirm();
  return (
    <Button
      onClick={() => {
        confirm({
          dialogActionsProps: { sx: { justifyContent: "flex-start" } },
        }).then(confirmationAction);
      }}
    >
      Click
    </Button>
  );
};

const WithCustomButtonProps = () => {
  const confirm = useConfirm();
  return (
    <Button
      onClick={() => {
        confirm({
          confirmationButtonProps: { color: "secondary", variant: "outlined" },
          cancellationButtonProps: { variant: "outlined" },
        }).then(confirmationAction);
      }}
    >
      Click
    </Button>
  );
};

const WithCustomCallbacks = () => {
  const confirm = useConfirm();
  return (
    <Button
      onClick={() => {
        confirm()
          .then(confirmationAction)
          .catch(cancellationAction)
          .finally(action("closed"));
      }}
    >
      Click
    </Button>
  );
};

const WithCustomElements = () => {
  const confirm = useConfirm();
  return (
    <Button
      onClick={() => {
        confirm({
          title: (
            <Tooltip title="Fancy tooltip here!">
              <span>Reset setting?</span>
            </Tooltip>
          ),
          description: <LinearProgress />,
          confirmationText: "Accept",
          cancellationText: "Cancel",
        }).then(confirmationAction);
      }}
    >
      Click
    </Button>
  );
};

const WithCustomContent = () => {
  const confirm = useConfirm();
  return (
    <Button
      onClick={() => {
        confirm({
          content: (
            <div>
              <LinearProgress />
              <Box p={2}>This isn't wrapped in DialogContentText.</Box>
            </div>
          ),
        }).then(confirmationAction);
      }}
    >
      Click
    </Button>
  );
};

const WithNaturalCloseDisabled = () => {
  const confirm = useConfirm();
  return (
    <Button
      onClick={() => {
        confirm({
          allowClose: false,
        })
          .then(confirmationAction)
          .catch(cancellationAction);
      }}
    >
      Click
    </Button>
  );
};

const WithConfirmationKeyword = () => {
  const confirm = useConfirm();
  return (
    <Button
      onClick={() =>
        confirm({
          description:
            'This action is permanent. Please enter "DELETE" to confirm the action.',
          confirmationKeyword: "DELETE",
        }).then(confirmationAction)
      }
    >
      Click
    </Button>
  );
};

const WithConfirmationKeywordAndCustomTextFieldProps = () => {
  const confirm = useConfirm();
  return (
    <Button
      onClick={() =>
        confirm({
          confirmationKeyword: "DELETE",
          confirmationKeywordTextFieldProps: {
            label: "Enter DELETE",
            variant: "standard",
          },
        }).then(confirmationAction)
      }
    >
      Click
    </Button>
  );
};

const WithReversedButtons = () => {
  const confirm = useConfirm();
  return (
    <Button
      onClick={() => {
        confirm({ buttonOrder: ["confirm", "cancel"] }).then(
          confirmationAction,
        );
      }}
    >
      Click
    </Button>
  );
};

const WithCustomLabelAcknowledgeCheckbox = () => {
  const confirm = useConfirm();
  return (
    <Button
      onClick={() => {
        confirm({
          acknowledgement: "I confirm and understand the risk",
        }).then(confirmationAction);
      }}
    >
      Click
    </Button>
  );
};

const WithEnabledAcknowledgeCheckboxAndCustomFormControlLabelProps = () => {
  const confirm = useConfirm();
  return (
    <Button
      onClick={() => {
        confirm({
          acknowledgement: "I confirm and understand the risk",
          acknowledgementFormControlLabelProps: {
            color: "warning",
          },
        }).then(confirmationAction);
      }}
    >
      Click
    </Button>
  );
};

const WithEnabledAcknowledgeCheckboxAndCustomCheckboxProps = () => {
  const confirm = useConfirm();
  return (
    <Button
      onClick={() => {
        confirm({
          acknowledgement: "I confirm and understand the risk",
          acknowledgementCheckboxProps: {
            disableRipple: true,
          },
        }).then(confirmationAction);
      }}
    >
      Click
    </Button>
  );
};

storiesOf("Confirmation dialog", module)
  .addDecorator((getStory) => <ConfirmProvider>{getStory()}</ConfirmProvider>)
  .add("basic", () => <Basic />)
  .add("static method", () => <StaticMethod />)
  .add("with description", () => <WithDescription />)
  .add("with custom text", () => <WithCustomText />)
  .add("with custom dialog props", () => <WithDialogProps />)
  .add("with custom dialog actions props", () => <WithDialogActionsProps />)
  .add("with custom button props", () => <WithCustomButtonProps />)
  .add("with custom callbacks", () => <WithCustomCallbacks />)
  .add("with custom elements", () => <WithCustomElements />)
  .add("with custom dialog content", () => <WithCustomContent />)
  .add("with natural close disabled", () => <WithNaturalCloseDisabled />)
  .add("with confirmation keyword", () => <WithConfirmationKeyword />)
  .add("with confirmation keyword and custom textfield props", () => (
    <WithConfirmationKeywordAndCustomTextFieldProps />
  ))
  .add("with reversed buttons keyword", () => <WithReversedButtons />)
  .add("with enabled acknowledge checkbox and label ", () => (
    <WithCustomLabelAcknowledgeCheckbox />
  ))
  .add(
    "with enabled acknowledge checkbox and custom form control label props",
    () => <WithEnabledAcknowledgeCheckboxAndCustomFormControlLabelProps />,
  )
  .add("with enabled acknowledge checkbox and custom checkbox props", () => (
    <WithEnabledAcknowledgeCheckboxAndCustomCheckboxProps />
  ));
