import React from 'react'
import { View, TouchableWithoutFeedback } from 'react-native'
import { Box } from '../../structure/Box/Box'
import { InlineError } from '../../forms/InlineError/InlineError'
import { Caption, Heading } from '../../text'

export interface BaseInputContainerProps {
  /**
   * Label shown above the input.
   */
  label: string
  /**
   * Callback called on click of the label.
   */
  onLabelClick: () => void
  /**
   * Additional text to help the user.
   */
  helpText: React.ReactNode
  /**
   * Display an error state.
   */
  error: boolean | string
  /**
   * Disable the input.
   */
  disabled: boolean
  /**
   * TextInput component.
   */
  children: React.ReactNode
  /**
   * Hides the label.
   */
  hideLabel?: boolean
}

/**
 * Wraps a basic Input field with label, helpText and error features.
 */
export const BaseInputContainer: React.FC<BaseInputContainerProps> = ({
  label,
  error,
  helpText,
  disabled,
  children,
  onLabelClick,
  hideLabel = false,
}) => (
  <Box>
    {!hideLabel && (
      <TouchableWithoutFeedback onPress={onLabelClick} disabled={disabled}>
        <View>
          <Box paddingBottom="small">
            <Heading>{label}</Heading>
          </Box>
        </View>
      </TouchableWithoutFeedback>
    )}

    {/* Actual Input goes here */}
    {children}

    {error ? (
      <Box paddingTop="xSmall">
        <InlineError message={typeof error === 'string' ? error : ''} />
      </Box>
    ) : null}
    {helpText ? (
      <Box paddingTop="xSmall">
        <Caption variation="subdued">{helpText}</Caption>
      </Box>
    ) : null}
  </Box>
)
