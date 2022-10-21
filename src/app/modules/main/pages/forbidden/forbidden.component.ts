import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzResultModule } from 'ng-zorro-antd/result';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterModule } from '@angular/router';

@Component({
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.less'],
  standalone: true,
  imports: [
    CommonModule,
    NzResultModule,
    FlexLayoutModule,
    NzButtonModule,
    RouterModule,
  ],
})
export class ForbiddenComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
