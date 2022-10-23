import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { SearchLayoutComponent } from 'src/app/modules/main/pages/search/pages';



@Component({
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.less'],
  standalone: true,
  imports: [
    CommonModule,
   SearchLayoutComponent,
   RouterModule,
   NzPageHeaderModule
  ],
})
export class CustomerDashboardComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    // this.router.navigate(['search'])
  }

  
}
