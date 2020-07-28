// eslint-disable-next-line react-native/split-platform-components
import { TextStyle, ShadowStyleIOS, ViewStyle, EasingFunction } from 'react-native'

/**
 * Type for a color. Used for readability purpose.
 */
export type ColorHex = string

/**
 * Type for a font-family. Used for readability purpose.
 */
export type FontFamily = string | undefined

/**
 * Type for a font-weight.
 */
export type FontWeight = Required<TextStyle>['fontWeight']

export interface FontSize {
  size: number
  height: number
}

/**
 * Type representing an Elevation.
 */
export type Elevation = ShadowStyleIOS & Pick<Required<ViewStyle>, 'elevation'>

/**
 * Represents a complex color that has a base, light and dark value.
 */
export interface ComplexColor {
  default: ColorHex
  lighter: ColorHex
  darker: ColorHex
}

/**
 * Structure of a Theme.
 */
export interface ThemeBase {
  // COLORS
  colors: {
    fill: {
      primary: ColorHex
      secondary: ColorHex
      accent: ColorHex
      background: ComplexColor & { inverse: ColorHex }
      divider: ColorHex
    }
    text: {
      primary: ColorHex
      accent: ColorHex
      inverse: ColorHex
      subdued: ColorHex
    }
    transparent: ColorHex
    positive: ColorHex
    negative: ColorHex
    status: {
      success: ColorHex
      warning: ColorHex
      error: ColorHex
    }
  }

  // FONT
  font: {
    family: FontFamily
    size: {
      large: FontSize
      regular: FontSize
      small: FontSize
    }
    weights: {
      regular: FontWeight
      strong: FontWeight
    }
  }

  // SPACING
  spacing: {
    xxLarge: number
    xLarge: number
    large: number
    medium: number
    small: number
    xSmall: number
    none: number
  }

  // OPACITY
  opacity: {
    disabled: number
  }

  // BORDERS SIZE
  border: {
    thinner: number
    small: number
    none: number
  }

  // ELEVATION
  elevation: {
    // No elevation
    z0: Elevation
    // For cards
    z2: Elevation
    // For Navbar, elements above cards
    z4: Elevation
    // Sheets, dialogs, Bottom Navigation Bar
    z8: Elevation
    // Modal Sheets
    z16: Elevation
  }

  // SIZING
  size: {
    minTouchArea: number
    icon: {
      default: number
      large: number
      small: number
      xLarge: number
    }
    avatar: {
      small: number
      default: number
    }
    divider: number
    bullet: number
  }

  // RADIUS
  radius: {
    circle: number
    small: number
    medium: number
    large: number
    none: number
  }

  // ANIMATIONS
  animation: {
    duration: {
      default: number
      shorter: number
      longer: number
    }
    easing: {
      enter: EasingFunction
      exit: EasingFunction
      move: EasingFunction
    }
  }
}

/**
 * ThemeBase with correct typings once colors are generated.
 */
export interface Theme extends Omit<ThemeBase, 'colors'> {
  colors: Omit<ThemeBase['colors'], 'fill'> & {
    fill: {
      primary: ComplexColor
      secondary: ComplexColor
      accent: ComplexColor
      background: ComplexColor & { inverse: ColorHex }
      divider: ColorHex
    }
  }
}

/**
 * Typescript Utility type for providing an object where all properties (root and deep), are optional.
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? DeepPartial<U>[]
    : T[P] extends readonly (infer U)[]
    ? readonly DeepPartial<U>[]
    : DeepPartial<T[P]>
}
