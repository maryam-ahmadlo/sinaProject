import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  NzTreeViewModule,
} from "ng-zorro-antd/tree-view";

import { NzButtonModule } from "ng-zorro-antd/button";
import { NzTypographyModule } from "ng-zorro-antd/typography";
import { FlexModule } from "@angular/flex-layout";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzInputModule } from "ng-zorro-antd/input";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { NzModalModule, NzModalService } from "ng-zorro-antd/modal";
import { CreateAddNodeModalComponent } from "@core/components/create-add-node-modal/create-add-node-modal.component";
import { CreateDeleteNodeModalComponent } from "@core/components/create-delete-node-modal/create-delete-node-modal.component";
import { CreateEditNodeModalComponent } from "@core/components/create-edit-node-modal/create-edit-node-modal.component";
import { IFlatNode } from "src/shared/common/src/lib/interfaces/FlatNode";
import { FlatTreeControl, TreeControl } from "@angular/cdk/tree";
import { TreeService } from "../../services/tree.service";
import { CollectionViewer, DataSource, SelectionChange } from "@angular/cdk/collections";
import { BehaviorSubject, map, merge, Observable, of, tap } from "rxjs";



// const TREE_DATA: IFlatNode[] = [
//   {
//     id: 0,
//     label: 'Expand to load',
//     level: 0,
//     expandable: true
//   },
//   {
//     id: 1,
//     label: 'Expand to load',
//     level: 0,
//     expandable: true
//   }
// ];



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
    NzModalModule,
    NzDropDownModule,
    RouterModule,
  ],
})
export class TreeComponent {
  // private transformer = (node: ITreeNode): IFlatNode => {

  //   const existingNode = this.nestedNodeMap.get(node);
  //   const flatNode =
  //     existingNode && existingNode.key === node.uuid
  //       ? existingNode
  //       : {
  //           expandable: node.hasChildren,
  //           name: node.path.split('/')[2],
  //           key: node.uuid
  //         };
  //   flatNode.name = node.path.split('/')[2];
  //   this.flatNodeMap.set(flatNode, node);
  //   this.nestedNodeMap.set(node, flatNode);
  //   return flatNode;
  // };

  // flatNodeMap = new Map<IFlatNode, ITreeNode>();
  // nestedNodeMap = new Map<ITreeNode, IFlatNode>();
  // selectListSelection = new SelectionModel<IFlatNode>(true);


  // treeControl = new FlatTreeControl<IFlatNode>(
  //   (node) => Number(node.key),
  //   (node) => node.expandable
  // );
  // treeFlattener = new NzTreeFlattener(
  //   this.transformer,
  //   (node) => Number(node.key),
  //   (node) => node.expandable,
  //   (node) => {
  //      this.treeService.getChildren(node.path).subscribe((r)=>{
  //       console.log('rrr',r);
       
        
  //     })
  //   }

  // );

  // //dataSource = new NzTreeFlatDataSource(this.treeControl, this.treeFlattener);

  // hasChild = (_: number, node: IFlatNode): boolean => node.expandable;
  // hasNoContent = (_: number, node: IFlatNode): boolean => node.name === "";
  // trackBy = (_: number, node: IFlatNode): string => `${node.key}-${node.name}`;

  // delete(node: IFlatNode): void {
  //   const originNode = this.flatNodeMap.get(node);

  //   const dfsParentNode = (): ITreeNode | null => {
  //     const stack = [...this.tree];
  //     while (stack.length > 0) {
  //       const n = stack.pop()!;
  //       if (n.children) {
  //         if (n.children.find((e) => e === originNode)) {
  //           return n;
  //         }

  //         for (let i = n.children.length - 1; i >= 0; i--) {
  //           stack.push(n.children[i]);
  //         }
  //       }
  //     }
  //     return null;
  //   };

  //   const parentNode = dfsParentNode();
  //   if (parentNode && parentNode.children) {
  //     parentNode.children = parentNode.children.filter((e) => e !== originNode);
  //   }

  //  this.dataSource.setData(this.tree);
  // }


  tree: IFlatNode[];
  dataSource:any;
  treeControl = new FlatTreeControl<IFlatNode>(
    node => node.level,
    node => node.expandable
  );





  hasChild = (_: number, node: IFlatNode): boolean => node.expandable;

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService,
    protected treeService:TreeService,
    ) {

      this.activatedRoute.data.subscribe(({ tree }) => {
        this.tree={...tree.folder,level:0, label:tree.folder.path.split('/')[2], id: tree.folder.uuid, expandable:tree.folder.hasChildren};
      console.log(this.tree);
      
      
      });

      this.dataSource = new DynamicDatasource(this.treeControl,this.tree,treeService);
  }

 

  createAddNodeModal(node: any) {
    this.modalService.create({
      nzTitle: "افزودن درختواره ",
      nzContent: CreateAddNodeModalComponent,
      nzComponentParams: {
        node,
      },
      nzFooter: [
        {
          label: "بستن",
          onClick: (componentInstance) => componentInstance.destroyModal(),
        },
        {
          label: "ثبت",
          type: "primary",
          onClick: (componentInstance) =>
            this.handleAddTreeNode(componentInstance),
          loading: (componentInstance) => componentInstance.isLoading,
        },
      ],
    });
  }

  handleAddTreeNode(componentInstance: any) {
    componentInstance.isLoading = true;

  }

  createDeleteNodeModal(node: any) {
    this.modalService.create({
      nzTitle: "حذف درختواره ",
      nzContent: CreateDeleteNodeModalComponent,
      nzComponentParams: {
        node,
      },
      nzFooter: [
        {
          label: "بستن",
          onClick: (componentInstance) => componentInstance.destroyModal(),
        },
        {
          label: "تایید",
          type: "primary",
          onClick: (componentInstance) =>
            this.handleDeleteTreeNode(componentInstance),
          loading: (componentInstance) => componentInstance.isLoading,
        },
      ],
    });
  }

  handleDeleteTreeNode(componentInstance: any) {
   // this.treeService.deleteNode(uuid);
  }

  createEditNodeModal(node: any) {
    this.modalService.create({
      nzTitle: "ویرایش درختواره ",
      nzContent: CreateEditNodeModalComponent,
      nzComponentParams: {
        node,
      },
      nzFooter: [
        {
          label: "بستن",
          onClick: (componentInstance) => componentInstance.destroyModal(),
        },
        {
          label: "ثبت",
          type: "primary",
          onClick: (componentInstance) =>
            this.handleRenameTreeNode(componentInstance),
          loading: (componentInstance) => componentInstance.isLoading,
        },
      ],
    });
  }

  handleRenameTreeNode(componentInstance:any){

    //this.treeService.renameNode(uuid,name).subscribe((r)=>console.log(r))
  }
}




export class DynamicDatasource implements DataSource<IFlatNode> {
   getChildren(node: IFlatNode): Observable<IFlatNode[]> {
  let data;
     this.treeService.getChildren(node.id.toString()).subscribe((r)=> data=r);
     return data
  }
  private flattenedData: BehaviorSubject<IFlatNode[]>;
  private childrenLoadedSet = new Set<IFlatNode>();

  constructor(private treeControl: TreeControl<IFlatNode>, initData: IFlatNode[],protected treeService:TreeService,) {
    this.flattenedData = new BehaviorSubject<IFlatNode[]>(initData);
    treeControl.dataNodes = initData;
  }

  connect(collectionViewer: CollectionViewer): Observable<IFlatNode[]> {
    let changes = [
      collectionViewer.viewChange,
      this.treeControl.expansionModel.changed.pipe(tap(change => this.handleExpansionChange(change))),
      this.flattenedData
    ];
    return merge(changes).pipe(map(() => this.expandFlattenedNodes(this.flattenedData.getValue())));
  }

  expandFlattenedNodes(nodes: IFlatNode[]): IFlatNode[] {
    const treeControl = this.treeControl;
    const results: IFlatNode[] = [];
    const currentExpand: boolean[] = [];
    currentExpand[0] = true;

    nodes.forEach(node => {
      let expand = true;
      for (let i = 0; i <= treeControl.getLevel(node); i++) {
        expand = expand && currentExpand[i];
      }
      if (expand) {
        results.push(node);
      }
      if (treeControl.isExpandable(node)) {
        currentExpand[treeControl.getLevel(node) + 1] = treeControl.isExpanded(node);
      }
    });
    return results;
  }

  handleExpansionChange(change: SelectionChange<IFlatNode>): void {
    if (change.added) {
      change.added.forEach(node => this.loadChildren(node));
    }
  }

  loadChildren(node: IFlatNode): void {
    if (this.childrenLoadedSet.has(node)) {
      return;
    }
    node.loading = true;
    this.getChildren(node).subscribe(children => {
      node.loading = false;
      const flattenedData = this.flattenedData.getValue();
      const index = flattenedData.indexOf(node);
      if (index !== -1) {
        flattenedData.splice(index + 1, 0, ...children);
        this.childrenLoadedSet.add(node);
      }
      this.flattenedData.next(flattenedData);
    });
  }

  disconnect(): void {
    this.flattenedData.complete();
  }
}

function delay(arg0: number): import("rxjs").OperatorFunction<{ id: number; label: string; level: number; expandable: boolean; }[], IFlatNode[]> {
  throw new Error("Function not implemented.");
}
