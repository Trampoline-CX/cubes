import React, { useContext } from 'react'
import { View } from 'react-native'
import { Theme, ThemeContext } from '../../../theme'

export interface SpaceProps {
  /**
   * Spacing value.
   */
  value: Extract<keyof Theme['spacing'], string>
}

/**
 * Add spacing between components.
 */
export const Space: React.FC<SpaceProps> = ({ value }) => {
  const theme = useContext(ThemeContext)

  return <View style={{ width: theme.spacing[value], height: theme.spacing[value] }} />
}
