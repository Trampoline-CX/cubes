import React, { useMemo, useState, useCallback, useRef } from 'react'
import {
  View,
  TouchableWithoutFeedback,
  ViewProps,
  LayoutRectangle,
  useWindowDimensions,
  Dimensions,
  ViewStyle,
  StyleProp,
} from 'react-native'
import { TextAction } from '../../actions'
import { useStyles, ColorHex } from '../../../theme'
import { Box } from '../../structure'
import { shameStyles } from '../../../theme/shame-styles'
import { Item, ItemProps } from './Item/Item'
import { PopoverPlacement, getOppositePlacement, selectFromPlacement } from './popover-placement'

export interface PopoverWithActions {
  /**
   * Actions to display in the Popover.
   */
  actions: TextAction[]
  children?: never
}

export interface PopoverWithChildren {
  /**
   * The content to display inside the Popover.
   */
  children: React.ReactNode
  actions?: never
}

export type PopoverProps = {
  /**
   * Determines if Popover is visible or not.
   */
  open: boolean
  /**
   * The content to which the Popover will be anchored.
   */
  anchor: React.ReactNode
  /**
   * Preferred placement of the Popover. The Popover will try to place itself according to this
   * property. However, if there is not enough space left there to show up, it will show itself
   * in opposite direction.
   *
   * For example, if we set `preferredPlacement="top"`, and there is not enough space for the Popover
   * to show itself above the triggering view, it will show at the bottom of it.
   */
  preferredPlacement?: PopoverPlacement
  /**
   * Placement of the popover. If set, `preferredPlacement` will be ignored and Popover will be placed
   * according to this property.
   */
  placement?: PopoverPlacement
  /**
   * Called when the Popover needs to be discarded. This should update `open` property accordingly.
   */
  onRequestClose: () => void
  /**
   * If true, backdrop will be hidden.
   */
  hideBackdrop?: boolean
  /**
   * If true, the popover width will match the width of the anchor View.
   *
   * **IMPORTANT:** Must only be used with `top` or `bottom` placements.
   */
  matchWidth?: boolean
} & (PopoverWithActions | PopoverWithChildren)

const { backdrop } = shameStyles.popover

export const Popover: React.FC<PopoverProps> & { Item: typeof Item } = ({
  open,
  anchor,
  actions,
  children,
  preferredPlacement = PopoverPlacement.BOTTOM,
  placement,
  onRequestClose,
  hideBackdrop = false,
  matchWidth = false,
}) => {
  const styles = useStyles(theme => ({
    backdrop: {
      backgroundColor: backdrop.color,
      position: 'absolute',
      top: -9999999,
      left: -9999999,
      right: -9999999,
      bottom: -9999999,
    },
    backdropHidden: {
      opacity: 0,
    },
  }))

  const content = useContent(actions, children)

  return (
    <View onLayout={}>
      {anchor}
      {open ? (
        <>
          <TouchableWithoutFeedback onPress={onRequestClose}>
            <View style={[styles.backdrop, hideBackdrop ? styles.backdropHidden : null]} />
          </TouchableWithoutFeedback>
          <PopoverView
            preferredPlacement={preferredPlacement}
            placement={placement}
            matchWidth={matchWidth}
          >
            {content}
          </PopoverView>
        </>
      ) : null}
    </View>
  )
}

export type PopoverItemProps = ItemProps
Popover.Item = Item

const useContent = (
  actions: TextAction[] | undefined,
  children: React.ReactNode | undefined,
): React.ReactNode =>
  useMemo(() => {
    if (actions && children) {
      console.warn(
        'Both actions and children are both supplied to Popover. Only actions will be used.',
      )
    }

    let content: React.ReactNode = children

    if (actions) {
      content = actions.map(({ label, action }, i) => (
        <Item key={i} label={label} onSelect={action} />
      ))
    }

    return content
  }, [actions, children])

interface PopoverViewProps {
  children: React.ReactNode
  preferredPlacement: PopoverPlacement
  placement?: PopoverPlacement
  matchWidth: boolean
}

const PopoverView: React.FC<PopoverViewProps> = ({
  children,
  preferredPlacement,
  placement: placementRaw,
  matchWidth,
}) => {
  const styles = useStyles(theme => ({
    container: {
      position: 'absolute',
      top: -9999999,
      left: -9999999,
      right: -9999999,
      bottom: -9999999,
    },
    popover: {
      position: 'absolute',
      backgroundColor: theme.colors.fill.background.lighter,
      right: 0,
      ...theme.elevation.z8,
    },
    popoverNotYetLayout: {
      opacity: 0,
    },
    popoverBottom: {
      top: '100%',
    },
    popoverTop: {
      bottom: '100%',
    },
    popoverLeft: {
      right: '100%',
    },
    popoverRight: {
      left: '100%',
    },
    popoverMatchWidth: {
      left: 0,
      right: 0,
    },
  }))
  const ref = useRef<View>(null)
  const [layout, setLayout] = useState<LayoutRectangle | null>(null)
  const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

  const onLayout = useCallback(() => {
    ref.current?.measure((x, y, width, height, pageX, pageY) => {
      setLayout({ x: pageX, y: pageY, width, height })
    })
  }, [ref.current])

  const intersects = _popoverIntersectsWindow(
    windowWidth,
    windowHeight,
    layout ?? { x: 0, y: 0, width: 0, height: 0 },
  )

  // Define real placement from preferredPlacement or placement prop
  const placement =
    placementRaw ?? intersects ? getOppositePlacement(preferredPlacement) : preferredPlacement

  return (
    <View
      ref={ref}
      style={[
        styles.popover,
        layout === null ? styles.popoverNotYetLayout : null,
        { maxWidth: windowWidth, maxHeight: windowHeight },
        selectFromPlacement<ViewStyle>(placement, {
          top: styles.popoverTop,
          bottom: styles.popoverBottom,
          left: styles.popoverLeft,
          right: styles.popoverRight,
        }),
        matchWidth ? styles.popoverMatchWidth : null,
      ]}
      onLayout={onLayout}
    >
      {children}
    </View>
  )
}

const _popoverIntersectsWindow = (
  windowWidth: number,
  windowHeight: number,
  { x, y, width, height }: LayoutRectangle,
): boolean => x < 0 || x + width > windowWidth || y < 0 || y + height > windowHeight
