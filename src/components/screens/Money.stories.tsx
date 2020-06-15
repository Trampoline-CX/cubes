import React from 'react'
import { action } from '@storybook/addon-actions'
import { fileAbsolute } from 'paths.macro'
import { FakeScreen } from '../../storybook/decorators/FakeScreen'
import { IconButton } from '../actions/IconButton/IconButton'
import { Box } from '../structure/Box/Box'
import { DisplayText } from '../text/DisplayText/DisplayText'
import { Divider } from '../structure/Divider/Divider'
import { Card } from '../structure/Card/Card'
import { BodyText } from '../text/BodyText/BodyText'
import { Stack } from '../structure/Stack/Stack'
import { IconName, Icon } from '../icons/Icon/Icon'
import { getStoryTitle } from '../../storybook/get-story-title'

export const Money: React.FC = () => (
  <>
    <Box padding="small">
      <IconButton icon="close-modal" color="accent" onClick={action('Close modal Clicked')} />
    </Box>

    <Box padding="medium">
      <DisplayText>Payment transfer to LN02</DisplayText>
      <DisplayText>$480.50</DisplayText>
    </Box>

    <Divider />

    <Box paddingY="medium">
      <Slate icon="accounts" label="Wednesday, November 10" />
      <Slate icon="accounts" label="PCA Personal chequing account (A)" />
      <Slate icon="note" label="Add a personal note" />
    </Box>

    <Card
      title="More like this"
      headerAction={{ label: 'See all', onClick: action('See all Clicked') }}
      fullWidth
      sectioned
    >
      <BodyText>Graph</BodyText>
    </Card>
  </>
)

const Slate: React.FC<{ icon: IconName; label: string }> = ({ icon, label }) => (
  <Stack horizontal align="center">
    <Box paddingY="small" paddingX="medium">
      <Icon name={icon} />
    </Box>

    <BodyText>{label}</BodyText>
  </Stack>
)

export default {
  title: getStoryTitle(fileAbsolute),
  component: Money,
  decorators: [FakeScreen],
}
