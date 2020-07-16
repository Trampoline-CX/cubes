import { NativeSyntheticEvent } from 'react-native'

// Augment React Native types with those of React Native Web
declare module 'react-native' {
  export interface ViewProps {
    onMouseEnter?: (event: NativeSyntheticEvent) => void
    onMouseLeave?: (event: NativeSyntheticEvent) => void
  }
}
