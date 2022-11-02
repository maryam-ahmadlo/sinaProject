import { Routes } from "@angular/router";
import { of } from "rxjs";
import { LoggedInGuard, PrefixRouteGuard, RoleGuard } from "./core/guards";
import { PrivateCartableAdminComponent } from "./core/pages/private-cartable admin/private-cartable-admin.component";
import { TreeResolver } from "./core/resolver/tree.resolver";
import { UserManagementListResolver } from "./modules/user-management/resolvers/user-management-list.resolver";

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
    resolve: {
      tree: TreeResolver,
    },
    runGuardsAndResolvers: "paramsOrQueryParamsChange",
    //canActivate: [LoggedInGuard],
    children: [
      {
        path: "",
        // canActivate: [PrefixRouteGuard],
        loadComponent: () => of(),
        pathMatch: "full",
      },
      {
        path: "admin",
        //canActivate: [RoleGuard],
        data: {
          allowedRoles: ["ROLE_ADMIN"],
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
              import("./modules/user-management/user-management-routes").then(
                (m) => m.userManagementRoutes
              ),
          },
          {
            path: "private-cartable-admin",
            component: PrivateCartableAdminComponent,
          },
        ],
      },
      {
        path: "customer",
        data: {
          allowedRoles: ["ROLE_ADMIN", "ROLE_USER"],
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
            path: "private-cartable",
            loadComponent: () =>
              import(
                "./core/pages/private-cartable-customer/private-cartable-customer.component"
              ).then((m) => m.PrivateCartablecustomerComponent),
          },
          {
            path: "uploadFile",
            loadComponent: () =>
              import("./core/pages/upload-file/upload-file.component").then(
                (m) => m.UploadFileComponent
              ),
          },
          {
            path: "uploadFile/:id",
            loadComponent: () =>
              import("./core/pages/upload-file/upload-file.component").then(
                (m) => m.UploadFileComponent
              ),
          },

          {
            path: "rules",
            children: [
              {
                path: "detail/:id",
                loadComponent: () =>
                  import(
                    "./core/components/tree-rules-item/tree-rules-item.component"
                  ).then((m) => m.TreeRulesItemComponent),
              },
            ],
          },
          {
            path: "bookmarks",
            loadChildren: () =>
              import("./modules/bookmarks/bookmark-routes").then(
                (m) => m.BookmarkRoutes
              ),
          },
          {
            path: "notifications",
            loadComponent: () =>
              import("./core/components/notification-dropdown").then(
                (m) => m.NotificationDropdownComponent
              ),
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
