import { Routes } from "@angular/router";
import { PrivateCartableAdminDraftResolver, PrivateCartableAdminNotifyResolver } from "./resolvers";

export const privateCartanleAdminRoutes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./pages/private-cartable-admin/private-cartable-admin.component").then(
        (m) => m.PrivateCartableAdminComponent
      ),
    resolve: {
      drafts: PrivateCartableAdminDraftResolver,
      notified: PrivateCartableAdminNotifyResolver
    },
    runGuardsAndResolvers: "paramsOrQueryParamsChange",
  },
  {
    path: "showDetail/:id",
    loadComponent: () =>
      import("./components/create-show-draft/create-show-draft.component").then(
        (m) => m.CreateShowDraftComponent
      ),
  },
  
];


