import Icon from 'react-native-vector-icons/MaterialIcons'

export const MaterialIcons = Icon

// REQUIRED CODE TO HAVE react-native-vector-icons working in Storybook
// Generate required css
import iconFont from 'react-native-vector-icons/Fonts/MaterialIcons.ttf'

const iconFontStyles = `@font-face {
  src: url(${iconFont});
  font-family: MaterialIcons;
}`

// Create stylesheet
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const style = document.createElement('style') as any
style.type = 'text/css'
if (style.styleSheet) {
  style.styleSheet.cssText = iconFontStyles
} else {
  style.appendChild(document.createTextNode(iconFontStyles))
}

// Inject stylesheet
document.head.appendChild(style)
