import React from 'react'
import { TextAction, Button } from '../../../actions'
import { ButtonGroup, Box } from '../../../structure'

export interface FooterProps {
  /**
   * Primary action to perform in the Dialog. Will be displayed as a Primary Button.
   */
  primaryAction: TextAction
  /**
   * Optional Secondary actions that can be performed (will appear in reverse order,
   * as first option is the most important and should appear on the right).
   *
   * Use secondary options sparingly, most times, a maximum of 1 secondary action should
   * be enough.
   */
  secondaryActions?: TextAction[]
}

/**
 * Displays the Modal Footer.
 */
export const Footer: React.FC<FooterProps> = ({ primaryAction, secondaryActions = [] }) => (
  <Box padding="medium">
    <ButtonGroup alignment="end">
      {secondaryActions?.reverse()?.map(({ action, label }, i) => (
        <Button key={i} onClick={action}>
          {label}
        </Button>
      ))}
      <Button primary onClick={primaryAction.action}>
        {primaryAction.label}
      </Button>
    </ButtonGroup>
  </Box>
)
