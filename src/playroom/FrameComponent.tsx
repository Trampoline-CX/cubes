import React from 'react'
import { AppProvider } from './components'

const FrameComponent: React.FC = ({ children }) => <AppProvider>{children}</AppProvider>

export default FrameComponent
