import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzListModule } from 'ng-zorro-antd/list';
import { IGroupMessage } from 'src/shared/common/src/lib/interfaces';

@Component({
  selector: 'leasing-notification-modal',
  templateUrl: './notification-modal.component.html',
  styles: [
    `
      .notification {
        max-height: 50vh;
        overflow-y: auto;
        min-height: 16vh;
        padding: 1rem;
      }
    `,
  ],
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    NzButtonModule,
    NzModalModule,
    NzTypographyModule,
    NzPageHeaderModule,
    NzListModule
  ],
})
export class NotificationModalComponent  {

  isLoading: boolean;
  @Input() item: IGroupMessage;

  constructor(private modal: NzModalRef, private httpClient:HttpClient) {}
  ngOnInit(): void {   
  }

  destroyModal(): void {
    this.modal.destroy();
  }

}
