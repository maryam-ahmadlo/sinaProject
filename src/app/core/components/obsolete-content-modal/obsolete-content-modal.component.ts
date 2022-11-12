import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NzModalRef } from "ng-zorro-antd/modal";
import {  INotified } from "src/shared/common/src/lib/interfaces";

@Component({
  selector: "app-obsolete-content-modal",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./obsolete-content-modal.component.html",
  styleUrls: ["./obsolete-content-modal.component.css"],
})
export class ObsoleteContentModalComponent {
  @Input() node: INotified;
  isLoading: boolean;

  constructor(private modal: NzModalRef) {}

  destroyModal(): void {
    this.modal.destroy();
  }
}
