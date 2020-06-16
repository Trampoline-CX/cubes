import React from 'react'
import { ScrollView } from 'react-native'
import { BoxProps, Box } from '../../Box/Box'

export type ContentProps = Omit<BoxProps, 'fill'> & {
  disableScroll?: boolean
}

/**
 * Wrap the screen content in a full height container. Usage is very similar to `Box` component.
 *
 * Can also use a `ScrollView` to make content scrollable.
 */
export const Content: React.FC<ContentProps> = ({ disableScroll = false, ...props }) => {
  const Wrapper = disableScroll ? React.Fragment : ScrollView

  return (
    <Wrapper>
      <Box {...props} fill />
    </Wrapper>
  )
}
