import React, { useState, useCallback, useMemo } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { Popover } from '../../overlays/Popover/Popover'
import { shameStyles } from '../../../theme/shame-styles'
import { BaseInputContainer } from '../../base/BaseInput/BaseInputContainer'
import { BaseInput } from '../../base/BaseInput/BaseInput'

export interface SelectChoice {
  /**
   * Label for the Option.
   */
  label: string
  /**
   * Value for the option.
   */
  value: string
  /**
   * Disable this option.
   */
  disabled?: boolean
}

export interface SelectProps {
  /**
   * Label for the Select.
   */
  label: string
  /**
   * Choices available in the Select.
   */
  choices: SelectChoice[]
  /**
   * Currently selected value. If null, no value is selected.
   */
  selected: string | null
  /**
   * Callback called when selection is changed.
   */
  onChange: (selected: string) => void
  /**
   * Text to display as a placeholder.
   */
  placeholder?: string
  /**
   * Additional text to help the user.
   */
  helpText?: React.ReactNode
  /**
   * Display an error state.
   */
  error?: boolean | string
  /**
   * Disable the input and choice selection.
   */
  disabled?: boolean
}

const { maxHeight } = shameStyles.select

/**
 * Let the user choose one option from multiple ones.
 */
export const Select: React.FC<SelectProps> = ({
  label,
  choices,
  selected,
  onChange,
  placeholder,
  helpText,
  error = false,
  disabled = false,
}) => {
  const [open, setOpen] = useState(false)
  const showPopover = useCallback(() => setOpen(true), [])
  const hidePopover = useCallback(() => setOpen(false), [])

  const selectedChoice = useMemo(() => choices.find(x => x.value === selected), [choices, selected])

  const choiceComponents = useMemo(
    () =>
      choices.map(choice => (
        <Popover.Item
          key={choice.value}
          label={choice.label}
          disabled={choice.disabled}
          // eslint-disable-next-line react/jsx-no-bind
          onSelect={() => onChange(choice.value)}
        />
      )),
    [choices, onChange],
  )

  return (
    <BaseInputContainer
      label={label}
      disabled={disabled}
      helpText={helpText}
      error={error}
      onLabelClick={showPopover}
    >
      <Popover
        open={open}
        activator={
          <BaseInput
            value={selectedChoice?.label ?? ''}
            placeholder={placeholder}
            disabled={disabled}
            focused={open}
            onClick={showPopover}
          />
        }
        onRequestClose={hidePopover}
        popoverStyle={styles.popover}
        hideBackdrop
        matchWidth
      >
        <ScrollView>{choiceComponents}</ScrollView>
      </Popover>
    </BaseInputContainer>
  )
}

const styles = StyleSheet.create({
  popover: {
    maxHeight,
  },
})
