import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NzButtonModule } from "ng-zorro-antd/button";
import { RouterModule } from "@angular/router";
import { SearchLayoutComponent } from "src/app/modules/search/pages";
import { NzIconModule } from "ng-zorro-antd/icon";
import { FlexLayoutModule } from "@angular/flex-layout";

@Component({
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.less"],
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    NzPageHeaderModule,
    NzButtonModule,
    RouterModule,
    SearchLayoutComponent,
    NzIconModule,
  ],
})
export class AdminDashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
