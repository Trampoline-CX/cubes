import React, { useContext } from 'react'
import { View } from 'react-native'
import { fileAbsolute } from 'paths.macro'
import { Stack } from '../structure/Stack/Stack'
import { Centered } from '../../storybook/decorators/Centered'
import { useStyles, ThemeContext } from '../../theme'
import { Heading } from '../text/Heading/Heading'
import { getStoryTitle } from '../../storybook/get-story-title'

export default {
  title: getStoryTitle(fileAbsolute),
  decorators: [Centered],
}

export const All: React.FC = () => {
  const theme = useContext(ThemeContext)
  return (
    <Stack space="medium">
      <Heading>xSmall ({theme.spacing.xSmall}dp)</Heading>
      <Stack horizontal space="xSmall">
        <Square />
        <Square />
        <Square />
      </Stack>

      <Heading>small ({theme.spacing.small}dp)</Heading>
      <Stack horizontal space="small">
        <Square />
        <Square />
        <Square />
      </Stack>

      <Heading>medium ({theme.spacing.medium}dp)</Heading>
      <Stack horizontal space="medium">
        <Square />
        <Square />
        <Square />
      </Stack>

      <Heading>large ({theme.spacing.large}dp)</Heading>
      <Stack horizontal space="large">
        <Square />
        <Square />
        <Square />
      </Stack>

      <Heading>xLarge ({theme.spacing.xLarge}dp)</Heading>
      <Stack horizontal space="xLarge">
        <Square />
        <Square />
        <Square />
      </Stack>

      <Heading>xxLarge ({theme.spacing.xxLarge}dp)</Heading>
      <Stack horizontal space="xxLarge">
        <Square />
        <Square />
        <Square />
      </Stack>
    </Stack>
  )
}

// ---

const Square: React.FC = () => {
  const styles = useStyles(theme => ({
    container: {
      width: 56,
      height: 56,

      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.5,
      shadowColor: '#000',
      elevation: 2,

      backgroundColor: theme.colors.fill.accent.default,
    },
  }))

  return <View style={styles.container} />
}
