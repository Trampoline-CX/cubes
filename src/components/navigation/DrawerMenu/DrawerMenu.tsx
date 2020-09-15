import React, { useMemo } from 'react'
import { View, ScrollView, Platform } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'
import { useStyles } from '../../../theme'
import { shameStyles } from '../../../theme/shame-styles'
import { Sheet } from '../../overlays/Sheet/Sheet'
import { LeftSidebar } from '../../structure/AppProvider/LeftSidebar/LeftSidebar'
import { ItemProps, Item } from './Item/Item'
import { useDrawerMenuContext } from './Context/DrawerMenuContext'

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

/**
 * Display the primary navigation on the side of the App.
 *
 * On small devices, this will appear in "Modal" mode and will need to be
 * manually displayed. With devices of larger size, it will appear in "Standard"
 * mode, which means that it will be sticky on the side of the page.
 */
export const DrawerMenu: React.FC<DrawerMenuProps> & { Item: typeof Item } = ({
  items,
  children: childrenRaw,
}) => {
  const { top } = useSafeArea()
  const styles = useStyles(theme => ({
    container: {
      width,
      backgroundColor: theme.colors.fill.background.lighter,
      borderRightWidth: theme.border.thinner,
      borderRightColor: theme.colors.fill.divider,
      // On iOS, make sure to use top inset, as modal is fullscreen, but not on Android.
      paddingTop: theme.spacing.medium + (Platform.OS === 'ios' ? top : 0),
    },
  }))
  const { isModal, opened, close } = useDrawerMenuContext()
  const children = useDrawerMenuItems(items, childrenRaw)

  const drawer = (
    <View style={styles.container}>
      <ScrollView>{children}</ScrollView>
    </View>
  )

  return (
    <LeftSidebar>
      {isModal ? (
        <Sheet from="left" open={opened} onClose={close} showBackdrop>
          {drawer}
        </Sheet>
      ) : (
        drawer
      )}
    </LeftSidebar>
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
