export interface IDocument {
  created_at: string;
  deleted_at: null | string;
  documents: IDocument[];
  id: string;
  label: null | string;
  name: string;
  parent_id: string;
  pivot?: {
    document_id: string;
    plan_id: string;
  };
  meta?: {
    image: string;
    value: string;
    status: 'rejected' | 'approved' | 'pending';
    comment: string;
  };
  type: null | string;
  updated_at: string;
  order: number;
}
