import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IGroupMessage } from "src/shared/common/src/lib/interfaces";

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
  getGroupMessage() {
    return this.httpClient.get<IGroupMessage[]>(
      "/url/messages/okmAdmin/grouping/inbox",
      {
        headers: new HttpHeaders({
          accept: "application/json",
          Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
        }),
      }
    );
  }
}
