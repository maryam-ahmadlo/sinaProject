export interface INotification {
  ID: number;
  CreatedAt: string | Date;
  UpdatedAt: string | Date;
  DeletedAt: string | Date | null;
  to: string;
  message: string;
  observed_at: string | Date;
}
