import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IFlatNode, ITreeNode } from "src/shared/common/src/lib/interfaces";

@Injectable({
  providedIn: "root",
})
export class TreeService {
  constructor(private httpClient: HttpClient) {}
  getRoot() {
    return this.httpClient.get<ITreeNode[]>("/api/folder/getChildren", {
      headers: new HttpHeaders({
        accept: "application/json",
        Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
      }),
      params: { fldId: "/okm:categories" },
    });
  }


  createCategory(body: { path: string; code: string }) {
    return this.httpClient.post<any>("/url/categories/create", body, {
      headers: new HttpHeaders({
        accept: "application/json",
        Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
      }),
    });
  }

  deleteCategory(id: string) {
    return this.httpClient.delete(`api/categories/${id}/delete`, {
      headers: new HttpHeaders({
        accept: "application/json",
        Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
      }),
    });
  }
  renameCategory(uuid: string, name: string) {
    return this.httpClient.post<any>(`/api/categories/${uuid}`, {
      params: {
        rename: { newName: name },
      },
    });
  }

  deleteNode(uuid: string) {
    return this.httpClient.delete(`/api/categories/${uuid}/delete`);
  }
  addBookMark(id: string) {
    return this.httpClient.post("/api/bookmark/create?nodeId=", {
      headers: new HttpHeaders({
        accept: "application/json",
        Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
      }),

      params: {
        nodeId: id,
      },
    });
  }

  downloadPDF(param: string) {
    return this.httpClient.get("/api/document/getContent", {
      headers: new HttpHeaders({
        accept: "application/octet-stream",
        Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
      }),
      params: { docId: param },
    });
  }
}
