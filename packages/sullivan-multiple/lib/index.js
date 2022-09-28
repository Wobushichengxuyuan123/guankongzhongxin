(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('sullivan-core')) :
  typeof define === 'function' && define.amd ? define(['react', 'sullivan-core'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.index = factory(global.React, global.SullivanCore));
})(this, (function (React, SullivanCore) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var SullivanCore__default = /*#__PURE__*/_interopDefaultLegacy(SullivanCore);

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

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
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
        var rect = __$container.getBoundingClientRect();

        var width = __$container.width,
            clientWidth = __$container.clientWidth,
            height = __$container.height,
            clientHeight = __$container.clientHeight;
        container.width = rect.width || width || clientWidth;
        container.height = rect.height || height || clientHeight;
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
      var childW = parseInt('' + (width - 1) / column);
      var childH = parseInt('' + (height - 1) / column);
      return {
        width: childW ? childW + 'px' : '100%',
        height: childH ? childH + 'px' : '100%',
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

  var css_248z = "* {\n  box-sizing: border-box; }\n\n.video-container-wrap {\n  display: flex;\n  flex-wrap: wrap;\n  align-content: flex-start;\n  width: 100%;\n  height: 100%;\n  background-color: #073938;\n  /*border: 2px solid #ccc;*/ }\n  .video-container-wrap .video-multiple-item {\n    position: relative;\n    overflow: hidden;\n    border: 1px solid transparent;\n    border-bottom: 1px solid #ccc; }\n    .video-container-wrap .video-multiple-item.video-multiple-item-last {\n      border-right: 1px solid #ccc; }\n    .video-container-wrap .video-multiple-item + .video-multiple-item {\n      border-left: 1px solid #ccc; }\n  .video-container-wrap .movement-wrap {\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 0;\n    background-color: rgba(0, 0, 0, 0.4); }\n    .video-container-wrap .movement-wrap .movement-arrow {\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      padding: 10px;\n      position: absolute;\n      width: 10%;\n      max-width: 70px;\n      min-width: 30px;\n      background-repeat: no-repeat;\n      background-color: rgba(0, 0, 0, 0.2);\n      background-position: center;\n      border-radius: 40px;\n      cursor: pointer;\n      opacity: .6;\n      z-index: 99; }\n    .video-container-wrap .movement-wrap .movement-top {\n      top: 10%;\n      left: 50%; }\n    .video-container-wrap .movement-wrap .movement-right {\n      top: 45%;\n      right: 20px; }\n    .video-container-wrap .movement-wrap .movement-bottom {\n      left: 50%;\n      bottom: 10%; }\n    .video-container-wrap .movement-wrap .movement-left {\n      top: 45%;\n      left: 20px; }\n  .video-container-wrap .sullivan-fullscreen .movement-wrap {\n    position: absolute;\n    left: auto;\n    top: auto;\n    right: 0;\n    bottom: 0;\n    padding-bottom: 40px;\n    width: 20vw;\n    height: 20vh;\n    background-color: rgba(0, 0, 0, 0.2); }\n    .video-container-wrap .sullivan-fullscreen .movement-wrap .movement-arrow {\n      padding: 5px;\n      min-width: 36px;\n      background-color: rgba(0, 0, 0, 0.4); }\n      .video-container-wrap .sullivan-fullscreen .movement-wrap .movement-arrow .movement-icon {\n        fill: white; }\n    .video-container-wrap .sullivan-fullscreen .movement-wrap .movement-right {\n      top: calc(50% - 30px); }\n    .video-container-wrap .sullivan-fullscreen .movement-wrap .movement-bottom {\n      bottom: 60px; }\n    .video-container-wrap .sullivan-fullscreen .movement-wrap .movement-left {\n      top: calc(50% - 30px); }\n  .video-container-wrap .control-wrap {\n    height: 38px;\n    z-index: 11;\n    position: absolute;\n    left: 0;\n    width: 100%;\n    bottom: 0;\n    background: rgba(0, 0, 0, 0.8); }\n  .video-container-wrap .top-control {\n    display: flex;\n    justify-content: flex-end;\n    opacity: 0;\n    transition: opacity ease-out .2s; }\n    .video-container-wrap .top-control .tag-close {\n      position: absolute;\n      z-index: 999;\n      top: .7rem;\n      right: .7rem; }\n    .video-container-wrap .top-control .icon {\n      fill: #ff0000;\n      cursor: pointer;\n      background-color: rgba(0, 0, 0, 0.1);\n      box-shadow: 0 0 3rem #000; }\n  .video-container-wrap .jessibuca-container:hover .top-control {\n    opacity: 1;\n    transition: opacity ease .3s; }\n";
  styleInject(css_248z);

  function setStyle(dom, cssObj) {
    Object.keys(cssObj || {}).forEach(function (key) {
      dom.style[key] = cssObj[key];
    });
  }

  var catchDevice = {};
  var catchSullivan = {};

  var SullivanVideoMultiple = /*#__PURE__*/function (_Component) {
    _inherits(SullivanVideoMultiple, _Component);

    var _super = _createSuper(SullivanVideoMultiple);

    function SullivanVideoMultiple(props) {
      var _this;

      _classCallCheck(this, SullivanVideoMultiple);

      _this = _super.call(this, props); // this.catchDevice = {};

      _defineProperty(_assertThisInitialized(_this), "resizeHandle", function () {
        setTimeout(function () {
          // 获取视频区域大小
          var _container$getContain = container.getContainerSize(CONTAINER_ID),
              width = _container$getContain.width,
              height = _container$getContain.height;

          _this.setState({
            size: {
              width: width,
              height: height
            }
          });
        }, 100);
      });

      _defineProperty(_assertThisInitialized(_this), "closeAll", function () {
        var _this$props$on = _this.props.on,
            on = _this$props$on === void 0 ? {} : _this$props$on;
        var sullivanAll = [];

        for (var _i = 0, _Object$entries = Object.entries(catchSullivan); _i < _Object$entries.length; _i++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
              index = _Object$entries$_i[0],
              sullivan = _Object$entries$_i[1];

          sullivan === null || sullivan === void 0 ? void 0 : sullivan.destroy();
          sullivanAll.push(sullivan.__cache);
          catchSullivan[index] = undefined;
        }

        _this.setActivated(0);

        on.closeAll && on.closeAll(sullivanAll);
      });

      _defineProperty(_assertThisInitialized(_this), "setActivated", function (activated) {
        return _this.setState({
          activated: activated
        });
      });

      _defineProperty(_assertThisInitialized(_this), "onItemClickHandle", function (activated) {
        var _this$props = _this.props,
            on = _this$props.on,
            logger = _this$props.logger;

        _this.setActivated(activated);

        if (on) {
          if (!(on !== null && on !== void 0 && on.itemClick)) {
            on.itemClick = function (arg) {
              return logger && logger('playerItemClick', arg);
            };
          }

          on.itemClick(catchDevice[activated]);
        }
      });

      _this.state = {
        // 当前选中项
        activated: props.defaultActivated,

        /*
        * {
        *   // id: key
        *   // deviceId: 设备ID
        *   // url: 视频播放地址
        * }
        **/
        videoMultipleData: [],
        size: {
          width: undefined,
          height: undefined
        }
      };

      if (props.defaultActivated >= props.screenSize) {
        console.error("props.defaultActivated \u6700\u5927\u4E3A props.screenSize - 1 ");
      }

      return _this;
    }

    _createClass(SullivanVideoMultiple, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        this.resizeHandle(); // 捕获错误

        window.onerror = function (msg) {
          return _this2.err = msg;
        };

        window.addEventListener('resize', this.resizeHandle);
      }
    }, {
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
        var _nextState$size;

        var size = this.state.size;
        var screenSize = this.props.screenSize;

        if (nextProps.screenSize !== screenSize) {
          for (var index in catchSullivan) {
            var _catchSullivan$index;

            if ((_catchSullivan$index = catchSullivan[index]) !== null && _catchSullivan$index !== void 0 && _catchSullivan$index.resize) {
              var _catchSullivan$index2;

              (_catchSullivan$index2 = catchSullivan[index]) === null || _catchSullivan$index2 === void 0 ? void 0 : _catchSullivan$index2.resize();
            }
          }

          this.resizeHandle();
          return true;
        }

        return nextState.activated !== this.state.activated || ((_nextState$size = nextState.size) === null || _nextState$size === void 0 ? void 0 : _nextState$size.width) !== size.width || !size.width;
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState, snapshot) {
        var _iterator = _createForOfIteratorHelper(this.state.videoMultipleData),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var item = _step.value;

            if (item.sullivan) {// item.sullivan.resize()
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }, {
      key: "componentDidUnMounted",
      value: function componentDidUnMounted() {
        this.sullivan.destroy();
        window.removeEventListener('resize', this.resizeHandle);
      }
    }, {
      key: "onDragOver",
      value:
      /**
       * 拖拽中
       *
       * @param event
       */
      function onDragOver(event) {
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

          video.index = activated;
          catchDevice[activated] = video;

          if (video && video.url) {
            var sullivan = this.create(video);
            sullivan.play(video.url, video);
            this.setNextActivated(activated);
          }
        }
      }
      /**
       * 创建视频播放器
       *
       * @param video { object }
       * @param options { object }
       * @returns {Sullivan}
       */

    }, {
      key: "create",
      value: function create() {
        var _this3 = this;

        var video = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var videoMultipleData = this.state.videoMultipleData;
        var containerRef = videoMultipleData[video.index].containerRef;
        var _this$props2 = this.props,
            record = _this$props2.record,
            movement = _this$props2.movement,
            transform = _this$props2.transform,
            zoom = _this$props2.zoom,
            timeRefresh = _this$props2.timeRefresh,
            screenshot = _this$props2.screenshot,
            _this$props2$useWebRT = _this$props2.useWebRTC,
            useWebRTC = _this$props2$useWebRT === void 0 ? true : _this$props2$useWebRT,
            _this$props2$on = _this$props2.on,
            on = _this$props2$on === void 0 ? {} : _this$props2$on;
        var sullivanOptions = {
          $container: containerRef.current,
          timeRefresh: timeRefresh || 1000 * 60 * 10,
          // 是否使用 WebRTC
          useWebRTC: useWebRTC,
          capabilities: {
            record: record,
            movement: movement,
            transform: transform,
            screenshot: screenshot,
            zoom: zoom
          }
        };

        if (catchSullivan[video.index]) {
          catchSullivan[video.index].destroy();
          catchSullivan[video.index] = undefined;
        }

        var sullivan = new SullivanCore__default["default"](Object.assign(sullivanOptions, options));

        if (typeof (on === null || on === void 0 ? void 0 : on.play) === 'function') {
          sullivan.on('play', on === null || on === void 0 ? void 0 : on.play);
        }

        sullivan.on('load', function () {// console.log('load');
        });
        sullivan.on('error', function (error) {
          if (on.error) {
            // 建议延迟一会，保证 组件的 destroy 先调用
            setTimeout(function () {
              on === null || on === void 0 ? void 0 : on.error(_objectSpread2(_objectSpread2({}, error), {}, {
                index: video.index,
                target: containerRef.current,
                data: video
              }));
            }, 100);
          }
        });
        sullivan.on("close", function (arg) {
          on === null || on === void 0 ? void 0 : on.close(arg);

          _this3.setActivated(video.index);
        });
        sullivan.on("destroy", function () {
          containerRef.current.innerHTML = '';
          catchDevice[video.index] = undefined;
        });
        sullivan.on("load", function () {// console.log('------"load"-------', video)
        });
        sullivan.on('resize', function () {
          var height = sullivan.player.height;
          var paddingSize = height / 100;
          var closeTabStyle = {
            top: paddingSize + 'px',
            right: paddingSize + 'px'
          };

          if (sullivan.$closeTag) {
            setStyle(sullivan.$closeTag, closeTabStyle);
          }
        });
        sullivan.on('wheel', function (arg) {
          if (arg.index === _this3.state.activated && on !== null && on !== void 0 && on.wheel) {
            on.wheel(arg);
          }
        });
        sullivan.on('record', (on === null || on === void 0 ? void 0 : on.record) || function () {});
        sullivan.on('zptCtrl', (on === null || on === void 0 ? void 0 : on.zptCtrl) || function () {});
        sullivan.on('screenshot', (on === null || on === void 0 ? void 0 : on.screenshot) || function () {});
        sullivan.on('zoom', (on === null || on === void 0 ? void 0 : on.zoom) || function () {});
        sullivan.on('transform', (on === null || on === void 0 ? void 0 : on.transform) || function () {});
        sullivan.on('movement', (on === null || on === void 0 ? void 0 : on.movement) || function () {});
        sullivan.on('movement:start', (on === null || on === void 0 ? void 0 : on.movementStart) || function () {});
        sullivan.on('movement:end', (on === null || on === void 0 ? void 0 : on.movementEnd) || function () {});

        if (typeof (on === null || on === void 0 ? void 0 : on.itemClick) === 'function') {
          sullivan.on('itemClick', on === null || on === void 0 ? void 0 : on.itemClick);
        }

        catchSullivan[video.index] = sullivan;
        return sullivan;
      }
    }, {
      key: "getSendData",
      value:
      /**
       * 获取视频数据
       *
       * @param video { string | object }
       * @returns {boolean|*}
       */
      function getSendData(video) {
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
        var logger = this.props.logger;
        var _this$state = this.state,
            videoMultipleData = _this$state.videoMultipleData,
            activated = _this$state.activated;

        if (!(video = this.getSendData(video))) {
          return;
        }

        video.index = activated;

        if (activated >= videoMultipleData.length) {
          logger && logger('视频列表已满！');
        } else {
          var sullivan = this.create(video, options);
          catchDevice[activated] = video;
          sullivan.play(video.url, video);
          this.setNextActivated(activated);
        }
      }
      /*playWebRTC (video) {
        const { videoMultipleData, activated } = this.state
        const path = new URL(video.url)
        const url = `${path.origin}/api/webrtc/play?streamPath=${path.pathname}`
        videoMultipleData[activated].children = <WebRTCVideo url={url}/>
      }*/

    }, {
      key: "playVideo",
      value: function playVideo($video, video, options) {
        var _this$state2 = this.state;
            _this$state2.videoMultipleData;
            _this$state2.activated;
      }
      /**
       * 设置下一个 选中指针
       *
       * @param activated { number }
       */

    }, {
      key: "setNextActivated",
      value: function setNextActivated(activated) {
        var videoMultipleData = this.state.videoMultipleData;

        for (var index = activated; index < videoMultipleData.length; index++) {
          /**
           * 如果 指针已经等于最后一项，
           * 则指针指向下一个。
           * 通常显示为，红框消失。
           */
          if (+activated === videoMultipleData.length - 1) {
            this.setState({
              activated: +index + 1
            });
            break;
          }
          /**
           * 常用处理逻辑：
           * 从当前选中到一项开始，指向下一个没有 sullivan 的一项
           */


          if (!catchSullivan[index]) {
            this.setState({
              activated: index
            });
            break;
          }
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this4 = this;

        var _this$props3 = this.props,
            screenSize = _this$props3.screenSize,
            column = _this$props3.column,
            className = _this$props3.className,
            style = _this$props3.style,
            childClass = _this$props3.childClass,
            childStyle = _this$props3.childStyle;
        var _this$state3 = this.state,
            videoMultipleData = _this$state3.videoMultipleData,
            size = _this$state3.size,
            activated = _this$state3.activated;

        var __childStyle = container.createChildStyle(size, column, screenSize); // console.log('-------------', this.props)


        return /*#__PURE__*/React__default["default"].createElement("div", {
          id: "videoMultipleContainer",
          className: "video-container-wrap ".concat(className),
          style: style
        }, videoMultipleData && videoMultipleData.map(function (item, index) {
          var activeCls = _objectSpread2(_objectSpread2({}, childStyle), __childStyle);

          if (+activated === index) {
            activeCls.border = '1px solid red';
          }

          if (index === screenSize - 1) {
            var col = container.getColumn(column, screenSize);

            if (screenSize % col) {
              childClass += ' video-multiple-item-last';
            }
          }

          return /*#__PURE__*/React__default["default"].createElement("div", {
            className: "video-multiple-item ".concat(childClass),
            style: _objectSpread2({}, activeCls),
            key: index,
            id: 'videoMain' + index,
            ref: item.containerRef,
            onClick: function onClick() {
              return _this4.onItemClickHandle(index);
            },
            onDragOver: _this4.onDragOver.bind(_this4),
            onDrop: function onDrop(e) {
              return _this4.onDrop(e, index);
            }
          }, item.children);
        }));
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function getDerivedStateFromProps(nextProps, nextState) {
        var activated;

        if (nextProps.screenSize !== nextState.prevScreenSize) {
          var videoMultiple = new Array(nextProps.screenSize).fill(null);
          nextState.videoMultipleData = videoMultiple.map(function (_, index) {
            return {
              containerRef: /*#__PURE__*/React__default["default"].createRef()
            };
          });

          if (nextState.prevScreenSize) {
            if (nextState.prevScreenSize > nextProps.screenSize) {
              for (var index in catchSullivan) {
                var item = catchSullivan[index];

                if (!item) {
                  activated = index;
                  break;
                }

                item.sullivan.resize();
              } // 如果没有找到，证明列表全满


              if (activated === undefined) {
                activated = nextProps.screenSize;
              }

              nextState.activated = activated;
            }
          }

          nextState.prevScreenSize = nextProps.screenSize;
        }

        return nextState;
      }
      /**
       * 设置指针
       */

    }]);

    return SullivanVideoMultiple;
  }(React.Component);

  _defineProperty(SullivanVideoMultiple, "defaultProps", {
    useWebRTC: true,
    className: 'xxx',
    childClass: 'xxx',
    defaultActivated: 0,
    column: undefined,
    screenSize: 1,
    style: {},
    childStyle: {}
  });

  return SullivanVideoMultiple;

}));
