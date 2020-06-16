import React from 'react'
import { useStyles } from '../../../theme'
import { View } from 'react-native'
import { shameStyles } from '../../../theme/shame-styles'
import { IconName } from '../../icons/Icon/Icon'
import { BodyText } from '../../text/BodyText/BodyText'
import { Heading } from '../../text/Heading/Heading'
import { Box } from '../../structure/Box/Box'
import { IconButton } from '../../actions/IconButton/IconButton'
import { useNav } from '../NavigationProvider/NavigationProvider'

export interface TopBarProps {
  /**
   * Title to display in the bar (empty for no title).
   */
  title?: string
  /**
   * Icon to display in the bar. Leaving this `undefined` will show a Back button. To have no icon, use `"none"`.
   */
  iconStart?: IconName | 'none'
  /**
   * Action to do when the `iconStart` is clicked. If not set, will call `useNav().goBack()`.
   */
  onIconStartClick?: () => void
}

const { height } = shameStyles.topBar

/**
 * Top Bar used for navigation and title display. Acts as an App Bar for Android and Navigation Bar for iOS.
 */
export const TopBar: React.FC<TopBarProps> = ({
  title,
  iconStart = 'go-back',
  onIconStartClick: onIconStartClickRaw,
}) => {
  const styles = useStyles(theme => ({
    root: {
      flexDirection: 'row',
      backgroundColor: theme.colors.fill.background.lighter,
      height,
      alignItems: 'center',
      ...theme.elevation.z4,
    },
  }))

  const { goBack } = useNav()
  const onIconStartClick = onIconStartClickRaw || goBack

  return (
    <View style={styles.root}>
      {iconStart !== 'none' ? (
        <Box paddingX="xSmall">
          <IconButton icon={iconStart} onClick={onIconStartClick}></IconButton>
        </Box>
      ) : null}
      <Box paddingX="medium">
        <Heading>{title}</Heading>
      </Box>
    </View>
  )
}
