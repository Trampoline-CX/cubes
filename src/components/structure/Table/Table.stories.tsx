import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { Table, TableProps } from './Table'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Table,
}

export const Basic: StoryFn<TableProps> = props => <Table {...props} />

Basic.args = {
  headings: ['Occupation', 'Number of employees', 'Satisfaction'],
  rows: [
    ['Designers', '12', '😐'],
    ['Developers', '> 9000', '🙂'],
    ['Quality Insurance', '1', '😭'],
  ],
  columnsImportance: [2, 1, 1],
}
