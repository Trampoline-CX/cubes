import React from 'react'

export interface EdgeInsets {
  top: number
  bottom: number
  left: number
  right: number
}

export const useSafeArea = (): EdgeInsets => ({ top: 0, bottom: 0, left: 0, right: 0 })

export const SafeAreaProvider: React.FC = ({ children }) => <>{children}</>

export const SafeAreaConsumer: React.FC<{ children: (insets: EdgeInsets) => JSX.Element }> = ({
  children,
}) => <>{children({ top: 0, bottom: 0, left: 0, right: 0 })}</>
