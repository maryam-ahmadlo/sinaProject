import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NzCardModule } from "ng-zorro-antd/card";

import { IDraftRule } from "src/shared/common/src/lib/interfaces";

import { IConfirmed } from "src/shared/common/src/lib/interfaces/confirmed";

import { CartableDraftListComponent } from "../components/cartable-draft-list/cartable-draft-list.component";
import { CartableConfirmedListComponent } from "../components/cartable-confirmed-list/cartable-confirmed-list.component";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";

@Component({
  selector: "app-private-cartable-admin",
  templateUrl: "./private-cartable-admin.component.html",
  styleUrls: ["./private-cartable-admin.component.css"],
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzTabsModule,
    NzPageHeaderModule,
    CartableDraftListComponent,
    CartableConfirmedListComponent,
  ],
})
export class PrivateCartableAdminComponent implements OnInit {
  draftsDocs: IDraftRule[] = [];
  confirmedDocs: IConfirmed[] = [];
  constructor() {}

  ngOnInit(): void {}
}
