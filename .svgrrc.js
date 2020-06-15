const path = require('path')

module.exports = {
  native: true,
  typescript: true,
  svgoConfig: {
    plugins: [{ removeViewBox: false }],
  },
  replaceAttrValues: {
    '#000': '{props.color}',
  },
  indexTemplate: function (files) {
    const exportEntries = files.map(file => {
      const basename = path.basename(file, path.extname(file))
      const exportName = `Svg${basename}`
      return `export { default as ${exportName} } from './${basename}'`
    })
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
