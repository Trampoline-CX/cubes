import React from 'react'
import { ButtonBasePublicProps, ButtonBase } from '../../ButtonBase/ButtonBase'
import { useStyles } from '../../../../theme'

export type DestructiveButtonProps = ButtonBasePublicProps

export const DestructiveButton: React.FC<DestructiveButtonProps> = props => {
  const styles = useStyles(theme => ({
    container: {
      backgroundColor: theme.colors.destructive,
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
