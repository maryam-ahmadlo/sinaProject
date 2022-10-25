import { Routes } from "@angular/router";
import { BookmarkResolver } from "./resolvers/bookmark.resolver";

export const BookmarkRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import("./pages").then((m) => m.BookmarkListComponent),
    resolve:{
      bookmarkList:BookmarkResolver
    }
  },
];
