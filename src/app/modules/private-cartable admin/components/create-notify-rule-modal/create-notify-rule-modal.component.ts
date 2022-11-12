import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NzModalModule, NzModalRef } from "ng-zorro-antd/modal";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzFormModule } from "ng-zorro-antd/form";

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import {
  IBranch,
  IDraftRule,
  IUser,
} from "src/shared/common/src/lib/interfaces";
import { PrivateCartableCustomerService } from "src/app/modules/private-cartable-customer/services";
import { NzTreeSelectModule } from "ng-zorro-antd/tree-select";
import { NzSelectModule } from "ng-zorro-antd/select";

@Component({
  selector: "app-create-notify-rule-modal",
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzFormModule,
    ReactiveFormsModule,
    NzTreeSelectModule,
    NzSelectModule,
    NzModalModule,
  ],
  templateUrl: "./create-notify-rule-modal.component.html",
  styleUrls: ["./create-notify-rule-modal.component.css"],
})
export class CreateNotifyRuleModalComponent {
  @Input() item: IDraftRule;
  isLoading: boolean;
  listOfRoles: Array<{ label: string; value: string }> = [];
  listOfUsers: IUser[] = [];

  form: FormGroup<{
    branches: FormControl<string[]>;
    notifyReceivers: FormControl<string[]>;
  }> = new FormGroup({
    branches: new FormControl(null, [Validators.required]),
    notifyReceivers: new FormControl(null, [Validators.required]),
  });

  nodes: any = [];

  constructor(
    private modal: NzModalRef,
    private privateCartableCustomerService: PrivateCartableCustomerService
  )
  {
    this.privateCartableCustomerService.getBranches().subscribe((r) => {
      for (let i = 0; i < r.length; i++) {
        let json = {
          title: r[i].name,
          value: r[i].id,
          key: r[i],
        };
        this.nodes.push(json);
      }
    });
  }

  onChange($event: IBranch[]): void {
    $event.forEach((r) => {
      r.roles.forEach((user) => {
        user.users.forEach((user) => {
          this.listOfUsers.push(user);
        });
      });
    });
  }

  destroyModal(): void {
    this.modal.destroy();
  }
}
