export interface IBranch {
  id: string;
  name: string;
  code: string;
  address: string;
  description: string;
  active: boolean;
  roles: [
    {
      id: string;
      active: boolean;
    }
  ];
}
