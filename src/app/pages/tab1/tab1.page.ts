import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from "@angular/core";
import { CalendarComponent } from "ionic2-calendar";
import { formatDate } from "@angular/common";
import { AlertController, Platform } from "@ionic/angular";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { EventService } from "src/app/services/user/event.service";

@Component({
  selector: "app-tab1",
  templateUrl: "./tab1.page.html",
  styleUrls: ["./tab1.page.scss"],
})
export class Tab1Page implements OnInit {
  //events set
  eventSource = [];
  //title(date) for the page at the top
  viewTitle = "";

  userId = "";

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(
    private alertCtrl: AlertController,
    @Inject(LOCALE_ID) private locale: string,
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService, //call the services function
    private platform: Platform
  ) {
    this.platform.ready().then(() => {});
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
          if (change.type === "added") {
            console.log("new event added!");

            slef.updateList();
          }
        });
      }
    );
  }

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
        this.eventSource = [];
        eventListSnapshot.forEach((snap) => {
          let event: any = snap.data();
          event.id = snap.id;
          event.title = `${snap.data().courseName}-${snap.data().eventName}`;
          event.startTime = this.transferDate(event.startTime);
          event.endTime = this.transferDate(event.endTime);
          this.eventSource.push(event);
        });
      });
  }

  transferDate(ISODateString) {
    return new Date(ISODateString);
  }

  // //calendar event was clicked
  async onEventSelected(event) {
    //use Angular date pipe for conversion
    let start = formatDate(event.startTime, "medium", this.locale);
    let end = formatDate(event.endTime, "medium", this.locale);

    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: "From: " + start + "<br><br>To: " + end,
      buttons: ["OK"],
    });
    alert.present();
  }

  calendar = {
    mode: "month",
    currentDate: new Date(),
  };

  //selected date range and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  //change between month/week/day
  changeMode(mode) {
    this.calendar.mode = mode;
  }

  //change current month/week/day
  back() {
    var swiper = document.querySelector(".swiper-container")["swiper"];
    swiper.slidePrev();
  }

  //change current month/week/day
  next() {
    var swiper = document.querySelector(".swiper-container")["swiper"];
    swiper.slideNext();
  }

  //change to today
  today() {
    this.calendar.currentDate = new Date();
  }
}
