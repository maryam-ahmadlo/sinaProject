import { Component, ElementRef, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzBreadCrumbModule } from "ng-zorro-antd/breadcrumb";
import {
  FlexLayoutModule,
  FlexModule,
  MediaObserver,
} from "@angular/flex-layout";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzIconModule } from "ng-zorro-antd/icon";
import {
  ActivatedRoute,
  Event,
  NavigationStart,
  Router,
  RouterModule,
} from "@angular/router";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NzPopconfirmModule } from "ng-zorro-antd/popconfirm";
import { NzDrawerModule } from "ng-zorro-antd/drawer";
import { LayoutSiderMenuComponent } from "../layout-slider-menu/layout-slider-menu.component";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NotificationDropdownComponent } from "@core/components/notification-dropdown";
import { SearchLayoutComponent } from "src/app/modules/search/pages";
import { StateService } from "../../services";
import { CreateSendGroupMsgModalComponent } from "@core/components/create-send-group-msg-modal/create-send-group-msg-modal.component";
import { NzModalModule, NzModalService } from "ng-zorro-antd/modal";
import { NzBadgeModule } from "ng-zorro-antd/badge";
@Component({
  standalone: true,
  selector: "app-slidebar",
  imports: [
    CommonModule,
    NzLayoutModule,
    NzButtonModule,
    NzDropDownModule,
    NzBreadCrumbModule,
    FlexLayoutModule,
    NzGridModule,
    NzModalModule,
    NzButtonModule,
    NzIconModule,
    RouterModule,
    NzPopconfirmModule,
    NzDrawerModule,
    NzDropDownModule,
    LayoutSiderMenuComponent,
    SearchLayoutComponent,
    NzPageHeaderModule,
    NzBadgeModule,
    NotificationDropdownComponent,
  ],
  templateUrl: "./slidebar.component.html",
  styleUrls: ["./slidebar.component.less"],
})
export class SlidebarComponent implements OnInit {
  isCollapsed: boolean = true;
  isMobile: boolean = this.mediaObserver.isActive(["lt-lg"]);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public mediaObserver: MediaObserver,
    private httpclient: HttpClient,
    private stateService: StateService,
    private modalService: NzModalService
  ) {
    mediaObserver
      .asObservable()
      .subscribe(() => (this.isMobile = mediaObserver.isActive(["lt-lg"])));
    router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.isMobile && (this.isCollapsed = true);
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  ngOnInit(): void {}

  onCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  refresh() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { refresh: new Date().getTime() },
      queryParamsHandling: "merge",
    });
  }

  logout() {
    this.httpclient.post("/api/logout", {}).subscribe(() => {
      this.stateService.setState("signedIn", false);
      this.stateService.setState("me", null);
      localStorage.clear();
      this.refresh();
    });
  }

  cancel(): void {}

  bookmark() {
    this.router.navigate(["/", "customer", "bookmarks"]);
  }

  createSendGroupMsgModal() {
    this.modalService.create({
      nzTitle: "ارسال پیام گروهی ",
      nzContent: CreateSendGroupMsgModalComponent,
      nzComponentParams: {},
      nzFooter: [
        {
          label: "انصراف",
          type: "default",
          onClick: (componentInstance) => componentInstance.destroyModal(),
        },
        {
          label: "ارسال",
          type: "primary",
          onClick: (componentInstance) =>
            this.handleGroupMsg(componentInstance),
          loading: (componentInstance) => componentInstance.isLoading,
        },
      ],
    });
  }
  handleGroupMsg(componentInstance: any) {
    let date: Date = new Date();

    let json = {
      sender: "okmAdmin",
      message: componentInstance.form["value"].message,
      sendDate: date.toJSON(),
      messageReceivers: [
        {
          sender: "okmAdmin",
          receiver: componentInstance.form["value"].messageReceivers,
          message: componentInstance.form["value"].message,
          seenDate: "",
        },
      ],
    };
    this.httpclient.post<any>("/url/groupMessages", json).subscribe();
    console.log(componentInstance.form);
  }

  createSendUrgentMsgModal() {
    this.modalService.create({
      nzTitle: "ارسال پیام فوری ",
      nzContent: CreateSendGroupMsgModalComponent,
      nzComponentParams: {},
      nzFooter: [
        {
          label: "انصراف",
          type: "default",
          onClick: (componentInstance) => componentInstance.destroyModal(),
        },
        {
          label: "ارسال",
          type: "primary",
          onClick: (componentInstance) =>
            this.handleUrgentMsg(componentInstance),
          loading: (componentInstance) => componentInstance.isLoading,
        },
      ],
    });
  }

  handleUrgentMsg(componentInstance: any) {}

  UserManagement() {
    this.router.navigate(["/", "admin", "user-management"]);
  }
  PrivateCartable() {
    this.router.navigate(["/", "customer", "private-cartable"]);
  }
  PrivateCartableAdmin() {
    this.router.navigate(["/", "admin", "private-cartable-admin"]);
  }
  UploadFile() {
    this.router.navigate(["/", "customer", "uploadFile"]);
  }
}
