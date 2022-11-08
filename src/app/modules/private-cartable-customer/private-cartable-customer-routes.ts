import { Routes } from "@angular/router";


export const privateCartanleCustomerRoutes: Routes = [
{
    path: "",
    loadComponent: () =>
      import("./pages/private-cartable-customer.component").then(
        (m) => m.PrivateCartablecustomerComponent
      ),
}
];