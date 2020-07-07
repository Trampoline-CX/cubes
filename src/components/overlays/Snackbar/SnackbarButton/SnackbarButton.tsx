import React from 'react'
import { ButtonBasePublicProps, ButtonBase } from '../../../actions/ButtonBase/ButtonBase'
import { useStyles } from '../../../../theme'

export type SnackbarButtonProps = ButtonBasePublicProps

export const SnackbarButton: React.FC<SnackbarButtonProps> = props => {
  const styles = useStyles(theme => ({
    container: {
      backgroundColor: theme.colors.transparent,
    },
    label: {
      color: theme.colors.text.accent,
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
