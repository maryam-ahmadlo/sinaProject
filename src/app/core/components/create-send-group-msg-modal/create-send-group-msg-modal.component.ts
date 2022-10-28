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
import { TextEditorComponent } from "../text-editor/text-editor.component";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IBranch } from "src/shared/common/src/lib/interfaces/branch";
import { Editor, NgxEditorModule, Toolbar } from "ngx-editor";
import { IUser } from "src/shared/common/src/lib/interfaces";

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
  listOfUsers: any = [];
  branch: any = [];

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

  constructor(private modal: NzModalRef, private httpClient: HttpClient) {
    this.httpClient.get<IBranch[]>("/url/branches").subscribe((r) => {
      for (let i = 0; i < r.length; i++) {
        let json = {
          title: r[i].name,
          value: r[i].code,
          key: r[i].id,
        };
        this.branch.push(json);
      }
    });

    this.httpClient
      .get<IUser[]>("/url/users", {
        headers: new HttpHeaders({
          accept: "application/json",
          Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
        }),
      })
      .subscribe((user) => {
        user.forEach((r) => {
          let json = {
            label: r.name,
            value: r.id,
          };
          this.listOfUsers.push(json);
        });
      });
  }

  destroyModal(): void {
    this.modal.destroy();
  }

  onChange($event: string[]): void {
    console.log($event);
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

  get doc(): AbstractControl {
    return this.form.get("message");
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
