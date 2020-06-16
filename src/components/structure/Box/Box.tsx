import React, { useContext, useMemo } from 'react'
import { View, ViewStyle } from 'react-native'
import { Theme, ThemeContext } from '../../../theme'
import { Space } from '../Space/Space'

type Spacing = Extract<keyof Theme['spacing'], string>

export interface BoxProps {
  /**
   * Children Views.
   */
  children: React.ReactNode
  /**
   * Padding applied on all sides.
   */
  padding?: Spacing
  /**
   * Padding applied horizontally (left & right).
   */
  paddingX?: Spacing
  /**
   * Padding applied vertically (top & bottom).
   */
  paddingY?: Spacing
  /**
   * Padding applied to top side.
   */
  paddingTop?: Spacing
  /**
   * Padding applied to bottom side.
   */
  paddingBottom?: Spacing
  /**
   * Padding applied to left side.
   */
  paddingLeft?: Spacing
  /**
   * Padding applied to right side.
   */
  paddingRight?: Spacing
  /**
   * Set to `true` to set underlying view `flex` property to `1` to fill parent view.
   */
  fill?: boolean
  /**
   * Defines a space to use between each component.
   */
  space?: Spacing
  /**
   * Set to `true` to display children components horizontally.
   */
  horizontal?: boolean
  /**
   * Defines how children views are aligned (in opposite direction of the Box).
   */
  align?: 'fill' | 'start' | 'end' | 'center'
  /**
   * Defines how views are aligned (in same direction of the Box).
   */
  distribution?: 'start' | 'end' | 'center'
  /**
   * If true, children order will be reversed.
   */
  reverse?: boolean
}

/**
 * Box component, used as a basic building block to layout views. Layouting follow a flexbox like approach.
 *
 * > **Note:** Padding is applied from the more generic ones to the more specific.
 * >
 * >For example, if you apply `padding="small"` and `paddingTop="large"`, the `Box` will have a `small` padding on all sides, except top where the padding will be `large`.
 */
export const Box: React.FC<BoxProps> = ({
  children,
  padding,
  paddingX,
  paddingY,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  fill = false,
  space = 'none',
  horizontal = false,
  align = 'fill',
  distribution = 'start',
  reverse = false,
}) => {
  const theme = useContext(ThemeContext)

  const boxStyle: ViewStyle = useMemo(
    () => ({
      paddingTop: theme.spacing[paddingTop ?? paddingY ?? padding ?? 'none'],
      paddingBottom: theme.spacing[paddingBottom ?? paddingY ?? padding ?? 'none'],
      paddingLeft: theme.spacing[paddingLeft ?? paddingX ?? padding ?? 'none'],
      paddingRight: theme.spacing[paddingRight ?? paddingX ?? padding ?? 'none'],
      flex: fill ? 1 : undefined,
      justifyContent:
        distribution === 'start' ? 'flex-start' : distribution === 'end' ? 'flex-end' : 'center',
      flexDirection: reverse
        ? horizontal
          ? 'row-reverse'
          : 'column-reverse'
        : horizontal
        ? 'row'
        : 'column',
      alignItems:
        align === 'fill'
          ? 'stretch'
          : align === 'start'
          ? 'flex-start'
          : align === 'end'
          ? 'flex-end'
          : 'center',
    }),
    [
      theme,
      padding,
      paddingX,
      paddingY,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      fill,
      reverse,
      horizontal,
      align,
      distribution,
    ],
  )

  // Filter only children that are JSX elements
  const items = useMemo(() => {
    const filtered = React.Children.toArray(children).filter(x => x)

    return React.Children.map(filtered, (child, index) => (
      <>
        {index > 0 && space !== 'none' && <Space value={space} />}
        {child}
      </>
    ))
  }, [children])

  return <View style={boxStyle}>{items}</View>
}
