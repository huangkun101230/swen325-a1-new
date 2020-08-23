import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-event-detail",
  templateUrl: "./event-detail.page.html",
  styleUrls: ["./event-detail.page.scss"],
})
export class EventDetailPage implements OnInit {
  event: any;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe((params) => {
      if(this.router.getCurrentNavigation().extras.state){
        this.event = this.router.getCurrentNavigation().extras.state.event;
        console.log(this.event);
      }
    });
  }

  ngOnInit() {
  }
}
