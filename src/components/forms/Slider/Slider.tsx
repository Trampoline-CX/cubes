import React from 'react'
import RNSlider from '@react-native-community/slider'
import { Platform } from 'react-native'
import { Box } from '../../structure/Box/Box'
import { Heading, Caption } from '../../text'
import { useTheme } from '../../../theme'

export interface SliderProps {
  /**
   * Initial value. This is a controlled component, do not update this each time `onChange` is called.
   */
  value?: number
  /**
   * Callback called when value changes
   */
  onChange?: (value: number) => void
  /**
   * Label displayed above Slider.
   */
  label: string
  /**
   * Additional text to help in use.
   */
  helpText?: string
  /**
   * Minimum value.
   */
  min?: number
  /**
   * Maximum value.
   */
  max?: number
  /**
   * Increment value.
   */
  step?: number
  /**
   * If true, user won't be able to interact with the component.
   */
  disabled?: boolean
}

/**
 * Let the user select a numeric value in a given range.
 *
 * Note that this is a controlled component. You should not update initialValue when `onChange` is called.
 */
export const Slider: React.FC<SliderProps> = ({
  value = 0,
  onChange,
  label,
  helpText,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
}) => {
  const { colors } = useTheme()

  return (
    <Box space="small">
      <Heading>{label}</Heading>
      <RNSlider
        minimumValue={min}
        maximumValue={max}
        step={step}
        value={value}
        thumbTintColor={
          // Thumb color is different for iOS only
          Platform.OS === 'ios' ? colors.fill.background.lighter : colors.fill.accent.default
        }
        minimumTrackTintColor={colors.fill.accent.default}
        maximumTrackTintColor={colors.fill.background.darker}
        disabled={disabled}
        onValueChange={onChange}
      />
      {helpText ? <Caption variation="subdued">{helpText}</Caption> : null}
    </Box>
  )
}
