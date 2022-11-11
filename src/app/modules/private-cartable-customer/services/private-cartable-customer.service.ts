import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  IBranch,
  INotified,
  IUser,
} from "src/shared/common/src/lib/interfaces";

@Injectable({
  providedIn: "root",
})
export class PrivateCartableCustomerService {
  constructor(private httpClient: HttpClient) {}
  getDraft() {
    return this.httpClient.get<any>("/url/rules/draft", {
      headers: new HttpHeaders({
        accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
      }),
    });
  }
  reject(uuid: string) {
    return this.httpClient.put<any>(`/url/rules/${uuid}/reject`, {
      headers: new HttpHeaders({
        accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
      }),
    });
  }
  getNotified() {
    return this.httpClient.get<INotified[]>("/url/rules/notified", {
      headers: new HttpHeaders({
        accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
      }),
    });
  }
  confirm(uuid: string) {
    return this.httpClient.put<any>(`/url/rules/${uuid}/confirm`, {
      headers: new HttpHeaders({
        accept: "*/*",
        Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
      }),
    });
  }

  getBranches() {
    return this.httpClient.get<IBranch[]>("/url/branches", {
      headers: new HttpHeaders({
        accept: "application/json",
        Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
      }),
    });
  }

  getUsers() {
    return this.httpClient.get<IUser[]>("/url/users", {
      headers: new HttpHeaders({
        accept: "application/json",
        Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
      }),
    });
  }
}
