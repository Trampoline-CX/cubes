import React from 'react'
import { Text } from 'react-native'
import { useTextStyles } from '../use-text-styles'
import { TextProps } from '../TextProps'
import { TextStyle } from '../TextStyle/TextStyle'

export interface DisplayTextProps extends TextProps {
  /**
   * Element to use for HTML rendering **(Web only)**
   */
  element?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
}

/**
 * Text that has a strong emphasis. Should be used for titles.
 */
export const DisplayText: React.FC<DisplayTextProps> = ({
  children,
  element = 'p',
  maxLines,
  variation,
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
      {variation ? <TextStyle variation={variation}>{children}</TextStyle> : children}
    </Text>
  )
}
