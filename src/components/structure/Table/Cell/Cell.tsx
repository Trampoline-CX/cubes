import React from 'react'
import { View } from 'react-native'
import { useStyles } from '../../../../theme'

export interface CellProps {
  flex: number
  children: React.ReactNode
}

export const Cell: React.FC<CellProps> = ({ flex, children }) => {
  const styles = useStyles(theme => ({
    cell: {
      padding: theme.spacing.medium,
    },
  }))

  return <View style={[styles.cell, { flex }]}>{children}</View>
}
