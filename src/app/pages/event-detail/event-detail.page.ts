import { Component, OnInit, LOCALE_ID, Inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EventService } from "./../../services/user/event.service";
import { Platform, AlertController, ToastController } from "@ionic/angular";
import { formatDate } from "@angular/common";

@Component({
  selector: "app-event-detail",
  templateUrl: "./event-detail.page.html",
  styleUrls: ["./event-detail.page.scss"],
})
export class EventDetailPage implements OnInit {
  public currentEvent: any = {};
  courseName: string = "";
  eventName: string = "";
  startTime = new Date().toISOString();
  endTime = new Date().toISOString();
  allDay: boolean = false;
  public collapseCard = true;

  //can only add new event after today
  minDate = new Date().toISOString();

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private platform: Platform,
    private router: Router,
    private alertCtrl: AlertController,
    public toastController: ToastController,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  ngOnInit() {
    this.platform.ready().then(() => {
      this.updateDetail();
    });
  }

  updateDetail() {
    let self = this;
    const eventId: string = this.route.snapshot.paramMap.get("id");
    this.eventService
      .getEventDetail(eventId)
      .get()
      .then((eventSnapshot) => {
        this.currentEvent = eventSnapshot.data();
        this.currentEvent.id = eventSnapshot.id;
        this.currentEvent.startTime = this.formatTime(
          this.currentEvent.startTime
        );
        this.currentEvent.endTime = this.formatTime(this.currentEvent.endTime);
        self.fillCardWithRawData();
      });
  }

  fillCardWithRawData() {
    this.courseName = this.currentEvent.courseName;
    this.eventName = this.currentEvent.eventName;
    this.startTime = this.currentEvent.startTime;
    this.endTime = this.currentEvent.endTime;
    this.allDay = this.currentEvent.allDay;
  }

  formatTime(time) {
    let ftime = formatDate(time, "medium", this.locale);
    return ftime;
  }

  modify(courseName, eventName, startTime, endTime, allDay) {
    this.eventService
      .modifyEvent(
        this.currentEvent.id,
        this.courseName,
        this.setFirstLetterToUppercase(this.eventName),
        this.startTime,
        this.endTime,
        this.allDay
      )
      .then(() => {
        this.collapseCard = true;
        this.updateDetail();
        this.presentToast("Event Modified Successfully :)", "success");
      })
      .catch((error) => {
        // console.log("ERROR: " + error.message);
        this.presentToast("ERROR :(", "danger");
      });
  }

  async remove() {
    const alert = await this.alertCtrl.create({
      header: "Warnning",
      message: "Are you sure to delete this event?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            console.log("Confirm Cancel: blah");
          },
        },
        {
          text: "Okay",
          handler: () => {
            this.presentToast("Event Removed Successfully :)", "success");
            this.eventService.removeEvent(this.currentEvent.id);
            this.router.navigateByUrl("/tabs/tab2");  
          },
        },
      ],
    });
    alert.present();
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
