# Material-UI confirm [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jonatanklosko/material-ui-confirm/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/material-ui-confirm.svg)](https://www.npmjs.com/package/material-ui-confirm) [![Build Status](https://travis-ci.org/jonatanklosko/material-ui-confirm.svg?branch=master)](https://travis-ci.org/jonatanklosko/material-ui-confirm) [![Coverage Status](https://coveralls.io/repos/github/jonatanklosko/material-ui-confirm/badge.svg?branch=master)](https://coveralls.io/github/jonatanklosko/material-ui-confirm?branch=master)

> Confirming user choice is a good thing to do, it should also be easy to do.

This package provides simple confirmation dialogs built on top of [@material-ui/core](https://material-ui.com/)
and straightforward to use thanks to React Hooks.

## Installation

```sh
npm install --save material-ui-confirm
```

## Demo

[![Edit material-ui-confirm demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/materialuiconfirm-demo-hzzdr?fontsize=14)

## Usage

Wrap your app inside the `ConfirmProvider` component.\
*Note: If you're using Material UI `ThemeProvider`, make sure `ConfirmProvider` is a child of it.*

```js
import React from 'react';
import { ConfirmProvider } from 'material-ui-confirm';

const App = () => {
  return (
    <ConfirmProvider>
      {/* ... */}
    </ConfirmProvider>
  );
};

export default App;
```

Call the `useConfirm` hook wherever you need the `confirm` function.\
*Note: A component calling `useConfirm` must be a child of `ConfirmProvider`.*

```js
import React from 'react';
import Button from '@material-ui/core/Button';
import { useConfirm } from 'material-ui-confirm';

const Item = () => {
  const confirm = useConfirm();

  const handleClick = () => {
    confirm({ description: 'This action is permanent!' })
      .then(() => { /* ... */ })
      .catch(() => { /* ... */ });
  };

  return (
    <Button onClick={handleClick}>
      Click
    </Button>
  );
};

export default Item;
```

## API

#### `ConfirmProvider`

This component is required in order to render a dialog in the component tree.

##### Props:

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| **`defaultOptions`** | `object` | `{}` | Overrides the default options used by [`confirm`](#useconfirm-confirm). |

#### `useConfirm() => confirm`

This hook returns the `confirm` function.

#### `confirm([options]) => Promise`

This function opens a confirmation dialog and returns a promise
representing the user choice (resolved on confirmation and rejected on cancellation).

##### Options:

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| **`title`** | `ReactNode` | `'Are you sure?'` | Dialog title. |
| **`description`** | `ReactNode` | `''` | Dialog content. |
| **`confirmationText`** | `ReactNode` | `'Ok'` | Confirmation button caption. |
| **`cancellationText`** | `ReactNode` | `'Cancel'` | Cancellation button caption. |
| **`dialogProps`** | `object` | `{}` | Material-UI [Dialog](https://material-ui.com/api/dialog/#props) props. |
| **`confirmationButtonProps`** | `object` | `{}` | Material-UI [Button](https://material-ui.com/api/button/#props) props for the confirmation button. |
| **`cancellationButtonProps`** | `object` | `{}` | Material-UI [Button](https://material-ui.com/api/dialog/#props) props for the cancellation button. |

## Useful notes

### Confirm by pressing *Enter*

You can get this behavior by adding the `autoFocus` property to the confirmation button.
This way the button is focused as soon as the dialog opens and hitting *Enter*
naturally triggers a click.

##### Locally

```jsx
const MyComponent = () => {
  // ...

  const handleClick = () => {
    confirm({ confirmationButtonProps: { autoFocus: true } })
      .then(() => { /* ... */ })
      .catch(() => { /* ... */ });
  };

  // ...
};
```

##### Globally

```jsx
const App = () => {
  return (
    <ConfirmProvider
      defaultOptions={{
        confirmationButtonProps: { autoFocus: true }
      }}
    >
      {/* ... */}
    </ConfirmProvider>
  );
};
```
