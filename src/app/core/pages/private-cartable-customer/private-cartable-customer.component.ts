import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlexModule } from "@angular/flex-layout";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { AddDocumentModalComponent } from "@core/components/add-document-modal/add-document-modal.component";
import { NzModalModule, NzModalService } from "ng-zorro-antd/modal";

@Component({
  selector: "app-private-cartable",
  templateUrl: "./private-cartable-customer.component.html",
  styleUrls: ["./private-cartable-customer.component.css"],
  standalone: true,
  imports: [
    CommonModule,
    NzModalModule,
    FlexModule,
    NzCardModule,
    NzButtonModule,
    NzTableModule,
    NzDividerModule,
  ],
})
export class PrivateCartablecustomerComponent implements OnInit {
  constructor(private modalService: NzModalService) {}

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
}
