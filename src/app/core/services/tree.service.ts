import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { IFlatNode, ITreeNode } from "src/shared/common/src/lib/interfaces";

@Injectable({
  providedIn: "root",
})
export class TreeService {
  constructor(private httpClient: HttpClient) {}
  getRoot() {
    return this.httpClient.get<ITreeNode[]>('/api/folder/getChildren', {
      headers: new HttpHeaders({
        accept: "application/json",
        Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
      }),
      params: { fldId: "/okm:categories" },
    });
  }
  // getChildren(node:IFlatNode) {
  //   let treeData: IFlatNode[] =[];
  //   return this.httpClient.get<ITreeNode>('/api/folder/getChildren', {
  //     headers: new HttpHeaders({
  //       accept: "application/json",
  //       Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
  //     }),
  //     params: { fldId: `/okm:categories/${node.id}` },
  //   }).pipe((res)=>{
  //     console.log('res',res);
  //     res.forEach(v =>{
  //       let json ={ 
  //         id: v.uuid,
  //         label:v.path.split('/')[2],
  //         level:0,
  //         expandable:v.hasChildren};
  //         treeData.push(json);
  //        treeData.push(json);
  //     })
    
  //     console.log('of(treeData)',of(treeData));
      
      
  //     return of(treeData)
  //   });
  // }

  renameNode(uuid: string, name: string) {
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
