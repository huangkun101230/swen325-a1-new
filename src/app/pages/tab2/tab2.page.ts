import { Component, OnInit, Inject, LOCALE_ID } from "@angular/core";
import { Router } from "@angular/router";
import { formatDate } from "@angular/common";
import { EventService } from "./../../services/event/event.service";
import { Platform, ToastController } from "@ionic/angular";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { LocalNotifications } from "@ionic-native/local-notifications/ngx";

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

  someAutoFormattedInput: string;

  intervalId;

  constructor(
    private platform: Platform,
    private router: Router,
    private eventService: EventService, //call the services function
    public toastController: ToastController,
    private localNotifications: LocalNotifications,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  ngOnInit() {
    this.platform.ready().then(() => {
      this.listenChanges();
    });

    this.intervalId = setInterval(this.countDown, 1000);
  }

  countDown = () => {
    for (let eve in this.eventList) {
      let remainingTime = this.remainingTime(
        this.eventList[eve].totalTime,
        this.eventList[eve].endTime,
        this.eventList[eve].startTime
      );
      let percent = (remainingTime / this.eventList[eve].totalTime) * 100;
      let currentPercent = parseInt(percent.toString()).toString();
      this.eventList[eve].progress = currentPercent;
      if (remainingTime <= 3600000 && !this.eventList[eve].triggered) {
        let courseTitle: string = this.eventList[eve].courseName;
        let eventTitle: string = this.eventList[eve].eventName;
        this.sendNotifications(courseTitle, eventTitle);
        this.eventList[eve].triggered = true;
      }
      if (percent == 0) clearInterval(this.intervalId);
      if (percent <= 100 && percent >= 66)
        this.eventList[eve].color = "#00EA1A";
      else if (percent < 66 && percent >= 33)
        this.eventList[eve].color = "#EAB700";
      else {
        this.eventList[eve].color = "#EA1F0A";
      }
    }
  };

  sendNotifications(courseName, eventName) {
    // Schedule a single notification
    this.localNotifications.schedule({
      title: courseName + " - " + eventName,
      text: "Hurry up, this is due in one hour!",
      data: { page: "/tabs/tab2" },
    });
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  updateList() {
    let slef = this;
    this.eventService
      .getEventList() //get the list from service
      .get()
      .then((eventListSnapshot) => {
        this.eventList = [];
        eventListSnapshot.forEach((snap) => {
          let t1 = slef.dateTime(snap.data().startTime);
          let t2 = slef.dateTime(snap.data().endTime);
          let timeDiff = t2.getTime() - t1.getTime();
          this.eventList.push({
            //push every record into our eventList array
            id: snap.id,
            courseName: snap.data().courseName,
            eventName: snap.data().eventName,
            startTime: snap.data().startTime,
            endTime: snap.data().endTime,
            allDay: snap.data().allDay,
            totalTime: timeDiff,
            triggered: false,
          });
          return false;
        });
      });
    this.intervalId = setInterval(this.countDown, 1000);
  }

  remainingTime(totalTime, endTime, startTime) {
    let now = new Date().getTime();
    let end = this.dateTime(endTime).getTime();
    let start = this.dateTime(startTime).getTime();
    let diffNowAndEnd = end - now;
    if (now < start) return totalTime;
    else if (now < end && now >= start) return diffNowAndEnd;
    return 0;
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
        this.setFirstLetterToUppercase(eventName),
        this.formatTime(startTime),
        this.formatTime(endTime),
        allday
      )
      .then(() => {
        this.router.navigateByUrl("");
        this.resetEvent();
      })
      .then(() => {
        this.presentToast("Event Added Successfully :)", "success");
      })
      .catch((error) => {
        // console.log("ERROR: " + error.message);
        this.presentToast("ERROR :(", "danger");
      });

    //close the "new event collapseCard"
    this.collapseCard = true;
  }

  dateTime(t) {
    let time = formatDate(t, "medium", this.locale);
    return new Date(time);
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

  setFirstLetterToUppercase(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async presentToast(msg, status) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1000,
      color: status,
    });
    toast.present();
  }
}
