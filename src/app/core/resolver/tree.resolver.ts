import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { TreeService } from '../services/tree.service';

@Injectable({
  providedIn: 'root'
})
export class TreeResolver implements Resolve<any> {
  constructor(private treeService:TreeService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.treeService.getAllNodes();
  }
}
