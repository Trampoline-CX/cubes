import React from 'react'
import { Box } from '../../../structure/Box/Box'
import { Heading } from '../../../text'
import { IconButton } from '../../../actions/IconButton/IconButton'

export interface HeaderProps {
  title?: string
  onClose: () => void
  hideClose?: boolean
}

/**
 * Displays the Modal Header.
 */
export const Header: React.FC<HeaderProps> = ({ title, onClose, hideClose }) => (
  <Box horizontal padding="medium" space="medium" align="center" distribution="space-between">
    <Heading>{title}</Heading>
    {hideClose ? null : <IconButton icon="close" onClick={onClose} />}
  </Box>
)
