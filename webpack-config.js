/**
 * Custom Webpack config based on Expo one to use for Expo Webpack config.
 * Supply custom Webpack config for some plugins used by the Cubes library.
 *
 * This config is supplied as JS as webpack config doesn't like Typescript.
 */
const createExpoWebpackConfigAsync = require('@expo/webpack-config')

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: [
          // Ensure Slider package is transpiled correctly for Expo
          '@ptomasroos/react-native-multi-slider',
        ],
      },
    },
    argv,
  )
  return config
}
