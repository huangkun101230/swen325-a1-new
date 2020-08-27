(function () {
  function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

  function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tab2-tab2-module"], {
    /***/
    "./node_modules/@ionic-native/core/__ivy_ngcc__/bootstrap.js":
    /*!*******************************************************************!*\
      !*** ./node_modules/@ionic-native/core/__ivy_ngcc__/bootstrap.js ***!
      \*******************************************************************/

    /*! exports provided: checkReady */

    /***/
    function node_modulesIonicNativeCore__ivy_ngcc__BootstrapJs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "checkReady", function () {
        return checkReady;
      });

      function checkReady() {
        if (typeof process === 'undefined') {
          var win_1 = typeof window !== 'undefined' ? window : {};
          var DEVICE_READY_TIMEOUT_1 = 5000; // To help developers using cordova, we listen for the device ready event and
          // log an error if it didn't fire in a reasonable amount of time. Generally,
          // when this happens, developers should remove and reinstall plugins, since
          // an inconsistent plugin is often the culprit.

          var before_1 = Date.now();
          var didFireReady_1 = false;
          win_1.document.addEventListener('deviceready', function () {
            console.log("Ionic Native: deviceready event fired after " + (Date.now() - before_1) + " ms");
            didFireReady_1 = true;
          });
          setTimeout(function () {
            if (!didFireReady_1 && win_1.cordova) {
              console.warn("Ionic Native: deviceready did not fire within " + DEVICE_READY_TIMEOUT_1 + "ms. This can happen when plugins are in an inconsistent state. Try removing plugins from plugins/ and reinstalling them.");
            }
          }, DEVICE_READY_TIMEOUT_1);
        }
      } //# sourceMappingURL=bootstrap.js.map

      /***/

    },

    /***/
    "./node_modules/@ionic-native/core/__ivy_ngcc__/decorators/common.js":
    /*!***************************************************************************!*\
      !*** ./node_modules/@ionic-native/core/__ivy_ngcc__/decorators/common.js ***!
      \***************************************************************************/

    /*! exports provided: ERR_CORDOVA_NOT_AVAILABLE, ERR_PLUGIN_NOT_INSTALLED, getPromise, wrapPromise, checkAvailability, instanceAvailability, setIndex, callCordovaPlugin, callInstance, getPlugin, get, pluginWarn, cordovaWarn, wrap, wrapInstance */

    /***/
    function node_modulesIonicNativeCore__ivy_ngcc__DecoratorsCommonJs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ERR_CORDOVA_NOT_AVAILABLE", function () {
        return ERR_CORDOVA_NOT_AVAILABLE;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ERR_PLUGIN_NOT_INSTALLED", function () {
        return ERR_PLUGIN_NOT_INSTALLED;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "getPromise", function () {
        return getPromise;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "wrapPromise", function () {
        return wrapPromise;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "checkAvailability", function () {
        return checkAvailability;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "instanceAvailability", function () {
        return instanceAvailability;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "setIndex", function () {
        return setIndex;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "callCordovaPlugin", function () {
        return callCordovaPlugin;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "callInstance", function () {
        return callInstance;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "getPlugin", function () {
        return getPlugin;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "get", function () {
        return get;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "pluginWarn", function () {
        return pluginWarn;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "cordovaWarn", function () {
        return cordovaWarn;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "wrap", function () {
        return wrap;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "wrapInstance", function () {
        return wrapInstance;
      });
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! rxjs */
      "./node_modules/rxjs/_esm2015/index.js");

      var ERR_CORDOVA_NOT_AVAILABLE = {
        error: 'cordova_not_available'
      };
      var ERR_PLUGIN_NOT_INSTALLED = {
        error: 'plugin_not_installed'
      };

      function getPromise(callback) {
        var tryNativePromise = function tryNativePromise() {
          if (Promise) {
            return new Promise(function (resolve, reject) {
              callback(resolve, reject);
            });
          } else {
            console.error('No Promise support or polyfill found. To enable Ionic Native support, please add the es6-promise polyfill before this script, or run with a library like Angular or on a recent browser.');
          }
        };

        if (typeof window !== 'undefined' && window.angular) {
          var doc = window.document;
          var injector = window.angular.element(doc.querySelector('[ng-app]') || doc.body).injector();

          if (injector) {
            var $q = injector.get('$q');
            return $q(function (resolve, reject) {
              callback(resolve, reject);
            });
          }

          console.warn("Angular 1 was detected but $q couldn't be retrieved. This is usually when the app is not bootstrapped on the html or body tag. Falling back to native promises which won't trigger an automatic digest when promises resolve.");
        }

        return tryNativePromise();
      }

      function wrapPromise(pluginObj, methodName, args, opts) {
        if (opts === void 0) {
          opts = {};
        }

        var pluginResult, rej;
        var p = getPromise(function (resolve, reject) {
          if (opts.destruct) {
            pluginResult = callCordovaPlugin(pluginObj, methodName, args, opts, function () {
              var args = [];

              for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
              }

              return resolve(args);
            }, function () {
              var args = [];

              for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
              }

              return reject(args);
            });
          } else {
            pluginResult = callCordovaPlugin(pluginObj, methodName, args, opts, resolve, reject);
          }

          rej = reject;
        }); // Angular throws an error on unhandled rejection, but in this case we have already printed
        // a warning that Cordova is undefined or the plugin is uninstalled, so there is no reason
        // to error

        if (pluginResult && pluginResult.error) {
          p["catch"](function () {});
          typeof rej === 'function' && rej(pluginResult.error);
        }

        return p;
      }

      function wrapOtherPromise(pluginObj, methodName, args, opts) {
        if (opts === void 0) {
          opts = {};
        }

        return getPromise(function (resolve, reject) {
          var pluginResult = callCordovaPlugin(pluginObj, methodName, args, opts);

          if (pluginResult) {
            if (pluginResult.error) {
              reject(pluginResult.error);
            } else if (pluginResult.then) {
              pluginResult.then(resolve)["catch"](reject);
            }
          } else {
            reject({
              error: 'unexpected_error'
            });
          }
        });
      }

      function wrapObservable(pluginObj, methodName, args, opts) {
        if (opts === void 0) {
          opts = {};
        }

        return new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"](function (observer) {
          var pluginResult;

          if (opts.destruct) {
            pluginResult = callCordovaPlugin(pluginObj, methodName, args, opts, function () {
              var args = [];

              for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
              }

              return observer.next(args);
            }, function () {
              var args = [];

              for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
              }

              return observer.error(args);
            });
          } else {
            pluginResult = callCordovaPlugin(pluginObj, methodName, args, opts, observer.next.bind(observer), observer.error.bind(observer));
          }

          if (pluginResult && pluginResult.error) {
            observer.error(pluginResult.error);
            observer.complete();
          }

          return function () {
            try {
              if (opts.clearFunction) {
                if (opts.clearWithArgs) {
                  return callCordovaPlugin(pluginObj, opts.clearFunction, args, opts, observer.next.bind(observer), observer.error.bind(observer));
                }

                return callCordovaPlugin(pluginObj, opts.clearFunction, []);
              }
            } catch (e) {
              console.warn('Unable to clear the previous observable watch for', pluginObj.constructor.getPluginName(), methodName);
              console.warn(e);
            }
          };
        });
      }
      /**
       * Wrap the event with an observable
       * @private
       * @param event event name
       * @param element The element to attach the event listener to
       * @returns {Observable}
       */


      function wrapEventObservable(event, element) {
        element = typeof window !== 'undefined' && element ? get(window, element) : element || (typeof window !== 'undefined' ? window : {});
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(element, event);
      }

      function checkAvailability(plugin, methodName, pluginName) {
        var pluginRef, pluginInstance, pluginPackage;

        if (typeof plugin === 'string') {
          pluginRef = plugin;
        } else {
          pluginRef = plugin.constructor.getPluginRef();
          pluginName = plugin.constructor.getPluginName();
          pluginPackage = plugin.constructor.getPluginInstallName();
        }

        pluginInstance = getPlugin(pluginRef);

        if (!pluginInstance || !!methodName && typeof pluginInstance[methodName] === 'undefined') {
          if (typeof window === 'undefined' || !window.cordova) {
            cordovaWarn(pluginName, methodName);
            return ERR_CORDOVA_NOT_AVAILABLE;
          }

          pluginWarn(pluginName, pluginPackage, methodName);
          return ERR_PLUGIN_NOT_INSTALLED;
        }

        return true;
      }
      /**
       * Checks if _objectInstance exists and has the method/property
       * @private
       */


      function instanceAvailability(pluginObj, methodName) {
        return pluginObj._objectInstance && (!methodName || typeof pluginObj._objectInstance[methodName] !== 'undefined');
      }

      function setIndex(args, opts, resolve, reject) {
        if (opts === void 0) {
          opts = {};
        } // ignore resolve and reject in case sync


        if (opts.sync) {
          return args;
        } // If the plugin method expects myMethod(success, err, options)


        if (opts.callbackOrder === 'reverse') {
          // Get those arguments in the order [resolve, reject, ...restOfArgs]
          args.unshift(reject);
          args.unshift(resolve);
        } else if (opts.callbackStyle === 'node') {
          args.push(function (err, result) {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        } else if (opts.callbackStyle === 'object' && opts.successName && opts.errorName) {
          var obj = {};
          obj[opts.successName] = resolve;
          obj[opts.errorName] = reject;
          args.push(obj);
        } else if (typeof opts.successIndex !== 'undefined' || typeof opts.errorIndex !== 'undefined') {
          var setSuccessIndex = function setSuccessIndex() {
            // If we've specified a success/error index
            if (opts.successIndex > args.length) {
              args[opts.successIndex] = resolve;
            } else {
              args.splice(opts.successIndex, 0, resolve);
            }
          };

          var setErrorIndex = function setErrorIndex() {
            // We don't want that the reject cb gets spliced into the position of an optional argument that has not been
            // defined and thus causing non expected behavior.
            if (opts.errorIndex > args.length) {
              args[opts.errorIndex] = reject; // insert the reject fn at the correct specific index
            } else {
              args.splice(opts.errorIndex, 0, reject); // otherwise just splice it into the array
            }
          };

          if (opts.successIndex > opts.errorIndex) {
            setErrorIndex();
            setSuccessIndex();
          } else {
            setSuccessIndex();
            setErrorIndex();
          }
        } else {
          // Otherwise, let's tack them on to the end of the argument list
          // which is 90% of cases
          args.push(resolve);
          args.push(reject);
        }

        return args;
      }

      function callCordovaPlugin(pluginObj, methodName, args, opts, resolve, reject) {
        if (opts === void 0) {
          opts = {};
        } // Try to figure out where the success/error callbacks need to be bound
        // to our promise resolve/reject handlers.


        args = setIndex(args, opts, resolve, reject);
        var availabilityCheck = checkAvailability(pluginObj, methodName);

        if (availabilityCheck === true) {
          var pluginInstance = getPlugin(pluginObj.constructor.getPluginRef());
          return pluginInstance[methodName].apply(pluginInstance, args);
        } else {
          return availabilityCheck;
        }
      }

      function callInstance(pluginObj, methodName, args, opts, resolve, reject) {
        if (opts === void 0) {
          opts = {};
        }

        args = setIndex(args, opts, resolve, reject);

        if (instanceAvailability(pluginObj, methodName)) {
          return pluginObj._objectInstance[methodName].apply(pluginObj._objectInstance, args);
        }
      }

      function getPlugin(pluginRef) {
        if (typeof window !== 'undefined') {
          return get(window, pluginRef);
        }

        return null;
      }

      function get(element, path) {
        var paths = path.split('.');
        var obj = element;

        for (var i = 0; i < paths.length; i++) {
          if (!obj) {
            return null;
          }

          obj = obj[paths[i]];
        }

        return obj;
      }

      function pluginWarn(pluginName, plugin, method) {
        if (method) {
          console.warn('Native: tried calling ' + pluginName + '.' + method + ', but the ' + pluginName + ' plugin is not installed.');
        } else {
          console.warn("Native: tried accessing the " + pluginName + " plugin but it's not installed.");
        }

        if (plugin) {
          console.warn("Install the " + pluginName + " plugin: 'ionic cordova plugin add " + plugin + "'");
        }
      }
      /**
       * @private
       * @param pluginName
       * @param method
       */


      function cordovaWarn(pluginName, method) {
        if (typeof process === 'undefined') {
          if (method) {
            console.warn('Native: tried calling ' + pluginName + '.' + method + ', but Cordova is not available. Make sure to include cordova.js or run in a device/simulator');
          } else {
            console.warn('Native: tried accessing the ' + pluginName + ' plugin but Cordova is not available. Make sure to include cordova.js or run in a device/simulator');
          }
        }
      }
      /**
       * @private
       */


      var wrap = function wrap(pluginObj, methodName, opts) {
        if (opts === void 0) {
          opts = {};
        }

        return function () {
          var args = [];

          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }

          if (opts.sync) {
            // Sync doesn't wrap the plugin with a promise or observable, it returns the result as-is
            return callCordovaPlugin(pluginObj, methodName, args, opts);
          } else if (opts.observable) {
            return wrapObservable(pluginObj, methodName, args, opts);
          } else if (opts.eventObservable && opts.event) {
            return wrapEventObservable(opts.event, opts.element);
          } else if (opts.otherPromise) {
            return wrapOtherPromise(pluginObj, methodName, args, opts);
          } else {
            return wrapPromise(pluginObj, methodName, args, opts);
          }
        };
      };
      /**
       * @private
       */


      function wrapInstance(pluginObj, methodName, opts) {
        if (opts === void 0) {
          opts = {};
        }

        return function () {
          var args = [];

          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }

          if (opts.sync) {
            return callInstance(pluginObj, methodName, args, opts);
          } else if (opts.observable) {
            return new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"](function (observer) {
              var pluginResult;

              if (opts.destruct) {
                pluginResult = callInstance(pluginObj, methodName, args, opts, function () {
                  var args = [];

                  for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                  }

                  return observer.next(args);
                }, function () {
                  var args = [];

                  for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                  }

                  return observer.error(args);
                });
              } else {
                pluginResult = callInstance(pluginObj, methodName, args, opts, observer.next.bind(observer), observer.error.bind(observer));
              }

              if (pluginResult && pluginResult.error) {
                observer.error(pluginResult.error);
              }

              return function () {
                try {
                  if (opts.clearWithArgs) {
                    return callInstance(pluginObj, opts.clearFunction, args, opts, observer.next.bind(observer), observer.error.bind(observer));
                  }

                  return callInstance(pluginObj, opts.clearFunction, []);
                } catch (e) {
                  console.warn('Unable to clear the previous observable watch for', pluginObj.constructor.getPluginName(), methodName);
                  console.warn(e);
                }
              };
            });
          } else if (opts.otherPromise) {
            return getPromise(function (resolve, reject) {
              var result;

              if (opts.destruct) {
                result = callInstance(pluginObj, methodName, args, opts, function () {
                  var args = [];

                  for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                  }

                  return resolve(args);
                }, function () {
                  var args = [];

                  for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                  }

                  return reject(args);
                });
              } else {
                result = callInstance(pluginObj, methodName, args, opts, resolve, reject);
              }

              if (result && result.then) {
                result.then(resolve, reject);
              } else {
                reject();
              }
            });
          } else {
            var pluginResult_1, rej_1;
            var p = getPromise(function (resolve, reject) {
              if (opts.destruct) {
                pluginResult_1 = callInstance(pluginObj, methodName, args, opts, function () {
                  var args = [];

                  for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                  }

                  return resolve(args);
                }, function () {
                  var args = [];

                  for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                  }

                  return reject(args);
                });
              } else {
                pluginResult_1 = callInstance(pluginObj, methodName, args, opts, resolve, reject);
              }

              rej_1 = reject;
            }); // Angular throws an error on unhandled rejection, but in this case we have already printed
            // a warning that Cordova is undefined or the plugin is uninstalled, so there is no reason
            // to error

            if (pluginResult_1 && pluginResult_1.error) {
              p["catch"](function () {});
              typeof rej_1 === 'function' && rej_1(pluginResult_1.error);
            }

            return p;
          }
        };
      } //# sourceMappingURL=common.js.map

      /***/

    },

    /***/
    "./node_modules/@ionic-native/core/__ivy_ngcc__/decorators/cordova-function-override.js":
    /*!**********************************************************************************************!*\
      !*** ./node_modules/@ionic-native/core/__ivy_ngcc__/decorators/cordova-function-override.js ***!
      \**********************************************************************************************/

    /*! exports provided: cordovaFunctionOverride */

    /***/
    function node_modulesIonicNativeCore__ivy_ngcc__DecoratorsCordovaFunctionOverrideJs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "cordovaFunctionOverride", function () {
        return cordovaFunctionOverride;
      });
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! rxjs */
      "./node_modules/rxjs/_esm2015/index.js");
      /* harmony import */


      var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./common */
      "./node_modules/@ionic-native/core/__ivy_ngcc__/decorators/common.js");

      function overrideFunction(pluginObj, methodName) {
        return new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"](function (observer) {
          var availabilityCheck = Object(_common__WEBPACK_IMPORTED_MODULE_1__["checkAvailability"])(pluginObj, methodName);

          if (availabilityCheck === true) {
            var pluginInstance_1 = Object(_common__WEBPACK_IMPORTED_MODULE_1__["getPlugin"])(pluginObj.constructor.getPluginRef());
            pluginInstance_1[methodName] = observer.next.bind(observer);
            return function () {
              return pluginInstance_1[methodName] = function () {};
            };
          } else {
            observer.error(availabilityCheck);
            observer.complete();
          }
        });
      }

      function cordovaFunctionOverride(pluginObj, methodName, args) {
        if (args === void 0) {
          args = [];
        }

        return overrideFunction(pluginObj, methodName);
      } //# sourceMappingURL=cordova-function-override.js.map

      /***/

    },

    /***/
    "./node_modules/@ionic-native/core/__ivy_ngcc__/decorators/cordova-instance.js":
    /*!*************************************************************************************!*\
      !*** ./node_modules/@ionic-native/core/__ivy_ngcc__/decorators/cordova-instance.js ***!
      \*************************************************************************************/

    /*! exports provided: cordovaInstance */

    /***/
    function node_modulesIonicNativeCore__ivy_ngcc__DecoratorsCordovaInstanceJs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "cordovaInstance", function () {
        return cordovaInstance;
      });
      /* harmony import */


      var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./common */
      "./node_modules/@ionic-native/core/__ivy_ngcc__/decorators/common.js");

      function cordovaInstance(pluginObj, methodName, config, args) {
        args = Array.from(args);
        return Object(_common__WEBPACK_IMPORTED_MODULE_0__["wrapInstance"])(pluginObj, methodName, config).apply(this, args);
      } //# sourceMappingURL=cordova-instance.js.map

      /***/

    },

    /***/
    "./node_modules/@ionic-native/core/__ivy_ngcc__/decorators/cordova-property.js":
    /*!*************************************************************************************!*\
      !*** ./node_modules/@ionic-native/core/__ivy_ngcc__/decorators/cordova-property.js ***!
      \*************************************************************************************/

    /*! exports provided: cordovaPropertyGet, cordovaPropertySet */

    /***/
    function node_modulesIonicNativeCore__ivy_ngcc__DecoratorsCordovaPropertyJs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "cordovaPropertyGet", function () {
        return cordovaPropertyGet;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "cordovaPropertySet", function () {
        return cordovaPropertySet;
      });
      /* harmony import */


      var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./common */
      "./node_modules/@ionic-native/core/__ivy_ngcc__/decorators/common.js");

      function cordovaPropertyGet(pluginObj, key) {
        if (Object(_common__WEBPACK_IMPORTED_MODULE_0__["checkAvailability"])(pluginObj, key) === true) {
          return Object(_common__WEBPACK_IMPORTED_MODULE_0__["getPlugin"])(pluginObj.constructor.getPluginRef())[key];
        }

        return null;
      }

      function cordovaPropertySet(pluginObj, key, value) {
        if (Object(_common__WEBPACK_IMPORTED_MODULE_0__["checkAvailability"])(pluginObj, key) === true) {
          Object(_common__WEBPACK_IMPORTED_MODULE_0__["getPlugin"])(pluginObj.constructor.getPluginRef())[key] = value;
        }
      } //# sourceMappingURL=cordova-property.js.map

      /***/

    },

    /***/
    "./node_modules/@ionic-native/core/__ivy_ngcc__/decorators/cordova.js":
    /*!****************************************************************************!*\
      !*** ./node_modules/@ionic-native/core/__ivy_ngcc__/decorators/cordova.js ***!
      \****************************************************************************/

    /*! exports provided: cordova */

    /***/
    function node_modulesIonicNativeCore__ivy_ngcc__DecoratorsCordovaJs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "cordova", function () {
        return cordova;
      });
      /* harmony import */


      var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./common */
      "./node_modules/@ionic-native/core/__ivy_ngcc__/decorators/common.js");

      function cordova(pluginObj, methodName, config, args) {
        return Object(_common__WEBPACK_IMPORTED_MODULE_0__["wrap"])(pluginObj, methodName, config).apply(this, args);
      } //# sourceMappingURL=cordova.js.map

      /***/

    },

    /***/
    "./node_modules/@ionic-native/core/__ivy_ngcc__/decorators/instance-property.js":
    /*!**************************************************************************************!*\
      !*** ./node_modules/@ionic-native/core/__ivy_ngcc__/decorators/instance-property.js ***!
      \**************************************************************************************/

    /*! exports provided: instancePropertyGet, instancePropertySet */

    /***/
    function node_modulesIonicNativeCore__ivy_ngcc__DecoratorsInstancePropertyJs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "instancePropertyGet", function () {
        return instancePropertyGet;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "instancePropertySet", function () {
        return instancePropertySet;
      });

      function instancePropertyGet(pluginObj, key) {
        if (pluginObj._objectInstance && pluginObj._objectInstance[key]) {
          return pluginObj._objectInstance[key];
        }

        return null;
      }

      function instancePropertySet(pluginObj, key, value) {
        if (pluginObj._objectInstance) {
          pluginObj._objectInstance[key] = value;
        }
      } //# sourceMappingURL=instance-property.js.map

      /***/

    },

    /***/
    "./node_modules/@ionic-native/core/__ivy_ngcc__/decorators/interfaces.js":
    /*!*******************************************************************************!*\
      !*** ./node_modules/@ionic-native/core/__ivy_ngcc__/decorators/interfaces.js ***!
      \*******************************************************************************/

    /*! no static exports found */

    /***/
    function node_modulesIonicNativeCore__ivy_ngcc__DecoratorsInterfacesJs(module, exports) {//# sourceMappingURL=interfaces.js.map

      /***/
    },

    /***/
    "./node_modules/@ionic-native/core/__ivy_ngcc__/index.js":
    /*!***************************************************************!*\
      !*** ./node_modules/@ionic-native/core/__ivy_ngcc__/index.js ***!
      \***************************************************************/

    /*! no static exports found */

    /***/
    function node_modulesIonicNativeCore__ivy_ngcc__IndexJs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony import */


      var _bootstrap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./bootstrap */
      "./node_modules/@ionic-native/core/__ivy_ngcc__/bootstrap.js");
      /* harmony import */


      var _ionic_native_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./ionic-native-plugin */
      "./node_modules/@ionic-native/core/__ivy_ngcc__/ionic-native-plugin.js");
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "IonicNativePlugin", function () {
        return _ionic_native_plugin__WEBPACK_IMPORTED_MODULE_1__["IonicNativePlugin"];
      });
      /* harmony import */


      var _decorators_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./decorators/common */
      "./node_modules/@ionic-native/core/__ivy_ngcc__/decorators/common.js");
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "checkAvailability", function () {
        return _decorators_common__WEBPACK_IMPORTED_MODULE_2__["checkAvailability"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "instanceAvailability", function () {
        return _decorators_common__WEBPACK_IMPORTED_MODULE_2__["instanceAvailability"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "wrap", function () {
        return _decorators_common__WEBPACK_IMPORTED_MODULE_2__["wrap"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "getPromise", function () {
        return _decorators_common__WEBPACK_IMPORTED_MODULE_2__["getPromise"];
      });
      /* harmony import */


      var _decorators_cordova__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./decorators/cordova */
      "./node_modules/@ionic-native/core/__ivy_ngcc__/decorators/cordova.js");
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "cordova", function () {
        return _decorators_cordova__WEBPACK_IMPORTED_MODULE_3__["cordova"];
      });
      /* harmony import */


      var _decorators_cordova_function_override__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ./decorators/cordova-function-override */
      "./node_modules/@ionic-native/core/__ivy_ngcc__/decorators/cordova-function-override.js");
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "cordovaFunctionOverride", function () {
        return _decorators_cordova_function_override__WEBPACK_IMPORTED_MODULE_4__["cordovaFunctionOverride"];
      });
      /* harmony import */


      var _decorators_cordova_instance__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./decorators/cordova-instance */
      "./node_modules/@ionic-native/core/__ivy_ngcc__/decorators/cordova-instance.js");
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "cordovaInstance", function () {
        return _decorators_cordova_instance__WEBPACK_IMPORTED_MODULE_5__["cordovaInstance"];
      });
      /* harmony import */


      var _decorators_cordova_property__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./decorators/cordova-property */
      "./node_modules/@ionic-native/core/__ivy_ngcc__/decorators/cordova-property.js");
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "cordovaPropertyGet", function () {
        return _decorators_cordova_property__WEBPACK_IMPORTED_MODULE_6__["cordovaPropertyGet"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "cordovaPropertySet", function () {
        return _decorators_cordova_property__WEBPACK_IMPORTED_MODULE_6__["cordovaPropertySet"];
      });
      /* harmony import */


      var _decorators_instance_property__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ./decorators/instance-property */
      "./node_modules/@ionic-native/core/__ivy_ngcc__/decorators/instance-property.js");
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "instancePropertyGet", function () {
        return _decorators_instance_property__WEBPACK_IMPORTED_MODULE_7__["instancePropertyGet"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "instancePropertySet", function () {
        return _decorators_instance_property__WEBPACK_IMPORTED_MODULE_7__["instancePropertySet"];
      });
      /* harmony import */


      var _decorators_interfaces__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! ./decorators/interfaces */
      "./node_modules/@ionic-native/core/__ivy_ngcc__/decorators/interfaces.js");
      /* harmony import */


      var _decorators_interfaces__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_decorators_interfaces__WEBPACK_IMPORTED_MODULE_8__);
      /* harmony reexport (unknown) */


      for (var __WEBPACK_IMPORT_KEY__ in _decorators_interfaces__WEBPACK_IMPORTED_MODULE_8__) {
        if (["IonicNativePlugin", "checkAvailability", "instanceAvailability", "wrap", "getPromise", "cordova", "cordovaFunctionOverride", "cordovaInstance", "cordovaPropertyGet", "cordovaPropertySet", "instancePropertyGet", "instancePropertySet", "default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function (key) {
          __webpack_require__.d(__webpack_exports__, key, function () {
            return _decorators_interfaces__WEBPACK_IMPORTED_MODULE_8__[key];
          });
        })(__WEBPACK_IMPORT_KEY__);
      } // Decorators


      Object(_bootstrap__WEBPACK_IMPORTED_MODULE_0__["checkReady"])(); //# sourceMappingURL=index.js.map

      /***/
    },

    /***/
    "./node_modules/@ionic-native/core/__ivy_ngcc__/ionic-native-plugin.js":
    /*!*****************************************************************************!*\
      !*** ./node_modules/@ionic-native/core/__ivy_ngcc__/ionic-native-plugin.js ***!
      \*****************************************************************************/

    /*! exports provided: IonicNativePlugin */

    /***/
    function node_modulesIonicNativeCore__ivy_ngcc__IonicNativePluginJs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "IonicNativePlugin", function () {
        return IonicNativePlugin;
      });
      /* harmony import */


      var _decorators_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./decorators/common */
      "./node_modules/@ionic-native/core/__ivy_ngcc__/decorators/common.js");
      /* harmony import */


      var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./util */
      "./node_modules/@ionic-native/core/__ivy_ngcc__/util.js");

      var IonicNativePlugin =
      /** @class */
      function () {
        function IonicNativePlugin() {}
        /**
         * Returns a boolean that indicates whether the plugin is installed
         * @return {boolean}
         */


        IonicNativePlugin.installed = function () {
          var isAvailable = Object(_decorators_common__WEBPACK_IMPORTED_MODULE_0__["checkAvailability"])(this.pluginRef) === true;
          return isAvailable;
        };
        /**
         * Returns the original plugin object
         */


        IonicNativePlugin.getPlugin = function () {
          if (typeof window !== 'undefined') {
            return Object(_util__WEBPACK_IMPORTED_MODULE_1__["get"])(window, this.pluginRef);
          }

          return null;
        };
        /**
         * Returns the plugin's name
         */


        IonicNativePlugin.getPluginName = function () {
          var pluginName = this.pluginName;
          return pluginName;
        };
        /**
         * Returns the plugin's reference
         */


        IonicNativePlugin.getPluginRef = function () {
          var pluginRef = this.pluginRef;
          return pluginRef;
        };
        /**
         * Returns the plugin's install name
         */


        IonicNativePlugin.getPluginInstallName = function () {
          var plugin = this.plugin;
          return plugin;
        };
        /**
         * Returns the plugin's supported platforms
         */


        IonicNativePlugin.getSupportedPlatforms = function () {
          var platform = this.platforms;
          return platform;
        };

        IonicNativePlugin.pluginName = '';
        IonicNativePlugin.pluginRef = '';
        IonicNativePlugin.plugin = '';
        IonicNativePlugin.repo = '';
        IonicNativePlugin.platforms = [];
        IonicNativePlugin.install = '';
        return IonicNativePlugin;
      }(); //# sourceMappingURL=ionic-native-plugin.js.map

      /***/

    },

    /***/
    "./node_modules/@ionic-native/core/__ivy_ngcc__/util.js":
    /*!**************************************************************!*\
      !*** ./node_modules/@ionic-native/core/__ivy_ngcc__/util.js ***!
      \**************************************************************/

    /*! exports provided: get, getPromise */

    /***/
    function node_modulesIonicNativeCore__ivy_ngcc__UtilJs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "get", function () {
        return get;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "getPromise", function () {
        return getPromise;
      });
      /**
       * @private
       */


      function get(element, path) {
        var paths = path.split('.');
        var obj = element;

        for (var i = 0; i < paths.length; i++) {
          if (!obj) {
            return null;
          }

          obj = obj[paths[i]];
        }

        return obj;
      }
      /**
       * @private
       */


      function getPromise(callback) {
        if (callback === void 0) {
          callback = function callback() {};
        }

        var tryNativePromise = function tryNativePromise() {
          if (typeof Promise === 'function' || typeof window !== 'undefined' && window.Promise) {
            return new Promise(function (resolve, reject) {
              callback(resolve, reject);
            });
          } else {
            console.error('No Promise support or polyfill found. To enable Ionic Native support, please add the es6-promise polyfill before this script, or run with a library like Angular or on a recent browser.');
          }
        };

        return tryNativePromise();
      } //# sourceMappingURL=util.js.map

      /***/

    },

    /***/
    "./node_modules/@ionic-native/local-notifications/__ivy_ngcc__/ngx/index.js":
    /*!**********************************************************************************!*\
      !*** ./node_modules/@ionic-native/local-notifications/__ivy_ngcc__/ngx/index.js ***!
      \**********************************************************************************/

    /*! exports provided: ELocalNotificationTriggerUnit, ILocalNotificationActionType, LocalNotifications */

    /***/
    function node_modulesIonicNativeLocalNotifications__ivy_ngcc__NgxIndexJs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ELocalNotificationTriggerUnit", function () {
        return ELocalNotificationTriggerUnit;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ILocalNotificationActionType", function () {
        return ILocalNotificationActionType;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "LocalNotifications", function () {
        return LocalNotifications;
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


      var _ionic_native_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @ionic-native/core */
      "./node_modules/@ionic-native/core/__ivy_ngcc__/index.js");
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! rxjs */
      "./node_modules/rxjs/_esm2015/index.js");

      var ELocalNotificationTriggerUnit;

      (function (ELocalNotificationTriggerUnit) {
        ELocalNotificationTriggerUnit["SECOND"] = "second";
        ELocalNotificationTriggerUnit["MINUTE"] = "minute";
        ELocalNotificationTriggerUnit["HOUR"] = "hour";
        ELocalNotificationTriggerUnit["DAY"] = "day";
        ELocalNotificationTriggerUnit["WEEK"] = "week";
        ELocalNotificationTriggerUnit["MONTH"] = "month";
        ELocalNotificationTriggerUnit["QUARTER"] = "quarter";
        ELocalNotificationTriggerUnit["YEAR"] = "year";
        ELocalNotificationTriggerUnit["WEEKDAY"] = "weekday";
        ELocalNotificationTriggerUnit["WEEKDAY_ORDINAL"] = "weekdayOrdinal";
        ELocalNotificationTriggerUnit["WEEK_OF_MONTH"] = "weekOfMonth";
      })(ELocalNotificationTriggerUnit || (ELocalNotificationTriggerUnit = {}));

      var ILocalNotificationActionType;

      (function (ILocalNotificationActionType) {
        ILocalNotificationActionType["INPUT"] = "input";
        ILocalNotificationActionType["BUTTON"] = "button";
      })(ILocalNotificationActionType || (ILocalNotificationActionType = {}));

      var LocalNotifications =
      /** @class */
      function (_super) {
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(LocalNotifications, _super);

        function LocalNotifications() {
          return _super !== null && _super.apply(this, arguments) || this;
        }

        LocalNotifications.prototype.hasPermission = function () {
          return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "hasPermission", {}, arguments);
        };

        LocalNotifications.prototype.requestPermission = function () {
          return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "requestPermission", {}, arguments);
        };

        LocalNotifications.prototype.schedule = function (options) {
          return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "schedule", {
            "sync": true
          }, arguments);
        };

        LocalNotifications.prototype.update = function (options) {
          return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "update", {
            "sync": true
          }, arguments);
        };

        LocalNotifications.prototype.clear = function (notificationId) {
          return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "clear", {}, arguments);
        };

        LocalNotifications.prototype.clearAll = function () {
          return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "clearAll", {}, arguments);
        };

        LocalNotifications.prototype.cancel = function (notificationId) {
          return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "cancel", {}, arguments);
        };

        LocalNotifications.prototype.cancelAll = function () {
          return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "cancelAll", {}, arguments);
        };

        LocalNotifications.prototype.isPresent = function (notificationId) {
          return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "isPresent", {}, arguments);
        };

        LocalNotifications.prototype.isScheduled = function (notificationId) {
          return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "isScheduled", {}, arguments);
        };

        LocalNotifications.prototype.isTriggered = function (notificationId) {
          return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "isTriggered", {}, arguments);
        };

        LocalNotifications.prototype.hasType = function (id, type) {
          return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "hasType", {}, arguments);
        };

        LocalNotifications.prototype.getType = function (id) {
          return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "getType", {}, arguments);
        };

        LocalNotifications.prototype.getIds = function () {
          return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "getIds", {}, arguments);
        };

        LocalNotifications.prototype.getScheduledIds = function () {
          return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "getScheduledIds", {}, arguments);
        };

        LocalNotifications.prototype.getTriggeredIds = function () {
          return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "getTriggeredIds", {}, arguments);
        };

        LocalNotifications.prototype.get = function (notificationId) {
          return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "get", {}, arguments);
        };

        LocalNotifications.prototype.getAll = function () {
          return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "getAll", {}, arguments);
        };

        LocalNotifications.prototype.getScheduled = function (notificationId) {
          return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "getScheduled", {}, arguments);
        };

        LocalNotifications.prototype.getTriggered = function (notificationId) {
          return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "getTriggered", {}, arguments);
        };

        LocalNotifications.prototype.addActions = function (groupId, actions) {
          return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "addActions", {}, arguments);
        };

        LocalNotifications.prototype.removeActions = function (groupId) {
          return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "removeActions", {}, arguments);
        };

        LocalNotifications.prototype.hasActions = function (groupId) {
          return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "hasActions", {}, arguments);
        };

        LocalNotifications.prototype.getDefaults = function () {
          return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "getDefaults", {
            "sync": true
          }, arguments);
        };

        LocalNotifications.prototype.setDefaults = function (defaults) {
          return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "setDefaults", {
            "sync": true
          }, arguments);
        };

        LocalNotifications.prototype.getAllScheduled = function () {
          return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "getAllScheduled", {}, arguments);
        };

        LocalNotifications.prototype.getAllTriggered = function () {
          return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "getAllTriggered", {}, arguments);
        };

        LocalNotifications.prototype.on = function (eventName) {
          return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "on", {
            "observable": true,
            "clearFunction": "un",
            "clearWithArgs": true
          }, arguments);
        };

        LocalNotifications.prototype.fireEvent = function (eventName, args) {
          return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "fireEvent", {
            "sync": true
          }, arguments);
        };

        LocalNotifications.prototype.fireQueuedEvents = function () {
          return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "fireQueuedEvents", {}, arguments);
        };

        LocalNotifications.pluginName = "LocalNotifications";
        LocalNotifications.plugin = "cordova-plugin-local-notification";
        LocalNotifications.pluginRef = "cordova.plugins.notification.local";
        LocalNotifications.repo = "https://github.com/katzer/cordova-plugin-local-notifications";
        LocalNotifications.platforms = ["Android", "iOS", "Windows"];

        LocalNotifications.ɵfac = function LocalNotifications_Factory(t) {
          return ɵLocalNotifications_BaseFactory(t || LocalNotifications);
        };

        LocalNotifications.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
          token: LocalNotifications,
          factory: function factory(t) {
            return LocalNotifications.ɵfac(t);
          }
        });

        var ɵLocalNotifications_BaseFactory = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetInheritedFactory"](LocalNotifications);
        /*@__PURE__*/


        (function () {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](LocalNotifications, [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"]
          }], null, null);
        })();

        return LocalNotifications;
      }(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["IonicNativePlugin"]); //# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9AaW9uaWMtbmF0aXZlL3BsdWdpbnMvbG9jYWwtbm90aWZpY2F0aW9ucy9uZ3gvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyw4QkFBc0MsTUFBTSxvQkFBb0IsQ0FBQztBQUN4RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDOztBQUVsQyxNQUFNLENBQU4sSUFBWSw2QkFZWDtBQVpELFdBQVksNkJBQTZCO0FBQ3hDLElBQUMsa0RBQWlCLENBQUE7QUFBQyxJQUNsQixrREFBaUIsQ0FBQTtBQUFDLElBQ2xCLDhDQUFhLENBQUE7QUFBQyxJQUNkLDRDQUFXLENBQUE7QUFBQyxJQUNaLDhDQUFhLENBQUE7QUFBQyxJQUNkLGdEQUFlLENBQUE7QUFBQyxJQUNoQixvREFBbUIsQ0FBQTtBQUFDLElBQ3BCLDhDQUFhLENBQUE7QUFBQyxJQUNkLG9EQUFtQixDQUFBO0FBQUMsSUFDcEIsbUVBQWtDLENBQUE7QUFBQyxJQUNuQyw4REFBNkIsQ0FBQTtBQUMvQixDQUFDLEVBWlcsNkJBQTZCLEtBQTdCLDZCQUE2QixRQVl4QztBQTBJRCxNQUFNLENBQU4sSUFBWSw0QkFHWDtBQUhELFdBQVksNEJBQTRCO0FBQ3ZDLElBQUMsK0NBQWUsQ0FBQTtBQUFDLElBQ2hCLGlEQUFpQixDQUFBO0FBQ25CLENBQUMsRUFIVyw0QkFBNEIsS0FBNUIsNEJBQTRCLFFBR3ZDO0FBQ0Q7QUFJNkIsSUFzWFcsc0NBQWlCO0FBQUM7QUFFOUI7QUFFMUI7QUFDQSxJQUNBLDBDQUFhO0FBS2EsSUFJMUIsOENBQWlCO0FBS2EsSUFNOUIscUNBQVEsYUFBQyxPQUFtRDtBQUdWLElBTWxELG1DQUFNLGFBQUMsT0FBNEI7QUFJaEMsSUFJSCxrQ0FBSyxhQUFDLGNBQW1CO0FBS2YsSUFJVixxQ0FBUTtBQUtpQixJQUt6QixtQ0FBTSxhQUFDLGNBQW1CO0FBS2YsSUFJWCxzQ0FBUztBQUtpQixJQUsxQixzQ0FBUyxhQUFDLGNBQXNCO0FBS3RCLElBS1Ysd0NBQVcsYUFBQyxjQUFzQjtBQUt0QixJQUtaLHdDQUFXLGFBQUMsY0FBc0I7QUFLdEIsSUFNWixvQ0FBTyxhQUFDLEVBQVUsRUFBRSxJQUFZO0FBS3hCLElBSVIsb0NBQU8sYUFBQyxFQUFVO0FBS1YsSUFJUixtQ0FBTTtBQUtZLElBSWxCLDRDQUFlO0FBS1ksSUFJM0IsNENBQWU7QUFLWSxJQUszQixnQ0FBRyxhQUFDLGNBQW1CO0FBSXhCLElBS0MsbUNBQU07QUFLQSxJQUtOLHlDQUFZLGFBQUMsY0FBbUI7QUFLOUIsSUFLRix5Q0FBWSxhQUFDLGNBQW1CO0FBSzlCLElBTUYsdUNBQVUsYUFBQyxPQUFZLEVBQUUsT0FBbUM7QUFLN0MsSUFLZiwwQ0FBYSxhQUFDLE9BQVk7QUFLUixJQUtsQix1Q0FBVSxhQUFDLE9BQVk7QUFLWixJQU1YLHdDQUFXO0FBSytCLElBTTFDLHdDQUFXLGFBQUMsUUFBYTtBQUtLLElBSTlCLDRDQUFlO0FBS0EsSUFJZiw0Q0FBZTtBQUtBLElBU2YsK0JBQUUsYUFBQyxTQUFpQjtBQUtrRCxJQU90RSxzQ0FBUyxhQUFDLFNBQWlCLEVBQUUsSUFBUztBQUdhLElBSW5ELDZDQUFnQjtBQUlzQjtBQUEwRDtBQUFxRTtBQUF5RTtBQUE4RjtJQXZTalUsa0JBQWtCLHdCQUQ5QixVQUFVLEVBQUUsUUFDQSxrQkFBa0I7Ozs7OzBCQUFFO0FBQUMsNkJBeGhCbEM7QUFBRSxFQXdoQnNDLGlCQUFpQjtBQUN4RCxTQURZLGtCQUFrQjtBQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29yZG92YSwgSW9uaWNOYXRpdmVQbHVnaW4sIFBsdWdpbiB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmV4cG9ydCBlbnVtIEVMb2NhbE5vdGlmaWNhdGlvblRyaWdnZXJVbml0IHtcbiAgU0VDT05EID0gJ3NlY29uZCcsXG4gIE1JTlVURSA9ICdtaW51dGUnLFxuICBIT1VSID0gJ2hvdXInLFxuICBEQVkgPSAnZGF5JyxcbiAgV0VFSyA9ICd3ZWVrJyxcbiAgTU9OVEggPSAnbW9udGgnLFxuICBRVUFSVEVSID0gJ3F1YXJ0ZXInLFxuICBZRUFSID0gJ3llYXInLFxuICBXRUVLREFZID0gJ3dlZWtkYXknLFxuICBXRUVLREFZX09SRElOQUwgPSAnd2Vla2RheU9yZGluYWwnLFxuICBXRUVLX09GX01PTlRIID0gJ3dlZWtPZk1vbnRoJyxcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJTG9jYWxOb3RpZmljYXRpb25FdmVyeSB7XG4gIC8qKlxuICAgKiBUaGUgbWludXRlLlxuICAgKi9cbiAgbWludXRlPzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgaG91ci5cbiAgICovXG4gIGhvdXI/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBkYXkuXG4gICAqL1xuICBkYXk/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBkYXkgb2Ygd2Vlay5cbiAgICovXG4gIHdlZWtkYXk/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSB3ZWVrIG9mIHllYWRheSBvZiB0aGUgYXJkaW5hbCB3ZWVrLlxuICAgKi9cbiAgd2Vlaz86IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIGRheSBvZiB0aGUgb3JkaW5hbCB3ZWVrLlxuICAgKi9cbiAgd2Vla2RheU9yZGluYWw/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSB3ZWVrIG9mIG1vbnRoLlxuICAgKi9cbiAgd2Vla09mTW9udGg/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBtb250aC5cbiAgICovXG4gIG1vbnRoPzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgcXVhcnRlci5cbiAgICovXG4gIHF1YXJ0ZXI/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSB5ZWFyLlxuICAgKi9cbiAgeWVhcj86IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJTG9jYWxOb3RpZmljYXRpb25UcmlnZ2VyIHtcbiAgLyoqICoqKioqIEZJWCAqKioqKiAqL1xuXG4gIC8qKlxuICAgKiBUaGUgZGF0ZSBhbmQgdGltZSB3aGVuIHRoZSBzeXN0ZW0gc2hvdWxkIGRlbGl2ZXIgdGhlIGxvY2FsIG5vdGlmaWNhdGlvbi4gSWYgdGhlIHNwZWNpZmllZCB2YWx1ZSBpcyBuaWwgb3IgaXMgYSBkYXRlIGluIHRoZSBwYXN0LCB0aGUgbG9jYWwgbm90aWZpY2F0aW9uIGlzIGRlbGl2ZXJlZCBpbW1lZGlhdGVseS5cbiAgICogRGVmYXVsdDogbm93IH4gbmV3IERhdGUoKVxuICAgKi9cbiAgYXQ/OiBEYXRlO1xuXG4gIC8qKiAqKioqKiBUSU1FU1BBTiAqKioqKiAqL1xuXG4gIC8qKlxuICAgKiBBbW91bnQgb2YgdW5pdHNcbiAgICovXG4gIGluPzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBVbml0XG4gICAqL1xuICB1bml0PzogRUxvY2FsTm90aWZpY2F0aW9uVHJpZ2dlclVuaXQ7XG5cbiAgLyoqICoqKioqIFJFUEVBVC9NQVRDSCAqKioqKiAqL1xuXG4gIC8qKlxuICAgKiBBbW91bnQgb2YgdW5pdHNcbiAgICovXG4gIGNvdW50PzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgdW5pdFxuICAgKi9cbiAgZXZlcnk/OiBFTG9jYWxOb3RpZmljYXRpb25UcmlnZ2VyVW5pdCB8IElMb2NhbE5vdGlmaWNhdGlvbkV2ZXJ5O1xuXG4gIC8qKlxuICAgKiBUaGUgZW5kIG9mIHRoZSByZXBlYXRpbmcgbm90aWZpY2F0aW9uXG4gICAqL1xuICBiZWZvcmU/OiBEYXRlO1xuXG4gIC8qKlxuICAgKiBUaGUgZGF0ZSBhbmQgdGltZSB3aGVuIHRoZSBzeXN0ZW0gc2hvdWxkIGRlbGl2ZXIgdGhlIGxvY2FsIG5vdGlmaWNhdGlvbi4gSWYgdGhlIHNwZWNpZmllZCB2YWx1ZSBpcyBuaWwgb3IgaXMgYSBkYXRlIGluIHRoZSBwYXN0LCB0aGUgbG9jYWwgbm90aWZpY2F0aW9uIGlzIGRlbGl2ZXJlZCBpbW1lZGlhdGVseS5cbiAgICogT25seSBmb3IgXCJyZXBlYXRcIlxuICAgKiBEZWZhdWx0OiBub3cgfiBuZXcgRGF0ZSgpXG4gICAqL1xuICBmaXJzdEF0PzogRGF0ZTtcblxuICAvKipcbiAgICogT25seSBmb3IgXCJtYXRjaFwiXG4gICAqL1xuICBhZnRlcj86IERhdGU7XG5cbiAgLyoqICoqKioqIExPQ0FUSU9OICoqKioqICovXG5cbiAgLyoqXG4gICAqIElPUyBPTkxZXG4gICAqIENlbnRlciBvZiB0aGUgbG9jYXRpb25cbiAgICogTGF0aXR1ZGUgYW5kIExvbmdpdHVkZSB2YWx1ZXNcbiAgICovXG4gIGNlbnRlcj86IG51bWJlcltdO1xuXG4gIC8qKlxuICAgKiBJT1MgT05MWVxuICAgKiBSYWRpdXMgaW4gbWV0ZXJzXG4gICAqL1xuICByYWRpdXM/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIElPUyBPTkxZXG4gICAqIFRyaWdnZXIgb24gZW50cnkgb2YgdGhlIGxvY2F0aW9uXG4gICAqL1xuICBub3RpZnlPbkVudHJ5PzogYm9vbGVhbjtcblxuICAvKipcbiAgICogSU9TIE9OTFlcbiAgICogVHJpZ2dlciBvbiBleGl0IG9mIHRoZSBsb2NhdGlvblxuICAgKi9cbiAgbm90aWZ5T25FeGl0PzogYm9vbGVhbjtcblxuICAvKipcbiAgICogSU9TIE9OTFlcbiAgICogVHJpZ2dlciBvbmx5IG9uY2U/XG4gICAqL1xuICBzaW5nbGU/OiBib29sZWFuO1xufVxuXG5leHBvcnQgZW51bSBJTG9jYWxOb3RpZmljYXRpb25BY3Rpb25UeXBlIHtcbiAgSU5QVVQgPSAnaW5wdXQnLFxuICBCVVRUT04gPSAnYnV0dG9uJyxcbn1cblxuLyoqXG4gKiBOb3RpZmljYXRpb24gYWN0aW9uXG4gKlxuICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20va2F0emVyL2NvcmRvdmEtcGx1Z2luLWxvY2FsLW5vdGlmaWNhdGlvbnMjYWN0aW9uc1xuICovXG5leHBvcnQgaW50ZXJmYWNlIElMb2NhbE5vdGlmaWNhdGlvbkFjdGlvbiB7XG4gIC8qKlxuICAgKiBUaGUgaWQgb2YgdGhlIGFjdGlvbiBpcyB1c2VkIGFzIHRoZSBldmVudCBuYW1lIGluIHRoZSBsaXN0ZW5lciBmdW5jdGlvblxuICAgKi9cbiAgaWQ/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSB0aXRsZSBvZiB0aGUgbm90aWZpY2F0aW9uIG1lc3NhZ2VcbiAgICovXG4gIHRpdGxlPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBNYWtlIHRoaXMgbm90aWZpY2F0aW9uIHNob3cgd2hlbiBhcHAgaW4gZm9yZWdyb3VuZC5cbiAgICovXG4gIGZvcmVncm91bmQ/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBTcGVjaWZpZXMgd2hldGhlciB0aGUgYWN0aW9uIGNhdXNlcyB0aGUgYXBwIHRvIGxhdW5jaCBpbiB0aGUgZm9yZWdyb3VuZFxuICAgKi9cbiAgbGF1bmNoPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogSWYgdGhlIHZhbHVlIGlzICdkZWNsaW5lJyB0aGUgYWN0aW9uIGlzIGRpc3BsYXllZCB3aXRoIHNwZWNpYWwgaGlnaGxpZ2h0aW5nIHRvIGluZGljYXRlIHRoYXQgaXQgcGVyZm9ybXMgYSBkZXN0cnVjdGl2ZSB0YXNrXG4gICAqL1xuICB1aT86IHN0cmluZztcblxuICAvKipcbiAgICogU3BlY2lmaWVzIHdoZXRoZXIgdGhlIGFjdGlvbiByZXF1aXJlcyB0aGF0IHRoZSB1c2Vy4oCZcyBkZXZpY2UgYmUgdW5sb2NrZWQuXG4gICAqIFdoZW4gdGhlIHVzZXIgc2VsZWN0cyBhbiBhY3Rpb24gd2l0aCB0aGlzIG9wdGlvbiwgdGhlIHN5c3RlbSBwcm9tcHRzXG4gICAqIHRoZSB1c2VyIHRvIHVubG9jayB0aGUgZGV2aWNlXG4gICAqL1xuICBuZWVkc0F1dGg/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBUaGUgcmVzb3VyY2UgcGF0aCBvZiB0aGUgYWN0aW9uIGljb25cbiAgICovXG4gIGljb24/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEFORFJPSUQgT05MWVxuICAgKiBBbiBhcnJheSBvZiBwcmUtZGVmaW5lZCBjaG9pY2VzIGZvciB1c2VycyBpbnB1dFxuICAgKi9cbiAgY2hvaWNlcz86IHN0cmluZ1tdO1xuXG4gIC8qKlxuICAgKiBBTkRST0lEIE9OTFlcbiAgICogU3BlY2lmaWVzIHdoZXRoZXIgdGhlIHVzZXIgY2FuIHByb3ZpZGUgYXJiaXRyYXJ5IHRleHQgdmFsdWVzXG4gICAqL1xuICBlZGl0YWJsZT86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIElPUyBPTkxZXG4gICAqIFRoZSB0aXRsZSBvZiB0aGUgdGV4dCBpbnB1dCBidXR0b24gdGhhdCBpcyBkaXNwbGF5ZWQgdG8gdGhlIHVzZXIuXG4gICAqL1xuICBzdWJtaXRUaXRsZT86IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIHR5cGUgb2YgdGhlIGFjdGlvbi4gSWYgb21pdHRlZCAnYnV0dG9uJyBpcyB1c2VkLlxuICAgKi9cbiAgdHlwZT86IElMb2NhbE5vdGlmaWNhdGlvbkFjdGlvblR5cGU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUxvY2FsTm90aWZpY2F0aW9uUHJvZ3Jlc3NCYXIge1xuICAvKipcbiAgICogSXMgdGhlIHByb2dyZXNzIGJhciBlbmFibGVkP1xuICAgKi9cbiAgZW5hYmxlZD86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IHZhbHVlXG4gICAqL1xuICB2YWx1ZT86IG51bWJlcjtcblxuICAvKipcbiAgICogQU5EUk9JRCBPTkxZXG4gICAqIFRoZSBtYXhpbXVtIHZhbHVlIChkZWZhdWx0IGlzIDEwMClcbiAgICovXG4gIG1heFZhbHVlPzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBBTkRST0lEIE9OTFlcbiAgICogU2hvdyBhbiBpbmRldGVybWluYXRlIHByb2dyZXNzIGJhclxuICAgKi9cbiAgaW5kZXRlcm1pbmF0ZT86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFdJTkRPV1MgT05MWVxuICAgKiBHZXRzIG9yIHNldHMgYW4gb3B0aW9uYWwgc3RyaW5nIHRvIGJlIGRpc3BsYXllZCBpbnN0ZWFkIG9mIHRoZVxuICAgKiBkZWZhdWx0IHBlcmNlbnRhZ2Ugc3RyaW5nLiBJZiB0aGlzIGlzbid0IHByb3ZpZGVkLCBzb21ldGhpbmdcbiAgICogbGlrZSBcIjcwJVwiIHdpbGwgYmUgZGlzcGxheWVkLlxuICAgKi9cbiAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFdJTkRPV1MgT05MWVxuICAgKiBTZXRzIHRoZSBzdGF0dXMgKHJlcXVpcmVkKSwgd2hpY2ggaXMgZGlzcGxheWVkIHVuZGVybmVhdGggdGhlIHByb2dyZXNzIGJhclxuICAgKiBvbiB0aGUgbGVmdC5cbiAgICogVGhpcyBzdHJpbmcgc2hvdWxkIHJlZmxlY3QgdGhlIHN0YXR1cyBvZiB0aGUgb3BlcmF0aW9uLFxuICAgKiBsaWtlIFwiRG93bmxvYWRpbmcuLi5cIiBvciBcIkluc3RhbGxpbmcuLi5cIlxuICAgKi9cbiAgc3RhdHVzPzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElMb2NhbE5vdGlmaWNhdGlvbiB7XG4gIC8qKlxuICAgKiBBIHVuaXF1ZSBpZGVudGlmaWVyIHJlcXVpcmVkIHRvIGNsZWFyLCBjYW5jZWwsIHVwZGF0ZSBvciByZXRyaWV2ZSB0aGUgbG9jYWwgbm90aWZpY2F0aW9uIGluIHRoZSBmdXR1cmVcbiAgICogRGVmYXVsdDogMFxuICAgKi9cbiAgaWQ/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEZpcnN0IHJvdyBvZiB0aGUgbm90aWZpY2F0aW9uXG4gICAqIERlZmF1bHQ6IEVtcHR5IHN0cmluZyAoaU9TKSBvciB0aGUgYXBwIG5hbWUgKEFuZHJvaWQpXG4gICAqL1xuICB0aXRsZT86IHN0cmluZztcblxuICAvKipcbiAgICogU2Vjb25kIHJvdyBvZiB0aGUgbm90aWZpY2F0aW9uXG4gICAqIERlZmF1bHQ6IEVtcHR5IHN0cmluZ1xuICAgKi9cbiAgdGV4dD86IHN0cmluZyB8IHN0cmluZ1tdO1xuXG4gIC8qKlxuICAgKiBUaGUgbnVtYmVyIGN1cnJlbnRseSBzZXQgYXMgdGhlIGJhZGdlIG9mIHRoZSBhcHAgaWNvbiBpbiBTcHJpbmdib2FyZCAoaU9TKSBvciBhdCB0aGUgcmlnaHQtaGFuZCBzaWRlIG9mIHRoZSBsb2NhbCBub3RpZmljYXRpb24gKEFuZHJvaWQpXG4gICAqIERlZmF1bHQ6IDAgKHdoaWNoIG1lYW5zIGRvbid0IHNob3cgYSBudW1iZXIpXG4gICAqL1xuICBiYWRnZT86IG51bWJlcjtcblxuICAvKipcbiAgICogVXJpIG9mIHRoZSBmaWxlIGNvbnRhaW5pbmcgdGhlIHNvdW5kIHRvIHBsYXkgd2hlbiBhbiBhbGVydCBpcyBkaXNwbGF5ZWRcbiAgICogRGVmYXVsdDogcmVzOi8vcGxhdGZvcm1fZGVmYXVsdFxuICAgKi9cbiAgc291bmQ/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEFyYml0cmFyeSBkYXRhLCBvYmplY3RzIHdpbGwgYmUgZW5jb2RlZCB0byBKU09OIHN0cmluZ1xuICAgKiBEZWZhdWx0OiBudWxsXG4gICAqL1xuICBkYXRhPzogYW55O1xuXG4gIC8qKlxuICAgKiBBTkRST0lEIE9OTFlcbiAgICogVXJpIG9mIHRoZSBpY29uIHRoYXQgaXMgc2hvd24gaW4gdGhlIHRpY2tlciBhbmQgbm90aWZpY2F0aW9uXG4gICAqIERlZmF1bHQ6IHJlczovL2ljb25cbiAgICovXG4gIGljb24/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEFORFJPSUQgT05MWVxuICAgKiBVcmkgb2YgdGhlIHJlc291cmNlIChvbmx5IHJlczovLykgdG8gdXNlIGluIHRoZSBub3RpZmljYXRpb24gbGF5b3V0cy4gRGlmZmVyZW50IGNsYXNzZXMgb2YgZGV2aWNlcyBtYXkgcmV0dXJuIGRpZmZlcmVudCBzaXplc1xuICAgKiBEZWZhdWx0OiByZXM6Ly9pY19wb3B1cF9yZW1pbmRlclxuICAgKi9cbiAgc21hbGxJY29uPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBTkRST0lEIE9OTFlcbiAgICogUkdCIHZhbHVlIGZvciB0aGUgYmFja2dyb3VuZCBjb2xvciBvZiB0aGUgc21hbGxJY29uLlxuICAgKiBEZWZhdWx0OiBBbmRyb2lkcyBDT0xPUl9ERUZBVUxULCB3aGljaCB3aWxsIHZhcnkgYmFzZWQgb24gQW5kcm9pZCB2ZXJzaW9uLlxuICAgKi9cbiAgY29sb3I/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEFORFJPSUQgT05MWVxuICAgKiBVc2UgdGhlIGRlZmF1bHQgbm90aWZpY2F0aW9uIHZpYnJhdGUuXG4gICAqL1xuICB2aWJyYXRlPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogQU5EUk9JRCBPTkxZXG4gICAqIERlZmluZSB0aGUgYmxpbmtpbmcgb2YgdGhlIExFRCBvbiB0aGUgZGV2aWNlLlxuICAgKiBJZiBzZXQgdG8gdHJ1ZSwgdGhlIExFRCB3aWxsIGJsaW5rIGluIHRoZSBkZWZhdWx0IGNvbG9yIHdpdGhcbiAgICogdGltaW5ncyBmb3Igb24gYW5kIG9mZiBzZXQgdG8gMTAwMCBtcy5cbiAgICogSWYgc2V0IHRvIGEgc3RyaW5nLCB0aGUgTEVEIHdpbGwgYmxpbmsgaW4gdGhpcyBBUkdCIHZhbHVlIHdpdGhcbiAgICogdGltaW5ncyBmb3Igb24gYW5kIG9mZiBzZXQgdG8gMTAwMCBtcy5cbiAgICogSWYgc2V0IHRvIGFuIGFycmF5LCB0aGUgdmFsdWUgb2YgdGhlIGtleSAwIHdpbGwgYmUgdXNlZCBhcyB0aGUgY29sb3IsXG4gICAqIHRoZSB2YWx1ZSBvZiB0aGUga2V5IDEgd2lsbCBiZSB1c2VkIGFzIHRoZSAnb24nIHRpbWluZywgdGhlIHZhbHVlIG9mXG4gICAqIHRoZSBrZXkgMiB3aWxsIGJlIHVzZWQgYXMgdGhlICdvZmYnIHRpbWluZ1xuICAgKi9cbiAgbGVkPzogeyBjb2xvcjogc3RyaW5nOyBvbjogbnVtYmVyOyBvZmY6IG51bWJlciB9IHwgYW55W10gfCBib29sZWFuIHwgc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBOb3RpZmljYXRpb24gcHJpb3JpdHkuXG4gICAqIEludGVnZXJzIGJldHdlZW4gLTIgYW5kIDIsIHdoZXJlYXMgLTIgaXMgbWluaW11bSBhbmQgMiBpcyBtYXhpbXVtIHByaW9yaXR5XG4gICAqL1xuICBwcmlvcml0eT86IG51bWJlcjtcblxuICAvKipcbiAgICogSXMgYSBzaWxlbnQgbm90aWZpY2F0aW9uXG4gICAqL1xuICBzaWxlbnQ/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBTcGVjaWZpZXMgd2hldGhlciB0aGUgYSBjbGljayBvbiB0aGUgbm90aWZpY2F0aW9uIGNhdXNlcyB0aGUgYXBwXG4gICAqIHRvIGxhdW5jaCBpbiB0aGUgZm9yZWdyb3VuZFxuICAgKi9cbiAgbGF1bmNoPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogQU5EUk9JRCBPTkxZXG4gICAqIFdha2V1cCB0aGUgZGV2aWNlLiAoZGVmYXVsdCBpcyB0cnVlKVxuICAgKi9cbiAgd2FrZXVwPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogQU5EUk9JRCBPTkxZXG4gICAqIFNwZWNpZmllcyBhIGR1cmF0aW9uIGluIG1pbGxpc2Vjb25kcyBhZnRlciB3aGljaCB0aGlzIG5vdGlmaWNhdGlvbiBzaG91bGQgYmUgY2FuY2VsZWQsIGlmIGl0IGlzIG5vdCBhbHJlYWR5IGNhbmNlbGVkLlxuICAgKi9cbiAgdGltZW91dEFmdGVyPzogbnVtYmVyIHwgZmFsc2U7XG5cbiAgLyoqXG4gICAqIEFjdGlvbnMgaWQgb3IgYWN0aW9uc1xuICAgKi9cbiAgYWN0aW9ucz86IHN0cmluZyB8IElMb2NhbE5vdGlmaWNhdGlvbkFjdGlvbltdO1xuXG4gIC8qKlxuICAgKiBXaGVuIHRvIHRyaWdnZXIgdGhlIG5vdGlmaWNhdGlvblxuICAgKi9cbiAgdHJpZ2dlcj86IElMb2NhbE5vdGlmaWNhdGlvblRyaWdnZXI7XG5cbiAgLyoqXG4gICAqIEEgbGlzdCBvZiBpbWFnZSBhdHRhY2htZW50c1xuICAgKi9cbiAgYXR0YWNobWVudHM/OiBzdHJpbmdbXTtcblxuICAvKipcbiAgICogQU5EUk9JRCBPTkxZXG4gICAqIElmIGFuZCBob3cgdGhlIG5vdGlmaWNhdGlvbiBzaGFsbCBzaG93IHRoZSB3aGVuIGRhdGUuXG4gICAqIFBvc3NiaWxlIHZhbHVlczpcbiAgICogICAgICAgICAgICAgICAgICBib29sZWFuOiB0cnVlIGVxdWFscyAnY2xvY2snLCBmYWxzZSBkaXNhYmxlIGEgd2F0Y2gvY291bnRlclxuICAgKiAgICAgICAgICAgICAgICAgICdjbG9jayc6IFNob3cgdGhlIHdoZW4gZGF0ZSBpbiB0aGUgY29udGVudCB2aWV3XG4gICAqICAgICAgICAgICAgICAgICAgJ2Nocm9ub21ldGVyJzogU2hvdyBhIHN0b3B3YXRjaFxuICAgKlxuICAgKi9cbiAgY2xvY2s/OiBib29sZWFuIHwgc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBTaG93cyBhIHByb2dyZXNzIGJhclxuICAgKiBTZXR0aW5nIGEgYm9vbGVhbiBpcyBhIHNob3J0Y3V0IGZvciB7ZW5hYmxlZDogdHJ1ZS9mYWxzZX0gcmVzcGVjdGl2ZWx5XG4gICAqL1xuICBwcm9ncmVzc0Jhcj86IElMb2NhbE5vdGlmaWNhdGlvblByb2dyZXNzQmFyIHwgYm9vbGVhbjtcblxuICAvKipcbiAgICogQU5EUk9JRCBPTkxZXG4gICAqIElmIG11bHRpcGxlIG5vdGlmaWNhdGlvbnMgaGF2ZSB0aGUgc2FtZSBncm91cCB5b3VyIGFwcCBjYW4gcHJlc2VudFxuICAgKiB0aGVtIGFzIGEgc2luZ2xlIGdyb3VwLlxuICAgKi9cbiAgZ3JvdXA/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEFORFJPSUQgT05MWVxuICAgKiBJZiBzZXQgdG8gJ3RydWUnIHRoaXMgbm90aWZpY2F0aW9uIGNvdWxkIHVzZSAnc3VtbWFyeScgdG8gc3VtbWFyaXplXG4gICAqIHRoZSBjb250ZW50cyBvZiB0aGUgd2hvbGUgZ3JvdXBcbiAgICovXG4gIGdyb3VwU3VtbWFyeT86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEFORFJPSUQgT05MWVxuICAgKiBTdW1tYXJ5IG9mIHRoZSB3aG9sZSBub3RpZmljYXRpb24gZ3JvdXAuIFNob3VsZCBiZSB1c2VkIGluIGNvbmp1bnRpb25cbiAgICogd2l0aCAnZ3JvdXBTdW1tYXJ5JyBzZXQgdG8gdHJ1ZVxuICAgKi9cbiAgc3VtbWFyeT86IHN0cmluZztcblxuICAvKipcbiAgICogQU5EUk9JRCBPTkxZXG4gICAqIFNldHMgdGhlIG51bWJlciBvZiBpdGVtcyB0aGlzIG5vdGlmaWNhdGlvbiByZXByZXNlbnRzLlxuICAgKi9cbiAgbnVtYmVyPzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBBTkRST0lEIE9OTFlcbiAgICogU2V0IHdoZXRoZXIgdGhpcyBpcyBhbiBcIm9uZ29pbmdcIiBub3RpZmljYXRpb24uXG4gICAqIE9uZ29pbmcgbm90aWZpY2F0aW9ucyBjYW5ub3QgYmUgZGlzbWlzc2VkIGJ5IHRoZSB1c2VyLFxuICAgKiBzbyB5b3VyIGFwcGxpY2F0aW9uIG9yIHNlcnZpY2UgbXVzdCB0YWtlIGNhcmUgb2YgY2FuY2VsaW5nIHRoZW0uXG4gICAqL1xuICBzdGlja3k/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBBTkRST0lEIE9OTFlcbiAgICogTWFrZSB0aGlzIG5vdGlmaWNhdGlvbiBhdXRvbWF0aWNhbGx5IGRpc21pc3NlZCB3aGVuIHRoZSB1c2VyIHRvdWNoZXMgaXQuXG4gICAqL1xuICBhdXRvQ2xlYXI/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBBTkRST0lEIE9OTFlcbiAgICogSWYgc2V0IHRvIHRydWUgdGhlIG5vdGlmaWNhdGlvbiB3aWxsIGJlIHNob3cgaW4gaXRzIGVudGlyZXR5IG9uIGFsbCBsb2Nrc2NyZWVucy5cbiAgICogSWYgc2V0IHRvIGZhbHNlIGl0IHdpbGwgbm90IGJlIHJldmVhbGVkIG9uIGEgc2VjdXJlIGxvY2tzY3JlZW4uXG4gICAqL1xuICBsb2Nrc2NyZWVuPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogQU5EUk9JRCBPTkxZXG4gICAqIFNldCB0aGUgZGVmYXVsdCBub3RpZmljYXRpb24gb3B0aW9ucyB0aGF0IHdpbGwgYmUgdXNlZC5cbiAgICogVGhlIHZhbHVlIHNob3VsZCBiZSBvbmUgb3IgbW9yZSBvZiB0aGUgZm9sbG93aW5nIGZpZWxkcyBjb21iaW5lZCB3aXRoXG4gICAqIGJpdHdpc2Utb3I6IERFRkFVTFRfU09VTkQsIERFRkFVTFRfVklCUkFURSwgREVGQVVMVF9MSUdIVFMuXG4gICAqL1xuICBkZWZhdWx0cz86IG51bWJlcjtcblxuICAvKipcbiAgICogQU5EUk9JRCBPTkxZXG4gICAqIFNwZWNpZmllcyB0aGUgY2hhbm5lbCB0aGUgbm90aWZpY2F0aW9uIHNob3VsZCBiZSBkZWxpdmVyZWQgb24uXG4gICAqL1xuICBjaGFubmVsPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBTkRST0lEIE9OTFlcbiAgICogU2V0IHRoZSB0b2tlbiBmb3IgdGhlIG1lZGlhIHNlc3Npb25cbiAgICovXG4gIG1lZGlhU2Vzc2lvbj86IHN0cmluZztcblxuICAvKipcbiAgICogTWFrZSB0aGlzIG5vdGlmaWNhdGlvbiBzaG93IHdoZW4gYXBwIGluIGZvcmVncm91bmQuXG4gICAqL1xuICBmb3JlZ3JvdW5kPzogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBAbmFtZSBMb2NhbCBOb3RpZmljYXRpb25zXG4gKiBAZGVzY3JpcHRpb25cbiAqIFRoaXMgcGx1Z2luIGFsbG93cyB5b3UgdG8gZGlzcGxheSBsb2NhbCBub3RpZmljYXRpb25zIG9uIHRoZSBkZXZpY2VcbiAqXG4gKiBAdXNhZ2VcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7IExvY2FsTm90aWZpY2F0aW9ucyB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvbG9jYWwtbm90aWZpY2F0aW9ucy9uZ3gnO1xuICpcbiAqXG4gKiBjb25zdHJ1Y3Rvcihwcml2YXRlIGxvY2FsTm90aWZpY2F0aW9uczogTG9jYWxOb3RpZmljYXRpb25zKSB7IH1cbiAqXG4gKiAuLi5cbiAqXG4gKlxuICogLy8gU2NoZWR1bGUgYSBzaW5nbGUgbm90aWZpY2F0aW9uXG4gKiB0aGlzLmxvY2FsTm90aWZpY2F0aW9ucy5zY2hlZHVsZSh7XG4gKiAgIGlkOiAxLFxuICogICB0ZXh0OiAnU2luZ2xlIElMb2NhbE5vdGlmaWNhdGlvbicsXG4gKiAgIHNvdW5kOiBpc0FuZHJvaWQ/ICdmaWxlOi8vc291bmQubXAzJzogJ2ZpbGU6Ly9iZWVwLmNhZicsXG4gKiAgIGRhdGE6IHsgc2VjcmV0OiBrZXkgfVxuICogfSk7XG4gKlxuICpcbiAqIC8vIFNjaGVkdWxlIG11bHRpcGxlIG5vdGlmaWNhdGlvbnNcbiAqIHRoaXMubG9jYWxOb3RpZmljYXRpb25zLnNjaGVkdWxlKFt7XG4gKiAgICBpZDogMSxcbiAqICAgIHRleHQ6ICdNdWx0aSBJTG9jYWxOb3RpZmljYXRpb24gMScsXG4gKiAgICBzb3VuZDogaXNBbmRyb2lkID8gJ2ZpbGU6Ly9zb3VuZC5tcDMnOiAnZmlsZTovL2JlZXAuY2FmJyxcbiAqICAgIGRhdGE6IHsgc2VjcmV0OmtleSB9XG4gKiAgIH0se1xuICogICAgaWQ6IDIsXG4gKiAgICB0aXRsZTogJ0xvY2FsIElMb2NhbE5vdGlmaWNhdGlvbiBFeGFtcGxlJyxcbiAqICAgIHRleHQ6ICdNdWx0aSBJTG9jYWxOb3RpZmljYXRpb24gMicsXG4gKiAgICBpY29uOiAnaHR0cDovL2V4YW1wbGUuY29tL2ljb24ucG5nJ1xuICogfV0pO1xuICpcbiAqXG4gKiAvLyBTY2hlZHVsZSBkZWxheWVkIG5vdGlmaWNhdGlvblxuICogdGhpcy5sb2NhbE5vdGlmaWNhdGlvbnMuc2NoZWR1bGUoe1xuICogICAgdGV4dDogJ0RlbGF5ZWQgSUxvY2FsTm90aWZpY2F0aW9uJyxcbiAqICAgIHRyaWdnZXI6IHthdDogbmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkgKyAzNjAwKX0sXG4gKiAgICBsZWQ6ICdGRjAwMDAnLFxuICogICAgc291bmQ6IG51bGxcbiAqIH0pO1xuICogYGBgXG4gKiBAaW50ZXJmYWNlc1xuICogSUxvY2FsTm90aWZpY2F0aW9uXG4gKi9cbkBQbHVnaW4oe1xuICBwbHVnaW5OYW1lOiAnTG9jYWxOb3RpZmljYXRpb25zJyxcbiAgcGx1Z2luOiAnY29yZG92YS1wbHVnaW4tbG9jYWwtbm90aWZpY2F0aW9uJyxcbiAgcGx1Z2luUmVmOiAnY29yZG92YS5wbHVnaW5zLm5vdGlmaWNhdGlvbi5sb2NhbCcsXG4gIHJlcG86ICdodHRwczovL2dpdGh1Yi5jb20va2F0emVyL2NvcmRvdmEtcGx1Z2luLWxvY2FsLW5vdGlmaWNhdGlvbnMnLFxuICBwbGF0Zm9ybXM6IFsnQW5kcm9pZCcsICdpT1MnLCAnV2luZG93cyddLFxufSlcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMb2NhbE5vdGlmaWNhdGlvbnMgZXh0ZW5kcyBJb25pY05hdGl2ZVBsdWdpbiB7XG4gIC8qKlxuICAgKiBJbmZvcm1zIGlmIHRoZSBhcHAgaGFzIHRoZSBwZXJtaXNzaW9uIHRvIHNob3cgbm90aWZpY2F0aW9ucy5cbiAgICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59XG4gICAqL1xuICBAQ29yZG92YSgpXG4gIGhhc1Blcm1pc3Npb24oKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcXVlc3QgcGVybWlzc2lvbiB0byBzaG93IG5vdGlmaWNhdGlvbnMgaWYgbm90IGFscmVhZHkgZ3JhbnRlZC5cbiAgICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59XG4gICAqL1xuICBAQ29yZG92YSgpXG4gIHJlcXVlc3RQZXJtaXNzaW9uKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTY2hlZHVsZXMgYSBzaW5nbGUgb3IgbXVsdGlwbGUgbm90aWZpY2F0aW9uc1xuICAgKiBAcGFyYW0gb3B0aW9ucyB7Tm90aWZpY2F0aW9uIHwgSUxvY2FsTm90aWZpY2F0aW9uW119IG9wdGlvbmFsXG4gICAqL1xuICBAQ29yZG92YSh7XG4gICAgc3luYzogdHJ1ZSxcbiAgfSlcbiAgc2NoZWR1bGUob3B0aW9ucz86IElMb2NhbE5vdGlmaWNhdGlvbiB8IElMb2NhbE5vdGlmaWNhdGlvbltdKTogdm9pZCB7fVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIGEgcHJldmlvdXNseSBzY2hlZHVsZWQgbm90aWZpY2F0aW9uLiBNdXN0IGluY2x1ZGUgdGhlIGlkIGluIHRoZSBvcHRpb25zIHBhcmFtZXRlci5cbiAgICogQHBhcmFtIG9wdGlvbnMge0lMb2NhbE5vdGlmaWNhdGlvbn0gb3B0aW9uYWxcbiAgICovXG4gIEBDb3Jkb3ZhKHtcbiAgICBzeW5jOiB0cnVlLFxuICB9KVxuICB1cGRhdGUob3B0aW9ucz86IElMb2NhbE5vdGlmaWNhdGlvbik6IHZvaWQge31cblxuICAvKipcbiAgICogQ2xlYXJzIHNpbmdsZSBvciBtdWx0aXBsZSBub3RpZmljYXRpb25zXG4gICAqIEBwYXJhbSBub3RpZmljYXRpb25JZCB7YW55fSBBIHNpbmdsZSBub3RpZmljYXRpb24gaWQsIG9yIGFuIGFycmF5IG9mIG5vdGlmaWNhdGlvbiBpZHMuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59IFJldHVybnMgYSBwcm9taXNlIHdoZW4gdGhlIG5vdGlmaWNhdGlvbiBoYWQgYmVlbiBjbGVhcmVkXG4gICAqL1xuICBAQ29yZG92YSgpXG4gIGNsZWFyKG5vdGlmaWNhdGlvbklkOiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgYWxsIG5vdGlmaWNhdGlvbnNcbiAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn0gUmV0dXJucyBhIHByb21pc2Ugd2hlbiBhbGwgbm90aWZpY2F0aW9ucyBoYXZlIGNsZWFyZWRcbiAgICovXG4gIEBDb3Jkb3ZhKClcbiAgY2xlYXJBbGwoKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogQ2FuY2VscyBzaW5nbGUgb3IgbXVsdGlwbGUgbm90aWZpY2F0aW9uc1xuICAgKiBAcGFyYW0gbm90aWZpY2F0aW9uSWQge2FueX0gQSBzaW5nbGUgbm90aWZpY2F0aW9uIGlkLCBvciBhbiBhcnJheSBvZiBub3RpZmljYXRpb24gaWRzLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fSBSZXR1cm5zIGEgcHJvbWlzZSB3aGVuIHRoZSBub3RpZmljYXRpb24gaXMgY2FuY2VsZWRcbiAgICovXG4gIEBDb3Jkb3ZhKClcbiAgY2FuY2VsKG5vdGlmaWNhdGlvbklkOiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYW5jZWxzIGFsbCBub3RpZmljYXRpb25zXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59IFJldHVybnMgYSBwcm9taXNlIHdoZW4gYWxsIG5vdGlmaWNhdGlvbnMgYXJlIGNhbmNlbGVkXG4gICAqL1xuICBAQ29yZG92YSgpXG4gIGNhbmNlbEFsbCgpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgcHJlc2VuY2Ugb2YgYSBub3RpZmljYXRpb25cbiAgICogQHBhcmFtIG5vdGlmaWNhdGlvbklkIHtudW1iZXJ9XG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGJvb2xlYW4+fVxuICAgKi9cbiAgQENvcmRvdmEoKVxuICBpc1ByZXNlbnQobm90aWZpY2F0aW9uSWQ6IG51bWJlcik6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaXMgYSBub3RpZmljYXRpb24gaXMgc2NoZWR1bGVkXG4gICAqIEBwYXJhbSBub3RpZmljYXRpb25JZCB7bnVtYmVyfVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn1cbiAgICovXG4gIEBDb3Jkb3ZhKClcbiAgaXNTY2hlZHVsZWQobm90aWZpY2F0aW9uSWQ6IG51bWJlcik6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYSBub3RpZmljYXRpb24gaXMgdHJpZ2dlcmVkXG4gICAqIEBwYXJhbSBub3RpZmljYXRpb25JZCB7bnVtYmVyfVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn1cbiAgICovXG4gIEBDb3Jkb3ZhKClcbiAgaXNUcmlnZ2VyZWQobm90aWZpY2F0aW9uSWQ6IG51bWJlcik6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIG5vdGlmaWNhdGlvbiBoYXMgYSBnaXZlbiB0eXBlLlxuICAgKiBAcGFyYW0ge251bWJlcn0gaWQgVGhlIElEIG9mIHRoZSBub3RpZmljYXRpb24uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlICBUaGUgdHlwZSBvZiB0aGUgbm90aWZpY2F0aW9uLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn1cbiAgICovXG4gIEBDb3Jkb3ZhKClcbiAgaGFzVHlwZShpZDogbnVtYmVyLCB0eXBlOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSB0eXBlICh0cmlnZ2VyZWQsIHNjaGVkdWxlZCkgZm9yIHRoZSBub3RpZmljYXRpb24uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpZCBUaGUgSUQgb2YgdGhlIG5vdGlmaWNhdGlvbi5cbiAgICovXG4gIEBDb3Jkb3ZhKClcbiAgZ2V0VHlwZShpZDogbnVtYmVyKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhbGwgdGhlIG5vdGlmaWNhdGlvbiBpZHNcbiAgICogQHJldHVybnMge1Byb21pc2U8QXJyYXk8bnVtYmVyPj59XG4gICAqL1xuICBAQ29yZG92YSgpXG4gIGdldElkcygpOiBQcm9taXNlPG51bWJlcltdPiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgaWRzIG9mIHNjaGVkdWxlZCBub3RpZmljYXRpb25zXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPG51bWJlcltdPn0gUmV0dXJucyBhIHByb21pc2VcbiAgICovXG4gIEBDb3Jkb3ZhKClcbiAgZ2V0U2NoZWR1bGVkSWRzKCk6IFByb21pc2U8bnVtYmVyW10+IHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBpZHMgb2YgdHJpZ2dlcmVkIG5vdGlmaWNhdGlvbnNcbiAgICogQHJldHVybnMge1Byb21pc2U8QXJyYXk8bnVtYmVyPj59XG4gICAqL1xuICBAQ29yZG92YSgpXG4gIGdldFRyaWdnZXJlZElkcygpOiBQcm9taXNlPG51bWJlcltdPiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIG5vdGlmaWNhdGlvbiBvYmplY3RcbiAgICogQHBhcmFtIG5vdGlmaWNhdGlvbklkIHthbnl9IFRoZSBpZCBvZiB0aGUgbm90aWZpY2F0aW9uIHRvIGdldFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxJTG9jYWxOb3RpZmljYXRpb24+fVxuICAgKi9cbiAgQENvcmRvdmEoKVxuICBnZXQobm90aWZpY2F0aW9uSWQ6IGFueSk6IFByb21pc2U8SUxvY2FsTm90aWZpY2F0aW9uPiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhbGwgbm90aWZpY2F0aW9uIG9iamVjdHNcbiAgICogQHJldHVybnMge1Byb21pc2U8SUxvY2FsTm90aWZpY2F0aW9uW10+fVxuICAgKi9cbiAgQENvcmRvdmEoKVxuICBnZXRBbGwoKTogUHJvbWlzZTxJTG9jYWxOb3RpZmljYXRpb25bXT4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBzY2hlZHVsZWQgbm90aWZpY2F0aW9uIG9iamVjdFxuICAgKiBAcGFyYW0gbm90aWZpY2F0aW9uSWQge2FueX0gVGhlIGlkIG9mIHRoZSBub3RpZmljYXRpb24gdG8gZ2V0XG4gICAqIEByZXR1cm5zIHtQcm9taXNlPElMb2NhbE5vdGlmaWNhdGlvbj59XG4gICAqL1xuICBAQ29yZG92YSgpXG4gIGdldFNjaGVkdWxlZChub3RpZmljYXRpb25JZDogYW55KTogUHJvbWlzZTxJTG9jYWxOb3RpZmljYXRpb24+IHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgdHJpZ2dlcmVkIG5vdGlmaWNhdGlvbiBvYmplY3RcbiAgICogQHBhcmFtIG5vdGlmaWNhdGlvbklkIFRoZSBpZCBvZiB0aGUgbm90aWZpY2F0aW9uIHRvIGdldFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxJTG9jYWxOb3RpZmljYXRpb24+fVxuICAgKi9cbiAgQENvcmRvdmEoKVxuICBnZXRUcmlnZ2VyZWQobm90aWZpY2F0aW9uSWQ6IGFueSk6IFByb21pc2U8SUxvY2FsTm90aWZpY2F0aW9uPiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBncm91cCBvZiBhY3Rpb25zXG4gICAqIEBwYXJhbSBncm91cElkIFRoZSBpZCBvZiB0aGUgYWN0aW9uIGdyb3VwXG4gICAqIEBwYXJhbSBhY3Rpb25zIFRoZSBhY3Rpb25zIG9mIHRoaXMgZ3JvdXBcbiAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAgICovXG4gIEBDb3Jkb3ZhKClcbiAgYWRkQWN0aW9ucyhncm91cElkOiBhbnksIGFjdGlvbnM6IElMb2NhbE5vdGlmaWNhdGlvbkFjdGlvbltdKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhIGdyb3VwIG9mIGFjdGlvbnNcbiAgICogQHBhcmFtIGdyb3VwSWQgVGhlIGlkIG9mIHRoZSBhY3Rpb24gZ3JvdXBcbiAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAgICovXG4gIEBDb3Jkb3ZhKClcbiAgcmVtb3ZlQWN0aW9ucyhncm91cElkOiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYSBncm91cCBvZiBhY3Rpb25zIGlzIGRlZmluZWRcbiAgICogQHBhcmFtIGdyb3VwSWQgVGhlIGlkIG9mIHRoZSBhY3Rpb24gZ3JvdXBcbiAgICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59IFdoZXRoZXIgdGhlIGdyb3VwIGlzIGRlZmluZWRcbiAgICovXG4gIEBDb3Jkb3ZhKClcbiAgaGFzQWN0aW9ucyhncm91cElkOiBhbnkpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgKHBsYXRmb3JtIHNwZWNpZmljKSBkZWZhdWx0IHNldHRpbmdzLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fSBBbiBvYmplY3Qgd2l0aCBhbGwgZGVmYXVsdCBzZXR0aW5nc1xuICAgKi9cbiAgQENvcmRvdmEoe1xuICAgIHN5bmM6IHRydWUsXG4gIH0pXG4gIGdldERlZmF1bHRzKCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIE92ZXJ3cml0ZXMgdGhlIChwbGF0Zm9ybSBzcGVjaWZpYykgZGVmYXVsdCBzZXR0aW5ncy5cbiAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAgICovXG4gIEBDb3Jkb3ZhKHtcbiAgICBzeW5jOiB0cnVlLFxuICB9KVxuICBzZXREZWZhdWx0cyhkZWZhdWx0czogYW55KTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogR2V0IGFsbCBzY2hlZHVsZWQgbm90aWZpY2F0aW9uIG9iamVjdHNcbiAgICogQHJldHVybnMge1Byb21pc2U8QXJyYXk8SUxvY2FsTm90aWZpY2F0aW9uPj59XG4gICAqL1xuICBAQ29yZG92YSgpXG4gIGdldEFsbFNjaGVkdWxlZCgpOiBQcm9taXNlPElMb2NhbE5vdGlmaWNhdGlvbltdPiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhbGwgdHJpZ2dlcmVkIG5vdGlmaWNhdGlvbiBvYmplY3RzXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPEFycmF5PElMb2NhbE5vdGlmaWNhdGlvbj4+fVxuICAgKi9cbiAgQENvcmRvdmEoKVxuICBnZXRBbGxUcmlnZ2VyZWQoKTogUHJvbWlzZTxJTG9jYWxOb3RpZmljYXRpb25bXT4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIGEgY2FsbGJhY2sgZm9yIGEgc3BlY2lmaWMgZXZlbnRcbiAgICogQHBhcmFtIGV2ZW50TmFtZSB7c3RyaW5nfSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQuIEF2YWlsYWJsZSBldmVudHM6IHNjaGVkdWxlLCB0cmlnZ2VyLCBjbGljaywgdXBkYXRlLCBjbGVhciwgY2xlYXJhbGwsIGNhbmNlbCwgY2FuY2VsYWxsLiBDdXN0b20gZXZlbnQgbmFtZXMgYXJlIHBvc3NpYmxlIGZvciBhY3Rpb25zXG4gICAqIEByZXR1cm4ge09ic2VydmFibGV9XG4gICAqL1xuICBAQ29yZG92YSh7XG4gICAgb2JzZXJ2YWJsZTogdHJ1ZSxcbiAgICBjbGVhckZ1bmN0aW9uOiAndW4nLFxuICAgIGNsZWFyV2l0aEFyZ3M6IHRydWUsXG4gIH0pXG4gIG9uKGV2ZW50TmFtZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogTm90IGFuIG9mZmljaWFsIGludGVyZmFjZSwgaG93ZXZlciBpdHMgcG9zc2libGUgdG8gbWFudWFsbHkgZmlyZSBldmVudHMuXG4gICAqIEBwYXJhbSBldmVudE5hbWUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50LiBBdmFpbGFibGUgZXZlbnRzOiBzY2hlZHVsZSwgdHJpZ2dlciwgY2xpY2ssIHVwZGF0ZSwgY2xlYXIsIGNsZWFyYWxsLCBjYW5jZWwsIGNhbmNlbGFsbC4gQ3VzdG9tIGV2ZW50IG5hbWVzIGFyZSBwb3NzaWJsZSBmb3IgYWN0aW9uc1xuICAgKiBAcGFyYW0gYXJncyBPcHRpb25hbCBhcmd1bWVudHNcbiAgICovXG4gIEBDb3Jkb3ZhKHtcbiAgICBzeW5jOiB0cnVlLFxuICB9KVxuICBmaXJlRXZlbnQoZXZlbnROYW1lOiBzdHJpbmcsIGFyZ3M6IGFueSk6IHZvaWQge31cblxuICAvKipcbiAgICogRmlyZSBxdWV1ZWQgZXZlbnRzIG9uY2UgdGhlIGRldmljZSBpcyByZWFkeSBhbmQgYWxsIGxpc3RlbmVycyBhcmUgcmVnaXN0ZXJlZC5cbiAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAgICovXG4gIEBDb3Jkb3ZhKClcbiAgZmlyZVF1ZXVlZEV2ZW50cygpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybjtcbiAgfVxufVxuIl19

      /***/

    },

    /***/
    "./node_modules/ng-circle-progress/__ivy_ngcc__/fesm2015/ng-circle-progress.js":
    /*!*************************************************************************************!*\
      !*** ./node_modules/ng-circle-progress/__ivy_ngcc__/fesm2015/ng-circle-progress.js ***!
      \*************************************************************************************/

    /*! exports provided: CircleProgressComponent, CircleProgressOptions, NgCircleProgressModule */

    /***/
    function node_modulesNgCircleProgress__ivy_ngcc__Fesm2015NgCircleProgressJs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "CircleProgressComponent", function () {
        return CircleProgressComponent;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "CircleProgressOptions", function () {
        return CircleProgressOptions;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "NgCircleProgressModule", function () {
        return NgCircleProgressModule;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "./node_modules/@ionic/angular/node_modules/tslib/tslib.es6.js");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/common */
      "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! rxjs */
      "./node_modules/rxjs/_esm2015/index.js");

      function CircleProgressComponent__svg_svg_0__svg_linearGradient_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "linearGradient");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "stop", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "stop", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("id", ctx_r1.svg.outerLinearGradient.id);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("stop-color", ctx_r1.svg.outerLinearGradient.colorStop1)("stop-opacity", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("stop-color", ctx_r1.svg.outerLinearGradient.colorStop2)("stop-opacity", 1);
        }
      }

      function CircleProgressComponent__svg_svg_0__svg_radialGradient_3_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "radialGradient");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "stop", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "stop", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("id", ctx_r2.svg.radialGradient.id);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("stop-color", ctx_r2.svg.radialGradient.colorStop1)("stop-opacity", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("stop-color", ctx_r2.svg.radialGradient.colorStop2)("stop-opacity", 1);
        }
      }

      function CircleProgressComponent__svg_svg_0__svg_ng_container_4__svg_circle_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "circle");
        }

        if (rf & 2) {
          var ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("cx", ctx_r8.svg.backgroundCircle.cx)("cy", ctx_r8.svg.backgroundCircle.cy)("r", ctx_r8.svg.backgroundCircle.r)("fill", ctx_r8.svg.backgroundCircle.fill)("fill-opacity", ctx_r8.svg.backgroundCircle.fillOpacity)("stroke", ctx_r8.svg.backgroundCircle.stroke)("stroke-width", ctx_r8.svg.backgroundCircle.strokeWidth);
        }
      }

      function CircleProgressComponent__svg_svg_0__svg_ng_container_4__svg_circle_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "circle");
        }

        if (rf & 2) {
          var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattributeInterpolate1"]("fill", "url(#", ctx_r9.svg.radialGradient.id, ")");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("cx", ctx_r9.svg.backgroundCircle.cx)("cy", ctx_r9.svg.backgroundCircle.cy)("r", ctx_r9.svg.backgroundCircle.r)("fill-opacity", ctx_r9.svg.backgroundCircle.fillOpacity)("stroke", ctx_r9.svg.backgroundCircle.stroke)("stroke-width", ctx_r9.svg.backgroundCircle.strokeWidth);
        }
      }

      function CircleProgressComponent__svg_svg_0__svg_ng_container_4_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, CircleProgressComponent__svg_svg_0__svg_ng_container_4__svg_circle_1_Template, 1, 7, "circle", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, CircleProgressComponent__svg_svg_0__svg_ng_container_4__svg_circle_2_Template, 1, 7, "circle", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx_r3.options.backgroundGradient);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r3.options.backgroundGradient);
        }
      }

      function CircleProgressComponent__svg_svg_0__svg_circle_5_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "circle");
        }

        if (rf & 2) {
          var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("cx", ctx_r4.svg.circle.cx)("cy", ctx_r4.svg.circle.cy)("r", ctx_r4.svg.circle.r)("fill", ctx_r4.svg.circle.fill)("stroke", ctx_r4.svg.circle.stroke)("stroke-width", ctx_r4.svg.circle.strokeWidth);
        }
      }

      function CircleProgressComponent__svg_svg_0__svg_ng_container_6__svg_path_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "path");
        }

        if (rf & 2) {
          var ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("d", ctx_r10.svg.path.d)("stroke", ctx_r10.svg.path.stroke)("stroke-width", ctx_r10.svg.path.strokeWidth)("stroke-linecap", ctx_r10.svg.path.strokeLinecap)("fill", ctx_r10.svg.path.fill);
        }
      }

      function CircleProgressComponent__svg_svg_0__svg_ng_container_6__svg_path_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "path");
        }

        if (rf & 2) {
          var ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattributeInterpolate1"]("stroke", "url(#", ctx_r11.svg.outerLinearGradient.id, ")");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("d", ctx_r11.svg.path.d)("stroke-width", ctx_r11.svg.path.strokeWidth)("stroke-linecap", ctx_r11.svg.path.strokeLinecap)("fill", ctx_r11.svg.path.fill);
        }
      }

      function CircleProgressComponent__svg_svg_0__svg_ng_container_6_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, CircleProgressComponent__svg_svg_0__svg_ng_container_6__svg_path_1_Template, 1, 5, "path", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, CircleProgressComponent__svg_svg_0__svg_ng_container_6__svg_path_2_Template, 1, 5, "path", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx_r5.options.outerStrokeGradient);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r5.options.outerStrokeGradient);
        }
      }

      function CircleProgressComponent__svg_svg_0__svg_text_7__svg_ng_container_1__svg_tspan_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "tspan");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var tspan_r16 = ctx.$implicit;

          var ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("x", ctx_r15.svg.title.x)("y", ctx_r15.svg.title.y)("dy", tspan_r16.dy)("font-size", ctx_r15.svg.title.fontSize)("font-weight", ctx_r15.svg.title.fontWeight)("fill", ctx_r15.svg.title.color);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](tspan_r16.span);
        }
      }

      function CircleProgressComponent__svg_svg_0__svg_text_7__svg_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, CircleProgressComponent__svg_svg_0__svg_text_7__svg_ng_container_1__svg_tspan_1_Template, 2, 7, "tspan", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r12.svg.title.tspans);
        }
      }

      function CircleProgressComponent__svg_svg_0__svg_text_7__svg_tspan_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "tspan");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("font-size", ctx_r13.svg.units.fontSize)("font-weight", ctx_r13.svg.units.fontWeight)("fill", ctx_r13.svg.units.color);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r13.svg.units.text);
        }
      }

      function CircleProgressComponent__svg_svg_0__svg_text_7__svg_ng_container_3__svg_tspan_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "tspan");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var tspan_r18 = ctx.$implicit;

          var ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("x", ctx_r17.svg.subtitle.x)("y", ctx_r17.svg.subtitle.y)("dy", tspan_r18.dy)("font-size", ctx_r17.svg.subtitle.fontSize)("font-weight", ctx_r17.svg.subtitle.fontWeight)("fill", ctx_r17.svg.subtitle.color);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](tspan_r18.span);
        }
      }

      function CircleProgressComponent__svg_svg_0__svg_text_7__svg_ng_container_3_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, CircleProgressComponent__svg_svg_0__svg_text_7__svg_ng_container_3__svg_tspan_1_Template, 2, 7, "tspan", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r14.svg.subtitle.tspans);
        }
      }

      function CircleProgressComponent__svg_svg_0__svg_text_7_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "text", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, CircleProgressComponent__svg_svg_0__svg_text_7__svg_ng_container_1_Template, 2, 1, "ng-container", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, CircleProgressComponent__svg_svg_0__svg_text_7__svg_tspan_2_Template, 2, 4, "tspan", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, CircleProgressComponent__svg_svg_0__svg_text_7__svg_ng_container_3_Template, 2, 1, "ng-container", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("x", ctx_r6.svg.circle.cx)("y", ctx_r6.svg.circle.cy)("text-anchor", ctx_r6.svg.title.textAnchor);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r6.options.showTitle);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r6.options.showUnits);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r6.options.showSubtitle);
        }
      }

      function CircleProgressComponent__svg_svg_0__svg_image_8_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "image", 9);
        }

        if (rf & 2) {
          var ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("height", ctx_r7.svg.image.height)("width", ctx_r7.svg.image.width)("href", ctx_r7.svg.image.src, null, "xlink")("x", ctx_r7.svg.image.x)("y", ctx_r7.svg.image.y);
        }
      }

      function CircleProgressComponent__svg_svg_0_Template(rf, ctx) {
        if (rf & 1) {
          var _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "svg", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function CircleProgressComponent__svg_svg_0_Template__svg_svg_click_0_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r20);

            var ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

            return ctx_r19.emitClickEvent($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "defs");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, CircleProgressComponent__svg_svg_0__svg_linearGradient_2_Template, 3, 5, "linearGradient", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, CircleProgressComponent__svg_svg_0__svg_radialGradient_3_Template, 3, 5, "radialGradient", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, CircleProgressComponent__svg_svg_0__svg_ng_container_4_Template, 3, 2, "ng-container", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, CircleProgressComponent__svg_svg_0__svg_circle_5_Template, 1, 6, "circle", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, CircleProgressComponent__svg_svg_0__svg_ng_container_6_Template, 3, 2, "ng-container", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, CircleProgressComponent__svg_svg_0__svg_text_7_Template, 4, 6, "text", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, CircleProgressComponent__svg_svg_0__svg_image_8_Template, 1, 5, "image", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("viewBox", ctx_r0.svg.viewBox)("height", ctx_r0.svg.height)("width", ctx_r0.svg.width)("class", ctx_r0.options["class"]);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.options.outerStrokeGradient);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.options.backgroundGradient);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.options.showBackground);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.options.showInnerStroke);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.options.percent - 0 !== 0 || ctx_r0.options.showZeroOuterStroke);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx_r0.options.showImage && (ctx_r0.options.showTitle || ctx_r0.options.showUnits || ctx_r0.options.showSubtitle));

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.options.showImage);
        }
      }

      var CircleProgressOptions = function CircleProgressOptions() {
        _classCallCheck(this, CircleProgressOptions);

        this["class"] = '';
        this.backgroundGradient = false;
        this.backgroundColor = 'transparent';
        this.backgroundGradientStopColor = 'transparent';
        this.backgroundOpacity = 1;
        this.backgroundStroke = 'transparent';
        this.backgroundStrokeWidth = 0;
        this.backgroundPadding = 5;
        this.percent = 0;
        this.radius = 90;
        this.space = 4;
        this.toFixed = 0;
        this.maxPercent = 1000;
        this.renderOnClick = true;
        this.units = '%';
        this.unitsFontSize = '10';
        this.unitsFontWeight = 'normal';
        this.unitsColor = '#444444';
        this.outerStrokeGradient = false;
        this.outerStrokeWidth = 8;
        this.outerStrokeColor = '#78C000';
        this.outerStrokeGradientStopColor = 'transparent';
        this.outerStrokeLinecap = 'round';
        this.innerStrokeColor = '#C7E596';
        this.innerStrokeWidth = 4;
        this.titleFormat = undefined;
        this.title = 'auto';
        this.titleColor = '#444444';
        this.titleFontSize = '20';
        this.titleFontWeight = 'normal';
        this.subtitleFormat = undefined;
        this.subtitle = 'progress';
        this.subtitleColor = '#A9A9A9';
        this.subtitleFontSize = '10';
        this.subtitleFontWeight = 'normal';
        this.imageSrc = undefined;
        this.imageHeight = undefined;
        this.imageWidth = undefined;
        this.animation = true;
        this.animateTitle = true;
        this.animateSubtitle = false;
        this.animationDuration = 500;
        this.showTitle = true;
        this.showSubtitle = true;
        this.showUnits = true;
        this.showImage = false;
        this.showBackground = true;
        this.showInnerStroke = true;
        this.clockwise = true;
        this.responsive = false;
        this.startFromZero = true;
        this.showZeroOuterStroke = true;
        this.lazy = false;
      };
      /** @dynamic Prevent compiling error when using type `Document` https://github.com/angular/angular/issues/20351 */


      var CircleProgressComponent = /*#__PURE__*/function () {
        function CircleProgressComponent(defaultOptions, elRef, document) {
          var _this = this;

          _classCallCheck(this, CircleProgressComponent);

          this.elRef = elRef;
          this.document = document;
          this.onClick = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"](); // <svg> of component

          this.svgElement = null; // whether <svg> is in viewport

          this.isInViewport = false; // event for notifying viewport change caused by scrolling or resizing

          this.onViewportChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
          this._viewportChangedSubscriber = null;
          this.options = new CircleProgressOptions();
          this.defaultOptions = new CircleProgressOptions();
          this._lastPercent = 0;
          this._gradientUUID = null;

          this.render = function () {
            _this.applyOptions();

            if (_this.options.lazy) {
              // Draw svg if it doesn't exist
              _this.svgElement === null && _this.draw(_this._lastPercent); // Draw it only when it's in the viewport

              if (_this.isInViewport) {
                // Draw it at the latest position when I am in.
                if (_this.options.animation && _this.options.animationDuration > 0) {
                  _this.animate(_this._lastPercent, _this.options.percent);
                } else {
                  _this.draw(_this.options.percent);
                }

                _this._lastPercent = _this.options.percent;
              }
            } else {
              if (_this.options.animation && _this.options.animationDuration > 0) {
                _this.animate(_this._lastPercent, _this.options.percent);
              } else {
                _this.draw(_this.options.percent);
              }

              _this._lastPercent = _this.options.percent;
            }
          };

          this.polarToCartesian = function (centerX, centerY, radius, angleInDegrees) {
            var angleInRadius = angleInDegrees * Math.PI / 180;
            var x = centerX + Math.sin(angleInRadius) * radius;
            var y = centerY - Math.cos(angleInRadius) * radius;
            return {
              x: x,
              y: y
            };
          };

          this.draw = function (percent) {
            // make percent reasonable
            percent = percent === undefined ? _this.options.percent : Math.abs(percent); // circle percent shouldn't be greater than 100%.

            var circlePercent = percent > 100 ? 100 : percent; // determine box size

            var boxSize = _this.options.radius * 2 + _this.options.outerStrokeWidth * 2;

            if (_this.options.showBackground) {
              boxSize += _this.options.backgroundStrokeWidth * 2 + _this.max(0, _this.options.backgroundPadding * 2);
            } // the centre of the circle


            var centre = {
              x: boxSize / 2,
              y: boxSize / 2
            }; // the start point of the arc

            var startPoint = {
              x: centre.x,
              y: centre.y - _this.options.radius
            }; // get the end point of the arc

            var endPoint = _this.polarToCartesian(centre.x, centre.y, _this.options.radius, 360 * (_this.options.clockwise ? circlePercent : 100 - circlePercent) / 100); // ####################
            // We'll get an end point with the same [x, y] as the start point when percent is 100%, so move x a little bit.


            if (circlePercent === 100) {
              endPoint.x = endPoint.x + (_this.options.clockwise ? -0.01 : +0.01);
            } // largeArcFlag and sweepFlag


            var largeArcFlag, sweepFlag;

            if (circlePercent > 50) {
              var _ref = _this.options.clockwise ? [1, 1] : [1, 0];

              var _ref2 = _slicedToArray(_ref, 2);

              largeArcFlag = _ref2[0];
              sweepFlag = _ref2[1];
            } else {
              var _ref3 = _this.options.clockwise ? [0, 1] : [0, 0];

              var _ref4 = _slicedToArray(_ref3, 2);

              largeArcFlag = _ref4[0];
              sweepFlag = _ref4[1];
            } // percent may not equal the actual percent


            var titlePercent = _this.options.animateTitle ? percent : _this.options.percent;
            var titleTextPercent = titlePercent > _this.options.maxPercent ? "".concat(_this.options.maxPercent.toFixed(_this.options.toFixed), "+") : titlePercent.toFixed(_this.options.toFixed);
            var subtitlePercent = _this.options.animateSubtitle ? percent : _this.options.percent; // get title object

            var title = {
              x: centre.x,
              y: centre.y,
              textAnchor: 'middle',
              color: _this.options.titleColor,
              fontSize: _this.options.titleFontSize,
              fontWeight: _this.options.titleFontWeight,
              texts: [],
              tspans: []
            }; // from v0.9.9, both title and titleFormat(...) may be an array of string.

            if (_this.options.titleFormat !== undefined && _this.options.titleFormat.constructor.name === 'Function') {
              var formatted = _this.options.titleFormat(titlePercent);

              if (formatted instanceof Array) {
                title.texts = _toConsumableArray(formatted);
              } else {
                title.texts.push(formatted.toString());
              }
            } else {
              if (_this.options.title === 'auto') {
                title.texts.push(titleTextPercent);
              } else {
                if (_this.options.title instanceof Array) {
                  title.texts = _toConsumableArray(_this.options.title);
                } else {
                  title.texts.push(_this.options.title.toString());
                }
              }
            } // get subtitle object


            var subtitle = {
              x: centre.x,
              y: centre.y,
              textAnchor: 'middle',
              color: _this.options.subtitleColor,
              fontSize: _this.options.subtitleFontSize,
              fontWeight: _this.options.subtitleFontWeight,
              texts: [],
              tspans: []
            }; // from v0.9.9, both subtitle and subtitleFormat(...) may be an array of string.

            if (_this.options.subtitleFormat !== undefined && _this.options.subtitleFormat.constructor.name === 'Function') {
              var _formatted = _this.options.subtitleFormat(subtitlePercent);

              if (_formatted instanceof Array) {
                subtitle.texts = _toConsumableArray(_formatted);
              } else {
                subtitle.texts.push(_formatted.toString());
              }
            } else {
              if (_this.options.subtitle instanceof Array) {
                subtitle.texts = _toConsumableArray(_this.options.subtitle);
              } else {
                subtitle.texts.push(_this.options.subtitle.toString());
              }
            } // get units object


            var units = {
              text: "".concat(_this.options.units),
              fontSize: _this.options.unitsFontSize,
              fontWeight: _this.options.unitsFontWeight,
              color: _this.options.unitsColor
            }; // get total count of text lines to be shown

            var rowCount = 0,
                rowNum = 1;
            _this.options.showTitle && (rowCount += title.texts.length);
            _this.options.showSubtitle && (rowCount += subtitle.texts.length); // calc dy for each tspan for title

            if (_this.options.showTitle) {
              var _iterator = _createForOfIteratorHelper(title.texts),
                  _step;

              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  var span = _step.value;
                  title.tspans.push({
                    span: span,
                    dy: _this.getRelativeY(rowNum, rowCount)
                  });
                  rowNum++;
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
            } // calc dy for each tspan for subtitle


            if (_this.options.showSubtitle) {
              var _iterator2 = _createForOfIteratorHelper(subtitle.texts),
                  _step2;

              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  var _span = _step2.value;
                  subtitle.tspans.push({
                    span: _span,
                    dy: _this.getRelativeY(rowNum, rowCount)
                  });
                  rowNum++;
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
            } // create ID for gradient element


            if (null === _this._gradientUUID) {
              _this._gradientUUID = _this.uuid();
            } // Bring it all together


            _this.svg = {
              viewBox: "0 0 ".concat(boxSize, " ").concat(boxSize),
              // Set both width and height to '100%' if it's responsive
              width: _this.options.responsive ? '100%' : boxSize,
              height: _this.options.responsive ? '100%' : boxSize,
              backgroundCircle: {
                cx: centre.x,
                cy: centre.y,
                r: _this.options.radius + _this.options.outerStrokeWidth / 2 + _this.options.backgroundPadding,
                fill: _this.options.backgroundColor,
                fillOpacity: _this.options.backgroundOpacity,
                stroke: _this.options.backgroundStroke,
                strokeWidth: _this.options.backgroundStrokeWidth
              },
              path: {
                // A rx ry x-axis-rotation large-arc-flag sweep-flag x y (https://developer.mozilla.org/en/docs/Web/SVG/Tutorial/Paths#Arcs)
                d: "M ".concat(startPoint.x, " ").concat(startPoint.y, "\n        A ").concat(_this.options.radius, " ").concat(_this.options.radius, " 0 ").concat(largeArcFlag, " ").concat(sweepFlag, " ").concat(endPoint.x, " ").concat(endPoint.y),
                stroke: _this.options.outerStrokeColor,
                strokeWidth: _this.options.outerStrokeWidth,
                strokeLinecap: _this.options.outerStrokeLinecap,
                fill: 'none'
              },
              circle: {
                cx: centre.x,
                cy: centre.y,
                r: _this.options.radius - _this.options.space - _this.options.outerStrokeWidth / 2 - _this.options.innerStrokeWidth / 2,
                fill: 'none',
                stroke: _this.options.innerStrokeColor,
                strokeWidth: _this.options.innerStrokeWidth
              },
              title: title,
              units: units,
              subtitle: subtitle,
              image: {
                x: centre.x - _this.options.imageWidth / 2,
                y: centre.y - _this.options.imageHeight / 2,
                src: _this.options.imageSrc,
                width: _this.options.imageWidth,
                height: _this.options.imageHeight
              },
              outerLinearGradient: {
                id: 'outer-linear-' + _this._gradientUUID,
                colorStop1: _this.options.outerStrokeColor,
                colorStop2: _this.options.outerStrokeGradientStopColor === 'transparent' ? '#FFF' : _this.options.outerStrokeGradientStopColor
              },
              radialGradient: {
                id: 'radial-' + _this._gradientUUID,
                colorStop1: _this.options.backgroundColor,
                colorStop2: _this.options.backgroundGradientStopColor === 'transparent' ? '#FFF' : _this.options.backgroundGradientStopColor
              }
            };
          };

          this.getAnimationParameters = function (previousPercent, currentPercent) {
            var MIN_INTERVAL = 10;
            var times, step, interval;
            var fromPercent = _this.options.startFromZero ? 0 : previousPercent < 0 ? 0 : previousPercent;
            var toPercent = currentPercent < 0 ? 0 : _this.min(currentPercent, _this.options.maxPercent);
            var delta = Math.abs(Math.round(toPercent - fromPercent));

            if (delta >= 100) {
              // we will finish animation in 100 times
              times = 100;

              if (!_this.options.animateTitle && !_this.options.animateSubtitle) {
                step = 1;
              } else {
                // show title or subtitle animation even if the arc is full, we also need to finish it in 100 times.
                step = Math.round(delta / times);
              }
            } else {
              // we will finish in as many times as the number of percent.
              times = delta;
              step = 1;
            } // Get the interval of timer


            interval = Math.round(_this.options.animationDuration / times); // Readjust all values if the interval of timer is extremely small.

            if (interval < MIN_INTERVAL) {
              interval = MIN_INTERVAL;
              times = _this.options.animationDuration / interval;

              if (!_this.options.animateTitle && !_this.options.animateSubtitle && delta > 100) {
                step = Math.round(100 / times);
              } else {
                step = Math.round(delta / times);
              }
            } // step must be greater than 0.


            if (step < 1) {
              step = 1;
            }

            return {
              times: times,
              step: step,
              interval: interval
            };
          };

          this.animate = function (previousPercent, currentPercent) {
            if (_this._timerSubscription && !_this._timerSubscription.closed) {
              _this._timerSubscription.unsubscribe();
            }

            var fromPercent = _this.options.startFromZero ? 0 : previousPercent;
            var toPercent = currentPercent;

            var _this$getAnimationPar = _this.getAnimationParameters(fromPercent, toPercent),
                step = _this$getAnimationPar.step,
                interval = _this$getAnimationPar.interval;

            var count = fromPercent;

            if (fromPercent < toPercent) {
              _this._timerSubscription = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["timer"])(0, interval).subscribe(function () {
                count += step;

                if (count <= toPercent) {
                  if (!_this.options.animateTitle && !_this.options.animateSubtitle && count >= 100) {
                    _this.draw(toPercent);

                    _this._timerSubscription.unsubscribe();
                  } else {
                    _this.draw(count);
                  }
                } else {
                  _this.draw(toPercent);

                  _this._timerSubscription.unsubscribe();
                }
              });
            } else {
              _this._timerSubscription = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["timer"])(0, interval).subscribe(function () {
                count -= step;

                if (count >= toPercent) {
                  if (!_this.options.animateTitle && !_this.options.animateSubtitle && toPercent >= 100) {
                    _this.draw(toPercent);

                    _this._timerSubscription.unsubscribe();
                  } else {
                    _this.draw(count);
                  }
                } else {
                  _this.draw(toPercent);

                  _this._timerSubscription.unsubscribe();
                }
              });
            }
          };

          this.emitClickEvent = function (event) {
            if (_this.options.renderOnClick) {
              _this.animate(0, _this.options.percent);
            }

            _this.onClick.emit(event);
          };

          this.applyOptions = function () {
            // the options of <circle-progress> may change already
            for (var _i2 = 0, _Object$keys = Object.keys(_this.options); _i2 < _Object$keys.length; _i2++) {
              var name = _Object$keys[_i2];

              if (_this.hasOwnProperty(name) && _this[name] !== undefined) {
                _this.options[name] = _this[name];
              } else if (_this.templateOptions && _this.templateOptions[name] !== undefined) {
                _this.options[name] = _this.templateOptions[name];
              }
            } // make sure key options valid


            _this.options.radius = Math.abs(+_this.options.radius);
            _this.options.space = +_this.options.space;
            _this.options.percent = +_this.options.percent > 0 ? +_this.options.percent : 0;
            _this.options.maxPercent = Math.abs(+_this.options.maxPercent);
            _this.options.animationDuration = Math.abs(_this.options.animationDuration);
            _this.options.outerStrokeWidth = Math.abs(+_this.options.outerStrokeWidth);
            _this.options.innerStrokeWidth = Math.abs(+_this.options.innerStrokeWidth);
            _this.options.backgroundPadding = +_this.options.backgroundPadding;
          };

          this.getRelativeY = function (rowNum, rowCount) {
            // why '-0.18em'? It's a magic number when property 'alignment-baseline' equals 'baseline'. :)
            var initialOffset = -0.18,
                offset = 1;
            return (initialOffset + offset * (rowNum - rowCount / 2)).toFixed(2) + 'em';
          };

          this.min = function (a, b) {
            return a < b ? a : b;
          };

          this.max = function (a, b) {
            return a > b ? a : b;
          };

          this.uuid = function () {
            // https://www.w3resource.com/javascript-exercises/javascript-math-exercise-23.php
            var dt = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
              var r = (dt + Math.random() * 16) % 16 | 0;
              dt = Math.floor(dt / 16);
              return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
            });
            return uuid;
          };

          this.findSvgElement = function () {
            if (this.svgElement === null) {
              var tags = this.elRef.nativeElement.getElementsByTagName('svg');

              if (tags.length > 0) {
                this.svgElement = tags[0];
              }
            }
          };

          this.checkViewport = function () {
            _this.findSvgElement();

            var previousValue = _this.isInViewport;
            _this.isInViewport = _this.isElementInViewport(_this.svgElement);

            if (previousValue !== _this.isInViewport) {
              _this.onViewportChanged.emit({
                oldValue: previousValue,
                newValue: _this.isInViewport
              });
            }
          };

          this.onScroll = function (event) {
            _this.checkViewport();
          };

          this.loadEventsForLazyMode = function () {
            if (_this.options.lazy) {
              _this.document.addEventListener('scroll', _this.onScroll, true);

              _this.window.addEventListener('resize', _this.onScroll, true);

              if (_this._viewportChangedSubscriber === null) {
                _this._viewportChangedSubscriber = _this.onViewportChanged.subscribe(function (_ref5) {
                  var oldValue = _ref5.oldValue,
                      newValue = _ref5.newValue;
                  newValue ? _this.render() : null;
                });
              } // svgElement must be created in DOM before being checked.
              // Is there a better way to check the existence of svgElemnt?


              var _timer = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["timer"])(0, 50).subscribe(function () {
                _this.svgElement === null ? _this.checkViewport() : _timer.unsubscribe();
              });
            }
          };

          this.unloadEventsForLazyMode = function () {
            // Remove event listeners
            _this.document.removeEventListener('scroll', _this.onScroll, true);

            _this.window.removeEventListener('resize', _this.onScroll, true); // Unsubscribe onViewportChanged


            if (_this._viewportChangedSubscriber !== null) {
              _this._viewportChangedSubscriber.unsubscribe();

              _this._viewportChangedSubscriber = null;
            }
          };

          this.document = document;
          this.window = this.document.defaultView;
          Object.assign(this.options, defaultOptions);
          Object.assign(this.defaultOptions, defaultOptions);
        }

        _createClass(CircleProgressComponent, [{
          key: "isDrawing",
          value: function isDrawing() {
            return this._timerSubscription && !this._timerSubscription.closed;
          }
        }, {
          key: "isElementInViewport",
          value: function isElementInViewport(el) {
            // Return false if el has not been created in page.
            if (el === null || el === undefined) return false; // Check if the element is out of view due to a container scrolling

            var rect = el.getBoundingClientRect(),
                parent = el.parentNode,
                parentRect;

            do {
              parentRect = parent.getBoundingClientRect();
              if (rect.top >= parentRect.bottom) return false;
              if (rect.bottom <= parentRect.top) return false;
              if (rect.left >= parentRect.right) return false;
              if (rect.right <= parentRect.left) return false;
              parent = parent.parentNode;
            } while (parent != this.document.body); // Check its within the document viewport


            if (rect.top >= (this.window.innerHeight || this.document.documentElement.clientHeight)) return false;
            if (rect.bottom <= 0) return false;
            if (rect.left >= (this.window.innerWidth || this.document.documentElement.clientWidth)) return false;
            if (rect.right <= 0) return false;
            return true;
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {
            this.loadEventsForLazyMode();
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            this.unloadEventsForLazyMode();
          }
        }, {
          key: "ngOnChanges",
          value: function ngOnChanges(changes) {
            this.render();

            if ('lazy' in changes) {
              changes.lazy.currentValue ? this.loadEventsForLazyMode() : this.unloadEventsForLazyMode();
            }
          }
        }]);

        return CircleProgressComponent;
      }();

      CircleProgressComponent.ɵfac = function CircleProgressComponent_Factory(t) {
        return new (t || CircleProgressComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](CircleProgressOptions), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_2__["DOCUMENT"]));
      };

      CircleProgressComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: CircleProgressComponent,
        selectors: [["circle-progress"]],
        inputs: {
          name: "name",
          "class": "class",
          backgroundGradient: "backgroundGradient",
          backgroundColor: "backgroundColor",
          backgroundGradientStopColor: "backgroundGradientStopColor",
          backgroundOpacity: "backgroundOpacity",
          backgroundStroke: "backgroundStroke",
          backgroundStrokeWidth: "backgroundStrokeWidth",
          backgroundPadding: "backgroundPadding",
          radius: "radius",
          space: "space",
          percent: "percent",
          toFixed: "toFixed",
          maxPercent: "maxPercent",
          renderOnClick: "renderOnClick",
          units: "units",
          unitsFontSize: "unitsFontSize",
          unitsFontWeight: "unitsFontWeight",
          unitsColor: "unitsColor",
          outerStrokeGradient: "outerStrokeGradient",
          outerStrokeWidth: "outerStrokeWidth",
          outerStrokeColor: "outerStrokeColor",
          outerStrokeGradientStopColor: "outerStrokeGradientStopColor",
          outerStrokeLinecap: "outerStrokeLinecap",
          innerStrokeColor: "innerStrokeColor",
          innerStrokeWidth: "innerStrokeWidth",
          titleFormat: "titleFormat",
          title: "title",
          titleColor: "titleColor",
          titleFontSize: "titleFontSize",
          titleFontWeight: "titleFontWeight",
          subtitleFormat: "subtitleFormat",
          subtitle: "subtitle",
          subtitleColor: "subtitleColor",
          subtitleFontSize: "subtitleFontSize",
          subtitleFontWeight: "subtitleFontWeight",
          imageSrc: "imageSrc",
          imageHeight: "imageHeight",
          imageWidth: "imageWidth",
          animation: "animation",
          animateTitle: "animateTitle",
          animateSubtitle: "animateSubtitle",
          animationDuration: "animationDuration",
          showTitle: "showTitle",
          showSubtitle: "showSubtitle",
          showUnits: "showUnits",
          showImage: "showImage",
          showBackground: "showBackground",
          showInnerStroke: "showInnerStroke",
          clockwise: "clockwise",
          responsive: "responsive",
          startFromZero: "startFromZero",
          showZeroOuterStroke: "showZeroOuterStroke",
          lazy: "lazy",
          templateOptions: ["options", "templateOptions"]
        },
        outputs: {
          onClick: "onClick"
        },
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵNgOnChangesFeature"]],
        decls: 1,
        vars: 1,
        consts: [["xmlns", "http://www.w3.org/2000/svg", "preserveAspectRatio", "xMidYMid meet", 3, "click", 4, "ngIf"], ["xmlns", "http://www.w3.org/2000/svg", "preserveAspectRatio", "xMidYMid meet", 3, "click"], [4, "ngIf"], ["alignment-baseline", "baseline", 4, "ngIf"], ["preserveAspectRatio", "none", 4, "ngIf"], ["offset", "5%"], ["offset", "95%"], ["alignment-baseline", "baseline"], [4, "ngFor", "ngForOf"], ["preserveAspectRatio", "none"]],
        template: function CircleProgressComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, CircleProgressComponent__svg_svg_0_Template, 9, 11, "svg", 0);
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.svg);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgForOf"]],
        encapsulation: 2
      });
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])], CircleProgressComponent.prototype, "onClick", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)], CircleProgressComponent.prototype, "name", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)], CircleProgressComponent.prototype, "class", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)], CircleProgressComponent.prototype, "backgroundGradient", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)], CircleProgressComponent.prototype, "backgroundColor", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)], CircleProgressComponent.prototype, "backgroundGradientStopColor", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Number)], CircleProgressComponent.prototype, "backgroundOpacity", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)], CircleProgressComponent.prototype, "backgroundStroke", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Number)], CircleProgressComponent.prototype, "backgroundStrokeWidth", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Number)], CircleProgressComponent.prototype, "backgroundPadding", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Number)], CircleProgressComponent.prototype, "radius", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Number)], CircleProgressComponent.prototype, "space", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Number)], CircleProgressComponent.prototype, "percent", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Number)], CircleProgressComponent.prototype, "toFixed", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Number)], CircleProgressComponent.prototype, "maxPercent", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)], CircleProgressComponent.prototype, "renderOnClick", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)], CircleProgressComponent.prototype, "units", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)], CircleProgressComponent.prototype, "unitsFontSize", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)], CircleProgressComponent.prototype, "unitsFontWeight", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)], CircleProgressComponent.prototype, "unitsColor", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)], CircleProgressComponent.prototype, "outerStrokeGradient", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Number)], CircleProgressComponent.prototype, "outerStrokeWidth", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)], CircleProgressComponent.prototype, "outerStrokeColor", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)], CircleProgressComponent.prototype, "outerStrokeGradientStopColor", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)], CircleProgressComponent.prototype, "outerStrokeLinecap", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)], CircleProgressComponent.prototype, "innerStrokeColor", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Object)], CircleProgressComponent.prototype, "innerStrokeWidth", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function)], CircleProgressComponent.prototype, "titleFormat", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Object)], CircleProgressComponent.prototype, "title", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)], CircleProgressComponent.prototype, "titleColor", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)], CircleProgressComponent.prototype, "titleFontSize", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)], CircleProgressComponent.prototype, "titleFontWeight", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function)], CircleProgressComponent.prototype, "subtitleFormat", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Object)], CircleProgressComponent.prototype, "subtitle", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)], CircleProgressComponent.prototype, "subtitleColor", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)], CircleProgressComponent.prototype, "subtitleFontSize", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)], CircleProgressComponent.prototype, "subtitleFontWeight", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)], CircleProgressComponent.prototype, "imageSrc", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Number)], CircleProgressComponent.prototype, "imageHeight", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Number)], CircleProgressComponent.prototype, "imageWidth", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)], CircleProgressComponent.prototype, "animation", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)], CircleProgressComponent.prototype, "animateTitle", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)], CircleProgressComponent.prototype, "animateSubtitle", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Number)], CircleProgressComponent.prototype, "animationDuration", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)], CircleProgressComponent.prototype, "showTitle", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)], CircleProgressComponent.prototype, "showSubtitle", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)], CircleProgressComponent.prototype, "showUnits", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)], CircleProgressComponent.prototype, "showImage", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)], CircleProgressComponent.prototype, "showBackground", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)], CircleProgressComponent.prototype, "showInnerStroke", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)], CircleProgressComponent.prototype, "clockwise", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)], CircleProgressComponent.prototype, "responsive", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)], CircleProgressComponent.prototype, "startFromZero", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)], CircleProgressComponent.prototype, "showZeroOuterStroke", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)], CircleProgressComponent.prototype, "lazy", void 0);
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('options'), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", CircleProgressOptions)], CircleProgressComponent.prototype, "templateOptions", void 0);
      CircleProgressComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_common__WEBPACK_IMPORTED_MODULE_2__["DOCUMENT"])), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [CircleProgressOptions, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], Object])], CircleProgressComponent);
      var NgCircleProgressModule_1;

      var NgCircleProgressModule = NgCircleProgressModule_1 = /*#__PURE__*/function () {
        function NgCircleProgressModule() {
          _classCallCheck(this, NgCircleProgressModule);
        }

        _createClass(NgCircleProgressModule, null, [{
          key: "forRoot",
          value: function forRoot() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            return {
              ngModule: NgCircleProgressModule_1,
              providers: [{
                provide: CircleProgressOptions,
                useValue: options
              }]
            };
          }
        }]);

        return NgCircleProgressModule;
      }();

      NgCircleProgressModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
        type: NgCircleProgressModule
      });
      NgCircleProgressModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
        factory: function NgCircleProgressModule_Factory(t) {
          return new (t || NgCircleProgressModule)();
        },
        imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]]]
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](CircleProgressComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
          args: [{
            selector: 'circle-progress',
            template: "\n        <svg xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"svg\"\n             [attr.viewBox]=\"svg.viewBox\" preserveAspectRatio=\"xMidYMid meet\"\n             [attr.height]=\"svg.height\" [attr.width]=\"svg.width\" (click)=\"emitClickEvent($event)\" [attr.class]=\"options.class\">\n            <defs>\n                <linearGradient *ngIf=\"options.outerStrokeGradient\" [attr.id]=\"svg.outerLinearGradient.id\">\n                    <stop offset=\"5%\" [attr.stop-color]=\"svg.outerLinearGradient.colorStop1\"  [attr.stop-opacity]=\"1\"/>\n                    <stop offset=\"95%\" [attr.stop-color]=\"svg.outerLinearGradient.colorStop2\" [attr.stop-opacity]=\"1\"/>\n                </linearGradient>\n                <radialGradient *ngIf=\"options.backgroundGradient\" [attr.id]=\"svg.radialGradient.id\">\n                    <stop offset=\"5%\" [attr.stop-color]=\"svg.radialGradient.colorStop1\" [attr.stop-opacity]=\"1\"/>\n                    <stop offset=\"95%\" [attr.stop-color]=\"svg.radialGradient.colorStop2\" [attr.stop-opacity]=\"1\"/>\n                </radialGradient>\n            </defs>\n            <ng-container *ngIf=\"options.showBackground\">\n                <circle *ngIf=\"!options.backgroundGradient\"\n                        [attr.cx]=\"svg.backgroundCircle.cx\"\n                        [attr.cy]=\"svg.backgroundCircle.cy\"\n                        [attr.r]=\"svg.backgroundCircle.r\"\n                        [attr.fill]=\"svg.backgroundCircle.fill\"\n                        [attr.fill-opacity]=\"svg.backgroundCircle.fillOpacity\"\n                        [attr.stroke]=\"svg.backgroundCircle.stroke\"\n                        [attr.stroke-width]=\"svg.backgroundCircle.strokeWidth\"/>\n                <circle *ngIf=\"options.backgroundGradient\"\n                        [attr.cx]=\"svg.backgroundCircle.cx\"\n                        [attr.cy]=\"svg.backgroundCircle.cy\"\n                        [attr.r]=\"svg.backgroundCircle.r\"\n                        attr.fill=\"url(#{{svg.radialGradient.id}})\"\n                        [attr.fill-opacity]=\"svg.backgroundCircle.fillOpacity\"\n                        [attr.stroke]=\"svg.backgroundCircle.stroke\"\n                        [attr.stroke-width]=\"svg.backgroundCircle.strokeWidth\"/>\n            </ng-container>            \n            <circle *ngIf=\"options.showInnerStroke\"\n                    [attr.cx]=\"svg.circle.cx\"\n                    [attr.cy]=\"svg.circle.cy\"\n                    [attr.r]=\"svg.circle.r\"\n                    [attr.fill]=\"svg.circle.fill\"\n                    [attr.stroke]=\"svg.circle.stroke\"\n                    [attr.stroke-width]=\"svg.circle.strokeWidth\"/>\n            <ng-container *ngIf=\"+options.percent!==0 || options.showZeroOuterStroke\">\n                <path *ngIf=\"!options.outerStrokeGradient\"\n                        [attr.d]=\"svg.path.d\"\n                        [attr.stroke]=\"svg.path.stroke\"\n                        [attr.stroke-width]=\"svg.path.strokeWidth\"\n                        [attr.stroke-linecap]=\"svg.path.strokeLinecap\"\n                        [attr.fill]=\"svg.path.fill\"/>\n                <path *ngIf=\"options.outerStrokeGradient\"\n                        [attr.d]=\"svg.path.d\"\n                        attr.stroke=\"url(#{{svg.outerLinearGradient.id}})\"\n                        [attr.stroke-width]=\"svg.path.strokeWidth\"\n                        [attr.stroke-linecap]=\"svg.path.strokeLinecap\"\n                        [attr.fill]=\"svg.path.fill\"/>\n            </ng-container>\n            <text *ngIf=\"!options.showImage && (options.showTitle || options.showUnits || options.showSubtitle)\"\n                  alignment-baseline=\"baseline\"\n                  [attr.x]=\"svg.circle.cx\"\n                  [attr.y]=\"svg.circle.cy\"\n                  [attr.text-anchor]=\"svg.title.textAnchor\">\n                <ng-container *ngIf=\"options.showTitle\">\n                    <tspan *ngFor=\"let tspan of svg.title.tspans\"\n                           [attr.x]=\"svg.title.x\"\n                           [attr.y]=\"svg.title.y\"\n                           [attr.dy]=\"tspan.dy\"\n                           [attr.font-size]=\"svg.title.fontSize\"\n                           [attr.font-weight]=\"svg.title.fontWeight\"\n                           [attr.fill]=\"svg.title.color\">{{tspan.span}}</tspan>\n                </ng-container>\n                <tspan *ngIf=\"options.showUnits\"\n                       [attr.font-size]=\"svg.units.fontSize\"\n                       [attr.font-weight]=\"svg.units.fontWeight\"\n                       [attr.fill]=\"svg.units.color\">{{svg.units.text}}</tspan>\n                <ng-container *ngIf=\"options.showSubtitle\">\n                    <tspan *ngFor=\"let tspan of svg.subtitle.tspans\"\n                           [attr.x]=\"svg.subtitle.x\"\n                           [attr.y]=\"svg.subtitle.y\"\n                           [attr.dy]=\"tspan.dy\"\n                           [attr.font-size]=\"svg.subtitle.fontSize\"\n                           [attr.font-weight]=\"svg.subtitle.fontWeight\"\n                           [attr.fill]=\"svg.subtitle.color\">{{tspan.span}}</tspan>\n                </ng-container>\n            </text>\n            <image *ngIf=\"options.showImage\" preserveAspectRatio=\"none\" \n                [attr.height]=\"svg.image.height\"\n                [attr.width]=\"svg.image.width\"\n                [attr.xlink:href]=\"svg.image.src\"\n                [attr.x]=\"svg.image.x\"\n                [attr.y]=\"svg.image.y\"\n            />\n        </svg>\n    "
          }]
        }], function () {
          return [{
            type: CircleProgressOptions
          }, {
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]
          }, {
            type: Object,
            decorators: [{
              type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"],
              args: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["DOCUMENT"]]
            }]
          }];
        }, {
          onClick: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"]
          }],
          name: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          "class": [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          backgroundGradient: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          backgroundColor: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          backgroundGradientStopColor: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          backgroundOpacity: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          backgroundStroke: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          backgroundStrokeWidth: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          backgroundPadding: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          radius: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          space: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          percent: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          toFixed: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          maxPercent: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          renderOnClick: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          units: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          unitsFontSize: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          unitsFontWeight: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          unitsColor: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          outerStrokeGradient: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          outerStrokeWidth: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          outerStrokeColor: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          outerStrokeGradientStopColor: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          outerStrokeLinecap: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          innerStrokeColor: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          innerStrokeWidth: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          titleFormat: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          title: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          titleColor: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          titleFontSize: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          titleFontWeight: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          subtitleFormat: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          subtitle: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          subtitleColor: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          subtitleFontSize: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          subtitleFontWeight: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          imageSrc: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          imageHeight: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          imageWidth: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          animation: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          animateTitle: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          animateSubtitle: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          animationDuration: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          showTitle: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          showSubtitle: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          showUnits: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          showImage: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          showBackground: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          showInnerStroke: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          clockwise: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          responsive: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          startFromZero: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          showZeroOuterStroke: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          lazy: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }],
          templateOptions: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"],
            args: ['options']
          }]
        });
      })();

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](NgCircleProgressModule, {
          declarations: function declarations() {
            return [CircleProgressComponent];
          },
          imports: function imports() {
            return [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]];
          },
          exports: function exports() {
            return [CircleProgressComponent];
          }
        });
      })();
      /*@__PURE__*/


      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](NgCircleProgressModule, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
          args: [{
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]],
            declarations: [CircleProgressComponent],
            exports: [CircleProgressComponent]
          }]
        }], null, null);
      })();
      /**
       * Generated bundle index. Do not edit.
       */
      //# sourceMappingURL=ng-circle-progress.js.map

      /***/

    },

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


      __webpack_exports__["default"] = "<ion-header>\n  <ion-toolbar color=\"primary\">\n    <ion-title>Assignment List</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n  <!-- Card for adding a new event -->\n  <ion-card>\n    <ion-card-header tappable (click)=\"collapseCard = !collapseCard\">\n      <ion-card-title>New Event</ion-card-title>\n    </ion-card-header>\n    <ion-card-content *ngIf=\"!collapseCard\">\n      <ion-item>\n        <ion-input type=\"text\" placeholder=\"Course Code\" [(ngModel)]=\"courseName\"\n          (ngModelChange)=\"courseName=$event.toUpperCase()\"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-input class=\"capitalize\" type=\"text\" placeholder=\"Assignment Title\" [(ngModel)]=\"eventName\"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label>Start</ion-label>\n        <ion-datetime displayFormat=\"DD/MM/YYYY HH:mm\" pickerFormat=\"D MMM:HH:mm\" [(ngModel)]=\"startTime\"\n          [min]=\"minDate\">\n        </ion-datetime>\n      </ion-item>\n      <ion-item>\n        <ion-label>End</ion-label>\n        <ion-datetime displayFormat=\"DD/MM/YYYY HH:mm\" pickerFormat=\"D MMM:HH:mm\" [(ngModel)]=\"endTime\" [min]=\"minDate\">\n        </ion-datetime>\n      </ion-item>\n      <ion-item>\n        <ion-label>All Day?</ion-label>\n        <ion-checkbox [(ngModel)]=\"allDay\"></ion-checkbox>\n      </ion-item>\n      <ion-button fill=\"outline\" expand=\"block\" (click)=\"addEvent(courseName, eventName, startTime, endTime, allDay)\">\n        Add Event </ion-button>\n    </ion-card-content>\n  </ion-card>\n\n  <ion-list>\n    <ion-list-header>\n      <ion-label>Your events</ion-label>\n    </ion-list-header>\n    <ion-item tappable *ngFor=\"let event of eventList\" routerLink=\"/tabs/tab2/detail/{{ event.id }}\">\n      <ion-label>\n        <h2>{{event?.courseName}}</h2>\n        <h3> {{ event?.eventName }} </h3>\n        <p>Due Date: <strong>{{getDueTime(event)}}</strong></p>\n      </ion-label>\n      <circle-progress class=\"circleProgress\"\n      [percent]= \"this.event.progress\"\n      [radius]=\"100\"\n      [outerStrokeWidth]=\"20\"\n      [innerStrokeWidth]=\"20\"\n      [space] = \"-20\"\n      [outerStrokeColor]=\"this.event.color\"\n      [innerStrokeColor]=\"'#e7e8ea'\"\n      [titleFontSize]= \"50\"\n      [unitsFontSize]= \"50\"\n      [showSubtitle] = \"false\"\n      [animation]=\"false\"\n      [animationDuration]=\"300\"\n      [startFromZero]=\"false\"\n      [responsive]=\"true\"\n    ></circle-progress>\n\n    </ion-item>\n\n  </ion-list>\n  <!-- <circle-progress\n  [percent]=\"progress\"\n  [radius]=\"100\"\n  [outerStrokeWidth]=\"10\"\n  [innerStrokeWidth]=\"10\"\n  [space] = \"-10\"\n  [outerStrokeColor]=\"'#4882c2'\"\n  [innerStrokeColor]=\"'#e7e8ea'\"\n  [titleFontSize]= \"24\"\n  [unitsFontSize]= \"24\"\n  [showSubtitle] = \"false\"\n  [animation]=\"true\"\n  [animationDuration]=\"300\"\n  [startFromZero]=\"false\"\n  [responsive]=\"true\"\n></circle-progress> -->\n\n</ion-content>";
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
      /* harmony import */


      var ng_circle_progress__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ng-circle-progress */
      "./node_modules/ng-circle-progress/__ivy_ngcc__/fesm2015/ng-circle-progress.js");
      /* harmony import */


      var _ionic_native_local_notifications_ngx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @ionic-native/local-notifications/ngx */
      "./node_modules/@ionic-native/local-notifications/__ivy_ngcc__/ngx/index.js");

      var Tab2PageModule = function Tab2PageModule() {
        _classCallCheck(this, Tab2PageModule);
      };

      Tab2PageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _tab2_routing_module__WEBPACK_IMPORTED_MODULE_5__["Tab2PageRoutingModule"], ng_circle_progress__WEBPACK_IMPORTED_MODULE_7__["NgCircleProgressModule"].forRoot({})],
        declarations: [_tab2_page__WEBPACK_IMPORTED_MODULE_6__["Tab2Page"]],
        exports: [],
        providers: [_ionic_native_local_notifications_ngx__WEBPACK_IMPORTED_MODULE_8__["LocalNotifications"]]
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


      __webpack_exports__["default"] = ".capitalize {\n  text-transform: capitalize;\n}\n\n.circleProgress {\n  width: 20%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvdGFiMi90YWIyLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLDBCQUFBO0FBQ0Y7O0FBQ0E7RUFDRSxVQUFBO0FBRUYiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy90YWIyL3RhYjIucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNhcGl0YWxpemUge1xuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcbn1cbi5jaXJjbGVQcm9ncmVzc3tcbiAgd2lkdGg6IDIwJTtcbn0iXX0= */";
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
      /* harmony import */


      var firebase_app__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! firebase/app */
      "./node_modules/firebase/app/dist/index.cjs.js");
      /* harmony import */


      var firebase_app__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(firebase_app__WEBPACK_IMPORTED_MODULE_6__);
      /* harmony import */


      var firebase_auth__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! firebase/auth */
      "./node_modules/firebase/auth/dist/index.esm.js");
      /* harmony import */


      var firebase_firestore__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! firebase/firestore */
      "./node_modules/firebase/firestore/dist/index.esm.js");
      /* harmony import */


      var _ionic_native_local_notifications_ngx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @ionic-native/local-notifications/ngx */
      "./node_modules/@ionic-native/local-notifications/__ivy_ngcc__/ngx/index.js");

      var Tab2Page = /*#__PURE__*/function () {
        function Tab2Page(platform, router, eventService, //call the services function
        toastController, localNotifications, locale) {
          var _this2 = this;

          _classCallCheck(this, Tab2Page);

          this.platform = platform;
          this.router = router;
          this.eventService = eventService;
          this.toastController = toastController;
          this.localNotifications = localNotifications;
          this.locale = locale;
          this.userId = "";
          this.courseName = "";
          this.eventName = "";
          this.startTime = new Date().toISOString();
          this.endTime = new Date().toISOString();
          this.allDay = false; //can only add new event after today

          this.minDate = new Date().toISOString();
          this.collapseCard = true;

          this.countDown = function () {
            for (var eve in _this2.eventList) {
              var remainingTime = _this2.remainingTime(_this2.eventList[eve].totalTime, _this2.eventList[eve].endTime);

              var percent = remainingTime / _this2.eventList[eve].totalTime * 100;
              var currentPercent = parseInt(percent.toString()).toString();
              _this2.eventList[eve].progress = currentPercent;

              if (remainingTime <= 3600000 && !_this2.eventList[eve].triggered) {
                var courseTitle = _this2.eventList[eve].courseName;
                var eventTitle = _this2.eventList[eve].eventName;

                _this2.sendNotifications(courseTitle, eventTitle);

                _this2.eventList[eve].triggered = true;
              }

              if (percent == 0) clearInterval(_this2.intervalId);
              if (percent <= 100 && percent >= 66) _this2.eventList[eve].color = "#00EA1A";else if (percent < 66 && percent >= 33) _this2.eventList[eve].color = "#EAB700";else {
                _this2.eventList[eve].color = "#EA1F0A";
              }
            }
          };
        }

        _createClass(Tab2Page, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this3 = this;

            this.platform.ready().then(function () {
              _this3.listenChanges();
            });
            this.intervalId = setInterval(this.countDown, 1000);
          }
        }, {
          key: "sendNotifications",
          value: function sendNotifications(courseName, eventName) {
            // Schedule a single notification
            this.localNotifications.schedule({
              title: courseName + " - " + eventName,
              text: "Hurry up, this is due in one hour!",
              data: {
                page: "/tabs/tab2"
              }
            });
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            clearInterval(this.intervalId);
          }
        }, {
          key: "updateList",
          value: function updateList() {
            var _this4 = this;

            var slef = this;
            this.eventService.getEventList() //get the list from service
            .get().then(function (eventListSnapshot) {
              _this4.eventList = [];
              eventListSnapshot.forEach(function (snap) {
                var t1 = slef.dateTime(snap.data().startTime);
                var t2 = slef.dateTime(snap.data().endTime);
                var timeDiff = t2.getTime() - t1.getTime();

                _this4.eventList.push({
                  //push every record into our eventList array
                  id: snap.id,
                  courseName: snap.data().courseName,
                  eventName: snap.data().eventName,
                  startTime: snap.data().startTime,
                  endTime: snap.data().endTime,
                  allDay: snap.data().allDay,
                  totalTime: timeDiff,
                  triggered: false
                });

                return false;
              });
            });
            this.intervalId = setInterval(this.countDown, 1000);
          }
        }, {
          key: "remainingTime",
          value: function remainingTime(totalTime, endTime) {
            var now = new Date().getTime();
            var end = this.dateTime(endTime).getTime();
            var diffNowAndEnd = end - now;

            if (now < end) {
              return diffNowAndEnd;
            }

            return 0;
          }
        }, {
          key: "listenChanges",
          value: function listenChanges() {
            this.userId = this.eventService.getUserId();
            var slef = this;
            var db = firebase_app__WEBPACK_IMPORTED_MODULE_6__["firestore"]();
            db.collection("/userProfile/".concat(this.userId, "/eventList")).onSnapshot({
              includeMetadataChanges: true
            }, function (snapshot) {
              this.eventSource = [];
              snapshot.docChanges().forEach(function (change) {
                if (change.type === "added" || change.type === "modified" || change.type === "removed") {
                  slef.updateList();
                }
              });
            });
          }
        }, {
          key: "addEvent",
          value: function addEvent(courseName, eventName, startTime, endTime, allday) {
            var _this5 = this;

            if (courseName === undefined || eventName === undefined || startTime === undefined || endTime === undefined || allday === undefined) {
              return;
            }

            this.eventService.addEvent(courseName, this.setFirstLetterToUppercase(eventName), this.formatTime(startTime), this.formatTime(endTime), allday).then(function () {
              _this5.router.navigateByUrl("");

              _this5.resetEvent();
            }).then(function () {
              _this5.presentToast("Event Added Successfully :)", "success");
            })["catch"](function (error) {
              // console.log("ERROR: " + error.message);
              _this5.presentToast("ERROR :(", "danger");
            }); //close the "new event collapseCard"

            this.collapseCard = true;
          }
        }, {
          key: "dateTime",
          value: function dateTime(t) {
            var time = Object(_angular_common__WEBPACK_IMPORTED_MODULE_3__["formatDate"])(t, "medium", this.locale);
            return new Date(time);
          }
        }, {
          key: "formatTime",
          value: function formatTime(t) {
            var time = Object(_angular_common__WEBPACK_IMPORTED_MODULE_3__["formatDate"])(t, "medium", this.locale);
            var newTime = new Date(time);
            return newTime.toISOString();
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
          key: "getDueTime",
          value: function getDueTime(event) {
            var end = Object(_angular_common__WEBPACK_IMPORTED_MODULE_3__["formatDate"])(event.endTime, "medium", this.locale);
            return end;
          }
        }, {
          key: "setFirstLetterToUppercase",
          value: function setFirstLetterToUppercase(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
          }
        }, {
          key: "presentToast",
          value: function presentToast(msg, status) {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              var toast;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return this.toastController.create({
                        message: msg,
                        duration: 1000,
                        color: status
                      });

                    case 2:
                      toast = _context.sent;
                      toast.present();

                    case 4:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }));
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
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ToastController"]
        }, {
          type: _ionic_native_local_notifications_ngx__WEBPACK_IMPORTED_MODULE_9__["LocalNotifications"]
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