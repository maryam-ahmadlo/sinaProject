import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { SearchLayoutComponent } from "src/app/modules/search/pages";
import { InstantNotificationComponent } from "src/app/modules/main/components/instant-notification/instant-notification.component";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from "ng-zorro-antd/icon";
import { FlexLayoutModule } from "@angular/flex-layout";

@Component({
  templateUrl: "./customer-dashboard.component.html",
  styleUrls: ["./customer-dashboard.component.less"],
  standalone: true,
  imports: [
    CommonModule,
    SearchLayoutComponent,
    RouterModule,
    NzButtonModule,
    NzIconModule,
    NzPageHeaderModule,
    FlexLayoutModule,
    InstantNotificationComponent,
  ],
})
export class CustomerDashboardComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    // this.router.navigate(['search'])
  }
}
