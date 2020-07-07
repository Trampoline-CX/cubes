import React from 'react'
import { IconName, IconProps as OriginalIconProps } from '../../../images-and-icons/Icon/Icon'
import { IconButton } from '../../../actions/IconButton/IconButton'

export interface IconProps {
  /**
   * Name of the icon to display.
   */
  name: IconName
  /**
   * Color of the Icon.
   */
  color?: OriginalIconProps['color']
  /**
   * Called on click of the Icon.
   *
   * If this is not set, there will still be touch feedback, but no action will be performed.
   * Optional mainly for mockup purposes.
   */
  onClick?: () => void
}

/**
 * Set a right-aligned icon in the `TopBar` component.
 */
export const Icon: React.FC<IconProps> = ({
  name,
  color,
  onClick = () => {}, // Defaults to empty action, to keep touch feedback
}) => <IconButton icon={name} onClick={onClick} color={color} />
