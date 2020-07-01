import React from 'react'
import { Text } from 'react-native'
import { TextStyle } from '../TextStyle/TextStyle'
import { useTextStyles } from '../use-text-styles'
import { TextProps } from '../TextProps'

export type BodyTextProps = TextProps

/**
 * Text for general reading.
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
