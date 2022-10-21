import { SelectionModel } from "@angular/cdk/collections";
import { FlatTreeControl } from "@angular/cdk/tree";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { NzTreeFlatDataSource, NzTreeFlattener } from "ng-zorro-antd/tree-view";
import { NzTreeViewModule } from "ng-zorro-antd/tree-view";
import { FlatNode } from "./FlatNode";
import { TreeNode } from "./TreeNode";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzTypographyModule } from "ng-zorro-antd/typography";
import { FlexModule } from "@angular/flex-layout";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzInputModule } from "ng-zorro-antd/input";
import { RouterModule } from "@angular/router";

const TREE_DATA: TreeNode[] = [
  {
    // name: "root",
    // key: "0",
    // children: [
    //   {
        name: "مجموعه مقررات بانک مرکزی",
        key: "1",
        children: [
          {
            name: "مقررات حوزه نظارت",
            key: "1-0",
            children: [],
          },
          {
            name: "ناظر بر فعالیت",
            key: "1-1",
            children: [],
          },
          {
            name: "مقررات نهادی",
            key: "1-2",
            children: [],
          },
          {
            name: "مقررات احتیاطی",
            key: "1-3",
            children: [
              {
                name: "بخشنامه های مبتنی بر قوانین مرجع",
                key: "1-3-0",
              },
              {
                name: "بخشنامه های پژوهش محور",
                key: "1-3-1",
              },
            ],
          },
        ],
      },
      {
        key: "2",
        name: "آیین نامه ها و دستورالعمل ها",
        children: [
          { name: "آیین نامه", key: "2-0" },
          {
            name: "دستورالعمل",
            key: "2-1",
          },
          {
            name: "قوانین مرجع",
            key: "2-2",
          },
        ],
      },
  //   ],
  // },
];

@Component({
  selector: "app-tree",
  templateUrl: "./Tree.component.html",
  styleUrls: ["./Tree.component.less"],
  standalone: true,
  imports: [
    CommonModule,
    NzTreeViewModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzTypographyModule,
    FlexModule,
    NzMenuModule,
    NzDropDownModule,
    RouterModule
  ],
})
export class TreeComponent {
  private transformer = (node: TreeNode, level: number): FlatNode => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.key === node.key
        ? existingNode
        : {
            expandable: true,
            name: node.name,
            level,
            key: node.key,
          };
    flatNode.name = node.name;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  treeData = TREE_DATA;
  flatNodeMap = new Map<FlatNode, TreeNode>();
  nestedNodeMap = new Map<TreeNode, FlatNode>();
  selectListSelection = new SelectionModel<FlatNode>(true);

  treeControl = new FlatTreeControl<FlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );
  treeFlattener = new NzTreeFlattener(
    this.transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new NzTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: FlatNode): boolean => node.expandable;
  hasNoContent = (_: number, node: FlatNode): boolean => node.name === "";
  trackBy = (_: number, node: FlatNode): string => `${node.key}-${node.name}`;

  delete(node: FlatNode): void {
    const originNode = this.flatNodeMap.get(node);

    const dfsParentNode = (): TreeNode | null => {
      const stack = [...this.treeData];
      while (stack.length > 0) {
        const n = stack.pop()!;
        if (n.children) {
          if (n.children.find((e) => e === originNode)) {
            return n;
          }

          for (let i = n.children.length - 1; i >= 0; i--) {
            stack.push(n.children[i]);
          }
        }
      }
      return null;
    };

    const parentNode = dfsParentNode();
    if (parentNode && parentNode.children) {
      parentNode.children = parentNode.children.filter((e) => e !== originNode);
    }

    this.dataSource.setData(this.treeData);
  }
  constructor() {
    this.dataSource.setData(this.treeData);
    this.treeControl.expandAll();
  }
  addNewNode(node: FlatNode): void {
    const parentNode = this.flatNodeMap.get(node);
    if (parentNode) {
      parentNode.children = parentNode.children || [];
      parentNode.children.push({
        name: "",
        key: `${parentNode.key}-${parentNode.children.length}`,
      });
      this.dataSource.setData(this.treeData);
      this.treeControl.expand(node);
    }
  }

  saveNode(node: FlatNode, value: string): void {
    const nestedNode = this.flatNodeMap.get(node);
    if (nestedNode) {
      nestedNode.name = value;
      this.dataSource.setData(this.treeData);
    }
  }
}
