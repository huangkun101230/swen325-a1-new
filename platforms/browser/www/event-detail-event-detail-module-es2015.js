(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["event-detail-event-detail-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/event-detail/event-detail.page.html":
/*!*************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/event-detail/event-detail.page.html ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar color=\"primary\">\n    <ion-buttons slot=\"start\">\n      <ion-back-button defaultHref=\"/tabs/tab2\"></ion-back-button>\n    </ion-buttons>\n\n    <ion-title>Event Detail</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-card>\n    <div  tappable (click)=\"collapseCard = !collapseCard\">\n      <ion-card-header>\n        <ion-card-title>{{ currentEvent?.courseName }}</ion-card-title>\n        <h2><strong>{{ currentEvent?.eventName }}</strong></h2>\n      </ion-card-header>\n      <ion-card-content>\n        <p>Start Date: <strong>{{currentEvent?.startTime}}</strong></p>\n        <p>Due Date: <strong>{{currentEvent?.endTime}}</strong></p>\n      </ion-card-content>\n    </div>\n    <ion-card-content *ngIf=\"!collapseCard\">\n      <ion-item>\n        <ion-input type=\"text\" placeholder=\"Course Code\" [(ngModel)]=\"courseName\"\n          (ngModelChange)=\"courseName=$event.toUpperCase()\"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-input class=\"capitalize\" type=\"text\" placeholder=\"Assignment Title\" [(ngModel)]=\"eventName\"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label>Start</ion-label>\n        <ion-datetime displayFormat=\"DD/MM/YYYY HH:mm\" pickerFormat=\"D MMM:HH:mm\" [(ngModel)]=\"startTime\"\n          [min]=\"minDate\">\n        </ion-datetime>\n      </ion-item>\n      <ion-item>\n        <ion-label>End</ion-label>\n        <ion-datetime displayFormat=\"DD/MM/YYYY HH:mm\" pickerFormat=\"D MMM:HH:mm\" [(ngModel)]=\"endTime\" [min]=\"minDate\">\n        </ion-datetime>\n      </ion-item>\n      <ion-item>\n        <ion-label>All Day?</ion-label>\n        <ion-checkbox [(ngModel)]=\"allDay\"></ion-checkbox>\n      </ion-item>\n      <ion-button fill=\"outline\" expand=\"block\" (click)=\"modify(courseName, eventName, startTime, endTime, allDay)\">\n        Modify Event </ion-button>\n    </ion-card-content>\n  </ion-card>\n\n  <ion-row text-right>\n    <ion-col size=\"12\">\n      <ion-button shape=\"round\" expand=\"block\" color=\"danger\" (click)=\"remove()\">Remove</ion-button>\n    </ion-col>\n  </ion-row>\n</ion-content>");

/***/ }),

/***/ "./src/app/pages/event-detail/event-detail-routing.module.ts":
/*!*******************************************************************!*\
  !*** ./src/app/pages/event-detail/event-detail-routing.module.ts ***!
  \*******************************************************************/
/*! exports provided: EventDetailPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventDetailPageRoutingModule", function() { return EventDetailPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _event_detail_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./event-detail.page */ "./src/app/pages/event-detail/event-detail.page.ts");




const routes = [
    {
        path: '',
        component: _event_detail_page__WEBPACK_IMPORTED_MODULE_3__["EventDetailPage"]
    }
];
let EventDetailPageRoutingModule = class EventDetailPageRoutingModule {
};
EventDetailPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], EventDetailPageRoutingModule);



/***/ }),

/***/ "./src/app/pages/event-detail/event-detail.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/pages/event-detail/event-detail.module.ts ***!
  \***********************************************************/
/*! exports provided: EventDetailPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventDetailPageModule", function() { return EventDetailPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _event_detail_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./event-detail-routing.module */ "./src/app/pages/event-detail/event-detail-routing.module.ts");
/* harmony import */ var _event_detail_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./event-detail.page */ "./src/app/pages/event-detail/event-detail.page.ts");







let EventDetailPageModule = class EventDetailPageModule {
};
EventDetailPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _event_detail_routing_module__WEBPACK_IMPORTED_MODULE_5__["EventDetailPageRoutingModule"]
        ],
        declarations: [_event_detail_page__WEBPACK_IMPORTED_MODULE_6__["EventDetailPage"]]
    })
], EventDetailPageModule);



/***/ }),

/***/ "./src/app/pages/event-detail/event-detail.page.scss":
/*!***********************************************************!*\
  !*** ./src/app/pages/event-detail/event-detail.page.scss ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".capitalize {\n  text-transform: capitalize;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvZXZlbnQtZGV0YWlsL2V2ZW50LWRldGFpbC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSwwQkFBQTtBQUNKIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvZXZlbnQtZGV0YWlsL2V2ZW50LWRldGFpbC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY2FwaXRhbGl6ZSB7XG4gICAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG4gIH1cbiAgIl19 */");

/***/ }),

/***/ "./src/app/pages/event-detail/event-detail.page.ts":
/*!*********************************************************!*\
  !*** ./src/app/pages/event-detail/event-detail.page.ts ***!
  \*********************************************************/
/*! exports provided: EventDetailPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventDetailPage", function() { return EventDetailPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _services_user_event_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../services/user/event.service */ "./src/app/services/user/event.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");






let EventDetailPage = class EventDetailPage {
    constructor(eventService, route, platform, router, alertCtrl, toastController, locale) {
        this.eventService = eventService;
        this.route = route;
        this.platform = platform;
        this.router = router;
        this.alertCtrl = alertCtrl;
        this.toastController = toastController;
        this.locale = locale;
        this.currentEvent = {};
        this.courseName = "";
        this.eventName = "";
        this.startTime = new Date().toISOString();
        this.endTime = new Date().toISOString();
        this.allDay = false;
        this.collapseCard = true;
        //can only add new event after today
        this.minDate = new Date().toISOString();
    }
    ngOnInit() {
        this.platform.ready().then(() => {
            this.updateDetail();
        });
    }
    updateDetail() {
        let self = this;
        const eventId = this.route.snapshot.paramMap.get("id");
        this.eventService
            .getEventDetail(eventId)
            .get()
            .then((eventSnapshot) => {
            this.currentEvent = eventSnapshot.data();
            this.currentEvent.id = eventSnapshot.id;
            this.currentEvent.startTime = this.formatTime(this.currentEvent.startTime);
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
        let ftime = Object(_angular_common__WEBPACK_IMPORTED_MODULE_5__["formatDate"])(time, "medium", this.locale);
        return ftime;
    }
    modify(courseName, eventName, startTime, endTime, allDay) {
        this.eventService
            .modifyEvent(this.currentEvent.id, this.courseName, this.setFirstLetterToUppercase(this.eventName), this.startTime, this.endTime, this.allDay)
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
    remove() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const alert = yield this.alertCtrl.create({
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
        });
    }
    setFirstLetterToUppercase(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
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
EventDetailPage.ctorParameters = () => [
    { type: _services_user_event_service__WEBPACK_IMPORTED_MODULE_3__["EventService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["Platform"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["AlertController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ToastController"] },
    { type: String, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["LOCALE_ID"],] }] }
];
EventDetailPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "app-event-detail",
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./event-detail.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/event-detail/event-detail.page.html")).default,
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./event-detail.page.scss */ "./src/app/pages/event-detail/event-detail.page.scss")).default]
    })
], EventDetailPage);



/***/ })

}]);
//# sourceMappingURL=event-detail-event-detail-module-es2015.js.map