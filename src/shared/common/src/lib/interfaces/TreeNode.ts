export interface ITreeNode {
  folder: [
    author: string,
    created: string,
    hasChildren: boolean,
    path: string,
    permissions: number,
    subscribed: boolean,
    uuid: string
  ];
}
