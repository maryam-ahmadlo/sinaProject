import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IBranch } from "src/shared/common/src/lib/interfaces/branch";

@Injectable({
  providedIn: "root",
})
export class UserManagementService {
  constructor(private httpClient: HttpClient) {}

  getBranches() {
    return this.httpClient.get<IBranch[]>("/url/branches");
  }

  getRules() {
    return this.httpClient.get<{
      id: string;
      active: boolean;
    }[]>("/url/roles");
  }
}
