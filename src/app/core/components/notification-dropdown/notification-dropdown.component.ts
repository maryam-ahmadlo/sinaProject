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
import { IGroupMessage } from "src/shared/common/src/lib/interfaces";
import { SliderService } from "../../services/slider.service";
import { NzTypographyModule } from "ng-zorro-antd/typography";
import { NzTagModule } from 'ng-zorro-antd/tag';

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
    NzTypographyModule,
    NzTagModule
  ],
})
export class NotificationDropdownComponent {
  data: any = [];
  listOfMessages:IGroupMessage[]=[];
  isLoading: boolean;

  constructor(private sliderService: SliderService,private modalService: NzModalService) {}

  ngOnInit(): void {
    this.sliderService.getGroupMessage()
      .subscribe((msg)=>{
        this.listOfMessages = msg;
      });

     
  }

createNotificationModal(item:IGroupMessage){
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
