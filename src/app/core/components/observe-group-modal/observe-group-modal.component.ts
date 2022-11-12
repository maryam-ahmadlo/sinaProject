import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NzModalModule, NzModalRef } from "ng-zorro-antd/modal";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { UserManagementService } from "src/app/modules/user-management/services/user-management.service";
import { IUser } from "src/shared/common/src/lib/interfaces";
import { IBranch } from "src/shared/common/src/lib/interfaces";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { NzTreeSelectModule } from "ng-zorro-antd/tree-select";
import { NzSelectModule } from "ng-zorro-antd/select";

@Component({
  selector: "app-observe-group-modal",
  standalone: true,
  imports: [
    CommonModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    NzTreeSelectModule,
    FormsModule,
    NzSelectModule,
  ],
  templateUrl: "./observe-group-modal.component.html",
  styleUrls: ["./observe-group-modal.component.less"],
})
export class ObserveGroupModalComponent {
  isLoading: boolean;
  listOfUsers: IUser[] = [];

  form: FormGroup<{
    branches: FormControl<string[]>;
    users: FormControl<string[]>;
  }> = new FormGroup({
    branches: new FormControl(null, [Validators.required]),
    users: new FormControl(null, [Validators.required]),
  });
  nodes: any = [];

  constructor(
    private modal: NzModalRef,
    private userManagementService: UserManagementService
  ) {
    this.userManagementService.getBranches().subscribe((r) => {
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

  destroyModal(): void {
    this.modal.destroy();
  }

  onChange($event: IBranch[]): void {
    $event.forEach((r) => {
      r.roles.forEach((user) => {
        user.users.forEach((user) => {
          if (!this.listOfUsers.includes(user)) {
            this.listOfUsers.push(user);
          }
        });
      });
    });
  }

  ngOnInit(): void {}
}
