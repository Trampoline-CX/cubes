// mock global and local addDecorator so they are not in snapshot
jest.mock('@storybook/react-native', () => {
  const actual = require.requireActual('@storybook/react-native')
  return {
    ...actual,
    storiesOf: (...args: []): unknown => {
      const storybook = actual.storiesOf(...args)
      storybook.addDecorator = (): unknown => storybook
      return storybook
    },
    addDecorator: (): unknown => null,
  }
})
