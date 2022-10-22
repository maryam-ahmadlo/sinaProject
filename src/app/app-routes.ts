import { Routes } from "@angular/router";
import { LoggedInGuard, PrefixRouteGuard, RoleGuard } from "./core/guards";
import { of } from "rxjs";
import { TreeRulesItemComponent } from "@core/components/tree-rules-item/tree-rules-item.component";

export const appRoutes: Routes = [
  {
    path: "auth",
    loadChildren: () =>
      import("./modules/auth/auth-routes").then((m) => m.authRoutes),
  },

  {
    path: "",
    loadComponent: () =>
      import("./core/pages/slidebar/slidebar.component").then(
        (m) => m.SlidebarComponent
      ),
    // canActivate: [LoggedInGuard],
    runGuardsAndResolvers: "paramsOrQueryParamsChange",
    children: [
      {
        path: "",
        canActivate: [PrefixRouteGuard],
        loadComponent: () => of(),
        pathMatch: "full",
      },
      {
        path: "admin",
        // canActivate: [RoleGuard],
        data: {
          allowedRoles: ["*"],
        },
        children: [
          {
            path: "dashboard",
            loadComponent: () =>
              import("./modules/main/pages").then(
                (m) => m.AdminDashboardComponent
              ),
          },
          {
            path: "user-management",
            loadChildren: () =>
              import("./modules/main/pages/user-management/user-management-routes").then(
                (m) => m.userManagementRoutes
              ),
          },
        ],
      },
      {
        path: "customer",
        data: {
          allowedRoles: ["*"],
        },
        children: [
          { path: "", redirectTo: "dashboard", pathMatch: "full" },
          {
            path: "dashboard",
            loadComponent: () =>
              import("./modules/main/pages").then(
                (m) => m.CustomerDashboardComponent
              ),
            children: [
              {
                path: "",
                loadChildren: () =>
                  import("./modules/search/search-routes").then(
                    (m) => m.SearchRoutes
                  ),
              },
            ],
          },

          {
            path: "rules",
            children: [
              {
                path: "detail",
                component: TreeRulesItemComponent,
              },
            ],
          },
          {
            path: "bookmarks",
            loadComponent: () =>
              import("./modules/main/pages").then((m) => m.BookmarksComponent),
          },
        ],
      },
      {
        path: "forbidden",
        loadComponent: () =>
          import("./modules/main/pages").then((m) => m.ForbiddenComponent),
      },
      {
        path: "**",
        loadComponent: () =>
          import("./modules/main/pages").then((m) => m.NotFoundComponent),
      },
    ],
  },
];
