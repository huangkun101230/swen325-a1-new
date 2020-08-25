import { Component, OnInit, LOCALE_ID, Inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EventService } from "./../../services/user/event.service";
import { Platform } from "@ionic/angular";
import { formatDate } from '@angular/common';

@Component({
  selector: "app-event-detail",
  templateUrl: "./event-detail.page.html",
  styleUrls: ["./event-detail.page.scss"],
})
export class EventDetailPage implements OnInit {
  public currentEvent: any = {};

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private platform: Platform,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  ngOnInit() {
    this.platform.ready().then(() => {
      const eventId: string = this.route.snapshot.paramMap.get("id");
      this.eventService
        .getEventDetail(eventId)
        .get()
        .then((eventSnapshot) => {
          this.currentEvent = eventSnapshot.data();
          this.currentEvent.id = eventSnapshot.id;
          this.currentEvent.startTime = this.formatTime(this.currentEvent.startTime);
          this.currentEvent.endTime = this.formatTime(this.currentEvent.endTime);
        });
    });
  }

  formatTime(time) {
    let ftime = formatDate(time, "medium", this.locale);
    return ftime;
  }
}
