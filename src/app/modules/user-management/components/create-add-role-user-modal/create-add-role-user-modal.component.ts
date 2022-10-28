import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NzModalModule, NzModalRef } from "ng-zorro-antd/modal";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzTreeSelectModule } from "ng-zorro-antd/tree-select";
import { NzSelectModule } from "ng-zorro-antd/select";
import { UserManagementService } from "../../services/user-management.service";
import { IBranch } from "src/shared/common/src/lib/interfaces/branch";
import { IUser } from "src/shared/common/src/lib/interfaces/user";

@Component({
  selector: "app-create-add-role-user-modal",
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
  templateUrl: "./create-add-role-user-modal.component.html",
  styleUrls: ["./create-add-role-user-modal.component.css"],
})
export class CreateAddRoleUserModalComponent implements OnInit {
  isLoading: boolean;
  listOfRoles: Array<{ label: string; value: string }> = [];
  listOfUsers: any = [];
  form: FormGroup<{
    content: FormControl<string>;
    value: FormControl<string[]>;
    listOfTagOptions: FormControl<string[]>;
  }> = new FormGroup({
    content: new FormControl(null),
    value: new FormControl(null, [Validators.required]),
    listOfTagOptions: new FormControl(null, [Validators.required]),
  });
  nodes: any = [];

  constructor(
    private modal: NzModalRef,
    private userManagementService: UserManagementService
  ) {
    this.userManagementService.getBranches().subscribe((r) => {
      console.log("r", r);
      for (let i = 0; i < r.length; i++) {
        let json = {
          title: r[i].name,
          value: r[i].code,
          key: r[i].id,
        };

        this.nodes.push(json);
      }
    });

    this.userManagementService.getUsers().subscribe((user) => {
      user.forEach((r) => {
        let json = {
          label: r.name,
          value: r.id,
        };
        this.listOfUsers.push(json);
      });
    });

    this.userManagementService.getRules().subscribe((r) => {
      for (let i = 0; i < r.length; i++) {
        let json = {
          label: r[i].id === "ROLE_ADMIN" ? "ادمین" : "کاربر",
          value: r[i].id,
        };

        this.listOfRoles.push(json);
      }
    });
  }

  destroyModal(): void {
    this.modal.destroy();
  }

  onChange($event: string[]): void {
    console.log($event);
  }

  ngOnInit(): void {}
}
