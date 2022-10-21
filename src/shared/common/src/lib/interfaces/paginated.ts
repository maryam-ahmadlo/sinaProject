export interface IPaginated<T> {
  data: T[];
  search: string;
  searchFields: string;
  with: string;
  meta: IPaginatedMeta;
  qp: Object;
}

export interface IPaginatedMeta {
  current_page: number;
  per_page: number;
  total?: number;
}
