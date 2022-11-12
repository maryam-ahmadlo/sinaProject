import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {  INotified } from 'src/shared/common/src/lib/interfaces';
import { PrivateCartableAdminService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class PrivateCartableAdminNotifyResolver implements Resolve<INotified[]> {
  constructor(private privateCartableAdminService:PrivateCartableAdminService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<INotified[]> {
    return this.privateCartableAdminService.getNotified();
  }
}
