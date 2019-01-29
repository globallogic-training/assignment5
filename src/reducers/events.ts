import Event from '../models/Event';
import { ActionTypes, Action } from '../actions/event';

// Define our State interface for the current reducer
export interface State {
	events: Event[];
	currentEvents: Event[];
	editEvent: Event;
}

// Define our initialState
export const initialState: State = {
	events: [], // We don't have any todos at the start of the app
	currentEvents: [],
	editEvent: {
		id: 0,
		startTime: '',
		endTime: '',
		title: ''
	}
};

/* 
 * Reducer takes 2 arguments
 * state: The state of the reducer. By default initialState ( if there was no state provided)
 * action: Action to be handled. Since we are in todos reducer, action type is Action defined in our actions/todos file.
 */
export function reducer(state: State = initialState, action: Action) {
	switch (action.type) {
		case ActionTypes.GET_EVENTS_DATE: {
			const date = action.payload.date;
			const dataList = localStorage.getItem('dataList');
			let filteredList = [];
			if (dataList) {
				const tempDataList = JSON.parse(localStorage.getItem('dataList'));
				if (tempDataList.events && tempDataList.events.length > 0)
					filteredList = tempDataList.events.filter((item: any) => {
						if (new Date(item.startTime).toDateString() == date) {
							return true;
						} else {
							return false;
						}
					});
			}

			return {
				...state,
				currentEvents: filteredList // Add todo to todos array
			};
		}
		case ActionTypes.GET_EVENT_BY_ID: {
			/*
       * We have autocompletion here
       * Typescript knows the action is type of AddTodoAction thanks to the ActionTypes enum
       * todo is type of Todo
       */
			const id = action.payload.id;
			const dataList = localStorage.getItem('dataList');
			let filteredList = [];
			if (dataList) {
				const tempDataList = JSON.parse(localStorage.getItem('dataList'));
				if (tempDataList.events && tempDataList.events.length > 0) {
					filteredList = tempDataList.events.filter((item: any) => {
						if (item.id == id) {
							return true;
						} else {
							return false;
						}
					});
				}
			}
			return {
				...state,
				editEvent: filteredList[0] // Add todo to todos array
			};
		}
		case ActionTypes.ADD_EVENT: {
			const event = action.payload.event;
			const dataList = localStorage.getItem('dataList');
			if (dataList) {
				const tempDataList = JSON.parse(localStorage.getItem('dataList'));
				localStorage.setItem('dataList', JSON.stringify({ events: [ ...tempDataList.events, event ] }));
			}else{
        localStorage.setItem('dataList', JSON.stringify({ events: [ event ] }));
      }

			return {
				...state // Add todo to todos array
			};
		}
		case ActionTypes.EDIT_EVENT: {
			const editedEvent = action.payload.event;

			const dataList = localStorage.getItem('dataList');
			let events = [];
			if (dataList) {
				const tempDataList = JSON.parse(localStorage.getItem('dataList'));
				if (tempDataList.events && tempDataList.events.length > 0) {
					events = tempDataList.events.map((event: any) => {
						if (event.id === editedEvent.id) {
							return editedEvent;
						} else {
							return event;
						}
					});
				}
			}
			localStorage.setItem('dataList', JSON.stringify({ events: [ ...events ] }));
			return {
				...state // Add todo to todos array
			};
		}
		case ActionTypes.DELETE_EVENT: {
			const id = action.payload.id;

			const dataList = localStorage.getItem('dataList');
			let filteredList = [];
			if (dataList) {
				const tempDataList = JSON.parse(localStorage.getItem('dataList'));
				if (tempDataList.events && tempDataList.events.length > 0) {
					filteredList = tempDataList.events.filter((item: any) => {
						if (item.id == id) {
							return false;
						} else {
							return true;
						}
					});
				}
			}

			localStorage.setItem('dataList', JSON.stringify({ events: filteredList }));
			const filteredCurrentList = state.currentEvents.filter((item) => {
				if (item.id == id) {
					return false;
				} else {
					return true;
				}
			});
			return {
				...state,
				currentEvents: filteredCurrentList // Add todo to todos array
			};
		}

		default:
			return state;
	}
}