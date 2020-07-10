import React, { useCallback } from 'react'
import { fileAbsolute } from 'paths.macro'
import { getStoryTitle } from '../../storybook/get-story-title'
import { StoryFn } from '../../storybook/utils/storybook-types'
import { SampleConfig, useSampleData } from '../../sample-data'
import { ListView } from '../structure/ListView/ListView'

export default {
  title: getStoryTitle(fileAbsolute),
}

interface User {
  firstName: string
  lastName: string
  occupation: string
  children: number
}

export const Basic: StoryFn<SampleConfig<unknown>> = ({ count = 10, seed, ...props }) => {
  const data = useSampleData<User>({
    count,
    seed,
    ...props,
    generator: useCallback(
      faker => ({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        occupation: faker.name.jobTitle(),
        children: faker.random.number({ min: 2, max: 6, precision: 1 }),
      }),
      [],
    ),
  })

  return (
    <ListView
      values={data.map(x => ({
        title: `${x.firstName} ${x.lastName}`,
        description: `${x.occupation} with ${x.children} children`,
      }))}
    />
  )
}

Basic.argTypes = {
  generator: { control: null },
}

Basic.args = {
  count: 10,
  seed: 1,
  generator: undefined,
}
