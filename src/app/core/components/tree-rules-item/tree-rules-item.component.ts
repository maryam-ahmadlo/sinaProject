import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NzTagModule } from "ng-zorro-antd/tag";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NzButtonModule } from "ng-zorro-antd/button";
import { TreeService } from "../../services/tree.service";
@Component({
  selector: "app-tree-rules-item",
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    NzIconModule,
    NzTagModule,
    NzPageHeaderModule,
    NzButtonModule,
  ],
  templateUrl: "./tree-rules-item.component.html",
  styleUrls: ["./tree-rules-item.component.less"],
})
export class TreeRulesItemComponent implements OnInit {
  constructor(private treeService: TreeService) {}

  ngOnInit(): void {}

  addBookmark() {
    this.treeService.addBookMark("111").subscribe((res) => console.log(res));
  }
}
