import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-create-delete-node-modal',
  standalone: true,
  imports: [CommonModule,NzModalModule],
  templateUrl: './create-delete-node-modal.component.html',
  styleUrls: ['./create-delete-node-modal.component.less']
})
export class CreateDeleteNodeModalComponent {
  @Input() node: any;
  isLoading: boolean;

  constructor(private modal: NzModalRef) {}

  destroyModal(): void {
    this.modal.destroy();
  }
}
