(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["event-detail-event-detail-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/event-detail/event-detail.page.html":
/*!*************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/event-detail/event-detail.page.html ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar color=\"primary\">\n    <ion-buttons slot=\"start\">\n      <ion-back-button defaultHref=\"/tabs/tab2\"></ion-back-button>\n    </ion-buttons>\n\n    <ion-title>Event Detail</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-card>\n    <ion-card-header>\n      <ion-card-title>{{ currentEvent?.courseName }}</ion-card-title>\n      <ion-card-subtitle>{{ currentEvent?.eventName }}</ion-card-subtitle>\n    </ion-card-header>\n    <ion-card-content>\n      <p>Start Date: <strong>{{currentEvent?.startTime}}</strong></p>\n      <p>Due Date: <strong>{{currentEvent?.endTime}}</strong></p>\n    </ion-card-content>\n  </ion-card>\n</ion-content>");

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
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2V2ZW50LWRldGFpbC9ldmVudC1kZXRhaWwucGFnZS5zY3NzIn0= */");

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
    constructor(eventService, route, platform, locale) {
        this.eventService = eventService;
        this.route = route;
        this.platform = platform;
        this.locale = locale;
        this.currentEvent = {};
    }
    ngOnInit() {
        this.platform.ready().then(() => {
            const eventId = this.route.snapshot.paramMap.get("id");
            this.eventService
                .getEventDetail(eventId)
                .get()
                .then((eventSnapshot) => {
                this.currentEvent = eventSnapshot.data();
                this.currentEvent.id = eventSnapshot.id;
                this.currentEvent.startTime = this.formatTime(this.currentEvent.startTime);
                this.currentEvent.endTime = this.formatTime(this.currentEvent.endTime);
            });
        });
    }
    formatTime(time) {
        let ftime = Object(_angular_common__WEBPACK_IMPORTED_MODULE_5__["formatDate"])(time, "medium", this.locale);
        return ftime;
    }
};
EventDetailPage.ctorParameters = () => [
    { type: _services_user_event_service__WEBPACK_IMPORTED_MODULE_3__["EventService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["Platform"] },
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