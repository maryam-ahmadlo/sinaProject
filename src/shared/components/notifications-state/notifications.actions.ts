import { Action } from '@ngrx/store';
import { INotification } from 'src/shared/common/src/lib/interfaces';


export enum DataActionTypes {
  LoadData = '[Notification] Load Data',
  SelectData = '[Notification] Select Data',
  DataLoaded = '[Notification] Data Loaded',
  DataLoadError = '[Notification] Data Load Error',
}

export class SelectData implements Action {
  readonly type = DataActionTypes.SelectData;
  constructor(public payload: string) {}
}

export class LoadData implements Action {
  readonly type = DataActionTypes.LoadData;
}

export class DataLoadError implements Action {
  readonly type = DataActionTypes.DataLoadError;
  constructor(public payload: any) {}
}

export class DataLoaded implements Action {
  readonly type = DataActionTypes.DataLoaded;
  constructor(public payload: INotification[]) {}
}

export type DataAction = LoadData | DataLoaded | DataLoadError | SelectData;
