import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { IDraftRule } from 'src/shared/common/src/lib/interfaces';
import { PrivateCartableAdminService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class PrivateCartableAdminDraftResolver implements Resolve<IDraftRule[]> {
  constructor(private PrivateCartableAdminService:PrivateCartableAdminService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDraftRule[]> {
    return this.PrivateCartableAdminService.getDraft();
  }
}
