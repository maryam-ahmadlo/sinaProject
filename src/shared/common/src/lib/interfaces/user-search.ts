export interface IUserSearch {
  numberOfResults: number;
  queryString: string;
  sortFields: [
    {
      name: string;
      //Supported sort fields include[birthDate, email, fullName, id, insertInstant, lastLoginInstant, login, tenantId, username]
      order: string;
    }
  ];
  startRow: number;
}
