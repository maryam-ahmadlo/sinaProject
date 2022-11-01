import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SliderService {
  constructor(private httpClient: HttpClient) {}

  logout() {
    return this.httpClient.post("/api/logout", {});
  }

  groupMessage(jsonStr: any) {
    return this.httpClient.post<any>("/url/messages/send/grouping", jsonStr, {
      headers: new HttpHeaders({
        accept: "*/*",
        "Content-Type": "application/json",
      }),
    });
  }

  instantMessage(jsonStr: any) {
    return this.httpClient.post<any>("/url/messages/send/instant", jsonStr, {
      headers: new HttpHeaders({
        accept: "*/*",
        "Content-Type": "application/json",
      }),
    });
  }
}
