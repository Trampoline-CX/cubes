import WebModal from 'modal-react-native-web'
import { Modal as RNModal, Platform } from 'react-native'

if (Platform.OS === 'web') {
  // Set App Element of Modal (for React Native Web)
  WebModal.setAppElement('body')
}

export const Modal = Platform.OS === 'web' ? WebModal : RNModal
