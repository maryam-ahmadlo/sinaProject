import { IPaginatedMeta } from './paginated';

export interface IPaginatedResponse<T> {
  data: T[];
  meta: IPaginatedMeta;
}
