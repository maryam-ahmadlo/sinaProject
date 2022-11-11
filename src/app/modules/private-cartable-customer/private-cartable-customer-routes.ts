import { Routes } from "@angular/router";
import { PrivateCartableCustomerDraftResolver } from "./resolvers";
import { PrivateCartableCustomerNotifiedResolver } from "./resolvers/private-cartable-customer-notified.resolver";

export const privateCartanleCustomerRoutes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./pages/private-cartable-customer.component").then(
        (m) => m.PrivateCartablecustomerComponent
      ),
    resolve: {
      // draft: PrivateCartableCustomerDraftResolver,
      notified: PrivateCartableCustomerNotifiedResolver,
    },
    runGuardsAndResolvers: "paramsOrQueryParamsChange",
  },
];
