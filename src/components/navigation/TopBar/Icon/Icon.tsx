import React from 'react'
import { IconName } from '../../../icons'
import { IconButton } from '../../../actions'

export interface IconProps {
  /**
   * Name of the icon to display.
   */
  name: IconName
  /**
   * Called on click of the Icon.
   */
  onClick: () => void
}

/**
 * Set a right-aligned icon in the `TopBar` component.
 */
export const Icon: React.FC<IconProps> = ({ name, onClick }) => (
  <IconButton icon={name} onClick={onClick} />
)
