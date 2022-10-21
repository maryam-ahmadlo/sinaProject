import { IFusionUser } from './fusion-user';

export interface IUser {
  id: string;
  active: boolean;
  connectorId: string;
  email: string;
  insertInstant: number;
  lastLoginInstant: number;
  lastUpdateInstant: number;
  memberships?: [
    {
      data: {
        fruit: string;
      };
      groupId: string;
      id: string;
      insertInstant: number;
    }
  ];
  mobilePhone: string;
  passwordChangeRequired: boolean;
  passwordLastUpdateInstant: number;
  registrations?: [
    {
      applicationId: string;
      id: string;
      insertInstant: number;
      lastLoginInstant: number;
      lastUpdateInstant: number;
      roles: string[];
      usernameStatus: string;
      verified: boolean;
    }
  ];
  tenantId: string;
  twoFactor: object;
  uniqueUsername: string;
  username: string;
  usernameStatus: string;
  verified: boolean;
  data?: IFusionUser;
}
