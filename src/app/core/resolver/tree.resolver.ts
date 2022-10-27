import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ITreeNode } from 'src/shared/common/src/lib/interfaces';
import { TreeService } from '../services/tree.service';

@Injectable({
  providedIn: 'root'
})
export class TreeResolver implements Resolve<ITreeNode[]> {
  constructor(private treeService:TreeService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITreeNode[]> {
    return this.treeService.getRoot();
  }
}
