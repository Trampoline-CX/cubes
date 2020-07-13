import React from 'react'
import { Text } from 'react-native'
import { useTextStyles } from '../use-text-styles'
import { TextProps } from '../TextProps'
import { TextStyle } from '../TextStyle/TextStyle'

export type CaptionProps = TextProps

/**
 * Text size is smaller than the recommended size for general reading.
 * Can be used as help text or for secondary information.
 */
export const Caption: React.FC<CaptionProps> = ({
  maxLines,
  textAlign,
  variation,
  children,
  testID,
  accessibilityLabel,
}) => {
  const { textStyles } = useTextStyles()

  return (
    <Text
      style={[textStyles.caption, { textAlign }]}
      ellipsizeMode="tail"
      testID={testID}
      numberOfLines={maxLines}
      accessibilityLabel={accessibilityLabel}
    >
      {variation ? <TextStyle variation={variation}>{children}</TextStyle> : children}
    </Text>
  )
}
