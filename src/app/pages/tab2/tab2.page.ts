import { Component, OnInit, Inject, LOCALE_ID, ViewChild } from "@angular/core";
import { Router, NavigationExtras, ActivatedRoute } from "@angular/router";
import { formatDate } from "@angular/common";
import { EventService } from "./../../services/user/event.service";
import { Platform } from "@ionic/angular";

@Component({
  selector: "app-tab2",
  templateUrl: "./tab2.page.html",
  styleUrls: ["./tab2.page.scss"],
})
export class Tab2Page implements OnInit {
  courseName: string = "";
  eventName: string = "";
  startTime = new Date().toISOString();
  endTime = new Date().toISOString();
  allDay: boolean = false;

  //can only add new event after today
  minDate = new Date().toISOString();
  public collapseCard = true;
  public eventList: Array<any>; //hold the list

  constructor(
    private platform: Platform,
    private router: Router,
    private eventService: EventService, //call the services function
    @Inject(LOCALE_ID) private locale: string
  ) {
    this.platform.ready().then(() => {
      this.updateList();
    });
  }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.updateList();
    });
  }

  DIYtoIsoString(this) {
    var tzo = -this.getTimezoneOffset(),
      dif = tzo >= 0 ? "+" : "-",
      pad = function (num) {
        var norm = Math.floor(Math.abs(num));
        return (norm < 10 ? "0" : "") + norm;
      };
    return (
      this.getFullYear() +
      "-" +
      pad(this.getMonth() + 1) +
      "-" +
      pad(this.getDate()) +
      "T" +
      pad(this.getHours()) +
      ":" +
      pad(this.getMinutes()) +
      ":" +
      pad(this.getSeconds()) +
      dif +
      pad(tzo / 60) +
      ":" +
      pad(tzo % 60)
    );
  }

  updateList() {
    this.eventService
      .getEventList() //get the list from service
      .get()
      .then((eventListSnapshot) => {
        this.eventList = [];
        eventListSnapshot.forEach((snap) => {
          this.eventList.push({
            //push every record into our eventList array
            id: snap.id,
            courseName: snap.data().courseName,
            eventName: snap.data().eventName,
            startTime: snap.data().startTime,
            endTime: snap.data().endTime,
            allDay: snap.data().allDay,
          });
          return false;
        });
      });
  }

  addEvent(
    courseName: string,
    eventName: string,
    startTime: string,
    endTime: string,
    allday: boolean
  ): void {
    if (
      courseName === undefined ||
      eventName === undefined ||
      startTime === undefined ||
      endTime === undefined ||
      allday === undefined
    ) {
      return;
    }
    this.eventService
      .addEvent(
        courseName,
        eventName,
        this.formatTime(startTime),
        this.formatTime(endTime),
        allday
      )
      .then(() => {
        this.router.navigateByUrl("");
        this.updateList();
        this.resetEvent();
      });

    //close the "new event collapseCard"
    this.collapseCard = true;
  }

  formatTime(t) {
    let time = formatDate(t, "medium", this.locale);
    let newTime = new Date(time);
    return newTime.toISOString();
  }

  resetEvent() {
    this.courseName = "";
    this.eventName = "";
    this.startTime = new Date().toISOString();
    this.endTime = new Date().toISOString();
    this.allDay = false;
  }

  getDueTime(event) {
    let end = formatDate(event.endTime, "medium", this.locale);
    return end;
  }

  finish(event) {
    this.eventService.removeEvent(event.id);
  }
}
