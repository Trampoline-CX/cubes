import React from 'react'
import { action } from '@storybook/addon-actions'
import { fileAbsolute } from 'paths.macro'
import { FakeScreen } from '../../storybook/decorators/FakeScreen'
import { DisplayText } from '../text/DisplayText/DisplayText'
import { Box } from '../structure/Box/Box'
import { Divider } from '../structure/Divider/Divider'
import { Touchable } from '../base/Touchable/Touchable'
import { IconName, Icon } from '../icons/Icon/Icon'
import { Stack } from '../structure/Stack/Stack'
import { BodyText } from '../text/BodyText/BodyText'
import { getStoryTitle } from '../../storybook/get-story-title'

export const Profile: React.FC = () => (
  <>
    <Box padding="medium">
      <DisplayText>Profile</DisplayText>
    </Box>

    <Divider />

    <Box paddingY="medium">
      <Slate icon="profile" label="My account" />
      <Slate icon="accounts" label="Linked bank connections" />
      <Slate icon="security" label="Security" />
      <Slate icon="sign-out" label="Sign out" onClick={action('Sign out Clicked')} />
    </Box>
  </>
)

const Slate: React.FC<{ icon: IconName; label: string; onClick?: () => void }> = ({
  icon,
  label,
  onClick,
}) => (
  <Touchable onClick={onClick}>
    <Stack horizontal align="center">
      <Box padding="medium">
        <Icon name={icon} />
      </Box>

      <BodyText>{label}</BodyText>
    </Stack>
  </Touchable>
)

export default {
  title: getStoryTitle(fileAbsolute),
  component: Profile,
  decorators: [FakeScreen],
}
