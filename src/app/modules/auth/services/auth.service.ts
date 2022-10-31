import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ILoginResponse } from "../interfaces";
import { ILoginForm } from "../pages";
import { IUser } from "src/shared/common/src/lib/interfaces";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  // login(data: Partial<{ loginId: string; password: string; }>) {
  //   return this.httpClient.post<ILoginResponse>('/api/login', data);
  // }



  login(Username:string, Password:string) {
    return this.httpClient.get<any>("/api/auth/login",
      {
    headers: new HttpHeaders({
      accept: "application/json",
      Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
    }),
    params:{
      username:Username,
      password:Password
    }
  });
  }

  getUserRole(id:string){
    return this.httpClient.get(`/api/auth/getRolesByUser/${id}`,{
      headers: new HttpHeaders({
        accept: "application/json",
        Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
      }),
    });
  }
  grtUserInfo(id:string){
    return this.httpClient.get<IUser>(`/url/users/${id}`,{
      headers: new HttpHeaders({
        accept: "application/json",
        Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
      }),
    });
  }
}
