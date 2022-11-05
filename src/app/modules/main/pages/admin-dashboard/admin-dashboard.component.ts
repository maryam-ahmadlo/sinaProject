import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { Observable } from "rxjs";
import { StateService } from "../../../../core/services";
import { SearchLayoutComponent } from "src/app/modules/search/pages";
import { InstantNotificationComponent } from "src/app/modules/main/components/instant-notification/instant-notification.component";
import { NzIconModule } from "ng-zorro-antd/icon";

@Component({
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.less"],
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    NzCardModule,
    NzLayoutModule,
    NzPageHeaderModule,
    NzButtonModule,
    RouterModule,
    InstantNotificationComponent,
    SearchLayoutComponent,
    NzIconModule
  ],
})
export class AdminDashboardComponent implements OnInit {
  me$: Observable<any> = this.stateService.select((state) => state.me);

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private stateService: StateService
  ) {}

  cards: Object[] = [
    {
      title: "تعداد درخواست طرح",
      data: 250,
    },
    {
      title: "تعداد درخواست‌های در حال کارشناسی",
      data: 150,
    },
    {
      title: "تعداد درخواست‌های کارشناسی شده",
      data: 700,
    },
  ];

  ngOnInit(): void {}
}
