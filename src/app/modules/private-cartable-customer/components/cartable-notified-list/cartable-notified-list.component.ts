import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzModalModule, NzModalService } from "ng-zorro-antd/modal";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzBreadCrumbModule } from "ng-zorro-antd/breadcrumb";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzListModule } from "ng-zorro-antd/list";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { INotified } from "src/shared/common/src/lib/interfaces";
import { PrivateCartableCustomerService } from "../../services";
import { NzMessageService } from "ng-zorro-antd/message";

@Component({
  selector: "app-cartable-notified-list",
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzTableModule,
    NzDividerModule,
    NzModalModule,
    FlexLayoutModule,
    NzButtonModule,
    NzBreadCrumbModule,
    NzDropDownModule,
    NzListModule,
    RouterModule,
  ],
  templateUrl: "./cartable-notified-list.component.html",
  styleUrls: ["./cartable-notified-list.component.css"],
})
export class CartableNotifiedListComponent  {
 
  notifiedDocs: INotified[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private privateCartableCustomerService: PrivateCartableCustomerService,
    private nzMessage: NzMessageService,
    private modalService: NzModalService
  ) {
    this.activatedRoute.data.subscribe(({ notified }) => {
      this.notifiedDocs = [];
      if (notified && notified.length > 1) {
        this.notifiedDocs = notified;
      } else if (notified.length === 1) {
        this.notifiedDocs.push(notified);
      } else {
        this.notifiedDocs = [];
      }
    });
  }

}
