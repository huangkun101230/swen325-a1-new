import { Component, OnInit } from "@angular/core";
import {
  AlertController,
  Platform,
  ToastController,
} from "@ionic/angular";
import { ProfileService } from "../../services/user/profile.service";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  public userProfile: any;
  userId = "";

  constructor(
    private alertCtrl: AlertController,
    private profileService: ProfileService,
    private platform: Platform,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.platform.ready().then(() => {
      this.listenChanges();
    });
  }

  updateProfile() {
    this.profileService
      .getUserProfile()
      .get()
      .then((userProfileSnapshot) => {
        this.userProfile = userProfileSnapshot.data();
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
            slef.updateProfile();
          }
        });
      }
    );
  }

  async updateName(): Promise<void> {
    const alert = await this.alertCtrl.create({
      subHeader: "Your first name & last name",
      inputs: [
        {
          type: "text",
          name: "firstName",
          placeholder: "Your first name",
          value: this.userProfile.firstName,
        },
        {
          type: "text",
          name: "lastName",
          placeholder: "Your last name",
          value: this.userProfile.lastName,
        },
      ],
      buttons: [
        { text: "Cancel" },
        {
          text: "Save",
          handler: (data) => {
            this.profileService
              .updateName(data.firstName, data.lastName)
              .then(() => {
                this.presentToast(
                  "Name Changed Successfully :)",
                  "success"
                );
              })
              .catch((error) => {
                // console.log("ERROR: " + error.message);
                this.presentToast(
                  "ERROR :(",
                  "danger"
                );
              });
          },
        },
      ],
    });
    await alert.present();
  }

  async updateEmail(): Promise<void> {
    const alert = await this.alertCtrl.create({
      inputs: [
        { type: "text", name: "newEmail", placeholder: "Your new email" },
        { name: "password", placeholder: "Your password", type: "password" },
      ],
      buttons: [
        { text: "Cancel" },
        {
          text: "Save",
          handler: (data) => {
            this.profileService
              .updateEmail(data.newEmail, data.password)
              .then(() => {
                this.presentToast("Email Changed Successfully :)", "success");
                this.updateProfile();
              })
              .catch((error) => {
                // console.log("ERROR: " + error.message);
                this.presentToast("ERROR :(", "danger");
              });
          },
        },
      ],
    });
    await alert.present();
  }

  async updatePassword(): Promise<void> {
    const alert = await this.alertCtrl.create({
      inputs: [
        { name: "newPassword", placeholder: "New password", type: "password" },
        { name: "oldPassword", placeholder: "Old password", type: "password" },
      ],
      buttons: [
        { text: "Cancel" },
        {
          text: "Save",
          handler: (data) => {
            this.profileService
              .updatePassword(data.newPassword, data.oldPassword)
              .then(() => {
                this.presentToast(
                  "Password Changed Successfully :)",
                  "success"
                );
              })
              .catch((error) => {
                // console.log("ERROR: " + error.message);
                this.presentToast(
                  "ERROR :(",
                  "danger"
                );
              });
          },
        },
      ],
    });
    await alert.present();
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
