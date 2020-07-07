import React, { useMemo } from 'react'
import { Box } from '../Box/Box'
import { Item, ItemProps } from './Item/Item'

interface ListViewWithChildren {
  /**
   * List Items to display (supply either this or `dataSource` prop).
   */
  children: React.ReactNode
  values?: never
}

interface ListViewWithValues {
  /**
   * List Items to display (supply either this or `children` prop).
   */
  values: ItemProps[]
  children?: never
}

export type ListViewProps = {
  /**
   * Divider placed between each item. If none is provided, no separator is shown.
   */
  divider?: React.ReactNode
} & (ListViewWithChildren | ListViewWithValues)

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
  values,
  children,
}) => {
  const { items } = useListItems(values, children, divider)

  return <Box>{items}</Box>
}

/**
 * Return the ListItems to display with the number of them.
 */
const useListItems = (
  values: ItemProps[] | undefined,
  children: React.ReactNode | undefined,
  divider: ListViewProps['divider'],
): { count: number; items: React.ReactNode } =>
  useMemo(() => {
    if (values && children) {
      console.warn(
        'Both values and children are provided on ListView. Only dataSource will be used.',
      )
    }

    let dataItems = children

    if (values) {
      dataItems = values.map((item, i) => <Item key={i} {...item} />)
    }

    const count = React.Children.count(dataItems)
    return {
      count,
      items: divider
        ? React.Children.map(dataItems, (child, i) => (
            <>
              {i > 0 ? divider : null}
              {child}
            </>
          ))
        : dataItems,
    }
  }, [values, children, divider])

ListView.Item = Item
export type ListViewItemProps = ItemProps
