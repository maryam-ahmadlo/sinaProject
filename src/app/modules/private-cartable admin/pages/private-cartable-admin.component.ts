import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule, FlexModule } from "@angular/flex-layout";
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
import { ActivatedRoute } from "@angular/router";

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
    NzCardModule
  ],
})
export class PrivateCartableAdminComponent implements OnInit {
  constructor(private modalService: NzModalService,private activatedRoute:ActivatedRoute) {
    this.activatedRoute.data.subscribe(({drafts})=>{
      console.log(drafts);
      
    });
  }

  ngOnInit(): void {}

  addDocumentModal() {
    this.modalService.create({
      nzTitle: "افزودن مستندات تکمیلی",
      nzContent: AddDocumentModalComponent,
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

  addBookmark() {
    // this.treeService
    //   .addBookMark("f1cc7966-d1de-4b9e-9331-453d013bed24")
    //   .subscribe((res) => console.log(res));
  }
}
