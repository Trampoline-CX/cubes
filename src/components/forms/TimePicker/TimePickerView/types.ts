export interface TimePickerViewProps {
  /**
   * Currently selected Time. If `null`, no time will be selected.
   */
  value: Date
  /**
   * Callback called when Time value changes.
   */
  onChange: (date: Date) => void
  /**
   * Determines if TimePicker is opened or not.
   */
  open: boolean
  /**
   * View that triggers the TimePicker.
   */
  activator: React.ReactNode
  /**
   * Callback when TimePicker should be closed.
   */
  onRequestClose: () => void
}
