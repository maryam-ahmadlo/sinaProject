import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IDraftRule } from "src/shared/common/src/lib/interfaces";
import { NzModalModule, NzModalRef } from "ng-zorro-antd/modal";

@Component({
  selector: "app-confirm-rule",
  standalone: true,
  imports: [CommonModule,NzModalModule],
  templateUrl: "./confirm-rule.component.html",
  styleUrls: ["./confirm-rule.component.css"],
})
export class ConfirmRuleComponent {
  @Input() item: IDraftRule;
  isLoading: boolean;

  constructor(private modal: NzModalRef) {}

  destroyModal(): void {
    this.modal.destroy();
  }
}
