import React, { useMemo } from 'react'
import { View } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'
import { useStyles } from '../../../theme'
import { shameStyles } from '../../../theme/shame-styles'
import { IconName } from '../../icons/Icon/Icon'
import { Heading } from '../../text/Heading/Heading'
import { Box } from '../../structure/Box/Box'
import { IconButton } from '../../actions/IconButton/IconButton'
import { IconAction } from '../../actions'
import { useNav } from '../../../navigation'
import { Icon } from './Icon/Icon'

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
  /**
   * Set to true to use a transparent background.
   */
  transparent?: boolean
  /**
   * Actions displayed at the right in the bar.
   *
   * > **Note:** Icons will appear in reverse order, as first icon is more important and should be
   * the rightmost icon.
   */
  actions?: IconAction[]
}

const { height } = shameStyles.topBar

/**
 * Top Bar used for navigation and title display. Acts as an App Bar for Android and Navigation Bar for iOS.
 */
export const TopBar: React.FC<TopBarProps> = ({
  title,
  iconStart = 'go-back',
  onIconStartClick: onIconStartClickRaw,
  transparent = false,
  actions,
}) => {
  const insets = useSafeArea()
  const styles = useStyles(theme => ({
    root: {
      flexDirection: 'row',
      backgroundColor: theme.colors.fill.background.lighter,
      alignItems: 'center',
      ...theme.elevation.z4,
    },
    transparentRoot: {
      backgroundColor: theme.colors.transparent,
      ...theme.elevation.z0,
    },
  }))

  const { back } = useNav()
  const onIconStartClick = onIconStartClickRaw || back
  const actionComponents = useMemo(
    () =>
      actions?.map(({ icon, action, color }, index) => (
        <Icon key={index} name={icon} onClick={action} color={color} />
      )),
    [actions],
  )

  return (
    <View
      style={[
        styles.root,
        transparent ? styles.transparentRoot : null,
        { paddingTop: insets.top, height: insets.top + height },
      ]}
    >
      {iconStart !== 'none' ? (
        <Box paddingX="xSmall">
          <IconButton icon={iconStart} onClick={onIconStartClick} />
        </Box>
      ) : null}
      <Box paddingX="medium" fill>
        <Heading maxLines={1}>{title}</Heading>
      </Box>
      <Box horizontal reverse>
        {actionComponents}
      </Box>
    </View>
  )
}
