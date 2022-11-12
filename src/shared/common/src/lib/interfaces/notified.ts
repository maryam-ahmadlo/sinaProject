export interface INotified {
  uuid: string;
  document: {
    uuid: string;
    parent: string;
    context: string;
    path: null | string;
    author: string;
    created: string;
    name: string;
    scripting: boolean;
    scriptCode: null | any;
    subscriptors: [] | any;
    keywords: [string];
    categories: [string];
    userPermissions: {
      okmAdmin: any;
    };
    rolePermissions: {
      ROLE_USER: any;
    };
    properties: [];
    lastModified: string;
    language: null | any;
    title: string;
    description: null | any;
    mimeType: string;
    text: null | string;
    checkedOut: boolean;
    encryption: boolean;
    cipherName: null | any;
    signed: boolean;
    textExtracted: boolean;
    locked: boolean;
    lock: any;
    thumbnails: [];
    thumbnailLink: null | any;
  };
  code: string;
  categoryId: string;
  documentUuid: string;
  title: string;
  subject: string;
  branchName: string;
  ruleNumber: string;
  text: string;
  notifierId: string;
  notifiedDate: string;
  state: string;
  documentType: string;
  versionNumber: string;
  keywords: [string];
  related: [] | any;
  amendment: [] | any;
  addendum: [] | any;
  additionalDocuments: [] | any;
  ruleNotifies: [
    {
      id: string;
      receiver: any;
      ruleUuid: string;
      seenDate: string | any;
      notifyDate: string;
    }
  ];
}
