(function () {
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["reset-password-reset-password-module"], {
    /***/
    "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/reset-password/reset-password.page.html":
    /*!*****************************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/reset-password/reset-password.page.html ***!
      \*****************************************************************************************************/

    /*! exports provided: default */

    /***/
    function node_modulesRawLoaderDistCjsJsSrcAppPagesResetPasswordResetPasswordPageHtml(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-back-button defaultHref=\"tabs/tab3/login\"></ion-back-button>\n    </ion-buttons>\n    <ion-title>reset-password</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content padding>\n  <form [formGroup]=\"resetPasswordForm\">\n    <ion-item>\n      <ion-label position=\"stacked\">Email</ion-label>\n      <ion-input formControlName=\"email\" type=\"email\" placeholder=\"Your email address\"\n        [class.invalid]=\"!resetPasswordForm.controls['email'].valid && resetPasswordForm.controls['email'].touched\">\n      </ion-input>\n    </ion-item>\n    <ion-item class=\"error-message\"\n      *ngIf=\"!resetPasswordForm.controls['email'].valid && resetPasswordForm.controls['email'].touched\">\n      <ion-label>Please enter a valid email.</ion-label>\n    </ion-item>\n    <ion-button expand=\"block\" (click)=\"resetPassword(resetPasswordForm)\" [disabled]=\"!resetPasswordForm.valid\">\n      Reset your Password </ion-button>\n  </form>\n</ion-content>";
      /***/
    },

    /***/
    "./src/app/pages/reset-password/reset-password-routing.module.ts":
    /*!***********************************************************************!*\
      !*** ./src/app/pages/reset-password/reset-password-routing.module.ts ***!
      \***********************************************************************/

    /*! exports provided: ResetPasswordPageRoutingModule */

    /***/
    function srcAppPagesResetPasswordResetPasswordRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ResetPasswordPageRoutingModule", function () {
        return ResetPasswordPageRoutingModule;
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


      var _reset_password_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./reset-password.page */
      "./src/app/pages/reset-password/reset-password.page.ts");

      var routes = [{
        path: '',
        component: _reset_password_page__WEBPACK_IMPORTED_MODULE_3__["ResetPasswordPage"]
      }];

      var ResetPasswordPageRoutingModule = function ResetPasswordPageRoutingModule() {
        _classCallCheck(this, ResetPasswordPageRoutingModule);
      };

      ResetPasswordPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
      })], ResetPasswordPageRoutingModule);
      /***/
    },

    /***/
    "./src/app/pages/reset-password/reset-password.module.ts":
    /*!***************************************************************!*\
      !*** ./src/app/pages/reset-password/reset-password.module.ts ***!
      \***************************************************************/

    /*! exports provided: ResetPasswordPageModule */

    /***/
    function srcAppPagesResetPasswordResetPasswordModuleTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ResetPasswordPageModule", function () {
        return ResetPasswordPageModule;
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


      var _reset_password_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./reset-password-routing.module */
      "./src/app/pages/reset-password/reset-password-routing.module.ts");
      /* harmony import */


      var _reset_password_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./reset-password.page */
      "./src/app/pages/reset-password/reset-password.page.ts");

      var ResetPasswordPageModule = function ResetPasswordPageModule() {
        _classCallCheck(this, ResetPasswordPageModule);
      };

      ResetPasswordPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _reset_password_routing_module__WEBPACK_IMPORTED_MODULE_5__["ResetPasswordPageRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"]],
        declarations: [_reset_password_page__WEBPACK_IMPORTED_MODULE_6__["ResetPasswordPage"]]
      })], ResetPasswordPageModule);
      /***/
    },

    /***/
    "./src/app/pages/reset-password/reset-password.page.scss":
    /*!***************************************************************!*\
      !*** ./src/app/pages/reset-password/reset-password.page.scss ***!
      \***************************************************************/

    /*! exports provided: default */

    /***/
    function srcAppPagesResetPasswordResetPasswordPageScss(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "form {\n  margin-bottom: 32px;\n}\nform button {\n  margin-top: 20px !important;\n}\np {\n  font-size: 0.8em;\n  color: #d2d2d2;\n}\nion-label {\n  margin-left: 5px;\n}\nion-input {\n  padding: 5px;\n}\n.invalid {\n  border-bottom: 1px solid #ff6153;\n}\n.error-message {\n  min-height: 2.2rem;\n}\n.error-message ion-label {\n  margin: 2px 0;\n  font-size: 60%;\n  color: #ff6153;\n}\n.error-message .item-inner {\n  border-bottom: 0 !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvcmVzZXQtcGFzc3dvcmQvcmVzZXQtcGFzc3dvcmQucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsbUJBQUE7QUFDRjtBQUFFO0VBQ0UsMkJBQUE7QUFFSjtBQUNBO0VBQ0UsZ0JBQUE7RUFDQSxjQUFBO0FBRUY7QUFBQTtFQUNFLGdCQUFBO0FBR0Y7QUFEQTtFQUNFLFlBQUE7QUFJRjtBQUZBO0VBQ0UsZ0NBQUE7QUFLRjtBQUhBO0VBQ0Usa0JBQUE7QUFNRjtBQUxFO0VBQ0UsYUFBQTtFQUNBLGNBQUE7RUFDQSxjQUFBO0FBT0o7QUFMRTtFQUNFLDJCQUFBO0FBT0oiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9yZXNldC1wYXNzd29yZC9yZXNldC1wYXNzd29yZC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJmb3JtIHtcbiAgbWFyZ2luLWJvdHRvbTogMzJweDtcbiAgYnV0dG9uIHtcbiAgICBtYXJnaW4tdG9wOiAyMHB4ICFpbXBvcnRhbnQ7XG4gIH1cbn1cbnAge1xuICBmb250LXNpemU6IDAuOGVtO1xuICBjb2xvcjogI2QyZDJkMjtcbn1cbmlvbi1sYWJlbCB7XG4gIG1hcmdpbi1sZWZ0OiA1cHg7XG59XG5pb24taW5wdXQge1xuICBwYWRkaW5nOiA1cHg7XG59XG4uaW52YWxpZCB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZmY2MTUzO1xufVxuLmVycm9yLW1lc3NhZ2Uge1xuICBtaW4taGVpZ2h0OiAyLjJyZW07XG4gIGlvbi1sYWJlbCB7XG4gICAgbWFyZ2luOiAycHggMDtcbiAgICBmb250LXNpemU6IDYwJTtcbiAgICBjb2xvcjogI2ZmNjE1MztcbiAgfVxuICAuaXRlbS1pbm5lciB7XG4gICAgYm9yZGVyLWJvdHRvbTogMCAhaW1wb3J0YW50O1xuICB9XG59XG4iXX0= */";
      /***/
    },

    /***/
    "./src/app/pages/reset-password/reset-password.page.ts":
    /*!*************************************************************!*\
      !*** ./src/app/pages/reset-password/reset-password.page.ts ***!
      \*************************************************************/

    /*! exports provided: ResetPasswordPage */

    /***/
    function srcAppPagesResetPasswordResetPasswordPageTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ResetPasswordPage", function () {
        return ResetPasswordPage;
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


      var _services_user_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../services/user/auth.service */
      "./src/app/services/user/auth.service.ts");
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @ionic/angular */
      "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/forms */
      "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/router */
      "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");

      var ResetPasswordPage = /*#__PURE__*/function () {
        function ResetPasswordPage(authService, alertCtrl, formBuilder, router) {
          _classCallCheck(this, ResetPasswordPage);

          this.authService = authService;
          this.alertCtrl = alertCtrl;
          this.formBuilder = formBuilder;
          this.router = router;
          this.resetPasswordForm = this.formBuilder.group({
            email: ["", _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].email])]
          });
        }

        _createClass(ResetPasswordPage, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "resetPassword",
          value: function resetPassword(resetPasswordForm) {
            var _this = this;

            if (!resetPasswordForm.valid) {
              console.log("Form is not valid yet, current value:", resetPasswordForm.value);
            } else {
              var email = resetPasswordForm.value.email; //take value of the form field

              this.authService.resetPassword(email).then( //send it to the AuthService
              function () {
                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                  var _this2 = this;

                  var alert;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return this.alertCtrl.create({
                            message: "Check your email for a password reset link",
                            buttons: [{
                              text: "Ok",
                              role: "cancel",
                              handler: function handler() {
                                _this2.router.navigateByUrl("/tabs/tab3/login");
                              }
                            }]
                          });

                        case 2:
                          alert = _context.sent;
                          _context.next = 5;
                          return alert.present();

                        case 5:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, this);
                }));
              }, function (error) {
                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                  var errorAlert;
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _context2.next = 2;
                          return this.alertCtrl.create({
                            message: error.message,
                            buttons: [{
                              text: "Ok",
                              role: "cancel"
                            }]
                          });

                        case 2:
                          errorAlert = _context2.sent;
                          _context2.next = 5;
                          return errorAlert.present();

                        case 5:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2, this);
                }));
              });
            }
          }
        }]);

        return ResetPasswordPage;
      }();

      ResetPasswordPage.ctorParameters = function () {
        return [{
          type: _services_user_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]
        }, {
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"]
        }, {
          type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"]
        }, {
          type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]
        }];
      };

      ResetPasswordPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "app-reset-password",
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
        /*! raw-loader!./reset-password.page.html */
        "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/reset-password/reset-password.page.html"))["default"],
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
        /*! ./reset-password.page.scss */
        "./src/app/pages/reset-password/reset-password.page.scss"))["default"]]
      })], ResetPasswordPage);
      /***/
    }
  }]);
})();
//# sourceMappingURL=reset-password-reset-password-module-es5.js.map