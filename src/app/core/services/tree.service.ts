import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TreeService {
  constructor(private httpClient: HttpClient) {}

  getAllNodes() {
    return this.httpClient.get(
      "/api/folder/getChildren?fldId=%2Fokm%3Acategories",
      {
        headers: new HttpHeaders({
          accept: "application/json",
          Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
        }),
      }
    );
  }

  addBookMark(data: string) {
    return this.httpClient.post("/api/bookmark/create", data, {
      headers: new HttpHeaders({
        accept: "application/json",
        Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
      }),
    });
  }
}
