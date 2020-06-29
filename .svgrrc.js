const path = require('path')
const _ = require('lodash')

module.exports = {
  native: true,
  typescript: true,
  svgoConfig: {
    plugins: [
      {
        removeAttrs: { attrs: 'svg:baseProfile' },
        removeViewBox: false,
        removeUnknownsAndDefaults: false,
      },
    ],
  },
  svgProps: { fill: '#000' },
  replaceAttrValues: {
    '#000': '{props.color}',
    '#010101': '{props.color}',
  },
  indexTemplate: function (files) {
    const exportEntries = files.map(file => {
      const basename = path.basename(file, path.extname(file))
      const exportName = `Svg${basename}`
      return `import ${exportName} from './${basename}'`
    })
    exportEntries.push('') // Add empty line

    // Print Icon Names
    exportEntries.push(
      'export const iconMap = {\n' +
        files
          .map(file => {
            const basename = path.basename(file, path.extname(file))
            const exportName = `Svg${basename}`
            const iconName = _.kebabCase(basename)
            return `  '${iconName}': ${exportName},\n`
          })
          .join('') +
        '}',
    )

    exportEntries.push('') // Add empty line
    return exportEntries.join('\n')
  },
  template: function ({ template }, opts, { imports, componentName, props, jsx, exports }) {
    const typeScriptTpl = template.smart({ plugins: ['typescript'] })
    return typeScriptTpl.ast`
        ${imports}
        import { SvgProps } from '../types-for-generated'
        const ${componentName} = (props: SvgProps): React.ReactElement => ${jsx};
        export default ${componentName};
      `
  },
}
