import React, { useCallback, DependencyList, useEffect, useRef } from 'react'
import { TextInput, View, Keyboard, Platform } from 'react-native'
import { useStyles, useTheme } from '../../../theme'
import { Box } from '../../structure/Box/Box'
import { IconButton } from '../../actions/IconButton/IconButton'
import { useTextStyles } from '../../text/use-text-styles'
import { Pill } from '../../actions/Pill/Pill'

/**
 * Pill options.
 */
export interface SearchFieldPill {
  /**
   * Text to display on the Pill.
   */
  label: string
  /**
   * Action triggered when dismissing the Pill.
   */
  onDismiss: () => void
}

export interface SearchFieldProps {
  /**
   * Text value.
   */
  value: string
  /**
   * Placeholder to display when `value` is empty.
   */
  placeholder: string
  /**
   * Triggered when `value` is changed. Should update `value` accordingly.
   */
  onChange: (value: string) => void
  /**
   * Called when search is submitted via the keyboard submit button.
   */
  onSubmit?: () => void
  /**
   * Called when focused.
   */
  onFocus?: () => void
  /**
   * Called when blurred.
   */
  onBlur?: () => void
  /**
   * Pills to display.
   */
  pills?: SearchFieldPill[]
}

const useOnKeyboardHide = (callback: () => void, deps: DependencyList): void => {
  useEffect(() => {
    const sub = Keyboard.addListener('keyboardDidHide', callback)
    return (): void => sub.remove()
  }, deps)
}

/**
 * Component used to enter a search query.
 */
export const SearchField: React.FC<SearchFieldProps> = ({
  value,
  onChange,
  placeholder,
  onSubmit,
  onFocus,
  onBlur,
  pills = [],
}) => {
  const inputRef = useRef<TextInput>(null)
  const hasFocus = inputRef.current?.isFocused()

  const currentTheme = useTheme()
  const { textStyles } = useTextStyles()
  const styles = useStyles(theme => ({
    container: {
      flexDirection: 'row',
      alignItems: 'center',

      borderRadius: theme.radius.medium,
      backgroundColor: theme.colors.fill.background.darker,
    },
    pillsContainer: {
      flex: 1,
      flexDirection: 'row',
    },
    input: {
      flex: 1,
      paddingVertical: 12,
      height: 48, // Need to enforce height for iOS
      textAlignVertical: 'center',
    },
    inputIos: {
      lineHeight: undefined, // To prevent issue on iOS, making the input cropped
      paddingTop: 14, // Compensate center alignment a bit on iOS
    },
  }))

  const removeFocus = useCallback(() => inputRef.current?.blur(), [inputRef.current])
  const clearSearch = useCallback(() => {
    for (const pill of pills) {
      pill.onDismiss()
    }
    onChange('')
  }, [onChange, pills])
  const goBack = useCallback(() => {
    clearSearch()
    removeFocus()
  }, [clearSearch, removeFocus])
  const focusSearch = useCallback(() => inputRef.current?.focus(), [inputRef.current])

  const showBackAction = hasFocus || value.length > 0

  // Blur search field when keyboard is dismissed
  useOnKeyboardHide(() => removeFocus(), [removeFocus])

  const hasPills = pills.length > 0

  useEffect(() => {
    if (hasPills) {
      onBlur?.()
    }
  }, [hasPills])

  return (
    <View style={styles.container}>
      <Box paddingX="xSmall">
        <IconButton
          icon={showBackAction ? 'arrow-back' : 'search'}
          onClick={showBackAction ? goBack : focusSearch}
        />
      </Box>

      {hasPills ? (
        <View style={styles.pillsContainer}>
          {pills.map((item, index) => (
            <Box key={index} paddingRight="xSmall">
              <Pill onClick={item.onDismiss} highlight>
                {item.label}
              </Pill>
            </Box>
          ))}
        </View>
      ) : (
        <TextInput
          ref={inputRef}
          style={[textStyles.body, styles.input, Platform.OS === 'ios' && styles.inputIos]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          returnKeyType="search"
          underlineColorAndroid={currentTheme.colors.transparent}
          placeholderTextColor={currentTheme.colors.text.subdued}
          onSubmitEditing={onSubmit}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      )}

      {(value.length > 0 || pills.length > 0) && (
        <Box paddingX="xSmall">
          <IconButton icon="clear" onClick={clearSearch} />
        </Box>
      )}
    </View>
  )
}
