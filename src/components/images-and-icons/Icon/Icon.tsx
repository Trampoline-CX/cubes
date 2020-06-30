import React, { useMemo } from 'react'
import { Theme, useTheme } from '../../../theme'
import { iconMap } from '../__generated__'

export type IconName = keyof typeof iconMap
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
  color?: 'primary' | 'accent' | 'inverse' | 'positive' | 'negative' | 'subdued' | 'success'
}

/**
 * Used to visually communicate core parts of the product and available actions.
 */
export const Icon: React.FC<IconProps> = ({ name, size = 'default', color = 'primary' }) => {
  const theme = useTheme()
  const IconComponent = useMemo(() => iconMap[name], [name])
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
    }
  }, [color, theme])

  return (
    <IconComponent height={theme.size.icon[size]} width={theme.size.icon[size]} color={iconColor} />
  )
}
