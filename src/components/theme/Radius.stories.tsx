import React, { useContext } from 'react'
import { View } from 'react-native'
import { fileAbsolute } from 'paths.macro'
import { Stack } from '../structure/Stack/Stack'
import { Centered } from '../../storybook/decorators/Centered'
import { useStyles, ThemeContext, Theme } from '../../theme'
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
      <Heading>Small ({theme.radius.small}dp)</Heading>
      <Square radius="small" />

      <Heading>Medium ({theme.radius.medium}dp)</Heading>
      <Square radius="medium" />

      <Heading>Large ({theme.radius.large}dp)</Heading>
      <Square radius="large" />

      <Heading>Circle ({theme.radius.circle}dp)</Heading>
      <Square radius="circle" />
    </Stack>
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
  const { radius: themeRadius } = useContext(ThemeContext)

  return <View style={[styles.container, { borderRadius: themeRadius[radius] }]} />
}
