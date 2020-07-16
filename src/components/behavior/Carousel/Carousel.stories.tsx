import React, { useState } from 'react'
import { fileAbsolute } from 'paths.macro'
import { Image, ImageStyle } from 'react-native'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { DisplayText } from '../../text'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { PreventOverflow } from '../../../storybook/decorators/PreventOverflow'
import { Carousel, CarouselProps } from './Carousel'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Carousel,
  decorators: [PreventOverflow],
}

export const Basic: StoryFn<CarouselProps> = props => {
  const [index, setIndex] = useState(props.selectedIndex || 0)
  const imageStyle: ImageStyle = { height: '100%', width: '100%' }

  return (
    <Carousel {...props} selectedIndex={index} onSelect={setIndex} style={{ height: 450 }}>
      <Carousel.Slide>
        <Image
          style={imageStyle}
          source={{ uri: require('../../../../storybook/assets/images/puppy-1.jpg') }}
        />
      </Carousel.Slide>
      <Carousel.Slide>
        <Image
          style={imageStyle}
          source={{ uri: require('../../../../storybook/assets/images/puppy-2.jpg') }}
        />
      </Carousel.Slide>
      <Carousel.Slide>
        <Image
          style={imageStyle}
          source={{ uri: require('../../../../storybook/assets/images/puppy-3.jpg') }}
        />
      </Carousel.Slide>
      <Carousel.Slide>
        <Image
          style={imageStyle}
          source={{ uri: require('../../../../storybook/assets/images/puppy-4.jpg') }}
        />
      </Carousel.Slide>
    </Carousel>
  )
}

Basic.argTypes = {
  style: { control: null },
  children: { control: null },
}

export const Uncontrolled: React.FC = () => (
  <Carousel style={{ height: 200 }}>
    <Carousel.Slide>
      <DisplayText>Title 1</DisplayText>
    </Carousel.Slide>
    <Carousel.Slide>
      <DisplayText>Title 2</DisplayText>
    </Carousel.Slide>
    <Carousel.Slide>
      <DisplayText>Title 3</DisplayText>
    </Carousel.Slide>
    <Carousel.Slide>
      <DisplayText>Title 4</DisplayText>
    </Carousel.Slide>
  </Carousel>
)
