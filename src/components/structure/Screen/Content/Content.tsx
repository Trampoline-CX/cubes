import React from 'react'
import { ScrollView } from 'react-native'
import { BoxProps, Box } from '../../Box/Box'
import { SnackbarProvider } from '../../../overlays/Snackbar/SnackbarProvider'

export type ContentProps = Omit<BoxProps, 'fill'> & {
  disableScroll?: boolean
}

/**
 * Wrap the screen content in a full height container. Usage is very similar to `Box` component.
 *
 * Can also use a `ScrollView` to make content scrollable.
 *
 * Also helps define how other elements are displayed, such as `Snackbar`, preventing
 * them to appear on top of Navigation components.
 */
export const Content: React.FC<ContentProps> = ({ disableScroll = false, ...props }) => {
  const Wrapper = disableScroll ? React.Fragment : ScrollView

  return (
    <SnackbarProvider>
      <Wrapper>
        <Box {...props} fill />
      </Wrapper>
    </SnackbarProvider>
  )
}
