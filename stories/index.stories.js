import React from 'react';
import { action } from '@storybook/addon-actions';
import Button from '@material-ui/core/Button';
import { storiesOf } from '@storybook/react';
import withConfirm from '../src/withConfirm';

const confirmedAction = action('confirmed');

const Basic = withConfirm(({ confirm }) => (
  <Button onClick={confirm(confirmedAction)}>Click</Button>
));

const WithDescription = withConfirm(({ confirm }) => (
  <Button onClick={confirm(confirmedAction, 'This action is permanent!')}>Click</Button>
));

storiesOf('withConfirm', module)
  .add('basic', () => <Basic />)
  .add('with description', () => <WithDescription />);
