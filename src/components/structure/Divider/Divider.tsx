import React from 'react'
import { View } from 'react-native'
import { useStyles } from '../../../theme'

/**
 * Used to separate content into logical sections.
 */
export const Divider: React.FC = () => {
  const styles = useStyles(theme => ({
    divider: {
      backgroundColor: theme.colors.fill.divider.default,
      height: theme.size.divider,
    },
  }))

  return <View style={styles.divider} />
}
