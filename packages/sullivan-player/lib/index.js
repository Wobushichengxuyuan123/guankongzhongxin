(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
  typeof define === 'function' && define.amd ? define(['react'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.index = factory(global.React));
})(this, (function (React) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);

      if (enumerableOnly) {
        symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }

      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  var CONTAINER_ID = '#videoMultipleContainer';
  /*function getEventPath (evt) {
    return evt.path || (evt.composedPath && evt.composedPath()) || ''
  }*/

  var container = {
    width: undefined,
    height: undefined,
    canvasW: undefined,
    canvasH: undefined,
    getContainerSize: function getContainerSize(elementId) {
      var __$container = document.querySelector(elementId);

      if (__$container) {
        var width = __$container.width,
            clientWidth = __$container.clientWidth,
            height = __$container.height,
            clientHeight = __$container.clientHeight;
        container.width = width || clientWidth;
        container.height = height || clientHeight;
      }

      return container;
    },
    getCanvasSize: function getCanvasSize($canvas) {
      if (container.canvasW) return;

      if ($canvas) {
        var width = $canvas.width,
            clientWidth = $canvas.clientWidth,
            height = $canvas.height,
            clientHeight = $canvas.clientHeight;
        container.canvasW = width || clientWidth;
        container.canvasH = height || clientHeight;
      }

      return container;
    },
    getStyleSize: function getStyleSize(style) {
      function __getStyleSize(size) {
        if (typeof size === 'number') {
          return size;
        }

        if (typeof size === 'string' && size.indexOf('px') > -1) {
          return parseInt(size);
        }
      }

      return {
        width: __getStyleSize(style.width),
        height: __getStyleSize(style.height)
      };
    },
    getColumn: function getColumn(column) {
      var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      if (!column) {
        column = Math.sqrt(length);
      }

      return column;
    },
    createChildStyle: function createChildStyle() {
      var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var column = arguments.length > 1 ? arguments[1] : undefined;
      var length = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var width = size.width,
          height = size.height;
      column = container.getColumn(column, length);
      var childW = parseInt('' + (width - 1) / column) + 'px';
      var childH = parseInt('' + (height - 1) / column) + 'px';
      return {
        width: childW,
        height: childH,
        overflow: 'hidden',
        position: 'relative'
      };
    }
  };

  function styleInject(css, ref) {
    if (ref === void 0) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') {
      return;
    }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z = "* {\n  box-sizing: border-box; }\n\n.jessibuca-container {\n  display: flex;\n  flex-wrap: wrap;\n  align-content: flex-start;\n  width: 100%;\n  height: 100%;\n  background-color: #073938;\n  /*border: 2px solid #ccc;*/ }\n  .jessibuca-container .video-multiple-item {\n    position: relative;\n    overflow: hidden;\n    border: 1px solid transparent;\n    border-bottom: 1px solid #ccc; }\n    .jessibuca-container .video-multiple-item.video-multiple-item-last {\n      border-right: 1px solid #ccc; }\n    .jessibuca-container .video-multiple-item + .video-multiple-item {\n      border-left: 1px solid #ccc; }\n  .jessibuca-container .movement-wrap {\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 0;\n    background-color: rgba(0, 0, 0, 0.4); }\n    .jessibuca-container .movement-wrap .movement-arrow {\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      padding: 10px;\n      position: absolute;\n      width: 10%;\n      max-width: 70px;\n      min-width: 30px;\n      background-repeat: no-repeat;\n      background-color: rgba(0, 0, 0, 0.2);\n      background-position: center;\n      border-radius: 40px;\n      cursor: pointer;\n      opacity: .6;\n      z-index: 99; }\n      .jessibuca-container .movement-wrap .movement-arrow > img {\n        width: 100%;\n        height: 100%; }\n    .jessibuca-container .movement-wrap .movement-top {\n      top: 10%;\n      left: 50%; }\n      .jessibuca-container .movement-wrap .movement-top > img {\n        transform: rotate(-90deg); }\n    .jessibuca-container .movement-wrap .movement-right {\n      top: 45%;\n      right: 20px; }\n    .jessibuca-container .movement-wrap .movement-bottom {\n      left: 50%;\n      bottom: 10%; }\n      .jessibuca-container .movement-wrap .movement-bottom > img {\n        transform: rotate(90deg); }\n    .jessibuca-container .movement-wrap .movement-left {\n      top: 45%;\n      left: 20px; }\n      .jessibuca-container .movement-wrap .movement-left > img {\n        transform: rotate(180deg); }\n  .jessibuca-container .jessibuca-icon > svg:not([disabled]) {\n    fill: #ddd; }\n  .jessibuca-container .jessibuca-icon > svg[disabled] {\n    fill: #777; }\n  .jessibuca-container .jessibuca-icon-movement {\n    background-size: 100% 100%; }\n  .jessibuca-container .jessibuca-icon-movement-active {\n    background-size: 100% 100%; }\n  .jessibuca-container .jessibuca-icon-transform {\n    background-size: 100% 100%; }\n  .jessibuca-container .jessibuca-icon-transform-active {\n    background-size: 100% 100%; }\n  .jessibuca-container .jessibuca-icon-zoom-enlarge,\n  .jessibuca-container .jessibuca-icon-zoom-minimize {\n    pointer-events: none; }\n  .jessibuca-container .jessibuca-icon-zoom-enlarge-active:hover svg,\n  .jessibuca-container .jessibuca-icon-zoom-minimize-active:hover svg {\n    fill: #fff; }\n  .jessibuca-container .control-wrap {\n    height: 38px;\n    z-index: 11;\n    position: absolute;\n    left: 0;\n    width: 100%;\n    bottom: 0;\n    background: rgba(0, 0, 0, 0.8); }\n  .jessibuca-container .top-control {\n    display: flex;\n    justify-content: end; }\n    .jessibuca-container .top-control .tag-close {\n      position: absolute;\n      z-index: 999;\n      top: .7rem;\n      right: .7rem; }\n    .jessibuca-container .top-control .icon {\n      fill: #ff0000;\n      cursor: pointer;\n      background-color: rgba(0, 0, 0, 0.1);\n      box-shadow: 0 0 3rem #000; }\n";
  styleInject(css_248z);

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var screenfull = createCommonjsModule(function (module) {
    /*!
    * screenfull
    * v5.1.0 - 2020-12-24
    * (c) Sindre Sorhus; MIT License
    */
    (function () {

      var document = typeof window !== 'undefined' && typeof window.document !== 'undefined' ? window.document : {};
      var isCommonjs = module.exports;

      var fn = function () {
        var val;
        var fnMap = [['requestFullscreen', 'exitFullscreen', 'fullscreenElement', 'fullscreenEnabled', 'fullscreenchange', 'fullscreenerror'], // New WebKit
        ['webkitRequestFullscreen', 'webkitExitFullscreen', 'webkitFullscreenElement', 'webkitFullscreenEnabled', 'webkitfullscreenchange', 'webkitfullscreenerror'], // Old WebKit
        ['webkitRequestFullScreen', 'webkitCancelFullScreen', 'webkitCurrentFullScreenElement', 'webkitCancelFullScreen', 'webkitfullscreenchange', 'webkitfullscreenerror'], ['mozRequestFullScreen', 'mozCancelFullScreen', 'mozFullScreenElement', 'mozFullScreenEnabled', 'mozfullscreenchange', 'mozfullscreenerror'], ['msRequestFullscreen', 'msExitFullscreen', 'msFullscreenElement', 'msFullscreenEnabled', 'MSFullscreenChange', 'MSFullscreenError']];
        var i = 0;
        var l = fnMap.length;
        var ret = {};

        for (; i < l; i++) {
          val = fnMap[i];

          if (val && val[1] in document) {
            for (i = 0; i < val.length; i++) {
              ret[fnMap[0][i]] = val[i];
            }

            return ret;
          }
        }

        return false;
      }();

      var eventNameMap = {
        change: fn.fullscreenchange,
        error: fn.fullscreenerror
      };
      var screenfull = {
        request: function (element, options) {
          return new Promise(function (resolve, reject) {
            var onFullScreenEntered = function () {
              this.off('change', onFullScreenEntered);
              resolve();
            }.bind(this);

            this.on('change', onFullScreenEntered);
            element = element || document.documentElement;
            var returnPromise = element[fn.requestFullscreen](options);

            if (returnPromise instanceof Promise) {
              returnPromise.then(onFullScreenEntered).catch(reject);
            }
          }.bind(this));
        },
        exit: function () {
          return new Promise(function (resolve, reject) {
            if (!this.isFullscreen) {
              resolve();
              return;
            }

            var onFullScreenExit = function () {
              this.off('change', onFullScreenExit);
              resolve();
            }.bind(this);

            this.on('change', onFullScreenExit);
            var returnPromise = document[fn.exitFullscreen]();

            if (returnPromise instanceof Promise) {
              returnPromise.then(onFullScreenExit).catch(reject);
            }
          }.bind(this));
        },
        toggle: function (element, options) {
          return this.isFullscreen ? this.exit() : this.request(element, options);
        },
        onchange: function (callback) {
          this.on('change', callback);
        },
        onerror: function (callback) {
          this.on('error', callback);
        },
        on: function (event, callback) {
          var eventName = eventNameMap[event];

          if (eventName) {
            document.addEventListener(eventName, callback, false);
          }
        },
        off: function (event, callback) {
          var eventName = eventNameMap[event];

          if (eventName) {
            document.removeEventListener(eventName, callback, false);
          }
        },
        raw: fn
      };

      if (!fn) {
        if (isCommonjs) {
          module.exports = {
            isEnabled: false
          };
        } else {
          window.screenfull = {
            isEnabled: false
          };
        }

        return;
      }

      Object.defineProperties(screenfull, {
        isFullscreen: {
          get: function () {
            return Boolean(document[fn.fullscreenElement]);
          }
        },
        element: {
          enumerable: true,
          get: function () {
            return document[fn.fullscreenElement];
          }
        },
        isEnabled: {
          enumerable: true,
          get: function () {
            // Coerce to boolean in case of old WebKit
            return Boolean(document[fn.fullscreenEnabled]);
          }
        }
      });

      if (isCommonjs) {
        module.exports = screenfull;
      } else {
        window.screenfull = screenfull;
      }
    })();
  });
  screenfull.isEnabled;

  var lib$1 = createCommonjsModule(function (module, exports) {
    (function (global, factory) {
      factory(exports, React__default["default"]) ;
    })(commonjsGlobal, function (exports, React) {

      function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);

        if (e) {
          Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
              var d = Object.getOwnPropertyDescriptor(e, k);
              Object.defineProperty(n, k, d.get ? d : {
                enumerable: true,
                get: function () {
                  return e[k];
                }
              });
            }
          });
        }

        n["default"] = e;
        return Object.freeze(n);
      }

      var React__namespace = /*#__PURE__*/_interopNamespace(React);
      /*! *****************************************************************************
      Copyright (c) Microsoft Corporation.
       Permission to use, copy, modify, and/or distribute this software for any
      purpose with or without fee is hereby granted.
       THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
      REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
      AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
      INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
      LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
      OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
      PERFORMANCE OF THIS SOFTWARE.
      ***************************************************************************** */


      function __rest(s, e) {
        var t = {};

        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

        if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
        }
        return t;
      }

      function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o),
            r,
            ar = [],
            e;

        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        } catch (error) {
          e = {
            error: error
          };
        } finally {
          try {
            if (r && !r.done && (m = i["return"])) m.call(i);
          } finally {
            if (e) throw e.error;
          }
        }

        return ar;
      }

      var _path$1P;

      function _extends$1P() {
        _extends$1P = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$1P.apply(this, arguments);
      }

      const SvgA3User = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$1P({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$1P || (_path$1P = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-65.548 392.363c.113 17.595-14.059 31.95-31.654 32.063l-.22.001c-17.595.013-31.87-14.241-31.883-31.836l.001-.228c-.113-17.591 14.056-31.943 31.647-32.056l.243-.001c17.591-.017 31.866 14.23 31.883 31.821l-.001.235h-.016zm-31.866 89.11c-25.983 0-48.164-4.12-48.164-20.598 0-16.486 22.037-20.75 48.164-20.75 25.983 0 48.171 4.12 48.171 20.598s-22.052 20.75-48.179 20.75h.008zm45.498-88.527a43.658 43.658 0 0 1-7.452 24.536 1.197 1.197 0 0 0 .81 1.855c1.209.203 2.432.319 3.658.348 12.442.333 23.612-7.724 26.695-19.849 4.574-18.016-8.845-34.184-25.937-34.184-1.855 0-3.635.197-5.362.553-.235.053-.485.159-.621.379-.167.258-.045.606.121.833a43.975 43.975 0 0 1 8.088 25.521v.008zm20.606 39.402c8.361 1.643 13.858 4.998 16.138 9.875a14.563 14.563 0 0 1 0 12.647c-3.484 7.558-14.722 9.989-19.084 10.617-.909.136-1.628-.651-1.537-1.56 2.234-20.954-15.509-30.897-20.099-33.177-.197-.106-.242-.257-.227-.356a.307.307 0 0 1 .25-.197c9.935-.182 20.613 1.182 24.559 2.151zm-107.846-12.67a25.391 25.391 0 0 0 3.658-.348 1.196 1.196 0 0 0 .803-1.855 43.658 43.658 0 0 1-7.452-24.536c0-9.466 2.953-18.296 8.088-25.536.167-.227.28-.568.121-.833-.129-.204-.386-.318-.621-.379a26.68 26.68 0 0 0-5.377-.545c-17.077 0-30.496 16.168-25.922 34.184 3.082 12.117 14.252 20.174 26.695 19.849h.007zm1.204 10.708c.023.098-.023.25-.212.356-4.597 2.287-22.34 12.223-20.114 33.169.098.916-.621 1.696-1.522 1.568-4.37-.629-15.6-3.059-19.084-10.617a14.516 14.516 0 0 1 0-12.647c2.272-4.877 7.77-8.232 16.13-9.883 3.953-.962 14.616-2.325 24.567-2.143.151.023.227.129.227.197h.008z"
      })));

      var a3User = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-65.548%2C392.363c0.113%2C17.595-14.059%2C31.95-31.654%2C32.063c-0.073%2C0-0.147%2C0.001-0.22%2C0.001%20c-17.595%2C0.013-31.87-14.241-31.883-31.836c0-0.076%2C0-0.152%2C0.001-0.228c-0.113-17.591%2C14.056-31.943%2C31.647-32.056%20c0.081-0.001%2C0.162-0.001%2C0.243-0.001c17.591-0.017%2C31.866%2C14.23%2C31.883%2C31.821c0%2C0.078%2C0%2C0.157-0.001%2C0.235H-65.548z%20%20M-97.414%2C481.473c-25.983%2C0-48.164-4.12-48.164-20.598c0-16.486%2C22.037-20.75%2C48.164-20.75c25.983%2C0%2C48.171%2C4.12%2C48.171%2C20.598%20s-22.052%2C20.75-48.179%2C20.75H-97.414z%20M-51.916%2C392.946c0.028%2C8.74-2.568%2C17.288-7.452%2C24.536c-0.371%2C0.547-0.229%2C1.291%2C0.317%2C1.662%20c0.148%2C0.1%2C0.316%2C0.166%2C0.493%2C0.193c1.209%2C0.203%2C2.432%2C0.319%2C3.658%2C0.348c12.442%2C0.333%2C23.612-7.724%2C26.695-19.849%20c4.574-18.016-8.845-34.184-25.937-34.184c-1.855%2C0-3.635%2C0.197-5.362%2C0.553c-0.235%2C0.053-0.485%2C0.159-0.621%2C0.379%20c-0.167%2C0.258-0.045%2C0.606%2C0.121%2C0.833c5.283%2C7.46%2C8.11%2C16.38%2C8.088%2C25.521L-51.916%2C392.946z%20M-31.31%2C432.348%20c8.361%2C1.643%2C13.858%2C4.998%2C16.138%2C9.875c1.926%2C3.996%2C1.926%2C8.651%2C0%2C12.647c-3.484%2C7.558-14.722%2C9.989-19.084%2C10.617%20c-0.909%2C0.136-1.628-0.651-1.537-1.56c2.234-20.954-15.509-30.897-20.099-33.177c-0.197-0.106-0.242-0.257-0.227-0.356%20c0.023-0.068%2C0.098-0.174%2C0.25-0.197C-45.934%2C430.015-35.256%2C431.379-31.31%2C432.348L-31.31%2C432.348z%20M-139.156%2C419.678%20c1.242-0.03%2C2.461-0.144%2C3.658-0.348c0.653-0.103%2C1.099-0.715%2C0.996-1.368c-0.028-0.175-0.093-0.341-0.193-0.487%20c-4.884-7.248-7.48-15.796-7.452-24.536c0-9.466%2C2.953-18.296%2C8.088-25.536c0.167-0.227%2C0.28-0.568%2C0.121-0.833%20c-0.129-0.204-0.386-0.318-0.621-0.379c-1.769-0.363-3.571-0.546-5.377-0.545c-17.077%2C0-30.496%2C16.168-25.922%2C34.184%20c3.082%2C12.117%2C14.252%2C20.174%2C26.695%2C19.849H-139.156z%20M-137.952%2C430.386c0.023%2C0.098-0.023%2C0.25-0.212%2C0.356%20c-4.597%2C2.287-22.34%2C12.223-20.114%2C33.169c0.098%2C0.916-0.621%2C1.696-1.522%2C1.568c-4.37-0.629-15.6-3.059-19.084-10.617%20c-1.933-3.994-1.933-8.653%2C0-12.647c2.272-4.877%2C7.77-8.232%2C16.13-9.883c3.953-0.962%2C14.616-2.325%2C24.567-2.143%20c0.151%2C0.023%2C0.227%2C0.129%2C0.227%2C0.197H-137.952z%22%2F%3E%3C%2Fsvg%3E";

      var _path$1O;

      function _extends$1O() {
        _extends$1O = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$1O.apply(this, arguments);
      }

      const SvgAArrowDown = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$1O({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.9 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$1O || (_path$1O = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-177.2 367.6c4.2-4.2 11.1-4.2 15.4 0l64.7 64.7 64.7-64.7c4.3-4.2 11.2-4 15.4.3 4 4.2 4 10.8 0 15l-72.4 72.4c-4.2 4.2-11.1 4.2-15.4 0l-72.4-72.4c-4.2-4.2-4.2-11 0-15.3z"
      })));

      var aArrowDown = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20%20viewBox%3D%22-197%20320.9%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-177.2%2C367.6c4.2-4.2%2C11.1-4.2%2C15.4%2C0c0%2C0%2C0%2C0%2C0%2C0l64.7%2C64.7l64.7-64.7c4.3-4.2%2C11.2-4%2C15.4%2C0.3c4%2C4.2%2C4%2C10.8%2C0%2C15%20l-72.4%2C72.4c-4.2%2C4.2-11.1%2C4.2-15.4%2C0c0%2C0%2C0%2C0%2C0%2C0l-72.4-72.4C-181.4%2C378.7-181.4%2C371.9-177.2%2C367.6L-177.2%2C367.6z%22%2F%3E%3C%2Fsvg%3E";

      var _path$1N;

      function _extends$1N() {
        _extends$1N = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$1N.apply(this, arguments);
      }

      const SvgAArrowLeft = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$1N({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.9 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$1N || (_path$1N = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-60 340.7c4.2 4.2 4.2 11.1 0 15.4l-64.8 64.8 64.8 64.8c4.2 4.3 4 11.2-.3 15.4-4.2 4-10.8 4-15 0l-72.4-72.4c-4.2-4.2-4.2-11.1 0-15.4l72.4-72.4c4.1-4.4 11-4.4 15.3-.2-.1 0 0 0 0 0z"
      })));

      var aArrowLeft = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20%20viewBox%3D%22-197%20320.9%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-60%2C340.7c4.2%2C4.2%2C4.2%2C11.1%2C0%2C15.4l-64.8%2C64.8l64.8%2C64.8c4.2%2C4.3%2C4%2C11.2-0.3%2C15.4c-4.2%2C4-10.8%2C4-15%2C0l-72.4-72.4%20c-4.2-4.2-4.2-11.1%2C0-15.4l72.4-72.4C-71.2%2C336.5-64.3%2C336.5-60%2C340.7C-60.1%2C340.7-60%2C340.7-60%2C340.7z%22%2F%3E%3C%2Fsvg%3E";

      var _path$1M;

      function _extends$1M() {
        _extends$1M = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$1M.apply(this, arguments);
      }

      const SvgAArrowLeftSquare = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$1M({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$1M || (_path$1M = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-62.976 337.557h-68.075c-29.489 0-49.282 18.893-49.282 47.183v72.174c0 28.29 19.793 47.283 49.282 47.283h68.075c29.389 0 49.282-18.993 49.282-47.283V384.64c-.099-28.19-19.892-47.083-49.282-47.083zm-.1 89.467h-52.881l20.693 20.493a6.399 6.399 0 0 1 0 8.897c-2.399 2.399-6.398 2.399-8.797 0l-31.389-31.289c-2.299-2.299-2.299-6.498 0-8.797l31.389-31.289c2.399-2.399 6.398-2.399 8.797 0 1.2 1.3 1.799 2.799 1.799 4.398s-.7 3.299-1.799 4.398l-20.693 20.593h52.881a6.272 6.272 0 0 1 6.298 6.298c-.1 3.499-2.799 6.298-6.298 6.298z"
      })));

      var aArrowLeftSquare = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-62.976%2C337.557h-68.075c-29.489%2C0-49.282%2C18.893-49.282%2C47.183v72.174%20c0%2C28.29%2C19.793%2C47.283%2C49.282%2C47.283h68.075c29.389%2C0%2C49.282-18.993%2C49.282-47.283V384.64%20C-13.793%2C356.45-33.586%2C337.557-62.976%2C337.557z%20M-63.076%2C427.024h-52.881l20.693%2C20.493c2.399%2C2.499%2C2.399%2C6.398%2C0%2C8.897%20c-2.399%2C2.399-6.398%2C2.399-8.797%2C0l-31.389-31.289c-2.299-2.299-2.299-6.498%2C0-8.797l31.389-31.289c2.399-2.399%2C6.398-2.399%2C8.797%2C0%20c1.2%2C1.3%2C1.799%2C2.799%2C1.799%2C4.398s-0.7%2C3.299-1.799%2C4.398l-20.693%2C20.593h52.881c3.499%2C0%2C6.298%2C2.799%2C6.298%2C6.298%20C-56.878%2C424.225-59.577%2C427.024-63.076%2C427.024z%22%2F%3E%3C%2Fsvg%3E";

      var _path$1L;

      function _extends$1L() {
        _extends$1L = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$1L.apply(this, arguments);
      }

      const SvgAArrowMove = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$1L({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.9 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$1L || (_path$1L = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-102 339.6c2.8-2.8 7.2-2.8 10 0l23.6 23.6c2.7 2.8 2.6 7.3-.2 10-2.7 2.6-7.1 2.6-9.8 0l-11.5-11.5v54.5h54.5L-47 404.7c-2.8-2.7-2.9-7.2-.2-10 2.7-2.8 7.2-2.9 10-.2l.2.2 23.6 23.6c2.8 2.8 2.8 7.2 0 10L-37 451.8c-2.7 2.8-7.2 2.9-10 .2-2.8-2.7-2.9-7.2-.2-10l.2-.2 11.5-11.5H-90v54.5l11.5-11.5c2.7-2.8 7.2-2.9 10-.2 2.8 2.7 2.9 7.2.2 10l-.2.2-23.5 23.5c-2.8 2.8-7.2 2.8-10 0l-23.6-23.6c-2.8-2.7-2.9-7.2-.2-10s7.2-2.9 10-.2l.2.2 11.5 11.5v-54.5h-54.5l11.5 11.5c2.7 2.8 2.6 7.3-.2 10-2.7 2.6-7.1 2.6-9.8 0l-23.6-23.6c-2.8-2.8-2.8-7.2 0-10l23.6-23.6c2.8-2.7 7.3-2.6 10 .2 2.6 2.7 2.6 7.1 0 9.8l-11.5 11.5h54.5v-54.5l-11.5 11.5c-2.8 2.7-7.3 2.6-10-.2-2.6-2.7-2.6-7.1 0-9.8l23.6-23.4z"
      })));

      var aArrowMove = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20viewBox%3D%22-197%20320.9%20200%20200%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-102%2C339.6c2.8-2.8%2C7.2-2.8%2C10%2C0c0%2C0%2C0%2C0%2C0%2C0l23.6%2C23.6c2.7%2C2.8%2C2.6%2C7.3-0.2%2C10c-2.7%2C2.6-7.1%2C2.6-9.8%2C0l-11.5-11.5v54.5%20h54.5L-47%2C404.7c-2.8-2.7-2.9-7.2-0.2-10c2.7-2.8%2C7.2-2.9%2C10-0.2c0.1%2C0.1%2C0.1%2C0.1%2C0.2%2C0.2l23.6%2C23.6c2.8%2C2.8%2C2.8%2C7.2%2C0%2C10L-37%2C451.8%20c-2.7%2C2.8-7.2%2C2.9-10%2C0.2c-2.8-2.7-2.9-7.2-0.2-10c0.1-0.1%2C0.1-0.1%2C0.2-0.2l11.5-11.5h-54.5v54.5l11.5-11.5c2.7-2.8%2C7.2-2.9%2C10-0.2%20c2.8%2C2.7%2C2.9%2C7.2%2C0.2%2C10c-0.1%2C0.1-0.1%2C0.1-0.2%2C0.2L-92%2C506.8c-2.8%2C2.8-7.2%2C2.8-10%2C0c0%2C0%2C0%2C0%2C0%2C0l-23.6-23.6c-2.8-2.7-2.9-7.2-0.2-10%20s7.2-2.9%2C10-0.2c0.1%2C0.1%2C0.1%2C0.1%2C0.2%2C0.2l11.5%2C11.5v-54.5h-54.5l11.5%2C11.5c2.7%2C2.8%2C2.6%2C7.3-0.2%2C10c-2.7%2C2.6-7.1%2C2.6-9.8%2C0%20l-23.6-23.6c-2.8-2.8-2.8-7.2%2C0-10l23.6-23.6c2.8-2.7%2C7.3-2.6%2C10%2C0.2c2.6%2C2.7%2C2.6%2C7.1%2C0%2C9.8l-11.5%2C11.5h54.5v-54.5l-11.5%2C11.5%20c-2.8%2C2.7-7.3%2C2.6-10-0.2c-2.6-2.7-2.6-7.1%2C0-9.8L-102%2C339.6z%22%2F%3E%3C%2Fsvg%3E";

      var _path$1K;

      function _extends$1K() {
        _extends$1K = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$1K.apply(this, arguments);
      }

      const SvgAArrowRight = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$1K({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.9 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$1K || (_path$1K = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-137.3 340.5c4.2-4.2 11.1-4.2 15.4 0l72.5 72.5c4.2 4.2 4.2 11.1 0 15.4l-72.5 72.5c-4.2 4.3-11 4.5-15.4.3s-4.5-11-.3-15.4l.3-.3 64.8-64.8-64.8-64.8c-4.2-4.3-4.2-11.1 0-15.4z"
      })));

      var aArrowRight = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.9%20200%20200%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-137.3%2C340.5c4.2-4.2%2C11.1-4.2%2C15.4%2C0c0%2C0%2C0%2C0%2C0%2C0l72.5%2C72.5c4.2%2C4.2%2C4.2%2C11.1%2C0%2C15.4l-72.5%2C72.5c-4.2%2C4.3-11%2C4.5-15.4%2C0.3%20s-4.5-11-0.3-15.4c0.1-0.1%2C0.2-0.2%2C0.3-0.3l64.8-64.8l-64.8-64.8C-141.5%2C351.6-141.5%2C344.8-137.3%2C340.5z%22%2F%3E%3C%2Fsvg%3E";

      var _path$1J;

      function _extends$1J() {
        _extends$1J = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$1J.apply(this, arguments);
      }

      const SvgAArrowSort = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$1J({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$1J || (_path$1J = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M484.907 143.53a38.4 38.4 0 0 1 54.314 0l213.334 213.334a38.4 38.4 0 0 1-54.315 54.272L512.085 224.981 325.888 411.136a38.4 38.4 0 0 1-54.315-54.272l213.334-213.333zM271.573 612.865a38.4 38.4 0 0 1 54.315 0l186.197 186.155L698.24 612.864a38.4 38.4 0 1 1 54.315 54.272L539.22 880.469a38.4 38.4 0 0 1-54.314 0L271.573 667.136a38.4 38.4 0 0 1 0-54.272z"
      })));

      var aArrowSort = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%220%200%201024%201024%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M484.906667%20143.530667a38.4%2038.4%200%200%201%2054.314666%200l213.333334%20213.333333a38.4%2038.4%200%200%201-54.314667%2054.272l-186.154667-186.154667-186.197333%20186.154667a38.4%2038.4%200%200%201-54.314667-54.272l213.333334-213.333333z%20m-213.333334%20469.333333a38.4%2038.4%200%200%201%2054.314667%200l186.197333%20186.154667%20186.154667-186.154667a38.4%2038.4%200%201%201%2054.314667%2054.272l-213.333334%20213.333333a38.4%2038.4%200%200%201-54.314666%200l-213.333334-213.333333a38.4%2038.4%200%200%201%200-54.272z%22%2F%3E%3C%2Fsvg%3E";

      var _path$1I;

      function _extends$1I() {
        _extends$1I = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$1I.apply(this, arguments);
      }

      const SvgAArrowTailRight = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$1I({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$1I || (_path$1I = /*#__PURE__*/React__namespace.createElement("path", {
        d: "m-107.774 420.954.019 3.279c.111 13.004.889 24.61 2.241 31.964 0 .139 1.482 7.428 2.417 9.855a17.442 17.442 0 0 0 7.493 8.382 18.53 18.53 0 0 0 8.429 2.028c2.306-.111 6.113-1.269 8.836-2.241l2.26-.871c14.977-5.946 43.597-25.378 54.564-37.271l.806-.834 3.612-3.89c2.269-2.982 3.473-6.622 3.473-10.54 0-3.51-1.074-7.021-3.214-9.855-.648-.917-1.667-2.093-2.593-3.094l-3.51-3.677c-12.087-12.235-38.244-29.407-51.803-35.104 0-.12-8.429-3.64-12.439-3.77h-.528c-6.159 0-11.911 3.51-14.847 9.179-.806 1.556-1.575 4.594-2.158 7.262l-1.056 5.039c-1.205 8.095-2.002 20.525-2.002 34.159zm-58.648-14.125c-7.688 0-13.921 6.298-13.921 14.06-.041 7.724 6.187 14.019 13.911 14.06h.01l34.27-3.038c6.02 0 10.92-4.927 10.92-11.022 0-6.095-4.89-11.031-10.929-11.031l-34.261-3.029z"
      })));

      var aArrowTailRight = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-107.774%2C420.954l0.019%2C3.279c0.111%2C13.004%2C0.889%2C24.61%2C2.241%2C31.964%20c0%2C0.139%2C1.482%2C7.428%2C2.417%2C9.855c1.482%2C3.52%2C4.14%2C6.493%2C7.493%2C8.382c2.61%2C1.333%2C5.498%2C2.028%2C8.429%2C2.028%20c2.306-0.111%2C6.113-1.269%2C8.836-2.241l2.26-0.871c14.977-5.946%2C43.597-25.378%2C54.564-37.271l0.806-0.834l3.612-3.89%20c2.269-2.982%2C3.473-6.622%2C3.473-10.54c0-3.51-1.074-7.021-3.214-9.855c-0.648-0.917-1.667-2.093-2.593-3.094l-3.51-3.677%20c-12.087-12.235-38.244-29.407-51.803-35.104c0-0.12-8.429-3.64-12.439-3.77h-0.528c-6.159%2C0-11.911%2C3.51-14.847%2C9.179%20c-0.806%2C1.556-1.575%2C4.594-2.158%2C7.262l-1.056%2C5.039C-106.977%2C394.89-107.774%2C407.32-107.774%2C420.954L-107.774%2C420.954z%20%20M-166.422%2C406.829c-7.688%2C0-13.921%2C6.298-13.921%2C14.06c-0.041%2C7.724%2C6.187%2C14.019%2C13.911%2C14.06c0.003%2C0%2C0.006%2C0%2C0.01%2C0l34.27-3.038%20c6.02%2C0%2C10.92-4.927%2C10.92-11.022c0-6.095-4.89-11.031-10.929-11.031L-166.422%2C406.829z%22%2F%3E%3C%2Fsvg%3E";

      var _path$1H;

      function _extends$1H() {
        _extends$1H = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$1H.apply(this, arguments);
      }

      const SvgAArrowTailUp = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$1H({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$1H || (_path$1H = /*#__PURE__*/React__namespace.createElement("path", {
        d: "m-96.949 431.67 3.278-.019c13.001-.111 24.604-.889 31.957-2.241.139 0 7.427-1.482 9.853-2.417a17.443 17.443 0 0 0 8.38-7.491 18.521 18.521 0 0 0 2.028-8.427c-.111-2.306-1.269-6.112-2.241-8.834l-.87-2.259c-5.945-14.974-25.373-43.588-37.263-54.552l-.833-.806-3.889-3.611a17.187 17.187 0 0 0-10.538-3.473c-3.51 0-7.019 1.074-9.853 3.213-.917.648-2.093 1.667-3.093 2.593l-3.676 3.51c-12.233 12.075-29.401 38.235-35.096 51.792-.12 0-3.639 8.427-3.769 12.436v.528c0 6.158 3.51 11.909 9.177 14.844 1.556.806 4.593 1.574 7.26 2.158l5.038 1.056c8.092 1.203 20.519 2 34.15 2zm-14.121 58.635c0 7.686 6.297 13.918 14.057 13.918 7.722.041 14.016-6.186 14.057-13.908v-.01l-3.037-34.263c0-6.019-4.926-10.918-11.02-10.918s-11.029 4.889-11.029 10.927l-3.028 34.254z"
      })));

      var aArrowTailUp = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-96.949%2C431.67l3.278-0.019c13.001-0.111%2C24.604-0.889%2C31.957-2.241%20c0.139%2C0%2C7.427-1.482%2C9.853-2.417c3.519-1.482%2C6.491-4.139%2C8.38-7.491c1.333-2.609%2C2.028-5.497%2C2.028-8.427%20c-0.111-2.306-1.269-6.112-2.241-8.834l-0.87-2.259c-5.945-14.974-25.373-43.588-37.263-54.552l-0.833-0.806l-3.889-3.611%20c-3.032-2.291-6.738-3.512-10.538-3.473c-3.51%2C0-7.019%2C1.074-9.853%2C3.213c-0.917%2C0.648-2.093%2C1.667-3.093%2C2.593l-3.676%2C3.51%20c-12.233%2C12.075-29.401%2C38.235-35.096%2C51.792c-0.12%2C0-3.639%2C8.427-3.769%2C12.436v0.528c0%2C6.158%2C3.51%2C11.909%2C9.177%2C14.844%20c1.556%2C0.806%2C4.593%2C1.574%2C7.26%2C2.158l5.038%2C1.056C-123.007%2C430.873-110.58%2C431.67-96.949%2C431.67L-96.949%2C431.67z%20M-111.07%2C490.305%20c0%2C7.686%2C6.297%2C13.918%2C14.057%2C13.918c7.722%2C0.041%2C14.016-6.186%2C14.057-13.908c0-0.003%2C0-0.006%2C0-0.01l-3.037-34.263%20c0-6.019-4.926-10.918-11.02-10.918s-11.029%2C4.889-11.029%2C10.927L-111.07%2C490.305L-111.07%2C490.305z%22%2F%3E%3C%2Fsvg%3E";

      var _path$1G;

      function _extends$1G() {
        _extends$1G = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$1G.apply(this, arguments);
      }

      const SvgAArrowUp = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$1G({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.9 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$1G || (_path$1G = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-105 377.2c4.2-4.3 11.1-4.3 15.4 0l72.5 72.5c4.2 4.3 4 11.2-.3 15.4-4.2 4-10.8 4-15.1 0l-64.8-64.8-64.9 64.8c-4.2 4.3-11 4.5-15.4.3-4.3-4.2-4.5-11-.3-15.4l.3-.3 72.6-72.5z"
      })));

      var aArrowUp = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.9%20200%20200%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-105%2C377.2c4.2-4.3%2C11.1-4.3%2C15.4%2C0c0%2C0%2C0%2C0%2C0%2C0l72.5%2C72.5c4.2%2C4.3%2C4%2C11.2-0.3%2C15.4c-4.2%2C4-10.8%2C4-15.1%2C0l-64.8-64.8%20l-64.9%2C64.8c-4.2%2C4.3-11%2C4.5-15.4%2C0.3c-4.3-4.2-4.5-11-0.3-15.4c0.1-0.1%2C0.2-0.2%2C0.3-0.3L-105%2C377.2L-105%2C377.2z%22%2F%3E%3C%2Fsvg%3E";

      var _path$1F;

      function _extends$1F() {
        _extends$1F = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$1F.apply(this, arguments);
      }

      const SvgABackward = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$1F({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.9 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$1F || (_path$1F = /*#__PURE__*/React__namespace.createElement("path", {
        d: "m-96.8 348.2-1.8 1-1.8 1.1-1.7 1.2-72 55.2c-4.2 3.6-6.5 9-6.2 14.5.1 5.8 2.2 10.3 6.2 13.4l76.7 58.3 1.5.9c5.3 2.9 12.2 4 12.4-9.6l-.1-33.4 55.3 42 1.5.9c5.3 2.9 12.2 4 12.4-9.6l-.2-118.9c0-19.3-6.6-20.4-13.3-17.2l-1.8 1-1.8 1.1-1.7 1.2-50.7 38.9v-25c.3-19.1-6.3-20.2-12.9-17z"
      })));

      var aBackward = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.9%20200%20200%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-96.8%2C348.2l-1.8%2C1l-1.8%2C1.1l-1.7%2C1.2l-72%2C55.2c-4.2%2C3.6-6.5%2C9-6.2%2C14.5c0.1%2C5.8%2C2.2%2C10.3%2C6.2%2C13.4l76.7%2C58.3l1.5%2C0.9%20c5.3%2C2.9%2C12.2%2C4%2C12.4-9.6l-0.1-33.4l55.3%2C42l1.5%2C0.9c5.3%2C2.9%2C12.2%2C4%2C12.4-9.6l-0.2-118.9c0-19.3-6.6-20.4-13.3-17.2l-1.8%2C1l-1.8%2C1.1%20l-1.7%2C1.2l-50.7%2C38.9v-25C-83.6%2C346.1-90.2%2C345-96.8%2C348.2z%22%2F%3E%3C%2Fsvg%3E";

      var _path$1E;

      function _extends$1E() {
        _extends$1E = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$1E.apply(this, arguments);
      }

      const SvgABag = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$1E({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$1E || (_path$1E = /*#__PURE__*/React__namespace.createElement("path", {
        d: "m-22.725 456.848-6.408-51.625c-3.9-18.417-14.95-26-25.475-26h-1.308a4.195 4.195 0 0 0 .367-1.883h.217c-.974-22.272-19.331-39.818-41.625-39.783-22.294-.035-40.651 17.511-41.625 39.783-.11.623-.11 1.26 0 1.883h-.65c-10.683 0-22.1 7.05-25.417 26l-6.475 51.625c-5.3 37.9 14.208 47.375 39.7 47.375h69.083c25.408 0 44.333-13.716 39.616-47.375zm-103.592-79.508c.028-16.007 13.026-28.961 29.033-28.933 16.007-.028 29.006 12.926 29.033 28.933.006.644.128 1.282.358 1.883h-58.425a5.39 5.39 0 0 0 .001-1.883zm5.125 44.792a7.475 7.475 0 0 1-7.367-7.582v-.002c0-4.183 3.3-7.583 7.367-7.583s7.367 3.4 7.367 7.583-3.3 7.584-7.367 7.584zm55.609-7.582a7.476 7.476 0 0 1-7.367 7.582c-4.067 0-7.367-3.4-7.367-7.583v-.002a7.476 7.476 0 0 1 7.367-7.582h.002a7.475 7.475 0 0 1 7.365 7.585z"
      })));

      var aBag = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-22.725%2C456.848l-6.408-51.625c-3.9-18.417-14.95-26-25.475-26h-1.308%20c0.266-0.591%2C0.392-1.236%2C0.367-1.883h0.217c-0.974-22.272-19.331-39.818-41.625-39.783c-22.294-0.035-40.651%2C17.511-41.625%2C39.783%20c-0.11%2C0.623-0.11%2C1.26%2C0%2C1.883h-0.65c-10.683%2C0-22.1%2C7.05-25.417%2C26l-6.475%2C51.625c-5.3%2C37.9%2C14.208%2C47.375%2C39.7%2C47.375h69.083%20C-36.933%2C504.223-18.008%2C490.507-22.725%2C456.848z%20M-126.317%2C377.34L-126.317%2C377.34c0.028-16.007%2C13.026-28.961%2C29.033-28.933h0%20c16.007-0.028%2C29.006%2C12.926%2C29.033%2C28.933c0.006%2C0.644%2C0.128%2C1.282%2C0.358%2C1.883h-58.425%20C-126.207%2C378.6-126.207%2C377.963-126.317%2C377.34z%20M-121.192%2C422.132c-4.128-0.059-7.426-3.454-7.367-7.582c0-0.001%2C0-0.001%2C0-0.002%20c0-4.183%2C3.3-7.583%2C7.367-7.583c4.067%2C0%2C7.367%2C3.4%2C7.367%2C7.583S-117.125%2C422.132-121.192%2C422.132z%20M-65.583%2C414.55%20c0.059%2C4.128-3.239%2C7.522-7.367%2C7.582c-4.067%2C0-7.367-3.4-7.367-7.583l0-0.002c-0.059-4.128%2C3.239-7.522%2C7.367-7.582%20c0%2C0%2C0.001%2C0%2C0.002%2C0c4.128%2C0.06%2C7.425%2C3.455%2C7.365%2C7.583C-65.583%2C414.549-65.583%2C414.549-65.583%2C414.55z%22%2F%3E%3C%2Fsvg%3E";

      var _path$1D;

      function _extends$1D() {
        _extends$1D = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$1D.apply(this, arguments);
      }

      const SvgABookmark = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$1D({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$1D || (_path$1D = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-122.833 337.553h51.417c22.583 0 40.833 8.917 41.083 31.583v126.5a8.696 8.696 0 0 1-1 4.083 8.628 8.628 0 0 1-5.167 4.167c-2.167.667-4.583.333-6.583-.833l-54-27-54.083 27c-1.242.658-2.667 1.083-4.083 1.083-4.667 0-8.417-3.833-8.417-8.5v-126.5c-.001-22.666 18.333-31.583 40.833-31.583zm-5.667 63.5h62.75c3.583 0 6.5-2.925 6.5-6.583 0-3.667-2.917-6.583-6.5-6.583h-62.75c-3.583 0-6.5 2.917-6.5 6.583 0 3.658 2.917 6.583 6.5 6.583z"
      })));

      var aBookmark = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-122.833%2C337.553h51.417c22.583%2C0%2C40.833%2C8.917%2C41.083%2C31.583v126.5c0%2C1.417-0.333%2C2.833-1%2C4.083%20c-1.083%2C2-2.917%2C3.5-5.167%2C4.167c-2.167%2C0.667-4.583%2C0.333-6.583-0.833l-54-27l-54.083%2C27c-1.242%2C0.658-2.667%2C1.083-4.083%2C1.083%20c-4.667%2C0-8.417-3.833-8.417-8.5v-126.5C-163.667%2C346.47-145.333%2C337.553-122.833%2C337.553z%20M-128.5%2C401.053h62.75%20c3.583%2C0%2C6.5-2.925%2C6.5-6.583c0-3.667-2.917-6.583-6.5-6.583h-62.75c-3.583%2C0-6.5%2C2.917-6.5%2C6.583%20C-135%2C398.128-132.083%2C401.053-128.5%2C401.053z%22%2F%3E%3C%2Fsvg%3E";

      var _path$1C;

      function _extends$1C() {
        _extends$1C = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$1C.apply(this, arguments);
      }

      const SvgABuy = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$1C({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$1C || (_path$1C = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-79.409 414.489h23.067c3.5 0 6.25-2.892 6.25-6.375a6.25 6.25 0 0 0-6.115-6.382l-.135-.001h-23.067a6.25 6.25 0 0 0-6.25 6.384c0 3.482 2.75 6.374 6.25 6.374zm50.467-44.217c5.083 0 8.408 1.792 11.742 5.7 3.333 3.917 3.917 9.525 3.167 14.617l-7.917 55.792c-1.5 10.725-10.5 18.625-21.067 18.625h-90.85c-11.075 0-20.233-8.667-21.15-19.892l-7.65-92.708-12.583-2.208a6.392 6.392 0 0 1 2.166-12.583l19.858 3.058c2.833.517 4.917 2.892 5.167 5.783l1.583 19.05c.25 2.733 2.417 4.767 5.083 4.767h112.451v-.001zm-106.25 108.167c-7 0-12.667 5.792-12.667 12.933 0 7.058 5.667 12.842 12.667 12.842 6.908 0 12.567-5.783 12.567-12.842 0-7.142-5.667-12.925-12.575-12.925l.008-.008zm93.667 0c-6.992 0-12.65 5.792-12.65 12.933 0 7.058 5.667 12.842 12.658 12.842 6.908 0 12.567-5.783 12.567-12.842 0-7.142-5.667-12.925-12.567-12.925l-.008-.008z"
      })));

      var aBuy = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-79.409%2C414.489h23.067c3.5%2C0%2C6.25-2.892%2C6.25-6.375c0.074-3.451-2.664-6.308-6.115-6.382%20c-0.045-0.001-0.09-0.001-0.135-0.001h-23.067c-3.452-0.001-6.251%2C2.797-6.251%2C6.249c0%2C0.045%2C0%2C0.09%2C0.001%2C0.135%20C-85.659%2C411.597-82.909%2C414.489-79.409%2C414.489z%20M-28.942%2C370.272c5.083%2C0%2C8.408%2C1.792%2C11.742%2C5.7%20c3.333%2C3.917%2C3.917%2C9.525%2C3.167%2C14.617l-7.917%2C55.792c-1.5%2C10.725-10.5%2C18.625-21.067%2C18.625h-90.85%20c-11.075%2C0-20.233-8.667-21.15-19.892l-7.65-92.708l-12.583-2.208c-3.446-0.766-5.619-4.18-4.853-7.626%20c0.714-3.213%2C3.752-5.359%2C7.019-4.957l19.858%2C3.058c2.833%2C0.517%2C4.917%2C2.892%2C5.167%2C5.783l1.583%2C19.05%20c0.25%2C2.733%2C2.417%2C4.767%2C5.083%2C4.767H-28.942L-28.942%2C370.272z%20M-135.192%2C478.439c-7%2C0-12.667%2C5.792-12.667%2C12.933%20c0%2C7.058%2C5.667%2C12.842%2C12.667%2C12.842c6.908%2C0%2C12.567-5.783%2C12.567-12.842c0-7.142-5.667-12.925-12.575-12.925L-135.192%2C478.439z%20%20M-41.525%2C478.439c-6.992%2C0-12.65%2C5.792-12.65%2C12.933c0%2C7.058%2C5.667%2C12.842%2C12.658%2C12.842c6.908%2C0%2C12.567-5.783%2C12.567-12.842%20c0-7.142-5.667-12.925-12.567-12.925L-41.525%2C478.439z%22%2F%3E%3C%2Fsvg%3E";

      var _path$1B;

      function _extends$1B() {
        _extends$1B = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$1B.apply(this, arguments);
      }

      const SvgACamera = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$1B({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$1B || (_path$1B = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-49.5 373.856c-.75 0-1.333-.417-1.667-1v.008l-.833-1.833-1.175-2.492c-1.933-4.067-3.933-8.292-5.242-10.917-3.833-7.483-10.417-11.65-18.5-11.733h-39.25c-8.083.083-14.583 4.25-18.417 11.725a812.995 812.995 0 0 0-5.95 12.383l-.883 1.85-.5 1c-.25.667-.917 1-1.583 1-20.048.005-36.306 16.244-36.333 36.292v49.458c.028 20.048 16.285 36.287 36.333 36.292h94c20.035-.037 36.274-16.257 36.333-36.292v-49.45c0-19.974-16.333-36.291-36.333-36.291zm-23.917 81.242a32.583 32.583 0 0 1-23.083 9.583c-18.046.041-32.708-14.554-32.75-32.6v-.117a32.206 32.206 0 0 1 9.5-23.058 32.675 32.675 0 0 1 23.25-9.667c8.75 0 17 3.417 23.167 9.583 6.167 6.242 9.583 14.483 9.583 23.142a32.985 32.985 0 0 1-9.667 23.134zm23.667-42.775a7.47 7.47 0 0 1-7.5-7.496v.004-.008.004c.002-4.165 3.335-7.579 7.5-7.579 4.167 0 7.583 3.408 7.583 7.575 0 4.166-3.416 7.5-7.583 7.5zm-46.75-.592c-5.417 0-10.5 2.075-14.417 5.992-3.833 3.825-5.917 8.908-5.833 14.158v.083a20.067 20.067 0 0 0 5.917 14.308c3.833 3.833 8.917 5.917 14.333 5.917 11.162-.037 20.204-9.071 20.25-20.233 0-5.408-2.083-10.483-5.917-14.308-3.833-3.834-8.916-5.917-14.333-5.917z"
      })));

      var aCamera = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-49.5%2C373.856c-0.75%2C0-1.333-0.417-1.667-1v0.008L-52%2C371.031l-1.175-2.492%20%20c-1.933-4.067-3.933-8.292-5.242-10.917c-3.833-7.483-10.417-11.65-18.5-11.733h-39.25c-8.083%2C0.083-14.583%2C4.25-18.417%2C11.725%20%20c-2.018%2C4.111-4.002%2C8.239-5.95%2C12.383l-0.883%2C1.85l-0.5%2C1c-0.25%2C0.667-0.917%2C1-1.583%2C1c-20.048%2C0.005-36.306%2C16.244-36.333%2C36.292%20%20v49.458c0.028%2C20.048%2C16.285%2C36.287%2C36.333%2C36.292h94c20.035-0.037%2C36.274-16.257%2C36.333-36.292v-49.45%20%20C-13.167%2C390.173-29.5%2C373.856-49.5%2C373.856z%20M-73.417%2C455.098c-6.115%2C6.136-14.421%2C9.584-23.083%2C9.583%20%20c-18.046%2C0.041-32.708-14.554-32.75-32.6c0-0.039%2C0-0.078%2C0-0.117c-0.058-8.65%2C3.365-16.96%2C9.5-23.058%20%20c6.147-6.199%2C14.52-9.68%2C23.25-9.667c8.75%2C0%2C17%2C3.417%2C23.167%2C9.583c6.167%2C6.242%2C9.583%2C14.483%2C9.583%2C23.142%20%20C-63.802%2C440.647-67.275%2C448.96-73.417%2C455.098z%20M-49.75%2C412.323c-4.165%2C0-7.497-3.331-7.5-7.496c0%2C0.001%2C0%2C0.003%2C0%2C0.004v-0.008%20%20c0%2C0.001%2C0%2C0.003%2C0%2C0.004c0.002-4.165%2C3.335-7.579%2C7.5-7.579c4.167%2C0%2C7.583%2C3.408%2C7.583%2C7.575%20%20C-42.167%2C408.989-45.583%2C412.323-49.75%2C412.323z%20%20M-96.5%2C411.731c-5.417%2C0-10.5%2C2.075-14.417%2C5.992c-3.833%2C3.825-5.917%2C8.908-5.833%2C14.158v0.083%20%20c-0.021%2C5.369%2C2.11%2C10.522%2C5.917%2C14.308c3.833%2C3.833%2C8.917%2C5.917%2C14.333%2C5.917c11.162-0.037%2C20.204-9.071%2C20.25-20.233%20%20c0-5.408-2.083-10.483-5.917-14.308C-86%2C413.814-91.083%2C411.731-96.5%2C411.731z%22%2F%3E%3C%2Fsvg%3E";

      var _path$1A;

      function _extends$1A() {
        _extends$1A = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$1A.apply(this, arguments);
      }

      const SvgACategory = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$1A({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$1A || (_path$1A = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-159.167 337.557H-131c11.75 0 21.167 9.583 21.167 21.342v28.408c0 11.833-9.417 21.333-21.167 21.333h-28.167c-11.667 0-21.167-9.5-21.167-21.333v-28.408c.001-11.759 9.501-21.342 21.167-21.342zm0 95.583H-131c11.75 0 21.167 9.5 21.167 21.333v28.417c0 11.75-9.417 21.333-21.167 21.333h-28.167c-11.667 0-21.167-9.583-21.167-21.333v-28.417c.001-11.833 9.501-21.333 21.167-21.333zm124.334-95.583H-63c-11.75 0-21.167 9.583-21.167 21.342v28.408c0 11.833 9.417 21.333 21.167 21.333h28.167c11.667 0 21.167-9.5 21.167-21.333v-28.408c-.001-11.759-9.501-21.342-21.167-21.342zM-63 433.14h28.167c11.667 0 21.167 9.5 21.167 21.333v28.417c0 11.75-9.5 21.333-21.167 21.333H-63c-11.75 0-21.167-9.583-21.167-21.333v-28.417c0-11.833 9.417-21.333 21.167-21.333z"
      })));

      var aCategory = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-159.167%2C337.557H-131c11.75%2C0%2C21.167%2C9.583%2C21.167%2C21.342v28.408%20c0%2C11.833-9.417%2C21.333-21.167%2C21.333h-28.167c-11.667%2C0-21.167-9.5-21.167-21.333v-28.408%20C-180.333%2C347.14-170.833%2C337.557-159.167%2C337.557z%20M-159.167%2C433.14H-131c11.75%2C0%2C21.167%2C9.5%2C21.167%2C21.333v28.417%20c0%2C11.75-9.417%2C21.333-21.167%2C21.333h-28.167c-11.667%2C0-21.167-9.583-21.167-21.333v-28.417%20C-180.333%2C442.64-170.833%2C433.14-159.167%2C433.14z%20M-34.833%2C337.557H-63c-11.75%2C0-21.167%2C9.583-21.167%2C21.342v28.408%20c0%2C11.833%2C9.417%2C21.333%2C21.167%2C21.333h28.167c11.667%2C0%2C21.167-9.5%2C21.167-21.333v-28.408%20C-13.667%2C347.14-23.167%2C337.557-34.833%2C337.557z%20M-63%2C433.14h28.167c11.667%2C0%2C21.167%2C9.5%2C21.167%2C21.333v28.417%20c0%2C11.75-9.5%2C21.333-21.167%2C21.333H-63c-11.75%2C0-21.167-9.583-21.167-21.333v-28.417C-84.167%2C442.64-74.75%2C433.14-63%2C433.14z%22%2F%3E%3C%2Fsvg%3E";

      var _path$1z;

      function _extends$1z() {
        _extends$1z = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$1z.apply(this, arguments);
      }

      const SvgAChart = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$1z({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$1z || (_path$1z = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-58.083 337.947h-77.833c-28.333 0-44.417 16.083-44.417 44.417v77.833c0 28.333 16.083 44.417 44.417 44.417h77.833c28.333 0 44.417-16.083 44.417-44.417v-77.833c-.084-28.334-16.084-44.417-44.417-44.417zM-128.5 406.28v57.583a6.891 6.891 0 0 1-6.917 6.25c-3.583 0-6.583-2.667-6.917-6.25V406.28a6.997 6.997 0 0 1 3.25-6.583 6.856 6.856 0 0 1 7.333 0c2.251 1.416 3.501 4 3.251 6.583zm38.833-27.333v84.917c-.333 3.583-3.333 6.25-6.917 6.25-3.5 0-6.5-2.667-6.917-6.25v-84.917a7 7 0 0 1 10.667-6.583 6.79 6.79 0 0 1 3.167 6.583zm38.334 57.583v27.333c-.417 3.583-3.417 6.25-6.917 6.25-3.583 0-6.583-2.667-6.917-6.25V436.53A6.717 6.717 0 0 1-62 429.947a6.992 6.992 0 0 1 10.667 6.583z"
      })));

      var aChart = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-58.083%2C337.947h-77.833c-28.333%2C0-44.417%2C16.083-44.417%2C44.417v77.833%20c0%2C28.333%2C16.083%2C44.417%2C44.417%2C44.417h77.833c28.333%2C0%2C44.417-16.083%2C44.417-44.417v-77.833%20C-13.75%2C354.03-29.75%2C337.947-58.083%2C337.947z%20M-128.5%2C406.28v57.583c-0.333%2C3.563-3.338%2C6.279-6.917%2C6.25%20c-3.583%2C0-6.583-2.667-6.917-6.25V406.28c-0.247-2.632%2C1.01-5.179%2C3.25-6.583c2.25-1.417%2C5.083-1.417%2C7.333%2C0%20C-129.5%2C401.113-128.25%2C403.697-128.5%2C406.28z%20M-89.667%2C378.947v84.917c-0.333%2C3.583-3.333%2C6.25-6.917%2C6.25%20c-3.5%2C0-6.5-2.667-6.917-6.25v-84.917c-0.139-1.518%2C0.221-3.04%2C1.026-4.334c2.041-3.283%2C6.357-4.29%2C9.641-2.249%20C-90.587%2C373.755-89.352%2C376.323-89.667%2C378.947z%20M-51.333%2C436.53v27.333c-0.417%2C3.583-3.417%2C6.25-6.917%2C6.25%20c-3.583%2C0-6.583-2.667-6.917-6.25V436.53c-0.334-2.627%2C0.906-5.205%2C3.167-6.583c1.301-0.813%2C2.833-1.176%2C4.36-1.032%20C-53.795%2C429.276-50.972%2C432.686-51.333%2C436.53z%22%2F%3E%3C%2Fsvg%3E";

      var _path$1y;

      function _extends$1y() {
        _extends$1y = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$1y.apply(this, arguments);
      }

      const SvgAChat = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$1y({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$1y || (_path$1y = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-96.833 337.947c-48.417 0-83.5 39.558-83.5 83.458 0 14.017 4.083 28.458 11.25 41.642 1.333 2.175 1.5 4.933.583 7.517l-5.583 18.7c-1.25 4.5 2.583 7.833 6.833 6.5l16.833-5c4.583-1.5 8.167.417 12.417 3 12.167 7.183 27.333 10.85 41 10.85 41.333 0 83.333-31.958 83.333-83.458 0-44.401-35.833-83.209-83.166-83.209zm-38.75 94.225c-5.833 0-10.667-4.833-10.667-10.683 0-5.925 4.75-10.683 10.667-10.683a10.643 10.643 0 0 1 10.667 10.683c-.037 5.878-4.789 10.637-10.667 10.683zm38.416 0c-5.917-.083-10.667-4.842-10.667-10.767 0-5.842 4.833-10.683 10.667-10.6A10.643 10.643 0 0 1-86.5 421.488c0 5.85-4.75 10.684-10.667 10.684zm38.417 0c-5.917 0-10.667-4.842-10.667-10.683 0-5.925 4.75-10.683 10.667-10.683s10.667 4.758 10.667 10.683c0 5.849-4.75 10.683-10.667 10.683z"
      })));

      var aChat = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-96.833%2C337.947c-48.417%2C0-83.5%2C39.558-83.5%2C83.458c0%2C14.017%2C4.083%2C28.458%2C11.25%2C41.642%20c1.333%2C2.175%2C1.5%2C4.933%2C0.583%2C7.517l-5.583%2C18.7c-1.25%2C4.5%2C2.583%2C7.833%2C6.833%2C6.5l16.833-5c4.583-1.5%2C8.167%2C0.417%2C12.417%2C3%20c12.167%2C7.183%2C27.333%2C10.85%2C41%2C10.85c41.333%2C0%2C83.333-31.958%2C83.333-83.458C-13.667%2C376.755-49.5%2C337.947-96.833%2C337.947z%20%20M-135.583%2C432.172c-5.833%2C0-10.667-4.833-10.667-10.683c0-5.925%2C4.75-10.683%2C10.667-10.683c5.917%2C0%2C10.667%2C4.758%2C10.667%2C10.683%20C-124.953%2C427.367-129.705%2C432.126-135.583%2C432.172z%20M-97.167%2C432.172c-5.917-0.083-10.667-4.842-10.667-10.767%20c0-5.842%2C4.833-10.683%2C10.667-10.6c5.917%2C0%2C10.667%2C4.758%2C10.667%2C10.683C-86.5%2C427.338-91.25%2C432.172-97.167%2C432.172z%20%20M-58.75%2C432.172c-5.917%2C0-10.667-4.842-10.667-10.683c0-5.925%2C4.75-10.683%2C10.667-10.683s10.667%2C4.758%2C10.667%2C10.683%20C-48.083%2C427.338-52.833%2C432.172-58.75%2C432.172z%22%2F%3E%3C%2Fsvg%3E";

      var _path$1x;

      function _extends$1x() {
        _extends$1x = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$1x.apply(this, arguments);
      }

      const SvgACheckbox = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$1x({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.9 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$1x || (_path$1x = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-60.9 337.7H-133c-28.2 0-47.2 19.8-47.2 49.2v68c0 29.4 19 49.2 47.2 49.2h72.1c28.2 0 47.1-19.8 47.1-49.2v-68c0-29.4-18.9-49.2-47.1-49.2zm-28.9 114.6c0 4-3.2 7.2-7.3 7.2-4 0-7.2-3.2-7.2-7.2v-36.8c0-4 3.2-7.3 7.2-7.3 4.1 0 7.3 3.3 7.3 7.3v36.8zm-7.1-55.9h-.2c-4 0-7.2-3.3-7.2-7.2 0-4 3.2-7.3 7.2-7.3s7.3 3.2 7.3 7.2c.1 4-3.1 7.3-7.1 7.3z"
      })));

      var aCheckbox = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.9%20200%20200%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-60.9%2C337.7H-133c-28.2%2C0-47.2%2C19.8-47.2%2C49.2v68c0%2C29.4%2C19%2C49.2%2C47.2%2C49.2h72.1c28.2%2C0%2C47.1-19.8%2C47.1-49.2v-68%20C-13.8%2C357.5-32.7%2C337.7-60.9%2C337.7z%20M-89.8%2C452.3c0%2C4-3.2%2C7.2-7.3%2C7.2c-4%2C0-7.2-3.2-7.2-7.2v-36.8c0-4%2C3.2-7.3%2C7.2-7.3%20c4.1%2C0%2C7.3%2C3.3%2C7.3%2C7.3V452.3z%20M-96.9%2C396.4c-0.1%2C0-0.1%2C0-0.2%2C0c-4%2C0-7.2-3.3-7.2-7.2c0-4%2C3.2-7.3%2C7.2-7.3c4%2C0%2C7.3%2C3.2%2C7.3%2C7.2%20C-89.7%2C393.1-92.9%2C396.4-96.9%2C396.4z%22%2F%3E%3C%2Fsvg%3E";

      var _path$1w;

      function _extends$1w() {
        _extends$1w = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$1w.apply(this, arguments);
      }

      const SvgACheckboxChecked = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$1w({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.9 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$1w || (_path$1w = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-133.2 337.8H-61c28.2 0 47.1 19.8 47.1 49.3v68c0 29.4-18.9 49.2-47.1 49.2h-72.1c-28.2 0-47.2-19.8-47.2-49.2v-68c0-29.5 18.9-49.3 47.1-49.3zm31.3 108.1 39.5-39.5c2.8-2.8 2.8-7.4 0-10.3-2.9-2.8-7.5-2.8-10.3 0l-34.4 34.4-14.6-14.6c-2.9-2.8-7.5-2.8-10.3 0-2.8 2.8-2.8 7.4 0 10.3l19.8 19.7c1.4 1.4 3.2 2.1 5.1 2.1 2 0 3.8-.7 5.2-2.1z"
      })));

      var aCheckboxChecked = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.9%20200%20200%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-133.2%2C337.8H-61c28.2%2C0%2C47.1%2C19.8%2C47.1%2C49.3v68c0%2C29.4-18.9%2C49.2-47.1%2C49.2h-72.1c-28.2%2C0-47.2-19.8-47.2-49.2v-68%20C-180.3%2C357.6-161.4%2C337.8-133.2%2C337.8z%20M-101.9%2C445.9l39.5-39.5c2.8-2.8%2C2.8-7.4%2C0-10.3c-2.9-2.8-7.5-2.8-10.3%2C0l-34.4%2C34.4%20l-14.6-14.6c-2.9-2.8-7.5-2.8-10.3%2C0c-2.8%2C2.8-2.8%2C7.4%2C0%2C10.3l19.8%2C19.7c1.4%2C1.4%2C3.2%2C2.1%2C5.1%2C2.1%20C-105.1%2C448-103.3%2C447.3-101.9%2C445.9L-101.9%2C445.9z%22%2F%3E%3C%2Fsvg%3E";

      var _path$1v;

      function _extends$1v() {
        _extends$1v = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$1v.apply(this, arguments);
      }

      const SvgAClose = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$1v({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.9 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$1v || (_path$1v = /*#__PURE__*/React__namespace.createElement("path", {
        d: "m-19.1 477.8-57-58.8 57-57c5.5-5.5 5.5-14.7 0-20.2s-14.7-5.5-20.2 0l-55.1 58.8-58.8-57c-5.5-5.5-14.7-5.5-22.1 0-5.5 5.5-5.5 14.7 0 22.1l57 57-57 57c-5.5 5.5-5.5 14.7 0 20.2s14.7 5.5 20.2 0l57-57 57 57c5.5 5.5 14.7 5.5 22.1 0 7.3-7.4 7.3-16.6-.1-22.1z"
      })));

      var aClose = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.9%20200%20200%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-19.1%2C477.8l-57-58.8l57-57c5.5-5.5%2C5.5-14.7%2C0-20.2c-5.5-5.5-14.7-5.5-20.2%2C0l-55.1%2C58.8l-58.8-57%20c-5.5-5.5-14.7-5.5-22.1%2C0c-5.5%2C5.5-5.5%2C14.7%2C0%2C22.1l57%2C57l-57%2C57c-5.5%2C5.5-5.5%2C14.7%2C0%2C20.2c5.5%2C5.5%2C14.7%2C5.5%2C20.2%2C0l57-57l57%2C57%20c5.5%2C5.5%2C14.7%2C5.5%2C22.1%2C0C-11.7%2C492.5-11.7%2C483.3-19.1%2C477.8z%22%2F%3E%3C%2Fsvg%3E";

      var _path$1u;

      function _extends$1u() {
        _extends$1u = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$1u.apply(this, arguments);
      }

      const SvgACalendar = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$1u({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$1u || (_path$1u = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-22.092 391.612c-.025-23.983-15.183-39.625-38.142-41.417l-.017-6.25c.001-.064.002-.129.001-.193a6.275 6.275 0 0 0-6.334-6.215 6.224 6.224 0 0 0-6.325 6.417v5.833l-48.875.075v-5.833a6.224 6.224 0 0 0-6.35-6.408 6.218 6.218 0 0 0-6.317 6.416v6.25c-22.95 2.108-37.583 17.708-37.55 41.858l.092 69.4c.033 26.225 16.675 42.7 42.842 42.667l64.333-.083c26.334-.042 42.767-16.134 42.734-42.284l-.092-70.233zm-108.583 78.025a6.85 6.85 0 0 1-7.082-6.61l-.001-.048a7.109 7.109 0 0 1 6.742-7.167 6.791 6.791 0 0 1 6.833 6.65c.175 3.833-2.775 7.008-6.492 7.175zm-7.117-36.642a7.1 7.1 0 0 1 6.733-7.175 6.791 6.791 0 0 1 6.833 6.667c.183 3.833-2.775 7-6.483 7.167-3.783.174-6.916-2.826-7.083-6.659zm41.017 36.6a6.857 6.857 0 0 1-7.082-6.627l-.001-.032c0-3.833 2.95-7 6.742-7.167a6.791 6.791 0 0 1 6.833 6.642c.166 3.842-2.792 7.009-6.492 7.184zm-7.117-36.892c-.008-3.825 2.958-7.008 6.742-7.175a6.8 6.8 0 0 1 6.842 6.667 6.858 6.858 0 0 1-6.5 7.167c-3.784.166-6.917-2.825-7.084-6.659zm40.701 37.267h-.009a7.067 7.067 0 0 1-6.842-7.067 6.942 6.942 0 0 1 6.742-7.1h.083c3.858 0 7 3.158 7 7.075a7.032 7.032 0 0 1-6.974 7.092zM-70 432.578a6.9 6.9 0 0 1 6.75-7 6.916 6.916 0 0 1 6.833 6.642 6.859 6.859 0 0 1-6.575 7.1c-3.792.083-6.917-2.825-7-6.658v-.092l-.008.008zm35.258-38.025-124.575.167v-.008l-.008-2.583c-.017-18.067 8.858-27.5 24.9-29.108l.017 6.417a6.267 6.267 0 0 0 6.334 6.408c3.625 0 6.325-2.833 6.325-6.417v-6.75l48.875-.067v6.75a6.266 6.266 0 0 0 6.35 6.4c3.533 0 6.317-2.833 6.317-6.417v-6.417c16.125 1.4 25.108 10.792 25.467 28.708v2.917z"
      })));

      var aCalendar = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-22.092%2C391.612c-0.025-23.983-15.183-39.625-38.142-41.417l-0.017-6.25%20c0.001-0.064%2C0.002-0.129%2C0.001-0.193c-0.033-3.465-2.869-6.248-6.334-6.215c-0.099-0.002-0.197-0.001-0.296%2C0.002%20c-3.436%2C0.106-6.136%2C2.978-6.029%2C6.415v5.833l-48.875%2C0.075v-5.833c0.003-0.104%2C0.004-0.208%2C0.001-0.312%20c-0.07-3.437-2.914-6.167-6.351-6.096c-0.101-0.002-0.203-0.001-0.304%2C0.002c-3.432%2C0.111-6.123%2C2.983-6.013%2C6.414v6.25%20c-22.95%2C2.108-37.583%2C17.708-37.55%2C41.858l0.092%2C69.4c0.033%2C26.225%2C16.675%2C42.7%2C42.842%2C42.667l64.333-0.083%20C-38.4%2C504.087-21.967%2C487.995-22%2C461.845L-22.092%2C391.612z%20M-130.675%2C469.637L-130.675%2C469.637c-3.781%2C0.13-6.952-2.829-7.082-6.61%20c-0.001-0.016-0.001-0.032-0.001-0.048c-0.036-3.81%2C2.937-6.97%2C6.742-7.167c3.712-0.024%2C6.756%2C2.938%2C6.833%2C6.65%20C-124.008%2C466.295-126.958%2C469.47-130.675%2C469.637z%20M-137.792%2C432.995L-137.792%2C432.995L-137.792%2C432.995%20c-0.045-3.811%2C2.927-6.978%2C6.733-7.175c3.719-0.023%2C6.765%2C2.948%2C6.833%2C6.667c0.183%2C3.833-2.775%2C7-6.483%2C7.167%20C-134.492%2C439.828-137.625%2C436.828-137.792%2C432.995L-137.792%2C432.995z%20M-96.775%2C469.595L-96.775%2C469.595%20c-3.786%2C0.126-6.957-2.841-7.082-6.627c0-0.01-0.001-0.021-0.001-0.032c0-3.833%2C2.95-7%2C6.742-7.167%20c3.709-0.024%2C6.751%2C2.933%2C6.833%2C6.642C-90.117%2C466.253-93.075%2C469.42-96.775%2C469.595z%20M-103.892%2C432.703%20c-0.008-3.825%2C2.958-7.008%2C6.742-7.175c3.72-0.023%2C6.769%2C2.947%2C6.842%2C6.667c0.175%2C3.771-2.73%2C6.974-6.5%2C7.167%20C-100.592%2C439.528-103.725%2C436.537-103.892%2C432.703z%20M-63.191%2C469.97c-0.003%2C0-0.006%2C0-0.009%2C0c-3.815-0.122-6.844-3.25-6.842-7.067%20c-0.089-3.818%2C2.924-6.991%2C6.742-7.1h0.083c3.858%2C0%2C7%2C3.158%2C7%2C7.075C-56.184%2C466.763-59.307%2C469.938-63.191%2C469.97z%20M-70%2C432.578%20c-0.056-3.792%2C2.959-6.918%2C6.75-7c3.683%2C0.041%2C6.687%2C2.962%2C6.833%2C6.642c0.136%2C3.773-2.803%2C6.946-6.575%2C7.1%20c-3.792%2C0.083-6.917-2.825-7-6.658v-0.092L-70%2C432.578z%20M-34.742%2C394.553l-124.575%2C0.167v-0.008l-0.008-2.583%20c-0.017-18.067%2C8.858-27.5%2C24.9-29.108l0.017%2C6.417c-0.002%2C0.07-0.002%2C0.14-0.001%2C0.21c0.038%2C3.461%2C2.874%2C6.236%2C6.335%2C6.198%20c3.625%2C0%2C6.325-2.833%2C6.325-6.417v-6.75l48.875-0.067v6.75c-0.002%2C0.073-0.002%2C0.146-0.001%2C0.219%20c0.047%2C3.461%2C2.89%2C6.228%2C6.351%2C6.181c3.533%2C0%2C6.317-2.833%2C6.317-6.417v-6.417c16.125%2C1.4%2C25.108%2C10.792%2C25.467%2C28.708V394.553z%22%2F%3E%3C%2Fsvg%3E";

      var _path$1t;

      function _extends$1t() {
        _extends$1t = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$1t.apply(this, arguments);
      }

      const SvgAComputer = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$1t({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.9 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$1t || (_path$1t = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-37.3 466.4h-119.2c-13.3-.3-23.9-11.2-23.9-24.5V371c0-13.2 10.7-23.8 23.8-23.8h119.2c13.2 0 23.8 10.7 23.8 23.8v70.9c.2 13.3-10.4 24.2-23.7 24.5zm-95.3 11.9h71.5c3.3 0 6 2.7 6 6s-2.7 6-6 6h-71.5c-3.3 0-6-2.7-6-6s2.7-6 6-6z"
      })));

      var aComputer = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.9%20200%20200%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-37.3%2C466.4h-119.2c-13.3-0.3-23.9-11.2-23.9-24.5V371c0-13.2%2C10.7-23.8%2C23.8-23.8h119.2c13.2%2C0%2C23.8%2C10.7%2C23.8%2C23.8v70.9%20C-13.4%2C455.2-24%2C466.1-37.3%2C466.4L-37.3%2C466.4z%20M-132.6%2C478.3h71.5c3.3%2C0%2C6%2C2.7%2C6%2C6c0%2C3.3-2.7%2C6-6%2C6h-71.5c-3.3%2C0-6-2.7-6-6%20C-138.6%2C481-135.9%2C478.3-132.6%2C478.3L-132.6%2C478.3z%22%2F%3E%3C%2Fsvg%3E";

      var _path$1s;

      function _extends$1s() {
        _extends$1s = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$1s.apply(this, arguments);
      }

      const SvgACall = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$1s({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$1s || (_path$1s = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-45.617 440.72c-5.6-1.208-10.033 1.392-13.95 3.667-4.017 2.333-11.65 8.525-16.025 6.942-22.417-9.225-43.483-28.833-52.608-51.333-1.608-4.467 4.558-12.158 6.883-16.217 2.25-3.933 4.792-8.4 3.633-14.042-1.05-5.067-14.617-22.333-19.417-27.058-3.167-3.117-6.4-4.833-9.733-5.108-12.508-.533-26.483 16.158-28.925 20.15-6.133 8.517-6.1 19.85.108 33.583 14.958 36.908 71.542 92.6 108.583 108.125 6.833 3.192 13.083 4.792 18.7 4.792a24.332 24.332 0 0 0 14.592-4.567c3.175-1.833 20.55-16.5 20.1-29.342-.275-3.275-1.992-6.55-5.067-9.725-4.683-4.833-21.833-18.808-26.867-19.867h-.007z"
      })));

      var aCall = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-45.617%2C440.72c-5.6-1.208-10.033%2C1.392-13.95%2C3.667c-4.017%2C2.333-11.65%2C8.525-16.025%2C6.942%20c-22.417-9.225-43.483-28.833-52.608-51.333c-1.608-4.467%2C4.558-12.158%2C6.883-16.217c2.25-3.933%2C4.792-8.4%2C3.633-14.042%20c-1.05-5.067-14.617-22.333-19.417-27.058c-3.167-3.117-6.4-4.833-9.733-5.108c-12.508-0.533-26.483%2C16.158-28.925%2C20.15%20c-6.133%2C8.517-6.1%2C19.85%2C0.108%2C33.583c14.958%2C36.908%2C71.542%2C92.6%2C108.583%2C108.125c6.833%2C3.192%2C13.083%2C4.792%2C18.7%2C4.792%20c5.228%2C0.085%2C10.345-1.516%2C14.592-4.567c3.175-1.833%2C20.55-16.5%2C20.1-29.342c-0.275-3.275-1.992-6.55-5.067-9.725%20c-4.683-4.833-21.833-18.808-26.867-19.867L-45.617%2C440.72z%22%2F%3E%3C%2Fsvg%3E";

      var _path$1r;

      function _extends$1r() {
        _extends$1r = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$1r.apply(this, arguments);
      }

      const SvgACalling = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$1r({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$1r || (_path$1r = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-77.364 337.619a6.808 6.808 0 0 0-5.217 1.467 7.109 7.109 0 0 0-2.683 4.867 7.167 7.167 0 0 0 6.308 7.917c26.926 2.931 48.172 24.226 51.042 51.158a7.145 7.145 0 0 0 14.2-1.6c-3.784-33.817-29.95-60.051-63.65-63.809zm.516 29.017a7.117 7.117 0 0 0-8.356 5.61l-.011.056a7.184 7.184 0 0 0 5.642 8.417 28.85 28.85 0 0 1 22.867 22.917 7.167 7.167 0 0 0 8.383 5.675 7.209 7.209 0 0 0 5.642-8.417 43.116 43.116 0 0 0-34.167-34.258zm13.184 80c3.758-2.167 8.017-4.617 13.375-3.475 4.85 1.025 21.4 14.458 25.933 19.108 2.967 3.05 4.625 6.2 4.875 9.35.45 12.35-16.333 26.45-19.383 28.2a23.544 23.544 0 0 1-14.083 4.4c-5.417 0-11.458-1.542-18.05-4.617-35.75-14.917-90.367-68.458-104.808-103.933-6-13.208-6.033-24.1-.1-32.283 2.367-3.842 15.85-19.892 27.917-19.383 3.217.275 6.333 1.925 9.4 4.917 4.633 4.542 17.733 21.142 18.742 26.017 1.117 5.417-1.333 9.717-3.517 13.5a63.84 63.84 0 0 1-1.783 2.833c-2.608 4-6.083 9.342-4.85 12.75 8.808 21.617 29.15 40.483 50.775 49.342 3.342 1.217 8.683-2.283 12.675-4.9a66.282 66.282 0 0 1 2.792-1.767l.09-.059z"
      })));

      var aCalling = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-77.364%2C337.619c-1.867-0.254-3.756%2C0.277-5.217%2C1.467c-1.518%2C1.191-2.486%2C2.948-2.683%2C4.867%20c-0.439%2C3.927%2C2.383%2C7.468%2C6.308%2C7.917c26.926%2C2.931%2C48.172%2C24.226%2C51.042%2C51.158c0.442%2C3.921%2C3.979%2C6.742%2C7.9%2C6.3%20s6.742-3.979%2C6.3-7.9l0%2C0C-17.498%2C367.611-43.664%2C341.377-77.364%2C337.619z%20M-76.848%2C366.636c-3.857-0.758-7.598%2C1.754-8.356%2C5.61%20c-0.004%2C0.019-0.007%2C0.038-0.011%2C0.056c-0.755%2C3.88%2C1.766%2C7.641%2C5.642%2C8.417c11.594%2C2.24%2C20.653%2C11.318%2C22.867%2C22.917%20c0.752%2C3.879%2C4.502%2C6.418%2C8.383%2C5.675c3.868-0.788%2C6.383-4.54%2C5.642-8.417C-45.986%2C383.558-59.521%2C369.987-76.848%2C366.636%20L-76.848%2C366.636z%20M-63.664%2C446.636c3.758-2.167%2C8.017-4.617%2C13.375-3.475c4.85%2C1.025%2C21.4%2C14.458%2C25.933%2C19.108%20c2.967%2C3.05%2C4.625%2C6.2%2C4.875%2C9.35c0.45%2C12.35-16.333%2C26.45-19.383%2C28.2c-4.102%2C2.938-9.039%2C4.48-14.083%2C4.4%20c-5.417%2C0-11.458-1.542-18.05-4.617c-35.75-14.917-90.367-68.458-104.808-103.933c-6-13.208-6.033-24.1-0.1-32.283%20c2.367-3.842%2C15.85-19.892%2C27.917-19.383c3.217%2C0.275%2C6.333%2C1.925%2C9.4%2C4.917c4.633%2C4.542%2C17.733%2C21.142%2C18.742%2C26.017%20c1.117%2C5.417-1.333%2C9.717-3.517%2C13.5c-0.57%2C0.96-1.164%2C1.905-1.783%2C2.833c-2.608%2C4-6.083%2C9.342-4.85%2C12.75%20c8.808%2C21.617%2C29.15%2C40.483%2C50.775%2C49.342c3.342%2C1.217%2C8.683-2.283%2C12.675-4.9c0.916-0.612%2C1.846-1.201%2C2.792-1.767L-63.664%2C446.636%20z%22%2F%3E%3C%2Fsvg%3E";

      var _path$1q;

      function _extends$1q() {
        _extends$1q = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$1q.apply(this, arguments);
      }

      const SvgACallMissed = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$1q({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$1q || (_path$1q = /*#__PURE__*/React__namespace.createElement("path", {
        d: "m-15.832 350.105-20.025 20.108 20.033 20.1a7.37 7.37 0 0 1 2.158 5.225 7.367 7.367 0 0 1-12.566 5.233l-20.033-20.125-20.033 20.117a7.525 7.525 0 0 1-10.408 0 7.384 7.384 0 0 1-.017-10.442l.017-.017 20.033-20.1-20.033-20.108a7.384 7.384 0 0 1-.008-10.442l.008-.008a7.525 7.525 0 0 1 10.408 0l20.033 20.108 20.033-20.108a7.525 7.525 0 0 1 10.408 0 7.355 7.355 0 0 1 2.158 5.225 7.365 7.365 0 0 1-2.167 5.225v.009zm-46.25 95.75c3.817-2.208 8.117-4.692 13.55-3.533 4.917 1.033 21.708 14.658 26.292 19.375 3.017 3.092 4.683 6.283 4.958 9.475.442 12.525-16.558 26.817-19.667 28.6a23.849 23.849 0 0 1-14.275 4.458c-5.492 0-11.608-1.567-18.292-4.675-36.242-15.133-91.6-69.417-106.242-105.4-6.067-13.383-6.108-24.425-.1-32.725 2.4-3.892 16.083-20.167 28.308-19.65 3.25.283 6.425 1.95 9.525 4.992 4.692 4.6 17.967 21.433 19 26.367 1.125 5.492-1.358 9.858-3.567 13.692-.467.817-1.1 1.792-1.792 2.85-2.65 4.067-6.183 9.5-4.933 12.958 8.917 21.917 29.542 41.042 51.458 50.025 3.4 1.233 8.8-2.308 12.85-4.967 1.058-.692 2.017-1.325 2.833-1.792l.083-.058.011.008z"
      })));

      var aCallMissed = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-15.832%2C350.105l-20.025%2C20.108l20.033%2C20.1c1.392%2C1.4%2C2.158%2C3.258%2C2.158%2C5.225%20c0.008%2C4.068-3.283%2C7.374-7.351%2C7.382c-1.955%2C0.004-3.831-0.769-5.215-2.149l-20.033-20.125l-20.033%2C20.117%20c-2.91%2C2.786-7.498%2C2.786-10.408%2C0c-2.888-2.879-2.895-7.554-0.017-10.442c0.006-0.006%2C0.011-0.011%2C0.017-0.017l20.033-20.1%20l-20.033-20.108c-2.886-2.881-2.889-7.556-0.008-10.442c0.003-0.003%2C0.006-0.006%2C0.008-0.008c2.91-2.786%2C7.498-2.786%2C10.408%2C0%20l20.033%2C20.108l20.033-20.108c2.91-2.786%2C7.498-2.786%2C10.408%2C0c1.392%2C1.4%2C2.158%2C3.25%2C2.158%2C5.225%20c0.002%2C1.961-0.778%2C3.841-2.167%2C5.225V350.105z%20M-62.082%2C445.855c3.817-2.208%2C8.117-4.692%2C13.55-3.533%20c4.917%2C1.033%2C21.708%2C14.658%2C26.292%2C19.375c3.017%2C3.092%2C4.683%2C6.283%2C4.958%2C9.475c0.442%2C12.525-16.558%2C26.817-19.667%2C28.6%20c-4.157%2C2.978-9.162%2C4.541-14.275%2C4.458c-5.492%2C0-11.608-1.567-18.292-4.675c-36.242-15.133-91.6-69.417-106.242-105.4%20c-6.067-13.383-6.108-24.425-0.1-32.725c2.4-3.892%2C16.083-20.167%2C28.308-19.65c3.25%2C0.283%2C6.425%2C1.95%2C9.525%2C4.992%20c4.692%2C4.6%2C17.967%2C21.433%2C19%2C26.367c1.125%2C5.492-1.358%2C9.858-3.567%2C13.692c-0.467%2C0.817-1.1%2C1.792-1.792%2C2.85%20c-2.65%2C4.067-6.183%2C9.5-4.933%2C12.958c8.917%2C21.917%2C29.542%2C41.042%2C51.458%2C50.025c3.4%2C1.233%2C8.8-2.308%2C12.85-4.967%20c1.058-0.692%2C2.017-1.325%2C2.833-1.792l0.083-0.058L-62.082%2C445.855z%22%2F%3E%3C%2Fsvg%3E";

      var _path$1p;

      function _extends$1p() {
        _extends$1p = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$1p.apply(this, arguments);
      }

      const SvgACallSilent = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$1p({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$1p || (_path$1p = /*#__PURE__*/React__namespace.createElement("path", {
        d: "m-114.401 414.068-22.383 22.958c-14.542-16.517-26.517-33.633-32.217-47.942-5.942-13.383-6.025-24.475-.083-32.775 2.317-3.9 15.783-20.25 27.75-19.742 3.225.25 6.367 1.95 9.333 5 4.633 4.667 17.683 21.517 18.667 26.425 1.142 5.467-1.208 9.725-3.325 13.55l-.133.25a67.732 67.732 0 0 1-1.7 2.725c-2.608 4.067-6.167 9.6-4.917 13.125 2.316 5.668 5.375 11.176 9.008 16.426zm101.017 52.267c.417 12.617-16.275 26.933-19.333 28.708a23.227 23.227 0 0 1-14.033 4.492c-5.375 0-11.4-1.525-17.925-4.667-15.45-6.6-34.525-20.667-52.283-37.342l-50.633 51.917a7.133 7.133 0 0 1-4.958 2.117 7.478 7.478 0 0 1-5.033-2.117 7.483 7.483 0 0 1-1.075-8.808l.25-.333a4.31 4.31 0 0 1 .583-.767l149.667-153.567a6.8 6.8 0 0 1 4.95-2.208c1.9 0 3.717.858 5.042 2.208a7.442 7.442 0 0 1 0 10.25v.083l-78.475 80.383-11.433 11.733 13.333-13.667c6.858 5.408 14.292 9.9 21.892 13.042 3.308 1.25 8.517-2.25 12.475-4.917 1.075-.717 2.058-1.383 2.883-1.875l.25-.142c3.733-2.167 7.883-4.575 13.133-3.417 4.875 1.025 21.308 14.658 25.85 19.4 2.973 3.136 4.539 6.352 4.873 9.494z"
      })));

      var aCallSilent = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-114.401%2C414.068l-22.383%2C22.958c-14.542-16.517-26.517-33.633-32.217-47.942%20c-5.942-13.383-6.025-24.475-0.083-32.775c2.317-3.9%2C15.783-20.25%2C27.75-19.742c3.225%2C0.25%2C6.367%2C1.95%2C9.333%2C5%20c4.633%2C4.667%2C17.683%2C21.517%2C18.667%2C26.425c1.142%2C5.467-1.208%2C9.725-3.325%2C13.55l-0.133%2C0.25c-0.545%2C0.922-1.112%2C1.83-1.7%2C2.725%20c-2.608%2C4.067-6.167%2C9.6-4.917%2C13.125C-121.093%2C403.31-118.034%2C408.818-114.401%2C414.068z%20M-13.384%2C466.335%20c0.417%2C12.617-16.275%2C26.933-19.333%2C28.708c-4.066%2C2.981-8.992%2C4.557-14.033%2C4.492c-5.375%2C0-11.4-1.525-17.925-4.667%20c-15.45-6.6-34.525-20.667-52.283-37.342l-50.633%2C51.917c-1.312%2C1.327-3.092%2C2.087-4.958%2C2.117%20c-1.884-0.046-3.682-0.802-5.033-2.117c-2.248-2.384-2.684-5.954-1.075-8.808l0.25-0.333c0.165-0.277%2C0.361-0.534%2C0.583-0.767%20l149.667-153.567c1.273-1.39%2C3.065-2.19%2C4.95-2.208c1.9%2C0%2C3.717%2C0.858%2C5.042%2C2.208c2.728%2C2.872%2C2.728%2C7.378%2C0%2C10.25v0.083%20l-78.475%2C80.383l-11.433%2C11.733l13.333-13.667c6.858%2C5.408%2C14.292%2C9.9%2C21.892%2C13.042c3.308%2C1.25%2C8.517-2.25%2C12.475-4.917%20c1.075-0.717%2C2.058-1.383%2C2.883-1.875l0.25-0.142c3.733-2.167%2C7.883-4.575%2C13.133-3.417c4.875%2C1.025%2C21.308%2C14.658%2C25.85%2C19.4%20C-15.284%2C459.977-13.718%2C463.193-13.384%2C466.335L-13.384%2C466.335z%22%2F%3E%3C%2Fsvg%3E";

      var _path$1o;

      function _extends$1o() {
        _extends$1o = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$1o.apply(this, arguments);
      }

      const SvgACloseSquare = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$1o({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$1o || (_path$1o = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-133.583 337.155h72.25c28.25 0 47.167 19.833 47.167 49.333v68.083c0 29.417-18.917 49.25-47.167 49.25h-72.25c-28.25 0-47.25-19.833-47.25-49.25v-68.083c0-29.5 19-49.333 47.25-49.333zm61.166 108.333a7.233 7.233 0 0 0 .021-10.229l-.021-.021-14.833-14.833 14.833-14.833a7.333 7.333 0 0 0 0-10.333 7.333 7.333 0 0 0-10.333 0l-14.75 14.833-14.833-14.833a7.333 7.333 0 0 0-10.333 0 7.333 7.333 0 0 0 0 10.333l14.833 14.833-14.833 14.75a7.333 7.333 0 0 0 5.166 12.5c1.917 0 3.75-.75 5.167-2.167l14.833-14.75 14.833 14.75c1.417 1.5 3.25 2.167 5.083 2.167 1.917 0 3.751-.75 5.167-2.167z"
      })));

      var aCloseSquare = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-133.583%2C337.155h72.25c28.25%2C0%2C47.167%2C19.833%2C47.167%2C49.333v68.083%20c0%2C29.417-18.917%2C49.25-47.167%2C49.25h-72.25c-28.25%2C0-47.25-19.833-47.25-49.25v-68.083%20C-180.833%2C356.988-161.833%2C337.155-133.583%2C337.155z%20M-72.417%2C445.488c2.83-2.819%2C2.84-7.399%2C0.021-10.229%20c-0.007-0.007-0.014-0.014-0.021-0.021l-14.833-14.833l14.833-14.833c2.839-2.859%2C2.839-7.474%2C0-10.333%20c-2.859-2.839-7.474-2.839-10.333%2C0l-14.75%2C14.833l-14.833-14.833c-2.859-2.839-7.474-2.839-10.333%2C0%20c-2.839%2C2.859-2.839%2C7.474%2C0%2C10.333l14.833%2C14.833l-14.833%2C14.75c-2.854%2C2.874-2.837%2C7.517%2C0.037%2C10.371%20c1.365%2C1.355%2C3.207%2C2.119%2C5.129%2C2.129c1.917%2C0%2C3.75-0.75%2C5.167-2.167l14.833-14.75l14.833%2C14.75c1.417%2C1.5%2C3.25%2C2.167%2C5.083%2C2.167%20C-75.667%2C447.655-73.833%2C446.905-72.417%2C445.488z%22%2F%3E%3C%2Fsvg%3E";

      var _path$1n;

      function _extends$1n() {
        _extends$1n = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$1n.apply(this, arguments);
      }

      const SvgADanger = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$1n({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$1n || (_path$1n = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-13.702 471.371c-.167-2.65-.75-5.2-2.083-8.342L-76.36 357.904l.017.008c-6.414-11.288-20.704-15.334-32.083-9.083a22.744 22.744 0 0 0-9.158 9l-61 105.942c-4.917 11.883.917 25.592 13 30.467 2.417.9 5 1.492 7.583 1.65h121.967c6.25-.333 12-3.058 16.25-7.675a23.01 23.01 0 0 0 6.082-16.842zm-83.325-8.667a7.366 7.366 0 0 1-7.333-7.267c0-3.975 3.333-7.275 7.333-7.275s7.25 3.225 7.25 7.183c0 4.042-3.25 7.359-7.25 7.359zm7.25-35.517c0 3.958-3.25 7.275-7.25 7.275a7.374 7.374 0 0 1-7.333-7.275V403.82c0-3.967 3.333-7.183 7.333-7.183s7.25 3.217 7.25 7.183v23.367z"
      })));

      var aDanger = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-13.702%2C471.371c-0.167-2.65-0.75-5.2-2.083-8.342l-60.575-105.125l0.017%2C0.008%20c-6.414-11.288-20.704-15.334-32.083-9.083c-3.854%2C2.058-7.033%2C5.183-9.158%2C9l-61%2C105.942c-4.917%2C11.883%2C0.917%2C25.592%2C13%2C30.467%20c2.417%2C0.9%2C5%2C1.492%2C7.583%2C1.65h121.967c6.25-0.333%2C12-3.058%2C16.25-7.675C-15.566%2C483.651-13.372%2C477.576-13.702%2C471.371z%20%20M-97.027%2C462.704c-4.017-0.018-7.279-3.25-7.333-7.267c0-3.975%2C3.333-7.275%2C7.333-7.275s7.25%2C3.225%2C7.25%2C7.183%20C-89.777%2C459.387-93.027%2C462.704-97.027%2C462.704z%20M-89.777%2C427.187c0%2C3.958-3.25%2C7.275-7.25%2C7.275%20c-4.018-0.022-7.279-3.257-7.333-7.275v-23.367c0-3.967%2C3.333-7.183%2C7.333-7.183s7.25%2C3.217%2C7.25%2C7.183V427.187z%22%2F%3E%3C%2Fsvg%3E";

      var _path$1m;

      function _extends$1m() {
        _extends$1m = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$1m.apply(this, arguments);
      }

      const SvgADelete = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$1m({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$1m || (_path$1m = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-27.942 364.581c3.25 0 5.942 2.692 5.942 6.117v3.167a6.084 6.084 0 0 1-5.942 6.117H-166.05a6.083 6.083 0 0 1-5.95-6.117v-3.167c0-3.425 2.7-6.117 5.95-6.117h24.3c4.933 0 9.225-3.508 10.333-8.458l1.275-5.683c1.983-7.742 8.483-12.883 15.933-12.883h34.417c7.367 0 13.95 5.142 15.85 12.475l1.358 6.083a10.667 10.667 0 0 0 10.342 8.467h24.3zm-12.341 115.758c2.533-23.642 6.975-79.808 6.975-80.375a6.213 6.213 0 0 0-1.5-4.65 6.052 6.052 0 0 0-4.367-1.95H-154.75a5.917 5.917 0 0 0-4.367 1.95 6.583 6.583 0 0 0-1.583 4.65l.442 5.392c1.183 14.692 4.475 55.617 6.608 74.983 1.5 14.267 10.867 23.233 24.425 23.558 10.467.242 21.25.325 32.267.325 10.383 0 20.917-.083 31.708-.325 14.033-.242 23.383-9.05 24.975-23.558h-.008z"
      })));

      var aDelete = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-27.942%2C364.581c3.25%2C0%2C5.942%2C2.692%2C5.942%2C6.117v3.167c0.019%2C3.318-2.624%2C6.039-5.942%2C6.117H-166.05%20c-3.321-0.073-5.969-2.795-5.95-6.117v-3.167c0-3.425%2C2.7-6.117%2C5.95-6.117h24.3c4.933%2C0%2C9.225-3.508%2C10.333-8.458l1.275-5.683%20c1.983-7.742%2C8.483-12.883%2C15.933-12.883h34.417c7.367%2C0%2C13.95%2C5.142%2C15.85%2C12.475l1.358%2C6.083c1.033%2C4.9%2C5.334%2C8.422%2C10.342%2C8.467%20H-27.942z%20M-40.283%2C480.339c2.533-23.642%2C6.975-79.808%2C6.975-80.375c0.156-1.69-0.386-3.37-1.5-4.65%20c-1.126-1.222-2.705-1.927-4.367-1.95H-154.75c-1.667%2C0-3.258%2C0.725-4.367%2C1.95c-1.108%2C1.288-1.675%2C2.954-1.583%2C4.65l0.442%2C5.392%20c1.183%2C14.692%2C4.475%2C55.617%2C6.608%2C74.983c1.5%2C14.267%2C10.867%2C23.233%2C24.425%2C23.558c10.467%2C0.242%2C21.25%2C0.325%2C32.267%2C0.325%20c10.383%2C0%2C20.917-0.083%2C31.708-0.325c14.033-0.242%2C23.383-9.05%2C24.975-23.558H-40.283z%22%2F%3E%3C%2Fsvg%3E";

      var _path$1l;

      function _extends$1l() {
        _extends$1l = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$1l.apply(this, arguments);
      }

      const SvgADiscount = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$1l({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$1l || (_path$1l = /*#__PURE__*/React__namespace.createElement("path", {
        d: "m-21.002 403.12-6-6h-.008a12.484 12.484 0 0 1-3.667-8.825v-8.592c-.018-13.851-11.249-25.07-25.1-25.075h-8.583c-3.333 0-6.5-1.342-8.833-3.675l-6.083-6.075c-9.836-9.767-25.721-9.734-35.517.075l-6 6a12.531 12.531 0 0 1-8.842 3.675h-8.583c-13.842 0-25.092 11.242-25.092 25.075v8.5c0 3.417-1.333 6.583-3.667 8.917l-6.083 6.092c-9.73 9.843-9.693 25.694.083 35.492l6 5.917c2.333 2.417 3.667 5.583 3.667 8.925v8.575c.014 13.855 11.245 25.083 25.1 25.092h8.583c3.333 0 6.5 1.325 8.833 3.658l6.092 6.092a25.253 25.253 0 0 0 17.75 7.242c6.425 0 12.842-2.408 17.758-7.333l6.008-6a12.48 12.48 0 0 1 8.833-3.658h8.583c13.842 0 25.092-11.258 25.092-25.092v-8.575c0-3.342 1.333-6.508 3.675-8.842l5.917-5.917.083-.083a24.789 24.789 0 0 0 7.333-17.917c.001-6.668-2.582-13.001-7.332-17.668zm-97.375-10.916c4 0 7.25 3.25 7.25 7.25 0 4.092-3.25 7.333-7.25 7.333a7.333 7.333 0 0 1-7.333-7.333c0-4 3.333-7.25 7.333-7.25zm5.083 55.25c-1.333 1.417-3.167 2.167-5.167 2.167-1.917 0-3.75-.75-5.083-2.167-2.833-2.833-2.833-7.5 0-10.333l42.85-42.833a7.267 7.267 0 0 1 10.25 0 7.351 7.351 0 0 1 0 10.342l-42.85 42.824zm37.684 2.166a7.292 7.292 0 1 1 .083-14.583 7.292 7.292 0 0 1-.083 14.583z"
      })));

      var aDiscount = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-21.002%2C403.12l-6-6h-0.008c-2.333-2.333-3.667-5.5-3.667-8.825v-8.592%20c-0.018-13.851-11.249-25.07-25.1-25.075h-8.583c-3.333%2C0-6.5-1.342-8.833-3.675l-6.083-6.075%20c-9.836-9.767-25.721-9.734-35.517%2C0.075l-6%2C6c-2.342%2C2.333-5.508%2C3.675-8.842%2C3.675h-8.583c-13.842%2C0-25.092%2C11.242-25.092%2C25.075%20v8.5c0%2C3.417-1.333%2C6.583-3.667%2C8.917l-6.083%2C6.092c-9.73%2C9.843-9.693%2C25.694%2C0.083%2C35.492l6%2C5.917%20c2.333%2C2.417%2C3.667%2C5.583%2C3.667%2C8.925v8.575c0.014%2C13.855%2C11.245%2C25.083%2C25.1%2C25.092h8.583c3.333%2C0%2C6.5%2C1.325%2C8.833%2C3.658%20l6.092%2C6.092c4.735%2C4.653%2C11.111%2C7.255%2C17.75%2C7.242c6.425%2C0%2C12.842-2.408%2C17.758-7.333l6.008-6c2.333-2.333%2C5.5-3.658%2C8.833-3.658%20h8.583c13.842%2C0%2C25.092-11.258%2C25.092-25.092v-8.575c0-3.342%2C1.333-6.508%2C3.675-8.842l5.917-5.917l0.083-0.083%20c4.772-4.732%2C7.418-11.197%2C7.333-17.917C-13.669%2C414.12-16.252%2C407.787-21.002%2C403.12z%20M-118.377%2C392.204c4%2C0%2C7.25%2C3.25%2C7.25%2C7.25%20c0%2C4.092-3.25%2C7.333-7.25%2C7.333c-4.05%2C0-7.333-3.283-7.333-7.333C-125.71%2C395.454-122.377%2C392.204-118.377%2C392.204z%20%20M-113.294%2C447.454c-1.333%2C1.417-3.167%2C2.167-5.167%2C2.167c-1.917%2C0-3.75-0.75-5.083-2.167c-2.833-2.833-2.833-7.5%2C0-10.333%20l42.85-42.833c2.835-2.82%2C7.415-2.82%2C10.25%2C0c2.835%2C2.864%2C2.835%2C7.477%2C0%2C10.342L-113.294%2C447.454z%20M-75.61%2C449.62%20c-4.027-0.023-7.273-3.306-7.25-7.333s3.306-7.273%2C7.333-7.25c4.027%2C0.023%2C7.273%2C3.306%2C7.25%2C7.333%20C-68.3%2C446.397-71.583%2C449.643-75.61%2C449.62z%22%2F%3E%3C%2Fsvg%3E";

      var _path$1k;

      function _extends$1k() {
        _extends$1k = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$1k.apply(this, arguments);
      }

      const SvgADiscovery = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$1k({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$1k || (_path$1k = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-180.333 420.889c0-46 37.25-83.333 83.333-83.333 46 0 83.333 37.333 83.333 83.333 0 46.083-37.333 83.333-83.333 83.333-46.083.001-83.333-37.249-83.333-83.333zm101.916 15.25 13.5-42.667a3.75 3.75 0 0 0-4.666-4.75l-42.667 13.333c-1.75.583-3.167 1.917-3.667 3.667l-13.333 42.75c-.917 2.833 1.833 5.583 4.667 4.667l42.5-13.333a5.401 5.401 0 0 0 3.666-3.667z"
      })));

      var aDiscovery = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-180.333%2C420.889c0-46%2C37.25-83.333%2C83.333-83.333c46%2C0%2C83.333%2C37.333%2C83.333%2C83.333%20c0%2C46.083-37.333%2C83.333-83.333%2C83.333C-143.083%2C504.223-180.333%2C466.973-180.333%2C420.889z%20M-78.417%2C436.139l13.5-42.667%20c0.644-1.968-0.43-4.086-2.398-4.73c-0.736-0.241-1.528-0.248-2.268-0.02l-42.667%2C13.333c-1.75%2C0.583-3.167%2C1.917-3.667%2C3.667%20l-13.333%2C42.75c-0.917%2C2.833%2C1.833%2C5.583%2C4.667%2C4.667l42.5-13.333C-80.333%2C439.306-78.917%2C437.889-78.417%2C436.139z%22%2F%3E%3C%2Fsvg%3E";

      var _path$1j;

      function _extends$1j() {
        _extends$1j = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$1j.apply(this, arguments);
      }

      const SvgADocument = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$1j({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$1j || (_path$1j = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-62.075 337.556h-69.842c-25.333 0-40.083 14.833-40.083 40.25v86.083c0 25.833 14.75 40.333 40.083 40.333h69.842c25.742 0 40.075-14.5 40.075-40.333v-86.083c0-25.417-14.333-40.25-40.075-40.25zm-67.592 38.833v-.083h24.908c3.592 0 6.508 2.917 6.508 6.492 0 3.675-2.917 6.592-6.508 6.592h-24.908a6.5 6.5 0 0 1 0-13.001zm65.334 88.75h-65.333c-2.5.333-4.917-.917-6.25-3a6.625 6.625 0 0 1 6.25-10.083h65.333c3.325.333 5.833 3.167 5.833 6.583 0 3.325-2.508 6.167-5.833 6.5zm0-38.083h-65.333a6.508 6.508 0 0 1 0-13.008h65.333a6.508 6.508 0 0 1 0 13.008z"
      })));

      var aDocument = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-62.075%2C337.556h-69.842c-25.333%2C0-40.083%2C14.833-40.083%2C40.25v86.083%20c0%2C25.833%2C14.75%2C40.333%2C40.083%2C40.333h69.842c25.742%2C0%2C40.075-14.5%2C40.075-40.333v-86.083%20C-22%2C352.389-36.333%2C337.556-62.075%2C337.556z%20M-129.667%2C376.389v-0.083h24.908c3.592%2C0%2C6.508%2C2.917%2C6.508%2C6.492%20c0%2C3.675-2.917%2C6.592-6.508%2C6.592h-24.908c-3.59-0.001-6.5-2.911-6.499-6.501C-136.165%2C379.299-133.256%2C376.39-129.667%2C376.389z%20%20M-64.333%2C465.139h-65.333c-2.5%2C0.333-4.917-0.917-6.25-3c-0.759-1.227-1.098-2.668-0.963-4.104c0.341-3.643%2C3.57-6.32%2C7.213-5.979%20h65.333c3.325%2C0.333%2C5.833%2C3.167%2C5.833%2C6.583C-58.5%2C461.964-61.008%2C464.806-64.333%2C465.139z%20M-64.333%2C427.056h-65.333%20c-3.412-0.122-6.149-2.86-6.271-6.271c-0.129-3.592%2C2.679-6.608%2C6.271-6.737h65.333c3.412%2C0.122%2C6.149%2C2.86%2C6.271%2C6.271%20C-57.933%2C423.911-60.741%2C426.927-64.333%2C427.056z%22%2F%3E%3C%2Fsvg%3E";

      var _path$1i;

      function _extends$1i() {
        _extends$1i = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$1i.apply(this, arguments);
      }

      const SvgADownload = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$1i({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$1i || (_path$1i = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-103.417 381.631v-33.392c0-3.558 2.833-6.517 6.417-6.517 3.208 0 5.925 2.483 6.358 5.642l.058.867v33.417h39.833c19.833 0 36.125 16.242 37.042 36.5l.042 1.792v42c0 20.392-15.725 37.133-35.267 38.075l-1.733.042h-92.667c-19.833 0-36.05-16.167-36.958-36.492l-.042-1.808V419.84c0-20.392 15.65-37.217 35.183-38.167l1.733-.033h40v53.35l-13.333-13.767a6.293 6.293 0 0 0-9.084 0 6.748 6.748 0 0 0-1.833 4.733c0 1.308.375 2.667 1.167 3.825l.667.825 24.25 25.125c1.167 1.292 2.833 1.975 4.583 1.975a6.123 6.123 0 0 0 3.875-1.383l.625-.592 24.25-25.125c2.5-2.583 2.5-6.8 0-9.383a6.293 6.293 0 0 0-8.367-.642l-.717.642-13.25 13.767v-53.35h-12.833l.001-.009z"
      })));

      var aDownload = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-103.417%2C381.631v-33.392c0-3.558%2C2.833-6.517%2C6.417-6.517c3.208%2C0%2C5.925%2C2.483%2C6.358%2C5.642%20l0.058%2C0.867v33.417h39.833c19.833%2C0%2C36.125%2C16.242%2C37.042%2C36.5l0.042%2C1.792v42c0%2C20.392-15.725%2C37.133-35.267%2C38.075l-1.733%2C0.042%20h-92.667c-19.833%2C0-36.05-16.167-36.958-36.492l-0.042-1.808v-41.917c0-20.392%2C15.65-37.217%2C35.183-38.167l1.733-0.033h40v53.35%20l-13.333-13.767c-2.405-2.508-6.387-2.592-8.896-0.188c-0.064%2C0.061-0.126%2C0.124-0.188%2C0.188c-1.204%2C1.279-1.861%2C2.977-1.833%2C4.733%20c0%2C1.308%2C0.375%2C2.667%2C1.167%2C3.825l0.667%2C0.825l24.25%2C25.125c1.167%2C1.292%2C2.833%2C1.975%2C4.583%2C1.975c1.413%2C0%2C2.781-0.489%2C3.875-1.383%20l0.625-0.592l24.25-25.125c2.5-2.583%2C2.5-6.8%2C0-9.383c-2.218-2.314-5.822-2.59-8.367-0.642l-0.717%2C0.642l-13.25%2C13.767v-53.35%20h-12.833L-103.417%2C381.631z%22%2F%3E%3C%2Fsvg%3E";

      var _path$1h;

      function _extends$1h() {
        _extends$1h = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$1h.apply(this, arguments);
      }

      const SvgAEditSquare = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$1h({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$1h || (_path$1h = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-58.121 337.568a44.359 44.359 0 0 1 32.717 11.583 44.84 44.84 0 0 1 11.658 32.8v77.75a44.773 44.773 0 0 1-11.575 32.8 44.555 44.555 0 0 1-32.8 11.575h-77.75a44.428 44.428 0 0 1-32.8-11.592 44.434 44.434 0 0 1-11.575-32.8v-77.75a44.433 44.433 0 0 1 11.583-32.792 44.433 44.433 0 0 1 32.792-11.575h77.75zm-47.367 123.625 56.025-56.192c5.083-5.167 5.083-13.483 0-18.567l-10.817-10.817c-5.134-5.15-13.47-5.163-18.62-.03l-.03.03-5.583 5.658c-.833.833-.833 2.25 0 3.083 0 0 13.242 13.15 13.492 13.483.917 1 1.5 2.333 1.5 3.833a5.493 5.493 0 0 1-5.5 5.492 5.233 5.233 0 0 1-3.667-1.5l-13.892-13.817a1.808 1.808 0 0 0-2.5 0l-39.708 39.708a14.987 14.987 0 0 0-4.417 10.317l-.5 19.733c0 1.083.333 2.083 1.083 2.833s1.75 1.167 2.833 1.167h19.558c4 0 7.833-1.583 10.75-4.417h-.007z"
      })));

      var aEditSquare = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-58.121%2C337.568c12.026-0.743%2C23.837%2C3.439%2C32.717%2C11.583c8.144%2C8.917%2C12.348%2C20.743%2C11.658%2C32.8%20v77.75c0.72%2C12.046-3.454%2C23.873-11.575%2C32.8c-8.914%2C8.143-20.75%2C12.32-32.8%2C11.575h-77.75c-12.054%2C0.755-23.897-3.43-32.8-11.592%20c-8.155-8.906-12.334-20.748-11.575-32.8v-77.75c-0.755-12.05%2C3.427-23.889%2C11.583-32.792c8.904-8.153%2C20.743-12.332%2C32.792-11.575%20H-58.121z%20M-105.488%2C461.193l56.025-56.192c5.083-5.167%2C5.083-13.483%2C0-18.567l-10.817-10.817c-5.134-5.15-13.47-5.163-18.62-0.03%20c-0.01%2C0.01-0.02%2C0.02-0.03%2C0.03l-5.583%2C5.658c-0.833%2C0.833-0.833%2C2.25%2C0%2C3.083c0%2C0%2C13.242%2C13.15%2C13.492%2C13.483%20c0.917%2C1%2C1.5%2C2.333%2C1.5%2C3.833c0%2C2.992-2.417%2C5.492-5.5%2C5.492c-1.417%2C0-2.75-0.583-3.667-1.5l-13.892-13.817%20c-0.699-0.669-1.801-0.669-2.5%2C0l-39.708%2C39.708c-2.75%2C2.75-4.333%2C6.408-4.417%2C10.317l-0.5%2C19.733c0%2C1.083%2C0.333%2C2.083%2C1.083%2C2.833%20s1.75%2C1.167%2C2.833%2C1.167h19.558c4%2C0%2C7.833-1.583%2C10.75-4.417H-105.488z%22%2F%3E%3C%2Fsvg%3E";

      var _path$1g;

      function _extends$1g() {
        _extends$1g = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$1g.apply(this, arguments);
      }

      const SvgAEdit = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$1g({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$1g || (_path$1g = /*#__PURE__*/React__namespace.createElement("path", {
        d: "m-121.224 495 81.117-104.897c4.403-5.65 5.973-12.186 4.505-18.851-1.274-6.056-4.994-11.816-10.579-16.174l-13.616-10.819c-11.853-9.425-26.55-8.438-34.978 2.382l-9.102 11.816a3.49 3.49 0 0 0 .582 4.856l23.513 18.851c1.569 1.496 2.742 3.48 3.046 5.862a8.723 8.723 0 0 1-7.551 9.619 7.809 7.809 0 0 1-5.973-1.68l-24.196-19.257a2.889 2.889 0 0 0-3.923.499l-57.503 74.424c-3.72 4.662-4.994 10.718-3.72 16.57l7.348 31.858a3.692 3.692 0 0 0 3.619 2.88l32.329-.397A19.42 19.42 0 0 0-121.224 495zm45.271-9.924h52.712c5.142 0 9.324 4.246 9.324 9.453 0 5.216-4.182 9.444-9.324 9.444h-52.712c-5.142 0-9.324-4.228-9.324-9.444s4.182-9.453 9.324-9.453z"
      })));

      var aEdit = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-121.224%2C495l81.117-104.897c4.403-5.65%2C5.973-12.186%2C4.505-18.851%20c-1.274-6.056-4.994-11.816-10.579-16.174l-13.616-10.819c-11.853-9.425-26.55-8.438-34.978%2C2.382l-9.102%2C11.816%20c-1.162%2C1.506-0.904%2C3.666%2C0.582%2C4.856l23.513%2C18.851c1.569%2C1.496%2C2.742%2C3.48%2C3.046%2C5.862c0.528%2C4.729-2.832%2C9.009-7.551%2C9.619%20c-2.138%2C0.289-4.299-0.319-5.973-1.68l-24.196-19.257c-1.234-0.895-2.952-0.677-3.923%2C0.499l-57.503%2C74.424%20c-3.72%2C4.662-4.994%2C10.718-3.72%2C16.57l7.348%2C31.858c0.381%2C1.69%2C1.886%2C2.888%2C3.619%2C2.88l32.329-0.397%20C-130.394%2C502.456-124.841%2C499.68-121.224%2C495L-121.224%2C495z%20M-75.953%2C485.076h52.712c5.142%2C0%2C9.324%2C4.246%2C9.324%2C9.453%20c0%2C5.216-4.182%2C9.444-9.324%2C9.444h-52.712c-5.142%2C0-9.324-4.228-9.324-9.444S-81.095%2C485.076-75.953%2C485.076z%22%2F%3E%3C%2Fsvg%3E";

      var _path$1f;

      function _extends$1f() {
        _extends$1f = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$1f.apply(this, arguments);
      }

      const SvgAExchange = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$1f({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.9 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$1f || (_path$1f = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-114.2 432c9.2 0 16.7 7.5 16.7 16.7V482c0 9.2-7.5 16.7-16.7 16.7h-50c-9.2 0-16.7-7.5-16.7-16.7v-33.3c0-9.2 7.5-16.7 16.7-16.7h50zm75-4.2 25 25h-16.9l-.1 1.1c-2.5 20.1-19.5 35.8-40.2 36.4h-.7v-12.5h.5c14.1-.5 25.8-11 27.9-25h-20.5l25-25zm-83.3-33.3-25 25-25-25h50zm91.7-54.1c9.2 0 16.7 7.5 16.7 16.7v33.3c0 9.2-7.5 16.7-16.7 16.7h-50c-9.2 0-16.7-7.5-16.7-16.7V357c0-9.2 7.5-16.7 16.7-16.7h50v.1zM-111 357v12.5h-.5c-14.1.5-25.8 11-27.9 25H-152c2.1-20.7 19.2-36.9 40.3-37.5h.7z"
      })));

      var aExchange = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.9%20200%20200%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-114.2%2C432c9.2%2C0%2C16.7%2C7.5%2C16.7%2C16.7l0%2C0V482c0%2C9.2-7.5%2C16.7-16.7%2C16.7l0%2C0h-50c-9.2%2C0-16.7-7.5-16.7-16.7c0%2C0%2C0%2C0%2C0%2C0%20v-33.3c0-9.2%2C7.5-16.7%2C16.7-16.7c0%2C0%2C0%2C0%2C0%2C0H-114.2z%20M-39.2%2C427.8l25%2C25h-16.9l-0.1%2C1.1c-2.5%2C20.1-19.5%2C35.8-40.2%2C36.4l-0.7%2C0%20v-12.5l0.5%2C0c14.1-0.5%2C25.8-11%2C27.9-25h-20.5L-39.2%2C427.8L-39.2%2C427.8z%20M-122.5%2C394.5l-25%2C25l-25-25H-122.5z%20M-30.8%2C340.4%20c9.2%2C0%2C16.7%2C7.5%2C16.7%2C16.7c0%2C0%2C0%2C0%2C0%2C0v33.3c0%2C9.2-7.5%2C16.7-16.7%2C16.7l0%2C0h-50c-9.2%2C0-16.7-7.5-16.7-16.7l0%2C0V357%20c0-9.2%2C7.5-16.7%2C16.7-16.7c0%2C0%2C0%2C0%2C0%2C0H-30.8L-30.8%2C340.4z%20M-111%2C357v12.5l-0.5%2C0c-14.1%2C0.5-25.8%2C11-27.9%2C25h-12.6%20c2.1-20.7%2C19.2-36.9%2C40.3-37.5C-111.6%2C357-111%2C357-111%2C357z%22%2F%3E%3C%2Fsvg%3E";

      var _path$1e;

      function _extends$1e() {
        _extends$1e = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$1e.apply(this, arguments);
      }

      const SvgAFastForward = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$1e({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.9 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$1e || (_path$1e = /*#__PURE__*/React__namespace.createElement("path", {
        d: "m-97.1 348 1.8 1 1.8 1.1 1.7 1.2 71.9 55.1c4.3 3.8 6.3 8.6 6.2 14.5-.1 5.8-2.2 10.3-6.2 13.4l-76.6 58.2-1.5.9c-5.3 2.9-12.2 4-12.4-9.5l.1-33.3-55.2 41.9-1.5.9c-5.3 2.9-12.2 4-12.4-9.5l.2-118.7c0-19.2 6.6-20.4 13.2-17.1l1.8 1 1.8 1.1 1.7 1.2 50.6 38.8v-25c-.2-19.3 6.4-20.4 13-17.2z"
      })));

      var aFastForward = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.9%20200%20200%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-97.1%2C348l1.8%2C1l1.8%2C1.1l1.7%2C1.2l71.9%2C55.1c4.3%2C3.8%2C6.3%2C8.6%2C6.2%2C14.5c-0.1%2C5.8-2.2%2C10.3-6.2%2C13.4l-76.6%2C58.2l-1.5%2C0.9%20c-5.3%2C2.9-12.2%2C4-12.4-9.5l0.1-33.3l-55.2%2C41.9l-1.5%2C0.9c-5.3%2C2.9-12.2%2C4-12.4-9.5l0.2-118.7c0-19.2%2C6.6-20.4%2C13.2-17.1l1.8%2C1%20l1.8%2C1.1l1.7%2C1.2l50.6%2C38.8v-25C-110.3%2C345.9-103.7%2C344.8-97.1%2C348z%22%2F%3E%3C%2Fsvg%3E";

      var _path$1d;

      function _extends$1d() {
        _extends$1d = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$1d.apply(this, arguments);
      }

      const SvgAFilter = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$1d({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$1d || (_path$1d = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-123.017 374.978c0 15.55-12.833 28.167-28.667 28.167-15.817-.008-28.65-12.625-28.65-28.175 0-15.542 12.833-28.15 28.658-28.15 15.834-.001 28.659 12.608 28.659 28.158zm96.792-12.334c6.925 0 12.558 5.525 12.558 12.333S-19.3 387.31-26.225 387.31h-54.792c-6.933 0-12.567-5.525-12.567-12.333s5.633-12.333 12.567-12.333h54.792zm-141.542 92.15h54.792c6.933 0 12.567 5.533 12.567 12.342 0 6.808-5.625 12.35-12.567 12.35h-54.792c-6.933 0-12.567-5.533-12.567-12.342s5.633-12.342 12.567-12.342v-.008zm125.442 40.167c15.833 0 28.658-12.608 28.658-28.158 0-15.558-12.825-28.167-28.658-28.167-15.825 0-28.658 12.617-28.658 28.167s12.833 28.158 28.667 28.158h-.009z"
      })));

      var aFilter = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-123.017%2C374.978c0%2C15.55-12.833%2C28.167-28.667%2C28.167c-15.817-0.008-28.65-12.625-28.65-28.175%20c0-15.542%2C12.833-28.15%2C28.658-28.15C-135.842%2C346.819-123.017%2C359.428-123.017%2C374.978z%20M-26.225%2C362.644%20c6.925%2C0%2C12.558%2C5.525%2C12.558%2C12.333c0%2C6.808-5.633%2C12.333-12.558%2C12.333h-54.792c-6.933%2C0-12.567-5.525-12.567-12.333%20c0-6.808%2C5.633-12.333%2C12.567-12.333H-26.225z%20M-167.767%2C454.794h54.792c6.933%2C0%2C12.567%2C5.533%2C12.567%2C12.342%20c0%2C6.808-5.625%2C12.35-12.567%2C12.35h-54.792c-6.933%2C0-12.567-5.533-12.567-12.342s5.633-12.342%2C12.567-12.342V454.794z%20%20M-42.325%2C494.961c15.833%2C0%2C28.658-12.608%2C28.658-28.158c0-15.558-12.825-28.167-28.658-28.167%20c-15.825%2C0-28.658%2C12.617-28.658%2C28.167s12.833%2C28.158%2C28.667%2C28.158H-42.325z%22%2F%3E%3C%2Fsvg%3E";

      var _path$1c;

      function _extends$1c() {
        _extends$1c = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$1c.apply(this, arguments);
      }

      const SvgAFilter2 = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$1c({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$1c || (_path$1c = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-162.6 337.557h131.2c9.8 0 17.733 8.175 17.733 18.267v12.767c0 4.892-1.917 9.6-5.308 13.025l-54.208 54.833a4.881 4.881 0 0 1-3.525 1.475l-45.383-.142a4.925 4.925 0 0 1-3.642-1.625l-49.808-54.792a18.584 18.584 0 0 1-4.792-12.5V355.84c0-10.092 7.933-18.283 17.733-18.283zm42.933 115.2 40.458.125a4.65 4.65 0 0 1 4.558 4.708v22.758a6.661 6.661 0 0 1-3.775 6.042l-36.717 17.242a6.333 6.333 0 0 1-6.158-.458 6.682 6.682 0 0 1-2.958-5.583v-40.117c0-2.6 2.058-4.717 4.592-4.708v-.009z"
      })));

      var aFilter2 = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-162.6%2C337.557h131.2c9.8%2C0%2C17.733%2C8.175%2C17.733%2C18.267v12.767c0%2C4.892-1.917%2C9.6-5.308%2C13.025%20l-54.208%2C54.833c-0.926%2C0.95-2.198%2C1.483-3.525%2C1.475l-45.383-0.142c-1.389-0.004-2.711-0.594-3.642-1.625l-49.808-54.792%20c-3.095-3.427-4.803-7.883-4.792-12.5V355.84C-180.333%2C345.748-172.4%2C337.557-162.6%2C337.557z%20M-119.667%2C452.757l40.458%2C0.125%20c2.555%2C0.05%2C4.591%2C2.153%2C4.558%2C4.708v22.758c0.015%2C2.574-1.455%2C4.927-3.775%2C6.042l-36.717%2C17.242%20c-1.993%2C0.926-4.324%2C0.753-6.158-0.458c-1.859-1.248-2.97-3.344-2.958-5.583v-40.117c0-2.6%2C2.058-4.717%2C4.592-4.708V452.757z%22%2F%3E%3C%2Fsvg%3E";

      var _path$1b;

      function _extends$1b() {
        _extends$1b = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$1b.apply(this, arguments);
      }

      const SvgAFolder = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$1b({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$1b || (_path$1b = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-84.917 361.542h25.583c30.75 0 45.75 16.417 45.667 50.083v40.583c0 32.167-19.833 52-52.083 52h-62.583c-32.083 0-52-19.833-52-52.083v-62.583c0-34.5 15.333-52 45.583-52h13.167c7.75-.083 15 3.5 19.75 9.583l7.333 9.75c2.333 2.917 5.833 4.667 9.583 4.667zm-50.666 86.75h77.167c3.417 0 6.167-2.833 6.167-6.25a6.166 6.166 0 0 0-6.083-6.249l-.084-.001h-77.167c-3.5 0-6.25 2.75-6.25 6.25 0 3.416 2.75 6.25 6.25 6.25z"
      })));

      var aFolder = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-84.917%2C361.542h25.583c30.75%2C0%2C45.75%2C16.417%2C45.667%2C50.083v40.583c0%2C32.167-19.833%2C52-52.083%2C52%20h-62.583c-32.083%2C0-52-19.833-52-52.083v-62.583c0-34.5%2C15.333-52%2C45.583-52h13.167c7.75-0.083%2C15%2C3.5%2C19.75%2C9.583l7.333%2C9.75%20C-92.167%2C359.792-88.667%2C361.542-84.917%2C361.542z%20M-135.583%2C448.292h77.167c3.417%2C0%2C6.167-2.833%2C6.167-6.25%20c0.046-3.405-2.677-6.203-6.083-6.249c-0.028%2C0-0.056-0.001-0.084-0.001h-77.167c-3.5%2C0-6.25%2C2.75-6.25%2C6.25%20C-141.833%2C445.458-139.083%2C448.292-135.583%2C448.292z%22%2F%3E%3C%2Fsvg%3E";

      var _path$1a;

      function _extends$1a() {
        _extends$1a = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$1a.apply(this, arguments);
      }

      const SvgAGame = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$1a({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$1a || (_path$1a = /*#__PURE__*/React__namespace.createElement("path", {
        d: "m-62.733 371.672-7.9-.092c-5.175-.075-10.333-.142-15.492-.142v-1.525c-.083-12.05-10.142-21.917-22.483-22h-8.1c-2.45 0-4.5-1.925-4.5-4.333 0-3.292-2.7-6.025-6.133-6.025-3.35 0-6.133 2.733-6.133 6.025 0 8.992 7.525 16.375 16.767 16.375h8.1c5.55 0 10.217 4.492 10.217 10.033v1.358c-11.125 0-22.075.167-32.792.333-28.458 0-49.15 20.225-49.15 48.167v35.892c0 27.933 20.692 48.167 49.067 48.167 11.367.233 22.9.317 34.35.317 11.395.012 22.79-.096 34.183-.325 28.375 0 49.067-20.225 49.067-48.167v-35.892c-.002-27.932-20.693-48.166-49.068-48.166zm-43.8 72.1h-8.617v8.5a6.125 6.125 0 0 1-6.142 6.025 6.067 6.067 0 0 1-6.133-5.999V443.773h-8.658a6.067 6.067 0 0 1-6.133-5.999v-.026c0-3.292 2.783-6.017 6.133-6.017h8.667v-8.433c0-3.292 2.7-6.025 6.133-6.025 3.358 0 6.133 2.733 6.133 6.025v8.433h8.583c3.358 0 6.142 2.725 6.142 6.017a6.066 6.066 0 0 1-6.108 6.024zm41.674-19.574a6.067 6.067 0 0 1-6.133 5.999h-.817a6.021 6.021 0 0 1 0-12.042h.817a6.124 6.124 0 0 1 6.133 6.043zm13.984 27.625a6.068 6.068 0 0 1-6.133 6h-.817l-.008-.008a6.021 6.021 0 0 1 0-12.042h.825a6.124 6.124 0 0 1 6.133 6.025v.025z"
      })));

      var aGame = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-62.733%2C371.672l-7.9-0.092h0c-5.175-0.075-10.333-0.142-15.492-0.142v-1.525%20c-0.083-12.05-10.142-21.917-22.483-22h-8.1c-2.45%2C0-4.5-1.925-4.5-4.333c0-3.292-2.7-6.025-6.133-6.025%20c-3.35%2C0-6.133%2C2.733-6.133%2C6.025c0%2C8.992%2C7.525%2C16.375%2C16.767%2C16.375h8.1c5.55%2C0%2C10.217%2C4.492%2C10.217%2C10.033v1.358%20c-11.125%2C0-22.075%2C0.167-32.792%2C0.333c-28.458%2C0-49.15%2C20.225-49.15%2C48.167v35.892c0%2C27.933%2C20.692%2C48.167%2C49.067%2C48.167%20c11.367%2C0.233%2C22.9%2C0.317%2C34.35%2C0.317c11.395%2C0.012%2C22.79-0.096%2C34.183-0.325c28.375%2C0%2C49.067-20.225%2C49.067-48.167v-35.892%20C-13.667%2C391.906-34.358%2C371.672-62.733%2C371.672z%20M-106.533%2C443.772c-0.008%2C0-0.017%2C0-0.026%2C0h-0.008h-8.583v8.5%20c-0.055%2C3.35-2.791%2C6.035-6.142%2C6.025c-3.35%2C0.037-6.096-2.649-6.133-5.999c0-0.006%2C0-0.012%2C0-0.017v-8.508h-8.658%20c-3.35%2C0.037-6.096-2.649-6.133-5.999c0-0.009%2C0-0.017%2C0-0.026c0-3.292%2C2.783-6.017%2C6.133-6.017h8.667v-8.433%20c0-3.292%2C2.7-6.025%2C6.133-6.025c3.358%2C0%2C6.133%2C2.733%2C6.133%2C6.025v8.433h8.583c3.358%2C0%2C6.142%2C2.725%2C6.142%2C6.017%20C-100.448%2C441.098-103.182%2C443.795-106.533%2C443.772z%20M-64.859%2C424.198c-0.037%2C3.35-2.783%2C6.036-6.133%2C5.999h-0.817%20c-3.325%2C0-6.021-2.696-6.021-6.021c0-3.325%2C2.696-6.021%2C6.021-6.021h0.817c3.347-0.005%2C6.079%2C2.678%2C6.133%2C6.025%20C-64.858%2C424.186-64.858%2C424.192-64.859%2C424.198z%20M-50.875%2C451.823c-0.037%2C3.35-2.783%2C6.036-6.133%2C6h-0.817l-0.008-0.008%20c-3.325%2C0-6.021-2.696-6.021-6.021c0-3.325%2C2.696-6.021%2C6.021-6.021h0.825c3.347-0.005%2C6.079%2C2.678%2C6.133%2C6.025%20C-50.875%2C451.806-50.875%2C451.814-50.875%2C451.823z%22%2F%3E%3C%2Fsvg%3E";

      var _path$19;

      function _extends$19() {
        _extends$19 = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$19.apply(this, arguments);
      }

      const SvgAGraph = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$19({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$19 || (_path$19 = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-94.284 339.314a6.865 6.865 0 0 1 4.9-1.75c38.083 1.15 69.917 28.8 75.692 65.75.037.221.037.446 0 .667a6.507 6.507 0 0 1-1.642 4.8 6.758 6.758 0 0 1-4.625 2.242l-64 4.217a7.642 7.642 0 0 1-5.775-1.917 7.336 7.336 0 0 1-2.442-5.483l-4.308-62.867v-1.033a6.61 6.61 0 0 1 2.2-4.626zm-4.383 92.366 55.467-3.558.375.15c2.383.042 4.65 1 6.308 2.683a8.722 8.722 0 0 1 2.525 6.275c-2.192 31.85-25.542 58.458-57.317 65.317-31.783 6.858-64.358-7.692-79.958-35.7a68.46 68.46 0 0 1-8.533-26.133 49.64 49.64 0 0 1-.525-8.225c.108-33.867 24.217-63.092 57.958-70.258 4.083-.767 8.183 1.267 9.967 4.958a9.44 9.44 0 0 1 1.05 2.142c.633 9.767 1.292 19.442 1.942 29.067.517 7.608 1.033 15.183 1.533 22.767-.025 1.783.25 3.558.833 5.25 1.35 3.332 4.716 5.449 8.375 5.265z"
      })));

      var aGraph = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-94.284%2C339.314c1.341-1.204%2C3.1-1.832%2C4.9-1.75c38.083%2C1.15%2C69.917%2C28.8%2C75.692%2C65.75%20c0.037%2C0.221%2C0.037%2C0.446%2C0%2C0.667c0.125%2C1.756-0.468%2C3.488-1.642%2C4.8c-1.186%2C1.327-2.848%2C2.133-4.625%2C2.242l-64%2C4.217%20c-2.107%2C0.188-4.198-0.506-5.775-1.917c-1.559-1.396-2.447-3.391-2.442-5.483l-4.308-62.867v-1.033%20C-96.402%2C342.164-95.609%2C340.497-94.284%2C339.314z%20M-98.667%2C431.68l55.467-3.558l0.375%2C0.15c2.383%2C0.042%2C4.65%2C1%2C6.308%2C2.683%20c1.658%2C1.683%2C2.567%2C3.942%2C2.525%2C6.275c-2.192%2C31.85-25.542%2C58.458-57.317%2C65.317c-31.783%2C6.858-64.358-7.692-79.958-35.7%20c-4.582-8.044-7.485-16.935-8.533-26.133c-0.403-2.722-0.578-5.474-0.525-8.225c0.108-33.867%2C24.217-63.092%2C57.958-70.258%20c4.083-0.767%2C8.183%2C1.267%2C9.967%2C4.958c0.442%2C0.667%2C0.792%2C1.392%2C1.05%2C2.142c0.633%2C9.767%2C1.292%2C19.442%2C1.942%2C29.067%20c0.517%2C7.608%2C1.033%2C15.183%2C1.533%2C22.767c-0.025%2C1.783%2C0.25%2C3.558%2C0.833%2C5.25C-105.692%2C429.747-102.326%2C431.864-98.667%2C431.68%20L-98.667%2C431.68z%22%2F%3E%3C%2Fsvg%3E";

      var _path$18;

      function _extends$18() {
        _extends$18 = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$18.apply(this, arguments);
      }

      const SvgAHeart = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$18({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$18 || (_path$18 = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-64.915 341.723c5.25 0 10.5.75 15.5 2.417 30.75 10 41.833 43.75 32.583 73.25a106.067 106.067 0 0 1-25.083 40.083 320.43 320.43 0 0 1-52.75 41.333l-2.083 1.25-2.167-1.333a317.444 317.444 0 0 1-53.083-41.333 107.771 107.771 0 0 1-25.083-40c-9.417-29.5 1.667-63.25 32.75-73.417a38.374 38.374 0 0 1 7.417-1.75h1c2.333-.333 4.667-.5 7-.5h.917a52.422 52.422 0 0 1 15.25 2.75h.5c.333.167.583.333.75.5 1.833.583 3.583 1.25 5.25 2.167l3.167 1.417c.767.417 1.625 1.042 2.367 1.583.467.333.892.642 1.217.833l.417.25c.708.417 1.458.85 2.083 1.333a52.185 52.185 0 0 1 32.081-10.833zm22.167 60c3.417-.083 6.333-2.833 6.583-6.333v-1a27.5 27.5 0 0 0-17.583-26.333 6.667 6.667 0 0 0-8.417 4.167c-1.167 3.5.667 7.333 4.167 8.583 5.333 2 8.917 7.25 8.917 13.083v.25a7.17 7.17 0 0 0 1.583 5.167c1.166 1.416 2.916 2.249 4.75 2.416z"
      })));

      var aHeart = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-64.915%2C341.723c5.25%2C0%2C10.5%2C0.75%2C15.5%2C2.417c30.75%2C10%2C41.833%2C43.75%2C32.583%2C73.25%20c-5.238%2C15.078-13.813%2C28.78-25.083%2C40.083c-16.09%2C15.583-33.77%2C29.437-52.75%2C41.333l-2.083%2C1.25l-2.167-1.333%20c-19.109-11.859-36.903-25.714-53.083-41.333c-11.215-11.315-19.781-24.977-25.083-40c-9.417-29.5%2C1.667-63.25%2C32.75-73.417%20c2.417-0.833%2C4.917-1.417%2C7.417-1.75h1c2.333-0.333%2C4.667-0.5%2C7-0.5h0.917c5.25%2C0.167%2C10.333%2C1.083%2C15.25%2C2.75h0.5%20c0.333%2C0.167%2C0.583%2C0.333%2C0.75%2C0.5c1.833%2C0.583%2C3.583%2C1.25%2C5.25%2C2.167l3.167%2C1.417c0.767%2C0.417%2C1.625%2C1.042%2C2.367%2C1.583%20c0.467%2C0.333%2C0.892%2C0.642%2C1.217%2C0.833l0.417%2C0.25c0.708%2C0.417%2C1.458%2C0.85%2C2.083%2C1.333C-87.805%2C345.48-76.516%2C341.668-64.915%2C341.723%20L-64.915%2C341.723z%20M-42.748%2C401.723c3.417-0.083%2C6.333-2.833%2C6.583-6.333v-1c0.287-11.61-6.75-22.149-17.583-26.333%20c-3.474-1.158-7.232%2C0.702-8.417%2C4.167c-1.167%2C3.5%2C0.667%2C7.333%2C4.167%2C8.583c5.333%2C2%2C8.917%2C7.25%2C8.917%2C13.083v0.25%20c-0.167%2C1.863%2C0.402%2C3.717%2C1.583%2C5.167C-46.332%2C400.723-44.582%2C401.556-42.748%2C401.723z%22%2F%3E%3C%2Fsvg%3E";

      var _path$17;

      function _extends$17() {
        _extends$17 = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$17.apply(this, arguments);
      }

      const SvgAHide = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$17({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$17 || (_path$17 = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-124.308 448c5.208 3.525 11.55 5.658 18.3 5.658 17.883 0 32.442-14.683 32.442-32.733 0-6.808-2.117-13.208-5.608-18.458l-8.867 8.942c1.467 2.783 2.275 6.067 2.275 9.517 0 11.233-9.108 20.425-20.25 20.425-3.417 0-6.667-.817-9.425-2.292l-8.867 8.941zm71.891-72.525c11.792 10.833 21.792 25.425 29.275 42.983a6.246 6.246 0 0 1 0 4.842C-40.55 464.159-71.525 488.609-106 488.609h-.083c-15.692 0-30.733-5.167-43.992-14.608l-15.775 15.917a6.001 6.001 0 0 1-4.308 1.808 5.875 5.875 0 0 1-4.308-1.808 6.133 6.133 0 0 1-.733-7.708l.25-.333L-54.7 360.542c.167-.167.333-.333.417-.5.158-.167.317-.325.4-.483l7.642-7.717a6.092 6.092 0 0 1 8.615-.01l.01.01a6.084 6.084 0 0 1 .097 8.603l-.097.097-14.808 14.933h.007zm-86.083 45.484c0 2.133.242 4.267.567 6.233l-30.083 30.35c-8.133-9.517-15.208-21-20.817-34.208a6.25 6.25 0 0 1 0-4.833c17.4-40.867 48.375-65.233 82.775-65.233h.083c11.625 0 22.917 2.792 33.333 8.042l-27.167 27.4a37.618 37.618 0 0 0-6.167-.575c-17.975 0-32.533 14.692-32.533 32.817l.009.007z"
      })));

      var aHide = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-124.308%2C448c5.208%2C3.525%2C11.55%2C5.658%2C18.3%2C5.658c17.883%2C0%2C32.442-14.683%2C32.442-32.733%20c0-6.808-2.117-13.208-5.608-18.458l-8.867%2C8.942c1.467%2C2.783%2C2.275%2C6.067%2C2.275%2C9.517c0%2C11.233-9.108%2C20.425-20.25%2C20.425%20c-3.417%2C0-6.667-0.817-9.425-2.292L-124.308%2C448L-124.308%2C448z%20M-52.417%2C375.475c11.792%2C10.833%2C21.792%2C25.425%2C29.275%2C42.983%20c0.651%2C1.548%2C0.651%2C3.293%2C0%2C4.842C-40.55%2C464.159-71.525%2C488.609-106%2C488.609h-0.083c-15.692%2C0-30.733-5.167-43.992-14.608%20l-15.775%2C15.917c-1.133%2C1.16-2.687%2C1.812-4.308%2C1.808c-1.624%2C0.019-3.184-0.636-4.308-1.808c-2.04-2.071-2.347-5.29-0.733-7.708%20l0.25-0.333L-54.7%2C360.542c0.167-0.167%2C0.333-0.333%2C0.417-0.5c0.158-0.167%2C0.317-0.325%2C0.4-0.483l7.642-7.717%20c2.376-2.382%2C6.233-2.386%2C8.615-0.01c0.003%2C0.003%2C0.007%2C0.007%2C0.01%2C0.01c2.402%2C2.349%2C2.446%2C6.2%2C0.097%2C8.603%20c-0.032%2C0.033-0.065%2C0.065-0.097%2C0.097l-14.808%2C14.933H-52.417z%20M-138.5%2C420.959c0%2C2.133%2C0.242%2C4.267%2C0.567%2C6.233l-30.083%2C30.35%20c-8.133-9.517-15.208-21-20.817-34.208c-0.648-1.546-0.648-3.287%2C0-4.833c17.4-40.867%2C48.375-65.233%2C82.775-65.233h0.083%20c11.625%2C0%2C22.917%2C2.792%2C33.333%2C8.042l-27.167%2C27.4c-2.036-0.361-4.099-0.553-6.167-0.575c-17.975%2C0-32.533%2C14.692-32.533%2C32.817%20L-138.5%2C420.959z%22%2F%3E%3C%2Fsvg%3E";

      var _path$16;

      function _extends$16() {
        _extends$16 = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$16.apply(this, arguments);
      }

      const SvgAHome = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$16({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$16 || (_path$16 = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-120.875 494.004v-25.475c0-6.5 5.308-11.783 11.858-11.783h23.958c3.142 0 6.167 1.25 8.383 3.45a11.742 11.742 0 0 1 3.475 8.333v25.475a10.124 10.124 0 0 0 2.967 7.225c1.917 1.917 4.533 3 7.25 3h16.35a28.83 28.83 0 0 0 20.358-8.333 28.42 28.42 0 0 0 8.442-20.183v-72.592a20.601 20.601 0 0 0-7.458-15.85l-55.592-44.083c-9.69-7.728-23.506-7.476-32.908.6l-54.317 43.483a20.615 20.615 0 0 0-8.058 15.85v72.517c0 15.792 12.892 28.592 28.8 28.592h15.967c5.667 0 10.258-4.533 10.3-10.15l.225-.076z"
      })));

      var aHome = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-120.875%2C494.004v-25.475c0-6.5%2C5.308-11.783%2C11.858-11.783h23.958c3.142%2C0%2C6.167%2C1.25%2C8.383%2C3.45%20c2.225%2C2.208%2C3.475%2C5.208%2C3.475%2C8.333v25.475c-0.017%2C2.708%2C1.05%2C5.308%2C2.967%2C7.225c1.917%2C1.917%2C4.533%2C3%2C7.25%2C3h16.35%20c7.621%2C0.022%2C14.94-2.974%2C20.358-8.333c5.395-5.332%2C8.434-12.599%2C8.442-20.183v-72.592c0-6.125-2.733-11.925-7.458-15.85%20l-55.592-44.083c-9.69-7.728-23.506-7.476-32.908%2C0.6l-54.317%2C43.483c-4.943%2C3.794-7.906%2C9.62-8.058%2C15.85v72.517%20c0%2C15.792%2C12.892%2C28.592%2C28.8%2C28.592h15.967c5.667%2C0%2C10.258-4.533%2C10.3-10.15L-120.875%2C494.004z%22%2F%3E%3C%2Fsvg%3E";

      var _path$15;

      function _extends$15() {
        _extends$15 = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$15.apply(this, arguments);
      }

      const SvgAImage = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$15({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$15 || (_path$15 = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-133.342 349.369c-21.419 0-35.257 14.686-35.257 37.344v68.27c0 6.358 1.18 12.035 3.2 16.955l4.471-5.453c4.854-5.901 11.911-14.512 11.969-14.562 5.743-6.566 16.539-16.357 30.711-10.431 3.109 1.289 5.868 3.059 8.411 4.68l.731.466c4.762 3.184 7.563 4.68 10.472 4.43 1.205-.167 2.336-.524 3.408-1.189 4.047-2.493 14.537-17.346 17.671-21.793l.865-1.222c9.059-11.802 23.022-14.961 34.659-7.979 1.563.931 12.758 8.752 16.465 11.894v-44.067c0-22.657-13.839-37.344-35.324-37.344h-72.459l.007.001zm72.443-11.594c28.068 0 46.935 19.631 46.935 48.938v68.27c0 .748-.075 1.429-.15 2.119a25.36 25.36 0 0 0-.167 2.386c-.017.399-.033.806-.067 1.205a2.81 2.81 0 0 1-.083.466 4.396 4.396 0 0 0-.075.457 56.352 56.352 0 0 1-1.289 7.522c-.133.606-.299 1.189-.457 1.778l-.041.124c-.665 2.344-1.446 4.58-2.386 6.715l-.507 1.064a44.92 44.92 0 0 1-3.723 6.508 22.11 22.11 0 0 1-.748.964l-.491.623a42.215 42.215 0 0 1-4.264 4.837c-.307.299-.648.573-.98.84l-.631.516a42.103 42.103 0 0 1-5.045 3.832 13.46 13.46 0 0 1-1.222.665c-.274.133-.541.266-.806.416a44.27 44.27 0 0 1-5.71 2.76c-.482.191-.997.324-1.521.457-.368.09-.734.19-1.097.299l-.532.167a42.512 42.512 0 0 1-5.552 1.454c-1.122.199-2.319.274-3.508.349-.519.031-1.036.067-1.554.108-.549.042-1.08.108-1.629.174-.893.129-1.791.2-2.693.216h-72.451c-3.125 0-6.109-.316-8.993-.79l-.307-.05c-11.245-1.937-20.579-7.364-27.121-15.542-.042 0-.058-.033-.083-.083a.36.36 0 0 0-.067-.083c-6.566-8.278-10.281-19.407-10.281-32.473v-68.27c0-29.306 18.867-48.938 46.852-48.938h72.441zm-44.491 54.148c0 11.262-9.425 20.654-20.737 20.654a20.947 20.947 0 0 1-20.33-16.673 20.017 20.017 0 0 1-.491-4.364c.014-11.347 9.224-20.535 20.571-20.521h.033c5.793 0 11.054 2.436 14.811 6.325 3.774 3.758 6.143 8.936 6.143 14.579z"
      })));

      var aImage = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-133.342%2C349.369c-21.419%2C0-35.257%2C14.686-35.257%2C37.344v68.27c0%2C6.358%2C1.18%2C12.035%2C3.2%2C16.955%20l4.471-5.453c4.854-5.901%2C11.911-14.512%2C11.969-14.562c5.743-6.566%2C16.539-16.357%2C30.711-10.431c3.109%2C1.289%2C5.868%2C3.059%2C8.411%2C4.68%20l0.731%2C0.466c4.762%2C3.184%2C7.563%2C4.68%2C10.472%2C4.43c1.205-0.167%2C2.336-0.524%2C3.408-1.189c4.047-2.493%2C14.537-17.346%2C17.671-21.793%20l0.865-1.222c9.059-11.802%2C23.022-14.961%2C34.659-7.979c1.563%2C0.931%2C12.758%2C8.752%2C16.465%2C11.894v-44.067%20c0-22.657-13.839-37.344-35.324-37.344h-72.459L-133.342%2C349.369L-133.342%2C349.369z%20M-60.899%2C337.775%20c28.068%2C0%2C46.935%2C19.631%2C46.935%2C48.938v68.27c0%2C0.748-0.075%2C1.429-0.15%2C2.119c-0.093%2C0.792-0.149%2C1.588-0.167%2C2.386%20c-0.017%2C0.399-0.033%2C0.806-0.067%2C1.205c-0.017%2C0.167-0.042%2C0.316-0.083%2C0.466c-0.033%2C0.151-0.058%2C0.303-0.075%2C0.457%20c-0.259%2C2.533-0.69%2C5.047-1.289%2C7.522c-0.133%2C0.606-0.299%2C1.189-0.457%2C1.778l-0.041%2C0.124c-0.665%2C2.344-1.446%2C4.58-2.386%2C6.715%20l-0.507%2C1.064c-1.057%2C2.269-2.303%2C4.446-3.723%2C6.508c-0.241%2C0.332-0.491%2C0.648-0.748%2C0.964l-0.491%2C0.623%20c-1.296%2C1.718-2.721%2C3.336-4.264%2C4.837c-0.307%2C0.299-0.648%2C0.573-0.98%2C0.84l-0.631%2C0.516c-1.583%2C1.402-3.269%2C2.683-5.045%2C3.832%20c-0.391%2C0.249-0.806%2C0.457-1.222%2C0.665c-0.274%2C0.133-0.541%2C0.266-0.806%2C0.416c-1.835%2C1.055-3.743%2C1.978-5.71%2C2.76%20c-0.482%2C0.191-0.997%2C0.324-1.521%2C0.457c-0.368%2C0.09-0.734%2C0.19-1.097%2C0.299l-0.532%2C0.167c-1.816%2C0.609-3.67%2C1.095-5.552%2C1.454%20c-1.122%2C0.199-2.319%2C0.274-3.508%2C0.349c-0.519%2C0.031-1.036%2C0.067-1.554%2C0.108c-0.549%2C0.042-1.08%2C0.108-1.629%2C0.174%20c-0.893%2C0.129-1.791%2C0.2-2.693%2C0.216h-72.451c-3.125%2C0-6.109-0.316-8.993-0.79l-0.307-0.05%20c-11.245-1.937-20.579-7.364-27.121-15.542c-0.042%2C0-0.058-0.033-0.083-0.083c-0.018-0.031-0.041-0.059-0.067-0.083%20c-6.566-8.278-10.281-19.407-10.281-32.473v-68.27c0-29.306%2C18.867-48.938%2C46.852-48.938h72.441V337.775z%20M-105.39%2C391.923%20c0%2C11.262-9.425%2C20.654-20.737%2C20.654c-9.855-0.083-18.32-7.025-20.33-16.673c-0.323-1.432-0.488-2.895-0.491-4.364%20c0.014-11.347%2C9.224-20.535%2C20.571-20.521c0.011%2C0%2C0.022%2C0%2C0.033%2C0c5.793%2C0%2C11.054%2C2.436%2C14.811%2C6.325%20C-107.759%2C381.102-105.39%2C386.28-105.39%2C391.923z%22%2F%3E%3C%2Fsvg%3E";

      var _path$14;

      function _extends$14() {
        _extends$14 = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$14.apply(this, arguments);
      }

      const SvgAInfoCircle = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$14({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$14 || (_path$14 = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-97.119 337.794c-45.953 0-83.215 37.262-83.215 83.215s37.262 83.215 83.215 83.215c46.053 0 83.215-37.262 83.215-83.215s-37.162-83.215-83.215-83.215zm-7.292 51.647c0-3.996 3.297-7.293 7.293-7.293s7.293 3.297 7.293 7.293v36.762a7.27 7.27 0 0 1-7.293 7.293 7.27 7.27 0 0 1-7.293-7.293v-36.762zm7.392 70.528a7.27 7.27 0 0 1-7.293-7.293c0-3.996 3.297-7.293 7.293-7.293a7.27 7.27 0 0 1 7.293 7.293c0 3.996-3.297 7.293-7.293 7.293z"
      })));

      var aInfoCircle = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-97.119%2C337.794c-45.953%2C0-83.215%2C37.262-83.215%2C83.215s37.262%2C83.215%2C83.215%2C83.215%20c46.053%2C0%2C83.215-37.262%2C83.215-83.215S-51.066%2C337.794-97.119%2C337.794z%20M-104.411%2C389.441c0-3.996%2C3.297-7.293%2C7.293-7.293%20s7.293%2C3.297%2C7.293%2C7.293v36.762c0%2C3.996-3.197%2C7.293-7.293%2C7.293c-3.996%2C0-7.293-3.197-7.293-7.293V389.441z%20M-97.019%2C459.969%20L-97.019%2C459.969c-4.096%2C0-7.293-3.297-7.293-7.293c0-3.996%2C3.297-7.293%2C7.293-7.293c4.096%2C0%2C7.293%2C3.297%2C7.293%2C7.293%20C-89.726%2C456.672-93.023%2C459.969-97.019%2C459.969z%22%2F%3E%3C%2Fsvg%3E";

      var _path$13;

      function _extends$13() {
        _extends$13 = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$13.apply(this, arguments);
      }

      const SvgAInfoSquare = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$13({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$13 || (_path$13 = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-60.981 337.775h-72.027c-28.193 0-47.122 19.725-47.122 49.114v67.843c0 29.289 18.928 49.114 47.122 49.114h72.027c28.193 0 47.022-19.725 47.022-49.114V386.89c-.1-29.389-18.928-49.115-47.022-49.115zm-28.891 114.368c0 3.985-3.288 7.272-7.272 7.272a7.249 7.249 0 0 1-7.272-7.272v-36.661c0-3.985 3.288-7.272 7.272-7.272a7.249 7.249 0 0 1 7.272 7.272v36.661zm-7.073-55.789h-.199c-3.985 0-7.173-3.288-7.173-7.272s3.188-7.272 7.272-7.272a7.249 7.249 0 0 1 7.272 7.272c.1 3.984-3.187 7.272-7.172 7.272z"
      })));

      var aInfoSquare = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-60.981%2C337.775h-72.027c-28.193%2C0-47.122%2C19.725-47.122%2C49.114v67.843%20c0%2C29.289%2C18.928%2C49.114%2C47.122%2C49.114h72.027c28.193%2C0%2C47.022-19.725%2C47.022-49.114V386.89%20C-14.059%2C357.501-32.887%2C337.775-60.981%2C337.775z%20M-89.872%2C452.143c0%2C3.985-3.288%2C7.272-7.272%2C7.272%20c-3.985%2C0-7.272-3.188-7.272-7.272v-36.661c0-3.985%2C3.288-7.272%2C7.272-7.272c4.085%2C0%2C7.272%2C3.288%2C7.272%2C7.272V452.143z%20%20M-96.945%2C396.354c-0.1%2C0-0.1%2C0-0.199%2C0c-3.985%2C0-7.173-3.288-7.173-7.272s3.188-7.272%2C7.272-7.272c3.985%2C0%2C7.272%2C3.188%2C7.272%2C7.272%20C-89.673%2C393.066-92.96%2C396.354-96.945%2C396.354z%22%2F%3E%3C%2Fsvg%3E";

      var _path$12;

      function _extends$12() {
        _extends$12 = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$12.apply(this, arguments);
      }

      const SvgAImage2 = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$12({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$12 || (_path$12 = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-133.117 504.223h72.225c28.25 0 47.225-19.817 47.225-49.308v-68.05c0-29.492-18.975-49.308-47.217-49.308h-72.233c-28.25 0-47.217 19.817-47.217 49.308v68.05c.001 29.492 18.976 49.308 47.217 49.308zm6.95-91.666c-11.502-.009-20.824-9.331-20.833-20.833 0-11.483 9.333-20.833 20.825-20.833 11.497.018 20.811 9.336 20.825 20.833 0 11.483-9.342 20.833-20.833 20.833h.016zm94.35 32.783c2.792 7.158 1.333 15.75-1.642 22.833-3.542 8.433-10.308 14.817-18.833 17.6a37.698 37.698 0 0 1-11.733 1.783h-70.225c-6.992 0-13.175-1.675-18.25-4.8-3.167-1.958-3.733-6.483-1.375-9.417 3.933-4.9 7.825-9.817 11.75-14.783 7.467-9.5 12.5-12.25 18.1-9.833 2.275 1 4.55 2.5 6.9 4.083 6.25 4.25 14.942 10.083 26.392 3.75 7.833-4.392 12.375-11.917 16.333-18.467l.067-.108.833-1.383c1.333-2.2 2.642-4.367 4.125-6.367 1.858-2.5 8.75-10.333 17.692-4.75 5.683 3.5 10.475 8.25 15.592 13.333a18.865 18.865 0 0 1 4.274 6.526z"
      })));

      var aImage2 = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-133.117%2C504.223h72.225c28.25%2C0%2C47.225-19.817%2C47.225-49.308v-68.05%20c0-29.492-18.975-49.308-47.217-49.308h-72.233c-28.25%2C0-47.217%2C19.817-47.217%2C49.308v68.05%20C-180.333%2C484.407-161.358%2C504.223-133.117%2C504.223z%20M-126.167%2C412.557c-11.502-0.009-20.824-9.331-20.833-20.833%20c0-11.483%2C9.333-20.833%2C20.825-20.833c11.497%2C0.018%2C20.811%2C9.336%2C20.825%2C20.833c0%2C11.483-9.342%2C20.833-20.833%2C20.833H-126.167z%20%20M-31.817%2C445.34c2.792%2C7.158%2C1.333%2C15.75-1.642%2C22.833c-3.542%2C8.433-10.308%2C14.817-18.833%2C17.6%20c-3.792%2C1.21-7.753%2C1.812-11.733%2C1.783h-70.225c-6.992%2C0-13.175-1.675-18.25-4.8c-3.167-1.958-3.733-6.483-1.375-9.417%20c3.933-4.9%2C7.825-9.817%2C11.75-14.783c7.467-9.5%2C12.5-12.25%2C18.1-9.833c2.275%2C1%2C4.55%2C2.5%2C6.9%2C4.083%20c6.25%2C4.25%2C14.942%2C10.083%2C26.392%2C3.75c7.833-4.392%2C12.375-11.917%2C16.333-18.467l0.067-0.108l0.833-1.383%20c1.333-2.2%2C2.642-4.367%2C4.125-6.367c1.858-2.5%2C8.75-10.333%2C17.692-4.75c5.683%2C3.5%2C10.475%2C8.25%2C15.592%2C13.333%20C-34.142%2C440.757-32.75%2C442.965-31.817%2C445.34L-31.817%2C445.34z%22%2F%3E%3C%2Fsvg%3E";

      var _path$11;

      function _extends$11() {
        _extends$11 = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$11.apply(this, arguments);
      }

      const SvgALament = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$11({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.9 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$11 || (_path$11 = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-180.3 421.1c0-45.9 37.3-83.2 83.2-83.2 46 0 83.2 37.3 83.2 83.2s-37.2 83.2-83.2 83.2c-46-.1-83.2-37.3-83.2-83.2zm75.8-31.5c0-4 3.3-7.3 7.3-7.3s7.2 3.3 7.2 7.3v36.8c0 4-3.2 7.2-7.2 7.2s-7.3-3.2-7.3-7.2v-36.8zm7.4 70.4c-4.1 0-7.3-3.3-7.3-7.3s3.2-7.2 7.2-7.2c4.1 0 7.3 3.2 7.3 7.2s-3.2 7.3-7.2 7.3z"
      })));

      var aLament = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.9%20200%20200%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-180.3%2C421.1c0-45.9%2C37.3-83.2%2C83.2-83.2c46%2C0%2C83.2%2C37.3%2C83.2%2C83.2s-37.2%2C83.2-83.2%2C83.2%20C-143.1%2C504.2-180.3%2C467-180.3%2C421.1z%20M-104.5%2C389.6c0-4%2C3.3-7.3%2C7.3-7.3c4%2C0%2C7.2%2C3.3%2C7.2%2C7.3v36.8c0%2C4-3.2%2C7.2-7.2%2C7.2%20c-4%2C0-7.3-3.2-7.3-7.2V389.6z%20M-97.1%2C460c-4.1%2C0-7.3-3.3-7.3-7.3c0-4%2C3.2-7.2%2C7.2-7.2c4.1%2C0%2C7.3%2C3.2%2C7.3%2C7.2%20C-89.9%2C456.7-93.1%2C460-97.1%2C460L-97.1%2C460z%22%2F%3E%3C%2Fsvg%3E";

      var _path$10;

      function _extends$10() {
        _extends$10 = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$10.apply(this, arguments);
      }

      const SvgALocation = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$10({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$10 || (_path$10 = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-167.833 406.875c0-38.333 32.033-69.317 70.775-69.317 38.858 0 70.892 30.983 70.892 69.317 0 19.317-7.025 37.25-18.583 52.45a183.844 183.844 0 0 1-46.175 42.833c-4.05 2.65-7.708 2.85-12.158 0a180.341 180.341 0 0 1-46.167-42.833c-11.568-15.2-18.584-33.133-18.584-52.45zm47.45 2.158c0 12.833 10.483 22.942 23.333 22.942s23.433-10.1 23.433-22.942c0-12.75-10.583-23.333-23.442-23.333-12.856.068-23.261 10.477-23.324 23.333z"
      })));

      var aLocation = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-167.833%2C406.875c0-38.333%2C32.033-69.317%2C70.775-69.317c38.858%2C0%2C70.892%2C30.983%2C70.892%2C69.317%20c0%2C19.317-7.025%2C37.25-18.583%2C52.45c-12.813%2C16.827-28.434%2C31.318-46.175%2C42.833c-4.05%2C2.65-7.708%2C2.85-12.158%2C0%20c-17.782-11.459-33.409-25.958-46.167-42.833C-160.817%2C444.125-167.833%2C426.192-167.833%2C406.875L-167.833%2C406.875z%20%20M-120.383%2C409.033c0%2C12.833%2C10.483%2C22.942%2C23.333%2C22.942s23.433-10.1%2C23.433-22.942c0-12.75-10.583-23.333-23.442-23.333%20C-109.915%2C385.768-120.32%2C396.177-120.383%2C409.033z%22%2F%3E%3C%2Fsvg%3E";

      var _path$$;

      function _extends$$() {
        _extends$$ = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$$.apply(this, arguments);
      }

      const SvgALock = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$$({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$$ || (_path$$ = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-50.975 395.298v-12.775c0-24.842-20.575-44.967-46.15-44.967-25.233 0-45.817 20.125-45.9 44.967v12.775c-14.342 4.483-24.808 17.475-24.808 32.992v41.142c0 19.208 15.917 34.792 35.583 34.792h70.517c19.642 0 35.567-15.575 35.567-34.792v-41.133c-.001-15.526-10.459-28.517-24.809-33.001zm-38.617 62.717a7.333 7.333 0 0 1-7.382 7.284l-.068-.001a7.308 7.308 0 0 1-7.366-7.25V439.631c0-3.975 3.3-7.208 7.367-7.208 4.15 0 7.45 3.233 7.45 7.208v18.384zm23.8-64.508h-62.417v-11.15c.083-16.725 14.058-30.308 31.25-30.308s31.167 13.667 31.167 30.475v10.983z"
      })));

      var aLock = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-50.975%2C395.298v-12.775h0c0-24.842-20.575-44.967-46.15-44.967%20c-25.233%2C0-45.817%2C20.125-45.9%2C44.967v12.775c-14.342%2C4.483-24.808%2C17.475-24.808%2C32.992v41.142%20c0%2C19.208%2C15.917%2C34.792%2C35.583%2C34.792h70.517c19.642%2C0%2C35.567-15.575%2C35.567-34.792v-41.133%20C-26.167%2C412.773-36.625%2C399.782-50.975%2C395.298z%20M-89.592%2C458.015c-0.027%2C4.05-3.332%2C7.311-7.382%2C7.284%20c-0.023%2C0-0.045%2C0-0.068-0.001c-4.036%2C0.032-7.334-3.214-7.366-7.25c0-0.011%2C0-0.022%2C0-0.034v-18.383c0-3.975%2C3.3-7.208%2C7.367-7.208%20c4.15%2C0%2C7.45%2C3.233%2C7.45%2C7.208V458.015z%20M-65.792%2C393.507h-62.417v-11.15c0.083-16.725%2C14.058-30.308%2C31.25-30.308%20s31.167%2C13.667%2C31.167%2C30.475V393.507z%22%2F%3E%3C%2Fsvg%3E";

      var _path$_;

      function _extends$_() {
        _extends$_ = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$_.apply(this, arguments);
      }

      const SvgALogin = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$_({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$_ || (_path$_ = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-91.783 337.556h42c20.983 0 38.117 16.667 38.117 37v92.667c0 20.417-17.125 37-38.292 37h-41.917c-20.992 0-38.2-16.583-38.2-36.917v-40h53.35l-13.767 13.333a6.292 6.292 0 0 0 0 9.083 6.748 6.748 0 0 0 4.733 1.833c1.633 0 3.358-.583 4.65-1.833l25.125-24.25a6.135 6.135 0 0 0 1.975-4.583c0-1.667-.683-3.333-1.975-4.5l-25.125-24.25a6.799 6.799 0 0 0-9.383 0 6.292 6.292 0 0 0 0 9.083l13.767 13.25h-53.35v-39.833c-.008-20.416 17.208-37.083 38.292-37.083zM-170 420.889c0-3.5 2.958-6.417 6.508-6.417h33.417v12.833H-163.5a6.465 6.465 0 0 1-6.5-6.416z"
      })));

      var aLogin = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-91.783%2C337.556h42c20.983%2C0%2C38.117%2C16.667%2C38.117%2C37v92.667c0%2C20.417-17.125%2C37-38.292%2C37h-41.917%20c-20.992%2C0-38.2-16.583-38.2-36.917v-40h53.35l-13.767%2C13.333c-2.583%2C2.5-2.583%2C6.583%2C0%2C9.083c1.279%2C1.204%2C2.977%2C1.861%2C4.733%2C1.833%20c1.633%2C0%2C3.358-0.583%2C4.65-1.833l25.125-24.25c1.278-1.179%2C1.996-2.845%2C1.975-4.583c0-1.667-0.683-3.333-1.975-4.5l-25.125-24.25%20c-2.627-2.504-6.757-2.504-9.383%2C0c-2.583%2C2.5-2.583%2C6.583%2C0%2C9.083l13.767%2C13.25h-53.35v-39.833%20C-130.083%2C354.223-112.867%2C337.556-91.783%2C337.556z%20M-170%2C420.889c0-3.5%2C2.958-6.417%2C6.508-6.417h33.417v12.833H-163.5%20C-167.065%2C427.325-169.972%2C424.454-170%2C420.889z%22%2F%3E%3C%2Fsvg%3E";

      var _path$Z;

      function _extends$Z() {
        _extends$Z = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$Z.apply(this, arguments);
      }

      const SvgALogout = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$Z({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$Z || (_path$Z = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-116.542 414.473a6.417 6.417 0 0 0-6.524 6.307l-.001.109c0 3.5 2.883 6.417 6.525 6.417h50.875v39.833c0 20.417-16.875 37.083-37.733 37.083h-41.292c-20.767 0-37.642-16.583-37.642-37v-92.583c0-20.5 16.958-37.083 37.733-37.083h41.375c20.683 0 37.558 16.583 37.558 37v39.917h-50.874zm81.125-22.417 24.333 24.25a6.367 6.367 0 0 1 .08 9.003l-.08.08-24.333 24.25c-1.25 1.25-2.917 1.917-4.5 1.917a6.44 6.44 0 0 1-4.583-11l13.333-13.25h-34.5v-12.833h34.5l-13.333-13.25c-2.5-2.5-2.5-6.583 0-9.083a6.363 6.363 0 0 1 9.083-.084z"
      })));

      var aLogout = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-116.542%2C414.473c-3.543-0.06-6.464%2C2.764-6.524%2C6.307c-0.001%2C0.036-0.001%2C0.073-0.001%2C0.109%20c0%2C3.5%2C2.883%2C6.417%2C6.525%2C6.417h50.875v39.833c0%2C20.417-16.875%2C37.083-37.733%2C37.083h-41.292c-20.767%2C0-37.642-16.583-37.642-37%20v-92.583c0-20.5%2C16.958-37.083%2C37.733-37.083h41.375c20.683%2C0%2C37.558%2C16.583%2C37.558%2C37v39.917H-116.542z%20M-35.417%2C392.056%20l24.333%2C24.25c2.508%2C2.464%2C2.544%2C6.495%2C0.08%2C9.003c-0.026%2C0.027-0.053%2C0.053-0.08%2C0.08l-24.333%2C24.25%20c-1.25%2C1.25-2.917%2C1.917-4.5%2C1.917c-3.558%2C0.018-6.456-2.852-6.473-6.41c-0.009-1.721%2C0.672-3.374%2C1.89-4.59l13.333-13.25h-34.5%20v-12.833h34.5l-13.333-13.25c-2.5-2.5-2.5-6.583%2C0-9.083C-42%2C389.556-37.917%2C389.556-35.417%2C392.056L-35.417%2C392.056z%22%2F%3E%3C%2Fsvg%3E";

      var _path$Y;

      function _extends$Y() {
        _extends$Y = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$Y.apply(this, arguments);
      }

      const SvgAMaximize = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$Y({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.9 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$Y || (_path$Y = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-72.3 353.5c-4.2 0-7.5-3.4-7.5-7.5s3.4-7.5 7.5-7.5h50.2c4.2 0 7.5 3.4 7.5 7.5v50.2c0 4.2-3.4 7.5-7.5 7.5-4.2 0-7.5-3.4-7.5-7.5v-32l-45.7 45.7c-2.9 3-7.6 3.1-10.7.2s-3.1-7.6-.2-10.7l.2-.2 45.8-45.7h-32.1zm-36.6 79.3c2.9 2.9 2.9 7.7 0 10.6l-45.7 45.7h32c4.2 0 7.5 3.4 7.5 7.5 0 4.2-3.4 7.5-7.5 7.5h-50.2c-4.2 0-7.5-3.4-7.5-7.5v-50.2c0-4.2 3.4-7.5 7.5-7.5 4.2 0 7.5 3.4 7.5 7.5v32l45.7-45.7c3-2.9 7.8-2.9 10.7.1z"
      })));

      var aMaximize = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.9%20200%20200%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-72.3%2C353.5c-4.2%2C0-7.5-3.4-7.5-7.5s3.4-7.5%2C7.5-7.5h50.2c4.2%2C0%2C7.5%2C3.4%2C7.5%2C7.5l0%2C0v50.2c0%2C4.2-3.4%2C7.5-7.5%2C7.5%20c-4.2%2C0-7.5-3.4-7.5-7.5v-32l-45.7%2C45.7c-2.9%2C3-7.6%2C3.1-10.7%2C0.2s-3.1-7.6-0.2-10.7c0.1-0.1%2C0.2-0.2%2C0.2-0.2l45.8-45.7H-72.3%20L-72.3%2C353.5z%20M-108.9%2C432.8c2.9%2C2.9%2C2.9%2C7.7%2C0%2C10.6l-45.7%2C45.7h32c4.2%2C0%2C7.5%2C3.4%2C7.5%2C7.5c0%2C4.2-3.4%2C7.5-7.5%2C7.5c0%2C0%2C0%2C0%2C0%2C0h-50.2%20c-4.2%2C0-7.5-3.4-7.5-7.5l0%2C0v-50.2c0-4.2%2C3.4-7.5%2C7.5-7.5c4.2%2C0%2C7.5%2C3.4%2C7.5%2C7.5c0%2C0%2C0%2C0%2C0%2C0v32l45.7-45.7%20C-116.6%2C429.8-111.8%2C429.8-108.9%2C432.8C-108.9%2C432.8-108.9%2C432.8-108.9%2C432.8L-108.9%2C432.8z%22%2F%3E%3C%2Fsvg%3E";

      var _path$X;

      function _extends$X() {
        _extends$X = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$X.apply(this, arguments);
      }

      const SvgAMaximize2 = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$X({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.9 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$X || (_path$X = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-173.9 344c4.6-4.6 10.8-7.2 17.3-7.2h25.4c4.2 0 7.6 3.4 7.6 7.6 0 4.2-3.4 7.6-7.6 7.6h-25.4c-5.1 0-9.3 4.2-9.3 9.3v25.4c0 4.2-3.4 7.6-7.6 7.6s-7.6-3.4-7.6-7.6v-25.4c0-6.5 2.6-12.7 7.2-17.3zm102.7.4c0-4.2 3.4-7.6 7.6-7.6h25.4c13.5 0 24.5 11 24.5 24.5v25.4c0 4.2-3.4 7.6-7.6 7.6-4.2 0-7.6-3.4-7.6-7.6v-25.4c0-5.1-4.2-9.3-9.3-9.3h-25.4c-4.2 0-7.6-3.4-7.6-7.6zm-102.3 102.3c4.2 0 7.6 3.4 7.6 7.6v25.4c0 5.1 4.2 9.3 9.3 9.3h25.4c4.2 0 7.6 3.4 7.6 7.6 0 4.2-3.4 7.6-7.6 7.6h-25.4c-13.5 0-24.5-11-24.5-24.5v-25.4c0-4.2 3.4-7.6 7.6-7.6zm152.2 0c4.2 0 7.6 3.4 7.6 7.6v25.4c0 13.5-11 24.5-24.5 24.5h-25.4c-4.2 0-7.6-3.4-7.6-7.6 0-4.2 3.4-7.6 7.6-7.6h25.4c5.1 0 9.3-4.2 9.3-9.3v-25.4c0-4.2 3.4-7.6 7.6-7.6z"
      })));

      var aMaximize2 = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.9%20200%20200%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-173.9%2C344c4.6-4.6%2C10.8-7.2%2C17.3-7.2h25.4c4.2%2C0%2C7.6%2C3.4%2C7.6%2C7.6c0%2C4.2-3.4%2C7.6-7.6%2C7.6c0%2C0%2C0%2C0%2C0%2C0h-25.4%20c-5.1%2C0-9.3%2C4.2-9.3%2C9.3l0%2C0v25.4c0%2C4.2-3.4%2C7.6-7.6%2C7.6s-7.6-3.4-7.6-7.6v-25.4C-181.1%2C354.8-178.5%2C348.6-173.9%2C344L-173.9%2C344z%20%20M-71.2%2C344.4c0-4.2%2C3.4-7.6%2C7.6-7.6l0%2C0h25.4c13.5%2C0%2C24.5%2C11%2C24.5%2C24.5l0%2C0v25.4c0%2C4.2-3.4%2C7.6-7.6%2C7.6c-4.2%2C0-7.6-3.4-7.6-7.6%20v-25.4c0-5.1-4.2-9.3-9.3-9.3l0%2C0h-25.4C-67.8%2C352-71.2%2C348.6-71.2%2C344.4L-71.2%2C344.4z%20M-173.5%2C446.7c4.2%2C0%2C7.6%2C3.4%2C7.6%2C7.6l0%2C0%20v25.4c0%2C5.1%2C4.2%2C9.3%2C9.3%2C9.3l0%2C0h25.4c4.2%2C0%2C7.6%2C3.4%2C7.6%2C7.6c0%2C4.2-3.4%2C7.6-7.6%2C7.6c0%2C0%2C0%2C0%2C0%2C0h-25.4c-13.5%2C0-24.5-11-24.5-24.5%20l0%2C0v-25.4C-181.1%2C450.1-177.7%2C446.7-173.5%2C446.7L-173.5%2C446.7z%20M-21.3%2C446.7c4.2%2C0%2C7.6%2C3.4%2C7.6%2C7.6v0v25.4%20c0%2C13.5-11%2C24.5-24.5%2C24.5l0%2C0h-25.4c-4.2%2C0-7.6-3.4-7.6-7.6c0-4.2%2C3.4-7.6%2C7.6-7.6c0%2C0%2C0%2C0%2C0%2C0h25.4c5.1%2C0%2C9.3-4.2%2C9.3-9.3l0%2C0%20v-25.4C-28.9%2C450.1-25.5%2C446.7-21.3%2C446.7L-21.3%2C446.7L-21.3%2C446.7z%22%2F%3E%3C%2Fsvg%3E";

      var _path$W;

      function _extends$W() {
        _extends$W = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$W.apply(this, arguments);
      }

      const SvgAMessage = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$W({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$W || (_path$W = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-55.833 337.557c23.261-.014 42.134 18.822 42.167 42.083v65.833c0 23.25-18.917 42.083-42.167 42.083h-82.333c-23.261.014-42.134-18.822-42.167-42.083V379.64c0-23.242 18.841-42.083 42.083-42.083h82.417zm13.25 54.5.667-.667a6.44 6.44 0 0 0-.083-8.333 7 7 0 0 0-4.417-2.167 6.334 6.334 0 0 0-4.667 1.667l-37.583 30a13.05 13.05 0 0 1-16.667 0l-37.5-30a6.333 6.333 0 0 0-8.333.583c-2.25 2.25-2.5 5.833-.583 8.333l1.083 1.083 37.917 29.583c9.539 7.578 23.044 7.578 32.583 0l37.583-30.082z"
      })));

      var aMessage = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-55.833%2C337.557c23.261-0.014%2C42.134%2C18.822%2C42.167%2C42.083v65.833%20c0%2C23.25-18.917%2C42.083-42.167%2C42.083h-82.333c-23.261%2C0.014-42.134-18.822-42.167-42.083V379.64%20c0-23.242%2C18.841-42.083%2C42.083-42.083c0.028%2C0%2C0.056%2C0%2C0.083%2C0H-55.833z%20M-42.583%2C392.057l0.667-0.667%20c2.015-2.424%2C1.98-5.95-0.083-8.333c-1.162-1.233-2.731-2.003-4.417-2.167c-1.717-0.101-3.402%2C0.5-4.667%2C1.667l-37.583%2C30%20c-4.832%2C4.01-11.835%2C4.01-16.667%2C0l-37.5-30c-2.53-1.925-6.096-1.675-8.333%2C0.583c-2.25%2C2.25-2.5%2C5.833-0.583%2C8.333l1.083%2C1.083%20l37.917%2C29.583c9.539%2C7.578%2C23.044%2C7.578%2C32.583%2C0L-42.583%2C392.057z%22%2F%3E%3C%2Fsvg%3E";

      var _path$V;

      function _extends$V() {
        _extends$V = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$V.apply(this, arguments);
      }

      const SvgAMinimize = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$V({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.9 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$V || (_path$V = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-28.7 340.8c3.2-3.3 8.4-3.4 11.7-.2s3.4 8.4.2 11.7l-.2.2-43.9 43.9h29.8c4.6 0 8.3 3.7 8.3 8.3s-3.7 8.3-8.3 8.3h-49.8c-4.6 0-8.3-3.7-8.3-8.3V355c0-4.6 3.7-8.3 8.3-8.3 4.6 0 8.3 3.7 8.3 8.3v29.8l43.9-44zM-172.1 438c0-4.6 3.7-8.3 8.3-8.3h49.8c4.6 0 8.3 3.7 8.3 8.3v49.8c0 4.6-3.7 8.3-8.3 8.3s-8.3-3.7-8.3-8.3V458l-43.9 43.9c-3.3 3.2-8.5 3.1-11.7-.2-3.1-3.2-3.1-8.3 0-11.5l43.9-43.9h-29.8c-4.6-.1-8.3-3.8-8.3-8.3z"
      })));

      var aMinimize = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.9%20200%20200%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-28.7%2C340.8c3.2-3.3%2C8.4-3.4%2C11.7-0.2s3.4%2C8.4%2C0.2%2C11.7c-0.1%2C0.1-0.1%2C0.1-0.2%2C0.2l-43.9%2C43.9h29.8c4.6%2C0%2C8.3%2C3.7%2C8.3%2C8.3%20s-3.7%2C8.3-8.3%2C8.3h-49.8c-4.6%2C0-8.3-3.7-8.3-8.3l0%2C0V355c0-4.6%2C3.7-8.3%2C8.3-8.3c4.6%2C0%2C8.3%2C3.7%2C8.3%2C8.3c0%2C0%2C0%2C0%2C0%2C0v29.8L-28.7%2C340.8%20L-28.7%2C340.8z%20M-172.1%2C438c0-4.6%2C3.7-8.3%2C8.3-8.3h0h49.8c4.6%2C0%2C8.3%2C3.7%2C8.3%2C8.3l0%2C0v49.8c0%2C4.6-3.7%2C8.3-8.3%2C8.3s-8.3-3.7-8.3-8.3%20V458l-43.9%2C43.9c-3.3%2C3.2-8.5%2C3.1-11.7-0.2c-3.1-3.2-3.1-8.3%2C0-11.5l43.9-43.9h-29.8C-168.4%2C446.2-172.1%2C442.5-172.1%2C438L-172.1%2C438%20z%22%2F%3E%3C%2Fsvg%3E";

      var _path$U;

      function _extends$U() {
        _extends$U = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$U.apply(this, arguments);
      }

      const SvgAMinimize2 = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$U({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.9 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$U || (_path$U = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-130.7 337.6c4.2 0 7.6 3.4 7.6 7.6v25.2c0 13.5-10.9 24.4-24.4 24.4h-25.2c-4.2 0-7.6-3.4-7.6-7.6 0-4.2 3.4-7.6 7.6-7.6h25.2c5.1 0 9.3-4.1 9.3-9.3v-25.2c-.1-4.1 3.3-7.5 7.5-7.5zm67.3 0c4.2 0 7.6 3.4 7.6 7.6v25.2c0 5.1 4.1 9.3 9.3 9.3h25.2c4.2 0 7.6 3.4 7.6 7.6 0 4.2-3.4 7.6-7.6 7.6h-25.2c-13.5 0-24.4-10.9-24.4-24.4v-25.2c-.1-4.3 3.3-7.7 7.5-7.7zm-116.9 117c0-4.2 3.4-7.6 7.6-7.6h25.2c13.5 0 24.4 10.9 24.4 24.4v25.2c0 4.2-3.4 7.6-7.6 7.6-4.2 0-7.6-3.4-7.6-7.6v-25.2c0-5.1-4.1-9.3-9.3-9.3h-25.2c-4.1 0-7.5-3.3-7.5-7.5zm133.7 7.5c-5.1 0-9.3 4.1-9.3 9.3v25.2c0 4.2-3.4 7.6-7.6 7.6-4.2 0-7.6-3.4-7.6-7.6v-25.2C-71 457.9-60 447-46.6 447h25.2c4.2 0 7.6 3.4 7.6 7.6 0 4.2-3.4 7.6-7.6 7.6h-25.2z"
      })));

      var aMinimize2 = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.9%20200%20200%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-130.7%2C337.6c4.2%2C0%2C7.6%2C3.4%2C7.6%2C7.6v25.2c0%2C13.5-10.9%2C24.4-24.4%2C24.4h0h-25.2c-4.2%2C0-7.6-3.4-7.6-7.6%20c0-4.2%2C3.4-7.6%2C7.6-7.6h25.2c5.1%2C0%2C9.3-4.1%2C9.3-9.3v0v-25.2C-138.3%2C341-134.9%2C337.6-130.7%2C337.6z%20M-63.4%2C337.6%20c4.2%2C0%2C7.6%2C3.4%2C7.6%2C7.6l0%2C0v25.2c0%2C5.1%2C4.1%2C9.3%2C9.3%2C9.3h0h25.2c4.2%2C0%2C7.6%2C3.4%2C7.6%2C7.6c0%2C4.2-3.4%2C7.6-7.6%2C7.6h-25.2%20c-13.5%2C0-24.4-10.9-24.4-24.4v0v-25.2C-71%2C341-67.6%2C337.6-63.4%2C337.6L-63.4%2C337.6L-63.4%2C337.6z%20M-180.3%2C454.6c0-4.2%2C3.4-7.6%2C7.6-7.6%20h0h25.2c13.5%2C0%2C24.4%2C10.9%2C24.4%2C24.4l0%2C0v25.2c0%2C4.2-3.4%2C7.6-7.6%2C7.6c-4.2%2C0-7.6-3.4-7.6-7.6c0%2C0%2C0%2C0%2C0%2C0v-25.2%20c0-5.1-4.1-9.3-9.3-9.3h0h-25.2C-176.9%2C462.1-180.3%2C458.8-180.3%2C454.6L-180.3%2C454.6L-180.3%2C454.6z%20M-46.6%2C462.1%20c-5.1%2C0-9.3%2C4.1-9.3%2C9.3v0v25.2c0%2C4.2-3.4%2C7.6-7.6%2C7.6c-4.2%2C0-7.6-3.4-7.6-7.6v-25.2C-71%2C457.9-60%2C447-46.6%2C447l0%2C0h25.2%20c4.2%2C0%2C7.6%2C3.4%2C7.6%2C7.6c0%2C4.2-3.4%2C7.6-7.6%2C7.6H-46.6z%22%2F%3E%3C%2Fsvg%3E";

      var _path$T;

      function _extends$T() {
        _extends$T = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$T.apply(this, arguments);
      }

      const SvgAMoreCircle = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$T({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$T || (_path$T = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-97.068 337.749c-46.049 0-83.141 37.287-83.141 83.141s37.287 83.141 83.141 83.141 83.141-37.287 83.141-83.141-37.189-83.141-83.141-83.141zm-37.189 93.168c-5.452 0-10.028-4.478-10.028-10.027a10.013 10.013 0 0 1 10.028-10.027c5.549 0 9.93 4.478 9.93 10.027 0 5.549-4.478 10.027-9.93 10.027zm37.189 0c-5.452 0-10.028-4.478-10.028-10.027a10.013 10.013 0 0 1 10.028-10.027A10.013 10.013 0 0 1-87.04 420.89c-.097 5.549-4.478 10.027-10.028 10.027zm37.287-.097c-5.452 0-10.028-4.478-10.028-10.027s4.478-10.027 10.028-10.027 10.028 4.478 10.028 10.027c-.195 5.646-4.576 10.027-10.028 10.027z"
      })));

      var aMoreCircle = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-97.068%2C337.749c-46.049%2C0-83.141%2C37.287-83.141%2C83.141s37.287%2C83.141%2C83.141%2C83.141%20s83.141-37.287%2C83.141-83.141S-51.116%2C337.749-97.068%2C337.749z%20M-134.257%2C430.917c-5.452%2C0-10.028-4.478-10.028-10.027%20c0-5.549%2C4.478-10.027%2C10.028-10.027c5.549%2C0%2C9.93%2C4.478%2C9.93%2C10.027C-124.327%2C426.439-128.805%2C430.917-134.257%2C430.917z%20%20M-97.068%2C430.917c-5.452%2C0-10.028-4.478-10.028-10.027c0-5.549%2C4.478-10.027%2C10.028-10.027c5.549%2C0%2C10.028%2C4.478%2C10.028%2C10.027%20C-87.137%2C426.439-91.518%2C430.917-97.068%2C430.917z%20M-59.781%2C430.82c-5.452%2C0-10.028-4.478-10.028-10.027s4.478-10.027%2C10.028-10.027%20s10.028%2C4.478%2C10.028%2C10.027C-49.948%2C426.439-54.329%2C430.82-59.781%2C430.82z%22%2F%3E%3C%2Fsvg%3E";

      var _path$S;

      function _extends$S() {
        _extends$S = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$S.apply(this, arguments);
      }

      const SvgAMoreSquare = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$S({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$S || (_path$S = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-60.844 337.619h-72.213c-28.266 0-47.243 19.776-47.243 49.241v68.018c0 29.365 18.977 49.241 47.243 49.241h72.213c28.266 0 47.143-19.776 47.143-49.241V386.86c-.099-29.465-18.977-49.241-47.143-49.241zm-73.411 93.188c-5.493 0-9.988-4.495-9.988-9.988s4.495-9.988 9.988-9.988 9.988 4.495 9.988 9.988-4.495 9.988-9.988 9.988zm37.255 0c-5.493 0-9.988-4.495-9.988-9.988s4.495-9.988 9.988-9.988 9.988 4.495 9.988 9.988-4.495 9.988-9.988 9.988zm37.255 0c-5.493 0-9.988-4.495-9.988-9.988s4.495-9.988 9.988-9.988 9.988 4.495 9.988 9.988c-.1 5.493-4.495 9.988-9.988 9.988z"
      })));

      var aMoreSquare = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-60.844%2C337.619h-72.213c-28.266%2C0-47.243%2C19.776-47.243%2C49.241v68.018%20c0%2C29.365%2C18.977%2C49.241%2C47.243%2C49.241h72.213c28.266%2C0%2C47.143-19.776%2C47.143-49.241V386.86%20C-13.8%2C357.395-32.678%2C337.619-60.844%2C337.619z%20M-134.255%2C430.807c-5.493%2C0-9.988-4.495-9.988-9.988s4.495-9.988%2C9.988-9.988%20s9.988%2C4.495%2C9.988%2C9.988S-128.762%2C430.807-134.255%2C430.807z%20M-97%2C430.807c-5.493%2C0-9.988-4.495-9.988-9.988%20s4.495-9.988%2C9.988-9.988s9.988%2C4.495%2C9.988%2C9.988S-91.507%2C430.807-97%2C430.807z%20M-59.745%2C430.807c-5.493%2C0-9.988-4.495-9.988-9.988%20s4.495-9.988%2C9.988-9.988s9.988%2C4.495%2C9.988%2C9.988C-49.857%2C426.312-54.252%2C430.807-59.745%2C430.807z%22%2F%3E%3C%2Fsvg%3E";

      var _path$R;

      function _extends$R() {
        _extends$R = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$R.apply(this, arguments);
      }

      const SvgANext = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$R({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.9 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$R || (_path$R = /*#__PURE__*/React__namespace.createElement("path", {
        d: "m-159.2 493.3 116-58.3-.1 57.3c0 6.6 6.1 11.9 13.7 11.9s13.7-5.3 13.7-11.9l.2-71.1.2-.1-.2-.1.2-71.1c0-6.6-6.1-11.9-13.7-11.9s-13.7 5.3-13.7 11.8l-.1 57.3-106.4-53.9c-11.9-6.2-30.4-13.8-30.5 12.5l-.3 118.9c.3 15 12.9 12.2 21 8.7z"
      })));

      var aNext = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.9%20200%20200%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-159.2%2C493.3l116-58.3l-0.1%2C57.3c0%2C6.6%2C6.1%2C11.9%2C13.7%2C11.9c7.6%2C0%2C13.7-5.3%2C13.7-11.9l0.2-71.1l0.2-0.1l-0.2-0.1l0.2-71.1%20c0-6.6-6.1-11.9-13.7-11.9c-7.6%2C0-13.7%2C5.3-13.7%2C11.8l-0.1%2C57.3l-106.4-53.9c-11.9-6.2-30.4-13.8-30.5%2C12.5l-0.3%2C118.9%20C-179.9%2C499.6-167.3%2C496.8-159.2%2C493.3z%22%2F%3E%3C%2Fsvg%3E";

      var _path$Q;

      function _extends$Q() {
        _extends$Q = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$Q.apply(this, arguments);
      }

      const SvgANotification = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$Q({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$Q || (_path$Q = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-41.108 394.193c0 10.467 2.767 16.642 8.858 23.75 4.608 5.233 6.083 11.958 6.083 19.25 0 7.283-2.392 14.2-7.192 19.817a37.81 37.81 0 0 1-24.167 11.775c-13.092 1.117-26.192 2.058-39.467 2.058-13.292 0-26.383-.567-39.475-2.058a37.769 37.769 0 0 1-24.167-11.775 30.133 30.133 0 0 1-7.2-19.817c0-7.292 1.483-14.017 6.083-19.25 6.283-7.117 8.867-13.283 8.867-23.75v-3.55c0-14.017 3.5-23.175 10.692-32.15 10.7-13.083 27.85-20.933 44.825-20.933h.75c17.333 0 35.033 8.225 45.55 21.875 6.833 8.783 9.958 17.567 9.958 31.208l.002 3.55zm-80.275 93.875c0-4.2 3.85-6.117 7.417-6.942 4.167-.883 29.542-.883 33.708 0 3.567.825 7.417 2.75 7.417 6.942-.208 4-2.55 7.533-5.792 9.783a30.296 30.296 0 0 1-14.275 6.092 31.584 31.584 0 0 1-8.4 0 30.144 30.144 0 0 1-14.283-6.1c-3.25-2.241-5.583-5.783-5.792-9.775z"
      })));

      var aNotification = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-41.108%2C394.193c0%2C10.467%2C2.767%2C16.642%2C8.858%2C23.75c4.608%2C5.233%2C6.083%2C11.958%2C6.083%2C19.25%20c0%2C7.283-2.392%2C14.2-7.192%2C19.817c-6.341%2C6.753-14.941%2C10.943-24.167%2C11.775c-13.092%2C1.117-26.192%2C2.058-39.467%2C2.058%20c-13.292%2C0-26.383-0.567-39.475-2.058c-9.227-0.828-17.828-5.019-24.167-11.775c-4.708-5.523-7.265-12.56-7.2-19.817%20c0-7.292%2C1.483-14.017%2C6.083-19.25c6.283-7.117%2C8.867-13.283%2C8.867-23.75v-3.55c0-14.017%2C3.5-23.175%2C10.692-32.15%20c10.7-13.083%2C27.85-20.933%2C44.825-20.933h0.75c17.333%2C0%2C35.033%2C8.225%2C45.55%2C21.875c6.833%2C8.783%2C9.958%2C17.567%2C9.958%2C31.208%20L-41.108%2C394.193L-41.108%2C394.193z%20M-121.383%2C488.068c0-4.2%2C3.85-6.117%2C7.417-6.942c4.167-0.883%2C29.542-0.883%2C33.708%2C0%20c3.567%2C0.825%2C7.417%2C2.75%2C7.417%2C6.942c-0.208%2C4-2.55%2C7.533-5.792%2C9.783c-4.149%2C3.236-9.068%2C5.335-14.275%2C6.092%20c-2.788%2C0.374-5.612%2C0.374-8.4%2C0c-5.212-0.751-10.137-2.854-14.283-6.1C-118.841%2C495.602-121.174%2C492.06-121.383%2C488.068z%22%2F%3E%3C%2Fsvg%3E";

      var _path$P;

      function _extends$P() {
        _extends$P = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$P.apply(this, arguments);
      }

      const SvgAPaperDownload = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$P({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$P || (_path$P = /*#__PURE__*/React__namespace.createElement("path", {
        d: "m-95.725 459.557 23.683-23.917a6.25 6.25 0 0 0-.083-8.833 6.084 6.084 0 0 0-8.603-.064l-.064.064-13.117 13.333v-40.167a6.146 6.146 0 0 0-12.292 0v40.167l-13.117-13.333a6.084 6.084 0 0 0-8.603-.064l-.064.064a6.333 6.333 0 0 0 0 8.833l23.6 23.917a6.4 6.4 0 0 0 4.375 1.833 6.394 6.394 0 0 0 4.292-1.833h-.007zm59.792-63.45c1.942-.025 4.05-.05 5.975-.05 2.142 0 3.792 1.667 3.792 3.75v67c0 20.667-16.667 37.417-37.125 37.417h-65.6c-21.525 0-38.942-17.583-38.942-39.25V375.14c0-20.667 16.583-37.583 37.208-37.583h44.058c2.067 0 3.8 1.75 3.8 3.833v26.833c0 15.25 12.375 27.75 27.558 27.833 3.483 0 6.608.025 9.333.05 2.108.017 3.975.033 5.6.033 1.168.001 2.701-.016 4.343-.032zm2.308-12.167c-6.775.025-14.775 0-20.525-.058-9.125 0-16.642-7.583-16.642-16.808v-21.967c0-3.583 4.317-5.375 6.775-2.783l24.3 25.517 8.925 9.375a3.975 3.975 0 0 1-2.833 6.724z"
      })));

      var aPaperDownload = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-95.725%2C459.557l23.683-23.917c2.414-2.463%2C2.377-6.416-0.083-8.833%20c-2.358-2.393-6.21-2.422-8.603-0.064c-0.021%2C0.021-0.043%2C0.042-0.064%2C0.064l-13.117%2C13.333v-40.167%20c0-3.394-2.752-6.146-6.146-6.146c-3.394%2C0-6.146%2C2.752-6.146%2C6.146v40.167l-13.117-13.333c-2.358-2.393-6.21-2.422-8.603-0.064%20c-0.021%2C0.021-0.043%2C0.042-0.064%2C0.064c-2.392%2C2.459-2.392%2C6.375%2C0%2C8.833l23.6%2C23.917c1.17%2C1.149%2C2.736%2C1.805%2C4.375%2C1.833%20c1.61-0.048%2C3.143-0.703%2C4.292-1.833H-95.725z%20M-35.933%2C396.107c1.942-0.025%2C4.05-0.05%2C5.975-0.05c2.142%2C0%2C3.792%2C1.667%2C3.792%2C3.75%20v67c0%2C20.667-16.667%2C37.417-37.125%2C37.417h-65.6c-21.525%2C0-38.942-17.583-38.942-39.25V375.14c0-20.667%2C16.583-37.583%2C37.208-37.583%20h44.058c2.067%2C0%2C3.8%2C1.75%2C3.8%2C3.833v26.833c0%2C15.25%2C12.375%2C27.75%2C27.558%2C27.833c3.483%2C0%2C6.608%2C0.025%2C9.333%2C0.05%20c2.108%2C0.017%2C3.975%2C0.033%2C5.6%2C0.033C-39.108%2C396.14-37.575%2C396.123-35.933%2C396.107z%20M-33.625%2C383.94%20c-6.775%2C0.025-14.775%2C0-20.525-0.058c-9.125%2C0-16.642-7.583-16.642-16.808v-21.967c0-3.583%2C4.317-5.375%2C6.775-2.783l24.3%2C25.517%20l8.925%2C9.375c1.519%2C1.585%2C1.465%2C4.101-0.12%2C5.62C-31.642%2C383.536-32.613%2C383.931-33.625%2C383.94z%22%2F%3E%3C%2Fsvg%3E";

      var _path$O;

      function _extends$O() {
        _extends$O = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$O.apply(this, arguments);
      }

      const SvgAPaperFail = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$O({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$O || (_path$O = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-79.875 448.057a6.233 6.233 0 0 0 0-8.75l-10.067-10.167 10.067-10.167a6.233 6.233 0 0 0 0-8.75 6.034 6.034 0 0 0-8.75 0l-10.067 10.167-10.067-10.167a5.943 5.943 0 0 0-8.667 0 6.233 6.233 0 0 0 0 8.75l10.067 10.167-10.058 10.167a6.233 6.233 0 0 0 0 8.75c1.15 1.25 2.717 1.833 4.283 1.833s3.217-.583 4.375-1.833l10.067-10.167 10.067 10.167a6.083 6.083 0 0 0 4.375 1.833 6.102 6.102 0 0 0 4.375-1.833zm44-51.95c1.95-.025 4.05-.05 5.917-.05 2.142 0 3.792 1.667 3.792 3.75v67c0 20.667-16.583 37.417-37.125 37.417h-65.6c-21.525 0-38.942-17.583-38.942-39.25V375.14c0-20.667 16.667-37.583 37.208-37.583h44.058c2.067 0 3.8 1.75 3.8 3.833v26.833c0 15.25 12.458 27.75 27.558 27.833 3.483 0 6.608.025 9.333.05 2.108.017 3.975.033 5.6.033 1.184.001 2.734-.016 4.401-.032zm2.25-12.167c-6.775.025-14.767 0-20.517-.058-9.125 0-16.642-7.583-16.642-16.808v-21.967c0-3.583 4.317-5.375 6.775-2.783a60812.425 60812.425 0 0 1 33.225 34.892 3.975 3.975 0 0 1-2.833 6.725l-.008-.001z"
      })));

      var aPaperFail = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-79.875%2C448.057c2.391-2.427%2C2.391-6.323%2C0-8.75l-10.067-10.167l10.067-10.167%20c2.391-2.427%2C2.391-6.323%2C0-8.75c-2.295-2.416-6.113-2.515-8.53-0.22c-0.075%2C0.072-0.149%2C0.145-0.22%2C0.22l-10.067%2C10.167%20l-10.067-10.167c-2.245-2.393-6.005-2.513-8.399-0.268c-0.092%2C0.086-0.182%2C0.176-0.268%2C0.268c-2.391%2C2.427-2.391%2C6.323%2C0%2C8.75%20l10.067%2C10.167l-10.058%2C10.167c-2.391%2C2.427-2.391%2C6.323%2C0%2C8.75c1.15%2C1.25%2C2.717%2C1.833%2C4.283%2C1.833s3.217-0.583%2C4.375-1.833%20l10.067-10.167l10.067%2C10.167c1.15%2C1.178%2C2.729%2C1.839%2C4.375%2C1.833C-82.683%2C449.89-81.117%2C449.307-79.875%2C448.057L-79.875%2C448.057z%20%20M-35.875%2C396.107c1.95-0.025%2C4.05-0.05%2C5.917-0.05c2.142%2C0%2C3.792%2C1.667%2C3.792%2C3.75v67c0%2C20.667-16.583%2C37.417-37.125%2C37.417h-65.6%20c-21.525%2C0-38.942-17.583-38.942-39.25V375.14c0-20.667%2C16.667-37.583%2C37.208-37.583h44.058c2.067%2C0%2C3.8%2C1.75%2C3.8%2C3.833v26.833%20c0%2C15.25%2C12.458%2C27.75%2C27.558%2C27.833c3.483%2C0%2C6.608%2C0.025%2C9.333%2C0.05c2.108%2C0.017%2C3.975%2C0.033%2C5.6%2C0.033%20C-39.092%2C396.14-37.542%2C396.123-35.875%2C396.107L-35.875%2C396.107z%20M-33.625%2C383.94c-6.775%2C0.025-14.767%2C0-20.517-0.058%20c-9.125%2C0-16.642-7.583-16.642-16.808v-21.967c0-3.583%2C4.317-5.375%2C6.775-2.783c11.079%2C11.627%2C22.155%2C23.256%2C33.225%2C34.892%20c1.519%2C1.585%2C1.465%2C4.101-0.12%2C5.62c-0.731%2C0.7-1.701%2C1.095-2.713%2C1.105L-33.625%2C383.94z%22%2F%3E%3C%2Fsvg%3E";

      var _path$N;

      function _extends$N() {
        _extends$N = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$N.apply(this, arguments);
      }

      const SvgAPaperNegative = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$N({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$N || (_path$N = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-125.092 429.53c0 3.417 2.8 6.167 6.183 6.167h40.758a6.208 6.208 0 0 0 0-12.416h-40.75a6.208 6.208 0 0 0-6.191 6.249zm89.25-33.033c1.933-.025 4.042-.05 5.967-.05 2.058 0 3.708 1.667 3.708 3.75v67c0 20.667-16.583 37.417-37.125 37.417h-65.6c-21.442 0-38.942-17.583-38.942-39.25V375.53c0-20.667 16.667-37.583 37.208-37.583h44.058c2.15 0 3.8 1.75 3.8 3.833v26.833c0 15.25 12.458 27.75 27.558 27.833 3.525 0 6.633.025 9.358.05 2.117.017 4 .033 5.658.033 1.167 0 2.692-.017 4.342-.033h.01zm2.259-12.167c-6.783.025-14.775 0-20.525-.058-9.125 0-16.642-7.583-16.642-16.808v-21.967c0-3.583 4.308-5.375 6.775-2.783l16.725 17.567 16.5 17.333a3.975 3.975 0 0 1-2.825 6.725l-.008-.009z"
      })));

      var aPaperNegative = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-125.092%2C429.53c0%2C3.417%2C2.8%2C6.167%2C6.183%2C6.167h40.758c3.429%2C0%2C6.208-2.78%2C6.208-6.208%20s-2.78-6.208-6.208-6.208h-40.75c-3.429%2C0.009-6.201%2C2.796-6.192%2C6.225C-125.092%2C429.513-125.092%2C429.522-125.092%2C429.53z%20%20M-35.842%2C396.497c1.933-0.025%2C4.042-0.05%2C5.967-0.05c2.058%2C0%2C3.708%2C1.667%2C3.708%2C3.75v67c0%2C20.667-16.583%2C37.417-37.125%2C37.417%20h-65.6c-21.442%2C0-38.942-17.583-38.942-39.25V375.53c0-20.667%2C16.667-37.583%2C37.208-37.583h44.058c2.15%2C0%2C3.8%2C1.75%2C3.8%2C3.833v26.833%20c0%2C15.25%2C12.458%2C27.75%2C27.558%2C27.833c3.525%2C0%2C6.633%2C0.025%2C9.358%2C0.05c2.117%2C0.017%2C4%2C0.033%2C5.658%2C0.033%20c1.167%2C0%2C2.692-0.017%2C4.342-0.033H-35.842z%20M-33.583%2C384.33c-6.783%2C0.025-14.775%2C0-20.525-0.058%20c-9.125%2C0-16.642-7.583-16.642-16.808v-21.967c0-3.583%2C4.308-5.375%2C6.775-2.783l16.725%2C17.567l16.5%2C17.333%20c1.519%2C1.585%2C1.465%2C4.101-0.12%2C5.62c-0.729%2C0.698-1.696%2C1.093-2.705%2C1.105L-33.583%2C384.33z%22%2F%3E%3C%2Fsvg%3E";

      var _path$M;

      function _extends$M() {
        _extends$M = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$M.apply(this, arguments);
      }

      const SvgAPaperPlus = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$M({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$M || (_path$M = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-92.417 435.306h14.267a6.208 6.208 0 0 0 0-12.416h-14.267v-14.417c0-3.417-2.717-6.167-6.1-6.167a6.192 6.192 0 0 0-6.192 6.167v14.417h-14.2a6.208 6.208 0 0 0 0 12.416h14.192v14.417c0 3.417 2.808 6.167 6.192 6.167s6.1-2.75 6.1-6.167v-14.417h.008zm56.567-39.2c1.942-.025 4.05-.05 5.967-.05 2.067 0 3.717 1.667 3.717 3.75v67c0 20.667-16.583 37.417-37.125 37.417h-65.6c-21.442 0-38.942-17.583-38.942-39.25V375.14c0-20.667 16.667-37.583 37.208-37.583h44.058c2.15 0 3.8 1.75 3.8 3.833v26.833c0 15.25 12.458 27.75 27.558 27.833 3.525 0 6.633.025 9.358.05 2.117.017 4 .033 5.658.033 1.168 0 2.693-.016 4.343-.033zm2.267-12.167c-6.783.025-14.775 0-20.525-.058-9.125 0-16.642-7.583-16.642-16.808v-21.967c0-3.583 4.308-5.375 6.775-2.783l16.725 17.567 16.5 17.333a3.975 3.975 0 0 1-2.825 6.725l-.008-.009z"
      })));

      var aPaperPlus = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-92.417%2C435.306h14.267c3.429%2C0%2C6.208-2.78%2C6.208-6.208s-2.78-6.208-6.208-6.208h-14.267v-14.417%20c0-3.417-2.717-6.167-6.1-6.167c-3.41%2C0-6.178%2C2.757-6.192%2C6.167v14.417h-14.2c-3.429%2C0-6.208%2C2.78-6.208%2C6.208%20s2.78%2C6.208%2C6.208%2C6.208h14.192v14.417c0%2C3.417%2C2.808%2C6.167%2C6.192%2C6.167s6.1-2.75%2C6.1-6.167v-14.417H-92.417z%20M-35.85%2C396.106%20c1.942-0.025%2C4.05-0.05%2C5.967-0.05c2.067%2C0%2C3.717%2C1.667%2C3.717%2C3.75v67c0%2C20.667-16.583%2C37.417-37.125%2C37.417h-65.6%20c-21.442%2C0-38.942-17.583-38.942-39.25v-89.833c0-20.667%2C16.667-37.583%2C37.208-37.583h44.058c2.15%2C0%2C3.8%2C1.75%2C3.8%2C3.833v26.833%20c0%2C15.25%2C12.458%2C27.75%2C27.558%2C27.833c3.525%2C0%2C6.633%2C0.025%2C9.358%2C0.05c2.117%2C0.017%2C4%2C0.033%2C5.658%2C0.033%20C-39.025%2C396.139-37.5%2C396.123-35.85%2C396.106z%20M-33.583%2C383.939c-6.783%2C0.025-14.775%2C0-20.525-0.058%20c-9.125%2C0-16.642-7.583-16.642-16.808v-21.967c0-3.583%2C4.308-5.375%2C6.775-2.783l16.725%2C17.567l16.5%2C17.333%20c1.519%2C1.585%2C1.465%2C4.101-0.12%2C5.62c-0.729%2C0.698-1.696%2C1.093-2.705%2C1.105L-33.583%2C383.939z%22%2F%3E%3C%2Fsvg%3E";

      var _path$L;

      function _extends$L() {
        _extends$L = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$L.apply(this, arguments);
      }

      const SvgAPaperUpload = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$L({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$L || (_path$L = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-80.792 428.307a6.084 6.084 0 0 0 8.603.064l.064-.064a6.157 6.157 0 0 0 .124-8.708l-.041-.042-23.675-24a6.39 6.39 0 0 0-4.292-1.833 6.4 6.4 0 0 0-4.375 1.833l-23.6 24a6.233 6.233 0 0 0 0 8.75 6.084 6.084 0 0 0 8.603.064l.064-.064 13.117-13.333v40.25a6.146 6.146 0 0 0 12.292 0v-40.25l13.116 13.333zm44.859-32.2c1.942-.025 4.05-.05 5.975-.05 2.058 0 3.792 1.667 3.792 3.75v67c0 20.667-16.667 37.417-37.125 37.417h-65.6c-21.525 0-38.942-17.583-38.942-39.25V375.14c0-20.667 16.583-37.583 37.208-37.583h44.058c2.067 0 3.8 1.75 3.8 3.833v26.833c0 15.25 12.375 27.75 27.558 27.833 3.467 0 6.55.025 9.25.05 2.125.017 4.017.033 5.683.033 1.168.001 2.701-.016 4.343-.032zm2.308-12.167c-6.783.025-14.775 0-20.525-.058-9.125 0-16.642-7.592-16.642-16.808v-21.967c0-3.592 4.308-5.375 6.775-2.783l24.3 25.508 8.925 9.383a3.975 3.975 0 0 1-2.833 6.725z"
      })));

      var aPaperUpload = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-80.792%2C428.307c2.358%2C2.393%2C6.21%2C2.422%2C8.603%2C0.064c0.021-0.021%2C0.043-0.042%2C0.064-0.064%20c2.439-2.37%2C2.495-6.269%2C0.124-8.708c-0.014-0.014-0.027-0.028-0.041-0.042l-23.675-24c-1.148-1.13-2.681-1.785-4.292-1.833%20c-1.639%2C0.028-3.205%2C0.684-4.375%2C1.833l-23.6%2C24c-2.391%2C2.427-2.391%2C6.323%2C0%2C8.75c2.358%2C2.393%2C6.21%2C2.422%2C8.603%2C0.064%20c0.021-0.021%2C0.043-0.042%2C0.064-0.064l13.117-13.333v40.25c0%2C3.394%2C2.752%2C6.146%2C6.146%2C6.146c3.394%2C0%2C6.146-2.752%2C6.146-6.146v-40.25%20L-80.792%2C428.307L-80.792%2C428.307z%20M-35.933%2C396.107c1.942-0.025%2C4.05-0.05%2C5.975-0.05c2.058%2C0%2C3.792%2C1.667%2C3.792%2C3.75v67%20c0%2C20.667-16.667%2C37.417-37.125%2C37.417h-65.6c-21.525%2C0-38.942-17.583-38.942-39.25V375.14c0-20.667%2C16.583-37.583%2C37.208-37.583%20h44.058c2.067%2C0%2C3.8%2C1.75%2C3.8%2C3.833v26.833c0%2C15.25%2C12.375%2C27.75%2C27.558%2C27.833c3.467%2C0%2C6.55%2C0.025%2C9.25%2C0.05%20c2.125%2C0.017%2C4.017%2C0.033%2C5.683%2C0.033C-39.108%2C396.14-37.575%2C396.123-35.933%2C396.107z%20M-33.625%2C383.94%20c-6.783%2C0.025-14.775%2C0-20.525-0.058c-9.125%2C0-16.642-7.592-16.642-16.808v-21.967c0-3.592%2C4.308-5.375%2C6.775-2.783l24.3%2C25.508%20l8.925%2C9.383c1.519%2C1.585%2C1.465%2C4.101-0.12%2C5.62C-31.642%2C383.536-32.613%2C383.931-33.625%2C383.94z%22%2F%3E%3C%2Fsvg%3E";

      var _path$K;

      function _extends$K() {
        _extends$K = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$K.apply(this, arguments);
      }

      const SvgAPaper = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$K({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$K || (_path$K = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-122.617 457.473h44.883c3.383 0 6.192-2.833 6.192-6.25s-2.808-6.167-6.192-6.167h-44.883a6.192 6.192 0 0 0-6.192 6.167c.001 3.416 2.809 6.25 6.192 6.25zm27.884-54.084h-27.883a6.267 6.267 0 0 0-6.192 6.25c0 3.417 2.808 6.167 6.192 6.167h27.883c3.383 0 6.192-2.75 6.192-6.167-.001-3.416-2.809-6.25-6.192-6.25zm58.883-7.283c1.942-.025 4.05-.05 5.967-.05 2.067 0 3.717 1.667 3.717 3.75v67c0 20.667-16.583 37.417-37.042 37.417h-65.683c-21.442 0-38.942-17.583-38.942-39.25V375.14c0-20.667 16.667-37.583 37.208-37.583h44.058c2.15 0 3.8 1.75 3.8 3.833v26.833c0 15.25 12.458 27.75 27.558 27.833 3.525 0 6.633.025 9.358.05 2.117.017 4 .033 5.658.033 1.168 0 2.693-.016 4.343-.033zm2.275-12.167c-6.783.025-14.775 0-20.525-.058-9.125 0-16.642-7.592-16.642-16.808v-21.967c0-3.592 4.317-5.375 6.783-2.783l16.708 17.55 16.5 17.342a3.975 3.975 0 0 1-2.824 6.724z"
      })));

      var aPaper = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-122.617%2C457.473h44.883c3.383%2C0%2C6.192-2.833%2C6.192-6.25c0-3.417-2.808-6.167-6.192-6.167h-44.883%20c-3.41%2C0-6.178%2C2.757-6.192%2C6.167C-128.808%2C454.639-126%2C457.473-122.617%2C457.473z%20M-94.733%2C403.389h-27.883%20c-3.425%2C0.041-6.183%2C2.825-6.192%2C6.25c0%2C3.417%2C2.808%2C6.167%2C6.192%2C6.167h27.883c3.383%2C0%2C6.192-2.75%2C6.192-6.167%20C-88.542%2C406.223-91.35%2C403.389-94.733%2C403.389z%20M-35.85%2C396.106c1.942-0.025%2C4.05-0.05%2C5.967-0.05c2.067%2C0%2C3.717%2C1.667%2C3.717%2C3.75%20v67c0%2C20.667-16.583%2C37.417-37.042%2C37.417h-65.683c-21.442%2C0-38.942-17.583-38.942-39.25v-89.833%20c0-20.667%2C16.667-37.583%2C37.208-37.583h44.058c2.15%2C0%2C3.8%2C1.75%2C3.8%2C3.833v26.833c0%2C15.25%2C12.458%2C27.75%2C27.558%2C27.833%20c3.525%2C0%2C6.633%2C0.025%2C9.358%2C0.05c2.117%2C0.017%2C4%2C0.033%2C5.658%2C0.033C-39.025%2C396.139-37.5%2C396.123-35.85%2C396.106L-35.85%2C396.106z%20%20M-33.575%2C383.939c-6.783%2C0.025-14.775%2C0-20.525-0.058c-9.125%2C0-16.642-7.592-16.642-16.808v-21.967%20c0-3.592%2C4.317-5.375%2C6.783-2.783l16.708%2C17.55l16.5%2C17.342c1.519%2C1.585%2C1.465%2C4.101-0.12%2C5.62%20C-31.598%2C383.533-32.566%2C383.928-33.575%2C383.939L-33.575%2C383.939z%22%2F%3E%3C%2Fsvg%3E";

      var _path$J;

      function _extends$J() {
        _extends$J = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$J.apply(this, arguments);
      }

      const SvgAPassword = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$J({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$J || (_path$J = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-55.25 442.564a6.25 6.25 0 0 0 6.25-6.25v-15.425a6.25 6.25 0 0 0-6.25-6.25h-47.417a21.634 21.634 0 0 0-20.667-15.417c-11.962.014-21.657 9.705-21.675 21.667.009 11.965 9.702 21.665 21.667 21.683a21.632 21.632 0 0 0 20.658-15.433h17.6v9.183a6.25 6.25 0 1 0 12.5 0v-9.183H-61.5v9.183c0 3.45 2.8 6.25 6.25 6.25v-.008zm-77.858-105.008h72.242c28.225 0 47.2 19.808 47.2 49.3v68.058c0 29.5-18.975 49.308-47.217 49.308h-72.233c-28.25 0-47.217-19.817-47.217-49.308v-68.058c0-29.492 18.975-49.3 47.217-49.3h.008zm.6 83.333c0-5.067 4.125-9.183 9.183-9.183s9.183 4.117 9.183 9.183a9.192 9.192 0 0 1-18.366 0z"
      })));

      var aPassword = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-55.25%2C442.564c3.452%2C0%2C6.25-2.798%2C6.25-6.25v-15.425c0-3.452-2.798-6.25-6.25-6.25h-47.417%20c-2.74-9.131-11.133-15.393-20.667-15.417c-11.962%2C0.014-21.657%2C9.705-21.675%2C21.667c0.009%2C11.965%2C9.702%2C21.665%2C21.667%2C21.683%20c9.535-0.03%2C17.926-6.298%2C20.658-15.433h17.6v9.183c0%2C3.452%2C2.798%2C6.25%2C6.25%2C6.25c3.452%2C0%2C6.25-2.798%2C6.25-6.25v-9.183H-61.5v9.183%20c0%2C3.45%2C2.8%2C6.25%2C6.25%2C6.25L-55.25%2C442.564z%20M-133.108%2C337.556h72.242c28.225%2C0%2C47.2%2C19.808%2C47.2%2C49.3v68.058%20c0%2C29.5-18.975%2C49.308-47.217%2C49.308h-72.233c-28.25%2C0-47.217-19.817-47.217-49.308v-68.058c0-29.492%2C18.975-49.3%2C47.217-49.3%20H-133.108z%20M-132.508%2C420.889c0-5.067%2C4.125-9.183%2C9.183-9.183s9.183%2C4.117%2C9.183%2C9.183c-0.216%2C5.072-4.503%2C9.008-9.575%2C8.792%20C-128.485%2C429.478-132.305%2C425.658-132.508%2C420.889z%22%2F%3E%3C%2Fsvg%3E";

      var _path$I;

      function _extends$I() {
        _extends$I = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$I.apply(this, arguments);
      }

      const SvgAPause = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$I({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.9 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$I || (_path$I = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-152.5 504.2c-9.2 0-13.7-7.5-13.7-16.7V354.3c0-9.2 4.5-16.7 13.7-16.7s13.7 7.5 13.7 16.7v133.3c0 9.2-4.5 16.6-13.7 16.6zm111 0c-9.2 0-13.7-7.5-13.7-16.7V354.3c0-9.2 4.5-16.7 13.7-16.7s13.7 7.5 13.7 16.7v133.3c.1 9.2-4.5 16.6-13.7 16.6z"
      })));

      var aPause = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.9%20200%20200%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-152.5%2C504.2c-9.2%2C0-13.7-7.5-13.7-16.7V354.3c0-9.2%2C4.5-16.7%2C13.7-16.7c9.2%2C0%2C13.7%2C7.5%2C13.7%2C16.7v133.3%20C-138.8%2C496.8-143.3%2C504.2-152.5%2C504.2z%20M-41.5%2C504.2c-9.2%2C0-13.7-7.5-13.7-16.7V354.3c0-9.2%2C4.5-16.7%2C13.7-16.7s13.7%2C7.5%2C13.7%2C16.7%20v133.3C-27.7%2C496.8-32.3%2C504.2-41.5%2C504.2z%22%2F%3E%3C%2Fsvg%3E";

      var _path$H;

      function _extends$H() {
        _extends$H = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$H.apply(this, arguments);
      }

      const SvgAPlay = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$H({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$H || (_path$H = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-180.333 420.94c0-46 37.4-83.383 83.333-83.383s83.333 37.383 83.333 83.383c0 45.9-37.4 83.283-83.333 83.283s-83.333-37.383-83.333-83.283zm113.9 8.433c.883-.883 2.008-2.25 2.25-2.575 1.292-1.683 1.933-3.775 1.933-5.858 0-2.342-.725-4.517-2.092-6.283a30.051 30.051 0 0 1-.617-.667c-.533-.575-1.308-1.417-2.042-2.142-6.592-7.083-23.808-18.658-32.817-22.192-1.367-.558-4.825-1.767-6.675-1.85-1.767 0-3.458.4-5.067 1.208a10.418 10.418 0 0 0-4.5 4.983c-.567 1.442-1.45 5.783-1.45 5.867-.892 4.75-1.367 12.458-1.367 20.983 0 8.133.475 15.517 1.2 20.342.025.017.092.367.2.9.333 1.633 1 5.025 1.733 6.417 1.767 3.375 5.225 5.467 8.925 5.467h.325c2.417-.083 7.483-2.167 7.483-2.25 8.525-3.542 25.333-14.55 32.092-21.867l.486-.483z"
      })));

      var aPlay = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-180.333%2C420.94c0-46%2C37.4-83.383%2C83.333-83.383s83.333%2C37.383%2C83.333%2C83.383%20c0%2C45.9-37.4%2C83.283-83.333%2C83.283S-180.333%2C466.84-180.333%2C420.94z%20M-66.433%2C429.373c0.883-0.883%2C2.008-2.25%2C2.25-2.575%20c1.292-1.683%2C1.933-3.775%2C1.933-5.858c0-2.342-0.725-4.517-2.092-6.283c-0.209-0.219-0.414-0.441-0.617-0.667%20c-0.533-0.575-1.308-1.417-2.042-2.142c-6.592-7.083-23.808-18.658-32.817-22.192c-1.367-0.558-4.825-1.767-6.675-1.85%20c-1.767%2C0-3.458%2C0.4-5.067%2C1.208c-2.009%2C1.119-3.591%2C2.871-4.5%2C4.983c-0.567%2C1.442-1.45%2C5.783-1.45%2C5.867%20c-0.892%2C4.75-1.367%2C12.458-1.367%2C20.983c0%2C8.133%2C0.475%2C15.517%2C1.2%2C20.342c0.025%2C0.017%2C0.092%2C0.367%2C0.2%2C0.9%20c0.333%2C1.633%2C1%2C5.025%2C1.733%2C6.417c1.767%2C3.375%2C5.225%2C5.467%2C8.925%2C5.467h0.325c2.417-0.083%2C7.483-2.167%2C7.483-2.25%20c8.525-3.542%2C25.333-14.55%2C32.092-21.867L-66.433%2C429.373L-66.433%2C429.373z%22%2F%3E%3C%2Fsvg%3E";

      var _path$G;

      function _extends$G() {
        _extends$G = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$G.apply(this, arguments);
      }

      const SvgAPlay2 = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$G({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.9 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$G || (_path$G = /*#__PURE__*/React__namespace.createElement("path", {
        d: "m-163.8 354.4.1-2c1.1-9.2 9.4-15.7 18.6-14.6 2.2.3 4.4 1 6.4 2.1l.6.3L-37 407.6c7.6 5.6 9.2 16.2 3.6 23.8-1.1 1.5-2.4 2.8-3.9 3.8L-137.8 502c-2.7 1.8-5.8 2.9-9.2 2.7-9.2-.3-16.7-7.5-16.7-16.7l-.1-133.6z"
      })));

      var aPlay2 = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.9%20200%20200%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-163.8%2C354.4l0.1-2c1.1-9.2%2C9.4-15.7%2C18.6-14.6c2.2%2C0.3%2C4.4%2C1%2C6.4%2C2.1l0.6%2C0.3l101.1%2C67.4c7.6%2C5.6%2C9.2%2C16.2%2C3.6%2C23.8%20c-1.1%2C1.5-2.4%2C2.8-3.9%2C3.8l-100.5%2C66.8c-2.7%2C1.8-5.8%2C2.9-9.2%2C2.7c-9.2-0.3-16.7-7.5-16.7-16.7L-163.8%2C354.4L-163.8%2C354.4z%22%2F%3E%3C%2Fsvg%3E";

      var _path$F;

      function _extends$F() {
        _extends$F = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$F.apply(this, arguments);
      }

      const SvgAPlus = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$F({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$F || (_path$F = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-135.917 337.557h77.75c28.333 0 44.5 16 44.5 44.417v77.833c0 28.25-16.083 44.417-44.417 44.417h-77.833c-28.417 0-44.417-16.167-44.417-44.417v-77.833c.001-28.417 16.001-44.417 44.417-44.417zm45.75 90.25H-66.5c3.833-.083 6.917-3.167 6.917-7a6.9 6.9 0 0 0-6.917-6.917h-23.667v-23.5a6.9 6.9 0 0 0-6.917-6.917 6.9 6.9 0 0 0-6.917 6.917v23.5h-23.583c-1.833 0-3.583.75-4.917 2a7.217 7.217 0 0 0-2 4.917c0 3.833 3.083 6.917 6.917 7H-104v23.583c0 3.833 3.083 6.917 6.917 6.917s6.917-3.083 6.917-6.917v-23.583z"
      })));

      var aPlus = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-135.917%2C337.557h77.75c28.333%2C0%2C44.5%2C16%2C44.5%2C44.417v77.833c0%2C28.25-16.083%2C44.417-44.417%2C44.417%20h-77.833c-28.417%2C0-44.417-16.167-44.417-44.417v-77.833C-180.333%2C353.557-164.333%2C337.557-135.917%2C337.557z%20M-90.167%2C427.807H-66.5%20c3.833-0.083%2C6.917-3.167%2C6.917-7c0-3.833-3.083-6.917-6.917-6.917h-23.667v-23.5c0-3.833-3.083-6.917-6.917-6.917%20c-3.833%2C0-6.917%2C3.083-6.917%2C6.917v23.5h-23.583c-1.833%2C0-3.583%2C0.75-4.917%2C2c-1.267%2C1.325-1.982%2C3.083-2%2C4.917%20c0%2C3.833%2C3.083%2C6.917%2C6.917%2C7H-104v23.583c0%2C3.833%2C3.083%2C6.917%2C6.917%2C6.917s6.917-3.083%2C6.917-6.917V427.807z%22%2F%3E%3C%2Fsvg%3E";

      var _path$E;

      function _extends$E() {
        _extends$E = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$E.apply(this, arguments);
      }

      const SvgAPrev = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$E({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.9 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$E || (_path$E = /*#__PURE__*/React__namespace.createElement("path", {
        d: "m-36.1 493.3-116.5-58.5.1 57.5c0 6.6-6.1 11.9-13.7 11.9s-13.8-5.3-13.8-11.9l-.2-71.4-.2-.1.2-.1-.2-71.4c0-6.6 6.1-11.9 13.7-11.9s13.8 5.3 13.8 11.9l.1 57.5 106.9-54.2c11.9-6.3 30.6-13.8 30.6 12.6l.3 119.4c-.3 15-13 12.2-21.1 8.7z"
      })));

      var aPrev = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.9%20200%20200%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-36.1%2C493.3l-116.5-58.5l0.1%2C57.5c0%2C6.6-6.1%2C11.9-13.7%2C11.9c-7.6%2C0-13.8-5.3-13.8-11.9l-0.2-71.4l-0.2-0.1l0.2-0.1%20l-0.2-71.4c0-6.6%2C6.1-11.9%2C13.7-11.9c7.6%2C0%2C13.8%2C5.3%2C13.8%2C11.9l0.1%2C57.5l106.9-54.2c11.9-6.3%2C30.6-13.8%2C30.6%2C12.6l0.3%2C119.4%20C-15.3%2C499.6-28%2C496.8-36.1%2C493.3L-36.1%2C493.3z%22%2F%3E%3C%2Fsvg%3E";

      var _path$D;

      function _extends$D() {
        _extends$D = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$D.apply(this, arguments);
      }

      const SvgAProfile = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$D({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$D || (_path$D = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-52.883 381.649c.083 24.273-19.527 44.017-43.799 44.1h-.317c-24.277.088-44.029-19.522-44.117-43.799v-.301c-.078-24.273 19.535-44.013 43.808-44.092h.309c24.268-.097 44.02 19.498 44.117 43.766l-.001.326zM-97 504.224c-36.15 0-66.667-5.875-66.667-28.542 0-22.675 30.708-28.342 66.667-28.342 36.158 0 66.667 5.875 66.667 28.542 0 22.675-30.709 28.342-66.667 28.342z"
      })));

      var aProfile = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-52.883%2C381.649c0.083%2C24.273-19.527%2C44.017-43.799%2C44.1c-0.106%2C0-0.211%2C0-0.317%2C0%20c-24.277%2C0.088-44.029-19.522-44.117-43.799c0-0.1%2C0-0.2%2C0-0.301c-0.078-24.273%2C19.535-44.013%2C43.808-44.092%20c0.103%2C0%2C0.206%2C0%2C0.309%2C0c24.268-0.097%2C44.02%2C19.498%2C44.117%2C43.766C-52.883%2C381.432-52.883%2C381.54-52.883%2C381.649z%20M-97%2C504.224%20c-36.15%2C0-66.667-5.875-66.667-28.542c0-22.675%2C30.708-28.342%2C66.667-28.342c36.158%2C0%2C66.667%2C5.875%2C66.667%2C28.542%20C-30.333%2C498.557-61.042%2C504.224-97%2C504.224z%22%2F%3E%3C%2Fsvg%3E";

      var _path$C;

      function _extends$C() {
        _extends$C = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$C.apply(this, arguments);
      }

      const SvgAPtzCtrl = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$C({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.9 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$C || (_path$C = /*#__PURE__*/React__namespace.createElement("path", {
        d: "m-83.7 412.4 12.7 3.7-21 71.5-12.7-3.7 21-71.5zm-8.2 78.5c-.3 0-.6 0-.9-.1l-12.7-3.7c-1.8-.5-2.8-2.4-2.3-4.1l20.8-71.5c.5-1.8 2.4-2.8 4.1-2.3l12.7 3.7c1.8.5 2.8 2.4 2.3 4.1l-20.8 71.5c-.5 1.4-1.8 2.4-3.2 2.4zm-8.6-9.3 6.3 1.8 19-65.1-6.3-1.8-19 65.1zm33.6-62.5c-3.7 0-7.5-.5-11.3-1.6-21.3-6.2-33.6-28.7-27.4-50 3-10.3 9.9-18.9 19.3-24.1 9.4-5.2 20.3-6.4 30.6-3.3 21.3 6.2 33.6 28.7 27.4 50-5.1 17.6-21.2 29-38.6 29zm-.1-74c-5.6 0-11.1 1.4-16.1 4.2-7.9 4.3-13.6 11.5-16.1 20.1-5.2 17.8 5.1 36.6 22.9 41.8 17.8 5.2 36.5-5.1 41.7-22.9 5.2-17.8-5.1-36.6-22.9-41.8-3.1-.9-6.3-1.4-9.5-1.4zm35.5 44.1zm13.6 115H-177c-1.8 0-3.3-1.5-3.3-3.3 0-1.8 1.5-3.3 3.3-3.3h159.1c1.8 0 3.3 1.5 3.3 3.3 0 1.8-1.5 3.3-3.3 3.3zm-45-26.5H-132c-12.8 0-23.2 10.4-23.2 23.2h115.6c-.1-12.8-10.5-23.2-23.3-23.2zm23.2 26.5h-115.6c-1.8 0-3.3-1.5-3.3-3.3 0-14.9 11.8-26.6 26.9-26.6h68.2c15.2 0 27 11.7 27 26.6.1 1.8-1.3 3.3-3.2 3.3zm-112-6.6h108.4c-1.6-9.5-9.9-16.6-20.1-16.6h-68.2c-10.3 0-18.5 7.1-20.1 16.6z"
      })));

      var aPTZCtrl = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.9%20200%20200%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-83.7%2C412.4l12.7%2C3.7L-92%2C487.6l-12.7-3.7L-83.7%2C412.4z%20M-91.9%2C490.9c-0.3%2C0-0.6%2C0-0.9-0.1l-12.7-3.7%20c-1.8-0.5-2.8-2.4-2.3-4.1l20.8-71.5c0.5-1.8%2C2.4-2.8%2C4.1-2.3l12.7%2C3.7c1.8%2C0.5%2C2.8%2C2.4%2C2.3%2C4.1l0%2C0l-20.8%2C71.5%20C-89.2%2C489.9-90.5%2C490.9-91.9%2C490.9L-91.9%2C490.9z%20M-100.5%2C481.6l6.3%2C1.8l19-65.1l-6.3-1.8L-100.5%2C481.6L-100.5%2C481.6z%20M-66.9%2C419.1%20c-3.7%2C0-7.5-0.5-11.3-1.6c-21.3-6.2-33.6-28.7-27.4-50c3-10.3%2C9.9-18.9%2C19.3-24.1c9.4-5.2%2C20.3-6.4%2C30.6-3.3%20c21.3%2C6.2%2C33.6%2C28.7%2C27.4%2C50C-33.4%2C407.7-49.5%2C419.1-66.9%2C419.1z%20M-67%2C345.1c-5.6%2C0-11.1%2C1.4-16.1%2C4.2c-7.9%2C4.3-13.6%2C11.5-16.1%2C20.1%20c-5.2%2C17.8%2C5.1%2C36.6%2C22.9%2C41.8c17.8%2C5.2%2C36.5-5.1%2C41.7-22.9c5.2-17.8-5.1-36.6-22.9-41.8C-60.6%2C345.6-63.8%2C345.1-67%2C345.1z%20%20M-31.5%2C389.2L-31.5%2C389.2L-31.5%2C389.2z%20M-17.9%2C504.2H-177c-1.8%2C0-3.3-1.5-3.3-3.3c0-1.8%2C1.5-3.3%2C3.3-3.3h159.1%20c1.8%2C0%2C3.3%2C1.5%2C3.3%2C3.3C-14.6%2C502.7-16.1%2C504.2-17.9%2C504.2L-17.9%2C504.2z%20M-62.9%2C477.7H-132c-12.8%2C0-23.2%2C10.4-23.2%2C23.2v0h115.6v0%20C-39.7%2C488.1-50.1%2C477.7-62.9%2C477.7L-62.9%2C477.7z%20M-39.7%2C504.2h-115.6c-1.8%2C0-3.3-1.5-3.3-3.3c0-14.9%2C11.8-26.6%2C26.9-26.6h68.2%20c15.2%2C0%2C27%2C11.7%2C27%2C26.6C-36.4%2C502.7-37.8%2C504.2-39.7%2C504.2z%20M-151.7%2C497.6h108.4c-1.6-9.5-9.9-16.6-20.1-16.6h-68.2%20C-141.9%2C481-150.1%2C488.1-151.7%2C497.6z%22%2F%3E%3C%2Fsvg%3E";

      var _path$B;

      function _extends$B() {
        _extends$B = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$B.apply(this, arguments);
      }

      const SvgARadio = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$B({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.9 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$B || (_path$B = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-180.3 421.1c0-45.9 37.3-83.2 83.2-83.2 46 0 83.2 37.3 83.2 83.2s-37.2 83.2-83.2 83.2c-46-.1-83.2-37.3-83.2-83.2zm75.8-31.5c0-4 3.3-7.3 7.3-7.3s7.2 3.3 7.2 7.3v36.8c0 4-3.2 7.2-7.2 7.2s-7.3-3.2-7.3-7.2v-36.8zm7.4 70.4c-4.1 0-7.3-3.3-7.3-7.3s3.2-7.2 7.2-7.2c4.1 0 7.3 3.2 7.3 7.2s-3.2 7.3-7.2 7.3z"
      })));

      var aRadio = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.9%20200%20200%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-180.3%2C421.1c0-45.9%2C37.3-83.2%2C83.2-83.2c46%2C0%2C83.2%2C37.3%2C83.2%2C83.2s-37.2%2C83.2-83.2%2C83.2%20C-143.1%2C504.2-180.3%2C467-180.3%2C421.1z%20M-104.5%2C389.6c0-4%2C3.3-7.3%2C7.3-7.3c4%2C0%2C7.2%2C3.3%2C7.2%2C7.3v36.8c0%2C4-3.2%2C7.2-7.2%2C7.2%20c-4%2C0-7.3-3.2-7.3-7.2V389.6z%20M-97.1%2C460c-4.1%2C0-7.3-3.3-7.3-7.3c0-4%2C3.2-7.2%2C7.2-7.2c4.1%2C0%2C7.3%2C3.2%2C7.3%2C7.2%20C-89.9%2C456.7-93.1%2C460-97.1%2C460L-97.1%2C460z%22%2F%3E%3C%2Fsvg%3E";

      var _path$A;

      function _extends$A() {
        _extends$A = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$A.apply(this, arguments);
      }

      const SvgAScan = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$A({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$A || (_path$A = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-126.762 345.889c3.5 0 6.333 2.783 6.333 6.225 0 3.433-2.833 6.217-6.333 6.217l-13.583.008c-11.258.017-20.425 9.017-20.425 20.075v15.492a6.3 6.3 0 0 1-6.35 6.225 6.292 6.292 0 0 1-6.342-6.225v-15.5c0-17.908 14.858-32.5 33.117-32.508l13.575-.008h.008zm59.766 0h13.275c18.308 0 33.192 14.6 33.192 32.55v15.467c0 3.433-2.833 6.233-6.342 6.233a6.292 6.292 0 0 1-6.342-6.233v-15.467c0-11.083-9.2-20.108-20.508-20.108h-13.275a6.275 6.275 0 0 1-6.342-6.208c0-3.442 2.833-6.234 6.333-6.234h.009zm-6.992 31.192h-46.025c-10.525.1-19 8.542-18.9 18.883v10.375a2.317 2.317 0 0 0 2.25 2.242h79.333a2.333 2.333 0 0 0 2.267-2.242v-10.367a18.881 18.881 0 0 0-5.5-13.358 18.934 18.934 0 0 0-13.417-5.525l-.008-.008zm-108.333 44.15h170.642c3.5 0 6.342 2.792 6.342 6.233a6.275 6.275 0 0 1-6.341 6.208h-8.85v29.667c0 17.958-14.892 32.55-33.192 32.55h-13.275a6.292 6.292 0 0 1-6.35-6.225c0-3.433 2.842-6.225 6.35-6.225h13.275c11.308 0 20.508-9.008 20.508-20.108v-29.667H-55.07v8.267c.083 10.333-8.375 18.783-18.917 18.883h-46.025c-10.533-.1-18.992-8.542-18.908-18.883v-8.258h-21.858v29.692c0 11.058 9.175 20.058 20.45 20.075h13.567c3.5 0 6.342 2.792 6.342 6.225a6.292 6.292 0 0 1-6.35 6.225l-13.575-.008c-18.258-.017-33.125-14.6-33.125-32.517v-29.692h-8.842a6.283 6.283 0 0 1-6.35-6.208c0-3.442 2.85-6.233 6.35-6.233l-.01-.001z"
      })));

      var aScan = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-126.762%2C345.889c3.5%2C0%2C6.333%2C2.783%2C6.333%2C6.225c0%2C3.433-2.833%2C6.217-6.333%2C6.217l-13.583%2C0.008%20c-11.258%2C0.017-20.425%2C9.017-20.425%2C20.075v15.492c-0.041%2C3.47-2.88%2C6.253-6.35%2C6.225c-3.468%2C0.028-6.305-2.757-6.342-6.225v-15.5%20c0-17.908%2C14.858-32.5%2C33.117-32.508l13.575-0.008H-126.762z%20M-66.996%2C345.889h13.275c18.308%2C0%2C33.192%2C14.6%2C33.192%2C32.55v15.467%20c0%2C3.433-2.833%2C6.233-6.342%2C6.233c-3.472%2C0.028-6.31-2.762-6.342-6.233v-15.467c0-11.083-9.2-20.108-20.508-20.108h-13.275%20c-3.465%2C0.037-6.305-2.742-6.342-6.208c0%2C0%2C0%2C0%2C0%2C0c0-3.442%2C2.833-6.234%2C6.333-6.234H-66.996z%20M-73.988%2C377.081h-46.025%20c-10.525%2C0.1-19%2C8.542-18.9%2C18.883v10.375c0.039%2C1.225%2C1.025%2C2.207%2C2.25%2C2.242h79.333c1.228-0.034%2C2.219-1.014%2C2.267-2.242v-10.367%20c0.01-5.006-1.969-9.811-5.5-13.358c-3.561-3.55-8.388-5.538-13.417-5.525L-73.988%2C377.081z%20M-182.321%2C421.231h170.642%20c3.5%2C0%2C6.342%2C2.792%2C6.342%2C6.233c-0.037%2C3.465-2.876%2C6.245-6.341%2C6.208c0%2C0%2C0%2C0%2C0%2C0h-8.85v29.667c0%2C17.958-14.892%2C32.55-33.192%2C32.55%20h-13.275c-3.472%2C0.032-6.313-2.753-6.35-6.225c0-3.433%2C2.842-6.225%2C6.35-6.225h13.275c11.308%2C0%2C20.508-9.008%2C20.508-20.108v-29.667%20h-21.858v8.267c0.083%2C10.333-8.375%2C18.783-18.917%2C18.883h-46.025c-10.533-0.1-18.992-8.542-18.908-18.883v-8.258h-21.858v29.692%20c0%2C11.058%2C9.175%2C20.058%2C20.45%2C20.075h13.567c3.5%2C0%2C6.342%2C2.792%2C6.342%2C6.225c-0.037%2C3.472-2.878%2C6.257-6.35%2C6.225l-13.575-0.008%20c-18.258-0.017-33.125-14.6-33.125-32.517v-29.692h-8.842c-3.467%2C0.037-6.309-2.741-6.35-6.208c0-3.442%2C2.85-6.233%2C6.35-6.233%20L-182.321%2C421.231z%22%2F%3E%3C%2Fsvg%3E";

      var _path$z;

      function _extends$z() {
        _extends$z = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$z.apply(this, arguments);
      }

      const SvgAScreenSharing = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$z({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.9 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$z || (_path$z = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-37.2 468.6h-119.3c-13.3-.3-23.9-11.2-23.9-24.5v-71c0-13.2 10.7-23.9 23.9-23.9h119.3c13.2 0 23.9 10.7 23.9 23.9v71c0 13.3-10.6 24.2-23.9 24.5zm-95.4 11.9H-61c3.3 0 6 2.7 6 6s-2.7 6-6 6h-71.6c-3.3 0-6-2.7-6-6s2.7-6 6-6z"
      })));

      var aScreenSharing = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3Csvg%20version%3D%221.1%22%20id%3D%22%E5%9B%BE%E5%B1%82_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%20%20viewBox%3D%22-197%20320.9%20200%20200%22%20enable-background%3D%22new%20-197%20320.9%20200%20200%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-37.2%2C468.6h-119.3c-13.3-0.3-23.9-11.2-23.9-24.5v-71c0-13.2%2C10.7-23.9%2C23.9-23.9h119.3c13.2%2C0%2C23.9%2C10.7%2C23.9%2C23.9v71%20C-13.3%2C457.4-23.9%2C468.3-37.2%2C468.6L-37.2%2C468.6z%20M-132.6%2C480.5H-61c3.3%2C0%2C6%2C2.7%2C6%2C6c0%2C3.3-2.7%2C6-6%2C6h-71.6c-3.3%2C0-6-2.7-6-6%20C-138.6%2C483.2-135.9%2C480.5-132.6%2C480.5L-132.6%2C480.5z%22%2F%3E%3C%2Fsvg%3E";

      var _path$y;

      function _extends$y() {
        _extends$y = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$y.apply(this, arguments);
      }

      const SvgAScreenshot = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$y({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.9 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$y || (_path$y = /*#__PURE__*/React__namespace.createElement("path", {
        d: "m-109.1 406.3-43.5-57.1c-2.3-2.9-1.8-7.1 1-9.6 2.8-2.4 6.9-2.1 9.3.7l45.4 52.1 45.4-52.1c2.4-2.8 6.5-3 9.3-.7 2.8 2.4 3.3 6.6 1 9.6l-43.5 57.1 27 31.1c15.1-5.5 31.9.7 39.9 14.6s4.8 31.6-7.7 41.8-30.4 10-42.5-.5c-12.2-10.5-15-28.2-6.7-42-.3-.3-.5-.6-.7-.8L-97 422.2l-12.1-15.9zm-8.9 10.2 12.7 16.6-13.3 17.4c-.3.3-.4.6-.7.8 8.3 13.8 5.5 31.4-6.7 42s-30.1 10.7-42.5.5c-12.4-10.2-15.6-27.9-7.7-41.8 8-13.9 24.9-20.1 39.9-14.6l18.3-20.9zm-27.4 71.5c7.2-.6 13.4-5 16.3-11.5 2.9-6.5 2.2-14.1-2.1-19.9-4.3-5.8-11.3-8.8-18.3-7.9-10.7 1.3-18.3 11-17.2 21.7 1.1 10.7 10.5 18.6 21.3 17.6zm96.8 0c7.1.9 14.1-2.2 18.3-7.9s5-13.3 2.1-19.8-9.2-10.9-16.3-11.5c-10.8-.9-20.3 6.9-21.4 17.6-1.1 10.6 6.6 20.3 17.3 21.6z"
      })));

      var aScreenshot = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3Csvg%20version%3D%221.1%22%20id%3D%22%E5%9B%BE%E5%B1%82_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%20%20viewBox%3D%22-197%20320.9%20200%20200%22%20enable-background%3D%22new%20-197%20320.9%20200%20200%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-109.1%2C406.3l-43.5-57.1c-2.3-2.9-1.8-7.1%2C1-9.6c2.8-2.4%2C6.9-2.1%2C9.3%2C0.7l45.4%2C52.1l45.4-52.1c2.4-2.8%2C6.5-3%2C9.3-0.7%20c2.8%2C2.4%2C3.3%2C6.6%2C1%2C9.6l-43.5%2C57.1l27%2C31.1c15.1-5.5%2C31.9%2C0.7%2C39.9%2C14.6s4.8%2C31.6-7.7%2C41.8s-30.4%2C10-42.5-0.5%20c-12.2-10.5-15-28.2-6.7-42c-0.3-0.3-0.5-0.6-0.7-0.8L-97%2C422.2L-109.1%2C406.3z%20M-118%2C416.5l12.7%2C16.6l-13.3%2C17.4%20c-0.3%2C0.3-0.4%2C0.6-0.7%2C0.8c8.3%2C13.8%2C5.5%2C31.4-6.7%2C42s-30.1%2C10.7-42.5%2C0.5c-12.4-10.2-15.6-27.9-7.7-41.8c8-13.9%2C24.9-20.1%2C39.9-14.6%20L-118%2C416.5L-118%2C416.5z%20M-145.4%2C488c7.2-0.6%2C13.4-5%2C16.3-11.5c2.9-6.5%2C2.2-14.1-2.1-19.9c-4.3-5.8-11.3-8.8-18.3-7.9%20c-10.7%2C1.3-18.3%2C11-17.2%2C21.7C-165.6%2C481.1-156.2%2C489-145.4%2C488z%20M-48.6%2C488c7.1%2C0.9%2C14.1-2.2%2C18.3-7.9s5-13.3%2C2.1-19.8%20s-9.2-10.9-16.3-11.5c-10.8-0.9-20.3%2C6.9-21.4%2C17.6C-67%2C477-59.3%2C486.7-48.6%2C488L-48.6%2C488z%22%2F%3E%3C%2Fsvg%3E";

      var _path$x;

      function _extends$x() {
        _extends$x = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$x.apply(this, arguments);
      }

      const SvgASearch = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$x({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$x || (_path$x = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-180.332 409.809c0-39.9 32-72.25 71.483-72.25 18.958 0 37.133 7.608 50.542 21.167a72.64 72.64 0 0 1 20.933 51.083c0 39.9-32 72.25-71.475 72.25-39.483 0-71.483-32.35-71.483-72.25zm141.775 58.2 21.292 17.183h.367c4.308 4.358 4.308 11.417 0 15.767-4.247 4.306-11.18 4.353-15.485.106l-.106-.106-17.667-20.25a9.017 9.017 0 0 1 0-12.7 8.216 8.216 0 0 1 11.599 0z"
      })));

      var aSearch = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-180.332%2C409.809c0-39.9%2C32-72.25%2C71.483-72.25c18.958%2C0%2C37.133%2C7.608%2C50.542%2C21.167%20c13.428%2C13.609%2C20.95%2C31.964%2C20.933%2C51.083c0%2C39.9-32%2C72.25-71.475%2C72.25C-148.332%2C482.059-180.332%2C449.709-180.332%2C409.809z%20%20M-38.557%2C468.009l21.292%2C17.183h0.367c4.308%2C4.358%2C4.308%2C11.417%2C0%2C15.767c-4.247%2C4.306-11.18%2C4.353-15.485%2C0.106%20c-0.036-0.035-0.071-0.071-0.106-0.106l-17.667-20.25c-3.487-3.515-3.487-9.185%2C0-12.7%20C-46.951%2C464.814-41.764%2C464.814-38.557%2C468.009z%22%2F%3E%3C%2Fsvg%3E";

      var _path$w;

      function _extends$w() {
        _extends$w = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$w.apply(this, arguments);
      }

      const SvgASearchFill = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$w({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.9 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$w || (_path$w = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-106.6 337.6c40.7 0 73.7 33 73.7 73.7s-33 73.7-73.7 73.7-73.7-33-73.7-73.7 33-73.7 73.7-73.7zm69.5 131.6 23.2 23.2-11.6 11.6-23.2-23.2 11.6-11.6z"
      })));

      var aSearchFill = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.9%20200%20200%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-106.6%2C337.6c40.7%2C0%2C73.7%2C33%2C73.7%2C73.7s-33%2C73.7-73.7%2C73.7s-73.7-33-73.7-73.7S-147.3%2C337.6-106.6%2C337.6L-106.6%2C337.6z%20%20M-37.1%2C469.2l23.2%2C23.2L-25.5%2C504l-23.2-23.2L-37.1%2C469.2z%22%2F%3E%3C%2Fsvg%3E";

      var _path$v;

      function _extends$v() {
        _extends$v = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$v.apply(this, arguments);
      }

      const SvgASearchFill2 = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$v({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.9 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$v || (_path$v = /*#__PURE__*/React__namespace.createElement("path", {
        d: "m-48.9 457.4 35.1 35.1-11.6 11.6-35.1-35.1c-13.1 10.5-29.3 16.2-46.1 16.1-40.7 0-73.8-33.1-73.8-73.8s33.1-73.8 73.8-73.8 73.8 33.1 73.8 73.8c.1 16.8-5.6 33.1-16.1 46.1z"
      })));

      var aSearchFill2 = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.9%20200%20200%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-48.9%2C457.4l35.1%2C35.1l-11.6%2C11.6L-60.5%2C469c-13.1%2C10.5-29.3%2C16.2-46.1%2C16.1c-40.7%2C0-73.8-33.1-73.8-73.8%20s33.1-73.8%2C73.8-73.8s73.8%2C33.1%2C73.8%2C73.8C-32.7%2C428.1-38.4%2C444.4-48.9%2C457.4L-48.9%2C457.4z%22%2F%3E%3C%2Fsvg%3E";

      var _path$u;

      function _extends$u() {
        _extends$u = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$u.apply(this, arguments);
      }

      const SvgASearchLine = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$u({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.9 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$u || (_path$u = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-106.5 337.6c40.7 0 73.8 33.1 73.8 73.8s-33.1 73.8-73.8 73.8-73.8-33.1-73.8-73.8 33-73.8 73.8-73.8zm0 131.1c31.7 0 57.4-25.7 57.4-57.4s-25.7-57.4-57.4-57.4-57.4 25.7-57.4 57.4 25.6 57.4 57.4 57.4zm69.5.6 23.2 23.2-11.6 11.6-23.2-23.2 11.6-11.6z"
      })));

      var aSearchLine = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.9%20200%20200%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-106.5%2C337.6c40.7%2C0%2C73.8%2C33.1%2C73.8%2C73.8s-33.1%2C73.8-73.8%2C73.8s-73.8-33.1-73.8-73.8S-147.3%2C337.6-106.5%2C337.6%20L-106.5%2C337.6z%20M-106.5%2C468.7c31.7%2C0%2C57.4-25.7%2C57.4-57.4c0-31.7-25.7-57.4-57.4-57.4c-31.7%2C0-57.4%2C25.7-57.4%2C57.4%20C-163.9%2C443-138.3%2C468.7-106.5%2C468.7z%20M-37%2C469.3l23.2%2C23.2l-11.6%2C11.6l-23.2-23.2L-37%2C469.3z%22%2F%3E%3C%2Fsvg%3E";

      var _path$t;

      function _extends$t() {
        _extends$t = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$t.apply(this, arguments);
      }

      const SvgASearchLine2 = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$t({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.9 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$t || (_path$t = /*#__PURE__*/React__namespace.createElement("path", {
        d: "m-49.1 457.3 35.1 35.1-11.6 11.6-35.1-35.1c-13 10.5-29.3 16.1-46 16.1-40.7 0-73.7-33-73.7-73.7s33-73.7 73.7-73.7 73.7 33 73.7 73.7c.1 16.7-5.6 32.9-16.1 46zm-16.4-6.1c10.4-10.7 16.2-25 16.2-39.9 0-31.7-25.7-57.3-57.3-57.3-31.7 0-57.3 25.6-57.3 57.3 0 31.7 25.6 57.3 57.3 57.3 14.9 0 29.2-5.8 39.9-16.2l1.2-1.2z"
      })));

      var aSearchLine2 = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.9%20200%20200%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-49.1%2C457.3l35.1%2C35.1l-11.6%2C11.6l-35.1-35.1c-13%2C10.5-29.3%2C16.1-46%2C16.1c-40.7%2C0-73.7-33-73.7-73.7s33-73.7%2C73.7-73.7%20s73.7%2C33%2C73.7%2C73.7C-32.9%2C428-38.6%2C444.2-49.1%2C457.3L-49.1%2C457.3z%20M-65.5%2C451.2c10.4-10.7%2C16.2-25%2C16.2-39.9%20c0-31.7-25.7-57.3-57.3-57.3c-31.7%2C0-57.3%2C25.6-57.3%2C57.3c0%2C31.7%2C25.6%2C57.3%2C57.3%2C57.3c14.9%2C0%2C29.2-5.8%2C39.9-16.2L-65.5%2C451.2%20L-65.5%2C451.2z%22%2F%3E%3C%2Fsvg%3E";

      var _path$s;

      function _extends$s() {
        _extends$s = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$s.apply(this, arguments);
      }

      const SvgASend = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$s({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$s || (_path$s = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-18.375 342.407a16.108 16.108 0 0 0-16.083-4.192l-134.142 39a16 16 0 0 0-11.533 12.683c-1.183 6.25 2.958 14.2 8.358 17.517l41.942 25.783a10.866 10.866 0 0 0 13.417-1.617l48.025-48.325a6.117 6.117 0 0 1 8.833 0c2.417 2.433 2.417 6.375 0 8.892l-48.108 48.333c-3.567 3.583-4.233 9.167-1.608 13.5l25.625 42.358c3 5.033 8.167 7.883 13.833 7.883.667 0 1.417 0 2.092-.083 6.5-.833 11.667-5.283 13.583-11.583l39.775-133.958c1.75-5.708.167-11.917-4-16.192h-.009z"
      })));

      var aSend = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-18.375%2C342.407c-4.171-4.269-10.36-5.882-16.083-4.192l-134.142%2C39%20c-5.976%2C1.638-10.469%2C6.579-11.533%2C12.683c-1.183%2C6.25%2C2.958%2C14.2%2C8.358%2C17.517l41.942%2C25.783c4.304%2C2.646%2C9.864%2C1.976%2C13.417-1.617%20l48.025-48.325c2.337-2.439%2C6.209-2.522%2C8.648-0.185c0.063%2C0.06%2C0.125%2C0.122%2C0.185%2C0.185c2.417%2C2.433%2C2.417%2C6.375%2C0%2C8.892%20l-48.108%2C48.333c-3.567%2C3.583-4.233%2C9.167-1.608%2C13.5l25.625%2C42.358c3%2C5.033%2C8.167%2C7.883%2C13.833%2C7.883c0.667%2C0%2C1.417%2C0%2C2.092-0.083%20c6.5-0.833%2C11.667-5.283%2C13.583-11.583l39.775-133.958c1.75-5.708%2C0.167-11.917-4-16.192H-18.375z%22%2F%3E%3C%2Fsvg%3E";

      var _path$r;

      function _extends$r() {
        _extends$r = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$r.apply(this, arguments);
      }

      const SvgASetting = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$r({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$r || (_path$r = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-26.983 434.056c2.983 1.583 5.283 4.083 6.9 6.583 3.15 5.167 2.9 11.5-.167 17.083l-5.967 10a17.75 17.75 0 0 1-15.075 8.667c-2.975 0-6.3-.833-9.025-2.5-2.217-1.417-4.767-1.917-7.5-1.917-8.425 0-15.5 6.917-15.75 15.167 0 9.583-7.833 17.083-17.625 17.083h-11.583c-9.883 0-17.717-7.5-17.717-17.083-.167-8.25-7.242-15.167-15.667-15.167-2.817 0-5.367.5-7.5 1.917-2.725 1.667-6.125 2.5-9.025 2.5-6.133 0-12-3.333-15.158-8.667l-5.875-10c-3.15-5.417-3.325-11.917-.167-17.083 1.358-2.5 3.917-5 6.808-6.583 2.383-1.167 3.917-3.083 5.367-5.333 4.25-7.167 1.7-16.583-5.533-20.833-8.208-4.596-11.135-14.976-6.539-23.184.075-.134.152-.267.231-.399l5.717-9.833c4.932-8.316 15.625-11.136 24.017-6.333 7.417 4 17.033 1.333 21.375-5.75 1.367-2.333 2.133-4.833 1.958-7.333-.167-3.25.767-6.333 2.383-8.833a18.293 18.293 0 0 1 15.075-8.667h12c6.3 0 12.008 3.5 15.167 8.667 1.525 2.5 2.55 5.583 2.292 8.833-.167 2.5.6 5 1.958 7.333 4.342 7.083 13.967 9.75 21.458 5.75 8.365-4.805 19.04-1.98 23.933 6.333l5.708 9.833c4.942 8.25 2.217 18.833-6.3 23.583-7.242 4.25-9.8 13.667-5.45 20.833 1.359 2.25 2.892 4.166 5.276 5.333zm-94.1-13.083c0 13.083 10.817 23.5 24.183 23.5s23.933-10.417 23.933-23.5S-83.534 397.39-96.9 397.39c-13.367-.001-24.183 10.499-24.183 23.583z"
      })));

      var aSetting = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-26.983%2C434.056c2.983%2C1.583%2C5.283%2C4.083%2C6.9%2C6.583c3.15%2C5.167%2C2.9%2C11.5-0.167%2C17.083l-5.967%2C10%20c-3.169%2C5.321-8.882%2C8.606-15.075%2C8.667c-2.975%2C0-6.3-0.833-9.025-2.5c-2.217-1.417-4.767-1.917-7.5-1.917%20c-8.425%2C0-15.5%2C6.917-15.75%2C15.167c0%2C9.583-7.833%2C17.083-17.625%2C17.083h-11.583c-9.883%2C0-17.717-7.5-17.717-17.083%20c-0.167-8.25-7.242-15.167-15.667-15.167c-2.817%2C0-5.367%2C0.5-7.5%2C1.917c-2.725%2C1.667-6.125%2C2.5-9.025%2C2.5%20c-6.133%2C0-12-3.333-15.158-8.667l-5.875-10c-3.15-5.417-3.325-11.917-0.167-17.083c1.358-2.5%2C3.917-5%2C6.808-6.583%20c2.383-1.167%2C3.917-3.083%2C5.367-5.333c4.25-7.167%2C1.7-16.583-5.533-20.833c-8.208-4.596-11.135-14.976-6.539-23.184%20c0.075-0.134%2C0.152-0.267%2C0.231-0.399l5.717-9.833c4.932-8.316%2C15.625-11.136%2C24.017-6.333c7.417%2C4%2C17.033%2C1.333%2C21.375-5.75%20c1.367-2.333%2C2.133-4.833%2C1.958-7.333c-0.167-3.25%2C0.767-6.333%2C2.383-8.833c3.243-5.245%2C8.91-8.504%2C15.075-8.667h12%20c6.3%2C0%2C12.008%2C3.5%2C15.167%2C8.667c1.525%2C2.5%2C2.55%2C5.583%2C2.292%2C8.833c-0.167%2C2.5%2C0.6%2C5%2C1.958%2C7.333%20c4.342%2C7.083%2C13.967%2C9.75%2C21.458%2C5.75c8.365-4.805%2C19.04-1.98%2C23.933%2C6.333l5.708%2C9.833c4.942%2C8.25%2C2.217%2C18.833-6.3%2C23.583%20c-7.242%2C4.25-9.8%2C13.667-5.45%2C20.833C-30.9%2C430.973-29.367%2C432.889-26.983%2C434.056z%20M-121.083%2C420.973%20c0%2C13.083%2C10.817%2C23.5%2C24.183%2C23.5s23.933-10.417%2C23.933-23.5c0-13.083-10.567-23.583-23.933-23.583%20C-110.267%2C397.389-121.083%2C407.889-121.083%2C420.973z%22%2F%3E%3C%2Fsvg%3E";

      var _path$q;

      function _extends$q() {
        _extends$q = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$q.apply(this, arguments);
      }

      const SvgAShow = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$q({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$q || (_path$q = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-129.52 420.89c0 17.775 14.55 32.25 32.517 32.25 17.883 0 32.442-14.475 32.442-32.25-.041-17.881-14.561-32.348-32.442-32.325-17.967 0-32.517 14.467-32.517 32.325zm80.325-49.617c14.225 10.992 26.333 27.075 35.042 47.192a6.08 6.08 0 0 1 0 4.767c-17.4 40.25-48.375 64.325-82.85 64.325h-.083c-34.392 0-65.367-24.083-82.758-64.325a6.07 6.07 0 0 1 0-4.767c17.392-40.242 48.367-64.242 82.758-64.242h.083c17.233 0 33.583 5.984 47.808 17.05zm-47.809 69.717c11.136.009 20.186-8.981 20.25-20.117-.028-11.164-9.086-20.2-20.25-20.2-.975 0-1.95.083-2.842.242-.345 8.949-7.711 16.02-16.667 16h-.417c-.233 1.292-.4 2.583-.4 3.958 0 11.067 9.108 20.117 20.333 20.117h-.007z"
      })));

      var aShow = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-129.52%2C420.89c0%2C17.775%2C14.55%2C32.25%2C32.517%2C32.25c17.883%2C0%2C32.442-14.475%2C32.442-32.25%20c-0.041-17.881-14.561-32.348-32.442-32.325C-114.97%2C388.565-129.52%2C403.032-129.52%2C420.89z%20M-49.195%2C371.273%20c14.225%2C10.992%2C26.333%2C27.075%2C35.042%2C47.192c0.649%2C1.523%2C0.649%2C3.244%2C0%2C4.767c-17.4%2C40.25-48.375%2C64.325-82.85%2C64.325h-0.083%20c-34.392%2C0-65.367-24.083-82.758-64.325c-0.65-1.522-0.65-3.244%2C0-4.767c17.392-40.242%2C48.367-64.242%2C82.758-64.242h0.083%20C-79.77%2C354.223-63.42%2C360.207-49.195%2C371.273z%20M-97.004%2C440.99c11.136%2C0.009%2C20.186-8.981%2C20.25-20.117%20c-0.028-11.164-9.086-20.2-20.25-20.2c-0.975%2C0-1.95%2C0.083-2.842%2C0.242c-0.345%2C8.949-7.711%2C16.02-16.667%2C16h-0.417%20c-0.233%2C1.292-0.4%2C2.583-0.4%2C3.958c0%2C11.067%2C9.108%2C20.117%2C20.333%2C20.117H-97.004z%22%2F%3E%3C%2Fsvg%3E";

      var _path$p;

      function _extends$p() {
        _extends$p = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$p.apply(this, arguments);
      }

      const SvgAStar = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$p({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$p || (_path$p = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-47.682 440.217a9.168 9.168 0 0 0-2.667 8.083l7.417 41a9 9 0 0 1-3.75 9 9.166 9.166 0 0 1-9.75.667l-36.917-19.25a9.412 9.412 0 0 0-4.167-1.083h-2.25a6.767 6.767 0 0 0-2.25.75l-36.917 19.333c-1.833.917-3.892 1.25-5.917.917a9.267 9.267 0 0 1-7.417-10.583l7.417-41a9.325 9.325 0 0 0-2.667-8.167l-30.083-29.167a9 9 0 0 1-2.25-9.417 9.38 9.38 0 0 1 7.417-6.25l41.417-6a9.292 9.292 0 0 0 7.333-5.083l18.25-37.417c.425-.833.983-1.6 1.667-2.25l.75-.583a5.585 5.585 0 0 1 1.333-1.083l.917-.333 1.417-.583h3.5c3.142.333 5.9 2.2 7.333 5l18.5 37.25a9.275 9.275 0 0 0 6.917 5.083l41.417 6c3.5.5 6.417 2.917 7.583 6.25a9.085 9.085 0 0 1-2.417 9.417l-31.166 29.499z"
      })));

      var aStar = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-47.682%2C440.217c-2.162%2C2.093-3.158%2C5.115-2.667%2C8.083l7.417%2C41c0.624%2C3.476-0.843%2C6.996-3.75%2C9%20c-2.851%2C2.081-6.643%2C2.34-9.75%2C0.667l-36.917-19.25c-1.287-0.678-2.713-1.049-4.167-1.083h-2.25c-0.788%2C0.116-1.55%2C0.369-2.25%2C0.75%20l-36.917%2C19.333c-1.833%2C0.917-3.892%2C1.25-5.917%2C0.917c-4.93-0.938-8.218-5.629-7.417-10.583l7.417-41%20c0.493-2.994-0.502-6.04-2.667-8.167l-30.083-29.167c-2.518-2.434-3.396-6.107-2.25-9.417c1.125-3.3%2C3.975-5.708%2C7.417-6.25%20l41.417-6c3.15-0.333%2C5.917-2.25%2C7.333-5.083l18.25-37.417c0.425-0.833%2C0.983-1.6%2C1.667-2.25l0.75-0.583%20c0.386-0.428%2C0.836-0.793%2C1.333-1.083l0.917-0.333l1.417-0.583h3.5c3.142%2C0.333%2C5.9%2C2.2%2C7.333%2C5l18.5%2C37.25%20c1.333%2C2.725%2C3.917%2C4.617%2C6.917%2C5.083l41.417%2C6c3.5%2C0.5%2C6.417%2C2.917%2C7.583%2C6.25c1.083%2C3.342%2C0.142%2C7.008-2.417%2C9.417%20L-47.682%2C440.217L-47.682%2C440.217z%22%2F%3E%3C%2Fsvg%3E";

      var _path$o;

      function _extends$o() {
        _extends$o = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$o.apply(this, arguments);
      }

      const SvgASwap = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$o({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$o || (_path$o = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-133.617 348.597c1.383 1 3.617 3.292 3.617 3.292 8.667 8.133 21.733 28.333 25.925 38.592.083 0 2.583 6.1 2.667 9v.383c0 4.45-2.483 8.608-6.475 10.733-1.65.875-5.667 1.692-7.6 2.083-.633.133-1.05.217-1.075.242-5.717.875-14.483 1.442-24.108 1.442-10.1 0-19.25-.567-24.875-1.642-.1 0-5.242-1.058-6.958-1.742a12.417 12.417 0 0 1-5.917-5.417 13.57 13.57 0 0 1-1.417-6.083c.083-2.225 1.525-6.383 2.183-8.025 4.192-10.833 17.917-31.533 26.308-39.467a79.037 79.037 0 0 1 2.55-2.45c.367-.35.65-.608.783-.75 2.092-1.633 4.667-2.508 7.442-2.508 2.467 0 4.942.775 6.95 2.317zm89.025 57.366a7.833 7.833 0 0 1-7.766 7.9h-.017a7.833 7.833 0 0 1-7.783-7.883v-.017l-2.15-38.167c-.032-5.52 4.414-10.022 9.933-10.058 5.475 0 9.917 4.5 9.917 10.067l-2.134 38.158zm24.084 25.617c2.483 1.067 4.583 3 5.917 5.417a13.495 13.495 0 0 1 1.425 6.092c-.083 2.217-1.525 6.383-2.192 8.025-4.183 10.833-17.917 31.525-26.292 39.467-.858.858-1.833 1.767-2.525 2.417l-.817.767c-2.108 1.642-4.667 2.517-7.433 2.517a11.329 11.329 0 0 1-6.958-2.333c-1.383-.983-3.617-3.275-3.617-3.275-8.683-8.117-21.733-28.342-25.925-38.6-.1 0-2.583-6.083-2.667-8.983v-.383a12.2 12.2 0 0 1 6.475-10.75c1.65-.858 5.65-1.675 7.583-2.083.65-.125 1.067-.208 1.083-.233 5.725-.875 14.492-1.45 24.117-1.45 10.1 0 19.25.583 24.875 1.642.092 0 5.242 1.067 6.958 1.75l-.007-.004zm-120.1-2.883a7.833 7.833 0 0 0-7.783 7.883v.017l-2.15 38.167c-.032 5.52 4.414 10.022 9.933 10.058 5.475 0 9.917-4.5 9.917-10.067l-2.142-38.158a7.834 7.834 0 0 0-7.775-7.892v-.008z"
      })));

      var aSwap = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-133.617%2C348.597c1.383%2C1%2C3.617%2C3.292%2C3.617%2C3.292c8.667%2C8.133%2C21.733%2C28.333%2C25.925%2C38.592%20c0.083%2C0%2C2.583%2C6.1%2C2.667%2C9v0.383c0%2C4.45-2.483%2C8.608-6.475%2C10.733c-1.65%2C0.875-5.667%2C1.692-7.6%2C2.083%20c-0.633%2C0.133-1.05%2C0.217-1.075%2C0.242c-5.717%2C0.875-14.483%2C1.442-24.108%2C1.442c-10.1%2C0-19.25-0.567-24.875-1.642%20c-0.1%2C0-5.242-1.058-6.958-1.742c-2.517-1.101-4.598-3.006-5.917-5.417c-0.939-1.89-1.424-3.973-1.417-6.083%20c0.083-2.225%2C1.525-6.383%2C2.183-8.025c4.192-10.833%2C17.917-31.533%2C26.308-39.467c0.867-0.883%2C1.858-1.808%2C2.55-2.45%20c0.367-0.35%2C0.65-0.608%2C0.783-0.75c2.092-1.633%2C4.667-2.508%2C7.442-2.508C-138.1%2C346.28-135.625%2C347.055-133.617%2C348.597z%20%20M-44.592%2C405.963c0.037%2C4.326-3.44%2C7.863-7.766%2C7.9c-0.006%2C0-0.011%2C0-0.017%2C0c-4.326-0.027-7.811-3.557-7.783-7.883%20c0-0.006%2C0-0.011%2C0-0.017l-2.15-38.167c-0.032-5.52%2C4.414-10.022%2C9.933-10.058c5.475%2C0%2C9.917%2C4.5%2C9.917%2C10.067L-44.592%2C405.963z%20%20M-20.508%2C431.58c2.483%2C1.067%2C4.583%2C3%2C5.917%2C5.417c0.958%2C1.917%2C1.425%2C3.967%2C1.425%2C6.092c-0.083%2C2.217-1.525%2C6.383-2.192%2C8.025%20c-4.183%2C10.833-17.917%2C31.525-26.292%2C39.467c-0.858%2C0.858-1.833%2C1.767-2.525%2C2.417l-0.817%2C0.767%20c-2.108%2C1.642-4.667%2C2.517-7.433%2C2.517c-2.514%2C0.016-4.962-0.805-6.958-2.333c-1.383-0.983-3.617-3.275-3.617-3.275%20c-8.683-8.117-21.733-28.342-25.925-38.6c-0.1%2C0-2.583-6.083-2.667-8.983v-0.383c0-4.458%2C2.467-8.617%2C6.475-10.75%20c1.65-0.858%2C5.65-1.675%2C7.583-2.083c0.65-0.125%2C1.067-0.208%2C1.083-0.233c5.725-0.875%2C14.492-1.45%2C24.117-1.45%20c10.1%2C0%2C19.25%2C0.583%2C24.875%2C1.642c0.092%2C0%2C5.242%2C1.067%2C6.958%2C1.75L-20.508%2C431.58z%20M-140.608%2C428.697%20c-4.326%2C0.027-7.811%2C3.557-7.783%2C7.883c0%2C0.006%2C0%2C0.011%2C0%2C0.017l-2.15%2C38.167c-0.032%2C5.52%2C4.414%2C10.022%2C9.933%2C10.058%20c5.475%2C0%2C9.917-4.5%2C9.917-10.067l-2.142-38.158c0.032-4.326-3.448-7.859-7.775-7.892h0V428.697z%22%2F%3E%3C%2Fsvg%3E";

      var _path$n;

      function _extends$n() {
        _extends$n = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$n.apply(this, arguments);
      }

      const SvgAShieldDone = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$n({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$n || (_path$n = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-26.525 371.073a15.084 15.084 0 0 0-10.408-14.125l-55.308-18.558a15.742 15.742 0 0 0-10.25.05l-55.108 19.225a15.099 15.099 0 0 0-10.233 14.258l.35 55.3a68.733 68.733 0 0 0 17.825 45.608c5.2 5.775 11.858 10.725 20.383 15.142l30.008 15.533a6.376 6.376 0 0 0 5.975-.033l29.733-15.892c8.425-4.5 15.033-9.525 20.183-15.375a68.707 68.707 0 0 0 17.208-45.792l-.358-55.341zm-39.217 35.3-32.492 32.033a6.335 6.335 0 0 1-4.442 1.825 6.322 6.322 0 0 1-4.458-1.767l-15.967-15.358a6.008 6.008 0 0 1-.059-8.666 6.417 6.417 0 0 1 8.892-.058l11.5 11.05 28.075-27.667a6.416 6.416 0 0 1 9.06.101 6.014 6.014 0 0 1-.109 8.507z"
      })));

      var aShieldDone = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-26.525%2C371.073c-0.092-6.449-4.276-12.126-10.408-14.125l-55.308-18.558%20c-3.327-1.127-6.935-1.11-10.25%2C0.05l-55.108%2C19.225c-6.107%2C2.079-10.218%2C7.808-10.233%2C14.258l0.35%2C55.3%20c0.141%2C16.876%2C6.486%2C33.109%2C17.825%2C45.608c5.2%2C5.775%2C11.858%2C10.725%2C20.383%2C15.142l30.008%2C15.533%20c1.874%2C0.981%2C4.112%2C0.968%2C5.975-0.033l29.733-15.892c8.425-4.5%2C15.033-9.525%2C20.183-15.375%20c11.16-12.636%2C17.284-28.934%2C17.208-45.792L-26.525%2C371.073z%20M-65.742%2C406.373l-32.492%2C32.033c-1.184%2C1.168-2.779%2C1.823-4.442%2C1.825%20c-1.66%2C0.019-3.262-0.615-4.458-1.767l-15.967-15.358c-0.059-0.056-0.116-0.112-0.173-0.17c-2.315-2.378-2.263-6.182%2C0.114-8.496%20c2.468-2.403%2C6.392-2.428%2C8.892-0.058l11.5%2C11.05l28.075-27.667c2.469-2.408%2C6.4-2.434%2C8.9-0.058%20c0.054%2C0.052%2C0.108%2C0.105%2C0.16%2C0.159C-63.313%2C400.245-63.362%2C404.054-65.742%2C406.373z%22%2F%3E%3C%2Fsvg%3E";

      var _path$m;

      function _extends$m() {
        _extends$m = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$m.apply(this, arguments);
      }

      const SvgAShieldFail = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$m({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$m || (_path$m = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-36.991 356.965a15 15 0 0 1 10.4 14.142l.417 55.317a68.708 68.708 0 0 1-17.267 45.767c-5.117 5.883-11.75 10.867-20.133 15.367L-93.35 503.49a6.238 6.238 0 0 1-2.933.733 6.579 6.579 0 0 1-3.025-.733l-30.025-15.525c-8.467-4.417-15.1-9.317-20.3-15.117a68.529 68.529 0 0 1-17.858-45.6l-.333-55.333c-.083-6.375 4.1-12.083 10.225-14.217l55.108-19.275a15.582 15.582 0 0 1 10.233 0L-37 356.965h.009zm-39.834 81.317a6.05 6.05 0 0 0 0-8.666l-11.333-11.042 11.333-11.017a6.058 6.058 0 0 0 0-8.666 6.451 6.451 0 0 0-8.892 0l-11.325 11.033-11.325-11.042a6.451 6.451 0 0 0-8.892 0 6.058 6.058 0 0 0 0 8.666l11.333 11.025-11.333 11.042a6.05 6.05 0 0 0 0 8.666 6.295 6.295 0 0 0 4.45 1.783 6.029 6.029 0 0 0 4.442-1.783l11.325-11.033 11.325 11.033c1.25 1.225 2.85 1.783 4.442 1.783a6.152 6.152 0 0 0 4.45-1.782z"
      })));

      var aShieldFail = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-36.991%2C356.965c6.151%2C1.982%2C10.342%2C7.68%2C10.4%2C14.142l0.417%2C55.317%20c0.054%2C16.857-6.092%2C33.146-17.267%2C45.767c-5.117%2C5.883-11.75%2C10.867-20.133%2C15.367L-93.35%2C503.49%20c-0.903%2C0.481-1.91%2C0.733-2.933%2C0.733c-1.052%2C0.001-2.09-0.25-3.025-0.733l-30.025-15.525c-8.467-4.417-15.1-9.317-20.3-15.117%20c-11.366-12.482-17.725-28.719-17.858-45.6l-0.333-55.333c-0.083-6.375%2C4.1-12.083%2C10.225-14.217l55.108-19.275%20c3.314-1.152%2C6.919-1.152%2C10.233%2C0L-37%2C356.965H-36.991z%20M-76.825%2C438.282c2.393-2.332%2C2.443-6.162%2C0.111-8.555%20c-0.037-0.038-0.074-0.075-0.111-0.111l-11.333-11.042l11.333-11.017c2.393-2.338%2C2.438-6.174%2C0.099-8.567%20c-0.033-0.034-0.066-0.067-0.099-0.099c-2.49-2.369-6.401-2.369-8.892%2C0l-11.325%2C11.033l-11.325-11.042%20c-2.49-2.369-6.401-2.369-8.892%2C0c-2.393%2C2.338-2.438%2C6.174-0.099%2C8.567c0.033%2C0.034%2C0.066%2C0.067%2C0.099%2C0.099l11.333%2C11.025%20l-11.333%2C11.042c-2.393%2C2.332-2.443%2C6.162-0.111%2C8.555c0.037%2C0.038%2C0.074%2C0.075%2C0.111%2C0.111c1.19%2C1.158%2C2.79%2C1.799%2C4.45%2C1.783%20c1.663%2C0.044%2C3.271-0.601%2C4.442-1.783l11.325-11.033l11.325%2C11.033c1.25%2C1.225%2C2.85%2C1.783%2C4.442%2C1.783%20C-79.611%2C440.096-78.006%2C439.453-76.825%2C438.282z%22%2F%3E%3C%2Fsvg%3E";

      var _path$l;

      function _extends$l() {
        _extends$l = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$l.apply(this, arguments);
      }

      const SvgAThreeDimensional = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$l({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$l || (_path$l = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M828.32 811.253H184.16c-40.32 0-72.96-32.64-72.96-72.96v-464.64c0-40.32 32.64-72.96 72.96-72.96H828.8c40.32 0 72.96 32.64 72.96 72.96v464.64c-.48 40.32-33.12 72.96-73.44 72.96zm-644.16-562.56c-13.92 0-24.96 11.04-24.96 24.96v464.64c0 13.92 11.04 24.96 24.96 24.96H828.8c13.92 0 24.96-11.04 24.96-24.96v-464.64c0-13.92-11.04-24.96-24.96-24.96H184.16zm77.28 308.64 46.08-10.56c3.36 31.68 20.16 47.52 49.92 48.48 36.96.96 54.72-15.84 54.24-49.92-2.88-26.88-20.64-40.8-54.24-41.76h-33.6v-39.36h23.04c34.08 0 52.32-14.4 54.24-43.2-.96-23.52-14.4-35.52-40.32-36.48-25.92 1.92-41.76 16.8-47.04 44.64l-47.04-11.04c12.48-48.48 43.2-73.44 91.68-74.4 57.6.96 87.36 26.88 89.28 78.24 0 26.88-14.88 46.56-44.64 58.08 36 14.4 54.24 36.96 55.2 67.68-3.84 53.76-36.48 82.56-98.4 84.96-55.68-.48-88.8-25.92-98.4-75.36zm342.72 70.08H502.88v-279.36h104.16c90.72.96 136.8 47.52 137.76 140.64 2.4 95.04-44.16 141.6-140.64 138.72zm1.44-237.6h-56.64v199.68h55.2c62.88.96 94.08-32.64 93.12-99.84-.96-65.76-31.68-98.88-91.68-99.84z"
      })));

      var aThreeDimensional = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%220%200%201024%201024%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M828.32%20811.25333333H184.16c-40.32%200-72.96-32.64-72.96-72.96V273.65333333c0-40.32%2032.64-72.96%2072.96-72.96H828.8c40.32%200%2072.96%2032.64%2072.96%2072.96v464.64c-0.48%2040.32-33.12%2072.96-73.44%2072.96zM184.16%20248.69333333c-13.92%200-24.96%2011.04-24.96%2024.96v464.64c0%2013.92%2011.04%2024.96%2024.96%2024.96H828.8c13.92%200%2024.96-11.04%2024.96-24.96V273.65333333c0-13.92-11.04-24.96-24.96-24.96H184.16z%20M261.44%20557.33333333l46.08-10.56c3.36%2031.68%2020.16%2047.52%2049.92%2048.48%2036.96%200.96%2054.72-15.84%2054.24-49.92-2.88-26.88-20.64-40.8-54.24-41.76h-33.6v-39.36h23.04c34.08%200%2052.32-14.4%2054.24-43.2-0.96-23.52-14.4-35.52-40.32-36.48-25.92%201.92-41.76%2016.8-47.04%2044.64L266.72%20418.13333333c12.48-48.48%2043.2-73.44%2091.68-74.4%2057.6%200.96%2087.36%2026.88%2089.28%2078.24%200%2026.88-14.88%2046.56-44.64%2058.08%2036%2014.4%2054.24%2036.96%2055.2%2067.68-3.84%2053.76-36.48%2082.56-98.4%2084.96-55.68-0.48-88.8-25.92-98.4-75.36zM604.16%20627.41333333H502.88V348.05333333h104.16c90.72%200.96%20136.8%2047.52%20137.76%20140.64%202.4%2095.04-44.16%20141.6-140.64%20138.72z%20m1.44-237.6h-56.64v199.68h55.2c62.88%200.96%2094.08-32.64%2093.12-99.84-0.96-65.76-31.68-98.88-91.68-99.84z%22%2F%3E%3C%2Fsvg%3E";

      var _path$k;

      function _extends$k() {
        _extends$k = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$k.apply(this, arguments);
      }

      const SvgATicket = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$k({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$k || (_path$k = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-15.442 408.714a6.122 6.122 0 0 1-4.267 1.725c-5.967 0-10.8 4.692-10.8 10.417 0 5.75 4.775 10.417 10.683 10.483 3.333.033 6.158 2.292 6.158 5.525v20.083c0 16.892-14.1 30.608-31.508 30.608H-71.45a4.85 4.85 0 0 1-4.917-4.775v-16.917a5.9 5.9 0 0 0-5.931-5.868l-.119.002a5.95 5.95 0 0 0-6.042 5.857V482.781a4.842 4.842 0 0 1-4.907 4.775H-148.825c-17.325 0-31.508-13.7-31.508-30.617v-20.083c0-3.225 2.833-5.483 6.158-5.517 5.917-.058 10.683-4.733 10.683-10.492 0-5.558-4.667-9.783-10.8-9.783a6.134 6.134 0 0 1-4.267-1.725 5.784 5.784 0 0 1-1.775-4.15v-20.275c0-16.883 14.217-30.692 31.592-30.692h55.375c2.708 0 4.917 2.133 4.917 4.775v20.042a6 6 0 0 0 6.042 5.875c3.383 0 6.042-2.667 6.042-5.875v-20.042c0-2.642 2.2-4.775 4.917-4.775h26.275c17.4 0 31.508 13.7 31.508 30.617v19.725a5.785 5.785 0 0 1-1.776 4.15zm-66.966 36.092c3.383 0 6.042-2.667 6.042-5.867v-31.317a5.95 5.95 0 0 0-6.024-5.875h-.026a6 6 0 0 0-6.042 5.875v31.317a6 6 0 0 0 6.05 5.867z"
      })));

      var aTicket = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-15.442%2C408.714c-1.144%2C1.108-2.674%2C1.727-4.267%2C1.725c-5.967%2C0-10.8%2C4.692-10.8%2C10.417%20c0%2C5.75%2C4.775%2C10.417%2C10.683%2C10.483c3.333%2C0.033%2C6.158%2C2.292%2C6.158%2C5.525v20.083c0%2C16.892-14.1%2C30.608-31.508%2C30.608H-71.45%20c-2.675%2C0.037-4.876-2.1-4.917-4.775v-16.917c-0.017-3.258-2.673-5.886-5.931-5.868c-0.04%2C0-0.079%2C0.001-0.119%2C0.002%20c-3.286-0.051-5.991%2C2.571-6.042%2C5.857c0%2C0.003%2C0%2C0.006%2C0%2C0.01v16.917c-0.037%2C2.674-2.234%2C4.812-4.907%2C4.775c0%2C0-0.001%2C0-0.001%2C0%20h-55.458c-17.325%2C0-31.508-13.7-31.508-30.617v-20.083c0-3.225%2C2.833-5.483%2C6.158-5.517c5.917-0.058%2C10.683-4.733%2C10.683-10.492%20c0-5.558-4.667-9.783-10.8-9.783c-1.592%2C0.001-3.122-0.618-4.267-1.725c-1.129-1.086-1.77-2.583-1.775-4.15v-20.275%20c0-16.883%2C14.217-30.692%2C31.592-30.692h55.375c2.708%2C0%2C4.917%2C2.133%2C4.917%2C4.775v20.042c0.068%2C3.281%2C2.76%2C5.898%2C6.042%2C5.875%20c3.383%2C0%2C6.042-2.667%2C6.042-5.875v-20.042c0-2.642%2C2.2-4.775%2C4.917-4.775h26.275c17.4%2C0%2C31.508%2C13.7%2C31.508%2C30.617v19.725%20C-13.672%2C406.131-14.312%2C407.628-15.442%2C408.714z%20M-82.408%2C444.806c3.383%2C0%2C6.042-2.667%2C6.042-5.867v-31.317%20c-0.041-3.286-2.738-5.916-6.024-5.875c-0.009%2C0-0.018%2C0-0.026%2C0c-3.282-0.023-5.973%2C2.594-6.042%2C5.875v31.317%20C-88.386%2C442.22-85.69%2C444.834-82.408%2C444.806z%22%2F%3E%3C%2Fsvg%3E";

      var _path$j;

      function _extends$j() {
        _extends$j = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$j.apply(this, arguments);
      }

      const SvgATicketStar = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$j({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$j || (_path$j = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-32.325 420.898c0 6.783 5.567 12.292 12.408 12.292 3.45 0 6.25 2.775 6.25 6.192v22.308c0 18.858-15.483 34.2-34.517 34.2h-97.625c-19.033 0-34.525-15.342-34.525-34.2v-22.308c0-3.417 2.8-6.192 6.25-6.192 6.85 0 12.417-5.517 12.417-12.292 0-6.608-5.342-11.583-12.417-11.583a6.272 6.272 0 0 1-4.417-1.808 6.167 6.167 0 0 1-1.833-4.375l.017-23.033c0-18.858 15.483-34.208 34.517-34.208h97.6c19.033 0 34.525 15.35 34.525 34.208l.008 22.308a6.175 6.175 0 0 1-1.825 4.383 6.277 6.277 0 0 1-4.425 1.817c-6.841-.001-12.408 5.516-12.408 12.291zm-45.908 5.391 9.825-9.475a6.083 6.083 0 1 0-3.409-10.417l-13.575-1.967-6.075-12.183a6.143 6.143 0 0 0-5.517-3.417H-97a6.165 6.165 0 0 0-5.525 3.408l-6.075 12.192-13.55 1.958a6.124 6.124 0 0 0-5 4.15 6.032 6.032 0 0 0 1.558 6.275l9.825 9.475-2.317 13.4a6.061 6.061 0 0 0 2.458 5.992 6.183 6.183 0 0 0 6.475.45l12.15-6.325 12.125 6.308a6.108 6.108 0 0 0 6.5-.442 6.025 6.025 0 0 0 2.467-5.983l-2.324-13.399z"
      })));

      var aTicketStar = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-32.325%2C420.898c0%2C6.783%2C5.567%2C12.292%2C12.408%2C12.292c3.45%2C0%2C6.25%2C2.775%2C6.25%2C6.192v22.308%20c0%2C18.858-15.483%2C34.2-34.517%2C34.2h-97.625c-19.033%2C0-34.525-15.342-34.525-34.2v-22.308c0-3.417%2C2.8-6.192%2C6.25-6.192%20c6.85%2C0%2C12.417-5.517%2C12.417-12.292c0-6.608-5.342-11.583-12.417-11.583c-1.653%2C0.003-3.241-0.647-4.417-1.808%20c-1.17-1.156-1.83-2.731-1.833-4.375l0.017-23.033c0-18.858%2C15.483-34.208%2C34.517-34.208h97.6c19.033%2C0%2C34.525%2C15.35%2C34.525%2C34.208%20l0.008%2C22.308c0%2C1.646-0.657%2C3.224-1.825%2C4.383c-1.177%2C1.166-2.768%2C1.819-4.425%2C1.817%20C-26.758%2C408.606-32.325%2C414.123-32.325%2C420.898L-32.325%2C420.898z%20M-78.233%2C426.289l9.825-9.475c3.33%2C0.445%2C6.391-1.893%2C6.836-5.224%20c0.445-3.33-1.893-6.391-5.224-6.836c-1.836-0.245-3.684%2C0.359-5.021%2C1.643l-13.575-1.967l-6.075-12.183%20c-1.038-2.097-3.177-3.421-5.517-3.417H-97c-2.339-0.004-4.479%2C1.316-5.525%2C3.408l-6.075%2C12.192l-13.55%2C1.958%20c-2.324%2C0.312-4.265%2C1.924-5%2C4.15c-0.74%2C2.217-0.133%2C4.662%2C1.558%2C6.275l9.825%2C9.475l-2.317%2C13.4%20c-0.406%2C2.304%2C0.551%2C4.637%2C2.458%2C5.992c1.9%2C1.362%2C4.405%2C1.536%2C6.475%2C0.45l12.15-6.325l12.125%2C6.308%20c2.071%2C1.117%2C4.599%2C0.945%2C6.5-0.442c1.915-1.346%2C2.876-3.679%2C2.467-5.983L-78.233%2C426.289L-78.233%2C426.289z%22%2F%3E%3C%2Fsvg%3E";

      var _path$i;

      function _extends$i() {
        _extends$i = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$i.apply(this, arguments);
      }

      const SvgATickSquare = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$i({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$i || (_path$i = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-133.083 337.556h72.25c28.25 0 47.167 19.833 47.167 49.333v68.083c0 29.417-18.917 49.25-47.167 49.25h-72.25c-28.25 0-47.25-19.833-47.25-49.25v-68.083c0-29.5 19-49.333 47.25-49.333zm31.333 108.25 39.583-39.583c2.833-2.833 2.833-7.417 0-10.333a7.342 7.342 0 0 0-10.333 0l-34.417 34.417-14.583-14.583a7.342 7.342 0 0 0-10.333 0c-2.833 2.833-2.833 7.417 0 10.333l19.833 19.75c1.417 1.417 3.25 2.083 5.083 2.083 1.917-.001 3.75-.667 5.167-2.084z"
      })));

      var aTickSquare = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-133.083%2C337.556h72.25c28.25%2C0%2C47.167%2C19.833%2C47.167%2C49.333v68.083%20c0%2C29.417-18.917%2C49.25-47.167%2C49.25h-72.25c-28.25%2C0-47.25-19.833-47.25-49.25v-68.083%20C-180.333%2C357.389-161.333%2C337.556-133.083%2C337.556z%20M-101.75%2C445.806l39.583-39.583c2.833-2.833%2C2.833-7.417%2C0-10.333%20c-2.861-2.834-7.472-2.834-10.333%2C0l-34.417%2C34.417l-14.583-14.583c-2.861-2.834-7.472-2.834-10.333%2C0%20c-2.833%2C2.833-2.833%2C7.417%2C0%2C10.333l19.833%2C19.75c1.417%2C1.417%2C3.25%2C2.083%2C5.083%2C2.083C-105%2C447.889-103.167%2C447.223-101.75%2C445.806%20L-101.75%2C445.806z%22%2F%3E%3C%2Fsvg%3E";

      var _path$h;

      function _extends$h() {
        _extends$h = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$h.apply(this, arguments);
      }

      const SvgATimeCircle = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$h({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$h || (_path$h = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-97 504.223c-46 0-83.333-37.25-83.333-83.333 0-46 37.333-83.333 83.333-83.333 46.083 0 83.333 37.333 83.333 83.333 0 46.083-37.25 83.333-83.333 83.333zm26.583-52.416a6.183 6.183 0 0 0 8.505-2.035l.079-.132c1.75-2.917.833-6.75-2.167-8.583l-29.667-17.667v-38.5a6.25 6.25 0 1 0-12.5 0v42.083c0 2.167 1.167 4.167 3.083 5.333l32.667 19.501z"
      })));

      var aTimeCircle = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-97%2C504.223c-46%2C0-83.333-37.25-83.333-83.333c0-46%2C37.333-83.333%2C83.333-83.333%20c46.083%2C0%2C83.333%2C37.333%2C83.333%2C83.333C-13.667%2C466.973-50.917%2C504.223-97%2C504.223L-97%2C504.223z%20M-70.417%2C451.807%20c2.91%2C1.787%2C6.718%2C0.876%2C8.505-2.035c0.027-0.044%2C0.053-0.088%2C0.079-0.132c1.75-2.917%2C0.833-6.75-2.167-8.583l-29.667-17.667v-38.5%20c0-3.452-2.798-6.25-6.25-6.25c-3.452%2C0-6.25%2C2.798-6.25%2C6.25v42.083c0%2C2.167%2C1.167%2C4.167%2C3.083%2C5.333L-70.417%2C451.807%20L-70.417%2C451.807z%22%2F%3E%3C%2Fsvg%3E";

      var _path$g;

      function _extends$g() {
        _extends$g = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$g.apply(this, arguments);
      }

      const SvgATimeSquare = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$g({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$g || (_path$g = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-133.083 337.556h72.25c28.25 0 47.167 19.833 47.167 49.333v68.083c0 29.417-18.917 49.25-47.167 49.25h-72.25c-28.25 0-47.25-19.833-47.25-49.25v-68.083c0-29.5 19-49.333 47.25-49.333zm65.916 115.083a6.182 6.182 0 0 0 5.333-3.083 6.2 6.2 0 0 0-2.064-8.522l-.103-.062-29.667-17.667v-38.5a6.25 6.25 0 1 0-12.5 0v42.083c0 2.167 1.167 4.25 3.083 5.333l32.667 19.5c1.001.668 2.168.918 3.251.918z"
      })));

      var aTimeSquare = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-133.083%2C337.556h72.25c28.25%2C0%2C47.167%2C19.833%2C47.167%2C49.333v68.083%20c0%2C29.417-18.917%2C49.25-47.167%2C49.25h-72.25c-28.25%2C0-47.25-19.833-47.25-49.25v-68.083%20C-180.333%2C357.389-161.333%2C337.556-133.083%2C337.556z%20M-67.167%2C452.639c2.083%2C0%2C4.167-1.083%2C5.333-3.083%20c1.783-2.923%2C0.859-6.738-2.064-8.522c-0.034-0.021-0.068-0.041-0.103-0.062l-29.667-17.667v-38.5c0-3.452-2.798-6.25-6.25-6.25%20c-3.452%2C0-6.25%2C2.798-6.25%2C6.25v42.083c0%2C2.167%2C1.167%2C4.25%2C3.083%2C5.333l32.667%2C19.5C-69.417%2C452.389-68.25%2C452.639-67.167%2C452.639%20L-67.167%2C452.639z%22%2F%3E%3C%2Fsvg%3E";

      var _path$f;

      function _extends$f() {
        _extends$f = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$f.apply(this, arguments);
      }

      const SvgAUnlock = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$f({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$f || (_path$f = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-128.45 393.481h66.708c19.65 0 35.575 15.583 35.575 34.8v41.15c0 19.208-15.925 34.792-35.575 34.792h-70.525c-19.65 0-35.567-15.583-35.567-34.792v-41.15c0-15.808 10.833-29 25.583-33.25l-.917.117v-12.7c.167-24.75 20.75-44.892 45.992-44.892 19.725 0 37.167 12.183 43.6 30.233a7.036 7.036 0 0 1-.333 5.55 7.049 7.049 0 0 1-4.242 3.65 7.55 7.55 0 0 1-9.483-4.475c-4.317-12.267-16.167-20.467-29.375-20.467-17.283 0-31.25 13.592-31.333 30.233v11.192l-.108.017v-.008zm31.408 71.808a7.332 7.332 0 0 0 7.449-7.216l.001-.068v-18.392a7.317 7.317 0 0 0-7.431-7.2h-.019a7.292 7.292 0 0 0-7.367 7.2v18.392c.001 4.059 3.301 7.284 7.367 7.284z"
      })));

      var aUnlock = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-128.45%2C393.481h66.708c19.65%2C0%2C35.575%2C15.583%2C35.575%2C34.8v41.15%20c0%2C19.208-15.925%2C34.792-35.575%2C34.792h-70.525c-19.65%2C0-35.567-15.583-35.567-34.792v-41.15c0-15.808%2C10.833-29%2C25.583-33.25%20l-0.917%2C0.117v-12.7c0.167-24.75%2C20.75-44.892%2C45.992-44.892c19.725%2C0%2C37.167%2C12.183%2C43.6%2C30.233%20c0.656%2C1.817%2C0.535%2C3.824-0.333%2C5.55c-0.85%2C1.75-2.385%2C3.071-4.242%2C3.65c-3.85%2C1.305-8.043-0.673-9.483-4.475%20c-4.317-12.267-16.167-20.467-29.375-20.467c-17.283%2C0-31.25%2C13.592-31.333%2C30.233v11.192l-0.108%2C0.017L-128.45%2C393.481z%20%20M-97.042%2C465.289c4.05%2C0.065%2C7.385-3.166%2C7.449-7.216c0-0.023%2C0.001-0.045%2C0.001-0.068v-18.392c-0.064-4.04-3.391-7.264-7.431-7.2%20c-0.006%2C0-0.013%2C0-0.019%2C0c-4.021-0.042-7.316%2C3.179-7.367%2C7.2v18.392C-104.408%2C462.064-101.108%2C465.289-97.042%2C465.289z%22%2F%3E%3C%2Fsvg%3E";

      var _path$e;

      function _extends$e() {
        _extends$e = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$e.apply(this, arguments);
      }

      const SvgAUpload = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$e({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$e || (_path$e = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-126.45 360.032a6.367 6.367 0 0 0 .7 8.367c2.5 2.5 6.583 2.5 9.083 0l13.25-13.333v34.5h12.833v-34.5l13.25 13.333.717.617a6.44 6.44 0 0 0 10.283-5.2c0-1.583-.667-3.25-1.917-4.5l-24.25-24.333-.75-.683a6.366 6.366 0 0 0-8.333.683l-24.25 24.333-.616.716zm-18.633 29.583c-19.6.908-35.25 17.408-35.25 37.508v41.375l.042 1.767c.917 19.958 17.125 35.958 37.042 35.958h92.583l1.742-.042c19.608-.917 35.258-17.417 35.258-37.6V427.29l-.042-1.775c-.917-20.033-17.208-35.958-37.042-35.958h-39.833v50.875l-.058.892a6.457 6.457 0 0 1-6.358 5.633 6.418 6.418 0 0 1-6.417-6.525v-50.867h-39.917l-1.742.042-.008.008z"
      })));

      var aUpload = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-126.45%2C360.032c-1.899%2C2.569-1.6%2C6.149%2C0.7%2C8.367c2.5%2C2.5%2C6.583%2C2.5%2C9.083%2C0l13.25-13.333v34.5%20h12.833v-34.5l13.25%2C13.333l0.717%2C0.617c2.856%2C2.122%2C6.891%2C1.527%2C9.012-1.329c0.831-1.119%2C1.277-2.477%2C1.271-3.871%20c0-1.583-0.667-3.25-1.917-4.5l-24.25-24.333l-0.75-0.683c-2.559-1.884-6.115-1.592-8.333%2C0.683l-24.25%2C24.333L-126.45%2C360.032z%20%20M-145.083%2C389.615c-19.6%2C0.908-35.25%2C17.408-35.25%2C37.508v41.375l0.042%2C1.767c0.917%2C19.958%2C17.125%2C35.958%2C37.042%2C35.958h92.583%20l1.742-0.042c19.608-0.917%2C35.258-17.417%2C35.258-37.6V427.29l-0.042-1.775c-0.917-20.033-17.208-35.958-37.042-35.958h-39.833%20v50.875l-0.058%2C0.892c-0.413%2C3.204-3.128%2C5.61-6.358%2C5.633c-3.544%2C0-6.417-2.872-6.418-6.416c0-0.036%2C0-0.073%2C0.001-0.109v-50.867%20h-39.917l-1.742%2C0.042L-145.083%2C389.615z%22%2F%3E%3C%2Fsvg%3E";

      var _path$d;

      function _extends$d() {
        _extends$d = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$d.apply(this, arguments);
      }

      const SvgAVideo = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$d({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$d || (_path$d = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-146.058 358.78h48.267c20.183 0 34.275 13.908 34.275 33.833v57.333c0 19.925-14.083 33.833-34.275 33.833h-48.267c-20.183 0-34.275-13.908-34.275-33.833v-57.333c0-19.916 14.091-33.833 34.275-33.833zm115.375 19.825a11.53 11.53 0 0 1 11.442.533c3.492 2.192 5.575 6 5.575 10.167v63.958c0 4.167-2.083 7.975-5.575 10.167a11.542 11.542 0 0 1-11.45.525l-12.342-6.233a13.525 13.525 0 0 1-7.4-12.142v-48.608c0-5.175 2.833-9.833 7.4-12.133l12.35-6.234z"
      })));

      var aVideo = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-146.058%2C358.78h48.267c20.183%2C0%2C34.275%2C13.908%2C34.275%2C33.833v57.333%20c0%2C19.925-14.083%2C33.833-34.275%2C33.833h-48.267c-20.183%2C0-34.275-13.908-34.275-33.833v-57.333%20C-180.333%2C372.697-166.242%2C358.78-146.058%2C358.78z%20M-30.683%2C378.605c3.658-1.858%2C7.95-1.667%2C11.442%2C0.533%20c3.492%2C2.192%2C5.575%2C6%2C5.575%2C10.167v63.958c0%2C4.167-2.083%2C7.975-5.575%2C10.167c-3.454%2C2.192-7.81%2C2.391-11.45%2C0.525l-12.342-6.233%20c-4.567-2.319-7.431-7.02-7.4-12.142v-48.608c0-5.175%2C2.833-9.833%2C7.4-12.133L-30.683%2C378.605z%22%2F%3E%3C%2Fsvg%3E";

      var _path$c;

      function _extends$c() {
        _extends$c = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$c.apply(this, arguments);
      }

      const SvgAVideo2 = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$c({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.9 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$c || (_path$c = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-24 378.3c-6-3-13.1-2.3-18.5 1.7l-19 14.2v-11.8c0-13.1-10.6-23.6-23.6-23.6H-156c-13.1 0-23.6 10.6-23.6 23.6v70.9c0 13.1 10.6 23.6 23.6 23.6h70.9c13.1 0 23.6-10.6 23.6-23.6v-11.8l18.9 14.2c3.1 2.3 6.8 3.6 10.6 3.6 2.8 0 5.5-.6 7.9-1.8 6-3 9.8-9.2 9.8-15.9v-47.3c.1-6.9-3.7-13.1-9.7-16z"
      })));

      var aVideo2 = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.9%20200%20200%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-24%2C378.3c-6-3-13.1-2.3-18.5%2C1.7l-19%2C14.2v-11.8c0-13.1-10.6-23.6-23.6-23.6h-70.9c-13.1%2C0-23.6%2C10.6-23.6%2C23.6v70.9%20c0%2C13.1%2C10.6%2C23.6%2C23.6%2C23.6h70.9c13.1%2C0%2C23.6-10.6%2C23.6-23.6v-11.8l18.9%2C14.2c3.1%2C2.3%2C6.8%2C3.6%2C10.6%2C3.6c2.8%2C0%2C5.5-0.6%2C7.9-1.8%20c6-3%2C9.8-9.2%2C9.8-15.9v-47.3C-14.2%2C387.4-18%2C381.2-24%2C378.3z%22%2F%3E%3C%2Fsvg%3E";

      var _path$b;

      function _extends$b() {
        _extends$b = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$b.apply(this, arguments);
      }

      const SvgAVideoDisabled = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$b({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.9 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$b || (_path$b = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-180.3 385.2v71.5c0 13.2 10.7 23.8 23.8 23.8H-85c8.1 0 15.6-4.1 20-10.8l-104.5-104.5c-6.7 4.5-10.8 12-10.8 20zm156.9-4c-6-3-13.2-2.4-18.6 1.7l-19.2 14.3v-11.9c0-13.2-10.7-23.8-23.8-23.8h-54.6l98.2 98.2c3 2 6.5 3.1 10.1 3.1 2.8 0 5.5-.6 8-1.9 6.1-3 9.9-9.2 9.9-16v-47.7c0-6.8-3.9-13-10-16zm-134.8-30c-2.2-2.4-6-2.6-8.4-.4-2.4 2.2-2.6 6-.4 8.4l.4.4 131.1 131.1c2.3 2.3 6.1 2.3 8.4 0 2.3-2.3 2.3-6.1 0-8.4l-131.1-131.1z"
      })));

      var aVideoDisabled = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.9%20200%20200%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-180.3%2C385.2v71.5c0%2C13.2%2C10.7%2C23.8%2C23.8%2C23.8H-85c8.1%2C0%2C15.6-4.1%2C20-10.8l-104.5-104.5%20C-176.2%2C369.7-180.3%2C377.2-180.3%2C385.2z%20M-23.4%2C381.2c-6-3-13.2-2.4-18.6%2C1.7l-19.2%2C14.3v-11.9c0-13.2-10.7-23.8-23.8-23.8h-54.6%20l98.2%2C98.2c3%2C2%2C6.5%2C3.1%2C10.1%2C3.1c2.8%2C0%2C5.5-0.6%2C8-1.9c6.1-3%2C9.9-9.2%2C9.9-16v-47.7C-13.4%2C390.4-17.3%2C384.2-23.4%2C381.2z%20M-158.2%2C351.2%20c-2.2-2.4-6-2.6-8.4-0.4c-2.4%2C2.2-2.6%2C6-0.4%2C8.4c0.1%2C0.1%2C0.3%2C0.3%2C0.4%2C0.4l131.1%2C131.1c2.3%2C2.3%2C6.1%2C2.3%2C8.4%2C0c0%2C0%2C0%2C0%2C0%2C0%20c2.3-2.3%2C2.3-6.1%2C0-8.4c0%2C0%2C0%2C0%2C0%2C0L-158.2%2C351.2z%22%2F%3E%3C%2Fsvg%3E";

      var _path$a;

      function _extends$a() {
        _extends$a = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$a.apply(this, arguments);
      }

      const SvgAVoice = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$a({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$a || (_path$a = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-95.542 447.69h-2.917c-20.025 0-36.258-16.025-36.258-35.8v-38.525c0-19.775 16.233-35.808 36.258-35.808h2.917c16.157-.067 30.403 10.578 34.917 26.092a3.233 3.233 0 0 1-3.133 4.117H-73.2a5.133 5.133 0 0 0-5.167 5.083v.017c0 2.817 2.317 5.1 5.167 5.1h8.7c2.883 0 5.225 2.308 5.225 5.15 0 2.85-2.333 5.15-5.225 5.15h-8.7a5.143 5.143 0 0 0-5.167 5.108c0 2.817 2.317 5.1 5.167 5.1h8.7c2.883 0 5.225 2.308 5.225 5.167 0 2.833-2.333 5.133-5.225 5.133h-8.7a5.142 5.142 0 0 0-5.167 5.117c0 2.808 2.317 5.083 5.167 5.083h8.975c2.217 0 3.8 2.142 3.1 4.217a36.226 36.226 0 0 1-34.417 24.499zm53.234-36.942c0-4.417 3.617-7.975 8.067-7.975 4.458 0 8.075 3.567 8.075 7.975 0 35.867-27.5 65.475-62.75 69.458v16.042a8.025 8.025 0 0 1-8.075 7.975H-97a8.017 8.017 0 0 1-8.067-7.966V480.206c-35.275-3.983-62.767-33.592-62.767-69.458 0-4.417 3.617-7.975 8.075-7.975 4.45 0 8.067 3.567 8.067 7.975 0 29.775 24.533 54 54.7 54 30.15 0 54.684-24.225 54.684-54z"
      })));

      var aVoice = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-95.542%2C447.69h-2.917c-20.025%2C0-36.258-16.025-36.258-35.8v-38.525%20c0-19.775%2C16.233-35.808%2C36.258-35.808h2.917c16.157-0.067%2C30.403%2C10.578%2C34.917%2C26.092c0.488%2C1.718-0.509%2C3.506-2.227%2C3.994%20c-0.295%2C0.084-0.6%2C0.125-0.906%2C0.123H-73.2c-2.829-0.019-5.139%2C2.255-5.167%2C5.083v0.017c0%2C2.817%2C2.317%2C5.1%2C5.167%2C5.1h8.7%20c2.883%2C0%2C5.225%2C2.308%2C5.225%2C5.15c0%2C2.85-2.333%2C5.15-5.225%2C5.15h-8.7c-2.836-0.014-5.148%2C2.272-5.167%2C5.108%20c0%2C2.817%2C2.317%2C5.1%2C5.167%2C5.1h8.7c2.883%2C0%2C5.225%2C2.308%2C5.225%2C5.167c0%2C2.833-2.333%2C5.133-5.225%2C5.133h-8.7%20c-2.84-0.014-5.153%2C2.277-5.167%2C5.117v0c0%2C2.808%2C2.317%2C5.083%2C5.167%2C5.083h8.975c2.217%2C0%2C3.8%2C2.142%2C3.1%2C4.217%20C-66.155%2C437.893-80.002%2C447.751-95.542%2C447.69L-95.542%2C447.69z%20M-42.308%2C410.748c0-4.417%2C3.617-7.975%2C8.067-7.975%20c4.458%2C0%2C8.075%2C3.567%2C8.075%2C7.975c0%2C35.867-27.5%2C65.475-62.75%2C69.458v16.042c-0.028%2C4.432-3.643%2C8.003-8.075%2C7.975%20c-0.003%2C0-0.006%2C0-0.009%2C0c-4.427%2C0.028-8.039-3.539-8.067-7.966c0-0.003%2C0-0.006%2C0-0.009v-16.042%20c-35.275-3.983-62.767-33.592-62.767-69.458c0-4.417%2C3.617-7.975%2C8.075-7.975c4.45%2C0%2C8.067%2C3.567%2C8.067%2C7.975%20c0%2C29.775%2C24.533%2C54%2C54.7%2C54C-66.842%2C464.748-42.308%2C440.523-42.308%2C410.748z%22%2F%3E%3C%2Fsvg%3E";

      var _path$9;

      function _extends$9() {
        _extends$9 = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$9.apply(this, arguments);
      }

      const SvgAVoice2 = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$9({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$9 || (_path$9 = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-95.542 447.698h-2.917c-20.025 0-36.258-16.033-36.258-35.808v-38.525c0-19.775 16.233-35.808 36.258-35.808h2.917c20.025 0 36.267 16.033 36.267 35.808v38.525c0 19.774-16.242 35.808-36.267 35.808zm53.234-36.95c0-4.417 3.617-7.975 8.067-7.975 4.458 0 8.075 3.567 8.075 7.975 0 35.867-27.5 65.475-62.75 69.458v16.042a8.025 8.025 0 0 1-8.075 7.975H-97a8.017 8.017 0 0 1-8.067-7.966V480.206c-35.275-3.983-62.767-33.592-62.767-69.458 0-4.417 3.617-7.975 8.075-7.975 4.45 0 8.067 3.567 8.067 7.975 0 29.775 24.533 54 54.7 54 30.15 0 54.684-24.225 54.684-54z"
      })));

      var aVoice2 = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-95.542%2C447.698h-2.917c-20.025%2C0-36.258-16.033-36.258-35.808v-38.525%20c0-19.775%2C16.233-35.808%2C36.258-35.808h2.917c20.025%2C0%2C36.267%2C16.033%2C36.267%2C35.808v38.525%20C-59.275%2C431.664-75.517%2C447.698-95.542%2C447.698z%20M-42.308%2C410.748c0-4.417%2C3.617-7.975%2C8.067-7.975%20c4.458%2C0%2C8.075%2C3.567%2C8.075%2C7.975c0%2C35.867-27.5%2C65.475-62.75%2C69.458v16.042c-0.027%2C4.432-3.643%2C8.003-8.075%2C7.975%20c-0.003%2C0-0.006%2C0-0.009%2C0c-4.427%2C0.028-8.039-3.539-8.067-7.966c0-0.003%2C0-0.006%2C0-0.009v-16.042%20c-35.275-3.983-62.767-33.592-62.767-69.458c0-4.417%2C3.617-7.975%2C8.075-7.975c4.45%2C0%2C8.067%2C3.567%2C8.067%2C7.975%20c0%2C29.775%2C24.533%2C54%2C54.7%2C54C-66.842%2C464.748-42.308%2C440.523-42.308%2C410.748z%22%2F%3E%3C%2Fsvg%3E";

      var _path$8;

      function _extends$8() {
        _extends$8 = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$8.apply(this, arguments);
      }

      const SvgAVolumeDown = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$8({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$8 || (_path$8 = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-70.833 362.174c1.075 4.2 1.508 8.4 1.933 12.458l.392 3.683c1.5 12.3 1.5 72.733 0 85.125l-.392 3.825-.008.067c-.375 3.833-.767 7.8-1.867 12.033-2.933 10.017-10.75 16.508-19.617 16.508l-.875-.008c-4.9 0-10.225-3-13.25-5.625l-29.417-24.508h-15.108c-11.667 0-20.2-8.433-21.75-21.492-1.783-13.05-1.433-35.442 0-47.308 1.692-12.358 10.633-20.917 21.75-20.917h15.108l28.867-24.15c3.475-3.025 9.617-6.008 14.475-5.992 8.708 0 16.825 6.267 19.75 16.3l.009.001zm25.067 10.85a7.585 7.585 0 0 1 10.564 1.849l.086.125c8.45 12.442 13.117 28.733 13.117 45.875s-4.667 33.433-13.117 45.875a7.627 7.627 0 0 1-6.283 3.367 7.52 7.52 0 0 1-4.367-1.392 7.959 7.959 0 0 1-1.917-10.9c6.692-9.858 10.375-22.983 10.375-36.95 0-13.975-3.683-27.083-10.375-36.95a7.958 7.958 0 0 1 1.917-10.899z"
      })));

      var aVolumeDown = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-70.833%2C362.174c1.075%2C4.2%2C1.508%2C8.4%2C1.933%2C12.458l0.392%2C3.683c1.5%2C12.3%2C1.5%2C72.733%2C0%2C85.125%20l-0.392%2C3.825l-0.008%2C0.067c-0.375%2C3.833-0.767%2C7.8-1.867%2C12.033c-2.933%2C10.017-10.75%2C16.508-19.617%2C16.508l-0.875-0.008%20c-4.9%2C0-10.225-3-13.25-5.625l-29.417-24.508h-15.108c-11.667%2C0-20.2-8.433-21.75-21.492c-1.783-13.05-1.433-35.442%2C0-47.308%20c1.692-12.358%2C10.633-20.917%2C21.75-20.917h15.108l28.867-24.15c3.475-3.025%2C9.617-6.008%2C14.475-5.992%20c8.708%2C0%2C16.825%2C6.267%2C19.75%2C16.3L-70.833%2C362.174z%20M-45.766%2C373.024c3.428-2.406%2C8.157-1.578%2C10.564%2C1.849%20c0.029%2C0.042%2C0.058%2C0.083%2C0.086%2C0.125c8.45%2C12.442%2C13.117%2C28.733%2C13.117%2C45.875s-4.667%2C33.433-13.117%2C45.875%20c-1.409%2C2.092-3.761%2C3.353-6.283%2C3.367c-1.565%2C0.002-3.091-0.485-4.367-1.392c-3.474-2.522-4.322-7.344-1.917-10.9%20c6.692-9.858%2C10.375-22.983%2C10.375-36.95c0-13.975-3.683-27.083-10.375-36.95C-50.088%2C380.368-49.24%2C375.546-45.766%2C373.024%20L-45.766%2C373.024z%22%2F%3E%3C%2Fsvg%3E";

      var _path$7;

      function _extends$7() {
        _extends$7 = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$7.apply(this, arguments);
      }

      const SvgAVolumeOff = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$7({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$7 || (_path$7 = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-31.006 343.973a7.72 7.72 0 0 1 10.909 10.925l-142.917 142.908a7.892 7.892 0 0 1-5.45 2.258 8.028 8.028 0 0 1-5.425-2.233 7.75 7.75 0 0 1-.033-10.942l23.558-23.558h-.242c-11.742 0-20.292-8.292-21.875-21.167-1.775-12.875-1.417-34.933 0-46.667 1.667-12.167 10.667-20.542 21.875-20.542h15.25l29.117-23.817c3.542-3 9.8-5.833 14.65-5.908 8.817 0 16.933 6.167 19.842 16.05 1.15 4.15 1.6 8.283 1.95 12.267l.7 5.633c.117.867.217 1.7.308 2.583l37.783-37.79zm-46.167 87.175c1.2-1.167 3.858-2 5.058-1.692 3.242.825 3.875 5.467 3.825 9.125-.15 10.6-.5 17.975-1.067 22.533l-.4 3.758v.067c-.383 3.783-.775 7.692-1.892 11.867-2.942 9.867-10.817 16.267-19.775 16.267l-.883-.008c-4.95 0-10.308-2.967-13.358-5.55l-10.833-8.383c-4.125-3.067-2.908-7.95-.6-10.783 1.733-2.108 22.475-21.15 33.375-31.15 3.692-3.392 6.25-5.75 6.558-6.05l-.008-.001z"
      })));

      var aVolumeOff = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-31.006%2C343.973c3.017-3.012%2C7.904-3.009%2C10.917%2C0.008s3.009%2C7.904-0.008%2C10.917l-142.917%2C142.908%20c-1.456%2C1.429-3.41%2C2.238-5.45%2C2.258c-2.025-0.033-3.963-0.831-5.425-2.233c-3.023-3.015-3.038-7.908-0.033-10.942l23.558-23.558%20h-0.242c-11.742%2C0-20.292-8.292-21.875-21.167c-1.775-12.875-1.417-34.933%2C0-46.667c1.667-12.167%2C10.667-20.542%2C21.875-20.542h15.25%20l29.117-23.817c3.542-3%2C9.8-5.833%2C14.65-5.908c8.817%2C0%2C16.933%2C6.167%2C19.842%2C16.05c1.15%2C4.15%2C1.6%2C8.283%2C1.95%2C12.267l0.7%2C5.633%20c0.117%2C0.867%2C0.217%2C1.7%2C0.308%2C2.583L-31.006%2C343.973z%20M-77.173%2C431.148c1.2-1.167%2C3.858-2%2C5.058-1.692%20c3.242%2C0.825%2C3.875%2C5.467%2C3.825%2C9.125c-0.15%2C10.6-0.5%2C17.975-1.067%2C22.533l-0.4%2C3.758v0.067c-0.383%2C3.783-0.775%2C7.692-1.892%2C11.867%20c-2.942%2C9.867-10.817%2C16.267-19.775%2C16.267l-0.883-0.008c-4.95%2C0-10.308-2.967-13.358-5.55l-10.833-8.383%20c-4.125-3.067-2.908-7.95-0.6-10.783c1.733-2.108%2C22.475-21.15%2C33.375-31.15c3.692-3.392%2C6.25-5.75%2C6.558-6.05L-77.173%2C431.148z%22%2F%3E%3C%2Fsvg%3E";

      var _path$6;

      function _extends$6() {
        _extends$6 = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$6.apply(this, arguments);
      }

      const SvgAVolumeUp = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$6({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$6 || (_path$6 = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-85.691 374.639c-.417-4.05-.858-8.25-1.933-12.45-2.917-10.033-11.033-16.3-19.725-16.3-4.85-.017-10.983 2.967-14.467 6l-28.833 24.142h-15.083c-11.108 0-20.033 8.558-21.725 20.917-1.433 11.867-1.783 34.25 0 47.308 1.55 13.058 10.083 21.492 21.725 21.492h15.083l29.392 24.5c3.017 2.625 8.333 5.633 13.233 5.633l.875.008c8.858 0 16.667-6.5 19.583-16.5 1.108-4.242 1.5-8.208 1.867-12.042l.008-.067.392-3.825c1.5-12.392 1.5-72.825 0-85.125l-.392-3.683v-.008zm33.75.375a7.559 7.559 0 0 0-10.658-1.975 7.975 7.975 0 0 0-1.9 10.9c6.683 9.85 10.358 22.967 10.358 36.95 0 13.975-3.675 27.1-10.358 36.95a7.966 7.966 0 0 0 1.917 10.9 7.541 7.541 0 0 0 10.641-1.975c8.433-12.433 13.092-28.725 13.092-45.875s-4.659-33.441-13.092-45.875zm15.692-27.291a7.542 7.542 0 0 1 10.641 1.967c13.075 19.258 20.275 44.55 20.275 71.2 0 26.667-7.2 51.95-20.275 71.2a7.517 7.517 0 0 1-10.634 1.967 7.976 7.976 0 0 1-1.917-10.9c11.3-16.658 17.533-38.775 17.533-62.267 0-23.483-6.233-45.6-17.542-62.258a7.982 7.982 0 0 1 1.917-10.9v-.009z"
      })));

      var aVolumeUp = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-85.691%2C374.639c-0.417-4.05-0.858-8.25-1.933-12.45c-2.917-10.033-11.033-16.3-19.725-16.3%20c-4.85-0.017-10.983%2C2.967-14.467%2C6l-28.833%2C24.142h-15.083c-11.108%2C0-20.033%2C8.558-21.725%2C20.917%20c-1.433%2C11.867-1.783%2C34.25%2C0%2C47.308c1.55%2C13.058%2C10.083%2C21.492%2C21.725%2C21.492h15.083l29.392%2C24.5%20c3.017%2C2.625%2C8.333%2C5.633%2C13.233%2C5.633l0.875%2C0.008c8.858%2C0%2C16.667-6.5%2C19.583-16.5c1.108-4.242%2C1.5-8.208%2C1.867-12.042l0.008-0.067%20l0.392-3.825c1.5-12.392%2C1.5-72.825%2C0-85.125l-0.392-3.683V374.639z%20M-51.941%2C375.014c-2.315-3.473-7.008-4.412-10.481-2.097%20c-0.06%2C0.04-0.118%2C0.08-0.177%2C0.122c-3.461%2C2.532-4.3%2C7.347-1.9%2C10.9c6.683%2C9.85%2C10.358%2C22.967%2C10.358%2C36.95%20c0%2C13.975-3.675%2C27.1-10.358%2C36.95c-2.401%2C3.557-1.554%2C8.376%2C1.917%2C10.9c3.398%2C2.409%2C8.105%2C1.608%2C10.514-1.79%20c0.043-0.061%2C0.086-0.123%2C0.127-0.185c8.433-12.433%2C13.092-28.725%2C13.092-45.875S-43.508%2C387.448-51.941%2C375.014z%20M-36.249%2C347.723%20c3.396-2.411%2C8.104-1.613%2C10.515%2C1.783c0.043%2C0.061%2C0.085%2C0.122%2C0.126%2C0.184c13.075%2C19.258%2C20.275%2C44.55%2C20.275%2C71.2%20c0%2C26.667-7.2%2C51.95-20.275%2C71.2c-2.293%2C3.461-6.957%2C4.408-10.418%2C2.115c-0.073-0.048-0.145-0.098-0.216-0.148%20c-3.466-2.527-4.313-7.342-1.917-10.9c11.3-16.658%2C17.533-38.775%2C17.533-62.267c0-23.483-6.233-45.6-17.542-62.258%20c-2.392-3.559-1.546-8.371%2C1.917-10.9V347.723z%22%2F%3E%3C%2Fsvg%3E";

      var _path$5, _path2;

      function _extends$5() {
        _extends$5 = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$5.apply(this, arguments);
      }

      const SvgAWallet = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$5({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$5 || (_path$5 = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-19.892 403.547h-29.025c-5.066.049-9.86 2.3-13.133 6.167a16.513 16.513 0 0 0-3.608 13.767c1.875 7.875 9.125 13.4 17.408 13.292h28.358a6.217 6.217 0 0 0 6.225-6.067v-21.092c0-3.351-2.783-6.067-6.225-6.067zm-25.033 22.175h-2.742c-3.533-.033-6.367-2.842-6.367-6.283a6.058 6.058 0 0 1 1.867-4.367 6.382 6.382 0 0 1 4.5-1.775h2.743a6.292 6.292 0 0 1 6.366 6.217 6.292 6.292 0 0 1-6.367 6.208z"
      })), _path2 || (_path2 = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-78.558 420.305c0-15.958 13.267-28.892 29.633-28.892v-.283h35.258c0-28.308-16.967-44.85-45.7-44.85h-75.267c-28.733 0-45.7 16.542-45.7 44.483v61.033c0 27.942 16.967 44.483 45.7 44.483h75.267c28.733 0 45.7-16.542 45.7-44.483v-2.608h-35.258c-16.367 0-29.633-12.933-29.633-28.883zm-8.884-35.382a6.29 6.29 0 0 1-6.375 6.207h-47.033c-3.533-.033-6.375-2.842-6.375-6.283a6.292 6.292 0 0 1 6.375-6.142h47.034a6.292 6.292 0 0 1 6.374 6.208v.01z"
      })));

      var aWallet = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cg%3E%20%3Cpath%20d%3D%22M-19.892%2C403.547h-29.025c-5.066%2C0.049-9.86%2C2.3-13.133%2C6.167c-3.22%2C3.809-4.546%2C8.868-3.608%2C13.767%20%20c1.875%2C7.875%2C9.125%2C13.4%2C17.408%2C13.292h28.358c3.379%2C0.006%2C6.143-2.689%2C6.225-6.067v-21.092%20%20C-13.667%2C406.263-16.45%2C403.547-19.892%2C403.547z%20M-44.925%2C425.722h-2.742c-3.533-0.033-6.367-2.842-6.367-6.283%20%20c0.002-1.649%2C0.676-3.226%2C1.867-4.367c1.209-1.159%2C2.825-1.797%2C4.5-1.775h2.742h0.001c3.475-0.041%2C6.325%2C2.742%2C6.366%2C6.217%20%20C-38.604%2C422.985-41.453%2C425.763-44.925%2C425.722z%22%2F%3E%20%3Cpath%20d%3D%22M-78.558%2C420.305c0-15.958%2C13.267-28.892%2C29.633-28.892v-0.283h35.258%20%20c0-28.308-16.967-44.85-45.7-44.85h-75.267c-28.733%2C0-45.7%2C16.542-45.7%2C44.483v61.033c0%2C27.942%2C16.967%2C44.483%2C45.7%2C44.483h75.267%20%20c28.733%2C0%2C45.7-16.542%2C45.7-44.483v-2.608h-35.258C-65.292%2C449.188-78.558%2C436.255-78.558%2C420.305z%20M-87.442%2C384.923%20%20c-0.046%2C3.474-2.9%2C6.254-6.375%2C6.207h-47.033c-3.533-0.033-6.375-2.842-6.375-6.283c0.082-3.449%2C2.926-6.188%2C6.375-6.142h47.033%20%20c0%2C0%2C0.001%2C0%2C0.001%2C0c3.474-0.046%2C6.328%2C2.734%2C6.374%2C6.208C-87.442%2C384.916-87.442%2C384.92-87.442%2C384.923z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E";

      var _path$4;

      function _extends$4() {
        _extends$4 = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$4.apply(this, arguments);
      }

      const SvgAWork = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$4({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.89 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$4 || (_path$4 = /*#__PURE__*/React__namespace.createElement("path", {
        d: "M-107.8 350.605c-5.583 0-10.333 3.883-11.667 9.117h44.85a12.108 12.108 0 0 0-11.667-9.117H-107.8zm45.858 9.117h16.508c17.517 0 31.767 14.425 31.767 32.142 0 0-.5 7.5-.667 17.95a2.752 2.752 0 0 1-1.083 2.125c-4 2.958-7.667 5.417-8 5.583-13.842 9.275-29.925 15.808-47.058 19.058a2.65 2.65 0 0 1-2.792-1.358 27.467 27.467 0 0 0-23.775-13.742 27.917 27.917 0 0 0-23.933 13.692 2.659 2.659 0 0 1-2.775 1.333 129.07 129.07 0 0 1-46.833-18.908l-8-5.567a2.381 2.381 0 0 1-1.083-2.025c-.25-4.292-.667-18.133-.667-18.133 0-17.725 14.25-32.15 31.767-32.15h16.417c1.6-12.242 11.858-21.775 24.358-21.775h21.517c12.5 0 22.758 9.533 24.342 21.775h-.01zm45.442 68.35-.333.167c-16.842 11.308-37.1 18.825-58.367 21.942a6.275 6.275 0 0 1-6.833-4.55 15.133 15.133 0 0 0-14.842-11.483h-.25c-7.083 0-13 4.558-14.833 11.483a6.275 6.275 0 0 1-6.842 4.55c-21.267-3.117-41.525-10.633-58.367-21.942-.083-.083-.917-.583-1.583-.167-.75.417-.75 1.433-.75 1.433l.583 43.042c0 17.725 14.167 32.067 31.683 32.067H-46.85c17.508 0 31.683-14.342 31.683-32.067l.667-43.042s0-1.008-.75-1.433c-.417-.25-.917-.167-1.25 0zm-74.292 35.358c0 3.55-2.75 6.333-6.25 6.333a6.283 6.283 0 0 1-6.25-6.316V452.547c0-3.458 2.833-6.333 6.25-6.333 3.5 0 6.25 2.875 6.25 6.333v10.883z"
      })));

      var aWork = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.89%20200%20200%22%20%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-107.8%2C350.605c-5.583%2C0-10.333%2C3.883-11.667%2C9.117h44.85c-1.361-5.34-6.156-9.086-11.667-9.117%20H-107.8z%20M-61.942%2C359.722h16.508c17.517%2C0%2C31.767%2C14.425%2C31.767%2C32.142c0%2C0-0.5%2C7.5-0.667%2C17.95%20c-0.019%2C0.836-0.418%2C1.618-1.083%2C2.125c-4%2C2.958-7.667%2C5.417-8%2C5.583c-13.842%2C9.275-29.925%2C15.808-47.058%2C19.058%20c-1.126%2C0.197-2.252-0.351-2.792-1.358c-4.902-8.498-13.965-13.736-23.775-13.742c-9.832%2C0.031-18.923%2C5.232-23.933%2C13.692%20c-0.547%2C0.989-1.661%2C1.524-2.775%2C1.333c-16.704-3.157-32.62-9.583-46.833-18.908l-8-5.567c-0.684-0.445-1.093-1.209-1.083-2.025%20c-0.25-4.292-0.667-18.133-0.667-18.133c0-17.725%2C14.25-32.15%2C31.767-32.15h16.417c1.6-12.242%2C11.858-21.775%2C24.358-21.775h21.517%20c12.5%2C0%2C22.758%2C9.533%2C24.342%2C21.775H-61.942z%20M-16.5%2C428.072l-0.333%2C0.167c-16.842%2C11.308-37.1%2C18.825-58.367%2C21.942%20c-3.092%2C0.39-6.001-1.547-6.833-4.55c-1.69-6.803-7.832-11.555-14.842-11.483h-0.25c-7.083%2C0-13%2C4.558-14.833%2C11.483%20c-0.832%2C3.006-3.747%2C4.945-6.842%2C4.55c-21.267-3.117-41.525-10.633-58.367-21.942c-0.083-0.083-0.917-0.583-1.583-0.167%20c-0.75%2C0.417-0.75%2C1.433-0.75%2C1.433l0.583%2C43.042c0%2C17.725%2C14.167%2C32.067%2C31.683%2C32.067H-46.85%20c17.508%2C0%2C31.683-14.342%2C31.683-32.067l0.667-43.042c0%2C0%2C0-1.008-0.75-1.433C-15.667%2C427.822-16.167%2C427.905-16.5%2C428.072%20L-16.5%2C428.072z%20M-90.792%2C463.43c0%2C3.55-2.75%2C6.333-6.25%2C6.333c-3.47-0.018-6.268-2.846-6.25-6.316c0-0.006%2C0-0.011%2C0-0.017v-10.883%20c0-3.458%2C2.833-6.333%2C6.25-6.333c3.5%2C0%2C6.25%2C2.875%2C6.25%2C6.333V463.43z%22%2F%3E%3C%2Fsvg%3E";

      var _path$3;

      function _extends$3() {
        _extends$3 = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$3.apply(this, arguments);
      }

      const SvgAZoomInFill = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$3({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.9 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$3 || (_path$3 = /*#__PURE__*/React__namespace.createElement("path", {
        d: "m-48.9 457.4 35.1 35.1-11.6 11.6-35.1-35.1c-13.1 10.5-29.3 16.2-46.1 16.1-40.7 0-73.8-33.1-73.8-73.8s33.1-73.8 73.8-73.8 73.8 33.1 73.8 73.8c.1 16.8-5.6 33.1-16.1 46.1zm-65.8-54.2h-24.6v16.4h24.6v24.6h16.4v-24.6h24.6v-16.4h-24.6v-24.6h-16.4v24.6z"
      })));

      var aZoomInFill = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.9%20200%20200%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-48.9%2C457.4l35.1%2C35.1l-11.6%2C11.6L-60.5%2C469c-13.1%2C10.5-29.3%2C16.2-46.1%2C16.1c-40.7%2C0-73.8-33.1-73.8-73.8%20s33.1-73.8%2C73.8-73.8s73.8%2C33.1%2C73.8%2C73.8C-32.7%2C428.1-38.4%2C444.4-48.9%2C457.4L-48.9%2C457.4z%20M-114.7%2C403.2h-24.6v16.4h24.6v24.6h16.4%20v-24.6h24.6v-16.4h-24.6v-24.6h-16.4V403.2z%22%2F%3E%3C%2Fsvg%3E";

      var _path$2;

      function _extends$2() {
        _extends$2 = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$2.apply(this, arguments);
      }

      const SvgAZoomInLine = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$2({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.9 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$2 || (_path$2 = /*#__PURE__*/React__namespace.createElement("path", {
        d: "m-49.1 457.3 35.1 35.1-11.6 11.6-35.1-35.1c-13 10.5-29.3 16.1-46 16.1-40.7 0-73.7-33-73.7-73.7s33-73.7 73.7-73.7 73.7 33 73.7 73.7c.1 16.7-5.6 32.9-16.1 46zm-16.4-6.1c10.4-10.7 16.2-25 16.2-39.9 0-31.7-25.7-57.3-57.3-57.3-31.7 0-57.3 25.6-57.3 57.3 0 31.7 25.6 57.3 57.3 57.3 14.9 0 29.2-5.8 39.9-16.2l1.2-1.2zm-49.3-48.1v-24.6h16.4v24.6h24.6v16.4h-24.6V444h-16.4v-24.6h-24.6V403h24.6z"
      })));

      var aZoomInLine = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.9%20200%20200%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-49.1%2C457.3l35.1%2C35.1l-11.6%2C11.6l-35.1-35.1c-13%2C10.5-29.3%2C16.1-46%2C16.1c-40.7%2C0-73.7-33-73.7-73.7s33-73.7%2C73.7-73.7%20s73.7%2C33%2C73.7%2C73.7C-32.9%2C428-38.6%2C444.2-49.1%2C457.3L-49.1%2C457.3z%20M-65.5%2C451.2c10.4-10.7%2C16.2-25%2C16.2-39.9%20c0-31.7-25.7-57.3-57.3-57.3c-31.7%2C0-57.3%2C25.6-57.3%2C57.3c0%2C31.7%2C25.6%2C57.3%2C57.3%2C57.3c14.9%2C0%2C29.2-5.8%2C39.9-16.2L-65.5%2C451.2%20L-65.5%2C451.2z%20M-114.8%2C403.1v-24.6h16.4v24.6h24.6v16.4h-24.6V444h-16.4v-24.6h-24.6v-16.4H-114.8z%22%2F%3E%3C%2Fsvg%3E";

      var _path$1;

      function _extends$1() {
        _extends$1 = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends$1.apply(this, arguments);
      }

      const SvgAZoomOutFill = props => /*#__PURE__*/React__namespace.createElement("svg", _extends$1({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.9 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path$1 || (_path$1 = /*#__PURE__*/React__namespace.createElement("path", {
        d: "m-49.1 457.2 35.1 35.1-11.6 11.6-35.1-35.1c-13 10.5-29.3 16.1-46 16.1-40.7 0-73.7-33-73.7-73.7s33-73.7 73.7-73.7 73.7 33 73.7 73.7c0 16.8-5.6 33-16.1 46zm-90.3-54.2v16.4h65.5V403h-65.5z"
      })));

      var aZoomOutFill = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.9%20200%20200%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-49.1%2C457.2l35.1%2C35.1l-11.6%2C11.6l-35.1-35.1c-13%2C10.5-29.3%2C16.1-46%2C16.1c-40.7%2C0-73.7-33-73.7-73.7s33-73.7%2C73.7-73.7%20s73.7%2C33%2C73.7%2C73.7C-33%2C428-38.6%2C444.2-49.1%2C457.2L-49.1%2C457.2z%20M-139.4%2C403v16.4h65.5V403H-139.4z%22%2F%3E%3C%2Fsvg%3E";

      var _path;

      function _extends() {
        _extends = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends.apply(this, arguments);
      }

      const SvgAZoomOutLine = props => /*#__PURE__*/React__namespace.createElement("svg", _extends({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-197 320.9 200 200",
        xmlSpace: "preserve",
        width: "1em",
        height: "1em"
      }, props), _path || (_path = /*#__PURE__*/React__namespace.createElement("path", {
        d: "m-49 457.8 35.1 35.1-11.6 11.6-35.1-35.1c-13.1 10.5-29.3 16.2-46 16.1-40.7 0-73.8-33-73.8-73.8s33-73.8 73.8-73.8 73.8 33 73.8 73.8c-.1 16.8-5.8 33.1-16.2 46.1zm-16.5-6c10.4-10.7 16.2-25 16.2-40 0-31.7-25.7-57.4-57.4-57.4s-57.4 25.7-57.4 57.4 25.7 57.4 57.4 57.4c14.9 0 29.3-5.8 40-16.2l1.2-1.2zm-73.9-48.2h65.6V420h-65.6v-16.4z"
      })));

      var aZoomOutLine = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%22-197%20320.9%20200%20200%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M-49%2C457.8l35.1%2C35.1l-11.6%2C11.6l-35.1-35.1c-13.1%2C10.5-29.3%2C16.2-46%2C16.1c-40.7%2C0-73.8-33-73.8-73.8s33-73.8%2C73.8-73.8%20s73.8%2C33%2C73.8%2C73.8C-32.9%2C428.5-38.6%2C444.8-49%2C457.8L-49%2C457.8z%20M-65.5%2C451.8c10.4-10.7%2C16.2-25%2C16.2-40c0-31.7-25.7-57.4-57.4-57.4%20c-31.7%2C0-57.4%2C25.7-57.4%2C57.4c0%2C31.7%2C25.7%2C57.4%2C57.4%2C57.4c14.9%2C0%2C29.3-5.8%2C40-16.2L-65.5%2C451.8L-65.5%2C451.8z%20M-139.4%2C403.6h65.6V420%20h-65.6V403.6z%22%2F%3E%3C%2Fsvg%3E";

      function styleInject(css, ref) {
        if (ref === void 0) ref = {};
        var insertAt = ref.insertAt;

        if (!css || typeof document === 'undefined') {
          return;
        }

        var head = document.head || document.getElementsByTagName('head')[0];
        var style = document.createElement('style');
        style.type = 'text/css';

        if (insertAt === 'top') {
          if (head.firstChild) {
            head.insertBefore(style, head.firstChild);
          } else {
            head.appendChild(style);
          }
        } else {
          head.appendChild(style);
        }

        if (style.styleSheet) {
          style.styleSheet.cssText = css;
        } else {
          style.appendChild(document.createTextNode(css));
        }
      }

      var css_248z = "svg {\n  stroke-width: 0;\n  /*stroke: currentColor;\n  fill: currentColor;*/\n}\n\nsvg path[fill] {\n  fill: currentColor;\n  fill-opacity: 1;\n}\n\nsvg path[stroke] {\n  stroke: currentColor;\n  stroke-opacity: 1;\n}\n\n";
      styleInject(css_248z);
      /**
       * 创建 Icon
       *
       * @param { classname, name, ...attr }
       * @return string
       */

      function createIcon(_a) {
        var classname = _a.classname,
            name = _a.name,
            attr = __rest(_a, ["classname", "name"]);

        if (!name) return '';
        var indexSplit = name.indexOf(',');

        if (indexSplit > 0) {
          name = name.substr(indexSplit + 1);
        }

        name = decodeURIComponent(name);
        var attribute = '';

        var _b = __read(name.split('<svg'), 2),
            start = _b[0],
            end = _b[1];

        if (attr) {
          attribute = Object.entries(attr).map(function (_a) {
            var _b = __read(_a, 2),
                key = _b[0],
                value = _b[1];

            return key + "=\"" + value + "\"";
          }).join(' ');
        }

        return start + "<svg class=\"" + classname + "\" " + attribute + " " + end;
      }

      exports.Icon3User = SvgA3User;
      exports.IconArrowDown = SvgAArrowDown;
      exports.IconArrowLeft = SvgAArrowLeft;
      exports.IconArrowLeftSquare = SvgAArrowLeftSquare;
      exports.IconArrowMove = SvgAArrowMove;
      exports.IconArrowRight = SvgAArrowRight;
      exports.IconArrowSort = SvgAArrowSort;
      exports.IconArrowTailRight = SvgAArrowTailRight;
      exports.IconArrowTailUp = SvgAArrowTailUp;
      exports.IconArrowUp = SvgAArrowUp;
      exports.IconBackward = SvgABackward;
      exports.IconBag = SvgABag;
      exports.IconBookmark = SvgABookmark;
      exports.IconBuy = SvgABuy;
      exports.IconCalendar = SvgACalendar;
      exports.IconCall = SvgACall;
      exports.IconCallMissed = SvgACallMissed;
      exports.IconCallSilent = SvgACallSilent;
      exports.IconCalling = SvgACalling;
      exports.IconCamera = SvgACamera;
      exports.IconCategory = SvgACategory;
      exports.IconChart = SvgAChart;
      exports.IconChat = SvgAChat;
      exports.IconCheckbox = SvgACheckbox;
      exports.IconCheckboxChecked = SvgACheckboxChecked;
      exports.IconClose = SvgAClose;
      exports.IconCloseSquare = SvgACloseSquare;
      exports.IconComputer = SvgAComputer;
      exports.IconDanger = SvgADanger;
      exports.IconDelete = SvgADelete;
      exports.IconDiscount = SvgADiscount;
      exports.IconDiscovery = SvgADiscovery;
      exports.IconDocument = SvgADocument;
      exports.IconDownload = SvgADownload;
      exports.IconEdit = SvgAEdit;
      exports.IconEditSquare = SvgAEditSquare;
      exports.IconExchange = SvgAExchange;
      exports.IconFastForward = SvgAFastForward;
      exports.IconFilter = SvgAFilter;
      exports.IconFilter2 = SvgAFilter2;
      exports.IconFolder = SvgAFolder;
      exports.IconGame = SvgAGame;
      exports.IconGraph = SvgAGraph;
      exports.IconHeart = SvgAHeart;
      exports.IconHide = SvgAHide;
      exports.IconHome = SvgAHome;
      exports.IconImage = SvgAImage;
      exports.IconImage2 = SvgAImage2;
      exports.IconInfoCircle = SvgAInfoCircle;
      exports.IconInfoSquare = SvgAInfoSquare;
      exports.IconLament = SvgALament;
      exports.IconLocation = SvgALocation;
      exports.IconLock = SvgALock;
      exports.IconLogin = SvgALogin;
      exports.IconLogout = SvgALogout;
      exports.IconMaximize = SvgAMaximize;
      exports.IconMaximize2 = SvgAMaximize2;
      exports.IconMessage = SvgAMessage;
      exports.IconMinimize = SvgAMinimize;
      exports.IconMinimize2 = SvgAMinimize2;
      exports.IconMoreCircle = SvgAMoreCircle;
      exports.IconMoreSquare = SvgAMoreSquare;
      exports.IconNext = SvgANext;
      exports.IconNotification = SvgANotification;
      exports.IconPTZCtrl = SvgAPtzCtrl;
      exports.IconPaper = SvgAPaper;
      exports.IconPaperDownload = SvgAPaperDownload;
      exports.IconPaperFail = SvgAPaperFail;
      exports.IconPaperNegative = SvgAPaperNegative;
      exports.IconPaperPlus = SvgAPaperPlus;
      exports.IconPaperUpload = SvgAPaperUpload;
      exports.IconPassword = SvgAPassword;
      exports.IconPause = SvgAPause;
      exports.IconPlay = SvgAPlay;
      exports.IconPlay2 = SvgAPlay2;
      exports.IconPlus = SvgAPlus;
      exports.IconPrev = SvgAPrev;
      exports.IconProfile = SvgAProfile;
      exports.IconRadio = SvgARadio;
      exports.IconScan = SvgAScan;
      exports.IconScreenSharing = SvgAScreenSharing;
      exports.IconScreenshot = SvgAScreenshot;
      exports.IconSearch = SvgASearch;
      exports.IconSearchFill = SvgASearchFill;
      exports.IconSearchFill2 = SvgASearchFill2;
      exports.IconSearchLine = SvgASearchLine;
      exports.IconSearchLine2 = SvgASearchLine2;
      exports.IconSend = SvgASend;
      exports.IconSetting = SvgASetting;
      exports.IconShieldDone = SvgAShieldDone;
      exports.IconShieldFail = SvgAShieldFail;
      exports.IconShow = SvgAShow;
      exports.IconStar = SvgAStar;
      exports.IconSwap = SvgASwap;
      exports.IconThreeDimensional = SvgAThreeDimensional;
      exports.IconTickSquare = SvgATickSquare;
      exports.IconTicket = SvgATicket;
      exports.IconTicketStar = SvgATicketStar;
      exports.IconTimeCircle = SvgATimeCircle;
      exports.IconTimeSquare = SvgATimeSquare;
      exports.IconUnlock = SvgAUnlock;
      exports.IconUpload = SvgAUpload;
      exports.IconVideo = SvgAVideo;
      exports.IconVideo2 = SvgAVideo2;
      exports.IconVideoDisabled = SvgAVideoDisabled;
      exports.IconVoice = SvgAVoice;
      exports.IconVoice2 = SvgAVoice2;
      exports.IconVolumeDown = SvgAVolumeDown;
      exports.IconVolumeOff = SvgAVolumeOff;
      exports.IconVolumeUp = SvgAVolumeUp;
      exports.IconWallet = SvgAWallet;
      exports.IconWork = SvgAWork;
      exports.IconZoomInFill = SvgAZoomInFill;
      exports.IconZoomInLine = SvgAZoomInLine;
      exports.IconZoomOutFill = SvgAZoomOutFill;
      exports.IconZoomOutLine = SvgAZoomOutLine;
      exports.createIcon = createIcon;
      exports.url3User = a3User;
      exports.urlArrowDown = aArrowDown;
      exports.urlArrowLeft = aArrowLeft;
      exports.urlArrowLeftSquare = aArrowLeftSquare;
      exports.urlArrowMove = aArrowMove;
      exports.urlArrowRight = aArrowRight;
      exports.urlArrowSort = aArrowSort;
      exports.urlArrowTailRight = aArrowTailRight;
      exports.urlArrowTailUp = aArrowTailUp;
      exports.urlArrowUp = aArrowUp;
      exports.urlBackward = aBackward;
      exports.urlBag = aBag;
      exports.urlBookmark = aBookmark;
      exports.urlBuy = aBuy;
      exports.urlCalendar = aCalendar;
      exports.urlCall = aCall;
      exports.urlCallMissed = aCallMissed;
      exports.urlCallSilent = aCallSilent;
      exports.urlCalling = aCalling;
      exports.urlCamera = aCamera;
      exports.urlCategory = aCategory;
      exports.urlChart = aChart;
      exports.urlChat = aChat;
      exports.urlCheckbox = aCheckbox;
      exports.urlCheckboxChecked = aCheckboxChecked;
      exports.urlClose = aClose;
      exports.urlCloseSquare = aCloseSquare;
      exports.urlComputer = aComputer;
      exports.urlDanger = aDanger;
      exports.urlDelete = aDelete;
      exports.urlDiscount = aDiscount;
      exports.urlDiscovery = aDiscovery;
      exports.urlDocument = aDocument;
      exports.urlDownload = aDownload;
      exports.urlEdit = aEdit;
      exports.urlEditSquare = aEditSquare;
      exports.urlExchange = aExchange;
      exports.urlFastForward = aFastForward;
      exports.urlFilter = aFilter;
      exports.urlFilter2 = aFilter2;
      exports.urlFolder = aFolder;
      exports.urlGame = aGame;
      exports.urlGraph = aGraph;
      exports.urlHeart = aHeart;
      exports.urlHide = aHide;
      exports.urlHome = aHome;
      exports.urlImage = aImage;
      exports.urlImage2 = aImage2;
      exports.urlInfoCircle = aInfoCircle;
      exports.urlInfoSquare = aInfoSquare;
      exports.urlLament = aLament;
      exports.urlLocation = aLocation;
      exports.urlLock = aLock;
      exports.urlLogin = aLogin;
      exports.urlLogout = aLogout;
      exports.urlMaximize = aMaximize;
      exports.urlMaximize2 = aMaximize2;
      exports.urlMessage = aMessage;
      exports.urlMinimize = aMinimize;
      exports.urlMinimize2 = aMinimize2;
      exports.urlMoreCircle = aMoreCircle;
      exports.urlMoreSquare = aMoreSquare;
      exports.urlNext = aNext;
      exports.urlNotification = aNotification;
      exports.urlPTZCtrl = aPTZCtrl;
      exports.urlPaper = aPaper;
      exports.urlPaperDownload = aPaperDownload;
      exports.urlPaperFail = aPaperFail;
      exports.urlPaperNegative = aPaperNegative;
      exports.urlPaperPlus = aPaperPlus;
      exports.urlPaperUpload = aPaperUpload;
      exports.urlPassword = aPassword;
      exports.urlPause = aPause;
      exports.urlPlay = aPlay;
      exports.urlPlay2 = aPlay2;
      exports.urlPlus = aPlus;
      exports.urlPrev = aPrev;
      exports.urlProfile = aProfile;
      exports.urlRadio = aRadio;
      exports.urlScan = aScan;
      exports.urlScreenSharing = aScreenSharing;
      exports.urlScreenshot = aScreenshot;
      exports.urlSearch = aSearch;
      exports.urlSearchFill = aSearchFill;
      exports.urlSearchFill2 = aSearchFill2;
      exports.urlSearchLine = aSearchLine;
      exports.urlSearchLine2 = aSearchLine2;
      exports.urlSend = aSend;
      exports.urlSetting = aSetting;
      exports.urlShieldDone = aShieldDone;
      exports.urlShieldFail = aShieldFail;
      exports.urlShow = aShow;
      exports.urlStar = aStar;
      exports.urlSwap = aSwap;
      exports.urlThreeDimensional = aThreeDimensional;
      exports.urlTickSquare = aTickSquare;
      exports.urlTicket = aTicket;
      exports.urlTicketStar = aTicketStar;
      exports.urlTimeCircle = aTimeCircle;
      exports.urlTimeSquare = aTimeSquare;
      exports.urlUnlock = aUnlock;
      exports.urlUpload = aUpload;
      exports.urlVideo = aVideo;
      exports.urlVideo2 = aVideo2;
      exports.urlVideoDisabled = aVideoDisabled;
      exports.urlVoice = aVoice;
      exports.urlVoice2 = aVoice2;
      exports.urlVolumeDown = aVolumeDown;
      exports.urlVolumeOff = aVolumeOff;
      exports.urlVolumeUp = aVolumeUp;
      exports.urlWallet = aWallet;
      exports.urlWork = aWork;
      exports.urlZoomInFill = aZoomInFill;
      exports.urlZoomInLine = aZoomInLine;
      exports.urlZoomOutFill = aZoomOutFill;
      exports.urlZoomOutLine = aZoomOutLine;
      Object.defineProperty(exports, '__esModule', {
        value: true
      });
    });
  });
  unwrapExports(lib$1);

  var RecordRTC_1 = createCommonjsModule(function (module) {
    // ________________
    // RecordRTC v5.6.2
    // Open-Sourced: https://github.com/muaz-khan/RecordRTC
    // --------------------------------------------------
    // Muaz Khan     - www.MuazKhan.com
    // MIT License   - www.WebRTC-Experiment.com/licence
    // --------------------------------------------------
    // ____________
    // RecordRTC.js

    /**
     * {@link https://github.com/muaz-khan/RecordRTC|RecordRTC} is a WebRTC JavaScript library for audio/video as well as screen activity recording. It supports Chrome, Firefox, Opera, Android, and Microsoft Edge. Platforms: Linux, Mac and Windows. 
     * @summary Record audio, video or screen inside the browser.
     * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
     * @author {@link https://MuazKhan.com|Muaz Khan}
     * @typedef RecordRTC
     * @class
     * @example
     * var recorder = RecordRTC(mediaStream or [arrayOfMediaStream], {
     *     type: 'video', // audio or video or gif or canvas
     *     recorderType: MediaStreamRecorder || CanvasRecorder || StereoAudioRecorder || Etc
     * });
     * recorder.startRecording();
     * @see For further information:
     * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
     * @param {MediaStream} mediaStream - Single media-stream object, array of media-streams, html-canvas-element, etc.
     * @param {object} config - {type:"video", recorderType: MediaStreamRecorder, disableLogs: true, numberOfAudioChannels: 1, bufferSize: 0, sampleRate: 0, desiredSampRate: 16000, video: HTMLVideoElement, etc.}
     */

    function RecordRTC(mediaStream, config) {
      if (!mediaStream) {
        throw 'First parameter is required.';
      }

      config = config || {
        type: 'video'
      };
      config = new RecordRTCConfiguration(mediaStream, config); // a reference to user's recordRTC object

      var self = this;

      function startRecording(config2) {
        if (!config.disableLogs) {
          console.log('RecordRTC version: ', self.version);
        }

        if (!!config2) {
          // allow users to set options using startRecording method
          // config2 is similar to main "config" object (second parameter over RecordRTC constructor)
          config = new RecordRTCConfiguration(mediaStream, config2);
        }

        if (!config.disableLogs) {
          console.log('started recording ' + config.type + ' stream.');
        }

        if (mediaRecorder) {
          mediaRecorder.clearRecordedData();
          mediaRecorder.record();
          setState('recording');

          if (self.recordingDuration) {
            handleRecordingDuration();
          }

          return self;
        }

        initRecorder(function () {
          if (self.recordingDuration) {
            handleRecordingDuration();
          }
        });
        return self;
      }

      function initRecorder(initCallback) {
        if (initCallback) {
          config.initCallback = function () {
            initCallback();
            initCallback = config.initCallback = null; // recorder.initRecorder should be call-backed once.
          };
        }

        var Recorder = new GetRecorderType(mediaStream, config);
        mediaRecorder = new Recorder(mediaStream, config);
        mediaRecorder.record();
        setState('recording');

        if (!config.disableLogs) {
          console.log('Initialized recorderType:', mediaRecorder.constructor.name, 'for output-type:', config.type);
        }
      }

      function stopRecording(callback) {
        callback = callback || function () {};

        if (!mediaRecorder) {
          warningLog();
          return;
        }

        if (self.state === 'paused') {
          self.resumeRecording();
          setTimeout(function () {
            stopRecording(callback);
          }, 1);
          return;
        }

        if (self.state !== 'recording' && !config.disableLogs) {
          console.warn('Recording state should be: "recording", however current state is: ', self.state);
        }

        if (!config.disableLogs) {
          console.log('Stopped recording ' + config.type + ' stream.');
        }

        if (config.type !== 'gif') {
          mediaRecorder.stop(_callback);
        } else {
          mediaRecorder.stop();

          _callback();
        }

        setState('stopped');

        function _callback(__blob) {
          if (!mediaRecorder) {
            if (typeof callback.call === 'function') {
              callback.call(self, '');
            } else {
              callback('');
            }

            return;
          }

          Object.keys(mediaRecorder).forEach(function (key) {
            if (typeof mediaRecorder[key] === 'function') {
              return;
            }

            self[key] = mediaRecorder[key];
          });
          var blob = mediaRecorder.blob;

          if (!blob) {
            if (__blob) {
              mediaRecorder.blob = blob = __blob;
            } else {
              throw 'Recording failed.';
            }
          }

          if (blob && !config.disableLogs) {
            console.log(blob.type, '->', bytesToSize(blob.size));
          }

          if (callback) {
            var url;

            try {
              url = URL.createObjectURL(blob);
            } catch (e) {}

            if (typeof callback.call === 'function') {
              callback.call(self, url);
            } else {
              callback(url);
            }
          }

          if (!config.autoWriteToDisk) {
            return;
          }

          getDataURL(function (dataURL) {
            var parameter = {};
            parameter[config.type + 'Blob'] = dataURL;
            DiskStorage.Store(parameter);
          });
        }
      }

      function pauseRecording() {
        if (!mediaRecorder) {
          warningLog();
          return;
        }

        if (self.state !== 'recording') {
          if (!config.disableLogs) {
            console.warn('Unable to pause the recording. Recording state: ', self.state);
          }

          return;
        }

        setState('paused');
        mediaRecorder.pause();

        if (!config.disableLogs) {
          console.log('Paused recording.');
        }
      }

      function resumeRecording() {
        if (!mediaRecorder) {
          warningLog();
          return;
        }

        if (self.state !== 'paused') {
          if (!config.disableLogs) {
            console.warn('Unable to resume the recording. Recording state: ', self.state);
          }

          return;
        }

        setState('recording'); // not all libs have this method yet

        mediaRecorder.resume();

        if (!config.disableLogs) {
          console.log('Resumed recording.');
        }
      }

      function readFile(_blob) {
        postMessage(new FileReaderSync().readAsDataURL(_blob));
      }

      function getDataURL(callback, _mediaRecorder) {
        if (!callback) {
          throw 'Pass a callback function over getDataURL.';
        }

        var blob = _mediaRecorder ? _mediaRecorder.blob : (mediaRecorder || {}).blob;

        if (!blob) {
          if (!config.disableLogs) {
            console.warn('Blob encoder did not finish its job yet.');
          }

          setTimeout(function () {
            getDataURL(callback, _mediaRecorder);
          }, 1000);
          return;
        }

        if (typeof Worker !== 'undefined' && !navigator.mozGetUserMedia) {
          var webWorker = processInWebWorker(readFile);

          webWorker.onmessage = function (event) {
            callback(event.data);
          };

          webWorker.postMessage(blob);
        } else {
          var reader = new FileReader();
          reader.readAsDataURL(blob);

          reader.onload = function (event) {
            callback(event.target.result);
          };
        }

        function processInWebWorker(_function) {
          try {
            var blob = URL.createObjectURL(new Blob([_function.toString(), 'this.onmessage =  function (eee) {' + _function.name + '(eee.data);}'], {
              type: 'application/javascript'
            }));
            var worker = new Worker(blob);
            URL.revokeObjectURL(blob);
            return worker;
          } catch (e) {}
        }
      }

      function handleRecordingDuration(counter) {
        counter = counter || 0;

        if (self.state === 'paused') {
          setTimeout(function () {
            handleRecordingDuration(counter);
          }, 1000);
          return;
        }

        if (self.state === 'stopped') {
          return;
        }

        if (counter >= self.recordingDuration) {
          stopRecording(self.onRecordingStopped);
          return;
        }

        counter += 1000; // 1-second

        setTimeout(function () {
          handleRecordingDuration(counter);
        }, 1000);
      }

      function setState(state) {
        if (!self) {
          return;
        }

        self.state = state;

        if (typeof self.onStateChanged.call === 'function') {
          self.onStateChanged.call(self, state);
        } else {
          self.onStateChanged(state);
        }
      }

      var WARNING = 'It seems that recorder is destroyed or "startRecording" is not invoked for ' + config.type + ' recorder.';

      function warningLog() {
        if (config.disableLogs === true) {
          return;
        }

        console.warn(WARNING);
      }

      var mediaRecorder;
      var returnObject = {
        /**
         * This method starts the recording.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * var recorder = RecordRTC(mediaStream, {
         *     type: 'video'
         * });
         * recorder.startRecording();
         */
        startRecording: startRecording,

        /**
         * This method stops the recording. It is strongly recommended to get "blob" or "URI" inside the callback to make sure all recorders finished their job.
         * @param {function} callback - Callback to get the recorded blob.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * recorder.stopRecording(function() {
         *     // use either "this" or "recorder" object; both are identical
         *     video.src = this.toURL();
         *     var blob = this.getBlob();
         * });
         */
        stopRecording: stopRecording,

        /**
         * This method pauses the recording. You can resume recording using "resumeRecording" method.
         * @method
         * @memberof RecordRTC
         * @instance
         * @todo Firefox is unable to pause the recording. Fix it.
         * @example
         * recorder.pauseRecording();  // pause the recording
         * recorder.resumeRecording(); // resume again
         */
        pauseRecording: pauseRecording,

        /**
         * This method resumes the recording.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * recorder.pauseRecording();  // first of all, pause the recording
         * recorder.resumeRecording(); // now resume it
         */
        resumeRecording: resumeRecording,

        /**
         * This method initializes the recording.
         * @method
         * @memberof RecordRTC
         * @instance
         * @todo This method should be deprecated.
         * @example
         * recorder.initRecorder();
         */
        initRecorder: initRecorder,

        /**
         * Ask RecordRTC to auto-stop the recording after 5 minutes.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * var fiveMinutes = 5 * 1000 * 60;
         * recorder.setRecordingDuration(fiveMinutes, function() {
         *    var blob = this.getBlob();
         *    video.src = this.toURL();
         * });
         * 
         * // or otherwise
         * recorder.setRecordingDuration(fiveMinutes).onRecordingStopped(function() {
         *    var blob = this.getBlob();
         *    video.src = this.toURL();
         * });
         */
        setRecordingDuration: function (recordingDuration, callback) {
          if (typeof recordingDuration === 'undefined') {
            throw 'recordingDuration is required.';
          }

          if (typeof recordingDuration !== 'number') {
            throw 'recordingDuration must be a number.';
          }

          self.recordingDuration = recordingDuration;

          self.onRecordingStopped = callback || function () {};

          return {
            onRecordingStopped: function (callback) {
              self.onRecordingStopped = callback;
            }
          };
        },

        /**
         * This method can be used to clear/reset all the recorded data.
         * @method
         * @memberof RecordRTC
         * @instance
         * @todo Figure out the difference between "reset" and "clearRecordedData" methods.
         * @example
         * recorder.clearRecordedData();
         */
        clearRecordedData: function () {
          if (!mediaRecorder) {
            warningLog();
            return;
          }

          mediaRecorder.clearRecordedData();

          if (!config.disableLogs) {
            console.log('Cleared old recorded data.');
          }
        },

        /**
         * Get the recorded blob. Use this method inside the "stopRecording" callback.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * recorder.stopRecording(function() {
         *     var blob = this.getBlob();
         *
         *     var file = new File([blob], 'filename.webm', {
         *         type: 'video/webm'
         *     });
         *
         *     var formData = new FormData();
         *     formData.append('file', file); // upload "File" object rather than a "Blob"
         *     uploadToServer(formData);
         * });
         * @returns {Blob} Returns recorded data as "Blob" object.
         */
        getBlob: function () {
          if (!mediaRecorder) {
            warningLog();
            return;
          }

          return mediaRecorder.blob;
        },

        /**
         * Get data-URI instead of Blob.
         * @param {function} callback - Callback to get the Data-URI.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * recorder.stopRecording(function() {
         *     recorder.getDataURL(function(dataURI) {
         *         video.src = dataURI;
         *     });
         * });
         */
        getDataURL: getDataURL,

        /**
         * Get virtual/temporary URL. Usage of this URL is limited to current tab.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * recorder.stopRecording(function() {
         *     video.src = this.toURL();
         * });
         * @returns {String} Returns a virtual/temporary URL for the recorded "Blob".
         */
        toURL: function () {
          if (!mediaRecorder) {
            warningLog();
            return;
          }

          return URL.createObjectURL(mediaRecorder.blob);
        },

        /**
         * Get internal recording object (i.e. internal module) e.g. MutliStreamRecorder, MediaStreamRecorder, StereoAudioRecorder or WhammyRecorder etc.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * var internalRecorder = recorder.getInternalRecorder();
         * if(internalRecorder instanceof MultiStreamRecorder) {
         *     internalRecorder.addStreams([newAudioStream]);
         *     internalRecorder.resetVideoStreams([screenStream]);
         * }
         * @returns {Object} Returns internal recording object.
         */
        getInternalRecorder: function () {
          return mediaRecorder;
        },

        /**
         * Invoke save-as dialog to save the recorded blob into your disk.
         * @param {string} fileName - Set your own file name.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * recorder.stopRecording(function() {
         *     this.save('file-name');
         *
         *     // or manually:
         *     invokeSaveAsDialog(this.getBlob(), 'filename.webm');
         * });
         */
        save: function (fileName) {
          if (!mediaRecorder) {
            warningLog();
            return;
          }

          invokeSaveAsDialog(mediaRecorder.blob, fileName);
        },

        /**
         * This method gets a blob from indexed-DB storage.
         * @param {function} callback - Callback to get the recorded blob.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * recorder.getFromDisk(function(dataURL) {
         *     video.src = dataURL;
         * });
         */
        getFromDisk: function (callback) {
          if (!mediaRecorder) {
            warningLog();
            return;
          }

          RecordRTC.getFromDisk(config.type, callback);
        },

        /**
         * This method appends an array of webp images to the recorded video-blob. It takes an "array" object.
         * @type {Array.<Array>}
         * @param {Array} arrayOfWebPImages - Array of webp images.
         * @method
         * @memberof RecordRTC
         * @instance
         * @todo This method should be deprecated.
         * @example
         * var arrayOfWebPImages = [];
         * arrayOfWebPImages.push({
         *     duration: index,
         *     image: 'data:image/webp;base64,...'
         * });
         * recorder.setAdvertisementArray(arrayOfWebPImages);
         */
        setAdvertisementArray: function (arrayOfWebPImages) {
          config.advertisement = [];
          var length = arrayOfWebPImages.length;

          for (var i = 0; i < length; i++) {
            config.advertisement.push({
              duration: i,
              image: arrayOfWebPImages[i]
            });
          }
        },

        /**
         * It is equivalent to <code class="str">"recorder.getBlob()"</code> method. Usage of "getBlob" is recommended, though.
         * @property {Blob} blob - Recorded Blob can be accessed using this property.
         * @memberof RecordRTC
         * @instance
         * @readonly
         * @example
         * recorder.stopRecording(function() {
         *     var blob = this.blob;
         *
         *     // below one is recommended
         *     var blob = this.getBlob();
         * });
         */
        blob: null,

        /**
         * This works only with {recorderType:StereoAudioRecorder}. Use this property on "stopRecording" to verify the encoder's sample-rates.
         * @property {number} bufferSize - Buffer-size used to encode the WAV container
         * @memberof RecordRTC
         * @instance
         * @readonly
         * @example
         * recorder.stopRecording(function() {
         *     alert('Recorder used this buffer-size: ' + this.bufferSize);
         * });
         */
        bufferSize: 0,

        /**
         * This works only with {recorderType:StereoAudioRecorder}. Use this property on "stopRecording" to verify the encoder's sample-rates.
         * @property {number} sampleRate - Sample-rates used to encode the WAV container
         * @memberof RecordRTC
         * @instance
         * @readonly
         * @example
         * recorder.stopRecording(function() {
         *     alert('Recorder used these sample-rates: ' + this.sampleRate);
         * });
         */
        sampleRate: 0,

        /**
         * {recorderType:StereoAudioRecorder} returns ArrayBuffer object.
         * @property {ArrayBuffer} buffer - Audio ArrayBuffer, supported only in Chrome.
         * @memberof RecordRTC
         * @instance
         * @readonly
         * @example
         * recorder.stopRecording(function() {
         *     var arrayBuffer = this.buffer;
         *     alert(arrayBuffer.byteLength);
         * });
         */
        buffer: null,

        /**
         * This method resets the recorder. So that you can reuse single recorder instance many times.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * recorder.reset();
         * recorder.startRecording();
         */
        reset: function () {
          if (self.state === 'recording' && !config.disableLogs) {
            console.warn('Stop an active recorder.');
          }

          if (mediaRecorder && typeof mediaRecorder.clearRecordedData === 'function') {
            mediaRecorder.clearRecordedData();
          }

          mediaRecorder = null;
          setState('inactive');
          self.blob = null;
        },

        /**
         * This method is called whenever recorder's state changes. Use this as an "event".
         * @property {String} state - A recorder's state can be: recording, paused, stopped or inactive.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * recorder.onStateChanged = function(state) {
         *     console.log('Recorder state: ', state);
         * };
         */
        onStateChanged: function (state) {
          if (!config.disableLogs) {
            console.log('Recorder state changed:', state);
          }
        },

        /**
         * A recorder can have inactive, recording, paused or stopped states.
         * @property {String} state - A recorder's state can be: recording, paused, stopped or inactive.
         * @memberof RecordRTC
         * @static
         * @readonly
         * @example
         * // this looper function will keep you updated about the recorder's states.
         * (function looper() {
         *     document.querySelector('h1').innerHTML = 'Recorder\'s state is: ' + recorder.state;
         *     if(recorder.state === 'stopped') return; // ignore+stop
         *     setTimeout(looper, 1000); // update after every 3-seconds
         * })();
         * recorder.startRecording();
         */
        state: 'inactive',

        /**
         * Get recorder's readonly state.
         * @method
         * @memberof RecordRTC
         * @example
         * var state = recorder.getState();
         * @returns {String} Returns recording state.
         */
        getState: function () {
          return self.state;
        },

        /**
         * Destroy RecordRTC instance. Clear all recorders and objects.
         * @method
         * @memberof RecordRTC
         * @example
         * recorder.destroy();
         */
        destroy: function () {
          var disableLogsCache = config.disableLogs;
          config = {
            disableLogs: true
          };
          self.reset();
          setState('destroyed');
          returnObject = self = null;

          if (Storage.AudioContextConstructor) {
            Storage.AudioContextConstructor.close();
            Storage.AudioContextConstructor = null;
          }

          config.disableLogs = disableLogsCache;

          if (!config.disableLogs) {
            console.log('RecordRTC is destroyed.');
          }
        },

        /**
         * RecordRTC version number
         * @property {String} version - Release version number.
         * @memberof RecordRTC
         * @static
         * @readonly
         * @example
         * alert(recorder.version);
         */
        version: '5.6.2'
      };

      if (!this) {
        self = returnObject;
        return returnObject;
      } // if someone wants to use RecordRTC with the "new" keyword.


      for (var prop in returnObject) {
        this[prop] = returnObject[prop];
      }

      self = this;
      return returnObject;
    }

    RecordRTC.version = '5.6.2';

    {
      module.exports = RecordRTC;
    }

    RecordRTC.getFromDisk = function (type, callback) {
      if (!callback) {
        throw 'callback is mandatory.';
      }

      console.log('Getting recorded ' + (type === 'all' ? 'blobs' : type + ' blob ') + ' from disk!');
      DiskStorage.Fetch(function (dataURL, _type) {
        if (type !== 'all' && _type === type + 'Blob' && callback) {
          callback(dataURL);
        }

        if (type === 'all' && callback) {
          callback(dataURL, _type.replace('Blob', ''));
        }
      });
    };
    /**
     * This method can be used to store recorded blobs into IndexedDB storage.
     * @param {object} options - {audio: Blob, video: Blob, gif: Blob}
     * @method
     * @memberof RecordRTC
     * @example
     * RecordRTC.writeToDisk({
     *     audio: audioBlob,
     *     video: videoBlob,
     *     gif  : gifBlob
     * });
     */


    RecordRTC.writeToDisk = function (options) {
      console.log('Writing recorded blob(s) to disk!');
      options = options || {};

      if (options.audio && options.video && options.gif) {
        options.audio.getDataURL(function (audioDataURL) {
          options.video.getDataURL(function (videoDataURL) {
            options.gif.getDataURL(function (gifDataURL) {
              DiskStorage.Store({
                audioBlob: audioDataURL,
                videoBlob: videoDataURL,
                gifBlob: gifDataURL
              });
            });
          });
        });
      } else if (options.audio && options.video) {
        options.audio.getDataURL(function (audioDataURL) {
          options.video.getDataURL(function (videoDataURL) {
            DiskStorage.Store({
              audioBlob: audioDataURL,
              videoBlob: videoDataURL
            });
          });
        });
      } else if (options.audio && options.gif) {
        options.audio.getDataURL(function (audioDataURL) {
          options.gif.getDataURL(function (gifDataURL) {
            DiskStorage.Store({
              audioBlob: audioDataURL,
              gifBlob: gifDataURL
            });
          });
        });
      } else if (options.video && options.gif) {
        options.video.getDataURL(function (videoDataURL) {
          options.gif.getDataURL(function (gifDataURL) {
            DiskStorage.Store({
              videoBlob: videoDataURL,
              gifBlob: gifDataURL
            });
          });
        });
      } else if (options.audio) {
        options.audio.getDataURL(function (audioDataURL) {
          DiskStorage.Store({
            audioBlob: audioDataURL
          });
        });
      } else if (options.video) {
        options.video.getDataURL(function (videoDataURL) {
          DiskStorage.Store({
            videoBlob: videoDataURL
          });
        });
      } else if (options.gif) {
        options.gif.getDataURL(function (gifDataURL) {
          DiskStorage.Store({
            gifBlob: gifDataURL
          });
        });
      }
    }; // __________________________
    // RecordRTC-Configuration.js

    /**
     * {@link RecordRTCConfiguration} is an inner/private helper for {@link RecordRTC}.
     * @summary It configures the 2nd parameter passed over {@link RecordRTC} and returns a valid "config" object.
     * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
     * @author {@link https://MuazKhan.com|Muaz Khan}
     * @typedef RecordRTCConfiguration
     * @class
     * @example
     * var options = RecordRTCConfiguration(mediaStream, options);
     * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
     * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
     * @param {object} config - {type:"video", disableLogs: true, numberOfAudioChannels: 1, bufferSize: 0, sampleRate: 0, video: HTMLVideoElement, getNativeBlob:true, etc.}
     */


    function RecordRTCConfiguration(mediaStream, config) {
      if (!config.recorderType && !config.type) {
        if (!!config.audio && !!config.video) {
          config.type = 'video';
        } else if (!!config.audio && !config.video) {
          config.type = 'audio';
        }
      }

      if (config.recorderType && !config.type) {
        if (config.recorderType === WhammyRecorder || config.recorderType === CanvasRecorder || typeof WebAssemblyRecorder !== 'undefined' && config.recorderType === WebAssemblyRecorder) {
          config.type = 'video';
        } else if (config.recorderType === GifRecorder) {
          config.type = 'gif';
        } else if (config.recorderType === StereoAudioRecorder) {
          config.type = 'audio';
        } else if (config.recorderType === MediaStreamRecorder) {
          if (getTracks(mediaStream, 'audio').length && getTracks(mediaStream, 'video').length) {
            config.type = 'video';
          } else if (!getTracks(mediaStream, 'audio').length && getTracks(mediaStream, 'video').length) {
            config.type = 'video';
          } else if (getTracks(mediaStream, 'audio').length && !getTracks(mediaStream, 'video').length) {
            config.type = 'audio';
          } else ;
        }
      }

      if (typeof MediaStreamRecorder !== 'undefined' && typeof MediaRecorder !== 'undefined' && 'requestData' in MediaRecorder.prototype) {
        if (!config.mimeType) {
          config.mimeType = 'video/webm';
        }

        if (!config.type) {
          config.type = config.mimeType.split('/')[0];
        }

        if (!config.bitsPerSecond) ;
      } // consider default type=audio


      if (!config.type) {
        if (config.mimeType) {
          config.type = config.mimeType.split('/')[0];
        }

        if (!config.type) {
          config.type = 'audio';
        }
      }

      return config;
    } // __________________
    // GetRecorderType.js

    /**
     * {@link GetRecorderType} is an inner/private helper for {@link RecordRTC}.
     * @summary It returns best recorder-type available for your browser.
     * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
     * @author {@link https://MuazKhan.com|Muaz Khan}
     * @typedef GetRecorderType
     * @class
     * @example
     * var RecorderType = GetRecorderType(options);
     * var recorder = new RecorderType(options);
     * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
     * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
     * @param {object} config - {type:"video", disableLogs: true, numberOfAudioChannels: 1, bufferSize: 0, sampleRate: 0, video: HTMLVideoElement, etc.}
     */


    function GetRecorderType(mediaStream, config) {
      var recorder; // StereoAudioRecorder can work with all three: Edge, Firefox and Chrome
      // todo: detect if it is Edge, then auto use: StereoAudioRecorder

      if (isChrome || isEdge || isOpera) {
        // Media Stream Recording API has not been implemented in chrome yet;
        // That's why using WebAudio API to record stereo audio in WAV format
        recorder = StereoAudioRecorder;
      }

      if (typeof MediaRecorder !== 'undefined' && 'requestData' in MediaRecorder.prototype && !isChrome) {
        recorder = MediaStreamRecorder;
      } // video recorder (in WebM format)


      if (config.type === 'video' && (isChrome || isOpera)) {
        recorder = WhammyRecorder;

        if (typeof WebAssemblyRecorder !== 'undefined' && typeof ReadableStream !== 'undefined') {
          recorder = WebAssemblyRecorder;
        }
      } // video recorder (in Gif format)


      if (config.type === 'gif') {
        recorder = GifRecorder;
      } // html2canvas recording!


      if (config.type === 'canvas') {
        recorder = CanvasRecorder;
      }

      if (isMediaRecorderCompatible() && recorder !== CanvasRecorder && recorder !== GifRecorder && typeof MediaRecorder !== 'undefined' && 'requestData' in MediaRecorder.prototype) {
        if (getTracks(mediaStream, 'video').length || getTracks(mediaStream, 'audio').length) {
          // audio-only recording
          if (config.type === 'audio') {
            if (typeof MediaRecorder.isTypeSupported === 'function' && MediaRecorder.isTypeSupported('audio/webm')) {
              recorder = MediaStreamRecorder;
            } // else recorder = StereoAudioRecorder;

          } else {
            // video or screen tracks
            if (typeof MediaRecorder.isTypeSupported === 'function' && MediaRecorder.isTypeSupported('video/webm')) {
              recorder = MediaStreamRecorder;
            }
          }
        }
      }

      if (mediaStream instanceof Array && mediaStream.length) {
        recorder = MultiStreamRecorder;
      }

      if (config.recorderType) {
        recorder = config.recorderType;
      }

      if (!config.disableLogs && !!recorder && !!recorder.name) {
        console.log('Using recorderType:', recorder.name || recorder.constructor.name);
      }

      if (!recorder && isSafari) {
        recorder = MediaStreamRecorder;
      }

      return recorder;
    } // _____________
    // MRecordRTC.js

    /**
     * MRecordRTC runs on top of {@link RecordRTC} to bring multiple recordings in a single place, by providing simple API.
     * @summary MRecordRTC stands for "Multiple-RecordRTC".
     * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
     * @author {@link https://MuazKhan.com|Muaz Khan}
     * @typedef MRecordRTC
     * @class
     * @example
     * var recorder = new MRecordRTC();
     * recorder.addStream(MediaStream);
     * recorder.mediaType = {
     *     audio: true, // or StereoAudioRecorder or MediaStreamRecorder
     *     video: true, // or WhammyRecorder or MediaStreamRecorder or WebAssemblyRecorder or CanvasRecorder
     *     gif: true    // or GifRecorder
     * };
     * // mimeType is optional and should be set only in advance cases.
     * recorder.mimeType = {
     *     audio: 'audio/wav',
     *     video: 'video/webm',
     *     gif:   'image/gif'
     * };
     * recorder.startRecording();
     * @see For further information:
     * @see {@link https://github.com/muaz-khan/RecordRTC/tree/master/MRecordRTC|MRecordRTC Source Code}
     * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
     * @requires {@link RecordRTC}
     */


    function MRecordRTC(mediaStream) {
      /**
       * This method attaches MediaStream object to {@link MRecordRTC}.
       * @param {MediaStream} mediaStream - A MediaStream object, either fetched using getUserMedia API, or generated using captureStreamUntilEnded or WebAudio API.
       * @method
       * @memberof MRecordRTC
       * @example
       * recorder.addStream(MediaStream);
       */
      this.addStream = function (_mediaStream) {
        if (_mediaStream) {
          mediaStream = _mediaStream;
        }
      };
      /**
       * This property can be used to set the recording type e.g. audio, or video, or gif, or canvas.
       * @property {object} mediaType - {audio: true, video: true, gif: true}
       * @memberof MRecordRTC
       * @example
       * var recorder = new MRecordRTC();
       * recorder.mediaType = {
       *     audio: true, // TRUE or StereoAudioRecorder or MediaStreamRecorder
       *     video: true, // TRUE or WhammyRecorder or MediaStreamRecorder or WebAssemblyRecorder or CanvasRecorder
       *     gif  : true  // TRUE or GifRecorder
       * };
       */


      this.mediaType = {
        audio: true,
        video: true
      };
      /**
       * This method starts recording.
       * @method
       * @memberof MRecordRTC
       * @example
       * recorder.startRecording();
       */

      this.startRecording = function () {
        var mediaType = this.mediaType;
        var recorderType;
        var mimeType = this.mimeType || {
          audio: null,
          video: null,
          gif: null
        };

        if (typeof mediaType.audio !== 'function' && isMediaRecorderCompatible() && !getTracks(mediaStream, 'audio').length) {
          mediaType.audio = false;
        }

        if (typeof mediaType.video !== 'function' && isMediaRecorderCompatible() && !getTracks(mediaStream, 'video').length) {
          mediaType.video = false;
        }

        if (typeof mediaType.gif !== 'function' && isMediaRecorderCompatible() && !getTracks(mediaStream, 'video').length) {
          mediaType.gif = false;
        }

        if (!mediaType.audio && !mediaType.video && !mediaType.gif) {
          throw 'MediaStream must have either audio or video tracks.';
        }

        if (!!mediaType.audio) {
          recorderType = null;

          if (typeof mediaType.audio === 'function') {
            recorderType = mediaType.audio;
          }

          this.audioRecorder = new RecordRTC(mediaStream, {
            type: 'audio',
            bufferSize: this.bufferSize,
            sampleRate: this.sampleRate,
            numberOfAudioChannels: this.numberOfAudioChannels || 2,
            disableLogs: this.disableLogs,
            recorderType: recorderType,
            mimeType: mimeType.audio,
            timeSlice: this.timeSlice,
            onTimeStamp: this.onTimeStamp
          });

          if (!mediaType.video) {
            this.audioRecorder.startRecording();
          }
        }

        if (!!mediaType.video) {
          recorderType = null;

          if (typeof mediaType.video === 'function') {
            recorderType = mediaType.video;
          }

          var newStream = mediaStream;

          if (isMediaRecorderCompatible() && !!mediaType.audio && typeof mediaType.audio === 'function') {
            var videoTrack = getTracks(mediaStream, 'video')[0];

            if (isFirefox) {
              newStream = new MediaStream();
              newStream.addTrack(videoTrack);

              if (recorderType && recorderType === WhammyRecorder) {
                // Firefox does NOT supports webp-encoding yet
                // But Firefox do supports WebAssemblyRecorder
                recorderType = MediaStreamRecorder;
              }
            } else {
              newStream = new MediaStream();
              newStream.addTrack(videoTrack);
            }
          }

          this.videoRecorder = new RecordRTC(newStream, {
            type: 'video',
            video: this.video,
            canvas: this.canvas,
            frameInterval: this.frameInterval || 10,
            disableLogs: this.disableLogs,
            recorderType: recorderType,
            mimeType: mimeType.video,
            timeSlice: this.timeSlice,
            onTimeStamp: this.onTimeStamp,
            workerPath: this.workerPath,
            webAssemblyPath: this.webAssemblyPath,
            frameRate: this.frameRate,
            // used by WebAssemblyRecorder; values: usually 30; accepts any.
            bitrate: this.bitrate // used by WebAssemblyRecorder; values: 0 to 1000+

          });

          if (!mediaType.audio) {
            this.videoRecorder.startRecording();
          }
        }

        if (!!mediaType.audio && !!mediaType.video) {
          var self = this;
          var isSingleRecorder = isMediaRecorderCompatible() === true;

          if (mediaType.audio instanceof StereoAudioRecorder && !!mediaType.video) {
            isSingleRecorder = false;
          } else if (mediaType.audio !== true && mediaType.video !== true && mediaType.audio !== mediaType.video) {
            isSingleRecorder = false;
          }

          if (isSingleRecorder === true) {
            self.audioRecorder = null;
            self.videoRecorder.startRecording();
          } else {
            self.videoRecorder.initRecorder(function () {
              self.audioRecorder.initRecorder(function () {
                // Both recorders are ready to record things accurately
                self.videoRecorder.startRecording();
                self.audioRecorder.startRecording();
              });
            });
          }
        }

        if (!!mediaType.gif) {
          recorderType = null;

          if (typeof mediaType.gif === 'function') {
            recorderType = mediaType.gif;
          }

          this.gifRecorder = new RecordRTC(mediaStream, {
            type: 'gif',
            frameRate: this.frameRate || 200,
            quality: this.quality || 10,
            disableLogs: this.disableLogs,
            recorderType: recorderType,
            mimeType: mimeType.gif
          });
          this.gifRecorder.startRecording();
        }
      };
      /**
       * This method stops recording.
       * @param {function} callback - Callback function is invoked when all encoders finished their jobs.
       * @method
       * @memberof MRecordRTC
       * @example
       * recorder.stopRecording(function(recording){
       *     var audioBlob = recording.audio;
       *     var videoBlob = recording.video;
       *     var gifBlob   = recording.gif;
       * });
       */


      this.stopRecording = function (callback) {
        callback = callback || function () {};

        if (this.audioRecorder) {
          this.audioRecorder.stopRecording(function (blobURL) {
            callback(blobURL, 'audio');
          });
        }

        if (this.videoRecorder) {
          this.videoRecorder.stopRecording(function (blobURL) {
            callback(blobURL, 'video');
          });
        }

        if (this.gifRecorder) {
          this.gifRecorder.stopRecording(function (blobURL) {
            callback(blobURL, 'gif');
          });
        }
      };
      /**
       * This method pauses recording.
       * @method
       * @memberof MRecordRTC
       * @example
       * recorder.pauseRecording();
       */


      this.pauseRecording = function () {
        if (this.audioRecorder) {
          this.audioRecorder.pauseRecording();
        }

        if (this.videoRecorder) {
          this.videoRecorder.pauseRecording();
        }

        if (this.gifRecorder) {
          this.gifRecorder.pauseRecording();
        }
      };
      /**
       * This method resumes recording.
       * @method
       * @memberof MRecordRTC
       * @example
       * recorder.resumeRecording();
       */


      this.resumeRecording = function () {
        if (this.audioRecorder) {
          this.audioRecorder.resumeRecording();
        }

        if (this.videoRecorder) {
          this.videoRecorder.resumeRecording();
        }

        if (this.gifRecorder) {
          this.gifRecorder.resumeRecording();
        }
      };
      /**
       * This method can be used to manually get all recorded blobs.
       * @param {function} callback - All recorded blobs are passed back to the "callback" function.
       * @method
       * @memberof MRecordRTC
       * @example
       * recorder.getBlob(function(recording){
       *     var audioBlob = recording.audio;
       *     var videoBlob = recording.video;
       *     var gifBlob   = recording.gif;
       * });
       * // or
       * var audioBlob = recorder.getBlob().audio;
       * var videoBlob = recorder.getBlob().video;
       */


      this.getBlob = function (callback) {
        var output = {};

        if (this.audioRecorder) {
          output.audio = this.audioRecorder.getBlob();
        }

        if (this.videoRecorder) {
          output.video = this.videoRecorder.getBlob();
        }

        if (this.gifRecorder) {
          output.gif = this.gifRecorder.getBlob();
        }

        if (callback) {
          callback(output);
        }

        return output;
      };
      /**
       * Destroy all recorder instances.
       * @method
       * @memberof MRecordRTC
       * @example
       * recorder.destroy();
       */


      this.destroy = function () {
        if (this.audioRecorder) {
          this.audioRecorder.destroy();
          this.audioRecorder = null;
        }

        if (this.videoRecorder) {
          this.videoRecorder.destroy();
          this.videoRecorder = null;
        }

        if (this.gifRecorder) {
          this.gifRecorder.destroy();
          this.gifRecorder = null;
        }
      };
      /**
       * This method can be used to manually get all recorded blobs' DataURLs.
       * @param {function} callback - All recorded blobs' DataURLs are passed back to the "callback" function.
       * @method
       * @memberof MRecordRTC
       * @example
       * recorder.getDataURL(function(recording){
       *     var audioDataURL = recording.audio;
       *     var videoDataURL = recording.video;
       *     var gifDataURL   = recording.gif;
       * });
       */


      this.getDataURL = function (callback) {
        this.getBlob(function (blob) {
          if (blob.audio && blob.video) {
            getDataURL(blob.audio, function (_audioDataURL) {
              getDataURL(blob.video, function (_videoDataURL) {
                callback({
                  audio: _audioDataURL,
                  video: _videoDataURL
                });
              });
            });
          } else if (blob.audio) {
            getDataURL(blob.audio, function (_audioDataURL) {
              callback({
                audio: _audioDataURL
              });
            });
          } else if (blob.video) {
            getDataURL(blob.video, function (_videoDataURL) {
              callback({
                video: _videoDataURL
              });
            });
          }
        });

        function getDataURL(blob, callback00) {
          if (typeof Worker !== 'undefined') {
            var webWorker = processInWebWorker(function readFile(_blob) {
              postMessage(new FileReaderSync().readAsDataURL(_blob));
            });

            webWorker.onmessage = function (event) {
              callback00(event.data);
            };

            webWorker.postMessage(blob);
          } else {
            var reader = new FileReader();
            reader.readAsDataURL(blob);

            reader.onload = function (event) {
              callback00(event.target.result);
            };
          }
        }

        function processInWebWorker(_function) {
          var blob = URL.createObjectURL(new Blob([_function.toString(), 'this.onmessage =  function (eee) {' + _function.name + '(eee.data);}'], {
            type: 'application/javascript'
          }));
          var worker = new Worker(blob);
          var url;

          if (typeof URL !== 'undefined') {
            url = URL;
          } else if (typeof webkitURL !== 'undefined') {
            url = webkitURL;
          } else {
            throw 'Neither URL nor webkitURL detected.';
          }

          url.revokeObjectURL(blob);
          return worker;
        }
      };
      /**
       * This method can be used to ask {@link MRecordRTC} to write all recorded blobs into IndexedDB storage.
       * @method
       * @memberof MRecordRTC
       * @example
       * recorder.writeToDisk();
       */


      this.writeToDisk = function () {
        RecordRTC.writeToDisk({
          audio: this.audioRecorder,
          video: this.videoRecorder,
          gif: this.gifRecorder
        });
      };
      /**
       * This method can be used to invoke a save-as dialog for all recorded blobs.
       * @param {object} args - {audio: 'audio-name', video: 'video-name', gif: 'gif-name'}
       * @method
       * @memberof MRecordRTC
       * @example
       * recorder.save({
       *     audio: 'audio-file-name',
       *     video: 'video-file-name',
       *     gif  : 'gif-file-name'
       * });
       */


      this.save = function (args) {
        args = args || {
          audio: true,
          video: true,
          gif: true
        };

        if (!!args.audio && this.audioRecorder) {
          this.audioRecorder.save(typeof args.audio === 'string' ? args.audio : '');
        }

        if (!!args.video && this.videoRecorder) {
          this.videoRecorder.save(typeof args.video === 'string' ? args.video : '');
        }

        if (!!args.gif && this.gifRecorder) {
          this.gifRecorder.save(typeof args.gif === 'string' ? args.gif : '');
        }
      };
    }
    /**
     * This method can be used to get all recorded blobs from IndexedDB storage.
     * @param {string} type - 'all' or 'audio' or 'video' or 'gif'
     * @param {function} callback - Callback function to get all stored blobs.
     * @method
     * @memberof MRecordRTC
     * @example
     * MRecordRTC.getFromDisk('all', function(dataURL, type){
     *     if(type === 'audio') { }
     *     if(type === 'video') { }
     *     if(type === 'gif')   { }
     * });
     */


    MRecordRTC.getFromDisk = RecordRTC.getFromDisk;
    /**
     * This method can be used to store recorded blobs into IndexedDB storage.
     * @param {object} options - {audio: Blob, video: Blob, gif: Blob}
     * @method
     * @memberof MRecordRTC
     * @example
     * MRecordRTC.writeToDisk({
     *     audio: audioBlob,
     *     video: videoBlob,
     *     gif  : gifBlob
     * });
     */

    MRecordRTC.writeToDisk = RecordRTC.writeToDisk;

    if (typeof RecordRTC !== 'undefined') {
      RecordRTC.MRecordRTC = MRecordRTC;
    }

    var browserFakeUserAgent = 'Fake/5.0 (FakeOS) AppleWebKit/123 (KHTML, like Gecko) Fake/12.3.4567.89 Fake/123.45';

    (function (that) {
      if (!that) {
        return;
      }

      if (typeof window !== 'undefined') {
        return;
      }

      if (typeof commonjsGlobal === 'undefined') {
        return;
      }

      commonjsGlobal.navigator = {
        userAgent: browserFakeUserAgent,
        getUserMedia: function () {}
      };

      if (!commonjsGlobal.console) {
        commonjsGlobal.console = {};
      }

      if (typeof commonjsGlobal.console.log === 'undefined' || typeof commonjsGlobal.console.error === 'undefined') {
        commonjsGlobal.console.error = commonjsGlobal.console.log = commonjsGlobal.console.log || function () {
          console.log(arguments);
        };
      }

      if (typeof document === 'undefined') {
        /*global document:true */
        that.document = {
          documentElement: {
            appendChild: function () {
              return '';
            }
          }
        };

        document.createElement = document.captureStream = document.mozCaptureStream = function () {
          var obj = {
            getContext: function () {
              return obj;
            },
            play: function () {},
            pause: function () {},
            drawImage: function () {},
            toDataURL: function () {
              return '';
            },
            style: {}
          };
          return obj;
        };

        that.HTMLVideoElement = function () {};
      }

      if (typeof location === 'undefined') {
        /*global location:true */
        that.location = {
          protocol: 'file:',
          href: '',
          hash: ''
        };
      }

      if (typeof screen === 'undefined') {
        /*global screen:true */
        that.screen = {
          width: 0,
          height: 0
        };
      }

      if (typeof URL === 'undefined') {
        /*global screen:true */
        that.URL = {
          createObjectURL: function () {
            return '';
          },
          revokeObjectURL: function () {
            return '';
          }
        };
      }
      /*global window:true */


      that.window = commonjsGlobal;
    })(typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : null); // _____________________________
    // Cross-Browser-Declarations.js
    // animation-frame used in WebM recording

    /*jshint -W079 */


    var requestAnimationFrame = window.requestAnimationFrame;

    if (typeof requestAnimationFrame === 'undefined') {
      if (typeof webkitRequestAnimationFrame !== 'undefined') {
        /*global requestAnimationFrame:true */
        requestAnimationFrame = webkitRequestAnimationFrame;
      } else if (typeof mozRequestAnimationFrame !== 'undefined') {
        /*global requestAnimationFrame:true */
        requestAnimationFrame = mozRequestAnimationFrame;
      } else if (typeof msRequestAnimationFrame !== 'undefined') {
        /*global requestAnimationFrame:true */
        requestAnimationFrame = msRequestAnimationFrame;
      } else if (typeof requestAnimationFrame === 'undefined') {
        // via: https://gist.github.com/paulirish/1579671
        var lastTime = 0;
        /*global requestAnimationFrame:true */

        requestAnimationFrame = function (callback, element) {
          var currTime = new Date().getTime();
          var timeToCall = Math.max(0, 16 - (currTime - lastTime));
          var id = setTimeout(function () {
            callback(currTime + timeToCall);
          }, timeToCall);
          lastTime = currTime + timeToCall;
          return id;
        };
      }
    }
    /*jshint -W079 */


    var cancelAnimationFrame = window.cancelAnimationFrame;

    if (typeof cancelAnimationFrame === 'undefined') {
      if (typeof webkitCancelAnimationFrame !== 'undefined') {
        /*global cancelAnimationFrame:true */
        cancelAnimationFrame = webkitCancelAnimationFrame;
      } else if (typeof mozCancelAnimationFrame !== 'undefined') {
        /*global cancelAnimationFrame:true */
        cancelAnimationFrame = mozCancelAnimationFrame;
      } else if (typeof msCancelAnimationFrame !== 'undefined') {
        /*global cancelAnimationFrame:true */
        cancelAnimationFrame = msCancelAnimationFrame;
      } else if (typeof cancelAnimationFrame === 'undefined') {
        /*global cancelAnimationFrame:true */
        cancelAnimationFrame = function (id) {
          clearTimeout(id);
        };
      }
    } // WebAudio API representer


    var AudioContext = window.AudioContext;

    if (typeof AudioContext === 'undefined') {
      if (typeof webkitAudioContext !== 'undefined') {
        /*global AudioContext:true */
        AudioContext = webkitAudioContext;
      }

      if (typeof mozAudioContext !== 'undefined') {
        /*global AudioContext:true */
        AudioContext = mozAudioContext;
      }
    }
    /*jshint -W079 */


    var URL = window.URL;

    if (typeof URL === 'undefined' && typeof webkitURL !== 'undefined') {
      /*global URL:true */
      URL = webkitURL;
    }

    if (typeof navigator !== 'undefined' && typeof navigator.getUserMedia === 'undefined') {
      // maybe window.navigator?
      if (typeof navigator.webkitGetUserMedia !== 'undefined') {
        navigator.getUserMedia = navigator.webkitGetUserMedia;
      }

      if (typeof navigator.mozGetUserMedia !== 'undefined') {
        navigator.getUserMedia = navigator.mozGetUserMedia;
      }
    }

    var isEdge = navigator.userAgent.indexOf('Edge') !== -1 && (!!navigator.msSaveBlob || !!navigator.msSaveOrOpenBlob);
    var isOpera = !!window.opera || navigator.userAgent.indexOf('OPR/') !== -1;
    var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1 && 'netscape' in window && / rv:/.test(navigator.userAgent);
    var isChrome = !isOpera && !isEdge && !!navigator.webkitGetUserMedia || isElectron() || navigator.userAgent.toLowerCase().indexOf('chrome/') !== -1;
    var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (isSafari && !isChrome && navigator.userAgent.indexOf('CriOS') !== -1) {
      isSafari = false;
      isChrome = true;
    }

    var MediaStream = window.MediaStream;

    if (typeof MediaStream === 'undefined' && typeof webkitMediaStream !== 'undefined') {
      MediaStream = webkitMediaStream;
    }
    /*global MediaStream:true */


    if (typeof MediaStream !== 'undefined') {
      // override "stop" method for all browsers
      if (typeof MediaStream.prototype.stop === 'undefined') {
        MediaStream.prototype.stop = function () {
          this.getTracks().forEach(function (track) {
            track.stop();
          });
        };
      }
    } // below function via: http://goo.gl/B3ae8c

    /**
     * Return human-readable file size.
     * @param {number} bytes - Pass bytes and get formatted string.
     * @returns {string} - formatted string
     * @example
     * bytesToSize(1024*1024*5) === '5 GB'
     * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
     */


    function bytesToSize(bytes) {
      var k = 1000;
      var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

      if (bytes === 0) {
        return '0 Bytes';
      }

      var i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)), 10);
      return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
    }
    /**
     * @param {Blob} file - File or Blob object. This parameter is required.
     * @param {string} fileName - Optional file name e.g. "Recorded-Video.webm"
     * @example
     * invokeSaveAsDialog(blob or file, [optional] fileName);
     * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
     */


    function invokeSaveAsDialog(file, fileName) {
      if (!file) {
        throw 'Blob object is required.';
      }

      if (!file.type) {
        try {
          file.type = 'video/webm';
        } catch (e) {}
      }

      var fileExtension = (file.type || 'video/webm').split('/')[1];

      if (fileExtension.indexOf(';') !== -1) {
        // extended mimetype, e.g. 'video/webm;codecs=vp8,opus'
        fileExtension = fileExtension.split(';')[0];
      }

      if (fileName && fileName.indexOf('.') !== -1) {
        var splitted = fileName.split('.');
        fileName = splitted[0];
        fileExtension = splitted[1];
      }

      var fileFullName = (fileName || Math.round(Math.random() * 9999999999) + 888888888) + '.' + fileExtension;

      if (typeof navigator.msSaveOrOpenBlob !== 'undefined') {
        return navigator.msSaveOrOpenBlob(file, fileFullName);
      } else if (typeof navigator.msSaveBlob !== 'undefined') {
        return navigator.msSaveBlob(file, fileFullName);
      }

      var hyperlink = document.createElement('a');
      hyperlink.href = URL.createObjectURL(file);
      hyperlink.download = fileFullName;
      hyperlink.style = 'display:none;opacity:0;color:transparent;';
      (document.body || document.documentElement).appendChild(hyperlink);

      if (typeof hyperlink.click === 'function') {
        hyperlink.click();
      } else {
        hyperlink.target = '_blank';
        hyperlink.dispatchEvent(new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true
        }));
      }

      URL.revokeObjectURL(hyperlink.href);
    }
    /**
     * from: https://github.com/cheton/is-electron/blob/master/index.js
     **/


    function isElectron() {
      // Renderer process
      if (typeof window !== 'undefined' && typeof window.process === 'object' && window.process.type === 'renderer') {
        return true;
      } // Main process


      if (typeof process !== 'undefined' && typeof process.versions === 'object' && !!process.versions.electron) {
        return true;
      } // Detect the user agent when the `nodeIntegration` option is set to true


      if (typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0) {
        return true;
      }

      return false;
    }

    function getTracks(stream, kind) {
      if (!stream || !stream.getTracks) {
        return [];
      }

      return stream.getTracks().filter(function (t) {
        return t.kind === (kind || 'audio');
      });
    }

    function setSrcObject(stream, element) {
      if ('srcObject' in element) {
        element.srcObject = stream;
      } else if ('mozSrcObject' in element) {
        element.mozSrcObject = stream;
      } else {
        element.srcObject = stream;
      }
    }
    /**
     * @param {Blob} file - File or Blob object.
     * @param {function} callback - Callback function.
     * @example
     * getSeekableBlob(blob or file, callback);
     * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
     */


    function getSeekableBlob(inputBlob, callback) {
      // EBML.js copyrights goes to: https://github.com/legokichi/ts-ebml
      if (typeof EBML === 'undefined') {
        throw new Error('Please link: https://www.webrtc-experiment.com/EBML.js');
      }

      var reader = new EBML.Reader();
      var decoder = new EBML.Decoder();
      var tools = EBML.tools;
      var fileReader = new FileReader();

      fileReader.onload = function (e) {
        var ebmlElms = decoder.decode(this.result);
        ebmlElms.forEach(function (element) {
          reader.read(element);
        });
        reader.stop();
        var refinedMetadataBuf = tools.makeMetadataSeekable(reader.metadatas, reader.duration, reader.cues);
        var body = this.result.slice(reader.metadataSize);
        var newBlob = new Blob([refinedMetadataBuf, body], {
          type: 'video/webm'
        });
        callback(newBlob);
      };

      fileReader.readAsArrayBuffer(inputBlob);
    }

    if (typeof RecordRTC !== 'undefined') {
      RecordRTC.invokeSaveAsDialog = invokeSaveAsDialog;
      RecordRTC.getTracks = getTracks;
      RecordRTC.getSeekableBlob = getSeekableBlob;
      RecordRTC.bytesToSize = bytesToSize;
      RecordRTC.isElectron = isElectron;
    } // __________ (used to handle stuff like http://goo.gl/xmE5eg) issue #129
    // Storage.js

    /**
     * Storage is a standalone object used by {@link RecordRTC} to store reusable objects e.g. "new AudioContext".
     * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
     * @author {@link https://MuazKhan.com|Muaz Khan}
     * @example
     * Storage.AudioContext === webkitAudioContext
     * @property {webkitAudioContext} AudioContext - Keeps a reference to AudioContext object.
     * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
     */


    var Storage = {};

    if (typeof AudioContext !== 'undefined') {
      Storage.AudioContext = AudioContext;
    } else if (typeof webkitAudioContext !== 'undefined') {
      Storage.AudioContext = webkitAudioContext;
    }

    if (typeof RecordRTC !== 'undefined') {
      RecordRTC.Storage = Storage;
    }

    function isMediaRecorderCompatible() {
      if (isFirefox || isSafari || isEdge) {
        return true;
      }
      var nAgt = navigator.userAgent;
      var fullVersion = '' + parseFloat(navigator.appVersion);
      var majorVersion = parseInt(navigator.appVersion, 10);
      var verOffset, ix;

      if (isChrome || isOpera) {
        verOffset = nAgt.indexOf('Chrome');
        fullVersion = nAgt.substring(verOffset + 7);
      } // trim the fullVersion string at semicolon/space if present


      if ((ix = fullVersion.indexOf(';')) !== -1) {
        fullVersion = fullVersion.substring(0, ix);
      }

      if ((ix = fullVersion.indexOf(' ')) !== -1) {
        fullVersion = fullVersion.substring(0, ix);
      }

      majorVersion = parseInt('' + fullVersion, 10);

      if (isNaN(majorVersion)) {
        fullVersion = '' + parseFloat(navigator.appVersion);
        majorVersion = parseInt(navigator.appVersion, 10);
      }

      return majorVersion >= 49;
    } // ______________________
    // MediaStreamRecorder.js

    /**
     * MediaStreamRecorder is an abstraction layer for {@link https://w3c.github.io/mediacapture-record/MediaRecorder.html|MediaRecorder API}. It is used by {@link RecordRTC} to record MediaStream(s) in both Chrome and Firefox.
     * @summary Runs top over {@link https://w3c.github.io/mediacapture-record/MediaRecorder.html|MediaRecorder API}.
     * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
     * @author {@link https://github.com/muaz-khan|Muaz Khan}
     * @typedef MediaStreamRecorder
     * @class
     * @example
     * var config = {
     *     mimeType: 'video/webm', // vp8, vp9, h264, mkv, opus/vorbis
     *     audioBitsPerSecond : 256 * 8 * 1024,
     *     videoBitsPerSecond : 256 * 8 * 1024,
     *     bitsPerSecond: 256 * 8 * 1024,  // if this is provided, skip above two
     *     checkForInactiveTracks: true,
     *     timeSlice: 1000, // concatenate intervals based blobs
     *     ondataavailable: function() {} // get intervals based blobs
     * }
     * var recorder = new MediaStreamRecorder(mediaStream, config);
     * recorder.record();
     * recorder.stop(function(blob) {
     *     video.src = URL.createObjectURL(blob);
     *
     *     // or
     *     var blob = recorder.blob;
     * });
     * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
     * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
     * @param {object} config - {disableLogs:true, initCallback: function, mimeType: "video/webm", timeSlice: 1000}
     * @throws Will throw an error if first argument "MediaStream" is missing. Also throws error if "MediaRecorder API" are not supported by the browser.
     */


    function MediaStreamRecorder(mediaStream, config) {
      var self = this;

      if (typeof mediaStream === 'undefined') {
        throw 'First argument "MediaStream" is required.';
      }

      if (typeof MediaRecorder === 'undefined') {
        throw 'Your browser does not support the Media Recorder API. Please try other modules e.g. WhammyRecorder or StereoAudioRecorder.';
      }

      config = config || {
        // bitsPerSecond: 256 * 8 * 1024,
        mimeType: 'video/webm'
      };

      if (config.type === 'audio') {
        if (getTracks(mediaStream, 'video').length && getTracks(mediaStream, 'audio').length) {
          var stream;

          if (!!navigator.mozGetUserMedia) {
            stream = new MediaStream();
            stream.addTrack(getTracks(mediaStream, 'audio')[0]);
          } else {
            // webkitMediaStream
            stream = new MediaStream(getTracks(mediaStream, 'audio'));
          }

          mediaStream = stream;
        }

        if (!config.mimeType || config.mimeType.toString().toLowerCase().indexOf('audio') === -1) {
          config.mimeType = isChrome ? 'audio/webm' : 'audio/ogg';
        }

        if (config.mimeType && config.mimeType.toString().toLowerCase() !== 'audio/ogg' && !!navigator.mozGetUserMedia) {
          // forcing better codecs on Firefox (via #166)
          config.mimeType = 'audio/ogg';
        }
      }

      var arrayOfBlobs = [];
      /**
       * This method returns array of blobs. Use only with "timeSlice". Its useful to preview recording anytime, without using the "stop" method.
       * @method
       * @memberof MediaStreamRecorder
       * @example
       * var arrayOfBlobs = recorder.getArrayOfBlobs();
       * @returns {Array} Returns array of recorded blobs.
       */

      this.getArrayOfBlobs = function () {
        return arrayOfBlobs;
      };
      /**
       * This method records MediaStream.
       * @method
       * @memberof MediaStreamRecorder
       * @example
       * recorder.record();
       */


      this.record = function () {
        // set defaults
        self.blob = null;
        self.clearRecordedData();
        self.timestamps = [];
        allStates = [];
        arrayOfBlobs = [];
        var recorderHints = config;

        if (!config.disableLogs) {
          console.log('Passing following config over MediaRecorder API.', recorderHints);
        }

        if (mediaRecorder) {
          // mandatory to make sure Firefox doesn't fails to record streams 3-4 times without reloading the page.
          mediaRecorder = null;
        }

        if (isChrome && !isMediaRecorderCompatible()) {
          // to support video-only recording on stable
          recorderHints = 'video/vp8';
        }

        if (typeof MediaRecorder.isTypeSupported === 'function' && recorderHints.mimeType) {
          if (!MediaRecorder.isTypeSupported(recorderHints.mimeType)) {
            if (!config.disableLogs) {
              console.warn('MediaRecorder API seems unable to record mimeType:', recorderHints.mimeType);
            }

            recorderHints.mimeType = config.type === 'audio' ? 'audio/webm' : 'video/webm';
          }
        } // using MediaRecorder API here


        try {
          mediaRecorder = new MediaRecorder(mediaStream, recorderHints); // reset

          config.mimeType = recorderHints.mimeType;
        } catch (e) {
          // chrome-based fallback
          mediaRecorder = new MediaRecorder(mediaStream);
        } // old hack?


        if (recorderHints.mimeType && !MediaRecorder.isTypeSupported && 'canRecordMimeType' in mediaRecorder && mediaRecorder.canRecordMimeType(recorderHints.mimeType) === false) {
          if (!config.disableLogs) {
            console.warn('MediaRecorder API seems unable to record mimeType:', recorderHints.mimeType);
          }
        } // Dispatching OnDataAvailable Handler


        mediaRecorder.ondataavailable = function (e) {
          if (e.data) {
            allStates.push('ondataavailable: ' + bytesToSize(e.data.size));
          }

          if (typeof config.timeSlice === 'number') {
            if (e.data && e.data.size) {
              arrayOfBlobs.push(e.data);
              updateTimeStamp();

              if (typeof config.ondataavailable === 'function') {
                // intervals based blobs
                var blob = config.getNativeBlob ? e.data : new Blob([e.data], {
                  type: getMimeType(recorderHints)
                });
                config.ondataavailable(blob);
              }
            }

            return;
          }

          if (!e.data || !e.data.size || e.data.size < 100 || self.blob) {
            // make sure that stopRecording always getting fired
            // even if there is invalid data
            if (self.recordingCallback) {
              self.recordingCallback(new Blob([], {
                type: getMimeType(recorderHints)
              }));
              self.recordingCallback = null;
            }

            return;
          }

          self.blob = config.getNativeBlob ? e.data : new Blob([e.data], {
            type: getMimeType(recorderHints)
          });

          if (self.recordingCallback) {
            self.recordingCallback(self.blob);
            self.recordingCallback = null;
          }
        };

        mediaRecorder.onstart = function () {
          allStates.push('started');
        };

        mediaRecorder.onpause = function () {
          allStates.push('paused');
        };

        mediaRecorder.onresume = function () {
          allStates.push('resumed');
        };

        mediaRecorder.onstop = function () {
          allStates.push('stopped');
        };

        mediaRecorder.onerror = function (error) {
          if (!error) {
            return;
          }

          if (!error.name) {
            error.name = 'UnknownError';
          }

          allStates.push('error: ' + error);

          if (!config.disableLogs) {
            // via: https://w3c.github.io/mediacapture-record/MediaRecorder.html#exception-summary
            if (error.name.toString().toLowerCase().indexOf('invalidstate') !== -1) {
              console.error('The MediaRecorder is not in a state in which the proposed operation is allowed to be executed.', error);
            } else if (error.name.toString().toLowerCase().indexOf('notsupported') !== -1) {
              console.error('MIME type (', recorderHints.mimeType, ') is not supported.', error);
            } else if (error.name.toString().toLowerCase().indexOf('security') !== -1) {
              console.error('MediaRecorder security error', error);
            } // older code below
            else if (error.name === 'OutOfMemory') {
              console.error('The UA has exhaused the available memory. User agents SHOULD provide as much additional information as possible in the message attribute.', error);
            } else if (error.name === 'IllegalStreamModification') {
              console.error('A modification to the stream has occurred that makes it impossible to continue recording. An example would be the addition of a Track while recording is occurring. User agents SHOULD provide as much additional information as possible in the message attribute.', error);
            } else if (error.name === 'OtherRecordingError') {
              console.error('Used for an fatal error other than those listed above. User agents SHOULD provide as much additional information as possible in the message attribute.', error);
            } else if (error.name === 'GenericError') {
              console.error('The UA cannot provide the codec or recording option that has been requested.', error);
            } else {
              console.error('MediaRecorder Error', error);
            }
          }

          (function (looper) {
            if (!self.manuallyStopped && mediaRecorder && mediaRecorder.state === 'inactive') {
              delete config.timeslice; // 10 minutes, enough?

              mediaRecorder.start(10 * 60 * 1000);
              return;
            }

            setTimeout(looper, 1000);
          })();

          if (mediaRecorder.state !== 'inactive' && mediaRecorder.state !== 'stopped') {
            mediaRecorder.stop();
          }
        };

        if (typeof config.timeSlice === 'number') {
          updateTimeStamp();
          mediaRecorder.start(config.timeSlice);
        } else {
          // default is 60 minutes; enough?
          // use config => {timeSlice: 1000} otherwise
          mediaRecorder.start(3.6e+6);
        }

        if (config.initCallback) {
          config.initCallback(); // old code
        }
      };
      /**
       * @property {Array} timestamps - Array of time stamps
       * @memberof MediaStreamRecorder
       * @example
       * console.log(recorder.timestamps);
       */


      this.timestamps = [];

      function updateTimeStamp() {
        self.timestamps.push(new Date().getTime());

        if (typeof config.onTimeStamp === 'function') {
          config.onTimeStamp(self.timestamps[self.timestamps.length - 1], self.timestamps);
        }
      }

      function getMimeType(secondObject) {
        if (mediaRecorder && mediaRecorder.mimeType) {
          return mediaRecorder.mimeType;
        }

        return secondObject.mimeType || 'video/webm';
      }
      /**
       * This method stops recording MediaStream.
       * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
       * @method
       * @memberof MediaStreamRecorder
       * @example
       * recorder.stop(function(blob) {
       *     video.src = URL.createObjectURL(blob);
       * });
       */


      this.stop = function (callback) {
        callback = callback || function () {};

        self.manuallyStopped = true; // used inside the mediaRecorder.onerror

        if (!mediaRecorder) {
          return;
        }

        this.recordingCallback = callback;

        if (mediaRecorder.state === 'recording') {
          mediaRecorder.stop();
        }

        if (typeof config.timeSlice === 'number') {
          setTimeout(function () {
            self.blob = new Blob(arrayOfBlobs, {
              type: getMimeType(config)
            });
            self.recordingCallback(self.blob);
          }, 100);
        }
      };
      /**
       * This method pauses the recording process.
       * @method
       * @memberof MediaStreamRecorder
       * @example
       * recorder.pause();
       */


      this.pause = function () {
        if (!mediaRecorder) {
          return;
        }

        if (mediaRecorder.state === 'recording') {
          mediaRecorder.pause();
        }
      };
      /**
       * This method resumes the recording process.
       * @method
       * @memberof MediaStreamRecorder
       * @example
       * recorder.resume();
       */


      this.resume = function () {
        if (!mediaRecorder) {
          return;
        }

        if (mediaRecorder.state === 'paused') {
          mediaRecorder.resume();
        }
      };
      /**
       * This method resets currently recorded data.
       * @method
       * @memberof MediaStreamRecorder
       * @example
       * recorder.clearRecordedData();
       */


      this.clearRecordedData = function () {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
          self.stop(clearRecordedDataCB);
        }

        clearRecordedDataCB();
      };

      function clearRecordedDataCB() {
        arrayOfBlobs = [];
        mediaRecorder = null;
        self.timestamps = [];
      } // Reference to "MediaRecorder" object


      var mediaRecorder;
      /**
       * Access to native MediaRecorder API
       * @method
       * @memberof MediaStreamRecorder
       * @instance
       * @example
       * var internal = recorder.getInternalRecorder();
       * internal.ondataavailable = function() {}; // override
       * internal.stream, internal.onpause, internal.onstop, etc.
       * @returns {Object} Returns internal recording object.
       */

      this.getInternalRecorder = function () {
        return mediaRecorder;
      };

      function isMediaStreamActive() {
        if ('active' in mediaStream) {
          if (!mediaStream.active) {
            return false;
          }
        } else if ('ended' in mediaStream) {
          // old hack
          if (mediaStream.ended) {
            return false;
          }
        }

        return true;
      }
      /**
       * @property {Blob} blob - Recorded data as "Blob" object.
       * @memberof MediaStreamRecorder
       * @example
       * recorder.stop(function() {
       *     var blob = recorder.blob;
       * });
       */


      this.blob = null;
      /**
       * Get MediaRecorder readonly state.
       * @method
       * @memberof MediaStreamRecorder
       * @example
       * var state = recorder.getState();
       * @returns {String} Returns recording state.
       */

      this.getState = function () {
        if (!mediaRecorder) {
          return 'inactive';
        }

        return mediaRecorder.state || 'inactive';
      }; // list of all recording states


      var allStates = [];
      /**
       * Get MediaRecorder all recording states.
       * @method
       * @memberof MediaStreamRecorder
       * @example
       * var state = recorder.getAllStates();
       * @returns {Array} Returns all recording states
       */

      this.getAllStates = function () {
        return allStates;
      }; // if any Track within the MediaStream is muted or not enabled at any time, 
      // the browser will only record black frames 
      // or silence since that is the content produced by the Track
      // so we need to stopRecording as soon as any single track ends.


      if (typeof config.checkForInactiveTracks === 'undefined') {
        config.checkForInactiveTracks = false; // disable to minimize CPU usage
      }

      var self = this; // this method checks if media stream is stopped
      // or if any track is ended.

      (function looper() {
        if (!mediaRecorder || config.checkForInactiveTracks === false) {
          return;
        }

        if (isMediaStreamActive() === false) {
          if (!config.disableLogs) {
            console.log('MediaStream seems stopped.');
          }

          self.stop();
          return;
        }

        setTimeout(looper, 1000); // check every second
      })(); // for debugging


      this.name = 'MediaStreamRecorder';

      this.toString = function () {
        return this.name;
      };
    }

    if (typeof RecordRTC !== 'undefined') {
      RecordRTC.MediaStreamRecorder = MediaStreamRecorder;
    } // source code from: http://typedarray.org/wp-content/projects/WebAudioRecorder/script.js
    // https://github.com/mattdiamond/Recorderjs#license-mit
    // ______________________
    // StereoAudioRecorder.js

    /**
     * StereoAudioRecorder is a standalone class used by {@link RecordRTC} to bring "stereo" audio-recording in chrome.
     * @summary JavaScript standalone object for stereo audio recording.
     * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
     * @author {@link https://MuazKhan.com|Muaz Khan}
     * @typedef StereoAudioRecorder
     * @class
     * @example
     * var recorder = new StereoAudioRecorder(MediaStream, {
     *     sampleRate: 44100,
     *     bufferSize: 4096
     * });
     * recorder.record();
     * recorder.stop(function(blob) {
     *     video.src = URL.createObjectURL(blob);
     * });
     * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
     * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
     * @param {object} config - {sampleRate: 44100, bufferSize: 4096, numberOfAudioChannels: 1, etc.}
     */


    function StereoAudioRecorder(mediaStream, config) {
      if (!getTracks(mediaStream, 'audio').length) {
        throw 'Your stream has no audio tracks.';
      }

      config = config || {};
      var self = this; // variables

      var leftchannel = [];
      var rightchannel = [];
      var recording = false;
      var recordingLength = 0;
      var jsAudioNode;
      var numberOfAudioChannels = 2;
      /**
       * Set sample rates such as 8K or 16K. Reference: http://stackoverflow.com/a/28977136/552182
       * @property {number} desiredSampRate - Desired Bits per sample * 1000
       * @memberof StereoAudioRecorder
       * @instance
       * @example
       * var recorder = StereoAudioRecorder(mediaStream, {
       *   desiredSampRate: 16 * 1000 // bits-per-sample * 1000
       * });
       */

      var desiredSampRate = config.desiredSampRate; // backward compatibility

      if (config.leftChannel === true) {
        numberOfAudioChannels = 1;
      }

      if (config.numberOfAudioChannels === 1) {
        numberOfAudioChannels = 1;
      }

      if (!numberOfAudioChannels || numberOfAudioChannels < 1) {
        numberOfAudioChannels = 2;
      }

      if (!config.disableLogs) {
        console.log('StereoAudioRecorder is set to record number of channels: ' + numberOfAudioChannels);
      } // if any Track within the MediaStream is muted or not enabled at any time, 
      // the browser will only record black frames 
      // or silence since that is the content produced by the Track
      // so we need to stopRecording as soon as any single track ends.


      if (typeof config.checkForInactiveTracks === 'undefined') {
        config.checkForInactiveTracks = true;
      }

      function isMediaStreamActive() {
        if (config.checkForInactiveTracks === false) {
          // always return "true"
          return true;
        }

        if ('active' in mediaStream) {
          if (!mediaStream.active) {
            return false;
          }
        } else if ('ended' in mediaStream) {
          // old hack
          if (mediaStream.ended) {
            return false;
          }
        }

        return true;
      }
      /**
       * This method records MediaStream.
       * @method
       * @memberof StereoAudioRecorder
       * @example
       * recorder.record();
       */


      this.record = function () {
        if (isMediaStreamActive() === false) {
          throw 'Please make sure MediaStream is active.';
        }

        resetVariables();
        isAudioProcessStarted = isPaused = false;
        recording = true;

        if (typeof config.timeSlice !== 'undefined') {
          looper();
        }
      };

      function mergeLeftRightBuffers(config, callback) {
        function mergeAudioBuffers(config, cb) {
          var numberOfAudioChannels = config.numberOfAudioChannels; // todo: "slice(0)" --- is it causes loop? Should be removed?

          var leftBuffers = config.leftBuffers.slice(0);
          var rightBuffers = config.rightBuffers.slice(0);
          var sampleRate = config.sampleRate;
          var internalInterleavedLength = config.internalInterleavedLength;
          var desiredSampRate = config.desiredSampRate;

          if (numberOfAudioChannels === 2) {
            leftBuffers = mergeBuffers(leftBuffers, internalInterleavedLength);
            rightBuffers = mergeBuffers(rightBuffers, internalInterleavedLength);

            if (desiredSampRate) {
              leftBuffers = interpolateArray(leftBuffers, desiredSampRate, sampleRate);
              rightBuffers = interpolateArray(rightBuffers, desiredSampRate, sampleRate);
            }
          }

          if (numberOfAudioChannels === 1) {
            leftBuffers = mergeBuffers(leftBuffers, internalInterleavedLength);

            if (desiredSampRate) {
              leftBuffers = interpolateArray(leftBuffers, desiredSampRate, sampleRate);
            }
          } // set sample rate as desired sample rate


          if (desiredSampRate) {
            sampleRate = desiredSampRate;
          } // for changing the sampling rate, reference:
          // http://stackoverflow.com/a/28977136/552182


          function interpolateArray(data, newSampleRate, oldSampleRate) {
            var fitCount = Math.round(data.length * (newSampleRate / oldSampleRate));
            var newData = [];
            var springFactor = Number((data.length - 1) / (fitCount - 1));
            newData[0] = data[0];

            for (var i = 1; i < fitCount - 1; i++) {
              var tmp = i * springFactor;
              var before = Number(Math.floor(tmp)).toFixed();
              var after = Number(Math.ceil(tmp)).toFixed();
              var atPoint = tmp - before;
              newData[i] = linearInterpolate(data[before], data[after], atPoint);
            }

            newData[fitCount - 1] = data[data.length - 1];
            return newData;
          }

          function linearInterpolate(before, after, atPoint) {
            return before + (after - before) * atPoint;
          }

          function mergeBuffers(channelBuffer, rLength) {
            var result = new Float64Array(rLength);
            var offset = 0;
            var lng = channelBuffer.length;

            for (var i = 0; i < lng; i++) {
              var buffer = channelBuffer[i];
              result.set(buffer, offset);
              offset += buffer.length;
            }

            return result;
          }

          function interleave(leftChannel, rightChannel) {
            var length = leftChannel.length + rightChannel.length;
            var result = new Float64Array(length);
            var inputIndex = 0;

            for (var index = 0; index < length;) {
              result[index++] = leftChannel[inputIndex];
              result[index++] = rightChannel[inputIndex];
              inputIndex++;
            }

            return result;
          }

          function writeUTFBytes(view, offset, string) {
            var lng = string.length;

            for (var i = 0; i < lng; i++) {
              view.setUint8(offset + i, string.charCodeAt(i));
            }
          } // interleave both channels together


          var interleaved;

          if (numberOfAudioChannels === 2) {
            interleaved = interleave(leftBuffers, rightBuffers);
          }

          if (numberOfAudioChannels === 1) {
            interleaved = leftBuffers;
          }

          var interleavedLength = interleaved.length; // create wav file

          var resultingBufferLength = 44 + interleavedLength * 2;
          var buffer = new ArrayBuffer(resultingBufferLength);
          var view = new DataView(buffer); // RIFF chunk descriptor/identifier 

          writeUTFBytes(view, 0, 'RIFF'); // RIFF chunk length
          // changed "44" to "36" via #401

          view.setUint32(4, 36 + interleavedLength * 2, true); // RIFF type 

          writeUTFBytes(view, 8, 'WAVE'); // format chunk identifier 
          // FMT sub-chunk

          writeUTFBytes(view, 12, 'fmt '); // format chunk length 

          view.setUint32(16, 16, true); // sample format (raw)

          view.setUint16(20, 1, true); // stereo (2 channels)

          view.setUint16(22, numberOfAudioChannels, true); // sample rate 

          view.setUint32(24, sampleRate, true); // byte rate (sample rate * block align)

          view.setUint32(28, sampleRate * numberOfAudioChannels * 2, true); // block align (channel count * bytes per sample) 

          view.setUint16(32, numberOfAudioChannels * 2, true); // bits per sample 

          view.setUint16(34, 16, true); // data sub-chunk
          // data chunk identifier 

          writeUTFBytes(view, 36, 'data'); // data chunk length 

          view.setUint32(40, interleavedLength * 2, true); // write the PCM samples

          var lng = interleavedLength;
          var index = 44;
          var volume = 1;

          for (var i = 0; i < lng; i++) {
            view.setInt16(index, interleaved[i] * (0x7FFF * volume), true);
            index += 2;
          }

          if (cb) {
            return cb({
              buffer: buffer,
              view: view
            });
          }

          postMessage({
            buffer: buffer,
            view: view
          });
        }

        if (config.noWorker) {
          mergeAudioBuffers(config, function (data) {
            callback(data.buffer, data.view);
          });
          return;
        }

        var webWorker = processInWebWorker(mergeAudioBuffers);

        webWorker.onmessage = function (event) {
          callback(event.data.buffer, event.data.view); // release memory

          URL.revokeObjectURL(webWorker.workerURL); // kill webworker (or Chrome will kill your page after ~25 calls)

          webWorker.terminate();
        };

        webWorker.postMessage(config);
      }

      function processInWebWorker(_function) {
        var workerURL = URL.createObjectURL(new Blob([_function.toString(), ';this.onmessage =  function (eee) {' + _function.name + '(eee.data);}'], {
          type: 'application/javascript'
        }));
        var worker = new Worker(workerURL);
        worker.workerURL = workerURL;
        return worker;
      }
      /**
       * This method stops recording MediaStream.
       * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
       * @method
       * @memberof StereoAudioRecorder
       * @example
       * recorder.stop(function(blob) {
       *     video.src = URL.createObjectURL(blob);
       * });
       */


      this.stop = function (callback) {
        callback = callback || function () {}; // stop recording


        recording = false;
        mergeLeftRightBuffers({
          desiredSampRate: desiredSampRate,
          sampleRate: sampleRate,
          numberOfAudioChannels: numberOfAudioChannels,
          internalInterleavedLength: recordingLength,
          leftBuffers: leftchannel,
          rightBuffers: numberOfAudioChannels === 1 ? [] : rightchannel,
          noWorker: config.noWorker
        }, function (buffer, view) {
          /**
           * @property {Blob} blob - The recorded blob object.
           * @memberof StereoAudioRecorder
           * @example
           * recorder.stop(function(){
           *     var blob = recorder.blob;
           * });
           */
          self.blob = new Blob([view], {
            type: 'audio/wav'
          });
          /**
           * @property {ArrayBuffer} buffer - The recorded buffer object.
           * @memberof StereoAudioRecorder
           * @example
           * recorder.stop(function(){
           *     var buffer = recorder.buffer;
           * });
           */

          self.buffer = new ArrayBuffer(view.buffer.byteLength);
          /**
           * @property {DataView} view - The recorded data-view object.
           * @memberof StereoAudioRecorder
           * @example
           * recorder.stop(function(){
           *     var view = recorder.view;
           * });
           */

          self.view = view;
          self.sampleRate = desiredSampRate || sampleRate;
          self.bufferSize = bufferSize; // recorded audio length

          self.length = recordingLength;
          isAudioProcessStarted = false;

          if (callback) {
            callback(self.blob);
          }
        });
      };

      if (typeof RecordRTC.Storage === 'undefined') {
        RecordRTC.Storage = {
          AudioContextConstructor: null,
          AudioContext: window.AudioContext || window.webkitAudioContext
        };
      }

      if (!RecordRTC.Storage.AudioContextConstructor || RecordRTC.Storage.AudioContextConstructor.state === 'closed') {
        RecordRTC.Storage.AudioContextConstructor = new RecordRTC.Storage.AudioContext();
      }

      var context = RecordRTC.Storage.AudioContextConstructor; // creates an audio node from the microphone incoming stream

      var audioInput = context.createMediaStreamSource(mediaStream);
      var legalBufferValues = [0, 256, 512, 1024, 2048, 4096, 8192, 16384];
      /**
       * From the spec: This value controls how frequently the audioprocess event is
       * dispatched and how many sample-frames need to be processed each call.
       * Lower values for buffer size will result in a lower (better) latency.
       * Higher values will be necessary to avoid audio breakup and glitches
       * The size of the buffer (in sample-frames) which needs to
       * be processed each time onprocessaudio is called.
       * Legal values are (256, 512, 1024, 2048, 4096, 8192, 16384).
       * @property {number} bufferSize - Buffer-size for how frequently the audioprocess event is dispatched.
       * @memberof StereoAudioRecorder
       * @example
       * recorder = new StereoAudioRecorder(mediaStream, {
       *     bufferSize: 4096
       * });
       */
      // "0" means, let chrome decide the most accurate buffer-size for current platform.

      var bufferSize = typeof config.bufferSize === 'undefined' ? 4096 : config.bufferSize;

      if (legalBufferValues.indexOf(bufferSize) === -1) {
        if (!config.disableLogs) {
          console.log('Legal values for buffer-size are ' + JSON.stringify(legalBufferValues, null, '\t'));
        }
      }

      if (context.createJavaScriptNode) {
        jsAudioNode = context.createJavaScriptNode(bufferSize, numberOfAudioChannels, numberOfAudioChannels);
      } else if (context.createScriptProcessor) {
        jsAudioNode = context.createScriptProcessor(bufferSize, numberOfAudioChannels, numberOfAudioChannels);
      } else {
        throw 'WebAudio API has no support on this browser.';
      } // connect the stream to the script processor


      audioInput.connect(jsAudioNode);

      if (!config.bufferSize) {
        bufferSize = jsAudioNode.bufferSize; // device buffer-size
      }
      /**
       * The sample rate (in sample-frames per second) at which the
       * AudioContext handles audio. It is assumed that all AudioNodes
       * in the context run at this rate. In making this assumption,
       * sample-rate converters or "varispeed" processors are not supported
       * in real-time processing.
       * The sampleRate parameter describes the sample-rate of the
       * linear PCM audio data in the buffer in sample-frames per second.
       * An implementation must support sample-rates in at least
       * the range 22050 to 96000.
       * @property {number} sampleRate - Buffer-size for how frequently the audioprocess event is dispatched.
       * @memberof StereoAudioRecorder
       * @example
       * recorder = new StereoAudioRecorder(mediaStream, {
       *     sampleRate: 44100
       * });
       */


      var sampleRate = typeof config.sampleRate !== 'undefined' ? config.sampleRate : context.sampleRate || 44100;

      if (sampleRate < 22050 || sampleRate > 96000) {
        // Ref: http://stackoverflow.com/a/26303918/552182
        if (!config.disableLogs) {
          console.log('sample-rate must be under range 22050 and 96000.');
        }
      }

      if (!config.disableLogs) {
        if (config.desiredSampRate) {
          console.log('Desired sample-rate: ' + config.desiredSampRate);
        }
      }

      var isPaused = false;
      /**
       * This method pauses the recording process.
       * @method
       * @memberof StereoAudioRecorder
       * @example
       * recorder.pause();
       */

      this.pause = function () {
        isPaused = true;
      };
      /**
       * This method resumes the recording process.
       * @method
       * @memberof StereoAudioRecorder
       * @example
       * recorder.resume();
       */


      this.resume = function () {
        if (isMediaStreamActive() === false) {
          throw 'Please make sure MediaStream is active.';
        }

        if (!recording) {
          if (!config.disableLogs) {
            console.log('Seems recording has been restarted.');
          }

          this.record();
          return;
        }

        isPaused = false;
      };
      /**
       * This method resets currently recorded data.
       * @method
       * @memberof StereoAudioRecorder
       * @example
       * recorder.clearRecordedData();
       */


      this.clearRecordedData = function () {
        config.checkForInactiveTracks = false;

        if (recording) {
          this.stop(clearRecordedDataCB);
        }

        clearRecordedDataCB();
      };

      function resetVariables() {
        leftchannel = [];
        rightchannel = [];
        recordingLength = 0;
        isAudioProcessStarted = false;
        recording = false;
        isPaused = false;
        context = null;
        self.leftchannel = leftchannel;
        self.rightchannel = rightchannel;
        self.numberOfAudioChannels = numberOfAudioChannels;
        self.desiredSampRate = desiredSampRate;
        self.sampleRate = sampleRate;
        self.recordingLength = recordingLength;
        intervalsBasedBuffers = {
          left: [],
          right: [],
          recordingLength: 0
        };
      }

      function clearRecordedDataCB() {
        if (jsAudioNode) {
          jsAudioNode.onaudioprocess = null;
          jsAudioNode.disconnect();
          jsAudioNode = null;
        }

        if (audioInput) {
          audioInput.disconnect();
          audioInput = null;
        }

        resetVariables();
      } // for debugging


      this.name = 'StereoAudioRecorder';

      this.toString = function () {
        return this.name;
      };

      var isAudioProcessStarted = false;

      function onAudioProcessDataAvailable(e) {
        if (isPaused) {
          return;
        }

        if (isMediaStreamActive() === false) {
          if (!config.disableLogs) {
            console.log('MediaStream seems stopped.');
          }

          jsAudioNode.disconnect();
          recording = false;
        }

        if (!recording) {
          if (audioInput) {
            audioInput.disconnect();
            audioInput = null;
          }

          return;
        }
        /**
         * This method is called on "onaudioprocess" event's first invocation.
         * @method {function} onAudioProcessStarted
         * @memberof StereoAudioRecorder
         * @example
         * recorder.onAudioProcessStarted: function() { };
         */


        if (!isAudioProcessStarted) {
          isAudioProcessStarted = true;

          if (config.onAudioProcessStarted) {
            config.onAudioProcessStarted();
          }

          if (config.initCallback) {
            config.initCallback();
          }
        }

        var left = e.inputBuffer.getChannelData(0); // we clone the samples

        var chLeft = new Float32Array(left);
        leftchannel.push(chLeft);

        if (numberOfAudioChannels === 2) {
          var right = e.inputBuffer.getChannelData(1);
          var chRight = new Float32Array(right);
          rightchannel.push(chRight);
        }

        recordingLength += bufferSize; // export raw PCM

        self.recordingLength = recordingLength;

        if (typeof config.timeSlice !== 'undefined') {
          intervalsBasedBuffers.recordingLength += bufferSize;
          intervalsBasedBuffers.left.push(chLeft);

          if (numberOfAudioChannels === 2) {
            intervalsBasedBuffers.right.push(chRight);
          }
        }
      }

      jsAudioNode.onaudioprocess = onAudioProcessDataAvailable; // to prevent self audio to be connected with speakers

      if (context.createMediaStreamDestination) {
        jsAudioNode.connect(context.createMediaStreamDestination());
      } else {
        jsAudioNode.connect(context.destination);
      } // export raw PCM


      this.leftchannel = leftchannel;
      this.rightchannel = rightchannel;
      this.numberOfAudioChannels = numberOfAudioChannels;
      this.desiredSampRate = desiredSampRate;
      this.sampleRate = sampleRate;
      self.recordingLength = recordingLength; // helper for intervals based blobs

      var intervalsBasedBuffers = {
        left: [],
        right: [],
        recordingLength: 0
      }; // this looper is used to support intervals based blobs (via timeSlice+ondataavailable)

      function looper() {
        if (!recording || typeof config.ondataavailable !== 'function' || typeof config.timeSlice === 'undefined') {
          return;
        }

        if (intervalsBasedBuffers.left.length) {
          mergeLeftRightBuffers({
            desiredSampRate: desiredSampRate,
            sampleRate: sampleRate,
            numberOfAudioChannels: numberOfAudioChannels,
            internalInterleavedLength: intervalsBasedBuffers.recordingLength,
            leftBuffers: intervalsBasedBuffers.left,
            rightBuffers: numberOfAudioChannels === 1 ? [] : intervalsBasedBuffers.right
          }, function (buffer, view) {
            var blob = new Blob([view], {
              type: 'audio/wav'
            });
            config.ondataavailable(blob);
            setTimeout(looper, config.timeSlice);
          });
          intervalsBasedBuffers = {
            left: [],
            right: [],
            recordingLength: 0
          };
        } else {
          setTimeout(looper, config.timeSlice);
        }
      }
    }

    if (typeof RecordRTC !== 'undefined') {
      RecordRTC.StereoAudioRecorder = StereoAudioRecorder;
    } // _________________
    // CanvasRecorder.js

    /**
     * CanvasRecorder is a standalone class used by {@link RecordRTC} to bring HTML5-Canvas recording into video WebM. It uses HTML2Canvas library and runs top over {@link Whammy}.
     * @summary HTML2Canvas recording into video WebM.
     * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
     * @author {@link https://MuazKhan.com|Muaz Khan}
     * @typedef CanvasRecorder
     * @class
     * @example
     * var recorder = new CanvasRecorder(htmlElement, { disableLogs: true, useWhammyRecorder: true });
     * recorder.record();
     * recorder.stop(function(blob) {
     *     video.src = URL.createObjectURL(blob);
     * });
     * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
     * @param {HTMLElement} htmlElement - querySelector/getElementById/getElementsByTagName[0]/etc.
     * @param {object} config - {disableLogs:true, initCallback: function}
     */


    function CanvasRecorder(htmlElement, config) {
      if (typeof html2canvas === 'undefined') {
        throw 'Please link: https://www.webrtc-experiment.com/screenshot.js';
      }

      config = config || {};

      if (!config.frameInterval) {
        config.frameInterval = 10;
      } // via DetectRTC.js


      var isCanvasSupportsStreamCapturing = false;
      ['captureStream', 'mozCaptureStream', 'webkitCaptureStream'].forEach(function (item) {
        if (item in document.createElement('canvas')) {
          isCanvasSupportsStreamCapturing = true;
        }
      });

      var _isChrome = (!!window.webkitRTCPeerConnection || !!window.webkitGetUserMedia) && !!window.chrome;

      var chromeVersion = 50;
      var matchArray = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);

      if (_isChrome && matchArray && matchArray[2]) {
        chromeVersion = parseInt(matchArray[2], 10);
      }

      if (_isChrome && chromeVersion < 52) {
        isCanvasSupportsStreamCapturing = false;
      }

      if (config.useWhammyRecorder) {
        isCanvasSupportsStreamCapturing = false;
      }

      var globalCanvas, mediaStreamRecorder;

      if (isCanvasSupportsStreamCapturing) {
        if (!config.disableLogs) {
          console.log('Your browser supports both MediRecorder API and canvas.captureStream!');
        }

        if (htmlElement instanceof HTMLCanvasElement) {
          globalCanvas = htmlElement;
        } else if (htmlElement instanceof CanvasRenderingContext2D) {
          globalCanvas = htmlElement.canvas;
        } else {
          throw 'Please pass either HTMLCanvasElement or CanvasRenderingContext2D.';
        }
      } else if (!!navigator.mozGetUserMedia) {
        if (!config.disableLogs) {
          console.error('Canvas recording is NOT supported in Firefox.');
        }
      }

      var isRecording;
      /**
       * This method records Canvas.
       * @method
       * @memberof CanvasRecorder
       * @example
       * recorder.record();
       */

      this.record = function () {
        isRecording = true;

        if (isCanvasSupportsStreamCapturing && !config.useWhammyRecorder) {
          // CanvasCaptureMediaStream
          var canvasMediaStream;

          if ('captureStream' in globalCanvas) {
            canvasMediaStream = globalCanvas.captureStream(25); // 25 FPS
          } else if ('mozCaptureStream' in globalCanvas) {
            canvasMediaStream = globalCanvas.mozCaptureStream(25);
          } else if ('webkitCaptureStream' in globalCanvas) {
            canvasMediaStream = globalCanvas.webkitCaptureStream(25);
          }

          try {
            var mdStream = new MediaStream();
            mdStream.addTrack(getTracks(canvasMediaStream, 'video')[0]);
            canvasMediaStream = mdStream;
          } catch (e) {}

          if (!canvasMediaStream) {
            throw 'captureStream API are NOT available.';
          } // Note: Jan 18, 2016 status is that, 
          // Firefox MediaRecorder API can't record CanvasCaptureMediaStream object.


          mediaStreamRecorder = new MediaStreamRecorder(canvasMediaStream, {
            mimeType: config.mimeType || 'video/webm'
          });
          mediaStreamRecorder.record();
        } else {
          whammy.frames = [];
          lastTime = new Date().getTime();
          drawCanvasFrame();
        }

        if (config.initCallback) {
          config.initCallback();
        }
      };

      this.getWebPImages = function (callback) {
        if (htmlElement.nodeName.toLowerCase() !== 'canvas') {
          callback();
          return;
        }

        var framesLength = whammy.frames.length;
        whammy.frames.forEach(function (frame, idx) {
          var framesRemaining = framesLength - idx;

          if (!config.disableLogs) {
            console.log(framesRemaining + '/' + framesLength + ' frames remaining');
          }

          if (config.onEncodingCallback) {
            config.onEncodingCallback(framesRemaining, framesLength);
          }

          var webp = frame.image.toDataURL('image/webp', 1);
          whammy.frames[idx].image = webp;
        });

        if (!config.disableLogs) {
          console.log('Generating WebM');
        }

        callback();
      };
      /**
       * This method stops recording Canvas.
       * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
       * @method
       * @memberof CanvasRecorder
       * @example
       * recorder.stop(function(blob) {
       *     video.src = URL.createObjectURL(blob);
       * });
       */


      this.stop = function (callback) {
        isRecording = false;
        var that = this;

        if (isCanvasSupportsStreamCapturing && mediaStreamRecorder) {
          mediaStreamRecorder.stop(callback);
          return;
        }

        this.getWebPImages(function () {
          /**
           * @property {Blob} blob - Recorded frames in video/webm blob.
           * @memberof CanvasRecorder
           * @example
           * recorder.stop(function() {
           *     var blob = recorder.blob;
           * });
           */
          whammy.compile(function (blob) {
            if (!config.disableLogs) {
              console.log('Recording finished!');
            }

            that.blob = blob;

            if (that.blob.forEach) {
              that.blob = new Blob([], {
                type: 'video/webm'
              });
            }

            if (callback) {
              callback(that.blob);
            }

            whammy.frames = [];
          });
        });
      };

      var isPausedRecording = false;
      /**
       * This method pauses the recording process.
       * @method
       * @memberof CanvasRecorder
       * @example
       * recorder.pause();
       */

      this.pause = function () {
        isPausedRecording = true;

        if (mediaStreamRecorder instanceof MediaStreamRecorder) {
          mediaStreamRecorder.pause();
          return;
        }
      };
      /**
       * This method resumes the recording process.
       * @method
       * @memberof CanvasRecorder
       * @example
       * recorder.resume();
       */


      this.resume = function () {
        isPausedRecording = false;

        if (mediaStreamRecorder instanceof MediaStreamRecorder) {
          mediaStreamRecorder.resume();
          return;
        }

        if (!isRecording) {
          this.record();
        }
      };
      /**
       * This method resets currently recorded data.
       * @method
       * @memberof CanvasRecorder
       * @example
       * recorder.clearRecordedData();
       */


      this.clearRecordedData = function () {
        if (isRecording) {
          this.stop(clearRecordedDataCB);
        }

        clearRecordedDataCB();
      };

      function clearRecordedDataCB() {
        whammy.frames = [];
        isRecording = false;
        isPausedRecording = false;
      } // for debugging


      this.name = 'CanvasRecorder';

      this.toString = function () {
        return this.name;
      };

      function cloneCanvas() {
        //create a new canvas
        var newCanvas = document.createElement('canvas');
        var context = newCanvas.getContext('2d'); //set dimensions

        newCanvas.width = htmlElement.width;
        newCanvas.height = htmlElement.height; //apply the old canvas to the new one

        context.drawImage(htmlElement, 0, 0); //return the new canvas

        return newCanvas;
      }

      function drawCanvasFrame() {
        if (isPausedRecording) {
          lastTime = new Date().getTime();
          return setTimeout(drawCanvasFrame, 500);
        }

        if (htmlElement.nodeName.toLowerCase() === 'canvas') {
          var duration = new Date().getTime() - lastTime; // via #206, by Jack i.e. @Seymourr

          lastTime = new Date().getTime();
          whammy.frames.push({
            image: cloneCanvas(),
            duration: duration
          });

          if (isRecording) {
            setTimeout(drawCanvasFrame, config.frameInterval);
          }

          return;
        }

        html2canvas(htmlElement, {
          grabMouse: typeof config.showMousePointer === 'undefined' || config.showMousePointer,
          onrendered: function (canvas) {
            var duration = new Date().getTime() - lastTime;

            if (!duration) {
              return setTimeout(drawCanvasFrame, config.frameInterval);
            } // via #206, by Jack i.e. @Seymourr


            lastTime = new Date().getTime();
            whammy.frames.push({
              image: canvas.toDataURL('image/webp', 1),
              duration: duration
            });

            if (isRecording) {
              setTimeout(drawCanvasFrame, config.frameInterval);
            }
          }
        });
      }

      var lastTime = new Date().getTime();
      var whammy = new Whammy.Video(100);
    }

    if (typeof RecordRTC !== 'undefined') {
      RecordRTC.CanvasRecorder = CanvasRecorder;
    } // _________________
    // WhammyRecorder.js

    /**
     * WhammyRecorder is a standalone class used by {@link RecordRTC} to bring video recording in Chrome. It runs top over {@link Whammy}.
     * @summary Video recording feature in Chrome.
     * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
     * @author {@link https://MuazKhan.com|Muaz Khan}
     * @typedef WhammyRecorder
     * @class
     * @example
     * var recorder = new WhammyRecorder(mediaStream);
     * recorder.record();
     * recorder.stop(function(blob) {
     *     video.src = URL.createObjectURL(blob);
     * });
     * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
     * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
     * @param {object} config - {disableLogs: true, initCallback: function, video: HTMLVideoElement, etc.}
     */


    function WhammyRecorder(mediaStream, config) {
      config = config || {};

      if (!config.frameInterval) {
        config.frameInterval = 10;
      }

      if (!config.disableLogs) {
        console.log('Using frames-interval:', config.frameInterval);
      }
      /**
       * This method records video.
       * @method
       * @memberof WhammyRecorder
       * @example
       * recorder.record();
       */


      this.record = function () {
        if (!config.width) {
          config.width = 320;
        }

        if (!config.height) {
          config.height = 240;
        }

        if (!config.video) {
          config.video = {
            width: config.width,
            height: config.height
          };
        }

        if (!config.canvas) {
          config.canvas = {
            width: config.width,
            height: config.height
          };
        }

        canvas.width = config.canvas.width || 320;
        canvas.height = config.canvas.height || 240;
        context = canvas.getContext('2d'); // setting defaults

        if (config.video && config.video instanceof HTMLVideoElement) {
          video = config.video.cloneNode();

          if (config.initCallback) {
            config.initCallback();
          }
        } else {
          video = document.createElement('video');
          setSrcObject(mediaStream, video);

          video.onloadedmetadata = function () {
            // "onloadedmetadata" may NOT work in FF?
            if (config.initCallback) {
              config.initCallback();
            }
          };

          video.width = config.video.width;
          video.height = config.video.height;
        }

        video.muted = true;
        video.play();
        lastTime = new Date().getTime();
        whammy = new Whammy.Video();

        if (!config.disableLogs) {
          console.log('canvas resolutions', canvas.width, '*', canvas.height);
          console.log('video width/height', video.width || canvas.width, '*', video.height || canvas.height);
        }

        drawFrames(config.frameInterval);
      };
      /**
       * Draw and push frames to Whammy
       * @param {integer} frameInterval - set minimum interval (in milliseconds) between each time we push a frame to Whammy
       */


      function drawFrames(frameInterval) {
        frameInterval = typeof frameInterval !== 'undefined' ? frameInterval : 10;
        var duration = new Date().getTime() - lastTime;

        if (!duration) {
          return setTimeout(drawFrames, frameInterval, frameInterval);
        }

        if (isPausedRecording) {
          lastTime = new Date().getTime();
          return setTimeout(drawFrames, 100);
        } // via #206, by Jack i.e. @Seymourr


        lastTime = new Date().getTime();

        if (video.paused) {
          // via: https://github.com/muaz-khan/WebRTC-Experiment/pull/316
          // Tweak for Android Chrome
          video.play();
        }

        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        whammy.frames.push({
          duration: duration,
          image: canvas.toDataURL('image/webp')
        });

        if (!isStopDrawing) {
          setTimeout(drawFrames, frameInterval, frameInterval);
        }
      }

      function asyncLoop(o) {
        var i = -1,
            length = o.length;

        (function loop() {
          i++;

          if (i === length) {
            o.callback();
            return;
          } // "setTimeout" added by Jim McLeod


          setTimeout(function () {
            o.functionToLoop(loop, i);
          }, 1);
        })();
      }
      /**
       * remove black frames from the beginning to the specified frame
       * @param {Array} _frames - array of frames to be checked
       * @param {number} _framesToCheck - number of frame until check will be executed (-1 - will drop all frames until frame not matched will be found)
       * @param {number} _pixTolerance - 0 - very strict (only black pixel color) ; 1 - all
       * @param {number} _frameTolerance - 0 - very strict (only black frame color) ; 1 - all
       * @returns {Array} - array of frames
       */
      // pull#293 by @volodalexey


      function dropBlackFrames(_frames, _framesToCheck, _pixTolerance, _frameTolerance, callback) {
        var localCanvas = document.createElement('canvas');
        localCanvas.width = canvas.width;
        localCanvas.height = canvas.height;
        var context2d = localCanvas.getContext('2d');
        var resultFrames = [];
        var checkUntilNotBlack = _framesToCheck === -1;
        var endCheckFrame = _framesToCheck && _framesToCheck > 0 && _framesToCheck <= _frames.length ? _framesToCheck : _frames.length;
        var sampleColor = {
          r: 0,
          g: 0,
          b: 0
        };
        var maxColorDifference = Math.sqrt(Math.pow(255, 2) + Math.pow(255, 2) + Math.pow(255, 2));
        var pixTolerance = _pixTolerance && _pixTolerance >= 0 && _pixTolerance <= 1 ? _pixTolerance : 0;
        var frameTolerance = _frameTolerance && _frameTolerance >= 0 && _frameTolerance <= 1 ? _frameTolerance : 0;
        var doNotCheckNext = false;
        asyncLoop({
          length: endCheckFrame,
          functionToLoop: function (loop, f) {
            var matchPixCount, endPixCheck, maxPixCount;

            var finishImage = function () {
              if (!doNotCheckNext && maxPixCount - matchPixCount <= maxPixCount * frameTolerance) ; else {
                // console.log('frame is passed : ' + f);
                if (checkUntilNotBlack) {
                  doNotCheckNext = true;
                }

                resultFrames.push(_frames[f]);
              }

              loop();
            };

            if (!doNotCheckNext) {
              var image = new Image();

              image.onload = function () {
                context2d.drawImage(image, 0, 0, canvas.width, canvas.height);
                var imageData = context2d.getImageData(0, 0, canvas.width, canvas.height);
                matchPixCount = 0;
                endPixCheck = imageData.data.length;
                maxPixCount = imageData.data.length / 4;

                for (var pix = 0; pix < endPixCheck; pix += 4) {
                  var currentColor = {
                    r: imageData.data[pix],
                    g: imageData.data[pix + 1],
                    b: imageData.data[pix + 2]
                  };
                  var colorDifference = Math.sqrt(Math.pow(currentColor.r - sampleColor.r, 2) + Math.pow(currentColor.g - sampleColor.g, 2) + Math.pow(currentColor.b - sampleColor.b, 2)); // difference in color it is difference in color vectors (r1,g1,b1) <=> (r2,g2,b2)

                  if (colorDifference <= maxColorDifference * pixTolerance) {
                    matchPixCount++;
                  }
                }

                finishImage();
              };

              image.src = _frames[f].image;
            } else {
              finishImage();
            }
          },
          callback: function () {
            resultFrames = resultFrames.concat(_frames.slice(endCheckFrame));

            if (resultFrames.length <= 0) {
              // at least one last frame should be available for next manipulation
              // if total duration of all frames will be < 1000 than ffmpeg doesn't work well...
              resultFrames.push(_frames[_frames.length - 1]);
            }

            callback(resultFrames);
          }
        });
      }

      var isStopDrawing = false;
      /**
       * This method stops recording video.
       * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
       * @method
       * @memberof WhammyRecorder
       * @example
       * recorder.stop(function(blob) {
       *     video.src = URL.createObjectURL(blob);
       * });
       */

      this.stop = function (callback) {
        callback = callback || function () {};

        isStopDrawing = true;

        var _this = this; // analyse of all frames takes some time!


        setTimeout(function () {
          // e.g. dropBlackFrames(frames, 10, 1, 1) - will cut all 10 frames
          // e.g. dropBlackFrames(frames, 10, 0.5, 0.5) - will analyse 10 frames
          // e.g. dropBlackFrames(frames, 10) === dropBlackFrames(frames, 10, 0, 0) - will analyse 10 frames with strict black color
          dropBlackFrames(whammy.frames, -1, null, null, function (frames) {
            whammy.frames = frames; // to display advertisement images!

            if (config.advertisement && config.advertisement.length) {
              whammy.frames = config.advertisement.concat(whammy.frames);
            }
            /**
             * @property {Blob} blob - Recorded frames in video/webm blob.
             * @memberof WhammyRecorder
             * @example
             * recorder.stop(function() {
             *     var blob = recorder.blob;
             * });
             */


            whammy.compile(function (blob) {
              _this.blob = blob;

              if (_this.blob.forEach) {
                _this.blob = new Blob([], {
                  type: 'video/webm'
                });
              }

              if (callback) {
                callback(_this.blob);
              }
            });
          });
        }, 10);
      };

      var isPausedRecording = false;
      /**
       * This method pauses the recording process.
       * @method
       * @memberof WhammyRecorder
       * @example
       * recorder.pause();
       */

      this.pause = function () {
        isPausedRecording = true;
      };
      /**
       * This method resumes the recording process.
       * @method
       * @memberof WhammyRecorder
       * @example
       * recorder.resume();
       */


      this.resume = function () {
        isPausedRecording = false;

        if (isStopDrawing) {
          this.record();
        }
      };
      /**
       * This method resets currently recorded data.
       * @method
       * @memberof WhammyRecorder
       * @example
       * recorder.clearRecordedData();
       */


      this.clearRecordedData = function () {
        if (!isStopDrawing) {
          this.stop(clearRecordedDataCB);
        }

        clearRecordedDataCB();
      };

      function clearRecordedDataCB() {
        whammy.frames = [];
        isStopDrawing = true;
        isPausedRecording = false;
      } // for debugging


      this.name = 'WhammyRecorder';

      this.toString = function () {
        return this.name;
      };

      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      var video;
      var lastTime;
      var whammy;
    }

    if (typeof RecordRTC !== 'undefined') {
      RecordRTC.WhammyRecorder = WhammyRecorder;
    } // https://github.com/antimatter15/whammy/blob/master/LICENSE
    // _________
    // Whammy.js
    // todo: Firefox now supports webp for webm containers!
    // their MediaRecorder implementation works well!
    // should we provide an option to record via Whammy.js or MediaRecorder API is a better solution?

    /**
     * Whammy is a standalone class used by {@link RecordRTC} to bring video recording in Chrome. It is written by {@link https://github.com/antimatter15|antimatter15}
     * @summary A real time javascript webm encoder based on a canvas hack.
     * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
     * @author {@link https://MuazKhan.com|Muaz Khan}
     * @typedef Whammy
     * @class
     * @example
     * var recorder = new Whammy().Video(15);
     * recorder.add(context || canvas || dataURL);
     * var output = recorder.compile();
     * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
     */


    var Whammy = function () {
      // a more abstract-ish API
      function WhammyVideo(duration) {
        this.frames = [];
        this.duration = duration || 1;
        this.quality = 0.8;
      }
      /**
       * Pass Canvas or Context or image/webp(string) to {@link Whammy} encoder.
       * @method
       * @memberof Whammy
       * @example
       * recorder = new Whammy().Video(0.8, 100);
       * recorder.add(canvas || context || 'image/webp');
       * @param {string} frame - Canvas || Context || image/webp
       * @param {number} duration - Stick a duration (in milliseconds)
       */


      WhammyVideo.prototype.add = function (frame, duration) {
        if ('canvas' in frame) {
          //CanvasRenderingContext2D
          frame = frame.canvas;
        }

        if ('toDataURL' in frame) {
          frame = frame.toDataURL('image/webp', this.quality);
        }

        if (!/^data:image\/webp;base64,/ig.test(frame)) {
          throw 'Input must be formatted properly as a base64 encoded DataURI of type image/webp';
        }

        this.frames.push({
          image: frame,
          duration: duration || this.duration
        });
      };

      function processInWebWorker(_function) {
        var blob = URL.createObjectURL(new Blob([_function.toString(), 'this.onmessage =  function (eee) {' + _function.name + '(eee.data);}'], {
          type: 'application/javascript'
        }));
        var worker = new Worker(blob);
        URL.revokeObjectURL(blob);
        return worker;
      }

      function whammyInWebWorker(frames) {
        function ArrayToWebM(frames) {
          var info = checkFrames(frames);

          if (!info) {
            return [];
          }

          var clusterMaxDuration = 30000;
          var EBML = [{
            'id': 0x1a45dfa3,
            // EBML
            'data': [{
              'data': 1,
              'id': 0x4286 // EBMLVersion

            }, {
              'data': 1,
              'id': 0x42f7 // EBMLReadVersion

            }, {
              'data': 4,
              'id': 0x42f2 // EBMLMaxIDLength

            }, {
              'data': 8,
              'id': 0x42f3 // EBMLMaxSizeLength

            }, {
              'data': 'webm',
              'id': 0x4282 // DocType

            }, {
              'data': 2,
              'id': 0x4287 // DocTypeVersion

            }, {
              'data': 2,
              'id': 0x4285 // DocTypeReadVersion

            }]
          }, {
            'id': 0x18538067,
            // Segment
            'data': [{
              'id': 0x1549a966,
              // Info
              'data': [{
                'data': 1e6,
                //do things in millisecs (num of nanosecs for duration scale)
                'id': 0x2ad7b1 // TimecodeScale

              }, {
                'data': 'whammy',
                'id': 0x4d80 // MuxingApp

              }, {
                'data': 'whammy',
                'id': 0x5741 // WritingApp

              }, {
                'data': doubleToString(info.duration),
                'id': 0x4489 // Duration

              }]
            }, {
              'id': 0x1654ae6b,
              // Tracks
              'data': [{
                'id': 0xae,
                // TrackEntry
                'data': [{
                  'data': 1,
                  'id': 0xd7 // TrackNumber

                }, {
                  'data': 1,
                  'id': 0x73c5 // TrackUID

                }, {
                  'data': 0,
                  'id': 0x9c // FlagLacing

                }, {
                  'data': 'und',
                  'id': 0x22b59c // Language

                }, {
                  'data': 'V_VP8',
                  'id': 0x86 // CodecID

                }, {
                  'data': 'VP8',
                  'id': 0x258688 // CodecName

                }, {
                  'data': 1,
                  'id': 0x83 // TrackType

                }, {
                  'id': 0xe0,
                  // Video
                  'data': [{
                    'data': info.width,
                    'id': 0xb0 // PixelWidth

                  }, {
                    'data': info.height,
                    'id': 0xba // PixelHeight

                  }]
                }]
              }]
            }]
          }]; //Generate clusters (max duration)

          var frameNumber = 0;
          var clusterTimecode = 0;

          while (frameNumber < frames.length) {
            var clusterFrames = [];
            var clusterDuration = 0;

            do {
              clusterFrames.push(frames[frameNumber]);
              clusterDuration += frames[frameNumber].duration;
              frameNumber++;
            } while (frameNumber < frames.length && clusterDuration < clusterMaxDuration);

            var clusterCounter = 0;
            var cluster = {
              'id': 0x1f43b675,
              // Cluster
              'data': getClusterData(clusterTimecode, clusterCounter, clusterFrames)
            }; //Add cluster to segment

            EBML[1].data.push(cluster);
            clusterTimecode += clusterDuration;
          }

          return generateEBML(EBML);
        }

        function getClusterData(clusterTimecode, clusterCounter, clusterFrames) {
          return [{
            'data': clusterTimecode,
            'id': 0xe7 // Timecode

          }].concat(clusterFrames.map(function (webp) {
            var block = makeSimpleBlock({
              discardable: 0,
              frame: webp.data.slice(4),
              invisible: 0,
              keyframe: 1,
              lacing: 0,
              trackNum: 1,
              timecode: Math.round(clusterCounter)
            });
            clusterCounter += webp.duration;
            return {
              data: block,
              id: 0xa3
            };
          }));
        } // sums the lengths of all the frames and gets the duration


        function checkFrames(frames) {
          if (!frames[0]) {
            postMessage({
              error: 'Something went wrong. Maybe WebP format is not supported in the current browser.'
            });
            return;
          }

          var width = frames[0].width,
              height = frames[0].height,
              duration = frames[0].duration;

          for (var i = 1; i < frames.length; i++) {
            duration += frames[i].duration;
          }

          return {
            duration: duration,
            width: width,
            height: height
          };
        }

        function numToBuffer(num) {
          var parts = [];

          while (num > 0) {
            parts.push(num & 0xff);
            num = num >> 8;
          }

          return new Uint8Array(parts.reverse());
        }

        function strToBuffer(str) {
          return new Uint8Array(str.split('').map(function (e) {
            return e.charCodeAt(0);
          }));
        }

        function bitsToBuffer(bits) {
          var data = [];
          var pad = bits.length % 8 ? new Array(1 + 8 - bits.length % 8).join('0') : '';
          bits = pad + bits;

          for (var i = 0; i < bits.length; i += 8) {
            data.push(parseInt(bits.substr(i, 8), 2));
          }

          return new Uint8Array(data);
        }

        function generateEBML(json) {
          var ebml = [];

          for (var i = 0; i < json.length; i++) {
            var data = json[i].data;

            if (typeof data === 'object') {
              data = generateEBML(data);
            }

            if (typeof data === 'number') {
              data = bitsToBuffer(data.toString(2));
            }

            if (typeof data === 'string') {
              data = strToBuffer(data);
            }

            var len = data.size || data.byteLength || data.length;
            var zeroes = Math.ceil(Math.ceil(Math.log(len) / Math.log(2)) / 8);
            var sizeToString = len.toString(2);
            var padded = new Array(zeroes * 7 + 7 + 1 - sizeToString.length).join('0') + sizeToString;
            var size = new Array(zeroes).join('0') + '1' + padded;
            ebml.push(numToBuffer(json[i].id));
            ebml.push(bitsToBuffer(size));
            ebml.push(data);
          }

          return new Blob(ebml, {
            type: 'video/webm'
          });
        }

        function makeSimpleBlock(data) {
          var flags = 0;

          if (data.keyframe) {
            flags |= 128;
          }

          if (data.invisible) {
            flags |= 8;
          }

          if (data.lacing) {
            flags |= data.lacing << 1;
          }

          if (data.discardable) {
            flags |= 1;
          }

          if (data.trackNum > 127) {
            throw 'TrackNumber > 127 not supported';
          }

          var out = [data.trackNum | 0x80, data.timecode >> 8, data.timecode & 0xff, flags].map(function (e) {
            return String.fromCharCode(e);
          }).join('') + data.frame;
          return out;
        }

        function parseWebP(riff) {
          var VP8 = riff.RIFF[0].WEBP[0];
          var frameStart = VP8.indexOf('\x9d\x01\x2a'); // A VP8 keyframe starts with the 0x9d012a header

          for (var i = 0, c = []; i < 4; i++) {
            c[i] = VP8.charCodeAt(frameStart + 3 + i);
          }

          var width, height, tmp; //the code below is literally copied verbatim from the bitstream spec

          tmp = c[1] << 8 | c[0];
          width = tmp & 0x3FFF;
          tmp = c[3] << 8 | c[2];
          height = tmp & 0x3FFF;
          return {
            width: width,
            height: height,
            data: VP8,
            riff: riff
          };
        }

        function getStrLength(string, offset) {
          return parseInt(string.substr(offset + 4, 4).split('').map(function (i) {
            var unpadded = i.charCodeAt(0).toString(2);
            return new Array(8 - unpadded.length + 1).join('0') + unpadded;
          }).join(''), 2);
        }

        function parseRIFF(string) {
          var offset = 0;
          var chunks = {};

          while (offset < string.length) {
            var id = string.substr(offset, 4);
            var len = getStrLength(string, offset);
            var data = string.substr(offset + 4 + 4, len);
            offset += 4 + 4 + len;
            chunks[id] = chunks[id] || [];

            if (id === 'RIFF' || id === 'LIST') {
              chunks[id].push(parseRIFF(data));
            } else {
              chunks[id].push(data);
            }
          }

          return chunks;
        }

        function doubleToString(num) {
          return [].slice.call(new Uint8Array(new Float64Array([num]).buffer), 0).map(function (e) {
            return String.fromCharCode(e);
          }).reverse().join('');
        }

        var webm = new ArrayToWebM(frames.map(function (frame) {
          var webp = parseWebP(parseRIFF(atob(frame.image.slice(23))));
          webp.duration = frame.duration;
          return webp;
        }));
        postMessage(webm);
      }
      /**
       * Encodes frames in WebM container. It uses WebWorkinvoke to invoke 'ArrayToWebM' method.
       * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
       * @method
       * @memberof Whammy
       * @example
       * recorder = new Whammy().Video(0.8, 100);
       * recorder.compile(function(blob) {
       *    // blob.size - blob.type
       * });
       */


      WhammyVideo.prototype.compile = function (callback) {
        var webWorker = processInWebWorker(whammyInWebWorker);

        webWorker.onmessage = function (event) {
          if (event.data.error) {
            console.error(event.data.error);
            return;
          }

          callback(event.data);
        };

        webWorker.postMessage(this.frames);
      };

      return {
        /**
         * A more abstract-ish API.
         * @method
         * @memberof Whammy
         * @example
         * recorder = new Whammy().Video(0.8, 100);
         * @param {?number} speed - 0.8
         * @param {?number} quality - 100
         */
        Video: WhammyVideo
      };
    }();

    if (typeof RecordRTC !== 'undefined') {
      RecordRTC.Whammy = Whammy;
    } // ______________ (indexed-db)
    // DiskStorage.js

    /**
     * DiskStorage is a standalone object used by {@link RecordRTC} to store recorded blobs in IndexedDB storage.
     * @summary Writing blobs into IndexedDB.
     * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
     * @author {@link https://MuazKhan.com|Muaz Khan}
     * @example
     * DiskStorage.Store({
     *     audioBlob: yourAudioBlob,
     *     videoBlob: yourVideoBlob,
     *     gifBlob  : yourGifBlob
     * });
     * DiskStorage.Fetch(function(dataURL, type) {
     *     if(type === 'audioBlob') { }
     *     if(type === 'videoBlob') { }
     *     if(type === 'gifBlob')   { }
     * });
     * // DiskStorage.dataStoreName = 'recordRTC';
     * // DiskStorage.onError = function(error) { };
     * @property {function} init - This method must be called once to initialize IndexedDB ObjectStore. Though, it is auto-used internally.
     * @property {function} Fetch - This method fetches stored blobs from IndexedDB.
     * @property {function} Store - This method stores blobs in IndexedDB.
     * @property {function} onError - This function is invoked for any known/unknown error.
     * @property {string} dataStoreName - Name of the ObjectStore created in IndexedDB storage.
     * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
     */


    var DiskStorage = {
      /**
       * This method must be called once to initialize IndexedDB ObjectStore. Though, it is auto-used internally.
       * @method
       * @memberof DiskStorage
       * @internal
       * @example
       * DiskStorage.init();
       */
      init: function () {
        var self = this;

        if (typeof indexedDB === 'undefined' || typeof indexedDB.open === 'undefined') {
          console.error('IndexedDB API are not available in this browser.');
          return;
        }

        var dbVersion = 1;
        var dbName = this.dbName || location.href.replace(/\/|:|#|%|\.|\[|\]/g, ''),
            db;
        var request = indexedDB.open(dbName, dbVersion);

        function createObjectStore(dataBase) {
          dataBase.createObjectStore(self.dataStoreName);
        }

        function putInDB() {
          var transaction = db.transaction([self.dataStoreName], 'readwrite');

          if (self.videoBlob) {
            transaction.objectStore(self.dataStoreName).put(self.videoBlob, 'videoBlob');
          }

          if (self.gifBlob) {
            transaction.objectStore(self.dataStoreName).put(self.gifBlob, 'gifBlob');
          }

          if (self.audioBlob) {
            transaction.objectStore(self.dataStoreName).put(self.audioBlob, 'audioBlob');
          }

          function getFromStore(portionName) {
            transaction.objectStore(self.dataStoreName).get(portionName).onsuccess = function (event) {
              if (self.callback) {
                self.callback(event.target.result, portionName);
              }
            };
          }

          getFromStore('audioBlob');
          getFromStore('videoBlob');
          getFromStore('gifBlob');
        }

        request.onerror = self.onError;

        request.onsuccess = function () {
          db = request.result;
          db.onerror = self.onError;

          if (db.setVersion) {
            if (db.version !== dbVersion) {
              var setVersion = db.setVersion(dbVersion);

              setVersion.onsuccess = function () {
                createObjectStore(db);
                putInDB();
              };
            } else {
              putInDB();
            }
          } else {
            putInDB();
          }
        };

        request.onupgradeneeded = function (event) {
          createObjectStore(event.target.result);
        };
      },

      /**
       * This method fetches stored blobs from IndexedDB.
       * @method
       * @memberof DiskStorage
       * @internal
       * @example
       * DiskStorage.Fetch(function(dataURL, type) {
       *     if(type === 'audioBlob') { }
       *     if(type === 'videoBlob') { }
       *     if(type === 'gifBlob')   { }
       * });
       */
      Fetch: function (callback) {
        this.callback = callback;
        this.init();
        return this;
      },

      /**
       * This method stores blobs in IndexedDB.
       * @method
       * @memberof DiskStorage
       * @internal
       * @example
       * DiskStorage.Store({
       *     audioBlob: yourAudioBlob,
       *     videoBlob: yourVideoBlob,
       *     gifBlob  : yourGifBlob
       * });
       */
      Store: function (config) {
        this.audioBlob = config.audioBlob;
        this.videoBlob = config.videoBlob;
        this.gifBlob = config.gifBlob;
        this.init();
        return this;
      },

      /**
       * This function is invoked for any known/unknown error.
       * @method
       * @memberof DiskStorage
       * @internal
       * @example
       * DiskStorage.onError = function(error){
       *     alerot( JSON.stringify(error) );
       * };
       */
      onError: function (error) {
        console.error(JSON.stringify(error, null, '\t'));
      },

      /**
       * @property {string} dataStoreName - Name of the ObjectStore created in IndexedDB storage.
       * @memberof DiskStorage
       * @internal
       * @example
       * DiskStorage.dataStoreName = 'recordRTC';
       */
      dataStoreName: 'recordRTC',
      dbName: null
    };

    if (typeof RecordRTC !== 'undefined') {
      RecordRTC.DiskStorage = DiskStorage;
    } // ______________
    // GifRecorder.js

    /**
     * GifRecorder is standalone calss used by {@link RecordRTC} to record video or canvas into animated gif.
     * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
     * @author {@link https://MuazKhan.com|Muaz Khan}
     * @typedef GifRecorder
     * @class
     * @example
     * var recorder = new GifRecorder(mediaStream || canvas || context, { onGifPreview: function, onGifRecordingStarted: function, width: 1280, height: 720, frameRate: 200, quality: 10 });
     * recorder.record();
     * recorder.stop(function(blob) {
     *     img.src = URL.createObjectURL(blob);
     * });
     * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
     * @param {MediaStream} mediaStream - MediaStream object or HTMLCanvasElement or CanvasRenderingContext2D.
     * @param {object} config - {disableLogs:true, initCallback: function, width: 320, height: 240, frameRate: 200, quality: 10}
     */


    function GifRecorder(mediaStream, config) {
      if (typeof GIFEncoder === 'undefined') {
        var script = document.createElement('script');
        script.src = 'https://www.webrtc-experiment.com/gif-recorder.js';
        (document.body || document.documentElement).appendChild(script);
      }

      config = config || {};
      var isHTMLObject = mediaStream instanceof CanvasRenderingContext2D || mediaStream instanceof HTMLCanvasElement;
      /**
       * This method records MediaStream.
       * @method
       * @memberof GifRecorder
       * @example
       * recorder.record();
       */

      this.record = function () {
        if (typeof GIFEncoder === 'undefined') {
          setTimeout(self.record, 1000);
          return;
        }

        if (!isLoadedMetaData) {
          setTimeout(self.record, 1000);
          return;
        }

        if (!isHTMLObject) {
          if (!config.width) {
            config.width = video.offsetWidth || 320;
          }

          if (!config.height) {
            config.height = video.offsetHeight || 240;
          }

          if (!config.video) {
            config.video = {
              width: config.width,
              height: config.height
            };
          }

          if (!config.canvas) {
            config.canvas = {
              width: config.width,
              height: config.height
            };
          }

          canvas.width = config.canvas.width || 320;
          canvas.height = config.canvas.height || 240;
          video.width = config.video.width || 320;
          video.height = config.video.height || 240;
        } // external library to record as GIF images


        gifEncoder = new GIFEncoder(); // void setRepeat(int iter) 
        // Sets the number of times the set of GIF frames should be played. 
        // Default is 1; 0 means play indefinitely.

        gifEncoder.setRepeat(0); // void setFrameRate(Number fps) 
        // Sets frame rate in frames per second. 
        // Equivalent to setDelay(1000/fps).
        // Using "setDelay" instead of "setFrameRate"

        gifEncoder.setDelay(config.frameRate || 200); // void setQuality(int quality) 
        // Sets quality of color quantization (conversion of images to the 
        // maximum 256 colors allowed by the GIF specification). 
        // Lower values (minimum = 1) produce better colors, 
        // but slow processing significantly. 10 is the default, 
        // and produces good color mapping at reasonable speeds. 
        // Values greater than 20 do not yield significant improvements in speed.

        gifEncoder.setQuality(config.quality || 10); // Boolean start() 
        // This writes the GIF Header and returns false if it fails.

        gifEncoder.start();

        if (typeof config.onGifRecordingStarted === 'function') {
          config.onGifRecordingStarted();
        }

        function drawVideoFrame(time) {
          if (self.clearedRecordedData === true) {
            return;
          }

          if (isPausedRecording) {
            return setTimeout(function () {
              drawVideoFrame(time);
            }, 100);
          }

          lastAnimationFrame = requestAnimationFrame(drawVideoFrame);

          if (typeof lastFrameTime === undefined) {
            lastFrameTime = time;
          } // ~10 fps


          if (time - lastFrameTime < 90) {
            return;
          }

          if (!isHTMLObject && video.paused) {
            // via: https://github.com/muaz-khan/WebRTC-Experiment/pull/316
            // Tweak for Android Chrome
            video.play();
          }

          if (!isHTMLObject) {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
          }

          if (config.onGifPreview) {
            config.onGifPreview(canvas.toDataURL('image/png'));
          }

          gifEncoder.addFrame(context);
          lastFrameTime = time;
        }

        lastAnimationFrame = requestAnimationFrame(drawVideoFrame);

        if (config.initCallback) {
          config.initCallback();
        }
      };
      /**
       * This method stops recording MediaStream.
       * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
       * @method
       * @memberof GifRecorder
       * @example
       * recorder.stop(function(blob) {
       *     img.src = URL.createObjectURL(blob);
       * });
       */


      this.stop = function (callback) {
        callback = callback || function () {};

        if (lastAnimationFrame) {
          cancelAnimationFrame(lastAnimationFrame);
        }
        /**
         * @property {Blob} blob - The recorded blob object.
         * @memberof GifRecorder
         * @example
         * recorder.stop(function(){
         *     var blob = recorder.blob;
         * });
         */

        this.blob = new Blob([new Uint8Array(gifEncoder.stream().bin)], {
          type: 'image/gif'
        });
        callback(this.blob); // bug: find a way to clear old recorded blobs

        gifEncoder.stream().bin = [];
      };

      var isPausedRecording = false;
      /**
       * This method pauses the recording process.
       * @method
       * @memberof GifRecorder
       * @example
       * recorder.pause();
       */

      this.pause = function () {
        isPausedRecording = true;
      };
      /**
       * This method resumes the recording process.
       * @method
       * @memberof GifRecorder
       * @example
       * recorder.resume();
       */


      this.resume = function () {
        isPausedRecording = false;
      };
      /**
       * This method resets currently recorded data.
       * @method
       * @memberof GifRecorder
       * @example
       * recorder.clearRecordedData();
       */


      this.clearRecordedData = function () {
        self.clearedRecordedData = true;
        clearRecordedDataCB();
      };

      function clearRecordedDataCB() {
        if (gifEncoder) {
          gifEncoder.stream().bin = [];
        }
      } // for debugging


      this.name = 'GifRecorder';

      this.toString = function () {
        return this.name;
      };

      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');

      if (isHTMLObject) {
        if (mediaStream instanceof CanvasRenderingContext2D) {
          context = mediaStream;
          canvas = context.canvas;
        } else if (mediaStream instanceof HTMLCanvasElement) {
          context = mediaStream.getContext('2d');
          canvas = mediaStream;
        }
      }

      var isLoadedMetaData = true;

      if (!isHTMLObject) {
        var video = document.createElement('video');
        video.muted = true;
        video.autoplay = true;
        video.playsInline = true;
        isLoadedMetaData = false;

        video.onloadedmetadata = function () {
          isLoadedMetaData = true;
        };

        setSrcObject(mediaStream, video);
        video.play();
      }

      var lastAnimationFrame = null;
      var lastFrameTime;
      var gifEncoder;
      var self = this;
    }

    if (typeof RecordRTC !== 'undefined') {
      RecordRTC.GifRecorder = GifRecorder;
    } // Last time updated: 2019-06-21 4:09:42 AM UTC
    // ________________________
    // MultiStreamsMixer v1.2.2
    // Open-Sourced: https://github.com/muaz-khan/MultiStreamsMixer
    // --------------------------------------------------
    // Muaz Khan     - www.MuazKhan.com
    // MIT License   - www.WebRTC-Experiment.com/licence
    // --------------------------------------------------


    function MultiStreamsMixer(arrayOfMediaStreams, elementClass) {
      var browserFakeUserAgent = 'Fake/5.0 (FakeOS) AppleWebKit/123 (KHTML, like Gecko) Fake/12.3.4567.89 Fake/123.45';

      (function (that) {
        if (typeof RecordRTC !== 'undefined') {
          return;
        }

        if (!that) {
          return;
        }

        if (typeof window !== 'undefined') {
          return;
        }

        if (typeof commonjsGlobal === 'undefined') {
          return;
        }

        commonjsGlobal.navigator = {
          userAgent: browserFakeUserAgent,
          getUserMedia: function () {}
        };

        if (!commonjsGlobal.console) {
          commonjsGlobal.console = {};
        }

        if (typeof commonjsGlobal.console.log === 'undefined' || typeof commonjsGlobal.console.error === 'undefined') {
          commonjsGlobal.console.error = commonjsGlobal.console.log = commonjsGlobal.console.log || function () {
            console.log(arguments);
          };
        }

        if (typeof document === 'undefined') {
          /*global document:true */
          that.document = {
            documentElement: {
              appendChild: function () {
                return '';
              }
            }
          };

          document.createElement = document.captureStream = document.mozCaptureStream = function () {
            var obj = {
              getContext: function () {
                return obj;
              },
              play: function () {},
              pause: function () {},
              drawImage: function () {},
              toDataURL: function () {
                return '';
              },
              style: {}
            };
            return obj;
          };

          that.HTMLVideoElement = function () {};
        }

        if (typeof location === 'undefined') {
          /*global location:true */
          that.location = {
            protocol: 'file:',
            href: '',
            hash: ''
          };
        }

        if (typeof screen === 'undefined') {
          /*global screen:true */
          that.screen = {
            width: 0,
            height: 0
          };
        }

        if (typeof URL === 'undefined') {
          /*global screen:true */
          that.URL = {
            createObjectURL: function () {
              return '';
            },
            revokeObjectURL: function () {
              return '';
            }
          };
        }
        /*global window:true */


        that.window = commonjsGlobal;
      })(typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : null); // requires: chrome://flags/#enable-experimental-web-platform-features


      elementClass = elementClass || 'multi-streams-mixer';
      var videos = [];
      var isStopDrawingFrames = false;
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      canvas.style.opacity = 0;
      canvas.style.position = 'absolute';
      canvas.style.zIndex = -1;
      canvas.style.top = '-1000em';
      canvas.style.left = '-1000em';
      canvas.className = elementClass;
      (document.body || document.documentElement).appendChild(canvas);
      this.disableLogs = false;
      this.frameInterval = 10;
      this.width = 360;
      this.height = 240; // use gain node to prevent echo

      this.useGainNode = true;
      var self = this; // _____________________________
      // Cross-Browser-Declarations.js
      // WebAudio API representer

      var AudioContext = window.AudioContext;

      if (typeof AudioContext === 'undefined') {
        if (typeof webkitAudioContext !== 'undefined') {
          /*global AudioContext:true */
          AudioContext = webkitAudioContext;
        }

        if (typeof mozAudioContext !== 'undefined') {
          /*global AudioContext:true */
          AudioContext = mozAudioContext;
        }
      }
      /*jshint -W079 */


      var URL = window.URL;

      if (typeof URL === 'undefined' && typeof webkitURL !== 'undefined') {
        /*global URL:true */
        URL = webkitURL;
      }

      if (typeof navigator !== 'undefined' && typeof navigator.getUserMedia === 'undefined') {
        // maybe window.navigator?
        if (typeof navigator.webkitGetUserMedia !== 'undefined') {
          navigator.getUserMedia = navigator.webkitGetUserMedia;
        }

        if (typeof navigator.mozGetUserMedia !== 'undefined') {
          navigator.getUserMedia = navigator.mozGetUserMedia;
        }
      }

      var MediaStream = window.MediaStream;

      if (typeof MediaStream === 'undefined' && typeof webkitMediaStream !== 'undefined') {
        MediaStream = webkitMediaStream;
      }
      /*global MediaStream:true */


      if (typeof MediaStream !== 'undefined') {
        // override "stop" method for all browsers
        if (typeof MediaStream.prototype.stop === 'undefined') {
          MediaStream.prototype.stop = function () {
            this.getTracks().forEach(function (track) {
              track.stop();
            });
          };
        }
      }

      var Storage = {};

      if (typeof AudioContext !== 'undefined') {
        Storage.AudioContext = AudioContext;
      } else if (typeof webkitAudioContext !== 'undefined') {
        Storage.AudioContext = webkitAudioContext;
      }

      function setSrcObject(stream, element) {
        if ('srcObject' in element) {
          element.srcObject = stream;
        } else if ('mozSrcObject' in element) {
          element.mozSrcObject = stream;
        } else {
          element.srcObject = stream;
        }
      }

      this.startDrawingFrames = function () {
        drawVideosToCanvas();
      };

      function drawVideosToCanvas() {
        if (isStopDrawingFrames) {
          return;
        }

        var videosLength = videos.length;
        var fullcanvas = false;
        var remaining = [];
        videos.forEach(function (video) {
          if (!video.stream) {
            video.stream = {};
          }

          if (video.stream.fullcanvas) {
            fullcanvas = video;
          } else {
            // todo: video.stream.active or video.stream.live to fix blank frames issues?
            remaining.push(video);
          }
        });

        if (fullcanvas) {
          canvas.width = fullcanvas.stream.width;
          canvas.height = fullcanvas.stream.height;
        } else if (remaining.length) {
          canvas.width = videosLength > 1 ? remaining[0].width * 2 : remaining[0].width;
          var height = 1;

          if (videosLength === 3 || videosLength === 4) {
            height = 2;
          }

          if (videosLength === 5 || videosLength === 6) {
            height = 3;
          }

          if (videosLength === 7 || videosLength === 8) {
            height = 4;
          }

          if (videosLength === 9 || videosLength === 10) {
            height = 5;
          }

          canvas.height = remaining[0].height * height;
        } else {
          canvas.width = self.width || 360;
          canvas.height = self.height || 240;
        }

        if (fullcanvas && fullcanvas instanceof HTMLVideoElement) {
          drawImage(fullcanvas);
        }

        remaining.forEach(function (video, idx) {
          drawImage(video, idx);
        });
        setTimeout(drawVideosToCanvas, self.frameInterval);
      }

      function drawImage(video, idx) {
        if (isStopDrawingFrames) {
          return;
        }

        var x = 0;
        var y = 0;
        var width = video.width;
        var height = video.height;

        if (idx === 1) {
          x = video.width;
        }

        if (idx === 2) {
          y = video.height;
        }

        if (idx === 3) {
          x = video.width;
          y = video.height;
        }

        if (idx === 4) {
          y = video.height * 2;
        }

        if (idx === 5) {
          x = video.width;
          y = video.height * 2;
        }

        if (idx === 6) {
          y = video.height * 3;
        }

        if (idx === 7) {
          x = video.width;
          y = video.height * 3;
        }

        if (typeof video.stream.left !== 'undefined') {
          x = video.stream.left;
        }

        if (typeof video.stream.top !== 'undefined') {
          y = video.stream.top;
        }

        if (typeof video.stream.width !== 'undefined') {
          width = video.stream.width;
        }

        if (typeof video.stream.height !== 'undefined') {
          height = video.stream.height;
        }

        context.drawImage(video, x, y, width, height);

        if (typeof video.stream.onRender === 'function') {
          video.stream.onRender(context, x, y, width, height, idx);
        }
      }

      function getMixedStream() {
        isStopDrawingFrames = false;
        var mixedVideoStream = getMixedVideoStream();
        var mixedAudioStream = getMixedAudioStream();

        if (mixedAudioStream) {
          mixedAudioStream.getTracks().filter(function (t) {
            return t.kind === 'audio';
          }).forEach(function (track) {
            mixedVideoStream.addTrack(track);
          });
        }
        arrayOfMediaStreams.forEach(function (stream) {
          if (stream.fullcanvas) ;
        }); // mixedVideoStream.prototype.appendStreams = appendStreams;
        // mixedVideoStream.prototype.resetVideoStreams = resetVideoStreams;
        // mixedVideoStream.prototype.clearRecordedData = clearRecordedData;

        return mixedVideoStream;
      }

      function getMixedVideoStream() {
        resetVideoStreams();
        var capturedStream;

        if ('captureStream' in canvas) {
          capturedStream = canvas.captureStream();
        } else if ('mozCaptureStream' in canvas) {
          capturedStream = canvas.mozCaptureStream();
        } else if (!self.disableLogs) {
          console.error('Upgrade to latest Chrome or otherwise enable this flag: chrome://flags/#enable-experimental-web-platform-features');
        }

        var videoStream = new MediaStream();
        capturedStream.getTracks().filter(function (t) {
          return t.kind === 'video';
        }).forEach(function (track) {
          videoStream.addTrack(track);
        });
        canvas.stream = videoStream;
        return videoStream;
      }

      function getMixedAudioStream() {
        // via: @pehrsons
        if (!Storage.AudioContextConstructor) {
          Storage.AudioContextConstructor = new Storage.AudioContext();
        }

        self.audioContext = Storage.AudioContextConstructor;
        self.audioSources = [];

        if (self.useGainNode === true) {
          self.gainNode = self.audioContext.createGain();
          self.gainNode.connect(self.audioContext.destination);
          self.gainNode.gain.value = 0; // don't hear self
        }

        var audioTracksLength = 0;
        arrayOfMediaStreams.forEach(function (stream) {
          if (!stream.getTracks().filter(function (t) {
            return t.kind === 'audio';
          }).length) {
            return;
          }

          audioTracksLength++;
          var audioSource = self.audioContext.createMediaStreamSource(stream);

          if (self.useGainNode === true) {
            audioSource.connect(self.gainNode);
          }

          self.audioSources.push(audioSource);
        });

        if (!audioTracksLength) {
          // because "self.audioContext" is not initialized
          // that's why we've to ignore rest of the code
          return;
        }

        self.audioDestination = self.audioContext.createMediaStreamDestination();
        self.audioSources.forEach(function (audioSource) {
          audioSource.connect(self.audioDestination);
        });
        return self.audioDestination.stream;
      }

      function getVideo(stream) {
        var video = document.createElement('video');
        setSrcObject(stream, video);
        video.className = elementClass;
        video.muted = true;
        video.volume = 0;
        video.width = stream.width || self.width || 360;
        video.height = stream.height || self.height || 240;
        video.play();
        return video;
      }

      this.appendStreams = function (streams) {
        if (!streams) {
          throw 'First parameter is required.';
        }

        if (!(streams instanceof Array)) {
          streams = [streams];
        }

        streams.forEach(function (stream) {
          var newStream = new MediaStream();

          if (stream.getTracks().filter(function (t) {
            return t.kind === 'video';
          }).length) {
            var video = getVideo(stream);
            video.stream = stream;
            videos.push(video);
            newStream.addTrack(stream.getTracks().filter(function (t) {
              return t.kind === 'video';
            })[0]);
          }

          if (stream.getTracks().filter(function (t) {
            return t.kind === 'audio';
          }).length) {
            var audioSource = self.audioContext.createMediaStreamSource(stream);
            self.audioDestination = self.audioContext.createMediaStreamDestination();
            audioSource.connect(self.audioDestination);
            newStream.addTrack(self.audioDestination.stream.getTracks().filter(function (t) {
              return t.kind === 'audio';
            })[0]);
          }

          arrayOfMediaStreams.push(newStream);
        });
      };

      this.releaseStreams = function () {
        videos = [];
        isStopDrawingFrames = true;

        if (self.gainNode) {
          self.gainNode.disconnect();
          self.gainNode = null;
        }

        if (self.audioSources.length) {
          self.audioSources.forEach(function (source) {
            source.disconnect();
          });
          self.audioSources = [];
        }

        if (self.audioDestination) {
          self.audioDestination.disconnect();
          self.audioDestination = null;
        }

        if (self.audioContext) {
          self.audioContext.close();
        }

        self.audioContext = null;
        context.clearRect(0, 0, canvas.width, canvas.height);

        if (canvas.stream) {
          canvas.stream.stop();
          canvas.stream = null;
        }
      };

      this.resetVideoStreams = function (streams) {
        if (streams && !(streams instanceof Array)) {
          streams = [streams];
        }

        resetVideoStreams(streams);
      };

      function resetVideoStreams(streams) {
        videos = [];
        streams = streams || arrayOfMediaStreams; // via: @adrian-ber

        streams.forEach(function (stream) {
          if (!stream.getTracks().filter(function (t) {
            return t.kind === 'video';
          }).length) {
            return;
          }

          var video = getVideo(stream);
          video.stream = stream;
          videos.push(video);
        });
      } // for debugging


      this.name = 'MultiStreamsMixer';

      this.toString = function () {
        return this.name;
      };

      this.getMixedStream = getMixedStream;
    }

    if (typeof RecordRTC === 'undefined') {
      {
        module.exports = MultiStreamsMixer;
      }
    } // ______________________
    // MultiStreamRecorder.js

    /*
     * Video conference recording, using captureStream API along with WebAudio and Canvas2D API.
     */

    /**
     * MultiStreamRecorder can record multiple videos in single container.
     * @summary Multi-videos recorder.
     * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
     * @author {@link https://MuazKhan.com|Muaz Khan}
     * @typedef MultiStreamRecorder
     * @class
     * @example
     * var options = {
     *     mimeType: 'video/webm'
     * }
     * var recorder = new MultiStreamRecorder(ArrayOfMediaStreams, options);
     * recorder.record();
     * recorder.stop(function(blob) {
     *     video.src = URL.createObjectURL(blob);
     *
     *     // or
     *     var blob = recorder.blob;
     * });
     * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
     * @param {MediaStreams} mediaStreams - Array of MediaStreams.
     * @param {object} config - {disableLogs:true, frameInterval: 1, mimeType: "video/webm"}
     */


    function MultiStreamRecorder(arrayOfMediaStreams, options) {
      arrayOfMediaStreams = arrayOfMediaStreams || [];
      var self = this;
      var mixer;
      var mediaRecorder;
      options = options || {
        elementClass: 'multi-streams-mixer',
        mimeType: 'video/webm',
        video: {
          width: 360,
          height: 240
        }
      };

      if (!options.frameInterval) {
        options.frameInterval = 10;
      }

      if (!options.video) {
        options.video = {};
      }

      if (!options.video.width) {
        options.video.width = 360;
      }

      if (!options.video.height) {
        options.video.height = 240;
      }
      /**
       * This method records all MediaStreams.
       * @method
       * @memberof MultiStreamRecorder
       * @example
       * recorder.record();
       */


      this.record = function () {
        // github/muaz-khan/MultiStreamsMixer
        mixer = new MultiStreamsMixer(arrayOfMediaStreams, options.elementClass || 'multi-streams-mixer');

        if (getAllVideoTracks().length) {
          mixer.frameInterval = options.frameInterval || 10;
          mixer.width = options.video.width || 360;
          mixer.height = options.video.height || 240;
          mixer.startDrawingFrames();
        }

        if (options.previewStream && typeof options.previewStream === 'function') {
          options.previewStream(mixer.getMixedStream());
        } // record using MediaRecorder API


        mediaRecorder = new MediaStreamRecorder(mixer.getMixedStream(), options);
        mediaRecorder.record();
      };

      function getAllVideoTracks() {
        var tracks = [];
        arrayOfMediaStreams.forEach(function (stream) {
          getTracks(stream, 'video').forEach(function (track) {
            tracks.push(track);
          });
        });
        return tracks;
      }
      /**
       * This method stops recording MediaStream.
       * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
       * @method
       * @memberof MultiStreamRecorder
       * @example
       * recorder.stop(function(blob) {
       *     video.src = URL.createObjectURL(blob);
       * });
       */


      this.stop = function (callback) {
        if (!mediaRecorder) {
          return;
        }

        mediaRecorder.stop(function (blob) {
          self.blob = blob;
          callback(blob);
          self.clearRecordedData();
        });
      };
      /**
       * This method pauses the recording process.
       * @method
       * @memberof MultiStreamRecorder
       * @example
       * recorder.pause();
       */


      this.pause = function () {
        if (mediaRecorder) {
          mediaRecorder.pause();
        }
      };
      /**
       * This method resumes the recording process.
       * @method
       * @memberof MultiStreamRecorder
       * @example
       * recorder.resume();
       */


      this.resume = function () {
        if (mediaRecorder) {
          mediaRecorder.resume();
        }
      };
      /**
       * This method resets currently recorded data.
       * @method
       * @memberof MultiStreamRecorder
       * @example
       * recorder.clearRecordedData();
       */


      this.clearRecordedData = function () {
        if (mediaRecorder) {
          mediaRecorder.clearRecordedData();
          mediaRecorder = null;
        }

        if (mixer) {
          mixer.releaseStreams();
          mixer = null;
        }
      };
      /**
       * Add extra media-streams to existing recordings.
       * @method
       * @memberof MultiStreamRecorder
       * @param {MediaStreams} mediaStreams - Array of MediaStreams
       * @example
       * recorder.addStreams([newAudioStream, newVideoStream]);
       */


      this.addStreams = function (streams) {
        if (!streams) {
          throw 'First parameter is required.';
        }

        if (!(streams instanceof Array)) {
          streams = [streams];
        }

        arrayOfMediaStreams.concat(streams);

        if (!mediaRecorder || !mixer) {
          return;
        }

        mixer.appendStreams(streams);

        if (options.previewStream && typeof options.previewStream === 'function') {
          options.previewStream(mixer.getMixedStream());
        }
      };
      /**
       * Reset videos during live recording. Replace old videos e.g. replace cameras with full-screen.
       * @method
       * @memberof MultiStreamRecorder
       * @param {MediaStreams} mediaStreams - Array of MediaStreams
       * @example
       * recorder.resetVideoStreams([newVideo1, newVideo2]);
       */


      this.resetVideoStreams = function (streams) {
        if (!mixer) {
          return;
        }

        if (streams && !(streams instanceof Array)) {
          streams = [streams];
        }

        mixer.resetVideoStreams(streams);
      };
      /**
       * Returns MultiStreamsMixer
       * @method
       * @memberof MultiStreamRecorder
       * @example
       * let mixer = recorder.getMixer();
       * mixer.appendStreams([newStream]);
       */


      this.getMixer = function () {
        return mixer;
      }; // for debugging


      this.name = 'MultiStreamRecorder';

      this.toString = function () {
        return this.name;
      };
    }

    if (typeof RecordRTC !== 'undefined') {
      RecordRTC.MultiStreamRecorder = MultiStreamRecorder;
    } // _____________________
    // RecordRTC.promises.js

    /**
     * RecordRTCPromisesHandler adds promises support in {@link RecordRTC}. Try a {@link https://github.com/muaz-khan/RecordRTC/blob/master/simple-demos/RecordRTCPromisesHandler.html|demo here}
     * @summary Promises for {@link RecordRTC}
     * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
     * @author {@link https://MuazKhan.com|Muaz Khan}
     * @typedef RecordRTCPromisesHandler
     * @class
     * @example
     * var recorder = new RecordRTCPromisesHandler(mediaStream, options);
     * recorder.startRecording()
     *         .then(successCB)
     *         .catch(errorCB);
     * // Note: You can access all RecordRTC API using "recorder.recordRTC" e.g. 
     * recorder.recordRTC.onStateChanged = function(state) {};
     * recorder.recordRTC.setRecordingDuration(5000);
     * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
     * @param {MediaStream} mediaStream - Single media-stream object, array of media-streams, html-canvas-element, etc.
     * @param {object} config - {type:"video", recorderType: MediaStreamRecorder, disableLogs: true, numberOfAudioChannels: 1, bufferSize: 0, sampleRate: 0, video: HTMLVideoElement, etc.}
     * @throws Will throw an error if "new" keyword is not used to initiate "RecordRTCPromisesHandler". Also throws error if first argument "MediaStream" is missing.
     * @requires {@link RecordRTC}
     */


    function RecordRTCPromisesHandler(mediaStream, options) {
      if (!this) {
        throw 'Use "new RecordRTCPromisesHandler()"';
      }

      if (typeof mediaStream === 'undefined') {
        throw 'First argument "MediaStream" is required.';
      }

      var self = this;
      /**
       * @property {Blob} blob - Access/reach the native {@link RecordRTC} object.
       * @memberof RecordRTCPromisesHandler
       * @example
       * let internal = recorder.recordRTC.getInternalRecorder();
       * alert(internal instanceof MediaStreamRecorder);
       * recorder.recordRTC.onStateChanged = function(state) {};
       */

      self.recordRTC = new RecordRTC(mediaStream, options);
      /**
       * This method records MediaStream.
       * @method
       * @memberof RecordRTCPromisesHandler
       * @example
       * recorder.startRecording()
       *         .then(successCB)
       *         .catch(errorCB);
       */

      this.startRecording = function () {
        return new Promise(function (resolve, reject) {
          try {
            self.recordRTC.startRecording();
            resolve();
          } catch (e) {
            reject(e);
          }
        });
      };
      /**
       * This method stops the recording.
       * @method
       * @memberof RecordRTCPromisesHandler
       * @example
       * recorder.stopRecording().then(function() {
       *     var blob = recorder.getBlob();
       * }).catch(errorCB);
       */


      this.stopRecording = function () {
        return new Promise(function (resolve, reject) {
          try {
            self.recordRTC.stopRecording(function (url) {
              self.blob = self.recordRTC.getBlob();

              if (!self.blob || !self.blob.size) {
                reject('Empty blob.', self.blob);
                return;
              }

              resolve(url);
            });
          } catch (e) {
            reject(e);
          }
        });
      };
      /**
       * This method pauses the recording. You can resume recording using "resumeRecording" method.
       * @method
       * @memberof RecordRTCPromisesHandler
       * @example
       * recorder.pauseRecording()
       *         .then(successCB)
       *         .catch(errorCB);
       */


      this.pauseRecording = function () {
        return new Promise(function (resolve, reject) {
          try {
            self.recordRTC.pauseRecording();
            resolve();
          } catch (e) {
            reject(e);
          }
        });
      };
      /**
       * This method resumes the recording.
       * @method
       * @memberof RecordRTCPromisesHandler
       * @example
       * recorder.resumeRecording()
       *         .then(successCB)
       *         .catch(errorCB);
       */


      this.resumeRecording = function () {
        return new Promise(function (resolve, reject) {
          try {
            self.recordRTC.resumeRecording();
            resolve();
          } catch (e) {
            reject(e);
          }
        });
      };
      /**
       * This method returns data-url for the recorded blob.
       * @method
       * @memberof RecordRTCPromisesHandler
       * @example
       * recorder.stopRecording().then(function() {
       *     recorder.getDataURL().then(function(dataURL) {
       *         window.open(dataURL);
       *     }).catch(errorCB);;
       * }).catch(errorCB);
       */


      this.getDataURL = function (callback) {
        return new Promise(function (resolve, reject) {
          try {
            self.recordRTC.getDataURL(function (dataURL) {
              resolve(dataURL);
            });
          } catch (e) {
            reject(e);
          }
        });
      };
      /**
       * This method returns the recorded blob.
       * @method
       * @memberof RecordRTCPromisesHandler
       * @example
       * recorder.stopRecording().then(function() {
       *     recorder.getBlob().then(function(blob) {})
       * }).catch(errorCB);
       */


      this.getBlob = function () {
        return new Promise(function (resolve, reject) {
          try {
            resolve(self.recordRTC.getBlob());
          } catch (e) {
            reject(e);
          }
        });
      };
      /**
       * This method returns the internal recording object.
       * @method
       * @memberof RecordRTCPromisesHandler
       * @example
       * let internalRecorder = await recorder.getInternalRecorder();
       * if(internalRecorder instanceof MultiStreamRecorder) {
       *     internalRecorder.addStreams([newAudioStream]);
       *     internalRecorder.resetVideoStreams([screenStream]);
       * }
       * @returns {Object} 
       */


      this.getInternalRecorder = function () {
        return new Promise(function (resolve, reject) {
          try {
            resolve(self.recordRTC.getInternalRecorder());
          } catch (e) {
            reject(e);
          }
        });
      };
      /**
       * This method resets the recorder. So that you can reuse single recorder instance many times.
       * @method
       * @memberof RecordRTCPromisesHandler
       * @example
       * await recorder.reset();
       * recorder.startRecording(); // record again
       */


      this.reset = function () {
        return new Promise(function (resolve, reject) {
          try {
            resolve(self.recordRTC.reset());
          } catch (e) {
            reject(e);
          }
        });
      };
      /**
       * Destroy RecordRTC instance. Clear all recorders and objects.
       * @method
       * @memberof RecordRTCPromisesHandler
       * @example
       * recorder.destroy().then(successCB).catch(errorCB);
       */


      this.destroy = function () {
        return new Promise(function (resolve, reject) {
          try {
            resolve(self.recordRTC.destroy());
          } catch (e) {
            reject(e);
          }
        });
      };
      /**
       * Get recorder's readonly state.
       * @method
       * @memberof RecordRTCPromisesHandler
       * @example
       * let state = await recorder.getState();
       * // or
       * recorder.getState().then(state => { console.log(state); })
       * @returns {String} Returns recording state.
       */


      this.getState = function () {
        return new Promise(function (resolve, reject) {
          try {
            resolve(self.recordRTC.getState());
          } catch (e) {
            reject(e);
          }
        });
      };
      /**
       * @property {Blob} blob - Recorded data as "Blob" object.
       * @memberof RecordRTCPromisesHandler
       * @example
       * await recorder.stopRecording();
       * let blob = recorder.getBlob(); // or "recorder.recordRTC.blob"
       * invokeSaveAsDialog(blob);
       */


      this.blob = null;
      /**
       * RecordRTC version number
       * @property {String} version - Release version number.
       * @memberof RecordRTCPromisesHandler
       * @static
       * @readonly
       * @example
       * alert(recorder.version);
       */

      this.version = '5.6.2';
    }

    if (typeof RecordRTC !== 'undefined') {
      RecordRTC.RecordRTCPromisesHandler = RecordRTCPromisesHandler;
    } // ______________________
    // WebAssemblyRecorder.js

    /**
     * WebAssemblyRecorder lets you create webm videos in JavaScript via WebAssembly. The library consumes raw RGBA32 buffers (4 bytes per pixel) and turns them into a webm video with the given framerate and quality. This makes it compatible out-of-the-box with ImageData from a CANVAS. With realtime mode you can also use webm-wasm for streaming webm videos.
     * @summary Video recording feature in Chrome, Firefox and maybe Edge.
     * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
     * @author {@link https://MuazKhan.com|Muaz Khan}
     * @typedef WebAssemblyRecorder
     * @class
     * @example
     * var recorder = new WebAssemblyRecorder(mediaStream);
     * recorder.record();
     * recorder.stop(function(blob) {
     *     video.src = URL.createObjectURL(blob);
     * });
     * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
     * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
     * @param {object} config - {webAssemblyPath:'webm-wasm.wasm',workerPath: 'webm-worker.js', frameRate: 30, width: 1920, height: 1080, bitrate: 1024, realtime: true}
     */


    function WebAssemblyRecorder(stream, config) {
      // based on: github.com/GoogleChromeLabs/webm-wasm
      if (typeof ReadableStream === 'undefined' || typeof WritableStream === 'undefined') {
        // because it fixes readable/writable streams issues
        console.error('Following polyfill is strongly recommended: https://unpkg.com/@mattiasbuelens/web-streams-polyfill/dist/polyfill.min.js');
      }

      config = config || {};
      config.width = config.width || 640;
      config.height = config.height || 480;
      config.frameRate = config.frameRate || 30;
      config.bitrate = config.bitrate || 1200;
      config.realtime = config.realtime || true;

      var finished;

      function cameraStream() {
        return new ReadableStream({
          start: function (controller) {
            var cvs = document.createElement('canvas');
            var video = document.createElement('video');
            var first = true;
            video.srcObject = stream;
            video.muted = true;
            video.height = config.height;
            video.width = config.width;
            video.volume = 0;

            video.onplaying = function () {
              cvs.width = config.width;
              cvs.height = config.height;
              var ctx = cvs.getContext('2d');
              var frameTimeout = 1000 / config.frameRate;
              var cameraTimer = setInterval(function f() {
                if (finished) {
                  clearInterval(cameraTimer);
                  controller.close();
                }

                if (first) {
                  first = false;

                  if (config.onVideoProcessStarted) {
                    config.onVideoProcessStarted();
                  }
                }

                ctx.drawImage(video, 0, 0);

                if (controller._controlledReadableStream.state !== 'closed') {
                  try {
                    controller.enqueue(ctx.getImageData(0, 0, config.width, config.height));
                  } catch (e) {}
                }
              }, frameTimeout);
            };

            video.play();
          }
        });
      }

      var worker;

      function startRecording(stream, buffer) {
        if (!config.workerPath && !buffer) {
          finished = false; // is it safe to use @latest ?

          fetch('https://unpkg.com/webm-wasm@latest/dist/webm-worker.js').then(function (r) {
            r.arrayBuffer().then(function (buffer) {
              startRecording(stream, buffer);
            });
          });
          return;
        }

        if (!config.workerPath && buffer instanceof ArrayBuffer) {
          var blob = new Blob([buffer], {
            type: 'text/javascript'
          });
          config.workerPath = URL.createObjectURL(blob);
        }

        if (!config.workerPath) {
          console.error('workerPath parameter is missing.');
        }

        worker = new Worker(config.workerPath);
        worker.postMessage(config.webAssemblyPath || 'https://unpkg.com/webm-wasm@latest/dist/webm-wasm.wasm');
        worker.addEventListener('message', function (event) {
          if (event.data === 'READY') {
            worker.postMessage({
              width: config.width,
              height: config.height,
              bitrate: config.bitrate || 1200,
              timebaseDen: config.frameRate || 30,
              realtime: config.realtime
            });
            cameraStream().pipeTo(new WritableStream({
              write: function (image) {
                if (finished) {
                  console.error('Got image, but recorder is finished!');
                  return;
                }

                worker.postMessage(image.data.buffer, [image.data.buffer]);
              }
            }));
          } else if (!!event.data) {
            if (!isPaused) {
              arrayOfBuffers.push(event.data);
            }
          }
        });
      }
      /**
       * This method records video.
       * @method
       * @memberof WebAssemblyRecorder
       * @example
       * recorder.record();
       */


      this.record = function () {
        arrayOfBuffers = [];
        isPaused = false;
        this.blob = null;
        startRecording(stream);

        if (typeof config.initCallback === 'function') {
          config.initCallback();
        }
      };

      var isPaused;
      /**
       * This method pauses the recording process.
       * @method
       * @memberof WebAssemblyRecorder
       * @example
       * recorder.pause();
       */

      this.pause = function () {
        isPaused = true;
      };
      /**
       * This method resumes the recording process.
       * @method
       * @memberof WebAssemblyRecorder
       * @example
       * recorder.resume();
       */


      this.resume = function () {
        isPaused = false;
      };

      function terminate(callback) {
        if (!worker) {
          if (callback) {
            callback();
          }

          return;
        } // Wait for null event data to indicate that the encoding is complete


        worker.addEventListener('message', function (event) {
          if (event.data === null) {
            worker.terminate();
            worker = null;

            if (callback) {
              callback();
            }
          }
        });
        worker.postMessage(null);
      }

      var arrayOfBuffers = [];
      /**
       * This method stops recording video.
       * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
       * @method
       * @memberof WebAssemblyRecorder
       * @example
       * recorder.stop(function(blob) {
       *     video.src = URL.createObjectURL(blob);
       * });
       */

      this.stop = function (callback) {
        finished = true;
        var recorder = this;
        terminate(function () {
          recorder.blob = new Blob(arrayOfBuffers, {
            type: 'video/webm'
          });
          callback(recorder.blob);
        });
      }; // for debugging


      this.name = 'WebAssemblyRecorder';

      this.toString = function () {
        return this.name;
      };
      /**
       * This method resets currently recorded data.
       * @method
       * @memberof WebAssemblyRecorder
       * @example
       * recorder.clearRecordedData();
       */


      this.clearRecordedData = function () {
        arrayOfBuffers = [];
        isPaused = false;
        this.blob = null; // todo: if recording-ON then STOP it first
      };
      /**
       * @property {Blob} blob - The recorded blob object.
       * @memberof WebAssemblyRecorder
       * @example
       * recorder.stop(function(){
       *     var blob = recorder.blob;
       * });
       */


      this.blob = null;
    }

    if (typeof RecordRTC !== 'undefined') {
      RecordRTC.WebAssemblyRecorder = WebAssemblyRecorder;
    }
  });

  var lib = createCommonjsModule(function (module, exports) {
    (function (global, factory) {
      module.exports = factory(screenfull, lib$1, RecordRTC_1) ;
    })(commonjsGlobal, function (screenfull, Icons, RecordRTC) {

      function _interopDefaultLegacy(e) {
        return e && typeof e === 'object' && 'default' in e ? e : {
          'default': e
        };
      }

      function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);

        if (e) {
          Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
              var d = Object.getOwnPropertyDescriptor(e, k);
              Object.defineProperty(n, k, d.get ? d : {
                enumerable: true,
                get: function () {
                  return e[k];
                }
              });
            }
          });
        }

        n["default"] = e;
        return Object.freeze(n);
      }

      var screenfull__default = /*#__PURE__*/_interopDefaultLegacy(screenfull);

      var Icons__namespace = /*#__PURE__*/_interopNamespace(Icons);

      var RecordRTC__default = /*#__PURE__*/_interopDefaultLegacy(RecordRTC);
      /*! *****************************************************************************
      Copyright (c) Microsoft Corporation.
        Permission to use, copy, modify, and/or distribute this software for any
      purpose with or without fee is hereby granted.
        THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
      REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
      AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
      INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
      LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
      OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
      PERFORMANCE OF THIS SOFTWARE.
      ***************************************************************************** */

      /* global Reflect, Promise */


      var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function (d, b) {
          d.__proto__ = b;
        } || function (d, b) {
          for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };

        return extendStatics(d, b);
      };

      function __extends(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      }

      var __assign = function () {
        __assign = Object.assign || function __assign(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];

            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }

          return t;
        };

        return __assign.apply(this, arguments);
      };

      function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
          });
        }

        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }

          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }

          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }

          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      }

      function __generator(thisArg, body) {
        var _ = {
          label: 0,
          sent: function () {
            if (t[0] & 1) throw t[1];
            return t[1];
          },
          trys: [],
          ops: []
        },
            f,
            y,
            t,
            g;
        return g = {
          next: verb(0),
          "throw": verb(1),
          "return": verb(2)
        }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
          return this;
        }), g;

        function verb(n) {
          return function (v) {
            return step([n, v]);
          };
        }

        function step(op) {
          if (f) throw new TypeError("Generator is already executing.");

          while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];

            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;

              case 4:
                _.label++;
                return {
                  value: op[1],
                  done: false
                };

              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;

              case 7:
                op = _.ops.pop();

                _.trys.pop();

                continue;

              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }

                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }

                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }

                if (t && _.label < t[2]) {
                  _.label = t[2];

                  _.ops.push(op);

                  break;
                }

                if (t[2]) _.ops.pop();

                _.trys.pop();

                continue;
            }

            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }

          if (op[0] & 5) throw op[1];
          return {
            value: op[0] ? op[1] : void 0,
            done: true
          };
        }
      }

      var EventEmitter =
      /** @class */
      function () {
        function EventEmitter() {}

        EventEmitter.prototype.on = function (name, fn, ctx) {
          if (ctx === void 0) {
            ctx = undefined;
          }

          var e = this.e || (this.e = {});
          (e[name] || (e[name] = [])).push({
            fn: fn,
            ctx: ctx
          });
          return this;
        };

        EventEmitter.prototype.once = function (name, fn, ctx) {
          if (ctx === void 0) {
            ctx = undefined;
          }

          var self = this;

          function listener() {
            var args = [];

            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            }

            self.off(name, listener);
            fn.apply(ctx, args);
          }

          listener._ = fn;
          return this.on(name, listener, ctx);
        };

        EventEmitter.prototype.emit = function (name) {
          var data = [];

          for (var _i = 1; _i < arguments.length; _i++) {
            data[_i - 1] = arguments[_i];
          }

          var evtArr = ((this.e || (this.e = {}))[name] || []).slice();

          for (var i = 0; i < evtArr.length; i += 1) {
            evtArr[i].fn.apply(evtArr[i].ctx, data);
          }

          return this;
        };

        EventEmitter.prototype.off = function (name, callback) {
          var e = this.e || (this.e = {});

          if (!name) {
            Object.keys(e).forEach(function (key) {
              delete e[key];
            });
            delete this.e;
            return;
          }

          var evts = e[name];
          var liveEvents = [];

          if (evts && callback) {
            for (var i = 0, len = evts.length; i < len; i += 1) {
              if (evts[i].fn !== callback && evts[i].fn._ !== callback) liveEvents.push(evts[i]);
            }
          }

          if (liveEvents.length) {
            e[name] = liveEvents;
          } else {
            delete e[name];
          }

          return this;
        };

        return EventEmitter;
      }();

      if (typeof process !== 'undefined') {
        process.env.NODE_ENV;
      }
      /**
       * 判断环境变量
       */


      function listener(element, type, callback) {
        if (!element) {
          console.error("element (" + element + ") is not find!");
          return;
        } // 支持使用 addEventListener()


        if (element.addEventListener) {
          if (type.slice(0, 2) === "on") // 以 "on" 开头，不需要，则去掉
            type = type.slice(2);
          element.addEventListener(type, callback, false);
          return function () {
            element.removeEventListener(type, callback, false);
          };
        } // 支持使用 attachEvent()


        if (element.attachEvent) {
          if (type.slice(0, 2) !== "on") // 没有以 "on" 开头，需要，则加上
            type = "on" + type;
          element.attachEvent(type, callback);
          return function () {
            return element.detachEvent(type, callback);
          };
        } else {
          if (type.slice(0, 2) !== "on") {
            type = 'on' + type;
          }

          element[type] = callback;
          return function () {
            delete element[type];
          }; // type.slice(0, 2) !== "on" ? element['on'+ type] = callback : element[type] = callback;
        }
      }
      /**
       * 默认阻止事件冒泡
       *
       * @param dom
       * @param type
       * @param cb
       * @param stop
       */


      function on(dom, type, cb, stop) {
        if (stop === void 0) {
          stop = true;
        }

        if (dom) {
          return listener(dom, type, function (e) {
            stop && e.stopPropagation();
            stop && e.preventDefault();
            cb && cb(e);
          });
        } else return function () {};
      } // 截流函数：调用后在限时内执行一次，限时内再次调用，
      // 函数执行判断条件为关闭状态，函数不执行，函数执行后判断条件打开.


      function throttle(func, limit) {
        var inThrottle; // 开关

        return function () {
          var args = arguments;
          var context = this;

          if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(function () {
              // 定时器用来进行保证在一定时间内开关的状态
              inThrottle = false;
            }, limit);
          }
        };
      }
      /**
       * 获取数据类型
       *
       * getType([]) -> "[object Array]"
       *
       * @param target
       * @returns {string}
       */


      function toRawType(target) {
        return Object.prototype.toString.call(target);
      }
      /**
       * 获取对象的数据类型
       *
       * getType([]) -> "array"
       *
       * @param { any } target 目标对象
       * @returns {string}
       */


      function getType(target) {
        return toRawType(target).slice(8, -1).toLowerCase();
      }
      /**
       * 获取对象的数据类型
       *
       * getType([], "array") -> true
       *
       * @param { any } target 目标对象
       * @param { string } type 目标类型
       * @returns { boolean }
       */


      function isType(target, type) {
        return getType(target) === type;
      }
      /**
       * 是否是 String 类型
       *
       * getType([]) -> false
       *
       * @param { any } target 目标对象
       * @returns { boolean }
       */


      function isString(target) {
        return getType(target) === 'string';
      }
      /**
       * 检查 是否是 HTML 元素
       *
       * @param element
       * @returns {boolean}
       */


      function isDOM(element) {
        return typeof HTMLElement === 'function' ? element instanceof HTMLElement : element && typeof element === 'object' && element.nodeType === 1 && typeof element.nodeName === 'string';
      }
      /**
       * 设置样式
       *
       * @param element
       * @param cssObj
       */


      function setStyle(element, cssObj) {
        if (isDOM(element)) {
          Object.keys(cssObj || {}).forEach(function (key) {
            element.style[key] = cssObj[key];
          });
        } else {
          console.error(element + " is not HTMLElement!");
        }
      }
      /**
       * 创建 html
       *
       * @param element
       * @param attrs
       * @param children
       * @returns {any}
       */


      function createElement(element, attrs, children) {
        var elementNode = document.createElement(element);

        if (attrs && typeof attrs === 'object') {
          for (var key in attrs) {
            if (key === 'style' && isType(attrs[key], 'object')) {
              setStyle(elementNode, attrs['style']);
            } else {
              elementNode.setAttribute(key, attrs[key]);
            }
          }
        }

        if (Array.isArray(children)) {
          children.forEach(function (child) {
            if (isDOM(child)) {
              elementNode.appendChild(child);
            }
          });
        } else {
          if (isDOM(children)) {
            elementNode.appendChild(children);
          } else if (isString(children)) {
            elementNode.innerHTML = children;
          }
        }

        return elementNode;
      }
      /**
       * 判断当前节点是父节点的直接子节点
       *
       * @param parentNode
       * @param childNode
       */


      function hasChild(parentNode, childNode) {
        return !!(isDOM(parentNode) && isDOM(childNode) && parentNode.contains(childNode) && childNode.parentNode === parentNode);
      }
      /**
       * 添加节点
       *
       * @param parentNode
       * @param childNode
       */


      function appendChild(parentNode, childNode) {
        if (isDOM(parentNode) && isDOM(childNode)) {
          parentNode.appendChild(childNode);
        }
      }
      /**
       * 删除节点
       *
       * @param parentNode
       * @param childNode
       */


      function removeChild(parentNode, childNode) {
        if (hasChild(parentNode, childNode)) {
          parentNode.removeChild(childNode);
        }
      }
      /**
       * 是否拥有
       *
       * @param dom
       * @param className
       */


      function hasClass(dom, className) {
        return dom.classList.contains(className);
      }
      /**
       * 添加样式
       *
       * @param dom
       * @param className
       */


      function addClass(dom, className) {
        if (isDOM(dom) && !dom.classList.contains(className)) {
          dom.classList.add(className);
        }
      }
      /**
       * 删除样式
       *
       * @param dom
       * @param className
       */


      function removeClass(dom, className) {
        if (isDOM(dom) && dom.classList.contains(className)) {
          dom.classList.remove(className);
        }
      }
      /**
       * toggle样式
       *
       * @param dom
       * @param className
       */


      function toggleClass(dom, className) {
        if (isDOM(dom)) {
          dom.classList.toggle(className);
        }
      }
      /**
       * 替换样式
       *
       * @param dom
       * @param originClass
       * @param targetClass
       */


      function replaceClass(dom, originClass, targetClass) {
        if (isDOM(dom) && dom.classList.contains(originClass)) {
          dom.classList.replace(originClass, targetClass);
        }
      } // console.log(screenfull);


      var move = {
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0
      };

      function transform3DVideo(video) {
        var $container = video.$videoWrap;
        var $video = video.$video;
        var $canvas = document.createElement('canvas');
        var ctx = $canvas.getContext("2d");

        var _a = $video.getBoundingClientRect(),
            top = _a.top,
            left = _a.left,
            width = _a.width,
            height = _a.height;

        var canvasPosition = {
          x: 0,
          y: 0,
          w: 1,
          h: 1
        };
        setStyle($canvas, {
          width: width + 'px',
          height: height - 27 + 'px',
          position: 'absolute',
          'z-index': 8
        });
        ctx.strokeStyle = 'red';
        $canvas.width = width;
        $canvas.height = height - 27;
        $container.insertBefore($canvas, $video);

        function strokeCanvas() {
          var x = canvasPosition.x,
              y = canvasPosition.y,
              w = canvasPosition.w,
              h = canvasPosition.h;
          ctx.clearRect(0, 0, width, height);
          ctx.strokeRect(x, y, w, h);
        }
        /**
         * 鼠标移动时 画框
         * @param e
         */


        var mousemove = throttle(function onMouseHandle(e) {
          if ($canvas.__cancelMosemove) {
            var moveX = e.clientX - left;
            var moveY = e.clientY - top;
            strokeCanvas();
            canvasPosition.x = Math.min(move.startX, moveX);
            canvasPosition.y = Math.min(move.startY, moveY);
            canvasPosition.w = Math.abs(move.startX - moveX);
            canvasPosition.h = Math.abs(move.startY - moveY);
          }
        }, 20);
        on($canvas, 'mouseenter');
        on($canvas, 'mouseleave');
        /**
         * 添加上划放大，下划缩小操作
         *
         * 1. 左键
         * 2. 中键
         * 3. 右键
         *
         * @type {{(): void, (): *, ()}}
         * @private
         */

        $canvas.__cancelMousedown = on($canvas, 'mousedown', function (e) {
          e.stopPropagation();
          move.startX = canvasPosition.x = e.clientX - left;
          move.startY = canvasPosition.y = e.clientY - top;

          if (e.which === 1) {
            strokeCanvas();
            $canvas.__cancelMosemove = on($canvas, 'mousemove', mousemove);
          }
        });

        function cancelMouseMove() {
          if ($canvas.__cancelMosemove) {
            $canvas.__cancelMosemove();

            $canvas.__cancelMosemove = null;
          }

          if ($canvas.contains($canvas)) {
            ctx.clearRect(0, 0, width, height);
            canvasPosition = {
              x: 0,
              y: 0,
              w: 1,
              h: 1
            };
          }
        }
        /**
         * 鼠标抬起事件
         *
         * @type {(function(...[*]=))|(function(): *)}
         * @private
         */


        $canvas.__cancelCanvasMouseup = on($canvas, 'mouseup', function (e) {
          /*if (move.endY > 0 && move.endY > move.startY) {
            cancelMouseMove ();
            return;
          }*/
          move.endX = e.clientX - left;
          move.endY = e.clientY - top;

          if (e.which === 1) {
            if (move.endY > move.startY) {
              var x = canvasPosition.x,
                  y = canvasPosition.y,
                  w = canvasPosition.w,
                  h = canvasPosition.h; // 缩放比例

              var scaleX = width / w;
              var scaleY = height / h; // 移动距离

              var moveX = -parseInt('' + (x + w / 2 - width / 2)) + 'px';
              var moveY = -parseInt('' + (y + h / 2 - height / 2)) + 'px';
              /**
               * 必须有一个框选区域
               * 至少是 10 * 10
               * 否则视为点击，不予处理。
               */

              if (w > 10 && h > 10) {
                setStyle($video, {
                  // transform: `scale(${scaleX}, ${scaleY})`
                  transform: "scale(" + scaleX + ", " + scaleY + ") translateX(" + moveX + ") translateY(" + moveY + ")"
                });
              }
            } else {
              setStyle($video, {
                transform: "scale(1, 1) translateX(0) translateY(0)"
              });
            }
          }

          cancelMouseMove();
        });
        /**
         * 划出同样等于取消
         */

        $canvas.__cancelMouseup = on($canvas, 'mouseout', cancelMouseMove);
        return function () {
          setStyle($video, {
            transform: "scale(1, 1) translateX(0) translateY(0)"
          });
          $canvas.__cancelCanvasMouseup && $canvas.__cancelCanvasMouseup();
          $canvas.__cancelMousedown && $canvas.__cancelMousedown();
          $canvas.__cancelMouseup && $canvas.__cancelMouseup();
          $canvas.__cancelCanvasMouseup = $canvas.__cancelMousedown = $canvas.__cancelMouseup = null;

          if ($container.contains($canvas) && $canvas.parentNode === $container) {
            $container.removeChild($canvas);
          }
        };
      }

      function now$1() {
        return new Date().getTime();
      }

      function dataURLToFile(dataURL) {
        if (dataURL === void 0) {
          dataURL = '';
        }

        var arr = dataURL.split(",");
        var bstr = atob(arr[1]);
        var type = arr[0].replace("data:", "").replace(";base64", "");
        var n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], 'file', {
          type: type
        });
      }

      function downloadImg(content, fileName) {
        var aLink = document.createElement("a");
        aLink.download = fileName;
        aLink.style.display = 'none';
        aLink.href = URL.createObjectURL(content);
        aLink.click();
        URL.revokeObjectURL(content);
      }

      var createScreenshot = function (video, type, quality) {
        if (type === void 0) {
          type = 'png';
        }

        if (quality === void 0) {
          quality = 1;
        }

        var $container = video.$videoWrap;

        var _a = $container.getBoundingClientRect(),
            width = _a.width,
            height = _a.height;

        var $canvas = document.createElement('canvas'); // const type = 'png'; // 'base64';

        var filename = now$1();
        var formatType = {
          png: 'image/png',
          jpeg: 'image/jpeg',
          webp: 'image/webp'
        };
        var encoderOptions = 0.92;

        if (typeof quality !== 'undefined') {
          encoderOptions = Number(quality);
        }

        $canvas.width = width;
        $canvas.height = height;
        $canvas.getContext("2d").drawImage(video.$video, 0, 0, width, height);
        var dataURL = $canvas.toDataURL(formatType[type], encoderOptions);
        var file = dataURLToFile(dataURL);
        downloadImg(file, filename);
        return file;
      };

      function mixinEvents(video) {
        var capabilities = video.options.capabilities;
        video.$container; // console.log(video);

        on(video.$close, 'click', function () {
          return video.emit('close');
        });
        /**
         * 屏幕录制
         */

        if (capabilities.record) {
          on(video.$recordStart, 'click', function () {
            var active = hasClass(video.$recordStart, 'sullivan-active');
            toggleClass(video.$recordStart, 'sullivan-active');
            video.emit('record', !active);
          });
          on(video.$recordEnd, 'click', function () {
            var active = hasClass(video.$recordStart, 'sullivan-active');
            replaceClass(video.$recordStart, 'sullivan-hide', 'sullivan-show');
            replaceClass(video.$recordEnd, 'sullivan-show', 'sullivan-hide');
            video.emit('record', !active);
          });
        }
        /**
         * 云台控制
         */


        if (capabilities.movement) {
          on(video.$ptzCtrl, 'click', function () {
            var active = hasClass(video.$ptzCtrl, 'sullivan-active');
            toggleClass(video.$ptzCtrl, 'sullivan-active');

            if (active) {
              removeClass(video.$movementWrap, 'sullivan-show');
              addClass(video.$movementWrap, 'sullivan-hide');
            } else {
              removeClass(video.$movementWrap, 'sullivan-hide');
              addClass(video.$movementWrap, 'sullivan-show');
            }

            video.emit('zpt:ctrl', !active);
          });
          on(video.$movementTop, 'click', function () {
            video.emit('movement:move', 'top');
          });
          on(video.$movementRight, 'click', function () {
            video.emit('movement:move', 'right');
          });
          on(video.$movementBottom, 'click', function () {
            video.emit('movement:move', 'bottom');
          });
          on(video.$movementLeft, 'click', function () {
            video.emit('movement:move', 'left');
          });
        }
        /**
         * 截图
         */


        if (capabilities.screenshot) {
          on(video.$screenshot, 'click', function () {
            var blob = createScreenshot(video);
            video.emit('screenshot', blob);
          });
        }
        /**
         * 放大缩小
         */


        if (capabilities.zoom) {
          on(video.$zoomIn, 'click', function () {
            var disabledIn = hasClass(video.$zoomIn, 'sullivan-disabled');
            var disableOut = hasClass(video.$zoomOut, 'sullivan-disabled');
            if (disabledIn) return;

            if (!disabledIn && video.zoom >= 9) {
              addClass(video.$zoomIn, 'sullivan-disabled');
            }

            if (disableOut) {
              removeClass(video.$zoomOut, 'sullivan-disabled');
            }

            if (!disabledIn) {
              video.zoom += 1;
              setStyle(video.$video, {
                transform: "scale(" + video.zoom + ", " + video.zoom + ") "
              });
              video.emit('zoom:in', video.zoom);
            }
          });
          on(video.$zoomOut, 'click', function () {
            var disabledIn = hasClass(video.$zoomIn, 'sullivan-disabled');
            var disableOut = hasClass(video.$zoomOut, 'sullivan-disabled');
            if (disableOut) return;

            if (!disableOut && video.zoom <= 2) {
              addClass(video.$zoomOut, 'sullivan-disabled');
            }

            if (disabledIn) {
              removeClass(video.$zoomIn, 'sullivan-disabled');
            }

            if (!disableOut) {
              video.zoom -= 1;
              setStyle(video.$video, {
                transform: "scale(" + video.zoom + ", " + video.zoom + ") "
              });
              video.emit('zoom:out', video.zoom);
            }
          });
        }
        /**
         * 3D 框选变换
         */


        if (capabilities.transform) {
          on(video.$threeDimensional, 'click', function () {
            var active = hasClass(video.$threeDimensional, 'sullivan-active');
            toggleClass(video.$threeDimensional, 'sullivan-active');

            try {
              if (!active) {
                video.cancelTransform3DVideo = transform3DVideo(video);
              } else {
                video.cancelTransform3DVideo();
              }
            } catch (error) {
              console.error(error);
            }

            video.emit('transform:3d', !active);
          });
        }
        /**
         * 对 3D 变换 元素大小进行处理
         */


        function resizeTransform3DVideo() {
          if (capabilities.transform && video.cancelTransform3DVideo) {
            video.cancelTransform3DVideo();
            video.cancelTransform3DVideo = transform3DVideo(video);
          }
        }
        /**
         * 全屏
         */


        on(video.$maximize, 'click', function () {
          addClass(video.$maximize, 'sullivan-hide');
          removeClass(video.$maximize, 'sullivan-show');
          addClass(video.$minimize, 'sullivan-show');
          removeClass(video.$minimize, 'sullivan-hide');

          try {
            screenfull__default["default"].request(video.$box).then(function () {
              video.emit('fullscreen', true);
            }).catch(function (e) {
              video.webFullscreen = true;
              video.emit('fullscreen', true);
            }).finally(resizeTransform3DVideo);
          } catch (e) {
            video.webFullscreen = true;
            video.emit('fullscreen', true);
            setTimeout(resizeTransform3DVideo, 500);
          }
        });
        on(video.$minimize, 'click', function () {
          addClass(video.$minimize, 'sullivan-hide');
          removeClass(video.$minimize, 'sullivan-show');
          addClass(video.$maximize, 'sullivan-show');
          removeClass(video.$maximize, 'sullivan-hide');

          try {
            screenfull__default["default"].exit().then(function () {
              video.emit('fullscreen', false);
            }).catch(function () {
              video.webFullscreen = false;
              video.emit('fullscreen', false);
            }).finally(resizeTransform3DVideo);
          } catch (e) {
            video.webFullscreen = false;
            video.emit('fullscreen', false);
            setTimeout(resizeTransform3DVideo, 500);
          }
        });
      }
      /*
      bindEvent () {
        /!*utils.listener($video, 'canplay', () => {
          // this.$video.play();
        });*!/
         // this.visibilityChange = utils.listener(document, 'visibilitychange', this.onPageVisibilityChange);
        // this.recording = utils.listener(document.querySelector('#recoder'), this.onRecord)
      }*/

      /*
      *
        onPageVisibilityChange = () => {
          const $video = this.$video;
          console.log(document.visibilityState);
          if (document.visibilityState === 'visible') {
            try {
              const playPromise = $video.play();
              if (playPromise !== undefined) {
                playPromise
                  .catch(error => console.log(error))
                  .finally(() => {
                    setTimeout(() => {
                      console.log('play', $video.play());
                    }, 1000);
                  })
              }
            } catch (e) {
              console.log(e)
            }
          } else {
            try {
              const pausePromise = $video.pause();
              if (pausePromise !== undefined) {
                pausePromise
                  .catch(error => console.log(error))
                  .finally(() => $video.pause())
              }
            } catch (e) {
              console.log(e)
            }
          }
        };
       * */

      /**
       * 创建方向按钮
       *
       * @param arrow 方向
       * @param icon
       */


      function createArrow(arrow, icon) {
        var className = "movement-arrow movement-" + arrow;
        return createElement('div', {
          class: className
        }, icon);
      }
      /**
       * 根据传入的路径，将 Icon 转为 svg
       *
       * @param name
       * @param classname
       */


      function createIcon(name, classname) {
        return Icons__namespace.createIcon({
          name: name,
          classname: 'sullivan-icon ' + classname
        });
      }

      function createArrowIcon(name, arrow) {
        return Icons__namespace.createIcon({
          name: name,
          classname: 'movement-icon icon-' + arrow
        });
      }

      var icon = {
        maximize: createIcon(Icons__namespace.urlMaximize2, 'icon-maximize'),
        minimize: createIcon(Icons__namespace.urlMinimize2, 'icon-minimize'),
        recordStart: createIcon(Icons__namespace.urlVideo, 'icon-record-start'),
        recordEnd: createIcon(Icons__namespace.urlVideoDisabled, 'icon-record-end'),
        arrowTop: createArrowIcon(Icons__namespace.urlArrowUp, 'top'),
        arrowRight: createArrowIcon(Icons__namespace.urlArrowRight, 'right'),
        arrowBottom: createArrowIcon(Icons__namespace.urlArrowDown, 'bottom'),
        arrowLeft: createArrowIcon(Icons__namespace.urlArrowLeft, 'left'),
        ptz: createIcon(Icons__namespace.urlPTZCtrl, 'icon-ptz-control'),
        screenshot: createIcon(Icons__namespace.urlScreenshot, 'icon-screenshot'),
        zoomIn: createIcon(Icons__namespace.urlZoomInFill, 'icon-zoom-in'),
        zoomOut: createIcon(Icons__namespace.urlZoomOutFill, 'icon-zoom-out'),
        threeDimensional: createIcon(Icons__namespace.urlThreeDimensional, 'icon-three-dimensional')
      };
      /**
       * 生成模板
       *
       * @param classname
       * @param icon
       */

      function iconWrap(classname, icon) {
        return createElement('div', {
          class: 'sullivan-icon-wrap ' + classname
        }, icon);
      } // console.log(icon)


      var Template =
      /** @class */
      function () {
        function Template(config) {
          this.config = config;
          this.children = [];
          if (config.record) this.createRecord();
          if (config.movement) this.createMovement();
          if (config.screenshot) this.createScreenshot();
          if (config.zoom) this.createZoom();
          if (config.transform) this.createTransform(config.transform);
          this.createScreen();
        }
        /**
         * 创建 全屏 Button
         */


        Template.prototype.createScreen = function () {
          this.children.push(iconWrap('sullivan-show sullivan-maximize', icon.maximize));
          this.children.push(iconWrap('sullivan-hide sullivan-minimize', icon.minimize));
        };
        /**
         * 创建 录制 Button
         */


        Template.prototype.createRecord = function () {
          this.children.push(iconWrap('sullivan-show sullivan-record-start', icon.recordStart));
          this.children.push(iconWrap('sullivan-hide sullivan-record-end', icon.recordEnd));
        };
        /**
         * 创建 云台方向 Button
         */


        Template.prototype.createMovementControl = function () {
          return createElement('div', {
            class: 'movement-wrap sullivan-hide'
          }, [createArrow('top', icon.arrowTop), createArrow('right', icon.arrowRight), createArrow('bottom', icon.arrowBottom), createArrow('left', icon.arrowLeft)]);
        };
        /**
         * 创建 云台控制 Button
         */


        Template.prototype.createMovement = function () {
          this.children.push(iconWrap('sullivan-show sullivan-ptz-control', icon.ptz));
        };
        /**
         * 创建 截图 Button
         */


        Template.prototype.createScreenshot = function () {
          this.children.push(iconWrap('sullivan-show sullivan-screenshot', icon.screenshot));
        };
        /**
         * 创建 放大缩小 Button
         */


        Template.prototype.createZoom = function () {
          this.children.push(iconWrap('sullivan-show sullivan-zoom-in', icon.zoomIn));
          this.children.push(iconWrap('sullivan-show sullivan-zoom-out sullivan-disabled', icon.zoomOut));
        };
        /**
         * 创建 变换 Button
         */


        Template.prototype.createTransform = function (transform) {
          if (transform === '3d') {
            this.children.push(iconWrap('sullivan-show sullivan-three-dimensional', icon.threeDimensional));
          }
        };

        return Template;
      }();

      function mixinTemplate(video, option) {
        var capabilities = option.capabilities;
        var template = new Template(capabilities);
        var $close = createElement('div', {
          class: 'sullivan-close'
        }, createIcon(Icons__namespace.urlClose, 'icon-close'));
        var $videoWrap = createElement('div', {
          class: 'sullivan-video-wrap'
        }, template.createMovementControl());
        var $control = createElement('div', {
          class: 'sullivan-control'
        }, [createElement('div', {
          class: 'sullivan-control-left'
        }), createElement('div', {
          class: 'sullivan-control-right'
        }, template.children)]);
        var $box = createElement('div', {
          class: 'sullivan-box'
        }, [$close, $videoWrap, $control]);
        appendChild(video.$container, $box);
        video.setDefineProperty('$videoWrap', $videoWrap);
        video.setDefineProperty('$control', $control);
        video.setDefineProperty('$box', $box);
        video.setDefineProperty('$iconWrap', video.$container.querySelectorAll('.sullivan-icon-wrap'));

        if (capabilities.record) {
          video.__set$('$recordStart', '.sullivan-record-start');

          video.__set$('$recordEnd', '.sullivan-record-end');
        }

        if (capabilities.screenshot) {
          video.__set$('$screenshot', '.sullivan-screenshot');
        }

        if (capabilities.movement) {
          video.__set$('$ptzCtrl', '.sullivan-ptz-control');

          video.__set$('$movementWrap', '.movement-wrap');

          video.__set$('$movementTop', '.movement-top');

          video.__set$('$movementRight', '.movement-right');

          video.__set$('$movementBottom', '.movement-bottom');

          video.__set$('$movementLeft', '.movement-left');
        }

        if (capabilities.zoom) {
          video.__set$('$zoomIn', '.sullivan-zoom-in');

          video.__set$('$zoomOut', '.sullivan-zoom-out');
        }

        if (capabilities.transform) {
          video.__set$('$threeDimensional', '.sullivan-three-dimensional');
        }

        video.__set$('$maximize', '.sullivan-maximize');

        video.__set$('$minimize', '.sullivan-minimize');

        video.__set$('$close', '.sullivan-close');
      }

      var FILE_SUFFIX = {
        mp4: 'mp4',
        webm: 'webm'
      };

      function now() {
        return new Date().getTime();
      }

      function downloadRecord(blob, name, suffix) {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = (name || now()) + '.' + (suffix || FILE_SUFFIX.webm);
        a.click();
        window.URL.revokeObjectURL(url);
      }

      var RecordRTCLoader =
      /** @class */
      function (_super) {
        __extends(RecordRTCLoader, _super);

        function RecordRTCLoader(video) {
          var _this = _super.call(this) || this;

          _this.video = video;
          _this.debug = console;
          _this.fileName = '';
          _this.fileType = FILE_SUFFIX.webm;
          _this.isRecording = false;
          _this.recordingTimestamp = 0;
          _this.recordingInterval = null;

          _this.debug.log('Recorder', 'init');

          return _this;
        }

        RecordRTCLoader.prototype.destroy = function () {
          this._reset();

          this.debug.log('Recorder', 'destroy');
        };

        RecordRTCLoader.prototype.setFileName = function (fileName, fileType) {
          this.fileName = fileName;

          if (FILE_SUFFIX.mp4 === fileType || FILE_SUFFIX.webm === fileType) {
            this.fileType = fileType;
          }
        };

        Object.defineProperty(RecordRTCLoader.prototype, "recording", {
          get: function () {
            return this.isRecording;
          },
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(RecordRTCLoader.prototype, "recordTime", {
          get: function () {
            return this.recordingTimestamp;
          },
          enumerable: false,
          configurable: true
        });

        RecordRTCLoader.prototype.startRecord = function () {
          var _this = this;

          var options = {
            type: 'video',
            mimeType: 'video/webm;codecs=h264',
            onTimeStamp: function (timestamp) {
              console.log('Recorder', 'record timestamp :' + timestamp);
            },
            disableLogs: true
          };

          try {
            var stream = this.video.$video.captureStream(25);
            this.recorder = RecordRTC__default["default"](stream, options);
          } catch (e) {
            this.emit('recordCreateError');
          }

          if (this.recorder) {
            this.isRecording = true;
            this.video.emit('recording', true);
            this.recorder.startRecording(); // debug.log('Recorder', 'start recording');

            this.video.emit('recordStart');
            this.recordingInterval = window.setInterval(function () {
              _this.recordingTimestamp += 1;

              _this.video.emit('recordingTimestamp', _this.recordingTimestamp);
            }, 1000);
          }
        };

        RecordRTCLoader.prototype.stopRecordAndSave = function () {
          var _this = this;

          if (!this.recorder || !this.isRecording) {
            return;
          }

          this.recorder.stopRecording(function () {
            // this.video.debug.log('Recorder', 'stop recording');
            // this.video.emit(EVENTS.recordEnd);
            downloadRecord(_this.recorder.getBlob(), _this.fileName, _this.fileType);

            _this._reset(); // this.video.emit(EVENTS.recording, false);

          });
        };

        RecordRTCLoader.prototype._reset = function () {
          this.isRecording = false;
          this.recordingTimestamp = 0;

          if (this.recorder) {
            this.recorder.destroy();
            this.recorder = null;
          }

          this.fileName = null;

          if (this.recordingInterval) {
            clearInterval(this.recordingInterval);
          }

          this.recordingInterval = null;
        };

        return RecordRTCLoader;
      }(EventEmitter);

      function styleInject(css, ref) {
        if (ref === void 0) ref = {};
        var insertAt = ref.insertAt;

        if (!css || typeof document === 'undefined') {
          return;
        }

        var head = document.head || document.getElementsByTagName('head')[0];
        var style = document.createElement('style');
        style.type = 'text/css';

        if (insertAt === 'top') {
          if (head.firstChild) {
            head.insertBefore(style, head.firstChild);
          } else {
            head.appendChild(style);
          }
        } else {
          head.appendChild(style);
        }

        if (style.styleSheet) {
          style.styleSheet.cssText = css;
        } else {
          style.appendChild(document.createTextNode(css));
        }
      }

      var css_248z = ".sullivan-container {\n  width: 72vw;\n  height: 60vh;\n}\n\n.sullivan-box {\n  position: relative;\n  display: flex;\n  width: 100%;\n  height: 100%;\n  flex-direction: column;\n}\n\n.sullivan-box .sullivan-video-wrap,\n.sullivan-video-wrap .sullivan-video,\n.sullivan-box .sullivan-control {\n  width: 100%;\n}\n\n.sullivan-box .sullivan-video-wrap {\n  height: 100%;\n  overflow: hidden;\n}\n\n.sullivan-box .sullivan-close {\n  position: absolute;\n  min-width: 1rem;\n  min-height: 1rem;\n  max-width: 4rem;\n  max-height: 4rem;\n  width: 2.2rem;\n  height: 2.2rem;\n  right: 1rem;\n  top: 1rem;\n  padding: 0 .35rem;\n  background-color: rgba(0, 0, 0, .4);\n  cursor: pointer;\n  border-radius: 2rem;\n  z-index: 9;\n  box-sizing: border-box;\n  transition: all ease-out .3s;\n}\n\n.sullivan-box .sullivan-close:hover {\n  background-color: rgba(255, 0, 0, .7);\n  transition: all ease-in .3s;\n}\n\n.sullivan-box .sullivan-close:hover .icon-close {\n  transition: all ease-in .3s;\n}\n\n.sullivan-box .sullivan-close .icon-close {\n  width: 100%;\n  height: 100%;\n  fill: #eee;\n}\n\n.sullivan-video-wrap .movement-wrap {\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 0;\n  background-color: rgba(0, 0, 0, 0.4);\n}\n\n.sullivan-video-wrap .movement-wrap.sullivan-hide {\n  display: none;\n}\n\n.sullivan-video-wrap .movement-wrap.sullivan-show {\n  display: flex;\n}\n\n.movement-wrap .movement-arrow {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 10px;\n  position: absolute;\n  width: 10%;\n  max-width: 70px;\n  min-width: 30px;\n  background-repeat: no-repeat;\n  background-color: rgba(0, 0, 0, .2);\n  background-position: center;\n  border-radius: 40px;\n  cursor: pointer;\n  opacity: .6;\n  z-index: 99;\n  transition: all ease-out .3s;\n}\n\n.movement-wrap .movement-arrow:hover {\n  background-color: rgba(0, 0, 0, .3);\n  transition: all ease-in .3s;\n}\n\n.movement-wrap .movement-arrow:hover .movement-icon {\n  fill: #000;\n}\n\n.movement-arrow .movement-icon {\n  width: 100%;\n  height: 100%;\n  fill: #0a0a0a;\n  /*fill: white;*/\n}\n\n.movement-wrap .movement-top {\n  top: 10%;\n  left: 50%;\n}\n.movement-wrap .movement-right {\n  top: 45%;\n  right: 20px;\n}\n.movement-wrap .movement-bottom {\n  left: 50%;\n  bottom: 10%;\n}\n.movement-wrap .movement-left {\n  top: 45%;\n  left: 20px;\n}\n\n.movement-wrap .movement-top,\n.movement-wrap .movement-bottom {\n  transform: translateX(-50%);\n}\n\n.movement-wrap .icon-top {\n  transform: translateY(-5%);\n}\n.movement-wrap .icon-right {\n  transform: translateX(5%);\n}\n.movement-wrap .icon-bottom {\n  transform: translateY(5%);\n}\n.movement-wrap .icon-left {\n  transform: translateX(-5%);\n}\n\n.sullivan-box .sullivan-video-wrap,\n.sullivan-video-wrap .sullivan-video {\n  height: 100%;\n}\n\n.sullivan-video-wrap .sullivan-video {\n  object-fit: fill;\n}\n\n.sullivan-control .sullivan-control-left,\n.sullivan-control .sullivan-control-right {\n  width: 100%;\n}\n\n.sullivan-box .sullivan-control {\n  display: flex;\n  height: 5%;\n  max-height: 40px;\n  min-height: 24px;\n  position: absolute;\n  bottom: 0;\n  z-index: 9;\n  background-image: linear-gradient(transparent, #000);\n}\n\n.sullivan-control .sullivan-control-left,\n.sullivan-control .sullivan-control-right {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100%;\n}\n\n.sullivan-control .sullivan-control-right {\n  justify-content: flex-end;\n}\n\n.sullivan-control .sullivan-icon-wrap {\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 2px 8px;\n  user-select: none;\n}\n\n.sullivan-control .sullivan-icon-wrap.sullivan-show {\n  fill: #fafafa;\n}\n\n.sullivan-control .sullivan-icon-wrap.sullivan-hide {\n  display: none;\n}\n\n.sullivan-icon-wrap .sullivan-icon {\n  height: 80%;\n  width: auto;\n  fill: #fafafa;\n  cursor: pointer;\n  transition: all ease-out .3s;\n  user-select: none;\n}\n\n.sullivan-icon-wrap .sullivan-icon:hover,\n.sullivan-icon-wrap .sullivan-icon.icon-show:hover {\n  fill: #40fcff;\n  transition: all ease-in .2s;\n}\n\n.sullivan-icon-wrap.sullivan-active .sullivan-icon {\n  fill: #40fcff;\n}\n\n.sullivan-icon-wrap.sullivan-disabled .sullivan-icon {\n  fill: #aaa;\n  cursor: auto;\n}\n";
      styleInject(css_248z);

      var Video =
      /** @class */
      function (_super) {
        __extends(Video, _super);

        function Video(root) {
          var _this = _super.call(this) || this;

          _this.setDefineProperty = function (key, value) {
            Object.defineProperty(_this, key, {
              value: value
            });
          };

          _this.__set$ = function (key, selector) {
            _this.setDefineProperty(key, _this.$container.querySelector(selector));
          };

          _this.appendMediaElement = function ($video) {
            appendChild(_this.$videoWrap, $video);
          };

          _this.removeVideo = function ($video) {
            removeChild(_this.$videoWrap, $video);
          };

          _this.getVideoSize = function () {
            var $box = _this.$box;
            var rect = $box.getBoundingClientRect();
            var width = Math.min(rect.width, $box.clientWidth);
            var height = Math.min(rect.height, $box.clientHeight);
            return {
              rect: rect,
              width: width,
              height: height
            };
          };

          _this.resize = function () {
            var width = _this.getVideoSize().width;

            var _a = _this.options.capabilities,
                zoom = _a.zoom,
                movement = _a.movement,
                transform = _a.transform,
                screenshot = _a.screenshot,
                record = _a.record;
            var options = {};
            var wrapPadding = '2px 8px';

            _this.toggleDisplay(_this.$zoomIn, width < 150 && zoom);

            _this.toggleDisplay(_this.$zoomOut, width < 150 && zoom);

            _this.toggleDisplay(_this.$screenshot, width < 200 && screenshot);

            _this.toggleDisplay(_this.$recordStart, width < 300 && record);

            _this.toggleDisplay(_this.$recordEnd, width < 300 && record);

            _this.toggleDisplay(_this.$ptzCtrl, width < 400 && movement);

            _this.toggleDisplay(_this.$threeDimensional, width < 500 && transform);

            if (width < 500) {
              wrapPadding = '2px 4px';
            }

            if (width < 200) {
              options.width = options.height = '1rem';
              options.top = options.right = '.4rem';
              options.padding = '0 .1rem';
            } else if (width < 240) {
              options.width = options.height = '1.2rem';
              options.top = options.right = '.6rem';
              options.padding = '0 .2rem';
            } else if (width < 500) {
              options.width = options.height = '1.6rem';
              options.top = options.right = '.8rem';
              options.padding = '0 .3rem';
            } else {
              options.width = options.height = '2.2rem';
              options.top = options.right = '1rem';
              options.padding = '0 .35rem';
            }

            if (Object.keys(options).length) {
              setStyle(_this.$close, options);
            }

            _this.$iconWrap.forEach(function ($wrap) {
              setStyle($wrap, {
                padding: wrapPadding
              });
            });
          };

          _this.destroy = function () {
            var $video = _this.$video;
            console.log('destroy:video');
            window.URL.revokeObjectURL($video.src);
            $video.src = '';
            $video.load();

            _this.removeVideo($video);

            removeChild(_this.$container, _this.$box);

            if (_this.visibilityChange) {
              _this.visibilityChange();

              _this.visibilityChange = null;
            }
          };

          _this.root = root;
          _this.options = root.options;
          _this.$container = _this.root.options.$container;
          _this.$video = null;
          _this.zoom = 1;
          _this.recorder = new RecordRTCLoader(_this);

          _this.createVideo();

          mixinTemplate(_this, root.options);
          mixinEvents(_this);

          _this.addEventListen();

          setTimeout(_this.resize, 1000);
          return _this;
        }

        Video.prototype.createVideo = function () {
          var videoAttribute = {
            autoPlay: true,
            muted: false,
            poster: "/background.png",
            class: 'sullivan-video'
          };
          var $video = createElement('video', videoAttribute);
          this.$video = $video;
          return $video;
        };

        Video.prototype.addEventListen = function () {
          var _this = this;

          this.on('close', function () {
            var __cache = _this.root.__cache;

            _this.root.destroy();

            _this.root.emit('close', __cache);
          });
          this.on('record', function (bool) {
            if (bool) {
              _this.recorder.startRecord();
            } else {
              _this.recorder.stopRecordAndSave();
            }

            _this.root.emit('record', bool);
          });
          this.on('zpt:ctrl', function (arg) {
            _this.root.emit('zpt:ctrl', arg);
          });
          this.on('screenshot', function (enable) {
            var __cache = _this.root.__cache;

            _this.root.emit('screenshot', __assign({
              enable: enable
            }, __cache));
          });
          this.on('zoom:in', function (zoom) {
            var __cache = _this.root.__cache;

            _this.root.emit('zoom', __assign({
              zoom: zoom
            }, __cache));
          });
          this.on('zoom:out', function (enable) {
            var __cache = _this.root.__cache;

            _this.root.emit('zoom', __assign({
              enable: enable
            }, __cache));
          });
          this.on('transform:3d', function (enable) {
            var __cache = _this.root.__cache;

            _this.root.emit('transform', __assign({
              enable: enable
            }, __cache));
          });
          this.on('movement:move', function (direction) {
            var __cache = _this.root.__cache;

            _this.root.emit('movement', __assign({
              direction: direction
            }, __cache));
          });
          listener(window, 'resize', throttle(this.resize, 200));
        };

        Video.prototype.toggleDisplay = function ($dom, condition) {
          setStyle($dom, {
            display: condition ? 'none' : 'block'
          });
        };

        return Video;
      }(EventEmitter);

      var MP4 =
      /** @class */
      function () {
        function MP4() {}

        MP4.init = function () {
          MP4.types = {
            avc1: [],
            avcC: [],
            hvc1: [],
            hvcC: [],
            btrt: [],
            dinf: [],
            dref: [],
            esds: [],
            ftyp: [],
            hdlr: [],
            mdat: [],
            mdhd: [],
            mdia: [],
            mfhd: [],
            minf: [],
            moof: [],
            moov: [],
            mp4a: [],
            mvex: [],
            mvhd: [],
            sdtp: [],
            stbl: [],
            stco: [],
            stsc: [],
            stsd: [],
            stsz: [],
            stts: [],
            tfdt: [],
            tfhd: [],
            traf: [],
            trak: [],
            trun: [],
            trex: [],
            tkhd: [],
            vmhd: [],
            smhd: []
          };

          for (var name in MP4.types) {
            if (MP4.types.hasOwnProperty(name)) {
              MP4.types[name] = [name.charCodeAt(0), name.charCodeAt(1), name.charCodeAt(2), name.charCodeAt(3)];
            }
          }

          var constants = MP4.constants = {}; // 文件类型。描述遵从的规范的版本。

          constants.FTYP = new Uint8Array([0x69, 0x73, 0x6F, 0x6D, 0x0, 0x0, 0x0, 0x1, 0x69, 0x73, 0x6F, 0x6D, 0x61, 0x76, 0x63, 0x31 // avc1
          ]);
          constants.STSD_PREFIX = new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01 // entry_count
          ]);
          constants.STTS = new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 // entry_count
          ]);
          constants.STSC = constants.STCO = constants.STTS;
          constants.STSZ = new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 // sample_count
          ]);
          constants.HDLR_VIDEO = new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x76, 0x69, 0x64, 0x65, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x56, 0x69, 0x64, 0x65, 0x6F, 0x48, 0x61, 0x6E, 0x64, 0x6C, 0x65, 0x72, 0x00 // name: VideoHandler
          ]);
          constants.HDLR_AUDIO = new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x73, 0x6F, 0x75, 0x6E, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x53, 0x6F, 0x75, 0x6E, 0x64, 0x48, 0x61, 0x6E, 0x64, 0x6C, 0x65, 0x72, 0x00 // name: SoundHandler
          ]);
          constants.DREF = new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x0C, 0x75, 0x72, 0x6C, 0x20, 0x00, 0x00, 0x00, 0x01 // version(0) + flags
          ]); // Sound media header

          constants.SMHD = new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 // balance(2) + reserved(2)
          ]); // video media header

          constants.VMHD = new Uint8Array([0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
        }; // Generate a box


        MP4.box = function (type) {
          var args = [];

          for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
          }

          var size = 8;
          var result = null;
          var datas = Array.prototype.slice.call(args, 0);
          var arrayCount = datas.length;

          for (var i = 0; i < arrayCount; i++) {
            size += datas[i].byteLength;
          }

          result = new Uint8Array(size);
          result[0] = size >>> 24 & 0xFF; // size

          result[1] = size >>> 16 & 0xFF;
          result[2] = size >>> 8 & 0xFF;
          result[3] = size & 0xFF;
          result.set(type, 4); // type

          var offset = 8;

          for (var i = 0; i < arrayCount; i++) {
            // data body
            result.set(datas[i], offset);
            offset += datas[i].byteLength;
          }

          return result;
        }; // 生成单元段
        // emit ftyp & moov


        MP4.generateInitSegment = function (meta) {
          // ftyp：文件类型。描述遵从的规范的版本。
          var ftyp = MP4.box(MP4.types.ftyp, MP4.constants.FTYP); // moov box：媒体的metadata信息。
          // “moov”是一个container box，具体内容信息在其子box中。一般情况下，“moov”会紧随着“ftyp”。
          // “moov”中包含1个“mvhd”和若干个“trak”。
          // 其中“mvhd”是header box，一般作为“moov”的第一个子box出现。
          // “trak”包含了一个track的相关信息，是一个container box。

          var moov = MP4.moov(meta);
          var result = new Uint8Array(ftyp.byteLength + moov.byteLength);
          result.set(ftyp, 0);
          result.set(moov, ftyp.byteLength);
          return result;
        }; // Movie metadata box


        MP4.moov = function (meta) {
          var mvhd = MP4.mvhd(meta.timescale, meta.duration);
          var trak = MP4.trak(meta);
          var mvex = MP4.mvex(meta);
          return MP4.box(MP4.types.moov, mvhd, trak, mvex);
        }; // Movie header box


        MP4.mvhd = function (timescale, duration) {
          return MP4.box(MP4.types.mvhd, new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, timescale >>> 24 & 0xFF, timescale >>> 16 & 0xFF, timescale >>> 8 & 0xFF, timescale & 0xFF, duration >>> 24 & 0xFF, duration >>> 16 & 0xFF, duration >>> 8 & 0xFF, duration & 0xFF, 0x00, 0x01, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0xFF, 0xFF // next_track_ID
          ]));
        }; // Track box


        MP4.trak = function (meta) {
          return MP4.box(MP4.types.trak, MP4.tkhd(meta), MP4.mdia(meta));
        }; // Track header box


        MP4.tkhd = function (meta) {
          var trackId = meta.id,
              duration = meta.duration;
          var width = meta.presentWidth,
              height = meta.presentHeight;
          return MP4.box(MP4.types.tkhd, new Uint8Array([0x00, 0x00, 0x00, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, trackId >>> 24 & 0xFF, trackId >>> 16 & 0xFF, trackId >>> 8 & 0xFF, trackId & 0xFF, 0x00, 0x00, 0x00, 0x00, duration >>> 24 & 0xFF, duration >>> 16 & 0xFF, duration >>> 8 & 0xFF, duration & 0xFF, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00, width >>> 8 & 0xFF, width & 0xFF, 0x00, 0x00, height >>> 8 & 0xFF, height & 0xFF, 0x00, 0x00]));
        };

        MP4.mdia = function (meta) {
          return MP4.box(MP4.types.mdia, MP4.mdhd(meta), MP4.hdlr(meta), MP4.minf(meta));
        }; // Media header box


        MP4.mdhd = function (meta) {
          var timescale = meta.timescale;
          var duration = meta.duration;
          return MP4.box(MP4.types.mdhd, new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, timescale >>> 24 & 0xFF, timescale >>> 16 & 0xFF, timescale >>> 8 & 0xFF, timescale & 0xFF, duration >>> 24 & 0xFF, duration >>> 16 & 0xFF, duration >>> 8 & 0xFF, duration & 0xFF, 0x55, 0xC4, 0x00, 0x00 // pre_defined = 0
          ]));
        }; // Media handler reference box


        MP4.hdlr = function (meta) {
          var data = null;

          if (meta.type === 'audio') {
            data = MP4.constants.HDLR_AUDIO;
          } else {
            data = MP4.constants.HDLR_VIDEO;
          }

          return MP4.box(MP4.types.hdlr, data);
        }; // Media infomation box


        MP4.minf = function (meta) {
          var xmhd = null;

          if (meta.type === 'audio') {
            xmhd = MP4.box(MP4.types.smhd, MP4.constants.SMHD);
          } else {
            xmhd = MP4.box(MP4.types.vmhd, MP4.constants.VMHD);
          }

          return MP4.box(MP4.types.minf, xmhd, MP4.dinf(), MP4.stbl(meta));
        }; // Data infomation box


        MP4.dinf = function () {
          var result = MP4.box(MP4.types.dinf, MP4.box(MP4.types.dref, MP4.constants.DREF));
          return result;
        }; // “stbl”是mp4文件中最复杂的一个box了，也是解开mp4文件格式的主干。
        // stbl ：sample table是一个container box。
        // 其子box包括：
        //      1. stsd：sample description box，样本的描述信息。
        //      2. stts：time to sample box，sample解码时间的压缩表。
        //      3. ctts：composition time to sample box，sample的CTS与DTS的时间差的压缩表。
        //      4. stss：sync sample box，针对视频，关键帧的序号。
        //      5. stsz/stz2：sample size box，每个sample的字节大小。
        //      6. stsc：sample to chunk box，sample-chunk映射表。
        //      7. stco/co64：chunk offset box，chunk在文件中的偏移。
        // Sample table box


        MP4.stbl = function (meta) {
          var result = MP4.box(MP4.types.stbl, // type: stbl
          MP4.stsd(meta), // Sample Description Table
          MP4.box(MP4.types.stts, MP4.constants.STTS), // Time-To-Sample // 采样时间
          MP4.box(MP4.types.stsc, MP4.constants.STSC), // Sample-To-Chunk 样本区块
          MP4.box(MP4.types.stsz, MP4.constants.STSZ), // Sample size 样品大小
          MP4.box(MP4.types.stco, MP4.constants.STCO) // Chunk offset 偏移
          );
          return result;
        };

        MP4.stsdOld = function (meta) {
          return meta.type === "audio" ? MP4.box(MP4.types.stsd, MP4.constants.STSD_PREFIX, MP4.mp4a(meta)) : meta.videoType === 'avc' ? MP4.box(MP4.types.stsd, MP4.constants.STSD_PREFIX, MP4.avc1(meta)) : MP4.box(MP4.types.stsd, MP4.constants.STSD_PREFIX, MP4.hvc1(meta));
        }; // stsd：sample description box，样本的描述信息。
        // Sample description box


        MP4.stsd = function (meta) {
          if (meta.type === 'audio') {
            // else: aac -> mp4a
            return MP4.box(MP4.types.stsd, MP4.constants.STSD_PREFIX, MP4.mp4a(meta));
          } else {
            if (meta.videoType === 'avc') {
              //
              return MP4.box(MP4.types.stsd, MP4.constants.STSD_PREFIX, MP4.avc1(meta));
            } else {
              //
              return MP4.box(MP4.types.stsd, MP4.constants.STSD_PREFIX, MP4.hvc1(meta));
            }
          }
        };

        MP4.mp4a = function (meta) {
          var channelCount = meta.channelCount;
          var sampleRate = meta.audioSampleRate;
          var data = new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, channelCount, 0x00, 0x10, 0x00, 0x00, 0x00, 0x00, sampleRate >>> 8 & 0xFF, sampleRate & 0xFF, 0x00, 0x00]);
          return MP4.box(MP4.types.mp4a, data, MP4.esds(meta));
        };

        MP4.esds = function (meta) {
          var config = meta.config || [];
          var configSize = config.length;
          var data = new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x03, 0x17 + configSize, 0x00, 0x01, 0x00, 0x04, 0x0F + configSize, 0x40, 0x15, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x05 // descriptor_type
          ].concat([configSize]).concat(config).concat([0x06, 0x01, 0x02 // GASpecificConfig
          ]));
          return MP4.box(MP4.types.esds, data);
        };

        MP4.avc1 = function (meta) {
          var avcc = meta.avcc;
          var width = meta.codecWidth;
          var height = meta.codecHeight;
          var data = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, width >>> 8 & 255, width & 255, height >>> 8 & 255, height & 255, 0, 72, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 255, 255]);
          return MP4.box(MP4.types.avc1, data, MP4.box(MP4.types.avcC, avcc));
        };

        MP4.hvc1 = function (meta) {
          var avcc = meta.avcc;
          var width = meta.codecWidth;
          var height = meta.codecHeight;
          var data = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, width >>> 8 & 255, width & 255, height >>> 8 & 255, height & 255, 0, 72, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 255, 255]);
          return MP4.box(MP4.types.hvc1, data, MP4.box(MP4.types.hvcC, avcc));
        }; // Movie Extends box


        MP4.mvex = function (meta) {
          return MP4.box(MP4.types.mvex, MP4.trex(meta));
        }; // Track Extends box


        MP4.trex = function (meta) {
          var trackId = meta.id;
          var data = new Uint8Array([0x00, 0x00, 0x00, 0x00, trackId >>> 24 & 0xFF, trackId >>> 16 & 0xFF, trackId >>> 8 & 0xFF, trackId & 0xFF, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x01 // default_sample_flags
          ]);
          return MP4.box(MP4.types.trex, data);
        }; // Movie fragment box


        MP4.moof = function (track, baseMediaDecodeTime) {
          return MP4.box(MP4.types.moof, MP4.mfhd(track.sequenceNumber), MP4.traf(track, baseMediaDecodeTime));
        };

        MP4.mfhd = function (sequenceNumber) {
          var data = new Uint8Array([0x00, 0x00, 0x00, 0x00, sequenceNumber >>> 24 & 0xFF, sequenceNumber >>> 16 & 0xFF, sequenceNumber >>> 8 & 0xFF, sequenceNumber & 0xFF]);
          return MP4.box(MP4.types.mfhd, data);
        }; // Track fragment box


        MP4.traf = function (track, baseMediaDecodeTime) {
          var trackId = track.id; // Track fragment header box

          var tfhd = MP4.box(MP4.types.tfhd, new Uint8Array([0x00, 0x00, 0x00, 0x00, trackId >>> 24 & 0xFF, trackId >>> 16 & 0xFF, trackId >>> 8 & 0xFF, trackId & 0xFF])); // Track Fragment Decode Time

          var tfdt = MP4.box(MP4.types.tfdt, new Uint8Array([0x00, 0x00, 0x00, 0x00, baseMediaDecodeTime >>> 24 & 0xFF, baseMediaDecodeTime >>> 16 & 0xFF, baseMediaDecodeTime >>> 8 & 0xFF, baseMediaDecodeTime & 0xFF]));
          var sdtp = MP4.sdtp(track);
          var trun = MP4.trun(track, sdtp.byteLength + 16 + 16 + 8 + 16 + 8 + 8);
          return MP4.box(MP4.types.traf, tfhd, tfdt, trun, sdtp);
        }; // Sample Dependency Type box


        MP4.sdtpOld = function (A) {
          var e = new Uint8Array(4 + 1),
              t = A.flags;
          return e[4] = t.isLeading << 6 | t.dependsOn << 4 | t.isDependedOn << 2 | t.hasRedundancy, MP4.box(MP4.types.sdtp, e);
        };

        MP4.sdtp = function (track) {
          var data = new Uint8Array(4 + 1);
          var flags = track.flags;
          data[4] = flags.isLeading << 6 | flags.dependsOn << 4 | flags.isDependedOn << 2 | flags.hasRedundancy;
          return MP4.box(MP4.types.sdtp, data);
        };

        MP4.trun = function (track, offset) {
          var dataSize = 12 + 16;
          var data = new Uint8Array(dataSize);
          offset += 8 + dataSize;
          data.set([0x00, 0x00, 0x0F, 0x01, 0x00, 0x00, 0x00, 0x01, offset >>> 24 & 0xFF, offset >>> 16 & 0xFF, offset >>> 8 & 0xFF, offset & 0xFF], 0);
          var duration = track.duration;
          var size = track.size;
          var flags = track.flags;
          var cts = track.cts;
          data.set([duration >>> 24 & 0xFF, duration >>> 16 & 0xFF, duration >>> 8 & 0xFF, duration & 0xFF, size >>> 24 & 0xFF, size >>> 16 & 0xFF, size >>> 8 & 0xFF, size & 0xFF, flags.isLeading << 2 | flags.dependsOn, flags.isDependedOn << 6 | flags.hasRedundancy << 4 | flags.isNonSync, 0x00, 0x00, cts >>> 24 & 0xFF, cts >>> 16 & 0xFF, cts >>> 8 & 0xFF, cts & 0xFF], 12);
          return MP4.box(MP4.types.trun, data);
        }; // mdat：具体的媒体数据。


        MP4.mdat = function (data) {
          return MP4.box(MP4.types.mdat, data);
        };

        return MP4;
      }();

      MP4.init();
      var mediaUtils = {
        getVideoCodec: function (payload) {
          return payload[0] & 0x0F;
        },
        getDecodeConfiguration: function (payload, videoCodec) {
          var data = payload.slice(5);
          var config = {}; // 为了获取 config.videoType = "avc"

          if (videoCodec === 7) {
            // h264
            console.log('这个是： h264'); // config = parseAVCDecoderConfigurationRecord(data)

            config.videoType = "avc";
          }

          if (videoCodec === 12) {
            // h265
            console.log('这个是： h265');
            config.videoType = "hevc"; // config = parseHEVCDecoderConfigurationRecord(data);
          }

          return {
            id: 1,
            type: 'video',
            timescale: 1000,
            duration: 0,
            avcc: data,
            codecWidth: 704,
            codecHeight: 570,
            videoType: config.videoType
          };
        },
        _decodeVideo: function (mdatBytes, data) {
          // 需要额外加8个size
          var mdatbox = new Uint8Array(mdatBytes);
          mdatbox[0] = mdatBytes >>> 24 & 255;
          mdatbox[1] = mdatBytes >>> 16 & 255;
          mdatbox[2] = mdatBytes >>> 8 & 255;
          mdatbox[3] = mdatBytes & 255;
          mdatbox.set(MP4.types.mdat, 4);
          mdatbox.set(data, 8);
          return mdatbox;
        },

        /**
         * 跳帧
         */
        dropSourceBuffer: function ($video) {
          if ($video.buffered && $video.buffered.length > 0) {
            if ($video.buffered.end(0) - $video.currentTime > 1) {
              $video.currentTime = $video.buffered.end(0);
            }
          }
        },

        /**
         * 移除已经播放过的视频缓冲区
         *
         * @param sourceBuffer
         * @param start
         * @param end
         */
        removeBuffer: function (sourceBuffer, start, end) {
          if (sourceBuffer.updating === false) {
            try {
              sourceBuffer.remove(start, end);
            } catch (e) {
              console.error(e);
            }
          }
        },

        /**
         * 获取延迟时间
         *
         * @param self
         * @param timestamp
         */
        getDelay: function (self, timestamp) {
          if (!timestamp) {
            return -1;
          }
          /**
           * 第一个时间戳: 视频最初时间戳
           * 开始时间戳: 本地最初时间
           * 延迟: 没有
           */


          if (!self.firstTimestamp) {
            self.firstTimestamp = timestamp;
            self.startTimestamp = Date.now();
            self.delay = -1;
          } else {
            /**
             * 延迟 = (本地当前时间 - 本地最初时间) - (视频当前时间戳 - 视频最初时间戳)
             */
            if (timestamp) {
              self.delay = Date.now() - self.startTimestamp - (timestamp - self.firstTimestamp);
            }
          }

          return self.delay;
        }
      };

      var Decoder =
      /** @class */
      function (_super) {
        __extends(Decoder, _super);

        function Decoder() {
          var _this = _super.call(this) || this;

          _this.current = 0;

          _this.decodeBuffer = function () {
            var data = _this.buffers.shift();

            _this.decodeVideo(data.payload, data.ts, data.isIFrame);
          };
          /**
           * 处理 buffer
           */


          _this.disposeLoopBuffer = function () {
            var data; // console.log(this.buffers.length, this.delay);

            if (_this.buffers.length) {
              if (_this.dropping) {
                _this.droppingBuffer();
              } else {
                data = _this.buffers[0];

                if (mediaUtils.getDelay(_this, data.ts) === -1) {
                  // this.player.debug.log('common dumex', `delay is -1`);
                  _this.decodeBuffer();
                } else if (_this.delay > _this.videoBuffer + 1000) {
                  // 延迟大于1秒的时候，重置时间戳，并且跳帧
                  // this.player.debug.log('common dumex', `delay is ${this.delay}, set dropping is true`);
                  _this.resetDelay();

                  _this.dropping = true;
                } else {
                  while (_this.buffers.length) {
                    data = _this.buffers[0];

                    if (mediaUtils.getDelay(_this, data.ts) > _this.videoBuffer) {
                      // drop frame
                      _this.decodeBuffer();
                    } else {
                      if (_this.buffers.length > 10) {
                        _this.decodeBuffer();
                      } // this.player.debug.log('common dumex', `delay is ${this.delay}`);


                      break;
                    }
                  }
                }
              }
            }
          };

          _this.initialize = false;
          _this.timeInit = false;
          _this.cacheTrack = {};
          _this.buffers = [];
          _this.mediaSource = new MediaSource(); // 延迟 200 毫秒后播放

          _this.videoBuffer = 200; // 延迟

          _this.delay = -1;

          _this.bindMediaSourceEventListener();

          return _this;
        }

        Decoder.prototype.destroy = function () {
          var bufferTimer = this.insideAppendBufferTimer || this.appendBufferTimer;

          this.__mediaSourceOpen();

          this.__mediaSourceClose();

          if (this.mediaSourceOpen) {
            this.__sourceBufferError();

            this.__sourceBufferUpdateEnd();

            this.__sourceBufferUpdateStart();
          }

          if (bufferTimer) {
            window.cancelAnimationFrame(bufferTimer);
          }

          if (this.$video) {
            window.URL.revokeObjectURL(this.$video.src);
          }

          if (this.buffers.length) {
            this.buffers.length = 0;
          }

          if (this.mediaSource) {
            if (this.sourceBuffer) {
              try {
                this.mediaSource.removeSourceBuffer(this.sourceBuffer);
              } catch (error) {
                console.log(error);
              }

              this.sourceBuffer = null;
            }

            if (this.mediaSource.readyState === 'open') {
              this.mediaSource.endOfStream();
            }

            this.mediaSource = null;
          }
        };

        Decoder.prototype.setMediaSourceForVideo = function ($video) {
          this.$video = $video;
          $video.src = window.URL.createObjectURL(this.mediaSource);
        };

        Decoder.prototype.bindMediaSourceEventListener = function () {
          var _this = this;

          this.__mediaSourceOpen = listener(this.mediaSource, 'sourceopen', function () {
            _this.mediaSourceOpen = true;

            _this.emit('source:open');

            console.log('source open');

            if (!_this.sourceBuffer) {
              _this.addSourceBuffer();
            }

            _this.bindSourceBufferEventListener();
          });
          this.__mediaSourceClose = listener(this.mediaSource, 'sourceclose', function () {
            console.log('source close');

            _this.emit('source:close');
          });
        };

        Decoder.prototype.addSourceBuffer = function () {
          if (this.mediaSource.readyState === 'open') {
            this.sourceBuffer = this.mediaSource.addSourceBuffer('video/mp4; codecs="avc1.64002A"');
          } else {
            console.error('mediaSource.readyState is not open!');
          }
        };

        Decoder.prototype.bindSourceBufferEventListener = function () {
          var _this = this;

          if (!this.sourceBuffer) {
            this.emit('error:buffer not find');
            return;
          }

          this.__sourceBufferError = listener(this.sourceBuffer, 'error', function (error) {
            _this.emit('buffer:close');

            mediaUtils.dropSourceBuffer(_this.$video);
          });

          var appendBuffer = function () {
            var now = Date.now();

            if (!_this.mediaTimestamp || now - _this.mediaTimestamp > 5) {
              _this.disposeLoopBuffer(); // return;

            }

            _this.mediaTimestamp = now;
            _this.insideAppendBufferTimer = window.requestAnimationFrame(appendBuffer);
          };

          this.__sourceBufferUpdateEnd = listener(this.sourceBuffer, 'updateend', function () {
            var length = _this.buffers.length; // console.log('sourceBuffer:updateend', this.buffers);

            _this.emit('buffer:update:end');

            if (length > 100) {
              _this.dropping = true;
            }

            if (_this.insideAppendBufferTimer) {
              window.cancelAnimationFrame(_this.insideAppendBufferTimer);
            }

            _this.appendBufferTimer = window.requestAnimationFrame(appendBuffer);
          });
          this.__sourceBufferUpdateStart = listener(this.sourceBuffer, 'updatestart', function () {
            _this.emit('buffer:update:start'); // console.log('sourceBuffer:updatestart');

          });
        };

        Decoder.prototype.droppingBuffer = function () {
          if (this.dropping) {
            // this.player.debug.log('common dumex', `is dropping`);
            var data = this.buffers.shift();

            while (!data.isIFrame && this.buffers.length) {
              data = this.buffers.shift(); // type === 1 audio
              // video 则全部跳过

              if (data.type === 1 && data.payload[1] === 0) {
                this.decodeVideo(data.payload, data.ts, data.isIFrame);
              }
            } // 如果是关键帧，则播放。
            // i frame


            this.dropping = false;
            this.decodeVideo(data.payload, data.ts, data.isIFrame);
          }
        };
        /**
         * 仅用于处理第一次请求的数据
         * 内部包括各种 FMP4 的数据，解码类型等。
         *
         * @param payload
         */


        Decoder.prototype.decodeConfigurationRecord = function (payload) {
          var _this = this;
          /**
           * videoCodec: { 7: h264 | 12: h265 }
           * @type {number}
           */


          var videoCodec = mediaUtils.getVideoCodec(payload); // ftyp

          var metaBox = MP4.generateInitSegment(mediaUtils.getDecodeConfiguration(payload, videoCodec));

          if (metaBox.buffer) {
            setTimeout(function () {
              return _this.appendBuffer(metaBox.buffer);
            }, 100);
          }

          this.sequenceNumber = 0;
          this.cacheTrack = {};
          this.timeInit = false;
          this.initialize = true;
        };

        Decoder.prototype.decodeVideo = function (payload, ts, isIframe) {
          var _a;

          var arrayBuffer = payload.slice(5);
          var bytes = arrayBuffer.byteLength;
          var cts = 0;
          var dts = ts;
          var $video = this.$video;
          if (!$video) return; // 首个缓冲范围的下标是 0。
          // 用来移除已经缓冲的内容。

          if ($video.buffered.length > 1) {
            var start = $video.buffered.start(0);
            var end = $video.buffered.end(0);
            mediaUtils.removeBuffer(this.sourceBuffer, start, end); // this.timeInit = false;
          } // 如果当前帧 比缓冲区的帧 时间戳 大于 1秒，则跳帧。


          if ($video.drop && dts - ((_a = this.cacheTrack) === null || _a === void 0 ? void 0 : _a.dts) > 1000) {
            $video.drop = false;
            this.cacheTrack = {};
          } else if (this.cacheTrack && dts > this.cacheTrack.dts) {
            // 需要额外加8个size
            var mdatBytes = 8 + this.cacheTrack.size;
            var mdatbox = new Uint8Array(mdatBytes);
            mdatbox[0] = mdatBytes >>> 24 & 255;
            mdatbox[1] = mdatBytes >>> 16 & 255;
            mdatbox[2] = mdatBytes >>> 8 & 255;
            mdatbox[3] = mdatBytes & 255;
            mdatbox.set(MP4.types.mdat, 4);
            mdatbox.set(this.cacheTrack.data, 8);
            this.cacheTrack.duration = dts - this.cacheTrack.dts; // moof

            var moofbox = MP4.moof(this.cacheTrack, this.cacheTrack.dts);
            var result = new Uint8Array(moofbox.byteLength + mdatbox.byteLength);
            result.set(moofbox, 0);
            result.set(mdatbox, moofbox.byteLength); // appendBuffer

            if (result.buffer) {
              this.appendBuffer(result.buffer); // console.log('appendBuffer:decodeVideo');
            }
          } else {
            // !!! 不会走到这里 !!!
            // player.debug.log('MediaSource', 'timeInit set false , cacheTrack = {}');
            // this.timeInit = false;
            this.cacheTrack = {};
          }

          this.cacheTrack.id = 1;
          this.cacheTrack.sequenceNumber = ++this.sequenceNumber;
          this.cacheTrack.size = bytes;
          this.cacheTrack.dts = dts;
          this.cacheTrack.cts = cts;
          this.cacheTrack.isKeyframe = isIframe;
          this.cacheTrack.data = arrayBuffer; //

          this.cacheTrack.flags = {
            isLeading: 0,
            dependsOn: isIframe ? 2 : 1,
            isDependedOn: isIframe ? 1 : 0,
            hasRedundancy: 0,
            isNonSync: isIframe ? 0 : 1
          }; //

          if (!this.timeInit && $video.buffered.length === 1) {
            // player.debug.log('MediaSource', 'timeInit set true');
            this.timeInit = true;
            $video.currentTime = $video.buffered.end(0);
          }
        };

        Decoder.prototype.resetDelay = function () {
          this.firstTimestamp = null;
          this.startTimestamp = null;
          this.delay = -1;
          this.dropping = false;
        };

        Decoder.prototype.getDelay = function (timestamp) {
          if (!timestamp) {
            return -1;
          }
          /**
           * 第一个时间戳: 视频最初时间戳
           * 开始时间戳: 本地最初时间
           * 延迟: 没有
           */


          if (!this.firstTimestamp) {
            this.firstTimestamp = timestamp;
            this.startTimestamp = Date.now();
            this.delay = -1;
          } else {
            /**
             * 延迟 = (本地当前时间 - 本地最初时间) - (视频当前时间戳 - 视频最初时间戳)
             */
            if (timestamp) {
              this.delay = Date.now() - this.startTimestamp - (timestamp - this.firstTimestamp);
            }
          }

          return this.delay;
        };

        Decoder.prototype.appendBuffer = function (buffer) {
          var readyState = this.mediaSource.readyState;

          if (!this.sourceBuffer) {
            this.emit('error:buffer:undefined', {
              code: 5555,
              message: 'sourceBuffer 不存在！'
            });
            return;
          } // console.log(this.mediaSource.readyState);


          if (readyState === 'closed') {
            this.emit('error', {
              code: 5555,
              message: 'mediaSource is not attached to video or mediaSource is closed'
            });
          } else if (readyState === 'end') {
            this.emit('error', {
              code: 5555,
              message: 'mediaSource is closed'
            });
          } else if (this.sourceBuffer.updating === true) {
            // 上一块数据还在添加中
            mediaUtils.dropSourceBuffer(this.$video);
          } else {
            if (this.sourceBuffer.updating === false && this.mediaSource.readyState === 'open') {
              try {
                this.sourceBuffer.appendBuffer(buffer);
              } catch (error) {
                // console.error('error: => ', error);
                this.emit('error:buffer', {
                  code: 5555,
                  message: error
                });
              }

              return;
            }
          }
        };

        return Decoder;
      }(EventEmitter);

      var Stream =
      /** @class */
      function (_super) {
        __extends(Stream, _super);

        function
          /*{ origin }*/
        Stream() {
          var _this = _super.call(this) || this;

          _this.onPageVisibilityChange = function () {
            console.log("========= |||   " + document.visibilityState + "   |||============");

            try {
              if (document.visibilityState === 'visible') {
                _this.restartStream();
              } else {
                _this.destroyStream();
              }
            } catch (error) {
              console.log(error);
            }
          };

          _this.play = function (url, $video) {
            _this.url = url;
            _this.$video = $video;

            if (_this.decoder) {
              _this.decoder.setMediaSourceForVideo($video);
            }

            var playPromise = $video.play();

            if (playPromise !== undefined) {
              playPromise.catch(function (error) {
                return console.log(error);
              }).finally(function () {
                return $video.play();
              });
            }
          };

          _this.onMediaSourceOpen = function () {
            try {
              _this.socket = new WebSocket(_this.url);
              _this.socket.binaryType = 'arraybuffer';

              _this.bindSocketListener();
            } catch (error) {
              _this.onSocketError(error);
            } finally {}
          };

          _this.onSourceBufferNotFind = function (error) {
            // this.destroy();
            // this.$video.parentNode.removeChild(this.$video);
            console.log('error:buffer:undefined:destroy', error);
          };

          _this.restartStream = function () {
            _this.decoder = new Decoder();

            _this.bindDecoderEventListener();

            var delay = ~~(Math.random() * 10 / 2);
            console.log('----------play------------', delay);
            setTimeout(function () {
              return _this.play(_this.url, _this.$video);
            }, 1000 * delay);
          };

          _this.onSourceBufferError = function (error) {
            if (_this.restart) {
              _this.destroyStream();

              setTimeout(_this.restartStream, 1000); // console.log('error:buffer:restart', error);
            } else {
              _this.destroy();

              _this.$video.parentNode.removeChild(_this.$video);

              console.log('error:buffer:destroy', error);
            }
          };

          _this.onSocketOpen = function () {
            // setTimeout(() => this.disposeLoopBuffer(), 20);
            console.log('socket opened!');
          };

          _this.onSocketMessage = function (message) {
            return __awaiter(_this, void 0, void 0, function () {
              var dv, type, ts, payload, isIframe;
              return __generator(this, function (_a) {
                dv = new DataView(message.data);
                type = dv.getUint8(0);
                ts = dv.getUint32(1, false);

                if (dv.byteLength > 5) {
                  payload = new Uint8Array(message.data, 5);
                  isIframe = dv.getUint8(5) >> 4 === 1;

                  if (payload.byteLength > 0 && this.decoder) {
                    if (this.decoder.initialize) {
                      /**
                       * payload 当前帧的数据
                       * type video | audio
                       * ts 每次 +30
                       * isIframe true | false
                       */
                      this.decoder.buffers.push({
                        payload: payload,
                        ts: ts,
                        type: type,
                        isIFrame: isIframe
                      });
                    } else {
                      this.decoder.decodeConfigurationRecord(payload);
                    }
                  }
                }

                return [2
                /*return*/
                ];
              });
            });
          }; // this.origin = origin;


          _this.restart = true;
          _this.decoder = new Decoder();

          _this.bindDecoderEventListener();

          _this.bindEvent();

          return _this;
        }

        Stream.prototype.bindEvent = function () {
          this.visibilityChange = listener(document, 'visibilitychange', this.onPageVisibilityChange);
        };

        Stream.prototype.bindDecoderEventListener = function () {
          this.decoder.on('source:open', this.onMediaSourceOpen);
          this.decoder.on('error:buffer', this.onSourceBufferError);
          this.decoder.on('error:buffer:undefined', this.onSourceBufferNotFind);
        };

        Stream.prototype.bindSocketListener = function () {
          if (this.socket) {
            this.__socketOpen = listener(this.socket, 'open', this.onSocketOpen);
            this.__socketMessage = listener(this.socket, 'message', this.onSocketMessage);
            this.__socketError = listener(this.socket, 'error', this.onSocketError);
          }
        };

        Stream.prototype.onSocketError = function (error) {
          console.error(error);
        };

        Stream.prototype.destroyStream = function () {
          if (this.socket) {
            this.__socketOpen();

            this.__socketMessage();

            this.__socketError();

            this.socket.close();
            this.socket = null;
          }

          if (this.decoder) {
            this.decoder.off();
            this.decoder.destroy();
            this.decoder = null;
          }

          if (this.$video) {
            window.URL.revokeObjectURL(this.$video.src);
            this.$video.src = '';
            this.$video.load();
            this.$video.pause();
          }
        };

        Stream.prototype.destroy = function () {
          this.destroyStream();

          if (this.visibilityChange) {
            this.visibilityChange();
            this.visibilityChange = null;
          }
        };

        return Stream;
      }(EventEmitter);

      function assembleUrl$1(url, origin) {
        if (url.startsWith('ws:')) {
          return url;
        } else {
          if (origin) {
            if (origin.startsWith('ws:')) {
              return "ws://" + origin + "/jessica/" + url;
            } else {
              return "ws://" + origin + "/jessica/" + url;
            }
          }

          if (!origin) {
            console.error('options.origin is not find!');
          }
        }
      }

      var Fmp4Player =
      /** @class */
      function (_super) {
        __extends(Fmp4Player, _super);

        function Fmp4Player(sullivan) {
          var _this = _super.call(this) || this;

          _this.play = function (url) {
            var options = _this.sullivan.options;
            var $video = _this.__$oldVideo = _this.$video;
            _this.url = assembleUrl$1(url, options.origin);

            _this.video.appendMediaElement($video);

            _this.player.set($video, new Stream());

            _this.player.get($video).play(_this.url, $video);

            _this.__reCreateVideoTimer = setTimeout(_this.reCreateVideo, options.timeRefresh);
          };

          _this.clearReCreateTimer = function () {
            if (_this.__reCreateVideoTimer) {
              clearTimeout(_this.__reCreateVideoTimer);
              _this.__reCreateVideoTimer = null;
            }
          };

          _this.clearRemoveOldVideoTimer = function () {
            if (_this.__removeOldVideoTimer) {
              clearTimeout(_this.__removeOldVideoTimer);
              _this.__removeOldVideoTimer = null;
            }
          };

          _this.removeOldVideo = function () {
            if (_this.player.has(_this.__$oldVideo)) {
              _this.player.get(_this.__$oldVideo).destroy();

              _this.player.delete(_this.__$oldVideo);
            }

            _this.video.removeVideo(_this.__$oldVideo);

            _this.clearRemoveOldVideoTimer();

            _this.__$oldVideo = _this.$video;
          };

          _this.reCreateVideo = function () {
            var options = _this.sullivan.options;
            _this.$video = _this.video.createVideo();

            _this.clearReCreateTimer();

            _this.__removeOldVideoTimer = setTimeout(_this.removeOldVideo, 1000);

            _this.video.appendMediaElement(_this.$video);

            _this.player.set(_this.$video, new Stream());

            _this.player.get(_this.$video).play(_this.url, _this.$video);

            _this.__reCreateVideoTimer = setTimeout(_this.reCreateVideo, options.timeRefresh);
          };

          _this.sullivan = sullivan;
          _this.video = sullivan.video;
          _this.$video = sullivan.video.$video;
          _this.player = new WeakMap();
          return _this;
        }

        Fmp4Player.prototype.destroy = function () {
          this.clearReCreateTimer();
          this.clearRemoveOldVideoTimer();
          var $video = this.$video;
          var stream = this.player.get($video);

          if (stream) {
            stream.destroy();
            this.player.delete($video);
          }

          this.video.removeVideo($video);
        };

        return Fmp4Player;
      }(EventEmitter);

      function webRTCErrorHandle(peerConnection, callbacks, noop) {
        if (callbacks === void 0) {
          callbacks = {};
        }

        if (noop === void 0) {
          noop = function () {};
        }

        var _a = callbacks.iceCandidateError,
            iceCandidateError = _a === void 0 ? noop : _a,
            _b = callbacks.connectionStateFailed,
            connectionStateFailed = _b === void 0 ? noop : _b,
            _c = callbacks.iceConnectionStateFailed,
            iceConnectionStateFailed = _c === void 0 ? noop : _c,
            _d = callbacks.framesDroppedFailed,
            framesDroppedFailed = _d === void 0 ? noop : _d;
        var timer;
        /**
        * 当 ICE 候选人收集过程中发生错误时，将触发此事件。
        * errorCode: {
        *     300 ~ 699:
        *     700 ~ 799: 无法连接到服务器；提供了特定的错误号，但尚未指定这些错误号。
        * }
        * @param error
        */

        function icecandidateerror(error) {
          return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
              iceCandidateError(error);
              console.error("iceError: => { \n  errorText: " + error.errorText + ", \n  errorCode: " + error.errorCode + " \n}");
              return [2
              /*return*/
              ];
            });
          });
        }

        peerConnection.addEventListener('icecandidateerror', icecandidateerror);
        /**
         * 1. new:
         *    至少在连接的一ICE传输（RTCIceTransport或RTCDtlsTransport对象）是在new状态，
         *    他们都不是在以下状态之一： connecting，checking，failed，disconnected，或所有连接的传输都在closed状态。
         *
         * 2. connecting:
         *    一个或多个ICE传输当前正在建立连接；
         *    也就是说，它们iceConnectionState是checking或connected，并且该failed状态下没有传输。
         *
         * 3. connected:
         *    连接使用的 每个ICE传输要么正在使用（状态connected或completed），
         *    要么已关闭（状态closed）；
         *    此外，至少一种传输方式是connected或completed。
         *
         * 4. disconnected:
         *    至少之一ICE传输用于连接处于disconnected状态并且没有其他传输的处于状态 failed，connecting或checking。
         *
         * 5. failed:
         *    连接上的 一个或多个ICE传输处于该failed状态。
         *
         * 6. closed:
         *    将RTCPeerConnection被关闭。
         */

        function connectionstatechange() {
          return __awaiter(this, void 0, void 0, function () {
            var connectionState;
            return __generator(this, function (_a) {
              connectionState = this.connectionState;
              console.debug('connection: => ' + JSON.stringify(connectionState, null, 2));

              if (connectionState === 'failed') {
                connectionStateFailed();
                this.restartIce();
              }

              return [2
              /*return*/
              ];
            });
          });
        }

        peerConnection.addEventListener('connectionstatechange', connectionstatechange);
        /**
         * 获取远端 Ice 状态
         * 1. new:
         *    ICE 代理正在收集地址或等待通过调用RTCPeerConnection.addIceCandidate()（或两者）获得远程候选人。
         *
         * 2. checking:
         *    ICE 代理已获得一个或多个远程候选者，并且正在检查一对本地和远程候选者，以尝试找到兼容的匹配项，
         *    但尚未找到允许建立对等连接的对。候选人的收集可能仍在进行中。
         *
         * 3. connected:
         *    已为连接的所有组件找到可用的本地和远程候选配对，并且已建立连接。
         *    收集可能仍在进行中，也可能 ICE 代理仍在检查候选人以寻找更好的连接使用。
         *
         * 4. completed:
         *    ICE 代理已经完成了候选人的收集，已经检查了所有对，并找到了所有组件的连接。
         *
         * 5. failed:
         *    ICE 候选者已将所有候选者对相互检查，但未能为连接的所有组件找到兼容的匹配项。
         *    但是，ICE 代理可能确实为某些组件找到了兼容的连接。
         *
         * 6. disconnected:
         *    检查以确保组件仍然连接失败的RTCPeerConnection. 这是一个较不严格的测试，
         *    failed 并且可能会间歇性触发并在不太可靠的网络上或在临时断开连接期间自发解决。
         *    问题解决后，连接可能会返回到该connected状态。
         *
         * 7. closed:
         *    ICE 代理RTCPeerConnection已关闭，不再处理请求。
         */

        function iceconnectionstatechange() {
          return __awaiter(this, void 0, void 0, function () {
            var iceConnectionState;
            return __generator(this, function (_a) {
              iceConnectionState = peerConnection.iceConnectionState;
              console.debug('iceConnection: => ' + JSON.stringify(iceConnectionState, null, 2));

              if (iceConnectionState === 'failed') {
                iceConnectionStateFailed();
                /*const offer = await peer.createOffer({iceRestart: true });
                logger.log('offer', offer);
                onOfferPresenter(null, offer.sdp);*/
              }

              return [2
              /*return*/
              ];
            });
          });
        }

        peerConnection.addEventListener('iceconnectionstatechange', iceconnectionstatechange);
        /**
         * 检测本地 Ice 状态
         * 1. new:
         *    对等连接刚刚创建，尚未完成任何联网。
         *
         * 2. gathering:
         *    ICE 代理正在为连接收集候选人。
         *
         * 3. complete:
         *    ICE 特工已经完成了候选人的收集。
         *    如果发生需要收集新候选者的事情，例如添加新接口或添加新 ICE 服务器，则状态将恢复gathering为收集这些候选者。
         */

        function icegatheringstatechange() {
          return __awaiter(this, void 0, void 0, function () {
            var iceGatheringState, label;
            return __generator(this, function (_a) {
              iceGatheringState = this.iceGatheringState;
              label = "Unknown";

              switch (iceGatheringState) {
                case "new":
                case "complete":
                  label = "Idle";
                  break;

                case "gathering":
                  label = "Determining route";
                  break;
              }

              console.debug('iceGathering: => ' + label);
              return [2
              /*return*/
              ];
            });
          });
        }

        peerConnection.addEventListener('icegatheringstatechange', icegatheringstatechange);
        /**
         * 1. stable:
         *    没有正在进行的 SDP 交换。
         *    这种情况出现在：
         *      1） RTCPeerConnection 刚刚创建，还没有开始 SDP 交换；这可能意味着RTCPeerConnection对象是新的，在这种情况下localDescription 和remoteDescription 都是null;
         *      2） 协商已经完成，连接成功建立。协商完成并建立了连接。
         *
         * 2. have-local-offer:
         *    本地peer调用了RTCPeerConnection.setLocalDescription()，
         *    传入代表offer的SDP（通常是调用创建的RTCPeerConnection.createOffer()），
         *    offer申请成功。
         *
         * 3. have-remote-offer:
         *    收到了对等端的提案，并成功调用了 setRemoteDescription() 方法。
         *    远程对等点创建了一个提议并使用信令服务器将其传递给本地对等点，
         *    本地对等点通过调用将提议设置为远程描述RTCPeerConnection.setRemoteDescription()。
         *
         * 4. have-local-pranswer:
         *    远程对等方发送的提议已被应用，
         *    并且已创建答案（通常通过调用RTCPeerConnection.createAnswer()）
         *    并通过调用应用RTCPeerConnection.setLocalDescription()。此临时答案描述了支持的媒体格式等，
         *    但可能没有包含完整的 ICE 候选集。更多的候选人将在稍后单独交付。
         *
         * 5. have-remote-pranswer:
         *    已收到并成功应用临时答复，以响应先前通过调用发送和建立的提议setLocalDescription()。
         *
         * 6. closed:
         *    在RTCPeerConnection已被关闭。
         */

        function signalingstatechange() {
          return __awaiter(this, void 0, void 0, function () {
            var signalingState;
            return __generator(this, function (_a) {
              signalingState = this.signalingState;
              console.debug('signaling: => ' + JSON.stringify(signalingState, null, 2));
              return [2
              /*return*/
              ];
            });
          });
        }

        peerConnection.addEventListener('signalingstatechange', signalingstatechange); // 获取数据统计

        var restartLength = 0;

        function getStats() {
          return __awaiter(this, void 0, void 0, function () {
            var rtpVideoReceiver, rtpVideoSender, receiveVideoStats, sendVideoStats;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  clearInterval(timer);
                  peerConnection.getStats(null).then(function (statsReport) {
                    statsReport.forEach(function (report) {// console.log('statsReport: => ', report)
                    });
                  });
                  rtpVideoReceiver = peerConnection.getReceivers().find(function (receive) {
                    return receive.track && receive.track.kind === 'video';
                  });
                  rtpVideoSender = peerConnection.getSenders().find(function (receive) {
                    return receive.track && receive.track.kind === 'video';
                  });
                  if (!rtpVideoReceiver) return [3
                  /*break*/
                  , 2];
                  return [4
                  /*yield*/
                  , rtpVideoReceiver.getStats()];

                case 1:
                  receiveVideoStats = _a.sent();
                  receiveVideoStats.forEach(function (report) {
                    // console.log('receiveVideoStats: => ', report)
                    if (report.type === 'track') ;

                    if (report.type === 'inbound-rtp') {
                      report.framesDecoded;
                      report.framesDropped;
                      var framesPerSecond = report.framesPerSecond;
                      report.framesReceived;

                      if (!framesPerSecond) {
                        if (restartLength > 6) {
                          framesDroppedFailed();
                        }

                        restartLength++;
                      } // console.log('inbound-rtp: => ', { framesDecoded, framesDropped, framesPerSecond, framesReceived })

                    }
                  });
                  _a.label = 2;

                case 2:
                  if (!rtpVideoSender) return [3
                  /*break*/
                  , 4];
                  return [4
                  /*yield*/
                  , rtpVideoSender.getStats()];

                case 3:
                  sendVideoStats = _a.sent();
                  sendVideoStats.forEach(function (report) {// console.log('sendVideoStats: => ', report)
                  });
                  _a.label = 4;

                case 4:
                  return [2
                  /*return*/
                  ];
              }
            });
          });
        } // setInterval(getStats, 6000)
        // setTimeout(getStats, 2000)


        timer = setInterval(getStats, 1000);
        return function () {
          clearInterval(timer);
          console.log('------------ destroy error -------------');
          peerConnection.removeEventListener('icecandidateerror', icecandidateerror);
          peerConnection.removeEventListener('connectionstatechange', connectionstatechange);
          peerConnection.removeEventListener('iceconnectionstatechange', iceconnectionstatechange);
          peerConnection.removeEventListener('icegatheringstatechange', icegatheringstatechange);
          peerConnection.removeEventListener('signalingstatechange', signalingstatechange);
          peerConnection = null;
          timer = undefined;
        };
      }

      function WebRtcPeerRecvOnly(option) {
        this.pc = new RTCPeerConnection(option);
        this.time = {
          // 开始时间
          __start: Date.now(),
          // 持续时间
          __duration: null,
          // 1小时
          __interval: 1000 * 60 * 60,
          // 上次清理的时间
          __prevClear: null
        };
        this.pc.addTransceiver('video', {
          direction: 'recvonly'
        });
      }

      WebRtcPeerRecvOnly.prototype.generateOffer = function generateOffer(option, callback) {
        return __awaiter(this, void 0, void 0, function () {
          var _a, _b;

          return __generator(this, function (_c) {
            switch (_c.label) {
              case 0:
                if (typeof option === 'function') {
                  callback = option;
                  option = undefined;
                }

                _b = (_a = this.pc).setLocalDescription;
                return [4
                /*yield*/
                , this.pc.createOffer(option)];

              case 1:
                return [4
                /*yield*/
                , _b.apply(_a, [_c.sent()])];

              case 2:
                _c.sent();

                if (callback) {
                  callback(this.pc.localDescription);
                }

                return [2
                /*return*/
                , this.pc.localDescription];
            }
          });
        });
      };

      WebRtcPeerRecvOnly.prototype.processAnswer = function processAnswer(sdp, callback) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                if (typeof sdp === 'string') {
                  sdp = {
                    sdp: sdp
                  };
                }

                if (!sdp.sdp) {
                  throw new Error('sdp 不能为空！');
                }

                return [4
                /*yield*/
                , this.pc.setRemoteDescription(new RTCSessionDescription(sdp))];

              case 1:
                _a.sent();

                if (callback) {
                  callback(true);
                }

                return [2
                /*return*/
                , true];
            }
          });
        });
      };

      WebRtcPeerRecvOnly.prototype.destroy = function () {
        this.pc.setLocalDescription(new RTCSessionDescription({
          type: 'answer',
          sdp: 'v=0\r\no=- 5707285685601897608 1648465828 IN IP4 0.0.0.0\r\ns=-\r\nt=0 0\r\na=end-of-candidates\r\n'
        }));
        this.pc.setRemoteDescription(new RTCSessionDescription({
          type: 'answer',
          sdp: 'v=0\r\no=- 5707285685601897608 1648465828 IN IP4 0.0.0.0\r\ns=-\r\nt=0 0\r\na=end-of-candidates\r\n'
        })); // this.pc.restartIce();

        this.pc.close();
        this.pc.ontrack = null;
        this.pc.onicecandidate = null;
        this.pc = false;
        this.pc = null;
      };
      /**
       * webrtc url 配置方式
       *
       * const sullivan = new Sullivan({ origin: '192.168.1.70:8081', useWebRTC: false });
       *
       * 1. sullivan.play('rtmp://192.168.1.70:1935/34020000001420000123/34020000001320000001');
       * 2. sullivan.play('streamPath=34020000001420000123/34020000001320000001');
       * 3. sullivan.play('34020000001420000123/34020000001320000001');
       *
       * @param path
       */


      function assembleUrl(path) {
        var origin = window.location.origin;

        try {
          if (path.indexOf('webrtc/play') > -1) {
            return path;
          }

          if (path.startsWith('streamPath')) {
            return origin + "/webrtc-api/webrtc/play?" + path;
          }

          return origin + "/webrtc-api/webrtc/play?streamPath=" + path;
        } catch (error) {
          console.error("play url(" + path + ") is not full path!");
        }
      }
      /**
       *
       * @param url
       * @param sdp
       */


      function fetchStream(url, sdp) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            if (!sdp) {
              console.error('sdp is error!');
            }

            return [2
            /*return*/
            , fetch(url, {
              method: "POST",
              body: JSON.stringify(sdp),
              headers: {
                'Content-Type': 'application/json;charset=UTF-8'
              }
            }).then(function (res) {
              return res.json();
            })];
          });
        });
      }

      var map = new WeakMap();

      function createWebRTC(sullivan) {
        var $videoWrap = sullivan.video.$videoWrap;
        var __TimerWebRTC = null;
        var __deleteWebRTCTimer = null;
        var __url = null; // 先将dom节点备份，所有实例都关联在 video dom 上

        sullivan.video.__$oldVideo = sullivan.video.$video; // 当dom 被卸载，则实例销毁。

        map.set(sullivan.video.$video, new WebRtcPeerRecvOnly());
        sullivan.video.$video.withError = withError(map.get(sullivan.video.$video));

        function withError(webrtc) {
          return webRTCErrorHandle(webrtc.pc, {
            connectionStateFailed: function () {
              // this.root.status.loading = true;
              resetWebRTC();
            },
            framesDroppedFailed: function () {
              // this.root.status.loading = true;
              resetWebRTC();
            }
          });
        }

        function play(url) {
          return __awaiter(this, void 0, void 0, function () {
            var _a, e_1;

            return __generator(this, function (_b) {
              switch (_b.label) {
                case 0:
                  __url = assembleUrl(url);
                  _b.label = 1;

                case 1:
                  _b.trys.push([1, 4,, 5]);

                  map.get(sullivan.video.$video).pc.ontrack = function (event) {
                    return ontrack(event, sullivan.video.$video);
                  };

                  return [4
                  /*yield*/
                  , fetchRemoteSDP(map.get(sullivan.video.$video))];

                case 2:
                  _b.sent();

                  _a = setTimeout;
                  return [4
                  /*yield*/
                  , resetWebRTC];

                case 3:
                  __TimerWebRTC = _a.apply(void 0, [_b.sent(), sullivan.options.timeRefresh]);
                  return [3
                  /*break*/
                  , 5];

                case 4:
                  e_1 = _b.sent();
                  console.log(e_1);
                  return [3
                  /*break*/
                  , 5];

                case 5:
                  return [2
                  /*return*/
                  ];
              }
            });
          });
        }

        var deleteOldWebRTCPlayer = function () {
          var _a = sullivan.video,
              __$oldVideo = _a.__$oldVideo,
              $video = _a.$video;
          clearTimeout(__deleteWebRTCTimer);

          if (__$oldVideo) {
            __$oldVideo.withError();

            if (map.has(__$oldVideo)) {
              __$oldVideo.srcObject.getTracks().forEach(function (track) {
                return track.stop();
              });

              map.get(__$oldVideo).destroy();
              map.delete(__$oldVideo);
            }

            __$oldVideo.srcObject = undefined;
            __$oldVideo.src = '';

            __$oldVideo.load();

            $videoWrap.removeChild(__$oldVideo);
          }

          sullivan.video.__$oldVideo = $video;
          __deleteWebRTCTimer = null;
        };

        function resetWebRTC() {
          return __awaiter(this, void 0, void 0, function () {
            var _a, __$oldVideo, $video, e_2;

            return __generator(this, function (_b) {
              switch (_b.label) {
                case 0:
                  _a = sullivan.video, __$oldVideo = _a.__$oldVideo, $video = _a.$video;
                  __deleteWebRTCTimer = setTimeout(deleteOldWebRTCPlayer, 1000);
                  _b.label = 1;

                case 1:
                  _b.trys.push([1, 3,, 4]);

                  clearTimeout(__TimerWebRTC);

                  if (map.has($video)) {
                    map.set(__$oldVideo, map.get($video));
                  } // 创建新 video


                  $video = sullivan.video.createVideo();
                  map.set(sullivan.video.$video, new WebRtcPeerRecvOnly());
                  sullivan.video.$video.withError = withError(map.get($video));

                  map.get($video).pc.ontrack = function (event) {
                    return ontrack(event, $video);
                  };

                  return [4
                  /*yield*/
                  , fetchRemoteSDP(map.get($video))];

                case 2:
                  _b.sent();

                  __TimerWebRTC = setTimeout(resetWebRTC, sullivan.options.timeRefresh);
                  return [3
                  /*break*/
                  , 4];

                case 3:
                  e_2 = _b.sent();
                  console.log(e_2);
                  return [3
                  /*break*/
                  , 4];

                case 4:
                  return [2
                  /*return*/
                  ];
              }
            });
          });
        }

        var ontrack = function (event, $video) {
          if (event.track.kind === "video") {
            appendChild($videoWrap, $video); // console.log($videoWrap, $video);

            $video.srcObject = event.streams[0];
            $video.play();
            $video = null; // if (!this.root.status.playing) {
            //   this.root.status.playing = true;
            // }
          }
        };

        function fetchRemoteSDP(webRTC) {
          return __awaiter(this, void 0, void 0, function () {
            var _this = this;

            return __generator(this, function (_a) {
              return [2
              /*return*/
              , new Promise(function (resolve, reject) {
                if (webRTC) {
                  webRTC.generateOffer(function (sdp) {
                    return __awaiter(_this, void 0, void 0, function () {
                      var result, e_3;

                      var _this = this;

                      return __generator(this, function (_a) {
                        switch (_a.label) {
                          case 0:
                            _a.trys.push([0, 5,, 6]);

                            return [4
                            /*yield*/
                            , fetchStream(__url, sdp)];

                          case 1:
                            result = _a.sent();
                            if (!result.errmsg) return [3
                            /*break*/
                            , 2];
                            console.error(result.errmsg); // this.root.emit('connect:error', {code: 5015, errorMsg: 'stream not found!'});

                            destroy();
                            sullivan.emit('error', result);
                            resolve(result);
                            return [3
                            /*break*/
                            , 4];

                          case 2:
                            return [4
                            /*yield*/
                            , webRTC.pc.setRemoteDescription(new RTCSessionDescription(result))];

                          case 3:
                            _a.sent();

                            resolve(result);
                            _a.label = 4;

                          case 4:
                            // this.root.status.loading = false;
                            result = null;
                            webRTC = null;
                            return [3
                            /*break*/
                            , 6];

                          case 5:
                            e_3 = _a.sent();

                            if (webRTC === null || webRTC === void 0 ? void 0 : webRTC.restartTimer) {
                              clearTimeout(webRTC.restartTimer);
                              webRTC.restartTimer = null;
                            }

                            console.error(e_3);
                            webRTC.restartTimer = setTimeout(function () {
                              return __awaiter(_this, void 0, void 0, function () {
                                var result;
                                return __generator(this, function (_a) {
                                  switch (_a.label) {
                                    case 0:
                                      return [4
                                      /*yield*/
                                      , fetchRemoteSDP(webRTC)];

                                    case 1:
                                      result = _a.sent();
                                      resolve(result);
                                      clearTimeout(webRTC.restartTimer);
                                      return [2
                                      /*return*/
                                      ];
                                  }
                                });
                              });
                            }, 1000);
                            return [3
                            /*break*/
                            , 6];

                          case 6:
                            return [2
                            /*return*/
                            ];
                        }
                      });
                    });
                  });
                } else {
                  reject();
                }
              })];
            });
          });
        }

        function destroy() {
          var __$oldVideo = sullivan.video.__$oldVideo;
          clearTimeout(__deleteWebRTCTimer);
          sullivan.video.__$oldVideo.srcObject = undefined;
          __$oldVideo.src = '';

          __$oldVideo.load(); // 把上一个卸载了。


          if (__$oldVideo) {
            console.log(__$oldVideo); // if (video && video.destroy) {
            //   video.destroy()
            // }

            if (map.has(__$oldVideo)) {
              map.get(__$oldVideo).destroy();
              map.delete(__$oldVideo);
            }
          }
        }

        return {
          play: play,
          destroy: destroy
        };
      }

      var Sullivan =
      /** @class */
      function (_super) {
        __extends(Sullivan, _super);

        function Sullivan(options) {
          var _this = _super.call(this) || this;

          _this.resize = function () {
            if (_this.video && typeof _this.video.resize === 'function') {
              setTimeout(_this.video.resize, 200);
            }
          };

          _this.options = options;
          _this.map = new WeakMap();
          _this.status = {
            loading: true,
            playing: true
          };

          _this.initSullivan();

          return _this;
        }

        Sullivan.prototype.initSullivan = function () {
          var useWebRTC = this.options.useWebRTC;
          this.video = new Video(this);

          if (useWebRTC) {
            this.map.set(this.video, createWebRTC(this));
          } else {
            this.map.set(this.video, new Fmp4Player(this));
          }
        };

        Sullivan.prototype.play = function (url, cache) {
          var player = this.map.get(this.video);
          this.__cache = cache;
          player.play(url);
        };

        Sullivan.prototype.destroy = function () {
          if (this.video) {
            var player = this.map.get(this.video);
            this.video.$video.src = '';
            this.video.destroy();
            this.map.delete(this.video);

            if (player) {
              player.destroy();
            }

            this.video = null;
          }
        };

        return Sullivan;
      }(EventEmitter);

      return Sullivan;
    });
  });
  var Sullivan = unwrapExports(lib);

  function getKey() {
    return parseInt('' + Math.random() * Math.pow(10, 6)) + '-' + Date.now();
  }

  var SullivanVideo = /*#__PURE__*/function (_Component) {
    _inherits(SullivanVideo, _Component);

    var _super = _createSuper(SullivanVideo);

    function SullivanVideo(props) {
      var _this;

      _classCallCheck(this, SullivanVideo);

      _this = _super.call(this, props);
      _this.state = {
        containerRef: /*#__PURE__*/React__default["default"].createRef(),
        size: {
          width: undefined,
          height: undefined
        },
        error: false
      };
      _this.resizeHandle = _this.resizeHandle.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(SullivanVideo, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        var data = this.props.data;
        setTimeout(this.resizeHandle, 200);

        if (data && data.url) {
          this.setPlayingVideo(data);
        } // 捕获错误


        window.onerror = function (msg) {
          return _this2.err = msg;
        };

        window.addEventListener('resize', this.resizeHandle);
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        var data = this.props.data; // console.log(sullivan)

        if (prevProps.data && prevProps.data.url !== data.url) {
          this.setPlayingVideo(data);
        }
      }
    }, {
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
        var data = this.props.data;

        if (!data || nextProps.data !== data) {
          return true;
        }

        return nextProps.data.url !== data.url || nextState.error !== this.state.error;
      }
    }, {
      key: "componentDidUnMounted",
      value: function componentDidUnMounted() {
        if (this.sullivan) {
          this.sullivan.destroy();
        }

        window.removeEventListener('resize', this.resizeHandle);
      }
    }, {
      key: "resizeHandle",
      value: function resizeHandle() {
        var _this$props = this.props,
            style = _this$props.style,
            onResize = _this$props.onResize;
        style = container.getStyleSize(style); // 获取视频区域大小

        var _container$getContain = container.getContainerSize(CONTAINER_ID),
            width = _container$getContain.width,
            height = _container$getContain.height; // 计算一下，如果差距太大，就不使用传进来的。


        if (style.width && Math.abs(width - style.width) < 10) {
          var _style = style;
          width = _style.width;
          height = _style.height;
        } // console.log('style', style, width, height);


        this.setState({
          size: {
            width: width,
            height: height
          }
        });
        onResize && onResize({
          width: width,
          height: height
        });
      }
      /**
       * 拖拽中
       *
       * @param event
       */

    }, {
      key: "onDragOver",
      value: function onDragOver(event) {
        console.log('拖拽中');
        event.stopPropagation();
        event.preventDefault();
      }
      /**
       * 拖拽结束
       *
       * @param event
       * @param activated
       */

    }, {
      key: "onDrop",
      value: function onDrop(event, activated) {
        var logger = this.props.logger;
        event.stopPropagation();
        logger && logger('拖拽结束');

        if (event.dataTransfer) {
          var _event$dataTransfer;

          var video = (_event$dataTransfer = event.dataTransfer) === null || _event$dataTransfer === void 0 ? void 0 : _event$dataTransfer.getData('video:url');

          if (typeof video === 'string' && video.startsWith('{')) {
            video = JSON.parse(video);
          }

          if (!(video = this.getSendData(video))) {
            return;
          }

          this.create(video);
        }
      }
      /**
       * 创建视频播放器
       *
       * @param video { HTMLElement }
       * @param options { object }
       * @returns {Sullivan}
       */

    }, {
      key: "create",
      value: function create() {
        var video = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var containerRef = this.state.containerRef;
        var _this$props2 = this.props,
            record = _this$props2.record,
            movement = _this$props2.movement,
            transform = _this$props2.transform,
            zoom = _this$props2.zoom,
            screenshot = _this$props2.screenshot,
            useWebRTC = _this$props2.useWebRTC,
            timeRefresh = _this$props2.timeRefresh,
            on = _this$props2.on;
        var sullivanOptions = {
          $container: containerRef.current,
          timeRefresh: timeRefresh || 1000 * 60 * 10,
          // 是否使用 WebRTC
          useWebRTC: useWebRTC,
          capabilities: {
            record: record,
            movement: movement,
            transform: transform,
            zoom: zoom,
            screenshot: screenshot
          }
        };

        if (this.sullivan) {
          this.sullivan.destroy();
        }

        var sullivan = new Sullivan(Object.assign(sullivanOptions, options));

        for (var key in on) {
          if (key && typeof on[key] === 'function') {
            sullivan.on(key, on[key]);
          }
        }

        sullivan.play(video.url, video); //

        sullivan.on("load", function () {// console.log('-------"load"-----------');
        });
        sullivan.on("destroy", function () {
          // console.log('-------"destroy"-----------');
          containerRef.current.innerHTML = '';
        });
        sullivan.on("error", function (error) {
          console.log('-------"error"-----------', error);

          if (on.error) {
            // 建议延迟一会，保证 组件的 destroy 先调用
            setTimeout(function () {
              on.error(_objectSpread2(_objectSpread2({}, error), {}, {
                target: containerRef.current,
                data: video
              }));
            }, 100);
          }
        });
        /* sullivan.on("fullscreen", (arg) => {
          on.fullscreen && on.fullscreen(arg)
        }); */

        this.sullivan = sullivan;
      }
      /**
       * 获取视频数据
       *
       * @param video { string | object }
       * @returns {boolean|*}
       */

    }, {
      key: "getSendData",
      value: function getSendData(video) {
        if (typeof video === 'string') {
          video = {
            url: video
          };
        }

        if (typeof video.url !== 'string') {
          console.error("url: ".concat(video.url, " \u9700\u8981\u662F\u4E00\u4E2A\u5B57\u7B26\u4E32\uFF01"));
          return false;
        }

        return video;
      }
      /**
       * 添加播放视频
       *
       * @param video { string | object }
       * @param options { undefined | object }
       */

    }, {
      key: "setPlayingVideo",
      value: function setPlayingVideo(video) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (!(video = this.getSendData(video))) {
          return;
        }

        this.create(video, options);
      }
    }, {
      key: "itemClick",
      value: function itemClick(event) {
        var _this$props3 = this.props,
            on = _this$props3.on,
            data = _this$props3.data;
        event.stopPropagation();

        if (!on.itemClick) {
          on.itemClick = function () {};

          console.log('on.playerItemClick is not find');
        }

        on.itemClick(data);
      }
    }, {
      key: "resize",
      value: function resize() {
        if (this.sullivan) {
          this.sullivan.resize();
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props4 = this.props,
            className = _this$props4.className,
            style = _this$props4.style,
            children = _this$props4.children,
            id = _this$props4.id;
        var _this$state = this.state,
            containerRef = _this$state.containerRef;
            _this$state.error;

        var __style = _objectSpread2({
          width: '100%',
          height: '100%',
          position: 'relative'
        }, style);

        return /*#__PURE__*/React__default["default"].createElement("div", {
          id: id || "videoMultipleContainer-".concat(getKey()),
          className: "sullivan",
          style: __style,
          onDragOver: this.onDragOver.bind(this),
          onDrop: this.onDrop.bind(this),
          onClick: this.itemClick.bind(this)
        }, /*#__PURE__*/React__default["default"].createElement("div", {
          className: "sullivan-video ".concat(className),
          style: __style,
          ref: containerRef
        }), children);
      }
    }]);

    return SullivanVideo;
  }(React.Component);

  _defineProperty(SullivanVideo, "defaultProps", {
    useWebRTC: true,
    className: '',
    style: {}
  });

  return SullivanVideo;

}));
