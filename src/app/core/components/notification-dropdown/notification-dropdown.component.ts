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

  isLoading: boolean;

  constructor(private httpClient: HttpClient,private modalService: NzModalService) {}

  ngOnInit(): void {
    this.httpClient
      .get("/url/groupMessages/okmAdmin/inbox", {
        headers: new HttpHeaders({
          accept: "application/json",
          Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
        }),
      })
      .subscribe(console.log);

      this.listOfData = new Array(200).fill(0).map((_, index) => ({
        id: index,
        name: `Edward King ${index}`,
        age: 32,
        address: `London, Park Lane no. ${index}`,
      }));
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

  listOfSelection = [
    {
      text: "Select All Row",
      onSelect: () => {
        this.onAllChecked(true);
      },
    },
    {
      text: "Select Odd Row",
      onSelect: () => {
        this.listOfCurrentPageData.forEach(
          (data: { id: number }, index: number) =>
            this.updateCheckedSet(data.id, index % 2 !== 0)
        );
        this.refreshCheckedStatus();
      },
    },
    {
      text: "Select Even Row",
      onSelect: () => {
        this.listOfCurrentPageData.forEach(
          (data: { id: number }, index: number) =>
            this.updateCheckedSet(data.id, index % 2 === 0)
        );
        this.refreshCheckedStatus();
      },
    },
  ];
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: any = [];
  listOfData: any = [];
  setOfCheckedId = new Set<number>();

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach((item: { id: number }) =>
      this.updateCheckedSet(item.id, value)
    );
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: any): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every((item: { id: number }) =>
      this.setOfCheckedId.has(item.id)
    );
    this.indeterminate =
      this.listOfCurrentPageData.some((item: { id: number }) =>
        this.setOfCheckedId.has(item.id)
      ) && !this.checked;
  }

}
