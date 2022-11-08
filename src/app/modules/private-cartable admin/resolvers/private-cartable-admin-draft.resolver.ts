import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { PrivateCartableAdminService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class PrivateCartableAdminDraftResolver implements Resolve<any> {
  constructor(private PrivateCartableAdminService:PrivateCartableAdminService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.PrivateCartableAdminService.getDraft();
  }
}
