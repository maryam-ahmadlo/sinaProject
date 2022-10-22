import { Routes } from "@angular/router";

export const userManagementRoutes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./pages").then((m) => m.UserManagementListComponent),
  },
];
