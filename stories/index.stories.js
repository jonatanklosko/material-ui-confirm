import React from 'react';
import { action } from '@storybook/addon-actions';
import Button from '@material-ui/core/Button';
import { storiesOf } from '@storybook/react';
import withConfirm from '../src/withConfirm';

const confirmedAction = action('confirmed');

const Basic = withConfirm(({ confirm }) => (
  <Button onClick={confirm(confirmedAction)}>
    Click
  </Button>
));

const WithDescription = withConfirm(({ confirm }) => (
  <Button onClick={confirm(confirmedAction, { description: 'This action is permanent!' })}>
    Click
  </Button>
));

const WithCustomText = withConfirm(({ confirm }) => (
  <Button onClick={confirm(confirmedAction, {
    title: 'Reset setting?',
    description: 'This will reset your device to its default factory settings.',
    confirmationText: 'Accept',
    cancellationText: 'Cancel',
  })}>
    Click
  </Button>
));

const WithCustomCallbacks = withConfirm(({ confirm }) => (
  <Button onClick={confirm(confirmedAction, {
    onClose: action('closed'),
    onCancel: action('canceled'),
  })}>
    Click
  </Button>
));

const WithDialogProps = withConfirm(({ confirm }) => (
  <Button onClick={confirm(confirmedAction, {
    dialogProps: { fullWidth: false, disableEscapeKeyDown: true },
  })}>
    Click
  </Button>
));

storiesOf('withConfirm', module)
  .add('basic', () => <Basic />)
  .add('with description', () => <WithDescription />)
  .add('with custom text', () => <WithCustomText />)
  .add('with custom dialog props', () => <WithDialogProps />)
  .add('with custom callbacks', () => <WithCustomCallbacks />);
