import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ILoginResponse } from "../interfaces";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  // login(data: Partial<{ loginId: string; password: string; }>) {
  //   return this.httpClient.post<ILoginResponse>('/api/login', data);
  // }

  login() {
    return this.httpClient.get<any>("/api/auth/login", {
      headers: new HttpHeaders({
        accept: "application/json",
        Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
      }),
    });
  }
}
