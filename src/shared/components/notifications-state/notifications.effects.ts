import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { DataState } from './notifications.reducer';
import {
  DataActionTypes,
  DataLoaded,
  DataLoadError,
  LoadData,
} from './notifications.actions';
import { catchError, map, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataPersistence } from '@nrwl/angular';
import { INotification } from '@common/interfaces';

@Injectable()
export class NotificationsEffects {
  @Effect()
  loadCities$ = this.dataPersistence.fetch(DataActionTypes.LoadData, {
    run: (action: LoadData, state: DataState) => {
      return this.httpClient
        .get<{ data: INotification[] }>(`/api/notifications`)
        .pipe(
          map((res) => new DataLoaded(res.data)),
          catchError((error) => throwError(error))
        );
    },

    onError: (action: LoadData, error) => {
      return new DataLoadError(error);
    },
  });

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private dataPersistence: DataPersistence<DataState>
  ) {}
}
