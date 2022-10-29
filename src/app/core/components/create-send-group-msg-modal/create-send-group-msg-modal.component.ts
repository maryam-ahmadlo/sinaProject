import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NzModalModule, NzModalRef } from "ng-zorro-antd/modal";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { NzTreeSelectModule } from "ng-zorro-antd/tree-select";
import { NzSelectModule } from "ng-zorro-antd/select";
import { UserManagementService } from "src/app/modules/user-management/services/user-management.service";
import { IBranch } from "src/shared/common/src/lib/interfaces/branch";
import { IUser } from "src/shared/common/src/lib/interfaces";
import { Editor, NgxEditorModule, Toolbar } from "ngx-editor";

@Component({
  selector: "app-create-send-group-msg-modal",
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
    NgxEditorModule,
  ],
  templateUrl: "./create-send-group-msg-modal.component.html",
  styleUrls: ["./create-send-group-msg-modal.component.less"],
})
export class CreateSendGroupMsgModalComponent implements OnInit {
  isLoading: boolean;
  listOfRoles: Array<{ label: string; value: string }> = [];
  listOfUsers: IUser[] = [];

  form: FormGroup<{
    message: FormControl<string>;
    branches: FormControl<string[]>;
    messageReceivers: FormControl<string[]>;
  }> = new FormGroup({
    message: new FormControl(
      { value: "", disabled: false },
      Validators.required
    ),
    branches: new FormControl(null, [Validators.required]),
    messageReceivers: new FormControl(null, [Validators.required]),
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

  onChange($event: IBranch[]): void {
    $event.forEach((r) => {
      r.roles.forEach((user) => {
        user.users.forEach((user) => {
          this.listOfUsers.push(user);
          console.log(this.listOfUsers);
        });
      });
    });
  }

  ngOnInit(): void {
    this.editor = new Editor();
  }

  editor: Editor;
  toolbar: Toolbar = [
    ["bold", "italic"],
    ["underline", "strike"],
    ["code", "blockquote"],
    ["ordered_list", "bullet_list"],
    [{ heading: ["h1", "h2", "h3", "h4", "h5", "h6"] }],
    ["link", "image"],
    ["text_color", "background_color"],
    ["align_left", "align_center", "align_right", "align_justify"],
  ];

  // form = new FormGroup({
  //   editorContent: new FormControl(
  //     { value: "", disabled: false },
  //     Validators.required()
  //   ),
  // });

  get doc(): AbstractControl {
    return this.form.get("message");
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
