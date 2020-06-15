import React from 'react'
import { Text } from 'react-native'
import { useTextStyles } from '../use-text-styles'
import { TestProps } from '../../../utils/TestProps'

export interface CaptionProps extends TestProps {
  /**
   * Text or text components (like `TextStyle`).
   */
  children: React.ReactNode
}

/**
 * Display a caption, less important text than `BodyText`.
 */
export const Caption: React.FC<CaptionProps> = ({ children, testID, accessibilityLabel }) => {
  const { textStyles } = useTextStyles()

  return (
    <Text style={textStyles.caption} testID={testID} accessibilityLabel={accessibilityLabel}>
      {children}
    </Text>
  )
}
