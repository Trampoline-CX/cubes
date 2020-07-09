import React, { useCallback } from 'react'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { View } from 'react-native'
import { Box } from '../../structure/Box/Box'
import { Heading, Caption } from '../../text'
import { useStyles } from '../../../theme'
import { useUncontrolledState } from '../../../utils/hooks/use-uncontrolled-state'
import { shameStyles } from '../../../theme/shame-styles'
import { useOnLayout } from '../../../utils/hooks/use-on-layout'
import { Knob } from './Knob/Knob'

export interface SliderProps {
  /**
   * Value of the Slider.
   */
  value?: number
  /**
   * Callback called when value changes.
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

const { track } = shameStyles.slider

/**
 * Let the user select a numeric value in a given range.
 */
export const Slider: React.FC<SliderProps> = ({
  value: valueRaw = 0,
  onChange: onChangeRaw,
  label,
  helpText,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
}) => {
  const styles = useStyles(theme => ({
    container: {},
    containerNoRender: {
      opacity: 0,
    },
    disabled: {
      opacity: theme.opacity.disabled,
    },
    track: {
      height: track.height,
      backgroundColor: theme.colors.fill.background.darker,
      borderRadius: theme.radius.circle,
    },
    selectedTrack: {
      height: track.height,
      backgroundColor: theme.colors.fill.accent.default,
      borderRadius: theme.radius.circle,
    },
  }))
  const [value, onChange] = useUncontrolledState(valueRaw, onChangeRaw)
  const [layout, setLayout] = useOnLayout()

  const onValuesChange = useCallback(
    (values: number[]) => {
      onChange(values[0])
    },
    [onChange],
  )

  return (
    <Box space="small">
      <Heading>{label}</Heading>
      <View
        style={[styles.container, layout ? null : styles.containerNoRender]}
        onLayout={setLayout}
      >
        {/* Wait for parent view to have layout before rendering, as otherwise Slider will have incorrect width */}
        {layout ? (
          <MultiSlider
            min={min}
            max={max}
            step={step}
            sliderLength={layout.width}
            values={[value]}
            // We can't skip this ESLint warning, so we just ignore it
            // eslint-disable-next-line react/jsx-no-bind
            customMarker={props => (
              <Knob {...props} trackLength={layout.width} min={min} max={max} />
            )}
            markerOffsetY={track.height / 2}
            containerStyle={disabled ? styles.disabled : undefined}
            trackStyle={styles.track}
            selectedStyle={styles.selectedTrack}
            enabledOne={!disabled}
            enabledTwo={!disabled}
            onValuesChange={onValuesChange}
          />
        ) : null}
      </View>

      {helpText ? <Caption variation="subdued">{helpText}</Caption> : null}
    </Box>
  )
}
