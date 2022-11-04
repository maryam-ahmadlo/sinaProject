import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { IGroupMessage } from 'src/shared/common/src/lib/interfaces';
import { SliderService } from '../services/slider.service';


@Injectable({
  providedIn: 'root'
})
export class NotificationResolver implements Resolve<IGroupMessage[]> {
  constructor(private sliderService:SliderService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IGroupMessage[]> {
    return this.sliderService.getGroupMessage();
  }
}
