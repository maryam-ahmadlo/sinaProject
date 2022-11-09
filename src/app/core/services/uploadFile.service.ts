import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UploadFileService {
  constructor(private httpClient: HttpClient) {}

  createRules(body: any) {
    return this.httpClient.post<any>("/url/rules/create", body, {
      headers: new HttpHeaders({
        accept: "*/*",
        Authorization: "Basic b2ttQWRtaW46YWRtaW4="
      }),
    });
  }

  uploadFile(body){
    return this. httpClient.post('/url/documents/create',body,{
      headers: new HttpHeaders({
        accept: "*/*",
        "Content-Type":"multipart/form-data",
        Authorization: "Basic b2ttQWRtaW46YWRtaW4="
      }),
    })
  }
}


