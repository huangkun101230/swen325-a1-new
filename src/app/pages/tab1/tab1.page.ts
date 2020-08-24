import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from "@angular/core";
import { CalendarComponent } from "ionic2-calendar";
import { formatDate } from "@angular/common";
import { AlertController } from "@ionic/angular";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";

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

  mySubscription: any;

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(
    private alertCtrl: AlertController,
    @Inject(LOCALE_ID) private locale: string,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // this.mySubscription = this.route.queryParams;
    // this.route.queryParams.subscribe((params) => {
    //   if (this.router.getCurrentNavigation().extras.state) {
    //     this.eventSource = this.router.getCurrentNavigation().extras.state.eventSource;
    //   }
    // });

    // this.router.routeReuseStrategy.shouldReuseRoute = function () {
    //   return false;
    // };
    // this.mySubscription = this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     // Trick the Router into believing it's last link wasn't previously loaded
    //     this.router.navigated = false;
    //   }
    // });
    // console.log(this.eventSource);
    // this.ngOnDestroy();
    // this.myCal.loadEvents();
  }

  // ngOnDestroy() {
  //   if (this.mySubscription) {
  //     this.mySubscription.unsubscribe();
  //   }
  // }

  ngOnInit() {}

  event = {
    id: "",
    title: "",
    desc: "",
    startTime: "",
    endTime: "",
    allDay: false,
  };

  calendar = {
    mode: "month",
    currentDate: new Date(),
  };

  //calendar event was clicked
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

  //time slot was clicked
  onTimeSelected(ev) {
    let selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = selected.toISOString();
  }

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
