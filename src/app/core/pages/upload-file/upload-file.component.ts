import { Component, OnInit } from "@angular/core";
import { FlexModule } from "@angular/flex-layout";
import { NzTimePickerModule } from "ng-zorro-antd/time-picker";
import { NzInputModule } from "ng-zorro-antd/input";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
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
import { UploadFileService } from "../../services/uploadFile.service";
import { NzMessageModule, NzMessageService } from "ng-zorro-antd/message";
import { NzUploadFile } from "ng-zorro-antd/upload";
import { NzUploadModule } from "ng-zorro-antd/upload";
import { DocumentTypeEnum } from "src/shared/common/src/lib/enums";
import { VersionNumberEnum } from "src/shared/common/src/lib/enums";
import { HttpClient } from "@angular/common/http";
import { Observable, finalize } from "rxjs";
import { map } from "rxjs/operators";
import { TreeService } from "../../services/tree.service";
import { IFlatNode, ITreeNode } from "src/shared/common/src/lib/interfaces";

export interface IUploadFileForm {
  title: FormControl<string>;
  subject: FormControl<string>;
  text: FormControl<string>;
  categoryId: FormControl<string>;
  documentType: FormControl<any>;
  versionNumber: FormControl<any>;
  branchName: FormControl<string>;
  ruleNumber: FormControl<string>;
  keywords: FormControl<string[]>;
}

export interface IFileName {
  lastModified: FormControl<any>;
  lastModifiedDate: FormControl<any>;
  name: FormControl<string>;
  size: FormControl<number>;
  type: FormControl<any>;
  webkitRelativePath: FormControl<any>;
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
    NzMessageModule,
    NzUploadModule,
  ],
})
export class UploadFileComponent implements OnInit {
  uploadFileForm: FormGroup<IUploadFileForm> = new FormGroup({
    title: new FormControl(null, Validators.required),
    subject: new FormControl(null, Validators.required),
    text: new FormControl(null, Validators.required),
    categoryId: new FormControl(null, Validators.required),
    documentType: new FormControl(Validators.required),
    versionNumber: new FormControl(Validators.required),
    branchName: new FormControl(null, Validators.required),
    ruleNumber: new FormControl(null, Validators.required),
    keywords: new FormControl(null, Validators.required),
  });

  documentTypeEnum = DocumentTypeEnum;
  keys = [];

  versionNumberEnum = VersionNumberEnum;
  keysV = [];

  fileName: FormGroup<IFileName> = new FormGroup({
    lastModified: new FormControl(null),
    lastModifiedDate: new FormControl(null),
    name: new FormControl(null),
    size: new FormControl(null),
    type: new FormControl(null),
    webkitRelativePath: new FormControl(null),
  });

  treeData: IFlatNode[] = [];
  secondLevel: IFlatNode[] = [];
  thirdLevel: IFlatNode[] = [];
  level = 0;

  fileC: File;

  constructor(
    private modalService: NzModalService,
    private activatedRoute: ActivatedRoute,
    private uploadFileService: UploadFileService,
    private nzMessage: NzMessageService,
    private http: HttpClient,
    private treeService: TreeService
  ) {
    this.treeService.getRoot().subscribe((root) => {
      if (root["folder"].length > 1) {
        Array.prototype.forEach.call(root["folder"], (v: any) => {
          let json = {
            path: v.path,
            id: v.uuid,
            label: v.path.split("/")[2],
            level: this.level,
            expandable: v.hasChildren,
          };
          this.treeData.push(json);
        });
      } else if (root["folder"]) {
        let json = {
          path: root["folder"].path,
          id: root["folder"].uuid,
          label: root["folder"].path.split("/")[2],
          level: this.level,
          expandable: root["folder"].hasChildren,
        };
        this.treeData.push(json);
      }
    });

    this.keys = Object.keys(this.documentTypeEnum);
    this.keysV = Object.keys(this.versionNumberEnum);

    this.uploadFileForm
      .get("categoryId")
      .patchValue(this.activatedRoute.snapshot.params["id"]);
  }

  ngOnInit(): void {}

  getChildren(id) {
    this.treeService.getChildren(id).subscribe((second) => {
      if (second["folder"].length > 1) {
        Array.prototype.forEach.call(second["folder"], (v: any) => {
          let json = {
            path: v.path,
            id: v.uuid,
            label: v.path.split("/")[this.level + 3],
            level: this.level + 1,
            expandable: v.hasChildren,
          };
          this.secondLevel.push(json);
        });
      } else if (second["folder"]) {
        let json = {
          path: second.folder["path"],
          id: second.folder["uuid"],
          label: second.folder["path"].split("/")[this.level + 3],
          level: this.level + 1,
          expandable: second.folder["hasChildren"],
        };
        this.secondLevel.push(json);
      }
      this.level++;
    });
  }
  getSecondChildren(id) {
    this.treeService.getChildren(id).subscribe((third) => {
      if (third["folder"].length > 1) {
        Array.prototype.forEach.call(third["folder"], (v: any) => {
          let json = {
            path: v.path,
            id: v.uuid,
            label: v.path.split("/")[this.level + 3],
            level: this.level + 1,
            expandable: v.hasChildren,
          };
          this.thirdLevel.push(json);
        });
      } else if (third["folder"]) {
        let json = {
          path: third.folder["path"],
          id: third.folder["uuid"],
          label: third.folder["path"].split("/")[this.level + 3],
          level: this.level + 1,
          expandable: third.folder["hasChildren"],
        };
        this.thirdLevel.push(json);
      }
      this.level++;
    });
  }
  onSubmit = () => {
    const formData = new FormData();
    formData.append(
      "nodeRuleDto",
      new Blob([JSON.stringify(this.uploadFileForm.value)], {
        type: "application/json",
      })
    );

    formData.append("content", this.fileC);

    this.uploadFileService.createRules(formData).subscribe(() => handleRes());
    console.log("form", formData);

    const handleRes = () => {
      this.nzMessage.success("عملیات با موفقیت انجام شد");
    };
  };

  onFileSelected(event) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileC = file;
      const formData = new FormData();
      formData.append("content", file);
    }
  }

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
