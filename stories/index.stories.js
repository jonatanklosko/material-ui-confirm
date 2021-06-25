import React, { useCallback, useEffect, useState } from "react";
import { action } from "@storybook/addon-actions";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import { storiesOf, addDecorator } from "@storybook/react";
import { ConfirmProvider, useConfirm } from "../src/index";
import ConfirmationDialog from "../src/ConfirmationDialog";

const confirmationAction = action("confirmed");

const Basic = () => {
  const confirm = useConfirm();
  return (
    <Button onClick={() => confirm().then(confirmationAction)}>Click</Button>
  );
};

const WithDescription = () => {
  const confirm = useConfirm();
  return (
    <Button
      onClick={() => {
        confirm({ description: "This action is permanent!" }).then(
          confirmationAction
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
          .catch(action("cancelled"))
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

const Dialog = ({ annotationFetchStatus }) => {
  return (
    <div>
      <LinearProgress />
      <Box p={2}>
        {annotationFetchStatus === "Pending"
          ? "working..."
          : "This isn't wrapped in DialogContentText."}
      </Box>
    </div>
  );
};

const WithLoading = () => {
  // const confirm = useConfirm();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [annotationFetchStatus, setAnnotationFetchStatus] = useState("Wait");

  const __closeDialog = useCallback(() => {
    setIsDialogOpen(!isDialogOpen);
  }, [isDialogOpen]);

  const __onConfirm = useCallback(() => {
    setAnnotationFetchStatus("Pending");

    // do any work after
    setTimeout(() => {
      __closeDialog();
      setAnnotationFetchStatus("Wait");
    }, 3000);
  }, [__closeDialog]);

  useEffect(() => {
    if (annotationFetchStatus === "Pending") {
      setLoading(true);
    } else {
      setLoading(false);
    }

    return () => {};
  }, [annotationFetchStatus, loading]);

  return (
    <div>
      <Button onClick={() => setIsDialogOpen(true)}>Click</Button>
      <ConfirmationDialog
        open={isDialogOpen}
        options={{
          confirmationLoading: loading,
          content: <Dialog annotationFetchStatus={annotationFetchStatus} />,
          confirmationText: "confirm",
          cancellationText: "Cancel",
        }}
        onConfirm={__onConfirm}
        onCancel={__closeDialog}
        onClose={__closeDialog}
      />
    </div>
  );
};

storiesOf("Confirmation dialog", module)
  .addDecorator((getStory) => <ConfirmProvider>{getStory()}</ConfirmProvider>)
  .add("basic", () => <Basic />)
  .add("with description", () => <WithDescription />)
  .add("with custom text", () => <WithCustomText />)
  .add("with custom dialog props", () => <WithDialogProps />)
  .add("with custom button props", () => <WithCustomButtonProps />)
  .add("with custom callbacks", () => <WithCustomCallbacks />)
  .add("with custom elements", () => <WithCustomElements />)
  .add("with custom dialog content", () => <WithCustomContent />)
  .add("with loading", () => <WithLoading />);
