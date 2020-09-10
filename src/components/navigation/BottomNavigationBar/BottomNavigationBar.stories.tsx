import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { action } from '@storybook/addon-actions'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { Screen } from '../../structure/Screen/Screen'
import { PhoneScreen } from '../../../storybook/decorators/PhoneScreen'
import { TextContainer, DisplayText, BodyText } from '../../text'
import { LOREM_IPSUM } from '../../../storybook/utils/constants'
import { TopBar } from '../TopBar/TopBar'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { BottomNavigationBar, BottomNavigationBarProps } from './BottomNavigationBar'

export default {
  title: getStoryTitle(fileAbsolute),
  component: BottomNavigationBar,
  subcomponents: { 'BottomNavigationBar.Tab': BottomNavigationBar.Tab },
  decorators: [PhoneScreen],
}

export const Basic: StoryFn<BottomNavigationBarProps> = props => (
  <Screen>
    <TopBar title="Bar Title" />
    <Screen.Content padding="medium">
      <TextContainer>
        <DisplayText>Screen Title</DisplayText>
        <BodyText>{LOREM_IPSUM}</BodyText>
      </TextContainer>
    </Screen.Content>
    <BottomNavigationBar {...props} />
  </Screen>
)

Basic.args = {
  children: (
    <>
      <BottomNavigationBar.Tab icon="dashboard" selected onClick={action('Money Tab Click')} />
      <BottomNavigationBar.Tab icon="account-balance" onClick={action('Accounts Tab Click')} />
      <BottomNavigationBar.Tab icon="person" onClick={action('Profile Tab Click')} />
    </>
  ),
}

Basic.argTypes = {
  children: { control: null },
}
