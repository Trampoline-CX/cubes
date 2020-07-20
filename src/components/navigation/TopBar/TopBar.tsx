import React, { useMemo } from 'react'
import { View } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'
import { useStyles } from '../../../theme'
import { shameStyles } from '../../../theme/shame-styles'
import { IconName } from '../../images-and-icons/Icon/Icon'
import { Heading } from '../../text/Heading/Heading'
import { Box } from '../../structure/Box/Box'
import { IconButton } from '../../actions/IconButton/IconButton'
import { IconAction } from '../../actions/actions'
import { useNav } from '../../../navigation'
import { Icon } from './Icon/Icon'
import { TopBarSource } from './TopBarProvider/TopBarProvider'

export interface TopBarProps {
  /**
   * Title to display in the bar (empty for no title).
   */
  title?: string
  /**
   * Icon to display in the bar. Leaving this `undefined` will show a Back button (unless `withDrawerMenu` is specified). To have no icon, use `"none"`.
   */
  iconStart?: IconName | 'none'
  /**
   * Action to do when the `iconStart` is clicked. If not set, will call `useNav().goBack()`, unless `withDrawerMenu`
   * is `true`, in which case it will call `useNav().drawer.open()`.
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
  /**
   * This prop standardizes display of TopBar to have a `DrawerMenu` in the App.
   *
   * Setting this to true will:
   * - Default `startIcon` will be set to `"none"` on desktop (while `DrawerMenu` is always displayed)
   * and set it to `"menu"` on mobile (when `DrawerMenu` is shown on User action).
   * - `onIconStartClick`, if not set, will open `DrawerMenu` on click.
   */
  withDrawerMenu?: boolean
}

const { height } = shameStyles.topBar

/**
 * Used for displaying title and back navigation. Can optionally include additional quick actions.
 *
 * Acts as an App Bar for Android and Navigation Bar for iOS.
 */
export const TopBar: React.FC<TopBarProps> = ({
  title,
  withDrawerMenu = false,
  iconStart = withDrawerMenu ? 'menu' : 'arrow-back',
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
      zIndex: 1,
      ...theme.elevation.z4,
    },
    transparentRoot: {
      backgroundColor: theme.colors.transparent,
      ...theme.elevation.z0,
    },
  }))

  const { back, drawer } = useNav()
  const onIconStartClick = onIconStartClickRaw || (withDrawerMenu ? drawer.open : back)
  const actionComponents = useMemo(
    () =>
      actions?.map(({ icon, action, color }, index) => (
        <Icon key={index} name={icon} onClick={action} color={color} />
      )),
    [actions],
  )

  const showIconStart = iconStart !== 'none' && (!withDrawerMenu || drawer.isModal)

  return (
    <TopBarSource>
      <View
        style={[
          styles.root,
          transparent ? styles.transparentRoot : null,
          { paddingTop: insets.top, height: insets.top + height },
        ]}
      >
        {showIconStart && (
          <Box paddingX="xSmall">
            <IconButton icon={iconStart as IconName} onClick={onIconStartClick} />
          </Box>
        )}
        <Box paddingX="medium" fill>
          <Heading maxLines={1}>{title}</Heading>
        </Box>
        <Box horizontal reverse>
          {actionComponents}
        </Box>
      </View>
    </TopBarSource>
  )
}
