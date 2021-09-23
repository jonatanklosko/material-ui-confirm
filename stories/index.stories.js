import React from 'react';
import { action } from '@storybook/addon-actions';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { storiesOf } from '@storybook/react';
import { ConfirmProvider, useConfirm } from '../src/index';

const confirmationAction = action('confirmed');

const Basic = () => {
  const confirm = useConfirm();
  return (
    <Button onClick={() => confirm().then(confirmationAction)}>
      Click
    </Button>
  );
};

const WithDescription = () => {
  const confirm = useConfirm();
  return (
    <Button onClick={() => {
      confirm({ description: 'This action is permanent!' })
        .then(confirmationAction);
    }}>
      Click
    </Button>
  );
};

const WithCustomText = () => {
  const confirm = useConfirm();
  return (
    <Button onClick={() => {
      confirm({
        title: 'Reset setting?',
        description: 'This will reset your device to its factory settings.',
        confirmationText: 'Accept',
        cancellationText: 'Cancel',
      })
      .then(confirmationAction);
    }}>
      Click
    </Button>
  );
};

const WithDialogProps = () => {
  const confirm = useConfirm();
  return (
    <Button onClick={() => {
      confirm({
        dialogProps: { fullWidth: false, disableEscapeKeyDown: true },
      })
      .then(confirmationAction);
    }}>
      Click
    </Button>
  );
};

const WithCustomButtonProps = () => {
  const confirm = useConfirm();
  return (
    <Button onClick={() => {
      confirm({
        confirmationButtonProps: { color: 'secondary', variant: 'outlined' },
        cancellationButtonProps: { variant: 'outlined' },
      })
      .then(confirmationAction);
    }}>
      Click
    </Button>
  );
};

const WithCustomCallbacks = () => {
  const confirm = useConfirm();
  return (
    <Button onClick={() => {
      confirm()
        .then(confirmationAction)
        .catch(action('cancelled'))
        .finally(action('closed'));
    }}>
      Click
    </Button>
  );
};

const WithCustomElements = () => {
  const confirm = useConfirm();
  return (
    <Button onClick={() => {
      confirm({
        title: (
          <Tooltip title="Fancy tooltip here!">
            <span>
              Reset setting?
            </span>
          </Tooltip>
        ),
        description: (
          <LinearProgress />
        ),
        confirmationText: 'Accept',
        cancellationText: 'Cancel',
      })
      .then(confirmationAction);
    }}>
      Click
    </Button>
  );
};

const WithCustomContent = () => {
  const confirm = useConfirm();
  return (
    <Button onClick={() => {
      confirm({
        content: (
          <div>
            <LinearProgress />
            <Box p={2}>This isn't wrapped in DialogContentText.</Box>
          </div>
        )
      })
      .then(confirmationAction);
    }}>
      Click
    </Button>
  );
};

storiesOf('Confirmation dialog', module)
  .addDecorator(getStory => (
    <ConfirmProvider>{getStory()}</ConfirmProvider>
  ))
  .add('basic', () => <Basic />)
  .add('with description', () => <WithDescription />)
  .add('with custom text', () => <WithCustomText />)
  .add('with custom dialog props', () => <WithDialogProps />)
  .add('with custom button props', () => <WithCustomButtonProps />)
  .add('with custom callbacks', () => <WithCustomCallbacks />)
  .add('with custom elements', () => <WithCustomElements />)
  .add('with custom dialog content', () => <WithCustomContent />);
