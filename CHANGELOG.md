## 4.0.0

This release changes the API, affecting all usages of `confirm` function. Previously the promise returned by `confirm` would be resolved on confirm and rejected on cancel. This has changed and the promise is now **always resolved** ⚠️.

You can upgrade to the new version and maintain the previous behaviour by setting a provider attribute:

```jsx
<ConfirmProvider useLegacyReturn>
  {/* ... */}
</ConfirmProvider>
```

### Migrating

Given this code from v3:

```js
confirm({ ... })
  .then(() => console.log("confirm"))
  .catch(() => console.log("cancel"));
```

You can achieve the same behaviour in v4, like so:

```js
confirm({ ... })
  .then(({ confirmed, reason }) => {
    if (confirmed) {
      console.log("confirm")
    } else if (reason === "cancel") {
      console.log("cancel")
    }
  });
```

The promise is also resolved on natural close (backdrop click, escape) or when the parent unmounts, in both cases with a distinct `reason`. In most cases you may only be interested in the confirmed code path, in which case you would only check `confirmed` and ignore the `reason`.

With this new API, it is guaranteed the callback eventually runs, which helps to avoid leaks if the callback is supposed to free certain resources. It is also more suitable for use with `async`/`await` (which required a `try`/`catch`):

```js
const { confirmed } = await confirm({ description: "This action is permanent!" });

if (confirmed) {
  /* ... */
}
```

**Breaking changes**

- Always resolve the promise with confirmation status and close reason ([#124](https://github.com/jonatanklosko/material-ui-confirm/pull/124))

## 3.0.18

- Fix regression in CJS build imports ([#122](https://github.com/jonatanklosko/material-ui-confirm/pull/122)) @joshkel

## 3.0.17

- Update peerDependencies to include MUI v6 and React 19

## 3.0.16

- Fix modal resetting to the default state during close animation (regression from 3.0.13) ([#100](https://github.com/jonatanklosko/material-ui-confirm/pull/100)) @DuncanMackintosh

## 3.0.15

- Improved the behaviour with missing `ConfirmProvider` ([#98](https://github.com/jonatanklosko/material-ui-confirm/pull/98)) @joshkel

## 3.0.14

- Fix compatibility with React 17 (regression from 3.0.13)

## 3.0.13

- Automatically close the dialog when the calling component is unmounted (for example, router navigation)

## 3.0.12

- Add acknowledgement checkbox option ([#94](https://github.com/jonatanklosko/material-ui-confirm/pull/94)) @MuscularSloth

## 3.0.11

- Fixed confirmation keyword field to reset whenever the dialog is open

## 3.0.10

- Add a global `confirm` method for use with class components ([#86](https://github.com/jonatanklosko/material-ui-confirm/pull/86)) @liaokaime

## 3.0.9

- Allow specifying the order of confirm & cancel buttons ([#70](https://github.com/jonatanklosko/material-ui-confirm/pull/70)) @MattFellows

## 3.0.8

- Add `hideCancelButton` option ([#68](https://github.com/jonatanklosko/material-ui-confirm/pull/68)) @btmluiz

## 3.0.7

- Add support for confirmation keyword ([#60](https://github.com/jonatanklosko/material-ui-confirm/pull/60)) @TimMikeladze

## 3.0.6

- Make `DialogActions` props configurable

## 3.0.5

- Respect updates to default options

## 3.0.4

- Add React 18 to `peerDependencies` ([#51](https://github.com/jonatanklosko/material-ui-confirm/pull/51)) @ProfHercules

## 3.0.3

- Add `allowClose` option to optionally disable natural close

## 3.0.2

- Add configurable props for DialogTitle and DialogContent for accessibility ([#38](https://github.com/jonatanklosko/material-ui-confirm/pull/38)) @imjordanxd

## 3.0.1

- Fix multiple clicks on confirm or cancel button ([#37](https://github.com/jonatanklosko/material-ui-confirm/pull/37)) @ypahalajani

## 3.0.0

**Breaking changes**

- Require Material-UI 5 ([#36](https://github.com/jonatanklosko/material-ui-confirm/pull/36)) @tifosiblack

## 2.1.3

- Add `content` option
- Omit open prop from dialogProps ([#30](https://github.com/jonatanklosko/material-ui-confirm/pull/30)) @gergely-adamku

## 2.1.2

- Bump `react` and `react-dom` peer dependencies ([#23](https://github.com/jonatanklosko/material-ui-confirm/pull/23)) @Armanio

## 2.1.1

- Don't reject confirmation promise when neutrally closing the dialog (e.g. when hitting _Esc_) ([#18](https://github.com/jonatanklosko/material-ui-confirm/pull/18)) @tincho

## 2.1.0

- Merge nested default options (like `confirmationButtonProps`) with options passed to a `confirm` call

## 2.0.5

- Update TypeScript definitions to use `React.ReactNode` instead of `string` where appropriate

## 2.0.4

- Add the ability to pass props to confirmation and cancellation buttons

## 2.0.2

- Add TypeScript definitions

## 2.0.1

New API using hooks and Promises.

## 1.x.x

Higher Order Component API.
