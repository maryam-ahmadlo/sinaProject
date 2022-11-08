import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class SearchService {
  constructor(private httpClient: HttpClient) {}

  simpleSearch(Name: string) {
    return this.httpClient.get("/api/search/find", {
      headers: new HttpHeaders({
        accept: "application/json",
        Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
      }),
      params: {name:Name, content:'هوش'},
    });
  }
}
