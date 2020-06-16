import React, { useContext } from 'react'
import { View } from 'react-native'
import { fileAbsolute } from 'paths.macro'
import { Centered } from '../../storybook/decorators/Centered'
import { useStyles, ThemeContext, Theme } from '../../theme'
import { Heading } from '../text/Heading/Heading'
import { getStoryTitle } from '../../storybook/get-story-title'
import { Box } from '../structure'

export default {
  title: getStoryTitle(fileAbsolute),
  decorators: [Centered],
}

export const All: React.FC = () => {
  const theme = useContext(ThemeContext)
  return (
    <Box space="medium">
      <Heading>Disabled ({theme.opacity.disabled})</Heading>
      <Square opacity="disabled" />
    </Box>
  )
}

// ---
interface SquareProps {
  opacity: keyof Theme['opacity']
}

const Square: React.FC<SquareProps> = ({ opacity }) => {
  const styles = useStyles(theme => ({
    container: {
      width: 56,
      height: 56,

      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.5,
      shadowColor: '#000',
      elevation: 2,

      backgroundColor: theme.colors.fill.primary.default,
    },
  }))
  const { opacity: themeOpacity } = useContext(ThemeContext)

  return <View style={[styles.container, { opacity: themeOpacity[opacity] }]} />
}
