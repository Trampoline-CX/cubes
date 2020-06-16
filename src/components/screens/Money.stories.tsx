import React from 'react'
import { action } from '@storybook/addon-actions'
import { fileAbsolute } from 'paths.macro'
import { IconButton } from '../actions/IconButton/IconButton'
import { Box } from '../structure/Box/Box'
import { DisplayText } from '../text/DisplayText/DisplayText'
import { Divider } from '../structure/Divider/Divider'
import { Card } from '../structure/Card/Card'
import { BodyText } from '../text/BodyText/BodyText'
import { Stack } from '../structure/Stack/Stack'
import { IconName, Icon } from '../icons/Icon/Icon'
import { getStoryTitle } from '../../storybook/get-story-title'
import { PhoneScreen } from '../../storybook/decorators/PhoneScreen'
import { Screen } from '../structure'
import { BottomNavigationBar } from '../navigation/BottomNavigationBar/BottomNavigationBar'

export default {
  title: getStoryTitle(fileAbsolute),
  decorators: [PhoneScreen],
}

export const Money: React.FC = () => (
  <Screen>
    <Screen.Content scroll>
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
    </Screen.Content>

    <BottomNavigationBar>
      <BottomNavigationBar.Tab icon="money" selected onClick={action('Money Tab Clicked')} />
      <BottomNavigationBar.Tab icon="search" onClick={action('Explore Tab Clicked')} />
      <BottomNavigationBar.Tab icon="profile" onClick={action('Profile Tab Clicked')} />
    </BottomNavigationBar>
  </Screen>
)

const Slate: React.FC<{ icon: IconName; label: string }> = ({ icon, label }) => (
  <Stack horizontal align="center">
    <Box paddingY="small" paddingX="medium">
      <Icon name={icon} />
    </Box>

    <BodyText>{label}</BodyText>
  </Stack>
)
