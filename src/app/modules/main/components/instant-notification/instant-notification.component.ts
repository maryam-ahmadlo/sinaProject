import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as moment from "jalali-moment";

import {
  NzNotificationModule,
  NzNotificationService,
} from "ng-zorro-antd/notification";
import { IUrgentMessage } from "src/shared/common/src/lib/interfaces/urgentMessage";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzTagModule } from "ng-zorro-antd/tag";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NzBadgeModule } from "ng-zorro-antd/badge";
import { NzIconModule } from "ng-zorro-antd/icon";

@Component({
  selector: "app-instant-notification",
  standalone: true,
  imports: [
    CommonModule,
    NzNotificationModule,
    NzButtonModule,
    FlexLayoutModule,
    NzBadgeModule,
    NzIconModule
  ],
  templateUrl: "./instant-notification.component.html",
  styleUrls: ["./instant-notification.component.css"],
})
export class InstantNotificationComponent implements OnInit {
  listOfMessages: IUrgentMessage[] = [];
  messageCount: number = 0;
  constructor(
    private httpClient: HttpClient,
    private notification: NzNotificationService
  ) {}

  ngOnInit() {
    let time = moment().startOf("jDay").toJSON();

    this.httpClient
      .get<IUrgentMessage[]>("/url/messages/okmAdmin/instant", {
        headers: new HttpHeaders({
          accept: "application/json",
          Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
        }),
        params: {
          date: time,
        },
      })
      .subscribe((msg) => {
        this.listOfMessages = msg;
        msg.forEach((m) => {
          if (m.seenDate === null) {
            this.messageCount++;
          }
        });
        console.log(this.listOfMessages);
      });
  }

  createBasicNotification(): void {
    this.listOfMessages.forEach((notif) => {
      this.httpClient
        .get<IUrgentMessage>(`/url/messages/${notif.id}`, {
          headers: new HttpHeaders({
            accept: "*/*",
            Authorization: "Basic b2ttQWRtaW46YWRtaW4=",
          }),
        })
        .subscribe((msg) => {
          this.notification.blank("پیام فوری ", `${notif.messageText}`, {
            nzDuration: 0,
          });
        });
    });
  }
}
