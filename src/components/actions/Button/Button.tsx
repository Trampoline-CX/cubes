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
 * Button triggering certain user actions.
 */
export const Button: React.FC<ButtonProps> = ({ primary = false, ...props }) => {
  if (primary) {
    return <PrimaryButton {...props} />
  } else {
    // Secondary
    return <SecondaryButton {...props} />
  }
}
