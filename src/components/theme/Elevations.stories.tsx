import React from 'react'
import { View } from 'react-native'
import { fileAbsolute } from 'paths.macro'
import { Centered } from '../../storybook/decorators/Centered'
import { useStyles, Theme, useTheme } from '../../theme'
import { Heading } from '../text/Heading/Heading'
import { getStoryTitle } from '../../storybook/get-story-title'
import { Box } from '../structure/Box/Box'

export default {
  title: getStoryTitle(fileAbsolute),
  decorators: [Centered],
}

export const All: React.FC = () => (
  <Box space="medium">
    <Heading>z0</Heading>
    <Square z="z0" />

    <Heading>z2</Heading>
    <Square z="z2" />

    <Heading>z4</Heading>
    <Square z="z4" />
  </Box>
)

// ---
interface SquareProps {
  z: keyof Theme['elevation']
}

const Square: React.FC<SquareProps> = ({ z }) => {
  const styles = useStyles(theme => ({
    container: {
      width: 56,
      height: 56,

      backgroundColor: theme.colors.fill.background.lighter,
    },
  }))
  const { elevation } = useTheme()

  return <View style={[styles.container, elevation[z]]} />
}
