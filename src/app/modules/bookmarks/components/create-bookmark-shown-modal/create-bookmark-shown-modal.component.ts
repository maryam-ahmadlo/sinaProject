import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { IBookmark } from 'src/shared/common/src/lib/interfaces';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';

@Component({
  selector: 'app-create-bookmark-shown-modal',
  standalone: true,
  imports: [CommonModule,  NzModalModule,NzPageHeaderModule],
  templateUrl: './create-bookmark-shown-modal.component.html',
  styleUrls: ['./create-bookmark-shown-modal.component.css']
})
export class CreateBookmarkShownModalComponent implements OnInit{
  isLoading: boolean;
  @Input() item: IBookmark;
  constructor(private modal: NzModalRef) {}
  ngOnInit(): void { }

  destroyModal(): void {
    this.modal.destroy();
  }

}
