import React from 'react'
import { ButtonBasePublicProps, ButtonBase } from '../../ButtonBase/ButtonBase'
import { useStyles } from '../../../../theme'

export type PrimaryButtonProps = ButtonBasePublicProps

export const PrimaryButton: React.FC<PrimaryButtonProps> = props => {
  const styles = useStyles(theme => ({
    container: {
      backgroundColor: theme.colors.fill.primary.default,
      borderWidth: 0,
    },
    label: {
      color: theme.colors.text.inverse,
    },
  }))

  return (
    <ButtonBase
      containerStyle={[styles.container]}
      labelStyle={[styles.label]}
      spinnerColor="inverse"
      borderRadius="medium"
      {...props}
    />
  )
}
