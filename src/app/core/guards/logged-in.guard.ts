import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, of, tap } from 'rxjs';
import { StateService } from '../services';


@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanActivate {
  constructor(private stateService: StateService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.stateService
      .select((state) => state.signedIn)
      .pipe(
        tap((loggedIn) => {
          if (!loggedIn) {
            this.router.navigateByUrl('/auth/login');
          }
        })
      );
  }
}
