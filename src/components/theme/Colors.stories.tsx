import React, { useContext } from 'react'
import { View } from 'react-native'
import { fileAbsolute } from 'paths.macro'
import { Centered } from '../../storybook/decorators/Centered'
import { useStyles, ColorHex, ThemeContext } from '../../theme'
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
      <Heading>Accent</Heading>
      <Box horizontal space="medium">
        <Swatch color={theme.colors.fill.accent.lighter} />
        <Swatch color={theme.colors.fill.accent.default} />
        <Swatch color={theme.colors.fill.accent.darker} />
      </Box>

      <Heading>Accent Secondary</Heading>
      <Box horizontal space="medium">
        <Swatch color={theme.colors.fill.accentSecondary.lighter} />
        <Swatch color={theme.colors.fill.accentSecondary.default} />
        <Swatch color={theme.colors.fill.accentSecondary.darker} />
      </Box>

      <Heading>Primary</Heading>
      <Box horizontal space="medium">
        <Swatch color={theme.colors.fill.primary.lighter} />
        <Swatch color={theme.colors.fill.primary.default} />
        <Swatch color={theme.colors.fill.primary.darker} />
      </Box>

      <Heading>Background</Heading>
      <Box horizontal space="medium">
        <Swatch color={theme.colors.fill.background.lighter} />
        <Swatch color={theme.colors.fill.background.default} />
        <Swatch color={theme.colors.fill.background.darker} />
      </Box>

      <Heading>Text</Heading>
      <Box horizontal space="medium">
        <Swatch color={theme.colors.text.primary} />
        <Swatch color={theme.colors.text.subdued} />
        <Swatch color={theme.colors.text.accent} />
        <Swatch color={theme.colors.text.inverse} />
      </Box>

      <Heading>Divider</Heading>
      <Box horizontal space="medium">
        <Swatch color={theme.colors.fill.divider.lighter} />
        <Swatch color={theme.colors.fill.divider.default} />
        <Swatch color={theme.colors.fill.divider.darker} />
      </Box>

      <Heading>Positive / Negative / Destructive</Heading>
      <Box horizontal space="medium">
        <Swatch color={theme.colors.positive} />
        <Swatch color={theme.colors.negative} />
        <Swatch color={theme.colors.destructive} />
      </Box>

      <Heading>Success</Heading>
      <Box horizontal space="medium">
        <Swatch color={theme.colors.status.success.lighter} />
        <Swatch color={theme.colors.status.success.default} />
        <Swatch color={theme.colors.status.success.darker} />
      </Box>

      <Heading>Warning / Error</Heading>
      <Box horizontal space="medium">
        <Swatch color={theme.colors.status.warning} />
        <Swatch color={theme.colors.status.error} />
      </Box>
    </Box>
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
