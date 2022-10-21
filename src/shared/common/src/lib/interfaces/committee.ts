import { IFusionUser } from './fusion-user';

export interface ICommittee {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  user?: IFusionUser;
}
