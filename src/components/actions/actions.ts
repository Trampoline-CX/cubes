import { IconName, IconProps } from '../images-and-icons/Icon/Icon'

/**
 * Action with a Label.
 */
export interface TextAction {
  /**
   * Label to display.
   */
  label: string
  /**
   * Action to execute on click.
   */
  action?: () => void
}

export interface IconAction {
  /**
   * Icon to display.
   */
  icon: IconName
  /**
   * Color of the icon.
   */
  color?: IconProps['color']
  /**
   * Action to execute on click.
   */
  action?: () => void
}
