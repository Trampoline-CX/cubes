import React from 'react'
import { BoxProps, Box } from '../../Box/Box'
import { ScrollView } from 'react-native'

export type ContentProps = Omit<BoxProps, 'fill'> & {
  scroll?: boolean
}

/**
 * Wrap the screen content in a full height container. Usage is very similar to `Box` component.
 *
 * Can also use a `ScrollView` to make content scrollable.
 */
export const Content: React.FC<ContentProps> = ({ scroll = false, ...props }) => {
  const Wrapper = scroll ? ScrollView : React.Fragment

  return (
    <Wrapper>
      <Box {...props} fill />
    </Wrapper>
  )
}
