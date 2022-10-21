import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";

import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from "ng-zorro-antd/icon";
import { FlexLayoutModule } from "@angular/flex-layout";

import { NzCardModule } from "ng-zorro-antd/card";
import { NzSkeletonModule } from "ng-zorro-antd/skeleton";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzBadgeModule } from "ng-zorro-antd/badge";

import { NzEmptyModule } from "ng-zorro-antd/empty";

import { NotificationAlertComponent } from "src/shared/components/notification-alert/notification-alert.component";


@Component({
  selector: "app-notification-dropdown",
  templateUrl: "./notification-dropdown.component.html",
  styleUrls: ["./notification-dropdown.component.less"],
  standalone: true,
  imports: [
    CommonModule,
    NzDropDownModule,
    NzButtonModule,
    NzIconModule,
    NotificationAlertComponent,
    NzCardModule,
    FlexLayoutModule,
    NzSkeletonModule,
    NzDividerModule,
    NzBadgeModule,
    NzEmptyModule,
  ],
})
export class NotificationDropdownComponent {
  // subscription: Subscription;
  // notifications: INotification[];
  // notifications$: Observable<INotification[]> =
  //   this.notificationsFacade.allData$.pipe(
  //     map((notifications) =>
  //       notifications.map((notification) => ({
  //         ...notification,
  //         delivered: false,
  //       }))
  //     ),
  //     tap((res) => this.checkObesrveAt(res)),
  //     tap((res) => this.checkUnread(res))
  //   );
  // loaded$: Observable<boolean> = this.notificationsFacade.loaded$;
  // unread: any[];
  // totalUnread: number = 0;
  // constructor(
  //   private notificationsFacade: NotificationsFacade,
  //   private modalService: NzModalService
  // ) {}
  // ngOnInit(): void {
  //   this.notificationsFacade.loadAll();
  // }
  // checkUnread(res: any) {
  //   this.unread = res.filter((res:any) => res.delivered === false);
  //   this.totalUnread = this.unread.length;
  // }
  // handleVisibleChange(visible: boolean) {
  //   visible && this.notificationsFacade.loadAll();
  // }
  // checkObesrveAt(res:any) {
  //   for (let i = 0; i < res.length; i++) {
  //     this.getDotColor(res[i]);
  //     if (this.getDotColor(res[i])) {
  //       res[i].delivered = true;
  //     }
  //   }
  // }
  // getDotColor(res:any) {
  //   switch (res.observed_at) {
  //     case '0001-01-01T00:00:00Z':
  //       return false;
  //     default:
  //       return true;
  //   }
  // }
  // notificationModal(notification: INotification) {
  //   this.modalService.create({
  //     nzContent: NotificationModalComponent,
  //     nzComponentParams: {
  //       notification,
  //     },
  //     nzFooter: [
  //       {
  //         label: 'بستن',
  //         onClick: (componentInstance) => {
  //           componentInstance.destroyModal();
  //         },
  //         type: 'dashed',
  //       },
  //       {
  //         label: 'حذف',
  //         onClick: (componentInstance) => componentInstance.deleteMessage(),
  //         type: 'primary',
  //       },
  //     ],
  //   });
  // }
}
