import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NzTableModule } from "ng-zorro-antd/table";;
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzModalModule, NzModalService } from "ng-zorro-antd/modal";
import { NotificationModalComponent } from "../notification-modal/notification-modal.component";
@Component({
  selector: "app-notification-dropdown",
  templateUrl: "./notification-dropdown.component.html",
  styleUrls: ["./notification-dropdown.component.less"],
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzDropDownModule,
    NzIconModule,
    NzPageHeaderModule,
    NzButtonModule,
    NzModalModule,
  ],
})
export class NotificationDropdownComponent {
  data: any = [];
  listOfMessages:any=[];
  isLoading: boolean;

  constructor(private httpClient: HttpClient,private modalService: NzModalService) {}

  ngOnInit(): void {
    this.httpClient
      .get("/url/messages/okmAdmin/grouping/inbox", {
        headers: new HttpHeaders({
          accept: "application/json",
          Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
        }),
      })
      .subscribe((msg)=>{
        this.listOfMessages = msg;
      });

     
  }

createNotificationModal(item:any){
  this.modalService.create({
    nzTitle: "مشاهده پیام",
    nzContent: NotificationModalComponent,
    nzComponentParams: {
      item,
    },
    nzFooter: [
      {
        label: "بستن",
        type: "default",
        onClick: (componentInstance) => componentInstance.destroyModal(),
      },
    ],
  });
}


}
