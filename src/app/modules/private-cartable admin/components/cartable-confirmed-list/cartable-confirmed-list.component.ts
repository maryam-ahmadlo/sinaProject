import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NzModalModule, NzModalService } from "ng-zorro-antd/modal";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { PrivateCartableAdminService } from "../../services";
import { NzMessageService } from "ng-zorro-antd/message";
import { IConfirmed } from "src/shared/common/src/lib/interfaces/confirmed";
import { CreateNotifyRuleModalComponent } from "../create-notify-rule-modal/create-notify-rule-modal.component";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzBreadCrumbModule } from "ng-zorro-antd/breadcrumb";
import { NzButtonModule } from "ng-zorro-antd/button";
import { FlexLayoutModule } from "@angular/flex-layout";

@Component({
  selector: "app-cartable-confirmed-list",
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
    NzButtonModule
  ],
  templateUrl: "./cartable-confirmed-list.component.html",
  styleUrls: ["./cartable-confirmed-list.component.css"],
})
export class CartableConfirmedListComponent implements OnInit {
  confirmedDocs: IConfirmed[] = [];

  constructor(
    private modalService: NzModalService,
    private activatedRoute: ActivatedRoute,
    private privateCartableAdminService: PrivateCartableAdminService,
    private nzMessage: NzMessageService
  ) {
    this.activatedRoute.data.subscribe(({ confirmed }) => {
      this.confirmedDocs = [];
      if (confirmed && confirmed.length > 1) {
        this.confirmedDocs = confirmed;
      } else if (confirmed.length === 1) {
        this.confirmedDocs.push(confirmed);
      } else {
        this.confirmedDocs = [];
      }
    });
  }

  ngOnInit(): void {}
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

  notifyRule(): void {
    this.loading = true;
    console.log(this.setOfCheckedId);
    this.modalService.create({
      nzTitle: "ابلاغ سند",
      nzContent: CreateNotifyRuleModalComponent,
      nzFooter: [
        {
          label: "بستن",
          onClick: (componentInstance) => componentInstance.destroyModal(),
        },
        {
          label: "ابلاغ",
          type: "primary",
          onClick: (componentInstance) =>
            this.handleNotifyRule(componentInstance),
          loading: (componentInstance) => componentInstance.isLoading,
        },
      ],
    });
  }
  handleNotifyRule(componentInstance) {
    console.log(componentInstance.form.value.notifyText);

    // this.privateCartableAdminService.notify()
  }
}
