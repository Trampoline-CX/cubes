# Contributing

If you like Cubes but think it could benefit from some improvements, feel free to help us make it even greater by forking it and do Pull Requests! 💪

- [📦 Download and Setup](#-download-and-setup)
- [🏗️ Creating a New Cube](#️-creating-a-new-cube)
- [✍️ Writing Storybook Stories](#️-writing-storybook-stories)
  - [🎨 Chromatic](#-chromatic)
- [📁 Directory Structure](#-directory-structure)
- [📜 Typescript Structure](#-typescript-structure)
- [🚀 Publish](#-publish)

---

## 📦 Download and Setup

1. [Fork](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo) this repository to your own GitHub account and then clone it to your local device.
2. Make sure you have [Node](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/) installed.
3. Run `yarn install` and then `yarn start`. This will launch a Storybook instance locally. You should use Storybook to develop and test your components.

## 🏗️ Creating a New Cube

Let's say we want to develop a new Cube, named `MyCube`.

1. Decide in which category your Cube should be (see `/src/components` subfolders).
2. Create a subfolder with your Cube's name, with a file in it with the same name. Following our example: `src/components/<category>/MyCube/MyCube.tsx`. The Cube **must** be exported using `export const MyCube`. **NO** `export default`.
3. Along with our new file, create a Storybook stories file: `MyCube.stories.tsx`.
4. Reference your Cube in `src/components/index.ts` (exports must be ordered alphabetically).
5. Develop your Cube and test it using Storybook. :rocket:
6. Once Storybook look good, make sure to test your Cube using Web, Android and iOS.<br>
   **Note:** You can use [yarn link](https://classic.yarnpkg.com/en/docs/cli/link/) or [yalc](https://www.npmjs.com/package/yalc) to test your package locally.

> Note: Later on, we should have unit and UI tests running on all platforms automatically, but for now, native tests outside Storybook are mostly Manual 🤷‍♂️

## ✍️ Writing Storybook Stories

[Storybook "Writing Stories" Documentation](https://storybook.js.org/docs/basics/writing-stories/) is a good starting point in case you never worked with Storybook, but here we expand on some guidelines we want to follow.

- Stories file name should have the name of the Cube, followed with `.stories.tsx`.
- Make sure to pass the concerned Cube in the `component` stories definition.
- Good Cube documentation starts with the JSDoc. Make sure to comment correctly every Cube along with all of their properties.
- The first story appears differently in Storybook "Docs" tab. The first story should be the one representing what the Cube should do (its primary purpose). The first story could have a different format than the other ones to show more capabilities of the Cube, if needed.
- The first story should use, when possible, Storybook Args to let readers customize each property of the component and see the impact of their changes.
- Stories should show usage of every component prop. Usage of multiple props could be shown in a single story, especially if the component has a lot of properties.
- If pertinent, some stories may not necessarily show a component but could instead show a composite component made of basic components, to better illustrate possible usages.
- Each story code should be "standalone". It should not be encapsulated in a function, as this would be irrelevant when looking at the source code of the story (see example below).

**Example Story:**

```tsx
import React from 'react'
import { MyCube } from './MyCube'
import { fileAbsolute } from 'paths.macro'
import { getStoryTitle } from '../../../storybook/get-story-title'

// Declaration of the Stories configuration for this Cube
export default {
  title: getStoryTitle(fileAbsolute), // Cube Name (automatically generated from file name)
  component: MyCube, // Cube Instance
}

// Declare stories using `export const`
// The first story is shown differently in "Docs" Tab.
// If the first story receives a props parameter, it will show controls in the Props Table to dynamically change props.
export const MyFirstStory: React.FC = props => <MyCube {...props} />
export const MySecondStory: React.FC = () => <MyCube loading />

// DON'T ENCAPSULATE CUBE USAGE IN FUNCTION LIKE SO:
const funcReturningMyCube = () => <MyCube prop="value">
export const MyNotSoCoolStory = funcReturningMyCube()
```

> **Additional Notes**
>
> - There should be stories for every Cube, for documentation purpose.
> - Even though Storybook supports MDX stories, stories should be written in Typescript for better maintainability. MDX is the recommended way to add Documentation Pages (see `src/components/docs/`).
> - If you use VS Code, you can use the `story` custom snippet present in the Repo to automatically generate the boilerplate code for your story.

### 🎨 Chromatic

After pushing code in the repo, Storybook stories are rendered using [Chromatic](https://www.chromatic.com/). This way, Storybook serves for visual testing as well as for development. It is also Chromatic that hosts the [Cubes Storybook](https://develop--5eebb872a669600022881133.chromatic.com).

Here is the [link to the Cubes Chromatic](https://chromatic.com/library?appId=5eebb872a669600022881133&branch=develop).

## 📁 Directory Structure

- `src/` contains sources for the package. Built package does not contain the `src/storybook/` folder and the `*.stories.tsx` files.
- `storybook/` contains the storybook related code. `src/storybook` contains the Storybook related codde which should be used in Stories while the root `storybook/` folder is more for Storybook general configuration.
- `public/` directory contains the basic React App assets for Storybook to work with.
- `.github/` directory contains GitHub related stuff, such as GitHub Workflows.

## 📜 Typescript Structure

There are 2 `tsconfig.json` files in this package:

- `tsconfig.json`: Used by VS Code for code completion and stuff and when building Storybook (doesn't emit anything).
- `tsconfig.build.json`: Used when building the package (output code to `dist/` folder).

## 🚀 Publish

When ready to deploy changes, the whole publish workflow is implemented using GitHub Actions. All you need to do is checkout the latest version of `develop` and then run:

```shell
yarn release
```

This will ask you for the new version number and create a new release branch for you. Once you validated that this new version is valid, simply push this new Release branch. GitHub Actions will take care of opening a PR for you to merge this branch on `master`.

Once the PR is approved ✔️ and merged, `master` will get tagged with the new version and a GitHub Release will be created with the name and description of the merged PR. `master` should automatically be merged back into `develop` afterwards.
