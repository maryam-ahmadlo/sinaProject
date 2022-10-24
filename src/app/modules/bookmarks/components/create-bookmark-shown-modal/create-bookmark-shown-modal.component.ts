import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { IBookmark } from 'src/shared/common/src/lib/interfaces';

@Component({
  selector: 'app-create-bookmark-shown-modal',
  standalone: true,
  imports: [CommonModule,  NzModalModule,],
  templateUrl: './create-bookmark-shown-modal.component.html',
  styleUrls: ['./create-bookmark-shown-modal.component.css']
})
export class CreateBookmarkShownModalComponent implements OnInit{
  isLoading: boolean;
  @Input() bookmark: IBookmark;
  constructor(private modal: NzModalRef) {}
  ngOnInit(): void {
   console.log('bbbbbbbbbbbbb',this.bookmark);
   
  }

  destroyModal(): void {
    this.modal.destroy();
  }

}
