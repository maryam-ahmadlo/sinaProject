export interface IDocument {
  author: string;
  categories: any;
  checkedOut: boolean;
  cipherName: null | any;
  context: string;
  created: string;
  description: null | any;
  encryption: boolean;
  keywords: [] | any;
  language: null | any;
  lastModified: string;
  lock: null | any;
  locked: boolean;
  mimeType: string;
  name: string;
  parent: string;
  path: null | any;
  properties: [] | any;
  rolePermissions: any;
  scriptCode: null | any;
  scripting: boolean;
  signed: boolean;
  subscriptors: [] | any;
  text: null | any;
  textExtracted: boolean;
  thumbnailLink: string;
  thumbnails: any;
  title: string;
  userPermissions: any;
  uuid: string;
}
