declare module 'modal-react-native-web' {
  const Modal: typeof import('react-native').Modal & {
    setAppElement: (element: string) => void
  }
  export default Modal
}
