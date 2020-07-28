import React, { useMemo } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import MaterialGlyphs from '@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/MaterialIcons.json'
import { Theme, useTheme } from '../../../theme'

// Re-export for convenience
export type IconName = keyof typeof MaterialGlyphs

export type IconSize = Extract<keyof Theme['size']['icon'], string>

export interface IconProps {
  /**
   * Icon name.
   */
  name: IconName
  /**
   * Icon size.
   */
  size?: IconSize
  /**
   * Icon color.
   */
  color?:
    | 'primary'
    | 'accent'
    | 'inverse'
    | 'positive'
    | 'negative'
    | 'subdued'
    | 'success'
    | 'error'
}

/**
 * Used to visually communicate core parts of the product and available actions.
 */
export const Icon: React.FC<IconProps> = ({ name, size = 'default', color = 'primary' }) => {
  const theme = useTheme()
  const iconColor = useMemo(() => {
    switch (color) {
      case 'primary':
        return theme.colors.text.primary
      case 'accent':
        return theme.colors.text.accent
      case 'inverse':
        return theme.colors.text.inverse
      case 'positive':
        return theme.colors.positive
      case 'negative':
        return theme.colors.negative
      case 'subdued':
        return theme.colors.text.subdued
      case 'success':
        return theme.colors.status.success.default
      case 'error':
        return theme.colors.status.error
    }
  }, [color, theme])

  return <MaterialIcons name={name} size={theme.size.icon[size]} color={iconColor} />
}
