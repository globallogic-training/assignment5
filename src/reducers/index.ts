import { combineReducers } from 'redux'
import * as fromEvents from './events'
import * as fromCurrentDate from './currentDate'

/*
 * This is the root state of the app
 * It contains every substate of the app
 */
export interface State {
  data: fromEvents.State,
  date: fromCurrentDate.State
}

/*
 * initialState of the app
 */
export const initialState: State = {
  data: fromEvents.initialState,
  date: fromCurrentDate.initialState
}

/*
 * Root reducer of the app
 * Returned reducer will be of type Reducer<State>
 */
// export const reducer = combineReducers<State>({
//   todos: fromTodos.reducer
// })
export const reducer = combineReducers<State>({
  data: fromEvents.reducer,
  date: fromCurrentDate.reducer
})