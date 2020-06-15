import React from 'react'
import { Text, View } from 'react-native'
import { useStyles } from '../../../theme'
import { Touchable } from '../../base/Touchable/Touchable'
import { useTextStyles } from '../../text/use-text-styles'
import { Box } from '../../structure/Box/Box'
import { Icon, IconName } from '../../icons/Icon/Icon'

export interface LinkButtonProps {
  /**
   * Icon to display before the text.
   */
  iconStart?: IconName
  /**
   * Set to `true` if you want to display a navigation indicator (small arrow on the right).
   */
  withNavigationIndicator?: boolean
  /**
   * Action triggered on click.
   */
  onClick: () => void
  /**
   * Text of the Button.
   */
  children: string
}

/**
 * Button that should act as a Link and should be used only when navigating from a Screen to another.
 */
export const LinkButton: React.FC<LinkButtonProps> = ({
  iconStart,
  withNavigationIndicator = false,
  children,
  onClick,
}) => {
  const { textStyles } = useTextStyles()
  const styles = useStyles(theme => ({
    root: {
      borderRadius: theme.radius.small,
      overflow: 'hidden',
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.small,
      paddingVertical: theme.spacing.xSmall,

      backgroundColor: theme.colors.fill.background.darker,
      borderRadius: theme.radius.small,
    },
    label: {},
  }))

  const labelStyles = [textStyles.body, styles.label]

  return (
    <View style={styles.root}>
      <Touchable onClick={onClick}>
        <View style={styles.container}>
          {iconStart && (
            <Box paddingRight="xSmall">
              <Icon size="small" name={iconStart} />
            </Box>
          )}

          <Text style={labelStyles}>{children}</Text>

          {withNavigationIndicator && (
            <Box paddingLeft="xSmall">
              <Icon size="small" name="navigate" />
            </Box>
          )}
        </View>
      </Touchable>
    </View>
  )
}
