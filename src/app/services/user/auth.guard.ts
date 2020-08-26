/*
  The job of this authentication guard is to fetch for the user's authentication state and return true/false
  depdnding on whether or not there's a logged in user
*/
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import * as firebase from "firebase/app";
// import firebase from 'firebase'
import "firebase/auth";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user: firebase.User) => {
        if (user) {
          resolve(true);
        } else {
          console.log("User is not logged in");
          this.router.navigate(["tabs/tab3/login"]);
          resolve(false);
        }
      });
    });
  }
}
