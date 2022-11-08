import { Routes } from "@angular/router";
import { PrivateCartableAdminDraftResolver } from "./resolvers";


export const privateCartanleAdminRoutes: Routes = [
    {
        path: "",
        loadComponent: () =>
          import("./pages/private-cartable-admin.component").then(
            (m) => m.PrivateCartableAdminComponent
          ),
          resolve:{
            drafts:PrivateCartableAdminDraftResolver
          }
    }
];