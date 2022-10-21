import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import {
  initialState as notificationsInitialState,
  notificationsReducer,
} from './notifications.reducer';
import { EffectsModule } from '@ngrx/effects';
import { NotificationsEffects } from './notifications.effects';
import { NotificationsFacade } from './notifications.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('notifications', notificationsReducer, {
      initialState: notificationsInitialState,
    }),
    EffectsModule.forFeature([NotificationsEffects]),
  ],
  providers: [NotificationsFacade],
})
export class NotificationsStateModule {}
