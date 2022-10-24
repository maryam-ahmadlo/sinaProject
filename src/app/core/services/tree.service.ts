import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TreeService {
  constructor(private httpClient: HttpClient) {}

  getAllNodes() {
    return this.httpClient.get(
      "/api/folder/getChildren",
      {
        headers: new HttpHeaders({
          accept: "application/json",
          Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
        }),
        params:{fldId:'Fokm:categories'}
      }
    );
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
