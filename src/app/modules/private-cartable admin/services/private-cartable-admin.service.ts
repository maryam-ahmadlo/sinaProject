import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IDraftRule } from "src/shared/common/src/lib/interfaces";
import { IConfirmed } from "src/shared/common/src/lib/interfaces/confirmed";

@Injectable({
  providedIn: "root",
})
export class PrivateCartableAdminService {
  constructor(private httpClient: HttpClient) {}
  getDraft() {
    return this.httpClient.get<IDraftRule[]>("/url/rules/draft", {
      headers: new HttpHeaders({
        accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
      }),
    });
  }

  showDetail(uuid: string) {
    return this.httpClient.get(`/url/rules/${uuid}`, {
      headers: new HttpHeaders({
        accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
      }),
    });
  }

  getContent(uuid: string) {
    return this.httpClient.get(`/url/documents/getContent/${uuid}`, {
      headers: new HttpHeaders({
        accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
      }),
    });
  }

  getConfirmed() {
    return this.httpClient.get<IConfirmed[]>(`/url/rules/confirmed`, {
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
  notify(uuid: string, body) {
    return this.httpClient.put(`/url/rules/${uuid}/notify`, body, {
      headers: new HttpHeaders({
        accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
      }),
    });
  }
}
