import React from 'react'
import { Text } from 'react-native'
import { useStyles } from '../../../theme'

export interface TextStyleProps {
  /**
   * Text or Text components (like other ̀`TextStyle` components).
   */
  children: React.ReactNode
  /**
   * Style variation of the text.
   */
  variation: 'positive' | 'negative' | 'strong' | 'subdued' | 'error' | 'accent' | 'inverse'
}

/**
 * Enhances text with additional visual meaning.
 */
export const TextStyle: React.FC<TextStyleProps> = ({ children, variation }) => {
  const styles = useStyles(theme => ({
    positive: {
      color: theme.colors.positive,
    },
    negative: {
      color: theme.colors.negative,
    },
    strong: {
      fontWeight: theme.font.weights.strong,
    },
    subdued: {
      color: theme.colors.text.subdued,
    },
    error: {
      color: theme.colors.status.error,
    },
    accent: {
      color: theme.colors.text.accent,
    },
    inverse: {
      color: theme.colors.text.inverse,
    },
  }))

  return <Text style={styles[variation]}>{children}</Text>
}
