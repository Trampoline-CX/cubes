import _ from 'lodash'
import { Easing } from 'react-native'
import { DeepPartial, Theme } from './theme-types'

const lightTheme: Theme = {
  // COLORS
  colors: {
    fill: {
      primary: {
        default: '#5B6275',
        lighter: '#FFFFFF',
        darker: '#FFFFFF',
      },
      accent: {
        default: '#EE5D71',
        lighter: '#FFFFFF',
        darker: '#FFFFFF',
      },
      accentSecondary: {
        default: '#F7B5A1',
        lighter: '#FFE6DE',
        darker: '#EA947A',
      },
      background: {
        default: '#FCF8F7',
        lighter: '#FFF',
        darker: '#EDE9E4',
      },
      divider: {
        default: 'rgba(0,0,0,0.10)',
        lighter: 'rgba(0,0,0,0.05)',
        darker: '#303131',
      },
    },
    text: {
      primary: '#454B59',
      accent: '#EE5D71',
      subdued: '#888888',
      inverse: '#FFFFFF',
    },
    transparent: 'transparent',
    destructive: '#FF0000',
    positive: '#63A84C',
    negative: '#D32F2F',
    status: {
      success: {
        default: '#A5DBCA',
        lighter: '#D3E3DE',
        darker: '#6BBFA5',
      },
      warning: '#FAD1A2',
      error: '#F00',
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
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.22,
      shadowRadius: 2.5,
      shadowColor: '#000',
      elevation: 4,
    },
    z8: {
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.22,
      shadowRadius: 4.5,
      shadowColor: '#000',
      elevation: 8,
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

export const buildTheme: (theme: DeepPartial<Theme>) => Theme = theme =>
  _.defaultsDeep(theme, lightTheme)

export const themes = {
  light: lightTheme,
  dark: buildTheme({
    colors: {
      fill: {
        background: {
          lighter: '#000000',
          default: '#383838',
        },
        divider: {
          default: '#282828',
          lighter: '#282828',
          darker: '#282828',
        },
      },
      text: {
        primary: '#EEEEEE',
        inverse: '#383838',
      },
    },
  }),
}
