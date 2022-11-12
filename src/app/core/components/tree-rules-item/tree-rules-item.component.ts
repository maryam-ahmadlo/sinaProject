import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NzTagModule } from "ng-zorro-antd/tag";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NzButtonModule } from "ng-zorro-antd/button";
import { TreeService } from "../../services/tree.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ObserveGroupModalComponent } from "@core/components/observe-group-modal/observe-group-modal.component";
import { NzModalService } from "ng-zorro-antd/modal";
import { NzCardModule } from "ng-zorro-antd/card";
import { IFlatNode, INotified } from "src/shared/common/src/lib/interfaces";
import { NzListModule } from "ng-zorro-antd/list";
import { ObsoleteContentModalComponent } from "../obsolete-content-modal/obsolete-content-modal.component";
import { finalize } from "rxjs";
import { NzMessageModule, NzMessageService } from "ng-zorro-antd/message";

@Component({
  selector: "app-tree-rules-item",
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    NzIconModule,
    NzTagModule,
    NzPageHeaderModule,
    NzButtonModule,
    NzCardModule,
    NzPageHeaderModule,
    NzListModule,
    NzMessageModule,
  ],
  templateUrl: "./tree-rules-item.component.html",
  styleUrls: ["./tree-rules-item.component.less"],
})
export class TreeRulesItemComponent implements OnInit {
  nodeId: string;
  title: string;
  nodeContent: INotified[];

  constructor(
    private treeService: TreeService,
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService,
    private nzMessage: NzMessageService,
    private router: Router
  ) {
    this.nodeId = this.activatedRoute.snapshot.params["id"];
    this.treeService.getNodeContent(this.nodeId).subscribe((res) => {
      this.nodeContent = [];
      console.log(res);

      this.nodeContent = res;
    });
  }

  ngOnInit(): void {}

  addBookmark() {
    this.treeService
      .addBookMark("f1cc7966-d1de-4b9e-9331-453d013bed24")
      .subscribe();
  }
  downloadPDF() {
    this.treeService.downloadPDF("1").subscribe();
  }
  changeToExpire() {}

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

  obsoleteContent(node: INotified) {
    this.modalService.create({
      nzTitle: "تغییر به منسوخ شده",
      nzContent: ObsoleteContentModalComponent,
      nzComponentParams: {
        node,
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
            this.handleDeleteTreeNode(componentInstance, node),
          loading: (componentInstance) => componentInstance.isLoading,
        },
      ],
    });
  }

  handleDeleteTreeNode(componentInstance: any, node: INotified) {
    componentInstance.isLoading = true;
    this.treeService
      .deleteCategory(node.uuid)
      .pipe(finalize(() => (componentInstance.isLoading = false)))
      .subscribe(() => handleRes());

    const handleRes = () => {
      this.nzMessage.success("عملیات با موفقیت انجام شد");
      componentInstance.destroyModal();
      this.refresh();
    };
  }
  refresh() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { refresh: new Date().getTime() },
    });
  }
}
