import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzBreadCrumbModule } from "ng-zorro-antd/breadcrumb";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { NzModalModule, NzModalService } from "ng-zorro-antd/modal";
import { NzButtonModule } from "ng-zorro-antd/button";
import { INotified } from "src/shared/common/src/lib/interfaces";
import { PrivateCartableAdminService } from "../../services";
import { NzMessageService } from "ng-zorro-antd/message";

@Component({
  selector: "app-notified-list",
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    NzCardModule,
    NzDropDownModule,
    NzTableModule,
    NzBreadCrumbModule,
    RouterModule,
    NzModalModule,
    NzButtonModule,
  ],
  templateUrl: "./notified-list.component.html",
  styleUrls: ["./notified-list.component.css"],
})
export class NotifiedListComponent implements OnInit {
  notifiedDocs: INotified[] = [];

  constructor(
    private modalService: NzModalService,
    private activatedRoute: ActivatedRoute,
    private privateCartableAdminService: PrivateCartableAdminService,
    private nzMessage: NzMessageService
  ) {
    this.activatedRoute.data.subscribe(({ notified }) => {
      this.notifiedDocs = [];
      if (notified) {
        this.notifiedDocs = notified;
        console.log(this.notifiedDocs);
        
      } else {
        this.notifiedDocs = [];
      }
    });
  }

  ngOnInit(): void {}
}
