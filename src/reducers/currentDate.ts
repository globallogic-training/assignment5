import { ActionTypes, Action } from '../actions/currentDate'

// Define our State interface for the current reducer
export interface State {
  currentDate: string
}

// Define our initialState
export const initialState: State = {
  currentDate: ''
}

/* 
 * Reducer takes 2 arguments
 * state: The state of the reducer. By default initialState ( if there was no state provided)
 * action: Action to be handled. Since we are in todos reducer, action type is Action defined in our actions/todos file.
 */
export function reducer(state: State = initialState, action: Action) {
  switch (action.type) {

    case ActionTypes.GET_CURRENT_DATE: {
      if(state.currentDate && state.currentDate !== '')
        return {
          ...state // Add todo to todos array
        }
      else
        return {
          ...state, currentDate: new Date().toDateString() // Add todo to todos array
        }
    }
    case ActionTypes.EDIT_CURRENT_DATE: {
      
      return {
        ...state,
        currentDate: action.payload.date // Add todo to todos array
      }
    }

    default:
      return state
  }
}

