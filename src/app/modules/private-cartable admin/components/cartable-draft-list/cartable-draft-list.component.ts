import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzBreadCrumbModule } from "ng-zorro-antd/breadcrumb";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { PrivateCartableAdminService } from "../../services";
import { IDraftRule } from "src/shared/common/src/lib/interfaces";
import { finalize } from "rxjs";
import { NzMessageService } from "ng-zorro-antd/message";
import { AddDocumentModalComponent } from "@core/components/add-document-modal/add-document-modal.component";
import { NzModalModule, NzModalService } from "ng-zorro-antd/modal";
import { RejectModalComponent } from "../reject-modal/reject-modal.component";
import { NzButtonModule } from "ng-zorro-antd/button";
import { FlexLayoutModule } from "@angular/flex-layout";
import { CreateNotifyRuleModalComponent } from "../create-notify-rule-modal/create-notify-rule-modal.component";


@Component({
  selector: "app-cartable-draft-list",
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
  templateUrl: "./cartable-draft-list.component.html",
  styleUrls: ["./cartable-draft-list.component.css"],
})
export class CartableDraftListComponent {
  draftsDocs: IDraftRule[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private privateCartableAdminService: PrivateCartableAdminService,
    private nzMessage: NzMessageService,
    private modalService: NzModalService
  ) {
    this.activatedRoute.data.subscribe(({ drafts }) => {
      this.draftsDocs = [];
      if (drafts) {
        this.draftsDocs = drafts;
      }else {
        this.draftsDocs = [];
      }
    });
  }

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

  notifyRule(item: IDraftRule): void {

    this.loading = true;
    this.modalService.create({
      nzTitle: "ابلاغ سند",
      nzContent: CreateNotifyRuleModalComponent,
      nzComponentParams: {
        item,
      },
      nzFooter: [
        {
          label: "بستن",
          onClick: (componentInstance) => componentInstance.destroyModal(),
        },
        {
          label: "ابلاغ",
          type: "primary",
          onClick: (componentInstance) =>
            this.handleNotifyRule(componentInstance, item),
          loading: (componentInstance) => componentInstance.isLoading,
        },
      ],
    });
  }
  handleNotifyRule(componentInstance: any, item: IDraftRule) {
    componentInstance.isLoading = true;
    let notify = new Set<string>();
    
  console.log(item.uuid);
  
    notify.add("user");
    notify.add("okmAdmin");
    console.log(notify);
    
    this.privateCartableAdminService
      .notify(item.uuid,notify)
      .pipe(finalize(() => (componentInstance.isLoading = false)))
      .subscribe(() => handleRes());

    const handleRes = () => {
      this.nzMessage.success("عملیات با موفقیت انجام شد");
      componentInstance.destroyModal();
    };
  }

  loading = false;
  checked = false;
  indeterminate = false;
  listOfCurrentPageData = [];
  listOfData = [];
  setOfCheckedId = new Set<string>();

  updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: string, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach((item) =>
      this.updateCheckedSet(item.id, value)
    );
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every((item) =>
      this.setOfCheckedId.has(item.id)
    );
    this.indeterminate =
      this.listOfCurrentPageData.some((item) =>
        this.setOfCheckedId.has(item.id)
      ) && !this.checked;
  }

  confirmRule() {
    this.loading = true;
    console.log(this.setOfCheckedId);
  }
}
