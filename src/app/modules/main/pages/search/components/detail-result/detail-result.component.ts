import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexModule } from '@angular/flex-layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
@Component({
  selector: 'app-detail-result',
  standalone: true,
  imports: [CommonModule,FlexModule,NzPageHeaderModule],
  templateUrl: './detail-result.component.html',
  styleUrls: ['./detail-result.component.less']
})
export class DetailResultComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
