import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { TextAction } from '../../actions/actions'
import { Button } from '../../actions/Button/Button'
import { Box } from '../Box/Box'
import { DisplayText, BodyText, TextContainer } from '../../text'
import { shameStyles } from '../../../theme/shame-styles'
import { IconName } from '../../images-and-icons/Icon/Icon'
import { useTheme } from '../../../theme'

export interface EmptyStateProps {
  /**
   * Heading text.
   */
  heading: React.ReactNode
  /**
   * Content text.
   */
  content?: React.ReactNode
  /**
   * Image name (reusing Icon names for now).
   */
  image?: IconName
  /**
   * Optional main action. In lists, should be used most of the time to add a new item.
   */
  action?: TextAction
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
}) => {
  const { colors } = useTheme()

  return (
    <Box space="xLarge" padding="medium" align="center">
      {imageSource ? (
        <MaterialIcons name={imageSource} size={image.size} color={colors.fill.primary.default} />
      ) : null}
      <TextContainer>
        <DisplayText textAlign="center">{heading}</DisplayText>
        {content ? <BodyText textAlign="center">{content}</BodyText> : null}
      </TextContainer>
      {action ? (
        <Button primary onClick={action.action}>
          {action.label}
        </Button>
      ) : null}
    </Box>
  )
}
