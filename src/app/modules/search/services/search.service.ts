import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class SearchService {
  constructor(private httpClient: HttpClient) {}

  // simpleSearch(text: string) {
  //   return this.httpClient.get("/api/search/find", {
  //     headers: new HttpHeaders({
  //       accept: "application/json",
  //       Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
  //     }),
  //     params: { content: text, domain: 1 },
  //   });
  // }


  // http://localhost:8080/OpenKM/services/rest/search/findByContent?content=?

  simpleSearch(text: string) {
    return this.httpClient.get("/api/search/findByContent", {
      headers: new HttpHeaders({
        accept: "application/json",
        Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
      }),
      params: { content: text },
    });
  }
}
