import React, { useMemo } from 'react'
import { View } from 'react-native'
import { Box } from '../../structure/Box/Box'
import { BodyText } from '../BodyText/BodyText'
import { useStyles } from '../../../theme'
import { Item, ItemProps } from './Item/Item'

type ListType = 'bullet' | 'number'

export interface ListWithValuesProps {
  /**
   * Strings to display in the List.
   */
  values: string[]
  children?: never
}

export interface ListWithChildrenProps {
  /**
   * Strings to display in the list (can be stylized using `TextStyle` component).
   */
  children: React.ReactNode
  values?: never
}

export type ListProps = {
  /**
   * Type of list displayed.
   */
  type?: ListType
} & (ListWithValuesProps | ListWithChildrenProps)

/**
 * Display a set of related text-only content. Each list item begins with a bullet or a number.
 */
export const List: React.FC<ListProps> & { Item: typeof Item } = ({
  type = 'bullet',
  values,
  children,
}) => {
  const items = useItems(values, children, type)

  const wrappedItems = useMemo(
    () =>
      React.Children.map(items, (item, index) => (
        <Box horizontal space="small">
          {_getBullet(type, index)}
          {item}
        </Box>
      )),
    [items],
  )

  return <Box space="small">{wrappedItems}</Box>
}

/**
 * Get items to display in the list
 */
const useItems = (
  values: string[] | undefined,
  children: React.ReactNode | undefined,
  type: ListType,
): React.ReactNode =>
  useMemo(() => {
    if (values && children) {
      console.warn(
        'Both children and values props are defined in List component. Only values will be considered.',
      )
    }

    let items = children

    if (values) {
      items = values.map((item, i) => <Item key={i}>{item}</Item>)
    }

    return items
  }, [values, children, type])

const _getBullet = (type: ListType, index: number): React.ReactNode => {
  switch (type) {
    case 'bullet':
      return <Bullet />
    case 'number':
      return <BodyText>{index + 1}.</BodyText>
    default:
      console.warn(`List type must be either "bullet" or "number". Received ${type}`)
      return _getBullet('bullet', index) // Fallback to bullet list type.
  }
}

const Bullet: React.FC = () => {
  const styles = useStyles(theme => ({
    bullet: {
      backgroundColor: theme.colors.text.primary,
      borderRadius: theme.radius.circle,
      height: theme.size.bullet,
      width: theme.size.bullet,
      marginVertical: (theme.font.size.regular.height - theme.size.bullet) / 2,
    },
  }))

  return <View style={styles.bullet} />
}

List.Item = Item
export type ListItemProps = ItemProps
