const path = require('path')

module.exports = {
  components: './src/playroom/components.ts',
  outputPath: './playroom',
  frameComponent: './src/playroom/FrameComponent.tsx',
  snippets: './src/playroom/snippets.ts',
  themes: './src/playroom/themes.ts',

  // Optional:
  title: 'Cubes',
  widths: [320, 375, 768, 1024],
  port: 9000,
  openBrowser: true,
  exampleCode: `
  <Screen>
      <TopBar title="Bar Title" />
      <Screen.Content padding="medium">
        <TextContainer>
          <DisplayText>Title</DisplayText>
          <BodyText>Put content here...</BodyText>
        </TextContainer>
      </Screen.Content>
      <BottomNavigationBar>
        <BottomNavigationBar.Tab icon="dashboard" selected />
        <BottomNavigationBar.Tab icon="account-balance" />
        <BottomNavigationBar.Tab icon="person" />
      </BottomNavigationBar>
    </Screen>
    `,
  baseUrl: '/',
  typeScriptFiles: ['src/**/*.{ts,tsx}', '!src/storybook'],
  webpackConfig: () => ({
    module: {
      rules: [
        {
          test: /\.(woff(2)?|ttf|eot|svg|jpg|png)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
        {
          test: /\.css$/,
          include: [
            path.resolve(__dirname, './node_modules/react-datepicker'),
            path.resolve(__dirname, './src'),
          ],
          use: [require.resolve('style-loader'), require.resolve('css-loader')],
        },
        {
          test: /\.(ts|tsx)$/,
          include: __dirname,
          exclude: /node_modules/,
          use: {
            loader: require.resolve('babel-loader'),
            options: {
              presets: [
                require.resolve('@babel/preset-env'),
                require.resolve('@babel/preset-react'),
                require.resolve('@babel/preset-typescript'),
              ],
              plugins: [require.resolve('@babel/plugin-proposal-class-properties')],
            },
          },
        },
        {
          test: /\.js$/,
          include: __dirname,
          exclude: /node_modules/,
          use: {
            loader: require.resolve('babel-loader'),
            options: {
              presets: [
                require.resolve('@babel/preset-env'),
                require.resolve('@babel/preset-react'),
              ],
              plugins: [require.resolve('@babel/plugin-proposal-class-properties')],
            },
          },
        },
        {
          test: /\.js$/,
          include: [
            path.resolve(__dirname, './node_modules/react-native-vector-icons/'),
            path.resolve(__dirname, './node_modules/@ptomasroos/react-native-multi-slider/'),
          ],
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: false,
              presets: [
                ['module:metro-react-native-babel-preset', { disableImportExportTransform: true }],
              ],
            },
          },
        },
      ],
    },
    resolve: {
      alias: {
        // Replace react-native dependencies with react-native-web
        'react-native$': 'react-native-web',
        // Replace @storybook/react-native with @storybook/react
        '@storybook/react-native': '@storybook/react',
        // Make react-native-svg work
        'react-native-svg': 'react-native-svg/lib/commonjs/ReactNativeSVG.web',
        // Mock react-native-safe-area-context
        'react-native-safe-area-context': path.resolve(
          __dirname,
          './src/storybook/utils/react-native-safe-area-context',
        ),
        // Mock react-native-screens
        'react-native-screens': path.resolve(
          __dirname,
          './src/storybook/utils/react-native-screens',
        ),
        // Mock expo-haptics
        'expo-haptics$': path.resolve(__dirname, './src/storybook/utils/expo-haptics'),
        // Mock @expo/vector-icons with react-native-vector-icons
        '@expo/vector-icons$': path.resolve(__dirname, './src/storybook/utils/expo-vector-icons'),

        // Correctly use `.web.js` files in our own code.
        './DatePickerView/DatePickerView': path.resolve(
          __dirname,
          './src/components/forms/DatePicker/DatePickerView/DatePickerView.web',
        ),
        './TimePickerView/TimePickerView': path.resolve(
          __dirname,
          './src/components/forms/TimePicker/TimePickerView/TimePickerView.web',
        ),
      },
    },
  }),
  iframeSandbox: 'allow-scripts',
}
