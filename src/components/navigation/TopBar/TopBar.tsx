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
  title?: string
  iconStart?: IconName | 'none'
  onIconStartClick?: () => void
}

const { height } = shameStyles.topBar

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
