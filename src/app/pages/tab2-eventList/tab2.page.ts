import { Component, OnInit, Inject, LOCALE_ID, ViewChild } from "@angular/core";
import { Router, NavigationExtras, ActivatedRoute } from "@angular/router";
import { formatDate } from "@angular/common";

@Component({
  selector: "app-tab2",
  templateUrl: "./tab2.page.html",
  styleUrls: ["./tab2.page.scss"],
})
export class Tab2Page implements OnInit {
  //switch for collapseCard (new event)
  public collapseCard = true;
  //events set
  eventSource = [];
  //can only add new event after today
  minDate = new Date().toISOString();

  myCal: any;

  event = {
    id: "",
    title: "",
    desc: "",
    startTime: "",
    endTime: "",
    allDay: false,
  };

  constructor(
    private router: Router,
    @Inject(LOCALE_ID) private locale: string,

  ) {

  }

  ngOnInit() {
    this.resetEvent();
  }

  resetEvent() {
    this.event = {
      id: "",
      title: "",
      desc: "",
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false,
    };
  }

  //create event with format and reload source
  addEvent() {
    let eventCopy = {
      id: this.event.startTime,
      title: this.event.title,
      desc: this.event.desc,
      startTime: new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay,
    };

    if (eventCopy.allDay) {
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;

      eventCopy.startTime = new Date(
        Date.UTC(
          start.getUTCFullYear(),
          start.getUTCMonth(),
          start.getUTCDate()
        )
      );
      eventCopy.endTime = new Date(
        Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1)
      );
    }
    this.eventSource.push(eventCopy);
    // this.updateCalendar(this.eventSource);
    // this.myCal.loadEvents();
    this.resetEvent();

    //close the "new event collapseCard"
    this.collapseCard = true;
  }

  // updateCalendar(list) {
  //   let navigationExtras: NavigationExtras = {
  //     state: {
  //       eventSource: list,
  //     },
  //   };
  //   this.router.navigate(["tabs/tab1"], navigationExtras);
  // }

  openDatilsWithState(ev) {
    let navigationExtras: NavigationExtras = {
      state: {
        event: this.eventSource[ev],
      },
    };
    this.router.navigate(["tabs/tab2/detail"], navigationExtras);
  }

  formatTime(ev) {
    let end = formatDate(ev.endTime, "medium", this.locale);
    return end;
  }

  remove(event) {}

  edit(event) {}
}
