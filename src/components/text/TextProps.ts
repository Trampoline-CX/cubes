import { TestProps } from '../../utils/TestProps'
import { TextStyleProps } from './TextStyle/TextStyle'

export interface TextProps extends TestProps {
  /**
   * Text or children text components, like `TextStyle`.
   */
  children: React.ReactNode
  /**
   * Set a maximum number of lines. If text doesn't fit on these lines, the end of the text is ellipsized.
   */
  maxLines?: number
  /**
   * Variation of the text.
   */
  variation?: TextStyleProps['variation']
  /**
   * Alignment of the text.
   */
  textAlign?: 'left' | 'right' | 'center'
}
