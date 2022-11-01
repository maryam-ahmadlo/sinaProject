import { Routes } from "@angular/router";
import { UserManagementListResolver } from "./resolvers/user-management-list.resolver";

export const userManagementRoutes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./pages").then((m) => m.UserManagementListComponent),
      resolve:{
        user: UserManagementListResolver
      },
      runGuardsAndResolvers: "paramsOrQueryParamsChange",
  },
];
