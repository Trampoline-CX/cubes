import React from 'react'
import { View } from 'react-native'
import { useStyles } from '../../../../theme'

export interface ItemProps {
  children: React.ReactNode
  last: boolean
}

export const Item: React.FC<ItemProps> = ({ children, last }) => {
  const styles = useStyles(theme => ({
    item: {
      marginTop: theme.spacing.none,
      marginStart: theme.spacing.medium,
      marginEnd: theme.spacing.medium,
      marginBottom: theme.spacing.medium,
    },
    itemLast: {
      marginBottom: theme.spacing.none,
    },
  }))

  return <View style={[styles.item, last && styles.itemLast]}>{children}</View>
}
