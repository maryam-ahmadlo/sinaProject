import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NzTagModule } from "ng-zorro-antd/tag";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
@Component({
  selector: "app-tree-rules-item",
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    NzIconModule,
    NzTagModule,
    NzPageHeaderModule,
  ],
  templateUrl: "./tree-rules-item.component.html",
  styleUrls: ["./tree-rules-item.component.css"],
})
export class TreeRulesItemComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
