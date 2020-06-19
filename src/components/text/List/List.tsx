import React, { useMemo } from 'react'
import { View } from 'react-native'
import { Box } from '../../structure'
import { BodyText } from '../BodyText/BodyText'
import { useStyles } from '../../../theme'
import { Item, ItemProps } from './Item/Item'

type ListType = 'bullet' | 'numbered'

export interface ListWithDataSourceProps {
  /**
   * Strings to display in the List.
   */
  dataSource: string[]
}

export interface ListWithChildrenProps {
  /**
   * Strings to display in the list (can be stylized using `TextStyle` component).
   */
  children: React.ReactNode
}

export type ListProps = {
  /**
   * Type of list displayed.
   */
  type?: ListType
  /**
   * Strings to display in the List.
   */
  dataSource?: string[]
  /**
   * Strings to display in the list (can be stylized using `TextStyle` component).
   */
  children?: React.ReactNode
} & (ListWithDataSourceProps | ListWithChildrenProps)

/**
 * Component displaying texts in a List.
 */
export const List: React.FC<ListProps> & { Item: typeof Item } = ({
  type = 'bullet',
  dataSource,
  children,
}) => {
  const items = useItems(dataSource, children, type)

  return <Box space="small">{items}</Box>
}

/**
 * Get items to display in the list
 */
const useItems = (
  dataSource: string[] | undefined,
  children: React.ReactNode | undefined,
  type: ListType,
): React.ReactNode =>
  useMemo(() => {
    if (dataSource && children) {
      console.warn(
        'Both children and dataSource props are defined in List component. Only dataSource will be considered.',
      )
    }

    let items = children

    if (dataSource) {
      items = dataSource.map((item, i) => <Item key={i}>{item}</Item>)
    }

    return React.Children.map(items, (item, index) => (
      <Box horizontal space="small">
        {_getBullet(type, index)}
        {item}
      </Box>
    ))
  }, [dataSource, children, type])

const _getBullet = (type: ListType, index: number): React.ReactNode => {
  switch (type) {
    case 'bullet':
      return <Bullet />
    case 'numbered':
      return <BodyText>{index + 1}.</BodyText>
    default:
      throw new Error(`Unknown List with type "${type}".`)
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
