import React from 'react'
import { ButtonBasePublicProps, ButtonBase } from '../../ButtonBase/ButtonBase'
import { useStyles } from '../../../../theme'

export type SecondaryButtonProps = ButtonBasePublicProps

export const SecondaryButton: React.FC<SecondaryButtonProps> = props => {
  const styles = useStyles(theme => ({
    container: {
      backgroundColor: theme.colors.transparent,
      borderColor: theme.colors.fill.primary.default,
      borderWidth: theme.border.small,
    },
    label: {
      color: theme.colors.text.primary,
    },
  }))

  return (
    <ButtonBase
      containerStyle={[styles.container]}
      labelStyle={[styles.label]}
      borderRadius="medium"
      {...props}
    />
  )
}
