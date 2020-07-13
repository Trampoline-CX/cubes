import React from 'react'
import { ButtonBasePublicProps } from '../ButtonBase/ButtonBase'
import { SecondaryButton } from './SecondaryButton/SecondaryButton'
import { PrimaryButton } from './PrimaryButton/PrimaryButton'

export interface ButtonProps extends ButtonBasePublicProps {
  /**
   * Set to true to have a primary button.
   */
  primary?: boolean
}

/**
 * Buttons are used primarily for actions, such as "Add", "Close", "Cancel", or "Save".
 * Primary buttons, which have more emphasis, should be used to highlight a primary
 * action.
 */
export const Button: React.FC<ButtonProps> = ({ primary, ...props }) => {
  if (primary) {
    return <PrimaryButton {...props} />
  } else {
    // Secondary
    return <SecondaryButton {...props} />
  }
}
