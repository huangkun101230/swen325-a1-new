import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { LoadingController, AlertController } from "@ionic/angular";
import { AuthService } from "../../services/user/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;
  public loading: HTMLIonLoadingElement;

  constructor(
    public loadingCtrl: LoadingController, //using a loading component
    public alertCtrl: AlertController, //using an alert pop up componment
    private authService: AuthService, // authentication service, use it to call the login function
    private router: Router, //handle navigation on this page
    private formBuilder: FormBuilder //initialize the fields and give them a required validator
  ) {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });
  }
  ngOnInit() {}

  async loginUser(loginForm: FormGroup): Promise<void> {
    if (!loginForm.valid) {
      console.log("Form is not valid yet, current value:", loginForm.value);
    } else {
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();
      const email = loginForm.value.email;  //get email from html
      const password = loginForm.value.password;  //get password from html
      this.authService.loginUser(email, password).then( //passes them to loginUser function inside our AuthService service
        () => {
          this.loading.dismiss().then(() => { //this loading component shows it is loading
            this.router.navigateByUrl("/tabs/tab3");
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
    }
  }
}
