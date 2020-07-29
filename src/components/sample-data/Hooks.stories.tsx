import React, { useCallback } from 'react'
import { StoryFn } from '../../storybook/utils/storybook-types'
import { SampleConfig, useSampleData } from '../../sample-data'
import { ListView } from '../structure/ListView/ListView'

// No Global stories definition since Stories are defined in MDX file.

export const Basic: StoryFn<SampleConfig<unknown>> = ({ count = 3, seed, ...props }) => {
  const data = useSampleData({
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
