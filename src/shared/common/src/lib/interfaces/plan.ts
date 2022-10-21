import { IDocument } from './document';

export interface IPlan {
  created_at: string;
  deleted_at: string | null;
  description: string;
  guarantor_count: number;
  has_guarantor: number;
  id: string;
  link: string;
  parent_id: null | string;
  plans: IPlan[];
  price: string;
  price_en: number;
  display_price: string;
  summary: string;
  title: string;
  updated_at: string;
  documents?: IDocument[];
  image: string;
}
