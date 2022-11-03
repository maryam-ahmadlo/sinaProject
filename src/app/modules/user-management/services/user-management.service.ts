import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IUser } from "src/shared/common/src/lib/interfaces";
import { IBranch } from "src/shared/common/src/lib/interfaces/branch";

@Injectable({
  providedIn: "root",
})
export class UserManagementService {
  constructor(private httpClient: HttpClient) {}

  getBranches() {
    return this.httpClient.get<IBranch[]>("/url/branches", {
      headers: new HttpHeaders({
        accept: "application/json",
        Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
      }),
    });
  }

  getRules() {
    return this.httpClient.get<
      {
        id: string;
        active: boolean;
      }[]
    >("/url/roles", {
      headers: new HttpHeaders({
        accept: "application/json",
        Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
      }),
    });
  }

  getUsers() {
    return this.httpClient.get<IUser[]>("/url/users", {
      headers: new HttpHeaders({
        accept: "application/json",
        Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
      }),
    });
  }

  assignRole(users: IUser[], roles: any) {
    return this.httpClient.put<any>(
      "/api/auth/assignRole",
      `user=${users}&role=${roles}`,
      {
        headers: new HttpHeaders({
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
        }),
      }
    );
  }

  renameUser(body: IUser) {
    return this.httpClient.put(
      "/api/auth/updateUser",
      `user=${body.id}&
    &email=${body.email}&name=${body.name}&active=${body.active}
    `,
      {
        headers: new HttpHeaders({
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
        }),
      }
    );
  }

  deleteUser(id:string){

    return this.httpClient.delete('/api/auth/deleteUser',{
      headers: new HttpHeaders({
        accept: "application/json",
        Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
      }),
      params:{
        user:id
      }
    })
  }
}
