import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDraftRule } from 'src/shared/common/src/lib/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PrivateCartableAdminService {

  constructor(private httpClient:HttpClient) { }
  getDraft(){
    return this.httpClient.get<IDraftRule[]>('/url/rules/draft');
  }
}
