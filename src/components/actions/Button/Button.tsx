import React from 'react'
import { ButtonBasePublicProps } from '../ButtonBase/ButtonBase'
import { SecondaryButton } from './SecondaryButton/SecondaryButton'
import { PrimaryButton } from './PrimaryButton/PrimaryButton'
import { DestructiveButton } from './DestructiveButton/DestructiveButton'
import { BorderlessButton } from './BorderlessButton/BorderlessButton'

export interface ButtonProps extends ButtonBasePublicProps {
  /**
   * Set to true to have a primary button.
   */
  primary?: boolean
  /**
   * Set to true to have a destructive button.
   */
  destructive?: boolean
  /**
   * Set to true to have a borderless button.
   */
  borderless?: boolean
}

/**
 * Button triggering certain user actions.
 */
export const Button: React.FC<ButtonProps> = ({
  primary = false,
  destructive = false,
  borderless = false,
  ...props
}) => {
  if (destructive) {
    return <DestructiveButton {...props} />
  } else if (primary) {
    return <PrimaryButton {...props} />
  } else if (borderless) {
    return <BorderlessButton {...props} />
  } else {
    // Secondary
    return <SecondaryButton {...props} />
  }
}
