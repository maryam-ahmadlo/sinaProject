import { IDocument } from "./document";

export interface IDraftRule {
  addendum: [] | any;
  additionalDocuments: [] | any;
  amendment: [] | any;
  branchName: string;
  categoryId: null | string;
  code: string;
  document: IDocument;
  documentType: string;
  documentUuid: string;
  keywords: null | any;
  notifiedDate: null | string;
  notifierId: string;
  related: [] | any;
  ruleNotifies: [] | any;
  ruleNumber: string;
  state: string;
  subject: string;
  text: string;
  title: string;
  uuid: string;
  versionNumber: string;
}
