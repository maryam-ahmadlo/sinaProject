import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NzModalRef } from "ng-zorro-antd/modal";
import { IBookmark } from "src/shared/common/src/lib/interfaces";
import { NzFormModule } from "ng-zorro-antd/form";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { NzInputModule } from "ng-zorro-antd/input";

@Component({
  selector: "app-create-bookmark-rename-modal",
  standalone: true,
  imports: [CommonModule, NzFormModule, ReactiveFormsModule,NzInputModule],
  templateUrl: "./create-bookmark-rename-modal.component.html",
  styleUrls: ["./create-bookmark-rename-modal.component.css"],
})
export class CreateBookmarkRenameModalComponent implements OnInit {
  isLoading: boolean;
  @Input() bookmark: IBookmark;
  form: FormGroup<{
    name: FormControl<string>;
  }> = new FormGroup({
    name: new FormControl(null),
  });
  constructor(private modal: NzModalRef) {}

  ngOnInit(): void {}

  destroyModal(): void {
    this.modal.destroy();
  }
}
