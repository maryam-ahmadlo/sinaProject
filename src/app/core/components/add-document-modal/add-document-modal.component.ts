import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NzModalModule, NzModalRef } from "ng-zorro-antd/modal";
import { AngularFileUploaderModule } from "angular-file-uploader";
import { FlexModule } from "@angular/flex-layout";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { Router } from "@angular/router";
import { NzMessageModule, NzMessageService } from "ng-zorro-antd/message";
import { UploadFileService } from "../../services/uploadFile.service";
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
    NzMessageModule,
  ],
})
export class AddDocumentModalComponent {
  isVisible = false;
  isConfirmLoading = false;
  formData = new FormData();
  @Input() item: string;

  constructor(
    private modal: NzModalRef,
    private uploadFileService: UploadFileService,
    private nzMessage: NzMessageService,
    private router: Router
  ) {}

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
  onFileSelected(event) {
    this.isConfirmLoading = true;
    const file: File = event.target.files[0];
    if (file) {
      this.formData.append("content", file);
    }
    this.uploadFileService
      .additonalDocument(this.item, this.formData)
      .subscribe(() => handleRes());

    const handleRes = () => {
      this.nzMessage.success("عملیات با موفقیت انجام شد");
      this.router.navigate(["/"]);
    };
  }
}
