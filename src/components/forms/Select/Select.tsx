import React, { useState, useCallback, useMemo } from 'react'
import { View, TouchableWithoutFeedback, ScrollView } from 'react-native'
import { Popover } from '../../overlays/Popover/Popover'
import { useStyles } from '../../../theme'
import { BodyText, Heading, Caption } from '../../text'
import { Box } from '../../structure/Box/Box'
import { Touchable } from '../../base/Touchable/Touchable'
import { InlineError } from '../InlineError/InlineError'
import { shameStyles } from '../../../theme/shame-styles'

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
  error,
  disabled = false,
}) => {
  const styles = useStyles(theme => ({
    // Base Styles
    inputContainer: {
      flexDirection: 'row',
      backgroundColor: theme.colors.fill.background.lighter,
      borderColor: theme.colors.fill.primary.default,
      borderWidth: theme.border.small,
      borderRadius: theme.radius.medium,
      height: 40, // Need to enforce height for iOS.
      paddingHorizontal: theme.spacing.medium,
      paddingVertical: theme.spacing.small - theme.border.small,
      alignItems: 'center',
    },

    // Focused Styles
    inputContainerFocused: {
      borderColor: theme.colors.fill.primary.default,
    },

    // Disabled Styles
    inputContainerDisabled: {
      opacity: theme.opacity.disabled,
    },

    popover: {
      maxHeight,
    },
  }))

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
    <Box>
      <TouchableWithoutFeedback onPress={showPopover} disabled={disabled}>
        <View>
          <Box paddingBottom="small">
            <Heading>{label}</Heading>
          </Box>
        </View>
      </TouchableWithoutFeedback>
      <Popover
        open={open}
        activator={
          <Touchable
            viewStyle={[
              styles.inputContainer,
              open && styles.inputContainerFocused,
              disabled && styles.inputContainerDisabled,
            ]}
            onClick={showPopover}
            disabled={disabled}
          >
            <BodyText maxLines={1}>{selectedChoice?.label ?? placeholder}</BodyText>
          </Touchable>
        }
        onRequestClose={hidePopover}
        popoverStyle={styles.popover}
        hideBackdrop
        matchWidth
      >
        <ScrollView>{choiceComponents}</ScrollView>
      </Popover>
      {error && (
        <Box paddingTop="xSmall">
          <InlineError message={typeof error === 'string' ? error : ''} />
        </Box>
      )}
      {helpText && (
        <Box paddingTop="xSmall">
          <Caption variation="subdued">{helpText}</Caption>
        </Box>
      )}
    </Box>
  )
}
