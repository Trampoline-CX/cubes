import React, { useMemo } from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import { Theme } from '../../../theme'
import { Space } from '../Space/Space'

export interface StackProps {
  /**
   * Children components.
   */
  children: React.ReactNode
  /**
   * Defines a space to use between each component.
   */
  space?: Extract<keyof Theme['spacing'], string>
  /**
   * Set to `true` to stack children components horizontally.
   */
  horizontal?: boolean
  /**
   * Defines how children views are aligned (in opposite direction of the Stack).
   */
  align?: 'stretch' | 'start' | 'end' | 'center'
}

const styles = StyleSheet.create({
  containerHorizontal: {
    flexDirection: 'row',
  },
})

/**
 * Stack components vertically or horizontally.
 */
export const Stack: React.FC<StackProps> = ({
  children,
  space = 'none',
  horizontal = false,
  align = 'stretch',
}) => {
  const alignStyle: ViewStyle = {
    alignItems:
      align === 'stretch'
        ? 'stretch'
        : align === 'start'
        ? 'flex-start'
        : align === 'end'
        ? 'flex-end'
        : 'center',
  }

  // Filter only children that are JSX elements
  const childrenArray = useMemo(() => React.Children.toArray(children).filter(x => x), [children])
  const items = React.Children.map(childrenArray, (child, index) => (
    <>
      {index > 0 && space !== 'none' && <Space value={space} />}
      {child}
    </>
  ))
  return <View style={[horizontal ? styles.containerHorizontal : null, alignStyle]}>{items}</View>
}
