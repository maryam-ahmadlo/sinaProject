import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { LoggedInGuard, PrefixRouteGuard, RoleGuard } from './guards';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PrivateCartableComponent } from './pages/private-cartable/private-cartable.component';
import { AddDocumentComponent } from './components/add-document/add-document.component';
import { AddDocumentModalComponent } from './components/add-document-modal/add-document-modal.component';



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    NzMessageModule,
    FlexLayoutModule,
  ],
  declarations: [
    PrivateCartableComponent,
    AddDocumentComponent,
    AddDocumentModalComponent
  ],
 
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(
        `${parentModule} has already been loaded. Import Core module in the AppModule only.`
      );
    }
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [LoggedInGuard, PrefixRouteGuard, RoleGuard],
    };
  }
}
