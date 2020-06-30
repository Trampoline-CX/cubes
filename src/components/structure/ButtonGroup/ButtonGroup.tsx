import React, { useMemo } from 'react'
import { View, ViewStyle } from 'react-native'
import { useStyles } from '../../../theme'

export interface ButtonGroupProps {
  /**
   * Children components (should be `Button` components).
   */
  children: React.ReactNode
  /**
   * Alignment of the children.
   *
   * - `fill` will make all buttons have the same width.
   * - `start` will align the buttons at the start.
   * - `end` will align the buttons at the end.
   */
  alignment?: 'start' | 'end' | 'fill'
}

/**
 * Arrange `Button` components with consistent spacing.
 */
export const ButtonGroup: React.FC<ButtonGroupProps> = ({ children, alignment = 'fill' }) => {
  const styles = useStyles(theme => ({
    container: {
      flexDirection: 'row',
    },
    child: {
      marginEnd: theme.spacing.medium,
    },
    childLast: {
      marginEnd: theme.spacing.none,
    },

    // Default (fill)
    containerFill: {
      justifyContent: 'center',
    },
    childStyleFill: {
      flex: 1,
    },

    // Start
    containerStart: {
      justifyContent: 'flex-start',
    },

    // End
    containerEnd: {
      justifyContent: 'flex-end',
    },
  }))

  const containerStyle = [
    styles.container,
    useMemo<ViewStyle>(() => {
      switch (alignment) {
        case 'fill':
          return styles.containerFill
        case 'start':
          return styles.containerStart
        case 'end':
          return styles.containerEnd
      }
    }, [alignment, styles]),
  ]
  const childStyles: ViewStyle[] = [styles.child]
  if (alignment === 'fill') {
    childStyles.push(styles.childStyleFill)
  }

  const childrenLength = React.Children.count(children)
  const items = React.Children.map(children, (child, index) => (
    <View style={[...childStyles, ...(index === childrenLength - 1 ? [styles.childLast] : [])]}>
      {child}
    </View>
  ))

  return <View style={containerStyle}>{items}</View>
}
