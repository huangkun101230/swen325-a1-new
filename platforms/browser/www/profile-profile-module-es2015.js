(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["profile-profile-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/profile/profile.page.html":
/*!***************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/profile/profile.page.html ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar color=\"primary\">\n    <ion-buttons slot=\"start\">\n      <ion-back-button defaultHref=\"/tabs/tab3\"></ion-back-button>\n    </ion-buttons>\n    <ion-title>Profile</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-list>\n    <ion-item (click)=\"updateName()\">\n      <ion-label>\n        <ion-grid>\n          <ion-row>\n            <ion-col class=\"text-left\" size=\"5\"> Name </ion-col>\n            <ion-col class=\"text-right\" size=\"7\" *ngIf=\"userProfile?.firstName || userProfile?.lastName\">\n              {{userProfile?.firstName}} {{userProfile?.lastName}} </ion-col>\n            <ion-col size=\"7\" class=\"placeholder-profile text-right\" *ngIf=\"!userProfile?.firstName\">\n              <span> Tap here to edit. </span> </ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-label>\n    </ion-item>\n\n    <ion-item (click)=\"updateEmail()\">\n      <ion-label>\n        <ion-grid>\n          <ion-row>\n            <ion-col class=\"text-left\" size=\"5\">Update Email </ion-col>\n            <ion-col class=\"text-right\" size=\"7\" *ngIf=\"userProfile?.email\">\n              {{userProfile?.email}} </ion-col>\n            <ion-col size=\"7\" class=\"placeholder-profile text-right\" *ngIf=\"!userProfile?.email\" inputmode=\"email\">\n              <span> Tap here to edit. </span> </ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-label>\n    </ion-item>\n\n    <ion-item (click)=\"updatePassword()\">\n      <ion-label>\n        <ion-grid>\n          <ion-row>\n            <ion-col class=\"text-left\" size=\"5\">Update Password </ion-col>\n            <ion-col class=\"text-right\" size=\"7\" class=\"placeholder-profile text-right\" inputmode=\"password\">\n              <span> Tap here to edit. </span> </ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-label>\n    </ion-item>\n\n  </ion-list>\n</ion-content>");

/***/ }),

/***/ "./src/app/pages/profile/profile-routing.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/pages/profile/profile-routing.module.ts ***!
  \*********************************************************/
/*! exports provided: ProfilePageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfilePageRoutingModule", function() { return ProfilePageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _profile_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./profile.page */ "./src/app/pages/profile/profile.page.ts");




const routes = [
    {
        path: '',
        component: _profile_page__WEBPACK_IMPORTED_MODULE_3__["ProfilePage"]
    }
];
let ProfilePageRoutingModule = class ProfilePageRoutingModule {
};
ProfilePageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], ProfilePageRoutingModule);



/***/ }),

/***/ "./src/app/pages/profile/profile.module.ts":
/*!*************************************************!*\
  !*** ./src/app/pages/profile/profile.module.ts ***!
  \*************************************************/
/*! exports provided: ProfilePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfilePageModule", function() { return ProfilePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _profile_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./profile-routing.module */ "./src/app/pages/profile/profile-routing.module.ts");
/* harmony import */ var _profile_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./profile.page */ "./src/app/pages/profile/profile.page.ts");







let ProfilePageModule = class ProfilePageModule {
};
ProfilePageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _profile_routing_module__WEBPACK_IMPORTED_MODULE_5__["ProfilePageRoutingModule"]
        ],
        declarations: [_profile_page__WEBPACK_IMPORTED_MODULE_6__["ProfilePage"]]
    })
], ProfilePageModule);



/***/ }),

/***/ "./src/app/pages/profile/profile.page.scss":
/*!*************************************************!*\
  !*** ./src/app/pages/profile/profile.page.scss ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("ion-list-header {\n  background-color: #ececec;\n}\n\n.text-center {\n  text-align: center;\n}\n\n.text-left {\n  text-align: left;\n}\n\n.text-right {\n  text-align: right;\n}\n\n.placeholder-profile {\n  color: #cccccc;\n}\n\n.dob-label {\n  color: #000000 !important;\n  padding: 10px !important;\n  max-width: 50% !important;\n}\n\n.capitalize {\n  text-transform: capitalize;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvcHJvZmlsZS9wcm9maWxlLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHlCQUFBO0FBQ0Y7O0FBQ0E7RUFDRSxrQkFBQTtBQUVGOztBQUFBO0VBQ0UsZ0JBQUE7QUFHRjs7QUFEQTtFQUNFLGlCQUFBO0FBSUY7O0FBRkE7RUFDRSxjQUFBO0FBS0Y7O0FBSEE7RUFDRSx5QkFBQTtFQUNBLHdCQUFBO0VBQ0EseUJBQUE7QUFNRjs7QUFKQTtFQUNFLDBCQUFBO0FBT0YiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9wcm9maWxlL3Byb2ZpbGUucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW9uLWxpc3QtaGVhZGVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VjZWNlYztcbn1cbi50ZXh0LWNlbnRlciB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbi50ZXh0LWxlZnQge1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xufVxuLnRleHQtcmlnaHQge1xuICB0ZXh0LWFsaWduOiByaWdodDtcbn1cbi5wbGFjZWhvbGRlci1wcm9maWxlIHtcbiAgY29sb3I6ICNjY2NjY2M7XG59XG4uZG9iLWxhYmVsIHtcbiAgY29sb3I6ICMwMDAwMDAgIWltcG9ydGFudDtcbiAgcGFkZGluZzogMTBweCAhaW1wb3J0YW50O1xuICBtYXgtd2lkdGg6IDUwJSAhaW1wb3J0YW50O1xufVxuLmNhcGl0YWxpemUge1xuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcbn1cbiJdfQ== */");

/***/ }),

/***/ "./src/app/pages/profile/profile.page.ts":
/*!***********************************************!*\
  !*** ./src/app/pages/profile/profile.page.ts ***!
  \***********************************************/
/*! exports provided: ProfilePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfilePage", function() { return ProfilePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _services_user_profile_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/user/profile.service */ "./src/app/services/user/profile.service.ts");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! firebase/app */ "./node_modules/firebase/app/dist/index.cjs.js");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(firebase_app__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! firebase/auth */ "./node_modules/firebase/auth/dist/index.esm.js");
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! firebase/firestore */ "./node_modules/firebase/firestore/dist/index.esm.js");







let ProfilePage = class ProfilePage {
    constructor(alertCtrl, profileService, platform, toastController) {
        this.alertCtrl = alertCtrl;
        this.profileService = profileService;
        this.platform = platform;
        this.toastController = toastController;
        this.userId = "";
    }
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
        let db = firebase_app__WEBPACK_IMPORTED_MODULE_4__["firestore"]();
        db.collection(`/userProfile/${this.userId}`).onSnapshot({ includeMetadataChanges: true }, function (snapshot) {
            this.eventSource = [];
            snapshot.docChanges().forEach(function (change) {
                if (change.type === "added" || change.type === "modified") {
                    slef.updateProfile();
                }
            });
        });
    }
    updateName() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const alert = yield this.alertCtrl.create({
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
                                this.presentToast("Name Changed Successfully :)", "success");
                            })
                                .catch((error) => {
                                // console.log("ERROR: " + error.message);
                                this.presentToast("ERROR :(", "danger");
                            });
                        },
                    },
                ],
            });
            yield alert.present();
        });
    }
    updateEmail() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const alert = yield this.alertCtrl.create({
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
            yield alert.present();
        });
    }
    updatePassword() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const alert = yield this.alertCtrl.create({
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
                                this.presentToast("Password Changed Successfully :)", "success");
                            })
                                .catch((error) => {
                                // console.log("ERROR: " + error.message);
                                this.presentToast("ERROR :(", "danger");
                            });
                        },
                    },
                ],
            });
            yield alert.present();
        });
    }
    presentToast(msg, status) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const toast = yield this.toastController.create({
                message: msg,
                duration: 1000,
                color: status,
            });
            toast.present();
        });
    }
};
ProfilePage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
    { type: _services_user_profile_service__WEBPACK_IMPORTED_MODULE_3__["ProfileService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"] }
];
ProfilePage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "app-profile",
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./profile.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/profile/profile.page.html")).default,
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./profile.page.scss */ "./src/app/pages/profile/profile.page.scss")).default]
    })
], ProfilePage);



/***/ })

}]);
//# sourceMappingURL=profile-profile-module-es2015.js.map