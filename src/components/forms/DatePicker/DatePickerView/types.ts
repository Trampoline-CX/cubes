export interface DatePickerViewProps {
  /**
   * Currently selected Date. If `null`, no date will be selected.
   */
  value: Date
  /**
   * Callback called when Date value change.
   */
  onChange: (date: Date) => void
}
