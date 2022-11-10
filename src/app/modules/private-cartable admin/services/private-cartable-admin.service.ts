import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IDraftRule } from "src/shared/common/src/lib/interfaces";

@Injectable({
  providedIn: "root",
})
export class PrivateCartableAdminService {
  constructor(private httpClient: HttpClient) {}
  getDraft() {
    return this.httpClient.get<IDraftRule[]>("/url/rules/draft");
  }

  showDetail(uuid: string) {
    return this.httpClient.get(`/url/rules/${uuid}`);
  }

  getContent(uuid: string) {
    return this.httpClient.get(`/url/documents/getContent/${uuid}`);
  }

  reject(uuid: string) {
    return this.httpClient.put(`rules/${uuid}/reject`, null);
  }
}
