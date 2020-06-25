import React, { useMemo, useRef } from 'react'
import { View, LayoutRectangle } from 'react-native'
import { TextWithOptionalIconAction } from '../../actions'
import { usePositionInAppProvider } from '../../dev'
import { Item, ItemProps } from './Item/Item'
import { PopoverPlacement } from './popover-placement'
import { PopoverView } from './PopoverView'
import { PopoverContext } from './PopoverContext'
import { PopoverBackdrop } from './PopoverBackdrop'

export interface PopoverWithActions {
  /**
   * Actions to display in the Popover.
   */
  actions: TextWithOptionalIconAction[]
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
  placement?: PopoverPlacement
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
  /**
   * If true, the popover will appear above the anchor view instead of next to it.
   */
  aboveAnchor?: boolean
  /**
   * Called when the Popover needs to be discarded. This should update `open` property accordingly.
   */
  onRequestClose: () => void
} & (PopoverWithActions | PopoverWithChildren)

const LAYOUT_ZERO: LayoutRectangle = { x: 0, y: 0, width: 0, height: 0 }
/**
 * Popover Implementation Details (for developers usage)
 * ---
 * Popover view tree can be summarized like this:
 * - AppProvider
 *   - ...Views, that can be nested X times
 *     - Popover
 *       - Popover Backdrop View, which shows the backdrop + provides dismissal of Popover on touch.
 *       - PopoverView
 *         - Absolutely positioned container, where height = AppProvider.height and width = AppProvider.width.
 *           Position origin is equal to position of Anchor View.
 *           - Actual Popover View displayed to the user. Positioned relatively to its parent.
 *             - Popover children
 */

/**
 * Popovers are small overlays that open on demand. They are meant to access additional content without cluttering the screen.
 */
export const Popover: React.FC<PopoverProps> & { Item: typeof Item } = ({
  open,
  anchor,
  actions,
  children,
  placement = 'bottom',
  onRequestClose,
  hideBackdrop = false,
  matchWidth = false,
  aboveAnchor = false,
}) => {
  const content = useContent(actions, children)

  const ref = useRef<View>(null)
  const anchorLayout = usePositionInAppProvider(ref.current) // Get position relative to AppProvider

  return (
    <View ref={ref}>
      <PopoverContext.Provider value={{ requestClose: onRequestClose }}>
        {anchor}
        <PopoverBackdrop open={open} invisible={hideBackdrop} />
        <PopoverView
          open={open}
          placement={placement}
          matchWidth={matchWidth}
          anchorLayout={anchorLayout ?? LAYOUT_ZERO}
          aboveAnchor={aboveAnchor}
        >
          {content}
        </PopoverView>
      </PopoverContext.Provider>
    </View>
  )
}

export type PopoverItemProps = ItemProps
Popover.Item = Item

/**
 * Get the Popover content (either through `children` or `actions`).
 */
const useContent = (
  actions: TextWithOptionalIconAction[] | undefined,
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
      content = actions.map(({ label, icon, color, action }, i) => (
        <Item key={i} label={label} icon={icon} iconColor={color} onSelect={action} />
      ))
    }

    return content
  }, [actions, children])
