import { IconName } from '../images-and-icons'

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
  action: () => void
}

export interface IconAction {
  /**
   * Icon to display.
   */
  icon: IconName
  /**
   * Action to execute on click.
   */
  action: () => void
}
