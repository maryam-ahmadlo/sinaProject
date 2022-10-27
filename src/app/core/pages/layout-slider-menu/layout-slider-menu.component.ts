import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TreeComponent } from '../Tree/Tree.component';



@Component({
    selector: 'app-layout-slider-menu',
    templateUrl: './layout-slider-menu.component.html',
    styleUrls: ['./layout-slider-menu.component.less'],
    standalone: true,
    imports: [
        CommonModule,
        FlexLayoutModule,
        NzPageHeaderModule,
        RouterModule,
       NzButtonModule,
       TreeComponent
    ],
})
export class LayoutSiderMenuComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
