import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FlexModule} from '@angular/flex-layout';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { RouterModule } from '@angular/router';
import { SearchLayoutComponent } from '../../pages';
@Component({
  selector: 'app-newest-result',
  standalone: true,
  imports: [CommonModule, FlexModule,SearchLayoutComponent,NzTypographyModule,RouterModule],
  templateUrl: './newest-result.component.html',
  styleUrls: ['./newest-result.component.less']
})
export class NewestResultComponent implements OnInit {


  constructor() { }
  

  ngOnInit(): void {

  }
}
