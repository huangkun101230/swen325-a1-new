(function () {
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tab2-tab2-module"], {
    /***/
    "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/tab2/tab2.page.html":
    /*!*********************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/tab2/tab2.page.html ***!
      \*********************************************************************************/

    /*! exports provided: default */

    /***/
    function node_modulesRawLoaderDistCjsJsSrcAppPagesTab2Tab2PageHtml(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ion-header>\n  <ion-toolbar color=\"primary\">\n    <ion-title>Assignment List</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n  <!-- Card for adding a new event -->\n  <ion-card>\n    <ion-card-header tappable (click)=\"collapseCard = !collapseCard\">\n      <ion-card-title>New Event</ion-card-title>\n    </ion-card-header>\n  <ion-card-content *ngIf=\"!collapseCard\">\n    <ion-item>\n      <ion-input type=\"text\" placeholder=\"Course Code\" [(ngModel)]=\"courseName\"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-input type=\"text\" placeholder=\"Assignment Title\" [(ngModel)]=\"eventName\"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label>Start</ion-label>\n      <ion-datetime displayFormat=\"DD/MM/YYYY HH:mm\" pickerFormat=\"D MMM:HH:mm\" [(ngModel)]=\"startTime\" [min]=\"minDate\">\n      </ion-datetime>\n    </ion-item>\n    <ion-item>\n      <ion-label>End</ion-label>\n      <ion-datetime displayFormat=\"DD/MM/YYYY HH:mm\" pickerFormat=\"D MMM:HH:mm\" [(ngModel)]=\"endTime\" [min]=\"minDate\">\n      </ion-datetime>\n    </ion-item>\n    <ion-item>\n      <ion-label>All Day?</ion-label>\n      <ion-checkbox [(ngModel)]=\"allDay\"></ion-checkbox>\n    </ion-item>\n    <ion-button fill=\"outline\" expand=\"block\" (click)=\"addEvent(courseName, eventName, startTime, endTime, allDay)\">\n      Add Event </ion-button>\n  </ion-card-content>\n  </ion-card>\n\n  <!-- List of Sliding Items -->\n  <ion-list>\n    <ion-list-header>\n      <ion-label>Your next events</ion-label>\n    </ion-list-header>\n    <ion-item tappable *ngFor=\"let event of eventList\" routerLink=\"/tabs/tab2/detail/{{ event.id }}\">\n      <ion-label>\n        <h2>{{event?.courseName}}</h2>\n        <h3> {{ event?.eventName }} </h3>\n        <p>Due Date: <strong>{{formatTime(event)}}</strong></p>\n      </ion-label>\n      <ion-item-options side=\"end\">\n        <ion-item-option (click)=\"finish(event)\">Finished!</ion-item-option>\n      </ion-item-options>\n    </ion-item>\n  </ion-list>\n\n</ion-content>";
      /***/
    },

    /***/
    "./src/app/pages/tab2/tab2-routing.module.ts":
    /*!***************************************************!*\
      !*** ./src/app/pages/tab2/tab2-routing.module.ts ***!
      \***************************************************/

    /*! exports provided: Tab2PageRoutingModule */

    /***/
    function srcAppPagesTab2Tab2RoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "Tab2PageRoutingModule", function () {
        return Tab2PageRoutingModule;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "./node_modules/tslib/tslib.es6.js");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/router */
      "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
      /* harmony import */


      var _tab2_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./tab2.page */
      "./src/app/pages/tab2/tab2.page.ts");

      var routes = [{
        path: '',
        component: _tab2_page__WEBPACK_IMPORTED_MODULE_3__["Tab2Page"]
      }];

      var Tab2PageRoutingModule = function Tab2PageRoutingModule() {
        _classCallCheck(this, Tab2PageRoutingModule);
      };

      Tab2PageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
      })], Tab2PageRoutingModule);
      /***/
    },

    /***/
    "./src/app/pages/tab2/tab2.module.ts":
    /*!*******************************************!*\
      !*** ./src/app/pages/tab2/tab2.module.ts ***!
      \*******************************************/

    /*! exports provided: Tab2PageModule */

    /***/
    function srcAppPagesTab2Tab2ModuleTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "Tab2PageModule", function () {
        return Tab2PageModule;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "./node_modules/tslib/tslib.es6.js");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/common */
      "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/forms */
      "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @ionic/angular */
      "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
      /* harmony import */


      var _tab2_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./tab2-routing.module */
      "./src/app/pages/tab2/tab2-routing.module.ts");
      /* harmony import */


      var _tab2_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./tab2.page */
      "./src/app/pages/tab2/tab2.page.ts");

      var Tab2PageModule = function Tab2PageModule() {
        _classCallCheck(this, Tab2PageModule);
      };

      Tab2PageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _tab2_routing_module__WEBPACK_IMPORTED_MODULE_5__["Tab2PageRoutingModule"]],
        declarations: [_tab2_page__WEBPACK_IMPORTED_MODULE_6__["Tab2Page"]],
        exports: []
      })], Tab2PageModule);
      /***/
    },

    /***/
    "./src/app/pages/tab2/tab2.page.scss":
    /*!*******************************************!*\
      !*** ./src/app/pages/tab2/tab2.page.scss ***!
      \*******************************************/

    /*! exports provided: default */

    /***/
    function srcAppPagesTab2Tab2PageScss(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3RhYjIvdGFiMi5wYWdlLnNjc3MifQ== */";
      /***/
    },

    /***/
    "./src/app/pages/tab2/tab2.page.ts":
    /*!*****************************************!*\
      !*** ./src/app/pages/tab2/tab2.page.ts ***!
      \*****************************************/

    /*! exports provided: Tab2Page */

    /***/
    function srcAppPagesTab2Tab2PageTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "Tab2Page", function () {
        return Tab2Page;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "./node_modules/tslib/tslib.es6.js");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/router */
      "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/common */
      "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
      /* harmony import */


      var _services_user_event_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ./../../services/user/event.service */
      "./src/app/services/user/event.service.ts");
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @ionic/angular */
      "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");

      var Tab2Page = /*#__PURE__*/function () {
        function Tab2Page(platform, router, eventService, //call the services function
        locale) {
          var _this = this;

          _classCallCheck(this, Tab2Page);

          this.platform = platform;
          this.router = router;
          this.eventService = eventService;
          this.locale = locale;
          this.courseName = "";
          this.eventName = "";
          this.startTime = new Date().toISOString();
          this.endTime = new Date().toISOString();
          this.allDay = false; //can only add new event after today

          this.minDate = new Date().toISOString();
          this.collapseCard = true;
          this.platform.ready().then(function () {
            _this.updateList();
          });
        }

        _createClass(Tab2Page, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this2 = this;

            this.platform.ready().then(function () {
              _this2.updateList();
            });
          }
        }, {
          key: "updateList",
          value: function updateList() {
            var _this3 = this;

            this.eventService.getEventList() //get the list from service
            .get().then(function (eventListSnapshot) {
              _this3.eventList = [];
              eventListSnapshot.forEach(function (snap) {
                _this3.eventList.push({
                  //push every record into our eventList array
                  id: snap.id,
                  courseName: snap.data().courseName,
                  eventName: snap.data().eventName,
                  startTime: snap.data().startTime,
                  endTime: snap.data().endTime,
                  allDay: snap.data().allDay
                });

                return false;
              });
            });
          }
        }, {
          key: "addEvent",
          value: function addEvent(courseName, eventName, startTime, endTime, allday) {
            var _this4 = this;

            if (courseName === undefined || eventName === undefined || startTime === undefined || endTime === undefined || allday === undefined) {
              return;
            }

            this.eventService.addEvent(courseName, eventName, startTime, endTime, allday).then(function () {
              _this4.router.navigateByUrl("");

              _this4.updateList();

              _this4.resetEvent();
            }); //close the "new event collapseCard"

            this.collapseCard = true;
          }
        }, {
          key: "resetEvent",
          value: function resetEvent() {
            this.courseName = "";
            this.eventName = "";
            this.startTime = new Date().toISOString();
            this.endTime = new Date().toISOString();
            this.allDay = false;
          }
        }, {
          key: "formatTime",
          value: function formatTime(event) {
            var end = Object(_angular_common__WEBPACK_IMPORTED_MODULE_3__["formatDate"])(event.endTime, "medium", this.locale);
            return end;
          }
        }, {
          key: "finish",
          value: function finish(event) {
            this.eventService.removeEvent(event.id);
          }
        }]);

        return Tab2Page;
      }();

      Tab2Page.ctorParameters = function () {
        return [{
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["Platform"]
        }, {
          type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]
        }, {
          type: _services_user_event_service__WEBPACK_IMPORTED_MODULE_4__["EventService"]
        }, {
          type: String,
          decorators: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"],
            args: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["LOCALE_ID"]]
          }]
        }];
      };

      Tab2Page = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "app-tab2",
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
        /*! raw-loader!./tab2.page.html */
        "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/tab2/tab2.page.html"))["default"],
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
        /*! ./tab2.page.scss */
        "./src/app/pages/tab2/tab2.page.scss"))["default"]]
      })], Tab2Page);
      /***/
    }
  }]);
})();
//# sourceMappingURL=tab2-tab2-module-es5.js.map