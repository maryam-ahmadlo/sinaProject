import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-instant-notification",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./instant-notification.component.html",
  styleUrls: ["./instant-notification.component.css"],
})
export class InstantNotificationComponent implements OnInit {
  data: any = [];
  listOfMessages: any = [];
  isLoading: boolean;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.httpClient
      .get("/url/messages/okmAdmin/instant", {
        headers: new HttpHeaders({
          accept: "application/json",
          Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
        }),
        params: {
          date: new Date().toJSON(),
        },
      })
      .subscribe((msg) => {
        this.listOfMessages = msg;
      });
  }
}
