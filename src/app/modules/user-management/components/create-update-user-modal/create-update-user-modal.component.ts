import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IUser } from 'src/shared/common/src/lib/interfaces';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-create-update-user-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-update-user-modal.component.html',
  styleUrls: ['./create-update-user-modal.component.css']
})
export class CreateUpdateUserModalComponent implements OnInit {
  isLoading: boolean;
  @Input() item: IUser;
  constructor(private modal: NzModalRef) {}

  ngOnInit(): void {
  }
  destroyModal(): void {
    this.modal.destroy();
  }
}
