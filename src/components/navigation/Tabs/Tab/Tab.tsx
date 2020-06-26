import React from 'react'
import { Touchable } from '../../../base'
import { useStyles } from '../../../../theme'
import { Box } from '../../../structure'
import { BodyText } from '../../../text'

export interface TabProps {
  label: string
  selected: boolean
  onSelect: () => void
}

export const Tab: React.FC<TabProps> = ({ label, selected, onSelect }) => {
  const styles = useStyles(theme => ({
    touchable: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing.small,
    },
    touchableSelected: {
      borderBottomWidth: theme.border.small,
      borderBottomColor: theme.colors.fill.accent.default,
    },
  }))

  return (
    <Box fill>
      <Touchable
        viewStyle={[styles.touchable, selected && styles.touchableSelected]}
        onClick={onSelect}
      >
        <BodyText textAlign="center" variation={selected ? 'accent' : undefined}>
          {label}
        </BodyText>
      </Touchable>
    </Box>
  )
}
