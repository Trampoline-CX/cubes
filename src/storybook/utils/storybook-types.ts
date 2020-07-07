/**
 * @see https://github.com/storybookjs/storybook/tree/next/addons/controls#control-annotations
 */
export type ControlType =
  | 'array'
  | 'boolean'
  | 'number'
  | 'range'
  | 'object'
  | 'radio'
  | 'inline-radio'
  | 'check'
  | 'inline-check'
  | 'select'
  | 'multi-select'
  | 'text'
  | 'color'
  | 'date'

export type StoryFn<Props> = React.FC<Props> & {
  args?: Partial<Props>
  argTypes?: Partial<Record<Extract<keyof Props, string>, { control: ControlType | null }>>
}
