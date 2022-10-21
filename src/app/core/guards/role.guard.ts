import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { StateService } from '../services';
import { of } from 'rxjs';
import { parseJwt } from 'src/shared/utils/parse-jwt';


@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private stateService: StateService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const allowedRoles: string[] = route.data['allowedRoles'] || [];
    if (
      parseJwt().roles.length !== 0 &&
      allowedRoles.some((ar) => ar === '*')
    ) {
      return true;
    } else {
      for (let role of allowedRoles) {
        if (parseJwt().roles.indexOf(role) > -1) {
          return true;
        }
      }
    }

    this.router.navigateByUrl('/forbidden');
    return of();
  }
}
