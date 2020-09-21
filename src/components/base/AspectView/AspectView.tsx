import * as React from 'react'
import { View, StyleSheet, ViewProps } from 'react-native'
import { useOnLayout } from '../../../utils/hooks/use-on-layout'

export type AspectViewProps = ViewProps

/**
 * Basic View with `aspectRatio` prop working even on React Native Web.
 */
export const AspectView: React.FC<AspectViewProps> = ({ style, ...props }) => {
  const [layout, setLayout] = useOnLayout()

  const { aspectRatio = 1, ...inputStyle } = StyleSheet.flatten(style) || {}
  const styleProp = [inputStyle, { aspectRatio }]

  if (layout) {
    const { width = 0, height = 0 } = layout
    if (width === 0) {
      styleProp.push({ width: height * aspectRatio })
    } else {
      styleProp.push({ height: width * aspectRatio })
    }
  }

  return <View {...props} style={styleProp} onLayout={setLayout} />
}
