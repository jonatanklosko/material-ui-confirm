# Material-UI confirm [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jonatanklosko/material-ui-confirm/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/material-ui-confirm.svg)](https://www.npmjs.com/package/material-ui-confirm) [![Build Status](https://travis-ci.org/jonatanklosko/material-ui-confirm.svg?branch=master)](https://travis-ci.org/jonatanklosko/material-ui-confirm) [![Coverage Status](https://coveralls.io/repos/github/jonatanklosko/material-ui-confirm/badge.svg?branch=master)](https://coveralls.io/github/jonatanklosko/material-ui-confirm?branch=master)

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
