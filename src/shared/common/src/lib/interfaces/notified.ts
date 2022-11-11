export interface INotified {
  categoryId: string;
  documentUuid: string;
  title: string;
  subject: string;
  branchName: string;
  ruleNumber: string;
  text: string;
  notifierId: string;
  state: string;
  documentType: string;
  versionNumber: string;
  keywords: [string];
  related: [string];
  amendment: [string];
  addendum: [string];
  ruleNotifies: [
    {
      receiver: string;
      ruleUuid: string;
      seenDate: string;
      notifyDate: string;
    }
  ];
}
