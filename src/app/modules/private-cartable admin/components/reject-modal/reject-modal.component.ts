import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NzModalRef } from "ng-zorro-antd/modal";
import { IDraftRule } from "src/shared/common/src/lib/interfaces";

@Component({
  selector: "app-reject-modal",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./reject-modal.component.html",
  styleUrls: ["./reject-modal.component.css"],
})
export class RejectModalComponent {
  @Input() item: IDraftRule;
  isLoading: boolean;

  constructor(private modal: NzModalRef) {}

  destroyModal(): void {
    this.modal.destroy();
  }
}
