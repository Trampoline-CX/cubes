import React, { useMemo } from 'react'
import { TextWithIconAction } from '../../actions/actions'
import { ItemProps, Item } from './Item/Item'
import { Box } from '../../structure/Box/Box'
import { useStyles } from '../../../theme'
import { shameStyles } from '../../../theme/shame-styles'
import { View } from 'react-native'

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

export type DrawerMenuProps = DrawerMenuPropsWithChildren | DrawerMenuPropsWithItems

const { width } = shameStyles.drawerMenu

export const DrawerMenu: React.FC<DrawerMenuProps> & { Item: typeof Item } = ({
  items,
  children: childrenRaw,
}) => {
  const styles = useStyles(theme => ({
    container: {
      width,
      backgroundColor: theme.colors.fill.background.lighter,
      ...theme.elevation.z16,
    },
  }))
  const children = useDrawerMenuItems(items, childrenRaw)

  return <View style={styles.container}>{children}</View>
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
