import React from 'react'
import { Text } from 'react-native'
import { TextStyleProps, TextStyle } from '../TextStyle/TextStyle'
import { useTextStyles } from '../use-text-styles'
import { TestProps } from '../../../utils/TestProps'

export interface BodyTextProps extends TestProps {
  /**
   * Text or children text components, like `TextStyle`.
   */
  children: React.ReactNode
  /**
   * Set a maximum number of lines. If text doesn't fit on these lines, the end of the text is ellipsized.
   */
  maxLines?: number
  /**
   * Variation of the text.
   */
  variation?: TextStyleProps['variation']
  /**
   * Alignment of the text.
   */
  textAlign?: 'left' | 'right' | 'center'
}

/**
 * Normal size text.
 */
export const BodyText: React.FC<BodyTextProps> = ({
  children,
  maxLines,
  variation,
  textAlign,
  testID,
  accessibilityLabel,
}) => {
  const { textStyles } = useTextStyles()

  return (
    <Text
      style={[textStyles.body, { textAlign }]}
      numberOfLines={maxLines}
      ellipsizeMode="tail"
      testID={testID}
      accessibilityLabel={accessibilityLabel}
    >
      {variation ? <TextStyle variation={variation}>{children}</TextStyle> : children}
    </Text>
  )
}
