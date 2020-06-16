export interface EdgeInsets {
  top: number
  bottom: number
  left: number
  right: number
}

export const useSafeArea = (): EdgeInsets => ({ top: 0, bottom: 0, left: 0, right: 0 })
