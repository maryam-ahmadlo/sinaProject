import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UploadFileService {
  constructor(private httpClient: HttpClient) {}

  createRules(body) {
    return this.httpClient.post<any>("/url/rules/create", body, {
      headers: new HttpHeaders({
        accept: "application/json",
        "Content-type": "application/json",
        Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
      }),
    });
  }
}
