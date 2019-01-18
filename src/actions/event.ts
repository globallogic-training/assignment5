import Event from '../models/Event'

/*
 * We're defining every action name constant here
 * We're using Typescript's enum
 * Typescript understands enum better 
 */
export enum ActionTypes {
  GET_EVENTS_DATE = 'get_events_of_specific_date',
  ADD_EVENT = 'add_event',
  EDIT_EVENT = 'edit_event',
  DELETE_EVENT = 'delete_event',
  GET_EVENT_BY_ID = 'get_event_by _id'
}

/*
 * Define return types of our actions 
 * Every action returns a type and a payload
 */

export interface GetEventsOnDate { type: ActionTypes.GET_EVENTS_DATE, payload: { date: string }}
export interface AddEvent { type: ActionTypes.ADD_EVENT, payload: { event: Event} }
export interface GetEventById { type: ActionTypes.GET_EVENT_BY_ID, payload: { id: number}}
export interface EditEvent { type: ActionTypes.EDIT_EVENT, payload: { event: Event}}
export interface DeleteEvent { type: ActionTypes.DELETE_EVENT, payload: { id: number}}
/*
 * Define our actions creators
 * We are returning the right Action for each function
 */
export function getEventsOnDate(date: string): GetEventsOnDate {
  return {
    type: ActionTypes.GET_EVENTS_DATE,
    payload: {
      date
    }
  }
}

export function addEvents( event: Event ): AddEvent{
  return {
    type: ActionTypes.ADD_EVENT,
    payload: {
      event
    }
  }
}
export function editEvent( event: Event ): EditEvent{
  return {
    type: ActionTypes.EDIT_EVENT,
    payload: {
      event
    }
  }
}
export function getEventById( id: number ): GetEventById{
  return {
    type: ActionTypes.GET_EVENT_BY_ID,
    payload: {
      id
    }
  }
}
export function deleteEvent( id: number ): DeleteEvent{
  return {
    type: ActionTypes.DELETE_EVENT,
    payload: {
      id
    }
  }
}

/*
 * Define the Action type
 * It can be one of the types defining in our action/todos file
 * It will be useful to tell typescript about our types in our reducer
 */
export type Action =  GetEventsOnDate | AddEvent | GetEventById | EditEvent | DeleteEvent