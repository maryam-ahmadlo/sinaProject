import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchLayoutComponent } from './modules/search/pages';





@Component({
  selector: 'app-root',
  standalone:true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  imports:[SearchLayoutComponent,RouterModule,SearchLayoutComponent]
})
export class AppComponent {
  title = 'search-docs';
}
