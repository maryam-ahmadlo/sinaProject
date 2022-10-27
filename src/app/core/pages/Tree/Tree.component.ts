// import { CommonModule } from "@angular/common";
// import { Component, OnInit } from "@angular/core";
// import {
//   NzTreeFlatDataSource,
//   NzTreeFlattener,
//   NzTreeViewModule,
// } from "ng-zorro-antd/tree-view";

// import { NzButtonModule } from "ng-zorro-antd/button";
// import { NzTypographyModule } from "ng-zorro-antd/typography";
// import { FlexModule } from "@angular/flex-layout";
// import { NzMenuModule } from "ng-zorro-antd/menu";
// import { NzDropDownModule } from "ng-zorro-antd/dropdown";
// import { NzIconModule } from "ng-zorro-antd/icon";
// import { NzInputModule } from "ng-zorro-antd/input";
// import { ActivatedRoute, RouterModule } from "@angular/router";
// import { NzModalModule, NzModalService } from "ng-zorro-antd/modal";
// import { CreateAddNodeModalComponent } from "@core/components/create-add-node-modal/create-add-node-modal.component";
// import { CreateDeleteNodeModalComponent } from "@core/components/create-delete-node-modal/create-delete-node-modal.component";
// import { CreateEditNodeModalComponent } from "@core/components/create-edit-node-modal/create-edit-node-modal.component";
// import { IFlatNode } from "src/shared/common/src/lib/interfaces/FlatNode";
// import { FlatTreeControl } from "@angular/cdk/tree";
// import { SelectionModel } from "@angular/cdk/collections";
// import { TreeService } from "../../services/tree.service";

// // const TREE_DATA: TreeNode[] = [
// //   {
// //     // name: "root",
// //     // key: "0",
// //     // children: [
// //     //   {
// //     name: "مجموعه مقررات بانک مرکزی",
// //     key: "1",
// //     children: [
// //       {
// //         name: "مقررات حوزه نظارت",
// //         key: "1-0",
// //         children: [],
// //       },
// //       {
// //         name: "ناظر بر فعالیت",
// //         key: "1-1",
// //         children: [],
// //       },
// //       {
// //         name: "مقررات نهادی",
// //         key: "1-2",
// //         children: [],
// //       },
// //       {
// //         name: "مقررات احتیاطی",
// //         key: "1-3",
// //         children: [
// //           {
// //             name: "بخشنامه های مبتنی بر قوانین مرجع",
// //             key: "1-3-0",
// //           },
// //           {
// //             name: "بخشنامه های پژوهش محور",
// //             key: "1-3-1",
// //           },
// //         ],
// //       },
// //     ],
// //   },
// //   {
// //     key: "2",
// //     name: "آیین نامه ها و دستورالعمل ها",
// //     children: [
// //       { name: "آیین نامه", key: "2-0" },
// //       {
// //         name: "دستورالعمل",
// //         key: "2-1",
// //       },
// //       {
// //         name: "قوانین مرجع",
// //         key: "2-2",
// //       },
// //     ],
// //   },
// //   //   ],
// //   // },
// // ];



// @Component({
//   selector: "app-tree",
//   templateUrl: "./Tree.component.html",
//   styleUrls: ["./Tree.component.less"],
//   standalone: true,
//   imports: [
//     CommonModule,
//     NzTreeViewModule,
//     NzButtonModule,
//     NzIconModule,
//     NzInputModule,
//     NzTypographyModule,
//     FlexModule,
//     NzMenuModule,
//     NzModalModule,
//     NzDropDownModule,
//     RouterModule,
//   ],
// })
// export class TreeComponent implements OnInit {
//   private transformer = (node: ITreeNode, level: number): IFlatNode => {

//     const existingNode = this.nestedNodeMap.get(node);
//     const flatNode =
//       existingNode && existingNode.key === node.uuid
//         ? existingNode
//         : {
//             expandable: node.hasChildren,
//             name: node.path.split('/')[2],
//             level,
//             key: node.uuid
//           };
//     flatNode.name = node.path.split('/')[2];
//     this.flatNodeMap.set(flatNode, node);
//     this.nestedNodeMap.set(node, flatNode);
//     return flatNode;
//   };

//   flatNodeMap = new Map<IFlatNode, ITreeNode>();
//   nestedNodeMap = new Map<ITreeNode, IFlatNode>();
//   selectListSelection = new SelectionModel<IFlatNode>(true);


//   treeControl = new FlatTreeControl<IFlatNode>(
//     (node) => node.level,
//     (node) => node.expandable
//   );
//   // treeFlattener = new NzTreeFlattener(
//   //   this.transformer,
//   //   (node) => node.level,
//   //   (node) => node.expandable,
//   //   (node) => {this.httpClient.get('')}
//   // );

//   //dataSource = new NzTreeFlatDataSource(this.treeControl, this.treeFlattener);

//   hasChild = (_: number, node: IFlatNode): boolean => node.expandable;
//   hasNoContent = (_: number, node: IFlatNode): boolean => node.name === "";
//   trackBy = (_: number, node: IFlatNode): string => `${node.key}-${node.name}`;

//   // delete(node: IFlatNode): void {
//   //   const originNode = this.flatNodeMap.get(node);

//   //   const dfsParentNode = (): ITreeNode | null => {
//   //     const stack = [...this.tree];
//   //     while (stack.length > 0) {
//   //       const n = stack.pop()!;
//   //       if (n.children) {
//   //         if (n.children.find((e) => e === originNode)) {
//   //           return n;
//   //         }

//   //         for (let i = n.children.length - 1; i >= 0; i--) {
//   //           stack.push(n.children[i]);
//   //         }
//   //       }
//   //     }
//   //     return null;
//   //   };

//   //   const parentNode = dfsParentNode();
//   //   if (parentNode && parentNode.children) {
//   //     parentNode.children = parentNode.children.filter((e) => e !== originNode);
//   //   }

//   //  this.dataSource.setData(this.tree);
//   // }

//   tree: ITreeNode[];

//   constructor(
//     private activatedRoute: ActivatedRoute,
//     private modalService: NzModalService,
//     private treeService:TreeService,
//     private httpClient:HttpClient
//   ) {
//     // this.activatedRoute.data.subscribe(({ tree }) => {
//     //   this.tree = tree.folder;
//     // });
//     //this.dataSource.setData(this.tree);
//     // this.treeControl.expandAll();
    
//     // console.log('treeeeee',this.tree);

//     //console.log("dataSource", this.dataSource);
//   }
//   ngOnInit(): void {
//     this.treeService.getAllNodes().subscribe((r)=>console.log(r))
//     //  this.httpClient.get("/api/folder/getChildren?fdIdId=okm:categories", {
//     //     headers: new HttpHeaders({
//     //       accept: "application/json",
//     //       Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
//     //     }),
//     //     params: { fldId: "/okm:categories" },
//     //   }).subscribe((r)=>console.log('rrr',r)
//     //   );

//   }

//   // addNewNode(node: FlatNode): void {
//   //   const parentNode = this.flatNodeMap.get(node);
//   //   if (parentNode) {
//   //     parentNode.children = parentNode.children || [];
//   //     parentNode.children.push({
//   //       name: "",
//   //       key: `${parentNode.key}-${parentNode.children.length}`,
//   //     });
//   //     this.dataSource.setData(this.treeData);
//   //     this.treeControl.expand(node);
//   //   }
//   // }

//   // saveNode(node: FlatNode, value: string): void {
//   //   const nestedNode = this.flatNodeMap.get(node);
//   //   if (nestedNode) {
//   //     nestedNode.name = value;
//   //     this.dataSource.setData(this.treeData);
//   //   }
//   // }


//   createAddNodeModal(node: any) {
//     this.modalService.create({
//       nzTitle: "افزودن درختواره ",
//       nzContent: CreateAddNodeModalComponent,
//       nzComponentParams: {
//         node,
//       },
//       nzFooter: [
//         {
//           label: "بستن",
//           onClick: (componentInstance) => componentInstance.destroyModal(),
//         },
//         {
//           label: "ثبت",
//           type: "primary",
//           onClick: (componentInstance) =>
//             this.handleAddTreeNode(componentInstance),
//           loading: (componentInstance) => componentInstance.isLoading,
//         },
//       ],
//     });
//   }

//   handleAddTreeNode(componentInstance: any) {
//     componentInstance.isLoading = true;
//   }

//   createDeleteNodeModal(node: any) {
//     this.modalService.create({
//       nzTitle: "حذف درختواره ",
//       nzContent: CreateDeleteNodeModalComponent,
//       nzComponentParams: {
//         node,
//       },
//       nzFooter: [
//         {
//           label: "بستن",
//           onClick: (componentInstance) => componentInstance.destroyModal(),
//         },
//         {
//           label: "تایید",
//           type: "primary",
//           onClick: (componentInstance) =>
//             this.handleDeleteTreeNode(componentInstance),
//           loading: (componentInstance) => componentInstance.isLoading,
//         },
//       ],
//     });
//   }

//   handleDeleteTreeNode(componentInstance: any) {
//     // this.treeService.deleteNode(uuid);
//   }

//   createEditNodeModal(node: any) {
//     this.modalService.create({
//       nzTitle: "ویرایش درختواره ",
//       nzContent: CreateEditNodeModalComponent,
//       nzComponentParams: {
//         node,
//       },
//       nzFooter: [
//         {
//           label: "بستن",
//           onClick: (componentInstance) => componentInstance.destroyModal(),
//         },
//         {
//           label: "ثبت",
//           type: "primary",
//           onClick: (componentInstance) =>
//             this.handleRenameTreeNode(componentInstance),
//           loading: (componentInstance) => componentInstance.isLoading,
//         },
//       ],
//     });
//   }

//   handleRenameTreeNode(componentInstance: any) {
//     //this.treeService.renameNode(uuid,name).subscribe((r)=>console.log(r))
//   }
// }

// function getChildren(node: IFlatNode) {
//   let treeData: IFlatNode[] = [];
//   return httpClient.get<ITreeNode>("/api/folder/getChildren", {
//       headers: new HttpHeaders({
//         accept: "application/json",
//         Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
//       }),
//       params: { fldId: `/okm:categories/${node.id}` },
//     })
//     .pipe((res) => {
//       console.log("res", res);
//       res.forEach((v) => {
//         let json = {
//           id: v.uuid,
//           label: v.path.split("/")[2],
//           level: 0,
//           expandable: v.hasChildren,
//         };
//         treeData.push(json);
//         treeData.push(json);
//       });

//       console.log("of(treeData)", of(treeData));

//       return of(treeData);
//     });
// }

// class DynamicDatasource implements DataSource<IFlatNode> {
//   private flattenedData: BehaviorSubject<IFlatNode[]>;
//   private childrenLoadedSet = new Set<IFlatNode>();

//   constructor(
//     private treeControl: TreeControl<IFlatNode>,
//     initData: IFlatNode[],
//     private treeService: TreeService
//   ) {
//     this.flattenedData = new BehaviorSubject<IFlatNode[]>(initData);
//     treeControl.dataNodes = initData;
//   }

//   connect(collectionViewer: CollectionViewer): Observable<IFlatNode[]> {
//     const changes = [
//       collectionViewer.viewChange,
//       this.treeControl.expansionModel.changed.pipe(
//         tap((change) => this.handleExpansionChange(change))
//       ),
//       this.flattenedData,
//     ];
//     return merge(changes).pipe(
//       map(() => this.expandFlattenedNodes(this.flattenedData.getValue()))
//     );
//   }

//   expandFlattenedNodes(nodes: IFlatNode[]): IFlatNode[] {
//     const treeControl = this.treeControl;
//     const results: IFlatNode[] = [];
//     const currentExpand: boolean[] = [];
//     currentExpand[0] = true;

//     nodes.forEach((node) => {
//       let expand = true;
//       for (let i = 0; i <= treeControl.getLevel(node); i++) {
//         expand = expand && currentExpand[i];
//       }
//       if (expand) {
//         results.push(node);
//       }
//       if (treeControl.isExpandable(node)) {
//         currentExpand[treeControl.getLevel(node) + 1] =
//           treeControl.isExpanded(node);
//       }
//     });
//     return results;
//   }

//   handleExpansionChange(change: SelectionChange<IFlatNode>): void {
//     if (change.added) {
//       change.added.forEach((node) => this.loadChildren(node));
//     }
//   }

//   loadChildren(node: IFlatNode): void {
//     if (this.childrenLoadedSet.has(node)) {
//       return;
//     }
//     node.loading = true;

//     getChildren(node).subscribe((children) => {
//       node.loading = false;
//       const flattenedData = this.flattenedData.getValue();
//       const index = flattenedData.indexOf(node);
//       if (index !== -1) {
//         flattenedData.splice(index + 1, 0, ...children);
//         this.childrenLoadedSet.add(node);
//       }
//       this.flattenedData.next(flattenedData);
//     });
//   }

//   disconnect(): void {
//     this.flattenedData.complete();
//   }
// }




// export class DynamicDatasource implements DataSource<IFlatNode> {
//    getChildren(node: IFlatNode): Observable<IFlatNode[]> {
//   let data;
//      this.treeService.getChildren(node.id.toString()).subscribe((r)=> data=r);
//      return data
//   }
//   private flattenedData: BehaviorSubject<IFlatNode[]>;
//   private childrenLoadedSet = new Set<IFlatNode>();

//   constructor(private treeControl: TreeControl<IFlatNode>, initData: IFlatNode[],protected treeService:TreeService,) {
//     this.flattenedData = new BehaviorSubject<IFlatNode[]>(initData);
//     treeControl.dataNodes = initData;
//   }

//   connect(collectionViewer: CollectionViewer): Observable<IFlatNode[]> {
//     let changes = [
//       collectionViewer.viewChange,
//       this.treeControl.expansionModel.changed.pipe(tap(change => this.handleExpansionChange(change))),
//       this.flattenedData
//     ];
//     return merge(changes).pipe(map(() => this.expandFlattenedNodes(this.flattenedData.getValue())));
//   }

//   expandFlattenedNodes(nodes: IFlatNode[]): IFlatNode[] {
//     const treeControl = this.treeControl;
//     const results: IFlatNode[] = [];
//     const currentExpand: boolean[] = [];
//     currentExpand[0] = true;

//     nodes.forEach(node => {
//       let expand = true;
//       for (let i = 0; i <= treeControl.getLevel(node); i++) {
//         expand = expand && currentExpand[i];
//       }
//       if (expand) {
//         results.push(node);
//       }
//       if (treeControl.isExpandable(node)) {
//         currentExpand[treeControl.getLevel(node) + 1] = treeControl.isExpanded(node);
//       }
//     });
//     return results;
//   }

//   handleExpansionChange(change: SelectionChange<IFlatNode>): void {
//     if (change.added) {
//       change.added.forEach(node => this.loadChildren(node));
//     }
//   }

//   loadChildren(node: IFlatNode): void {
//     if (this.childrenLoadedSet.has(node)) {
//       return;
//     }
//     node.loading = true;
//     this.getChildren(node).subscribe(children => {
//       node.loading = false;
//       const flattenedData = this.flattenedData.getValue();
//       const index = flattenedData.indexOf(node);
//       if (index !== -1) {
//         flattenedData.splice(index + 1, 0, ...children);
//         this.childrenLoadedSet.add(node);
//       }
//       this.flattenedData.next(flattenedData);
//     });
//   }

//   disconnect(): void {
//     this.flattenedData.complete();
//   }
// }

// function delay(arg0: number): import("rxjs").OperatorFunction<{ id: number; label: string; level: number; expandable: boolean; }[], IFlatNode[]> {
//   throw new Error("Function not implemented.");
// }
