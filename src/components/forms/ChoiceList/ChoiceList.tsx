import React from 'react'
import { Box } from '../../structure/Box/Box'
import { Checkbox, CheckboxProps } from '../Checkbox/Checkbox'
import { RadioButton, RadioButtonProps } from '../RadioButton/RadioButton'
import { BodyText } from '../../text'
import { InlineError } from '../InlineError/InlineError'
import { useUncontrolledState } from '../../../utils/hooks/use-uncontrolled-state'

export interface Choice {
  /**
   * Label for the choice.
   */
  label: React.ReactNode
  /**
   * Value of the choice.
   */
  value: string
  /**
   * Additional text to aid in use.
   */
  helpText?: React.ReactNode
  /**
   * Disable choice.
   */
  disabled?: boolean
}

export interface ChoiceListProps {
  /**
   * List of choices.
   */
  choices: Choice[]
  /**
   * List of selected choices.
   */
  selected?: string[]
  /**
   * Label for the list of choices.
   */
  title: React.ReactNode
  /**
   * Allow multiple choices to be made.
   */
  allowMultiple?: boolean
  /**
   * Disable all choices.
   */
  disabled?: boolean
  /**
   * Display an error message.
   */
  error?: string
  /**
   * Callback when the selected choices change.
   *
   * If not set, component will be an uncontrolled component. @see https://reactjs.org/docs/uncontrolled-components.html
   */
  onChange?: (selected: string[]) => void
}

/**
 * Let you create a list of grouped radio buttons or checkboxes.
 * Use this to group a list of choices together.
 */
export const ChoiceList: React.FC<ChoiceListProps> = ({
  choices,
  selected: selectedRaw = [],
  title,
  allowMultiple = false,
  error,
  disabled = false,
  onChange: onChangeRaw,
}) => {
  const [selected, onChange] = useUncontrolledState(selectedRaw, onChangeRaw)
  const itemProps: ItemsProps[] = choices.map(
    ({ label, value, disabled: disabledItem, helpText }) => ({
      key: value,
      label,
      checked: selected.indexOf(value) >= 0,
      disabled: disabledItem || disabled,
      helpText,
      onChange: checked => onChange(updateSelectedChoices(value, checked, selected, allowMultiple)),
    }),
  )
  const ItemComponent = allowMultiple ? Checkbox : RadioButton

  // eslint-disable-next-line react/jsx-key
  const children = itemProps.map(props => <ItemComponent {...props} />)

  return (
    <Box space="small">
      <BodyText>{title}</BodyText>
      {error ? <InlineError message={error} /> : null}
      {children}
    </Box>
  )
}

/**
 * Update the selected choices array when an item is checked/unchecked.
 */
const updateSelectedChoices = (
  value: string,
  checked: boolean,
  selected: string[],
  allowMultiple: boolean,
): string[] => {
  if (checked) {
    return allowMultiple ? [...selected, value] : [value]
  }

  return selected.filter(choice => choice !== value)
}

type ItemsProps = CheckboxProps & RadioButtonProps & { key: React.Key }
