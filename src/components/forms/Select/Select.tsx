import React, { useState } from 'react'
import { View } from 'react-native'
import { TextAction } from '../../actions'
import { useStyles } from '../../../theme'
import { Popover } from '../../overlays'
import { BodyText } from '../../text'
import { Touchable } from '../../base'

export interface SelectOption {
  label: string
}

export interface SelectProps {
  options: SelectOption[]
}

export const Select: React.FC<SelectProps> = ({ options }) => {
  const styles = useStyles(theme => ({
    container: {
      backgroundColor: theme.colors.fill.background.lighter,
      borderWidth: theme.border.small,
      borderColor: theme.colors.fill.primary.default,
      borderRadius: theme.radius.medium,
      paddingHorizontal: theme.spacing.medium,
      paddingVertical: theme.spacing.small - theme.border.small,
      overflow: 'hidden',
    },
  }))
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(null)

  return (
    <Popover
      trigger={
        <Touchable viewStyle={styles.container}>
          <BodyText>{selectedOption?.label ?? 'Please select something'}</BodyText>
        </Touchable>
      }
    >
      {options.map((option, i) => (
        <Popover.Item key={i} label={option.label} onSelect={() => setSelectedOption(option)} />
      ))}
    </Popover>
  )
}
