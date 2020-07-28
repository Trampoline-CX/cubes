const proc = require('child_process')
const _ = require('lodash')

console.info('Extracting stories.json...')
proc.execSync('yarn sb extract web-build stories.json') // Run Storybook CLI

const { stories } = require('./web-build/stories.json')
const scenarios = _.values(stories)
  .filter(({ parameters }) => !parameters.docsOnly) // Make sure not to include Documentation only stories
  .map(({ id, kind, story }) => ({
    label: `${kind} - ${story}`,
    url: `http://localhost:9009/iframe.html?id=${id}&viewMode=story`,
    referenceUrl: '',
    readyEvent: '',
    readySelector: '',
    delay: 0,
    hideSelectors: [],
    removeSelectors: [],
    hoverSelector: '',
    clickSelector: '',
    postInteractionWait: 0,
    selectors: ['#root'],
    expect: 0,
    misMatchThreshold: 0.1,
    requireSameDimensions: true,
  }))

console.log('Scenarios', scenarios)

module.exports = {
  id: 'cubes',
  viewports: [
    {
      label: 'tablet',
      width: 1024,
      height: 768,
    },
  ],
  onBeforeScript: 'puppet/onBefore.js',
  onReadyScript: 'puppet/onReady.js',
  scenarios,
  paths: {
    bitmaps_reference: 'backstop_data/bitmaps_reference',
    bitmaps_test: 'backstop_data/bitmaps_test',
    engine_scripts: 'backstop_data/engine_scripts',
    html_report: 'backstop_data/html_report',
    ci_report: 'backstop_data/ci_report',
  },
  report: ['browser'],
  engine: 'puppeteer',
  engineOptions: {
    args: ['--no-sandbox'],
  },
  asyncCaptureLimit: 5,
  asyncCompareLimit: 50,
  debug: false,
  debugWindow: false,
}
