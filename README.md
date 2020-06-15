# Cubes

This package contains the components for the Bounce Design System. It also contains 2 Storybook apps:

- A web Storybook based on `@storybook/react` and built using React Native Web.
- A native Storybook based on `@storybook/react-native` and using an Expo App.

---

- [Cubes](#cubes)
  - [Development Workflow](#development-workflow)
    - [Create a New Component Guidelines](#create-a-new-component-guidelines)
    - [Write Efficient Storybook Stories](#write-efficient-storybook-stories)
  - [Directory Structure](#directory-structure)
  - [Typescript Structure](#typescript-structure)
  - [Deploy :rocket:](#deploy-)

## Development Workflow

Simply start the Web Storybook and then develop components!

```shell
$ yarn start:storybook
```

If you want to use the Native Storybook, which is useful to validate that components will look exactly like you mean to on both Android & iOS, use this command:

```shell
$ yarn start:app
```

### Create a New Component Guidelines

Let's say we want to develop a new component, named `MyComponent`.

1. Decide in which category your component should be (see `/src/components` subfolders).
2. Create a subfolder with your component's name, with a file in it with the same name. Following our example: `src/components/<category>/MyComponent/MyComponent.tsx`. The component **must** be exported using `export const MyComponent`. **NO** `export default`. Using `export default` would break Typescript Documentation generation.
3. Along with our new file, create a Storybook stories file: `MyComponent.stories.tsx`.
4. Reference your component in `src/components/index.ts`
5. Develop your component and look at it using Storybook Stories (in Web or Native). :rocket:

For additional guidelines on how to develop a component, see [Develop a New Component](/docs/mobile-app/Develop-a-New-Component).

### Write Efficient Storybook Stories

> **Disclaimer:** This section needs to be expanded after upgrading to Storybook 6. These guidelines are for Storybook 5 but will stay similar for the next major Storybook version.

[Storybook "Writing Stories" Documentation](https://storybook.js.org/docs/basics/writing-stories/) is a good starting point in case you don't know how to write stories, but here we expand on some guidelines we want to follow.

- Stories file name should have the name of the component, followed with `.stories.tsx`.
- Make sure to pass the concerned component in the `component` stories definition.
- The name of the story should have the same name as their component too, in order for Typescript Docgen parser to work correctly.
- Good component documentation starts with the JSDoc. Make sure to comment correctly every component along with all of their properties.
- The first story appears differently in Storybook "Docs" tab (only in Storybook Web). The first story should be the one representing what the component should do (its primary purpose). The first story could have a different format than the other ones to show more capabilities of the component, if needed.
- Stories should show usage of every component prop. Usage of multiple props could be shown in a single story, especially if the component has a lot of properties.
- If pertinent, some stories may not necessarily show a component but could instead show a composite component made of basic components, to better illustrate possible usages.
- Each story code should be "standalone". It should not be encapsulated in a function, as this would be irrelevant when looking at the source code of the story (see example below).

**Example Story:**

```tsx
import { MyComponent } from './MyComponent'

// Declaration of the Stories detail
export default {
  title: 'MyComponent', // Component Name
  component: MyComponent, // Component instance
}

// Declare stories using `export const`
// The first story is shown differently in "Docs" Tab
export const MyFirstStory: React.FC = () => <MyComponent prop="value" />
export const MySecondStory: React.FC = () => <MyComponent loading />

// DON'T ENCAPSULATE COMPONENT USAGE IN FUNCTION
const funcReturningMyComponent = () => <MyComponent prop="value">
export const MyNotSoCoolStory = funcReturningMyComponent() // JUST DON'T
```

> **Additional Notes**
>
> - When adding new `.stories.tsx` files, you will need to rebuild the project to see them in Storybook Native (`yarn build`). On Web, new stories should be picked up automatically without rebuilding.
> - There should be stories for every component of the DS, for documentation purpose.
> - For now, we only have stories written in Typescript, but later on, we could expand them further using MDX.
> - In Storybook 6, the first story will need to use Story Args, to make arguments of component customizable.

## Directory Structure

- `src/` contains sources for the Design System. Output does not contain the `src/storybook/` folder and the `*.stories.tsx` files.
- `storybook/` contains the storybook related code. `web/` subdirectory is for the Web Storybook while the `native/` subdirectory is for the Storybook Expo App.
- `public/` directory contains the basic React App assets for Storybook to work with.

## Typescript Structure

**VERY IMPORTANT NOTES**

There are 2 `tsconfig.json` files in this package:

- `tsconfig.json`: Used by VS Code for code completion and stuff and when building Storybook (doesn't emit anything).
- `tsconfig.build.json`: Used when building the Design System (output code to `dist/` folder).

## Deploy :rocket:

Deploy the Storybook to a website on Firebase Hosting (dev), using:

```shell
$ yarn deploy
```
