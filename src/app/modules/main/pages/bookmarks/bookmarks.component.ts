import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { FlexLayoutModule } from "@angular/flex-layout";

@Component({
  selector: "app-bookmarks",
  standalone: true,
  imports: [CommonModule, NzPageHeaderModule, NzTableModule, NzDividerModule,FlexLayoutModule],
  templateUrl: "./bookmarks.component.html",
  styleUrls: ["./bookmarks.component.css"],
})
export class BookmarksComponent implements OnInit {
  data: any = [];
  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient
      .get("/api/bookmark/getAll", {
        headers: new HttpHeaders({
          accept: "application/json",
          Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
        }),
      })
      .subscribe(console.log);
  }
}
