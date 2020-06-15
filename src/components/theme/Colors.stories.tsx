import React, { useContext } from 'react'
import { View } from 'react-native'
import { fileAbsolute } from 'paths.macro'
import { Stack } from '../structure/Stack/Stack'
import { Centered } from '../../storybook/decorators/Centered'
import { useStyles, ColorHex, ThemeContext } from '../../theme'
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
      <Heading>Accent</Heading>
      <Stack horizontal space="medium">
        <Swatch color={theme.colors.fill.accent.lighter} />
        <Swatch color={theme.colors.fill.accent.default} />
        <Swatch color={theme.colors.fill.accent.darker} />
      </Stack>

      <Heading>Accent Secondary</Heading>
      <Stack horizontal space="medium">
        <Swatch color={theme.colors.fill.accentSecondary.lighter} />
        <Swatch color={theme.colors.fill.accentSecondary.default} />
        <Swatch color={theme.colors.fill.accentSecondary.darker} />
      </Stack>

      <Heading>Primary</Heading>
      <Stack horizontal space="medium">
        <Swatch color={theme.colors.fill.primary.lighter} />
        <Swatch color={theme.colors.fill.primary.default} />
        <Swatch color={theme.colors.fill.primary.darker} />
      </Stack>

      <Heading>Background</Heading>
      <Stack horizontal space="medium">
        <Swatch color={theme.colors.fill.background.lighter} />
        <Swatch color={theme.colors.fill.background.default} />
        <Swatch color={theme.colors.fill.background.darker} />
      </Stack>

      <Heading>Text</Heading>
      <Stack horizontal space="medium">
        <Swatch color={theme.colors.text.primary} />
        <Swatch color={theme.colors.text.subdued} />
        <Swatch color={theme.colors.text.accent} />
        <Swatch color={theme.colors.text.inverse} />
      </Stack>

      <Heading>Divider</Heading>
      <Stack horizontal space="medium">
        <Swatch color={theme.colors.fill.divider.lighter} />
        <Swatch color={theme.colors.fill.divider.default} />
        <Swatch color={theme.colors.fill.divider.darker} />
      </Stack>

      <Heading>Positive / Negative / Destructive</Heading>
      <Stack horizontal space="medium">
        <Swatch color={theme.colors.positive} />
        <Swatch color={theme.colors.negative} />
        <Swatch color={theme.colors.destructive} />
      </Stack>

      <Heading>Success</Heading>
      <Stack horizontal space="medium">
        <Swatch color={theme.colors.status.success.lighter} />
        <Swatch color={theme.colors.status.success.default} />
        <Swatch color={theme.colors.status.success.darker} />
      </Stack>

      <Heading>Warning / Error</Heading>
      <Stack horizontal space="medium">
        <Swatch color={theme.colors.status.warning} />
        <Swatch color={theme.colors.status.error} />
      </Stack>
    </Stack>
  )
}

// ---

interface SwatchProps {
  color: ColorHex
  fill?: boolean
}

const Swatch: React.FC<SwatchProps> = ({ color, fill }) => {
  const styles = useStyles(() => ({
    container: {
      flex: fill ? 1 : undefined,
      width: 56,
      height: 56,

      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.5,
      shadowColor: '#000',
      elevation: 2,

      backgroundColor: color,
    },
  }))

  return <View style={styles.container} />
}
