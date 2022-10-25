import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class SearchService {
  constructor(private httpClient: HttpClient) {}

  simpleSearch(name: string) {
    return this.httpClient.get("/api/search/findByName?name=", {
      headers: new HttpHeaders({
        accept: "application/json",
        Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
      }),
      params: { name: name },
    });
  }
}
