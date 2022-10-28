export interface IUser {
  id: string;
  name: string;
  password: string;
  email: string;
  active: boolean;
  roles: [
    {
      id: string;
      active: boolean;
      users: any;
    }
  ];
}
