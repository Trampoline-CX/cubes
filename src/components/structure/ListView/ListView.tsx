import React, { useMemo } from 'react'
import { Box } from '../Box/Box'
import { Item, ItemProps } from './Item/Item'

interface ListViewWithChildren {
  /**
   * List Items to display (supply either this or `dataSource` prop).
   */
  children: React.ReactNode
  dataSource?: never
}

interface ListViewWithDataSource {
  /**
   * List Items to display (supply either this or `children` prop).
   */
  dataSource: ItemProps[]
  children?: never
}

export type ListViewProps = {
  /**
   * Divider placed between each item. If none is provided, no separator is shown.
   */
  divider: React.ReactNode
} & (ListViewWithChildren | ListViewWithDataSource)

/**
 * Display rich list items. Basic Item support is supported via `ListView.Item`
 * component, or more complex item components can be supplied.
 *
 * **Important Note:** This component doesn't scroll by itself, you should embed
 * it in a `Screen.Content` or `ScrollView` to enable scrolling.
 *
 * **Important Note 2:** As of right now, this component is not meant to be used
 * to display infinite lists or large lists. Doing so could result in a laggy and
 * unpleasant user experience.
 */
export const ListView: React.FC<ListViewProps> & { Item: typeof Item } = ({
  divider,
  dataSource,
  children,
}) => {
  const { items } = useListItems(dataSource, children, divider)

  return <Box>{items}</Box>
}

/**
 * Return the ListItems to display with the number of them.
 */
const useListItems = (
  dataSource: ItemProps[] | undefined,
  children: React.ReactNode | undefined,
  divider: ListViewProps['divider'],
): { count: number; items: React.ReactNode } =>
  useMemo(() => {
    if (dataSource && children) {
      console.warn(
        'Both dataSource and children are provided on ListView. Only dataSource will be used.',
      )
    }

    let dataItems = children

    if (dataSource) {
      dataItems = dataSource.map((item, i) => <Item key={i} {...item} />)
    }

    const count = React.Children.count(dataItems)
    return {
      count,
      items: React.Children.map(dataItems, (child, i) => (
        <>
          {i > 0 ? divider : null}
          {child}
        </>
      )),
    }
  }, [dataSource, children, divider])

ListView.Item = Item
export type ListViewItemProps = ItemProps
