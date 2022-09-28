(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('events'), require('util'), require('crypto')) :
    typeof define === 'function' && define.amd ? define(['exports', 'events', 'util', 'crypto'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.index = {}, global.events, global.util, global.crypto));
})(this, (function (exports, events, util, crypto) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var events__default = /*#__PURE__*/_interopDefaultLegacy(events);
    var util__default = /*#__PURE__*/_interopDefaultLegacy(util);
    var crypto__default = /*#__PURE__*/_interopDefaultLegacy(crypto);

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

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __spreadArray(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
        return to;
    }

    /**
      # normalice

      Normalize an ice server configuration object (or plain old string) into a format
      that is usable in all browsers supporting WebRTC.  Primarily this module is designed
      to help with the transition of the `url` attribute of the configuration object to
      the `urls` attribute.

      ## Example Usage

      <<< examples/simple.js

    **/
    var protocols = ['stun:', 'turn:'];

    var normalice = function (input) {
      var url = (input || {}).url || input;
      var protocol;
      var parts;
      var output = {}; // if we don't have a string url, then allow the input to passthrough

      if (typeof url != 'string' && !(url instanceof String)) {
        return input;
      } // trim the url string, and convert to an array


      url = url.trim(); // if the protocol is not known, then passthrough

      protocol = protocols[protocols.indexOf(url.slice(0, 5))];

      if (!protocol) {
        return input;
      } // now let's attack the remaining url parts


      url = url.slice(5);
      parts = url.split('@');
      output.username = input.username;
      output.credential = input.credential; // if we have an authentication part, then set the credentials

      if (parts.length > 1) {
        url = parts[1];
        parts = parts[0].split(':'); // add the output credential and username

        output.username = parts[0];
        output.credential = (input || {}).credential || parts[1] || '';
      }

      output.url = protocol + url;
      output.urls = [output.url];
      return output;
    };

    var stun = [
    	"stun.l.google.com:19302",
    	"stun1.l.google.com:19302",
    	"stun2.l.google.com:19302",
    	"stun3.l.google.com:19302",
    	"stun4.l.google.com:19302",
    	"stun.ekiga.net",
    	"stun.ideasip.com",
    	"stun.schlund.de",
    	"stun.stunprotocol.org:3478",
    	"stun.voiparound.com",
    	"stun.voipbuster.com",
    	"stun.voipstunt.com",
    	"stun.voxgratia.org"
    ];

    var stun$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        'default': stun
    });

    var turn = [
    ];

    var turn$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        'default': turn
    });

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    function getCjsExportFromNamespace (n) {
    	return n && n['default'] || n;
    }

    var require$$0 = getCjsExportFromNamespace(stun$1);

    var require$$1 = getCjsExportFromNamespace(turn$1);

    /**
      # freeice

      The `freeice` module is a simple way of getting random STUN or TURN server
      for your WebRTC application.  The list of servers (just STUN at this stage)
      were sourced from this [gist](https://gist.github.com/zziuni/3741933).

      ## Example Use

      The following demonstrates how you can use `freeice` with
      [rtc-quickconnect](https://github.com/rtc-io/rtc-quickconnect):

      <<< examples/quickconnect.js

      As the `freeice` module generates ice servers in a list compliant with the
      WebRTC spec you will be able to use it with raw `RTCPeerConnection`
      constructors and other WebRTC libraries.

      ## Hey, don't use my STUN/TURN server!

      If for some reason your free STUN or TURN server ends up in the
      list of servers ([stun](https://github.com/DamonOehlman/freeice/blob/master/stun.json) or
      [turn](https://github.com/DamonOehlman/freeice/blob/master/turn.json))
      that is used in this module, you can feel
      free to open an issue on this repository and those servers will be removed
      within 24 hours (or sooner).  This is the quickest and probably the most
      polite way to have something removed (and provides us some visibility
      if someone opens a pull request requesting that a server is added).

      ## Please add my server!

      If you have a server that you wish to add to the list, that's awesome! I'm
      sure I speak on behalf of a whole pile of WebRTC developers who say thanks.
      To get it into the list, feel free to either open a pull request or if you
      find that process a bit daunting then just create an issue requesting
      the addition of the server (make sure you provide all the details, and if
      you have a Terms of Service then including that in the PR/issue would be
      awesome).

      ## I know of a free server, can I add it?

      Sure, if you do your homework and make sure it is ok to use (I'm currently
      in the process of reviewing the terms of those STUN servers included from
      the original list).  If it's ok to go, then please see the previous entry
      for how to add it.

      ## Current List of Servers

      * current as at the time of last `README.md` file generation

      ### STUN

      <<< stun.json

      ### TURN

      <<< turn.json

    **/


    var freeice = function (opts) {
      // if a list of servers has been provided, then use it instead of defaults
      var servers = {
        stun: (opts || {}).stun || require$$0,
        turn: (opts || {}).turn || require$$1
      };
      var stunCount = (opts || {}).stunCount || 2;
      var turnCount = (opts || {}).turnCount || 0;
      var selected;

      function getServers(type, count) {
        var out = [];
        var input = [].concat(servers[type]);
        var idx;

        while (input.length && out.length < count) {
          idx = Math.random() * input.length | 0;
          out = out.concat(input.splice(idx, 1));
        }

        return out.map(function (url) {
          //If it's a not a string, don't try to "normalice" it otherwise using type:url will screw it up
          if (typeof url !== 'string' && !(url instanceof String)) {
            return url;
          } else {
            return normalice(type + ':' + url);
          }
        });
      } // add stun servers


      selected = [].concat(getServers('stun', stunCount));

      if (turnCount) {
        selected = selected.concat(getServers('turn', turnCount));
      }

      return selected;
    };

    var freeice_1 = freeice;

    var logger$2 = console;
    var style = 'font-weight: bold;border-top-right-radius: 8px;border-bottom-right-radius: 8px;padding: 0 8px 0 4px;';
    /*if (isDevelopment() && logger === void 0) {
      logger = console
    } else {
      logger = { log () {}, info () {}, warn () {}, error () {}, debug () {}, }
    }*/
    var __logger = __assign(__assign({}, logger$2), { log: logger$2.log, __info: function (msg) {
            logger$2.log("%c[info]:%c  " + msg, "color: #fff; background:#208740; " + style, 'color: #208740;font-weight: bold;');
        }, __warn: function (msg) {
            logger$2.log("%c[warn]:%c  " + msg, "color: #fff; background:#dca60e; " + style, 'color: #dca60e;font-weight: bold;');
        }, __error: function (msg) {
            logger$2.log("%c[error]:%c " + msg, "color: #fff; background:#ea6464; " + style, 'color: #ea6464;font-weight: bold;');
        }, __debug: function (msg) {
            logger$2.log("%c[debug]:%c " + msg, "color: #eee; background:#666; " + style, 'color: #666;font-weight: bold;');
        } });

    var NODE_ENV;
    if (typeof process !== 'undefined') {
        NODE_ENV = process.env.NODE_ENV;
    }
    function isDevelopment() {
        return NODE_ENV === 'development';
    }

    var iceServers = config.iceServers;
    if (config.freeice) {
        iceServers.concat(freeice_1());
    }
    var configuration = {
        iceServers: __spreadArray([], iceServers)
    };
    function noop$1() { }
    function logger$1(level, noop) {
        if (noop === void 0) { noop = function () { }; }
        // 只能在 默认配置中设置
        if (level === true) {
            level = 0;
        }
        if (getType(level) !== 'number') {
            level = -1;
        }
        return __assign(__assign({}, __logger), { __info: level > 3 ? __logger.__info : noop, __debug: level > 2 ? __logger.__debug : noop, __warn: level > 1 ? __logger.__warn : noop, __error: level > 0 ? __logger.__error : noop, log: level >= 0 ? __logger.log : noop, info: level >= 0 ? __logger.info : noop, warn: level >= 0 ? __logger.warn : noop, error: level >= 0 ? __logger.error : noop, debug: level >= 0 ? __logger.debug : noop });
    }
    function createElement(type, muted) {
        if (muted === void 0) { muted = false; }
        var $mediaElement = document.createElement(type);
        if ($mediaElement instanceof HTMLVideoElement || $mediaElement instanceof HTMLAudioElement) {
            $mediaElement.autoplay = true;
            $mediaElement.controls = true;
            $mediaElement.muted = muted;
        }
        return $mediaElement;
    }
    function generateRandom() {
        return parseInt('' + Math.random() * Math.pow(10, 4)) + (Date.now() + '').substr(7);
    }
    function stringify(message) {
        return JSON.stringify(message, function (_, value) {
            return (value === undefined) ? '' : value;
        });
    }
    function getTime() {
        return new Date().toLocaleString('chinese', { hour12: false });
    }
    function generateUUID() {
        var uuid;
        var d = new Date().getTime();
        var format = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
        if (window.performance && typeof window.performance.now === "function") {
            d += performance.now(); //use high-precision timer if available
        }
        uuid = format.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }
    /**
     * 获取查询字符串
     *
     * @param url
     * @param isToLowerString
     */
    function analysisQueryString(url, isToLowerString) {
        if (url === void 0) { url = window.location.href; }
        if (isToLowerString === void 0) { isToLowerString = false; }
        var search = url.substring(url.lastIndexOf('?') + 1);
        var searchString = isToLowerString ? search.toLowerCase() : search;
        var obj = {};
        var reg = /([^?&=]+)=([^?&=]*)/g;
        searchString.replace(reg, function (str, $1, $2) {
            var key = decodeURIComponent($1);
            obj[key] = decodeURIComponent($2) + '';
            return str;
        });
        return obj;
    }
    function createReply() {
        var reply = {
            // 广播发送 - 成功
            success: function (message) {
                console.log(message);
            },
            // 广播发送 - 失败
            fail: function (error) {
                console.error(error);
            },
            setReplySuccess: setReplySuccess,
            setReplyFail: setReplyFail,
        };
        function setReplySuccess(func) {
            if (typeof func === 'function') {
                reply.success = func;
            }
        }
        function setReplyFail(func) {
            if (typeof func === 'function') {
                reply.fail = func;
            }
        }
        return reply;
    }
    var constraints$1 = {
        audio: true,
        video: {
            mandatory: {
                maxWidth: 320,
                maxFrameRate: 15,
                minFrameRate: 15
            }
        }
    };
    function appendMedia($container, options) {
        if (options === void 0) { options = {}; }
        var mediaConstraints = options.mediaConstraints;
        var localVideo = createElement('video');
        var remoteVideo = createElement('video');
        if (mediaConstraints && mediaConstraints.video) {
            // localVideo.style.display = 'none';
            $container.appendChild(localVideo);
            $container.appendChild(remoteVideo);
            options.localVideo = localVideo;
            options.remoteVideo = remoteVideo;
            return;
        }
    }
    function maybeCreateStream(video) {
        var stream;
        // console.log(leftVideo.captureStream, leftVideo.mozCaptureStream);
        if (video.captureStream) {
            stream = video.captureStream();
            // call();
        }
        else if (video.mozCaptureStream) {
            stream = video.mozCaptureStream();
            // call();
        }
        else {
            console.log('captureStream() not supported');
        }
        return stream;
    }
    // 首先判断是否支持HTMLELement，如果支持，使用HTMLElement，
    // 如果不支持，通过判断DOM的特征，如果拥有这些特征说明就是ODM节点，特征使用的越多越准确
    function isDOM(item) {
        return (typeof HTMLElement === 'function')
            ? (item instanceof HTMLElement)
            : (item && (typeof item === 'object') && (item.nodeType === 1) && (typeof item.nodeName === 'string'));
    }
    /**
     * 判断当前节点是父节点的直接子节点
     * @param parentNode
     * @param childNode
     */
    function hasChild(parentNode, childNode) {
        return !!(isDOM(parentNode) &&
            isDOM(childNode) &&
            parentNode.contains(childNode) &&
            childNode.parentNode === parentNode);
    }
    /**
     * 删除子节点
     * childNode 必须是 parentNode 的直接子节点
     *
     * @param parentNode
     * @param childNode
     */
    function removeChild(parentNode, childNode) {
        if (hasChild(parentNode, childNode)) {
            parentNode.removeChild(childNode);
        }
        else {
            console.error(parentNode, '不是', parentNode, '的子节点!');
        }
    }
    /**
     * 数据克隆
     *
     * @param data
     */
    function clone(data) {
        var type = Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
        if (type === 'array') {
            return [].concat(data);
        }
        else if (type === 'object') {
            return Object.assign({}, data);
        }
        else {
            return data;
        }
    }
    /**
     * 保障只执行一次。
     *
     * @param func 需要执行的函数
     * @param type 挂在的 key
     * @param delay 如果没有新的调用，则在 delay 毫秒后执行。
     */
    function execOnes(func, type, delay) {
        if (delay === void 0) { delay = 200; }
        if (window[type]) {
            clearTimeout(window[type]);
        }
        window[type] = setTimeout(function () { return func && func(); }, delay);
    }
    /**
     * 获取媒体类型
     *
     * @param bool
     */
    function getMediaType(bool) {
        return (bool ? 'video' : 'audio');
    }
    /**
     * 创建一个带名字的包裹
     *
     * @param videoDom
     * @param text
     */
    function createVideoWithWrap(videoDom, text) {
        var wrapDiv = document.createElement('div');
        var nameSpan = document.createElement('span');
        nameSpan.innerText = text;
        wrapDiv.appendChild(videoDom);
        wrapDiv.appendChild(nameSpan);
        return wrapDiv;
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
     * @param target 目标对象
     * @returns {string}
     */
    function getType(target) {
        return toRawType(target).slice(8, -1).toLowerCase();
    }

    var utils = /*#__PURE__*/Object.freeze({
        __proto__: null,
        configuration: configuration,
        noop: noop$1,
        logger: logger$1,
        createElement: createElement,
        generateRandom: generateRandom,
        stringify: stringify,
        getTime: getTime,
        generateUUID: generateUUID,
        analysisQueryString: analysisQueryString,
        createReply: createReply,
        constraints: constraints$1,
        appendMedia: appendMedia,
        maybeCreateStream: maybeCreateStream,
        isDOM: isDOM,
        hasChild: hasChild,
        removeChild: removeChild,
        clone: clone,
        execOnes: execOnes,
        getMediaType: getMediaType,
        createVideoWithWrap: createVideoWithWrap,
        toRawType: toRawType,
        getType: getType,
        isDevelopment: isDevelopment,
        EventEmitter: events__default["default"]
    });

    var development = isDevelopment();
    // 重连计数
    var reconnectCount = 0;
    // 重连计时器
    var reconnectTimer;
    /**
     * 合并 Web Socket
     * @param url
     * @param options
     * @param reconnect
     */
    function mixinWebSocket(url, options, reconnect) {
        try {
            var ws_1 = new WebSocket(url);
            var logMessage_1 = (function (dev) {
                var debug = console.log.bind(window);
                if (window.__close_debug_socket || !dev) {
                    debug = function () { };
                }
                return debug;
            })(development);
            /**
             * 接收从服务端发送来的消息
             * 将消息分类发出
             *
             * @param message {
             *   action: 消息类型
             * }
             */
            ws_1.addEventListener('message', function (message) {
                logMessage_1('%c<~ cWebSocket [listen message]: ' + JSON.stringify(message, null, 2), 'color: #6e75f2;text-decoration: underline;');
                if (message && typeof message.data === 'string') {
                    try {
                        var messageData = JSON.parse(message.data);
                        var actionName = messageData.action;
                        if ('action' in messageData && typeof options[actionName] === 'function') {
                            options[actionName](messageData);
                        }
                    }
                    catch (e) {
                        console.error('接收消息错误！', e);
                    }
                }
                else {
                    console.error('接收消息错误！', message);
                }
            });
            /**
             * WebSocket 链接成功！
             */
            ws_1.addEventListener('open', function (data) {
                logMessage_1('open: WebSocket 链接成功！');
                // 重连计数归零
                reconnectCount = 0;
                // 清除计时器
                clearInterval(reconnectTimer);
                // 启动心跳
                if (options.useHeartBate) {
                    ws_1.heartbeat(options.useHeartBate);
                }
                if (typeof options.open === 'function') {
                    options.open(data);
                }
            });
            /**
             * WebSocket 成功关闭！
             */
            ws_1.addEventListener('close', function (data) {
                logMessage_1('close: WebSocket 成功关闭！');
                clearInterval(reconnectTimer);
                if (ws_1 && ws_1.heartTimer) {
                    clearInterval(ws_1.heartTimer);
                }
                if (typeof options.close === 'function') {
                    options.close(data);
                }
            });
            /**
             * WebSocket 链接错误！
             *
             * 链接失败后，尝试重新链接，尝试重连三次。
             * 失败三次后，不在尝试重连。
             */
            ws_1.addEventListener('error', function (error) {
                console.error('error: WebSocket 链接错误！', error);
                if (typeof options.error === 'function') {
                    options.error(error);
                }
                if (reconnectTimer) {
                    clearInterval(reconnectTimer);
                }
                reconnectTimer = setInterval(function () {
                    if (reconnectCount > 3) {
                        clearInterval(reconnectTimer);
                        return;
                    }
                    mixinWebSocket(url, options);
                    reconnectCount++;
                }, 3000);
            });
            /**
             * TODO WebSocket 发送消息
             *
             * @param message
             */
            ws_1.sendMessage = function sendMessage(message) {
                if (ws_1) {
                    var jsonMessage = stringify(message);
                    logMessage_1('%c~> WebSocket [Sending message]: ' + JSON.stringify(message, null, 2), 'color: #999;');
                    ws_1.send(jsonMessage);
                }
            };
            /**
             * 销毁 WebSocket
             */
            ws_1.destroy = function destroy() {
                if (ws_1) {
                    clearInterval(ws_1.heartTimer);
                    ws_1.close();
                    ws_1 = null;
                }
            };
            /**
             * 心跳
             */
            ws_1.heartbeat = function heartbeat(time) {
                ws_1.heartTimer = setInterval(function () {
                    ws_1.sendMessage({ action: 'heartbeat' });
                }, time);
            };
            return ws_1;
        }
        catch (error) {
            console.error(error);
        }
    }

    var calledType;
    (function (calledType) {
        calledType["PHONE"] = "PHONE";
        calledType["MEETING"] = "MEETING";
        calledType["BROADCAST"] = "BROADCAST";
    })(calledType || (calledType = {}));
    /**************************************************************************
     *            长连接: 用于保障用户在线状态。
     *            仅用于与用户上下线业务逻辑相关处理。
     *
     *            1. 发起远程调用观众摄像头及麦克风。
     *            2. 发起电话请求接听。
     *            3. 接收用户上下线状态。
     *            4. 通知关注者用户上下线行为。
     *
     **************************************************************************
     * @param artemis
     * @param clientType 客户端类型
     */
    function mixinConnectSocket(artemis, clientType) {
        var connectUrl = artemis.connectUrl, _a = artemis.options, options = _a === void 0 ? {} : _a;
        /**
         * @param { Array } onlineAlready: 已经在线的人员列表
         * @param { object } anyoneOnline: 上线用户信息
         * @param { object } anyoneOffline: 离线用户信息
         */
        var logger = options.logger, _b = options.onlineAlready, onlineAlready = _b === void 0 ? noop$1 : _b, _c = options.anyoneOffline, anyoneOffline = _c === void 0 ? noop$1 : _c, _d = options.anyoneOnline, anyoneOnline = _d === void 0 ? noop$1 : _d, _e = options.onCalled, onCalled = _e === void 0 ? noop$1 : _e, _f = options.open, open = _f === void 0 ? noop$1 : _f, _g = options.activeResponse, activeResponse = _g === void 0 ? noop$1 : _g, _h = options.onlineResponse, onlineResponse = _h === void 0 ? noop$1 : _h, _j = options.dissolveRoom, dissolveRoom = _j === void 0 ? noop$1 : _j, _k = options.notice, notice = _k === void 0 ? noop$1 : _k, _l = options.stateChanged, stateChanged = _l === void 0 ? noop$1 : _l, _m = options.noticeResponse, noticeResponse = _m === void 0 ? noop$1 : _m, connectOptions = __rest(options, ["logger", "onlineAlready", "anyoneOffline", "anyoneOnline", "onCalled", "open", "activeResponse", "onlineResponse", "dissolveRoom", "notice", "stateChanged", "noticeResponse"]);
        var connectSocket;
        if (connectOptions.useHeartBate !== false && connectOptions.useHeartBate !== null) {
            connectOptions.useHeartBate = 3000;
        }
        connectSocket = mixinWebSocket(connectUrl, __assign({ 
            // useHeartBate: 3000,
            // 链接发生错误
            // error: console.error.bind(null, 'error Socket: '),
            // 链接关闭
            // close: console.log.bind(null, 'close Socket: '),
            /**
             * 链接成功
             * TODO 可以向后台发送消息。
             */
            open: function (data) {
                open(clone(data));
                var option = {
                    action: 'active',
                    userId: options[clientType + "Id"],
                    userName: options[clientType + "Name"],
                };
                connectSocket.sendMessage(option);
            }, 
            /**
             * 后台返回 - 登录列表
             * @param message
             */
            activeResponse: function (message) {
                activeResponse(clone(message));
                if (message.data) {
                    logger.__info('onlineResponse: => ' + JSON.stringify(message, null, 2));
                    onlineAlready(JSON.parse(message.data));
                    /**
                     * to: 要通知 对象的 ID 列表
                     * 空 则是通知所有人。
                     */
                    connectSocket.sendMessage({
                        action: 'online',
                        userId: options[clientType + "Id"],
                        userName: options[clientType + "Name"],
                        to: []
                    });
                }
            }, 
            /**
             * 后台返回 - 登录结果
             * @param message
             */
            onlineResponse: function (message) {
                onlineResponse(clone(message));
                logger.__info('onlineResponse: => ' + JSON.stringify(message, null, 2));
            }, 
            /**
             * 解散房间
             * @param message
             */
            dissolveRoom: function (message) {
                dissolveRoom(clone(message));
                logger.__info('dissolveRoom: => ' + JSON.stringify(message, null, 2));
            }, 
            /**
             * 后台返回 - 广播
             * @param message: {
             *    targetStatus: 用户上下线状态 { offline | online }
             *    instruct: 目标的操作类型 { offline | online }
             * }
             */
            notice: function (message) {
                var targetStatus = message.targetStatus, instruct = message.instruct, target = message.target, mediaConstraints = message.mediaConstraints, session = message.session;
                notice(clone(message));
                // 用户下线
                if (targetStatus === 'offline') {
                    anyoneOffline(target);
                }
                // 用户上线
                if (targetStatus === 'online') {
                    anyoneOnline(target);
                }
                // 用户状态变更
                if (instruct === 'stateChanged') {
                    stateChanged(message.user);
                }
                /******************************************************
                 *              会议 - 加入房间 - 退出房间。
                 ******************************************************
                 */
                // 1. viewer 接收到通知，强制加入房间
                if (instruct === 'receiveBroadcast') {
                    onCalled(calledType.BROADCAST, message);
                    artemis.viewer(message.target, { constraints: mediaConstraints, session: session });
                    // setTimeout(() => artemis.viewer(message.target, { constraints: mediaConstraints, session }), 1000);
                }
                // 1. viewer 主动加入房间
                if (instruct === 'joinRoom') {
                    onCalled(calledType.MEETING, message);
                    artemis.joinRoom(__assign(__assign({}, message), { viewerId: message.userId }));
                }
                // 2. 用户离开房间。
                if (instruct === 'leaveRoom') {
                    artemis.leaveRoom(message);
                }
                /******************************************************
                 *              打电话 - 接听电话
                 ******************************************************
                 */
                if (instruct === 'incomingCall') {
                    onCalled(calledType.PHONE, message);
                    artemis.onIncomingCall(message);
                }
                /******************************************************
                 *              对讲 - 加入组
                 ******************************************************
                 */
                if (instruct === 'join') {
                    delete message.media.participants;
                    delete message.media.participantsByUserId;
                    artemis.joinIntercom(message.media, message.from);
                }
                logger.__info('notice: => ' + JSON.stringify(message, null, 2));
            }, 
            /**
             * 接听方 发来的消息
             * 发起端 - 接收到 拒绝处理
             * @param message
             */
            noticeResponse: function (message) {
                var response = message.response, instruct = message.instruct; message.to;
                noticeResponse(clone(message));
                if (response === 'rejected') {
                    // 拒接电话
                    if (instruct === 'singleCall') {
                        artemis.destroySingle();
                    }
                }
            } }, connectOptions));
        /**
         * 通过长连接发送消息 - 对外开放
         *
         * @param message
         */
        artemis.connectSendMessage = function connectSendClose(message) {
            if (message === void 0) { message = {}; }
            if (connectSocket) {
                connectSocket.sendMessage(message);
            }
        };
        /**
         * 挂断 | 拒接 操作使用
         *
         * @param message: {
         *     // 拒接类型
         *     instruct: singleCall | groupCall
         *     // 发起方 ID
         *     from: presenterId
         * }
         */
        artemis.connectSendRejected = function connectSendClose(message) {
            if (message === void 0) { message = {}; }
            if (connectSocket) {
                connectSocket.sendMessage(__assign({ action: 'noticeResponse', response: 'rejected' }, message));
            }
        };
        /**
         * 播放
         *
         * @param fileName
         */
        artemis.handlePlayVideo = function (fileName) {
            var message = {
                action: 'play',
                fileName: fileName
            };
            connectSocket.sendMessage(message);
        };
        /**
         * 卸载长连接 Socket
         */
        artemis.connectSocketDestroy = function connectSocketDestroy() {
            logger.__info('destroy: => 断开长连接！');
            if (connectSocket) {
                connectSocket.destroy();
                connectSocket = null;
            }
        };
    }

    var inherits_browser = createCommonjsModule(function (module) {
      if (typeof Object.create === 'function') {
        // implementation from standard node.js 'util' module
        module.exports = function inherits(ctor, superCtor) {
          if (superCtor) {
            ctor.super_ = superCtor;
            ctor.prototype = Object.create(superCtor.prototype, {
              constructor: {
                value: ctor,
                enumerable: false,
                writable: true,
                configurable: true
              }
            });
          }
        };
      } else {
        // old school shim for old browsers
        module.exports = function inherits(ctor, superCtor) {
          if (superCtor) {
            ctor.super_ = superCtor;

            var TempCtor = function () {};

            TempCtor.prototype = superCtor.prototype;
            ctor.prototype = new TempCtor();
            ctor.prototype.constructor = ctor;
          }
        };
      }
    });

    var inherits = createCommonjsModule(function (module) {
      try {
        var util = util__default["default"];
        /* istanbul ignore next */

        if (typeof util.inherits !== 'function') throw '';
        module.exports = util.inherits;
      } catch (e) {
        /* istanbul ignore next */
        module.exports = inherits_browser;
      }
    });

    var uaParser = createCommonjsModule(function (module, exports) {
      /////////////////////////////////////////////////////////////////////////////////

      /* UAParser.js v0.7.31
         Copyright © 2012-2021 Faisal Salman <f@faisalman.com>
         MIT License */

      /*
      Detect Browser, Engine, OS, CPU, and Device type/model from User-Agent data.
      Supports browser & node.js environment. 
      Demo   : https://faisalman.github.io/ua-parser-js
      Source : https://github.com/faisalman/ua-parser-js */
      /////////////////////////////////////////////////////////////////////////////////
      (function (window, undefined$1) {
        // Constants
        /////////////

        var LIBVERSION = '0.7.31',
            EMPTY = '',
            UNKNOWN = '?',
            FUNC_TYPE = 'function',
            UNDEF_TYPE = 'undefined',
            OBJ_TYPE = 'object',
            STR_TYPE = 'string',
            MAJOR = 'major',
            MODEL = 'model',
            NAME = 'name',
            TYPE = 'type',
            VENDOR = 'vendor',
            VERSION = 'version',
            ARCHITECTURE = 'architecture',
            CONSOLE = 'console',
            MOBILE = 'mobile',
            TABLET = 'tablet',
            SMARTTV = 'smarttv',
            WEARABLE = 'wearable',
            EMBEDDED = 'embedded',
            UA_MAX_LENGTH = 255;
        var AMAZON = 'Amazon',
            APPLE = 'Apple',
            ASUS = 'ASUS',
            BLACKBERRY = 'BlackBerry',
            BROWSER = 'Browser',
            CHROME = 'Chrome',
            EDGE = 'Edge',
            FIREFOX = 'Firefox',
            GOOGLE = 'Google',
            HUAWEI = 'Huawei',
            LG = 'LG',
            MICROSOFT = 'Microsoft',
            MOTOROLA = 'Motorola',
            OPERA = 'Opera',
            SAMSUNG = 'Samsung',
            SONY = 'Sony',
            XIAOMI = 'Xiaomi',
            ZEBRA = 'Zebra',
            FACEBOOK = 'Facebook'; ///////////
        // Helper
        //////////

        var extend = function (regexes, extensions) {
          var mergedRegexes = {};

          for (var i in regexes) {
            if (extensions[i] && extensions[i].length % 2 === 0) {
              mergedRegexes[i] = extensions[i].concat(regexes[i]);
            } else {
              mergedRegexes[i] = regexes[i];
            }
          }

          return mergedRegexes;
        },
            enumerize = function (arr) {
          var enums = {};

          for (var i = 0; i < arr.length; i++) {
            enums[arr[i].toUpperCase()] = arr[i];
          }

          return enums;
        },
            has = function (str1, str2) {
          return typeof str1 === STR_TYPE ? lowerize(str2).indexOf(lowerize(str1)) !== -1 : false;
        },
            lowerize = function (str) {
          return str.toLowerCase();
        },
            majorize = function (version) {
          return typeof version === STR_TYPE ? version.replace(/[^\d\.]/g, EMPTY).split('.')[0] : undefined$1;
        },
            trim = function (str, len) {
          if (typeof str === STR_TYPE) {
            str = str.replace(/^\s\s*/, EMPTY).replace(/\s\s*$/, EMPTY);
            return typeof len === UNDEF_TYPE ? str : str.substring(0, UA_MAX_LENGTH);
          }
        }; ///////////////
        // Map helper
        //////////////


        var rgxMapper = function (ua, arrays) {
          var i = 0,
              j,
              k,
              p,
              q,
              matches,
              match; // loop through all regexes maps

          while (i < arrays.length && !matches) {
            var regex = arrays[i],
                // even sequence (0,2,4,..)
            props = arrays[i + 1]; // odd sequence (1,3,5,..)

            j = k = 0; // try matching uastring with regexes

            while (j < regex.length && !matches) {
              matches = regex[j++].exec(ua);

              if (!!matches) {
                for (p = 0; p < props.length; p++) {
                  match = matches[++k];
                  q = props[p]; // check if given property is actually array

                  if (typeof q === OBJ_TYPE && q.length > 0) {
                    if (q.length === 2) {
                      if (typeof q[1] == FUNC_TYPE) {
                        // assign modified match
                        this[q[0]] = q[1].call(this, match);
                      } else {
                        // assign given value, ignore regex match
                        this[q[0]] = q[1];
                      }
                    } else if (q.length === 3) {
                      // check whether function or regex
                      if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
                        // call function (usually string mapper)
                        this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined$1;
                      } else {
                        // sanitize match using given regex
                        this[q[0]] = match ? match.replace(q[1], q[2]) : undefined$1;
                      }
                    } else if (q.length === 4) {
                      this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined$1;
                    }
                  } else {
                    this[q] = match ? match : undefined$1;
                  }
                }
              }
            }

            i += 2;
          }
        },
            strMapper = function (str, map) {
          for (var i in map) {
            // check if current value is array
            if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
              for (var j = 0; j < map[i].length; j++) {
                if (has(map[i][j], str)) {
                  return i === UNKNOWN ? undefined$1 : i;
                }
              }
            } else if (has(map[i], str)) {
              return i === UNKNOWN ? undefined$1 : i;
            }
          }

          return str;
        }; ///////////////
        // String map
        //////////////
        // Safari < 3.0


        var oldSafariMap = {
          '1.0': '/8',
          '1.2': '/1',
          '1.3': '/3',
          '2.0': '/412',
          '2.0.2': '/416',
          '2.0.3': '/417',
          '2.0.4': '/419',
          '?': '/'
        },
            windowsVersionMap = {
          'ME': '4.90',
          'NT 3.11': 'NT3.51',
          'NT 4.0': 'NT4.0',
          '2000': 'NT 5.0',
          'XP': ['NT 5.1', 'NT 5.2'],
          'Vista': 'NT 6.0',
          '7': 'NT 6.1',
          '8': 'NT 6.2',
          '8.1': 'NT 6.3',
          '10': ['NT 6.4', 'NT 10.0'],
          'RT': 'ARM'
        }; //////////////
        // Regex map
        /////////////

        var regexes = {
          browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i // Chrome for Android/iOS
          ], [VERSION, [NAME, 'Chrome']], [/edg(?:e|ios|a)?\/([\w\.]+)/i // Microsoft Edge
          ], [VERSION, [NAME, 'Edge']], [// Presto based
          /(opera mini)\/([-\w\.]+)/i, // Opera Mini
          /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, // Opera Mobi/Tablet
          /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i // Opera
          ], [NAME, VERSION], [/opios[\/ ]+([\w\.]+)/i // Opera mini on iphone >= 8.0
          ], [VERSION, [NAME, OPERA + ' Mini']], [/\bopr\/([\w\.]+)/i // Opera Webkit
          ], [VERSION, [NAME, OPERA]], [// Mixed
          /(kindle)\/([\w\.]+)/i, // Kindle
          /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, // Lunascape/Maxthon/Netfront/Jasmine/Blazer
          // Trident based
          /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, // Avant/IEMobile/SlimBrowser
          /(ba?idubrowser)[\/ ]?([\w\.]+)/i, // Baidu Browser
          /(?:ms|\()(ie) ([\w\.]+)/i, // Internet Explorer
          // Webkit/KHTML based                                               // Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser/QupZilla/Falkon
          /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale|qqbrowserlite|qq)\/([-\w\.]+)/i, // Rekonq/Puffin/Brave/Whale/QQBrowserLite/QQ, aka ShouQ
          /(weibo)__([\d\.]+)/i // Weibo
          ], [NAME, VERSION], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i // UCBrowser
          ], [VERSION, [NAME, 'UC' + BROWSER]], [/\bqbcore\/([\w\.]+)/i // WeChat Desktop for Windows Built-in Browser
          ], [VERSION, [NAME, 'WeChat(Win) Desktop']], [/micromessenger\/([\w\.]+)/i // WeChat
          ], [VERSION, [NAME, 'WeChat']], [/konqueror\/([\w\.]+)/i // Konqueror
          ], [VERSION, [NAME, 'Konqueror']], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i // IE11
          ], [VERSION, [NAME, 'IE']], [/yabrowser\/([\w\.]+)/i // Yandex
          ], [VERSION, [NAME, 'Yandex']], [/(avast|avg)\/([\w\.]+)/i // Avast/AVG Secure Browser
          ], [[NAME, /(.+)/, '$1 Secure ' + BROWSER], VERSION], [/\bfocus\/([\w\.]+)/i // Firefox Focus
          ], [VERSION, [NAME, FIREFOX + ' Focus']], [/\bopt\/([\w\.]+)/i // Opera Touch
          ], [VERSION, [NAME, OPERA + ' Touch']], [/coc_coc\w+\/([\w\.]+)/i // Coc Coc Browser
          ], [VERSION, [NAME, 'Coc Coc']], [/dolfin\/([\w\.]+)/i // Dolphin
          ], [VERSION, [NAME, 'Dolphin']], [/coast\/([\w\.]+)/i // Opera Coast
          ], [VERSION, [NAME, OPERA + ' Coast']], [/miuibrowser\/([\w\.]+)/i // MIUI Browser
          ], [VERSION, [NAME, 'MIUI ' + BROWSER]], [/fxios\/([-\w\.]+)/i // Firefox for iOS
          ], [VERSION, [NAME, FIREFOX]], [/\bqihu|(qi?ho?o?|360)browser/i // 360
          ], [[NAME, '360 ' + BROWSER]], [/(oculus|samsung|sailfish)browser\/([\w\.]+)/i], [[NAME, /(.+)/, '$1 ' + BROWSER], VERSION], [// Oculus/Samsung/Sailfish Browser
          /(comodo_dragon)\/([\w\.]+)/i // Comodo Dragon
          ], [[NAME, /_/g, ' '], VERSION], [/(electron)\/([\w\.]+) safari/i, // Electron-based App
          /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, // Tesla
          /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i // QQBrowser/Baidu App/2345 Browser
          ], [NAME, VERSION], [/(metasr)[\/ ]?([\w\.]+)/i, // SouGouBrowser
          /(lbbrowser)/i // LieBao Browser
          ], [NAME], [// WebView
          /((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i // Facebook App for iOS & Android
          ], [[NAME, FACEBOOK], VERSION], [/safari (line)\/([\w\.]+)/i, // Line App for iOS
          /\b(line)\/([\w\.]+)\/iab/i, // Line App for Android
          /(chromium|instagram)[\/ ]([-\w\.]+)/i // Chromium/Instagram
          ], [NAME, VERSION], [/\bgsa\/([\w\.]+) .*safari\//i // Google Search Appliance on iOS
          ], [VERSION, [NAME, 'GSA']], [/headlesschrome(?:\/([\w\.]+)| )/i // Chrome Headless
          ], [VERSION, [NAME, CHROME + ' Headless']], [/ wv\).+(chrome)\/([\w\.]+)/i // Chrome WebView
          ], [[NAME, CHROME + ' WebView'], VERSION], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i // Android Browser
          ], [VERSION, [NAME, 'Android ' + BROWSER]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i // Chrome/OmniWeb/Arora/Tizen/Nokia
          ], [NAME, VERSION], [/version\/([\w\.]+) .*mobile\/\w+ (safari)/i // Mobile Safari
          ], [VERSION, [NAME, 'Mobile Safari']], [/version\/([\w\.]+) .*(mobile ?safari|safari)/i // Safari & Safari Mobile
          ], [VERSION, NAME], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i // Safari < 3.0
          ], [NAME, [VERSION, strMapper, oldSafariMap]], [/(webkit|khtml)\/([\w\.]+)/i], [NAME, VERSION], [// Gecko based
          /(navigator|netscape\d?)\/([-\w\.]+)/i // Netscape
          ], [[NAME, 'Netscape'], VERSION], [/mobile vr; rv:([\w\.]+)\).+firefox/i // Firefox Reality
          ], [VERSION, [NAME, FIREFOX + ' Reality']], [/ekiohf.+(flow)\/([\w\.]+)/i, // Flow
          /(swiftfox)/i, // Swiftfox
          /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror/Klar
          /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
          /(firefox)\/([\w\.]+)/i, // Other Firefox-based
          /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, // Mozilla
          // Other
          /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Sleipnir/Obigo/Mosaic/Go/ICE/UP.Browser
          /(links) \(([\w\.]+)/i // Links
          ], [NAME, VERSION]],
          cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i // AMD64 (x64)
          ], [[ARCHITECTURE, 'amd64']], [/(ia32(?=;))/i // IA32 (quicktime)
          ], [[ARCHITECTURE, lowerize]], [/((?:i[346]|x)86)[;\)]/i // IA32 (x86)
          ], [[ARCHITECTURE, 'ia32']], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i // ARM64
          ], [[ARCHITECTURE, 'arm64']], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i // ARMHF
          ], [[ARCHITECTURE, 'armhf']], [// PocketPC mistakenly identified as PowerPC
          /windows (ce|mobile); ppc;/i], [[ARCHITECTURE, 'arm']], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i // PowerPC
          ], [[ARCHITECTURE, /ower/, EMPTY, lowerize]], [/(sun4\w)[;\)]/i // SPARC
          ], [[ARCHITECTURE, 'sparc']], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i // IA64, 68K, ARM/64, AVR/32, IRIX/64, MIPS/64, SPARC/64, PA-RISC
          ], [[ARCHITECTURE, lowerize]]],
          device: [[//////////////////////////
          // MOBILES & TABLETS
          // Ordered by popularity
          /////////////////////////
          // Samsung
          /\b(sch-i[89]0\d|shw-m380s|sm-[pt]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [MODEL, [VENDOR, SAMSUNG], [TYPE, TABLET]], [/\b((?:s[cgp]h|gt|sm)-\w+|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [MODEL, [VENDOR, SAMSUNG], [TYPE, MOBILE]], [// Apple
          /\((ip(?:hone|od)[\w ]*);/i // iPod/iPhone
          ], [MODEL, [VENDOR, APPLE], [TYPE, MOBILE]], [/\((ipad);[-\w\),; ]+apple/i, // iPad
          /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [MODEL, [VENDOR, APPLE], [TYPE, TABLET]], [// Huawei
          /\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [MODEL, [VENDOR, HUAWEI], [TYPE, TABLET]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}-[atu]?[ln][01259x][012359][an]?)\b(?!.+d\/s)/i], [MODEL, [VENDOR, HUAWEI], [TYPE, MOBILE]], [// Xiaomi
          /\b(poco[\w ]+)(?: bui|\))/i, // Xiaomi POCO
          /\b; (\w+) build\/hm\1/i, // Xiaomi Hongmi 'numeric' models
          /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, // Xiaomi Hongmi
          /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, // Xiaomi Redmi
          /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i // Xiaomi Mi
          ], [[MODEL, /_/g, ' '], [VENDOR, XIAOMI], [TYPE, MOBILE]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i // Mi Pad tablets
          ], [[MODEL, /_/g, ' '], [VENDOR, XIAOMI], [TYPE, TABLET]], [// OPPO
          /; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [MODEL, [VENDOR, 'OPPO'], [TYPE, MOBILE]], [// Vivo
          /vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [MODEL, [VENDOR, 'Vivo'], [TYPE, MOBILE]], [// Realme
          /\b(rmx[12]\d{3})(?: bui|;|\))/i], [MODEL, [VENDOR, 'Realme'], [TYPE, MOBILE]], [// Motorola
          /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [MODEL, [VENDOR, MOTOROLA], [TYPE, MOBILE]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [MODEL, [VENDOR, MOTOROLA], [TYPE, TABLET]], [// LG
          /((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [MODEL, [VENDOR, LG], [TYPE, TABLET]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [MODEL, [VENDOR, LG], [TYPE, MOBILE]], [// Lenovo
          /(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [MODEL, [VENDOR, 'Lenovo'], [TYPE, TABLET]], [// Nokia
          /(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[MODEL, /_/g, ' '], [VENDOR, 'Nokia'], [TYPE, MOBILE]], [// Google
          /(pixel c)\b/i // Google Pixel C
          ], [MODEL, [VENDOR, GOOGLE], [TYPE, TABLET]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i // Google Pixel
          ], [MODEL, [VENDOR, GOOGLE], [TYPE, MOBILE]], [// Sony
          /droid.+ ([c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [MODEL, [VENDOR, SONY], [TYPE, MOBILE]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[MODEL, 'Xperia Tablet'], [VENDOR, SONY], [TYPE, TABLET]], [// OnePlus
          / (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [MODEL, [VENDOR, 'OnePlus'], [TYPE, MOBILE]], [// Amazon
          /(alexa)webm/i, /(kf[a-z]{2}wi)( bui|\))/i, // Kindle Fire without Silk
          /(kf[a-z]+)( bui|\)).+silk\//i // Kindle Fire HD
          ], [MODEL, [VENDOR, AMAZON], [TYPE, TABLET]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i // Fire Phone
          ], [[MODEL, /(.+)/g, 'Fire Phone $1'], [VENDOR, AMAZON], [TYPE, MOBILE]], [// BlackBerry
          /(playbook);[-\w\),; ]+(rim)/i // BlackBerry PlayBook
          ], [MODEL, VENDOR, [TYPE, TABLET]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i // BlackBerry 10
          ], [MODEL, [VENDOR, BLACKBERRY], [TYPE, MOBILE]], [// Asus
          /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [MODEL, [VENDOR, ASUS], [TYPE, TABLET]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [MODEL, [VENDOR, ASUS], [TYPE, MOBILE]], [// HTC
          /(nexus 9)/i // HTC Nexus 9
          ], [MODEL, [VENDOR, 'HTC'], [TYPE, TABLET]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, // HTC
          // ZTE
          /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic|sony)[-_ ]?([-\w]*)/i // Alcatel/GeeksPhone/Nexian/Panasonic/Sony
          ], [VENDOR, [MODEL, /_/g, ' '], [TYPE, MOBILE]], [// Acer
          /droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [MODEL, [VENDOR, 'Acer'], [TYPE, TABLET]], [// Meizu
          /droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [MODEL, [VENDOR, 'Meizu'], [TYPE, MOBILE]], [// Sharp
          /\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [MODEL, [VENDOR, 'Sharp'], [TYPE, MOBILE]], [// MIXED
          /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, // BlackBerry/BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Meizu/Motorola/Polytron
          /(hp) ([\w ]+\w)/i, // HP iPAQ
          /(asus)-?(\w+)/i, // Asus
          /(microsoft); (lumia[\w ]+)/i, // Microsoft Lumia
          /(lenovo)[-_ ]?([-\w]+)/i, // Lenovo
          /(jolla)/i, // Jolla
          /(oppo) ?([\w ]+) bui/i // OPPO
          ], [VENDOR, MODEL, [TYPE, MOBILE]], [/(archos) (gamepad2?)/i, // Archos
          /(hp).+(touchpad(?!.+tablet)|tablet)/i, // HP TouchPad
          /(kindle)\/([\w\.]+)/i, // Kindle
          /(nook)[\w ]+build\/(\w+)/i, // Nook
          /(dell) (strea[kpr\d ]*[\dko])/i, // Dell Streak
          /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, // Le Pan Tablets
          /(trinity)[- ]*(t\d{3}) bui/i, // Trinity Tablets
          /(gigaset)[- ]+(q\w{1,9}) bui/i, // Gigaset Tablets
          /(vodafone) ([\w ]+)(?:\)| bui)/i // Vodafone
          ], [VENDOR, MODEL, [TYPE, TABLET]], [/(surface duo)/i // Surface Duo
          ], [MODEL, [VENDOR, MICROSOFT], [TYPE, TABLET]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i // Fairphone
          ], [MODEL, [VENDOR, 'Fairphone'], [TYPE, MOBILE]], [/(u304aa)/i // AT&T
          ], [MODEL, [VENDOR, 'AT&T'], [TYPE, MOBILE]], [/\bsie-(\w*)/i // Siemens
          ], [MODEL, [VENDOR, 'Siemens'], [TYPE, MOBILE]], [/\b(rct\w+) b/i // RCA Tablets
          ], [MODEL, [VENDOR, 'RCA'], [TYPE, TABLET]], [/\b(venue[\d ]{2,7}) b/i // Dell Venue Tablets
          ], [MODEL, [VENDOR, 'Dell'], [TYPE, TABLET]], [/\b(q(?:mv|ta)\w+) b/i // Verizon Tablet
          ], [MODEL, [VENDOR, 'Verizon'], [TYPE, TABLET]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i // Barnes & Noble Tablet
          ], [MODEL, [VENDOR, 'Barnes & Noble'], [TYPE, TABLET]], [/\b(tm\d{3}\w+) b/i], [MODEL, [VENDOR, 'NuVision'], [TYPE, TABLET]], [/\b(k88) b/i // ZTE K Series Tablet
          ], [MODEL, [VENDOR, 'ZTE'], [TYPE, TABLET]], [/\b(nx\d{3}j) b/i // ZTE Nubia
          ], [MODEL, [VENDOR, 'ZTE'], [TYPE, MOBILE]], [/\b(gen\d{3}) b.+49h/i // Swiss GEN Mobile
          ], [MODEL, [VENDOR, 'Swiss'], [TYPE, MOBILE]], [/\b(zur\d{3}) b/i // Swiss ZUR Tablet
          ], [MODEL, [VENDOR, 'Swiss'], [TYPE, TABLET]], [/\b((zeki)?tb.*\b) b/i // Zeki Tablets
          ], [MODEL, [VENDOR, 'Zeki'], [TYPE, TABLET]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i // Dragon Touch Tablet
          ], [[VENDOR, 'Dragon Touch'], MODEL, [TYPE, TABLET]], [/\b(ns-?\w{0,9}) b/i // Insignia Tablets
          ], [MODEL, [VENDOR, 'Insignia'], [TYPE, TABLET]], [/\b((nxa|next)-?\w{0,9}) b/i // NextBook Tablets
          ], [MODEL, [VENDOR, 'NextBook'], [TYPE, TABLET]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i // Voice Xtreme Phones
          ], [[VENDOR, 'Voice'], MODEL, [TYPE, MOBILE]], [/\b(lvtel\-)?(v1[12]) b/i // LvTel Phones
          ], [[VENDOR, 'LvTel'], MODEL, [TYPE, MOBILE]], [/\b(ph-1) /i // Essential PH-1
          ], [MODEL, [VENDOR, 'Essential'], [TYPE, MOBILE]], [/\b(v(100md|700na|7011|917g).*\b) b/i // Envizen Tablets
          ], [MODEL, [VENDOR, 'Envizen'], [TYPE, TABLET]], [/\b(trio[-\w\. ]+) b/i // MachSpeed Tablets
          ], [MODEL, [VENDOR, 'MachSpeed'], [TYPE, TABLET]], [/\btu_(1491) b/i // Rotor Tablets
          ], [MODEL, [VENDOR, 'Rotor'], [TYPE, TABLET]], [/(shield[\w ]+) b/i // Nvidia Shield Tablets
          ], [MODEL, [VENDOR, 'Nvidia'], [TYPE, TABLET]], [/(sprint) (\w+)/i // Sprint Phones
          ], [VENDOR, MODEL, [TYPE, MOBILE]], [/(kin\.[onetw]{3})/i // Microsoft Kin
          ], [[MODEL, /\./g, ' '], [VENDOR, MICROSOFT], [TYPE, MOBILE]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i // Zebra
          ], [MODEL, [VENDOR, ZEBRA], [TYPE, TABLET]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [MODEL, [VENDOR, ZEBRA], [TYPE, MOBILE]], [///////////////////
          // CONSOLES
          ///////////////////
          /(ouya)/i, // Ouya
          /(nintendo) ([wids3utch]+)/i // Nintendo
          ], [VENDOR, MODEL, [TYPE, CONSOLE]], [/droid.+; (shield) bui/i // Nvidia
          ], [MODEL, [VENDOR, 'Nvidia'], [TYPE, CONSOLE]], [/(playstation [345portablevi]+)/i // Playstation
          ], [MODEL, [VENDOR, SONY], [TYPE, CONSOLE]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i // Microsoft Xbox
          ], [MODEL, [VENDOR, MICROSOFT], [TYPE, CONSOLE]], [///////////////////
          // SMARTTVS
          ///////////////////
          /smart-tv.+(samsung)/i // Samsung
          ], [VENDOR, [TYPE, SMARTTV]], [/hbbtv.+maple;(\d+)/i], [[MODEL, /^/, 'SmartTV'], [VENDOR, SAMSUNG], [TYPE, SMARTTV]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i // LG SmartTV
          ], [[VENDOR, LG], [TYPE, SMARTTV]], [/(apple) ?tv/i // Apple TV
          ], [VENDOR, [MODEL, APPLE + ' TV'], [TYPE, SMARTTV]], [/crkey/i // Google Chromecast
          ], [[MODEL, CHROME + 'cast'], [VENDOR, GOOGLE], [TYPE, SMARTTV]], [/droid.+aft(\w)( bui|\))/i // Fire TV
          ], [MODEL, [VENDOR, AMAZON], [TYPE, SMARTTV]], [/\(dtv[\);].+(aquos)/i // Sharp
          ], [MODEL, [VENDOR, 'Sharp'], [TYPE, SMARTTV]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, // Roku
          /hbbtv\/\d+\.\d+\.\d+ +\([\w ]*; *(\w[^;]*);([^;]*)/i // HbbTV devices
          ], [[VENDOR, trim], [MODEL, trim], [TYPE, SMARTTV]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i // SmartTV from Unidentified Vendors
          ], [[TYPE, SMARTTV]], [///////////////////
          // WEARABLES
          ///////////////////
          /((pebble))app/i // Pebble
          ], [VENDOR, MODEL, [TYPE, WEARABLE]], [/droid.+; (glass) \d/i // Google Glass
          ], [MODEL, [VENDOR, GOOGLE], [TYPE, WEARABLE]], [/droid.+; (wt63?0{2,3})\)/i], [MODEL, [VENDOR, ZEBRA], [TYPE, WEARABLE]], [/(quest( 2)?)/i // Oculus Quest
          ], [MODEL, [VENDOR, FACEBOOK], [TYPE, WEARABLE]], [///////////////////
          // EMBEDDED
          ///////////////////
          /(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i // Tesla
          ], [VENDOR, [TYPE, EMBEDDED]], [////////////////////
          // MIXED (GENERIC)
          ///////////////////
          /droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i // Android Phones from Unidentified Vendors
          ], [MODEL, [TYPE, MOBILE]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i // Android Tablets from Unidentified Vendors
          ], [MODEL, [TYPE, TABLET]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i // Unidentifiable Tablet
          ], [[TYPE, TABLET]], [/(phone|mobile(?:[;\/]| safari)|pda(?=.+windows ce))/i // Unidentifiable Mobile
          ], [[TYPE, MOBILE]], [/(android[-\w\. ]{0,9});.+buil/i // Generic Android Device
          ], [MODEL, [VENDOR, 'Generic']]],
          engine: [[/windows.+ edge\/([\w\.]+)/i // EdgeHTML
          ], [VERSION, [NAME, EDGE + 'HTML']], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i // Blink
          ], [VERSION, [NAME, 'Blink']], [/(presto)\/([\w\.]+)/i, // Presto
          /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m/Goanna
          /ekioh(flow)\/([\w\.]+)/i, // Flow
          /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, // KHTML/Tasman/Links
          /(icab)[\/ ]([23]\.[\d\.]+)/i // iCab
          ], [NAME, VERSION], [/rv\:([\w\.]{1,9})\b.+(gecko)/i // Gecko
          ], [VERSION, NAME]],
          os: [[// Windows
          /microsoft (windows) (vista|xp)/i // Windows (iTunes)
          ], [NAME, VERSION], [/(windows) nt 6\.2; (arm)/i, // Windows RT
          /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, // Windows Phone
          /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [NAME, [VERSION, strMapper, windowsVersionMap]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[NAME, 'Windows'], [VERSION, strMapper, windowsVersionMap]], [// iOS/macOS
          /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, // iOS
          /cfnetwork\/.+darwin/i], [[VERSION, /_/g, '.'], [NAME, 'iOS']], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i // Mac OS
          ], [[NAME, 'Mac OS'], [VERSION, /_/g, '.']], [// Mobile OSes
          /droid ([\w\.]+)\b.+(android[- ]x86)/i // Android-x86
          ], [VERSION, NAME], [// Android/WebOS/QNX/Bada/RIM/Maemo/MeeGo/Sailfish OS
          /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, // Blackberry
          /(tizen|kaios)[\/ ]([\w\.]+)/i, // Tizen/KaiOS
          /\((series40);/i // Series 40
          ], [NAME, VERSION], [/\(bb(10);/i // BlackBerry 10
          ], [VERSION, [NAME, BLACKBERRY]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i // Symbian
          ], [VERSION, [NAME, 'Symbian']], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i // Firefox OS
          ], [VERSION, [NAME, FIREFOX + ' OS']], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i // WebOS
          ], [VERSION, [NAME, 'webOS']], [// Google Chromecast
          /crkey\/([\d\.]+)/i // Google Chromecast
          ], [VERSION, [NAME, CHROME + 'cast']], [/(cros) [\w]+ ([\w\.]+\w)/i // Chromium OS
          ], [[NAME, 'Chromium OS'], VERSION], [// Console
          /(nintendo|playstation) ([wids345portablevuch]+)/i, // Nintendo/Playstation
          /(xbox); +xbox ([^\);]+)/i, // Microsoft Xbox (360, One, X, S, Series X, Series S)
          // Other
          /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, // Joli/Palm
          /(mint)[\/\(\) ]?(\w*)/i, // Mint
          /(mageia|vectorlinux)[; ]/i, // Mageia/VectorLinux
          /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, // Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware/Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus/Raspbian/Plan9/Minix/RISCOS/Contiki/Deepin/Manjaro/elementary/Sabayon/Linspire
          /(hurd|linux) ?([\w\.]*)/i, // Hurd/Linux
          /(gnu) ?([\w\.]*)/i, // GNU
          /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, // FreeBSD/NetBSD/OpenBSD/PC-BSD/GhostBSD/DragonFly
          /(haiku) (\w+)/i // Haiku
          ], [NAME, VERSION], [/(sunos) ?([\w\.\d]*)/i // Solaris
          ], [[NAME, 'Solaris'], VERSION], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, // Solaris
          /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, // AIX
          /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux)/i, // BeOS/OS2/AmigaOS/MorphOS/OpenVMS/Fuchsia/HP-UX
          /(unix) ?([\w\.]*)/i // UNIX
          ], [NAME, VERSION]]
        }; /////////////////
        // Constructor
        ////////////////

        var UAParser = function (ua, extensions) {
          if (typeof ua === OBJ_TYPE) {
            extensions = ua;
            ua = undefined$1;
          }

          if (!(this instanceof UAParser)) {
            return new UAParser(ua, extensions).getResult();
          }

          var _ua = ua || (typeof window !== UNDEF_TYPE && window.navigator && window.navigator.userAgent ? window.navigator.userAgent : EMPTY);

          var _rgxmap = extensions ? extend(regexes, extensions) : regexes;

          this.getBrowser = function () {
            var _browser = {};
            _browser[NAME] = undefined$1;
            _browser[VERSION] = undefined$1;
            rgxMapper.call(_browser, _ua, _rgxmap.browser);
            _browser.major = majorize(_browser.version);
            return _browser;
          };

          this.getCPU = function () {
            var _cpu = {};
            _cpu[ARCHITECTURE] = undefined$1;
            rgxMapper.call(_cpu, _ua, _rgxmap.cpu);
            return _cpu;
          };

          this.getDevice = function () {
            var _device = {};
            _device[VENDOR] = undefined$1;
            _device[MODEL] = undefined$1;
            _device[TYPE] = undefined$1;
            rgxMapper.call(_device, _ua, _rgxmap.device);
            return _device;
          };

          this.getEngine = function () {
            var _engine = {};
            _engine[NAME] = undefined$1;
            _engine[VERSION] = undefined$1;
            rgxMapper.call(_engine, _ua, _rgxmap.engine);
            return _engine;
          };

          this.getOS = function () {
            var _os = {};
            _os[NAME] = undefined$1;
            _os[VERSION] = undefined$1;
            rgxMapper.call(_os, _ua, _rgxmap.os);
            return _os;
          };

          this.getResult = function () {
            return {
              ua: this.getUA(),
              browser: this.getBrowser(),
              engine: this.getEngine(),
              os: this.getOS(),
              device: this.getDevice(),
              cpu: this.getCPU()
            };
          };

          this.getUA = function () {
            return _ua;
          };

          this.setUA = function (ua) {
            _ua = typeof ua === STR_TYPE && ua.length > UA_MAX_LENGTH ? trim(ua, UA_MAX_LENGTH) : ua;
            return this;
          };

          this.setUA(_ua);
          return this;
        };

        UAParser.VERSION = LIBVERSION;
        UAParser.BROWSER = enumerize([NAME, VERSION, MAJOR]);
        UAParser.CPU = enumerize([ARCHITECTURE]);
        UAParser.DEVICE = enumerize([MODEL, VENDOR, TYPE, CONSOLE, MOBILE, SMARTTV, TABLET, WEARABLE, EMBEDDED]);
        UAParser.ENGINE = UAParser.OS = enumerize([NAME, VERSION]); ///////////
        // Export
        //////////
        // check js environment

        {
          // nodejs env
          if (module.exports) {
            exports = module.exports = UAParser;
          }

          exports.UAParser = UAParser;
        } // jQuery/Zepto specific (optional)
        // Note:
        //   In AMD env the global scope should be kept clean, but jQuery is an exception.
        //   jQuery always exports to global scope, unless jQuery.noConflict(true) is used,
        //   and we should catch that.


        var $ = typeof window !== UNDEF_TYPE && (window.jQuery || window.Zepto);

        if ($ && !$.ua) {
          var parser = new UAParser();
          $.ua = parser.getResult();

          $.ua.get = function () {
            return parser.getUA();
          };

          $.ua.set = function (ua) {
            parser.setUA(ua);
            var result = parser.getResult();

            for (var prop in result) {
              $.ua[prop] = result[prop];
            }
          };
        }
      })(typeof window === 'object' ? window : commonjsGlobal);
    });
    uaParser.UAParser;

    // this is pretty straight-forward - we use the crypto API.

    var rng = function nodeRNG() {
      return crypto__default["default"].randomBytes(16);
    };

    /**
     * Convert array of 16 byte values to UUID string format of the form:
     * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
     */
    var byteToHex = [];

    for (var i = 0; i < 256; ++i) {
      byteToHex[i] = (i + 0x100).toString(16).substr(1);
    }

    function bytesToUuid(buf, offset) {
      var i = offset || 0;
      var bth = byteToHex; // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4

      return [bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]]].join('');
    }

    var bytesToUuid_1 = bytesToUuid;

    function v4(options, buf, offset) {
      var i = buf && offset || 0;

      if (typeof options == 'string') {
        buf = options === 'binary' ? new Array(16) : null;
        options = null;
      }

      options = options || {};
      var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

      rnds[6] = rnds[6] & 0x0f | 0x40;
      rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

      if (buf) {
        for (var ii = 0; ii < 16; ++ii) {
          buf[i + ii] = rnds[ii];
        }
      }

      return buf || bytesToUuid_1(rnds);
    }

    var v4_1 = v4;

    /*
    WildEmitter.js is a slim little event emitter by @henrikjoreteg largely based
    on @visionmedia's Emitter from UI Kit.

    Why? I wanted it standalone.

    I also wanted support for wildcard emitters like this:

    emitter.on('*', function (eventName, other, event, payloads) {

    });

    emitter.on('somenamespace*', function (eventName, payloads) {

    });

    Please note that callbacks triggered by wildcard registered events also get
    the event name as the first argument.
    */
    var wildemitter = WildEmitter;

    function WildEmitter() {}

    WildEmitter.mixin = function (constructor) {
      var prototype = constructor.prototype || constructor;
      prototype.isWildEmitter = true; // Listen on the given `event` with `fn`. Store a group name if present.

      prototype.on = function (event, groupName, fn) {
        this.callbacks = this.callbacks || {};
        var hasGroup = arguments.length === 3,
            group = hasGroup ? arguments[1] : undefined,
            func = hasGroup ? arguments[2] : arguments[1];
        func._groupName = group;
        (this.callbacks[event] = this.callbacks[event] || []).push(func);
        return this;
      }; // Adds an `event` listener that will be invoked a single
      // time then automatically removed.


      prototype.once = function (event, groupName, fn) {
        var self = this,
            hasGroup = arguments.length === 3,
            group = hasGroup ? arguments[1] : undefined,
            func = hasGroup ? arguments[2] : arguments[1];

        function on() {
          self.off(event, on);
          func.apply(this, arguments);
        }

        this.on(event, group, on);
        return this;
      }; // Unbinds an entire group


      prototype.releaseGroup = function (groupName) {
        this.callbacks = this.callbacks || {};
        var item, i, len, handlers;

        for (item in this.callbacks) {
          handlers = this.callbacks[item];

          for (i = 0, len = handlers.length; i < len; i++) {
            if (handlers[i]._groupName === groupName) {
              //console.log('removing');
              // remove it and shorten the array we're looping through
              handlers.splice(i, 1);
              i--;
              len--;
            }
          }
        }

        return this;
      }; // Remove the given callback for `event` or all
      // registered callbacks.


      prototype.off = function (event, fn) {
        this.callbacks = this.callbacks || {};
        var callbacks = this.callbacks[event],
            i;
        if (!callbacks) return this; // remove all handlers

        if (arguments.length === 1) {
          delete this.callbacks[event];
          return this;
        } // remove specific handler


        i = callbacks.indexOf(fn);

        if (i !== -1) {
          callbacks.splice(i, 1);

          if (callbacks.length === 0) {
            delete this.callbacks[event];
          }
        }

        return this;
      }; /// Emit `event` with the given args.
      // also calls any `*` handlers


      prototype.emit = function (event) {
        this.callbacks = this.callbacks || {};
        var args = [].slice.call(arguments, 1),
            callbacks = this.callbacks[event],
            specialCallbacks = this.getWildcardCallbacks(event),
            i,
            len,
            listeners;

        if (callbacks) {
          listeners = callbacks.slice();

          for (i = 0, len = listeners.length; i < len; ++i) {
            if (!listeners[i]) {
              break;
            }

            listeners[i].apply(this, args);
          }
        }

        if (specialCallbacks) {
          len = specialCallbacks.length;
          listeners = specialCallbacks.slice();

          for (i = 0, len = listeners.length; i < len; ++i) {
            if (!listeners[i]) {
              break;
            }

            listeners[i].apply(this, [event].concat(args));
          }
        }

        return this;
      }; // Helper for for finding special wildcard event handlers that match the event


      prototype.getWildcardCallbacks = function (eventName) {
        this.callbacks = this.callbacks || {};
        var item,
            split,
            result = [];

        for (item in this.callbacks) {
          split = item.split('*');

          if (item === '*' || split.length === 2 && eventName.slice(0, split[0].length) === split[0]) {
            result = result.concat(this.callbacks[item]);
          }
        }

        return result;
      };
    };

    WildEmitter.mixin(WildEmitter);

    function getMaxVolume(analyser, fftBins) {
      var maxVolume = -Infinity;
      analyser.getFloatFrequencyData(fftBins);

      for (var i = 4, ii = fftBins.length; i < ii; i++) {
        if (fftBins[i] > maxVolume && fftBins[i] < 0) {
          maxVolume = fftBins[i];
        }
      }
      return maxVolume;
    }

    var audioContextType;

    if (typeof window !== 'undefined') {
      audioContextType = window.AudioContext || window.webkitAudioContext;
    } // use a single audio context due to hardware limits


    var audioContext = null;

    var hark = function (stream, options) {
      var harker = new wildemitter(); // make it not break in non-supported browsers

      if (!audioContextType) return harker; //Config

      var options = options || {},
          smoothing = options.smoothing || 0.1,
          interval = options.interval || 50,
          threshold = options.threshold,
          play = options.play,
          history = options.history || 10,
          running = true; // Ensure that just a single AudioContext is internally created

      audioContext = options.audioContext || audioContext || new audioContextType();
      var sourceNode, fftBins, analyser;
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = smoothing;
      fftBins = new Float32Array(analyser.frequencyBinCount);
      if (stream.jquery) stream = stream[0];

      if (stream instanceof HTMLAudioElement || stream instanceof HTMLVideoElement) {
        //Audio Tag
        sourceNode = audioContext.createMediaElementSource(stream);
        if (typeof play === 'undefined') play = true;
        threshold = threshold || -50;
      } else {
        //WebRTC Stream
        sourceNode = audioContext.createMediaStreamSource(stream);
        threshold = threshold || -50;
      }

      sourceNode.connect(analyser);
      if (play) analyser.connect(audioContext.destination);
      harker.speaking = false;

      harker.suspend = function () {
        return audioContext.suspend();
      };

      harker.resume = function () {
        return audioContext.resume();
      };

      Object.defineProperty(harker, 'state', {
        get: function () {
          return audioContext.state;
        }
      });

      audioContext.onstatechange = function () {
        harker.emit('state_change', audioContext.state);
      };

      harker.setThreshold = function (t) {
        threshold = t;
      };

      harker.setInterval = function (i) {
        interval = i;
      };

      harker.stop = function () {
        running = false;
        harker.emit('volume_change', -100, threshold);

        if (harker.speaking) {
          harker.speaking = false;
          harker.emit('stopped_speaking');
        }

        analyser.disconnect();
        sourceNode.disconnect();
      };

      harker.speakingHistory = [];

      for (var i = 0; i < history; i++) {
        harker.speakingHistory.push(0);
      } // Poll the analyser node to determine if speaking
      // and emit events if changed


      var looper = function () {
        setTimeout(function () {
          //check if stop has been called
          if (!running) {
            return;
          }

          var currentVolume = getMaxVolume(analyser, fftBins);
          harker.emit('volume_change', currentVolume, threshold);
          var history = 0;

          if (currentVolume > threshold && !harker.speaking) {
            // trigger quickly, short history
            for (var i = harker.speakingHistory.length - 3; i < harker.speakingHistory.length; i++) {
              history += harker.speakingHistory[i];
            }

            if (history >= 2) {
              harker.speaking = true;
              harker.emit('speaking');
            }
          } else if (currentVolume < threshold && harker.speaking) {
            for (var i = 0; i < harker.speakingHistory.length; i++) {
              history += harker.speakingHistory[i];
            }

            if (history == 0) {
              harker.speaking = false;
              harker.emit('stopped_speaking');
            }
          }

          harker.speakingHistory.shift();
          harker.speakingHistory.push(0 + (currentVolume > threshold));
          looper();
        }, interval);
      };

      looper();
      return harker;
    };

    var merge = createCommonjsModule(function (module) {

      (function (isNode) {
        /**
         * Merge one or more objects 
         * @param bool? clone
         * @param mixed,... arguments
         * @return object
         */
        var Public = function (clone) {
          return merge(clone === true, false, arguments);
        },
            publicName = 'merge';
        /**
         * Merge two or more objects recursively 
         * @param bool? clone
         * @param mixed,... arguments
         * @return object
         */


        Public.recursive = function (clone) {
          return merge(clone === true, true, arguments);
        };
        /**
         * Clone the input removing any reference
         * @param mixed input
         * @return mixed
         */


        Public.clone = function (input) {
          var output = input,
              type = typeOf(input),
              index,
              size;

          if (type === 'array') {
            output = [];
            size = input.length;

            for (index = 0; index < size; ++index) output[index] = Public.clone(input[index]);
          } else if (type === 'object') {
            output = {};

            for (index in input) output[index] = Public.clone(input[index]);
          }

          return output;
        };
        /**
         * Merge two objects recursively
         * @param mixed input
         * @param mixed extend
         * @return mixed
         */


        function merge_recursive(base, extend) {
          if (typeOf(base) !== 'object') return extend;

          for (var key in extend) {
            if (typeOf(base[key]) === 'object' && typeOf(extend[key]) === 'object') {
              base[key] = merge_recursive(base[key], extend[key]);
            } else {
              base[key] = extend[key];
            }
          }

          return base;
        }
        /**
         * Merge two or more objects
         * @param bool clone
         * @param bool recursive
         * @param array argv
         * @return object
         */


        function merge(clone, recursive, argv) {
          var result = argv[0],
              size = argv.length;
          if (clone || typeOf(result) !== 'object') result = {};

          for (var index = 0; index < size; ++index) {
            var item = argv[index],
                type = typeOf(item);
            if (type !== 'object') continue;

            for (var key in item) {
              if (key === '__proto__') continue;
              var sitem = clone ? Public.clone(item[key]) : item[key];

              if (recursive) {
                result[key] = merge_recursive(result[key], sitem);
              } else {
                result[key] = sitem;
              }
            }
          }

          return result;
        }
        /**
         * Get type of variable
         * @param mixed input
         * @return string
         *
         * @see http://jsperf.com/typeofvar
         */


        function typeOf(input) {
          return {}.toString.call(input).slice(8, -1).toLowerCase();
        }

        if (isNode) {
          module.exports = Public;
        } else {
          window[publicName] = Public;
        }
      })(module && 'object' === 'object' && module.exports);
    });

    var grammar_1 = createCommonjsModule(function (module) {
      var grammar = module.exports = {
        v: [{
          name: 'version',
          reg: /^(\d*)$/
        }],
        o: [{
          //o=- 20518 0 IN IP4 203.0.113.1
          // NB: sessionId will be a String in most cases because it is huge
          name: 'origin',
          reg: /^(\S*) (\d*) (\d*) (\S*) IP(\d) (\S*)/,
          names: ['username', 'sessionId', 'sessionVersion', 'netType', 'ipVer', 'address'],
          format: "%s %s %d %s IP%d %s"
        }],
        // default parsing of these only (though some of these feel outdated)
        s: [{
          name: 'name'
        }],
        i: [{
          name: 'description'
        }],
        u: [{
          name: 'uri'
        }],
        e: [{
          name: 'email'
        }],
        p: [{
          name: 'phone'
        }],
        z: [{
          name: 'timezones'
        }],
        // TODO: this one can actually be parsed properly..
        r: [{
          name: 'repeats'
        }],
        // TODO: this one can also be parsed properly
        //k: [{}], // outdated thing ignored
        t: [{
          //t=0 0
          name: 'timing',
          reg: /^(\d*) (\d*)/,
          names: ['start', 'stop'],
          format: "%d %d"
        }],
        c: [{
          //c=IN IP4 10.47.197.26
          name: 'connection',
          reg: /^IN IP(\d) (\S*)/,
          names: ['version', 'ip'],
          format: "IN IP%d %s"
        }],
        b: [{
          //b=AS:4000
          push: 'bandwidth',
          reg: /^(TIAS|AS|CT|RR|RS):(\d*)/,
          names: ['type', 'limit'],
          format: "%s:%s"
        }],
        m: [{
          //m=video 51744 RTP/AVP 126 97 98 34 31
          // NB: special - pushes to session
          // TODO: rtp/fmtp should be filtered by the payloads found here?
          reg: /^(\w*) (\d*) ([\w\/]*)(?: (.*))?/,
          names: ['type', 'port', 'protocol', 'payloads'],
          format: "%s %d %s %s"
        }],
        a: [{
          //a=rtpmap:110 opus/48000/2
          push: 'rtp',
          reg: /^rtpmap:(\d*) ([\w\-]*)(?:\s*\/(\d*)(?:\s*\/(\S*))?)?/,
          names: ['payload', 'codec', 'rate', 'encoding'],
          format: function (o) {
            return o.encoding ? "rtpmap:%d %s/%s/%s" : o.rate ? "rtpmap:%d %s/%s" : "rtpmap:%d %s";
          }
        }, {
          //a=fmtp:108 profile-level-id=24;object=23;bitrate=64000
          //a=fmtp:111 minptime=10; useinbandfec=1
          push: 'fmtp',
          reg: /^fmtp:(\d*) ([\S| ]*)/,
          names: ['payload', 'config'],
          format: "fmtp:%d %s"
        }, {
          //a=control:streamid=0
          name: 'control',
          reg: /^control:(.*)/,
          format: "control:%s"
        }, {
          //a=rtcp:65179 IN IP4 193.84.77.194
          name: 'rtcp',
          reg: /^rtcp:(\d*)(?: (\S*) IP(\d) (\S*))?/,
          names: ['port', 'netType', 'ipVer', 'address'],
          format: function (o) {
            return o.address != null ? "rtcp:%d %s IP%d %s" : "rtcp:%d";
          }
        }, {
          //a=rtcp-fb:98 trr-int 100
          push: 'rtcpFbTrrInt',
          reg: /^rtcp-fb:(\*|\d*) trr-int (\d*)/,
          names: ['payload', 'value'],
          format: "rtcp-fb:%d trr-int %d"
        }, {
          //a=rtcp-fb:98 nack rpsi
          push: 'rtcpFb',
          reg: /^rtcp-fb:(\*|\d*) ([\w-_]*)(?: ([\w-_]*))?/,
          names: ['payload', 'type', 'subtype'],
          format: function (o) {
            return o.subtype != null ? "rtcp-fb:%s %s %s" : "rtcp-fb:%s %s";
          }
        }, {
          //a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
          //a=extmap:1/recvonly URI-gps-string
          push: 'ext',
          reg: /^extmap:([\w_\/]*) (\S*)(?: (\S*))?/,
          names: ['value', 'uri', 'config'],
          // value may include "/direction" suffix
          format: function (o) {
            return o.config != null ? "extmap:%s %s %s" : "extmap:%s %s";
          }
        }, {
          //a=crypto:1 AES_CM_128_HMAC_SHA1_80 inline:PS1uQCVeeCFCanVmcjkpPywjNWhcYD0mXXtxaVBR|2^20|1:32
          push: 'crypto',
          reg: /^crypto:(\d*) ([\w_]*) (\S*)(?: (\S*))?/,
          names: ['id', 'suite', 'config', 'sessionConfig'],
          format: function (o) {
            return o.sessionConfig != null ? "crypto:%d %s %s %s" : "crypto:%d %s %s";
          }
        }, {
          //a=setup:actpass
          name: 'setup',
          reg: /^setup:(\w*)/,
          format: "setup:%s"
        }, {
          //a=mid:1
          name: 'mid',
          reg: /^mid:([^\s]*)/,
          format: "mid:%s"
        }, {
          //a=msid:0c8b064d-d807-43b4-b434-f92a889d8587 98178685-d409-46e0-8e16-7ef0db0db64a
          name: 'msid',
          reg: /^msid:(.*)/,
          format: "msid:%s"
        }, {
          //a=ptime:20
          name: 'ptime',
          reg: /^ptime:(\d*)/,
          format: "ptime:%d"
        }, {
          //a=maxptime:60
          name: 'maxptime',
          reg: /^maxptime:(\d*)/,
          format: "maxptime:%d"
        }, {
          //a=sendrecv
          name: 'direction',
          reg: /^(sendrecv|recvonly|sendonly|inactive)/
        }, {
          //a=ice-lite
          name: 'icelite',
          reg: /^(ice-lite)/
        }, {
          //a=ice-ufrag:F7gI
          name: 'iceUfrag',
          reg: /^ice-ufrag:(\S*)/,
          format: "ice-ufrag:%s"
        }, {
          //a=ice-pwd:x9cml/YzichV2+XlhiMu8g
          name: 'icePwd',
          reg: /^ice-pwd:(\S*)/,
          format: "ice-pwd:%s"
        }, {
          //a=fingerprint:SHA-1 00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE:FF:00:11:22:33
          name: 'fingerprint',
          reg: /^fingerprint:(\S*) (\S*)/,
          names: ['type', 'hash'],
          format: "fingerprint:%s %s"
        }, {
          //a=candidate:0 1 UDP 2113667327 203.0.113.1 54400 typ host
          //a=candidate:1162875081 1 udp 2113937151 192.168.34.75 60017 typ host generation 0
          //a=candidate:3289912957 2 udp 1845501695 193.84.77.194 60017 typ srflx raddr 192.168.34.75 rport 60017 generation 0
          //a=candidate:229815620 1 tcp 1518280447 192.168.150.19 60017 typ host tcptype active generation 0
          //a=candidate:3289912957 2 tcp 1845501695 193.84.77.194 60017 typ srflx raddr 192.168.34.75 rport 60017 tcptype passive generation 0
          push: 'candidates',
          reg: /^candidate:(\S*) (\d*) (\S*) (\d*) (\S*) (\d*) typ (\S*)(?: raddr (\S*) rport (\d*))?(?: tcptype (\S*))?(?: generation (\d*))?/,
          names: ['foundation', 'component', 'transport', 'priority', 'ip', 'port', 'type', 'raddr', 'rport', 'tcptype', 'generation'],
          format: function (o) {
            var str = "candidate:%s %d %s %d %s %d typ %s";
            str += o.raddr != null ? " raddr %s rport %d" : "%v%v"; // NB: candidate has three optional chunks, so %void middles one if it's missing

            str += o.tcptype != null ? " tcptype %s" : "%v";

            if (o.generation != null) {
              str += " generation %d";
            }

            return str;
          }
        }, {
          //a=end-of-candidates (keep after the candidates line for readability)
          name: 'endOfCandidates',
          reg: /^(end-of-candidates)/
        }, {
          //a=remote-candidates:1 203.0.113.1 54400 2 203.0.113.1 54401 ...
          name: 'remoteCandidates',
          reg: /^remote-candidates:(.*)/,
          format: "remote-candidates:%s"
        }, {
          //a=ice-options:google-ice
          name: 'iceOptions',
          reg: /^ice-options:(\S*)/,
          format: "ice-options:%s"
        }, {
          //a=ssrc:2566107569 cname:t9YU8M1UxTF8Y1A1
          push: "ssrcs",
          reg: /^ssrc:(\d*) ([\w_]*):(.*)/,
          names: ['id', 'attribute', 'value'],
          format: "ssrc:%d %s:%s"
        }, {
          //a=ssrc-group:FEC 1 2
          push: "ssrcGroups",
          reg: /^ssrc-group:(\w*) (.*)/,
          names: ['semantics', 'ssrcs'],
          format: "ssrc-group:%s %s"
        }, {
          //a=msid-semantic: WMS Jvlam5X3SX1OP6pn20zWogvaKJz5Hjf9OnlV
          name: "msidSemantic",
          reg: /^msid-semantic:\s?(\w*) (\S*)/,
          names: ['semantic', 'token'],
          format: "msid-semantic: %s %s" // space after ":" is not accidental

        }, {
          //a=group:BUNDLE audio video
          push: 'groups',
          reg: /^group:(\w*) (.*)/,
          names: ['type', 'mids'],
          format: "group:%s %s"
        }, {
          //a=rtcp-mux
          name: 'rtcpMux',
          reg: /^(rtcp-mux)/
        }, {
          //a=rtcp-rsize
          name: 'rtcpRsize',
          reg: /^(rtcp-rsize)/
        }, {
          // any a= that we don't understand is kepts verbatim on media.invalid
          push: 'invalid',
          names: ["value"]
        }]
      }; // set sensible defaults to avoid polluting the grammar with boring details

      Object.keys(grammar).forEach(function (key) {
        var objs = grammar[key];
        objs.forEach(function (obj) {
          if (!obj.reg) {
            obj.reg = /(.*)/;
          }

          if (!obj.format) {
            obj.format = "%s";
          }
        });
      });
    });
    grammar_1.v;
    grammar_1.o;
    grammar_1.s;
    grammar_1.i;
    grammar_1.u;
    grammar_1.e;
    grammar_1.p;
    grammar_1.z;
    grammar_1.r;
    grammar_1.t;
    grammar_1.c;
    grammar_1.b;
    grammar_1.m;
    grammar_1.a;

    var toIntIfInt = function (v) {
      return String(Number(v)) === v ? Number(v) : v;
    };

    var attachProperties = function (match, location, names, rawName) {
      if (rawName && !names) {
        location[rawName] = toIntIfInt(match[1]);
      } else {
        for (var i = 0; i < names.length; i += 1) {
          if (match[i + 1] != null) {
            location[names[i]] = toIntIfInt(match[i + 1]);
          }
        }
      }
    };

    var parseReg = function (obj, location, content) {
      var needsBlank = obj.name && obj.names;

      if (obj.push && !location[obj.push]) {
        location[obj.push] = [];
      } else if (needsBlank && !location[obj.name]) {
        location[obj.name] = {};
      }

      var keyLocation = obj.push ? {} : // blank object that will be pushed
      needsBlank ? location[obj.name] : location; // otherwise, named location or root

      attachProperties(content.match(obj.reg), keyLocation, obj.names, obj.name);

      if (obj.push) {
        location[obj.push].push(keyLocation);
      }
    };

    var validLine = RegExp.prototype.test.bind(/^([a-z])=(.*)/);

    var parse$2 = function (sdp) {
      var session = {},
          media = [],
          location = session; // points at where properties go under (one of the above)
      // parse lines we understand

      sdp.split(/(\r\n|\r|\n)/).filter(validLine).forEach(function (l) {
        var type = l[0];
        var content = l.slice(2);

        if (type === 'm') {
          media.push({
            rtp: [],
            fmtp: []
          });
          location = media[media.length - 1]; // point at latest media line
        }

        for (var j = 0; j < (grammar_1[type] || []).length; j += 1) {
          var obj = grammar_1[type][j];

          if (obj.reg.test(content)) {
            return parseReg(obj, location, content);
          }
        }
      });
      session.media = media; // link it up

      return session;
    };

    var fmtpReducer = function (acc, expr) {
      var s = expr.split('=');

      if (s.length === 2) {
        acc[s[0]] = toIntIfInt(s[1]);
      }

      return acc;
    };

    var parseFmtpConfig$1 = function (str) {
      return str.split(/\;\s?/).reduce(fmtpReducer, {});
    };

    var parsePayloads$1 = function (str) {
      return str.split(' ').map(Number);
    };

    var parseRemoteCandidates$1 = function (str) {
      var candidates = [];
      var parts = str.split(' ').map(toIntIfInt);

      for (var i = 0; i < parts.length; i += 3) {
        candidates.push({
          component: parts[i],
          ip: parts[i + 1],
          port: parts[i + 2]
        });
      }

      return candidates;
    };

    var parser$1 = {
      parse: parse$2,
      parseFmtpConfig: parseFmtpConfig$1,
      parsePayloads: parsePayloads$1,
      parseRemoteCandidates: parseRemoteCandidates$1
    };

    var formatRegExp = /%[sdv%]/g;

    var format = function (formatStr) {
      var i = 1;
      var args = arguments;
      var len = args.length;
      return formatStr.replace(formatRegExp, function (x) {
        if (i >= len) {
          return x; // missing argument
        }

        var arg = args[i];
        i += 1;

        switch (x) {
          case '%%':
            return '%';

          case '%s':
            return String(arg);

          case '%d':
            return Number(arg);

          case '%v':
            return '';
        }
      }); // NB: we discard excess arguments - they are typically undefined from makeLine
    };

    var makeLine = function (type, obj, location) {
      var str = obj.format instanceof Function ? obj.format(obj.push ? location : location[obj.name]) : obj.format;
      var args = [type + '=' + str];

      if (obj.names) {
        for (var i = 0; i < obj.names.length; i += 1) {
          var n = obj.names[i];

          if (obj.name) {
            args.push(location[obj.name][n]);
          } else {
            // for mLine and push attributes
            args.push(location[obj.names[i]]);
          }
        }
      } else {
        args.push(location[obj.name]);
      }

      return format.apply(null, args);
    }; // RFC specified order
    // TODO: extend this with all the rest


    var defaultOuterOrder = ['v', 'o', 's', 'i', 'u', 'e', 'p', 'c', 'b', 't', 'r', 'z', 'a'];
    var defaultInnerOrder = ['i', 'c', 'b', 'a'];

    var writer = function (session, opts) {
      opts = opts || {}; // ensure certain properties exist

      if (session.version == null) {
        session.version = 0; // "v=0" must be there (only defined version atm)
      }

      if (session.name == null) {
        session.name = " "; // "s= " must be there if no meaningful name set
      }

      session.media.forEach(function (mLine) {
        if (mLine.payloads == null) {
          mLine.payloads = "";
        }
      });
      var outerOrder = opts.outerOrder || defaultOuterOrder;
      var innerOrder = opts.innerOrder || defaultInnerOrder;
      var sdp = []; // loop through outerOrder for matching properties on session

      outerOrder.forEach(function (type) {
        grammar_1[type].forEach(function (obj) {
          if (obj.name in session && session[obj.name] != null) {
            sdp.push(makeLine(type, obj, session));
          } else if (obj.push in session && session[obj.push] != null) {
            session[obj.push].forEach(function (el) {
              sdp.push(makeLine(type, obj, el));
            });
          }
        });
      }); // then for each media line, follow the innerOrder

      session.media.forEach(function (mLine) {
        sdp.push(makeLine('m', grammar_1.m[0], mLine));
        innerOrder.forEach(function (type) {
          grammar_1[type].forEach(function (obj) {
            if (obj.name in mLine && mLine[obj.name] != null) {
              sdp.push(makeLine(type, obj, mLine));
            } else if (obj.push in mLine && mLine[obj.push] != null) {
              mLine[obj.push].forEach(function (el) {
                sdp.push(makeLine(type, obj, el));
              });
            }
          });
        });
      });
      return sdp.join('\r\n') + '\r\n';
    };

    var write$1 = writer;
    var parse$1 = parser$1.parse;
    var parseFmtpConfig = parser$1.parseFmtpConfig;
    var parsePayloads = parser$1.parsePayloads;
    var parseRemoteCandidates = parser$1.parseRemoteCandidates;
    var lib$2 = {
      write: write$1,
      parse: parse$1,
      parseFmtpConfig: parseFmtpConfig,
      parsePayloads: parsePayloads,
      parseRemoteCandidates: parseRemoteCandidates
    };

    /* Copyright @ 2015 Atlassian Pty Ltd
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *     http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    var write = function (session, opts) {
      if (typeof session !== 'undefined' && typeof session.media !== 'undefined' && Array.isArray(session.media)) {
        session.media.forEach(function (mLine) {
          // expand sources to ssrcs
          if (typeof mLine.sources !== 'undefined' && Object.keys(mLine.sources).length !== 0) {
            mLine.ssrcs = [];
            Object.keys(mLine.sources).forEach(function (ssrc) {
              var source = mLine.sources[ssrc];
              Object.keys(source).forEach(function (attribute) {
                mLine.ssrcs.push({
                  id: ssrc,
                  attribute: attribute,
                  value: source[attribute]
                });
              });
            });
            delete mLine.sources;
          } // join ssrcs in ssrc groups


          if (typeof mLine.ssrcGroups !== 'undefined' && Array.isArray(mLine.ssrcGroups)) {
            mLine.ssrcGroups.forEach(function (ssrcGroup) {
              if (typeof ssrcGroup.ssrcs !== 'undefined' && Array.isArray(ssrcGroup.ssrcs)) {
                ssrcGroup.ssrcs = ssrcGroup.ssrcs.join(' ');
              }
            });
          }
        });
      } // join group mids


      if (typeof session !== 'undefined' && typeof session.groups !== 'undefined' && Array.isArray(session.groups)) {
        session.groups.forEach(function (g) {
          if (typeof g.mids !== 'undefined' && Array.isArray(g.mids)) {
            g.mids = g.mids.join(' ');
          }
        });
      }

      return lib$2.write(session, opts);
    };

    var parse = function (sdp) {
      var session = lib$2.parse(sdp);

      if (typeof session !== 'undefined' && typeof session.media !== 'undefined' && Array.isArray(session.media)) {
        session.media.forEach(function (mLine) {
          // group sources attributes by ssrc
          if (typeof mLine.ssrcs !== 'undefined' && Array.isArray(mLine.ssrcs)) {
            mLine.sources = {};
            mLine.ssrcs.forEach(function (ssrc) {
              if (!mLine.sources[ssrc.id]) mLine.sources[ssrc.id] = {};
              mLine.sources[ssrc.id][ssrc.attribute] = ssrc.value;
            });
            delete mLine.ssrcs;
          } // split ssrcs in ssrc groups


          if (typeof mLine.ssrcGroups !== 'undefined' && Array.isArray(mLine.ssrcGroups)) {
            mLine.ssrcGroups.forEach(function (ssrcGroup) {
              if (typeof ssrcGroup.ssrcs === 'string') {
                ssrcGroup.ssrcs = ssrcGroup.ssrcs.split(' ');
              }
            });
          }
        });
      } // split group mids


      if (typeof session !== 'undefined' && typeof session.groups !== 'undefined' && Array.isArray(session.groups)) {
        session.groups.forEach(function (g) {
          if (typeof g.mids === 'string') {
            g.mids = g.mids.split(' ');
          }
        });
      }

      return session;
    };

    var transform_1 = {
      write: write,
      parse: parse
    };

    /* Copyright @ 2015 Atlassian Pty Ltd
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *     http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var arrayEquals = function arrayEquals(array) {
      // if the other array is a falsy value, return
      if (!array) return false; // compare lengths - can save a lot of time

      if (this.length != array.length) return false;

      for (var i = 0, l = this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
          // recurse into the nested arrays
          if (!arrayEquals.apply(this[i], [array[i]])) return false;
        } else if (this[i] != array[i]) {
          // Warning - two different object instances will never be equal:
          // {x:20} != {x:20}
          return false;
        }
      }

      return true;
    };

    function Interop$1() {
      /**
       * This map holds the most recent Unified Plan offer/answer SDP that was
       * converted to Plan B, with the SDP type ('offer' or 'answer') as keys and
       * the SDP string as values.
       *
       * @type {{}}
       */
      this.cache = {
        mlB2UMap: {},
        mlU2BMap: {}
      };
    }

    var interop = Interop$1;
    /**
     * Changes the candidate args to match with the related Unified Plan
     */

    Interop$1.prototype.candidateToUnifiedPlan = function (candidate) {
      var cand = new RTCIceCandidate(candidate);
      cand.sdpMLineIndex = this.cache.mlB2UMap[cand.sdpMLineIndex];
      /* TODO: change sdpMid to (audio|video)-SSRC */

      return cand;
    };
    /**
     * Changes the candidate args to match with the related Plan B
     */


    Interop$1.prototype.candidateToPlanB = function (candidate) {
      var cand = new RTCIceCandidate(candidate);

      if (cand.sdpMid.indexOf('audio') === 0) {
        cand.sdpMid = 'audio';
      } else if (cand.sdpMid.indexOf('video') === 0) {
        cand.sdpMid = 'video';
      } else {
        throw new Error('candidate with ' + cand.sdpMid + ' not allowed');
      }

      cand.sdpMLineIndex = this.cache.mlU2BMap[cand.sdpMLineIndex];
      return cand;
    };
    /**
     * Returns the index of the first m-line with the given media type and with a
     * direction which allows sending, in the last Unified Plan description with
     * type "answer" converted to Plan B. Returns {null} if there is no saved
     * answer, or if none of its m-lines with the given type allow sending.
     * @param type the media type ("audio" or "video").
     * @returns {*}
     */


    Interop$1.prototype.getFirstSendingIndexFromAnswer = function (type) {
      if (!this.cache.answer) {
        return null;
      }

      var session = transform_1.parse(this.cache.answer);

      if (session && session.media && Array.isArray(session.media)) {
        for (var i = 0; i < session.media.length; i++) {
          if (session.media[i].type == type && (!session.media[i].direction
          /* default to sendrecv */
          || session.media[i].direction === 'sendrecv' || session.media[i].direction === 'sendonly')) {
            return i;
          }
        }
      }

      return null;
    };
    /**
     * This method transforms a Unified Plan SDP to an equivalent Plan B SDP. A
     * PeerConnection wrapper transforms the SDP to Plan B before passing it to the
     * application.
     *
     * @param desc
     * @returns {*}
     */


    Interop$1.prototype.toPlanB = function (desc) {
      var self = this; //#region Preliminary input validation.

      if (typeof desc !== 'object' || desc === null || typeof desc.sdp !== 'string') {
        console.warn('An empty description was passed as an argument.');
        return desc;
      } // Objectify the SDP for easier manipulation.


      var session = transform_1.parse(desc.sdp); // If the SDP contains no media, there's nothing to transform.

      if (typeof session.media === 'undefined' || !Array.isArray(session.media) || session.media.length === 0) {
        console.warn('The description has no media.');
        return desc;
      } // Try some heuristics to "make sure" this is a Unified Plan SDP. Plan B
      // SDP has a video, an audio and a data "channel" at most.


      if (session.media.length <= 3 && session.media.every(function (m) {
        return ['video', 'audio', 'data'].indexOf(m.mid) !== -1;
      })) {
        console.warn('This description does not look like Unified Plan.');
        return desc;
      } //#endregion
      // HACK https://bugzilla.mozilla.org/show_bug.cgi?id=1113443


      var sdp = desc.sdp;
      var rewrite = false;

      for (var i = 0; i < session.media.length; i++) {
        var uLine = session.media[i];
        uLine.rtp.forEach(function (rtp) {
          if (rtp.codec === 'NULL') {
            rewrite = true;
            var offer = transform_1.parse(self.cache.offer);
            rtp.codec = offer.media[i].rtp[0].codec;
          }
        });
      }

      if (rewrite) {
        sdp = transform_1.write(session);
      } // Unified Plan SDP is our "precious". Cache it for later use in the Plan B
      // -> Unified Plan transformation.


      this.cache[desc.type] = sdp; //#region Convert from Unified Plan to Plan B.
      // We rebuild the session.media array.

      var media = session.media;
      session.media = []; // Associative array that maps channel types to channel objects for fast
      // access to channel objects by their type, e.g. type2bl['audio']->channel
      // obj.

      var type2bl = {}; // Used to build the group:BUNDLE value after the channels construction
      // loop.

      var types = [];
      media.forEach(function (uLine) {
        // rtcp-mux is required in the Plan B SDP.
        if ((typeof uLine.rtcpMux !== 'string' || uLine.rtcpMux !== 'rtcp-mux') && uLine.direction !== 'inactive') {
          throw new Error('Cannot convert to Plan B because m-lines ' + 'without the rtcp-mux attribute were found.');
        } // If we don't have a channel for this uLine.type OR the selected is
        // inactive, then select this uLine as the channel basis.


        if (typeof type2bl[uLine.type] === 'undefined' || type2bl[uLine.type].direction === 'inactive') {
          type2bl[uLine.type] = uLine;
        }

        if (uLine.protocol != type2bl[uLine.type].protocol) {
          throw new Error('Cannot convert to Plan B because m-lines ' + 'have different protocols and this library does not have ' + 'support for that');
        }

        if (uLine.payloads != type2bl[uLine.type].payloads) {
          throw new Error('Cannot convert to Plan B because m-lines ' + 'have different payloads and this library does not have ' + 'support for that');
        }
      }); // Implode the Unified Plan m-lines/tracks into Plan B channels.

      media.forEach(function (uLine) {
        if (uLine.type === 'application') {
          session.media.push(uLine);
          types.push(uLine.mid);
          return;
        } // Add sources to the channel and handle a=msid.


        if (typeof uLine.sources === 'object') {
          Object.keys(uLine.sources).forEach(function (ssrc) {
            if (typeof type2bl[uLine.type].sources !== 'object') type2bl[uLine.type].sources = {}; // Assign the sources to the channel.

            type2bl[uLine.type].sources[ssrc] = uLine.sources[ssrc];

            if (typeof uLine.msid !== 'undefined') {
              // In Plan B the msid is an SSRC attribute. Also, we don't
              // care about the obsolete label and mslabel attributes.
              //
              // Note that it is not guaranteed that the uLine will
              // have an msid. recvonly channels in particular don't have
              // one.
              type2bl[uLine.type].sources[ssrc].msid = uLine.msid;
            } // NOTE ssrcs in ssrc groups will share msids, as
            // draft-uberti-rtcweb-plan-00 mandates.

          });
        } // Add ssrc groups to the channel.


        if (typeof uLine.ssrcGroups !== 'undefined' && Array.isArray(uLine.ssrcGroups)) {
          // Create the ssrcGroups array, if it's not defined.
          if (typeof type2bl[uLine.type].ssrcGroups === 'undefined' || !Array.isArray(type2bl[uLine.type].ssrcGroups)) {
            type2bl[uLine.type].ssrcGroups = [];
          }

          type2bl[uLine.type].ssrcGroups = type2bl[uLine.type].ssrcGroups.concat(uLine.ssrcGroups);
        }

        if (type2bl[uLine.type] === uLine) {
          // Plan B mids are in ['audio', 'video', 'data']
          uLine.mid = uLine.type; // Plan B doesn't support/need the bundle-only attribute.

          delete uLine.bundleOnly; // In Plan B the msid is an SSRC attribute.

          delete uLine.msid;

          if (uLine.type == media[0].type) {
            types.unshift(uLine.type); // Add the channel to the new media array.

            session.media.unshift(uLine);
          } else {
            types.push(uLine.type); // Add the channel to the new media array.

            session.media.push(uLine);
          }
        }
      });

      if (typeof session.groups !== 'undefined') {
        // We regenerate the BUNDLE group with the new mids.
        session.groups.some(function (group) {
          if (group.type === 'BUNDLE') {
            group.mids = types.join(' ');
            return true;
          }
        });
      } // msid semantic


      session.msidSemantic = {
        semantic: 'WMS',
        token: '*'
      };
      var resStr = transform_1.write(session);
      return new RTCSessionDescription({
        type: desc.type,
        sdp: resStr
      }); //#endregion
    };
    /* follow rules defined in RFC4145 */


    function addSetupAttr(uLine) {
      if (typeof uLine.setup === 'undefined') {
        return;
      }

      if (uLine.setup === "active") {
        uLine.setup = "passive";
      } else if (uLine.setup === "passive") {
        uLine.setup = "active";
      }
    }
    /**
     * This method transforms a Plan B SDP to an equivalent Unified Plan SDP. A
     * PeerConnection wrapper transforms the SDP to Unified Plan before passing it
     * to FF.
     *
     * @param desc
     * @returns {*}
     */


    Interop$1.prototype.toUnifiedPlan = function (desc) {
      var self = this; //#region Preliminary input validation.

      if (typeof desc !== 'object' || desc === null || typeof desc.sdp !== 'string') {
        console.warn('An empty description was passed as an argument.');
        return desc;
      }

      var session = transform_1.parse(desc.sdp); // If the SDP contains no media, there's nothing to transform.

      if (typeof session.media === 'undefined' || !Array.isArray(session.media) || session.media.length === 0) {
        console.warn('The description has no media.');
        return desc;
      } // Try some heuristics to "make sure" this is a Plan B SDP. Plan B SDP has
      // a video, an audio and a data "channel" at most.


      if (session.media.length > 3 || !session.media.every(function (m) {
        return ['video', 'audio', 'data'].indexOf(m.mid) !== -1;
      })) {
        console.warn('This description does not look like Plan B.');
        return desc;
      } // Make sure this Plan B SDP can be converted to a Unified Plan SDP.


      var mids = [];
      session.media.forEach(function (m) {
        mids.push(m.mid);
      });
      var hasBundle = false;

      if (typeof session.groups !== 'undefined' && Array.isArray(session.groups)) {
        hasBundle = session.groups.every(function (g) {
          return g.type !== 'BUNDLE' || arrayEquals.apply(g.mids.sort(), [mids.sort()]);
        });
      }

      if (!hasBundle) {
        var mustBeBundle = false;
        session.media.forEach(function (m) {
          if (m.direction !== 'inactive') {
            mustBeBundle = true;
          }
        });

        if (mustBeBundle) {
          throw new Error("Cannot convert to Unified Plan because m-lines that" + " are not bundled were found.");
        }
      } //#endregion
      //#region Convert from Plan B to Unified Plan.
      // Unfortunately, a Plan B offer/answer doesn't have enough information to
      // rebuild an equivalent Unified Plan offer/answer.
      //
      // For example, if this is a local answer (in Unified Plan style) that we
      // convert to Plan B prior to handing it over to the application (the
      // PeerConnection wrapper called us, for instance, after a successful
      // createAnswer), we want to remember the m-line at which we've seen the
      // (local) SSRC. That's because when the application wants to do call the
      // SLD method, forcing us to do the inverse transformation (from Plan B to
      // Unified Plan), we need to know to which m-line to assign the (local)
      // SSRC. We also need to know all the other m-lines that the original
      // answer had and include them in the transformed answer as well.
      //
      // Another example is if this is a remote offer that we convert to Plan B
      // prior to giving it to the application, we want to remember the mid at
      // which we've seen the (remote) SSRC.
      //
      // In the iteration that follows, we use the cached Unified Plan (if it
      // exists) to assign mids to ssrcs.


      var type;

      if (desc.type === 'answer') {
        type = 'offer';
      } else if (desc.type === 'offer') {
        type = 'answer';
      } else {
        throw new Error("Type '" + desc.type + "' not supported.");
      }

      var cached;

      if (typeof this.cache[type] !== 'undefined') {
        cached = transform_1.parse(this.cache[type]);
      }

      var recvonlySsrcs = {
        audio: {},
        video: {}
      }; // A helper map that sends mids to m-line objects. We use it later to
      // rebuild the Unified Plan style session.media array.

      var mid2ul = {};
      var bIdx = 0;
      var uIdx = 0;
      var sources2ul = {};
      var candidates;
      var iceUfrag;
      var icePwd;
      var fingerprint;
      var payloads = {};
      var rtcpFb = {};
      var rtp = {};
      session.media.forEach(function (bLine) {
        if ((typeof bLine.rtcpMux !== 'string' || bLine.rtcpMux !== 'rtcp-mux') && bLine.direction !== 'inactive') {
          throw new Error("Cannot convert to Unified Plan because m-lines " + "without the rtcp-mux attribute were found.");
        }

        if (bLine.type === 'application') {
          mid2ul[bLine.mid] = bLine;
          return;
        } // With rtcp-mux and bundle all the channels should have the same ICE
        // stuff.


        var sources = bLine.sources;
        var ssrcGroups = bLine.ssrcGroups;
        var port = bLine.port;
        /* Chrome adds different candidates even using bundle, so we concat the candidates list */

        if (typeof bLine.candidates != 'undefined') {
          if (typeof candidates != 'undefined') {
            candidates = candidates.concat(bLine.candidates);
          } else {
            candidates = bLine.candidates;
          }
        }

        if (typeof iceUfrag != 'undefined' && typeof bLine.iceUfrag != 'undefined' && iceUfrag != bLine.iceUfrag) {
          throw new Error("Only BUNDLE supported, iceUfrag must be the same for all m-lines.\n" + "\tLast iceUfrag: " + iceUfrag + "\n" + "\tNew iceUfrag: " + bLine.iceUfrag);
        }

        if (typeof bLine.iceUfrag != 'undefined') {
          iceUfrag = bLine.iceUfrag;
        }

        if (typeof icePwd != 'undefined' && typeof bLine.icePwd != 'undefined' && icePwd != bLine.icePwd) {
          throw new Error("Only BUNDLE supported, icePwd must be the same for all m-lines.\n" + "\tLast icePwd: " + icePwd + "\n" + "\tNew icePwd: " + bLine.icePwd);
        }

        if (typeof bLine.icePwd != 'undefined') {
          icePwd = bLine.icePwd;
        }

        if (typeof fingerprint != 'undefined' && typeof bLine.fingerprint != 'undefined' && (fingerprint.type != bLine.fingerprint.type || fingerprint.hash != bLine.fingerprint.hash)) {
          throw new Error("Only BUNDLE supported, fingerprint must be the same for all m-lines.\n" + "\tLast fingerprint: " + JSON.stringify(fingerprint) + "\n" + "\tNew fingerprint: " + JSON.stringify(bLine.fingerprint));
        }

        if (typeof bLine.fingerprint != 'undefined') {
          fingerprint = bLine.fingerprint;
        }

        payloads[bLine.type] = bLine.payloads;
        rtcpFb[bLine.type] = bLine.rtcpFb;
        rtp[bLine.type] = bLine.rtp; // inverted ssrc group map

        var ssrc2group = {};

        if (typeof ssrcGroups !== 'undefined' && Array.isArray(ssrcGroups)) {
          ssrcGroups.forEach(function (ssrcGroup) {
            // XXX This might brake if an SSRC is in more than one group
            // for some reason.
            if (typeof ssrcGroup.ssrcs !== 'undefined' && Array.isArray(ssrcGroup.ssrcs)) {
              ssrcGroup.ssrcs.forEach(function (ssrc) {
                if (typeof ssrc2group[ssrc] === 'undefined') {
                  ssrc2group[ssrc] = [];
                }

                ssrc2group[ssrc].push(ssrcGroup);
              });
            }
          });
        } // ssrc to m-line index.


        var ssrc2ml = {};

        if (typeof sources === 'object') {
          // We'll use the "bLine" object as a prototype for each new "mLine"
          // that we create, but first we need to clean it up a bit.
          delete bLine.sources;
          delete bLine.ssrcGroups;
          delete bLine.candidates;
          delete bLine.iceUfrag;
          delete bLine.icePwd;
          delete bLine.fingerprint;
          delete bLine.port;
          delete bLine.mid; // Explode the Plan B channel sources with one m-line per source.

          Object.keys(sources).forEach(function (ssrc) {
            // The (unified) m-line for this SSRC. We either create it from
            // scratch or, if it's a grouped SSRC, we re-use a related
            // mline. In other words, if the source is grouped with another
            // source, put the two together in the same m-line.
            var uLine; // We assume here that we are the answerer in the O/A, so any
            // offers which we translate come from the remote side, while
            // answers are local. So the check below is to make that we
            // handle receive-only SSRCs in a special way only if they come
            // from the remote side.

            if (desc.type === 'offer') {
              // We want to detect SSRCs which are used by a remote peer
              // in an m-line with direction=recvonly (i.e. they are
              // being used for RTCP only).
              // This information would have gotten lost if the remote
              // peer used Unified Plan and their local description was
              // translated to Plan B. So we use the lack of an MSID
              // attribute to deduce a "receive only" SSRC.
              if (!sources[ssrc].msid) {
                recvonlySsrcs[bLine.type][ssrc] = sources[ssrc]; // Receive-only SSRCs must not create new m-lines. We
                // will assign them to an existing m-line later.

                return;
              }
            }

            if (typeof ssrc2group[ssrc] !== 'undefined' && Array.isArray(ssrc2group[ssrc])) {
              ssrc2group[ssrc].some(function (ssrcGroup) {
                // ssrcGroup.ssrcs *is* an Array, no need to check
                // again here.
                return ssrcGroup.ssrcs.some(function (related) {
                  if (typeof ssrc2ml[related] === 'object') {
                    uLine = ssrc2ml[related];
                    return true;
                  }
                });
              });
            }

            if (typeof uLine === 'object') {
              // the m-line already exists. Just add the source.
              uLine.sources[ssrc] = sources[ssrc];
              delete sources[ssrc].msid;
            } else {
              // Use the "bLine" as a prototype for the "uLine".
              uLine = Object.create(bLine);
              ssrc2ml[ssrc] = uLine;

              if (typeof sources[ssrc].msid !== 'undefined') {
                // Assign the msid of the source to the m-line. Note
                // that it is not guaranteed that the source will have
                // msid. In particular "recvonly" sources don't have an
                // msid. Note that "recvonly" is a term only defined
                // for m-lines.
                uLine.msid = sources[ssrc].msid;
                delete sources[ssrc].msid;
              } // We assign one SSRC per media line.


              uLine.sources = {};
              uLine.sources[ssrc] = sources[ssrc];
              uLine.ssrcGroups = ssrc2group[ssrc]; // Use the cached Unified Plan SDP (if it exists) to assign
              // SSRCs to mids.

              if (typeof cached !== 'undefined' && typeof cached.media !== 'undefined' && Array.isArray(cached.media)) {
                cached.media.forEach(function (m) {
                  if (typeof m.sources === 'object') {
                    Object.keys(m.sources).forEach(function (s) {
                      if (s === ssrc) {
                        uLine.mid = m.mid;
                      }
                    });
                  }
                });
              }

              if (typeof uLine.mid === 'undefined') {
                // If this is an SSRC that we see for the first time
                // assign it a new mid. This is typically the case when
                // this method is called to transform a remote
                // description for the first time or when there is a
                // new SSRC in the remote description because a new
                // peer has joined the conference. Local SSRCs should
                // have already been added to the map in the toPlanB
                // method.
                //
                // Because FF generates answers in Unified Plan style,
                // we MUST already have a cached answer with all the
                // local SSRCs mapped to some m-line/mid.
                uLine.mid = [bLine.type, '-', ssrc].join('');
              } // Include the candidates in the 1st media line.


              uLine.candidates = candidates;
              uLine.iceUfrag = iceUfrag;
              uLine.icePwd = icePwd;
              uLine.fingerprint = fingerprint;
              uLine.port = port;
              mid2ul[uLine.mid] = uLine;
              sources2ul[uIdx] = uLine.sources;
              self.cache.mlU2BMap[uIdx] = bIdx;

              if (typeof self.cache.mlB2UMap[bIdx] === 'undefined') {
                self.cache.mlB2UMap[bIdx] = uIdx;
              }

              uIdx++;
            }
          });
        } else {
          var uLine = bLine;
          uLine.candidates = candidates;
          uLine.iceUfrag = iceUfrag;
          uLine.icePwd = icePwd;
          uLine.fingerprint = fingerprint;
          uLine.port = port;
          mid2ul[uLine.mid] = uLine;
          self.cache.mlU2BMap[uIdx] = bIdx;

          if (typeof self.cache.mlB2UMap[bIdx] === 'undefined') {
            self.cache.mlB2UMap[bIdx] = uIdx;
          }
        }

        bIdx++;
      }); // Rebuild the media array in the right order and add the missing mLines
      // (missing from the Plan B SDP).

      session.media = [];
      mids = []; // reuse

      if (desc.type === 'answer') {
        // The media lines in the answer must match the media lines in the
        // offer. The order is important too. Here we assume that Firefox is
        // the answerer, so we merely have to use the reconstructed (unified)
        // answer to update the cached (unified) answer accordingly.
        //
        // In the general case, one would have to use the cached (unified)
        // offer to find the m-lines that are missing from the reconstructed
        // answer, potentially grabbing them from the cached (unified) answer.
        // One has to be careful with this approach because inactive m-lines do
        // not always have an mid, making it tricky (impossible?) to find where
        // exactly and which m-lines are missing from the reconstructed answer.
        for (var i = 0; i < cached.media.length; i++) {
          var uLine = cached.media[i];
          delete uLine.msid;
          delete uLine.sources;
          delete uLine.ssrcGroups;

          if (typeof sources2ul[i] === 'undefined') {
            if (!uLine.direction || uLine.direction === 'sendrecv') uLine.direction = 'recvonly';else if (uLine.direction === 'sendonly') uLine.direction = 'inactive';
          } else {
            if (!uLine.direction || uLine.direction === 'sendrecv') uLine.direction = 'sendrecv';else if (uLine.direction === 'recvonly') uLine.direction = 'sendonly';
          }

          uLine.sources = sources2ul[i];
          uLine.candidates = candidates;
          uLine.iceUfrag = iceUfrag;
          uLine.icePwd = icePwd;
          uLine.fingerprint = fingerprint;
          uLine.rtp = rtp[uLine.type];
          uLine.payloads = payloads[uLine.type];
          uLine.rtcpFb = rtcpFb[uLine.type];
          session.media.push(uLine);

          if (typeof uLine.mid === 'string') {
            // inactive lines don't/may not have an mid.
            mids.push(uLine.mid);
          }
        }
      } else {
        // SDP offer/answer (and the JSEP spec) forbids removing an m-section
        // under any circumstances. If we are no longer interested in sending a
        // track, we just remove the msid and ssrc attributes and set it to
        // either a=recvonly (as the reofferer, we must use recvonly if the
        // other side was previously sending on the m-section, but we can also
        // leave the possibility open if it wasn't previously in use), or
        // a=inactive.
        if (typeof cached !== 'undefined' && typeof cached.media !== 'undefined' && Array.isArray(cached.media)) {
          cached.media.forEach(function (uLine) {
            mids.push(uLine.mid);

            if (typeof mid2ul[uLine.mid] !== 'undefined') {
              session.media.push(mid2ul[uLine.mid]);
            } else {
              delete uLine.msid;
              delete uLine.sources;
              delete uLine.ssrcGroups;

              if (!uLine.direction || uLine.direction === 'sendrecv') {
                uLine.direction = 'sendonly';
              }

              if (!uLine.direction || uLine.direction === 'recvonly') {
                uLine.direction = 'inactive';
              }

              addSetupAttr(uLine);
              session.media.push(uLine);
            }
          });
        } // Add all the remaining (new) m-lines of the transformed SDP.


        Object.keys(mid2ul).forEach(function (mid) {
          if (mids.indexOf(mid) === -1) {
            mids.push(mid);

            if (mid2ul[mid].direction === 'recvonly') {
              // This is a remote recvonly channel. Add its SSRC to the
              // appropriate sendrecv or sendonly channel.
              // TODO(gp) what if we don't have sendrecv/sendonly
              // channel?
              var done = false;
              session.media.some(function (uLine) {
                if ((uLine.direction === 'sendrecv' || uLine.direction === 'sendonly') && uLine.type === mid2ul[mid].type) {
                  // mid2ul[mid] shouldn't have any ssrc-groups
                  Object.keys(mid2ul[mid].sources).forEach(function (ssrc) {
                    uLine.sources[ssrc] = mid2ul[mid].sources[ssrc];
                  });
                  done = true;
                  return true;
                }
              });

              if (!done) {
                session.media.push(mid2ul[mid]);
              }
            } else {
              session.media.push(mid2ul[mid]);
            }
          }
        });
      } // After we have constructed the Plan Unified m-lines we can figure out
      // where (in which m-line) to place the 'recvonly SSRCs'.
      // Note: we assume here that we are the answerer in the O/A, so any offers
      // which we translate come from the remote side, while answers are local
      // (and so our last local description is cached as an 'answer').


      ["audio", "video"].forEach(function (type) {
        if (!session || !session.media || !Array.isArray(session.media)) return;
        var idx = null;

        if (Object.keys(recvonlySsrcs[type]).length > 0) {
          idx = self.getFirstSendingIndexFromAnswer(type);

          if (idx === null) {
            // If this is the first offer we receive, we don't have a
            // cached answer. Assume that we will be sending media using
            // the first m-line for each media type.
            for (var i = 0; i < session.media.length; i++) {
              if (session.media[i].type === type) {
                idx = i;
                break;
              }
            }
          }
        }

        if (idx && session.media.length > idx) {
          var mLine = session.media[idx];
          Object.keys(recvonlySsrcs[type]).forEach(function (ssrc) {
            if (mLine.sources && mLine.sources[ssrc]) {
              console.warn("Replacing an existing SSRC.");
            }

            if (!mLine.sources) {
              mLine.sources = {};
            }

            mLine.sources[ssrc] = recvonlySsrcs[type][ssrc];
          });
        }
      });

      if (typeof session.groups !== 'undefined') {
        // We regenerate the BUNDLE group (since we regenerated the mids)
        session.groups.some(function (group) {
          if (group.type === 'BUNDLE') {
            group.mids = mids.join(' ');
            return true;
          }
        });
      } // msid semantic


      session.msidSemantic = {
        semantic: 'WMS',
        token: '*'
      };
      var resStr = transform_1.write(session); // Cache the transformed SDP (Unified Plan) for later re-use in this
      // function.

      this.cache[desc.type] = resStr;
      return new RTCSessionDescription({
        type: desc.type,
        sdp: resStr
      }); //#endregion
    };

    /* Copyright @ 2015 Atlassian Pty Ltd
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *     http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    var Interop = interop;
    var lib$1 = {
      Interop: Interop
    };

    /*
     * (C) Copyright 2014-2015 Kurento (http://kurento.org/)
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    var EventEmitter = events__default["default"].EventEmitter;
    var recursive = merge.recursive.bind(undefined, true);
    var logger = typeof window === 'undefined' ? console : window.Logger || console;

    var MEDIA_CONSTRAINTS = {
      audio: true,
      video: {
        width: 640,
        framerate: 15
      }
    }; // Somehow, the UAParser constructor gets an empty window object.
    // We need to pass the user agent string in order to get information

    var ua = typeof window !== 'undefined' && window.navigator ? window.navigator.userAgent : '';
    var parser = new uaParser(ua);
    var browser = parser.getBrowser();

    function insertScriptSrcInHtmlDom(scriptSrc) {
      //Create a script tag
      var script = document.createElement('script'); // Assign a URL to the script element

      script.src = scriptSrc; // Get the first script tag on the page (we'll insert our new one before it)

      var ref = document.querySelector('script'); // Insert the new node before the reference node

      ref.parentNode.insertBefore(script, ref);
    }

    function importScriptsDependsOnBrowser() {
      if (browser.name === 'IE') {
        insertScriptSrcInHtmlDom("https://cdn.temasys.io/adapterjs/0.15.x/adapter.debug.js");
      }
    }

    importScriptsDependsOnBrowser();
    var usePlanB = false;

    if (browser.name === 'Chrome' || browser.name === 'Chromium') {
      // logger.debug(browser.name + ": using SDP PlanB");
      usePlanB = true;
    }

    function noop(error) {
      if (error) logger.error(error);
    }

    function trackStop(track) {
      track.stop && track.stop();
    }

    function streamStop(stream) {
      stream.getTracks().forEach(trackStop);
    }
    /**
     * Returns a string representation of a SessionDescription object.
     */


    var dumpSDP = function (description) {
      if (typeof description === 'undefined' || description === null) {
        return '';
      }

      return 'type: ' + description.type + '\r\n' + description.sdp;
    };

    function bufferizeCandidates(pc, onerror) {
      var candidatesQueue = [];

      function setSignalingstatechangeAccordingWwebBrowser(functionToExecute, pc) {
        if (typeof AdapterJS !== 'undefined' && AdapterJS.webrtcDetectedBrowser === 'IE' && AdapterJS.webrtcDetectedVersion >= 9) {
          pc.onsignalingstatechange = functionToExecute;
        } else {
          pc.addEventListener('signalingstatechange', functionToExecute);
        }
      }

      var signalingstatechangeFunction = function () {
        if (pc.signalingState === 'stable') {
          while (candidatesQueue.length) {
            var entry = candidatesQueue.shift();
            pc.addIceCandidate(entry.candidate, entry.callback, entry.callback);
          }
        }
      };

      setSignalingstatechangeAccordingWwebBrowser(signalingstatechangeFunction, pc);
      return function (candidate, callback) {
        callback = callback || onerror;

        switch (pc.signalingState) {
          case 'closed':
            callback(new Error('PeerConnection object is closed'));
            break;

          case 'stable':
            if (pc.remoteDescription) {
              pc.addIceCandidate(candidate, callback, callback);
              break;
            }

          default:
            candidatesQueue.push({
              candidate: candidate,
              callback: callback
            });
        }
      };
    }
    /* Simulcast utilities */


    function removeFIDFromOffer(sdp) {
      var n = sdp.indexOf("a=ssrc-group:FID");

      if (n > 0) {
        return sdp.slice(0, n);
      } else {
        return sdp;
      }
    }

    function getSimulcastInfo(videoStream) {
      var videoTracks = videoStream.getVideoTracks();

      if (!videoTracks.length) {
        logger.warn('No video tracks available in the video stream');
        return '';
      }

      var lines = ['a=x-google-flag:conference', 'a=ssrc-group:SIM 1 2 3', 'a=ssrc:1 cname:localVideo', 'a=ssrc:1 msid:' + videoStream.id + ' ' + videoTracks[0].id, 'a=ssrc:1 mslabel:' + videoStream.id, 'a=ssrc:1 label:' + videoTracks[0].id, 'a=ssrc:2 cname:localVideo', 'a=ssrc:2 msid:' + videoStream.id + ' ' + videoTracks[0].id, 'a=ssrc:2 mslabel:' + videoStream.id, 'a=ssrc:2 label:' + videoTracks[0].id, 'a=ssrc:3 cname:localVideo', 'a=ssrc:3 msid:' + videoStream.id + ' ' + videoTracks[0].id, 'a=ssrc:3 mslabel:' + videoStream.id, 'a=ssrc:3 label:' + videoTracks[0].id];
      lines.push('');
      return lines.join('\n');
    }

    function sleep(milliseconds) {
      var start = new Date().getTime();

      for (var i = 0; i < 1e7; i++) {
        if (new Date().getTime() - start > milliseconds) {
          break;
        }
      }
    }

    function setIceCandidateAccordingWebBrowser(functionToExecute, pc) {
      if (typeof AdapterJS !== 'undefined' && AdapterJS.webrtcDetectedBrowser === 'IE' && AdapterJS.webrtcDetectedVersion >= 9) {
        pc.onicecandidate = functionToExecute;
      } else {
        pc.addEventListener('icecandidate', functionToExecute);
      }
    }
    /**
     * Wrapper object of an RTCPeerConnection. This object is aimed to simplify the
     * development of WebRTC-based applications.
     *
     * @constructor module:kurentoUtils.WebRtcPeer
     *
     * @param {String} mode Mode in which the PeerConnection will be configured.
     *  Valid values are: 'recvonly', 'sendonly', and 'sendrecv'
     * @param localVideo Video tag for the local stream
     * @param remoteVideo Video tag for the remote stream
     * @param {MediaStream} videoStream Stream to be used as primary source
     *  (typically video and audio, or only video if combined with audioStream) for
     *  localVideo and to be added as stream to the RTCPeerConnection
     * @param {MediaStream} audioStream Stream to be used as second source
     *  (typically for audio) for localVideo and to be added as stream to the
     *  RTCPeerConnection
     */


    function WebRtcPeer(mode, options, callback) {
      if (!(this instanceof WebRtcPeer)) {
        return new WebRtcPeer(mode, options, callback);
      }

      WebRtcPeer.super_.call(this);

      if (options instanceof Function) {
        callback = options;
        options = undefined;
      }

      options = options || {};
      callback = (callback || noop).bind(this);
      var self = this;
      var localVideo = options.localVideo;
      var remoteVideo = options.remoteVideo;
      var videoStream = options.videoStream;
      var audioStream = options.audioStream;
      var mediaConstraints = options.mediaConstraints;
      var pc = options.peerConnection;
      var sendSource = options.sendSource || 'webcam';
      var dataChannelConfig = options.dataChannelConfig;
      var useDataChannels = options.dataChannels || false;
      var dataChannel;
      var guid = v4_1();
      var configuration = recursive({
        iceServers: freeice_1()
      }, options.configuration);
      var onicecandidate = options.onicecandidate;
      if (onicecandidate) this.on('icecandidate', onicecandidate);
      var oncandidategatheringdone = options.oncandidategatheringdone;

      if (oncandidategatheringdone) {
        this.on('candidategatheringdone', oncandidategatheringdone);
      }

      var simulcast = options.simulcast;
      var multistream = options.multistream;
      var interop = new lib$1.Interop();
      var candidatesQueueOut = [];
      var candidategatheringdone = false;
      Object.defineProperties(this, {
        'peerConnection': {
          get: function () {
            return pc;
          }
        },
        'id': {
          value: options.id || guid,
          writable: false
        },
        'remoteVideo': {
          get: function () {
            return remoteVideo;
          }
        },
        'localVideo': {
          get: function () {
            return localVideo;
          }
        },
        'dataChannel': {
          get: function () {
            return dataChannel;
          }
        },

        /**
         * @member {(external:ImageData|undefined)} currentFrame
         */
        'currentFrame': {
          get: function () {
            // [ToDo] Find solution when we have a remote stream but we didn't set
            // a remoteVideo tag
            if (!remoteVideo) return;
            if (remoteVideo.readyState < remoteVideo.HAVE_CURRENT_DATA) throw new Error('No video stream data available');
            var canvas = document.createElement('canvas');
            canvas.width = remoteVideo.videoWidth;
            canvas.height = remoteVideo.videoHeight;
            canvas.getContext('2d').drawImage(remoteVideo, 0, 0);
            return canvas;
          }
        }
      }); // Init PeerConnection

      if (!pc) {
        pc = new RTCPeerConnection(configuration);

        if (useDataChannels && !dataChannel) {
          var dcId = 'WebRtcPeer-' + self.id;
          var dcOptions = undefined;

          if (dataChannelConfig) {
            dcId = dataChannelConfig.id || dcId;
            dcOptions = dataChannelConfig.options;
          }

          dataChannel = pc.createDataChannel(dcId, dcOptions);

          if (dataChannelConfig) {
            dataChannel.onopen = dataChannelConfig.onopen;
            dataChannel.onclose = dataChannelConfig.onclose;
            dataChannel.onmessage = dataChannelConfig.onmessage;
            dataChannel.onbufferedamountlow = dataChannelConfig.onbufferedamountlow;
            dataChannel.onerror = dataChannelConfig.onerror || noop;
          }
        }
      } // Shims over the now deprecated getLocalStreams() and getRemoteStreams()
      // (usage of these methods should be dropped altogether)


      if (!pc.getLocalStreams && pc.getSenders) {
        pc.getLocalStreams = function () {
          var stream = new MediaStream();
          pc.getSenders().forEach(function (sender) {
            stream.addTrack(sender.track);
          });
          return [stream];
        };
      }

      if (!pc.getRemoteStreams && pc.getReceivers) {
        pc.getRemoteStreams = function () {
          var stream = new MediaStream();
          pc.getReceivers().forEach(function (sender) {
            stream.addTrack(sender.track);
          });
          return [stream];
        };
      } // If event.candidate == null, it means that candidate gathering has finished
      // and RTCPeerConnection.iceGatheringState == "complete".
      // Such candidate does not need to be sent to the remote peer.
      // https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/icecandidate_event#Indicating_that_ICE_gathering_is_complete


      var iceCandidateFunction = function (event) {
        var candidate = event.candidate;

        if (EventEmitter.listenerCount(self, 'icecandidate') || EventEmitter.listenerCount(self, 'candidategatheringdone')) {
          if (candidate) {
            var cand;

            if (multistream && usePlanB) {
              cand = interop.candidateToUnifiedPlan(candidate);
            } else {
              cand = candidate;
            }

            if (typeof AdapterJS === 'undefined') {
              self.emit('icecandidate', cand);
            }

            candidategatheringdone = false;
          } else if (!candidategatheringdone) {
            if (typeof AdapterJS !== 'undefined' && AdapterJS.webrtcDetectedBrowser === 'IE' && AdapterJS.webrtcDetectedVersion >= 9) {
              EventEmitter.prototype.emit('candidategatheringdone', cand);
            } else {
              self.emit('candidategatheringdone');
            }

            candidategatheringdone = true;
          }
        } else if (!candidategatheringdone) {
          candidatesQueueOut.push(candidate);
          if (!candidate) candidategatheringdone = true;
        }
      };

      setIceCandidateAccordingWebBrowser(iceCandidateFunction, pc);
      pc.onaddstream = options.onaddstream;
      pc.onnegotiationneeded = options.onnegotiationneeded;
      this.on('newListener', function (event, listener) {
        if (event === 'icecandidate' || event === 'candidategatheringdone') {
          while (candidatesQueueOut.length) {
            var candidate = candidatesQueueOut.shift();

            if (!candidate === (event === 'candidategatheringdone')) {
              listener(candidate);
            }
          }
        }
      });
      var addIceCandidate = bufferizeCandidates(pc);
      /**
       * Callback function invoked when an ICE candidate is received. Developers are
       * expected to invoke this function in order to complete the SDP negotiation.
       *
       * @function module:kurentoUtils.WebRtcPeer.prototype.addIceCandidate
       *
       * @param iceCandidate - Literal object with the ICE candidate description
       * @param callback - Called when the ICE candidate has been added.
       */

      this.addIceCandidate = function (iceCandidate, callback) {
        var candidate;

        if (multistream && usePlanB) {
          candidate = interop.candidateToPlanB(iceCandidate);
        } else {
          candidate = new RTCIceCandidate(iceCandidate);
        }

        logger.debug('Remote ICE candidate received', iceCandidate);
        callback = (callback || noop).bind(this);
        addIceCandidate(candidate, callback);
      };

      this.generateOffer = function (callback) {
        callback = callback.bind(this);

        if (mode === 'recvonly') {
          /* Add reception tracks on the RTCPeerConnection. Send tracks are
           * unconditionally added to "sendonly" and "sendrecv" modes, in the
           * constructor's "start()" method, but nothing is done for "recvonly".
           *
           * Here, we add new transceivers to receive audio and/or video, so the
           * SDP Offer that will be generated by the PC includes these medias
           * with the "a=recvonly" attribute.
           */
          var useAudio = mediaConstraints && typeof mediaConstraints.audio === 'boolean' ? mediaConstraints.audio : true;
          var useVideo = mediaConstraints && typeof mediaConstraints.video === 'boolean' ? mediaConstraints.video : true;

          if (useAudio) {
            pc.addTransceiver('audio', {
              direction: 'recvonly'
            });
          }

          if (useVideo) {
            pc.addTransceiver('video', {
              direction: 'recvonly'
            });
          }
        } else if (mode === 'sendonly') {
          /* The constructor's "start()" method already added any available track,
           * which by default creates Transceiver with "sendrecv" direction.
           *
           * Here, we set all transceivers to only send audio and/or video, so the
           * SDP Offer that will be generated by the PC includes these medias
           * with the "a=sendonly" attribute.
           */
          pc.getTransceivers().forEach(function (transceiver) {
            transceiver.direction = "sendonly";
          });
        }

        if (typeof AdapterJS !== 'undefined' && AdapterJS.webrtcDetectedBrowser === 'IE' && AdapterJS.webrtcDetectedVersion >= 9) {
          var setLocalDescriptionOnSuccess = function () {
            sleep(1000);
            var localDescription = pc.localDescription;
            logger.debug('Local description set\n', localDescription.sdp);

            if (multistream && usePlanB) {
              localDescription = interop.toUnifiedPlan(localDescription);
              logger.debug('offer::origPlanB->UnifiedPlan', dumpSDP(localDescription));
            }

            callback(null, localDescription.sdp, self.processAnswer.bind(self));
          };

          var createOfferOnSuccess = function (offer) {
            logger.debug('Created SDP offer');
            logger.debug('Local description set\n', pc.localDescription);
            pc.setLocalDescription(offer, setLocalDescriptionOnSuccess, callback);
          };

          pc.createOffer(createOfferOnSuccess, callback);
        } else {
          pc.createOffer().then(function (offer) {
            logger.debug('Created SDP offer');
            offer = mangleSdpToAddSimulcast(offer);
            return pc.setLocalDescription(offer);
          }).then(function () {
            var localDescription = pc.localDescription;
            logger.debug('Local description set\n', localDescription.sdp);

            if (multistream && usePlanB) {
              localDescription = interop.toUnifiedPlan(localDescription);
              logger.debug('offer::origPlanB->UnifiedPlan', dumpSDP(localDescription));
            }

            callback(null, localDescription.sdp, self.processAnswer.bind(self));
          }).catch(callback);
        }
      };

      this.getLocalSessionDescriptor = function () {
        return pc.localDescription;
      };

      this.getRemoteSessionDescriptor = function () {
        return pc.remoteDescription;
      };

      function setRemoteVideo() {
        if (remoteVideo) {
          remoteVideo.pause();
          var stream = pc.getRemoteStreams()[0];
          remoteVideo.srcObject = stream;
          logger.debug('Remote stream:', stream);

          if (typeof AdapterJS !== 'undefined' && AdapterJS.webrtcDetectedBrowser === 'IE' && AdapterJS.webrtcDetectedVersion >= 9) {
            remoteVideo = attachMediaStream(remoteVideo, stream);
          } else {
            remoteVideo.load();
          }
        }
      }

      this.showLocalVideo = function () {
        localVideo.srcObject = videoStream;
        localVideo.muted = true;

        if (typeof AdapterJS !== 'undefined' && AdapterJS.webrtcDetectedBrowser === 'IE' && AdapterJS.webrtcDetectedVersion >= 9) {
          localVideo = attachMediaStream(localVideo, videoStream);
        }
      };

      this.send = function (data) {
        if (dataChannel && dataChannel.readyState === 'open') {
          dataChannel.send(data);
        } else {
          logger.warn('Trying to send data over a non-existing or closed data channel');
        }
      };
      /**
       * Callback function invoked when a SDP answer is received. Developers are
       * expected to invoke this function in order to complete the SDP negotiation.
       *
       * @function module:kurentoUtils.WebRtcPeer.prototype.processAnswer
       *
       * @param sdpAnswer - Description of sdpAnswer
       * @param callback -
       *            Invoked after the SDP answer is processed, or there is an error.
       */


      this.processAnswer = function (sdpAnswer, callback) {
        callback = (callback || noop).bind(this);
        var answer = new RTCSessionDescription({
          type: 'answer',
          sdp: sdpAnswer
        });

        if (multistream && usePlanB) {
          var planBAnswer = interop.toPlanB(answer);
          logger.debug('asnwer::planB', dumpSDP(planBAnswer));
          answer = planBAnswer;
        }

        logger.debug('SDP answer received, setting remote description');

        if (pc.signalingState === 'closed') {
          return callback('PeerConnection is closed');
        }

        pc.setRemoteDescription(answer).then(function () {
          setRemoteVideo();
          callback();
        }, callback);
      };
      /**
       * Callback function invoked when a SDP offer is received. Developers are
       * expected to invoke this function in order to complete the SDP negotiation.
       *
       * @function module:kurentoUtils.WebRtcPeer.prototype.processOffer
       *
       * @param sdpOffer - Description of sdpOffer
       * @param callback - Called when the remote description has been set
       *  successfully.
       */


      this.processOffer = function (sdpOffer, callback) {
        callback = callback.bind(this);
        var offer = new RTCSessionDescription({
          type: 'offer',
          sdp: sdpOffer
        });

        if (multistream && usePlanB) {
          var planBOffer = interop.toPlanB(offer);
          logger.debug('offer::planB', dumpSDP(planBOffer));
          offer = planBOffer;
        }

        logger.debug('SDP offer received, setting remote description');

        if (pc.signalingState === 'closed') {
          return callback('PeerConnection is closed');
        }

        pc.setRemoteDescription(offer).then(function () {
          return setRemoteVideo();
        }).then(function () {
          return pc.createAnswer();
        }).then(function (answer) {
          answer = mangleSdpToAddSimulcast(answer);
          logger.debug('Created SDP answer');
          return pc.setLocalDescription(answer);
        }).then(function () {
          var localDescription = pc.localDescription;

          if (multistream && usePlanB) {
            localDescription = interop.toUnifiedPlan(localDescription);
            logger.debug('answer::origPlanB->UnifiedPlan', dumpSDP(localDescription));
          }

          logger.debug('Local description set\n', localDescription.sdp);
          callback(null, localDescription.sdp);
        }).catch(callback);
      };

      function mangleSdpToAddSimulcast(answer) {
        if (simulcast) {
          if (browser.name === 'Chrome' || browser.name === 'Chromium') {
            logger.debug('Adding multicast info');
            answer = new RTCSessionDescription({
              'type': answer.type,
              'sdp': removeFIDFromOffer(answer.sdp) + getSimulcastInfo(videoStream)
            });
          } else {
            logger.warn('Simulcast is only available in Chrome browser.');
          }
        }

        return answer;
      }
      /**
       * This function creates the RTCPeerConnection object taking into account the
       * properties received in the constructor. It starts the SDP negotiation
       * process: generates the SDP offer and invokes the onsdpoffer callback. This
       * callback is expected to send the SDP offer, in order to obtain an SDP
       * answer from another peer.
       */


      function start() {
        if (pc.signalingState === 'closed') {
          callback('The peer connection object is in "closed" state. This is most likely due to an invocation of the dispose method before accepting in the dialogue');
        }

        if (videoStream && localVideo) {
          self.showLocalVideo();
        }

        if (videoStream) {
          videoStream.getTracks().forEach(function (track) {
            pc.addTrack(track, videoStream);
          });
        }

        if (audioStream) {
          audioStream.getTracks().forEach(function (track) {
            pc.addTrack(track, audioStream);
          });
        }

        callback();
      }

      if (mode !== 'recvonly' && !videoStream && !audioStream) {
        function getMedia(constraints) {
          if (constraints === undefined) {
            constraints = MEDIA_CONSTRAINTS;
          }

          if (typeof AdapterJS !== 'undefined' && AdapterJS.webrtcDetectedBrowser === 'IE' && AdapterJS.webrtcDetectedVersion >= 9) {
            navigator.getUserMedia(constraints, function (stream) {
              videoStream = stream;
              start();
            }, callback);
          } else {
            navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
              videoStream = stream;
              start();
            }).catch(callback);
          }
        }

        if (sendSource === 'webcam') {
          getMedia(mediaConstraints);
        } else {
          getScreenConstraints(sendSource, function (error, constraints_) {
            if (error) return callback(error);
            constraints = [mediaConstraints];
            constraints.unshift(constraints_);
            getMedia(recursive.apply(undefined, constraints));
          }, guid);
        }
      } else {
        setTimeout(start, 0);
      }

      this.on('_dispose', function () {
        if (localVideo) {
          localVideo.pause();
          localVideo.srcObject = null;

          if (typeof AdapterJS === 'undefined') {
            localVideo.load();
          }

          localVideo.muted = false;
        }

        if (remoteVideo) {
          remoteVideo.pause();
          remoteVideo.srcObject = null;

          if (typeof AdapterJS === 'undefined') {
            remoteVideo.load();
          }
        }

        self.removeAllListeners();

        if (typeof window !== 'undefined' && window.cancelChooseDesktopMedia !== undefined) {
          window.cancelChooseDesktopMedia(guid);
        }
      });
    }

    inherits(WebRtcPeer, EventEmitter);

    function createEnableDescriptor(type) {
      var method = 'get' + type + 'Tracks';
      return {
        enumerable: true,
        get: function () {
          // [ToDo] Should return undefined if not all tracks have the same value?
          if (!this.peerConnection) return;
          var streams = this.peerConnection.getLocalStreams();
          if (!streams.length) return;

          for (var i = 0, stream; stream = streams[i]; i++) {
            var tracks = stream[method]();

            for (var j = 0, track; track = tracks[j]; j++) if (!track.enabled) return false;
          }

          return true;
        },
        set: function (value) {
          function trackSetEnable(track) {
            track.enabled = value;
          }

          this.peerConnection.getLocalStreams().forEach(function (stream) {
            stream[method]().forEach(trackSetEnable);
          });
        }
      };
    }

    Object.defineProperties(WebRtcPeer.prototype, {
      'enabled': {
        enumerable: true,
        get: function () {
          return this.audioEnabled && this.videoEnabled;
        },
        set: function (value) {
          this.audioEnabled = this.videoEnabled = value;
        }
      },
      'audioEnabled': createEnableDescriptor('Audio'),
      'videoEnabled': createEnableDescriptor('Video')
    });

    WebRtcPeer.prototype.getLocalStream = function (index) {
      if (this.peerConnection) {
        return this.peerConnection.getLocalStreams()[index || 0];
      }
    };

    WebRtcPeer.prototype.getRemoteStream = function (index) {
      if (this.peerConnection) {
        return this.peerConnection.getRemoteStreams()[index || 0];
      }
    };
    /**
     * @description This method frees the resources used by WebRtcPeer.
     *
     * @function module:kurentoUtils.WebRtcPeer.prototype.dispose
     */


    WebRtcPeer.prototype.dispose = function () {
      logger.debug('Disposing WebRtcPeer');
      var pc = this.peerConnection;
      var dc = this.dataChannel;

      try {
        if (dc) {
          if (dc.readyState === 'closed') return;
          dc.close();
        }

        if (pc) {
          if (pc.signalingState === 'closed') return;
          pc.getLocalStreams().forEach(streamStop); // FIXME This is not yet implemented in firefox
          // if(videoStream) pc.removeStream(videoStream);
          // if(audioStream) pc.removeStream(audioStream);

          pc.close();
        }
      } catch (err) {
        logger.warn('Exception disposing webrtc peer ' + err);
      }

      if (typeof AdapterJS === 'undefined') {
        this.emit('_dispose');
      }
    }; //
    // Specialized child classes
    //


    function WebRtcPeerRecvonly$1(options, callback) {
      if (!(this instanceof WebRtcPeerRecvonly$1)) {
        return new WebRtcPeerRecvonly$1(options, callback);
      }

      WebRtcPeerRecvonly$1.super_.call(this, 'recvonly', options, callback);
    }

    inherits(WebRtcPeerRecvonly$1, WebRtcPeer);

    function WebRtcPeerSendonly$1(options, callback) {
      if (!(this instanceof WebRtcPeerSendonly$1)) {
        return new WebRtcPeerSendonly$1(options, callback);
      }

      WebRtcPeerSendonly$1.super_.call(this, 'sendonly', options, callback);
    }

    inherits(WebRtcPeerSendonly$1, WebRtcPeer);

    function WebRtcPeerSendrecv$1(options, callback) {
      if (!(this instanceof WebRtcPeerSendrecv$1)) {
        return new WebRtcPeerSendrecv$1(options, callback);
      }

      WebRtcPeerSendrecv$1.super_.call(this, 'sendrecv', options, callback);
    }

    inherits(WebRtcPeerSendrecv$1, WebRtcPeer);

    function harkUtils(stream, options) {
      return hark(stream, options);
    }

    var bufferizeCandidates_1 = bufferizeCandidates;
    var WebRtcPeerRecvonly_1 = WebRtcPeerRecvonly$1;
    var WebRtcPeerSendonly_1 = WebRtcPeerSendonly$1;
    var WebRtcPeerSendrecv_1 = WebRtcPeerSendrecv$1;
    var hark_1 = harkUtils;
    var WebRtcPeer_1$1 = {
      bufferizeCandidates: bufferizeCandidates_1,
      WebRtcPeerRecvonly: WebRtcPeerRecvonly_1,
      WebRtcPeerSendonly: WebRtcPeerSendonly_1,
      WebRtcPeerSendrecv: WebRtcPeerSendrecv_1,
      hark: hark_1
    };

    /*
     * (C) Copyright 2014 Kurento (http://kurento.org/)
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     *
     */

    /**
     * This module contains a set of reusable components that have been found useful
     * during the development of the WebRTC applications with Kurento.
     * 
     * @module kurentoUtils
     * 
     * @copyright 2014 Kurento (http://kurento.org/)
     * @license ALv2
     */

    var WebRtcPeer_1 = WebRtcPeer_1$1;
    var lib = {
      WebRtcPeer: WebRtcPeer_1
    };

    function webRTCError(webRtcPeer, callbacks, noop) {
        if (callbacks === void 0) { callbacks = {}; }
        if (noop === void 0) { noop = function () { }; }
        var logger = callbacks.logger, _a = callbacks.iceCandidateError, iceCandidateError = _a === void 0 ? noop : _a, _b = callbacks.connectionStateFailed, connectionStateFailed = _b === void 0 ? noop : _b, _c = callbacks.iceConnectionStateFailed, iceConnectionStateFailed = _c === void 0 ? noop : _c;
        /**
         * 当 ICE 候选人收集过程中发生错误时，将触发此事件。
         * errorCode: {
         *     300 ~ 699:
         *     700 ~ 799: 无法连接到服务器；提供了特定的错误号，但尚未指定这些错误号。
         * }
         * @param error
         */
        webRtcPeer.peerConnection.onicecandidateerror = function (error) {
            iceCandidateError(error);
            logger.__error("iceError: => { \n  errorText: " + error.errorText + ", \n  errorCode: " + error.errorCode + " \n}");
        };
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
        webRtcPeer.peerConnection.onconnectionstatechange = function () {
            var connectionState = this.connectionState;
            logger.__debug('connection: => ' + JSON.stringify(connectionState, null, 2));
            if (connectionState === 'failed') {
                connectionStateFailed();
                this.restartIce();
            }
        };
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
        webRtcPeer.peerConnection.addEventListener('iceconnectionstatechange', function () {
            return __awaiter(this, void 0, void 0, function () {
                var peer, iceConnectionState;
                return __generator(this, function (_a) {
                    peer = webRtcPeer.peerConnection;
                    iceConnectionState = peer.iceConnectionState;
                    logger.__debug('iceConnection: => ' + JSON.stringify(iceConnectionState, null, 2));
                    if (iceConnectionState === 'failed') {
                        iceConnectionStateFailed();
                        /*const offer = await peer.createOffer({iceRestart: true });
                        logger.log('offer', offer);
                        onOfferPresenter(null, offer.sdp);*/
                    }
                    return [2 /*return*/];
                });
            });
        });
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
        webRtcPeer.peerConnection.onicegatheringstatechange = function () {
            var iceGatheringState = this.iceGatheringState;
            var label = "Unknown";
            switch (iceGatheringState) {
                case "new":
                case "complete":
                    label = "Idle";
                    break;
                case "gathering":
                    label = "Determining route";
                    break;
            }
            logger.__debug('iceGathering: => ' + label);
        };
        /**
         * 1. stable:
         *    没有正在进行的报价和答案交换。
         *    这可能意味着RTCPeerConnection对象是新的，在这种情况下localDescription 和remoteDescription 都是null;
         *    这也可能意味着协商完成并建立了连接。
         *
         * 2. have-local-offer:
         *    本地peer调用了RTCPeerConnection.setLocalDescription()，
         *    传入代表offer的SDP（通常是调用创建的RTCPeerConnection.createOffer()），
         *    offer申请成功。
         *
         * 3. have-remote-offer:
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
        webRtcPeer.peerConnection.onsignalingstatechange = function () {
            var signalingState = this.signalingState;
            logger.__debug('signaling: => ' + JSON.stringify(signalingState, null, 2));
        };
    }

    var fileVideo;
    var fileVideoContent;
    var isUrlVideo;
    /**************************************************************************
     *            webRtcPeer 与 one2manyCall Socket
     *            同属于广播系统，逻辑相互调用。
     *
     *            每一个 webRtcPeer 广播，
     *            都需创建一个 Socket 信令服务器。
     *            广播结束，注销 webRtcPeer & Socket
     *
     **************************************************************************
     * @param artemis
     * @param clientType
     */
    function one2manyWebRtcPeer(artemis, clientType) {
        var webRtcPeer;
        var socketOne2many;
        var callUrl = artemis.callUrl, _a = artemis.options, logger = _a.logger, presenterId = _a.presenterId, presenterName = _a.presenterName, viewerId = _a.viewerId; _a.viewerName; var $callContainer = _a.$callContainer, session = _a.session;
        var _b = (artemis.one2ManyOptions || {}), _c = _b.open, open = _c === void 0 ? noop$1 : _c, _d = _b.presenterResponse, presenterResponse = _d === void 0 ? noop$1 : _d, _e = _b.viewerResponse, viewerResponse = _e === void 0 ? noop$1 : _e, _f = _b.iceCandidate, iceCandidate = _f === void 0 ? noop$1 : _f, _g = _b.notice, notice = _g === void 0 ? noop$1 : _g, _h = _b.playFileResponse, playFileResponse = _h === void 0 ? noop$1 : _h, _j = _b.onFileBroadcastOk, onFileBroadcastOk = _j === void 0 ? noop$1 : _j, appendVideo = _b.appendVideo, one2ManyOptions = __rest(_b, ["open", "presenterResponse", "viewerResponse", "iceCandidate", "notice", "playFileResponse", "onFileBroadcastOk", "appendVideo"]);
        var reply = createReply();
        var options = {
            mediaConstraints: constraints$1,
            onicecandidate: onIceCandidate,
            // dataChannelConfig: {
            //   id: getChannelName(),
            //   onmessage: onMessage,
            //   onopen: onOpen,
            //   onclose: onClosed
            // },
            // dataChannels : true,
            localVideo: null,
            remoteVideo: null,
            audioStream: null,
            videoStream: null,
            configuration: configuration,
        };
        var iceCallback = [];
        var objectURL;
        var urlTargetArray = [];
        var timer;
        if (!appendVideo) {
            appendVideo = function onVideoAppend(childVideo) {
                if (!isDOM(childVideo)) {
                    return console.error('child video is not find!');
                }
                if (!$callContainer) {
                    return console.error('$callContainer is not find!');
                }
                if (childVideo && options.mediaConstraints.video) {
                    $callContainer.appendChild(childVideo);
                }
            };
        }
        /**
         * TODO 错误信息处理
         *
         * @param errorMessage
         */
        function withError(errorMessage) {
            logger.error('Call not accepted for the following reason: ' + (errorMessage || 'Unknow error'));
            reply.fail(errorMessage);
            destroy(session);
        }
        /**
         * TODO 处理 Answer
         *
         * @param sdpAnswer
         */
        function processAnswer(sdpAnswer) {
            webRtcPeer.processAnswer(sdpAnswer, function (error) {
                if (error) {
                    return logger.error(error);
                }
                reply.success('连接成功！');
            });
        }
        /**
         * 主持人 返回结果处理
         *
         * @param message
         */
        function __presenterResponse(message) {
            if (message.response != 'accepted') {
                withError(message.message);
            }
            else {
                processAnswer(message.sdpAnswer);
            }
        }
        /**
         * 观众 返回结果处理
         * @param message
         */
        function __viewerResponse(message) {
            if (message.response != 'accepted') {
                withError(message.message);
            }
            else {
                processAnswer(message.sdpAnswer);
            }
        }
        /**
         * 执行 Ice 回调函数
         */
        function executeIceCallback() {
            while (iceCallback.length) {
                var iceCb = iceCallback.pop();
                iceCb();
            }
        }
        function sendMessage(message) {
            if (socketOne2many) {
                socketOne2many.sendMessage(message);
            }
            else {
                console.error('socketOne2many 已销毁！');
            }
        }
        function destroy(_session) {
            if (_session === void 0) { _session = session; }
            logger.__info('注销！！！！！！！！！！！！！');
            var opt = {
                action: 'stop',
                // 发布者的ID
                presenter: presenterId || artemis.options.presenterId || artemis.options.remotePresenterId,
                // 当前用户 ID
                userId: presenterId,
                session: _session,
            };
            if (clientType === 'viewer') {
                opt.userId = viewerId;
            }
            if (objectURL && typeof objectURL === 'object') {
                URL.revokeObjectURL(objectURL);
                objectURL = undefined;
            }
            // 如果发送视频，则添加 DOM
            // 上传文件创建的 fileVideo
            if (hasChild($callContainer, fileVideo)) {
                $callContainer.removeChild(fileVideo);
                fileVideo = null;
            }
            // 上传文件创建的 fileVideo 的包裹层。
            if (hasChild($callContainer, fileVideoContent)) {
                $callContainer.removeChild(fileVideoContent);
                fileVideoContent = null;
            }
            // 本地视频
            if (hasChild($callContainer, options.localVideo)) {
                $callContainer.removeChild(options.localVideo);
                options.localVideo = null;
            }
            // 远程视频
            if (hasChild($callContainer, options.remoteVideo)) {
                $callContainer.removeChild(options.remoteVideo);
                options.remoteVideo = null;
            }
            if (webRtcPeer) {
                webRtcPeer.dispose();
                webRtcPeer = null;
            }
            if (socketOne2many) {
                socketOne2many.sendMessage(opt);
                socketOne2many.destroy();
                socketOne2many = null;
                logger.__info('broadcast 销毁成功！');
            }
        }
        /**
         * TODO 后台返回 - 广播
         *
         * @param message: {
         *   instruct: 消息类型
         * }
         */
        function __notice(message) {
            var instruct = message.instruct, session = message.session, target = message.target, targetStatus = message.targetStatus;
            notice && notice(clone(message));
            logger.__info('broadcast notice', message);
            /**
             * TODO 广播对象链接成功！
             *
             * 等待 1000 毫秒
             * 1000 毫秒内，如果有人接进来，则和后来者一起发送。
             * 超过 1000 毫秒，则重新计算。
             */
            if (targetStatus === 'ready') {
                var checkeds = artemis.options.checkeds;
                if (isUrlVideo) {
                    /**
                     * 如果是之前选中的对象
                     */
                    if (checkeds.includes(target)) {
                        if (!urlTargetArray.includes(target)) {
                            urlTargetArray.push(target);
                        }
                    }
                    if (timer) {
                        clearTimeout(timer);
                    }
                    timer = setTimeout(function () {
                        sendUrlMessage();
                        clearTimeout(timer);
                        timer = null;
                        isUrlVideo = null;
                        urlTargetArray = [];
                    }, 1000);
                }
            }
            /**
             * TODO 停止 | 结束
             */
            if (instruct === 'stopCommunication') {
                destroy(session);
            }
        }
        function sendUrlMessage() {
            sendMessage({
                action: "playFile",
                url: isUrlVideo,
                session: session,
                userIds: urlTargetArray,
            });
        }
        /**
         * 创建socket
         *
         * @param one2manyOptions
         */
        function one2manyCall(one2manyOptions) {
            socketOne2many = mixinWebSocket(callUrl + ("?t=" + Date.now()), __assign({ 
                /**
                 * 播放url的返回值
                 * @param message
                 */
                playFileResponse: function (message) {
                    playFileResponse && playFileResponse(clone(message));
                    if (message.response === 'accepted') {
                        // $callContainer.appendChild(options.remoteVideo);
                        appendVideo(options.remoteVideo, { userId: presenterId, userName: presenterName });
                    }
                }, 
                /**
                 * TODO 主持人 返回值
                 *
                 * @param message
                 */
                presenterResponse: function (message) {
                    presenterResponse && presenterResponse(clone(message));
                    session = message.session;
                    __presenterResponse(message);
                    executeIceCallback();
                }, 
                /**
                 * TODO 观众 返回值
                 * @param message
                 */
                viewerResponse: function (message) {
                    viewerResponse && viewerResponse(clone(message));
                    __viewerResponse(message);
                }, 
                /**
                 * TODO ICE 协商
                 * @param message
                 */
                iceCandidate: function (message) {
                    iceCandidate && iceCandidate(clone(message));
                    webRtcPeer.addIceCandidate(message.candidate, function (error) {
                        if (error) {
                            return logger.error('Error adding candidate: ' + error);
                        }
                        execOnes(onFileBroadcastOk, '__short_ice_callback_timer');
                    });
                }, 
                /**
                 * TODO 后台返回 - 广播
                 *
                 * @param message: {
                 *   instruct: 消息类型
                 * }
                 */
                notice: __notice }, one2manyOptions));
        }
        function onIceCandidate(candidate) {
            logger.__info("Local candidate" + JSON.stringify(candidate));
            var message = {
                action: 'onIceCandidate',
                candidate: candidate,
                session: session,
                // 这里是发布者的 ID
                presenter: artemis.options.presenterId || artemis.options.remotePresenterId,
            };
            sendMessage(message);
        }
        /**
         * 主持人 发送 Offer
         *
         * @param error
         * @param offerSdp
         */
        function onOfferPresenter(error, offerSdp) {
            if (error) {
                return logger.error('Error generating the offer');
            }
            logger.__info('onOfferPresenter' + location.host, offerSdp);
            var message = {
                action: 'presenter',
                userId: artemis.options.presenterId,
                userName: artemis.options.presenterName,
                sdpOffer: offerSdp,
                to: artemis.options.checkeds,
                mediaConstraints: options.mediaConstraints,
            };
            sendMessage(message);
        }
        /**
         * 观众发出 Offer
         *
         * @param error
         * @param offerSdp
         */
        function onOfferViewer(error, offerSdp) {
            if (error) {
                return logger.error('Error generating the offer');
            }
            var message = {
                action: 'viewer',
                from: artemis.options.remotePresenterId,
                userId: viewerId || artemis.options.presenterId,
                sdpOffer: offerSdp,
                session: session,
            };
            sendMessage(message);
        }
        /**
         * 设置本地流
         *
         * @param cb
         */
        function sendLocalStream(cb) {
            fileVideoContent = createElement('div');
            options.localVideo = false;
            fileVideo.src = URL.createObjectURL(objectURL);
            fileVideo.load();
            fileVideoContent.appendChild(fileVideo);
            fileVideoContent.setAttribute('class', 'participant');
            // $callContainer.appendChild(fileVideoContent);
            appendVideo(fileVideoContent, { userId: presenterId, userName: presenterName });
            function setVideoStream() {
                if (fileVideo.captureStream) {
                    options.videoStream = fileVideo.captureStream();
                }
                else {
                    logger.__error('captureStream() not supported');
                }
                cb && cb();
            }
            fileVideo.oncanplay = setVideoStream;
            if (fileVideo.readyState >= 3) { // HAVE_FUTURE_DATA
                // Video is already ready to play, call maybeCreateStream in case oncanplay
                // fired before we registered the event handler.
                setVideoStream();
            }
        }
        /**
         * 向观众发送 文件广播
         *
         * @param file
         * @param checked
         * @param replyOptions
         */
        artemis.onBroadcastFile = function onBroadcastFile(file, checked, replyOptions) {
            if (!file) {
                return logger.error('file 不能为空！');
            }
            // 保存起来，用于后期销毁
            objectURL = file;
            // $callContainer.appendChild(options.localVideo);
            if (!replyOptions || !replyOptions.constraints || replyOptions.constraints.video) {
                fileVideo = createElement('video');
            }
            else {
                fileVideo = createElement('audio');
            }
            sendLocalStream(function () {
                fileVideo.play();
                // init();
                /**
                 * 如果是读取文件播放。
                 */
                // options.mediaConstraints.video = true;
                artemis.onBroadcast(checked, replyOptions);
            });
        };
        /**
         * 向观众发送 URL 广播
         *
         * @param remoteUrl
         * @param checked
         * @param replyOptions
         */
        artemis.onBroadcastRemoteURL = function onBroadcast(remoteUrl, checked, replyOptions) {
            isUrlVideo = remoteUrl;
            logger.__info('remoteUrl: ' + remoteUrl);
            disposeReplyOptions(replyOptions);
            /**
             * 将 发送 ICE 推迟到 接收到 presenterResponse 之后。
             * @param candidate
             */
            options.onicecandidate = function (candidate) {
                iceCallback.push(function () { return onIceCandidate(candidate); });
            };
            if (!webRtcPeer) {
                options.localVideo = false;
                options.remoteVideo = createElement('video');
                logger.__info('发起URL广播！！！！！！！', options);
                webRtcPeer = lib.WebRtcPeer.WebRtcPeerRecvonly(options, function (error) {
                    if (error)
                        return logger.error(error);
                    if (!socketOne2many) {
                        one2manyCall(__assign({ open: function (message) {
                                open && open(clone(message));
                                if (Array.isArray(checked) && checked.length) {
                                    artemis.options.checkeds = checked;
                                    onWebRtcPeerCreated();
                                    webRtcPeer.generateOffer(onOfferPresenter);
                                }
                            } }, one2ManyOptions));
                    }
                });
            }
        };
        /**
         * 处理传进来的参数
         *
         * @param replyOptions
         */
        function disposeReplyOptions(replyOptions) {
            if (!replyOptions) {
                replyOptions = { constraints: constraints$1, session: undefined };
            }
            reply.setReplySuccess(replyOptions.success);
            reply.setReplyFail(replyOptions.fail);
            /**
             * constraints 没有传入
             */
            if (replyOptions.constraints) {
                options.mediaConstraints = replyOptions.constraints;
            }
            /**
             * video 和 audio 都是false
             */
            if (!replyOptions.constraints.video && !replyOptions.constraints.audio) {
                logger.error('video & audio 不能同时都是 false');
                options.mediaConstraints = constraints$1;
            }
            if (!options.mediaConstraints.video) {
                options.localVideo = createElement('audio');
                options.remoteVideo = createElement('audio');
            }
            if (replyOptions.session) {
                session = replyOptions.session;
            }
        }
        /**
         * WebRTC错误处理 重连
         */
        function onWebRtcPeerCreated() {
            var errorExecute = {
                logger: logger,
                iceConnectionStateFailed: function () {
                    if (clientType === 'presenter') {
                        webRtcPeer.generateOffer(onOfferPresenter);
                    }
                    if (clientType === 'viewer') {
                        webRtcPeer.generateOffer(onOfferViewer);
                    }
                },
            };
            if (webRtcPeer) {
                webRTCError(webRtcPeer, errorExecute);
            }
        }
        /**
         * 发起广播消息
         *
         * @param checked
         * @param replyOptions
         */
        artemis.onBroadcast = function onBroadcast(checked, replyOptions) {
            disposeReplyOptions(replyOptions);
            /**
             * 将 发送 ICE 推迟到 接收到 presenterResponse 之后。
             * @param candidate
             */
            options.onicecandidate = function (candidate) {
                iceCallback.push(function () { return onIceCandidate(candidate); });
            };
            // if (!webRtcPeer) {
            logger.__info('发起广播！！！！！！！');
            // if ($callContainer && replyOptions.constraints.video) {
            //   $callContainer.appendChild(options.localVideo);
            // }
            if (!objectURL) {
                options.localVideo = createElement('video');
                appendVideo(options.localVideo, { userId: presenterId, userName: presenterName });
            }
            // 需要媒体协商时会触发
            options.onnegotiationneeded = function (stream) {
                logger.__info('negotiationneeded => 需要协商！');
            };
            webRtcPeer = lib.WebRtcPeer.WebRtcPeerSendonly(options, function (error) {
                if (error)
                    return logger.error(error);
                if (!socketOne2many) {
                    one2manyCall(__assign({ open: function () {
                            if (Array.isArray(checked) && checked.length) {
                                artemis.options.checkeds = checked;
                                onWebRtcPeerCreated();
                                webRtcPeer.generateOffer(onOfferPresenter);
                            }
                        } }, one2ManyOptions));
                }
            });
            // }
        };
        /**
         * 接受广播
         *
         * @param presenterId: 发布者的ID
         * @param replyOptions
         */
        artemis.viewer = function viewer(presenterId, replyOptions) {
            artemis.options.remotePresenterId = presenterId;
            disposeReplyOptions(replyOptions);
            // 如果发送视频，则添加 DOM
            // if ($callContainer && replyOptions.constraints.video) {
            //   $callContainer.appendChild(options.remoteVideo);
            // }
            options.remoteVideo = createElement('video');
            appendVideo(options.remoteVideo, { userId: presenterId, userName: replyOptions.presenterName });
            if (!webRtcPeer) {
                logger.__info('接收广播！！！！！！！', options);
                webRtcPeer = lib.WebRtcPeer.WebRtcPeerRecvonly(options, function (error) {
                    if (error)
                        return console.error(error);
                    if (!socketOne2many) {
                        one2manyCall(__assign({ open: function () {
                                onWebRtcPeerCreated();
                                webRtcPeer.generateOffer(onOfferViewer);
                            } }, one2ManyOptions));
                    }
                });
            }
        };
        /**
         * 前台解散房间请求
         */
        /*artemis.connectSendClose = function connectSendClose(message = {}) {
          if (socketOne2many) {
            socketOne2many.sendMessage({
              action: 'dissolveRoom',
            });
          }
        };*/
        artemis.destroyOne2many = destroy;
    }

    var PARTICIPANT_MAIN_CLASS = 'participant participant-active';
    var PARTICIPANT_CLASS = 'participant';
    function isPresentMainParticipant() {
        return ((document.getElementsByClassName(PARTICIPANT_MAIN_CLASS)).length !== 0);
    }
    function switchContainerClass($mediaBox) {
        if ($mediaBox.className === PARTICIPANT_CLASS) {
            var elements = Array.prototype.slice.call(document.getElementsByClassName(PARTICIPANT_MAIN_CLASS));
            elements.forEach(function (item) {
                item.className = PARTICIPANT_CLASS;
            });
            $mediaBox.className = PARTICIPANT_MAIN_CLASS;
        }
        else {
            $mediaBox.className = PARTICIPANT_CLASS;
        }
    }
    /**
     * Creates a video element for a new participant
     *
     * @param {HTMLElement} $container
     * @param {String} name - the name of the new participant, to be used as tag
     *                        name of the video element.
     *                        The tag of the new element will be 'video<name>'
     * @return
     */
    var Participant = /** @class */ (function () {
        function Participant($container, option) {
            var _this = this;
            var name = option.name, id = option.id, _a = option.media, media = _a === void 0 ? 'video' : _a, appendVideo = option.appendVideo;
            this.$media = createElement(media === 'video' ? 'video' : 'audio');
            this.$container = $container;
            this.id = id;
            this.name = name;
            this.rtcPeer = {};
            console.log('appendVideo => ', appendVideo);
            if (appendVideo) {
                appendVideo(this.$media, { userId: id, userName: name });
            }
            else {
                var span = createElement('span');
                this.$mediaBox = createElement('div');
                if (!$container) {
                    console.error('$callContainer is not find!');
                    return;
                }
                span.appendChild(document.createTextNode(name));
                this.$mediaBox.className = isPresentMainParticipant() ? PARTICIPANT_CLASS : PARTICIPANT_MAIN_CLASS;
                this.$mediaBox.id = id;
                this.$media.id = 'video-' + id;
                this.$mediaBox.appendChild(this.$media);
                this.$mediaBox.appendChild(span);
                this.$mediaBox.onclick = function () { return switchContainerClass(_this.$mediaBox); };
                $container.appendChild(this.$mediaBox);
            }
        }
        Participant.prototype.getElement = function () {
            return this.$mediaBox;
        };
        Participant.prototype.getVideoElement = function () {
            return this.$media;
        };
        Participant.prototype.setRTCPeer = function (rtcPeer) {
            this.rtcPeer = rtcPeer;
        };
        Participant.prototype.dispose = function () {
            console.log('Disposing participant ' + this.name);
            this.rtcPeer.dispose();
            if (this.$mediaBox) {
                this.$mediaBox.parentNode.removeChild(this.$mediaBox);
            }
            if (this.$media && this.$media.parentNode && this.$media.parentNode.removeChild) {
                this.$media.parentNode.removeChild(this.$media);
            }
        };
        return Participant;
    }());
    // Participant.prototype.rtcPeer = null;

    var mediaConstraints$2 = constraints$1;
    var reply$2 = createReply();
    /**
     * presenter 与 viewer 进入会议时，都可以传入 reply 配置，用于重写本地配置。
     *
     * mediaConstraints 可以从此处传入， joinRoom 用户，后面也可以从 joinRoomResponse 中得到。
     */
    function mergeOptionWithMediaConstraints$1(replyOptions) {
        if (replyOptions) {
            reply$2.setReplySuccess(replyOptions.success);
            reply$2.setReplyFail(replyOptions.fail);
            if (replyOptions.constraints) {
                mediaConstraints$2 = replyOptions.constraints;
            }
        }
    }
    /**************************************************************************
     *            webRtcPeer 与 GroupCall Socket
     *            同属于远程会议系统，逻辑相互调用。
     *
     *            每一个 webRtcPeer 会议，
     *            都需创建一个 Socket 信令服务器。
     *            会议结束，销毁 webRtcPeer & Socket
     *
     **************************************************************************
     * @param artemis
     * @param clientType
     */
    function groupWebRtcPeer(artemis, clientType) {
        var groupUrl = artemis.groupUrl;
        var _a = artemis.options, logger = _a.logger, $videoContainer = _a.$videoContainer, presenterId = _a.presenterId, presenterName = _a.presenterName, viewerId = _a.viewerId, viewerName = _a.viewerName;
        var _b = (artemis.groupOptions || {}); _b.open; var _d = _b.createRoomResponse, createRoomResponse = _d === void 0 ? noop$1 : _d, _e = _b.joinRoomResponse, joinRoomResponse = _e === void 0 ? noop$1 : _e, _f = _b.newParticipantArrived, newParticipantArrived = _f === void 0 ? noop$1 : _f, _g = _b.participantLeft, participantLeft = _g === void 0 ? noop$1 : _g, _h = _b.receiveVideoAnswer, receiveVideoAnswer = _h === void 0 ? noop$1 : _h, _j = _b.iceCandidate, iceCandidate = _j === void 0 ? noop$1 : _j, _k = _b.stopCommunication, stopCommunication = _k === void 0 ? noop$1 : _k, _l = _b.notice, notice = _l === void 0 ? noop$1 : _l, _m = _b.destroyRoom, destroyRoom = _m === void 0 ? noop$1 : _m, appendVideo = _b.appendVideo, groupOptions = __rest(_b, ["open", "createRoomResponse", "joinRoomResponse", "newParticipantArrived", "participantLeft", "receiveVideoAnswer", "iceCandidate", "stopCommunication", "notice", "destroyRoom", "appendVideo"]);
        var groupSocket;
        // 缓存所有参与者。
        var participants = {};
        var _o = { belongerId: '', belongerName: '' }, belongerId = _o.belongerId, belongerName = _o.belongerName;
        /**
         * 接收视频响应
         *
         * @param result
         */
        function receiveVideoAnswerResponse(result) {
            participants[result.userId].rtcPeer.processAnswer(result.sdpAnswer, function (error) {
                if (error)
                    return console.error(error);
                reply$2.success('连接成功！');
            });
        }
        /**
         * 媒体协商
         * 启用 ICE 候选
         * @param candidate
         */
        function onIceCandidate(candidate, userId) {
            logger.__info("Local candidate" + JSON.stringify(candidate));
            var message = {
                // Candidate: 候选人
                action: 'onIceCandidate',
                candidate: candidate,
                // 当前设备主人的 ID
                userId: userId || belongerId
            };
            groupSocket.sendMessage(message);
        }
        /**
         * 发送给当前视频流的归属者。
         *
         * @param error
         * @param offerSdp
         * @param senderId
         * @param senderName
         */
        function offerToReceiveVideo(error, offerSdp, senderId, senderName) {
            if (error) {
                logger.error("sdp offer error");
                return;
            }
            var msg = {
                action: 'receiveVideoFrom',
                // 视频所属人的 ID
                // 当前视频 Video 是为谁创建的，这个视频的流是来自谁的。
                // 这里就是谁的 ID
                senderId: senderId,
                // 视频所属人的名字
                senderName: senderName,
                sdpOffer: offerSdp
            };
            // Invoking: 援引 启用 调用 借助
            groupSocket.sendMessage(msg);
        }
        /**
         * 有人退出了会议
         *
         * @param request
         */
        function onParticipantLeft(request) {
            var participant = participants[request.userId];
            participant.dispose();
            delete participants[request.userId];
            /**
             * 在房间只剩下自己一个人时，是否销毁房间。
             */
            if (Object.values(participants).length <= 1) {
                if (typeof destroyRoom === 'function') {
                    var isDestroy = destroyRoom();
                    if (isDestroy) {
                        artemis.leaveRoom();
                    }
                }
                if (destroyRoom === true) {
                    artemis.leaveRoom();
                }
            }
        }
        /**
         * 新加入的参与者
         * @param request
         */
        function onNewParticipant(request) {
            receiveVideo(request.userId, request.userName);
        }
        /**
         * WebRTC错误处理 重连
         */
        function onWebRtcPeerCreated(webRtcPeer, _a) {
            var senderId = _a.senderId, senderName = _a.senderName;
            var errorExecute = {
                logger: logger,
                iceConnectionStateFailed: function () {
                    webRtcPeer.generateOffer(function (error, offerSdp) { return offerToReceiveVideo(error, offerSdp, senderId, senderName); });
                },
            };
            if (webRtcPeer) {
                webRTCError(webRtcPeer, errorExecute);
            }
        }
        /**
         * 接收视频流
         *
         * @param senderId
         * @param senderName
         */
        function receiveVideo(senderId, senderName) {
            var participant = new Participant($videoContainer, {
                id: senderId,
                name: senderName,
                media: (mediaConstraints$2.video ? 'video' : 'audio'),
                appendVideo: appendVideo
            });
            var $remoteVideo = participant.getVideoElement();
            var opts = {
                remoteVideo: $remoteVideo,
                mediaConstraints: mediaConstraints$2,
                onicecandidate: function (candidate) { return onIceCandidate(candidate, senderId); },
                configuration: configuration,
            };
            participants[senderId] = participant;
            participant.rtcPeer = lib.WebRtcPeer.WebRtcPeerRecvonly(opts, function (error) {
                if (error) {
                    logger.error(error);
                    return;
                }
                onWebRtcPeerCreated(participant.rtcPeer, { senderId: senderId, senderName: senderName });
                participant.rtcPeer.generateOffer(function (error, offerSdp) {
                    return offerToReceiveVideo(error, offerSdp, senderId, senderName);
                });
            });
        }
        /**
         * 主持人 返回结果处理
         *  TODO 先处理 message消息，然后在创建 participant
         *
         * @param message
         */
        function onExistingParticipants(message) {
            var participant = new Participant($videoContainer, {
                id: belongerId,
                name: belongerName,
                media: (mediaConstraints$2.video ? 'video' : 'audio'),
                appendVideo: appendVideo
            });
            var $localVideo = participant.getVideoElement();
            logger.__info(belongerName + " registered in room ", mediaConstraints$2);
            participant.rtcPeer = lib.WebRtcPeer.WebRtcPeerSendonly({
                localVideo: $localVideo,
                mediaConstraints: mediaConstraints$2,
                onicecandidate: function (candidate) { return onIceCandidate(candidate, belongerId); },
                configuration: configuration,
            }, function (error) {
                if (error)
                    return logger.error(error);
                onWebRtcPeerCreated(participant.rtcPeer, { senderId: belongerId, senderName: belongerName });
                participant.rtcPeer.generateOffer(function (error, offerSdp) {
                    return offerToReceiveVideo(error, offerSdp, belongerId, belongerName);
                });
            });
            participants[belongerId] = participant;
            message.data.forEach(function (item) { return receiveVideo(item.userId, item.userName); });
            participant.rtcPeer.peerConnection.onicecandidateerror = function (error) {
                logger.error("belongerId: {" + belongerId + "; errorText: {" + error.errorText);
            };
            participant.rtcPeer.peerConnection.oniceconnectionstatechange = function () {
                var iceConnectionState = this.iceConnectionState;
                if (iceConnectionState === 'failed') {
                    this.restartIce();
                }
            };
            groupSocket.sendMessage(message);
        }
        function groupCall(artemis, options) {
            var _a = options.checked, checked = _a === void 0 ? [] : _a, roomId = options.roomId, roomName = options.roomName, groupOptions = __rest(options, ["checked", "roomId", "roomName"]);
            var temporaryExisting;
            var joined;
            /**
             * 创建会议成功！
             */
            function __createRoomResponse(res) {
                if (res === 'accepted') {
                    if (Array.isArray(checked) && checked.length) {
                        groupSocket.sendMessage({
                            action: 'invite',
                            userId: belongerId,
                            users: checked,
                            roomId: roomId,
                            roomName: roomName,
                        });
                    }
                }
                else {
                    logger.error('创建会议失败！');
                }
            }
            /**
             * 获取媒体协商配置
             */
            function __joinRoomResponse(res) {
                if (res.response === 'accepted') {
                    mediaConstraints$2 = res.mediaConstraints;
                    joined = true;
                    logger.__info(" registered in room ", mediaConstraints$2);
                    /**
                     * temporaryExisting 用来保证在之后调用 onExistingParticipants
                     */
                    if (temporaryExisting) {
                        temporaryExisting();
                    }
                }
                else {
                    logger.error('获取媒体协商配置失败！');
                }
            }
            groupSocket = mixinWebSocket(groupUrl, __assign({ 
                /**
                 * TODO 观众 返回值 有新的参与者进入会议
                 * @param message
                 */
                createRoomResponse: function (message) {
                    createRoomResponse(clone(message));
                    __createRoomResponse(message.response);
                }, 
                /**
                 * TODO 观众 返回值 有新的参与者进入会议
                 * @param message
                 */
                joinRoomResponse: function (message) {
                    joinRoomResponse(clone(message));
                    __joinRoomResponse(message);
                }, 
                /**
                 * TODO 观众 返回值 有新的参与者进入会议
                 * @param message
                 */
                newParticipantArrived: function (message) {
                    newParticipantArrived(clone(message));
                    onNewParticipant(message);
                }, 
                /**
                 * TODO 观众 返回值 有人离开了会议
                 * @param message
                 */
                participantLeft: function (message) {
                    participantLeft(clone(message));
                    onParticipantLeft(message);
                }, 
                /**
                 * TODO 观众 返回值
                 * @param message
                 */
                receiveVideoAnswer: function (message) {
                    receiveVideoAnswer(clone(message));
                    receiveVideoAnswerResponse(message);
                }, 
                /**
                 * TODO ICE 协商
                 * @param message
                 */
                iceCandidate: function (message) {
                    iceCandidate(clone(message));
                    participants[message.userId].rtcPeer.addIceCandidate(message.candidate, function (error) {
                        if (error) {
                            logger.error("Error adding candidate: " + error);
                            return;
                        }
                    });
                }, 
                /**
                 * TODO 停止 | 结束
                 */
                stopCommunication: function (message) {
                    stopCommunication(clone(message));
                    logger.__info('TODO 停止 | 结束 stopCommunication');
                    destroy();
                }, 
                /**
                 * TODO 后台返回 - 广播
                 *
                 * @param message: {
                 *   instruct: 消息类型
                 * }
                 */
                notice: function (message) {
                    var instruct = message.instruct, target = message.target;
                    logger.__info('Meeting notice', message, clientType);
                    notice(clone(message));
                    if (target === 'existingParticipants') {
                        if (clientType === 'viewer') {
                            /**
                             * temporaryExisting 用来确保 viewer 已经加入房间成功。
                             * 也就是已经收到了 joinRoomResponse； 然后在向 其他人发送 Offer
                             */
                            if (joined) {
                                onExistingParticipants(message);
                                joined = false;
                            }
                            else {
                                temporaryExisting = function () {
                                    onExistingParticipants(message);
                                    temporaryExisting = null;
                                    joined = false;
                                };
                            }
                        }
                        else {
                            onExistingParticipants(message);
                        }
                    }
                    // 停止 | 结束
                    if (instruct === 'leaveRoom') {
                        logger.__info('Meeting notice leaveRoom', message);
                        artemis.leaveRoom();
                    }
                    // 停止 | 结束
                    if (instruct === 'stopCommunication') {
                        logger.__info('Meeting notice', message);
                        destroy();
                    }
                } }, groupOptions));
        }
        /**
         * 销毁
         */
        function destroy() {
            if (groupSocket) {
                groupSocket.destroy();
                groupSocket = null;
            }
        }
        function __destroyRoom() {
            for (var key in participants) {
                participants[key].dispose();
                delete participants[key];
            }
            destroy();
        }
        /**
         * 解散
         */
        function leaveRoom() {
            if (groupSocket) {
                groupSocket.sendMessage({
                    action: 'leaveRoom'
                });
            }
            __destroyRoom();
        }
        function dissolveRoom() {
            if (groupSocket) {
                groupSocket.sendMessage({
                    action: 'dissolveRoom',
                    userId: presenterId || viewerId
                });
            }
        }
        /**
         * 1. 创建 Socket 链接
         * 2. 创建房间
         */
        function createMeeting(meeting, replyOptions) {
            if (!appendVideo && !$videoContainer) {
                logger.error('$videoContainer 为视频会议容器，必须传入！');
                return;
            }
            mergeOptionWithMediaConstraints$1(replyOptions);
            // $videoContainer.appendChild($container);
            if (!groupSocket) {
                belongerId = presenterId || meeting.presenterId;
                belongerName = presenterName || meeting.presenterName;
                groupCall(artemis, __assign(__assign(__assign({}, meeting), { open: function () {
                        groupSocket.sendMessage({
                            action: "createRoom",
                            userId: presenterId,
                            userName: presenterName,
                            roomId: meeting.roomId,
                            roomName: meeting.roomName,
                            mediaConstraints: replyOptions.constraints,
                        });
                    } }), groupOptions));
            }
        }
        /**
         * 创建多人会议
         *
         * @param meeting
         * @param replyOptions
         */
        artemis.createMeeting = function (meeting, replyOptions) {
            if (!meeting.presenterId) {
                logger.error('meeting.presenterId 会议创建者 ID 不能为空！');
                return;
            }
            if (!meeting.roomId) {
                logger.error('meeting.roomId 会议 ID 不能为空！');
                return;
            }
            /**
             * constraints 没有传入
             */
            if (!replyOptions.constraints) {
                replyOptions.constraints = constraints$1;
            }
            /**
             * video 和 audio 都是false
             */
            if (!replyOptions.constraints.video && !replyOptions.constraints.audio) {
                logger.error('video & audio 不能同时都是 false');
                replyOptions.constraints = constraints$1;
            }
            createMeeting(meeting, replyOptions);
        };
        /**
         * 加入房间
         */
        function joinRoom(meeting, replyOptions) {
            // $videoContainer.appendChild($container);
            mergeOptionWithMediaConstraints$1(replyOptions);
            if (!groupSocket) {
                logger.__info('加入房间！', artemis);
                belongerId = viewerId || meeting.viewerId;
                belongerName = viewerName || meeting.viewerName;
                groupCall(artemis, __assign(__assign(__assign({}, meeting), { open: function () {
                        groupSocket.sendMessage({
                            action: "joinRoom",
                            userId: viewerId || presenterId,
                            userName: viewerName || presenterName,
                            roomId: meeting.roomId,
                            roomName: meeting.roomName,
                        });
                    } }), groupOptions));
            }
        }
        artemis.joinRoom = joinRoom;
        artemis.leaveRoom = leaveRoom;
        artemis.dissolveRoom = dissolveRoom;
    }

    var reply$1 = createReply();
    var WebRtcPeerSendrecv = lib.WebRtcPeer.WebRtcPeerSendrecv;
    var NO_CALL = 0;
    var PROCESSING_CALL = 1;
    var IN_CALL = 2;
    var callState = null;
    /**
     * 纯音频
     */
    var mediaConstraints$1 = {
        audio: true,
        video: true,
    };
    function setCallState(nextState) {
        callState = nextState;
    }
    /**************************************************************************
     *            webRtcPeer 与 singleCall Socket
     *            同属于广播系统，逻辑相互调用。
     *
     *            每一个 webRtcPeer 广播，
     *            都需创建一个 Socket 信令服务器。
     *            广播结束，注销 webRtcPeer & Socket
     *
     **************************************************************************
     * @param artemis
     * @param clientType
     */
    function singleCallWebRtcPeer(artemis, clientType) {
        var webRtcPeer;
        var socketSingle;
        var singleUrl = artemis.singleUrl;
        var _a = artemis.options, logger = _a.logger, presenterId = _a.presenterId; _a.presenterName; var viewerId = _a.viewerId; _a.viewerName; var acceptTheCall = _a.acceptTheCall, $callContainer = _a.$callContainer;
        var options = {
            mediaConstraints: mediaConstraints$1,
            onicecandidate: onIceCandidate,
            configuration: configuration,
            localVideo: createElement('video'),
            remoteVideo: createElement('video')
        };
        var _b = (artemis.singleOptions || {}), _c = _b.open, open = _c === void 0 ? noop$1 : _c, _d = _b.iceCandidate, iceCandidate = _d === void 0 ? noop$1 : _d, _e = _b.startCommunication, startCommunication = _e === void 0 ? noop$1 : _e, _f = _b.stopCommunication, stopCommunication = _f === void 0 ? noop$1 : _f, _g = _b.callResponse, callResponse = _g === void 0 ? noop$1 : _g, _h = _b.notice, notice = _h === void 0 ? noop$1 : _h, _j = _b.recordingResponse, recordingResponse = _j === void 0 ? noop$1 : _j, _k = _b.stopped, stopped = _k === void 0 ? noop$1 : _k, _l = _b.playResponse, playResponse = _l === void 0 ? noop$1 : _l, appendVideo = _b.appendVideo, singleOptions = __rest(_b, ["open", "iceCandidate", "startCommunication", "stopCommunication", "callResponse", "notice", "recordingResponse", "stopped", "playResponse", "appendVideo"]);
        if (!appendVideo) {
            appendVideo = function onVideoAppend(localVideo, remoteVideo) {
                if (!isDOM(localVideo)) {
                    return logger.error('localVideo video is not find!');
                }
                if (!isDOM(remoteVideo)) {
                    return logger.error('remoteVideo video is not find!');
                }
                if (!$callContainer) {
                    return logger.error('$callContainer is not find!');
                }
                if (options.mediaConstraints.video) {
                    $callContainer.appendChild(localVideo);
                    $callContainer.appendChild(remoteVideo);
                }
            };
        }
        /**
         * TODO 注销 Socket
         * 注销
         */
        function __destroy(isReceive) {
            logger.__info('注销！！！！！！！！！！！！！');
            setCallState(NO_CALL);
            var opt = {
                action: 'stop',
                // 发布者的ID
                presenter: presenterId,
                // 当前用户 ID
                userId: presenterId,
            };
            if (clientType === 'viewer') {
                opt.userId = viewerId;
            }
            if (webRtcPeer) {
                webRtcPeer.dispose();
                webRtcPeer = null;
            }
            if (socketSingle) {
                if (!isReceive) {
                    socketSingle.sendMessage(opt);
                }
                socketSingle.destroy();
                socketSingle = null;
            }
            // 本地视频
            if (hasChild($callContainer, options.localVideo)) {
                $callContainer.removeChild(options.localVideo);
            }
            // 远程视频
            if (hasChild($callContainer, options.remoteVideo)) {
                $callContainer.removeChild(options.remoteVideo);
            }
            logger.__info('一对一 销毁成功！');
        }
        /**
         * TODO 错误信息处理
         *
         * @param errorMessage
         */
        function __withError(errorMessage) {
            reply$1.fail(errorMessage);
            logger.error('Call not accepted by peer. Closing call: ' + (errorMessage || 'Unknown reason for call rejection.'));
            __destroy();
        }
        /**
         * TODO 处理 Answer
         *
         * @param sdpAnswer
         */
        function __processAnswer(sdpAnswer) {
            webRtcPeer.processAnswer(sdpAnswer, function (error) {
                if (error) {
                    return logger.error(error);
                }
                reply$1.success('连接成功！');
            });
        }
        function mixinSingleCall(artemis, singleOptions) {
            socketSingle = mixinWebSocket(singleUrl + ("?t=" + Date.now()), __assign({ 
                /**
                 * TODO ICE 协商
                 * 观众 返回结果处理 answer
                 * @param message
                 */
                iceCandidate: function (message) {
                    iceCandidate(clone(message));
                    webRtcPeer.addIceCandidate(message.candidate, function (error) {
                        if (error)
                            return logger.error('Error adding candidate: ' + error);
                    });
                }, 
                /**
                 * TODO 观众 返回值
                 * 观众 返回结果处理
                 * @param message
                 */
                startCommunication: function (message) {
                    startCommunication(clone(message));
                    if (message.response != 'accepted') {
                        __withError(message.message);
                    }
                    else {
                        if (message.action === 'startCommunication') {
                            setCallState(IN_CALL);
                        }
                        __processAnswer(message.sdpAnswer);
                    }
                }, 
                /**
                 * TODO 观众 返回值 挂断电话
                 * @param message
                 */
                stopCommunication: function (message) {
                    stopCommunication(clone(message));
                    __destroy(clientType === 'presenter');
                }, 
                /**
                 * TODO 打电话返回
                 * 主持人 返回结果处理
                 *
                 * @param message
                 */
                callResponse: function (message) {
                    callResponse(clone(message));
                    if (message.response != 'accepted') {
                        __withError(message.message);
                    }
                    else {
                        if (message.action === 'callResponse') {
                            setCallState(IN_CALL);
                        }
                        __processAnswer(message.sdpAnswer);
                    }
                }, 
                /**
                 * TODO 后台返回 - 广播
                 *
                 * @param message: {
                 *   instruct: 消息类型
                 * }
                 */
                notice: function (message) {
                    var instruct = message.instruct;
                    notice(clone(message));
                    /**
                     * TODO 停止 | 结束
                     */
                    if (instruct === 'stopCommunication') {
                        logger.__info('broadcast notice', message);
                        __destroy();
                    }
                }, recordingResponse: function (message) {
                    recordingResponse(clone(message));
                }, 
                // 停止录制返回
                stopped: function (message) {
                    stopped(clone(message));
                }, 
                // 播放返回
                playResponse: function (message) {
                    playResponse(clone(message));
                } }, singleOptions));
        }
        /**
         * 建立 ICE 协商
         *
         * @param candidate
         */
        function onIceCandidate(candidate) {
            logger.__info("Local candidate" + JSON.stringify(candidate));
            var message = {
                action: 'onIceCandidate',
                candidate: candidate,
            };
            socketSingle.sendMessage(message);
        }
        /**
         * 创建 OfferSdp
         *
         * @param offerSdp
         * @param params
         */
        function onOfferPresenter(offerSdp, params) {
            logger.__info('onOfferPresenter');
            var message = {
                action: 'call',
                from: artemis.options[clientType + "Id"],
                sdpOffer: offerSdp,
                to: artemis.options.toSomeoneId,
                mediaConstraints: options.mediaConstraints,
                param: params,
            };
            socketSingle.sendMessage(message);
        }
        /**
         *
         * @param offerSdp
         * @param message
         */
        function onOfferViewer(offerSdp, message) {
            logger.__info('onOfferViewer ' + location.host);
            var response = {
                action: 'incomingCallResponse',
                from: message.from,
                to: message.to,
                callResponse: 'accept',
                sdpOffer: offerSdp
            };
            socketSingle.sendMessage(response);
        }
        /**
         * WebRTC错误处理 重连
         */
        function onWebRtcPeerCreated(replyOpt) {
            var errorExecute = {
                logger: logger,
                iceConnectionStateFailed: function () {
                    webRtcPeer.generateOffer(function (error, offerSdp) {
                        if (error) {
                            setCallState(NO_CALL);
                            return console.error('Error generating the offer');
                        }
                        if (clientType === 'presenter') {
                            onOfferPresenter(offerSdp, replyOpt);
                        }
                        if (clientType === 'viewer') {
                            onOfferViewer(offerSdp, replyOpt);
                        }
                    });
                },
            };
            if (webRtcPeer) {
                webRTCError(webRtcPeer, errorExecute);
            }
        }
        /**
         * 拨起电话
         *
         * @param toSomeone
         * @param replyOptions
         */
        artemis.onSingleCall = function onCall(toSomeone, replyOptions) {
            var mediaConstraints = replyOptions.constraints, success = replyOptions.success, fail = replyOptions.fail, replyOpt = __rest(replyOptions, ["constraints", "success", "fail"]);
            if (!appendVideo && !artemis.options.$callContainer) {
                logger.error('$callContainer 为电话视频容器，必须传入！');
            }
            if (replyOptions) {
                reply$1.setReplySuccess(success);
                reply$1.setReplyFail(fail);
                options.mediaConstraints = mediaConstraints ? mediaConstraints : constraints$1;
            }
            if (!options.mediaConstraints.video || toSomeone.userType === 2) {
                options.localVideo = createElement('audio');
                options.remoteVideo = createElement('audio');
            }
            if (!webRtcPeer) {
                logger.__info('拨起电话！！！！！！！');
                setCallState(PROCESSING_CALL);
                webRtcPeer = WebRtcPeerSendrecv(options, function (error) {
                    if (error) {
                        setCallState(NO_CALL);
                        return logger.error(error);
                    }
                    if (!socketSingle) {
                        mixinSingleCall(artemis, __assign({ open: function (data) {
                                open(clone(data));
                                if (toSomeone.viewerId) {
                                    // 向叶面添加 媒体标签
                                    appendVideo(options.localVideo, options.remoteVideo, __assign(__assign({}, replyOpt), { remoteUserId: toSomeone.viewerId }));
                                    artemis.options.toSomeoneId = toSomeone.viewerId;
                                    onWebRtcPeerCreated(replyOpt);
                                    webRtcPeer.generateOffer(function (error, offerSdp) {
                                        if (error) {
                                            return logger.error('Error generating the offer');
                                        }
                                        onOfferPresenter(offerSdp, replyOpt);
                                    });
                                }
                            } }, singleOptions));
                    }
                });
            }
        };
        /**
         * 接听电话
         *
         * @param message: 发布者 Info
         */
        artemis.onIncomingCall = function onIncomingCall(message) {
            if (message === void 0) { message = {}; }
            return __awaiter(this, void 0, void 0, function () {
                var result, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            artemis.options.presenterId = message.to;
                            logger.__info('接听电话！！！！！！！');
                            setCallState(NO_CALL);
                            if (message.mediaConstraints) {
                                options.mediaConstraints = message.mediaConstraints;
                            }
                            if (!options.mediaConstraints.video) {
                                options.localVideo = createElement('audio');
                                options.remoteVideo = createElement('audio');
                            }
                            if (callState !== NO_CALL) {
                                artemis.connectSendRejected({
                                    instruct: 'singleCall',
                                    from: message.from
                                });
                                __destroy();
                                return [2 /*return*/];
                            }
                            if (!(acceptTheCall && typeof acceptTheCall === 'function')) return [3 /*break*/, 5];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, acceptTheCall(message)];
                        case 2:
                            result = _a.sent();
                            if (!result) {
                                // 拒绝
                                artemis.connectSendRejected({
                                    instruct: 'singleCall',
                                    from: message.from
                                });
                                __destroy();
                                return [2 /*return*/];
                            }
                            if (!socketSingle) {
                                mixinSingleCall(artemis, __assign({ open: function (data) {
                                        open(clone(data));
                                        if (!webRtcPeer) {
                                            logger.__info('接收广播！！！！！！！');
                                            // 向叶面添加 媒体标签
                                            appendVideo(options.localVideo, options.remoteVideo, __assign(__assign({}, message.param), { remoteUserId: message.from }));
                                            onWebRtcPeerCreated(message);
                                            webRtcPeer = WebRtcPeerSendrecv(options, function (error) {
                                                if (error) {
                                                    setCallState(NO_CALL);
                                                    return logger.error(error);
                                                }
                                                webRtcPeer.generateOffer(function (error, offerSdp) {
                                                    if (error) {
                                                        setCallState(NO_CALL);
                                                        return logger.error('Error generating the offer');
                                                    }
                                                    onOfferViewer(offerSdp, message);
                                                });
                                            });
                                        }
                                    } }, singleOptions));
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _a.sent();
                            logger.error('acceptTheCall 必须返回一个 Promise', error_1);
                            return [3 /*break*/, 4];
                        case 4: return [3 /*break*/, 6];
                        case 5:
                            logger.error('acceptTheCall 必须传入一个异步函数，并返回 接听(true) | 拒绝(false)');
                            _a.label = 6;
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 录制
         *
         * @param status 开始录音 start / 停止录音 stop / 播放 play
         * @param mode 全部 both | undefined 仅视频 video-only 仅音频 audio-only
         * @param format mp4 | webm
         */
        artemis.handleRecord = function (status, mode, format) {
            var message = {
                action: 'recording',
                status: status,
                format: format,
                mode: mode
            };
            socketSingle.sendMessage(message);
        };
        artemis.destroySingle = __destroy;
    }

    var _a = lib.WebRtcPeer; _a.WebRtcPeerSendrecv; var WebRtcPeerRecvonly = _a.WebRtcPeerRecvonly, WebRtcPeerSendonly = _a.WebRtcPeerSendonly;
    function processingWebRtcPeerError(webRtcPeer, options, cb) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        var noError = true;
                        var rtc = webRtcPeer(options, function (error) {
                            if (error) {
                                noError = false;
                                return console.error(error);
                            }
                        });
                        /**
                         * 只有
                         */
                        if (noError) {
                            cb && cb();
                        }
                        else {
                            rtc = noError;
                        }
                        resolve(rtc);
                    })];
            });
        });
    }
    /**
     * 仅接收
     *
     * @param options
     * @param cb
     */
    function recvOnly(options, cb) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, processingWebRtcPeerError(WebRtcPeerRecvonly, options, cb)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }
    /**
     * 仅发送
     *
     * @param options
     * @param cb
     */
    function sendOnly(options, cb) {
        return WebRtcPeerSendonly(options, function (error) {
            if (error) {
                return console.error(error);
            }
            cb && cb();
        });
    }
    /**
     * 保存 sdpAnswer
     *
     * @param rtc
     * @param sdpAnswer
     * @param cb
     */
    function processAnswer(rtc, sdpAnswer, cb) {
        rtc.processAnswer(sdpAnswer, function (error) {
            if (error)
                return console.error(error);
            // reply.success('连接成功！');
            cb && cb('连接成功！');
        });
    }
    function generateOffer(rtc, cb) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        rtc.generateOffer(function (error, offerSdp) {
                            if (error)
                                return console.error("sdp offer error");
                            // return offerToReceiveVideo(error, { offerSdp, senderId: presenterId, senderName: presenterName, media: mediaConstraints })
                            cb && cb(offerSdp);
                            return resolve && resolve(offerSdp);
                        });
                    })];
            });
        });
    }
    /**
     * 媒体协商
     * 启用 ICE 候选
     *
     * @param groupSocket
     * @param userId
     * @return (candidate: string) => void
     */
    function onIceCandidate(groupSocket, userId) {
        return function (candidate) { return groupSocket.sendMessage({
            action: 'onIceCandidate',
            candidate: candidate,
            userId: userId
        }); };
    }

    var mediaConstraints = constraints$1;
    var reply = createReply();
    var mediaConfig;
    /**
     * presenter 与 viewer 进入会议时，都可以传入 reply 配置，用于重写本地配置。
     *
     * mediaConstraints 可以从此处传入， joinRoom 用户，后面也可以从 joinRoomResponse 中得到。
     */
    function mergeOptionWithMediaConstraints(replyOptions) {
        if (replyOptions) {
            reply.setReplySuccess(replyOptions.success);
            reply.setReplyFail(replyOptions.fail);
            if (replyOptions.mediaConstraints) {
                mediaConstraints = replyOptions.mediaConstraints;
            }
        }
    }
    /**************************************************************************
     *            intercom
     *            同属于对讲系统，继承于远程会议。
     *
     *            每一个 webRtcPeer 会议，
     *            都需创建一个 Socket 信令服务器。
     *            会议结束，销毁 webRtcPeer & Socket
     *
     **************************************************************************
     * @param artemis
     * @param clientType
     */
    function intercomWebRtcPeer(artemis, clientType) {
        var intercomUrl = artemis.intercomUrl;
        var _a = artemis.options, logger = _a.logger, $videoContainer = _a.$videoContainer, presenterId = _a.presenterId, presenterName = _a.presenterName, viewerId = _a.viewerId, viewerName = _a.viewerName;
        var _b = (artemis.intercomOptions || {}); _b.open; var _d = _b.close, close = _d === void 0 ? noop$1 : _d, _e = _b.createResponse, createResponse = _e === void 0 ? noop$1 : _e, _f = _b.joinResponse, joinResponse = _f === void 0 ? noop$1 : _f, _g = _b.catchMicResponse, catchMicResponse = _g === void 0 ? noop$1 : _g, _h = _b.releaseMicResponse, releaseMicResponse = _h === void 0 ? noop$1 : _h, _j = _b.participantLeft, participantLeft = _j === void 0 ? noop$1 : _j, _k = _b.receiveVideoAnswer, receiveVideoAnswer = _k === void 0 ? noop$1 : _k, _l = _b.iceCandidate, iceCandidate = _l === void 0 ? noop$1 : _l, _m = _b.stopCommunication, stopCommunication = _m === void 0 ? noop$1 : _m, _o = _b.notice, notice = _o === void 0 ? noop$1 : _o, _p = _b.destroyIntercom, destroyIntercom = _p === void 0 ? noop$1 : _p, _q = _b.reactionJoinIntercom, reactionJoinIntercom = _q === void 0 ? function () { return Promise.resolve(true); } : _q, appendVideo = _b.appendVideo, intercomOptions = __rest(_b, ["open", "close", "createResponse", "joinResponse", "catchMicResponse", "releaseMicResponse", "participantLeft", "receiveVideoAnswer", "iceCandidate", "stopCommunication", "notice", "destroyIntercom", "reactionJoinIntercom", "appendVideo"]);
        var intercomSocket;
        // 缓存所有参与者。
        var participants = {};
        var _r = {}, belongerId = _r.belongerId, belongerName = _r.belongerName;
        var microphone = {};
        /**
         * 发送给当前视频流的归属者。
         *
         * @param offerSdp
         * @param senderId
         * @param senderName
         * @param media
         */
        function offerToReceiveVideo(_a) {
            var offerSdp = _a.offerSdp, senderId = _a.senderId, senderName = _a.senderName, media = _a.media;
            // Invoking: 援引 启用 调用 借助
            intercomSocket.sendMessage({
                action: 'receiveFrom',
                userId: presenterId || viewerId,
                userName: presenterName || viewerName,
                sdpOffer: offerSdp,
                media: media,
                // 视频所属人 - 当前视频 Video 是为谁创建的，这个视频的流是来自谁的。
                from: {
                    userId: senderId,
                    userName: senderName
                }
            });
        }
        /**
         * 有人退出了会议
         *
         * @param request
         */
        function onParticipantLeft(request) {
            var participant = participants[request.userId];
            participant.dispose();
            delete participants[request.userId];
            /**
             * 在房间只剩下自己一个人时，是否销毁房间。
             */
            if (Object.values(participants).length <= 1) {
                if (typeof destroyIntercom === 'function') {
                    var isDestroy = destroyIntercom();
                    if (isDestroy) {
                        artemis.leaveIntercom();
                    }
                }
                if (destroyIntercom === true) {
                    artemis.leaveIntercom();
                }
            }
        }
        /**
         * WebRTC错误处理 重连
         */
        function onWebRtcPeerCreated(webRtcPeer, offerMsg) {
            var errorExecute = {
                logger: logger,
                iceConnectionStateFailed: function () {
                    webRtcPeer.generateOffer(function (error, offerSdp) {
                        if (error) {
                            return console.error('Error generating the offer');
                        }
                        offerToReceiveVideo(__assign(__assign({}, offerMsg), { offerSdp: offerSdp }));
                    });
                },
            };
            if (webRtcPeer) {
                webRTCError(webRtcPeer, errorExecute);
            }
        }
        /**
         * 接收视频流
         *
         * @param senderId
         * @param senderName
         * @param media
         */
        function receiveVideo(senderId, senderName, media) {
            if (media === void 0) { media = {}; }
            return __awaiter(this, void 0, void 0, function () {
                var participant, $remoteVideo, rtc, offerSdp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            participant = new Participant($videoContainer, {
                                id: senderId,
                                name: senderName,
                                media: getMediaType(mediaConstraints.video),
                                appendVideo: appendVideo
                            });
                            $remoteVideo = participant.getVideoElement();
                            return [4 /*yield*/, recvOnly({
                                    remoteVideo: $remoteVideo,
                                    mediaConstraints: mediaConstraints,
                                    onicecandidate: onIceCandidate(intercomSocket, senderId),
                                    configuration: configuration,
                                })];
                        case 1:
                            rtc = _a.sent();
                            if (!media.mediaConstraints) {
                                media.mediaConstraints = mediaConstraints;
                            }
                            if (typeof media.mediaConstraints === 'string') {
                                media.mediaConstraints = JSON.parse(media.mediaConstraints);
                            }
                            onWebRtcPeerCreated(rtc, { senderId: senderId, senderName: senderName, media: media });
                            return [4 /*yield*/, generateOffer(rtc)];
                        case 2:
                            offerSdp = _a.sent();
                            participant.rtcPeer = rtc;
                            participants[senderId] = participant;
                            offerToReceiveVideo({
                                offerSdp: offerSdp,
                                senderId: senderId,
                                senderName: senderName,
                                media: media
                            });
                            return [2 /*return*/];
                    }
                });
            });
        }
        /**
         * 启用/禁用麦克风
         */
        function microphoneEnabled(enabled) {
            participants[belongerId].rtcPeer.audioEnabled = enabled;
            logger.__info('enabled: => ', enabled);
        }
        /**
         * 创建 intercomCall Socket
         *
         * @param artemis
         * @param options
         */
        function intercomCall(artemis, options) {
            options.checked; options.roomId; options.roomName; var groupOptions = __rest(options, ["checked", "roomId", "roomName"]);
            /**
             * 创建会议成功！
             */
            function __createResponse(media) {
                var from = { userId: presenterId, userNam: presenterName };
                media.mediaConstraints = mediaConstraints;
                intercomSocket.sendMessage({
                    action: 'join',
                    userId: presenterId,
                    userName: presenterName,
                    media: media,
                    from: from
                });
            }
            /**
             * 获取媒体协商配置
             * 主持人 返回结果处理
             *  TODO 先处理 message消息，然后在创建 participant
             *
             * @param result { id, name, mediaType, participants, mediaConstraints }
             */
            function __joinResponse(result) {
                return __awaiter(this, void 0, void 0, function () {
                    var participantOpt, participant, $localVideo;
                    return __generator(this, function (_a) {
                        participantOpt = {
                            id: belongerId,
                            name: belongerName,
                            media: getMediaType(mediaConstraints.video),
                            appendVideo: appendVideo
                        };
                        participant = new Participant($videoContainer, participantOpt);
                        $localVideo = participant.getVideoElement();
                        participant.rtcPeer = sendOnly({
                            localVideo: $localVideo,
                            mediaConstraints: mediaConstraints,
                            onicecandidate: onIceCandidate(intercomSocket, belongerId),
                            configuration: configuration,
                        }, function () {
                            participants[belongerId] = participant;
                            microphoneEnabled(false);
                            onWebRtcPeerCreated(participant.rtcPeer, {
                                senderId: belongerId,
                                senderName: belongerName,
                                media: result
                            });
                            generateOffer(participant.rtcPeer, function (offerSdp) {
                                logger.__info(participant.rtcPeer);
                                offerToReceiveVideo({
                                    offerSdp: offerSdp,
                                    senderId: belongerId,
                                    senderName: belongerName,
                                    media: result
                                });
                            });
                        });
                        result.participants.forEach(function (item) { return receiveVideo(item.userId, item.userName, result); });
                        return [2 /*return*/];
                    });
                });
            }
            intercomSocket = mixinWebSocket(intercomUrl, __assign({ close: function () {
                    close();
                    __destroyIntercom();
                }, 
                /**
                 * TODO { 返回结果 } 创建-组
                 * @param message
                 */
                createResponse: function (message) {
                    var response = message.response, result = message.result;
                    createResponse(clone(message));
                    if (response === 'accepted') {
                        __createResponse(result);
                    }
                    else {
                        logger.error('创建组失败！');
                    }
                }, 
                /**
                 * TODO 观众 返回值 有新的参与者进入会议
                 * @param message
                 */
                joinResponse: function (message) {
                    var response = message.response, result = message.result;
                    joinResponse(clone(message));
                    if (response === 'accepted') {
                        __joinResponse(result);
                    }
                    else {
                        logger.error('加入组失败！');
                    }
                }, 
                /**
                 * 抢麦 成功/失败
                 */
                catchMicResponse: function (message) {
                    var _a;
                    var response = message.response, result = message.result; message.sdpAnswer; message.from;
                    catchMicResponse(clone(message));
                    if (response === 'accepted' && result.holding && result.holder) {
                        microphone.holding = result.holding;
                        microphone.holder = result.holder;
                        microphoneEnabled(((_a = result.holder) === null || _a === void 0 ? void 0 : _a.userId) === belongerId);
                        if (microphone.__grabCatchMicrophoneCallback) {
                            microphone.__grabCatchMicrophoneCallback(result);
                        }
                    }
                    else {
                        logger.error('抢麦失败！');
                    }
                }, 
                /**
                 * 释放麦 成功/失败
                 */
                releaseMicResponse: function (message) {
                    var response = message.response;
                    releaseMicResponse(clone(message));
                    if (response === 'accepted') {
                        microphone = {};
                        microphoneEnabled(false);
                        if (microphone.__releaseMicrophoneCallback) {
                            microphone.__releaseMicrophoneCallback();
                        }
                    }
                    else {
                        logger.error('释放麦失败！');
                    }
                }, 
                /**
                 * TODO 观众 返回值 有人离开了会议
                 * @param message
                 */
                participantLeft: function (message) {
                    participantLeft(clone(message));
                    onParticipantLeft(message);
                }, 
                /**
                 * TODO 观众 返回值
                 * 接收视频响应
                 *
                 * @param message
                 */
                receiveFromResponse: function (message) {
                    var response = message.response; message.result; var sdpAnswer = message.sdpAnswer, from = message.from;
                    receiveVideoAnswer(clone(message));
                    if (response === 'accepted') {
                        processAnswer(participants[from.userId].rtcPeer, sdpAnswer, reply.success);
                    }
                    else {
                        logger.error('加入组失败！');
                    }
                }, 
                /**
                 * TODO ICE 协商
                 * @param message
                 */
                iceCandidate: function (message) {
                    iceCandidate(clone(message));
                    participants[message.userId].rtcPeer.addIceCandidate(message.candidate, function (error) {
                        if (error) {
                            logger.error("Error adding candidate: " + error);
                            return;
                        }
                    });
                }, 
                /**
                 * TODO 停止 | 结束
                 */
                stopCommunication: function (message) {
                    stopCommunication(clone(message));
                    logger.__info('TODO 停止 | 结束 stopCommunication');
                    destroy();
                }, 
                /**
                 * TODO 后台返回 - 广播
                 *
                 * @param message: {
                 *   instruct: 消息类型
                 * }
                 */
                notice: function (message) {
                    var instruct = message.instruct, data = message.data, media = message.media, userId = message.userId; message.userName;
                    logger.__info("Intercom notice: " + clientType + " => " + JSON.stringify(message, null, 2));
                    notice(clone(message));
                    // TODO 观众 返回值 有新的参与者进入会议
                    if (instruct === 'newParticipantArrived') {
                        if (!media) {
                            media = mediaConfig;
                        }
                        receiveVideo(data.participant.userId, data.participant.userName, media);
                    }
                    // TODO 有人抢麦成功
                    if (instruct === 'holdingMic') {
                        microphone = { holder: data.holder, holding: data.holder.userId === userId };
                        microphoneEnabled(data.holder.userId === userId);
                    }
                    // TODO 有人释放麦
                    if (instruct === 'micReleased') {
                        microphone = {};
                        microphoneEnabled(false);
                    }
                    // 停止 | 结束
                    if (instruct === 'leaveIntercom') {
                        artemis.leaveIntercom();
                    }
                    // 停止 | 结束
                    if (instruct === 'stopCommunication') {
                        destroy();
                    }
                } }, groupOptions));
        }
        /**
         * 销毁
         */
        function destroy() {
            if (intercomSocket) {
                intercomSocket.destroy();
                intercomSocket = null;
            }
        }
        function __destroyIntercom() {
            for (var key in participants) {
                participants[key].dispose();
                delete participants[key];
            }
            destroy();
        }
        /**
         * 退出
         */
        artemis.leaveIntercom = function leaveIntercom() {
            if (intercomSocket) {
                intercomSocket.sendMessage({
                    action: 'leave',
                    userId: belongerId,
                    userName: belongerName,
                    media: mediaConfig,
                });
            }
            __destroyIntercom();
        };
        /**
         * 解散
         */
        artemis.dissolveIntercom = function dissolveRoom() {
            if (intercomSocket) {
                intercomSocket.sendMessage({
                    action: 'dissolve',
                    userId: belongerId,
                    userName: belongerName,
                    media: mediaConfig,
                });
            }
        };
        /**
         * 创建多人会议
         * 1. 创建 Socket 链接
         * 2. 创建房间
         *
         * @param media
         * @param replyOptions
         */
        artemis.createIntercom = function (media, replyOptions) {
            if (replyOptions === void 0) { replyOptions = {}; }
            if (!media.id)
                return logger.error('meeting.roomId 会议 ID 不能为空！');
            if (!appendVideo && !$videoContainer)
                return logger.error('$videoContainer 为视频会议容器，必须传入！');
            // constraints 没有传入
            if (!replyOptions.constraints)
                replyOptions.constraints = constraints$1;
            // video 和 audio 都是false
            if (!replyOptions.constraints.video && !replyOptions.constraints.audio) {
                logger.error('video & audio 不能同时都是 false');
                replyOptions.constraints = constraints$1;
            }
            mergeOptionWithMediaConstraints(replyOptions);
            mediaConfig = media;
            if (!intercomSocket) {
                intercomCall(artemis, __assign({ open: function () {
                        belongerId = presenterId;
                        belongerName = presenterName;
                        intercomSocket.sendMessage({
                            action: 'create',
                            userId: presenterId,
                            userName: presenterName,
                            media: media
                        });
                    } }, intercomOptions));
            }
        };
        /**
         * 加入房间
         */
        artemis.joinIntercom = function joinIntercom(media, from) {
            return __awaiter(this, void 0, void 0, function () {
                var answer;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!intercomSocket) return [3 /*break*/, 2];
                            logger.__info('加入房间！' + JSON.stringify(artemis, null, 2));
                            return [4 /*yield*/, reactionJoinIntercom()];
                        case 1:
                            answer = _a.sent();
                            if (!answer) {
                                artemis.connectSendRejected({ media: media, from: from });
                                return [2 /*return*/];
                            }
                            mediaConfig = media;
                            mediaConstraints = media.mediaConstraints;
                            intercomCall(artemis, __assign({ open: function () {
                                    belongerId = viewerId || presenterId;
                                    belongerName = viewerName || presenterName;
                                    intercomSocket.sendMessage({
                                        action: 'join',
                                        userId: belongerId,
                                        userName: belongerName,
                                        media: media,
                                        from: from
                                    });
                                } }, intercomOptions));
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 邀请
         */
        artemis.inviteParticipants = function grabCatchMicrophone(participants) {
            if (participants === void 0) { participants = []; }
            intercomSocket.sendMessage({
                action: 'invite',
                userId: belongerId,
                userName: belongerName,
                media: __assign(__assign({}, mediaConfig), { participants: participants }),
            });
        };
        /**
         * 抢麦
         */
        artemis.grabCatchMicrophone = function grabCatchMicrophone(cb) {
            intercomSocket.sendMessage({
                action: 'catchMic',
                userId: belongerId,
                userName: belongerName,
                media: mediaConfig,
            });
            if (cb) {
                microphone.__grabCatchMicrophoneCallback = cb;
            }
        };
        /**
         * 释放麦
         */
        artemis.releaseMicrophone = function releaseMicrophone(cb) {
            intercomSocket.sendMessage({
                action: 'releaseMic',
                userId: belongerId,
                userName: belongerName,
                media: mediaConfig,
            });
            if (cb) {
                microphone.__releaseMicrophoneCallback = cb;
            }
        };
    }

    /**************************************************************************
     *            One2many:       一对多广播系统
     *            GroupMeeting:   多人视频会议系统
     *
     **************************************************************************
     * @param artemis
     * @param clientType
     */
    function webRtcPeer(artemis, clientType) {
        one2manyWebRtcPeer(artemis, clientType);
        groupWebRtcPeer(artemis, clientType);
        singleCallWebRtcPeer(artemis, clientType);
        intercomWebRtcPeer(artemis, clientType);
    }

    var Artemis = /** @class */ (function () {
        function Artemis(socketUrl, defaultOptions) {
            var one2ManyOptions = defaultOptions.one2ManyOptions, groupOptions = defaultOptions.groupOptions, intercomOptions = defaultOptions.intercomOptions, singleOptions = defaultOptions.singleOptions, options = __rest(defaultOptions, ["one2ManyOptions", "groupOptions", "intercomOptions", "singleOptions"]);
            this.connectUrl = socketUrl + "/connect";
            this.callUrl = defaultOptions.callUrl || socketUrl + "/broadcast";
            this.groupUrl = defaultOptions.groupUrl || socketUrl + "/groupCall";
            this.intercomUrl = defaultOptions.intercomUrl || socketUrl + "/intercom";
            this.singleUrl = defaultOptions.singleUrl || socketUrl + "/singleCall";
            this.options = options;
            this.one2ManyOptions = one2ManyOptions;
            this.groupOptions = groupOptions;
            this.singleOptions = singleOptions;
            this.intercomOptions = intercomOptions;
            this.options.logger = logger$1(defaultOptions.logger);
            if (!defaultOptions.$callContainer) {
                defaultOptions.$callContainer = defaultOptions.$videoContainer;
            }
        }
        /**
         * 初始化主持人
         *
         * @param presenter
         */
        Artemis.prototype.__presenter = function (presenter) {
            this.options.userType = presenter.userType;
            this.options.presenterId = presenter.presenterId;
            this.options.presenterName = presenter.presenterName;
            this.init('presenter');
        };
        /**
         * 初始化观众
         *
         * @param viewer
         */
        Artemis.prototype.__viewer = function (viewer) {
            this.options.userType = viewer.userType;
            this.options.viewerId = viewer.viewerId;
            this.options.viewerName = viewer.viewerName;
            this.init('viewer');
        };
        /**
         * 初始化 Socket
         * @param clientType 客户端类型
         */
        Artemis.prototype.init = function (clientType) {
            webRtcPeer(this, clientType);
            mixinConnectSocket(this, clientType);
        };
        /**
         * 注销
         */
        Artemis.prototype.destroy = function () {
            this.options.logger.log('注销！！！！！！！！！！！！！');
            if (this.destroyOne2many) {
                this.destroyOne2many();
            }
            if (this.dissolveRoom) {
                this.dissolveRoom();
            }
            if (this.dissolveIntercom) {
                this.dissolveIntercom();
            }
            if (this.destroySingle) {
                this.destroySingle();
            }
        };
        return Artemis;
    }());
    var artemis;
    /**
     * 创建 广播
     *
     * @param connectUrl: socket 服务地址
     * @param defaultOptions: 默认配置
     */
    function createArtemis(connectUrl, defaultOptions) {
        if (!artemis) {
            artemis = new Artemis(connectUrl, defaultOptions);
        }
        return artemis;
    }
    /**
     * 创建一个主持人
     *
     * @param connectUrl
     * @param defaultOptions
     */
    function presenterArtemis(connectUrl, defaultOptions) {
        var presenterId = defaultOptions.presenterId, presenterName = defaultOptions.presenterName, userType = defaultOptions.userType, options = __rest(defaultOptions, ["presenterId", "presenterName", "userType"]);
        if (!artemis) {
            artemis = new Artemis(connectUrl, options);
        }
        artemis.__presenter({ presenterId: presenterId, presenterName: presenterName, userType: userType });
        return artemis;
    }
    /**
     * 创建一个观众
     *
     * @param connectUrl
     * @param defaultOptions
     */
    function viewerArtemis(connectUrl, defaultOptions) {
        var viewerId = defaultOptions.viewerId, viewerName = defaultOptions.viewerName, userType = defaultOptions.userType, options = __rest(defaultOptions, ["viewerId", "viewerName", "userType"]);
        if (!artemis) {
            artemis = new Artemis(connectUrl, options);
        }
        artemis.__viewer({ viewerId: viewerId, viewerName: viewerName, userType: userType });
        return artemis;
    }

    exports["default"] = createArtemis;
    exports.presenterArtemis = presenterArtemis;
    exports.utils = utils;
    exports.viewerArtemis = viewerArtemis;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
