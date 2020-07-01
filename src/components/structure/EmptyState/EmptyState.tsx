import React from 'react'
import { Image, ImageSourcePropType } from 'react-native'
import { TextAction, Button } from '../../actions'
import { Box } from '../Box/Box'
import { DisplayText, BodyText } from '../../text'
import { ButtonGroup } from '../ButtonGroup/ButtonGroup'
import { useStyles } from '../../../theme'
import { shameStyles } from '../../../theme/shame-styles'

export interface EmptyStateProps {
  /**
   * Heading text.
   */
  heading: React.ReactNode
  /**
   * Content text.
   */
  content: React.ReactNode
  /**
   * Image URL.
   */
  image: string
  /**
   * Optional main action. In lists, should be used most of the time to add a new item.
   */
  action?: TextAction
  /**
   * Secondary action.
   */
  secondaryAction?: TextAction
}

const { image } = shameStyles.emptyState

/**
 * Empty states are used when a list, table, or chart has no items or data to show.
 * This is an opportunity to provide explanation or guidance to the user.
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  heading,
  content,
  image: imageSource,
  action,
  secondaryAction,
}) => {
  const styles = useStyles(() => ({
    image: {
      width: image.width,
      height: image.height,
    },
  }))

  return (
    <Box space="medium" padding="medium" align="center">
      <Image style={styles.image} source={{ uri: imageSource }} />
      <DisplayText textAlign="center">{heading}</DisplayText>
      <BodyText textAlign="center">{content}</BodyText>
      {action || secondaryAction ? (
        <ButtonGroup>
          {action ? (
            <Button primary onClick={action.action}>
              {action.label}
            </Button>
          ) : null}
          {secondaryAction ? (
            <Button onClick={secondaryAction.action}>{secondaryAction.label}</Button>
          ) : null}
        </ButtonGroup>
      ) : null}
    </Box>
  )
}
