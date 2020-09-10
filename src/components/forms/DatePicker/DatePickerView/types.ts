export interface DatePickerViewProps {
  /**
   * Currently selected Date. If `null`, no date will be selected.
   */
  value: Date
  /**
   * Callback called when Date value change.
   */
  onChange: (date: Date) => void
  /**
   * Determines if DatePicker is opened or not.
   */
  open: boolean
  /**
   * View that triggers the DatePicker.
   */
  activator: React.ReactNode
  /**
   * Callback when Datepicker should be closed.
   */
  onRequestClose: () => void
  /**
   * Minimum selectable date.
   */
  minDate?: Date
  /**
   * Maximum selectable date.
   */
  maxDate?: Date
}
