import React, { useMemo, useState, useCallback } from 'react'
import { Menu, MenuTrigger, MenuOptions } from 'react-native-popover-view'
import { TextAction } from '../../actions'
import { Item, ItemProps } from './Item/Item'

export interface PopoverWithActions {
  /**
   * Actions to display in the Popover.
   */
  actions: TextAction[]
}

export interface PopoverWithChildren {
  /**
   * The content to display inside the Popover.
   */
  children: React.ReactNode
}

export type PopoverProps = {
  /**
   * The content triggering the Popover.
   */
  trigger: (show: () => void) => React.ReactNode
  /**
   * The content to display inside the Popover.
   */
  children?: React.ReactNode
  /**
   * Actions to display in the Popover.
   */
  actions?: TextAction[]
} & (PopoverWithActions | PopoverWithChildren)

export const Popover: React.FC<PopoverProps> & { Item: typeof Item } = ({
  trigger,
  actions,
  children,
}) => {
  const [visible, setVisible] = useState(false)
  const show = useCallback(() => setVisible(true), [])
  const hide = useCallback(() => setVisible(false), [])

  const content = useContent(actions, children)

  return (
    <Menu onBackdropPress={hide} opened={visible}>
      <MenuTrigger disabled>{trigger(show)}</MenuTrigger>
      <MenuOptions>{content}</MenuOptions>
    </Menu>
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
