import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IUser } from "src/shared/common/src/lib/interfaces";
import { NzModalRef } from "ng-zorro-antd/modal";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";

@Component({
  selector: "app-create-update-user-modal",
  standalone: true,
  imports: [CommonModule,NzFormModule,ReactiveFormsModule,NzInputModule],
  templateUrl: "./create-update-user-modal.component.html",
  styleUrls: ["./create-update-user-modal.component.css"],
})
export class CreateUpdateUserModalComponent implements OnInit {
  isLoading: boolean;
  @Input() item: IUser;

  form: FormGroup<{ name: FormControl<string>; email: FormControl<string>; }> =
    new FormGroup({
      name: new FormControl(null),
      email: new FormControl(null),
    });
  constructor(private modal: NzModalRef) {}

  ngOnInit(): void {
    this.form.patchValue(this.item);
  }
  destroyModal(): void {
    this.modal.destroy();
  }
}
