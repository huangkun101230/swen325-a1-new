import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/user/auth.service";
import { LoadingController, AlertController } from "@ionic/angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.page.html",
  styleUrls: ["./signup.page.scss"],
})
export class SignupPage implements OnInit {
  public signupForm: FormGroup;
  public loading: any;
  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.signupForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: [
        "",
        Validators.compose([Validators.minLength(6), Validators.required]),
      ],
    });
  }

  ngOnInit() {}

  async signupUser(signupForm: FormGroup): Promise<void> {
    if (!signupForm.valid) {
      console.log(
        "Need to complete the form, current value: ",
        signupForm.value
      );
    } else {
      const email: string = signupForm.value.email; //get email from the input filed
      const password: string = signupForm.value.password; //get pw from the input field
      this.authService.signupUser(email, password).then(  //pass it to the AuthService
        () => {
          this.loading.dismiss().then(() => {
            this.router.navigateByUrl("tabs/tab2");  //navi to the todo list tab
          });
        },
        (error) => {
          this.loading.dismiss().then(async () => {
            const alert = await this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: "Ok", role: "cancel" }],
            });
            await alert.present();
          });
        }
      );
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();
    }
  }
}
