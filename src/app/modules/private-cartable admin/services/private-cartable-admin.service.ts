import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrivateCartableAdminService {

  constructor(private httpClient:HttpClient) { }
  getDraft(){
    return this.httpClient.get<any>('/url/rules/draft');
  }
}
