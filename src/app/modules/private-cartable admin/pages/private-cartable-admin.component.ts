import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { AddDocumentModalComponent } from "@core/components/add-document-modal/add-document-modal.component";
import { NzModalModule, NzModalService } from "ng-zorro-antd/modal";
import { NzBreadCrumbModule } from "ng-zorro-antd/breadcrumb";
import { ObserveGroupModalComponent } from "@core/components/observe-group-modal/observe-group-modal.component";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzIconModule } from "ng-zorro-antd/icon";
import { IDraftRule } from "src/shared/common/src/lib/interfaces";
import { RejectModalComponent } from "../components/reject-modal/reject-modal.component";
import { PrivateCartableAdminService } from "../services";
import { finalize } from "rxjs";
import {  NzMessageService } from "ng-zorro-antd/message";

@Component({
  selector: "app-private-cartable-admin",
  templateUrl: "./private-cartable-admin.component.html",
  styleUrls: ["./private-cartable-admin.component.css"],
  standalone: true,
  imports: [
    CommonModule,
    NzModalModule,
    FlexLayoutModule,
    NzCardModule,
    NzButtonModule,
    NzTableModule,
    NzDividerModule,
    NzBreadCrumbModule,
    NzTabsModule,
    NzPageHeaderModule,
    NzCardModule,
    NzIconModule,
    NzDropDownModule,
    RouterModule,
  ],
})
export class PrivateCartableAdminComponent implements OnInit {
  draftsDocs: IDraftRule[] = [];
  constructor(
    private modalService: NzModalService,
    private activatedRoute: ActivatedRoute,
    private privateCartableAdminService: PrivateCartableAdminService,
    private nzMessage: NzMessageService
  ) {
    this.activatedRoute.data.subscribe(({ drafts }) => {
      this.draftsDocs = drafts;
    });
  }

  ngOnInit(): void {}

  addDocumentModal(item: string) {
    this.modalService.create({
      nzTitle: "افزودن مستندات تکمیلی",
      nzContent: AddDocumentModalComponent,
      nzComponentParams: {
        item,
      },
      nzFooter: [
        {
          label: "تایید",
          type: "primary",
          onClick: (componentInstance) => componentInstance.handleOk(),
        },
        {
          label: "انصراف",
          onClick: (componentInstance) => componentInstance.destroyModal(),
        },
      ],
    });
  }

  observeGroupModalComponent() {
    this.modalService.create({
      nzTitle: "مشاهده لیست گروه شعب دریافت کنندگان",
      nzContent: ObserveGroupModalComponent,
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
          onClick: (componentInstance) => this.handleOk(componentInstance),
          loading: (componentInstance) => componentInstance.isLoading,
        },
      ],
    });
  }
  handleOk(componentInstance: any) {}

  RejectModal(item: IDraftRule) {
    this.modalService.create({
      nzTitle: "رد درخواست",
      nzContent: RejectModalComponent,
      nzComponentParams: {
        item,
      },
      nzFooter: [
        {
          label: "بستن",
          onClick: (componentInstance) => componentInstance.destroyModal(),
        },
        {
          label: "تایید",
          type: "primary",
          onClick: (componentInstance) =>
            this.handleRejectRule(componentInstance, item),
          loading: (componentInstance) => componentInstance.isLoading,
        },
      ],
    });
  }

  handleRejectRule(componentInstance: any, item: IDraftRule) {
    componentInstance.isLoading = true;
    this.privateCartableAdminService
      .reject(item.uuid)
      .pipe(finalize(() => (componentInstance.isLoading = false)))
      .subscribe(() => handleRes());

    const handleRes = () => {
      this.nzMessage.success("عملیات با موفقیت انجام شد");
      componentInstance.destroyModal();
    };
  }
}
