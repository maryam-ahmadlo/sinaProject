import { INotification } from '@common/interfaces';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DataState } from './notifications.reducer';

const getDataState = createFeatureSelector<DataState>('notifications');

const getLoaded = createSelector(
  getDataState,
  (state: DataState) => state.loaded
);
const getError = createSelector(
  getDataState,
  (state: DataState) => state.error
);
const getSelectedId = createSelector(
  getDataState,
  (state: DataState) => state.selectedId
);

const getAllData = createSelector(
  getDataState,
  getLoaded,
  (state: DataState, isLoaded) => {
    return isLoaded ? state.list : [];
  }
);
const getSelectedData = createSelector(
  getAllData,
  getSelectedId,
  (data, id) => {
    const result = data.find((it) => it['id'] === id);
    return result ? Object.assign({}, result) : undefined;
  }
);

export const dataQuery = {
  getLoaded,
  getError,
  getAllData,
  getSelectedData,
};
