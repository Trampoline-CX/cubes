import React from 'react'
import { Box } from '../../../structure'
import { Heading } from '../../../text'
import { IconButton } from '../../../actions'

export interface HeaderProps {
  title?: string
  onClose: () => void
}

/**
 * Displays the Modal Header.
 */
export const Header: React.FC<HeaderProps> = ({ title, onClose }) => (
  <Box horizontal padding="medium" space="medium" align="center" distribution="space-between">
    <Heading>{title}</Heading>
    <IconButton icon="close" onClick={onClose} />
  </Box>
)
