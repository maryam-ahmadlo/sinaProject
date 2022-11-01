import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NzModalRef } from "ng-zorro-antd/modal";
import { IUser } from "src/shared/common/src/lib/interfaces";

@Component({
  selector: "app-create-delete-user-modal",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./create-delete-user-modal.component.html",
  styleUrls: ["./create-delete-user-modal.component.css"],
})
export class CreateDeleteUserModalComponent implements OnInit {
  isLoading: boolean;
  @Input() item: IUser;

  constructor(private modal: NzModalRef) {}

  ngOnInit(): void {}

  destroyModal(): void {
    this.modal.destroy();
  }
}
