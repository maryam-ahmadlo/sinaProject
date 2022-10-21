import { APP_INITIALIZER, enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app/app-routes';
import { MatNativeDateModule } from '@angular/material/core';
import {
  MAT_FORM_FIELD,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
} from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { fa_IR, NZ_I18N } from 'ng-zorro-antd/i18n';
import { StateService } from './app/core/services';
import { AppInitService } from './app/app-init.service';


if (environment.production) {
  enableProdMode();
}
export function initializeApp(
  appInitService: AppInitService,
  stateService: StateService
) {
  return async (): Promise<any> => {
    try {
      const data = (await appInitService.Init()) as any;
      stateService.setState(
        'signedIn',
        data.user.data.is_otp_verified || false
      );
      stateService.setState('me', data.user);
    } catch {
      stateService.setState('signedIn', false);
      stateService.setState('me', null);
      localStorage.removeItem('token');
    }
  };
}
bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      RouterModule.forRoot(appRoutes),
      MatNativeDateModule,
      HttpClientModule
    ),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'fill',
      } as MatFormFieldDefaultOptions,
    },
    { provide: NZ_I18N, useValue: fa_IR },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppInitService, StateService],
      multi: true,
    },
  ],
}).catch((err) => console.error(err));
