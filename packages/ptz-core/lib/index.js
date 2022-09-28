(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.index = {}));
})(this, (function (exports) { 'use strict';

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var objectWithoutPropertiesLoose = createCommonjsModule(function (module) {
	  function _objectWithoutPropertiesLoose(source, excluded) {
	    if (source == null) return {};
	    var target = {};
	    var sourceKeys = Object.keys(source);
	    var key, i;

	    for (i = 0; i < sourceKeys.length; i++) {
	      key = sourceKeys[i];
	      if (excluded.indexOf(key) >= 0) continue;
	      target[key] = source[key];
	    }

	    return target;
	  }

	  module.exports = _objectWithoutPropertiesLoose;
	  module.exports["default"] = module.exports, module.exports.__esModule = true;
	});
	unwrapExports(objectWithoutPropertiesLoose);

	var objectWithoutProperties = createCommonjsModule(function (module) {
	  function _objectWithoutProperties(source, excluded) {
	    if (source == null) return {};
	    var target = objectWithoutPropertiesLoose(source, excluded);
	    var key, i;

	    if (Object.getOwnPropertySymbols) {
	      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

	      for (i = 0; i < sourceSymbolKeys.length; i++) {
	        key = sourceSymbolKeys[i];
	        if (excluded.indexOf(key) >= 0) continue;
	        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
	        target[key] = source[key];
	      }
	    }

	    return target;
	  }

	  module.exports = _objectWithoutProperties;
	  module.exports["default"] = module.exports, module.exports.__esModule = true;
	});
	var _objectWithoutProperties = unwrapExports(objectWithoutProperties);

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

	var defineProperty = createCommonjsModule(function (module) {
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

	  module.exports = _defineProperty;
	  module.exports["default"] = module.exports, module.exports.__esModule = true;
	});
	var _defineProperty = unwrapExports(defineProperty);

	/**
	 * Date:2020/11/2
	 * Desc: ptz cmd 封装
	 * cmd[0] //首字节以05H开头
	 * cmd[1] //组合码，高4位为版本信息v1.0,版本信息0H，低四位为校验码
	 *        //  校验码 = (cmd[0]的高4位+cmd[0]的低4位+cmd[1]的高4位)%16
	 * cmd[2] //地址的低8位？？？什么地址，地址范围000h ~ FFFh(0~4095),其中000h为广播地址
	 * cmd[3] //指令码
	 * cmd[4] //数据1,水平控制速度、聚焦速度
	 * cmd[5] //数据2，垂直控制速度、光圈速度
	 * cmd[6] // 高4位为数据3=变倍控制速度，低4位为地址高4位
	 */
	// 所以对一个内存地址，也就是8位二进制，如：0000 0001，0000就是高四位，0001就是低四位，
	var PTZ_TYPE = {
	  stop: 'stop',
	  right: 'right',
	  left: 'left',
	  up: 'up',
	  down: 'down',
	  leftUp: 'leftUp',
	  leftDown: 'leftDown',
	  rightUp: 'rightUp',
	  rightDown: 'rightDown',
	  zoomFar: 'zoomFar',
	  zoomNear: 'zoomNear',
	  apertureFar: 'apertureFar',
	  apertureNear: 'apertureNear',
	  focusFar: 'focusFar',
	  focusNear: 'focusNear',
	  setPos: 'setPos',
	  calPos: 'calPos',
	  delPos: 'delPos',
	  wiperOpen: 'wiperOpen',
	  wiperClose: 'wiperClose'
	};
	var PTZ_CMD_TYPE = {
	  stop: 0x00,
	  right: 0x01,
	  // 0000 0001
	  left: 0x02,
	  // 0000 0010
	  up: 0x08,
	  // 0000 1000
	  down: 0x04,
	  // 0000 0100
	  leftUp: 0x0A,
	  // 0000 1010
	  leftDown: 0x06,
	  // 0000 0110
	  rightUp: 0x09,
	  // 0000 1001
	  rightDown: 0x05,
	  // 0000 0101
	  zoomFar: 0x10,
	  // 镜头 放大
	  zoomNear: 0x20,
	  // 镜头 缩小
	  apertureFar: 0x48,
	  // 光圈 缩小 //
	  apertureNear: 0x44,
	  // 光圈 放大
	  focusFar: 0x42,
	  // 聚焦 近
	  focusNear: 0x41,
	  // 聚焦 远
	  setPos: 0x81,
	  // 设置预设点
	  calPos: 0x82,
	  // 调用预设点
	  delPos: 0x83,
	  // 删除预设点
	  wiperOpen: 0x8C,
	  // 雨刷开
	  wiperClose: 0x8D // 雨刷关

	}; // 0x19 :00011001
	// 0x32 :00110010
	// 0x4b :01001011
	// 0x64 :01100100
	// 0xFA :11111010
	// 速度范围： 为00H~FFH

	var SPEED_ARRAY = [0x19, 0x32, 0x4b, 0x64, 0x7d, 0x96, 0xAF, 0xC8, 0xE1, 0xFA]; // 0x01 :000000001
	// 0x02 :000000010
	// 0x03 :000000011
	//
	// 0x10 :000010000
	// 预置位范围：01H~FFH

	var POSITION_ARRAY = [0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x10]; // 0H~FH; 低四位地址是高四位0000
	// 1,3,5,7,9,10,a,c,d,f

	var ZOOM_ARRAY = [0x10, 0x30, 0x50, 0x70, 0x90, 0xA0, 0xB0, 0xC0, 0xd0, 0xe0]; // 获取 direction 方向型

	/**
	 *
	 * @param options
	 *        type:
	 *        speed:default 5
	 *        index:
	 * @returns {string}
	 */

	function getPTZCmd(options) {
	  var type = options.type,
	      speed = options.speed,
	      index = options.index;
	  var ptzSpeed = getPTZSpeed(speed);
	  var indexValue3, indexValue4, indexValue5, indexValue6; // 第四个字节。

	  indexValue3 = PTZ_CMD_TYPE[type];

	  switch (type) {
	    case PTZ_TYPE.up:
	    case PTZ_TYPE.down:
	      // 字节6 垂直控制速度相对值
	      indexValue5 = ptzSpeed; // 字节7 地址高四位ob0000_0000
	      // indexValue6 = 0x00;

	      break;

	    case PTZ_TYPE.apertureFar:
	    case PTZ_TYPE.apertureNear:
	      // 字节6 光圈速度
	      indexValue5 = ptzSpeed; // 字节7 地址高四位ob0000_0000
	      // indexValue6 = 0x00;

	      break;

	    case PTZ_TYPE.right:
	    case PTZ_TYPE.left:
	      // 字节5 水平控制速度相对值
	      indexValue4 = ptzSpeed; // 字节7 地址高四位ob0000_0000
	      // indexValue6 = 0x00;

	      break;

	    case PTZ_TYPE.focusFar:
	    case PTZ_TYPE.focusNear:
	      // 字节5 聚焦速度
	      indexValue4 = ptzSpeed; // 字节7 地址高四位ob0000_0000
	      // indexValue6 = 0x00;

	      break;

	    case PTZ_TYPE.leftUp:
	    case PTZ_TYPE.leftDown:
	    case PTZ_TYPE.rightUp:
	    case PTZ_TYPE.rightDown:
	      // 字节5 水平控制速度相对值
	      indexValue4 = ptzSpeed; // 字节6 垂直控制速度相对值

	      indexValue5 = ptzSpeed; // 字节7 地址高四位ob0000_0000
	      // indexValue6 = 0x00;

	      break;

	    case PTZ_TYPE.zoomFar:
	    case PTZ_TYPE.zoomNear:
	      // 字节7 镜头变倍控制速度相对值 zoom
	      indexValue6 = getZoomSpeed(speed);
	      break;

	    case PTZ_TYPE.calPos:
	    case PTZ_TYPE.delPos:
	    case PTZ_TYPE.setPos:
	      // 第五个字节 00H
	      // indexValue4 = 0x00;
	      // 字节6 01H~FFH 位置。
	      indexValue5 = getPTZPositionIndex(index);
	      break;

	    case PTZ_TYPE.wiperClose:
	    case PTZ_TYPE.wiperOpen:
	      // 字节5为辅助开关编号,取值为“1”表示雨刷控制。
	      indexValue4 = 0x01;
	      break;
	  }

	  return ptzCmdToString(indexValue3, indexValue4, indexValue5, indexValue6);
	}

	function getPTZSpeed(speed) {
	  speed = speed || 5;
	  var speedIndex = speed - 1;
	  return SPEED_ARRAY[speedIndex] || SPEED_ARRAY[4];
	}

	function getZoomSpeed(speed) {
	  speed = speed || 5;
	  var speedIndex = speed - 1;
	  return ZOOM_ARRAY[speedIndex] || ZOOM_ARRAY[4];
	}

	function getPTZPositionIndex(index) {
	  return POSITION_ARRAY[index - 1];
	}

	function ptzCmdToString(indexValue3, indexValue4, indexValue5, indexValue6) {
	  //
	  var cmd = Buffer.alloc(8); // 首字节以05H开头

	  cmd[0] = 0xA5; // 组合码，高4位为版本信息v1.0,版本信息0H，低四位为校验码

	  cmd[1] = 0x0F; // 校验码 = (cmd[0]的高4位+cmd[0]的低4位+cmd[1]的高4位)%16

	  cmd[2] = 0x01; //

	  if (indexValue3) {
	    cmd[3] = indexValue3;
	  }

	  if (indexValue4) {
	    cmd[4] = indexValue4;
	  }

	  if (indexValue5) {
	    cmd[5] = indexValue5;
	  }

	  if (indexValue6) {
	    cmd[6] = indexValue6;
	  }

	  cmd[7] = (cmd[0] + cmd[1] + cmd[2] + cmd[3] + cmd[4] + cmd[5] + cmd[6]) % 256;
	  return bytes2HexString(cmd);
	}

	function bytes2HexString(byte) {
	  var hexs = "";

	  for (var i = 0; i < byte.length; i++) {
	    var hex = byte[i].toString(16);

	    if (hex.length === 1) {
	      hex = '0' + hex;
	    }

	    hexs += hex.toUpperCase();
	  }

	  return hexs;
	}

	var _excluded = ["type"],
	    _excluded2 = ["type", "speed"],
	    _excluded3 = ["type", "speed"],
	    _excluded4 = ["type", "speed"],
	    _excluded5 = ["type", "speed"],
	    _excluded6 = ["type", "speed"],
	    _excluded7 = ["type", "speed"],
	    _excluded8 = ["type", "speed"],
	    _excluded9 = ["type", "speed"],
	    _excluded10 = ["type", "speed"],
	    _excluded11 = ["type", "speed"],
	    _excluded12 = ["type", "speed"],
	    _excluded13 = ["type", "speed"],
	    _excluded14 = ["type", "speed"],
	    _excluded15 = ["type", "speed"],
	    _excluded16 = ["type", "index"],
	    _excluded17 = ["type", "index"],
	    _excluded18 = ["type", "index"],
	    _excluded19 = ["type", "speed"],
	    _excluded20 = ["type", "speed"];

	function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

	var noop = function noop() {}; // http://192.168.1.70:8081/api/gb28181/control?id=34020000001420000123&channel=34020000001320000001&ptzcmd=A50F01017D000033


	var PTZController = function PTZController() {
	  var _this = this;

	  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	      api = _ref.api,
	      port = _ref.port,
	      _id = _ref.id,
	      _channel = _ref.channel,
	      _index = _ref.index;

	  _classCallCheck(this, PTZController);

	  _defineProperty(this, "__getPTZCmd", function (_ref2) {
	    var id = _ref2.id,
	        type = _ref2.type,
	        _ref2$speed = _ref2.speed,
	        speed = _ref2$speed === void 0 ? 4 : _ref2$speed,
	        index = _ref2.index,
	        channel = _ref2.channel;
	    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
	    var cmd = getPTZCmd({
	      type: type,
	      speed: speed,
	      index: index
	    });

	    var __id = id || _this.id;

	    var __channel = channel || _this.channel;

	    if (_this.api) {
	      if (!__id) {
	        callback('"id" is not defined!');
	        return console.error('"id" is not defined!');
	      }

	      if (!__channel) {
	        callback('"channel" is not defined!');
	        return console.error('channel is not defined!');
	      }

	      var ptzUrl = "".concat(_this.api, "?id=").concat(__id, "&channel=").concat(__channel, "&ptzcmd=").concat(cmd);
	      callback(null, ptzUrl, {
	        type: type,
	        cmd: cmd
	      });
	      return ptzUrl;
	    } else {
	      callback(null, null, {
	        type: type,
	        cmd: cmd
	      });
	      return cmd;
	    }
	  });

	  _defineProperty(this, "stop", function () {
	    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	        _ref3.type;
	        var props = _objectWithoutProperties(_ref3, _excluded);

	    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
	    return _this.__getPTZCmd(_objectSpread({
	      type: PTZ_TYPE.stop
	    }, props), callback);
	  });

	  _defineProperty(this, "right", function () {
	    var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	        _ref4.type;
	        var speed = _ref4.speed,
	        props = _objectWithoutProperties(_ref4, _excluded2);

	    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
	    return _this.__getPTZCmd(_objectSpread({
	      type: PTZ_TYPE.right,
	      speed: speed
	    }, props), callback);
	  });

	  _defineProperty(this, "left", function () {
	    var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	        _ref5.type;
	        var speed = _ref5.speed,
	        props = _objectWithoutProperties(_ref5, _excluded3);

	    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
	    return _this.__getPTZCmd(_objectSpread({
	      type: PTZ_TYPE.left,
	      speed: speed
	    }, props), callback);
	  });

	  _defineProperty(this, "top", function () {
	    var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	        _ref6.type;
	        var speed = _ref6.speed,
	        props = _objectWithoutProperties(_ref6, _excluded4);

	    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
	    return _this.__getPTZCmd(_objectSpread({
	      type: PTZ_TYPE.up,
	      speed: speed
	    }, props), callback);
	  });

	  _defineProperty(this, "bottom", function () {
	    var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	        _ref7.type;
	        var speed = _ref7.speed,
	        props = _objectWithoutProperties(_ref7, _excluded5);

	    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
	    return _this.__getPTZCmd(_objectSpread({
	      type: PTZ_TYPE.down,
	      speed: speed
	    }, props), callback);
	  });

	  _defineProperty(this, "topLeft", function () {
	    var _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	        _ref8.type;
	        var speed = _ref8.speed,
	        props = _objectWithoutProperties(_ref8, _excluded6);

	    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
	    return _this.__getPTZCmd(_objectSpread({
	      type: PTZ_TYPE.leftUp,
	      speed: speed
	    }, props), callback);
	  });

	  _defineProperty(this, "topRight", function () {
	    var _ref9 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	        _ref9.type;
	        var speed = _ref9.speed,
	        props = _objectWithoutProperties(_ref9, _excluded7);

	    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
	    return _this.__getPTZCmd(_objectSpread({
	      type: PTZ_TYPE.rightUp,
	      speed: speed
	    }, props), callback);
	  });

	  _defineProperty(this, "bottomLeft", function () {
	    var _ref10 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	        _ref10.type;
	        var speed = _ref10.speed,
	        props = _objectWithoutProperties(_ref10, _excluded8);

	    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
	    return _this.__getPTZCmd(_objectSpread({
	      type: PTZ_TYPE.leftDown,
	      speed: speed
	    }, props), callback);
	  });

	  _defineProperty(this, "bottomRight", function () {
	    var _ref11 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	        _ref11.type;
	        var speed = _ref11.speed,
	        props = _objectWithoutProperties(_ref11, _excluded9);

	    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
	    return _this.__getPTZCmd(_objectSpread({
	      type: PTZ_TYPE.rightDown,
	      speed: speed
	    }, props), callback);
	  });

	  _defineProperty(this, "zoomFar", function () {
	    var _ref12 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	        _ref12.type;
	        var speed = _ref12.speed,
	        props = _objectWithoutProperties(_ref12, _excluded10);

	    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
	    return _this.__getPTZCmd(_objectSpread({
	      type: PTZ_TYPE.zoomFar,
	      speed: speed
	    }, props), callback);
	  });

	  _defineProperty(this, "zoomNear", function () {
	    var _ref13 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	        _ref13.type;
	        var speed = _ref13.speed,
	        props = _objectWithoutProperties(_ref13, _excluded11);

	    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
	    return _this.__getPTZCmd(_objectSpread({
	      type: PTZ_TYPE.zoomNear,
	      speed: speed
	    }, props), callback);
	  });

	  _defineProperty(this, "apertureFar", function () {
	    var _ref14 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	        _ref14.type;
	        var speed = _ref14.speed,
	        props = _objectWithoutProperties(_ref14, _excluded12);

	    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
	    return _this.__getPTZCmd(_objectSpread({
	      type: PTZ_TYPE.apertureFar,
	      speed: speed
	    }, props), callback);
	  });

	  _defineProperty(this, "apertureNear", function () {
	    var _ref15 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	        _ref15.type;
	        var speed = _ref15.speed,
	        props = _objectWithoutProperties(_ref15, _excluded13);

	    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
	    return _this.__getPTZCmd(_objectSpread({
	      type: PTZ_TYPE.apertureNear,
	      speed: speed
	    }, props), callback);
	  });

	  _defineProperty(this, "focusFar", function () {
	    var _ref16 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	        _ref16.type;
	        var speed = _ref16.speed,
	        props = _objectWithoutProperties(_ref16, _excluded14);

	    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
	    return _this.__getPTZCmd(_objectSpread({
	      type: PTZ_TYPE.focusFar,
	      speed: speed
	    }, props), callback);
	  });

	  _defineProperty(this, "focusNear", function () {
	    var _ref17 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	        _ref17.type;
	        var speed = _ref17.speed,
	        props = _objectWithoutProperties(_ref17, _excluded15);

	    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
	    return _this.__getPTZCmd(_objectSpread({
	      type: PTZ_TYPE.focusNear,
	      speed: speed
	    }, props), callback);
	  });

	  _defineProperty(this, "setPos", function () {
	    var _ref18 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	        _ref18.type;
	        var index = _ref18.index,
	        props = _objectWithoutProperties(_ref18, _excluded16);

	    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
	    return _this.__getPTZCmd(_objectSpread({
	      type: PTZ_TYPE.setPos,
	      index: index
	    }, props), callback);
	  });

	  _defineProperty(this, "calPos", function () {
	    var _ref19 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	        _ref19.type;
	        var index = _ref19.index,
	        props = _objectWithoutProperties(_ref19, _excluded17);

	    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
	    return _this.__getPTZCmd(_objectSpread({
	      type: PTZ_TYPE.calPos,
	      index: index
	    }, props), callback);
	  });

	  _defineProperty(this, "delPos", function () {
	    var _ref20 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	        _ref20.type;
	        var index = _ref20.index,
	        props = _objectWithoutProperties(_ref20, _excluded18);

	    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
	    return _this.__getPTZCmd(_objectSpread({
	      type: PTZ_TYPE.delPos,
	      index: index
	    }, props), callback);
	  });

	  _defineProperty(this, "wiperOpen", function () {
	    var _ref21 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	        _ref21.type;
	        var speed = _ref21.speed,
	        props = _objectWithoutProperties(_ref21, _excluded19);

	    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
	    return _this.__getPTZCmd(_objectSpread({
	      type: PTZ_TYPE.wiperOpen,
	      speed: speed
	    }, props), callback);
	  });

	  _defineProperty(this, "wiperClose", function () {
	    var _ref22 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	        _ref22.type;
	        var speed = _ref22.speed,
	        props = _objectWithoutProperties(_ref22, _excluded20);

	    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
	    return _this.__getPTZCmd(_objectSpread({
	      type: PTZ_TYPE.wiperClose,
	      speed: speed
	    }, props), callback);
	  });

	  this.api = api;
	  this.port = port;
	  this.index = _index;
	  this.channel = _channel;
	  this.id = _id;
	} //

	/*enlarge = ({type, speed, ...props} = {}, callback = () => {}) =>
	  this.__getPTZCmd({ type: PTZ_TYPE.wiperOpen, speed, ...props }, callback);
	narrow = ({type, speed, ...props} = {}, callback = () => {}) =>
	  this.__getPTZCmd({ type: PTZ_TYPE.wiperClose, speed, ...props }, callback)*/
;

	exports.PTZController = PTZController;
	exports.TYPE = PTZ_TYPE;
	exports.getPTZCmd = getPTZCmd;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
