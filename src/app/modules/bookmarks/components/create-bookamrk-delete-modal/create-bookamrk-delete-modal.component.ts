import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { IBookmark } from 'src/shared/common/src/lib/interfaces';

@Component({
  selector: 'app-create-bookamrk-delete-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-bookamrk-delete-modal.component.html',
  styleUrls: ['./create-bookamrk-delete-modal.component.css']
})
export class CreateBookamrkDeleteModalComponent implements OnInit {
  isLoading: boolean;
  @Input() bookmark:IBookmark;
  constructor(private modal: NzModalRef) { }

  ngOnInit(): void {
  }

  destroyModal(): void {
    this.modal.destroy();
  }
}
