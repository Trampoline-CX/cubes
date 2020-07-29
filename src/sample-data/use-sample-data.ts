import _ from 'lodash'
import { useMemo } from 'react'
import { useFaker } from './use-faker'

/**
 * Configuration for Sample Data generation.
 */
export interface SampleConfig<Result> {
  /**
   * Number of sample data to return.
   */
  count: number
  /**
   * Optional custom seed to generate data. If not specified, 1 is used.
   * If you want random data on each call, just pass 0 as a seed.
   */
  seed?: number
  /**
   * Generator function called to generate the data of each item.
   * Use the faker instance to generate your data.
   */
  generator: (faker: Faker.FakerStatic, index: number) => Result
}

export const useSampleData = <Result>({
  count,
  seed = 1,
  generator,
}: SampleConfig<Result>): Result[] => {
  const faker = useFaker(seed)
  return useMemo(() => {
    // Reset the seed each time (to reset the underlying random) and
    // make sure we always get the same results
    faker.seed(seed)

    return _.times(count, i => generator(faker, i))
  }, [faker, seed, count, generator])
}
