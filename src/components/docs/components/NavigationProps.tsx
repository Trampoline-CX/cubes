/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { Props } from '@storybook/addon-docs/blocks'
import { StackNavigatorOptions, SwitchNavigatorOptions } from '../../../navigation/navigators'

/**
 * This file is to reuse JSDoc in MDX docs.
 */

export const StackOptionsProps: React.FC<StackNavigatorOptions> = ({ animation = 'default' }) => (
  <Props of={StackOptionsProps} />
)

export const SwitchOptionsProps: React.FC<SwitchNavigatorOptions> = ({
  backBehavior = 'default',
}) => <Props of={SwitchOptionsProps} />
