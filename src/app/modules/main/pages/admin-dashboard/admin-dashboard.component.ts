import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NzButtonModule } from "ng-zorro-antd/button";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { Observable } from "rxjs";
import { StateService } from "../../../../core/services";
import { SearchLayoutComponent } from "src/app/modules/search/pages";
import { InstantNotificationComponent } from "src/app/modules/main/components/instant-notification/instant-notification.component";
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
    InstantNotificationComponent,
    SearchLayoutComponent,
    NzIconModule,
  ],
})
export class AdminDashboardComponent implements OnInit {
  me$: Observable<any> = this.stateService.select((state) => state.me);

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private stateService: StateService
  ) {}

  ngOnInit(): void {}
}
