import React, { useMemo } from 'react'
import { View } from 'react-native'
import { useStyles } from '../../../theme'
import { shameStyles } from '../../../theme/shame-styles'
import { useResponsive } from '../../../utils/hooks/use-responsive'
import { Sheet } from '../../overlays/Sheet/Sheet'
import { ItemProps, Item } from './Item/Item'

export interface DrawerMenuPropsWithChildren {
  /**
   * Menu Items to display in menu.
   */
  children: React.ReactNode
  items?: never
}

export interface DrawerMenuPropsWithItems {
  /**
   * Menu Items to display in menu.
   */
  items: ItemProps[]
  children?: never
}

export type DrawerMenuProps = {
  /**
   * Determines if menu is opened or not (only when in modal mode, does noting in standard mode).
   */
  open: boolean
  /**
   * Callback called when menu was closed (when in modal mode). Should
   * update `open` prop accordingly (set it to `false`).
   */
  onClose: () => void
} & (DrawerMenuPropsWithChildren | DrawerMenuPropsWithItems)

const { width } = shameStyles.drawerMenu

/**
 * Display the primary navigation on the side of the App.
 *
 * On small devices, this will appear in "Modal" mode and will need to be
 * manually displayed. With devices of larger size, it will appear in "Standard"
 * mode, which means that it will be sticky on the side of the page.
 */
export const DrawerMenu: React.FC<DrawerMenuProps> & { Item: typeof Item } = ({
  open,
  onClose,
  items,
  children: childrenRaw,
}) => {
  const styles = useStyles(theme => ({
    container: {
      width,
      backgroundColor: theme.colors.fill.background.lighter,
    },
  }))
  const children = useDrawerMenuItems(items, childrenRaw)
  const isModal = useResponsive({
    small: true,
    medium: false,
    large: false,
  })

  const drawer = <View style={styles.container}>{children}</View>

  return isModal ? (
    <Sheet open={open} onClose={onClose}>
      {drawer}
    </Sheet>
  ) : (
    drawer
  )
}
DrawerMenu.Item = Item

/**
 * Return the ListItems to display with the number of them.
 */
const useDrawerMenuItems = (
  items: ItemProps[] | undefined,
  children: React.ReactNode | undefined,
): React.ReactNode =>
  useMemo(() => {
    if (items && children) {
      console.warn('Both items and children are provided on DrawerMenu. Only items will be used.')
    }

    let realItems = children

    if (items) {
      realItems = items.map((item, i) => <Item key={i} {...item} />)
    }

    return realItems
  }, [items, children])

export type DrawerMenuItemProps = ItemProps
