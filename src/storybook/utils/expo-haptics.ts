export const selectionAsync = async (): Promise<void> => {}
export const notificationAsync = async (): Promise<void> => {}
export const impactAsync = async (): Promise<void> => {}

export enum ImpactFeedbackStyle {
  /**
   * A collision between small, light user interface elements
   */
  Light = 'light',
  /**
   * A collision between moderately sized user interface elements
   */
  Medium = 'medium',
  /**
   * A collision between large, heavy user interface elements
   */
  Heavy = 'heavy',
}
