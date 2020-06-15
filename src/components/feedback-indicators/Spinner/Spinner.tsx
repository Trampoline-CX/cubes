import React, { useContext } from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'
import { ThemeContext } from '../../../theme'
import { shameStyles } from '../../../theme/shame-styles'
import { TestProps } from '../../../utils/TestProps'

export interface SpinnerProps extends TestProps {
  /**
   * Color of the Spinner.
   */
  color?: 'primary' | 'inverse' | 'accent' | 'subdued'
}

/**
 * Spinner component displaying an indefinite loading indicator.
 */
export const Spinner: React.FC<SpinnerProps> = ({
  color = 'primary',
  accessibilityLabel,
  testID,
}) => {
  const theme = useContext(ThemeContext)
  const indicatorColor =
    color === 'inverse'
      ? theme.colors.text.inverse
      : color === 'primary'
      ? theme.colors.fill.primary.default
      : color === 'accent'
      ? theme.colors.fill.accent.default
      : theme.colors.text.subdued

  return (
    <View style={styles.container}>
      <ActivityIndicator
        style={styles.activityIndicator}
        color={indicatorColor}
        size="large"
        accessibilityLabel={accessibilityLabel}
        testID={testID}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: shameStyles.spinner.size,
    height: shameStyles.spinner.size,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicator: {
    transform: [
      // Large `ActivityIndicator` has size of 36, we therefore need to scale it down to get a size of 24.
      { scale: shameStyles.spinner.size / 36 },
    ],
  },
})
