export interface IGroup {
  id: string;
  name: string;
  data?: {
    description: string;
  };
  insertInstant: number;
  lastUpdateInstant: number;
  tenantId: string;
}
