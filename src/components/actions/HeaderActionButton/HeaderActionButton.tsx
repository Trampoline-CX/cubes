import React from 'react'
import { Text, View } from 'react-native'
import { useStyles } from '../../../theme'
import { Touchable } from '../../base/Touchable/Touchable'
import { useTextStyles } from '../../text/use-text-styles'
import { Box } from '../../structure/Box/Box'
import { Icon, IconName } from '../../icons/Icon/Icon'

export interface HeaderActionButtonProps {
  /**
   * Icon to display before the text.
   */
  iconStart?: IconName
  /**
   * Action triggered on the click of the Button.
   */
  onClick: () => void
  /**
   * Text of the Button.
   */
  children: string
}

/**
 * Button that is displayed in a Header, like Navigation Bar (for iOS).
 */
export const HeaderActionButton: React.FC<HeaderActionButtonProps> = ({
  iconStart,
  children,
  onClick,
}) => {
  const { textStyles } = useTextStyles()
  const styles = useStyles(theme => ({
    root: {
      borderRadius: theme.radius.circle,
      overflow: 'hidden',
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.small,
      paddingVertical: theme.spacing.xSmall,

      backgroundColor: theme.colors.fill.background.darker,
      borderRadius: theme.radius.circle,
    },
    label: {},
  }))

  const labelStyles = [textStyles.body, styles.label]

  return (
    <View style={styles.root}>
      <Touchable onClick={onClick}>
        <View style={styles.container}>
          {iconStart && (
            <Box paddingRight="small">
              <Icon size="small" name={iconStart} />
            </Box>
          )}

          <Text style={labelStyles}>{children}</Text>
        </View>
      </Touchable>
    </View>
  )
}
