import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/user/auth.service";
import { ProfileService } from 'src/app/services/user/profile.service';

@Component({
  selector: "app-tab3",
  templateUrl: "./tab3.page.html",
  styleUrls: ["./tab3.page.scss"],
})
export class Tab3Page implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
  }

  transferToProfilePage() {
    this.router.navigateByUrl("tabs/tab3/profile");
  }

  logOut(): void {
    this.authService.logoutUser().then(() => {
      this.router.navigateByUrl("tabs/tab3/login");
    });
  }
}
