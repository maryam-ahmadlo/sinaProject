import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlexModule } from "@angular/flex-layout";
import { NzTimePickerModule } from "ng-zorro-antd/time-picker";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzButtonModule } from "ng-zorro-antd/button";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzListModule } from "ng-zorro-antd/list";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { DatepickerModule } from "src/shared/components";
import { NzRadioModule } from "ng-zorro-antd/radio";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { NzTableModule } from "ng-zorro-antd/table";
import { IUploadFileForm } from "src/app/core/pages/upload-file/upload-file.component";
import { PrivateCartableAdminService } from "../../services";
import { DocumentTypeEnum } from "src/shared/common/src/lib/enums";
import { VersionNumberEnum } from "src/shared/common/src/lib/enums";

@Component({
  selector: "app-create-show-draft",
  standalone: true,
  imports: [
    CommonModule,
    FlexModule,
    NzTimePickerModule,
    NzInputModule,
    NzFormModule,
    NzIconModule,
    NzButtonModule,
    FormsModule,
    NzSelectModule,
    NzListModule,
    ReactiveFormsModule,
    RouterModule,
    NzDividerModule,
    DatepickerModule,
    NzRadioModule,
    NzCardModule,
    NzTabsModule,
    NzTableModule,
  ],
  templateUrl: "./create-show-draft.component.html",
  styleUrls: ["./create-show-draft.component.css"],
})
export class CreateShowDraftComponent implements OnInit {
  FileForm: FormGroup<IUploadFileForm> = new FormGroup({
    title: new FormControl(null, Validators.required),
    subject: new FormControl(null, Validators.required),
    documentUuid: new FormControl(null),
    text: new FormControl(null, Validators.required),
    categoryId: new FormControl(null, Validators.required),
    documentType: new FormControl(Validators.required),
    versionNumber: new FormControl(Validators.required),
    branchName: new FormControl(null, Validators.required),
    ruleNumber: new FormControl(null, Validators.required),
    keywords: new FormControl([]),
    notifierId: new FormControl(null),
  });
  documentTypeEnum = DocumentTypeEnum;
  keys = [];
  versionNumberEnum = VersionNumberEnum;
  keysV = [];
  uuid: string;
  formData = new FormData();
  blob = new Blob();

  constructor(
    private activatedRoute: ActivatedRoute,
    private privateCartableAdminService: PrivateCartableAdminService
  ) {
    this.keys = Object.keys(this.documentTypeEnum);
    this.keysV = Object.keys(this.versionNumberEnum);

    this.privateCartableAdminService
      .showDetail(this.activatedRoute.snapshot.params["id"])
      .subscribe((res) => {
        this.FileForm.patchValue(res);
        this.uuid = res["documentUuid"];
      });
  }
  onSubmit = () => {
    this.privateCartableAdminService.getContent(this.uuid).subscribe((r)=>console.log(r)
    );
  };
  ngOnInit(): void {}
}
