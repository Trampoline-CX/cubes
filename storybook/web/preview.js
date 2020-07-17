import { addParameters } from '@storybook/react'
import { Background } from '../../src/storybook/decorators/Background'
import { WithAppProvider } from '../../src/storybook/decorators/WithAppProvider'

addParameters({
  viewMode: 'docs',
  options: {
    // Sort stories based on name
    storySort: (a, b) =>
      a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  },
})

// Add control for toggling components theme
export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'light', icon: 'circlehollow', title: 'Light' },
        { value: 'dark', icon: 'circle', title: 'Dark' },
        { value: 'side-by-side', icon: 'sidebar', title: 'side by side' },
        { value: 'stacked', icon: 'bottombar', title: 'stacked' },
      ],
    },
  },
}

export const decorators = [Background, WithAppProvider]
