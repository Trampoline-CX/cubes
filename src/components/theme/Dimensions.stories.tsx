import React from 'react'
import { View } from 'react-native'
import { fileAbsolute } from 'paths.macro'
import { Centered } from '../../storybook/decorators/Centered'
import { useStyles, useTheme } from '../../theme'
import { Heading } from '../text/Heading/Heading'
import { getStoryTitle } from '../../storybook/get-story-title'
import { Box } from '../structure'

export default {
  title: getStoryTitle(fileAbsolute),
  decorators: [Centered],
}

export const All: React.FC = () => {
  const theme = useTheme()
  return (
    <Box space="medium">
      <Heading>xSmall ({theme.spacing.xSmall}dp)</Heading>
      <Box horizontal space="xSmall">
        <Square />
        <Square />
        <Square />
      </Box>

      <Heading>small ({theme.spacing.small}dp)</Heading>
      <Box horizontal space="small">
        <Square />
        <Square />
        <Square />
      </Box>

      <Heading>medium ({theme.spacing.medium}dp)</Heading>
      <Box horizontal space="medium">
        <Square />
        <Square />
        <Square />
      </Box>

      <Heading>large ({theme.spacing.large}dp)</Heading>
      <Box horizontal space="large">
        <Square />
        <Square />
        <Square />
      </Box>

      <Heading>xLarge ({theme.spacing.xLarge}dp)</Heading>
      <Box horizontal space="xLarge">
        <Square />
        <Square />
        <Square />
      </Box>

      <Heading>xxLarge ({theme.spacing.xxLarge}dp)</Heading>
      <Box horizontal space="xxLarge">
        <Square />
        <Square />
        <Square />
      </Box>
    </Box>
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
