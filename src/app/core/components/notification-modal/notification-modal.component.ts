import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';

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
    NzPageHeaderModule
  ],
})
export class NotificationModalComponent  {

  isLoading: boolean;
  @Input() item: any;
  constructor(private modal: NzModalRef) {}
  ngOnInit(): void {
   console.log('bbbbbbbbbbbbb',this.item);
   
  }

  destroyModal(): void {
    this.modal.destroy();
  }

  // @Input() notification: any;
  // isLoading: boolean;

  // constructor(
  //   private modal: NzModalRef,
  //   private httpClient: HttpClient,
  //   private message: NzMessageService
  // ) {}

  // ngOnInit(): void {
  //   if (this.notification.delivered === false) {
  //     this.read(this.notification.ID).subscribe({
  //       next: () => this.handleReadRes(),
  //       error: () => this.message.info('پیام قبلا خوانده شده است'),
  //     });
  //   }
  // }

  // destroyModal() {
  //   this.modal.destroy();
  // }
  // deleteMessage() {
  //   this.delete(this.notification.ID).subscribe({
  //     next: () => this.handleDeleteRes(),
  //     error: () => this.message.error('دوباره تلاش کنید'),
  //   });
  // }

  // handleDeleteRes() {
  //   this.message.success('پیام با موفقیت پاک شد');
  //   this.destroyModal();
  // }

  // handleReadRes() {
  //   this.message.success('پیام با موفقیت بارگزاری شد');
  // }

  // read(id: number) {
  //   return this.httpClient.get(`/api/notifications/${id}`);
  // }

  // delete(id: number) {
  //   return this.httpClient.delete(`/api/notifications/${id}`);
  // }
}
