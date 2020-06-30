import React from 'react'
import { View } from 'react-native'
import { Touchable, TouchableProps } from '../../base/Touchable/Touchable'
import { IconProps, Icon } from '../../images-and-icons/Icon/Icon'
import { useStyles } from '../../../theme'

export interface IconButtonProps {
  /**
   * The icon to display.
   */
  icon: IconProps['name']
  /**
   * Color of the icon.
   */
  color?: IconProps['color']
  /**
   * Set to `true` to disable the button.
   */
  disabled?: boolean
  /**
   * Called when the button is clicked.
   */
  onClick: TouchableProps['onClick']
  /**
   * Size of the button.
   */
  size?: Extract<IconProps['size'], 'default' | 'small'>
}

/**
 * Used to display actions that should be clearly understood using only an `Icon`.
 */
export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  color,
  disabled = false,
  onClick,
  size = 'default',
}) => {
  const styles = useStyles(theme => ({
    bounds: {
      borderRadius: theme.radius.circle,
      overflow: 'hidden',
    },
    container: {
      minWidth: theme.size.minTouchArea,
      minHeight: theme.size.minTouchArea,
      alignItems: 'center',
      justifyContent: 'center',
    },
  }))

  return (
    <View style={styles.bounds}>
      <Touchable onClick={onClick} disabled={disabled}>
        <View style={styles.container}>
          <Icon name={icon} color={color} size={size} />
        </View>
      </Touchable>
    </View>
  )
}
