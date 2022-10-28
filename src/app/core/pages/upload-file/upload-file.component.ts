import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FlexModule } from "@angular/flex-layout";
import { NzTimePickerModule } from "ng-zorro-antd/time-picker";
import { NzInputModule } from "ng-zorro-antd/input";
import * as moment from "jalali-moment";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzButtonModule } from "ng-zorro-antd/button";
import { CommonModule } from "@angular/common";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzListModule } from "ng-zorro-antd/list";
import { NzRadioModule } from "ng-zorro-antd/radio";
import { DatepickerModule } from "../../../../shared/components/datepicker";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzModalModule, NzModalService } from "ng-zorro-antd/modal";
import { CreateAddFileModalComponent } from "@core/components/index";

export interface IUploadFileForm {
  title: FormControl<string>;
  subject: FormControl<string>;
  text: FormControl<string>;
  categoryId: FormControl<string>;
  code: FormControl<string>;
  documentType: FormControl<string>;
  versionNumber: FormControl<string>;
  branchName: FormControl<string>;
  ruleNumber: FormControl<string>;
  related: FormControl<string>;
  keywords: FormControl<string>;
}
@Component({
  selector: "app-upload-file",
  templateUrl: "./upload-file.component.html",
  styleUrls: ["./upload-file.component.css"],
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
    NzModalModule,
  ],
})
export class UploadFileComponent implements OnInit {
  public isWait = false;
  uploadFileForm: FormGroup<IUploadFileForm> = new FormGroup({
    title: new FormControl(null , Validators.required),
    subject: new FormControl(null , Validators.required),
    text: new FormControl(null , Validators.required),
    categoryId: new FormControl(null , Validators.required),
    code: new FormControl(null , Validators.required),
    documentType: new FormControl(null , Validators.required),
    versionNumber: new FormControl(null , Validators.required),
    branchName: new FormControl(null , Validators.required),
    ruleNumber: new FormControl(null , Validators.required),
    related: new FormControl(null , Validators.required),
    keywords: new FormControl(null , Validators.required),
  });

  constructor(private router: Router, private modalService: NzModalService) {}

  ngOnInit(): void {}

  createAddFileModalComponent() {
    this.modalService.create({
      nzTitle: "افزودن فایل ",
      nzContent: CreateAddFileModalComponent,
      nzFooter: [
        {
          label: "انصراف",
          onClick: (componentInstance) => componentInstance.destroyModal(),
        },
        {
          label: "افزودن",
          type: "primary",
          onClick: (componentInstance) => componentInstance.handleOk(),
        },
      ],
    });
  }
}
