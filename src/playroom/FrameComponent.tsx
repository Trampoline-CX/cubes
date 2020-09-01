import React from 'react'
import { AppProvider } from './components'
import './playroom.css'

const FrameComponent: React.FC = ({ children }) => <AppProvider>{children}</AppProvider>

export default FrameComponent
