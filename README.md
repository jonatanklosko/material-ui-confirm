# Material-UI confirm [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jonatanklosko/material-ui-confirm/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/material-ui-confirm.svg)](https://www.npmjs.com/package/material-ui-confirm) [![Actions Status](https://github.com/jonatanklosko/material-ui-confirm/workflows/Test/badge.svg)](https://github.com/jonatanklosko/material-ui-confirm/actions) [![Coverage Status](https://coveralls.io/repos/github/jonatanklosko/material-ui-confirm/badge.svg?branch=master)](https://coveralls.io/github/jonatanklosko/material-ui-confirm?branch=master)

> Confirming user choice is a good thing to do, it should also be easy to do.

This package provides simple confirmation dialogs built on top of [@mui/material](https://mui.com/)
and straightforward to use thanks to React Hooks.

## Installation

```sh
npm install --save material-ui-confirm
```

## Demo

[![Edit material-ui-confirm demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/materialuiconfirm-demo-hzzdr?fontsize=14)

## Usage

Wrap your app inside the `ConfirmProvider` component.\
_Note: If you're using Material UI `ThemeProvider`, make sure `ConfirmProvider` is a child of it._

```js
import React from "react";
import { ConfirmProvider } from "material-ui-confirm";

const App = () => {
  return <ConfirmProvider>{/* ... */}</ConfirmProvider>;
};

export default App;
```

Call the `useConfirm` hook wherever you need the `confirm` function.\
_Note: A component calling `useConfirm` must be a child of `ConfirmProvider`._

```js
import React from "react";
import Button from "@mui/material/Button";
import { useConfirm } from "material-ui-confirm";

const Item = () => {
  const confirm = useConfirm();

  const handleClick = () => {
    confirm({ description: "This action is permanent!" })
      .then(() => {
        /* ... */
      })
      .catch(() => {
        /* ... */
      });
  };

  return <Button onClick={handleClick}>Click</Button>;
};

export default Item;
```

## API

#### `ConfirmProvider`

This component is required in order to render a dialog in the component tree.

##### Props

| Name                 | Type     | Default | Description                                                             |
| -------------------- | -------- | ------- | ----------------------------------------------------------------------- |
| **`defaultOptions`** | `object` | `{}`    | Overrides the default options used by [`confirm`](#useconfirm-confirm). |

#### `useConfirm() => confirm`

This hook returns the `confirm` function.

#### `confirm([options]) => Promise`

This function opens a confirmation dialog and returns a promise
representing the user choice (resolved on confirmation and rejected on cancellation).

##### Options

| Name                                    | Type        | Default           | Description                                                                                                                                                                                                                            |
|-----------------------------------------| ----------- | ----------------- |----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **`title`**                             | `ReactNode` | `'Are you sure?'` | Dialog title.                                                                                                                                                                                                                          |
| **`description`**                       | `ReactNode` | `''`              | Dialog content, automatically wrapped in `DialogContentText`.                                                                                                                                                                          |
| **`content`**                           | `ReactNode` | `null`            | Dialog content, same as `description` but not wrapped in `DialogContentText`. Supersedes `description` if present.                                                                                                                     |
| **`confirmationText`**                  | `ReactNode` | `'Ok'`            | Confirmation button caption.                                                                                                                                                                                                           |
| **`cancellationText`**                  | `ReactNode` | `'Cancel'`        | Cancellation button caption.                                                                                                                                                                                                           |
| **`dialogProps`**                       | `object`    | `{}`              | Material-UI [Dialog](https://mui.com/material-ui/api/dialog/#props) props.                                                                                                                                                             |
| **`dialogActionsProps`**                | `object`    | `{}`              | Material-UI [DialogActions](https://mui.com/material-ui/api/dialog-actions/#props) props.                                                                                                                                              |
| **`confirmationButtonProps`**           | `object`    | `{}`              | Material-UI [Button](https://mui.com/material-ui/api/button/#props) props for the confirmation button.                                                                                                                                 |
| **`cancellationButtonProps`**           | `object`    | `{}`              | Material-UI [Button](https://mui.com/material-ui/api/dialog/#props) props for the cancellation button.                                                                                                                                 |
| **`titleProps`**                        | `object`    | `{}`              | Material-UI [DialogTitle](https://mui.com/api/dialog-title/#props) props for the dialog title.                                                                                                                                         |
| **`contentProps`**                      | `object`    | `{}`              | Material-UI [DialogContent](https://mui.com/api/dialog-content/#props) props for the dialog content.                                                                                                                                   |
| **`allowClose`**                        | `boolean`   | `true`            | Whether natural close (escape or backdrop click) should close the dialog. When set to `false` force the user to either cancel or confirm explicitly.                                                                                   |
| **`confirmationKeyword`**               | `string`    | `undefined`       | If provided the confirmation button will be disabled by default and an additional textfield will be rendered. The confirmation button will only be enabled when the contents of the textfield match the value of `confirmationKeyword` |
| **`confirmationKeywordTextFieldProps`** | `object`    | `{}`              | Material-UI [TextField](https://mui.com/material-ui/api/text-field/) props for the confirmation keyword textfield.                                                                                                                     |
| **`hideCancelButton`**                  | `boolean`   | `false`           | Whether to hide the cancel button.                                                                                                                                                                                                     |
| **`buttonOrder`**                  | `string[]`   | `['cancel','confirm']`           | Specify the order of confirm and cancel buttons.                                                                                                                                                                                                     |


## Useful notes

### Confirm by pressing _Enter_

You can get this behavior by adding the `autoFocus` property to the confirmation button.
This way the button is focused as soon as the dialog opens and hitting _Enter_
naturally triggers a click.

##### Locally

```jsx
const MyComponent = () => {
  // ...

  const handleClick = () => {
    confirm({ confirmationButtonProps: { autoFocus: true } })
      .then(() => {
        /* ... */
      })
      .catch(() => {
        /* ... */
      });
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
        confirmationButtonProps: { autoFocus: true },
      }}
    >
      {/* ... */}
    </ConfirmProvider>
  );
};
```
