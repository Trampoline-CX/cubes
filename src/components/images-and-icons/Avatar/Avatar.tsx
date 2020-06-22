import React, { useMemo } from 'react'
import { Image, ImageSourcePropType } from 'react-native'
import Identicon from 'identicon.js'
import { Theme, useStyles, useTheme } from '../../../theme'
import { generateSha512 } from '../../../utils/sha512'

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
  const realSource = useMemo<ImageSourcePropType>(
    () =>
      typeof source === 'number' || !('hash' in source)
        ? source
        : _getGeneratedAvatarSource(source, size),
    [source, size],
  )

  return <Image style={[styles.base, { width: size, height: size }]} source={realSource} />
}

const _getGeneratedAvatarSource = (
  source: GeneratedAvatarSource,
  size: number,
): ImageSourcePropType => ({
  uri: 'data:image/png;base64,' + new Identicon(generateSha512(source.hash), { size }).toString(),
})
