import React, { useContext } from 'react'
import { Switch as RNSwitch, Platform } from 'react-native'
import { ThemeContext } from '../../../theme'
import { shameStyles } from '../../../theme/shame-styles'

export interface SwitchProps {
  /**
   * Set to true if options is enabled.
   */
  checked: boolean
  /**
   * Called when `checked` property is changed. `checked` property should reflect change.
   */
  onChecked: (checked: boolean) => void
}

/**
 * Switch component to toggle yes/no, enabled/disabled options.
 *
 * >**Note:** The look of this component is very different depending if you are on Android or iOS.
 */
export const Switch: React.FC<SwitchProps> = ({ checked, onChecked }) => {
  const theme = useContext(ThemeContext)

  return (
    <RNSwitch
      trackColor={
        Platform.OS === 'ios'
          ? {
              true: theme.colors.fill.accent.default,
              false: theme.colors.fill.background.darker,
            }
          : {
              true: shameStyles.switch.android.track.on,
              false: shameStyles.switch.android.track.off,
            }
      }
      thumbColor={
        Platform.OS === 'ios'
          ? undefined
          : checked
          ? theme.colors.fill.accent.default
          : shameStyles.switch.android.thumb.off
      }
      onValueChange={onChecked}
      value={checked}
    />
  )
}
