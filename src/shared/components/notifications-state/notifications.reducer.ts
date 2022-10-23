import { INotification } from 'src/shared/common/src/lib/interfaces';
import { DataAction, DataActionTypes } from './notifications.actions';


/**
 * Interface for the 'Cities' data used in
 *  - CitiesState, and
 *  - taxCategoriesReducer
 *
 *  Note: replace if already defined in another module
 */

export interface DataState {
  list: INotification[]; // list of Cities; analogous to a sql normalized table
  selectedId?: string | number; // which Cities record has been selected
  loaded: boolean; // has the Cities list been loaded
  error?: any; // last none error (if any)
}

export const initialState: DataState = {
  list: [],
  loaded: false,
};

export function notificationsReducer(
  state: DataState = initialState,
  action: DataAction
): DataState {
  switch (action.type) {
    case DataActionTypes.DataLoaded: {
      state = {
        ...state,
        list: action.payload,
        loaded: true,
      };
      break;
    }
    case DataActionTypes.SelectData: {
      state = {
        ...state,
        selectedId: action.payload,
      };
      break;
    }
  }
  return state;
}
