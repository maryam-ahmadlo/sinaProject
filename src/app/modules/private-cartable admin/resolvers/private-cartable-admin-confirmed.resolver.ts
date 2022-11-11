import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { IConfirmed } from 'src/shared/common/src/lib/interfaces/confirmed';
import { PrivateCartableAdminService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class PrivateCartableAdminNotifyResolver implements Resolve<IConfirmed[]> {
  constructor(private privateCartableAdminService:PrivateCartableAdminService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IConfirmed[]> {
    return this.privateCartableAdminService.getConfirmed();
  }
}
