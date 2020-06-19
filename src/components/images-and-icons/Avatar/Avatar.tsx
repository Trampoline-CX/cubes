import React from 'react'
import { Image, ImageSourcePropType } from 'react-native'
import { Theme, useStyles, useTheme } from '../../../theme'

export interface GeneratedAvatarSource {
  /**
   * The image will be generated from this value using RoboHash.
   *
   * @see https://robohash.org/
   */
  hash: string
}

export interface AvatarProps {
  /**
   * Size of the Avatar.
   */
  size?: keyof Theme['size']['avatar']
  /**
   * Image source (which is the same as React Native `Image` component).
   *
   * An additional `GeneratedAvatarSource` is supported, to generate an Avatar from a Hash image (requires Internet).
   */
  source: ImageSourcePropType | GeneratedAvatarSource
}

/**
 * Displays an Avatar.
 */
export const Avatar: React.FC<AvatarProps> = ({ size: sizeRaw = 'default', source }) => {
  const currentTheme = useTheme()
  const styles = useStyles(theme => ({
    base: {
      backgroundColor: theme.colors.fill.background.lighter,
      borderRadius: theme.radius.circle,
    },
  }))

  const size = currentTheme.size.avatar[sizeRaw]

  return (
    <Image
      style={[styles.base, { width: size, height: size }]}
      source={
        typeof source === 'number' || !('hash' in source)
          ? source
          : _getGeneratedAvatarSource(source, size)
      }
    />
  )
}

const _getGeneratedAvatarSource = (
  source: GeneratedAvatarSource,
  size: number,
): ImageSourcePropType => {
  const urlEncodedHash = encodeURIComponent(source.hash)

  return {
    uri: `https://avatars.dicebear.com/api/identicon/${urlEncodedHash}.svg?width=${size}&height=${size}`,
  }
}
