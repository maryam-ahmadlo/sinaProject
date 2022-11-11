import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzModalModule, NzModalService } from "ng-zorro-antd/modal";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzListModule } from "ng-zorro-antd/list";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { NzBreadCrumbModule } from "ng-zorro-antd/breadcrumb";
import { finalize } from "rxjs";
import { IDraftRule } from "src/shared/common/src/lib/interfaces";
import { AddDocumentModalComponent } from "@core/components/add-document-modal/add-document-modal.component";
import { RejectModalComponent } from "src/app/modules/private-cartable admin/components";
import { NzMessageService } from "ng-zorro-antd/message";
import { PrivateCartableCustomerService } from "../../services";

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
  ],
  templateUrl: "./cartable-draft-list.component.html",
  styleUrls: ["./cartable-draft-list.component.css"],
})
export class CartableDraftListComponent {
  draftsDocs: IDraftRule[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private privateCartableCustomerService: PrivateCartableCustomerService,
    private nzMessage: NzMessageService,
    private modalService: NzModalService
  ) {
    this.activatedRoute.data.subscribe(({ drafts }) => {
      this.draftsDocs = [];
      if (drafts && drafts.length > 1) {
        this.draftsDocs = drafts;
      } else if (drafts.length === 1) {
        this.draftsDocs.push(drafts);
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

  sendToAdmin() {
    this.loading = true;
    console.log(this.setOfCheckedId);
    this.setOfCheckedId.forEach((id) => {
      console.log(id);

      // this.privateCartableCustomerService.confirm()
    });
  }
}
