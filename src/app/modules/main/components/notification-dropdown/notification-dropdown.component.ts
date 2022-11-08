import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzModalModule, NzModalService } from "ng-zorro-antd/modal";
import { NotificationModalComponent } from "../notification-modal/notification-modal.component";
import { IGroupMessage } from "src/shared/common/src/lib/interfaces";
import { NzTypographyModule } from "ng-zorro-antd/typography";
import { NzTagModule } from "ng-zorro-antd/tag";
import { ActivatedRoute, Router } from "@angular/router";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzTabsModule } from "ng-zorro-antd/tabs";
@Component({
  selector: "app-notification-dropdown",
  templateUrl: "./notification-dropdown.component.html",
  styleUrls: ["./notification-dropdown.component.less"],
  standalone: true,
  imports: [
    NzTabsModule,
    CommonModule,
    NzTableModule,
    NzDropDownModule,
    NzIconModule,
    NzPageHeaderModule,
    NzButtonModule,
    NzModalModule,
    NzTypographyModule,
    NzTagModule,
    NzCardModule,
  ],
})
export class NotificationDropdownComponent {
  data: any = [];
  listOfMessages: IGroupMessage[] = [];
  isLoading: boolean;

  constructor(
    private modalService: NzModalService,
    private httpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.data.subscribe(({ groupMessage }) => {
      this.listOfMessages.splice(0, this.listOfMessages.length);

      if (groupMessage.length > 1) {
        Array.prototype.forEach.call(groupMessage, (v: any) => {
          this.listOfMessages.push(v);
        });
      } else if (groupMessage) {
        this.listOfMessages = groupMessage;
      } else {
        this.listOfMessages = [];
      }
    });
  }

  ngOnInit(): void {}

  createNotificationModal(item: IGroupMessage) {
    this.httpClient
      .get<IGroupMessage>(`/url/messages/${item.id}`, {
        headers: new HttpHeaders({
          accept: "*/*",
          Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
        }),
      })
      .subscribe((msg) => {
        item = msg;
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
              onClick: (componentInstance) => {
                componentInstance.destroyModal();
              },
            },
          ],
        });
        this.modalService.afterAllClose.subscribe((result) => {
          this.refresh();
        });
      });
  }

  refresh() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { refresh: new Date().getTime() },
    });
  }
}
