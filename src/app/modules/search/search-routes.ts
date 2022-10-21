import { Routes } from "@angular/router";

export const SearchRoutes: Routes = [
  {
    path: "",
    // loadComponent: () => import("./pages").then((m) => m.SearchLayoutComponent),
    children: [
      {
        path: 'newest',
        loadComponent: () =>
          import("./components").then((m) => m.NewestResultComponent),
      },
      {
        path: 'oldest',
        loadComponent: () =>
          import("./components").then((m) => m.OldestResultComponent),
      },
      {
        path: 'similar',
        loadComponent: () =>
          import("./components").then((m) => m.SimilarResultComponent),
      },
      {
        path:'detailResult',
        loadComponent: () =>
          import("./components").then((m) => m.DetailResultComponent),
      },
    ],
  },
];
