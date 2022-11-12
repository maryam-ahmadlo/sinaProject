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

  getChildren(node: string) {
    return this.httpClient.get<ITreeNode>("/api/folder/getChildren", {
      headers: new HttpHeaders({
        accept: "application/json",
        Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
      }),
      params: { fldId: `${node}` },
    });
  }
  createCategory(body) {
    return this.httpClient.post<any>("/url/categories/create", body, {
      headers: new HttpHeaders({
        accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
      }),
    });
  }

  deleteCategory(id: string) {
    return this.httpClient.delete(`url/categories/${id}/delete`, {
      headers: new HttpHeaders({
        accept: "*/*",
        Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
      }),
    });
  }
  renameCategory(uuid: string, body) {
    return this.httpClient.put<any>(`/url/categories/${uuid}/update`, body, {
      headers: new HttpHeaders({
        accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
      }),
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
    return this.httpClient.get("/url/document/getContent/", {
      headers: new HttpHeaders({
        accept: "application/octet-stream",
        Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
      }),
      params: { docId: param },
    });
  }

  getCode(node: IFlatNode) {
    return this.httpClient.get(`/url/categories/${node.id}`, {
      headers: new HttpHeaders({
        accept: "*/*",
        Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
      }),
    });
  }

  getNodeContent(node: string) {
    return this.httpClient.get<any>(`/url/rules/${node}/byCategory`, {
      headers: new HttpHeaders({
        accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
      }),
    });
  }


}
