import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { PrivateCartableCustomerService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class PrivateCartableCustomerDraftResolver implements Resolve<boolean> {
  constructor(private privateCartableCustomerService:PrivateCartableCustomerService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.privateCartableCustomerService.getDraft();
  }
}
