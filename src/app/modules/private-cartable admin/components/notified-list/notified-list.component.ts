import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzBreadCrumbModule } from "ng-zorro-antd/breadcrumb";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { NzModalModule } from "ng-zorro-antd/modal";
import { NzButtonModule } from "ng-zorro-antd/button";
import { INotified } from "src/shared/common/src/lib/interfaces";

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
    private activatedRoute: ActivatedRoute,
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
