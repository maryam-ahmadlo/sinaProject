import { Routes } from "@angular/router";

export const BookmarkRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import("./pages").then((m) => m.BookmarkListComponent),
  },
];
