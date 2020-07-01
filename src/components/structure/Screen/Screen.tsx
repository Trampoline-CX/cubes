import React from 'react'
import { useSafeArea } from 'react-native-safe-area-context'
import { View, ViewStyle, KeyboardAvoidingView } from 'react-native'
import { useStyles } from '../../../theme'
import { Content } from './Content/Content'

export interface ScreenProps {
  /**
   * Views displayed in the screen.
   */
  children: React.ReactNode
  /**
   * Insets to use for safe areas.
   */
  useInsets?: 'none' | 'all' | 'top' | 'bottom'
  /**
   * If true, will wrap children views in a `KeyboardAvoidingView`.
   */
  avoidKeyboard?: boolean
}

/**
 * Build the outer wrapper of a screen, with themed background and insets support for mobile devices.
 */
export const Screen: React.FC<ScreenProps> & { Content: typeof Content } = ({
  children,
  useInsets = 'none',
  avoidKeyboard = false,
}) => {
  const insets = useSafeArea()

  const styles = useStyles(theme => ({
    background: {
      flex: 1,
      backgroundColor: theme.colors.fill.background.default,
      position: 'relative',
    },
    backgroundWithInsetsBase: {
      paddingLeft: insets.left,
      paddingRight: insets.right,
    },
    backgroundWithInsetsTop: {
      paddingTop: insets.top,
    },
    backgroundWithInsetsBottom: {
      paddingBottom: insets.bottom,
    },
    keyboardAvoiding: {
      flex: 1,
    },
  }))

  const backgroundStyles: ViewStyle[] = [styles.background]

  if (useInsets !== 'none') {
    backgroundStyles.push(styles.backgroundWithInsetsBase)

    if (useInsets === 'all' || useInsets === 'top') {
      backgroundStyles.push(styles.backgroundWithInsetsTop)
    }
    if (useInsets === 'all' || useInsets === 'bottom') {
      backgroundStyles.push(styles.backgroundWithInsetsBottom)
    }
  }

  return (
    <View style={backgroundStyles}>
      {avoidKeyboard ? (
        // If we want to avoid the keyboard, make sure we tell the KeyboardAvoidingView consider the height of the status bar
        // and the RN Navigation Header height (which we consider is present if !useInsets)
        <KeyboardAvoidingView style={styles.keyboardAvoiding} behavior="height">
          {children}
        </KeyboardAvoidingView>
      ) : (
        children
      )}
    </View>
  )
}

Screen.Content = Content
