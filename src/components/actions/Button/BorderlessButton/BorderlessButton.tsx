import React from 'react'
import { ButtonBasePublicProps, ButtonBase } from '../../ButtonBase/ButtonBase'
import { useStyles } from '../../../../theme'

export type BorderlessButtonProps = ButtonBasePublicProps

export const BorderlessButton: React.FC<BorderlessButtonProps> = props => {
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
      spinnerColor="accent"
      borderRadius="medium"
      {...props}
    />
  )
}
