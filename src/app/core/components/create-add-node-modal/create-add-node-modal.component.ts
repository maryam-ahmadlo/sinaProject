import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NzModalModule, NzModalRef } from "ng-zorro-antd/modal";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { IFlatNode, ITreeNode } from "src/shared/common/src/lib/interfaces";

@Component({
  selector: "app-create-add-node-modal",
  standalone: true,
  imports: [
    CommonModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./create-add-node-modal.component.html",
  styleUrls: ["./create-add-node-modal.component.less"],
})
export class CreateAddNodeModalComponent implements OnInit {
  @Input() node: IFlatNode;
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
  ngOnInit(): void {


    this.form.get('level').setValue((this.node.level+2).toString());
  
  }

  destroyModal(): void {
    this.modal.destroy();
  }
}
