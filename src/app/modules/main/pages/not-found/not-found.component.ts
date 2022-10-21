import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'leasing-angular-workspace-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.less'],
  standalone: true,
  imports: [
    CommonModule,
    NzResultModule,
    FlexLayoutModule,
    NzButtonModule,
    RouterModule,
  ],
})
export class NotFoundComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
