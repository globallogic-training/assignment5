export enum ActionTypes {
  GET_CURRENT_DATE = 'get_current_date',
  EDIT_CURRENT_DATE = 'edit_current_date'
}

export interface GetCurrentDate { type: ActionTypes.GET_CURRENT_DATE, payload: { }}
export interface EditCurrentDate { type: ActionTypes.EDIT_CURRENT_DATE, payload: { date: string} }
/*
 * Define our actions creators
 * We are returning the right Action for each function
 */
export function getCurrentDate(): GetCurrentDate {
  return {
    type: ActionTypes.GET_CURRENT_DATE,
    payload: {
    }
  }
}

export function editCurrentDate( date: string ): EditCurrentDate{
  return {
    type: ActionTypes.EDIT_CURRENT_DATE,
    payload: {
      date
    }
  }
}  

export type Action =  EditCurrentDate | GetCurrentDate