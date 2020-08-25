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
      .addEvent(courseName, eventName, startTime, endTime, allday)
      .then(() => {
        this.router.navigateByUrl("");
        this.updateList();
        this.resetEvent();
      });

    //close the "new event collapseCard"
    this.collapseCard = true;
  }

  resetEvent() {
    this.courseName = "";
    this.eventName = "";
    this.startTime = new Date().toISOString();
    this.endTime = new Date().toISOString();
    this.allDay = false;
  }

  formatTime(event) {
    let end = formatDate(event.endTime, "medium", this.locale);
    return end;
  }

  finish(event) {
    this.eventService.removeEvent(event.id);
  }
}
