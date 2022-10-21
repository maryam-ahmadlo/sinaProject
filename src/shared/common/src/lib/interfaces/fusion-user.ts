import { IFusionMemberShip } from './fusion-membership';
import { IUser } from './user';

export interface IFusionUser {
  id: string;
  active: boolean;
  username: string;
  usernameStatus: string;
  verified: boolean;
  first_name?: string;
  last_name?: string;
  fullName?: string;
  email?: string;
  birth_date?: string;
  memberships?: IFusionMemberShip[];
  data: any;
}
