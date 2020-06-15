import React, { useContext, useMemo } from 'react'
import { View, ViewStyle } from 'react-native'
import { Theme, ThemeContext } from '../../../theme'

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
}

/**
 * Box component, used to display padding in a component.
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
}) => {
  const theme = useContext(ThemeContext)

  const boxStyle: ViewStyle = useMemo(
    () => ({
      paddingTop: theme.spacing[paddingTop ?? paddingY ?? padding ?? 'none'],
      paddingBottom: theme.spacing[paddingBottom ?? paddingY ?? padding ?? 'none'],
      paddingLeft: theme.spacing[paddingLeft ?? paddingX ?? padding ?? 'none'],
      paddingRight: theme.spacing[paddingRight ?? paddingX ?? padding ?? 'none'],
      flex: fill ? 1 : undefined,
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
    ],
  )

  return <View style={boxStyle}>{children}</View>
}
