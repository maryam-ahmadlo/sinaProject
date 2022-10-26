import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NzModalModule, NzModalRef } from "ng-zorro-antd/modal";
import { AngularFileUploaderModule } from "angular-file-uploader";
import { FlexModule } from "@angular/flex-layout";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzDividerModule } from "ng-zorro-antd/divider";
@Component({
  selector: "app-add-document-modal",
  templateUrl: "./add-document-modal.component.html",
  styleUrls: ["./add-document-modal.component.less"],
  standalone: true,
  imports: [
    CommonModule,
    NzModalModule,
    AngularFileUploaderModule,
    FlexModule,
    NzButtonModule,
    NzCardModule,
    NzDividerModule,
    NzTableModule,
  ],
})
export class AddDocumentModalComponent {
  isVisible = false;
  isConfirmLoading = false;

  constructor(private modal: NzModalRef) {}

  destroyModal(): void {
    this.modal.destroy();
  }
  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1000);
  }
  afuConfig = {
    uploadAPI: {
      url: "",
    },
    replaceTexts: {
      selectFileBtn: "انتخاب فایل",
      resetBtn: "بازنشانی",
      uploadBtn: "افزودن به گرید",
      attachPinBtn: "Attach Files...",
      afterUploadMsg_success: "با موفقیت آپلود شد",
      afterUploadMsg_error: "آپلود نشد",
      sizeLimit: "محدودیت سایز",
    },
  };
}
