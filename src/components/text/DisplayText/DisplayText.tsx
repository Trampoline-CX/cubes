import React from 'react'
import { Text } from 'react-native'
import { useTextStyles } from '../use-text-styles'
import { TestProps } from '../../../utils/TestProps'

export interface DisplayTextProps extends TestProps {
  /**
   * Text or Text components (like `TextStyle`)
   */
  children: React.ReactNode
  /**
   * Element to use for HTML rendering **(Web only)**
   */
  element?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
  /**
   * Set a maximum number of lines. If text doesn't fit on these lines, the end of the text is ellipsized.
   */
  maxLines?: number
  /**
   * Alignment of the text.
   */
  textAlign?: 'left' | 'right' | 'center'
}

/**
 * Text that has a strong emphasis. Should be used for titles.
 */
export const DisplayText: React.FC<DisplayTextProps> = ({
  children,
  element = 'p',
  maxLines,
  textAlign,
  testID,
  accessibilityLabel,
}) => {
  const { textStyles } = useTextStyles()

  const isHeader = element.startsWith('h')

  return (
    <Text
      accessibilityRole={isHeader ? 'header' : undefined}
      aria-level={isHeader ? element[1] : undefined}
      style={[textStyles.display, { textAlign }]}
      numberOfLines={maxLines}
      ellipsizeMode="tail"
      testID={testID}
      accessibilityLabel={accessibilityLabel}
    >
      {children}
    </Text>
  )
}
