import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { DataState } from './notifications.reducer';
import { dataQuery } from './notifications.selectors';
import { LoadData, SelectData } from './notifications.actions';

@Injectable()
export class NotificationsFacade {
  loaded$ = this.store.select(dataQuery.getLoaded);
  allData$ = this.store.select(dataQuery.getAllData);
  selectedData$ = this.store.select(dataQuery.getSelectedData);

  constructor(private store: Store<DataState>) {}

  loadAll() {
    this.store.dispatch(new LoadData());
  }

  loadOne(id: string) {
    this.store.dispatch(new SelectData(id));
  }
}
