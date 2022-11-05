import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Router, RouterModule } from '@angular/router';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TreeComponent } from '../Tree/Tree.component';
import { StateService } from '../../services';
import { NzIconModule } from 'ng-zorro-antd/icon';



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
        NzIconModule,
       NzButtonModule,
       TreeComponent
    ],
})
export class LayoutSiderMenuComponent implements OnInit {
    roleAdmin:boolean=false;
    buttonValue:string='';

    constructor( private router: Router, private stateService: StateService,) {
        this.stateService.select((state) => state.me).subscribe((m)=>{
   
            if(m.roles.some((role)=> role.id==='ROLE_ADMIN')){
              this.roleAdmin=true;
              this.buttonValue='کارتابل شخصی ادمین ';
              
            }else{
              this.roleAdmin=false;
              this.buttonValue='کارتابل شخصی کاربر ';
              
            }
      console.log(this.roleAdmin);
      
          });
    }

    ngOnInit(): void {}

    PrivateCartable() {
        if(this.roleAdmin){
        this.router.navigate(["/", "admin", "private-cartable-admin"]);
        }else{
            this.router.navigate(["/", "customer", "private-cartable"]);
        }
      }
}
