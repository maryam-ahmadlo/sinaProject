import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NzModalModule, NzModalRef } from "ng-zorro-antd/modal";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  UntypedFormControl,
  UntypedFormGroup,
} from "@angular/forms";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzIconModule } from "ng-zorro-antd/icon";
import { DatepickerModule } from "src/shared/components";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzDividerModule } from "ng-zorro-antd/divider";

@Component({
  selector: "app-create-add-file-modal",
  standalone: true,
  imports: [
    CommonModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzSelectModule,
    NzIconModule,
    DatepickerModule,
    NzTableModule,
    NzDividerModule,
  ],
  templateUrl: "./create-add-file-modal.component.html",
  styleUrls: ["./create-add-file-modal.component.css"],
})
export class CreateAddFileModalComponent {
  isLoading: boolean;
  form: FormGroup<{
    level: FormControl<string>;
    title: FormControl<string>;
    code: FormControl<string>;
  }> = new FormGroup({
    level: new FormControl(null),
    title: new FormControl(null, [Validators.required]),
    code: new FormControl(null, [Validators.required]),
  });
  isVisible = false;
  isConfirmLoading = false;
  searchItem = {};

  advancedSearchForm: UntypedFormGroup = new UntypedFormGroup({
    expression: new UntypedFormControl(null),
    searchExpression: new UntypedFormControl(null, [
      Validators.required,
      Validators.minLength(2),
    ]),
    documentType: new UntypedFormControl(null),
    startDate: new UntypedFormControl(null),
    endDate: new UntypedFormControl(null),
    branchName: new UntypedFormControl(null),
    status: new UntypedFormControl(null),
    subject: new UntypedFormControl(null),
    title: new UntypedFormControl(null),
    keywords: new UntypedFormControl(null),
  });

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

  onAdvancedSubmit() {
    this.searchItem = {
      ...this.advancedSearchForm.value,
    };
  }
}
