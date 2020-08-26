import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/user/auth.service";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { ProfileService } from "../../services/user/profile.service";
import { Platform } from "@ionic/angular";

@Component({
  selector: "app-tab3",
  templateUrl: "./tab3.page.html",
  styleUrls: ["./tab3.page.scss"],
})
export class Tab3Page implements OnInit {
  public userProfile: any;
  userId = "";
  firstName = "";
  lastName = "";

  constructor(
    private router: Router,
    private authService: AuthService,
    private profileService: ProfileService,
    private platform: Platform
  ) {}

  ngOnInit() {
    this.platform.ready().then(() => {
      this.listenChanges();
    });
  }

  transferToProfilePage() {
    this.router.navigateByUrl("tabs/tab3/profile");
  }

  logOut(): void {
    this.authService.logoutUser().then(() => {
      this.router.navigateByUrl("tabs/tab3/login");
    });
  }

  listenChanges() {
    let slef = this;
    let db = firebase.firestore();
    db.collection(`/userProfile/${this.userId}`).onSnapshot(
      { includeMetadataChanges: true },
      function (snapshot) {
        this.eventSource = [];
        snapshot.docChanges().forEach(function (change) {
          if (change.type === "added" || change.type === "modified") {
            slef.updateName();
          }
        });
      }
    );
  }

  updateName() {
    this.profileService
      .getUserProfile()
      .get()
      .then((userProfileSnapshot) => {
        this.userProfile = userProfileSnapshot.data();
        this.firstName = this.userProfile.firstName;
        this.lastName = this.userProfile.lastName;
      });
  }
}
