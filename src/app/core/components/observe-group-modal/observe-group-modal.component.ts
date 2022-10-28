import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NzModalModule, NzModalRef } from "ng-zorro-antd/modal";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { HttpClient } from "@angular/common/http";
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
  isVisible = false;
  isConfirmLoading = false;
  isLoading: boolean;
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfUsers: any = [];
  branch: any = [];

  form: FormGroup<{
    branches: FormControl<string[]>;
    messageReceivers: FormControl<string[]>;
  }> = new FormGroup({
    branches: new FormControl(null, [Validators.required]),
    messageReceivers: new FormControl(null, [Validators.required]),
  });

  constructor(private modal: NzModalRef, private httpClient: HttpClient) {
    this.httpClient.get<IBranch[]>("/url/branches").subscribe((r) => {
      // for (let i = 0; i < r.length; i++) {
      let json = {
        // title: r[i].name,
        // value: r[i].code,
        // key: r[i].id,
        title: "okmAdmin",
        value: "okmAdmin",
        key: "okmAdmin",
      };
      this.branch.push(json);
      console.log(this.branch);

      // }
    });

    this.httpClient
      .get<any>("/url/users?page=0&size=10&sort=")
      .subscribe((r) => {
        for (let i = 0; i < r.content.length; i++) {
          let json = {
            label: r.content[i]["id"],
            value: r.content[i]["id"],
          };
          this.listOfUsers.push(json);
        }
      });
  }

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
  nodes = [
    {
      title: "Node1",
      value: "0-0",
      key: "0-0",
      children: [
        {
          title: "Child Node1",
          value: "0-0-0",
          key: "0-0-0",
          isLeaf: true,
        },
      ],
    },
    {
      title: "Node2",
      value: "0-1",
      key: "0-1",
      children: [
        {
          title: "Child Node3",
          value: "0-1-0",
          key: "0-1-0",
          isLeaf: true,
        },
        {
          title: "Child Node4",
          value: "0-1-1",
          key: "0-1-1",
          isLeaf: true,
        },
        {
          title: "Child Node5",
          value: "0-1-2",
          key: "0-1-2",
          isLeaf: true,
        },
      ],
    },
  ];

  onChange($event: string[]): void {
    console.log($event);
  }
}
