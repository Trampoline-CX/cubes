import React from 'react'
import { View } from 'react-native'
import { fileAbsolute } from 'paths.macro'
import { useStyles, Theme, useTheme } from '../../theme'
import { Heading } from '../text/Heading/Heading'
import { getStoryTitle } from '../../storybook/get-story-title'
import { Box } from '../structure/Box/Box'

export default {
  title: getStoryTitle(fileAbsolute),
}

export const All: React.FC = () => {
  const theme = useTheme()

  return (
    <Box space="medium">
      <Heading>Small ({theme.radius.small}dp)</Heading>
      <Square radius="small" />

      <Heading>Medium ({theme.radius.medium}dp)</Heading>
      <Square radius="medium" />

      <Heading>Large ({theme.radius.large}dp)</Heading>
      <Square radius="large" />

      <Heading>Circle ({theme.radius.circle}dp)</Heading>
      <Square radius="circle" />
    </Box>
  )
}

// ---
interface SquareProps {
  radius: keyof Theme['radius']
}

const Square: React.FC<SquareProps> = ({ radius }) => {
  const styles = useStyles(theme => ({
    container: {
      width: 56,
      height: 56,

      backgroundColor: theme.colors.fill.primary.default,
    },
  }))
  const { radius: themeRadius } = useTheme()

  return <View style={[styles.container, { borderRadius: themeRadius[radius] }]} />
}
