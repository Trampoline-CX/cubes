import { useState, useCallback } from 'react'

export type StateCallback<State> = (newState: State) => void

/**
 * Let us have an "Uncontrolled state" for a React Component.
 * This means that component can optionally receive a "callback" prop
 * which should update the main component state. If this "callback" prop
 * is not passed, component should itself handle its main state update.
 *
 * @see https://reactjs.org/docs/uncontrolled-components.html
 *
 * @param stateProp The state property passed by the component's user.
 * @param callback Callback passed by the component's user to update the component.
 *
 * @returns The state (controlled or uncontrolled) and the callback function used
 * to update the component (as provided by the component's user).
 */
export const useUncontrolledState = <State>(
  stateProp: State,
  callback: undefined | StateCallback<State>,
): [State, StateCallback<State>] => {
  const [state, setState] = useState(stateProp)
  const setStateWrapper = useCallback<StateCallback<State>>(
    newState => {
      setState(newState)
      callback?.(newState)
    },
    [callback, setState],
  )

  return [
    // If we have a controlled component, take user's stateProp as is.
    // Otherwise, use the uncontrolled one.
    callback ? stateProp : state,
    setStateWrapper,
  ]
}
