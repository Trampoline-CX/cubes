import React from 'react'
import { Theme, themes } from '../theme'
import { AppProvider } from './components'
import './playroom.css'

const FrameComponent: React.FC<{ theme: Theme }> = ({ theme = themes.light, children }) => (
  <AppProvider theme={theme}>{children}</AppProvider>
)

export default FrameComponent
