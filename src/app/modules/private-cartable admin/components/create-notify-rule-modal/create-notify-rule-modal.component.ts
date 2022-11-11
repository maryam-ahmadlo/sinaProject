import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NzModalRef } from "ng-zorro-antd/modal";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzFormModule } from "ng-zorro-antd/form";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-create-notify-rule-modal",
  standalone: true,
  imports: [CommonModule, NzCardModule, NzFormModule, ReactiveFormsModule],
  templateUrl: "./create-notify-rule-modal.component.html",
  styleUrls: ["./create-notify-rule-modal.component.css"],
})
export class CreateNotifyRuleModalComponent {
  isLoading: boolean;
  form: FormGroup<{ notifyText: FormControl<string> }> = new FormGroup({
    notifyText: new FormControl(null, Validators.required),
  });
  constructor(private modal: NzModalRef) {}

  destroyModal(): void {
    this.modal.destroy();
  }
}
