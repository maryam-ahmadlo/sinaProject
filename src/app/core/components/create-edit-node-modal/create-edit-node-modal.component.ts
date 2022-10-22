import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NzModalModule, NzModalRef } from "ng-zorro-antd/modal";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
  selector: "app-create-edit-node-modal",
  standalone: true,
  imports: [
    CommonModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./create-edit-node-modal.component.html",
  styleUrls: ["./create-edit-node-modal.component.css"],
})
export class CreateEditNodeModalComponent {
  @Input() node: any;
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

  constructor(private modal: NzModalRef) {}

  destroyModal(): void {
    this.modal.destroy();
  }
}
