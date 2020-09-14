# Cubes

Delightfully simple building blocks for quick prototyping ⚡

![Build](https://github.com/Trampoline-CX/Cubes/workflows/Build/badge.svg)
[![Latest NPM Version](https://img.shields.io/npm/v/@trampoline/cubes)](https://www.npmjs.com/package/@trampoline/cubes)
[![MIT License](https://img.shields.io/npm/l/@trampoline/cubes)](https://tldrlegal.com/license/mit-license)

[![Storybook](https://raw.githubusercontent.com/storybookjs/brand/master/badge/badge-storybook.svg)](https://storybook.js.org/)

- [👨‍🔬 Experiment Now!](#-experiment-now)
  - [Playroom](#playroom)
  - [CodeSandbox](#codesandbox)
  - [Expo Snack](#expo-snack)
- [🏃 Getting Started](#-getting-started)
  - [Usage](#usage)
    - [Expo](#expo)
    - [Start Project](#start-project)
    - [AppProvider](#appprovider)
- [📚 Documentation (Storybook)](#-documentation-storybook)
- [👨‍🎓 Examples](#-examples)
- [👏 Contributing](#-contributing)

---

## 👨‍🔬 Experiment Now!

Start swiftly ⚡ using [Playroom](https://cubes.trampoline.cx), [CodeSandbox](https://codesandbox.io/s/github/alexbchr/cubes-basic-sandbox) or [Expo Snacks](https://snack.expo.io/@git/github.com/alexbchr/cubes-basic-sandbox).

### Playroom

Let you experiment quickly and easily using [Playroom](https://github.com/seek-oss/playroom). You can build prototypes easily and share them with the URL, without hassle or account creation.

### CodeSandbox

We recommend you to use CodeSandbox, as previewing is much faster and reliable than Expo Snacks. First time startup may take some time, but testing is fast afterwards.

### Expo Snack

Use Expo Snacks if you want to test on Web, Android and iOS. You can even test the native results directly in your browser using embedded [Appetize.io](https://appetize.io/).

## 🏃 Getting Started

Using [`expo-cli`](https://www.npmjs.com/package/expo-cli) and `npx`, use `create-cubes` starter template:

```shell
npx expo init --template https://github.com/Trampoline-CX/create-cubes.git
```

### Usage

After your project creation, there are some things worth mentioning to help you get started.

#### Expo

A Cubes project uses [Expo](https://expo.io/) (React Native), to prototype Apps on Web, Android and iOS with a unique code base. For Android and iOS, you can install the Expo App on the [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_CA) or [App Store](https://apps.apple.com/ca/app/expo-client/id982107779) and then scan the barcode when starting the project with a Phone.

#### Start Project

Start the project using `yarn start`. You can also use `yarn web`, `yarn android` or `yarn ios` to directly start the project on the platform of your choice (make sure to connect a device first 😉).

After being started, saving changes in your code base will update the experience directly ⚡

#### AppProvider

This must be the Root component (or Cube 😉) of your App (see it in `App` file). By default, when creating a project, your `AppProvider` provides a very basic Navigation Schema (read more about Navigation [here](https://develop--5eebb872a669600022881133.chromatic.com/?path=/story/documentation-navigation--page)).

However, you can prototype a single screen if you want by not providing a Navigation Schema and embedding your Screen content directly in `AppProvider`.

```tsx
const MyScreen = () => (
  <AppProvider>
    <Screen>
      <TopBar />
      <Screen.Content>
        <DisplayText>See, No Navigation!</DisplayText>
      </Screen.Content>
    </Screen>
  </AppProvider>
)
```

## 📚 Documentation (Storybook)

All Cubes (components), along with their properties and usage, are documented in our [Storybook](https://develop--5eebb872a669600022881133.chromatic.com). There is also [extra documentation](https://develop--5eebb872a669600022881133.chromatic.com/?path=/story/documentation) there 🤫

If you don't know Storybook, it's a cool place where you can document your components and design guidelines. Learn more on [their website](https://storybook.js.org/)!

## 👨‍🎓 Examples

Here is a basic Example of an App Prototype using Cubes:

- [Basic Sandbox](https://github.com/alexbchr/cubes-basic-sandbox)

## 👏 Contributing

If you like Cubes but think it could benefit from some improvements, feel free to consult our [contributing guide](CONTRIBUTING.md) or [open an issue](https://github.com/Trampoline-CX/Cubes/issues/new/choose).
