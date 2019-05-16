# Material-UI confirm

Higher order component for straightforward use of [@material-ui/core](https://material-ui.com/) confirmation dialogs.

## Installation

```sh
npm install --save material-ui-confirm
```

## Usage

```js
import React from 'react';
import Button from '@material-ui/core/Button';
import withConfirm from 'material-ui-confirm';

const Item = ({ confirm }) => {
  const handleDelete = () => { /* ... */ };

  return (
    <Button onClick={confirm(handleDelete, { description: 'This action is permanent!' })}>
      Click
    </Button>
  );
};

export default withConfirm(Item);
```

## API

#### `withConfirm(Component)`
Returns Component adding `confirm` to its props.

#### `confirm(onConfirm, options)`
Returns a function that opens the confirmation dialog once called.
If the user confirms the action, the `onConfirm` callback is fired.

##### Options:

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| **`title`** | `string` | `'Are you sure?'` | Dialog title. |
| **`description`** | `string` | `''` | Dialog content. |
| **`confirmationText`** | `string` | `'Ok'` | Confirmation button caption. |
| **`cancellationText`** | `string` | `'Cancel'` | Cancellation button caption. |
| **`dialogProps`** | `object` | `{}` | Material-UI [Dialog](https://material-ui.com/api/dialog/#props) props. |
| **`onClose`** | `function` | `() => {}` | Callback fired before the dialog closes. |
| **`onCancel`** | `function` | `() => {}` | Callback fired when the user cancels the action. |
