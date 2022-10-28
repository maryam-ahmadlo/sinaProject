import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlexModule } from "@angular/flex-layout";
import { Router, RouterModule } from "@angular/router";
import { NzTagModule } from "ng-zorro-antd/tag";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { NewestResultComponent } from "../newest-result/newest-result.component";

@Component({
  selector: "app-search-result",
  standalone: true,
  imports: [
    CommonModule,
    FlexModule,
    RouterModule,
    NzTagModule,
    NzMenuModule,
    NewestResultComponent,
  ],
  templateUrl: "./search-result.component.html",
  styleUrls: ["./search-result.component.less"],
})
export class SearchResultComponent implements OnInit {
  constructor(private router: Router) {}
  @Input() items: any ;

  ngOnInit(): void {
    console.log(this.items);
    
    this.router.navigate([ '/','customer','dashboard','newest']);
  }
}
