import { Injectable } from "@angular/core";
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { SearchService } from "../../modules/search/services/search.service";

@Injectable({
  providedIn: "root",
})
export class SearchResolver implements Resolve<any> {
  constructor(private searchService: SearchService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.searchService.simpleSearch(route.paramMap.get("name"));
  }
}
