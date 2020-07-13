import React from 'react'
import { View } from 'react-native'
import { fileAbsolute } from 'paths.macro'
import { useStyles, Theme, useTheme } from '../../theme'
import { Box } from '../structure/Box/Box'
import { Heading } from '../text/Heading/Heading'
import { getStoryTitle } from '../../storybook/get-story-title'

export default {
  title: getStoryTitle(fileAbsolute),
}

export const All: React.FC = () => {
  const theme = useTheme()
  return (
    <Box padding="medium" space="medium">
      <Heading>thinner ({theme.border.thinner}dp)</Heading>
      <Square border="thinner" />

      <Heading>small ({theme.border.small}dp)</Heading>
      <Square border="small" />
    </Box>
  )
}

// ---
interface SquareProps {
  border: keyof Theme['border']
}

const Square: React.FC<SquareProps> = ({ border }) => {
  const styles = useStyles(theme => ({
    container: {
      width: 56,
      height: 56,

      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.5,
      shadowColor: '#000',
      elevation: 2,

      backgroundColor: theme.colors.fill.background.lighter,
      borderColor: theme.colors.fill.primary.default,
    },
  }))
  const { border: borders } = useTheme()

  return <View style={[styles.container, { borderWidth: borders[border] }]} />
}
