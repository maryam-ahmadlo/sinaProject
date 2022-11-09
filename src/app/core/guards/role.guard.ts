import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { StateService } from "../services";
import { of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RoleGuard implements CanActivate {
  constructor(private stateService: StateService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    
    const allowedRoles: string[] = ["ROLE_ADMIN", "ROLE_USER"];
    if (allowedRoles.some((ar) => ar === "ROLE_ADMIN")) {
      return true;
    } else {
      for (let role of allowedRoles) {
        return true;
      }
    }

    this.router.navigateByUrl("/forbidden");
    return of();
  }
}
