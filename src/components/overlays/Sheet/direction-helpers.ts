import { PanResponderGestureState, LayoutRectangle } from 'react-native'

export type SheetFromProp = 'bottom' | 'left' | 'right'

export interface DirectionHelper {
  offScreenTranslationValue: number
  velocityProp: 'vx' | 'vy'
  animatedProp: 'translateX' | 'translateY'
  getTranslateValue: (gestureState: PanResponderGestureState) => number
  shouldDismiss: (velocity: number) => boolean
  getTranslationClosedValue: (layout: LayoutRectangle) => number
}

const bottomDirectionHelper: DirectionHelper = {
  offScreenTranslationValue: 9999999,
  velocityProp: 'vy',
  animatedProp: 'translateY',
  getTranslateValue: ({ dy }) => Math.max(0, dy),
  shouldDismiss: velocity => velocity >= 0.5,
  getTranslationClosedValue: ({ height }) => height,
}

const leftDirectionHelper: DirectionHelper = {
  offScreenTranslationValue: -999999,
  velocityProp: 'vx',
  animatedProp: 'translateX',
  getTranslateValue: ({ dx }) => Math.min(0, dx),
  shouldDismiss: velocity => velocity <= -0.5,
  getTranslationClosedValue: ({ width }) => -width,
}

const rightDirectionHelper: DirectionHelper = {
  offScreenTranslationValue: 999999,
  velocityProp: 'vx',
  animatedProp: 'translateX',
  getTranslateValue: ({ dx }) => Math.max(0, dx),
  shouldDismiss: velocity => velocity >= 0.5,
  getTranslationClosedValue: ({ width }) => width,
}

export const getDirectionHelper = (from: SheetFromProp): DirectionHelper => {
  switch (from) {
    case 'left':
      return leftDirectionHelper
    case 'right':
      return rightDirectionHelper
    // Bottom
    default:
      return bottomDirectionHelper
  }
}
