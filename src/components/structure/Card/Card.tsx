import React from 'react'
import { View } from 'react-native'
import { Heading } from '../../text/Heading/Heading'
import { useStyles } from '../../../theme'
import { Link } from '../../actions/Link/Link'
import { Box } from '../Box/Box'
import { Divider } from '../Divider/Divider'
import { Touchable } from '../../base/Touchable/Touchable'
import { TextStyle } from '../../text/TextStyle/TextStyle'
import { Icon } from '../../images-and-icons/Icon/Icon'
import { BodyText } from '../../text/BodyText/BodyText'
import { shameStyles } from '../../../theme/shame-styles'
import { TextAction } from '../../actions'
import { Section } from './Section/Section'

export interface CardProps {
  /**
   * Title of the card.
   */
  title?: string
  /**
   * Header action displayed as a `Button`.
   */
  headerAction?: TextAction
  /**
   * Set to `true` to have the card have a single `Card.Section` by default.
   */
  sectioned?: boolean
  /**
   * Set to `true` to display the Card in "full-width" mode. This will prevent rounded corners.
   */
  fullWidth?: boolean
  /**
   * Set to `true` to have the Card have the "Subdued" style.
   */
  subdued?: boolean
  /**
   * Set to `true` to have the Card have the "Warning" style.
   */
  warning?: boolean
  /**
   * Main actions displayed as buttons at the bottom of the Card.
   */
  mainActions?: TextAction[]
}

/**
 * Group similar concepts and tasks together to simplify content representation for the user.
 */
export const Card: React.FC<CardProps> & { Section: typeof Section } = ({
  children,
  title,
  headerAction,
  sectioned = false,
  fullWidth = false,
  subdued = false,
  warning = false,
  mainActions = [],
}) => {
  const styles = useStyles(theme => ({
    card: {
      ...theme.elevation.z2,

      backgroundColor: theme.colors.fill.background.lighter,
      borderRadius: fullWidth ? 0 : theme.radius.medium,
    },
    cardSubdued: {
      backgroundColor: shameStyles.card.subdued.backgroundColor,
    },
    cardWarning: {
      ...theme.elevation.z0,
      backgroundColor: theme.colors.status.warning,
    },
  }))

  const content = sectioned ? <Section>{children}</Section> : children

  const childCount = React.Children.count(content)
  const items = React.Children.map(content, (child, index) => (
    <>
      {child}
      {index !== childCount - 1 && <Divider />}
    </>
  ))

  return (
    <View style={[styles.card, subdued && styles.cardSubdued, warning && styles.cardWarning]}>
      {title ? <CardHeader title={title} action={headerAction} /> : null}
      {items}
      {mainActions.map((action, index) => (
        <CardMainAction key={index} action={action} />
      ))}
    </View>
  )
}

const CardHeader: React.FC<{ title: string; action?: TextAction }> = ({ title, action }) => (
  <Box padding="medium" paddingBottom="none">
    <Box horizontal align="center">
      <Box fill>
        <Heading>{title}</Heading>
      </Box>

      {action && (
        <BodyText>
          <Link onClick={action.action}>{action.label}</Link>
        </BodyText>
      )}
    </Box>
  </Box>
)

const CardMainAction: React.FC<{ action: TextAction }> = ({ action }) => (
  <>
    <Divider />
    <Touchable onClick={action.action}>
      <Box padding="medium">
        <Box horizontal space="medium">
          <Box fill>
            <Heading>
              <TextStyle variation="accent">{action.label}</TextStyle>
            </Heading>
          </Box>
          <Icon name="navigate-next" color="subdued" />
        </Box>
      </Box>
    </Touchable>
  </>
)

Card.Section = Section
