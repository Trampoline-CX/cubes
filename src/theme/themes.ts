import lightTheme from './light-theme.json'
import darkTheme from './dark-theme.json'
import { ThemeJson, Theme, Easing as EasingEnum } from './theme-types'
import { EasingFunction, Easing } from 'react-native'

const _buildTheme = (theme: ThemeJson): Theme => {
  return {
    ...theme,
    animation: {
      ...theme.animation,
      easing: {
        enter: _getEasing(theme.animation.easing.enter),
        exit: _getEasing(theme.animation.easing.exit),
        move: _getEasing(theme.animation.easing.move),
      },
    },
  }
}

const _getEasing = (easing: EasingEnum): EasingFunction => {
  switch (easing) {
    case 'ease-in':
      return Easing.ease
    case 'ease-out':
      return Easing.out(Easing.ease)
    case 'ease-in-out':
      return Easing.inOut(Easing.ease)
  }
}

export const themes = {
  light: _buildTheme(lightTheme as ThemeJson),
  dark: _buildTheme(darkTheme as ThemeJson),
}
