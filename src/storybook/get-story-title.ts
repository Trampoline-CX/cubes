import path from 'path'
import _ from 'lodash'
import { fileAbsolute } from 'paths.macro'

// Reolve path of components folder, where stories are located.
const componentsFolder = path.resolve(fileAbsolute, '../../components')

export const getStoryTitle = (dirName: string): string => {
  const storyName = path.basename(dirName, 'stories.tsx')

  // Get directory path relative to the components folder
  const dirs = path.relative(componentsFolder, dirName).split(path.sep)
  // Get section name (first subfolder of components directory)
  const sectionName = _.startCase(dirs[0])

  return sectionName + '/' + storyName
}
