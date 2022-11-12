import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IDraftRule, INotified } from "src/shared/common/src/lib/interfaces";

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
        Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
      }),
    });
  }

  getNotified() {
    return this.httpClient.get<INotified[]>(`/url/rules/notified`, {
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
    return this.httpClient.put<any>(`/url/rules/${uuid}/notify`, body, {
      headers: new HttpHeaders({
        accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
      }),
    });
  }

  getPath(uuid: string) {
    return this.httpClient.get<any>(`/api/folder/getPath/${uuid}`, {
      headers: new HttpHeaders({
        accept: "*/*",
        Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
      }),
    });
  }
}
