import { combineReducers } from 'redux'
import * as fromEvents from './events'

/*
 * This is the root state of the app
 * It contains every substate of the app
 */
export interface State {
  data: fromEvents.State
}

/*
 * initialState of the app
 */
export const initialState: State = {
  data: fromEvents.initialState
}

/*
 * Root reducer of the app
 * Returned reducer will be of type Reducer<State>
 */
// export const reducer = combineReducers<State>({
//   todos: fromTodos.reducer
// })
export const reducer = combineReducers<State>({
  data: fromEvents.reducer
})