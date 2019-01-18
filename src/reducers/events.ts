import Event from '../models/Event'
import { ActionTypes, Action } from '../actions/event'

// Define our State interface for the current reducer
export interface State {
  events: Event[],
  currentEvents: Event[],
  editEvent: Event
}

// Define our initialState
export const initialState: State = {
  events: [
    {
        "startTime": "Jan 16 2019 12:00:17 GMT+0530 (India Standard Time)",
        "endTime": "Jan 16 2019 12:30:17 GMT+0530 (India Standard Time)",
        "title": "Event 1",
        "id": 1
    },
    {
        "startTime": "Jan 16 2019 12:00:17 GMT+0530 (India Standard Time)",
        "endTime": "Jan 16 2019 15:00:17 GMT+0530 (India Standard Time)",
        "title": "Event 2",
        "id": 2
    },
    {
      "startTime": "Jan 17 2019 8:00:17 GMT+0530 (India Standard Time)",
      "endTime": "Jan 17 2019 8:30:17 GMT+0530 (India Standard Time)",
      "title": "Event 3",
      "id": 3
  },
  {
    "startTime": "Jan 18 2019 03:00:17 GMT+0530 (India Standard Time)",
    "endTime": "Jan 18 2019 04:15:17 GMT+0530 (India Standard Time)",
    "title": "Event 1",
    "id": 5
},
{
    "startTime": "Jan 18 2019 06:45:17 GMT+0530 (India Standard Time)",
    "endTime": "Jan 18 2019 07:45:17 GMT+0530 (India Standard Time)",
    "title": "Event 2",
    "id": 6
},
  {
      "startTime": "Jan 17 2019 9:30:17 GMT+0530 (India Standard Time)",
      "endTime": "Jan 17 2019 10:00:17 GMT+0530 (India Standard Time)",
      "title": "Event 4",
      "id": 4
  }
], // We don't have any todos at the start of the app
  currentEvents: [],
  editEvent: {
    id: 0,
    startTime: '',
    endTime: '',
    title:''
  }
}

/* 
 * Reducer takes 2 arguments
 * state: The state of the reducer. By default initialState ( if there was no state provided)
 * action: Action to be handled. Since we are in todos reducer, action type is Action defined in our actions/todos file.
 */
export function reducer(state: State = initialState, action: Action) {
  switch (action.type) {

  
    case ActionTypes.GET_EVENTS_DATE: {
     
      const date = action.payload.date;
      const dataList = JSON.parse(localStorage.getItem('dataList'))
      let filteredList = []
      if(dataList && dataList.events && dataList.events.length > 0){
        filteredList = dataList.events.filter((item: any) => {
          if(new Date(item.startTime).toDateString() == date){
            return true
          }else{
            return false
          }
        })
      }else{
        filteredList = state.events.filter((item: any) => {
          if(new Date(item.startTime).toDateString() == date){
            return true
          }else{
            return false
          }
        })
      }
    
      
      return {
        ...state,
        currentEvents: filteredList // Add todo to todos array
      }
    }
    case ActionTypes.GET_EVENT_BY_ID: {
      /*
       * We have autocompletion here
       * Typescript knows the action is type of AddTodoAction thanks to the ActionTypes enum
       * todo is type of Todo
       */
      const id = action.payload.id;
      
      const filteredList = state.events.filter((item) => {
        if(item.id == id){
          return true
        }else{
          return false
        }
      })
      return {
        ...state,
        editEvent: filteredList[0] // Add todo to todos array
      }
    }
    case ActionTypes.ADD_EVENT: {
    
      const event = action.payload.event;
      localStorage.setItem('dataList', JSON.stringify({ events: [...state.events, event]}))
      return {
        ...state,
        events: [...state.events, event] // Add todo to todos array
      }
    }
    case ActionTypes.EDIT_EVENT: {
     
      const editedEvent = action.payload.event;
      
      const events = state.events.map((event) => {
        if(event.id === editedEvent.id){
          return editedEvent
        }else{
          return event
        }
      })
      localStorage.setItem('dataList', JSON.stringify({ events: [...events]}))
      return {
        ...state,
        events: [...events] // Add todo to todos array
      }
    }
    case ActionTypes.DELETE_EVENT: {

      const id = action.payload.id;
      
      const filteredList = state.events.filter((item) => {
        if(item.id == id){
          return false
        }else{
          return true
        }
      })
      localStorage.setItem('dataList', JSON.stringify({ events: filteredList}))
      const filteredCurrentList = state.currentEvents.filter((item) => {
        if(item.id == id){
          return false
        }else{
          return true
        }
      })
      return {
        ...state,
        events: filteredList, currentEvents:filteredCurrentList // Add todo to todos array
      }
    }

    default:
      return state
  }
}

