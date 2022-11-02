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
import { NgMarqueeModule } from "ng-marquee";

@Component({
  selector: "app-instant-notification",
  standalone: true,
  imports: [
    CommonModule,
    NzNotificationModule,
    NzButtonModule,
    NzTagModule,
    FlexLayoutModule,
    NgMarqueeModule,
  ],
  templateUrl: "./instant-notification.component.html",
  styleUrls: ["./instant-notification.component.css"],
})
export class InstantNotificationComponent implements OnInit {
  listOfMessages: IUrgentMessage[] = [];

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
        console.log(this.listOfMessages);
      });
  }

  createBasicNotification(): void {
    this.listOfMessages.forEach((notif) => {
      this.notification.blank("پیام فوری ", `${notif.messageText}`, {
        nzDuration: 0,
      });
    });
  }
}
