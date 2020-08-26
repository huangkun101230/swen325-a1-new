import { Component, OnInit, Inject, LOCALE_ID, ViewChild } from "@angular/core";
import { Router, NavigationExtras, ActivatedRoute } from "@angular/router";
import { formatDate } from "@angular/common";
import { EventService } from "./../../services/user/event.service";
import { Platform } from "@ionic/angular";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

@Component({
  selector: "app-tab2",
  templateUrl: "./tab2.page.html",
  styleUrls: ["./tab2.page.scss"],
})
export class Tab2Page implements OnInit {
  userId = "";

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
  ) {}

  ngOnInit() {
    this.platform.ready().then(() => {
      this.listenChanges();
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

  listenChanges() {
    this.userId = this.eventService.getUserId();
    let slef = this;
    let db = firebase.firestore();
    db.collection(`/userProfile/${this.userId}/eventList`).onSnapshot(
      { includeMetadataChanges: true },
      function (snapshot) {
        this.eventSource = [];
        snapshot.docChanges().forEach(function (change) {
          if (
            change.type === "added" ||
            change.type === "modified" ||
            change.type === "removed"
          ) {
            slef.updateList();
          }
        });
      }
    );
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
}
