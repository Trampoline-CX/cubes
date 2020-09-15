import _ from 'lodash'
import tinycolor from 'tinycolor2'
import { Easing } from 'react-native'
import { DeepPartial, Theme, ThemeBase, ColorHex, ComplexColor } from './theme-types'

const lightTheme: ThemeBase = {
  // COLORS
  colors: {
    fill: {
      primary: '#5B6275',
      secondary: '#F7B5A1',
      accent: '#EE5D71',
      background: {
        default: '#FCF8F7',
        lighter: '#FFF',
        darker: '#EDE9E4',
        inverse: '#5B6275',
      },
      divider: 'rgba(0,0,0,0.10)',
    },
    text: {
      primary: '#454B59',
      accent: '#EE5D71',
      subdued: '#888888',
      inverse: '#FFFFFF',
    },
    transparent: 'transparent',
    positive: '#63A84C',
    negative: '#D32F2F',
    status: {
      success: '#A5DBCA',
      warning: '#FAD1A2',
      error: '#ef5350',
    },
  },

  // FONT
  font: {
    family: undefined,
    size: {
      large: {
        size: 24,
        height: 32,
      },
      regular: {
        size: 16,
        height: 24,
      },
      small: {
        size: 12,
        height: 16,
      },
    },
    weights: {
      regular: '400',
      strong: '700',
    },
  },

  // OPACITY
  opacity: {
    disabled: 0.6,
  },

  // BORDERS SIZE
  border: {
    thinner: 1,
    small: 2,
    none: 0,
  },

  // ELEVATION
  elevation: {
    z0: {
      shadowOffset: undefined,
      shadowOpacity: 0,
      shadowRadius: 0,
      shadowColor: '#000',
      elevation: 0,
    },
    // For cards
    z2: {
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.5,
      shadowColor: '#000',
      elevation: 2,
    },
    z4: {
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.22,
      shadowRadius: 2.5,
      shadowColor: '#000',
      elevation: 4,
    },
    z8: {
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.22,
      shadowRadius: 7.5,
      shadowColor: '#000',
      elevation: 8,
    },
    z16: {
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.22,
      shadowRadius: 15.5,
      shadowColor: '#000',
      elevation: 16,
    },
  },

  // SIZING
  size: {
    minTouchArea: 48,
    icon: {
      default: 24,
      small: 16,
      large: 48,
      xLarge: 64,
    },
    avatar: {
      small: 32,
      default: 40,
    },
    divider: 1,
    bullet: 8,
    breakpoints: {
      small: 576,
      large: 1700,
    },
  },

  // SPACING
  spacing: {
    xxLarge: 40,
    xLarge: 32,
    large: 24,
    medium: 16,
    small: 8,
    xSmall: 4,
    none: 0,
  },

  // RADIUS
  radius: {
    circle: 9999,
    small: 2,
    medium: 4,
    large: 8,
    none: 0,
  },

  animation: {
    duration: {
      default: 300,
      shorter: 150,
      longer: 400,
    },
    easing: {
      enter: Easing.out(Easing.ease), // Ease out
      exit: Easing.ease, // Ease in
      move: Easing.inOut(Easing.ease), // Ease in-out
    },
  },
}

export const buildTheme: (theme: DeepPartial<ThemeBase>, inverse?: boolean) => Theme = (
  theme,
  inverse = false,
) => {
  // Create new ThemeBase using lightTheme as defaults
  const newBase: ThemeBase = _.defaultsDeep(theme, lightTheme)

  // Derive light and dark colors...
  return {
    ...newBase,
    colors: {
      ...newBase.colors,
      fill: {
        ...newBase.colors.fill,
        primary: _deriveColors(newBase.colors.fill.primary, inverse),
        secondary: _deriveColors(newBase.colors.fill.secondary, inverse),
        accent: _deriveColors(newBase.colors.fill.accent, inverse),
      },
    },
  }
}

const _deriveColors = (color: ColorHex, inverse: boolean): ComplexColor => ({
  default: color,
  lighter: tinycolor(color)[inverse ? 'darken' : 'lighten'](10).toString(),
  darker: tinycolor(color)[inverse ? 'lighten' : 'darken'](10).toString(),
})

export const themes = {
  light: buildTheme(lightTheme),
  dark: buildTheme(
    {
      colors: {
        fill: {
          primary: '#7a849e',
          secondary: '#ffccbc',
          accent: '#EE5D71',
          background: {
            lighter: '#030d1e',
            default: '#2c3445',
            darker: '#565d70',
            inverse: '#b8c4e4',
          },
          divider: 'rgba(255,255,255,0.30)',
        },
        text: {
          primary: '#FAFAFA',
          accent: '#EE5D71',
          subdued: '#8a90a6',
          inverse: '#2c3142',
        },
        positive: '#63A84C',
        negative: '#D32F2F',
        status: {
          success: '#A5DBCA',
          warning: '#ffb74d',
          error: '#ef5350',
        },
      },
      elevation: {
        z0: {
          shadowColor: 'rgba(255, 255, 255, 0.3)',
        },
        z2: {
          shadowColor: 'rgba(255, 255, 255, 0.3)',
        },
        z4: {
          shadowColor: 'rgba(255, 255, 255, 0.3)',
        },
        z8: {
          shadowColor: 'rgba(255, 255, 255, 0.3)',
        },
        z16: {
          shadowColor: 'rgba(255, 255, 255, 0.3)',
        },
      },
    },
    true,
  ),
}
