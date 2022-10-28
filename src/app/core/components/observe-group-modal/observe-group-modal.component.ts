import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NzModalModule, NzModalRef } from "ng-zorro-antd/modal";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
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
export class ObserveGroupModalComponent implements OnInit {
  isLoading: boolean;
  listOfOption: Array<{ label: string; value: string }> = [];

  form: FormGroup<{
    content: FormControl<string>;
    value: FormControl<string[]>;
    listOfTagOptions: FormControl<string[]>;
  }> = new FormGroup({
    content: new FormControl(null),
    value: new FormControl(null, [Validators.required]),
    listOfTagOptions: new FormControl(null, [Validators.required]),
  });
  isVisible = false;
  isConfirmLoading = false;

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

  ngOnInit(): void {
    const children: Array<{ label: string; value: string }> = [];
    for (let i = 10; i < 36; i++) {
      children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
    }
    this.listOfOption = children;
  }
}
