import { IPlan } from './plan';
import { IUser } from './user';

export interface IRequest {
  id: string;
  plan_id: string;
  plan?: IPlan;
  profile_id: string;
  user_id: string;
  payment_intervals: number;
  payment_period: number;
  price: number;
  cost: number;
  guarantor_count: number;
  step: 'profiling' | 'document' | 'submit' | 'planning';
  created_at: string;
  updated_at: string;
  deleted_at: string;
  documents: any[];
  profile: IUser & {
    birth_date: string;
    birth_id: string;
    created_at: string;
    data: null;
    education: string;
    email: string;
    father_name: string;
    first_name: string;
    gender: string;
    id: string;
    is_married: number;
    issue_location: string;
    last_name: string;
    mobile: string;
    national_id: string;
    phone: string;
    updated_at: string;
  };
  reason: string;

  status:
    | 'rejected'
    | 'approved'
    | 'pending'
    | 'revision'
    | 'closed'
    | 'active'
    | 'cancelled'
    | 'committee'
    | 'expert';
  status_fa: string;
  committees: {
    committee_id: string;
    request_id: string;
    status: 'rejected' | 'approved';
  }[];
}
