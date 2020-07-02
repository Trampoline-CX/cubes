import React, {
  useMemo,
  useState,
  useCallback,
  useEffect,
  useRef,
  useImperativeHandle,
} from 'react'
import { TextInput, View, TextInputProps, TouchableWithoutFeedback, Platform } from 'react-native'
import { BodyText } from '../../text/BodyText/BodyText'
import { TextStyle } from '../../text/TextStyle/TextStyle'
import { InlineError } from '../InlineError/InlineError'
import { useStyles, useTheme } from '../../../theme'
import { useTextStyles } from '../../text/use-text-styles'
import { Heading } from '../../text/Heading/Heading'
import { IconButton } from '../../actions/IconButton/IconButton'
import { Box } from '../../structure/Box/Box'
import { Caption } from '../../text/Caption/Caption'
import { TestProps } from '../../../utils/TestProps'
import { IconAction } from '../../actions/actions'

export interface TextFieldProps extends TestProps {
  /**
   * Label to display above the input.
   */
  label: string
  /**
   * Text value in the input.
   */
  value: string
  /**
   * Type of the TextField.
   *
   * Will define a logical `autoCapitalize` value if not set.
   *
   * Also defines the type of keyboard displayed and the value for autocomplete/autofill properties.
   */
  type?: 'text' | 'email' | 'password' | 'new-password' | 'first-name' | 'last-name' | 'integer'
  /**
   * Placeholder text when input is empty.
   */
  placeholder?: string
  /**
   * Help text shown to help the user with usage of this input.
   */
  helpText?: string
  /**
   * Set to `true` to disable.
   */
  disabled?: boolean
  /**
   * Error text to display _(shown in a `InlineError` component)_.
   *
   * User can also pass `true` boolean value to display the `InlineError` without any message.
   */
  error?: string | boolean
  /**
   * Type of the return key for the software keyboard.
   */
  returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send'
  /**
   * Set to `true` to focus the field and to `false` to blur it.
   *
   * To initially focus this field when arriving on this screen, simply use
   *
   * ```tsx
   * <TextField focused />
   * ```
   */
  focused?: boolean
  /**
   * Set this to `true` to hide the label on top of the input. `label` property is still mandatory for accessibility purposes, even if not shown.
   */
  hideLabel?: boolean
  /**
   * If set, display an icon at the end of the input to handle a certain action on click.
   */
  endAction?: IconAction
  /**
   * Set to `true` to select all text when focused.
   */
  selectTextOnFocus?: boolean
  /**
   * Automatically handled by `type` property. Use this to override or when using `type="text"`.
   *
   * @see https://reactnative.dev/docs/textinput#autocapitalize
   */
  autoCapitalize?: TextInputProps['autoCapitalize']
  /**
   * Called when the input value changes. `value` property should be changed to reflect this new value.
   */
  onChange: (value: string) => void
  /**
   * Called when focused.
   */
  onFocus?: () => void
  /**
   * Called when blurred.
   */
  onBlur?: () => void
  /**
   * Called when the keyboard submit to this field.
   */
  onSubmit?: () => void
  /**
   * Display a prefix label on the input.
   */
  prefix?: string
  /**
   * Called when a key is pressed.
   */
  onKeyPress?: TextInputProps['onKeyPress']
}

/**
 * Input field that users can type into.
 */
export const TextField = React.forwardRef<TextInput, TextFieldProps>(
  (
    {
      label,
      value,
      onChange,
      type = 'text',
      placeholder,
      helpText,
      disabled,
      error,
      returnKeyType = 'next',
      focused = false,
      onSubmit,
      hideLabel = false,
      selectTextOnFocus = false,
      endAction: endActionRaw,
      autoCapitalize,
      prefix,
      onKeyPress,
      onFocus: onFocusProp,
      onBlur: onBlurProp,
      testID,
      accessibilityLabel = label,
    },
    ref,
  ) => {
    const currentTheme = useTheme()
    const { textStyles } = useTextStyles()
    const styles = useStyles(theme => ({
      // Base Styles
      labelContainer: {
        marginBottom: theme.spacing.small,
      },
      inputContainer: {
        flexDirection: 'row',
        backgroundColor: theme.colors.fill.background.lighter,
        borderColor: theme.colors.fill.primary.default,
        borderWidth: theme.border.small,
        borderRadius: theme.radius.medium,
      },
      input: {
        flex: 1,
        paddingHorizontal: theme.spacing.medium,
        paddingVertical: theme.spacing.small - theme.border.small,
        height: 40, // Need to enforce height for iOS.
        textAlignVertical: 'center',
      },
      inputIos: {
        lineHeight: undefined, // To prevent issue on iOS, making the input cropped
        paddingTop: 8, // Compensate center alignment a bit on iOS
      },

      // Focused Styles
      containerFocused: {
        borderColor: theme.colors.fill.primary.default,
      },

      // Disabled Styles
      containerDisabled: {
        opacity: theme.opacity.disabled,
      },

      // Prefix
      prefix: {
        alignSelf: 'center',
        paddingLeft: theme.spacing.medium,
      },

      // End Action
      inputWithEndAction: {
        paddingRight: theme.size.minTouchArea,
      },
      endActionContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        height: '100%',
        justifyContent: 'center',
      },
    }))

    // Register the form field in the Form
    const inputRef = useRef<TextInput>(null)
    useImperativeHandle(ref, () => inputRef.current as TextInput)

    const [hasFocus, setHasFocus] = useState(focused)
    const onFocus = useCallback(() => {
      onFocusProp?.()
      setHasFocus(true)
    }, [onFocusProp])
    const onBlur = useCallback(() => {
      onBlurProp?.()
      setHasFocus(false)
    }, [onBlurProp])
    const onLabelClick = useCallback(() => {
      const input = inputRef.current

      if (input) {
        input.focus()
      }
    }, [])
    const [secureTextEntry, endAction = endActionRaw] = useSecureTextEntry(type)

    // Handle focus changes
    useEffect(() => {
      const input = inputRef.current

      if (!input) {
        return
      }

      if (focused) {
        input.focus()
      } else {
        input.blur()
      }
    }, [focused])

    const inputType = useMemo<
      Pick<TextInputProps, 'keyboardType' | 'textContentType' | 'autoCapitalize'>
    >(() => {
      switch (type) {
        case 'text':
          return { textContentType: 'none', autoCapitalize }
        case 'email':
          return {
            keyboardType: 'email-address',
            textContentType: 'emailAddress',
            autoCompleteType: 'email',
            autoCapitalize: 'none',
          }
        case 'password':
          return {
            textContentType: 'password',
            autoCompleteType: 'password',
            autoCapitalize: 'none',
          }
        case 'new-password':
          return {
            textContentType: 'newPassword',
            autoCompleteType: 'password',
            autoCapitalize: 'none',
          }
        case 'first-name':
          return { textContentType: 'name', autoCapitalize: 'words' }
        case 'last-name':
          return { textContentType: 'familyName', autoCapitalize: 'words' }
        case 'integer':
          return { textContentType: 'none', keyboardType: 'number-pad' }
      }
    }, [type])

    return (
      <View>
        {hideLabel ? null : (
          <TouchableWithoutFeedback onPress={onLabelClick}>
            <View style={styles.labelContainer}>
              <Heading>{label}</Heading>
            </View>
          </TouchableWithoutFeedback>
        )}
        <View>
          <View
            style={[
              styles.inputContainer,
              hasFocus && styles.containerFocused,
              disabled && styles.containerDisabled,
            ]}
          >
            {prefix ? (
              <View style={styles.prefix}>
                <BodyText variation="subdued">{prefix}</BodyText>
              </View>
            ) : null}
            <TextInput
              ref={inputRef}
              {...inputType}
              style={[
                textStyles.body,
                styles.input,
                Platform.OS === 'ios' && styles.inputIos,
                endAction ? styles.inputWithEndAction : null,
              ]}
              placeholder={placeholder}
              editable={!disabled}
              value={value}
              onChangeText={onChange}
              returnKeyType={returnKeyType}
              blurOnSubmit={returnKeyType !== 'next'} // Prevent keyboard flicker when going from one field to another
              underlineColorAndroid={currentTheme.colors.transparent}
              placeholderTextColor={currentTheme.colors.text.subdued}
              onFocus={onFocus}
              onBlur={onBlur}
              onSubmitEditing={onSubmit}
              selectTextOnFocus={selectTextOnFocus}
              secureTextEntry={secureTextEntry}
              onKeyPress={onKeyPress}
              testID={testID}
              accessibilityLabel={accessibilityLabel}
            />
          </View>
          {endAction ? (
            <View style={styles.endActionContainer}>
              <IconButton
                icon={endAction.icon}
                onClick={endAction.action}
                size="small"
                color={endAction.color}
              />
            </View>
          ) : null}
        </View>
        {error && (
          <Box paddingTop="xSmall">
            <InlineError message={typeof error === 'string' ? error : ''} />
          </Box>
        )}
        {helpText && (
          <Box paddingTop="xSmall">
            <Caption>
              <TextStyle variation="subdued">{helpText}</TextStyle>
            </Caption>
          </Box>
        )}
      </View>
    )
  },
)

/**
 * Hook returning the correct `secureTextEntry` prop according to text type and also optionnally
 * provides an end action to toggle the visibility of the field.
 */
const useSecureTextEntry = (
  type: TextFieldProps['type'],
): [boolean, TextFieldProps['endAction']] => {
  const shouldUseSecureTextEntry = type === 'password' || type === 'new-password'
  const [secureTextEntry, setSecureTextEntry] = useState(shouldUseSecureTextEntry)
  const onEndActionClick = useMemo<TextFieldProps['endAction']>(
    () =>
      type === 'new-password'
        ? {
            icon: secureTextEntry ? 'visibility' : 'visibility-off',
            action: (): void => setSecureTextEntry(prev => !prev),
          }
        : undefined,
    [type, secureTextEntry],
  )

  useEffect(() => setSecureTextEntry(shouldUseSecureTextEntry), [shouldUseSecureTextEntry])

  return [secureTextEntry, onEndActionClick]
}
