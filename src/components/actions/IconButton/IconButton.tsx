import React from 'react'
import { View } from 'react-native'
import { Touchable } from '../../base/Touchable/Touchable'
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
   *
   * If this is not set, there will still be touch feedback, but no action will be performed.
   * Optional mainly for mockup purposes.
   */
  onClick?: () => void
  /**
   * Called when the button is long-clicked.
   */
  onLongClick?: () => void
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
  onClick = () => {}, // Defaults to empty action, to keep touch feedback
  onLongClick,
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
    containerDisabled: {
      opacity: theme.opacity.disabled,
    },
  }))

  return (
    <View style={styles.bounds}>
      <Touchable
        onClick={onClick}
        onLongClick={onLongClick}
        disabled={disabled}
        viewStyle={[styles.container, disabled && styles.containerDisabled]}
      >
        <Icon name={icon} color={color} size={size} />
      </Touchable>
    </View>
  )
}
