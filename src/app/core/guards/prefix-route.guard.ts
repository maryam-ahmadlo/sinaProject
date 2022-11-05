import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
// import { parseJwt } from 'src/shared/utils/parse-jwt';
import { StateService } from "../services";

@Injectable({
  providedIn: "root",
})
export class PrefixRouteGuard implements CanActivate {
  constructor(private stateService: StateService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let Roles: any = [];
    this.stateService
      .select((state) => state.me)
      .subscribe((r) => {
        Roles = r;
      });
    this.router.navigate([
      (Roles.roles.some((m) => m.id === "ROLE_ADMIN")
        ? "/admin"
        : "/customer") + "/dashboard",
    ]);
    return true;
  }
}
