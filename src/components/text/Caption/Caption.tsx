import React from 'react'
import { Text } from 'react-native'
import { useTextStyles } from '../use-text-styles'
import { TextProps } from '../TextProps'
import { TextStyle } from '../TextStyle/TextStyle'

export type CaptionProps = TextProps

/**
 * Display a caption, less important text than `BodyText`.
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
