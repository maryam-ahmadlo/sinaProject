import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { IBookmark } from 'src/shared/common/src/lib/interfaces';
import { BookmarkService } from '../services/bookmark.service';

@Injectable({
  providedIn: 'root'
})
export class BookmarkResolver implements Resolve<IBookmark> {
  constructor(private bookmarkService : BookmarkService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBookmark> {
    return this.bookmarkService.getAll();
  }
}
