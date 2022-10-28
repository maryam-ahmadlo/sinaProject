import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { IUser } from 'src/shared/common/src/lib/interfaces';
import { UserManagementService } from '../services/user-management.service';

@Injectable({
  providedIn: 'root'
})
export class UserManagementListResolver implements Resolve<IUser[]> {
  constructor(private userMnagementService: UserManagementService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUser[]> {
    return this.userMnagementService.getUsers();
  }
}
