import { Component, ElementRef, OnInit } from "@angular/core";
import { CommonModule, JsonPipe } from "@angular/common";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzBreadCrumbModule } from "ng-zorro-antd/breadcrumb";
import { FlexLayoutModule, MediaObserver } from "@angular/flex-layout";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzIconModule } from "ng-zorro-antd/icon";
import {
  ActivatedRoute,
  Event,
  NavigationStart,
  Router,
  RouterModule,
} from "@angular/router";

import { NzPopconfirmModule } from "ng-zorro-antd/popconfirm";
import { NzDrawerModule } from "ng-zorro-antd/drawer";
import { LayoutSiderMenuComponent } from "../layout-slider-menu/layout-slider-menu.component";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";

import { SearchLayoutComponent } from "src/app/modules/search/pages";
import { StateService } from "../../services";
import { CreateSendGroupMsgModalComponent } from "@core/components/create-send-group-msg-modal/create-send-group-msg-modal.component";
import { NzModalModule, NzModalService } from "ng-zorro-antd/modal";
import { NzBadgeModule } from "ng-zorro-antd/badge";
import { finalize } from "rxjs";
import { NzMessageService } from "ng-zorro-antd/message";
import { SharedModule } from "src/shared/shared.module";
import { SliderService } from "../../services/slider.service";

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
    SharedModule,
  ],
  templateUrl: "./slidebar.component.html",
  styleUrls: ["./slidebar.component.less"],
})
export class SlidebarComponent implements OnInit {
  isCollapsed: boolean = true;
  isMobile: boolean = this.mediaObserver.isActive(["lt-lg"]);
  messageCount: number = 0;
  roleAdmin: boolean = false;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public mediaObserver: MediaObserver,
    private sliderService: SliderService,
    private stateService: StateService,
    private modalService: NzModalService,
    private nzMessage: NzMessageService
  ) {
    this.stateService
      .select((state) => state.me)
      .subscribe((m) => {
        m.roles.filter((user) => {
          if (user.id === "ROLE_ADMIN") {
            this.roleAdmin = true;
          } else {
            this.roleAdmin = false;
          }
        });
      });
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

  ngOnInit(): void {
    this.sliderService.getGroupMessage().subscribe((msg) => {
      msg.forEach((m) => {
        if (m.seenDate === null) {
          this.messageCount++;
        }
      });
    });
  }

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
    this.sliderService.logout().subscribe(() => {
      this.stateService.setState("signedIn", false);
      this.stateService.setState("me", null);
      localStorage.clear();
      this.refresh();
    });
  }

  cancel(): void {}

  bookmark() {
    if(this.roleAdmin){
    this.router.navigate(["/", "admin", "bookmarks"]);
    }else{
      this.router.navigate(["/", "customer", "bookmarks"]);
    }
  }
  messages(){
    if(this.roleAdmin){
      this.router.navigate(['/', 'admin', 'notifications']);
      }else{
        this.router.navigate(['/', 'customer', 'notifications']);
      }
  }

  createSendMsgModal() {
    this.modalService.create({
      nzTitle: "ارسال پیام  ",
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
          onClick: (componentInstance) => this.handleMsg(componentInstance),
          loading: (componentInstance) => componentInstance.isLoading,
        },
      ],
    });
  }

  handleMsg(componentInstance: any) {
    // console.log(componentInstance.Form.value);
    if (componentInstance.form.value.type === "group") {
      let jsonStr = `{"sender":"okmAdmin","messageText":"${componentInstance.form["value"].messageText}","messageReceivers":[]}`;
      let obj = JSON.parse(jsonStr);
      componentInstance.form["value"].messageReceivers.forEach((user: any) => {
        obj["messageReceivers"].push({ receiver: `${user}` });
      });

      jsonStr = JSON.stringify(obj);

      this.sliderService
        .groupMessage(jsonStr)
        .pipe(finalize(() => (componentInstance.isLoading = false)))
        .subscribe(() => handleRes());

      const handleRes = () => {
        this.nzMessage.success("عملیات با موفقیت انجام شد");
        componentInstance.destroyModal();
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: { refresh: new Date().getTime() },
        });
      };
    } else {
      let jsonStr = `{"sender":"okmAdmin","messageText":"${componentInstance.form["value"].messageText}","messageReceivers":[]}`;
      let obj = JSON.parse(jsonStr);
      componentInstance.form["value"].messageReceivers.forEach((user: any) => {
        obj["messageReceivers"].push({ receiver: `${user}` });
      });

      jsonStr = JSON.stringify(obj);

      this.sliderService
        .instantMessage(jsonStr)
        .pipe(finalize(() => (componentInstance.isLoading = false)))
        .subscribe(() => handleRes());

      const handleRes = () => {
        this.nzMessage.success("عملیات با موفقیت انجام شد");
        componentInstance.destroyModal();
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: { refresh: new Date().getTime() },
        });
      };
    }
  }

  

  UserManagement() {
    this.router.navigate(["/", "admin", "user-management"]);
  }
  // PrivateCartable() {
  //   this.router.navigate(["/", "customer", "private-cartable"]);
  // }
  // PrivateCartableAdmin() {
  //   this.router.navigate(["/", "admin", "private-cartable-admin"]);
  // }
  
}
