import _ from 'lodash'
import React from 'react'
import { View } from 'react-native'
import { fileAbsolute } from 'paths.macro'
import { Centered } from '../../../storybook/decorators/Centered'
import { DarkBackground } from '../../../storybook/decorators/DarkBackground'
import { useStyles } from '../../../theme'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { iconsMap } from '../../../assets/icons'
import { Icon, IconProps, IconName } from './Icon'

const IconContainer: React.FC<Omit<IconProps, 'name'>> = props => {
  const styles = useStyles(() => ({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  }))

  const icons = _.keys(iconsMap).map(icon => <Icon key={icon} name={icon as IconName} {...props} />)

  return <View style={styles.container}>{icons}</View>
}

export default {
  title: getStoryTitle(fileAbsolute),
  component: Icon,
  decorators: [Centered],
}

export const Example: React.FC = () => <Icon name="fingerprint" />
export const All: React.FC = () => <IconContainer />
export const All_Inverse: React.FC & { story: unknown } = () => <IconContainer color="inverse" />
All_Inverse.story = {
  decorators: [DarkBackground],
}

export const LargeAccent: React.FC = () => <Icon name="home" size="large" color="accent" />
