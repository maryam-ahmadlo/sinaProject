import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'leasing-notification-alert',
  templateUrl: './notification-alert.component.html',
  styleUrls: ['./notification-alert.component.less'],
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    NzTypographyModule,
    NzBadgeModule,
    NzButtonModule,
    
  ],
})
export class NotificationAlertComponent implements OnInit {
  @Input('notification') data: any;
  constructor() {}

  ngOnInit(): void {}
}
