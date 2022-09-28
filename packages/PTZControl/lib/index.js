(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
	typeof define === 'function' && define.amd ? define(['react'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.index = factory(global.React));
})(this, (function (React) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var arrayLikeToArray = createCommonjsModule(function (module) {
	function _arrayLikeToArray(arr, len) {
	  if (len == null || len > arr.length) len = arr.length;

	  for (var i = 0, arr2 = new Array(len); i < len; i++) {
	    arr2[i] = arr[i];
	  }

	  return arr2;
	}

	module.exports = _arrayLikeToArray;
	module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	unwrapExports(arrayLikeToArray);

	var arrayWithoutHoles = createCommonjsModule(function (module) {
	function _arrayWithoutHoles(arr) {
	  if (Array.isArray(arr)) return arrayLikeToArray(arr);
	}

	module.exports = _arrayWithoutHoles;
	module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	unwrapExports(arrayWithoutHoles);

	var iterableToArray = createCommonjsModule(function (module) {
	function _iterableToArray(iter) {
	  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
	}

	module.exports = _iterableToArray;
	module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	unwrapExports(iterableToArray);

	var unsupportedIterableToArray = createCommonjsModule(function (module) {
	function _unsupportedIterableToArray(o, minLen) {
	  if (!o) return;
	  if (typeof o === "string") return arrayLikeToArray(o, minLen);
	  var n = Object.prototype.toString.call(o).slice(8, -1);
	  if (n === "Object" && o.constructor) n = o.constructor.name;
	  if (n === "Map" || n === "Set") return Array.from(o);
	  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
	}

	module.exports = _unsupportedIterableToArray;
	module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	unwrapExports(unsupportedIterableToArray);

	var nonIterableSpread = createCommonjsModule(function (module) {
	function _nonIterableSpread() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}

	module.exports = _nonIterableSpread;
	module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	unwrapExports(nonIterableSpread);

	var toConsumableArray = createCommonjsModule(function (module) {
	function _toConsumableArray(arr) {
	  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
	}

	module.exports = _toConsumableArray;
	module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	var _toConsumableArray = unwrapExports(toConsumableArray);

	var arrayWithHoles = createCommonjsModule(function (module) {
	function _arrayWithHoles(arr) {
	  if (Array.isArray(arr)) return arr;
	}

	module.exports = _arrayWithHoles;
	module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	unwrapExports(arrayWithHoles);

	var iterableToArrayLimit = createCommonjsModule(function (module) {
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

	module.exports = _iterableToArrayLimit;
	module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	unwrapExports(iterableToArrayLimit);

	var nonIterableRest = createCommonjsModule(function (module) {
	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}

	module.exports = _nonIterableRest;
	module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	unwrapExports(nonIterableRest);

	var slicedToArray = createCommonjsModule(function (module) {
	function _slicedToArray(arr, i) {
	  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
	}

	module.exports = _slicedToArray;
	module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	var _slicedToArray = unwrapExports(slicedToArray);

	var classCallCheck = createCommonjsModule(function (module) {
	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	module.exports = _classCallCheck;
	module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	var _classCallCheck = unwrapExports(classCallCheck);

	var PtzControl = function PtzControl(serviceId, address, user, pass) {
	  _classCallCheck(this, PtzControl);

	  this.ws = new WebSocket(serviceId);
	  this.deviceConnected = false;
	  this.ptzMoving = false;
	  this.presetList = [];
	  this.speed = 1.0;
	  document.body.addEventListener('keydown', this.ptzMove);
	  document.body.addEventListener('keyup', this.ptzStop);

	  this.init = function () {
	    var that = this;

	    this.ws.onopen = function () {
	      // that.sendRequest('startDiscovery')
	      that.sendRequest('connect', {
	        address: address,
	        user: user,
	        pass: pass
	      });
	    }; // ws响应


	    this.ws.onmessage = function (res) {
	      var data = JSON.parse(res.data);
	      var id = data.id;

	      if (id === 'startDiscovery') {
	        if (data.result[address]) {
	          that.sendRequest('connect', {
	            address: address,
	            user: user,
	            pass: pass
	          });
	        } else {
	          that.sendRequest('startDiscovery');
	        }
	      } else if (id === 'connect') {
	        that.connectCallback(data);
	      } else if (id === 'ptzMove') {
	        console.log(data);
	      } else if (id === 'ptzStop') {
	        console.log(data);
	      } else if (id === 'ptzHome') {
	        console.log(data);
	      } else if (id === 'setPreset') {
	        if (data.result) {
	          that.getPresets();
	        }
	      } else if (id === 'getPresets') {
	        if (data.result) {
	          var Preset = data.result.GetPresetsResponse.Preset;
	          that.presetList = Preset;
	        }
	      } else if (id === 'gotoPreset') {
	        console.log(data);
	      } else if (id === 'removePreset') {
	        if (data.result) {
	          that.getPresets();
	        }
	      }
	    };
	  };

	  this.sendRequest = function (method, params) {
	    if (this.ws.readyState === 1) {
	      this.ws.send(JSON.stringify({
	        method: method,
	        params: params
	      }));
	    }
	  }; // 摄像头连接后回调


	  this.connectCallback = function (data) {
	    if (data.result) {
	      this.deviceConnected = true;
	      this.sendRequest('getPresets', {
	        address: address
	      });
	    } else if (data.error) {
	      this.deviceConnected = false;
	    }
	  }; // 定位到预置位


	  this.gotoPreset = function (v) {
	    var PresetToken = v['$'].token;
	    var Speed = {
	      x: parseFloat(v.PTZPosition.PanTilt['$'].x),
	      y: parseFloat(v.PTZPosition.PanTilt['$'].y),
	      z: parseFloat(v.PTZPosition.Zoom['$'].x)
	    };
	    this.sendRequest('gotoPreset', {
	      address: address,
	      PresetToken: PresetToken,
	      Speed: Speed
	    });
	  }; // 修改预置位


	  this.setPreset = function (v) {
	    var PresetToken = v['$'].token;
	    var PresetName = v.Name;
	    this.sendRequest('setPreset', {
	      address: address,
	      PresetToken: PresetToken,
	      PresetName: PresetName
	    });
	  }; // 摄像头停止移动


	  this.ptzStop = function (event) {
	    if (!address) return;
	    this.sendRequest('ptzStop', {
	      address: address
	    });
	    this.ptzMoving = false;
	  }; // 摄像头移动


	  this.ptzMove = function (event) {
	    if (this.deviceConnected === false || this.ptzMoving === true) return;
	    this.ptzMoving = true;
	    var pos = {
	      x: 0,
	      y: 0,
	      z: 0
	    };

	    if (event.type === 'keydown') {
	      var c = event.keyCode;

	      if (c === 38) {
	        // Up
	        pos.y = this.speed;
	      } else if (c === 40) {
	        // Down
	        pos.y = 0 - this.speed;
	      } else if (c === 37) {
	        // Left
	        pos.x = 0 - this.speed;
	      } else if (c === 39) {
	        // Right
	        pos.x = this.speed;
	      } else if (c === 107 || c === 187) {
	        // Zoom in
	        pos.z = this.speed;
	      } else if (c === 109 || c === 189) {
	        // Zoom out
	        pos.z = 0 - this.speed;
	      } else {
	        return;
	      }
	    } else if (event.type.match(/^(mousedown|touchstart)$/)) {
	      if (event.currentTarget.classList.contains('control-box')) {
	        var rect = event.currentTarget.getBoundingClientRect();
	        var cx = event.clientX;
	        var cy = event.clientY;

	        if (event.type === 'touchstart') {
	          if (event.targetTouches[0]) {
	            cx = event.targetTouches[0].clientX;
	            cy = event.targetTouches[0].clientY;
	          } else if (event.changedTouches[0]) {
	            cx = event.changedTouches[0].clientX;
	            cy = event.changedTouches[0].clientY;
	          }
	        }

	        var mx = cx - rect.left;
	        var my = cy - rect.top;
	        var w = rect.width;
	        var h = rect.height;
	        var r = Math.max(w, h) / 2;
	        var x = mx - r;
	        var y = r - my;
	        var d = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) / r;
	        var rad = Math.atan2(y, x);
	        pos.x = d * Math.cos(rad);
	        pos.y = d * Math.sin(rad);
	      } else if (event.currentTarget.classList.contains('zoom')) {
	        if (event.currentTarget.classList.contains('control-zoom-out')) {
	          pos.z = -1.0;
	        } else if (event.currentTarget.classList.contains('control-zoom-in')) {
	          pos.z = 1.0;
	        } else {
	          return;
	        }
	      } else {
	        return;
	      }
	    } else {
	      return;
	    }

	    this.sendRequest('ptzMove', {
	      address: address,
	      speed: pos,
	      timeout: 30
	    });
	    event.preventDefault();
	    event.stopPropagation();
	  };

	  this.ptzMove2 = function (speed) {
	    var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 30;
	    this.sendRequest('ptzMove', {
	      address: address,
	      speed: speed,
	      timeout: timeout
	    });
	  }; // 摄像头归位


	  this.ptzGotoHome = function (event) {
	    event.preventDefault();
	    event.stopPropagation();
	    if (event.type === 'touchstart') return;
	    if (this.deviceConnected === false || this.ptzMoving === true) return;
	    this.ptzMoving = true;
	    this.sendRequest('ptzHome', {
	      address: address,
	      timeout: 30
	    });
	  }; // 断开摄像头


	  this.disconnectDevice = function () {
	    this.deviceConnected = false;
	  };
	};

	function styleInject(css, ref) {
	  if ( ref === void 0 ) ref = {};
	  var insertAt = ref.insertAt;

	  if (!css || typeof document === 'undefined') { return; }

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

	var css_248z = "@charset \"UTF-8\";\n#connected-device {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  /* 上下左右start */\n  /* 上下左右end */\n  /* speed start */\n  /* speed end */\n  /* zoom start */\n  /* zoom end */\n  /* disconnect start */\n  /* disconnect end */ }\n  #connected-device > .control-box {\n    display: flex;\n    width: 115px;\n    height: 115px;\n    justify-content: space-between;\n    flex-wrap: wrap;\n    align-self: center; }\n    #connected-device > .control-box span {\n      height: 32px;\n      width: 32px;\n      display: inline-block;\n      text-align: center;\n      border: 1px solid #ddd;\n      background-color: #FFF; }\n      #connected-device > .control-box span i {\n        display: inline-block;\n        width: 30px;\n        height: 30px;\n        margin: 1px;\n        cursor: pointer;\n        background: url(\"data:image/png;base64,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\") no-repeat; }\n        #connected-device > .control-box span i:hover {\n          background-image: url(\"data:image/png;base64,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ABAsAAQLAAgWABAsAAQLAAgWABAsAAQLAAgWABAsAAQLAAgWAILFSgBAsACAYAEgWABAsACAYAEgWABAsACAYAEgWABAsACAYAEgWABAsACAYAHoBiZ6nomuMtHXTDQx0YRgAei2UE030X9LIxUiWAC6KVafM9H9Hqhfmeg3TfR0ggWgG/es9nmcHjTRKcF1hcEy0T4TPZlgAYgVq3Em+nwQq3GZ63ODZaJior/2+44jWABiBOsLHqU9Jjo55/qiYE020d1+/RcIFoAYwTKPzt8WXN/oJeE3/XojWABiBOt1j84f5lx3QfBO4QU516eD8q8TLAAxgjVUNIXBRAeDyweze12BIYIFIEaw9rcYrJ0EC0DVwXq1wUvCC010p4nuMNELc66f5fd9g2ABiBGs+xoNuje5bzrofh/BAhAjWF/y6OzOm9bQ4H7htIbzCRaArpw46vd50K9j4iiAyj6a82MT7S0Klon2BrHaZ6Kn8tEcAN3w4efTgncCzzDRb/t1id/2c3z4GUCVe1rP5x1eJuN5E53O0RoAdMOY1vn+kZ03TPQ9E/2tif63X3Z+szErggVgxGIlACBYAECwABAsACBYAECwABAsACBYAECwABAsACBYAECwABAsACBYAECwABAsACBYAECwABAsACBYAECwABAsACBYAECwABAsACBYAECwABAsACBYAAgWKwEAwQIAggWAYAEAwQIAggWAYAEAwQIAggWAYAEAwQIAggWAYAEAwQIAggXARLNqJvodE/2lib7jX7/jl3/k9gQLQJXBWmOiSY41BAtANwVrvIkeLAjWQYIFoNv2sB4sCNYDBAtAtwXraBPdlYnVThOdSrAAdFuwekz0kkywLim4HcECUHmwejLB6iFYAAgWwQLQZrBm58QpaXDZPIIFoKpg/UMmTnnvEoaX302wAFQRrIkm+mabwXrbRI8kWABiB+vSVserMrf7K4IFIHawnijYo2pmI8ECEDtY7w8zWImJ1ggWABAsAAQLAAgWABAsAAQLAAgWABAsAAQLACrzvwMADKr82hRhtk4AAAAASUVORK5CYII=\"); }\n      #connected-device > .control-box span .btn-up {\n        background-position: -31px 0px; }\n      #connected-device > .control-box span .btn-left {\n        background-position: 0 -30px; }\n      #connected-device > .control-box span .btn-right {\n        background-position: -60px -30px; }\n      #connected-device > .control-box span .btn-down {\n        background-position: -31px -60px; }\n      #connected-device > .control-box span .btn-center {\n        background-position: -30px -30px; }\n      #connected-device > .control-box span .btn-up-left {\n        background-position: 0 0; }\n      #connected-device > .control-box span .btn-up-right {\n        background-position: -60px 0px; }\n      #connected-device > .control-box span .btn-down-left {\n        background-position: 0 -60px; }\n      #connected-device > .control-box span .btn-down-right {\n        background-position: -60px -60px; }\n  #connected-device > .ptz-spd-ctl-box {\n    margin-top: 10px;\n    background-color: rgba(255, 255, 255, 0.5);\n    border-radius: 0.3em;\n    display: none; }\n    #connected-device > .ptz-spd-ctl-box span.label {\n      display: block;\n      margin-top: 0.3em; }\n  #connected-device > .control-zoom-box {\n    width: 100%;\n    height: 50px;\n    line-height: 50px;\n    text-align: center;\n    align-self: center; }\n    #connected-device > .control-zoom-box span {\n      height: 32px;\n      width: 42px;\n      display: inline-block;\n      text-align: center;\n      margin: 4px;\n      border: 1px solid #ddd;\n      background-color: #FFF; }\n      #connected-device > .control-zoom-box span i {\n        display: inline-block;\n        width: 40px;\n        height: 30px;\n        margin: 1px;\n        cursor: pointer;\n        background: url(\"data:image/png;base64,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\") no-repeat; }\n        #connected-device > .control-zoom-box span i:hover {\n          background-image: url(\"data:image/png;base64,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ABAsAAQLAAgWABAsAAQLAAgWABAsAAQLAAgWABAsAAQLAAgWAILFSgBAsACAYAEgWABAsACAYAEgWABAsACAYAEgWABAsACAYAEgWABAsACAYAHoBiZ6nomuMtHXTDQx0YRgAei2UE030X9LIxUiWAC6KVafM9H9Hqhfmeg3TfR0ggWgG/es9nmcHjTRKcF1hcEy0T4TPZlgAYgVq3Em+nwQq3GZ63ODZaJior/2+44jWABiBOsLHqU9Jjo55/qiYE020d1+/RcIFoAYwTKPzt8WXN/oJeE3/XojWABiBOt1j84f5lx3QfBO4QU516eD8q8TLAAxgjVUNIXBRAeDyweze12BIYIFIEaw9rcYrJ0EC0DVwXq1wUvCC010p4nuMNELc66f5fd9g2ABiBGs+xoNuje5bzrofh/BAhAjWF/y6OzOm9bQ4H7htIbzCRaArpw46vd50K9j4iiAyj6a82MT7S0Klon2BrHaZ6Kn8tEcAN3w4efTgncCzzDRb/t1id/2c3z4GUCVe1rP5x1eJuN5E53O0RoAdMOY1vn+kZ03TPQ9E/2tif63X3Z+szErggVgxGIlACBYAECwABAsACBYAECwABAsACBYAECwABAsACBYAECwABAsACBYAECwABAsACBYAECwABAsACBYAECwABAsACBYAECwABAsACBYAECwABAsACBYAAgWKwEAwQIAggWAYAEAwQIAggWAYAEAwQIAggWAYAEAwQIAggWAYAEAwQIAggXARLNqJvodE/2lib7jX7/jl3/k9gQLQJXBWmOiSY41BAtANwVrvIkeLAjWQYIFoNv2sB4sCNYDBAtAtwXraBPdlYnVThOdSrAAdFuwekz0kkywLim4HcECUHmwejLB6iFYAAgWwQLQZrBm58QpaXDZPIIFoKpg/UMmTnnvEoaX302wAFQRrIkm+mabwXrbRI8kWABiB+vSVserMrf7K4IFIHawnijYo2pmI8ECEDtY7w8zWImJ1ggWABAsAAQLAAgWABAsAAQLAAgWABAsAAQLACrzvwMADKr82hRhtk4AAAAASUVORK5CYII=\"); }\n      #connected-device > .control-zoom-box span .zoom-out {\n        background-position: -90px 0; }\n      #connected-device > .control-zoom-box span .zoom-in {\n        background-position: -126px 0; }\n  #connected-device > .disconnect-box {\n    margin-top: 10px;\n    display: none; }\n    #connected-device > .disconnect-box button[name=\"disconnect\"] {\n      opacity: 0.5 !important; }\n      #connected-device > .disconnect-box button[name=\"disconnect\"]:hover {\n        opacity: 1.0 !important; }\n  #connected-device .btn {\n    width: unset;\n    height: unset;\n    line-height: unset;\n    border-radius: unset;\n    margin-bottom: unset;\n    font-size: unset; }\n  #connected-device .presetList {\n    width: 100%;\n    height: 400px;\n    overflow-y: auto;\n    margin-top: 10px; }\n    #connected-device .presetList .presetItem {\n      display: flex;\n      justify-content: space-between;\n      height: 30px;\n      line-height: 30px;\n      padding: 0 10px;\n      cursor: pointer; }\n      #connected-device .presetList .presetItem:hover {\n        background-color: #fff; }\n      #connected-device .presetList .presetItem > .preset-name {\n        display: flex; }\n        #connected-device .presetList .presetItem > .preset-name > i {\n          font-style: normal;\n          margin-right: 10px; }\n        #connected-device .presetList .presetItem > .preset-name > input {\n          width: calc(100% - 40px); }\n        #connected-device .presetList .presetItem > .preset-name.preset-unable {\n          color: #666; }\n      #connected-device .presetList .presetItem > .preset-handle i {\n        display: inline-block;\n        width: 30px;\n        height: 30px;\n        margin: 1px 0 1px 1px;\n        cursor: pointer;\n        background: url(\"data:image/png;base64,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\") no-repeat; }\n        #connected-device .presetList .presetItem > .preset-handle i.preset-goto {\n          width: 20px;\n          background-position: -10px -152px; }\n        #connected-device .presetList .presetItem > .preset-handle i.preset-edit {\n          width: 20px;\n          background-position: -35px -152px; }\n        #connected-device .presetList .presetItem > .preset-handle i.preset-delete {\n          width: 20px;\n          background-position: -35px -182px; }\n";
	styleInject(css_248z);

	var ws = null;
	var address = null; // 摄像头IP地址

	function YunController(props) {
	  var _useState = React.useState(false),
	      _useState2 = _slicedToArray(_useState, 2),
	      deviceConnected = _useState2[0],
	      setDeviceConnected = _useState2[1]; // 设备是否连接


	  var _useState3 = React.useState(false),
	      _useState4 = _slicedToArray(_useState3, 2),
	      ptzMoving = _useState4[0],
	      setPtzMoving = _useState4[1]; // 是否正在移动


	  var _useState5 = React.useState(false),
	      _useState6 = _slicedToArray(_useState5, 2),
	      edit = _useState6[0],
	      setEdit = _useState6[1]; // 是否正在移动


	  var _useState7 = React.useState(1.0),
	      _useState8 = _slicedToArray(_useState7, 2),
	      speed = _useState8[0],
	      setSpeed = _useState8[1]; // 是否正在移动
	  // const [isFindDevice, setIsFindDevice] = useState(false) // 是否发现设备


	  var _useState9 = React.useState([]),
	      _useState10 = _slicedToArray(_useState9, 2),
	      presetList = _useState10[0],
	      setPresetList = _useState10[1]; // 预置位列表
	  // const [tip, setTip] = useState('云台正在连接摄像头设备，请稍后...')


	  if (!ws) {
	    ws = new WebSocket(props.serverIp);
	  }

	  ws.onopen = function () {
	    console.log('已建立WebSocket连接.'); // sendRequest('startDiscovery', { address, ...props })
	  }; // 错误


	  ws.onerror = function (error) {
	    console.log(error);
	  }; // 关闭


	  ws.onclose = function (event) {
	    console.log('已关闭WebSocket连接.');
	  }; // ws响应


	  ws.onmessage = function (res) {
	    var data = JSON.parse(res.data);
	    var id = data.id;

	    if (id === 'startDiscovery') ; else if (id === 'connect') {
	      connectCallback(data);
	    } else if (id === 'ptzMove') {
	      ptzMoveCallback(data);
	    } else if (id === 'ptzStop') {
	      ptzStopCallback(data);
	    } else if (id === 'ptzHome') {
	      ptzHomeCallback(data);
	    } else if (id === 'setPreset') {
	      ptzSetPresetCallback(data);
	    } else if (id === 'getPresets') {
	      ptzGetPresetCallback(data);
	    } else if (id === 'gotoPreset') {
	      ptzGotoPresetCallback(data);
	    } else if (id === 'removePreset') {
	      ptzRemovePresetCallback(data);
	    }
	  }; // useEffect(() => {
	  //   document.body.addEventListener('keydown', ptzMove)
	  //   document.body.addEventListener('keyup', ptzStop)
	  //   return () => {
	  //     document.body.removeEventListener('keydown', ptzMove)
	  //     document.body.removeEventListener('keyup', ptzStop)
	  //   }
	  // }, [])


	  React.useEffect(function () {
	    address = props.address;
	    connectDevice();
	  }, [props.address]); // webSorct发送请求

	  var sendRequest = function sendRequest(method, params) {
	    if (ws.readyState === 1) {
	      ws.send(JSON.stringify({
	        method: method,
	        params: params
	      }));
	    }
	  }; // 连接摄像头


	  var connectDevice = function connectDevice() {
	    sendRequest('connect', {
	      address: address,
	      user: props.user,
	      pass: props.pass
	    });
	  }; // 断开摄像头


	  var disconnectDevice = function disconnectDevice() {
	    // setAddress('')
	    address = null;
	    setDeviceConnected(false);
	  };
	  /**
	   * 执行时，判断是否存在顶级控制器
	   */


	  function execIfWithPropsControl(func) {
	    if (props.onPtzMove) {
	      props.onPtzMove(func, address, deviceConnected);
	    } else {
	      func();
	    }
	  } // 摄像头归位


	  var ptzGotoHome = function ptzGotoHome(event) {
	    event.preventDefault();
	    event.stopPropagation();

	    if (event.type === 'touchstart') {
	      return;
	    }

	    function onPtzGotoHome() {
	      if (deviceConnected === false || ptzMoving === true) {
	        return;
	      }

	      setPtzMoving(true);
	      sendRequest('ptzHome', {
	        address: address,
	        timeout: 30
	      });
	    }

	    execIfWithPropsControl(onPtzGotoHome);
	  }; // 摄像头移动


	  var ptzMove = function ptzMove(event) {
	    event.preventDefault();
	    event.stopPropagation();

	    function onPtzMoveHandle() {
	      if (deviceConnected === false || ptzMoving === true) {
	        return;
	      }

	      setPtzMoving(true);
	      var pos = {
	        x: 0,
	        y: 0,
	        z: 0
	      };

	      if (event.type === 'keydown') {
	        var c = event.keyCode;
	        event.shiftKey;

	        if (c === 38) {
	          // Up
	          pos.y = speed;
	        } else if (c === 40) {
	          // Down
	          pos.y = 0 - speed;
	        } else if (c === 37) {
	          // Left
	          pos.x = 0 - speed;
	        } else if (c === 39) {
	          // Right
	          pos.x = speed;
	        } else if (c === 107 || c === 187) {
	          // Zoom in
	          pos.z = speed;
	        } else if (c === 109 || c === 189) {
	          // Zoom out
	          pos.z = 0 - speed;
	        } else {
	          return;
	        }
	      } else if (event.type.match(/^(mousedown|touchstart)$/)) {
	        if (event.currentTarget.classList.contains('control-box')) {
	          var rect = event.currentTarget.getBoundingClientRect();
	          var cx = event.clientX;
	          var cy = event.clientY;

	          if (event.type === 'touchstart') {
	            if (event.targetTouches[0]) {
	              cx = event.targetTouches[0].clientX;
	              cy = event.targetTouches[0].clientY;
	            } else if (event.changedTouches[0]) {
	              cx = event.changedTouches[0].clientX;
	              cy = event.changedTouches[0].clientY;
	            }
	          }

	          var mx = cx - rect.left;
	          var my = cy - rect.top;
	          var w = rect.width;
	          var h = rect.height;
	          var r = Math.max(w, h) / 2;
	          var x = mx - r;
	          var y = r - my;
	          var d = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) / r;
	          var rad = Math.atan2(y, x);
	          pos.x = d * Math.cos(rad);
	          pos.y = d * Math.sin(rad);
	        } else if (event.currentTarget.classList.contains('zoom')) {
	          if (event.currentTarget.classList.contains('control-zoom-out')) {
	            pos.z = -1.0;
	          } else if (event.currentTarget.classList.contains('control-zoom-in')) {
	            pos.z = 1.0;
	          } else {
	            return;
	          }
	        } else {
	          return;
	        }
	      } else {
	        return;
	      }

	      console.log(pos);
	      sendRequest('ptzMove', {
	        address: address,
	        speed: pos,
	        timeout: 30
	      });
	    }

	    execIfWithPropsControl(onPtzMoveHandle);
	  }; // 摄像头停止移动


	  var ptzStop = function ptzStop(event) {
	    if (!address) {
	      return;
	    }

	    setPtzMoving(false);
	    sendRequest('ptzStop', {
	      address: address
	    });
	  }; // 修改预置位


	  var setPreset = function setPreset(v) {
	    var PresetToken = v['$'].token;
	    var PresetName = v.Name; // console.log({ address, PresetToken, PresetName })

	    function onSetPreset() {
	      sendRequest('setPreset', {
	        address: address,
	        PresetToken: PresetToken,
	        PresetName: PresetName
	      });
	    }

	    execIfWithPropsControl(onSetPreset);
	  }; // 获取预置位列表

	  var getPresets = function getPresets() {
	    sendRequest('getPresets', {
	      address: address
	    });
	  }; // 定位到预置位


	  var gotoPreset = function gotoPreset(v) {
	    var PresetToken = v['$'].token;
	    var Speed = {
	      x: parseFloat(v.PTZPosition.PanTilt['$'].x),
	      y: parseFloat(v.PTZPosition.PanTilt['$'].y),
	      z: parseFloat(v.PTZPosition.Zoom['$'].x)
	    };

	    function onGotoPreset() {
	      sendRequest('gotoPreset', {
	        address: address,
	        PresetToken: PresetToken,
	        Speed: Speed
	      });
	    }

	    execIfWithPropsControl(onGotoPreset);
	  }; // 移除预置位


	  var connectCallback = function connectCallback(data) {
	    if (data.result) {
	      setDeviceConnected(true);
	      getPresets();

	      if (props.onConnected && props.onConnected) {
	        props.onConnected({
	          ptzMove: function ptzMove(speed) {
	            var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 30;
	            sendRequest('ptzMove', {
	              address: address,
	              speed: speed,
	              timeout: timeout
	            });
	          },
	          ptzStop: ptzStop
	        });
	      }
	    } else if (data.error) {
	      setDeviceConnected(false);
	    }
	  }; // 摄像头移动后回调


	  var ptzMoveCallback = function ptzMoveCallback(data) {// do nothing
	  }; // 摄像头停止移动后回调


	  var ptzStopCallback = function ptzStopCallback(data) {// do nothing
	  }; // 摄像头归位后回调


	  var ptzHomeCallback = function ptzHomeCallback(data) {// do nothing
	  }; // 添加预置位回调


	  var ptzSetPresetCallback = function ptzSetPresetCallback(data) {
	    if (data.result) {
	      getPresets();
	    }
	  }; // 获取预置位回调


	  var ptzGetPresetCallback = function ptzGetPresetCallback(data) {
	    if (data.result) {
	      var Preset = data.result.GetPresetsResponse.Preset;
	      console.log('Preset: => ', Preset);
	      setPresetList(_toConsumableArray(Preset));
	    }
	  }; // 移除预置位回调


	  var ptzRemovePresetCallback = function ptzRemovePresetCallback(data) {
	    if (data.result) {
	      getPresets();
	    }
	  };

	  var editName = function editName(e, i) {
	    presetList[i].Name = e.target.value;
	    setPresetList(_toConsumableArray(presetList));
	  }; // 定位到预置位回调


	  var ptzGotoPresetCallback = function ptzGotoPresetCallback(data) {
	    console.log(data);
	  }; // 更改速度


	  var onChange = function onChange(e) {
	    setSpeed(e.target.value);
	  };

	  var timer; // 更改速度

	  var onPresetItemClick = function onPresetItemClick(e) {
	    timer = setTimeout(function () {
	      clearTimeout(timer);
	    }, 200);
	  }; // 更改预置位名称


	  var onPresetItemDblClick = function onPresetItemDblClick(index) {
	    clearTimeout(timer);
	    setEdit(index);

	    var inputFocus = function inputFocus() {
	      setEdit(undefined);
	      document.body.removeEventListener('click', inputFocus);
	    };

	    document.body.addEventListener('click', inputFocus);
	  }; // return isFindDevice ? () : tip


	  return /*#__PURE__*/React__default["default"].createElement("div", {
	    id: "connected-device"
	  }, /*#__PURE__*/React__default["default"].createElement("div", {
	    className: "control-box",
	    onMouseDown: ptzMove,
	    onMouseUp: ptzStop,
	    onTouchStart: ptzMove,
	    onTouchEnd: ptzStop
	  }, /*#__PURE__*/React__default["default"].createElement("span", null, /*#__PURE__*/React__default["default"].createElement("i", {
	    className: "btn-up-left"
	  })), /*#__PURE__*/React__default["default"].createElement("span", null, /*#__PURE__*/React__default["default"].createElement("i", {
	    className: "btn-up"
	  })), /*#__PURE__*/React__default["default"].createElement("span", null, /*#__PURE__*/React__default["default"].createElement("i", {
	    className: "btn-up-right"
	  })), /*#__PURE__*/React__default["default"].createElement("span", null, /*#__PURE__*/React__default["default"].createElement("i", {
	    className: "btn-left"
	  })), /*#__PURE__*/React__default["default"].createElement("span", {
	    onClick: ptzGotoHome,
	    onTouchStart: ptzGotoHome,
	    onTouchEnd: ptzGotoHome
	  }, /*#__PURE__*/React__default["default"].createElement("i", {
	    className: "btn-center"
	  })), /*#__PURE__*/React__default["default"].createElement("span", null, /*#__PURE__*/React__default["default"].createElement("i", {
	    className: "btn-right"
	  })), /*#__PURE__*/React__default["default"].createElement("span", null, /*#__PURE__*/React__default["default"].createElement("i", {
	    className: "btn-down-left"
	  })), /*#__PURE__*/React__default["default"].createElement("span", null, /*#__PURE__*/React__default["default"].createElement("i", {
	    className: "btn-down"
	  })), /*#__PURE__*/React__default["default"].createElement("span", null, /*#__PURE__*/React__default["default"].createElement("i", {
	    className: "btn-down-right"
	  }))), /*#__PURE__*/React__default["default"].createElement("div", {
	    className: "ptz-spd-ctl-box"
	  }, /*#__PURE__*/React__default["default"].createElement("span", {
	    className: "label"
	  }, "PTZ speed for keyboard"), /*#__PURE__*/React__default["default"].createElement("div", {
	    className: "btn-group btn-group-sm"
	  }, /*#__PURE__*/React__default["default"].createElement("label", {
	    className: "btn btn-default"
	  }, /*#__PURE__*/React__default["default"].createElement("input", {
	    onChange: onChange,
	    type: "radio",
	    name: "ptz-speed",
	    value: "0.5"
	  }), ' ', "slow"), /*#__PURE__*/React__default["default"].createElement("label", {
	    className: "btn btn-default"
	  }, /*#__PURE__*/React__default["default"].createElement("input", {
	    onChange: onChange,
	    type: "radio",
	    name: "ptz-speed",
	    value: "0.75"
	  }), ' ', "medium"), /*#__PURE__*/React__default["default"].createElement("label", {
	    className: "btn btn-default active"
	  }, /*#__PURE__*/React__default["default"].createElement("input", {
	    onChange: onChange,
	    type: "radio",
	    name: "ptz-speed",
	    value: "1.0"
	  }), ' ', "fast"))), /*#__PURE__*/React__default["default"].createElement("div", {
	    className: "control-zoom-box"
	  }, /*#__PURE__*/React__default["default"].createElement("span", {
	    title: "\u8C03\u7126-",
	    className: "zoom control-zoom-out",
	    onMouseDown: ptzMove,
	    onMouseUp: ptzStop,
	    onTouchStart: ptzMove,
	    onTouchEnd: ptzStop
	  }, /*#__PURE__*/React__default["default"].createElement("i", {
	    className: "zoom-out"
	  })), /*#__PURE__*/React__default["default"].createElement("span", {
	    title: "\u8C03\u7126+",
	    className: "zoom control-zoom-in",
	    onMouseDown: ptzMove,
	    onMouseUp: ptzStop,
	    onTouchStart: ptzMove,
	    onTouchEnd: ptzStop
	  }, /*#__PURE__*/React__default["default"].createElement("i", {
	    className: "zoom-in"
	  }))), /*#__PURE__*/React__default["default"].createElement("div", {
	    className: "disconnect-box"
	  }, /*#__PURE__*/React__default["default"].createElement("button", {
	    type: "button",
	    className: "form-control btn btn-default",
	    name: "disconnect",
	    onClick: disconnectDevice
	  }, "Disconnect")), /*#__PURE__*/React__default["default"].createElement("div", {
	    className: "presetList"
	  }, presetList.map(function (v, index) {
	    var _v$PTZPosition, _v$PTZPosition$PanTil, _v$PTZPosition$PanTil2;

	    var pointX = v === null || v === void 0 ? void 0 : (_v$PTZPosition = v.PTZPosition) === null || _v$PTZPosition === void 0 ? void 0 : (_v$PTZPosition$PanTil = _v$PTZPosition.PanTilt) === null || _v$PTZPosition$PanTil === void 0 ? void 0 : (_v$PTZPosition$PanTil2 = _v$PTZPosition$PanTil.$) === null || _v$PTZPosition$PanTil2 === void 0 ? void 0 : _v$PTZPosition$PanTil2.x;
	    var itemClass;

	    if (+pointX === -1 && v.Name.indexOf('预置') > -1) {
	      itemClass = 'preset-unable';
	    } else {
	      itemClass = 'preset-enable';
	    }

	    return /*#__PURE__*/React__default["default"].createElement("div", {
	      className: "presetItem",
	      key: index
	    }, /*#__PURE__*/React__default["default"].createElement("div", {
	      className: "preset-name ".concat(itemClass),
	      onClick: onPresetItemClick,
	      onDoubleClick: function onDoubleClick() {
	        onPresetItemDblClick(index);
	      }
	    }, /*#__PURE__*/React__default["default"].createElement("i", null, index + 1), edit === index ? /*#__PURE__*/React__default["default"].createElement("input", {
	      type: "text",
	      value: v.Name,
	      autoFocus: true,
	      onClick: function onClick(e) {
	        e.nativeEvent.stopImmediatePropagation();
	      },
	      onChange: function onChange(e) {
	        return editName(e, index);
	      }
	    }) : v.Name), /*#__PURE__*/React__default["default"].createElement("span", {
	      className: "preset-handle"
	    }, /*#__PURE__*/React__default["default"].createElement("i", {
	      className: "preset-goto",
	      onClick: function onClick() {
	        return gotoPreset(v);
	      }
	    }), /*#__PURE__*/React__default["default"].createElement("i", {
	      className: "preset-edit",
	      onClick: function onClick() {
	        return setPreset(v);
	      }
	    })));
	  })));
	}

	YunController.PtzControl = PtzControl;

	return YunController;

}));
