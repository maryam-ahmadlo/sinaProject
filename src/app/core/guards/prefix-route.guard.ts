import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { parseJwt } from 'src/shared/utils/parse-jwt';
import { StateService } from '../services';


@Injectable({
  providedIn: 'root',
})
export class PrefixRouteGuard implements CanActivate {
  constructor(private stateService: StateService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    this.router.navigate([
      (parseJwt().roles.length !== 0 ? '/admin' : '/customer') + '/dashboard',
    ]);
    return true;
  }
}
