import FakerClass from 'faker/lib'
import { useMemo } from 'react'

/**
 * Get a new standalone (non-global) Faker instance. The returned instance will always be the
 * same for the lifetime of the component.
 */
export const useFaker = (seed = 0): Faker.FakerStatic =>
  useMemo(() => new FakerClass({ locales: require('faker/lib/locales') }), [seed])
