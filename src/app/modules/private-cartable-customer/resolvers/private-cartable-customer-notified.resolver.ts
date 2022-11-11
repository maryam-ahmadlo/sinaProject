import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { INotified } from 'src/shared/common/src/lib/interfaces';
import { PrivateCartableCustomerService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class PrivateCartableCustomerNotifiedResolver implements Resolve<INotified[]> {
  constructor(private privateCartableCustomerService:PrivateCartableCustomerService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<INotified[]> {
    return this.privateCartableCustomerService.getNotified();
  }
}
