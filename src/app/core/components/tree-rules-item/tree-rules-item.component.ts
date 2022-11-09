import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NzTagModule } from "ng-zorro-antd/tag";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NzButtonModule } from "ng-zorro-antd/button";
import { TreeService } from "../../services/tree.service";
import { ActivatedRoute } from "@angular/router";
import { ObserveGroupModalComponent } from "@core/components/observe-group-modal/observe-group-modal.component";
import { NzModalModule, NzModalService } from "ng-zorro-antd/modal";
import { NzCardModule } from "ng-zorro-antd/card";

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
    NzPageHeaderModule
  ],
  templateUrl: "./tree-rules-item.component.html",
  styleUrls: ["./tree-rules-item.component.less"],
})
export class TreeRulesItemComponent implements OnInit {
  nodeId: string;
  constructor(
    private treeService: TreeService,
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService
  ) {
    this.nodeId = this.activatedRoute.snapshot.params["id"];
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
          onClick: (componentInstance) =>
            this.handleOk(componentInstance),
          loading: (componentInstance) => componentInstance.isLoading,
        },
      ],
    });
  }

  handleOk(componentInstance: any) {};
}
