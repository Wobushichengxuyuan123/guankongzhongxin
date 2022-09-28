(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('screenfull'), require('artemis-icon'), require('recordrtc')) :
    typeof define === 'function' && define.amd ? define(['screenfull', 'artemis-icon', 'recordrtc'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.index = factory(global.screenfull, global.Icons, global.RecordRTC));
})(this, (function (screenfull, Icons, RecordRTC) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
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

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

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

    var EventEmitter = /** @class */ (function () {
        function EventEmitter() {
        }
        EventEmitter.prototype.on = function (name, fn, ctx) {
            if (ctx === void 0) { ctx = undefined; }
            var e = this.e || (this.e = {});
            (e[name] || (e[name] = [])).push({ fn: fn, ctx: ctx });
            return this;
        };
        EventEmitter.prototype.once = function (name, fn, ctx) {
            if (ctx === void 0) { ctx = undefined; }
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
                    if (evts[i].fn !== callback && evts[i].fn._ !== callback)
                        liveEvents.push(evts[i]);
                }
            }
            if (liveEvents.length) {
                e[name] = liveEvents;
            }
            else {
                delete e[name];
            }
            return this;
        };
        return EventEmitter;
    }());

    if (typeof process !== 'undefined') {
        process.env.NODE_ENV;
    }

    var prefix = "";
    var _addEventListener;
    // let onwheel = null;
    var support;
    // detect event model
    if (window.addEventListener) {
        _addEventListener = "addEventListener";
    }
    else {
        _addEventListener = "attachEvent";
        prefix = "on";
    }
    // detect available wheel event
    if ("onwheel" in document.createElement("div")) {
        // 各个厂商的高版本浏览器都支持"wheel"
        support = "wheel";
    }
    else {
        if (document.onmousewheel) {
            // Webkit 和 IE 一定支持"mousewheel"
            support = "mousewheel";
        }
        else {
            // 低版本 firefox
            support = "DOMMouseScroll";
        }
    }
    function addWheelListener(elem, callback, useCapture) {
        if (useCapture === void 0) { useCapture = false; }
        _addWheelListener(elem, support, callback, useCapture);
        // handle MozMousePixelScroll in older Firefox
        if (support === "DOMMouseScroll") {
            _addWheelListener(elem, "MozMousePixelScroll", callback, useCapture);
        }
    }
    function _addWheelListener(elem, eventName, callback, useCapture) {
        function wheelListener(originalEvent) {
            !originalEvent && (originalEvent = window.event);
            // create a normalized event object
            var event = {
                // keep a ref to the original event object
                originalEvent: originalEvent,
                target: originalEvent.target || originalEvent.srcElement,
                type: "wheel",
                deltaMode: originalEvent.type === "MozMousePixelScroll" ? 0 : 1,
                deltaX: 0,
                deltaZ: 0,
                deltaY: 0,
                preventDefault: function () {
                    originalEvent.preventDefault ?
                        originalEvent.preventDefault() :
                        originalEvent.returnValue = false;
                }
            };
            // calculate deltaY (and deltaX) according to the event
            if (support === "mousewheel") {
                event.deltaY = -1 / 40 * originalEvent.wheelDelta;
                // Webkit also support wheelDeltaX
                originalEvent.wheelDeltaX && (event.deltaX = -1 / 40 * originalEvent.wheelDeltaX);
            }
            else {
                event.deltaY = originalEvent.detail;
            }
            // it's time to fire the callback
            return callback(event);
        }
        elem[_addEventListener](prefix + eventName, support === "wheel" ? callback : wheelListener, useCapture || false);
    }

    /**
     * 判断环境变量
     */
    function listener(element, type, callback) {
        if (!element) {
            console.error("element (" + element + ") is not find!");
            return;
        }
        // 支持使用 addEventListener()
        if (element.addEventListener) {
            if (type.slice(0, 2) === "on") // 以 "on" 开头，不需要，则去掉
                type = type.slice(2);
            element.addEventListener(type, callback, false);
            return function () {
                element.removeEventListener(type, callback, false);
            };
        }
        // 支持使用 attachEvent()
        if (element.attachEvent) {
            if (type.slice(0, 2) !== "on") // 没有以 "on" 开头，需要，则加上
                type = "on" + type;
            element.attachEvent(type, callback);
            return function () { return element.detachEvent(type, callback); };
        }
        else {
            if (type.slice(0, 2) !== "on") {
                type = 'on' + type;
            }
            element[type] = callback;
            return function () {
                delete element[type];
            };
            // type.slice(0, 2) !== "on" ? element['on'+ type] = callback : element[type] = callback;
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
        if (stop === void 0) { stop = true; }
        if (dom) {
            if (isType(type, 'array')) {
                return type.map(function (itemType) {
                    return on(dom, itemType, cb);
                });
            }
            return listener(dom, type, function (e) {
                stop && e.stopPropagation();
                stop && e.preventDefault();
                cb && cb(e);
            });
        }
        else
            return function () { };
    }
    // 截流函数：调用后在限时内执行一次，限时内再次调用，
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
        return (typeof HTMLElement === 'function')
            ? (element instanceof HTMLElement)
            : (element && (typeof element === 'object') && (element.nodeType === 1) && (typeof element.nodeName === 'string'));
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
        }
        else {
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
                }
                else {
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
        }
        else {
            if (isDOM(children)) {
                elementNode.appendChild(children);
            }
            else if (isString(children)) {
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
        return !!(isDOM(parentNode) &&
            isDOM(childNode) &&
            parentNode.contains(childNode) &&
            childNode.parentNode === parentNode);
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
    }

    // console.log(screenfull);
    var isFull = false;
    var move = { startX: 0, startY: 0, endX: 0, endY: 0 };
    function transform3DVideo(video) {
        var $container = video.$videoWrap;
        var $video = video.$video;
        var $canvas = document.createElement('canvas');
        var ctx = $canvas.getContext("2d");
        var _a = $video.getBoundingClientRect(), top = _a.top, left = _a.left, width = _a.width, height = _a.height;
        var canvasPosition = { x: 0, y: 0, w: 1, h: 1 };
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
            var x = canvasPosition.x, y = canvasPosition.y, w = canvasPosition.w, h = canvasPosition.h;
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
                canvasPosition = { x: 0, y: 0, w: 1, h: 1 };
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
                    var x = canvasPosition.x, y = canvasPosition.y, w = canvasPosition.w, h = canvasPosition.h;
                    // 缩放比例
                    var scaleX = width / w;
                    var scaleY = height / h;
                    // 移动距离
                    var moveX = -parseInt('' + (x + (w / 2) - (width / 2))) + 'px';
                    var moveY = -parseInt('' + (y + (h / 2) - (height / 2))) + 'px';
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
                }
                else {
                    setStyle($video, { transform: "scale(1, 1) translateX(0) translateY(0)" });
                }
            }
            cancelMouseMove();
        });
        /**
         * 划出同样等于取消
         */
        $canvas.__cancelMouseup = on($canvas, 'mouseout', cancelMouseMove);
        return function () {
            setStyle($video, { transform: "scale(1, 1) translateX(0) translateY(0)" });
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
        if (dataURL === void 0) { dataURL = ''; }
        var arr = dataURL.split(",");
        var bstr = atob(arr[1]);
        var type = arr[0].replace("data:", "").replace(";base64", "");
        var n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], 'file', { type: type });
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
        if (type === void 0) { type = 'png'; }
        if (quality === void 0) { quality = 1; }
        var $container = video.$videoWrap;
        var _a = $container.getBoundingClientRect(), width = _a.width, height = _a.height;
        var $canvas = document.createElement('canvas');
        // const type = 'png'; // 'base64';
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
        video.$container;
        // console.log(video);
        addWheelListener(video.$video, function (event) {
            video.emit('wheel', event);
        });
        on(video.$video, 'dblclick', function () {
            if (isFull) {
                minimize();
            }
            else {
                maximize();
            }
        });
        on(video.$close, 'click', function () { return video.emit('close'); });
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
                }
                else {
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
            // 鼠标按下事件
            on(video.$movementTop, ['mousedown', 'touchstart'], function () {
                video.emit('movement:start', 'top');
            });
            on(video.$movementRight, ['mousedown', 'touchstart'], function () {
                video.emit('movement:start', 'right');
            });
            on(video.$movementBottom, ['mousedown', 'touchstart'], function () {
                video.emit('movement:start', 'bottom');
            });
            on(video.$movementLeft, ['mousedown', 'touchstart'], function () {
                video.emit('movement:start', 'left');
            });
            // 鼠标抬起事件
            on(video.$movementTop, ['mouseup', 'touchend'], function () {
                video.emit('movement:end', 'top');
            });
            on(video.$movementRight, ['mouseup', 'touchend'], function () {
                video.emit('movement:end', 'right');
            });
            on(video.$movementBottom, ['mouseup', 'touchend'], function () {
                video.emit('movement:end', 'bottom');
            });
            on(video.$movementLeft, ['mouseup', 'touchend'], function () {
                video.emit('movement:end', 'left');
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
                if (disabledIn)
                    return;
                if (!disabledIn && video.zoom >= 9) {
                    addClass(video.$zoomIn, 'sullivan-disabled');
                }
                if (disableOut) {
                    removeClass(video.$zoomOut, 'sullivan-disabled');
                }
                if (!disabledIn) {
                    video.zoom += 1;
                    setStyle(video.$video, { transform: "scale(" + video.zoom + ", " + video.zoom + ") " });
                    video.emit('zoom:in', video.zoom);
                }
            });
            on(video.$zoomOut, 'click', function () {
                var disabledIn = hasClass(video.$zoomIn, 'sullivan-disabled');
                var disableOut = hasClass(video.$zoomOut, 'sullivan-disabled');
                if (disableOut)
                    return;
                if (!disableOut && video.zoom <= 2) {
                    addClass(video.$zoomOut, 'sullivan-disabled');
                }
                if (disabledIn) {
                    removeClass(video.$zoomIn, 'sullivan-disabled');
                }
                if (!disableOut) {
                    video.zoom -= 1;
                    setStyle(video.$video, { transform: "scale(" + video.zoom + ", " + video.zoom + ") " });
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
                    }
                    else {
                        video.cancelTransform3DVideo();
                    }
                }
                catch (error) {
                    console.error(error);
                }
                video.emit('transform:3d', !active);
            });
        }
        /**
         * 对 3D 变换 元素大小进行处理
         */
        function resizeTransform3DVideo(max) {
            if (max) {
                addClass(video.$box, 'sullivan-fullscreen');
            }
            else {
                removeClass(video.$box, 'sullivan-fullscreen');
            }
            if (capabilities.transform && video.cancelTransform3DVideo) {
                video.cancelTransform3DVideo();
                video.cancelTransform3DVideo = transform3DVideo(video);
            }
        }
        /**
         *
         */
        function maximize() {
            addClass(video.$maximize, 'sullivan-hide');
            removeClass(video.$maximize, 'sullivan-show');
            addClass(video.$minimize, 'sullivan-show');
            removeClass(video.$minimize, 'sullivan-hide');
            isFull = true;
            try {
                screenfull__default["default"].request(video.$box).then(function () {
                    video.emit('fullscreen', true);
                }).catch(function (e) {
                    video.webFullscreen = true;
                    video.emit('fullscreen', true);
                }).finally(function () { return resizeTransform3DVideo(true); });
            }
            catch (e) {
                video.webFullscreen = true;
                video.emit('fullscreen', true);
                setTimeout(function () { return resizeTransform3DVideo(true); }, 500);
            }
        }
        /**
         * 全屏
         */
        on(video.$maximize, 'click', function () { return maximize(); });
        function minimize() {
            addClass(video.$minimize, 'sullivan-hide');
            removeClass(video.$minimize, 'sullivan-show');
            addClass(video.$maximize, 'sullivan-show');
            removeClass(video.$maximize, 'sullivan-hide');
            isFull = false;
            try {
                screenfull__default["default"].exit().then(function () {
                    video.emit('fullscreen', false);
                }).catch(function () {
                    video.webFullscreen = false;
                    video.emit('fullscreen', false);
                }).finally(function () { return resizeTransform3DVideo(); });
            }
            catch (e) {
                video.webFullscreen = false;
                video.emit('fullscreen', false);
                setTimeout(function () { return resizeTransform3DVideo(); }, 500);
            }
        }
        // 恢复
        on(video.$minimize, 'click', function () { return minimize(); });
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
        return createElement('div', { class: className }, icon);
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
        threeDimensional: createIcon(Icons__namespace.urlThreeDimensional, 'icon-three-dimensional'),
    };
    /**
     * 生成模板
     *
     * @param classname
     * @param icon
     */
    function iconWrap(classname, icon) {
        return createElement('div', { class: 'sullivan-icon-wrap ' + classname }, icon);
    }
    // console.log(icon)
    var Template = /** @class */ (function () {
        function Template(config) {
            this.config = config;
            this.children = [];
            if (config.record)
                this.createRecord();
            if (config.movement)
                this.createMovement();
            if (config.screenshot)
                this.createScreenshot();
            if (config.zoom)
                this.createZoom();
            if (config.transform)
                this.createTransform(config.transform);
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
            return createElement('div', { class: 'movement-wrap sullivan-hide' }, [
                createArrow('top', icon.arrowTop),
                createArrow('right', icon.arrowRight),
                createArrow('bottom', icon.arrowBottom),
                createArrow('left', icon.arrowLeft),
            ]);
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
    }());
    function mixinTemplate(video, option) {
        var capabilities = option.capabilities;
        var template = new Template(capabilities);
        var $close = createElement('div', { class: 'sullivan-close' }, createIcon(Icons__namespace.urlClose, 'icon-close'));
        var $videoWrap = createElement('div', { class: 'sullivan-video-wrap' }, template.createMovementControl());
        var $control = createElement('div', { class: 'sullivan-control' }, [
            createElement('div', { class: 'sullivan-control-left' }),
            createElement('div', { class: 'sullivan-control-right' }, template.children),
        ]);
        var $box = createElement('div', { class: 'sullivan-box' }, [$close, $videoWrap, $control]);
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
    var RecordRTCLoader = /** @class */ (function (_super) {
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
            }
            catch (e) {
                this.emit('recordCreateError');
            }
            if (this.recorder) {
                this.isRecording = true;
                this.video.emit('recording', true);
                this.recorder.startRecording();
                // debug.log('Recorder', 'start recording');
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
                _this._reset();
                // this.video.emit(EVENTS.recording, false);
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
    }(EventEmitter));

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

    var css_248z = ".sullivan-box {\r\n  position: relative;\r\n  display: flex;\r\n  width: 100%;\r\n  height: 100%;\r\n  flex-direction: column;\r\n}\r\n\r\n.sullivan-box .sullivan-video-wrap,\r\n.sullivan-video-wrap .sullivan-video,\r\n.sullivan-box .sullivan-control {\r\n  width: 100%;\r\n}\r\n\r\n.sullivan-box .sullivan-video-wrap {\r\n  height: 100%;\r\n  overflow: hidden;\r\n}\r\n\r\n.sullivan-box .sullivan-close {\r\n  position: absolute;\r\n  min-width: 1rem;\r\n  min-height: 1rem;\r\n  max-width: 4rem;\r\n  max-height: 4rem;\r\n  width: 2.2rem;\r\n  height: 2.2rem;\r\n  right: 1rem;\r\n  top: 1rem;\r\n  padding: 0 .35rem;\r\n  background-color: rgba(0, 0, 0, .4);\r\n  cursor: pointer;\r\n  border-radius: 2rem;\r\n  z-index: 9;\r\n  box-sizing: border-box;\r\n  transition: all ease-out .3s;\r\n}\r\n\r\n.sullivan-box .sullivan-close:hover {\r\n  background-color: rgba(255, 0, 0, .7);\r\n  transition: all ease-in .3s;\r\n}\r\n\r\n.sullivan-box .sullivan-close:hover .icon-close {\r\n  transition: all ease-in .3s;\r\n}\r\n\r\n.sullivan-box .sullivan-close .icon-close {\r\n  width: 100%;\r\n  height: 100%;\r\n  fill: #eee;\r\n}\r\n\r\n.sullivan-video-wrap .movement-wrap {\r\n  left: 0;\r\n  top: 0;\r\n  width: 100%;\r\n  height: 0;\r\n  background-color: rgba(0, 0, 0, 0.4);\r\n}\r\n\r\n.sullivan-video-wrap .movement-wrap.sullivan-hide {\r\n  display: none;\r\n}\r\n\r\n.sullivan-video-wrap .movement-wrap.sullivan-show {\r\n  display: flex;\r\n}\r\n\r\n.movement-wrap .movement-arrow {\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  padding: 10px;\r\n  position: absolute;\r\n  width: 10%;\r\n  max-width: 70px;\r\n  min-width: 30px;\r\n  background-repeat: no-repeat;\r\n  background-color: rgba(0, 0, 0, .2);\r\n  background-position: center;\r\n  border-radius: 40px;\r\n  cursor: pointer;\r\n  opacity: .6;\r\n  z-index: 99;\r\n  transition: all ease-out .3s;\r\n}\r\n\r\n.movement-wrap .movement-arrow:hover {\r\n  background-color: rgba(0, 0, 0, .3);\r\n  transition: all ease-in .3s;\r\n}\r\n\r\n.movement-wrap .movement-arrow:hover .movement-icon {\r\n  fill: #fff;\r\n}\r\n\r\n.movement-arrow .movement-icon {\r\n  width: 100%;\r\n  height: 100%;\r\n  fill: #eee;\r\n}\r\n\r\n.movement-wrap .movement-top {\r\n  top: 10%;\r\n  left: 50%;\r\n}\r\n.movement-wrap .movement-right {\r\n  top: 45%;\r\n  right: 20px;\r\n}\r\n.movement-wrap .movement-bottom {\r\n  left: 50%;\r\n  bottom: 10%;\r\n}\r\n.movement-wrap .movement-left {\r\n  top: 45%;\r\n  left: 20px;\r\n}\r\n\r\n.movement-wrap .movement-top,\r\n.movement-wrap .movement-bottom {\r\n  transform: translateX(-50%);\r\n}\r\n\r\n.movement-wrap .icon-top {\r\n  transform: translateY(-5%);\r\n}\r\n.movement-wrap .icon-right {\r\n  transform: translateX(5%);\r\n}\r\n.movement-wrap .icon-bottom {\r\n  transform: translateY(5%);\r\n}\r\n.movement-wrap .icon-left {\r\n  transform: translateX(-5%);\r\n}\r\n\r\n.sullivan-box .sullivan-video-wrap,\r\n.sullivan-video-wrap .sullivan-video {\r\n  height: 100%;\r\n}\r\n\r\n.sullivan-video-wrap .sullivan-video {\r\n  object-fit: fill;\r\n}\r\n\r\n.sullivan-control .sullivan-control-left,\r\n.sullivan-control .sullivan-control-right {\r\n  width: 100%;\r\n}\r\n\r\n.sullivan-box .sullivan-control {\r\n  display: flex;\r\n  height: 5%;\r\n  max-height: 40px;\r\n  min-height: 24px;\r\n  position: absolute;\r\n  bottom: 0;\r\n  z-index: 9;\r\n  background-image: linear-gradient(transparent, #000);\r\n}\r\n\r\n.sullivan-control .sullivan-control-left,\r\n.sullivan-control .sullivan-control-right {\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  height: 100%;\r\n}\r\n\r\n.sullivan-control .sullivan-control-right {\r\n  justify-content: flex-end;\r\n}\r\n\r\n.sullivan-control .sullivan-icon-wrap {\r\n  height: 100%;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  padding: 2px 8px;\r\n  user-select: none;\r\n}\r\n\r\n.sullivan-control .sullivan-icon-wrap.sullivan-show {\r\n  fill: #fafafa;\r\n}\r\n\r\n.sullivan-control .sullivan-icon-wrap.sullivan-hide {\r\n  display: none;\r\n}\r\n\r\n.sullivan-icon-wrap .sullivan-icon {\r\n  height: 80%;\r\n  width: auto;\r\n  fill: #fafafa;\r\n  cursor: pointer;\r\n  transition: all ease-out .3s;\r\n  user-select: none;\r\n}\r\n\r\n.sullivan-icon-wrap .sullivan-icon:hover,\r\n.sullivan-icon-wrap .sullivan-icon.icon-show:hover {\r\n  fill: #40fcff;\r\n  transition: all ease-in .2s;\r\n}\r\n\r\n.sullivan-icon-wrap.sullivan-active .sullivan-icon {\r\n  fill: #40fcff;\r\n}\r\n\r\n.sullivan-icon-wrap.sullivan-disabled .sullivan-icon {\r\n  fill: #aaa;\r\n  cursor: auto;\r\n}\r\n";
    styleInject(css_248z);

    var Video = /** @class */ (function (_super) {
        __extends(Video, _super);
        function Video(root) {
            var _this = _super.call(this) || this;
            _this.setDefineProperty = function (key, value) {
                Object.defineProperty(_this, key, {
                    value: value,
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
                var _a = _this.options.capabilities, zoom = _a.zoom, movement = _a.movement, transform = _a.transform, screenshot = _a.screenshot, record = _a.record;
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
                }
                else if (width < 240) {
                    options.width = options.height = '1.2rem';
                    options.top = options.right = '.6rem';
                    options.padding = '0 .2rem';
                }
                else if (width < 500) {
                    options.width = options.height = '1.6rem';
                    options.top = options.right = '.8rem';
                    options.padding = '0 .3rem';
                }
                else {
                    options.width = options.height = '2.2rem';
                    options.top = options.right = '1rem';
                    options.padding = '0 .35rem';
                }
                if (Object.keys(options).length) {
                    setStyle(_this.$close, options);
                }
                _this.$iconWrap.forEach(function ($wrap) {
                    setStyle($wrap, { padding: wrapPadding });
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
                _this.off();
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
            var videoAttribute = { autoPlay: true, muted: false, poster: "/background.png", class: 'sullivan-video' };
            var $video = createElement('video', videoAttribute);
            this.$video = $video;
            return $video;
        };
        Video.prototype.addEventListen = function () {
            var _this = this;
            this.on('close', function () {
                var __cache = _this.root.__cache;
                _this.root.emit('close', __cache);
                _this.root.destroy();
            });
            this.on('wheel', function (event) {
                var __cache = _this.root.__cache;
                _this.root.emit('wheel', Object.assign(event, __cache));
            });
            this.on('record', function (bool) {
                if (bool) {
                    _this.recorder.startRecord();
                }
                else {
                    _this.recorder.stopRecordAndSave();
                }
                _this.root.emit('record', bool);
            });
            this.on('zpt:ctrl', function (arg) {
                _this.root.emit('zptCtrl', arg);
            });
            this.on('screenshot', function (enable) {
                var __cache = _this.root.__cache;
                _this.root.emit('screenshot', __assign({ enable: enable }, __cache));
            });
            this.on('zoom:in', function (zoom) {
                var __cache = _this.root.__cache;
                _this.root.emit('zoom', __assign({ zoom: zoom }, __cache));
            });
            this.on('zoom:out', function (enable) {
                var __cache = _this.root.__cache;
                _this.root.emit('zoom', __assign({ enable: enable }, __cache));
            });
            this.on('transform:3d', function (enable) {
                var __cache = _this.root.__cache;
                _this.root.emit('transform', __assign({ enable: enable }, __cache));
            });
            this.on('movement:move', function (direction) {
                var __cache = _this.root.__cache;
                _this.root.emit('movement', __assign({ direction: direction }, __cache));
            });
            this.on('movement:start', function (direction) {
                var __cache = _this.root.__cache;
                _this.root.emit('movement:start', __assign({ direction: direction }, __cache));
            });
            this.on('movement:end', function (direction) {
                var __cache = _this.root.__cache;
                _this.root.emit('movement:end', __assign({ direction: direction }, __cache));
            });
            listener(window, 'resize', throttle(this.resize, 200));
        };
        Video.prototype.toggleDisplay = function ($dom, condition) {
            if ($dom) {
                setStyle($dom, { display: condition ? 'none' : 'block' });
            }
        };
        return Video;
    }(EventEmitter));

    var MP4 = /** @class */ (function () {
        function MP4() {
        }
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
                    MP4.types[name] = [
                        name.charCodeAt(0),
                        name.charCodeAt(1),
                        name.charCodeAt(2),
                        name.charCodeAt(3)
                    ];
                }
            }
            var constants = MP4.constants = {};
            // 文件类型。描述遵从的规范的版本。
            constants.FTYP = new Uint8Array([
                0x69, 0x73, 0x6F, 0x6D,
                0x0, 0x0, 0x0, 0x1,
                0x69, 0x73, 0x6F, 0x6D,
                0x61, 0x76, 0x63, 0x31 // avc1
            ]);
            constants.STSD_PREFIX = new Uint8Array([
                0x00, 0x00, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x01 // entry_count
            ]);
            constants.STTS = new Uint8Array([
                0x00, 0x00, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x00 // entry_count
            ]);
            constants.STSC = constants.STCO = constants.STTS;
            constants.STSZ = new Uint8Array([
                0x00, 0x00, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x00 // sample_count
            ]);
            constants.HDLR_VIDEO = new Uint8Array([
                0x00, 0x00, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x00,
                0x76, 0x69, 0x64, 0x65,
                0x00, 0x00, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x00,
                0x56, 0x69, 0x64, 0x65,
                0x6F, 0x48, 0x61, 0x6E,
                0x64, 0x6C, 0x65, 0x72, 0x00 // name: VideoHandler
            ]);
            constants.HDLR_AUDIO = new Uint8Array([
                0x00, 0x00, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x00,
                0x73, 0x6F, 0x75, 0x6E,
                0x00, 0x00, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x00,
                0x53, 0x6F, 0x75, 0x6E,
                0x64, 0x48, 0x61, 0x6E,
                0x64, 0x6C, 0x65, 0x72, 0x00 // name: SoundHandler
            ]);
            constants.DREF = new Uint8Array([
                0x00, 0x00, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x01,
                0x00, 0x00, 0x00, 0x0C,
                0x75, 0x72, 0x6C, 0x20,
                0x00, 0x00, 0x00, 0x01 // version(0) + flags
            ]);
            // Sound media header
            constants.SMHD = new Uint8Array([
                0x00, 0x00, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x00 // balance(2) + reserved(2)
            ]);
            // video media header
            constants.VMHD = new Uint8Array([
                0x00, 0x00, 0x00, 0x01,
                0x00, 0x00,
                0x00, 0x00, 0x00, 0x00,
                0x00, 0x00
            ]);
        };
        // Generate a box
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
            result[0] = (size >>> 24) & 0xFF; // size
            result[1] = (size >>> 16) & 0xFF;
            result[2] = (size >>> 8) & 0xFF;
            result[3] = (size) & 0xFF;
            result.set(type, 4); // type
            var offset = 8;
            for (var i = 0; i < arrayCount; i++) { // data body
                result.set(datas[i], offset);
                offset += datas[i].byteLength;
            }
            return result;
        };
        // 生成单元段
        // emit ftyp & moov
        MP4.generateInitSegment = function (meta) {
            // ftyp：文件类型。描述遵从的规范的版本。
            var ftyp = MP4.box(MP4.types.ftyp, MP4.constants.FTYP);
            // moov box：媒体的metadata信息。
            // “moov”是一个container box，具体内容信息在其子box中。一般情况下，“moov”会紧随着“ftyp”。
            // “moov”中包含1个“mvhd”和若干个“trak”。
            // 其中“mvhd”是header box，一般作为“moov”的第一个子box出现。
            // “trak”包含了一个track的相关信息，是一个container box。
            var moov = MP4.moov(meta);
            var result = new Uint8Array(ftyp.byteLength + moov.byteLength);
            result.set(ftyp, 0);
            result.set(moov, ftyp.byteLength);
            return result;
        };
        // Movie metadata box
        MP4.moov = function (meta) {
            var mvhd = MP4.mvhd(meta.timescale, meta.duration);
            var trak = MP4.trak(meta);
            var mvex = MP4.mvex(meta);
            return MP4.box(MP4.types.moov, mvhd, trak, mvex);
        };
        // Movie header box
        MP4.mvhd = function (timescale, duration) {
            return MP4.box(MP4.types.mvhd, new Uint8Array([
                0x00, 0x00, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x00,
                (timescale >>> 24) & 0xFF,
                (timescale >>> 16) & 0xFF,
                (timescale >>> 8) & 0xFF,
                (timescale) & 0xFF,
                (duration >>> 24) & 0xFF,
                (duration >>> 16) & 0xFF,
                (duration >>> 8) & 0xFF,
                (duration) & 0xFF,
                0x00, 0x01, 0x00, 0x00,
                0x01, 0x00, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x00,
                0x00, 0x01, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x00,
                0x00, 0x01, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x00,
                0x40, 0x00, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x00,
                0xFF, 0xFF, 0xFF, 0xFF // next_track_ID
            ]));
        };
        // Track box
        MP4.trak = function (meta) {
            return MP4.box(MP4.types.trak, MP4.tkhd(meta), MP4.mdia(meta));
        };
        // Track header box
        MP4.tkhd = function (meta) {
            var trackId = meta.id, duration = meta.duration;
            var width = meta.presentWidth, height = meta.presentHeight;
            return MP4.box(MP4.types.tkhd, new Uint8Array([
                0x00, 0x00, 0x00, 0x07,
                0x00, 0x00, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x00,
                (trackId >>> 24) & 0xFF,
                (trackId >>> 16) & 0xFF,
                (trackId >>> 8) & 0xFF,
                (trackId) & 0xFF,
                0x00, 0x00, 0x00, 0x00,
                (duration >>> 24) & 0xFF,
                (duration >>> 16) & 0xFF,
                (duration >>> 8) & 0xFF,
                (duration) & 0xFF,
                0x00, 0x00, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x00,
                0x00, 0x01, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x00,
                0x00, 0x01, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x00,
                0x40, 0x00, 0x00, 0x00,
                (width >>> 8) & 0xFF,
                (width) & 0xFF,
                0x00, 0x00,
                (height >>> 8) & 0xFF,
                (height) & 0xFF,
                0x00, 0x00
            ]));
        };
        MP4.mdia = function (meta) {
            return MP4.box(MP4.types.mdia, MP4.mdhd(meta), MP4.hdlr(meta), MP4.minf(meta));
        };
        // Media header box
        MP4.mdhd = function (meta) {
            var timescale = meta.timescale;
            var duration = meta.duration;
            return MP4.box(MP4.types.mdhd, new Uint8Array([
                0x00, 0x00, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x00,
                (timescale >>> 24) & 0xFF,
                (timescale >>> 16) & 0xFF,
                (timescale >>> 8) & 0xFF,
                (timescale) & 0xFF,
                (duration >>> 24) & 0xFF,
                (duration >>> 16) & 0xFF,
                (duration >>> 8) & 0xFF,
                (duration) & 0xFF,
                0x55, 0xC4,
                0x00, 0x00 // pre_defined = 0
            ]));
        };
        // Media handler reference box
        MP4.hdlr = function (meta) {
            var data = null;
            if (meta.type === 'audio') {
                data = MP4.constants.HDLR_AUDIO;
            }
            else {
                data = MP4.constants.HDLR_VIDEO;
            }
            return MP4.box(MP4.types.hdlr, data);
        };
        // Media infomation box
        MP4.minf = function (meta) {
            var xmhd = null;
            if (meta.type === 'audio') {
                xmhd = MP4.box(MP4.types.smhd, MP4.constants.SMHD);
            }
            else {
                xmhd = MP4.box(MP4.types.vmhd, MP4.constants.VMHD);
            }
            return MP4.box(MP4.types.minf, xmhd, MP4.dinf(), MP4.stbl(meta));
        };
        // Data infomation box
        MP4.dinf = function () {
            var result = MP4.box(MP4.types.dinf, MP4.box(MP4.types.dref, MP4.constants.DREF));
            return result;
        };
        // “stbl”是mp4文件中最复杂的一个box了，也是解开mp4文件格式的主干。
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
            return meta.type === "audio" ?
                MP4.box(MP4.types.stsd, MP4.constants.STSD_PREFIX, MP4.mp4a(meta)) :
                meta.videoType === 'avc' ?
                    MP4.box(MP4.types.stsd, MP4.constants.STSD_PREFIX, MP4.avc1(meta)) :
                    MP4.box(MP4.types.stsd, MP4.constants.STSD_PREFIX, MP4.hvc1(meta));
        };
        // stsd：sample description box，样本的描述信息。
        // Sample description box
        MP4.stsd = function (meta) {
            if (meta.type === 'audio') {
                // else: aac -> mp4a
                return MP4.box(MP4.types.stsd, MP4.constants.STSD_PREFIX, MP4.mp4a(meta));
            }
            else {
                if (meta.videoType === 'avc') {
                    //
                    return MP4.box(MP4.types.stsd, MP4.constants.STSD_PREFIX, MP4.avc1(meta));
                }
                else {
                    //
                    return MP4.box(MP4.types.stsd, MP4.constants.STSD_PREFIX, MP4.hvc1(meta));
                }
            }
        };
        MP4.mp4a = function (meta) {
            var channelCount = meta.channelCount;
            var sampleRate = meta.audioSampleRate;
            var data = new Uint8Array([
                0x00, 0x00, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x01,
                0x00, 0x00, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x00,
                0x00, channelCount,
                0x00, 0x10,
                0x00, 0x00, 0x00, 0x00,
                (sampleRate >>> 8) & 0xFF,
                (sampleRate) & 0xFF,
                0x00, 0x00
            ]);
            return MP4.box(MP4.types.mp4a, data, MP4.esds(meta));
        };
        MP4.esds = function (meta) {
            var config = meta.config || [];
            var configSize = config.length;
            var data = new Uint8Array([
                0x00, 0x00, 0x00, 0x00,
                0x03,
                0x17 + configSize,
                0x00, 0x01,
                0x00,
                0x04,
                0x0F + configSize,
                0x40,
                0x15,
                0x00, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x00,
                0x05 // descriptor_type
            ].concat([
                configSize
            ]).concat(config).concat([
                0x06, 0x01, 0x02 // GASpecificConfig
            ]));
            return MP4.box(MP4.types.esds, data);
        };
        MP4.avc1 = function (meta) {
            var avcc = meta.avcc;
            var width = meta.codecWidth;
            var height = meta.codecHeight;
            var data = new Uint8Array([
                0, 0, 0, 0,
                0, 0, 0, 1,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
                width >>> 8 & 255,
                width & 255,
                height >>> 8 & 255,
                height & 255,
                0, 72, 0, 0,
                0, 72, 0, 0,
                0, 0, 0, 0,
                0, 1,
                0,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0,
                0, 24,
                255, 255
            ]);
            return MP4.box(MP4.types.avc1, data, MP4.box(MP4.types.avcC, avcc));
        };
        MP4.hvc1 = function (meta) {
            var avcc = meta.avcc;
            var width = meta.codecWidth;
            var height = meta.codecHeight;
            var data = new Uint8Array([
                0, 0, 0, 0,
                0, 0, 0, 1,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
                width >>> 8 & 255,
                width & 255,
                height >>> 8 & 255,
                height & 255,
                0, 72, 0, 0,
                0, 72, 0, 0,
                0, 0, 0, 0,
                0, 1,
                0,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0,
                0, 24,
                255, 255
            ]);
            return MP4.box(MP4.types.hvc1, data, MP4.box(MP4.types.hvcC, avcc));
        };
        // Movie Extends box
        MP4.mvex = function (meta) {
            return MP4.box(MP4.types.mvex, MP4.trex(meta));
        };
        // Track Extends box
        MP4.trex = function (meta) {
            var trackId = meta.id;
            var data = new Uint8Array([
                0x00, 0x00, 0x00, 0x00,
                (trackId >>> 24) & 0xFF,
                (trackId >>> 16) & 0xFF,
                (trackId >>> 8) & 0xFF,
                (trackId) & 0xFF,
                0x00, 0x00, 0x00, 0x01,
                0x00, 0x00, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x00,
                0x00, 0x01, 0x00, 0x01 // default_sample_flags
            ]);
            return MP4.box(MP4.types.trex, data);
        };
        // Movie fragment box
        MP4.moof = function (track, baseMediaDecodeTime) {
            return MP4.box(MP4.types.moof, MP4.mfhd(track.sequenceNumber), MP4.traf(track, baseMediaDecodeTime));
        };
        MP4.mfhd = function (sequenceNumber) {
            var data = new Uint8Array([
                0x00, 0x00, 0x00, 0x00,
                (sequenceNumber >>> 24) & 0xFF,
                (sequenceNumber >>> 16) & 0xFF,
                (sequenceNumber >>> 8) & 0xFF,
                (sequenceNumber) & 0xFF
            ]);
            return MP4.box(MP4.types.mfhd, data);
        };
        // Track fragment box
        MP4.traf = function (track, baseMediaDecodeTime) {
            var trackId = track.id;
            // Track fragment header box
            var tfhd = MP4.box(MP4.types.tfhd, new Uint8Array([
                0x00, 0x00, 0x00, 0x00,
                (trackId >>> 24) & 0xFF,
                (trackId >>> 16) & 0xFF,
                (trackId >>> 8) & 0xFF,
                (trackId) & 0xFF
            ]));
            // Track Fragment Decode Time
            var tfdt = MP4.box(MP4.types.tfdt, new Uint8Array([
                0x00, 0x00, 0x00, 0x00,
                (baseMediaDecodeTime >>> 24) & 0xFF,
                (baseMediaDecodeTime >>> 16) & 0xFF,
                (baseMediaDecodeTime >>> 8) & 0xFF,
                (baseMediaDecodeTime) & 0xFF
            ]));
            var sdtp = MP4.sdtp(track);
            var trun = MP4.trun(track, sdtp.byteLength + 16 + 16 + 8 + 16 + 8 + 8);
            return MP4.box(MP4.types.traf, tfhd, tfdt, trun, sdtp);
        };
        // Sample Dependency Type box
        MP4.sdtpOld = function (A) {
            var e = new Uint8Array(4 + 1), t = A.flags;
            return e[4] = t.isLeading << 6 | t.dependsOn << 4 | t.isDependedOn << 2 | t.hasRedundancy, MP4.box(MP4.types.sdtp, e);
        };
        MP4.sdtp = function (track) {
            var data = new Uint8Array(4 + 1);
            var flags = track.flags;
            data[4] = flags.isLeading << 6
                | flags.dependsOn << 4
                | flags.isDependedOn << 2
                | flags.hasRedundancy;
            return MP4.box(MP4.types.sdtp, data);
        };
        MP4.trun = function (track, offset) {
            var dataSize = 12 + 16;
            var data = new Uint8Array(dataSize);
            offset += 8 + dataSize;
            data.set([
                0x00, 0x00, 0x0F, 0x01,
                0x00, 0x00, 0x00, 0x01,
                (offset >>> 24) & 0xFF,
                (offset >>> 16) & 0xFF,
                (offset >>> 8) & 0xFF,
                (offset) & 0xFF
            ], 0);
            var duration = track.duration;
            var size = track.size;
            var flags = track.flags;
            var cts = track.cts;
            data.set([
                (duration >>> 24) & 0xFF,
                (duration >>> 16) & 0xFF,
                (duration >>> 8) & 0xFF,
                (duration) & 0xFF,
                (size >>> 24) & 0xFF,
                (size >>> 16) & 0xFF,
                (size >>> 8) & 0xFF,
                (size) & 0xFF,
                (flags.isLeading << 2) | flags.dependsOn,
                (flags.isDependedOn << 6) | (flags.hasRedundancy << 4) | flags.isNonSync,
                0x00, 0x00,
                (cts >>> 24) & 0xFF,
                (cts >>> 16) & 0xFF,
                (cts >>> 8) & 0xFF,
                (cts) & 0xFF
            ], 12);
            return MP4.box(MP4.types.trun, data);
        };
        // mdat：具体的媒体数据。
        MP4.mdat = function (data) {
            return MP4.box(MP4.types.mdat, data);
        };
        return MP4;
    }());
    MP4.init();

    var mediaUtils = {
        getVideoCodec: function (payload) {
            return (payload[0] & 0x0F);
        },
        getDecodeConfiguration: function (payload, videoCodec) {
            var data = payload.slice(5);
            var config = {};
            // 为了获取 config.videoType = "avc"
            if (videoCodec === 7) { // h264
                console.log('这个是： h264');
                // config = parseAVCDecoderConfigurationRecord(data)
                config.videoType = "avc";
            }
            if (videoCodec === 12) { // h265
                console.log('这个是： h265');
                config.videoType = "hevc";
                // config = parseHEVCDecoderConfigurationRecord(data);
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
                }
                catch (e) {
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
            }
            else {
                /**
                 * 延迟 = (本地当前时间 - 本地最初时间) - (视频当前时间戳 - 视频最初时间戳)
                 */
                if (timestamp) {
                    self.delay = (Date.now() - self.startTimestamp) - (timestamp - self.firstTimestamp);
                }
            }
            return self.delay;
        }
    };

    var Decoder = /** @class */ (function (_super) {
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
                var data;
                // console.log(this.buffers.length, this.delay);
                if (_this.buffers.length) {
                    if (_this.dropping) {
                        _this.droppingBuffer();
                    }
                    else {
                        data = _this.buffers[0];
                        if (mediaUtils.getDelay(_this, data.ts) === -1) {
                            // this.player.debug.log('common dumex', `delay is -1`);
                            _this.decodeBuffer();
                        }
                        else if (_this.delay > _this.videoBuffer + 1000) {
                            // 延迟大于1秒的时候，重置时间戳，并且跳帧
                            // this.player.debug.log('common dumex', `delay is ${this.delay}, set dropping is true`);
                            _this.resetDelay();
                            _this.dropping = true;
                        }
                        else {
                            while (_this.buffers.length) {
                                data = _this.buffers[0];
                                if (mediaUtils.getDelay(_this, data.ts) > _this.videoBuffer) {
                                    // drop frame
                                    _this.decodeBuffer();
                                }
                                else {
                                    if (_this.buffers.length > 10) {
                                        _this.decodeBuffer();
                                    }
                                    // this.player.debug.log('common dumex', `delay is ${this.delay}`);
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
            _this.mediaSource = new MediaSource();
            // 延迟 200 毫秒后播放
            _this.videoBuffer = 200;
            // 延迟
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
                    }
                    catch (error) {
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
            }
            else {
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
                    _this.disposeLoopBuffer();
                    // return;
                }
                _this.mediaTimestamp = now;
                _this.insideAppendBufferTimer = window.requestAnimationFrame(appendBuffer);
            };
            this.__sourceBufferUpdateEnd = listener(this.sourceBuffer, 'updateend', function () {
                var length = _this.buffers.length;
                // console.log('sourceBuffer:updateend', this.buffers);
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
                _this.emit('buffer:update:start');
                // console.log('sourceBuffer:updatestart');
            });
        };
        Decoder.prototype.droppingBuffer = function () {
            if (this.dropping) {
                // this.player.debug.log('common dumex', `is dropping`);
                var data = this.buffers.shift();
                while (!data.isIFrame && this.buffers.length) {
                    data = this.buffers.shift();
                    // type === 1 audio
                    // video 则全部跳过
                    if (data.type === 1 && data.payload[1] === 0) {
                        this.decodeVideo(data.payload, data.ts, data.isIFrame);
                    }
                }
                // 如果是关键帧，则播放。
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
            var videoCodec = mediaUtils.getVideoCodec(payload);
            // ftyp
            var metaBox = MP4.generateInitSegment(mediaUtils.getDecodeConfiguration(payload, videoCodec));
            if (metaBox.buffer) {
                setTimeout(function () { return _this.appendBuffer(metaBox.buffer); }, 100);
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
            if (!$video)
                return;
            // 首个缓冲范围的下标是 0。
            // 用来移除已经缓冲的内容。
            if ($video.buffered.length > 1) {
                var start = $video.buffered.start(0);
                var end = $video.buffered.end(0);
                mediaUtils.removeBuffer(this.sourceBuffer, start, end);
                // this.timeInit = false;
            }
            // 如果当前帧 比缓冲区的帧 时间戳 大于 1秒，则跳帧。
            if ($video.drop && dts - ((_a = this.cacheTrack) === null || _a === void 0 ? void 0 : _a.dts) > 1000) {
                $video.drop = false;
                this.cacheTrack = {};
            }
            else if (this.cacheTrack && dts > this.cacheTrack.dts) {
                // 需要额外加8个size
                var mdatBytes = 8 + this.cacheTrack.size;
                var mdatbox = new Uint8Array(mdatBytes);
                mdatbox[0] = mdatBytes >>> 24 & 255;
                mdatbox[1] = mdatBytes >>> 16 & 255;
                mdatbox[2] = mdatBytes >>> 8 & 255;
                mdatbox[3] = mdatBytes & 255;
                mdatbox.set(MP4.types.mdat, 4);
                mdatbox.set(this.cacheTrack.data, 8);
                this.cacheTrack.duration = dts - this.cacheTrack.dts;
                // moof
                var moofbox = MP4.moof(this.cacheTrack, this.cacheTrack.dts);
                var result = new Uint8Array(moofbox.byteLength + mdatbox.byteLength);
                result.set(moofbox, 0);
                result.set(mdatbox, moofbox.byteLength);
                // appendBuffer
                if (result.buffer) {
                    this.appendBuffer(result.buffer);
                    // console.log('appendBuffer:decodeVideo');
                }
            }
            else {
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
            this.cacheTrack.data = arrayBuffer;
            //
            this.cacheTrack.flags = {
                isLeading: 0,
                dependsOn: isIframe ? 2 : 1,
                isDependedOn: isIframe ? 1 : 0,
                hasRedundancy: 0,
                isNonSync: isIframe ? 0 : 1
            };
            //
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
            }
            else {
                /**
                 * 延迟 = (本地当前时间 - 本地最初时间) - (视频当前时间戳 - 视频最初时间戳)
                 */
                if (timestamp) {
                    this.delay = (Date.now() - this.startTimestamp) - (timestamp - this.firstTimestamp);
                }
            }
            return this.delay;
        };
        Decoder.prototype.appendBuffer = function (buffer) {
            var readyState = this.mediaSource.readyState;
            if (!this.sourceBuffer) {
                this.emit('error:buffer:undefined', { code: 5555, message: 'sourceBuffer 不存在！' });
                return;
            }
            // console.log(this.mediaSource.readyState);
            if (readyState === 'closed') {
                this.emit('error', { code: 5555, message: 'mediaSource is not attached to video or mediaSource is closed' });
            }
            else if (readyState === 'end') {
                this.emit('error', { code: 5555, message: 'mediaSource is closed' });
            }
            else if (this.sourceBuffer.updating === true) {
                // 上一块数据还在添加中
                mediaUtils.dropSourceBuffer(this.$video);
            }
            else {
                if (this.sourceBuffer.updating === false && this.mediaSource.readyState === 'open') {
                    try {
                        this.sourceBuffer.appendBuffer(buffer);
                    }
                    catch (error) {
                        // console.error('error: => ', error);
                        this.emit('error:buffer', { code: 5555, message: error });
                    }
                    return;
                }
            }
        };
        return Decoder;
    }(EventEmitter));

    var Stream = /** @class */ (function (_super) {
        __extends(Stream, _super);
        function Stream( /*{ origin }*/) {
            var _this = _super.call(this) || this;
            _this.onPageVisibilityChange = function () {
                console.log("========= |||   " + document.visibilityState + "   |||============");
                try {
                    if (document.visibilityState === 'visible') {
                        _this.restartStream();
                    }
                    else {
                        _this.destroyStream();
                    }
                }
                catch (error) {
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
                    playPromise
                        .catch(function (error) { return console.log(error); })
                        .finally(function () { return $video.play(); });
                }
            };
            _this.onMediaSourceOpen = function () {
                try {
                    _this.socket = new WebSocket(_this.url);
                    _this.socket.binaryType = 'arraybuffer';
                    _this.bindSocketListener();
                }
                catch (error) {
                    _this.onSocketError(error);
                }
                finally { }
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
                setTimeout(function () { return _this.play(_this.url, _this.$video); }, 1000 * delay);
            };
            _this.onSourceBufferError = function (error) {
                if (_this.restart) {
                    _this.destroyStream();
                    setTimeout(_this.restartStream, 1000);
                    // console.log('error:buffer:restart', error);
                }
                else {
                    _this.destroy();
                    _this.$video.parentNode.removeChild(_this.$video);
                    console.log('error:buffer:destroy', error);
                }
            };
            _this.onSocketOpen = function () {
                // setTimeout(() => this.disposeLoopBuffer(), 20);
                console.log('socket opened!');
            };
            _this.onSocketMessage = function (message) { return __awaiter(_this, void 0, void 0, function () {
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
                            }
                            else {
                                this.decoder.decodeConfigurationRecord(payload);
                            }
                        }
                    }
                    return [2 /*return*/];
                });
            }); };
            // this.origin = origin;
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
    }(EventEmitter));

    function assembleUrl$1(url, origin) {
        if (url.startsWith('ws:')) {
            return url;
        }
        else {
            if (origin) {
                if (origin.startsWith('ws:')) {
                    return "ws://" + origin + "/jessica/" + url;
                }
                else {
                    return "ws://" + origin + "/jessica/" + url;
                }
            }
            if (!origin) {
                console.error('options.origin is not find!');
            }
        }
    }
    var Fmp4Player = /** @class */ (function (_super) {
        __extends(Fmp4Player, _super);
        function Fmp4Player(sullivan) {
            var _this = _super.call(this) || this;
            _this.play = function (url) {
                var options = _this.sullivan.options;
                var $video = _this.__$oldVideo = _this.$video;
                _this.url = assembleUrl$1(url, options.origin);
                _this.video.appendMediaElement($video);
                _this.player.set($video, new Stream( /*options*/));
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
                _this.player.set(_this.$video, new Stream( /*options*/));
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
    }(EventEmitter));

    function webRTCErrorHandle(peerConnection, callbacks, noop) {
        if (callbacks === void 0) { callbacks = {}; }
        if (noop === void 0) { noop = function () { }; }
        var _a = callbacks.iceCandidateError, iceCandidateError = _a === void 0 ? noop : _a, _b = callbacks.connectionStateFailed, connectionStateFailed = _b === void 0 ? noop : _b, _c = callbacks.iceConnectionStateFailed, iceConnectionStateFailed = _c === void 0 ? noop : _c, _d = callbacks.framesDroppedFailed, framesDroppedFailed = _d === void 0 ? noop : _d;
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
                    return [2 /*return*/];
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
                    return [2 /*return*/];
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
                    return [2 /*return*/];
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
                    return [2 /*return*/];
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
                    return [2 /*return*/];
                });
            });
        }
        peerConnection.addEventListener('signalingstatechange', signalingstatechange);
        // 获取数据统计
        var restartLength = 0;
        function getStats() {
            return __awaiter(this, void 0, void 0, function () {
                var rtpVideoReceiver, rtpVideoSender, receiveVideoStats, sendVideoStats;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            clearInterval(timer);
                            peerConnection.getStats(null).then(function (statsReport) {
                                statsReport.forEach(function (report) {
                                    // console.log('statsReport: => ', report)
                                });
                            });
                            rtpVideoReceiver = peerConnection.getReceivers().find(function (receive) { return receive.track && receive.track.kind === 'video'; });
                            rtpVideoSender = peerConnection.getSenders().find(function (receive) { return receive.track && receive.track.kind === 'video'; });
                            if (!rtpVideoReceiver) return [3 /*break*/, 2];
                            return [4 /*yield*/, rtpVideoReceiver.getStats()];
                        case 1:
                            receiveVideoStats = _a.sent();
                            receiveVideoStats.forEach(function (report) {
                                // console.log('receiveVideoStats: => ', report)
                                if (report.type === 'track') ;
                                if (report.type === 'inbound-rtp') {
                                    report.framesDecoded; report.framesDropped; var framesPerSecond = report.framesPerSecond; report.framesReceived;
                                    if (!framesPerSecond) {
                                        if (restartLength > 6) {
                                            framesDroppedFailed();
                                        }
                                        restartLength++;
                                    }
                                    // console.log('inbound-rtp: => ', { framesDecoded, framesDropped, framesPerSecond, framesReceived })
                                }
                            });
                            _a.label = 2;
                        case 2:
                            if (!rtpVideoSender) return [3 /*break*/, 4];
                            return [4 /*yield*/, rtpVideoSender.getStats()];
                        case 3:
                            sendVideoStats = _a.sent();
                            sendVideoStats.forEach(function (report) {
                                // console.log('sendVideoStats: => ', report)
                            });
                            _a.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
        // setInterval(getStats, 6000)
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
        var _a;
        this.pc = new RTCPeerConnection(option);
        this.time = {
            // 开始时间
            __start: Date.now(),
            // 持续时间
            __duration: null,
            // 1小时
            __interval: 1000 * 60 * 60,
            // 上次清理的时间
            __prevClear: null,
        };
        (_a = this.pc) === null || _a === void 0 ? void 0 : _a.addTransceiver('video', {
            direction: 'recvonly'
        });
    }
    WebRtcPeerRecvOnly.prototype.generateOffer = function generateOffer(option, callback) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var _d, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        if (!this.pc)
                            return [2 /*return*/];
                        if (typeof option === 'function') {
                            callback = option;
                            option = undefined;
                        }
                        if (!((_a = this.pc) === null || _a === void 0)) return [3 /*break*/, 1];
                        _d = void 0;
                        return [3 /*break*/, 3];
                    case 1:
                        _f = (_e = _a).setLocalDescription;
                        return [4 /*yield*/, this.pc.createOffer(option)];
                    case 2:
                        _d = _f.apply(_e, [_g.sent()]);
                        _g.label = 3;
                    case 3: return [4 /*yield*/, (_d)];
                    case 4:
                        _g.sent();
                        if (callback) {
                            callback((_b = this.pc) === null || _b === void 0 ? void 0 : _b.localDescription);
                        }
                        return [2 /*return*/, (_c = this.pc) === null || _c === void 0 ? void 0 : _c.localDescription];
                }
            });
        });
    };
    WebRtcPeerRecvOnly.prototype.processAnswer = function processAnswer(sdp, callback) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.pc)
                            return [2 /*return*/];
                        if (typeof sdp === 'string') {
                            sdp = { sdp: sdp };
                        }
                        if (!sdp.sdp) {
                            throw new Error('sdp 不能为空！');
                        }
                        return [4 /*yield*/, ((_a = this.pc) === null || _a === void 0 ? void 0 : _a.setRemoteDescription(new RTCSessionDescription(sdp)))];
                    case 1:
                        _b.sent();
                        if (callback) {
                            callback(true);
                        }
                        return [2 /*return*/, true];
                }
            });
        });
    };
    WebRtcPeerRecvOnly.prototype.destroy = function () {
        var _a, _b;
        if (!this.pc)
            return;
        (_a = this.pc) === null || _a === void 0 ? void 0 : _a.setLocalDescription(new RTCSessionDescription({
            type: 'answer',
            sdp: 'v=0\r\no=- 5707285685601897608 1648465828 IN IP4 0.0.0.0\r\ns=-\r\nt=0 0\r\na=end-of-candidates\r\n'
        }));
        (_b = this.pc) === null || _b === void 0 ? void 0 : _b.setRemoteDescription(new RTCSessionDescription({
            type: 'answer',
            sdp: 'v=0\r\no=- 5707285685601897608 1648465828 IN IP4 0.0.0.0\r\ns=-\r\nt=0 0\r\na=end-of-candidates\r\n'
        }));
        // this.pc.restartIce();
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
        }
        catch (error) {
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
                return [2 /*return*/, fetch(url, {
                        method: "POST",
                        body: JSON.stringify(sdp),
                        headers: { 'Content-Type': 'application/json;charset=UTF-8' }
                    }).then(function (res) { return res.json(); })];
            });
        });
    }
    var map = new WeakMap();
    function createWebRTC(sullivan) {
        var $videoWrap = sullivan.video.$videoWrap;
        var __TimerWebRTC = null;
        var __deleteWebRTCTimer = null;
        var __url = null;
        // 先将dom节点备份，所有实例都关联在 video dom 上
        sullivan.video.__$oldVideo = sullivan.video.$video;
        // 当dom 被卸载，则实例销毁。
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
                },
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
                            _b.trys.push([1, 4, , 5]);
                            map.get(sullivan.video.$video).pc.ontrack = function (event) { return ontrack(event, sullivan.video.$video); };
                            return [4 /*yield*/, fetchRemoteSDP(map.get(sullivan.video.$video))];
                        case 2:
                            _b.sent();
                            _a = setTimeout;
                            return [4 /*yield*/, resetWebRTC];
                        case 3:
                            __TimerWebRTC = _a.apply(void 0, [_b.sent(), sullivan.options.timeRefresh]);
                            return [3 /*break*/, 5];
                        case 4:
                            e_1 = _b.sent();
                            console.log(e_1);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        }
        var deleteOldWebRTCPlayer = function () {
            var _a = sullivan.video, __$oldVideo = _a.__$oldVideo, $video = _a.$video;
            clearTimeout(__deleteWebRTCTimer);
            if (__$oldVideo) {
                __$oldVideo.withError();
                if (map.has(__$oldVideo)) {
                    __$oldVideo.srcObject.getTracks().forEach(function (track) { return track.stop(); });
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
                            _b.trys.push([1, 3, , 4]);
                            clearTimeout(__TimerWebRTC);
                            if (map.has($video)) {
                                map.set(__$oldVideo, map.get($video));
                            }
                            // 创建新 video
                            $video = sullivan.video.createVideo();
                            map.set(sullivan.video.$video, new WebRtcPeerRecvOnly());
                            sullivan.video.$video.withError = withError(map.get($video));
                            map.get($video).pc.ontrack = function (event) { return ontrack(event, $video); };
                            return [4 /*yield*/, fetchRemoteSDP(map.get($video))];
                        case 2:
                            _b.sent();
                            __TimerWebRTC = setTimeout(resetWebRTC, sullivan.options.timeRefresh);
                            return [3 /*break*/, 4];
                        case 3:
                            e_2 = _b.sent();
                            console.log(e_2);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
        var ontrack = function (event, $video) {
            if (event.track.kind === "video") {
                appendChild($videoWrap, $video);
                // console.log($videoWrap, $video);
                $video.srcObject = event.streams[0];
                $video.play();
                $video = null;
                // if (!this.root.status.playing) {
                //   this.root.status.playing = true;
                // }
            }
        };
        function fetchRemoteSDP(webRTC) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            if (webRTC) {
                                webRTC.generateOffer(function (sdp) { return __awaiter(_this, void 0, void 0, function () {
                                    var result, e_3;
                                    var _this = this;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                _a.trys.push([0, 5, , 6]);
                                                return [4 /*yield*/, fetchStream(__url, sdp)];
                                            case 1:
                                                result = _a.sent();
                                                if (!result.errmsg) return [3 /*break*/, 2];
                                                console.error(result.errmsg);
                                                // this.root.emit('connect:error', {code: 5015, errorMsg: 'stream not found!'});
                                                destroy();
                                                sullivan.emit('error', result);
                                                resolve(result);
                                                return [3 /*break*/, 4];
                                            case 2: return [4 /*yield*/, webRTC.pc.setRemoteDescription(new RTCSessionDescription(result))];
                                            case 3:
                                                _a.sent();
                                                resolve(result);
                                                _a.label = 4;
                                            case 4:
                                                // this.root.status.loading = false;
                                                result = null;
                                                webRTC = null;
                                                return [3 /*break*/, 6];
                                            case 5:
                                                e_3 = _a.sent();
                                                if (webRTC === null || webRTC === void 0 ? void 0 : webRTC.restartTimer) {
                                                    clearTimeout(webRTC.restartTimer);
                                                    webRTC.restartTimer = null;
                                                }
                                                console.error(e_3);
                                                webRTC.restartTimer = setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                                    var result;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0: return [4 /*yield*/, fetchRemoteSDP(webRTC)];
                                                            case 1:
                                                                result = _a.sent();
                                                                resolve(result);
                                                                clearTimeout(webRTC.restartTimer);
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                }); }, 1000);
                                                return [3 /*break*/, 6];
                                            case 6: return [2 /*return*/];
                                        }
                                    });
                                }); });
                            }
                            else {
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
            __$oldVideo.load();
            // 把上一个卸载了。
            if (__$oldVideo) {
                // console.log(__$oldVideo);
                // if (video && video.destroy) {
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
            destroy: destroy,
        };
    }

    var Sullivan = /** @class */ (function (_super) {
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
                playing: true,
            };
            _this.initSullivan();
            return _this;
        }
        Sullivan.prototype.initSullivan = function () {
            var useWebRTC = this.options.useWebRTC;
            this.video = new Video(this);
            if (useWebRTC) {
                this.map.set(this.video, createWebRTC(this));
            }
            else {
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
                this.off();
                this.video = null;
            }
        };
        return Sullivan;
    }(EventEmitter));

    return Sullivan;

}));
