import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzModalModule, NzModalRef, NzModalService } from "ng-zorro-antd/modal";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzListModule } from "ng-zorro-antd/list";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { NzBreadCrumbModule } from "ng-zorro-antd/breadcrumb";
import { finalize } from "rxjs";
import { IDraftRule } from "src/shared/common/src/lib/interfaces";
import { AddDocumentModalComponent } from "@core/components/add-document-modal/add-document-modal.component";
import { RejectModalComponent } from "src/app/modules/private-cartable admin/components";
import { NzMessageService } from "ng-zorro-antd/message";
import { PrivateCartableCustomerService } from "../../services";
import { ConfirmRuleComponent } from "../confirm-rule/confirm-rule.component";

@Component({
  selector: "app-cartable-draft-list",
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzTableModule,
    NzDividerModule,
    NzModalModule,
    FlexLayoutModule,
    NzButtonModule,
    NzDropDownModule,
    NzListModule,
    RouterModule,
    NzBreadCrumbModule,
    NzModalModule,
  ],
  templateUrl: "./cartable-draft-list.component.html",
  styleUrls: ["./cartable-draft-list.component.css"],
})
export class CartableDraftListComponent {
  draftsDocs: IDraftRule[] = [];
  isLoading: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private privateCartableCustomerService: PrivateCartableCustomerService,
    private nzMessage: NzMessageService,
    private modalService: NzModalService,
    private router: Router,
 
  ) {
    this.activatedRoute.data.subscribe(({ draft }) => {
      this.draftsDocs = [];
      if (draft) {
        this.draftsDocs = draft;
      } else {
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
    this.privateCartableCustomerService
      .reject(item.uuid)
      .pipe(finalize(() => (componentInstance.isLoading = false)))
      .subscribe(() => handleRes());

    const handleRes = () => {
      this.nzMessage.success("عملیات با موفقیت انجام شد");
      componentInstance.destroyModal();
      this.refresh();
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

  SendToAdmintModal(item: IDraftRule) {
    this.modalService.create({
      nzTitle: "ارسال برای کاربر ارشد",
      nzContent: ConfirmRuleComponent,
      nzComponentParams: {
        item,
      },
      nzFooter: [
        {
          label: "خیر",
          onClick: (componentInstance) => componentInstance.destroyModal(),
        },
        {
          label: "بله",
          type: "primary",
          onClick: () => this.handleConfirmRule(item),
          loading: (componentInstance) => componentInstance.isLoading,
        },
      ],
    });
  }
  handleConfirmRule(item: IDraftRule) {
    this.loading = true;

    this.privateCartableCustomerService
      .confirm(item.uuid)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((lll) => console.log("lll", lll));
  }

  refresh() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        refresh: new Date().getTime(),
      },
    });
  }
}
