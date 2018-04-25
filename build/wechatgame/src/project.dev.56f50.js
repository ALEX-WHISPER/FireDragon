require = function() {
  function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = "function" == typeof require && require;
          if (!u && a) return a(o, !0);
          if (i) return i(o, !0);
          var f = new Error("Cannot find module '" + o + "'");
          throw f.code = "MODULE_NOT_FOUND", f;
        }
        var l = n[o] = {
          exports: {}
        };
        t[o][0].call(l.exports, function(e) {
          var n = t[o][1][e];
          return s(n || e);
        }, l, l.exports, e, t, n, r);
      }
      return n[o].exports;
    }
    var i = "function" == typeof require && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s;
  }
  return e;
}()({
  BtnEventsController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "56f79sV3eFJRar+Vpwsaeaz", "BtnEventsController");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onClickPlay: function onClickPlay() {
        NOTIFICATION.emit(GAME_START, {
          msg: "onClickPlay, trigger to enter game entry"
        });
      },
      onClickResume: function onClickResume() {
        NOTIFICATION.emit(GAME_RESUME, {
          msg: "onClickResume, trigger to resume the game"
        });
      },
      onClickRestart: function onClickRestart() {
        NOTIFICATION.emit(GAME_RESTART, {
          msg: "onClickRestart, trigger to restart the game"
        });
      }
    });
    cc._RF.pop();
  }, {} ],
  CatchingMsgItemPool: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cd591li0SxPM6TKzSm+YHRS", "CatchingMsgItemPool");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        itemTemplate: cc.Prefab,
        maxCount: 30,
        itemPool: {
          get: function get() {
            return this._itemPool;
          },
          set: function set(value) {
            this._itemPool = value;
          },
          visible: false
        }
      },
      onLoad: function onLoad() {
        this.poolInit();
      },
      poolInit: function poolInit() {
        this.itemPool = new cc.NodePool();
        for (var i = 0; i < this.maxCount; i++) {
          var item = cc.instantiate(this.itemTemplate);
          this.itemPool.put(item);
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  1: [ function(require, module, exports) {
    "use strict";
    exports.byteLength = byteLength;
    exports.toByteArray = toByteArray;
    exports.fromByteArray = fromByteArray;
    var lookup = [];
    var revLookup = [];
    var Arr = "undefined" !== typeof Uint8Array ? Uint8Array : Array;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (var i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function placeHoldersCount(b64) {
      var len = b64.length;
      if (len % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
      return "=" === b64[len - 2] ? 2 : "=" === b64[len - 1] ? 1 : 0;
    }
    function byteLength(b64) {
      return 3 * b64.length / 4 - placeHoldersCount(b64);
    }
    function toByteArray(b64) {
      var i, l, tmp, placeHolders, arr;
      var len = b64.length;
      placeHolders = placeHoldersCount(b64);
      arr = new Arr(3 * len / 4 - placeHolders);
      l = placeHolders > 0 ? len - 4 : len;
      var L = 0;
      for (i = 0; i < l; i += 4) {
        tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
        arr[L++] = tmp >> 16 & 255;
        arr[L++] = tmp >> 8 & 255;
        arr[L++] = 255 & tmp;
      }
      if (2 === placeHolders) {
        tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
        arr[L++] = 255 & tmp;
      } else if (1 === placeHolders) {
        tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
        arr[L++] = tmp >> 8 & 255;
        arr[L++] = 255 & tmp;
      }
      return arr;
    }
    function tripletToBase64(num) {
      return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[63 & num];
    }
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];
      for (var i = start; i < end; i += 3) {
        tmp = (uint8[i] << 16 & 16711680) + (uint8[i + 1] << 8 & 65280) + (255 & uint8[i + 2]);
        output.push(tripletToBase64(tmp));
      }
      return output.join("");
    }
    function fromByteArray(uint8) {
      var tmp;
      var len = uint8.length;
      var extraBytes = len % 3;
      var output = "";
      var parts = [];
      var maxChunkLength = 16383;
      for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
      if (1 === extraBytes) {
        tmp = uint8[len - 1];
        output += lookup[tmp >> 2];
        output += lookup[tmp << 4 & 63];
        output += "==";
      } else if (2 === extraBytes) {
        tmp = (uint8[len - 2] << 8) + uint8[len - 1];
        output += lookup[tmp >> 10];
        output += lookup[tmp >> 4 & 63];
        output += lookup[tmp << 2 & 63];
        output += "=";
      }
      parts.push(output);
      return parts.join("");
    }
  }, {} ],
  2: [ function(require, module, exports) {
    (function(global) {
      "use strict";
      var base64 = require("base64-js");
      var ieee754 = require("ieee754");
      var isArray = require("isarray");
      exports.Buffer = Buffer;
      exports.SlowBuffer = SlowBuffer;
      exports.INSPECT_MAX_BYTES = 50;
      Buffer.TYPED_ARRAY_SUPPORT = void 0 !== global.TYPED_ARRAY_SUPPORT ? global.TYPED_ARRAY_SUPPORT : typedArraySupport();
      exports.kMaxLength = kMaxLength();
      function typedArraySupport() {
        try {
          var arr = new Uint8Array(1);
          arr.__proto__ = {
            __proto__: Uint8Array.prototype,
            foo: function() {
              return 42;
            }
          };
          return 42 === arr.foo() && "function" === typeof arr.subarray && 0 === arr.subarray(1, 1).byteLength;
        } catch (e) {
          return false;
        }
      }
      function kMaxLength() {
        return Buffer.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
      }
      function createBuffer(that, length) {
        if (kMaxLength() < length) throw new RangeError("Invalid typed array length");
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          that = new Uint8Array(length);
          that.__proto__ = Buffer.prototype;
        } else {
          null === that && (that = new Buffer(length));
          that.length = length;
        }
        return that;
      }
      function Buffer(arg, encodingOrOffset, length) {
        if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) return new Buffer(arg, encodingOrOffset, length);
        if ("number" === typeof arg) {
          if ("string" === typeof encodingOrOffset) throw new Error("If encoding is specified then the first argument must be a string");
          return allocUnsafe(this, arg);
        }
        return from(this, arg, encodingOrOffset, length);
      }
      Buffer.poolSize = 8192;
      Buffer._augment = function(arr) {
        arr.__proto__ = Buffer.prototype;
        return arr;
      };
      function from(that, value, encodingOrOffset, length) {
        if ("number" === typeof value) throw new TypeError('"value" argument must not be a number');
        if ("undefined" !== typeof ArrayBuffer && value instanceof ArrayBuffer) return fromArrayBuffer(that, value, encodingOrOffset, length);
        if ("string" === typeof value) return fromString(that, value, encodingOrOffset);
        return fromObject(that, value);
      }
      Buffer.from = function(value, encodingOrOffset, length) {
        return from(null, value, encodingOrOffset, length);
      };
      if (Buffer.TYPED_ARRAY_SUPPORT) {
        Buffer.prototype.__proto__ = Uint8Array.prototype;
        Buffer.__proto__ = Uint8Array;
        "undefined" !== typeof Symbol && Symbol.species && Buffer[Symbol.species] === Buffer && Object.defineProperty(Buffer, Symbol.species, {
          value: null,
          configurable: true
        });
      }
      function assertSize(size) {
        if ("number" !== typeof size) throw new TypeError('"size" argument must be a number');
        if (size < 0) throw new RangeError('"size" argument must not be negative');
      }
      function alloc(that, size, fill, encoding) {
        assertSize(size);
        if (size <= 0) return createBuffer(that, size);
        if (void 0 !== fill) return "string" === typeof encoding ? createBuffer(that, size).fill(fill, encoding) : createBuffer(that, size).fill(fill);
        return createBuffer(that, size);
      }
      Buffer.alloc = function(size, fill, encoding) {
        return alloc(null, size, fill, encoding);
      };
      function allocUnsafe(that, size) {
        assertSize(size);
        that = createBuffer(that, size < 0 ? 0 : 0 | checked(size));
        if (!Buffer.TYPED_ARRAY_SUPPORT) for (var i = 0; i < size; ++i) that[i] = 0;
        return that;
      }
      Buffer.allocUnsafe = function(size) {
        return allocUnsafe(null, size);
      };
      Buffer.allocUnsafeSlow = function(size) {
        return allocUnsafe(null, size);
      };
      function fromString(that, string, encoding) {
        "string" === typeof encoding && "" !== encoding || (encoding = "utf8");
        if (!Buffer.isEncoding(encoding)) throw new TypeError('"encoding" must be a valid string encoding');
        var length = 0 | byteLength(string, encoding);
        that = createBuffer(that, length);
        var actual = that.write(string, encoding);
        actual !== length && (that = that.slice(0, actual));
        return that;
      }
      function fromArrayLike(that, array) {
        var length = array.length < 0 ? 0 : 0 | checked(array.length);
        that = createBuffer(that, length);
        for (var i = 0; i < length; i += 1) that[i] = 255 & array[i];
        return that;
      }
      function fromArrayBuffer(that, array, byteOffset, length) {
        array.byteLength;
        if (byteOffset < 0 || array.byteLength < byteOffset) throw new RangeError("'offset' is out of bounds");
        if (array.byteLength < byteOffset + (length || 0)) throw new RangeError("'length' is out of bounds");
        array = void 0 === byteOffset && void 0 === length ? new Uint8Array(array) : void 0 === length ? new Uint8Array(array, byteOffset) : new Uint8Array(array, byteOffset, length);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          that = array;
          that.__proto__ = Buffer.prototype;
        } else that = fromArrayLike(that, array);
        return that;
      }
      function fromObject(that, obj) {
        if (Buffer.isBuffer(obj)) {
          var len = 0 | checked(obj.length);
          that = createBuffer(that, len);
          if (0 === that.length) return that;
          obj.copy(that, 0, 0, len);
          return that;
        }
        if (obj) {
          if ("undefined" !== typeof ArrayBuffer && obj.buffer instanceof ArrayBuffer || "length" in obj) {
            if ("number" !== typeof obj.length || isnan(obj.length)) return createBuffer(that, 0);
            return fromArrayLike(that, obj);
          }
          if ("Buffer" === obj.type && isArray(obj.data)) return fromArrayLike(that, obj.data);
        }
        throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
      }
      function checked(length) {
        if (length >= kMaxLength()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + kMaxLength().toString(16) + " bytes");
        return 0 | length;
      }
      function SlowBuffer(length) {
        +length != length && (length = 0);
        return Buffer.alloc(+length);
      }
      Buffer.isBuffer = function isBuffer(b) {
        return !!(null != b && b._isBuffer);
      };
      Buffer.compare = function compare(a, b) {
        if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) throw new TypeError("Arguments must be Buffers");
        if (a === b) return 0;
        var x = a.length;
        var y = b.length;
        for (var i = 0, len = Math.min(x, y); i < len; ++i) if (a[i] !== b[i]) {
          x = a[i];
          y = b[i];
          break;
        }
        if (x < y) return -1;
        if (y < x) return 1;
        return 0;
      };
      Buffer.isEncoding = function isEncoding(encoding) {
        switch (String(encoding).toLowerCase()) {
         case "hex":
         case "utf8":
         case "utf-8":
         case "ascii":
         case "latin1":
         case "binary":
         case "base64":
         case "ucs2":
         case "ucs-2":
         case "utf16le":
         case "utf-16le":
          return true;

         default:
          return false;
        }
      };
      Buffer.concat = function concat(list, length) {
        if (!isArray(list)) throw new TypeError('"list" argument must be an Array of Buffers');
        if (0 === list.length) return Buffer.alloc(0);
        var i;
        if (void 0 === length) {
          length = 0;
          for (i = 0; i < list.length; ++i) length += list[i].length;
        }
        var buffer = Buffer.allocUnsafe(length);
        var pos = 0;
        for (i = 0; i < list.length; ++i) {
          var buf = list[i];
          if (!Buffer.isBuffer(buf)) throw new TypeError('"list" argument must be an Array of Buffers');
          buf.copy(buffer, pos);
          pos += buf.length;
        }
        return buffer;
      };
      function byteLength(string, encoding) {
        if (Buffer.isBuffer(string)) return string.length;
        if ("undefined" !== typeof ArrayBuffer && "function" === typeof ArrayBuffer.isView && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) return string.byteLength;
        "string" !== typeof string && (string = "" + string);
        var len = string.length;
        if (0 === len) return 0;
        var loweredCase = false;
        for (;;) switch (encoding) {
         case "ascii":
         case "latin1":
         case "binary":
          return len;

         case "utf8":
         case "utf-8":
         case void 0:
          return utf8ToBytes(string).length;

         case "ucs2":
         case "ucs-2":
         case "utf16le":
         case "utf-16le":
          return 2 * len;

         case "hex":
          return len >>> 1;

         case "base64":
          return base64ToBytes(string).length;

         default:
          if (loweredCase) return utf8ToBytes(string).length;
          encoding = ("" + encoding).toLowerCase();
          loweredCase = true;
        }
      }
      Buffer.byteLength = byteLength;
      function slowToString(encoding, start, end) {
        var loweredCase = false;
        (void 0 === start || start < 0) && (start = 0);
        if (start > this.length) return "";
        (void 0 === end || end > this.length) && (end = this.length);
        if (end <= 0) return "";
        end >>>= 0;
        start >>>= 0;
        if (end <= start) return "";
        encoding || (encoding = "utf8");
        while (true) switch (encoding) {
         case "hex":
          return hexSlice(this, start, end);

         case "utf8":
         case "utf-8":
          return utf8Slice(this, start, end);

         case "ascii":
          return asciiSlice(this, start, end);

         case "latin1":
         case "binary":
          return latin1Slice(this, start, end);

         case "base64":
          return base64Slice(this, start, end);

         case "ucs2":
         case "ucs-2":
         case "utf16le":
         case "utf-16le":
          return utf16leSlice(this, start, end);

         default:
          if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
          encoding = (encoding + "").toLowerCase();
          loweredCase = true;
        }
      }
      Buffer.prototype._isBuffer = true;
      function swap(b, n, m) {
        var i = b[n];
        b[n] = b[m];
        b[m] = i;
      }
      Buffer.prototype.swap16 = function swap16() {
        var len = this.length;
        if (len % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
        for (var i = 0; i < len; i += 2) swap(this, i, i + 1);
        return this;
      };
      Buffer.prototype.swap32 = function swap32() {
        var len = this.length;
        if (len % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
        for (var i = 0; i < len; i += 4) {
          swap(this, i, i + 3);
          swap(this, i + 1, i + 2);
        }
        return this;
      };
      Buffer.prototype.swap64 = function swap64() {
        var len = this.length;
        if (len % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
        for (var i = 0; i < len; i += 8) {
          swap(this, i, i + 7);
          swap(this, i + 1, i + 6);
          swap(this, i + 2, i + 5);
          swap(this, i + 3, i + 4);
        }
        return this;
      };
      Buffer.prototype.toString = function toString() {
        var length = 0 | this.length;
        if (0 === length) return "";
        if (0 === arguments.length) return utf8Slice(this, 0, length);
        return slowToString.apply(this, arguments);
      };
      Buffer.prototype.equals = function equals(b) {
        if (!Buffer.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
        if (this === b) return true;
        return 0 === Buffer.compare(this, b);
      };
      Buffer.prototype.inspect = function inspect() {
        var str = "";
        var max = exports.INSPECT_MAX_BYTES;
        if (this.length > 0) {
          str = this.toString("hex", 0, max).match(/.{2}/g).join(" ");
          this.length > max && (str += " ... ");
        }
        return "<Buffer " + str + ">";
      };
      Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
        if (!Buffer.isBuffer(target)) throw new TypeError("Argument must be a Buffer");
        void 0 === start && (start = 0);
        void 0 === end && (end = target ? target.length : 0);
        void 0 === thisStart && (thisStart = 0);
        void 0 === thisEnd && (thisEnd = this.length);
        if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) throw new RangeError("out of range index");
        if (thisStart >= thisEnd && start >= end) return 0;
        if (thisStart >= thisEnd) return -1;
        if (start >= end) return 1;
        start >>>= 0;
        end >>>= 0;
        thisStart >>>= 0;
        thisEnd >>>= 0;
        if (this === target) return 0;
        var x = thisEnd - thisStart;
        var y = end - start;
        var len = Math.min(x, y);
        var thisCopy = this.slice(thisStart, thisEnd);
        var targetCopy = target.slice(start, end);
        for (var i = 0; i < len; ++i) if (thisCopy[i] !== targetCopy[i]) {
          x = thisCopy[i];
          y = targetCopy[i];
          break;
        }
        if (x < y) return -1;
        if (y < x) return 1;
        return 0;
      };
      function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
        if (0 === buffer.length) return -1;
        if ("string" === typeof byteOffset) {
          encoding = byteOffset;
          byteOffset = 0;
        } else byteOffset > 2147483647 ? byteOffset = 2147483647 : byteOffset < -2147483648 && (byteOffset = -2147483648);
        byteOffset = +byteOffset;
        isNaN(byteOffset) && (byteOffset = dir ? 0 : buffer.length - 1);
        byteOffset < 0 && (byteOffset = buffer.length + byteOffset);
        if (byteOffset >= buffer.length) {
          if (dir) return -1;
          byteOffset = buffer.length - 1;
        } else if (byteOffset < 0) {
          if (!dir) return -1;
          byteOffset = 0;
        }
        "string" === typeof val && (val = Buffer.from(val, encoding));
        if (Buffer.isBuffer(val)) {
          if (0 === val.length) return -1;
          return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
        }
        if ("number" === typeof val) {
          val &= 255;
          if (Buffer.TYPED_ARRAY_SUPPORT && "function" === typeof Uint8Array.prototype.indexOf) return dir ? Uint8Array.prototype.indexOf.call(buffer, val, byteOffset) : Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
          return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir);
        }
        throw new TypeError("val must be string, number or Buffer");
      }
      function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
        var indexSize = 1;
        var arrLength = arr.length;
        var valLength = val.length;
        if (void 0 !== encoding) {
          encoding = String(encoding).toLowerCase();
          if ("ucs2" === encoding || "ucs-2" === encoding || "utf16le" === encoding || "utf-16le" === encoding) {
            if (arr.length < 2 || val.length < 2) return -1;
            indexSize = 2;
            arrLength /= 2;
            valLength /= 2;
            byteOffset /= 2;
          }
        }
        function read(buf, i) {
          return 1 === indexSize ? buf[i] : buf.readUInt16BE(i * indexSize);
        }
        var i;
        if (dir) {
          var foundIndex = -1;
          for (i = byteOffset; i < arrLength; i++) if (read(arr, i) === read(val, -1 === foundIndex ? 0 : i - foundIndex)) {
            -1 === foundIndex && (foundIndex = i);
            if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
          } else {
            -1 !== foundIndex && (i -= i - foundIndex);
            foundIndex = -1;
          }
        } else {
          byteOffset + valLength > arrLength && (byteOffset = arrLength - valLength);
          for (i = byteOffset; i >= 0; i--) {
            var found = true;
            for (var j = 0; j < valLength; j++) if (read(arr, i + j) !== read(val, j)) {
              found = false;
              break;
            }
            if (found) return i;
          }
        }
        return -1;
      }
      Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
        return -1 !== this.indexOf(val, byteOffset, encoding);
      };
      Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
      };
      Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
      };
      function hexWrite(buf, string, offset, length) {
        offset = Number(offset) || 0;
        var remaining = buf.length - offset;
        if (length) {
          length = Number(length);
          length > remaining && (length = remaining);
        } else length = remaining;
        var strLen = string.length;
        if (strLen % 2 !== 0) throw new TypeError("Invalid hex string");
        length > strLen / 2 && (length = strLen / 2);
        for (var i = 0; i < length; ++i) {
          var parsed = parseInt(string.substr(2 * i, 2), 16);
          if (isNaN(parsed)) return i;
          buf[offset + i] = parsed;
        }
        return i;
      }
      function utf8Write(buf, string, offset, length) {
        return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
      }
      function asciiWrite(buf, string, offset, length) {
        return blitBuffer(asciiToBytes(string), buf, offset, length);
      }
      function latin1Write(buf, string, offset, length) {
        return asciiWrite(buf, string, offset, length);
      }
      function base64Write(buf, string, offset, length) {
        return blitBuffer(base64ToBytes(string), buf, offset, length);
      }
      function ucs2Write(buf, string, offset, length) {
        return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
      }
      Buffer.prototype.write = function write(string, offset, length, encoding) {
        if (void 0 === offset) {
          encoding = "utf8";
          length = this.length;
          offset = 0;
        } else if (void 0 === length && "string" === typeof offset) {
          encoding = offset;
          length = this.length;
          offset = 0;
        } else {
          if (!isFinite(offset)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
          offset |= 0;
          if (isFinite(length)) {
            length |= 0;
            void 0 === encoding && (encoding = "utf8");
          } else {
            encoding = length;
            length = void 0;
          }
        }
        var remaining = this.length - offset;
        (void 0 === length || length > remaining) && (length = remaining);
        if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) throw new RangeError("Attempt to write outside buffer bounds");
        encoding || (encoding = "utf8");
        var loweredCase = false;
        for (;;) switch (encoding) {
         case "hex":
          return hexWrite(this, string, offset, length);

         case "utf8":
         case "utf-8":
          return utf8Write(this, string, offset, length);

         case "ascii":
          return asciiWrite(this, string, offset, length);

         case "latin1":
         case "binary":
          return latin1Write(this, string, offset, length);

         case "base64":
          return base64Write(this, string, offset, length);

         case "ucs2":
         case "ucs-2":
         case "utf16le":
         case "utf-16le":
          return ucs2Write(this, string, offset, length);

         default:
          if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
          encoding = ("" + encoding).toLowerCase();
          loweredCase = true;
        }
      };
      Buffer.prototype.toJSON = function toJSON() {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };
      function base64Slice(buf, start, end) {
        return 0 === start && end === buf.length ? base64.fromByteArray(buf) : base64.fromByteArray(buf.slice(start, end));
      }
      function utf8Slice(buf, start, end) {
        end = Math.min(buf.length, end);
        var res = [];
        var i = start;
        while (i < end) {
          var firstByte = buf[i];
          var codePoint = null;
          var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
          if (i + bytesPerSequence <= end) {
            var secondByte, thirdByte, fourthByte, tempCodePoint;
            switch (bytesPerSequence) {
             case 1:
              firstByte < 128 && (codePoint = firstByte);
              break;

             case 2:
              secondByte = buf[i + 1];
              if (128 === (192 & secondByte)) {
                tempCodePoint = (31 & firstByte) << 6 | 63 & secondByte;
                tempCodePoint > 127 && (codePoint = tempCodePoint);
              }
              break;

             case 3:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              if (128 === (192 & secondByte) && 128 === (192 & thirdByte)) {
                tempCodePoint = (15 & firstByte) << 12 | (63 & secondByte) << 6 | 63 & thirdByte;
                tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343) && (codePoint = tempCodePoint);
              }
              break;

             case 4:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              fourthByte = buf[i + 3];
              if (128 === (192 & secondByte) && 128 === (192 & thirdByte) && 128 === (192 & fourthByte)) {
                tempCodePoint = (15 & firstByte) << 18 | (63 & secondByte) << 12 | (63 & thirdByte) << 6 | 63 & fourthByte;
                tempCodePoint > 65535 && tempCodePoint < 1114112 && (codePoint = tempCodePoint);
              }
            }
          }
          if (null === codePoint) {
            codePoint = 65533;
            bytesPerSequence = 1;
          } else if (codePoint > 65535) {
            codePoint -= 65536;
            res.push(codePoint >>> 10 & 1023 | 55296);
            codePoint = 56320 | 1023 & codePoint;
          }
          res.push(codePoint);
          i += bytesPerSequence;
        }
        return decodeCodePointsArray(res);
      }
      var MAX_ARGUMENTS_LENGTH = 4096;
      function decodeCodePointsArray(codePoints) {
        var len = codePoints.length;
        if (len <= MAX_ARGUMENTS_LENGTH) return String.fromCharCode.apply(String, codePoints);
        var res = "";
        var i = 0;
        while (i < len) res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
        return res;
      }
      function asciiSlice(buf, start, end) {
        var ret = "";
        end = Math.min(buf.length, end);
        for (var i = start; i < end; ++i) ret += String.fromCharCode(127 & buf[i]);
        return ret;
      }
      function latin1Slice(buf, start, end) {
        var ret = "";
        end = Math.min(buf.length, end);
        for (var i = start; i < end; ++i) ret += String.fromCharCode(buf[i]);
        return ret;
      }
      function hexSlice(buf, start, end) {
        var len = buf.length;
        (!start || start < 0) && (start = 0);
        (!end || end < 0 || end > len) && (end = len);
        var out = "";
        for (var i = start; i < end; ++i) out += toHex(buf[i]);
        return out;
      }
      function utf16leSlice(buf, start, end) {
        var bytes = buf.slice(start, end);
        var res = "";
        for (var i = 0; i < bytes.length; i += 2) res += String.fromCharCode(bytes[i] + 256 * bytes[i + 1]);
        return res;
      }
      Buffer.prototype.slice = function slice(start, end) {
        var len = this.length;
        start = ~~start;
        end = void 0 === end ? len : ~~end;
        if (start < 0) {
          start += len;
          start < 0 && (start = 0);
        } else start > len && (start = len);
        if (end < 0) {
          end += len;
          end < 0 && (end = 0);
        } else end > len && (end = len);
        end < start && (end = start);
        var newBuf;
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          newBuf = this.subarray(start, end);
          newBuf.__proto__ = Buffer.prototype;
        } else {
          var sliceLen = end - start;
          newBuf = new Buffer(sliceLen, void 0);
          for (var i = 0; i < sliceLen; ++i) newBuf[i] = this[i + start];
        }
        return newBuf;
      };
      function checkOffset(offset, ext, length) {
        if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
        if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
      }
      Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
        offset |= 0;
        byteLength |= 0;
        noAssert || checkOffset(offset, byteLength, this.length);
        var val = this[offset];
        var mul = 1;
        var i = 0;
        while (++i < byteLength && (mul *= 256)) val += this[offset + i] * mul;
        return val;
      };
      Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
        offset |= 0;
        byteLength |= 0;
        noAssert || checkOffset(offset, byteLength, this.length);
        var val = this[offset + --byteLength];
        var mul = 1;
        while (byteLength > 0 && (mul *= 256)) val += this[offset + --byteLength] * mul;
        return val;
      };
      Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
        noAssert || checkOffset(offset, 1, this.length);
        return this[offset];
      };
      Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
        noAssert || checkOffset(offset, 2, this.length);
        return this[offset] | this[offset + 1] << 8;
      };
      Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
        noAssert || checkOffset(offset, 2, this.length);
        return this[offset] << 8 | this[offset + 1];
      };
      Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
        noAssert || checkOffset(offset, 4, this.length);
        return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + 16777216 * this[offset + 3];
      };
      Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
        noAssert || checkOffset(offset, 4, this.length);
        return 16777216 * this[offset] + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
      };
      Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
        offset |= 0;
        byteLength |= 0;
        noAssert || checkOffset(offset, byteLength, this.length);
        var val = this[offset];
        var mul = 1;
        var i = 0;
        while (++i < byteLength && (mul *= 256)) val += this[offset + i] * mul;
        mul *= 128;
        val >= mul && (val -= Math.pow(2, 8 * byteLength));
        return val;
      };
      Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
        offset |= 0;
        byteLength |= 0;
        noAssert || checkOffset(offset, byteLength, this.length);
        var i = byteLength;
        var mul = 1;
        var val = this[offset + --i];
        while (i > 0 && (mul *= 256)) val += this[offset + --i] * mul;
        mul *= 128;
        val >= mul && (val -= Math.pow(2, 8 * byteLength));
        return val;
      };
      Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
        noAssert || checkOffset(offset, 1, this.length);
        if (!(128 & this[offset])) return this[offset];
        return -1 * (255 - this[offset] + 1);
      };
      Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
        noAssert || checkOffset(offset, 2, this.length);
        var val = this[offset] | this[offset + 1] << 8;
        return 32768 & val ? 4294901760 | val : val;
      };
      Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
        noAssert || checkOffset(offset, 2, this.length);
        var val = this[offset + 1] | this[offset] << 8;
        return 32768 & val ? 4294901760 | val : val;
      };
      Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
        noAssert || checkOffset(offset, 4, this.length);
        return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
      };
      Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
        noAssert || checkOffset(offset, 4, this.length);
        return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
      };
      Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
        noAssert || checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, true, 23, 4);
      };
      Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
        noAssert || checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, false, 23, 4);
      };
      Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
        noAssert || checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, true, 52, 8);
      };
      Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
        noAssert || checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, false, 52, 8);
      };
      function checkInt(buf, value, offset, ext, max, min) {
        if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
        if (offset + ext > buf.length) throw new RangeError("Index out of range");
      }
      Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
        value = +value;
        offset |= 0;
        byteLength |= 0;
        if (!noAssert) {
          var maxBytes = Math.pow(2, 8 * byteLength) - 1;
          checkInt(this, value, offset, byteLength, maxBytes, 0);
        }
        var mul = 1;
        var i = 0;
        this[offset] = 255 & value;
        while (++i < byteLength && (mul *= 256)) this[offset + i] = value / mul & 255;
        return offset + byteLength;
      };
      Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
        value = +value;
        offset |= 0;
        byteLength |= 0;
        if (!noAssert) {
          var maxBytes = Math.pow(2, 8 * byteLength) - 1;
          checkInt(this, value, offset, byteLength, maxBytes, 0);
        }
        var i = byteLength - 1;
        var mul = 1;
        this[offset + i] = 255 & value;
        while (--i >= 0 && (mul *= 256)) this[offset + i] = value / mul & 255;
        return offset + byteLength;
      };
      Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 1, 255, 0);
        Buffer.TYPED_ARRAY_SUPPORT || (value = Math.floor(value));
        this[offset] = 255 & value;
        return offset + 1;
      };
      function objectWriteUInt16(buf, value, offset, littleEndian) {
        value < 0 && (value = 65535 + value + 1);
        for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) buf[offset + i] = (value & 255 << 8 * (littleEndian ? i : 1 - i)) >>> 8 * (littleEndian ? i : 1 - i);
      }
      Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 2, 65535, 0);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = 255 & value;
          this[offset + 1] = value >>> 8;
        } else objectWriteUInt16(this, value, offset, true);
        return offset + 2;
      };
      Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 2, 65535, 0);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 8;
          this[offset + 1] = 255 & value;
        } else objectWriteUInt16(this, value, offset, false);
        return offset + 2;
      };
      function objectWriteUInt32(buf, value, offset, littleEndian) {
        value < 0 && (value = 4294967295 + value + 1);
        for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) buf[offset + i] = value >>> 8 * (littleEndian ? i : 3 - i) & 255;
      }
      Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 4, 4294967295, 0);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset + 3] = value >>> 24;
          this[offset + 2] = value >>> 16;
          this[offset + 1] = value >>> 8;
          this[offset] = 255 & value;
        } else objectWriteUInt32(this, value, offset, true);
        return offset + 4;
      };
      Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 4, 4294967295, 0);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 24;
          this[offset + 1] = value >>> 16;
          this[offset + 2] = value >>> 8;
          this[offset + 3] = 255 & value;
        } else objectWriteUInt32(this, value, offset, false);
        return offset + 4;
      };
      Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
        value = +value;
        offset |= 0;
        if (!noAssert) {
          var limit = Math.pow(2, 8 * byteLength - 1);
          checkInt(this, value, offset, byteLength, limit - 1, -limit);
        }
        var i = 0;
        var mul = 1;
        var sub = 0;
        this[offset] = 255 & value;
        while (++i < byteLength && (mul *= 256)) {
          value < 0 && 0 === sub && 0 !== this[offset + i - 1] && (sub = 1);
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength;
      };
      Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
        value = +value;
        offset |= 0;
        if (!noAssert) {
          var limit = Math.pow(2, 8 * byteLength - 1);
          checkInt(this, value, offset, byteLength, limit - 1, -limit);
        }
        var i = byteLength - 1;
        var mul = 1;
        var sub = 0;
        this[offset + i] = 255 & value;
        while (--i >= 0 && (mul *= 256)) {
          value < 0 && 0 === sub && 0 !== this[offset + i + 1] && (sub = 1);
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength;
      };
      Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 1, 127, -128);
        Buffer.TYPED_ARRAY_SUPPORT || (value = Math.floor(value));
        value < 0 && (value = 255 + value + 1);
        this[offset] = 255 & value;
        return offset + 1;
      };
      Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 2, 32767, -32768);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = 255 & value;
          this[offset + 1] = value >>> 8;
        } else objectWriteUInt16(this, value, offset, true);
        return offset + 2;
      };
      Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 2, 32767, -32768);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 8;
          this[offset + 1] = 255 & value;
        } else objectWriteUInt16(this, value, offset, false);
        return offset + 2;
      };
      Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 4, 2147483647, -2147483648);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = 255 & value;
          this[offset + 1] = value >>> 8;
          this[offset + 2] = value >>> 16;
          this[offset + 3] = value >>> 24;
        } else objectWriteUInt32(this, value, offset, true);
        return offset + 4;
      };
      Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 4, 2147483647, -2147483648);
        value < 0 && (value = 4294967295 + value + 1);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 24;
          this[offset + 1] = value >>> 16;
          this[offset + 2] = value >>> 8;
          this[offset + 3] = 255 & value;
        } else objectWriteUInt32(this, value, offset, false);
        return offset + 4;
      };
      function checkIEEE754(buf, value, offset, ext, max, min) {
        if (offset + ext > buf.length) throw new RangeError("Index out of range");
        if (offset < 0) throw new RangeError("Index out of range");
      }
      function writeFloat(buf, value, offset, littleEndian, noAssert) {
        noAssert || checkIEEE754(buf, value, offset, 4, 3.4028234663852886e38, -3.4028234663852886e38);
        ieee754.write(buf, value, offset, littleEndian, 23, 4);
        return offset + 4;
      }
      Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
        return writeFloat(this, value, offset, true, noAssert);
      };
      Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
        return writeFloat(this, value, offset, false, noAssert);
      };
      function writeDouble(buf, value, offset, littleEndian, noAssert) {
        noAssert || checkIEEE754(buf, value, offset, 8, 1.7976931348623157e308, -1.7976931348623157e308);
        ieee754.write(buf, value, offset, littleEndian, 52, 8);
        return offset + 8;
      }
      Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
        return writeDouble(this, value, offset, true, noAssert);
      };
      Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
        return writeDouble(this, value, offset, false, noAssert);
      };
      Buffer.prototype.copy = function copy(target, targetStart, start, end) {
        start || (start = 0);
        end || 0 === end || (end = this.length);
        targetStart >= target.length && (targetStart = target.length);
        targetStart || (targetStart = 0);
        end > 0 && end < start && (end = start);
        if (end === start) return 0;
        if (0 === target.length || 0 === this.length) return 0;
        if (targetStart < 0) throw new RangeError("targetStart out of bounds");
        if (start < 0 || start >= this.length) throw new RangeError("sourceStart out of bounds");
        if (end < 0) throw new RangeError("sourceEnd out of bounds");
        end > this.length && (end = this.length);
        target.length - targetStart < end - start && (end = target.length - targetStart + start);
        var len = end - start;
        var i;
        if (this === target && start < targetStart && targetStart < end) for (i = len - 1; i >= 0; --i) target[i + targetStart] = this[i + start]; else if (len < 1e3 || !Buffer.TYPED_ARRAY_SUPPORT) for (i = 0; i < len; ++i) target[i + targetStart] = this[i + start]; else Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
        return len;
      };
      Buffer.prototype.fill = function fill(val, start, end, encoding) {
        if ("string" === typeof val) {
          if ("string" === typeof start) {
            encoding = start;
            start = 0;
            end = this.length;
          } else if ("string" === typeof end) {
            encoding = end;
            end = this.length;
          }
          if (1 === val.length) {
            var code = val.charCodeAt(0);
            code < 256 && (val = code);
          }
          if (void 0 !== encoding && "string" !== typeof encoding) throw new TypeError("encoding must be a string");
          if ("string" === typeof encoding && !Buffer.isEncoding(encoding)) throw new TypeError("Unknown encoding: " + encoding);
        } else "number" === typeof val && (val &= 255);
        if (start < 0 || this.length < start || this.length < end) throw new RangeError("Out of range index");
        if (end <= start) return this;
        start >>>= 0;
        end = void 0 === end ? this.length : end >>> 0;
        val || (val = 0);
        var i;
        if ("number" === typeof val) for (i = start; i < end; ++i) this[i] = val; else {
          var bytes = Buffer.isBuffer(val) ? val : utf8ToBytes(new Buffer(val, encoding).toString());
          var len = bytes.length;
          for (i = 0; i < end - start; ++i) this[i + start] = bytes[i % len];
        }
        return this;
      };
      var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;
      function base64clean(str) {
        str = stringtrim(str).replace(INVALID_BASE64_RE, "");
        if (str.length < 2) return "";
        while (str.length % 4 !== 0) str += "=";
        return str;
      }
      function stringtrim(str) {
        if (str.trim) return str.trim();
        return str.replace(/^\s+|\s+$/g, "");
      }
      function toHex(n) {
        if (n < 16) return "0" + n.toString(16);
        return n.toString(16);
      }
      function utf8ToBytes(string, units) {
        units = units || Infinity;
        var codePoint;
        var length = string.length;
        var leadSurrogate = null;
        var bytes = [];
        for (var i = 0; i < length; ++i) {
          codePoint = string.charCodeAt(i);
          if (codePoint > 55295 && codePoint < 57344) {
            if (!leadSurrogate) {
              if (codePoint > 56319) {
                (units -= 3) > -1 && bytes.push(239, 191, 189);
                continue;
              }
              if (i + 1 === length) {
                (units -= 3) > -1 && bytes.push(239, 191, 189);
                continue;
              }
              leadSurrogate = codePoint;
              continue;
            }
            if (codePoint < 56320) {
              (units -= 3) > -1 && bytes.push(239, 191, 189);
              leadSurrogate = codePoint;
              continue;
            }
            codePoint = 65536 + (leadSurrogate - 55296 << 10 | codePoint - 56320);
          } else leadSurrogate && (units -= 3) > -1 && bytes.push(239, 191, 189);
          leadSurrogate = null;
          if (codePoint < 128) {
            if ((units -= 1) < 0) break;
            bytes.push(codePoint);
          } else if (codePoint < 2048) {
            if ((units -= 2) < 0) break;
            bytes.push(codePoint >> 6 | 192, 63 & codePoint | 128);
          } else if (codePoint < 65536) {
            if ((units -= 3) < 0) break;
            bytes.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, 63 & codePoint | 128);
          } else {
            if (!(codePoint < 1114112)) throw new Error("Invalid code point");
            if ((units -= 4) < 0) break;
            bytes.push(codePoint >> 18 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, 63 & codePoint | 128);
          }
        }
        return bytes;
      }
      function asciiToBytes(str) {
        var byteArray = [];
        for (var i = 0; i < str.length; ++i) byteArray.push(255 & str.charCodeAt(i));
        return byteArray;
      }
      function utf16leToBytes(str, units) {
        var c, hi, lo;
        var byteArray = [];
        for (var i = 0; i < str.length; ++i) {
          if ((units -= 2) < 0) break;
          c = str.charCodeAt(i);
          hi = c >> 8;
          lo = c % 256;
          byteArray.push(lo);
          byteArray.push(hi);
        }
        return byteArray;
      }
      function base64ToBytes(str) {
        return base64.toByteArray(base64clean(str));
      }
      function blitBuffer(src, dst, offset, length) {
        for (var i = 0; i < length; ++i) {
          if (i + offset >= dst.length || i >= src.length) break;
          dst[i + offset] = src[i];
        }
        return i;
      }
      function isnan(val) {
        return val !== val;
      }
    }).call(this, "undefined" !== typeof global ? global : "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : {});
  }, {
    "base64-js": 1,
    ieee754: 4,
    isarray: 3
  } ],
  3: [ function(require, module, exports) {
    var toString = {}.toString;
    module.exports = Array.isArray || function(arr) {
      return "[object Array]" == toString.call(arr);
    };
  }, {} ],
  4: [ function(require, module, exports) {
    exports.read = function(buffer, offset, isLE, mLen, nBytes) {
      var e, m;
      var eLen = 8 * nBytes - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i = isLE ? nBytes - 1 : 0;
      var d = isLE ? -1 : 1;
      var s = buffer[offset + i];
      i += d;
      e = s & (1 << -nBits) - 1;
      s >>= -nBits;
      nBits += eLen;
      for (;nBits > 0; e = 256 * e + buffer[offset + i], i += d, nBits -= 8) ;
      m = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;
      for (;nBits > 0; m = 256 * m + buffer[offset + i], i += d, nBits -= 8) ;
      if (0 === e) e = 1 - eBias; else {
        if (e === eMax) return m ? NaN : Infinity * (s ? -1 : 1);
        m += Math.pow(2, mLen);
        e -= eBias;
      }
      return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
    };
    exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
      var e, m, c;
      var eLen = 8 * nBytes - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = 23 === mLen ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i = isLE ? 0 : nBytes - 1;
      var d = isLE ? 1 : -1;
      var s = value < 0 || 0 === value && 1 / value < 0 ? 1 : 0;
      value = Math.abs(value);
      if (isNaN(value) || Infinity === value) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
      } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }
        value += e + eBias >= 1 ? rt / c : rt * Math.pow(2, 1 - eBias);
        if (value * c >= 2) {
          e++;
          c /= 2;
        }
        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * Math.pow(2, mLen);
          e += eBias;
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e = 0;
        }
      }
      for (;mLen >= 8; buffer[offset + i] = 255 & m, i += d, m /= 256, mLen -= 8) ;
      e = e << mLen | m;
      eLen += mLen;
      for (;eLen > 0; buffer[offset + i] = 255 & e, i += d, e /= 256, eLen -= 8) ;
      buffer[offset + i - d] |= 128 * s;
    };
  }, {} ],
  5: [ function(require, module, exports) {
    (function(process) {
      function normalizeArray(parts, allowAboveRoot) {
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i];
          if ("." === last) parts.splice(i, 1); else if (".." === last) {
            parts.splice(i, 1);
            up++;
          } else if (up) {
            parts.splice(i, 1);
            up--;
          }
        }
        if (allowAboveRoot) for (;up--; up) parts.unshift("..");
        return parts;
      }
      var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
      var splitPath = function(filename) {
        return splitPathRe.exec(filename).slice(1);
      };
      exports.resolve = function() {
        var resolvedPath = "", resolvedAbsolute = false;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = i >= 0 ? arguments[i] : process.cwd();
          if ("string" !== typeof path) throw new TypeError("Arguments to path.resolve must be strings");
          if (!path) continue;
          resolvedPath = path + "/" + resolvedPath;
          resolvedAbsolute = "/" === path.charAt(0);
        }
        resolvedPath = normalizeArray(filter(resolvedPath.split("/"), function(p) {
          return !!p;
        }), !resolvedAbsolute).join("/");
        return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
      };
      exports.normalize = function(path) {
        var isAbsolute = exports.isAbsolute(path), trailingSlash = "/" === substr(path, -1);
        path = normalizeArray(filter(path.split("/"), function(p) {
          return !!p;
        }), !isAbsolute).join("/");
        path || isAbsolute || (path = ".");
        path && trailingSlash && (path += "/");
        return (isAbsolute ? "/" : "") + path;
      };
      exports.isAbsolute = function(path) {
        return "/" === path.charAt(0);
      };
      exports.join = function() {
        var paths = Array.prototype.slice.call(arguments, 0);
        return exports.normalize(filter(paths, function(p, index) {
          if ("string" !== typeof p) throw new TypeError("Arguments to path.join must be strings");
          return p;
        }).join("/"));
      };
      exports.relative = function(from, to) {
        from = exports.resolve(from).substr(1);
        to = exports.resolve(to).substr(1);
        function trim(arr) {
          var start = 0;
          for (;start < arr.length; start++) if ("" !== arr[start]) break;
          var end = arr.length - 1;
          for (;end >= 0; end--) if ("" !== arr[end]) break;
          if (start > end) return [];
          return arr.slice(start, end - start + 1);
        }
        var fromParts = trim(from.split("/"));
        var toParts = trim(to.split("/"));
        var length = Math.min(fromParts.length, toParts.length);
        var samePartsLength = length;
        for (var i = 0; i < length; i++) if (fromParts[i] !== toParts[i]) {
          samePartsLength = i;
          break;
        }
        var outputParts = [];
        for (var i = samePartsLength; i < fromParts.length; i++) outputParts.push("..");
        outputParts = outputParts.concat(toParts.slice(samePartsLength));
        return outputParts.join("/");
      };
      exports.sep = "/";
      exports.delimiter = ":";
      exports.dirname = function(path) {
        var result = splitPath(path), root = result[0], dir = result[1];
        if (!root && !dir) return ".";
        dir && (dir = dir.substr(0, dir.length - 1));
        return root + dir;
      };
      exports.basename = function(path, ext) {
        var f = splitPath(path)[2];
        ext && f.substr(-1 * ext.length) === ext && (f = f.substr(0, f.length - ext.length));
        return f;
      };
      exports.extname = function(path) {
        return splitPath(path)[3];
      };
      function filter(xs, f) {
        if (xs.filter) return xs.filter(f);
        var res = [];
        for (var i = 0; i < xs.length; i++) f(xs[i], i, xs) && res.push(xs[i]);
        return res;
      }
      var substr = "b" === "ab".substr(-1) ? function(str, start, len) {
        return str.substr(start, len);
      } : function(str, start, len) {
        start < 0 && (start = str.length + start);
        return str.substr(start, len);
      };
    }).call(this, require("_process"));
  }, {
    _process: 6
  } ],
  6: [ function(require, module, exports) {
    var process = module.exports = {};
    var cachedSetTimeout;
    var cachedClearTimeout;
    function defaultSetTimout() {
      throw new Error("setTimeout has not been defined");
    }
    function defaultClearTimeout() {
      throw new Error("clearTimeout has not been defined");
    }
    (function() {
      try {
        cachedSetTimeout = "function" === typeof setTimeout ? setTimeout : defaultSetTimout;
      } catch (e) {
        cachedSetTimeout = defaultSetTimout;
      }
      try {
        cachedClearTimeout = "function" === typeof clearTimeout ? clearTimeout : defaultClearTimeout;
      } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
      }
    })();
    function runTimeout(fun) {
      if (cachedSetTimeout === setTimeout) return setTimeout(fun, 0);
      if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
      }
      try {
        return cachedSetTimeout(fun, 0);
      } catch (e) {
        try {
          return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
          return cachedSetTimeout.call(this, fun, 0);
        }
      }
    }
    function runClearTimeout(marker) {
      if (cachedClearTimeout === clearTimeout) return clearTimeout(marker);
      if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
      }
      try {
        return cachedClearTimeout(marker);
      } catch (e) {
        try {
          return cachedClearTimeout.call(null, marker);
        } catch (e) {
          return cachedClearTimeout.call(this, marker);
        }
      }
    }
    var queue = [];
    var draining = false;
    var currentQueue;
    var queueIndex = -1;
    function cleanUpNextTick() {
      if (!draining || !currentQueue) return;
      draining = false;
      currentQueue.length ? queue = currentQueue.concat(queue) : queueIndex = -1;
      queue.length && drainQueue();
    }
    function drainQueue() {
      if (draining) return;
      var timeout = runTimeout(cleanUpNextTick);
      draining = true;
      var len = queue.length;
      while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) currentQueue && currentQueue[queueIndex].run();
        queueIndex = -1;
        len = queue.length;
      }
      currentQueue = null;
      draining = false;
      runClearTimeout(timeout);
    }
    process.nextTick = function(fun) {
      var args = new Array(arguments.length - 1);
      if (arguments.length > 1) for (var i = 1; i < arguments.length; i++) args[i - 1] = arguments[i];
      queue.push(new Item(fun, args));
      1 !== queue.length || draining || runTimeout(drainQueue);
    };
    function Item(fun, array) {
      this.fun = fun;
      this.array = array;
    }
    Item.prototype.run = function() {
      this.fun.apply(null, this.array);
    };
    process.title = "browser";
    process.browser = true;
    process.env = {};
    process.argv = [];
    process.version = "";
    process.versions = {};
    function noop() {}
    process.on = noop;
    process.addListener = noop;
    process.once = noop;
    process.off = noop;
    process.removeListener = noop;
    process.removeAllListeners = noop;
    process.emit = noop;
    process.prependListener = noop;
    process.prependOnceListener = noop;
    process.listeners = function(name) {
      return [];
    };
    process.binding = function(name) {
      throw new Error("process.binding is not supported");
    };
    process.cwd = function() {
      return "/";
    };
    process.chdir = function(dir) {
      throw new Error("process.chdir is not supported");
    };
    process.umask = function() {
      return 0;
    };
  }, {} ],
  EnemyBase: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "58209WJQMdNQaHaUc2I4NhK", "EnemyBase");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        enemyName: "",
        cardinalNum: 0,
        spawningRate: {
          get: function get() {
            return this._spawningRate;
          },
          set: function set(value) {
            this._spawningRate = value;
          }
        },
        killMsg: "金币: + "
      },
      onGetCatched: function onGetCatched() {}
    });
    cc._RF.pop();
  }, {} ],
  Enemy_Multi: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fb6actPSk9Nir0Detmnk4u7", "Enemy_Multi");
    "use strict";
    var enemyBase = require("EnemyBase");
    var flags = require("GameFlags");
    cc.Class({
      extends: enemyBase,
      properties: {
        multiNum: 1,
        catchingRate: {
          get: function get() {
            return this._catchingRate;
          },
          set: function set(value) {
            this._catchingRate = value;
          }
        }
      },
      onLoad: function onLoad() {
        NOTIFICATION.on(flags.ENEMY_GET_CAUGHT, this.onGetCatched, this);
        NOTIFICATION.on(flags.ENEMY_GET_ESCAPED, this.onGetEscaped, this);
      },
      start: function start() {
        this.variablesInit();
      },
      variablesInit: function variablesInit() {
        this.catchingRate = 1 / this.multiNum;
      },
      onGetCatched: function onGetCatched(event) {
        var tarName = event.msg;
        var selfName = this.enemyName;
        if (tarName.toLowerCase() === selfName.toLowerCase()) {
          console.log("enemy: " + selfName + " get caught!");
          NOTIFICATION.emit(flags.ENEMY_ESCAPED_TREASURE_MINUS);
          NOTIFICATION.emit(flags.ENEMY_CAUGHT_TREASURE_ADD, {
            multiNum: this.multiNum,
            enemyName: selfName,
            killMsg: this.killMsg
          });
        }
      },
      onGetEscaped: function onGetEscaped(event) {
        var tarName = event.msg;
        var selfName = this.enemyName;
        if (tarName.toLowerCase() === selfName.toLowerCase()) {
          console.log("enemy: " + selfName + " get escaped!");
          NOTIFICATION.emit(flags.ENEMY_ESCAPED_TREASURE_MINUS);
        }
      }
    });
    cc._RF.pop();
  }, {
    EnemyBase: "EnemyBase",
    GameFlags: "GameFlags"
  } ],
  Enemy_NonMulti: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "28682P+lOxNiJf4gkrbNvLg", "Enemy_NonMulti");
    "use strict";
    var enemyBase = require("EnemyBase");
    cc.Class({
      extends: enemyBase,
      properties: {},
      onGetCatched: function onGetCatched() {
        enemyBase.prototype.onGetCatched.call(this);
      }
    });
    cc._RF.pop();
  }, {
    EnemyBase: "EnemyBase"
  } ],
  EnterRoom: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5a2a9nFGh1BBrUu2tK8xRvE", "EnterRoom");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: function properties() {
        return {
          _gameControl: {
            default: null,
            type: require("GameController"),
            visible: true
          },
          _gameModel: {
            default: null,
            type: require("GameModel"),
            visible: true
          },
          _mallModel: {
            default: null,
            type: require("MallModel"),
            visible: true
          },
          label_HowMuchLackOf: cc.Label,
          label_RecoRechargeValue: cc.Label,
          label_CostRMB: cc.Label,
          gamePlayPanel: cc.Node,
          enterRoomPanel: cc.Node,
          lackOfTreasurePanel: cc.Node
        };
      },
      start: function start() {
        this.hasInited = false;
        this.howMuchLackOf = 0;
        this.recoRechargeValue = 0;
        this.costRMB = 0;
      },
      onChooseRoomToEnter: function onChooseRoomToEnter(event, customEventData) {
        var curTreasure = this._gameModel.curTreasure;
        var allowedTreasure = customEventData;
        if (curTreasure < allowedTreasure) {
          console.log(cc.js.formatStr("lack of treasure, curTreasure: %s, allowedTreasure: %s", curTreasure, allowedTreasure));
          this.onLackOfTreasure(Math.abs(curTreasure - allowedTreasure));
        } else {
          console.log(cc.js.formatStr("enough treasure, curTreasure: %s, allowedTreasure: %s", curTreasure, allowedTreasure));
          this.onEnterRoom();
        }
      },
      onLackOfTreasure: function onLackOfTreasure(reduction) {
        this.lackOfTreasurePanel.active = true;
        var howMuchLackOf = reduction;
        this.label_HowMuchLackOf.string = this.label_HowMuchLackOf.string.replace(this.hasInited ? this.howMuchLackOf : "value", howMuchLackOf);
        this.howMuchLackOf = howMuchLackOf;
        var voucherArray = [];
        var recoRechargeVoucherIndex = void 0;
        voucherArray = this._mallModel.voucherValuesArray;
        for (var i = 0; i < voucherArray.length; i++) if (voucherArray[i].redeem_Treasure > this.howMuchLackOf / 1e4) {
          console.log(cc.js.formatStr("redeem_Treasure: %s, howMuchLackOf: %s", voucherArray[i].redeem_Treasure, this.howMuchLackOf / 1e4));
          recoRechargeVoucherIndex = i;
          break;
        }
        this.label_RecoRechargeValue.string = this.label_RecoRechargeValue.string.replace(this.hasInited ? this.recoRechargeValue : "value", voucherArray[recoRechargeVoucherIndex].redeem_Treasure);
        this.recoRechargeValue = voucherArray[recoRechargeVoucherIndex].redeem_Treasure;
        this.label_CostRMB.string = this.label_CostRMB.string.replace(this.hasInited ? this.costRMB : "value", voucherArray[recoRechargeVoucherIndex].price_rmb);
        this.costRMB = voucherArray[recoRechargeVoucherIndex].price_rmb;
        this.hasInited = true;
      },
      onEnterRoom: function onEnterRoom() {
        this.enterRoomPanel.active = false;
        this.lackOfTreasurePanel.active = false;
        this.gamePlayPanel.active = true;
      },
      onExitRechargeEntry: function onExitRechargeEntry() {
        this.lackOfTreasurePanel.active = false;
      },
      onFastRecharge: function onFastRecharge() {
        var newTreasure = this._gameModel.curTreasure + 1e4 * this.recoRechargeValue;
        this._gameControl.updateTreasureOnController(newTreasure);
        this._gameControl.updateValuesOnModel();
        this._gameControl.updateValuesOnView();
        this.onExitRechargeEntry();
      }
    });
    cc._RF.pop();
  }, {
    GameController: "GameController",
    GameModel: "GameModel",
    MallModel: "MallModel"
  } ],
  GameController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0350dfeqNRDVbvBnA5W49AB", "GameController");
    "use strict";
    var flags = require("GameFlags");
    cc.Class({
      extends: cc.Component,
      editor: {
        executionOrder: -1
      },
      properties: function properties() {
        return {
          _gameModel: {
            default: null,
            type: require("GameModel"),
            visible: true
          },
          _gameView: {
            default: null,
            type: require("GameView"),
            visible: true
          },
          _mallController: {
            default: null,
            type: require("MallController"),
            visible: true
          },
          gamePanelBlock: {
            default: null,
            type: cc.Node
          },
          curVoucherPoint: {
            get: function get() {
              return this._curVoucherPoint;
            },
            visible: false
          },
          curTreasure: {
            get: function get() {
              return this._curTreasure;
            },
            visible: false
          },
          curMag: {
            get: function get() {
              return this._curMag;
            },
            visible: false
          },
          magInterval: {
            get: function get() {
              return this._magInterval;
            },
            visible: false
          },
          treasurePerPoint: {
            get: function get() {
              return this._treasurePerPoint;
            },
            visible: false
          },
          isPlaying: {
            default: false,
            visible: false
          }
        };
      },
      onLoad: function onLoad() {
        this.eventsRegistration();
        this.initValuesOnController();
      },
      onEnable: function onEnable() {
        this.updateValuesOnModel();
        this.updateValuesOnView();
      },
      onDisable: function onDisable() {
        this.eventsDeRegistration();
      },
      initValuesOnController: function initValuesOnController() {
        this.updateVoucherPointOnController(this._gameModel.curVoucherPoint);
        this.updateTreasureOnController(this._gameModel.curTreasure);
        this.updateMagOnController(this._gameModel.curMag);
        this.updateMagIntervalOnController(this._gameModel.magInterval);
        this.updateTreasurePerPointOnController(this._gameModel.treasurePerPoint);
      },
      eventsRegistration: function eventsRegistration() {
        NOTIFICATION.on(flags.GAME_HIT_MAIN, this.onHitMainButton, this);
        NOTIFICATION.on(flags.MAG_ADD, this.onMagAdded, this);
        NOTIFICATION.on(flags.MAG_MINUS, this.onMagMinus, this);
        NOTIFICATION.on(flags.ENEMY_CATCH_ATTEMPT, this.onCatchAttempt, this);
        NOTIFICATION.on(flags.ENEMY_CAUGHT_TREASURE_ADD, this.onTreasureAdded_CaughtEnemy, this);
        NOTIFICATION.on(flags.ENEMY_ESCAPED_TREASURE_MINUS, this.onTreasureMinus_LostEnemy, this);
        NOTIFICATION.on(flags.USER_RECHARGE_TREASURE_ADD, this.onTreasureAdded_Recharge, this);
        NOTIFICATION.on(flags.GAME_2_MALL, this.onGameToMall, this);
      },
      eventsDeRegistration: function eventsDeRegistration() {
        NOTIFICATION.off(flags.GAME_HIT_MAIN, this.onHitMainButton, this);
        NOTIFICATION.off(flags.MAG_ADD, this.onMagAdded, this);
        NOTIFICATION.off(flags.MAG_MINUS, this.onMagMinus, this);
        NOTIFICATION.off(flags.ENEMY_CATCH_ATTEMPT, this.onCatchAttempt, this);
        NOTIFICATION.off(flags.ENEMY_CAUGHT_TREASURE_ADD, this.onTreasureAdded_CaughtEnemy, this);
        NOTIFICATION.off(flags.ENEMY_ESCAPED_TREASURE_MINUS, this.onTreasureMinus_LostEnemy, this);
        NOTIFICATION.off(flags.USER_RECHARGE_TREASURE_ADD, this.onTreasureAdded_Recharge, this);
        NOTIFICATION.off(flags.GAME_2_MALL, this.onGameToMall, this);
      },
      onGameToMall: function onGameToMall() {
        if (true === this.isPlaying) {
          this.isPlaying = false;
          this.onPauseHangingUp();
          this._gameView.onHitPauseButton();
        }
        this.gamePanelBlock.active = false;
        this._mallController.onGameToMall({
          voucherPoint: this.curVoucherPoint
        });
      },
      onMallToGame: function onMallToGame() {
        this.gamePanelBlock.active = true;
        this.updateValuesOnModel();
        this.updateValuesOnView();
      },
      onHitMainButton: function onHitMainButton() {
        if (false === this.isPlaying) {
          this.isPlaying = !this.isPlaying;
          this.onStartHangingUp();
          this._gameView.onHitPlayButton();
        } else {
          this.isPlaying = !this.isPlaying;
          this.onPauseHangingUp();
          this._gameView.onHitPauseButton();
        }
      },
      onStartHangingUp: function onStartHangingUp() {
        this._gameModel.startHangingUp();
      },
      onPauseHangingUp: function onPauseHangingUp() {
        this._gameModel.pauseHangingUp();
      },
      onTreasureAdded_CaughtEnemy: function onTreasureAdded_CaughtEnemy(event) {
        var addingValue = event.multiNum * this.curMag;
        console.log("Treasure += " + addingValue);
        this.updateTreasureOnController(this.curTreasure + addingValue);
        this.updateValuesOnModel();
        this.updateValuesOnView();
        var attackObj = event.enemyName;
        var result = event.killMsg + addingValue;
        var msg = {
          attackObj: attackObj,
          result: result
        };
        this.updateScrollViewOnView(msg);
      },
      onTreasureMinus_LostEnemy: function onTreasureMinus_LostEnemy() {
        if (this.curTreasure <= 0 || this.curTreasure - this.curMag < 0) {
          this._gameModel.pauseHangingUp();
          this._gameView.onRunningOutofTreasure();
          console.log("Run out of all your treasure, need to recharge!");
          return;
        }
        var minusValue = this.curMag;
        console.log("Treasure -= " + minusValue);
        this.updateTreasureOnController(this.curTreasure - minusValue);
        this.updateValuesOnModel();
        this.updateValuesOnView();
      },
      onTreasureAdded_Recharge: function onTreasureAdded_Recharge(event) {
        var increment = event.increment;
        this.updateTreasureOnController(this.curTreasure + increment);
        console.log(cc.js.formatStr("GameController.curTreasure: %s", this.curTreasure));
      },
      onCatchAttempt: function onCatchAttempt() {
        this._gameView.setCatchingMinusInfo(this.curMag);
      },
      onMagAdded: function onMagAdded() {
        console.log("onMagAdded, interval: " + this.magInterval);
        this.check_MagInterval();
        if (1e3 === this.curMag) {
          this.updateMagOnController(1);
          this.updateMagIntervalOnController(1);
        } else this.updateMagOnController(this.curMag + this.magInterval);
        this.updateValuesOnModel();
        this.updateValuesOnView();
      },
      onMagMinus: function onMagMinus() {
        console.log("onMagMinus, interval: " + this.magInterval);
        this.check_MagInterval();
        if (1 === this.curMag) {
          this.updateMagOnController(1e3);
          this.updateMagIntervalOnController(100);
        } else {
          this.updateMagOnController(this.curMag - this.magInterval);
          0 === this.curMag && this.updateMagOnController(1);
        }
        this.updateValuesOnModel();
        this.updateValuesOnView();
      },
      check_MagInterval: function check_MagInterval(isAdding) {
        this.curMag >= 1 && this.curMag < 10 ? this.updateMagIntervalOnController(1) : this.curMag >= 10 && this.curMag < 100 ? this.updateMagIntervalOnController(10) : this.curMag >= 100 && this.curMag < 1e3 && this.updateMagIntervalOnController(100);
      },
      updateValuesOnModel: function updateValuesOnModel() {
        this._gameModel.setNewMagInterval(this.magInterval);
        this._gameModel.setNewMag(this.curMag);
        this._gameModel.setNewTreasure(this.curTreasure);
      },
      updateValuesOnView: function updateValuesOnView() {
        this._gameView.setNewMag(this.curMag);
        this._gameView.setNewTreasure(this.curTreasure);
      },
      updateScrollViewOnView: function updateScrollViewOnView(msg) {
        this._gameView.onScrollViewVicItemAdded(msg);
      },
      updateVoucherPointOnController: function updateVoucherPointOnController(tarVoucherPoint) {
        this._curVoucherPoint = tarVoucherPoint;
      },
      updateTreasureOnController: function updateTreasureOnController(tarTreasure) {
        this._curTreasure = tarTreasure;
      },
      updateMagOnController: function updateMagOnController(tarMagValue) {
        this._curMag = tarMagValue;
      },
      updateMagIntervalOnController: function updateMagIntervalOnController(tarMagInterval) {
        this._magInterval = tarMagInterval;
      },
      updateTreasurePerPointOnController: function updateTreasurePerPointOnController(tarTreasurePerPoint) {
        this._treasurePerPoint = tarTreasurePerPoint;
      }
    });
    cc._RF.pop();
  }, {
    GameFlags: "GameFlags",
    GameModel: "GameModel",
    GameView: "GameView",
    MallController: "MallController"
  } ],
  GameFlags: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ebc96pbJOVDzoC7K+W40aCZ", "GameFlags");
    "use strict";
    module.exports = {
      GAME_HIT_MAIN: "Game_Hit_Main",
      MAG_ADD: "Mag_ADD",
      MAG_MINUS: "Mag_Minus",
      ENEMY_CATCH_ATTEMPT: "Enemy_CatchAttempt",
      ENEMY_GET_CAUGHT: "Enemy_GetCaught",
      ENEMY_GET_ESCAPED: "Enemy_GetEscaped",
      ENEMY_CAUGHT_TREASURE_ADD: "Enemy_Caught_Treasure_Add",
      ENEMY_ESCAPED_TREASURE_MINUS: "Enemy_Escaped_Treasure_Minus",
      USER_RECHARGE_TREASURE_ADD: "User_Recharge_Treasure_Add",
      GAME_2_MALL: "GameToMall"
    };
    cc._RF.pop();
  }, {} ],
  GameModel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0b679Y7Wu9MQIwe/wkv+cj8", "GameModel");
    "use strict";
    var enemyBase = require("EnemyBase");
    var flags = require("GameFlags");
    cc.Class({
      extends: cc.Component,
      editor: {
        executionOrder: -2
      },
      properties: function properties() {
        return {
          catchActionInterval: 2,
          curVoucherPoint: {
            get: function get() {
              return this._curVoucherPoint;
            },
            visible: false
          },
          curTreasure: {
            get: function get() {
              return this._curTreasure;
            },
            visible: false
          },
          curMag: {
            get: function get() {
              return this._curMag;
            },
            visible: false
          },
          magInterval: {
            get: function get() {
              return this._magInterval;
            },
            visible: false
          },
          treasurePerPoint: {
            get: function get() {
              return this._treasurePerPoint;
            },
            visible: false
          },
          enemies: {
            default: [],
            type: [ enemyBase ]
          },
          curEnemyIndex: {
            default: 0,
            visible: false
          },
          totalCardinal: {
            default: 0,
            visible: false
          }
        };
      },
      onLoad: function onLoad() {
        this.gameValuesInit();
      },
      start: function start() {
        this.selection_sort();
        for (var i = 0; i < this.enemies.length; i++) console.log(this.enemies[i].enemyName + ": " + this.enemies[i].cardinalNum);
        for (var _i = 0; _i < this.enemies.length; _i++) this.totalCardinal += this.enemies[_i].cardinalNum;
        for (var _i2 = 0; _i2 < this.enemies.length; _i2++) {
          this.enemies[_i2].spawningRate = this.enemies[_i2].cardinalNum / this.totalCardinal;
          _i2 > 0 && (this.enemies[_i2].spawningRate += this.enemies[_i2 - 1].spawningRate);
          console.log(this.enemies[_i2].enemyName + "'s spawningRange: " + this.enemies[_i2].spawningRate);
        }
      },
      startHangingUp: function startHangingUp() {
        this.schedule(this.onStartSpawning, this.catchActionInterval);
      },
      pauseHangingUp: function pauseHangingUp() {
        this.unschedule(this.onStartSpawning, this);
      },
      onStartSpawning: function onStartSpawning() {
        this.enemySpawner();
        this.enemyCatcher();
      },
      enemySpawner: function enemySpawner() {
        var calcSpawningRate = cc.random0To1();
        for (var i = 0; i < this.enemies.length; i++) if (calcSpawningRate <= this.enemies[i].spawningRate) {
          this.curEnemyIndex = i;
          break;
        }
        console.log("CalcSpawningNum: " + calcSpawningRate + ", spawned enemy: " + this.enemies[this.curEnemyIndex].enemyName);
      },
      enemyCatcher: function enemyCatcher() {
        var calcCatchingRate = Math.random();
        var enemyCatchingRate = this.enemies[this.curEnemyIndex].catchingRate;
        console.log("CalcCatchingRate: " + calcCatchingRate + ", RealCatchingRate: " + enemyCatchingRate);
        calcCatchingRate <= enemyCatchingRate ? NOTIFICATION.emit(flags.ENEMY_GET_CAUGHT, {
          msg: this.enemies[this.curEnemyIndex].enemyName
        }) : NOTIFICATION.emit(flags.ENEMY_GET_ESCAPED, {
          msg: this.enemies[this.curEnemyIndex].enemyName
        });
        NOTIFICATION.emit(flags.ENEMY_CATCH_ATTEMPT, {
          msg: this.enemies[this.curEnemyIndex].enemyName
        });
      },
      setNewTreasure: function setNewTreasure(newTreasure) {
        this._curTreasure = newTreasure;
      },
      setNewMag: function setNewMag(newMag) {
        this._curMag = newMag;
      },
      setNewMagInterval: function setNewMagInterval(newMagInterval) {
        this._magInterval = newMagInterval;
      },
      selection_sort: function selection_sort() {
        for (var i = 0; i < this.enemies.length; i++) {
          var minCardinal = this.enemies[i].cardinalNum;
          var minIndex = i;
          for (var j = i; j < this.enemies.length; j++) if (this.enemies[j].cardinalNum < minCardinal) {
            minCardinal = this.enemies[j].cardinalNum;
            minIndex = j;
          }
          if (minIndex != i) {
            var temp = this.enemies[minIndex];
            this.enemies[minIndex] = this.enemies[i];
            this.enemies[i] = temp;
          }
        }
      },
      gameValuesInit: function gameValuesInit() {
        this._curVoucherPoint = 50;
        this._curTreasure = 99;
        this._curMag = 1;
        this._magInterval = 1;
        this._treasurePerPoint = 2e3;
      }
    });
    cc._RF.pop();
  }, {
    EnemyBase: "EnemyBase",
    GameFlags: "GameFlags"
  } ],
  GameStatus: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "95150WEwx5Jjodm8qm/XYnq", "GameStatus");
    "use strict";
    window.GAME_START = "GameStart";
    window.GAME_PLAYING = "GamePlaying";
    window.GAME_OVER = "GameOver";
    window.GAME_PAUSED = "GamePaused";
    window.GAME_RESUME = "GameResume";
    window.GAME_RESTART = "GameRestart";
    window.SCORE_CHANGED = "ScoreChanged";
    window.STAR_DISAPPEARING = "StarDisappearing";
    window.PROGRESSBAR_FOLLOWSTAR = "ProgressBarFollowStar";
    cc._RF.pop();
  }, {} ],
  GameView: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "95832xA+JRA06IoXiV+/K2J", "GameView");
    "use strict";
    var Flags = require("GameFlags");
    var catchingMsgItemPool = require("CatchingMsgItemPool");
    cc.Class({
      extends: cc.Component,
      properties: {
        scrollView: {
          default: null,
          type: cc.ScrollView
        },
        scrollItemTotalCount: 0,
        scrollItemMaxCount: 30,
        catchingMinusInfo: {
          default: null,
          type: cc.Node
        },
        msgItemPoolController: {
          default: null,
          type: catchingMsgItemPool
        },
        itemTemplate: {
          default: null,
          type: cc.Prefab
        },
        lable_CurTreasureCount: {
          default: null,
          type: cc.Label
        },
        lable_MagnificationCount: {
          default: null,
          type: cc.Label
        },
        playButton: {
          default: null,
          type: cc.Button
        },
        playButtonSprites: {
          default: [],
          type: [ cc.SpriteFrame ]
        },
        pauseButtonSprites: {
          default: [],
          type: [ cc.SpriteFrame ]
        }
      },
      onLoad: function onLoad() {
        this.content = this.scrollView.content;
        this.items = [];
      },
      start: function start() {
        if (!this.catchingMinusInfo.active) {
          this.catchingMinusInfo.active = true;
          this.catchingMinusInfo.opacity = 0;
        }
      },
      setNewTreasure: function setNewTreasure(newTreasure) {
        this.lable_CurTreasureCount.string = newTreasure;
      },
      setNewMag: function setNewMag(newMag) {
        newMag != this.lable_MagnificationCount.string && (this.lable_MagnificationCount.string = newMag);
      },
      setCatchingMinusInfo: function setCatchingMinusInfo(curMagValue) {
        this.catchingMinusInfo.opacity = 255;
        this.catchingMinusInfo.runAction(cc.fadeOut(1));
        this.catchingMinusInfo.getChildByName("minusCount").getComponent(cc.Label).string = "-" + curMagValue.toString();
      },
      onHitPlayButton: function onHitPlayButton() {
        this.spriteChanged_PlayButton(this.pauseButtonSprites);
      },
      onHitPauseButton: function onHitPauseButton() {
        this.spriteChanged_PlayButton(this.playButtonSprites);
      },
      spriteChanged_PlayButton: function spriteChanged_PlayButton(spritesArray) {
        this.playButton.normalSprite = spritesArray[0];
        this.playButton.pressedSprite = spritesArray[1];
        this.playButton.hoverSprite = spritesArray[2];
        this.playButton.disabledSprite = spritesArray[3];
      },
      onScrollViewVicItemAdded: function onScrollViewVicItemAdded(msg) {
        if (this.scrollItemTotalCount >= this.msgItemPoolController.maxCount) {
          var first = this.items.shift();
          this.scrollItemTotalCount--;
          this.content.removeChild(first);
          this.msgItemPoolController.itemPool.put(first);
        }
        var item = null;
        if (!(this.msgItemPoolController.itemPool.size() > 0)) {
          console.log("no available item in itemPool!!!");
          return;
        }
        item = this.msgItemPoolController.itemPool.get();
        console.log("get available item from itemPool");
        this.content.addChild(item);
        this.items.push(item);
        this.content.height = (this.scrollItemTotalCount + 1) * item.height + item.height;
        this.scrollItemTotalCount++;
        item.getChildByName("attackObj").getComponent(cc.Label).string = msg.attackObj;
        item.getChildByName("result").getComponent(cc.Label).string = msg.result;
        console.log("attackObj: " + msg.attackObj + ", result: " + msg.result + ", itemCount: " + this.items.length);
      },
      onRunningOutofTreasure: function onRunningOutofTreasure() {
        this.spriteChanged_PlayButton(this.playButtonSprites);
        this.playButton.interactable = false;
      }
    });
    cc._RF.pop();
  }, {
    CatchingMsgItemPool: "CatchingMsgItemPool",
    GameFlags: "GameFlags"
  } ],
  Game: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2625f1dGW5NaIUbQBvi3Jqz", "Game");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        reloadOnGameOver: false,
        readyToPlay: false,
        startPrefab: {
          default: null,
          type: cc.Prefab
        },
        starLife_MaxDuration: 0,
        starLife_MinDuration: 0,
        ground: {
          default: null,
          type: cc.Node
        },
        player: {
          default: null,
          type: cc.Node
        },
        scoreAudio: {
          default: null,
          url: cc.AudioClip
        }
      },
      onEnable: function onEnable() {
        this.eventsRegistration();
      },
      onLoad: function onLoad() {
        this.varsInitOnLoad();
      },
      update: function update(dt) {
        if (!this.readyToPlay) return;
        if (this.elapsedTime > this.starLifeTime) {
          this.gameOver();
          return;
        }
        this.elapsedTime += dt;
        var progressValue = 1 - this.elapsedTime / this.starLifeTime;
        NOTIFICATION.emit(STAR_DISAPPEARING, {
          msg: progressValue.toString()
        });
      },
      onDisable: function onDisable() {
        this.eventsDeRegistration();
      },
      eventsRegistration: function eventsRegistration() {
        NOTIFICATION.on(GAME_START, this.onGameStart, this);
        NOTIFICATION.on(GAME_OVER, this.onGameOver, this);
        NOTIFICATION.on(GAME_PAUSED, this.onGamePaused, this);
        NOTIFICATION.on(GAME_RESUME, this.onGameResume, this);
        NOTIFICATION.on(GAME_RESTART, this.onGameRestart, this);
      },
      eventsDeRegistration: function eventsDeRegistration() {
        NOTIFICATION.off(GAME_START, this.onGameStart, this);
        NOTIFICATION.off(GAME_OVER, this.onGameOver, this);
        NOTIFICATION.off(GAME_PAUSED, this.onGamePaused, this);
        NOTIFICATION.off(GAME_RESUME, this.onGameResume, this);
        NOTIFICATION.off(GAME_RESTART, this.onGameRestart, this);
      },
      varsInitOnLoad: function varsInitOnLoad() {
        this.groundY = this.ground.y + this.ground.height / 2;
        this.elapsedTime = 0;
        this.starLifeTime = 0;
        this.score = 0;
      },
      onGameStart: function onGameStart() {
        this.starSpawner();
        this.readyToPlay = true;
        this.player.getComponent("Player").onGameStart();
      },
      onGameOver: function onGameOver() {
        this.readyToPlay = false;
        this.player.getComponent("Player").onGameOver();
      },
      onGamePaused: function onGamePaused() {
        this.readyToPlay = false;
        this.player.getComponent("Player").onGamePaused();
      },
      onGameResume: function onGameResume() {
        this.readyToPlay = true;
        this.player.getComponent("Player").onGameResume();
      },
      onGameRestart: function onGameRestart() {
        cc.director.loadScene("main");
      },
      starSpawner: function starSpawner() {
        var newStar = cc.instantiate(this.startPrefab);
        var starPos = this.getNewStarPosition();
        this.node.getChildByName("GamePlay").addChild(newStar);
        newStar.getComponent("Star").game = this;
        newStar.setPosition(starPos);
        NOTIFICATION.emit(PROGRESSBAR_FOLLOWSTAR, {
          pos: starPos
        });
        this.starLifeTime = this.starLife_MinDuration + cc.random0To1() * (this.starLife_MaxDuration - this.starLife_MinDuration);
        this.elapsedTime = 0;
      },
      getNewStarPosition: function getNewStarPosition() {
        var randX = 0;
        var randY = 0;
        randX = cc.randomMinus1To1() * this.node.width / 2;
        randY = this.groundY + cc.random0To1() * this.player.getComponent("Player").jumpHeight + 50;
        return cc.p(randX, randY);
      },
      gainScore: function gainScore() {
        this.score += 1;
        NOTIFICATION.emit(SCORE_CHANGED, {
          msg: this.score.toString()
        });
        cc.audioEngine.playEffect(this.scoreAudio, false);
      },
      gameOver: function gameOver() {
        NOTIFICATION.emit(GAME_OVER, {
          msg: "gameOver, trigger to call GAME_OVER event",
          score: this.score.toString()
        });
      }
    });
    cc._RF.pop();
  }, {} ],
  LoadingBarControl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ebf7dDNuNxFXpGOFP5VLJKj", "LoadingBarControl");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        loginBlock: cc.Node,
        loadingBlock: cc.Node,
        loadingBar: cc.ProgressBar,
        defaultLoadingText: "",
        loadingStatus: 0,
        label_LoadingInfo: cc.Label,
        loadingSpeed: 0,
        confirm_Update: cc.Node,
        isLoadingStatusChecked: {
          default: false,
          visible: false
        }
      },
      start: function start() {
        this.updateCheck();
      },
      update: function update(dt) {
        if (!this.isLoadingStatusChecked) return;
        this.updateLoadingInfo(dt);
      },
      updateCheck: function updateCheck() {
        var _this = this;
        var setDefaultText = cc.callFunc(function() {
          _this.loadingBar.progress = 0;
          _this.label_LoadingInfo.string = _this.defaultLoadingText;
        });
        var delay = cc.delayTime(1);
        var updateResultCheck = cc.callFunc(this.updateResultCheck.bind(this));
        this.node.runAction(cc.sequence(setDefaultText, delay, updateResultCheck));
      },
      updateResultCheck: function updateResultCheck() {
        this.isLoadingStatusChecked = true;
        console.log("trigger to enter update");
        switch (this.loadingStatus) {
         case 0:
          this.label_LoadingInfo.string = "游戏资源加载中，请稍候...";
          break;

         case 1:
          this.confirm_Update.active = true;
          this.isLoadingStatusChecked = false;
          this.label_LoadingInfo.string = "正在更新，请稍候...";
        }
      },
      updateLoadingInfo: function updateLoadingInfo(dt) {
        var progress = this.loadingBar.progress;
        progress += dt * this.loadingSpeed;
        this.loadingBar.progress = progress;
        if (this.loadingBar.progress >= 1) {
          console.log("loading, done");
          this.isLoadingStatusChecked = false;
          this.loadingBlock.active = false;
          this.loginBlock.active = true;
        }
      },
      onConfirmVersionUpdated: function onConfirmVersionUpdated() {
        if (this.confirm_Update.active) {
          this.confirm_Update.active = false;
          this.isLoadingStatusChecked = true;
        }
        console.log("confirm update");
      },
      onCancleVersionUpdated: function onCancleVersionUpdated() {
        if (this.confirm_Update.active) {
          this.confirm_Update.active = false;
          this.isLoadingStatusChecked = false;
        }
        console.log("cancled update");
      }
    });
    cc._RF.pop();
  }, {} ],
  MD5: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "868914o85RHebiOr5NH949l", "MD5");
    "use strict";
    var hexcase = 0;
    var b64pad = "";
    var chrsz = 8;
    function hex_md5(s) {
      return binl2hex(core_md5(str2binl(s), s.length * chrsz));
    }
    function b64_md5(s) {
      return binl2b64(core_md5(str2binl(s), s.length * chrsz));
    }
    function str_md5(s) {
      return binl2str(core_md5(str2binl(s), s.length * chrsz));
    }
    function hex_hmac_md5(key, data) {
      return binl2hex(core_hmac_md5(key, data));
    }
    function b64_hmac_md5(key, data) {
      return binl2b64(core_hmac_md5(key, data));
    }
    function str_hmac_md5(key, data) {
      return binl2str(core_hmac_md5(key, data));
    }
    function md5_vm_test() {
      return "900150983cd24fb0d6963f7d28e17f72" == hex_md5("abc");
    }
    function core_md5(x, len) {
      x[len >> 5] |= 128 << len % 32;
      x[14 + (len + 64 >>> 9 << 4)] = len;
      var a = 1732584193;
      var b = -271733879;
      var c = -1732584194;
      var d = 271733878;
      for (var i = 0; i < x.length; i += 16) {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;
        a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
        d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
        a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
        a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
        a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
        c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
        a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
        d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
      }
      return Array(a, b, c, d);
    }
    function md5_cmn(q, a, b, x, s, t) {
      return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
    }
    function md5_ff(a, b, c, d, x, s, t) {
      return md5_cmn(b & c | ~b & d, a, b, x, s, t);
    }
    function md5_gg(a, b, c, d, x, s, t) {
      return md5_cmn(b & d | c & ~d, a, b, x, s, t);
    }
    function md5_hh(a, b, c, d, x, s, t) {
      return md5_cmn(b ^ c ^ d, a, b, x, s, t);
    }
    function md5_ii(a, b, c, d, x, s, t) {
      return md5_cmn(c ^ (b | ~d), a, b, x, s, t);
    }
    function core_hmac_md5(key, data) {
      var bkey = str2binl(key);
      bkey.length > 16 && (bkey = core_md5(bkey, key.length * chrsz));
      var ipad = Array(16), opad = Array(16);
      for (var i = 0; i < 16; i++) {
        ipad[i] = 909522486 ^ bkey[i];
        opad[i] = 1549556828 ^ bkey[i];
      }
      var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
      return core_md5(opad.concat(hash), 640);
    }
    function safe_add(x, y) {
      var lsw = (65535 & x) + (65535 & y);
      var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return msw << 16 | 65535 & lsw;
    }
    function bit_rol(num, cnt) {
      return num << cnt | num >>> 32 - cnt;
    }
    function str2binl(str) {
      var bin = Array();
      var mask = (1 << chrsz) - 1;
      for (var i = 0; i < str.length * chrsz; i += chrsz) bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << i % 32;
      return bin;
    }
    function binl2str(bin) {
      var str = "";
      var mask = (1 << chrsz) - 1;
      for (var i = 0; i < 32 * bin.length; i += chrsz) str += String.fromCharCode(bin[i >> 5] >>> i % 32 & mask);
      return str;
    }
    function binl2hex(binarray) {
      var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
      var str = "";
      for (var i = 0; i < 4 * binarray.length; i++) str += hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 + 4 & 15) + hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 & 15);
      return str;
    }
    function binl2b64(binarray) {
      var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      var str = "";
      for (var i = 0; i < 4 * binarray.length; i += 3) {
        var triplet = (binarray[i >> 2] >> i % 4 * 8 & 255) << 16 | (binarray[i + 1 >> 2] >> (i + 1) % 4 * 8 & 255) << 8 | binarray[i + 2 >> 2] >> (i + 2) % 4 * 8 & 255;
        for (var j = 0; j < 4; j++) 8 * i + 6 * j > 32 * binarray.length ? str += b64pad : str += tab.charAt(triplet >> 6 * (3 - j) & 63);
      }
      return str;
    }
    module.exports = {
      hex_md5: hex_md5,
      b64_md5: b64_md5,
      str_md5: str_md5,
      hex_hmac_md5: hex_hmac_md5,
      b64_hmac_md5: b64_hmac_md5,
      str_hmac_md5: str_hmac_md5
    };
    cc._RF.pop();
  }, {} ],
  MallController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bb463WWNTNHg6tJvsIchv+j", "MallController");
    "use strict";
    var mallData_Purchase = cc.Class({
      name: "mall_DataSet",
      properties: {
        curTreasureAmount: 0,
        isAutoRedeem: false
      }
    });
    var mallData_Redeem = cc.Class({
      name: "mallData_Redeem",
      properties: {
        curTreasureAmount: 0,
        curVoucherPointAmount: 0,
        treasurePerPoint: 0
      }
    });
    var gameFlags = require("GameFlags");
    var mallFlags = require("MallFlags");
    cc.Class({
      extends: cc.Component,
      properties: function properties() {
        return {
          _gameControl: {
            default: null,
            type: require("GameController"),
            visible: true
          },
          _mallModel: {
            default: null,
            type: require("MallModel"),
            visible: true
          },
          _mallView: {
            default: null,
            type: require("MallView"),
            visible: true
          },
          mallPanel_PurchaseBlock: {
            default: null,
            type: cc.Node
          },
          mallPanel_RedeemBlock: {
            default: null,
            type: cc.Node
          },
          mallData_Purchase: {
            default: {},
            type: mallData_Purchase,
            visible: false
          },
          isPurchaseConfirming: {
            default: false,
            visible: false
          },
          scrollView: {
            default: null,
            type: cc.ScrollView
          },
          voucherItem: {
            default: null,
            type: cc.Prefab
          },
          voucherItemArray: {
            default: [],
            type: [ require("VoucherManager") ],
            visible: false
          },
          chosenIndex: {
            default: 0,
            visible: false
          }
        };
      },
      onLoad: function onLoad() {
        NOTIFICATION.on(mallFlags.MALL_CHOOSE_VOUCHER, this.onChooseVoucher, this);
        NOTIFICATION.on(mallFlags.MALL_2_GAME, this.onMallToGame, this);
        this.variablesInit();
      },
      onDisable: function onDisable() {
        NOTIFICATION.off(mallFlags.MALL_CHOOSE_VOUCHER, this.onChooseVoucher, this);
        NOTIFICATION.off(gameFlags.GAME_2_MALL, this.onGameToMall, this);
      },
      variablesInit: function variablesInit() {
        this.mallData_Purchase = {
          curTreasureAmount: "0",
          isAutoRedeem: false
        };
        this.mallData_Redeem = {
          curTreasureAmount: "0",
          curVoucherPointAmount: "0",
          treasurePerPoint: "0"
        };
      },
      onGameToMall: function onGameToMall(event) {
        this.init();
        if (event.voucherPoint > 0) this.enterRedeemBlock(); else {
          if (0 !== event.voucherPoint) {
            console.log("illegal voucher point!");
            return;
          }
          this.enterPurchaseBlock();
        }
      },
      init: function init() {
        this.mallData_Purchase.curTreasureAmount = this._gameControl.curTreasure;
        this.mallData_Purchase.isAutoRedeem = this._mallModel.isAutoRedeem;
        this.mallData_Redeem.curTreasureAmount = this._gameControl.curTreasure;
        this.mallData_Redeem.curVoucherPointAmount = this._gameControl.curVoucherPoint;
        this.mallData_Redeem.treasurePerPoint = this._gameControl.treasurePerPoint;
      },
      enterPurchaseBlock: function enterPurchaseBlock() {
        this.init();
        this.mallPanel_PurchaseBlock.active = true;
        this.mallPanel_RedeemBlock.active = false;
        this.init_PurchaseVoucherPanel();
        this._mallView.init_PurchaseBlock(this.mallData_Purchase);
      },
      init_PurchaseVoucherPanel: function init_PurchaseVoucherPanel() {
        if (this.voucherItemArray.length > 0) {
          console.log("voucherContent has already been inited");
          return;
        }
        this.content = this.scrollView.content;
        this.voucherValuesArray = this._mallModel.voucherValuesArray;
        for (var i = 0; i < this._mallModel.voucherValuesArray.length; i++) {
          var item = cc.instantiate(this.voucherItem);
          this.content.addChild(item);
          this.voucherItemArray.push(item.getComponent("VoucherManager"));
        }
        for (var _i = 0; _i < this.voucherItemArray.length; _i++) this.voucherItemArray[_i].setVoucherValues(_i, this.voucherValuesArray[_i]);
      },
      enterRedeemBlock: function enterRedeemBlock() {
        this.init();
        this.mallPanel_RedeemBlock.active = true;
        this.mallPanel_PurchaseBlock.active = false;
        this._mallModel.init_RedeemBlock(this.mallData_Redeem);
        this._mallView.init_RedeemBlock(this.mallData_Redeem);
      },
      onMallToGame: function onMallToGame() {
        this.mallPanel_PurchaseBlock.active = false;
        this.mallPanel_RedeemBlock.active = false;
        this._gameControl.onMallToGame();
      },
      onSwitchMallBlock: function onSwitchMallBlock() {
        if (this.mallPanel_PurchaseBlock.active) {
          if (this._gameControl.curVoucherPoint <= 0) {
            this._mallView.activateLackOfVoucherPanel();
            return;
          }
          this.enterRedeemBlock();
        } else this.mallPanel_RedeemBlock.active && this.enterPurchaseBlock();
      },
      redeemVoucherPoint: function redeemVoucherPoint() {
        var voucherPoint_Purchased = this.voucherItemArray[this.chosenIndex].getVoucherValues().voucherAmount;
        this.mallData_Redeem.curVoucherPointAmount += voucherPoint_Purchased;
        this._gameControl.updateVoucherPointOnController(this.mallData_Redeem.curVoucherPointAmount);
        this._mallView.updateCurVoucherPointAmount(this.mallData_Redeem.curVoucherPointAmount);
        console.log(this.mallData_Redeem.curVoucherPointAmount);
      },
      redeemTreasure: function redeemTreasure() {
        if (!this._mallView.toggle_AutoRedeem_Purchase) return;
        var increment = this.voucherItemArray[this.chosenIndex].getVoucherValues().redeem_Treasure;
        var curTreasure = this._gameControl.curTreasure;
        var newTreasure = curTreasure + 1e4 * increment;
        this._mallView.updateTreasureAmount(newTreasure);
        NOTIFICATION.emit(gameFlags.USER_RECHARGE_TREASURE_ADD, {
          increment: 1e4 * increment
        });
      },
      redeemVIP: function redeemVIP() {},
      deductRMB: function deductRMB() {},
      resetPurchase: function resetPurchase() {
        this.isPurchaseConfirming = false;
        this.chosenIndex = 0;
      },
      onChooseVoucher: function onChooseVoucher(event) {
        if (true === this.isPurchaseConfirming) return;
        this.isPurchaseConfirming = true;
        this.chosenIndex = event.index;
        var voucherAmount = this.voucherItemArray[this.chosenIndex].getVoucherValues().voucherAmount;
        var redeem_Treasure = this.voucherItemArray[this.chosenIndex].getVoucherValues().redeem_Treasure;
        var redeem_vipDays = this.voucherItemArray[this.chosenIndex].getVoucherValues().redeem_vipDays;
        var price_rmb = this.voucherItemArray[this.chosenIndex].getVoucherValues().price_rmb;
        console.log(cc.js.formatStr("index: %s, voucherAmount: %s, treasure: %s, vip: %s days, price: %s rmb", this.chosenIndex, voucherAmount, redeem_Treasure, redeem_vipDays, price_rmb));
        this._mallView.activateConfirmPanel();
      },
      onConfirmPurchasing: function onConfirmPurchasing() {
        if (false === this.isPurchaseConfirming) return;
        if (this._mallView.toggle_AutoRedeem_Purchase.isChecked) {
          console.log("autoRedeem");
          this.redeemTreasure();
        } else this.redeemVoucherPoint();
        this.redeemVIP();
        this.deductRMB();
        this._mallView.deactivateConfirmPanel();
        this.resetPurchase();
      },
      onCanclePurchasing: function onCanclePurchasing() {
        this.resetPurchase();
      },
      onSliderEvent: function onSliderEvent(sender, eventType) {
        var curRedeemAmount = Math.floor(this.mallData_Redeem.curVoucherPointAmount * sender.progress);
        curRedeemAmount <= 0 && (curRedeemAmount = 1);
        this._mallModel.updateRedeemVoucherAmount(curRedeemAmount);
        this._mallView.updateRedeemAmount(curRedeemAmount);
      },
      onConfrimRedeem: function onConfrimRedeem() {
        var curTreasure = this._gameControl.curTreasure;
        var increment = this._mallModel.redeemVoucherAmount * this._gameControl.treasurePerPoint;
        console.log(cc.js.formatStr("curTreasure: %s, redeemVoucherAmount: %s, treasurePerPoint: %s", curTreasure, this._mallModel.redeemVoucherAmount, this._gameControl.treasurePerPoint));
        this._gameControl.updateTreasureOnController(curTreasure + increment);
        this._gameControl.updateVoucherPointOnController(this.mallData_Redeem.curVoucherPointAmount - this._mallModel.redeemVoucherAmount);
        this._mallView.updateTreasureAmount(curTreasure + increment);
      },
      onExit: function onExit() {
        NOTIFICATION.emit(mallFlags.MALL_2_GAME);
      }
    });
    cc._RF.pop();
  }, {
    GameController: "GameController",
    GameFlags: "GameFlags",
    MallFlags: "MallFlags",
    MallModel: "MallModel",
    MallView: "MallView",
    VoucherManager: "VoucherManager"
  } ],
  MallFlags: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b5adfyz3XhIvrTDmm6U72JU", "MallFlags");
    "use strict";
    module.exports = {
      MALL_CHOOSE_VOUCHER: "Mall_Choose_Voucher",
      MALL_CONFIRM_PURCHASE: "Mall_Confirm_Purchase",
      MALL_2_GAME: "MallToGame"
    };
    cc._RF.pop();
  }, {} ],
  MallModel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f6fe8kbXgZCq4AL7sX08DoG", "MallModel");
    "use strict";
    var voucherValueStruct = cc.Class({
      name: "voucherValueStruct",
      properties: {
        voucherAmount: 0,
        redeem_Treasure: 0,
        redeem_vipDays: 0,
        price_rmb: 0
      }
    });
    var voucherItemSetting = require("VoucherManager");
    cc.Class({
      extends: cc.Component,
      properties: {
        isAutoRedeem: false,
        redeemVoucherAmount: {
          get: function get() {
            return this._redeemVoucherAmount;
          }
        },
        voucherValuesArray: {
          default: [],
          type: [ voucherValueStruct ]
        }
      },
      init_RedeemBlock: function init_RedeemBlock(mallData_Redeem) {
        this._redeemVoucherAmount = mallData_Redeem.curVoucherPointAmount;
      },
      updateRedeemVoucherAmount: function updateRedeemVoucherAmount(curRedeemAmount) {
        this._redeemVoucherAmount = curRedeemAmount;
      }
    });
    cc._RF.pop();
  }, {
    VoucherManager: "VoucherManager"
  } ],
  MallView: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "252eecT5fVMb7vzkKVTg3rm", "MallView");
    "use strict";
    var voucherItemSetting = require("VoucherManager");
    cc.Class({
      extends: cc.Component,
      properties: {
        confirmingPanle: {
          default: null,
          type: cc.Node
        },
        lackOfVoucherPanel: {
          default: null,
          type: cc.Node
        },
        label_CurTreasure_Purchase: {
          default: null,
          type: cc.Label
        },
        toggle_AutoRedeem_Purchase: {
          default: null,
          type: cc.Toggle
        },
        label_RedeemedAmount: {
          default: null,
          type: cc.Label
        },
        label_SliderMaxAmount: {
          default: null,
          type: cc.Label
        },
        label_CurTreasure_Redeem: {
          default: null,
          type: cc.Label
        },
        label_Rule: {
          default: null,
          type: cc.Label
        },
        slider_ChooseRedeemAmount: {
          default: null,
          type: cc.Slider
        },
        hasInited_Purchase: {
          default: false,
          visible: false
        },
        hasInited_Redeem: {
          default: false,
          visible: false
        }
      },
      init_PurchaseBlock: function init_PurchaseBlock(initValueSet) {
        var curTreasureAmount = initValueSet.curTreasureAmount;
        var isAutoRedeem = initValueSet.isAutoRedeem;
        this.label_CurTreasure_Purchase.string = this.label_CurTreasure_Purchase.string.replace(this.hasInited_Purchase ? this.curTreasureAmount : "value", curTreasureAmount);
        this.toggle_AutoRedeem_Purchase.isChecked = isAutoRedeem;
        this.curTreasureAmount = curTreasureAmount;
        this.hasInited_Purchase = true;
      },
      init_RedeemBlock: function init_RedeemBlock(initValueSet) {
        var curTreasureAmount = initValueSet.curTreasureAmount;
        var curVoucherPointAmount = initValueSet.curVoucherPointAmount;
        var treasurePerPoint = initValueSet.treasurePerPoint;
        this.label_CurTreasure_Redeem.string = this.label_CurTreasure_Redeem.string.replace(this.hasInited_Redeem ? this.curTreasureAmount : "value", curTreasureAmount);
        this.label_RedeemedAmount.string = curVoucherPointAmount;
        this.label_SliderMaxAmount.string = this.label_SliderMaxAmount.string.replace(this.hasInited_Redeem ? this.curVoucherPointAmount : "value", curVoucherPointAmount);
        this.label_Rule.string = this.label_Rule.string.replace(this.hasInited_Redeem ? this.treasurePerPoint : "value", treasurePerPoint);
        this.slider_ChooseRedeemAmount.progress = 1;
        this.curTreasureAmount = curTreasureAmount;
        this.curVoucherPointAmount = curVoucherPointAmount;
        this.redeemAmount = curVoucherPointAmount;
        this.treasurePerPoint = treasurePerPoint;
        this.hasInited_Redeem = true;
      },
      activateLackOfVoucherPanel: function activateLackOfVoucherPanel() {
        false === this.lackOfVoucherPanel.active && (this.lackOfVoucherPanel.active = true);
      },
      deactivateLackOfVoucherPanel: function deactivateLackOfVoucherPanel() {
        true === this.lackOfVoucherPanel.active && (this.lackOfVoucherPanel.active = false);
      },
      activateConfirmPanel: function activateConfirmPanel() {
        false === this.confirmingPanle.active && (this.confirmingPanle.active = true);
      },
      deactivateConfirmPanel: function deactivateConfirmPanel() {
        true === this.confirmingPanle.active && (this.confirmingPanle.active = false);
      },
      updateCurVoucherPointAmount: function updateCurVoucherPointAmount(tarVoucherPointAmount) {
        this.label_RedeemedAmount.string = tarVoucherPointAmount;
        this.label_SliderMaxAmount.string = this.label_SliderMaxAmount.string.replace(this.curVoucherPointAmount, tarVoucherPointAmount);
        this.curVoucherPointAmount = tarVoucherPointAmount;
      },
      updateRedeemAmount: function updateRedeemAmount(tarRedeemAmount) {
        this.label_RedeemedAmount.string = tarRedeemAmount;
      },
      updateTreasureAmount: function updateTreasureAmount(tarTreasureAmount) {
        console.log("tarTreasureAmount" + tarTreasureAmount);
        this.label_CurTreasure_Redeem.string = this.label_CurTreasure_Redeem.string.replace(this.curTreasureAmount, tarTreasureAmount);
        this.label_CurTreasure_Purchase.string = this.label_CurTreasure_Purchase.string.replace(this.curTreasureAmount, tarTreasureAmount);
        this.curTreasureAmount = tarTreasureAmount;
      }
    });
    cc._RF.pop();
  }, {
    VoucherManager: "VoucherManager"
  } ],
  MiniHintOnLoading: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "54432HU5FpJM6G39W+6Q0kT", "MiniHintOnLoading");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        fadeInDuration: 1,
        existDuration: 2,
        fadeOutDuration: 1,
        hintItemArray: [ cc.String ],
        label_miniHint: cc.Label
      },
      onLoad: function onLoad() {
        this.initItemTempArray();
      },
      start: function start() {
        this.showNextHint();
        this.label_miniHint.node.runAction(this.setFadingAction());
      },
      initItemTempArray: function initItemTempArray() {
        this.hintItemTempArray = [];
        for (var i = 0; i < this.hintItemArray.length; i++) this.hintItemTempArray = cc.js.array.copy(this.hintItemArray);
      },
      setFadingAction: function setFadingAction() {
        this.label_miniHint.node.opacity = 0;
        var fadeIn = cc.fadeIn(this.fadeInDuration);
        var delay = cc.delayTime(this.existDuration);
        var fadeOut = cc.fadeOut(this.fadeOutDuration);
        return cc.repeatForever(cc.sequence(fadeIn, delay, fadeOut, cc.callFunc(this.showNextHint.bind(this))));
      },
      showNextHint: function showNextHint() {
        this.hintItemTempArray.length <= 0 && this.initItemTempArray();
        var randomIndex = Math.floor(Math.random() * this.hintItemTempArray.length);
        this.label_miniHint.string = this.hintItemTempArray[randomIndex];
        cc.js.array.removeAt(this.hintItemTempArray, randomIndex);
      }
    });
    cc._RF.pop();
  }, {} ],
  NetTest: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a307cqi4D1Oy4ICVX7WrAUo", "NetTest");
    "use strict";
    var net = require("net");
    cc.Class({
      extends: cc.Component,
      start: function start() {
        var name = "test";
        var pwd = "233";
        var sLicenseKey = 1;
        net.Connect();
      }
    });
    cc._RF.pop();
  }, {
    net: "net"
  } ],
  Notification: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "94b54Y89JpB+YTuez+zQNix", "Notification");
    "use strict";
    window.NOTIFICATION = function() {
      var eventList = {};
      function on(type, callback, target) {
        if ("string" !== typeof type || "function" !== typeof callback || "undefined" === typeof target) {
          cc.error("GLOBAL_DEF.js: NOTIFICATION method 'on' param error!");
          return;
        }
        "undefined" === typeof eventList[type] && (eventList[type] = []);
        eventList[type].push({
          callback: callback,
          target: target
        });
      }
      function once(type, callback, target) {
        if ("string" !== typeof type || "function" !== typeof callback || "undefined" === typeof target) {
          cc.error("GLOBAL_DEF.js: NOTIFICATION method 'on' param error!");
          return;
        }
        "undefined" === typeof eventList[type] && (eventList[type] = []);
        eventList[type].push({
          callback: callback,
          target: target,
          once: true
        });
      }
      function emit(type, data) {
        if ("string" !== typeof type) {
          cc.error("GLOBAL_DEF.js: NOTIFICATION method 'emit' param error!");
          return;
        }
        var list = eventList[type];
        if ("undefined" !== typeof list) for (var i = 0; i < list.length; i++) {
          var event = list[i];
          if (event) {
            event.callback.call(event.target, data);
            event.once && off(type, event.callback, event.target);
          }
        }
      }
      function off(type, callback, target) {
        if ("string" !== typeof type || "function" !== typeof callback || "undefined" === typeof target) {
          cc.error("GLOBAL_DEF.js: NOTIFICATION method 'off' param error!");
          return;
        }
        var list = eventList[type];
        if ("undefined" !== typeof list) for (var i = 0; i < list.length; i++) {
          var event = list[i];
          if (event && event.callback === callback && event.target === target) {
            list.splice(i, 1);
            break;
          }
        }
      }
      function offByType(type) {
        if ("string" !== typeof type) {
          cc.error("GLOBAL_DEF.js: NOTIFICATION method 'offByType' param error!");
          return;
        }
        while (eventList[type].length > 1) eventList[type].shift();
        eventList[type] = void 0;
      }
      function offByTarget(target) {
        if ("undefined" === typeof target) {
          cc.error("GLOBAL_DEF.js: NOTIFICATION method 'offByTarget' param error!");
          return;
        }
        for (var key in eventList) for (var i = 0; i < eventList[key].length; i++) if (eventList[key][i].target === target) {
          eventList[key].splice(i, 1);
          cc.log("off " + key);
          break;
        }
      }
      return {
        on: on,
        once: once,
        emit: emit,
        off: off,
        offByType: offByType,
        offByTarget: offByTarget
      };
    }();
    module.exports = NOTIFICATION;
    cc._RF.pop();
  }, {} ],
  PlayerInput: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "31f0fWWjzlNPLvsUWdLjEKc", "PlayerInput");
    "use strict";
    cc.Class({
      extends: cc.Component,
      onEnable: function onEnable() {
        NOTIFICATION.on(GAME_START, this.onGameStart, this);
      },
      onDisable: function onDisable() {
        NOTIFICATION.off(GAME_START, this.onGameStart, this);
      },
      onGameStart: function onGameStart() {
        this.setPlayerInputControl();
      },
      setPlayerInputControl: function setPlayerInputControl() {
        var self = this.getComponent("Player");
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, function(event) {
          switch (event.keyCode) {
           case cc.KEY.left:
            self.accLeft = true;
            self.accRight = false;
            break;

           case cc.KEY.right:
            self.accLeft = false;
            self.accRight = true;
            break;

           case cc.KEY.escape:
            NOTIFICATION.emit(GAME_PAUSED, {
              msg: "hit Esc to pause the game"
            });
          }
        });
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, function(event) {
          switch (event.keyCode) {
           case cc.KEY.left:
            self.accLeft = false;
            break;

           case cc.KEY.right:
            self.accRight = false;
          }
        });
      }
    });
    cc._RF.pop();
  }, {} ],
  Player: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "22bdffsB4pKPKye7rHOOKm5", "Player");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        game: {
          default: null,
          type: cc.Node
        },
        xPosMax: 0,
        xPosMin: 0,
        jumpHeight: 0,
        jumpDuration: 0,
        maxMoveSpeed: 0,
        accel: 0,
        jumpAudio: {
          default: null,
          url: cc.AudioClip
        }
      },
      onLoad: function onLoad() {
        this.startPos = this.node.position;
        this.jumpAction = this.setJumpAction();
        this.accLeft = false;
        this.accRight = false;
        this.xSpeed = 0;
      },
      update: function update(dt) {
        this.accLeft ? this.xSpeed -= this.accel * dt : this.accRight && (this.xSpeed += this.accel * dt);
        Math.abs(this.xSpeed) > this.maxMoveSpeed && (this.xSpeed = this.maxMoveSpeed * Math.sign(this.xSpeed));
        this.node.x += this.xSpeed * dt;
        if (this.node.x <= this.xPosMin) {
          this.node.x = this.xPosMin;
          this.xSpeed = 0;
        } else if (this.node.x >= this.xPosMax) {
          this.node.x = this.xPosMax;
          this.xSpeed = 0;
        }
      },
      onGameStart: function onGameStart() {
        this.node.runAction(this.jumpAction);
      },
      onGamePaused: function onGamePaused() {
        this.accLeft = this.accRight = false;
        this.xSpeed = 0;
        this.node.stopAction(this.jumpAction);
      },
      onGameResume: function onGameResume() {
        this.node.y = this.startPos.y;
        this.node.runAction(this.jumpAction);
      },
      onGameOver: function onGameOver() {
        this.accLeft = this.accRight = false;
        this.xSpeed = 0;
        this.node.stopAllActions();
      },
      setJumpAction: function setJumpAction() {
        var jumpUp = cc.moveBy(this.jumpDuration, cc.p(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        var jumpDown = cc.moveBy(this.jumpDuration, cc.p(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        var callback = cc.callFunc(this.playJumpSound, this);
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown, callback));
      },
      playJumpSound: function playJumpSound() {
        cc.audioEngine.playEffect(this.jumpAudio, false);
      }
    });
    cc._RF.pop();
  }, {} ],
  Star: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "49b08egfLNBCIBqEe2X+6lg", "Star");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        pickRadius: 0,
        game: {
          default: null,
          serializable: false
        }
      },
      getPlayerDistance: function getPlayerDistance() {
        return cc.pDistance(this.node.position, this.game.player.getPosition());
      },
      onPickedup: function onPickedup() {
        this.game.starSpawner();
        this.game.gainScore();
        this.node.destroy();
      },
      update: function update() {
        if (this.getPlayerDistance() < this.pickRadius) {
          this.onPickedup();
          return;
        }
        var opacityRatio = 1 - this.game.elapsedTime / this.game.starLifeTime;
        var minOpacity = 50;
        this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
      }
    });
    cc._RF.pop();
  }, {} ],
  UIView: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "85af8Uigu5GuJJCYjzvGbek", "UIView");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        startPanel: {
          default: null,
          type: cc.Node
        },
        playingPanel: {
          default: null,
          type: cc.Node
        },
        gameOverPanel: {
          default: null,
          type: cc.Node
        },
        pausedPanel: {
          default: null,
          type: cc.Node
        },
        scoreLable: {
          default: null,
          type: cc.Label
        },
        timeBar: {
          default: null,
          type: cc.ProgressBar
        }
      },
      onLoad: function onLoad() {
        this.startPanel.active = true;
      },
      onEnable: function onEnable() {
        this.uiEventsRegisration();
      },
      onDisable: function onDisable() {
        this.uiEventsDeRegistration();
      },
      uiEventsRegisration: function uiEventsRegisration() {
        NOTIFICATION.on(GAME_START, this.onGameStart, this);
        NOTIFICATION.on(GAME_OVER, this.onGameOver, this);
        NOTIFICATION.on(GAME_PAUSED, this.onGamePaused, this);
        NOTIFICATION.on(GAME_RESTART, this.onGameRestart, this);
        NOTIFICATION.on(GAME_RESUME, this.onGameResume, this);
        NOTIFICATION.on(SCORE_CHANGED, this.onScoreChanged, this);
        NOTIFICATION.on(STAR_DISAPPEARING, this.onTimeFlowing, this);
        NOTIFICATION.on(PROGRESSBAR_FOLLOWSTAR, this.onProgressBarFollowStar, this);
      },
      uiEventsDeRegistration: function uiEventsDeRegistration() {
        NOTIFICATION.off(GAME_START, this.onGameStart, this);
        NOTIFICATION.off(GAME_OVER, this.onGameOver, this);
        NOTIFICATION.off(GAME_PAUSED, this.onGamePaused, this);
        NOTIFICATION.off(GAME_RESUME, this.onGameResume, this);
        NOTIFICATION.off(GAME_RESTART, this.onGameRestart, this);
        NOTIFICATION.off(SCORE_CHANGED, this.onScoreChanged, this);
        NOTIFICATION.off(STAR_DISAPPEARING, this.onTimeFlowing, this);
        NOTIFICATION.off(PROGRESSBAR_FOLLOWSTAR, this.onProgressBarFollowStar, this);
      },
      onGameStart: function onGameStart() {
        true === this.startPanel.active && (this.startPanel.active = false);
        false === this.playingPanel.active && (this.playingPanel.active = true);
      },
      onGameOver: function onGameOver(event) {
        false === this.gameOverPanel.active && (this.gameOverPanel.active = true);
        cc.find("mainWindow/score", this.gameOverPanel).getComponent(cc.Label).string = "Score: " + event.score;
      },
      onGamePaused: function onGamePaused() {
        console.log("onGamePaused from UIView.js");
        false === this.pausedPanel.active && (this.pausedPanel.active = true);
      },
      onGameResume: function onGameResume() {
        true === this.pausedPanel.active && (this.pausedPanel.active = false);
      },
      onGameRestart: function onGameRestart() {
        true === this.startPanel.active && (this.startPanel.active = false);
        true === this.pausedPanel.active && (this.pausedPanel.active = false);
        true === this.gameOverPanel.active && (this.gameOverPanel.active = false);
      },
      onScoreChanged: function onScoreChanged(event) {
        this.scoreLable.string = "Score: " + event.msg;
      },
      onTimeFlowing: function onTimeFlowing(event) {
        this.timeBar.progress = event.msg;
      },
      onProgressBarFollowStar: function onProgressBarFollowStar(event) {
        false === this.timeBar.node.active && (this.timeBar.node.active = true);
        var offset = cc.p(0, 50);
        var newPos = event.pos.add(offset);
        this.timeBar.node.setPosition(newPos);
      }
    });
    cc._RF.pop();
  }, {} ],
  UserClickButtonEvents: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c4cb4lrfchBU5O1oRT45zGY", "UserClickButtonEvents");
    "use strict";
    var Flags = require("GameFlags");
    cc.Class({
      extends: cc.Component,
      properties: {},
      onHitMainButton: function onHitMainButton() {
        NOTIFICATION.emit(Flags.GAME_HIT_MAIN);
      },
      onReCharge: function onReCharge() {
        NOTIFICATION.emit(Flags.GAME_2_MALL);
      },
      onMagAdd: function onMagAdd() {
        NOTIFICATION.emit(Flags.MAG_ADD);
      },
      onMagMinus: function onMagMinus() {
        NOTIFICATION.emit(Flags.MAG_MINUS);
      }
    });
    cc._RF.pop();
  }, {
    GameFlags: "GameFlags"
  } ],
  VoucherManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1d2dfMFe7VMpbj/jNvUXftZ", "VoucherManager");
    "use strict";
    var mallFlags = require("MallFlags");
    cc.Class({
      extends: cc.Component,
      properties: {
        label_VoucherAmount: {
          default: null,
          type: cc.Label
        },
        label_RedeemedTreasure: {
          default: null,
          type: cc.Label
        },
        label_RedeemedVIPDays: {
          default: null,
          type: cc.Label
        },
        label_Price: {
          default: null,
          type: cc.Label
        }
      },
      setVoucherValues: function setVoucherValues(index, voucherValueStruct) {
        this.index = index;
        this.voucherValues = voucherValueStruct;
        var voucherAmount = this.voucherValues.voucherAmount;
        var redeem_Treasure = this.voucherValues.redeem_Treasure;
        var redeem_vipDays = this.voucherValues.redeem_vipDays;
        var price_rmb = this.voucherValues.price_rmb;
        this.label_VoucherAmount.string = this.label_VoucherAmount.string.replace("value", voucherAmount);
        this.label_RedeemedTreasure.string = this.label_RedeemedTreasure.string.replace("value", redeem_Treasure);
        this.label_RedeemedVIPDays.string = this.label_RedeemedVIPDays.string.replace("value", redeem_vipDays);
        this.label_Price.string = this.label_Price.string.replace("value", price_rmb);
      },
      getVoucherValues: function getVoucherValues() {
        return this.voucherValues;
      },
      getVoucherIndex: function getVoucherIndex() {
        return this.index;
      },
      onChoosePrice: function onChoosePrice() {
        NOTIFICATION.emit(mallFlags.MALL_CHOOSE_VOUCHER, {
          index: this.index
        });
      }
    });
    cc._RF.pop();
  }, {
    MallFlags: "MallFlags"
  } ],
  base64: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "714deswtRhNtoYn1R1T3J4D", "base64");
    "use strict";
    var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
    function base64encode(str) {
      var out, i, len;
      var c1, c2, c3;
      len = str.length;
      i = 0;
      out = "";
      while (i < len) {
        c1 = 255 & str.charCodeAt(i++);
        if (i == len) {
          out += base64EncodeChars.charAt(c1 >> 2);
          out += base64EncodeChars.charAt((3 & c1) << 4);
          out += "==";
          break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
          out += base64EncodeChars.charAt(c1 >> 2);
          out += base64EncodeChars.charAt((3 & c1) << 4 | (240 & c2) >> 4);
          out += base64EncodeChars.charAt((15 & c2) << 2);
          out += "=";
          break;
        }
        c3 = str.charCodeAt(i++);
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt((3 & c1) << 4 | (240 & c2) >> 4);
        out += base64EncodeChars.charAt((15 & c2) << 2 | (192 & c3) >> 6);
        out += base64EncodeChars.charAt(63 & c3);
      }
      return out;
    }
    function base64decode(str) {
      var c1, c2, c3, c4;
      var i, len, out;
      len = str.length;
      i = 0;
      out = "";
      while (i < len) {
        do {
          c1 = base64DecodeChars[255 & str.charCodeAt(i++)];
        } while (i < len && -1 == c1);
        if (-1 == c1) break;
        do {
          c2 = base64DecodeChars[255 & str.charCodeAt(i++)];
        } while (i < len && -1 == c2);
        if (-1 == c2) break;
        out += String.fromCharCode(c1 << 2 | (48 & c2) >> 4);
        do {
          c3 = 255 & str.charCodeAt(i++);
          if (61 == c3) return out;
          c3 = base64DecodeChars[c3];
        } while (i < len && -1 == c3);
        if (-1 == c3) break;
        out += String.fromCharCode((15 & c2) << 4 | (60 & c3) >> 2);
        do {
          c4 = 255 & str.charCodeAt(i++);
          if (61 == c4) return out;
          c4 = base64DecodeChars[c4];
        } while (i < len && -1 == c4);
        if (-1 == c4) break;
        out += String.fromCharCode((3 & c3) << 6 | c4);
      }
      return out;
    }
    function utf16to8(str) {
      var out, i, len, c;
      out = "";
      len = str.length;
      for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if (c >= 1 && c <= 127) out += str.charAt(i); else if (c > 2047) {
          out += String.fromCharCode(224 | c >> 12 & 15);
          out += String.fromCharCode(128 | c >> 6 & 63);
          out += String.fromCharCode(128 | c >> 0 & 63);
        } else {
          out += String.fromCharCode(192 | c >> 6 & 31);
          out += String.fromCharCode(128 | c >> 0 & 63);
        }
      }
      return out;
    }
    function utf8to16(str) {
      var out, i, len, c;
      var char2, char3;
      out = "";
      len = str.length;
      i = 0;
      while (i < len) {
        c = str.charCodeAt(i++);
        switch (c >> 4) {
         case 0:
         case 1:
         case 2:
         case 3:
         case 4:
         case 5:
         case 6:
         case 7:
          out += str.charAt(i - 1);
          break;

         case 12:
         case 13:
          char2 = str.charCodeAt(i++);
          out += String.fromCharCode((31 & c) << 6 | 63 & char2);
          break;

         case 14:
          char2 = str.charCodeAt(i++);
          char3 = str.charCodeAt(i++);
          out += String.fromCharCode((15 & c) << 12 | (63 & char2) << 6 | (63 & char3) << 0);
        }
      }
      return out;
    }
    module.exports = {
      base64encode: base64encode,
      base64decode: base64decode,
      utf8to16: utf8to16,
      utf16to8: utf16to8
    };
    cc._RF.pop();
  }, {} ],
  bytebuffer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ed3c8AwDkpDO4Vm/cf06C4f", "bytebuffer");
    "use strict";
    var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    (function(global, factory) {
      "function" === typeof define && define["amd"] ? define([ "long" ], factory) : "function" === typeof require && "object" === ("undefined" === typeof module ? "undefined" : _typeof(module)) && module && module["exports"] ? module["exports"] = function() {
        var Long;
        try {
          Long = require("long");
        } catch (e) {}
        return factory(Long);
      }() : (global["dcodeIO"] = global["dcodeIO"] || {})["ByteBuffer"] = factory(global["dcodeIO"]["Long"]);
    })(void 0, function(Long) {
      var ByteBuffer = function ByteBuffer(capacity, littleEndian, noAssert) {
        "undefined" === typeof capacity && (capacity = ByteBuffer.DEFAULT_CAPACITY);
        "undefined" === typeof littleEndian && (littleEndian = ByteBuffer.DEFAULT_ENDIAN);
        "undefined" === typeof noAssert && (noAssert = ByteBuffer.DEFAULT_NOASSERT);
        if (!noAssert) {
          capacity |= 0;
          if (capacity < 0) throw RangeError("Illegal capacity");
          littleEndian = !!littleEndian;
          noAssert = !!noAssert;
        }
        this.buffer = 0 === capacity ? EMPTY_BUFFER : new ArrayBuffer(capacity);
        this.view = 0 === capacity ? null : new Uint8Array(this.buffer);
        this.offset = 0;
        this.markedOffset = -1;
        this.limit = capacity;
        this.littleEndian = littleEndian;
        this.noAssert = noAssert;
      };
      ByteBuffer.VERSION = "5.0.1";
      ByteBuffer.LITTLE_ENDIAN = true;
      ByteBuffer.BIG_ENDIAN = false;
      ByteBuffer.DEFAULT_CAPACITY = 16;
      ByteBuffer.DEFAULT_ENDIAN = ByteBuffer.BIG_ENDIAN;
      ByteBuffer.DEFAULT_NOASSERT = false;
      ByteBuffer.Long = Long || null;
      var ByteBufferPrototype = ByteBuffer.prototype;
      ByteBufferPrototype.__isByteBuffer__;
      Object.defineProperty(ByteBufferPrototype, "__isByteBuffer__", {
        value: true,
        enumerable: false,
        configurable: false
      });
      var EMPTY_BUFFER = new ArrayBuffer(0);
      var stringFromCharCode = String.fromCharCode;
      function stringSource(s) {
        var i = 0;
        return function() {
          return i < s.length ? s.charCodeAt(i++) : null;
        };
      }
      function stringDestination() {
        var cs = [], ps = [];
        return function() {
          if (0 === arguments.length) return ps.join("") + stringFromCharCode.apply(String, cs);
          cs.length + arguments.length > 1024 && (ps.push(stringFromCharCode.apply(String, cs)), 
          cs.length = 0);
          Array.prototype.push.apply(cs, arguments);
        };
      }
      ByteBuffer.accessor = function() {
        return Uint8Array;
      };
      ByteBuffer.allocate = function(capacity, littleEndian, noAssert) {
        return new ByteBuffer(capacity, littleEndian, noAssert);
      };
      ByteBuffer.concat = function(buffers, encoding, littleEndian, noAssert) {
        if ("boolean" === typeof encoding || "string" !== typeof encoding) {
          noAssert = littleEndian;
          littleEndian = encoding;
          encoding = void 0;
        }
        var capacity = 0;
        for (var i = 0, k = buffers.length, length; i < k; ++i) {
          ByteBuffer.isByteBuffer(buffers[i]) || (buffers[i] = ByteBuffer.wrap(buffers[i], encoding));
          length = buffers[i].limit - buffers[i].offset;
          length > 0 && (capacity += length);
        }
        if (0 === capacity) return new ByteBuffer(0, littleEndian, noAssert);
        var bb = new ByteBuffer(capacity, littleEndian, noAssert), bi;
        i = 0;
        while (i < k) {
          bi = buffers[i++];
          length = bi.limit - bi.offset;
          if (length <= 0) continue;
          bb.view.set(bi.view.subarray(bi.offset, bi.limit), bb.offset);
          bb.offset += length;
        }
        bb.limit = bb.offset;
        bb.offset = 0;
        return bb;
      };
      ByteBuffer.isByteBuffer = function(bb) {
        return true === (bb && bb["__isByteBuffer__"]);
      };
      ByteBuffer.type = function() {
        return ArrayBuffer;
      };
      ByteBuffer.wrap = function(buffer, encoding, littleEndian, noAssert) {
        if ("string" !== typeof encoding) {
          noAssert = littleEndian;
          littleEndian = encoding;
          encoding = void 0;
        }
        if ("string" === typeof buffer) {
          "undefined" === typeof encoding && (encoding = "utf8");
          switch (encoding) {
           case "base64":
            return ByteBuffer.fromBase64(buffer, littleEndian);

           case "hex":
            return ByteBuffer.fromHex(buffer, littleEndian);

           case "binary":
            return ByteBuffer.fromBinary(buffer, littleEndian);

           case "utf8":
            return ByteBuffer.fromUTF8(buffer, littleEndian);

           case "debug":
            return ByteBuffer.fromDebug(buffer, littleEndian);

           default:
            throw Error("Unsupported encoding: " + encoding);
          }
        }
        if (null === buffer || "object" !== ("undefined" === typeof buffer ? "undefined" : _typeof(buffer))) throw TypeError("Illegal buffer");
        var bb;
        if (ByteBuffer.isByteBuffer(buffer)) {
          bb = ByteBufferPrototype.clone.call(buffer);
          bb.markedOffset = -1;
          return bb;
        }
        if (buffer instanceof Uint8Array) {
          bb = new ByteBuffer(0, littleEndian, noAssert);
          if (buffer.length > 0) {
            bb.buffer = buffer.buffer;
            bb.offset = buffer.byteOffset;
            bb.limit = buffer.byteOffset + buffer.byteLength;
            bb.view = new Uint8Array(buffer.buffer);
          }
        } else if (buffer instanceof ArrayBuffer) {
          bb = new ByteBuffer(0, littleEndian, noAssert);
          if (buffer.byteLength > 0) {
            bb.buffer = buffer;
            bb.offset = 0;
            bb.limit = buffer.byteLength;
            bb.view = buffer.byteLength > 0 ? new Uint8Array(buffer) : null;
          }
        } else {
          if ("[object Array]" !== Object.prototype.toString.call(buffer)) {
            console.log(Object.prototype.toString.call(buffer));
            throw TypeError("Illegal buffer");
          }
          bb = new ByteBuffer(buffer.length, littleEndian, noAssert);
          bb.limit = buffer.length;
          for (var i = 0; i < buffer.length; ++i) bb.view[i] = buffer[i];
        }
        return bb;
      };
      ByteBufferPrototype.writeBitSet = function(value, offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if (!(value instanceof Array)) throw TypeError("Illegal BitSet: Not an array");
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        var start = offset, bits = value.length, bytes = bits >> 3, bit = 0, k;
        offset += this.writeVarint32(bits, offset);
        while (bytes--) {
          k = 1 & !!value[bit++] | (1 & !!value[bit++]) << 1 | (1 & !!value[bit++]) << 2 | (1 & !!value[bit++]) << 3 | (1 & !!value[bit++]) << 4 | (1 & !!value[bit++]) << 5 | (1 & !!value[bit++]) << 6 | (1 & !!value[bit++]) << 7;
          this.writeByte(k, offset++);
        }
        if (bit < bits) {
          var m = 0;
          k = 0;
          while (bit < bits) k |= (1 & !!value[bit++]) << m++;
          this.writeByte(k, offset++);
        }
        if (relative) {
          this.offset = offset;
          return this;
        }
        return offset - start;
      };
      ByteBufferPrototype.readBitSet = function(offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        var ret = this.readVarint32(offset), bits = ret.value, bytes = bits >> 3, bit = 0, value = [], k;
        offset += ret.length;
        while (bytes--) {
          k = this.readByte(offset++);
          value[bit++] = !!(1 & k);
          value[bit++] = !!(2 & k);
          value[bit++] = !!(4 & k);
          value[bit++] = !!(8 & k);
          value[bit++] = !!(16 & k);
          value[bit++] = !!(32 & k);
          value[bit++] = !!(64 & k);
          value[bit++] = !!(128 & k);
        }
        if (bit < bits) {
          var m = 0;
          k = this.readByte(offset++);
          while (bit < bits) value[bit++] = !!(k >> m++ & 1);
        }
        relative && (this.offset = offset);
        return value;
      };
      ByteBufferPrototype.readBytes = function(length, offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + length > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+" + length + ") <= " + this.buffer.byteLength);
        }
        var slice = this.slice(offset, offset + length);
        relative && (this.offset += length);
        return slice;
      };
      ByteBufferPrototype.writeBytes = ByteBufferPrototype.append;
      ByteBufferPrototype.writeInt8 = function(value, offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof value || value % 1 !== 0) throw TypeError("Illegal value: " + value + " (not an integer)");
          value |= 0;
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        offset += 1;
        var capacity0 = this.buffer.byteLength;
        offset > capacity0 && this.resize((capacity0 *= 2) > offset ? capacity0 : offset);
        offset -= 1;
        this.view[offset] = value;
        relative && (this.offset += 1);
        return this;
      };
      ByteBufferPrototype.writeByte = ByteBufferPrototype.writeInt8;
      ByteBufferPrototype.readInt8 = function(offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+1) <= " + this.buffer.byteLength);
        }
        var value = this.view[offset];
        128 === (128 & value) && (value = -(255 - value + 1));
        relative && (this.offset += 1);
        return value;
      };
      ByteBufferPrototype.readByte = ByteBufferPrototype.readInt8;
      ByteBufferPrototype.writeUint8 = function(value, offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof value || value % 1 !== 0) throw TypeError("Illegal value: " + value + " (not an integer)");
          value >>>= 0;
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        offset += 1;
        var capacity1 = this.buffer.byteLength;
        offset > capacity1 && this.resize((capacity1 *= 2) > offset ? capacity1 : offset);
        offset -= 1;
        this.view[offset] = value;
        relative && (this.offset += 1);
        return this;
      };
      ByteBufferPrototype.writeUInt8 = ByteBufferPrototype.writeUint8;
      ByteBufferPrototype.readUint8 = function(offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+1) <= " + this.buffer.byteLength);
        }
        var value = this.view[offset];
        relative && (this.offset += 1);
        return value;
      };
      ByteBufferPrototype.readUInt8 = ByteBufferPrototype.readUint8;
      ByteBufferPrototype.writeInt16 = function(value, offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof value || value % 1 !== 0) throw TypeError("Illegal value: " + value + " (not an integer)");
          value |= 0;
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        offset += 2;
        var capacity2 = this.buffer.byteLength;
        offset > capacity2 && this.resize((capacity2 *= 2) > offset ? capacity2 : offset);
        offset -= 2;
        if (this.littleEndian) {
          this.view[offset + 1] = (65280 & value) >>> 8;
          this.view[offset] = 255 & value;
        } else {
          this.view[offset] = (65280 & value) >>> 8;
          this.view[offset + 1] = 255 & value;
        }
        relative && (this.offset += 2);
        return this;
      };
      ByteBufferPrototype.writeShort = ByteBufferPrototype.writeInt16;
      ByteBufferPrototype.readInt16 = function(offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 2 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+2) <= " + this.buffer.byteLength);
        }
        var value = 0;
        if (this.littleEndian) {
          value = this.view[offset];
          value |= this.view[offset + 1] << 8;
        } else {
          value = this.view[offset] << 8;
          value |= this.view[offset + 1];
        }
        32768 === (32768 & value) && (value = -(65535 - value + 1));
        relative && (this.offset += 2);
        return value;
      };
      ByteBufferPrototype.readShort = ByteBufferPrototype.readInt16;
      ByteBufferPrototype.writeUint16 = function(value, offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof value || value % 1 !== 0) throw TypeError("Illegal value: " + value + " (not an integer)");
          value >>>= 0;
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        offset += 2;
        var capacity3 = this.buffer.byteLength;
        offset > capacity3 && this.resize((capacity3 *= 2) > offset ? capacity3 : offset);
        offset -= 2;
        if (this.littleEndian) {
          this.view[offset + 1] = (65280 & value) >>> 8;
          this.view[offset] = 255 & value;
        } else {
          this.view[offset] = (65280 & value) >>> 8;
          this.view[offset + 1] = 255 & value;
        }
        relative && (this.offset += 2);
        return this;
      };
      ByteBufferPrototype.writeUInt16 = ByteBufferPrototype.writeUint16;
      ByteBufferPrototype.readUint16 = function(offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 2 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+2) <= " + this.buffer.byteLength);
        }
        var value = 0;
        if (this.littleEndian) {
          value = this.view[offset];
          value |= this.view[offset + 1] << 8;
        } else {
          value = this.view[offset] << 8;
          value |= this.view[offset + 1];
        }
        relative && (this.offset += 2);
        return value;
      };
      ByteBufferPrototype.readUInt16 = ByteBufferPrototype.readUint16;
      ByteBufferPrototype.writeInt32 = function(value, offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof value || value % 1 !== 0) throw TypeError("Illegal value: " + value + " (not an integer)");
          value |= 0;
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        offset += 4;
        var capacity4 = this.buffer.byteLength;
        offset > capacity4 && this.resize((capacity4 *= 2) > offset ? capacity4 : offset);
        offset -= 4;
        if (this.littleEndian) {
          this.view[offset + 3] = value >>> 24 & 255;
          this.view[offset + 2] = value >>> 16 & 255;
          this.view[offset + 1] = value >>> 8 & 255;
          this.view[offset] = 255 & value;
        } else {
          this.view[offset] = value >>> 24 & 255;
          this.view[offset + 1] = value >>> 16 & 255;
          this.view[offset + 2] = value >>> 8 & 255;
          this.view[offset + 3] = 255 & value;
        }
        relative && (this.offset += 4);
        return this;
      };
      ByteBufferPrototype.writeInt = ByteBufferPrototype.writeInt32;
      ByteBufferPrototype.readInt32 = function(offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 4 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+4) <= " + this.buffer.byteLength);
        }
        var value = 0;
        if (this.littleEndian) {
          value = this.view[offset + 2] << 16;
          value |= this.view[offset + 1] << 8;
          value |= this.view[offset];
          value += this.view[offset + 3] << 24 >>> 0;
        } else {
          value = this.view[offset + 1] << 16;
          value |= this.view[offset + 2] << 8;
          value |= this.view[offset + 3];
          value += this.view[offset] << 24 >>> 0;
        }
        value |= 0;
        relative && (this.offset += 4);
        return value;
      };
      ByteBufferPrototype.readInt = ByteBufferPrototype.readInt32;
      ByteBufferPrototype.writeUint32 = function(value, offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof value || value % 1 !== 0) throw TypeError("Illegal value: " + value + " (not an integer)");
          value >>>= 0;
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        offset += 4;
        var capacity5 = this.buffer.byteLength;
        offset > capacity5 && this.resize((capacity5 *= 2) > offset ? capacity5 : offset);
        offset -= 4;
        if (this.littleEndian) {
          this.view[offset + 3] = value >>> 24 & 255;
          this.view[offset + 2] = value >>> 16 & 255;
          this.view[offset + 1] = value >>> 8 & 255;
          this.view[offset] = 255 & value;
        } else {
          this.view[offset] = value >>> 24 & 255;
          this.view[offset + 1] = value >>> 16 & 255;
          this.view[offset + 2] = value >>> 8 & 255;
          this.view[offset + 3] = 255 & value;
        }
        relative && (this.offset += 4);
        return this;
      };
      ByteBufferPrototype.writeUInt32 = ByteBufferPrototype.writeUint32;
      ByteBufferPrototype.readUint32 = function(offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 4 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+4) <= " + this.buffer.byteLength);
        }
        var value = 0;
        if (this.littleEndian) {
          value = this.view[offset + 2] << 16;
          value |= this.view[offset + 1] << 8;
          value |= this.view[offset];
          value += this.view[offset + 3] << 24 >>> 0;
        } else {
          value = this.view[offset + 1] << 16;
          value |= this.view[offset + 2] << 8;
          value |= this.view[offset + 3];
          value += this.view[offset] << 24 >>> 0;
        }
        relative && (this.offset += 4);
        return value;
      };
      ByteBufferPrototype.readUInt32 = ByteBufferPrototype.readUint32;
      if (Long) {
        ByteBufferPrototype.writeInt64 = function(value, offset) {
          var relative = "undefined" === typeof offset;
          relative && (offset = this.offset);
          if (!this.noAssert) {
            if ("number" === typeof value) value = Long.fromNumber(value); else if ("string" === typeof value) value = Long.fromString(value); else if (!(value && value instanceof Long)) throw TypeError("Illegal value: " + value + " (not an integer or Long)");
            if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
          }
          "number" === typeof value ? value = Long.fromNumber(value) : "string" === typeof value && (value = Long.fromString(value));
          offset += 8;
          var capacity6 = this.buffer.byteLength;
          offset > capacity6 && this.resize((capacity6 *= 2) > offset ? capacity6 : offset);
          offset -= 8;
          var lo = value.low, hi = value.high;
          if (this.littleEndian) {
            this.view[offset + 3] = lo >>> 24 & 255;
            this.view[offset + 2] = lo >>> 16 & 255;
            this.view[offset + 1] = lo >>> 8 & 255;
            this.view[offset] = 255 & lo;
            offset += 4;
            this.view[offset + 3] = hi >>> 24 & 255;
            this.view[offset + 2] = hi >>> 16 & 255;
            this.view[offset + 1] = hi >>> 8 & 255;
            this.view[offset] = 255 & hi;
          } else {
            this.view[offset] = hi >>> 24 & 255;
            this.view[offset + 1] = hi >>> 16 & 255;
            this.view[offset + 2] = hi >>> 8 & 255;
            this.view[offset + 3] = 255 & hi;
            offset += 4;
            this.view[offset] = lo >>> 24 & 255;
            this.view[offset + 1] = lo >>> 16 & 255;
            this.view[offset + 2] = lo >>> 8 & 255;
            this.view[offset + 3] = 255 & lo;
          }
          relative && (this.offset += 8);
          return this;
        };
        ByteBufferPrototype.writeLong = ByteBufferPrototype.writeInt64;
        ByteBufferPrototype.readInt64 = function(offset) {
          var relative = "undefined" === typeof offset;
          relative && (offset = this.offset);
          if (!this.noAssert) {
            if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 8 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+8) <= " + this.buffer.byteLength);
          }
          var lo = 0, hi = 0;
          if (this.littleEndian) {
            lo = this.view[offset + 2] << 16;
            lo |= this.view[offset + 1] << 8;
            lo |= this.view[offset];
            lo += this.view[offset + 3] << 24 >>> 0;
            offset += 4;
            hi = this.view[offset + 2] << 16;
            hi |= this.view[offset + 1] << 8;
            hi |= this.view[offset];
            hi += this.view[offset + 3] << 24 >>> 0;
          } else {
            hi = this.view[offset + 1] << 16;
            hi |= this.view[offset + 2] << 8;
            hi |= this.view[offset + 3];
            hi += this.view[offset] << 24 >>> 0;
            offset += 4;
            lo = this.view[offset + 1] << 16;
            lo |= this.view[offset + 2] << 8;
            lo |= this.view[offset + 3];
            lo += this.view[offset] << 24 >>> 0;
          }
          var value = new Long(lo, hi, false);
          relative && (this.offset += 8);
          return value;
        };
        ByteBufferPrototype.readLong = ByteBufferPrototype.readInt64;
        ByteBufferPrototype.writeUint64 = function(value, offset) {
          var relative = "undefined" === typeof offset;
          relative && (offset = this.offset);
          if (!this.noAssert) {
            if ("number" === typeof value) value = Long.fromNumber(value); else if ("string" === typeof value) value = Long.fromString(value); else if (!(value && value instanceof Long)) throw TypeError("Illegal value: " + value + " (not an integer or Long)");
            if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
          }
          "number" === typeof value ? value = Long.fromNumber(value) : "string" === typeof value && (value = Long.fromString(value));
          offset += 8;
          var capacity7 = this.buffer.byteLength;
          offset > capacity7 && this.resize((capacity7 *= 2) > offset ? capacity7 : offset);
          offset -= 8;
          var lo = value.low, hi = value.high;
          if (this.littleEndian) {
            this.view[offset + 3] = lo >>> 24 & 255;
            this.view[offset + 2] = lo >>> 16 & 255;
            this.view[offset + 1] = lo >>> 8 & 255;
            this.view[offset] = 255 & lo;
            offset += 4;
            this.view[offset + 3] = hi >>> 24 & 255;
            this.view[offset + 2] = hi >>> 16 & 255;
            this.view[offset + 1] = hi >>> 8 & 255;
            this.view[offset] = 255 & hi;
          } else {
            this.view[offset] = hi >>> 24 & 255;
            this.view[offset + 1] = hi >>> 16 & 255;
            this.view[offset + 2] = hi >>> 8 & 255;
            this.view[offset + 3] = 255 & hi;
            offset += 4;
            this.view[offset] = lo >>> 24 & 255;
            this.view[offset + 1] = lo >>> 16 & 255;
            this.view[offset + 2] = lo >>> 8 & 255;
            this.view[offset + 3] = 255 & lo;
          }
          relative && (this.offset += 8);
          return this;
        };
        ByteBufferPrototype.writeUInt64 = ByteBufferPrototype.writeUint64;
        ByteBufferPrototype.readUint64 = function(offset) {
          var relative = "undefined" === typeof offset;
          relative && (offset = this.offset);
          if (!this.noAssert) {
            if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 8 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+8) <= " + this.buffer.byteLength);
          }
          var lo = 0, hi = 0;
          if (this.littleEndian) {
            lo = this.view[offset + 2] << 16;
            lo |= this.view[offset + 1] << 8;
            lo |= this.view[offset];
            lo += this.view[offset + 3] << 24 >>> 0;
            offset += 4;
            hi = this.view[offset + 2] << 16;
            hi |= this.view[offset + 1] << 8;
            hi |= this.view[offset];
            hi += this.view[offset + 3] << 24 >>> 0;
          } else {
            hi = this.view[offset + 1] << 16;
            hi |= this.view[offset + 2] << 8;
            hi |= this.view[offset + 3];
            hi += this.view[offset] << 24 >>> 0;
            offset += 4;
            lo = this.view[offset + 1] << 16;
            lo |= this.view[offset + 2] << 8;
            lo |= this.view[offset + 3];
            lo += this.view[offset] << 24 >>> 0;
          }
          var value = new Long(lo, hi, true);
          relative && (this.offset += 8);
          return value;
        };
        ByteBufferPrototype.readUInt64 = ByteBufferPrototype.readUint64;
      }
      function ieee754_read(buffer, offset, isLE, mLen, nBytes) {
        var e, m, eLen = 8 * nBytes - mLen - 1, eMax = (1 << eLen) - 1, eBias = eMax >> 1, nBits = -7, i = isLE ? nBytes - 1 : 0, d = isLE ? -1 : 1, s = buffer[offset + i];
        i += d;
        e = s & (1 << -nBits) - 1;
        s >>= -nBits;
        nBits += eLen;
        for (;nBits > 0; e = 256 * e + buffer[offset + i], i += d, nBits -= 8) ;
        m = e & (1 << -nBits) - 1;
        e >>= -nBits;
        nBits += mLen;
        for (;nBits > 0; m = 256 * m + buffer[offset + i], i += d, nBits -= 8) ;
        if (0 === e) e = 1 - eBias; else {
          if (e === eMax) return m ? NaN : Infinity * (s ? -1 : 1);
          m += Math.pow(2, mLen);
          e -= eBias;
        }
        return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
      }
      function ieee754_write(buffer, value, offset, isLE, mLen, nBytes) {
        var e, m, c, eLen = 8 * nBytes - mLen - 1, eMax = (1 << eLen) - 1, eBias = eMax >> 1, rt = 23 === mLen ? Math.pow(2, -24) - Math.pow(2, -77) : 0, i = isLE ? 0 : nBytes - 1, d = isLE ? 1 : -1, s = value < 0 || 0 === value && 1 / value < 0 ? 1 : 0;
        value = Math.abs(value);
        if (isNaN(value) || Infinity === value) {
          m = isNaN(value) ? 1 : 0;
          e = eMax;
        } else {
          e = Math.floor(Math.log(value) / Math.LN2);
          if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
          }
          value += e + eBias >= 1 ? rt / c : rt * Math.pow(2, 1 - eBias);
          if (value * c >= 2) {
            e++;
            c /= 2;
          }
          if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
          } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e += eBias;
          } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
          }
        }
        for (;mLen >= 8; buffer[offset + i] = 255 & m, i += d, m /= 256, mLen -= 8) ;
        e = e << mLen | m;
        eLen += mLen;
        for (;eLen > 0; buffer[offset + i] = 255 & e, i += d, e /= 256, eLen -= 8) ;
        buffer[offset + i - d] |= 128 * s;
      }
      ByteBufferPrototype.writeFloat32 = function(value, offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof value) throw TypeError("Illegal value: " + value + " (not a number)");
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        offset += 4;
        var capacity8 = this.buffer.byteLength;
        offset > capacity8 && this.resize((capacity8 *= 2) > offset ? capacity8 : offset);
        offset -= 4;
        ieee754_write(this.view, value, offset, this.littleEndian, 23, 4);
        relative && (this.offset += 4);
        return this;
      };
      ByteBufferPrototype.writeFloat = ByteBufferPrototype.writeFloat32;
      ByteBufferPrototype.readFloat32 = function(offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 4 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+4) <= " + this.buffer.byteLength);
        }
        var value = ieee754_read(this.view, offset, this.littleEndian, 23, 4);
        relative && (this.offset += 4);
        return value;
      };
      ByteBufferPrototype.readFloat = ByteBufferPrototype.readFloat32;
      ByteBufferPrototype.writeFloat64 = function(value, offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof value) throw TypeError("Illegal value: " + value + " (not a number)");
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        offset += 8;
        var capacity9 = this.buffer.byteLength;
        offset > capacity9 && this.resize((capacity9 *= 2) > offset ? capacity9 : offset);
        offset -= 8;
        ieee754_write(this.view, value, offset, this.littleEndian, 52, 8);
        relative && (this.offset += 8);
        return this;
      };
      ByteBufferPrototype.writeDouble = ByteBufferPrototype.writeFloat64;
      ByteBufferPrototype.readFloat64 = function(offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 8 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+8) <= " + this.buffer.byteLength);
        }
        var value = ieee754_read(this.view, offset, this.littleEndian, 52, 8);
        relative && (this.offset += 8);
        return value;
      };
      ByteBufferPrototype.readDouble = ByteBufferPrototype.readFloat64;
      ByteBuffer.MAX_VARINT32_BYTES = 5;
      ByteBuffer.calculateVarint32 = function(value) {
        value >>>= 0;
        return value < 128 ? 1 : value < 16384 ? 2 : value < 1 << 21 ? 3 : value < 1 << 28 ? 4 : 5;
      };
      ByteBuffer.zigZagEncode32 = function(n) {
        return ((n |= 0) << 1 ^ n >> 31) >>> 0;
      };
      ByteBuffer.zigZagDecode32 = function(n) {
        return n >>> 1 ^ -(1 & n) | 0;
      };
      ByteBufferPrototype.writeVarint32 = function(value, offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof value || value % 1 !== 0) throw TypeError("Illegal value: " + value + " (not an integer)");
          value |= 0;
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        var size = ByteBuffer.calculateVarint32(value), b;
        offset += size;
        var capacity10 = this.buffer.byteLength;
        offset > capacity10 && this.resize((capacity10 *= 2) > offset ? capacity10 : offset);
        offset -= size;
        value >>>= 0;
        while (value >= 128) {
          b = 127 & value | 128;
          this.view[offset++] = b;
          value >>>= 7;
        }
        this.view[offset++] = value;
        if (relative) {
          this.offset = offset;
          return this;
        }
        return size;
      };
      ByteBufferPrototype.writeVarint32ZigZag = function(value, offset) {
        return this.writeVarint32(ByteBuffer.zigZagEncode32(value), offset);
      };
      ByteBufferPrototype.readVarint32 = function(offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+1) <= " + this.buffer.byteLength);
        }
        var c = 0, value = 0, b;
        do {
          if (!this.noAssert && offset > this.limit) {
            var err = Error("Truncated");
            err["truncated"] = true;
            throw err;
          }
          b = this.view[offset++];
          c < 5 && (value |= (127 & b) << 7 * c);
          ++c;
        } while (0 !== (128 & b));
        value |= 0;
        if (relative) {
          this.offset = offset;
          return value;
        }
        return {
          value: value,
          length: c
        };
      };
      ByteBufferPrototype.readVarint32ZigZag = function(offset) {
        var val = this.readVarint32(offset);
        "object" === ("undefined" === typeof val ? "undefined" : _typeof(val)) ? val["value"] = ByteBuffer.zigZagDecode32(val["value"]) : val = ByteBuffer.zigZagDecode32(val);
        return val;
      };
      if (Long) {
        ByteBuffer.MAX_VARINT64_BYTES = 10;
        ByteBuffer.calculateVarint64 = function(value) {
          "number" === typeof value ? value = Long.fromNumber(value) : "string" === typeof value && (value = Long.fromString(value));
          var part0 = value.toInt() >>> 0, part1 = value.shiftRightUnsigned(28).toInt() >>> 0, part2 = value.shiftRightUnsigned(56).toInt() >>> 0;
          return 0 == part2 ? 0 == part1 ? part0 < 16384 ? part0 < 128 ? 1 : 2 : part0 < 1 << 21 ? 3 : 4 : part1 < 16384 ? part1 < 128 ? 5 : 6 : part1 < 1 << 21 ? 7 : 8 : part2 < 128 ? 9 : 10;
        };
        ByteBuffer.zigZagEncode64 = function(value) {
          "number" === typeof value ? value = Long.fromNumber(value, false) : "string" === typeof value ? value = Long.fromString(value, false) : false !== value.unsigned && (value = value.toSigned());
          return value.shiftLeft(1).xor(value.shiftRight(63)).toUnsigned();
        };
        ByteBuffer.zigZagDecode64 = function(value) {
          "number" === typeof value ? value = Long.fromNumber(value, false) : "string" === typeof value ? value = Long.fromString(value, false) : false !== value.unsigned && (value = value.toSigned());
          return value.shiftRightUnsigned(1).xor(value.and(Long.ONE).toSigned().negate()).toSigned();
        };
        ByteBufferPrototype.writeVarint64 = function(value, offset) {
          var relative = "undefined" === typeof offset;
          relative && (offset = this.offset);
          if (!this.noAssert) {
            if ("number" === typeof value) value = Long.fromNumber(value); else if ("string" === typeof value) value = Long.fromString(value); else if (!(value && value instanceof Long)) throw TypeError("Illegal value: " + value + " (not an integer or Long)");
            if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
          }
          "number" === typeof value ? value = Long.fromNumber(value, false) : "string" === typeof value ? value = Long.fromString(value, false) : false !== value.unsigned && (value = value.toSigned());
          var size = ByteBuffer.calculateVarint64(value), part0 = value.toInt() >>> 0, part1 = value.shiftRightUnsigned(28).toInt() >>> 0, part2 = value.shiftRightUnsigned(56).toInt() >>> 0;
          offset += size;
          var capacity11 = this.buffer.byteLength;
          offset > capacity11 && this.resize((capacity11 *= 2) > offset ? capacity11 : offset);
          offset -= size;
          switch (size) {
           case 10:
            this.view[offset + 9] = part2 >>> 7 & 1;

           case 9:
            this.view[offset + 8] = 9 !== size ? 128 | part2 : 127 & part2;

           case 8:
            this.view[offset + 7] = 8 !== size ? part1 >>> 21 | 128 : part1 >>> 21 & 127;

           case 7:
            this.view[offset + 6] = 7 !== size ? part1 >>> 14 | 128 : part1 >>> 14 & 127;

           case 6:
            this.view[offset + 5] = 6 !== size ? part1 >>> 7 | 128 : part1 >>> 7 & 127;

           case 5:
            this.view[offset + 4] = 5 !== size ? 128 | part1 : 127 & part1;

           case 4:
            this.view[offset + 3] = 4 !== size ? part0 >>> 21 | 128 : part0 >>> 21 & 127;

           case 3:
            this.view[offset + 2] = 3 !== size ? part0 >>> 14 | 128 : part0 >>> 14 & 127;

           case 2:
            this.view[offset + 1] = 2 !== size ? part0 >>> 7 | 128 : part0 >>> 7 & 127;

           case 1:
            this.view[offset] = 1 !== size ? 128 | part0 : 127 & part0;
          }
          if (relative) {
            this.offset += size;
            return this;
          }
          return size;
        };
        ByteBufferPrototype.writeVarint64ZigZag = function(value, offset) {
          return this.writeVarint64(ByteBuffer.zigZagEncode64(value), offset);
        };
        ByteBufferPrototype.readVarint64 = function(offset) {
          var relative = "undefined" === typeof offset;
          relative && (offset = this.offset);
          if (!this.noAssert) {
            if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+1) <= " + this.buffer.byteLength);
          }
          var start = offset, part0 = 0, part1 = 0, part2 = 0, b = 0;
          b = this.view[offset++];
          part0 = 127 & b;
          if (128 & b) {
            b = this.view[offset++];
            part0 |= (127 & b) << 7;
            if (128 & b || this.noAssert && "undefined" === typeof b) {
              b = this.view[offset++];
              part0 |= (127 & b) << 14;
              if (128 & b || this.noAssert && "undefined" === typeof b) {
                b = this.view[offset++];
                part0 |= (127 & b) << 21;
                if (128 & b || this.noAssert && "undefined" === typeof b) {
                  b = this.view[offset++];
                  part1 = 127 & b;
                  if (128 & b || this.noAssert && "undefined" === typeof b) {
                    b = this.view[offset++];
                    part1 |= (127 & b) << 7;
                    if (128 & b || this.noAssert && "undefined" === typeof b) {
                      b = this.view[offset++];
                      part1 |= (127 & b) << 14;
                      if (128 & b || this.noAssert && "undefined" === typeof b) {
                        b = this.view[offset++];
                        part1 |= (127 & b) << 21;
                        if (128 & b || this.noAssert && "undefined" === typeof b) {
                          b = this.view[offset++];
                          part2 = 127 & b;
                          if (128 & b || this.noAssert && "undefined" === typeof b) {
                            b = this.view[offset++];
                            part2 |= (127 & b) << 7;
                            if (128 & b || this.noAssert && "undefined" === typeof b) throw Error("Buffer overrun");
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          var value = Long.fromBits(part0 | part1 << 28, part1 >>> 4 | part2 << 24, false);
          if (relative) {
            this.offset = offset;
            return value;
          }
          return {
            value: value,
            length: offset - start
          };
        };
        ByteBufferPrototype.readVarint64ZigZag = function(offset) {
          var val = this.readVarint64(offset);
          val && val["value"] instanceof Long ? val["value"] = ByteBuffer.zigZagDecode64(val["value"]) : val = ByteBuffer.zigZagDecode64(val);
          return val;
        };
      }
      ByteBufferPrototype.writeCString = function(str, offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        var i, k = str.length;
        if (!this.noAssert) {
          if ("string" !== typeof str) throw TypeError("Illegal str: Not a string");
          for (i = 0; i < k; ++i) if (0 === str.charCodeAt(i)) throw RangeError("Illegal str: Contains NULL-characters");
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        k = utfx.calculateUTF16asUTF8(stringSource(str))[1];
        offset += k + 1;
        var capacity12 = this.buffer.byteLength;
        offset > capacity12 && this.resize((capacity12 *= 2) > offset ? capacity12 : offset);
        offset -= k + 1;
        utfx.encodeUTF16toUTF8(stringSource(str), function(b) {
          this.view[offset++] = b;
        }.bind(this));
        this.view[offset++] = 0;
        if (relative) {
          this.offset = offset;
          return this;
        }
        return k;
      };
      ByteBufferPrototype.readCString = function(offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+1) <= " + this.buffer.byteLength);
        }
        var start = offset, temp;
        var sd, b = -1;
        utfx.decodeUTF8toUTF16(function() {
          if (0 === b) return null;
          if (offset >= this.limit) throw RangeError("Illegal range: Truncated data, " + offset + " < " + this.limit);
          b = this.view[offset++];
          return 0 === b ? null : b;
        }.bind(this), sd = stringDestination(), true);
        if (relative) {
          this.offset = offset;
          return sd();
        }
        return {
          string: sd(),
          length: offset - start
        };
      };
      ByteBufferPrototype.writeIString = function(str, offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("string" !== typeof str) throw TypeError("Illegal str: Not a string");
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        var start = offset, k;
        k = utfx.calculateUTF16asUTF8(stringSource(str), this.noAssert)[1];
        offset += 4 + k;
        var capacity13 = this.buffer.byteLength;
        offset > capacity13 && this.resize((capacity13 *= 2) > offset ? capacity13 : offset);
        offset -= 4 + k;
        if (this.littleEndian) {
          this.view[offset + 3] = k >>> 24 & 255;
          this.view[offset + 2] = k >>> 16 & 255;
          this.view[offset + 1] = k >>> 8 & 255;
          this.view[offset] = 255 & k;
        } else {
          this.view[offset] = k >>> 24 & 255;
          this.view[offset + 1] = k >>> 16 & 255;
          this.view[offset + 2] = k >>> 8 & 255;
          this.view[offset + 3] = 255 & k;
        }
        offset += 4;
        utfx.encodeUTF16toUTF8(stringSource(str), function(b) {
          this.view[offset++] = b;
        }.bind(this));
        if (offset !== start + 4 + k) throw RangeError("Illegal range: Truncated data, " + offset + " == " + (offset + 4 + k));
        if (relative) {
          this.offset = offset;
          return this;
        }
        return offset - start;
      };
      ByteBufferPrototype.readIString = function(offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 4 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+4) <= " + this.buffer.byteLength);
        }
        var start = offset;
        var len = this.readUint32(offset);
        var str = this.readUTF8String(len, ByteBuffer.METRICS_BYTES, offset += 4);
        offset += str["length"];
        if (relative) {
          this.offset = offset;
          return str["string"];
        }
        return {
          string: str["string"],
          length: offset - start
        };
      };
      ByteBuffer.METRICS_CHARS = "c";
      ByteBuffer.METRICS_BYTES = "b";
      ByteBufferPrototype.writeUTF8String = function(str, offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        var k;
        var start = offset;
        k = utfx.calculateUTF16asUTF8(stringSource(str))[1];
        offset += k;
        var capacity14 = this.buffer.byteLength;
        offset > capacity14 && this.resize((capacity14 *= 2) > offset ? capacity14 : offset);
        offset -= k;
        utfx.encodeUTF16toUTF8(stringSource(str), function(b) {
          this.view[offset++] = b;
        }.bind(this));
        if (relative) {
          this.offset = offset;
          return this;
        }
        return offset - start;
      };
      ByteBufferPrototype.writeString = ByteBufferPrototype.writeUTF8String;
      ByteBuffer.calculateUTF8Chars = function(str) {
        return utfx.calculateUTF16asUTF8(stringSource(str))[0];
      };
      ByteBuffer.calculateUTF8Bytes = function(str) {
        return utfx.calculateUTF16asUTF8(stringSource(str))[1];
      };
      ByteBuffer.calculateString = ByteBuffer.calculateUTF8Bytes;
      ByteBufferPrototype.readUTF8String = function(length, metrics, offset) {
        if ("number" === typeof metrics) {
          offset = metrics;
          metrics = void 0;
        }
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        "undefined" === typeof metrics && (metrics = ByteBuffer.METRICS_CHARS);
        if (!this.noAssert) {
          if ("number" !== typeof length || length % 1 !== 0) throw TypeError("Illegal length: " + length + " (not an integer)");
          length |= 0;
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        var i = 0, start = offset, sd;
        if (metrics === ByteBuffer.METRICS_CHARS) {
          sd = stringDestination();
          utfx.decodeUTF8(function() {
            return i < length && offset < this.limit ? this.view[offset++] : null;
          }.bind(this), function(cp) {
            ++i;
            utfx.UTF8toUTF16(cp, sd);
          });
          if (i !== length) throw RangeError("Illegal range: Truncated data, " + i + " == " + length);
          if (relative) {
            this.offset = offset;
            return sd();
          }
          return {
            string: sd(),
            length: offset - start
          };
        }
        if (metrics === ByteBuffer.METRICS_BYTES) {
          if (!this.noAssert) {
            if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + length > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+" + length + ") <= " + this.buffer.byteLength);
          }
          var k = offset + length;
          utfx.decodeUTF8toUTF16(function() {
            return offset < k ? this.view[offset++] : null;
          }.bind(this), sd = stringDestination(), this.noAssert);
          if (offset !== k) throw RangeError("Illegal range: Truncated data, " + offset + " == " + k);
          if (relative) {
            this.offset = offset;
            return sd();
          }
          return {
            string: sd(),
            length: offset - start
          };
        }
        throw TypeError("Unsupported metrics: " + metrics);
      };
      ByteBufferPrototype.readString = ByteBufferPrototype.readUTF8String;
      ByteBufferPrototype.writeVString = function(str, offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("string" !== typeof str) throw TypeError("Illegal str: Not a string");
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        var start = offset, k, l;
        k = utfx.calculateUTF16asUTF8(stringSource(str), this.noAssert)[1];
        l = ByteBuffer.calculateVarint32(k);
        offset += l + k;
        var capacity15 = this.buffer.byteLength;
        offset > capacity15 && this.resize((capacity15 *= 2) > offset ? capacity15 : offset);
        offset -= l + k;
        offset += this.writeVarint32(k, offset);
        utfx.encodeUTF16toUTF8(stringSource(str), function(b) {
          this.view[offset++] = b;
        }.bind(this));
        if (offset !== start + k + l) throw RangeError("Illegal range: Truncated data, " + offset + " == " + (offset + k + l));
        if (relative) {
          this.offset = offset;
          return this;
        }
        return offset - start;
      };
      ByteBufferPrototype.readVString = function(offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+1) <= " + this.buffer.byteLength);
        }
        var start = offset;
        var len = this.readVarint32(offset);
        var str = this.readUTF8String(len["value"], ByteBuffer.METRICS_BYTES, offset += len["length"]);
        offset += str["length"];
        if (relative) {
          this.offset = offset;
          return str["string"];
        }
        return {
          string: str["string"],
          length: offset - start
        };
      };
      ByteBufferPrototype.append = function(source, encoding, offset) {
        if ("number" === typeof encoding || "string" !== typeof encoding) {
          offset = encoding;
          encoding = void 0;
        }
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        source instanceof ByteBuffer || (source = ByteBuffer.wrap(source, encoding));
        var length = source.limit - source.offset;
        if (length <= 0) return this;
        offset += length;
        var capacity16 = this.buffer.byteLength;
        offset > capacity16 && this.resize((capacity16 *= 2) > offset ? capacity16 : offset);
        offset -= length;
        this.view.set(source.view.subarray(source.offset, source.limit), offset);
        source.offset += length;
        relative && (this.offset += length);
        return this;
      };
      ByteBufferPrototype.appendTo = function(target, offset) {
        target.append(this, offset);
        return this;
      };
      ByteBufferPrototype.assert = function(assert) {
        this.noAssert = !assert;
        return this;
      };
      ByteBufferPrototype.capacity = function() {
        return this.buffer.byteLength;
      };
      ByteBufferPrototype.clear = function() {
        this.offset = 0;
        this.limit = this.buffer.byteLength;
        this.markedOffset = -1;
        return this;
      };
      ByteBufferPrototype.clone = function(copy) {
        var bb = new ByteBuffer(0, this.littleEndian, this.noAssert);
        if (copy) {
          bb.buffer = new ArrayBuffer(this.buffer.byteLength);
          bb.view = new Uint8Array(bb.buffer);
        } else {
          bb.buffer = this.buffer;
          bb.view = this.view;
        }
        bb.offset = this.offset;
        bb.markedOffset = this.markedOffset;
        bb.limit = this.limit;
        return bb;
      };
      ByteBufferPrototype.compact = function(begin, end) {
        "undefined" === typeof begin && (begin = this.offset);
        "undefined" === typeof end && (end = this.limit);
        if (!this.noAssert) {
          if ("number" !== typeof begin || begin % 1 !== 0) throw TypeError("Illegal begin: Not an integer");
          begin >>>= 0;
          if ("number" !== typeof end || end % 1 !== 0) throw TypeError("Illegal end: Not an integer");
          end >>>= 0;
          if (begin < 0 || begin > end || end > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + begin + " <= " + end + " <= " + this.buffer.byteLength);
        }
        if (0 === begin && end === this.buffer.byteLength) return this;
        var len = end - begin;
        if (0 === len) {
          this.buffer = EMPTY_BUFFER;
          this.view = null;
          this.markedOffset >= 0 && (this.markedOffset -= begin);
          this.offset = 0;
          this.limit = 0;
          return this;
        }
        var buffer = new ArrayBuffer(len);
        var view = new Uint8Array(buffer);
        view.set(this.view.subarray(begin, end));
        this.buffer = buffer;
        this.view = view;
        this.markedOffset >= 0 && (this.markedOffset -= begin);
        this.offset = 0;
        this.limit = len;
        return this;
      };
      ByteBufferPrototype.copy = function(begin, end) {
        "undefined" === typeof begin && (begin = this.offset);
        "undefined" === typeof end && (end = this.limit);
        if (!this.noAssert) {
          if ("number" !== typeof begin || begin % 1 !== 0) throw TypeError("Illegal begin: Not an integer");
          begin >>>= 0;
          if ("number" !== typeof end || end % 1 !== 0) throw TypeError("Illegal end: Not an integer");
          end >>>= 0;
          if (begin < 0 || begin > end || end > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + begin + " <= " + end + " <= " + this.buffer.byteLength);
        }
        if (begin === end) return new ByteBuffer(0, this.littleEndian, this.noAssert);
        var capacity = end - begin, bb = new ByteBuffer(capacity, this.littleEndian, this.noAssert);
        bb.offset = 0;
        bb.limit = capacity;
        bb.markedOffset >= 0 && (bb.markedOffset -= begin);
        this.copyTo(bb, 0, begin, end);
        return bb;
      };
      ByteBufferPrototype.copyTo = function(target, targetOffset, sourceOffset, sourceLimit) {
        var relative, targetRelative;
        if (!this.noAssert && !ByteBuffer.isByteBuffer(target)) throw TypeError("Illegal target: Not a ByteBuffer");
        targetOffset = (targetRelative = "undefined" === typeof targetOffset) ? target.offset : 0 | targetOffset;
        sourceOffset = (relative = "undefined" === typeof sourceOffset) ? this.offset : 0 | sourceOffset;
        sourceLimit = "undefined" === typeof sourceLimit ? this.limit : 0 | sourceLimit;
        if (targetOffset < 0 || targetOffset > target.buffer.byteLength) throw RangeError("Illegal target range: 0 <= " + targetOffset + " <= " + target.buffer.byteLength);
        if (sourceOffset < 0 || sourceLimit > this.buffer.byteLength) throw RangeError("Illegal source range: 0 <= " + sourceOffset + " <= " + this.buffer.byteLength);
        var len = sourceLimit - sourceOffset;
        if (0 === len) return target;
        target.ensureCapacity(targetOffset + len);
        target.view.set(this.view.subarray(sourceOffset, sourceLimit), targetOffset);
        relative && (this.offset += len);
        targetRelative && (target.offset += len);
        return this;
      };
      ByteBufferPrototype.ensureCapacity = function(capacity) {
        var current = this.buffer.byteLength;
        if (current < capacity) return this.resize((current *= 2) > capacity ? current : capacity);
        return this;
      };
      ByteBufferPrototype.fill = function(value, begin, end) {
        var relative = "undefined" === typeof begin;
        relative && (begin = this.offset);
        "string" === typeof value && value.length > 0 && (value = value.charCodeAt(0));
        "undefined" === typeof begin && (begin = this.offset);
        "undefined" === typeof end && (end = this.limit);
        if (!this.noAssert) {
          if ("number" !== typeof value || value % 1 !== 0) throw TypeError("Illegal value: " + value + " (not an integer)");
          value |= 0;
          if ("number" !== typeof begin || begin % 1 !== 0) throw TypeError("Illegal begin: Not an integer");
          begin >>>= 0;
          if ("number" !== typeof end || end % 1 !== 0) throw TypeError("Illegal end: Not an integer");
          end >>>= 0;
          if (begin < 0 || begin > end || end > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + begin + " <= " + end + " <= " + this.buffer.byteLength);
        }
        if (begin >= end) return this;
        while (begin < end) this.view[begin++] = value;
        relative && (this.offset = begin);
        return this;
      };
      ByteBufferPrototype.flip = function() {
        this.limit = this.offset;
        this.offset = 0;
        return this;
      };
      ByteBufferPrototype.mark = function(offset) {
        offset = "undefined" === typeof offset ? this.offset : offset;
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        this.markedOffset = offset;
        return this;
      };
      ByteBufferPrototype.order = function(littleEndian) {
        if (!this.noAssert && "boolean" !== typeof littleEndian) throw TypeError("Illegal littleEndian: Not a boolean");
        this.littleEndian = !!littleEndian;
        return this;
      };
      ByteBufferPrototype.LE = function(littleEndian) {
        this.littleEndian = "undefined" === typeof littleEndian || !!littleEndian;
        return this;
      };
      ByteBufferPrototype.BE = function(bigEndian) {
        this.littleEndian = "undefined" !== typeof bigEndian && !bigEndian;
        return this;
      };
      ByteBufferPrototype.prepend = function(source, encoding, offset) {
        if ("number" === typeof encoding || "string" !== typeof encoding) {
          offset = encoding;
          encoding = void 0;
        }
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        source instanceof ByteBuffer || (source = ByteBuffer.wrap(source, encoding));
        var len = source.limit - source.offset;
        if (len <= 0) return this;
        var diff = len - offset;
        if (diff > 0) {
          var buffer = new ArrayBuffer(this.buffer.byteLength + diff);
          var view = new Uint8Array(buffer);
          view.set(this.view.subarray(offset, this.buffer.byteLength), len);
          this.buffer = buffer;
          this.view = view;
          this.offset += diff;
          this.markedOffset >= 0 && (this.markedOffset += diff);
          this.limit += diff;
          offset += diff;
        } else var arrayView = new Uint8Array(this.buffer);
        this.view.set(source.view.subarray(source.offset, source.limit), offset - len);
        source.offset = source.limit;
        relative && (this.offset -= len);
        return this;
      };
      ByteBufferPrototype.prependTo = function(target, offset) {
        target.prepend(this, offset);
        return this;
      };
      ByteBufferPrototype.printDebug = function(out) {
        "function" !== typeof out && (out = console.log.bind(console));
        out(this.toString() + "\n-------------------------------------------------------------------\n" + this.toDebug(true));
      };
      ByteBufferPrototype.remaining = function() {
        return this.limit - this.offset;
      };
      ByteBufferPrototype.reset = function() {
        if (this.markedOffset >= 0) {
          this.offset = this.markedOffset;
          this.markedOffset = -1;
        } else this.offset = 0;
        return this;
      };
      ByteBufferPrototype.resize = function(capacity) {
        if (!this.noAssert) {
          if ("number" !== typeof capacity || capacity % 1 !== 0) throw TypeError("Illegal capacity: " + capacity + " (not an integer)");
          capacity |= 0;
          if (capacity < 0) throw RangeError("Illegal capacity: 0 <= " + capacity);
        }
        if (this.buffer.byteLength < capacity) {
          var buffer = new ArrayBuffer(capacity);
          var view = new Uint8Array(buffer);
          view.set(this.view);
          this.buffer = buffer;
          this.view = view;
        }
        return this;
      };
      ByteBufferPrototype.reverse = function(begin, end) {
        "undefined" === typeof begin && (begin = this.offset);
        "undefined" === typeof end && (end = this.limit);
        if (!this.noAssert) {
          if ("number" !== typeof begin || begin % 1 !== 0) throw TypeError("Illegal begin: Not an integer");
          begin >>>= 0;
          if ("number" !== typeof end || end % 1 !== 0) throw TypeError("Illegal end: Not an integer");
          end >>>= 0;
          if (begin < 0 || begin > end || end > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + begin + " <= " + end + " <= " + this.buffer.byteLength);
        }
        if (begin === end) return this;
        Array.prototype.reverse.call(this.view.subarray(begin, end));
        return this;
      };
      ByteBufferPrototype.skip = function(length) {
        if (!this.noAssert) {
          if ("number" !== typeof length || length % 1 !== 0) throw TypeError("Illegal length: " + length + " (not an integer)");
          length |= 0;
        }
        var offset = this.offset + length;
        if (!this.noAssert && (offset < 0 || offset > this.buffer.byteLength)) throw RangeError("Illegal length: 0 <= " + this.offset + " + " + length + " <= " + this.buffer.byteLength);
        this.offset = offset;
        return this;
      };
      ByteBufferPrototype.slice = function(begin, end) {
        "undefined" === typeof begin && (begin = this.offset);
        "undefined" === typeof end && (end = this.limit);
        if (!this.noAssert) {
          if ("number" !== typeof begin || begin % 1 !== 0) throw TypeError("Illegal begin: Not an integer");
          begin >>>= 0;
          if ("number" !== typeof end || end % 1 !== 0) throw TypeError("Illegal end: Not an integer");
          end >>>= 0;
          if (begin < 0 || begin > end || end > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + begin + " <= " + end + " <= " + this.buffer.byteLength);
        }
        var bb = this.clone();
        bb.offset = begin;
        bb.limit = end;
        return bb;
      };
      ByteBufferPrototype.toBuffer = function(forceCopy) {
        var offset = this.offset, limit = this.limit;
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: Not an integer");
          offset >>>= 0;
          if ("number" !== typeof limit || limit % 1 !== 0) throw TypeError("Illegal limit: Not an integer");
          limit >>>= 0;
          if (offset < 0 || offset > limit || limit > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + offset + " <= " + limit + " <= " + this.buffer.byteLength);
        }
        if (!forceCopy && 0 === offset && limit === this.buffer.byteLength) return this.buffer;
        if (offset === limit) return EMPTY_BUFFER;
        var buffer = new ArrayBuffer(limit - offset);
        new Uint8Array(buffer).set(new Uint8Array(this.buffer).subarray(offset, limit), 0);
        return buffer;
      };
      ByteBufferPrototype.toArrayBuffer = ByteBufferPrototype.toBuffer;
      ByteBufferPrototype.toString = function(encoding, begin, end) {
        if ("undefined" === typeof encoding) return "ByteBufferAB(offset=" + this.offset + ",markedOffset=" + this.markedOffset + ",limit=" + this.limit + ",capacity=" + this.capacity() + ")";
        "number" === typeof encoding && (encoding = "utf8", begin = encoding, end = begin);
        switch (encoding) {
         case "utf8":
          return this.toUTF8(begin, end);

         case "base64":
          return this.toBase64(begin, end);

         case "hex":
          return this.toHex(begin, end);

         case "binary":
          return this.toBinary(begin, end);

         case "debug":
          return this.toDebug();

         case "columns":
          return this.toColumns();

         default:
          throw Error("Unsupported encoding: " + encoding);
        }
      };
      var lxiv = function() {
        var lxiv = {};
        var aout = [ 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 43, 47 ];
        var ain = [];
        for (var i = 0, k = aout.length; i < k; ++i) ain[aout[i]] = i;
        lxiv.encode = function(src, dst) {
          var b, t;
          while (null !== (b = src())) {
            dst(aout[b >> 2 & 63]);
            t = (3 & b) << 4;
            if (null !== (b = src())) {
              t |= b >> 4 & 15;
              dst(aout[63 & (t | b >> 4 & 15)]);
              t = (15 & b) << 2;
              null !== (b = src()) ? (dst(aout[63 & (t | b >> 6 & 3)]), dst(aout[63 & b])) : (dst(aout[63 & t]), 
              dst(61));
            } else dst(aout[63 & t]), dst(61), dst(61);
          }
        };
        lxiv.decode = function(src, dst) {
          var c, t1, t2;
          function fail(c) {
            throw Error("Illegal character code: " + c);
          }
          while (null !== (c = src())) {
            t1 = ain[c];
            "undefined" === typeof t1 && fail(c);
            if (null !== (c = src())) {
              t2 = ain[c];
              "undefined" === typeof t2 && fail(c);
              dst(t1 << 2 >>> 0 | (48 & t2) >> 4);
              if (null !== (c = src())) {
                t1 = ain[c];
                if ("undefined" === typeof t1) {
                  if (61 === c) break;
                  fail(c);
                }
                dst((15 & t2) << 4 >>> 0 | (60 & t1) >> 2);
                if (null !== (c = src())) {
                  t2 = ain[c];
                  if ("undefined" === typeof t2) {
                    if (61 === c) break;
                    fail(c);
                  }
                  dst((3 & t1) << 6 >>> 0 | t2);
                }
              }
            }
          }
        };
        lxiv.test = function(str) {
          return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(str);
        };
        return lxiv;
      }();
      ByteBufferPrototype.toBase64 = function(begin, end) {
        "undefined" === typeof begin && (begin = this.offset);
        "undefined" === typeof end && (end = this.limit);
        begin |= 0;
        end |= 0;
        if (begin < 0 || end > this.capacity || begin > end) throw RangeError("begin, end");
        var sd;
        lxiv.encode(function() {
          return begin < end ? this.view[begin++] : null;
        }.bind(this), sd = stringDestination());
        return sd();
      };
      ByteBuffer.fromBase64 = function(str, littleEndian) {
        if ("string" !== typeof str) throw TypeError("str");
        var bb = new ByteBuffer(str.length / 4 * 3, littleEndian), i = 0;
        lxiv.decode(stringSource(str), function(b) {
          bb.view[i++] = b;
        });
        bb.limit = i;
        return bb;
      };
      ByteBuffer.btoa = function(str) {
        return ByteBuffer.fromBinary(str).toBase64();
      };
      ByteBuffer.atob = function(b64) {
        return ByteBuffer.fromBase64(b64).toBinary();
      };
      ByteBufferPrototype.toBinary = function(begin, end) {
        "undefined" === typeof begin && (begin = this.offset);
        "undefined" === typeof end && (end = this.limit);
        begin |= 0;
        end |= 0;
        if (begin < 0 || end > this.capacity() || begin > end) throw RangeError("begin, end");
        if (begin === end) return "";
        var chars = [], parts = [];
        while (begin < end) {
          chars.push(this.view[begin++]);
          chars.length >= 1024 && (parts.push(String.fromCharCode.apply(String, chars)), chars = []);
        }
        return parts.join("") + String.fromCharCode.apply(String, chars);
      };
      ByteBuffer.fromBinary = function(str, littleEndian) {
        if ("string" !== typeof str) throw TypeError("str");
        var i = 0, k = str.length, charCode, bb = new ByteBuffer(k, littleEndian);
        while (i < k) {
          charCode = str.charCodeAt(i);
          if (charCode > 255) throw RangeError("illegal char code: " + charCode);
          bb.view[i++] = charCode;
        }
        bb.limit = k;
        return bb;
      };
      ByteBufferPrototype.toDebug = function(columns) {
        var i = -1, k = this.buffer.byteLength, b, hex = "", asc = "", out = "";
        while (i < k) {
          if (-1 !== i) {
            b = this.view[i];
            hex += b < 16 ? "0" + b.toString(16).toUpperCase() : b.toString(16).toUpperCase();
            columns && (asc += b > 32 && b < 127 ? String.fromCharCode(b) : ".");
          }
          ++i;
          if (columns && i > 0 && i % 16 === 0 && i !== k) {
            while (hex.length < 51) hex += " ";
            out += hex + asc + "\n";
            hex = asc = "";
          }
          i === this.offset && i === this.limit ? hex += i === this.markedOffset ? "!" : "|" : i === this.offset ? hex += i === this.markedOffset ? "[" : "<" : i === this.limit ? hex += i === this.markedOffset ? "]" : ">" : hex += i === this.markedOffset ? "'" : columns || 0 !== i && i !== k ? " " : "";
        }
        if (columns && " " !== hex) {
          while (hex.length < 51) hex += " ";
          out += hex + asc + "\n";
        }
        return columns ? out : hex;
      };
      ByteBuffer.fromDebug = function(str, littleEndian, noAssert) {
        var k = str.length, bb = new ByteBuffer((k + 1) / 3 | 0, littleEndian, noAssert);
        var i = 0, j = 0, ch, b, rs = false, ho = false, hm = false, hl = false, fail = false;
        while (i < k) {
          switch (ch = str.charAt(i++)) {
           case "!":
            if (!noAssert) {
              if (ho || hm || hl) {
                fail = true;
                break;
              }
              ho = hm = hl = true;
            }
            bb.offset = bb.markedOffset = bb.limit = j;
            rs = false;
            break;

           case "|":
            if (!noAssert) {
              if (ho || hl) {
                fail = true;
                break;
              }
              ho = hl = true;
            }
            bb.offset = bb.limit = j;
            rs = false;
            break;

           case "[":
            if (!noAssert) {
              if (ho || hm) {
                fail = true;
                break;
              }
              ho = hm = true;
            }
            bb.offset = bb.markedOffset = j;
            rs = false;
            break;

           case "<":
            if (!noAssert) {
              if (ho) {
                fail = true;
                break;
              }
              ho = true;
            }
            bb.offset = j;
            rs = false;
            break;

           case "]":
            if (!noAssert) {
              if (hl || hm) {
                fail = true;
                break;
              }
              hl = hm = true;
            }
            bb.limit = bb.markedOffset = j;
            rs = false;
            break;

           case ">":
            if (!noAssert) {
              if (hl) {
                fail = true;
                break;
              }
              hl = true;
            }
            bb.limit = j;
            rs = false;
            break;

           case "'":
            if (!noAssert) {
              if (hm) {
                fail = true;
                break;
              }
              hm = true;
            }
            bb.markedOffset = j;
            rs = false;
            break;

           case " ":
            rs = false;
            break;

           default:
            if (!noAssert && rs) {
              fail = true;
              break;
            }
            b = parseInt(ch + str.charAt(i++), 16);
            if (!noAssert && (isNaN(b) || b < 0 || b > 255)) throw TypeError("Illegal str: Not a debug encoded string");
            bb.view[j++] = b;
            rs = true;
          }
          if (fail) throw TypeError("Illegal str: Invalid symbol at " + i);
        }
        if (!noAssert) {
          if (!ho || !hl) throw TypeError("Illegal str: Missing offset or limit");
          if (j < bb.buffer.byteLength) throw TypeError("Illegal str: Not a debug encoded string (is it hex?) " + j + " < " + k);
        }
        return bb;
      };
      ByteBufferPrototype.toHex = function(begin, end) {
        begin = "undefined" === typeof begin ? this.offset : begin;
        end = "undefined" === typeof end ? this.limit : end;
        if (!this.noAssert) {
          if ("number" !== typeof begin || begin % 1 !== 0) throw TypeError("Illegal begin: Not an integer");
          begin >>>= 0;
          if ("number" !== typeof end || end % 1 !== 0) throw TypeError("Illegal end: Not an integer");
          end >>>= 0;
          if (begin < 0 || begin > end || end > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + begin + " <= " + end + " <= " + this.buffer.byteLength);
        }
        var out = new Array(end - begin), b;
        while (begin < end) {
          b = this.view[begin++];
          b < 16 ? out.push("0", b.toString(16)) : out.push(b.toString(16));
        }
        return out.join("");
      };
      ByteBuffer.fromHex = function(str, littleEndian, noAssert) {
        if (!noAssert) {
          if ("string" !== typeof str) throw TypeError("Illegal str: Not a string");
          if (str.length % 2 !== 0) throw TypeError("Illegal str: Length not a multiple of 2");
        }
        var k = str.length, bb = new ByteBuffer(k / 2 | 0, littleEndian), b;
        for (var i = 0, j = 0; i < k; i += 2) {
          b = parseInt(str.substring(i, i + 2), 16);
          if (!noAssert && (!isFinite(b) || b < 0 || b > 255)) throw TypeError("Illegal str: Contains non-hex characters");
          bb.view[j++] = b;
        }
        bb.limit = j;
        return bb;
      };
      var utfx = function() {
        var utfx = {};
        utfx.MAX_CODEPOINT = 1114111;
        utfx.encodeUTF8 = function(src, dst) {
          var cp = null;
          "number" === typeof src && (cp = src, src = function src() {
            return null;
          });
          while (null !== cp || null !== (cp = src())) {
            cp < 128 ? dst(127 & cp) : cp < 2048 ? (dst(cp >> 6 & 31 | 192), dst(63 & cp | 128)) : cp < 65536 ? (dst(cp >> 12 & 15 | 224), 
            dst(cp >> 6 & 63 | 128), dst(63 & cp | 128)) : (dst(cp >> 18 & 7 | 240), dst(cp >> 12 & 63 | 128), 
            dst(cp >> 6 & 63 | 128), dst(63 & cp | 128));
            cp = null;
          }
        };
        utfx.decodeUTF8 = function(src, dst) {
          var a, b, c, d, fail = function fail(b) {
            b = b.slice(0, b.indexOf(null));
            var err = Error(b.toString());
            err.name = "TruncatedError";
            err["bytes"] = b;
            throw err;
          };
          while (null !== (a = src())) if (0 === (128 & a)) dst(a); else if (192 === (224 & a)) null === (b = src()) && fail([ a, b ]), 
          dst((31 & a) << 6 | 63 & b); else if (224 === (240 & a)) (null === (b = src()) || null === (c = src())) && fail([ a, b, c ]), 
          dst((15 & a) << 12 | (63 & b) << 6 | 63 & c); else {
            if (240 !== (248 & a)) throw RangeError("Illegal starting byte: " + a);
            (null === (b = src()) || null === (c = src()) || null === (d = src())) && fail([ a, b, c, d ]), 
            dst((7 & a) << 18 | (63 & b) << 12 | (63 & c) << 6 | 63 & d);
          }
        };
        utfx.UTF16toUTF8 = function(src, dst) {
          var c1, c2 = null;
          while (true) {
            if (null === (c1 = null !== c2 ? c2 : src())) break;
            if (c1 >= 55296 && c1 <= 57343 && null !== (c2 = src()) && c2 >= 56320 && c2 <= 57343) {
              dst(1024 * (c1 - 55296) + c2 - 56320 + 65536);
              c2 = null;
              continue;
            }
            dst(c1);
          }
          null !== c2 && dst(c2);
        };
        utfx.UTF8toUTF16 = function(src, dst) {
          var cp = null;
          "number" === typeof src && (cp = src, src = function src() {
            return null;
          });
          while (null !== cp || null !== (cp = src())) {
            cp <= 65535 ? dst(cp) : (cp -= 65536, dst(55296 + (cp >> 10)), dst(cp % 1024 + 56320));
            cp = null;
          }
        };
        utfx.encodeUTF16toUTF8 = function(src, dst) {
          utfx.UTF16toUTF8(src, function(cp) {
            utfx.encodeUTF8(cp, dst);
          });
        };
        utfx.decodeUTF8toUTF16 = function(src, dst) {
          utfx.decodeUTF8(src, function(cp) {
            utfx.UTF8toUTF16(cp, dst);
          });
        };
        utfx.calculateCodePoint = function(cp) {
          return cp < 128 ? 1 : cp < 2048 ? 2 : cp < 65536 ? 3 : 4;
        };
        utfx.calculateUTF8 = function(src) {
          var cp, l = 0;
          while (null !== (cp = src())) l += cp < 128 ? 1 : cp < 2048 ? 2 : cp < 65536 ? 3 : 4;
          return l;
        };
        utfx.calculateUTF16asUTF8 = function(src) {
          var n = 0, l = 0;
          utfx.UTF16toUTF8(src, function(cp) {
            ++n;
            l += cp < 128 ? 1 : cp < 2048 ? 2 : cp < 65536 ? 3 : 4;
          });
          return [ n, l ];
        };
        return utfx;
      }();
      ByteBufferPrototype.toUTF8 = function(begin, end) {
        "undefined" === typeof begin && (begin = this.offset);
        "undefined" === typeof end && (end = this.limit);
        if (!this.noAssert) {
          if ("number" !== typeof begin || begin % 1 !== 0) throw TypeError("Illegal begin: Not an integer");
          begin >>>= 0;
          if ("number" !== typeof end || end % 1 !== 0) throw TypeError("Illegal end: Not an integer");
          end >>>= 0;
          if (begin < 0 || begin > end || end > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + begin + " <= " + end + " <= " + this.buffer.byteLength);
        }
        var sd;
        try {
          utfx.decodeUTF8toUTF16(function() {
            return begin < end ? this.view[begin++] : null;
          }.bind(this), sd = stringDestination());
        } catch (e) {
          if (begin !== end) throw RangeError("Illegal range: Truncated data, " + begin + " != " + end);
        }
        return sd();
      };
      ByteBuffer.fromUTF8 = function(str, littleEndian, noAssert) {
        if (!noAssert && "string" !== typeof str) throw TypeError("Illegal str: Not a string");
        var bb = new ByteBuffer(utfx.calculateUTF16asUTF8(stringSource(str), true)[1], littleEndian, noAssert), i = 0;
        utfx.encodeUTF16toUTF8(stringSource(str), function(b) {
          bb.view[i++] = b;
        });
        bb.limit = i;
        return bb;
      };
      return ByteBuffer;
    });
    cc._RF.pop();
  }, {
    long: "long"
  } ],
  config: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bb28crxETlMLJ4IEn2dV+bX", "config");
    "use strict";
    var userSet = cc.Class({
      properties: {
        account: "",
        pwd: ""
      },
      ctor: function ctor() {},
      load: function load() {
        var userData = JSON.parse(cc.sys.localStorage.getItem("userData"));
        if (userData) {
          this.account = userData.account;
          this.pwd = userData.pwd;
        }
      },
      save: function save() {
        cc.sys.localStorage.setItem("userData", JSON.stringify(config));
      },
      saveSetting: function saveSetting(obj) {
        cc.sys.localStorage.setItem("settingData", JSON.stringify(obj));
      },
      getSetting: function getSetting() {
        var settingData = JSON.parse(cc.sys.localStorage.getItem("settingData"));
        return settingData;
      }
    });
    var config = new userSet();
    var GameVersion = {
      curVersion: 1,
      minVersion: 1,
      maxVersion: 1
    };
    var App = {
      Id: "wx565173bf6345d222",
      Secret: "a3fa18c606434de1f7a9e0eea3a3a800"
    };
    module.exports = {
      Instance: config,
      Version: GameVersion,
      App: App
    };
    cc._RF.pop();
  }, {} ],
  long: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e5b44AP2DlEcb+7FcIcYyNt", "long");
    "use strict";
    var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    (function(global, factory) {
      "function" === typeof define && define["amd"] ? define([], factory) : "function" === typeof require && "object" === ("undefined" === typeof module ? "undefined" : _typeof(module)) && module && module["exports"] ? module["exports"] = factory() : (global["dcodeIO"] = global["dcodeIO"] || {})["Long"] = factory();
    })(void 0, function() {
      function Long(low, high, unsigned) {
        this.low = 0 | low;
        this.high = 0 | high;
        this.unsigned = !!unsigned;
      }
      Long.prototype.__isLong__;
      Object.defineProperty(Long.prototype, "__isLong__", {
        value: true,
        enumerable: false,
        configurable: false
      });
      function isLong(obj) {
        return true === (obj && obj["__isLong__"]);
      }
      Long.isLong = isLong;
      var INT_CACHE = {};
      var UINT_CACHE = {};
      function fromInt(value, unsigned) {
        var obj, cachedObj, cache;
        if (unsigned) {
          value >>>= 0;
          if (cache = 0 <= value && value < 256) {
            cachedObj = UINT_CACHE[value];
            if (cachedObj) return cachedObj;
          }
          obj = fromBits(value, (0 | value) < 0 ? -1 : 0, true);
          cache && (UINT_CACHE[value] = obj);
          return obj;
        }
        value |= 0;
        if (cache = -128 <= value && value < 128) {
          cachedObj = INT_CACHE[value];
          if (cachedObj) return cachedObj;
        }
        obj = fromBits(value, value < 0 ? -1 : 0, false);
        cache && (INT_CACHE[value] = obj);
        return obj;
      }
      Long.fromInt = fromInt;
      function fromNumber(value, unsigned) {
        if (isNaN(value) || !isFinite(value)) return unsigned ? UZERO : ZERO;
        if (unsigned) {
          if (value < 0) return UZERO;
          if (value >= TWO_PWR_64_DBL) return MAX_UNSIGNED_VALUE;
        } else {
          if (value <= -TWO_PWR_63_DBL) return MIN_VALUE;
          if (value + 1 >= TWO_PWR_63_DBL) return MAX_VALUE;
        }
        if (value < 0) return fromNumber(-value, unsigned).neg();
        return fromBits(value % TWO_PWR_32_DBL | 0, value / TWO_PWR_32_DBL | 0, unsigned);
      }
      Long.fromNumber = fromNumber;
      function fromBits(lowBits, highBits, unsigned) {
        return new Long(lowBits, highBits, unsigned);
      }
      Long.fromBits = fromBits;
      var pow_dbl = Math.pow;
      function fromString(str, unsigned, radix) {
        if (0 === str.length) throw Error("empty string");
        if ("NaN" === str || "Infinity" === str || "+Infinity" === str || "-Infinity" === str) return ZERO;
        "number" === typeof unsigned ? (radix = unsigned, unsigned = false) : unsigned = !!unsigned;
        radix = radix || 10;
        if (radix < 2 || 36 < radix) throw RangeError("radix");
        var p;
        if ((p = str.indexOf("-")) > 0) throw Error("interior hyphen");
        if (0 === p) return fromString(str.substring(1), unsigned, radix).neg();
        var radixToPower = fromNumber(pow_dbl(radix, 8));
        var result = ZERO;
        for (var i = 0; i < str.length; i += 8) {
          var size = Math.min(8, str.length - i), value = parseInt(str.substring(i, i + size), radix);
          if (size < 8) {
            var power = fromNumber(pow_dbl(radix, size));
            result = result.mul(power).add(fromNumber(value));
          } else {
            result = result.mul(radixToPower);
            result = result.add(fromNumber(value));
          }
        }
        result.unsigned = unsigned;
        return result;
      }
      Long.fromString = fromString;
      function fromValue(val) {
        if (val instanceof Long) return val;
        if ("number" === typeof val) return fromNumber(val);
        if ("string" === typeof val) return fromString(val);
        return fromBits(val.low, val.high, val.unsigned);
      }
      Long.fromValue = fromValue;
      var TWO_PWR_16_DBL = 65536;
      var TWO_PWR_24_DBL = 1 << 24;
      var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;
      var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;
      var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;
      var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);
      var ZERO = fromInt(0);
      Long.ZERO = ZERO;
      var UZERO = fromInt(0, true);
      Long.UZERO = UZERO;
      var ONE = fromInt(1);
      Long.ONE = ONE;
      var UONE = fromInt(1, true);
      Long.UONE = UONE;
      var NEG_ONE = fromInt(-1);
      Long.NEG_ONE = NEG_ONE;
      var MAX_VALUE = fromBits(-1, 2147483647, false);
      Long.MAX_VALUE = MAX_VALUE;
      var MAX_UNSIGNED_VALUE = fromBits(-1, -1, true);
      Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;
      var MIN_VALUE = fromBits(0, -2147483648, false);
      Long.MIN_VALUE = MIN_VALUE;
      var LongPrototype = Long.prototype;
      LongPrototype.toInt = function toInt() {
        return this.unsigned ? this.low >>> 0 : this.low;
      };
      LongPrototype.toNumber = function toNumber() {
        if (this.unsigned) return (this.high >>> 0) * TWO_PWR_32_DBL + (this.low >>> 0);
        return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
      };
      LongPrototype.toString = function toString(radix) {
        radix = radix || 10;
        if (radix < 2 || 36 < radix) throw RangeError("radix");
        if (this.isZero()) return "0";
        if (this.isNegative()) {
          if (this.eq(MIN_VALUE)) {
            var radixLong = fromNumber(radix), div = this.div(radixLong), rem1 = div.mul(radixLong).sub(this);
            return div.toString(radix) + rem1.toInt().toString(radix);
          }
          return "-" + this.neg().toString(radix);
        }
        var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned), rem = this;
        var result = "";
        while (true) {
          var remDiv = rem.div(radixToPower), intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0, digits = intval.toString(radix);
          rem = remDiv;
          if (rem.isZero()) return digits + result;
          while (digits.length < 6) digits = "0" + digits;
          result = "" + digits + result;
        }
      };
      LongPrototype.getHighBits = function getHighBits() {
        return this.high;
      };
      LongPrototype.getHighBitsUnsigned = function getHighBitsUnsigned() {
        return this.high >>> 0;
      };
      LongPrototype.getLowBits = function getLowBits() {
        return this.low;
      };
      LongPrototype.getLowBitsUnsigned = function getLowBitsUnsigned() {
        return this.low >>> 0;
      };
      LongPrototype.getNumBitsAbs = function getNumBitsAbs() {
        if (this.isNegative()) return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
        var val = 0 != this.high ? this.high : this.low;
        for (var bit = 31; bit > 0; bit--) if (0 != (val & 1 << bit)) break;
        return 0 != this.high ? bit + 33 : bit + 1;
      };
      LongPrototype.isZero = function isZero() {
        return 0 === this.high && 0 === this.low;
      };
      LongPrototype.isNegative = function isNegative() {
        return !this.unsigned && this.high < 0;
      };
      LongPrototype.isPositive = function isPositive() {
        return this.unsigned || this.high >= 0;
      };
      LongPrototype.isOdd = function isOdd() {
        return 1 === (1 & this.low);
      };
      LongPrototype.isEven = function isEven() {
        return 0 === (1 & this.low);
      };
      LongPrototype.equals = function equals(other) {
        isLong(other) || (other = fromValue(other));
        if (this.unsigned !== other.unsigned && this.high >>> 31 === 1 && other.high >>> 31 === 1) return false;
        return this.high === other.high && this.low === other.low;
      };
      LongPrototype.eq = LongPrototype.equals;
      LongPrototype.notEquals = function notEquals(other) {
        return !this.eq(other);
      };
      LongPrototype.neq = LongPrototype.notEquals;
      LongPrototype.lessThan = function lessThan(other) {
        return this.comp(other) < 0;
      };
      LongPrototype.lt = LongPrototype.lessThan;
      LongPrototype.lessThanOrEqual = function lessThanOrEqual(other) {
        return this.comp(other) <= 0;
      };
      LongPrototype.lte = LongPrototype.lessThanOrEqual;
      LongPrototype.greaterThan = function greaterThan(other) {
        return this.comp(other) > 0;
      };
      LongPrototype.gt = LongPrototype.greaterThan;
      LongPrototype.greaterThanOrEqual = function greaterThanOrEqual(other) {
        return this.comp(other) >= 0;
      };
      LongPrototype.gte = LongPrototype.greaterThanOrEqual;
      LongPrototype.compare = function compare(other) {
        isLong(other) || (other = fromValue(other));
        if (this.eq(other)) return 0;
        var thisNeg = this.isNegative(), otherNeg = other.isNegative();
        if (thisNeg && !otherNeg) return -1;
        if (!thisNeg && otherNeg) return 1;
        if (!this.unsigned) return this.sub(other).isNegative() ? -1 : 1;
        return other.high >>> 0 > this.high >>> 0 || other.high === this.high && other.low >>> 0 > this.low >>> 0 ? -1 : 1;
      };
      LongPrototype.comp = LongPrototype.compare;
      LongPrototype.negate = function negate() {
        if (!this.unsigned && this.eq(MIN_VALUE)) return MIN_VALUE;
        return this.not().add(ONE);
      };
      LongPrototype.neg = LongPrototype.negate;
      LongPrototype.add = function add(addend) {
        isLong(addend) || (addend = fromValue(addend));
        var a48 = this.high >>> 16;
        var a32 = 65535 & this.high;
        var a16 = this.low >>> 16;
        var a00 = 65535 & this.low;
        var b48 = addend.high >>> 16;
        var b32 = 65535 & addend.high;
        var b16 = addend.low >>> 16;
        var b00 = 65535 & addend.low;
        var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
        c00 += a00 + b00;
        c16 += c00 >>> 16;
        c00 &= 65535;
        c16 += a16 + b16;
        c32 += c16 >>> 16;
        c16 &= 65535;
        c32 += a32 + b32;
        c48 += c32 >>> 16;
        c32 &= 65535;
        c48 += a48 + b48;
        c48 &= 65535;
        return fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
      };
      LongPrototype.subtract = function subtract(subtrahend) {
        isLong(subtrahend) || (subtrahend = fromValue(subtrahend));
        return this.add(subtrahend.neg());
      };
      LongPrototype.sub = LongPrototype.subtract;
      LongPrototype.multiply = function multiply(multiplier) {
        if (this.isZero()) return ZERO;
        isLong(multiplier) || (multiplier = fromValue(multiplier));
        if (multiplier.isZero()) return ZERO;
        if (this.eq(MIN_VALUE)) return multiplier.isOdd() ? MIN_VALUE : ZERO;
        if (multiplier.eq(MIN_VALUE)) return this.isOdd() ? MIN_VALUE : ZERO;
        if (this.isNegative()) return multiplier.isNegative() ? this.neg().mul(multiplier.neg()) : this.neg().mul(multiplier).neg();
        if (multiplier.isNegative()) return this.mul(multiplier.neg()).neg();
        if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24)) return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);
        var a48 = this.high >>> 16;
        var a32 = 65535 & this.high;
        var a16 = this.low >>> 16;
        var a00 = 65535 & this.low;
        var b48 = multiplier.high >>> 16;
        var b32 = 65535 & multiplier.high;
        var b16 = multiplier.low >>> 16;
        var b00 = 65535 & multiplier.low;
        var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
        c00 += a00 * b00;
        c16 += c00 >>> 16;
        c00 &= 65535;
        c16 += a16 * b00;
        c32 += c16 >>> 16;
        c16 &= 65535;
        c16 += a00 * b16;
        c32 += c16 >>> 16;
        c16 &= 65535;
        c32 += a32 * b00;
        c48 += c32 >>> 16;
        c32 &= 65535;
        c32 += a16 * b16;
        c48 += c32 >>> 16;
        c32 &= 65535;
        c32 += a00 * b32;
        c48 += c32 >>> 16;
        c32 &= 65535;
        c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
        c48 &= 65535;
        return fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
      };
      LongPrototype.mul = LongPrototype.multiply;
      LongPrototype.divide = function divide(divisor) {
        isLong(divisor) || (divisor = fromValue(divisor));
        if (divisor.isZero()) throw Error("division by zero");
        if (this.isZero()) return this.unsigned ? UZERO : ZERO;
        var approx, rem, res;
        if (this.unsigned) {
          divisor.unsigned || (divisor = divisor.toUnsigned());
          if (divisor.gt(this)) return UZERO;
          if (divisor.gt(this.shru(1))) return UONE;
          res = UZERO;
        } else {
          if (this.eq(MIN_VALUE)) {
            if (divisor.eq(ONE) || divisor.eq(NEG_ONE)) return MIN_VALUE;
            if (divisor.eq(MIN_VALUE)) return ONE;
            var halfThis = this.shr(1);
            approx = halfThis.div(divisor).shl(1);
            if (approx.eq(ZERO)) return divisor.isNegative() ? ONE : NEG_ONE;
            rem = this.sub(divisor.mul(approx));
            res = approx.add(rem.div(divisor));
            return res;
          }
          if (divisor.eq(MIN_VALUE)) return this.unsigned ? UZERO : ZERO;
          if (this.isNegative()) {
            if (divisor.isNegative()) return this.neg().div(divisor.neg());
            return this.neg().div(divisor).neg();
          }
          if (divisor.isNegative()) return this.div(divisor.neg()).neg();
          res = ZERO;
        }
        rem = this;
        while (rem.gte(divisor)) {
          approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));
          var log2 = Math.ceil(Math.log(approx) / Math.LN2), delta = log2 <= 48 ? 1 : pow_dbl(2, log2 - 48), approxRes = fromNumber(approx), approxRem = approxRes.mul(divisor);
          while (approxRem.isNegative() || approxRem.gt(rem)) {
            approx -= delta;
            approxRes = fromNumber(approx, this.unsigned);
            approxRem = approxRes.mul(divisor);
          }
          approxRes.isZero() && (approxRes = ONE);
          res = res.add(approxRes);
          rem = rem.sub(approxRem);
        }
        return res;
      };
      LongPrototype.div = LongPrototype.divide;
      LongPrototype.modulo = function modulo(divisor) {
        isLong(divisor) || (divisor = fromValue(divisor));
        return this.sub(this.div(divisor).mul(divisor));
      };
      LongPrototype.mod = LongPrototype.modulo;
      LongPrototype.not = function not() {
        return fromBits(~this.low, ~this.high, this.unsigned);
      };
      LongPrototype.and = function and(other) {
        isLong(other) || (other = fromValue(other));
        return fromBits(this.low & other.low, this.high & other.high, this.unsigned);
      };
      LongPrototype.or = function or(other) {
        isLong(other) || (other = fromValue(other));
        return fromBits(this.low | other.low, this.high | other.high, this.unsigned);
      };
      LongPrototype.xor = function xor(other) {
        isLong(other) || (other = fromValue(other));
        return fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
      };
      LongPrototype.shiftLeft = function shiftLeft(numBits) {
        isLong(numBits) && (numBits = numBits.toInt());
        return 0 === (numBits &= 63) ? this : numBits < 32 ? fromBits(this.low << numBits, this.high << numBits | this.low >>> 32 - numBits, this.unsigned) : fromBits(0, this.low << numBits - 32, this.unsigned);
      };
      LongPrototype.shl = LongPrototype.shiftLeft;
      LongPrototype.shiftRight = function shiftRight(numBits) {
        isLong(numBits) && (numBits = numBits.toInt());
        return 0 === (numBits &= 63) ? this : numBits < 32 ? fromBits(this.low >>> numBits | this.high << 32 - numBits, this.high >> numBits, this.unsigned) : fromBits(this.high >> numBits - 32, this.high >= 0 ? 0 : -1, this.unsigned);
      };
      LongPrototype.shr = LongPrototype.shiftRight;
      LongPrototype.shiftRightUnsigned = function shiftRightUnsigned(numBits) {
        isLong(numBits) && (numBits = numBits.toInt());
        numBits &= 63;
        if (0 === numBits) return this;
        var high = this.high;
        if (numBits < 32) {
          var low = this.low;
          return fromBits(low >>> numBits | high << 32 - numBits, high >>> numBits, this.unsigned);
        }
        return fromBits(32 === numBits ? high : high >>> numBits - 32, 0, this.unsigned);
      };
      LongPrototype.shru = LongPrototype.shiftRightUnsigned;
      LongPrototype.toSigned = function toSigned() {
        if (!this.unsigned) return this;
        return fromBits(this.low, this.high, false);
      };
      LongPrototype.toUnsigned = function toUnsigned() {
        if (this.unsigned) return this;
        return fromBits(this.low, this.high, true);
      };
      return Long;
    });
    cc._RF.pop();
  }, {} ],
  msgcmd: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7abd43tR4FHjIqlnoK3fTsG", "msgcmd");
    "use strict";
    var net = require("net");
    var MsgCmd = {
      SyncSomeOneAdditional: 74,
      FastRegisterRequest: 1e4,
      FastRegisterResponse: 10001,
      GatewayHeartbeat: 13e3,
      LoginRequest: 10002,
      LoginResponse: 10003,
      ThreeWayLoginWithDeviceRequest: 10177,
      ThreeWayLoginWithDeviceResponse: 10178,
      ThreeWayLoginRequest: 10173,
      ThreeWayLoginResponse: 10174,
      QueryArenaRequest: 10004,
      QueryArenaResponse: 10005,
      GetWFLevelTicketReq: 10135,
      GetWFLevelTicketRsp: 10136,
      RequestAttack: 64,
      RefreshUserMoneyReq: 10015,
      RefreshUserMoneyRsp: 10016,
      CertificaitonLoginReq: 10012,
      HallEnterRoomReq: 10172,
      HallEnterRoomRsp: 10175,
      UserEnterMCReq: 10137,
      UserEnterMCRsp: 10138,
      UserEnterTableReq: 10139,
      UserEnterTableRsp: 10140,
      HallSitInGSReq: 10148,
      HallSitInGSRsp: 10149,
      HallGsReadyReq: 10157,
      RequestAdditional: 65,
      ResponseAdditional: 66,
      SyncInitAdditional: 68,
      SyncInitMoney: 67,
      SyncMoney: 69,
      RequestGameServerTime: 72,
      ResponseGameServerTime: 73,
      Heartbeat: 10167,
      UserLogoutReq: 10013,
      UserLogoutRsp: 10014,
      RefurbishUserInfoReq: 10006,
      RefurbishUserInfoRsp: 10007,
      VisitorLoginReq: 10008,
      VisitorLoginRsp: 10009,
      UserRegisterReq: 10010,
      UserRegisterRsp: 10011,
      GetFreeMoneyTimesReq: 10017,
      GetFreeMoneyTimesRsp: 10018,
      GetFreeMoneyReq: 10019,
      GetFreeMoneyRsp: 10020,
      MarketInfoReq: 10021,
      MarketInfoRsp: 10022,
      ModifyNickNameReq: 10023,
      ModifyNickNameRsp: 10024,
      QueryNickNameReq: 10025,
      QueryNickNameRsp: 10026,
      GetModifyFlagReq: 10027,
      GetModifyFlagRsp: 10028,
      RecordDeviceInfoReq: 10029,
      GetTransferConfigReq: 10030,
      GetTransferConfigRsp: 10031,
      MoneyTransferReq: 10032,
      MoneyTransferRsp: 10033,
      GetUserSexReq: 10034,
      GetUserSexRsp: 10035,
      ModifyUserSexReq: 10036,
      ModifyUserSexRsp: 10037,
      GetAccountSafePhoneNumReq: 10038,
      GetAccountSafePhoneNumRsp: 10039,
      RequestAccountSafePhoneNumReq: 10040,
      RequestAccountSafePhoneNumRsp: 10041,
      BindAccountSafePhoneNumReq: 10042,
      BindAccountSafePhoneNumRsp: 10043,
      RequestUserRewardReq: 10044,
      RequestUserRewardRsp: 10045,
      RequestCoinPresentLogReq: 10046,
      RequestCoinPresentLogRsp: 10047,
      CsThirdPartyLoginReq: 10048,
      IsTimeInphaseReq: 10049,
      IsTimeInphaseRsp: 10050,
      UserBestResultReq: 10051,
      UserBestResultRsp: 10052,
      AdditionalGameDataReq: 10053,
      AdditionalGameDataRsp: 10054,
      ShopPropsDataReq: 10055,
      ShopPropsDataRsp: 10056,
      UserPropsDataReq: 10057,
      UserPropsDataRsp: 10058,
      UserBuyPropsDataReq: 10059,
      UserBuyPropsDataRsp: 10060,
      UserGivePropsDataReq: 10061,
      UserGivePropsDataRsp: 10062,
      UserUsePropsDataReq: 10063,
      UserUsePropsDataRsp: 10064,
      PropPresentLogDataReq: 10065,
      PropPresentLogDataRsp: 10066,
      PropByPropIDDataReq: 10067,
      PropByPropIDDataRsp: 10068,
      GetGoodsListReq: 10069,
      GetGoodsListRsp: 10070,
      GetAllPropsReq: 10071,
      GetAllPropsRsp: 10072,
      NotifyPropPresentReceiveRsp: 10073,
      GetPropPresentConfigReq: 10074,
      GetPropPresentConfigRsp: 10075,
      NotifyPutPropIntoBagRsp: 10076,
      VIPInformationReq: 10077,
      VIPInformationRsp: 10078,
      GetAllChargePropsReq: 10079,
      GetAllChargePropsRsp: 10080,
      AllChargePropsCanBuyReq: 10081,
      AllChargePropsCanBuyRsp: 10082,
      GetTaskBaseInfoReq: 10083,
      GetTaskBaseInfoRsp: 10084,
      UserTaskProgressReq: 10085,
      UserTaskProgressRsp: 10086,
      UpdateUserTaskProgressRsp: 10087,
      UserTakeTaskRewardReq: 10088,
      UserTakeTaskRewardRsp: 10089,
      GetMailReq: 10090,
      GetMailRsp: 10091,
      MailOpReq: 10092,
      MailOpRsp: 10093,
      ModifyAccountReq: 10094,
      ModifyAccountRsp: 10095,
      ModifyPasswordReq: 10096,
      ModifyPasswordRsp: 10097,
      GetPayModeReq: 10098,
      GetPayModeRsp: 10099,
      RetrieveMailInfoReq: 10100,
      RetrieveMailInfoRsp: 10101,
      GetVIPInformationReq: 10102,
      GetVIPInformationRsp: 10103,
      GetChargeInformationReq: 10104,
      GetChargeInformationRsp: 10105,
      GetVIPLevelInfoReq: 10106,
      GetVIPLevelRewardRsp: 10107,
      GetVIPLevelExtraRewardRsp: 10108,
      GetUserFreeCoinTimesReq: 10109,
      GetUserFreeCoinTimesRsp: 10110,
      GetDailyLoginRewardCoinReq: 10111,
      GetDailyLoginRewardCoinRsp: 10112,
      GetFreeBenifitCoinReq: 10113,
      GetFreeBenifitCoinRsp: 10114,
      GetFilterTextConfigReq: 10115,
      GetFilterTextConfigRsp: 10116,
      GetUserBindPhoneReq: 10117,
      GetUserBindPhoneRsp: 10118,
      GetUserBindMailReq: 10119,
      GetUserBindMailRsp: 10120,
      UserSetBindMailReq: 10121,
      UserSetBindMailRsp: 10122,
      UserSetBindPhoneReq: 10123,
      UserSetBindPhoneRsp: 10124,
      GetUserDefindedHeadReq: 10125,
      GetUserDefindedHeadRsp: 10126,
      GetSMSChargeReq: 10127,
      GetSMSChargeRsp: 10128,
      GetUserMonSubInfoReq: 10129,
      GetUserMonSubInfoRsp: 10130,
      GetMonthlySubRewardReq: 10131,
      GetMonthlySubRewardRsp: 10132,
      GetMonthlySubscriptionReq: 10133,
      GetMonthlySubscriptionRsp: 10134,
      QueryTableDetailReq: 10141,
      QueryTableDetailRsp: 10142,
      UpdateTableBonusReq: 10143,
      UpdateTableBonusRsp: 10144,
      HallEnterTableRsp: 10145,
      UpdateRoomTotalBonusRsp: 10146,
      UserInGameChatCmd: 10147,
      HallGSUserInfoRsp: 10150,
      HallGSUserInfoExtraRsp: 10151,
      HallGsAdditionalGameDataRsp: 10152,
      HallGsAdditionalGameData1Rsp: 10153,
      HallGsUserScoreRsp: 10154,
      HallGsUserStatusRsp: 10155,
      HallGsGameDataReq: 10156,
      HallGsPingReq: 10158,
      HallGsStandUpReq: 10159,
      UserQuitArenaReq: 10160,
      UserSwitchTableReq: 10161,
      UserSwitchTableRsp: 10162,
      UserChangeTableRsp: 10163,
      UserChatCmd: 10164,
      UserChatOldReq: 10165,
      UserChatOldRsp: 10166,
      UpdateUserWelfareLevelRsp: 10168,
      GameTelevisonResult: 10169,
      GetAllChargePropsUserCanBuyNewReq: 10170,
      GetAllChargePropsUserCanBuyNewRsp: 10171,
      ForceDisconnected: 10176,
      HallGSUserInfoAllReq: 10179,
      HallGSUserInfoAllRsp: 10180,
      AuthCodeConfirm: 10181,
      AuthCodeConfirmRst: 10182,
      NewMailArrivedNotify: 10183,
      RefreshUserFishExp: 10184,
      FetchVerificationForRegisterByMobilePhoneReq: 10185,
      FetchVerificationForRegisterByMobilePhoneRsp: 10186,
      RegisterByMobilePhoneReq: 10187,
      RegisterByMobilePhoneRsp: 10188,
      FetchVerificationForPasswordByMobilePhoneReq: 10189,
      FetchVerificationForPasswordByMobilePhoneRsp: 10190,
      FetchPasswordByMobilePhoneReq: 10191,
      FetchPasswordByMobilePhoneRsp: 10192,
      QueryUserTableReq: 10193,
      QueryUserTableRsp: 10194,
      CreateTableReq: 10195,
      CreateTableRsp: 10196,
      EnterCustomTableReq: 10197,
      ReleaseCustomTableReq: 10198,
      ReleaseCustomTableRsp: 10199,
      SynchroniseCustomTableReq: 10200,
      SynchroniseCustomTableRsp: 10201,
      PartnerUserLoginReq: 10202,
      PartnerUserLoginRsp: 10203,
      PartnerBindReq: 10204,
      PartnerBindRsq: 10205,
      OnlineRewardTicketReq: 10206,
      OnlineRewardTicketRsp: 10207,
      GetTodayOnlineRewardTicketReq: 10208,
      GetTodayOnlineRewardTicketRsp: 10209,
      GetRankListReq: 10212,
      GetRankListRsp: 10213,
      UserExtendCoinChangedRsp: 10215,
      UserSwitchChairReq: 10216,
      UserSwitchChairRsp: 10217,
      UserKicKRoomReq: 10218,
      UserKicKRoomRsp: 10219,
      UserEnterRoomRsp: 10220,
      S2CSendMessage: 10248,
      C2SUpdateMessage: 10249,
      RefreshUserDianJuanReq: 10245,
      RefreshUserDianJuanRsp: 10246,
      NotifyWebChargeSuccess: 10247
    };
    var _temp = {};
    for (var name in MsgCmd) _temp[MsgCmd[name]] = name;
    for (var _name in _temp) MsgCmd[_name] = _temp[_name];
    net.MsgCmd = MsgCmd;
    cc._RF.pop();
  }, {
    net: "net"
  } ],
  net: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fd72cUe1zJDVJB5/CXURZwv", "net");
    "use strict";
    var ByteBuffer = require("bytebuffer");
    var ProtoBuf = require("protobuf");
    var net = {};
    net.ServerIp = "172.13.0.100";
    net.ServerPort = [ 19999 ];
    net.GameId = 10004;
    net.UserId = 0;
    net.ArenaId = 106;
    net.CmdId = 0;
    net.RoomId = 68;
    net.TableId = 0;
    net.SceneId = 0;
    net.PlayerStatus = 0;
    net.EnterRoomType = 0;
    net.GameRules = "";
    net.RoomSn = 0;
    net.openId = "";
    net.unionid = "";
    net.rspSuccess = true;
    net.loginOk = false;
    net.accessToken = "";
    net.isActive = false;
    net.waitGatewayHeartbeatNum = 0;
    net.isLoaded = false;
    net.lastMsgTime = 0;
    net.Market = 1;
    net.WebId = 40033;
    net.gameIng = false;
    net.indexPort = 0;
    var ServerType = {
      HALL: 1,
      PS: 2,
      MC: 3,
      GS: 4,
      CC: 5,
      CS: 6,
      SG: 7,
      IS: 8,
      DBE: 9,
      CHAT: 10,
      GD: 39
    };
    net.ServerType = ServerType;
    var CMD_GAME_DATA = 1039;
    net.MakePack = function(nCommand, msg, nTargetType) {
      var nServerID = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
      var msgDv = null;
      var msgLen = 0;
      if (msg) {
        msg = msg.toBuffer();
        msgDv = new DataView(msg);
        msgLen = msg.byteLength;
      }
      var ab = null;
      var dv = null;
      var pos = 0;
      if (nTargetType == ServerType.GD) {
        ab = new ArrayBuffer(19 + msgLen);
        dv = new DataView(ab);
        dv.setInt32(pos, 15 + msgLen, true);
        pos += 4;
        dv.setUint8(pos, ServerType.GS, true);
        pos += 1;
        dv.setInt32(pos, nServerID, true);
        pos += 4;
        dv.setInt32(pos, 0, true);
        pos += 4;
        dv.setInt16(pos, CMD_GAME_DATA, true);
        pos += 2;
        dv.setInt32(pos, nCommand, true);
        pos += 4;
      } else {
        ab = new ArrayBuffer(15 + msgLen);
        dv = new DataView(ab);
        dv.setInt32(pos, 11 + msgLen, true);
        pos += 4;
        dv.setUint8(pos, nTargetType, true);
        pos += 1;
        dv.setInt16(pos, nServerID, true);
        pos += 2;
        dv.setInt16(pos, 0, true);
        pos += 2;
        dv.setInt32(pos, 0, true);
        pos += 4;
        dv.setInt16(pos, nCommand, true);
        pos += 2;
      }
      for (var i = 0; i < msgLen; i++, pos++) dv.setUint8(pos, msgDv.getUint8(i));
      return ab;
    };
    var protoList = {};
    net.LoadProto = function(name, callback) {
      cc.loader.loadRes("proto/" + name, function(err, data) {
        protoList[name] = ProtoBuf.protoFromString(data);
        callback && callback();
      });
    };
    var proto = {};
    net.MakeMsg = function(msgName, cmd, pack) {
      !msgName && cmd && (msgName = net.MsgCmd[cmd]);
      cmd || (cmd = net.MsgCmd[msgName]);
      net.CmdId = cmd;
      var msg = proto[msgName];
      if (!msg) for (var protoName in protoList) {
        msg = protoList[protoName].build("SY." + msgName);
        if (msg) {
          proto[msgName] = msg;
          break;
        }
      }
      if (msg && pack) return msg.decode(pack);
      return msg ? new msg() : null;
    };
    net.SendMsg = function(msg, nServerType, nServerId) {
      var b = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
      var pack = net.MakePack(net.CmdId, msg, nServerType, nServerId);
      console.log("---\x3eSend cmd:" + net.MsgCmd[net.CmdId] + ", CmdId: " + net.CmdId + "，Msg：" + JSON.stringify(msg));
      null != ws && ws.readyState === WebSocket.OPEN ? ws.send(pack) : net.close();
    };
    net.OnRecvMsg = function(pack) {
      var dv = new DataView(pack);
      var pos = 11;
      var len = pack.byteLength;
      var cmd = -1;
      if (!(len >= 11)) {
        console.error("------OnRecvMsg, cmd: " + cmd + ", len: " + len);
        return null;
      }
      cmd = dv.getUint16(9, true);
      if (cmd == CMD_GAME_DATA) {
        if (!(len >= 15)) {
          console.error("------OnRecvMsg, cmd: " + cmd + ", len: " + len);
          return null;
        }
        cmd = dv.getInt32(11, true);
        pos = 15;
      }
      pack = pack.slice(pos);
      var msg = net.MakeMsg(null, cmd, pack);
      return {
        cmd: cmd,
        msg: msg
      };
    };
    var onMsgList = {};
    net.OnMsg = function(cmd, callback) {
      onMsgList[cmd] = callback;
    };
    net.printNetDataInfo = function(pack, err) {
      var dv = new DataView(pack);
      var len = pack.byteLength;
      console.error("------ onmessage parse error ----------");
      err && console.error(err.stack);
      var mo = len % 4;
      if (0 == mo) {
        var view32 = new Uint32Array(pack);
        var str = "32位：";
        for (var i = 0; i < view32.length; i++) str += view32[i].toString(2) + ",";
        console.log(view32.length + "----------------------, " + str);
      } else {
        var str = "8位：";
        var view8 = new Uint8Array(pack);
        for (var j = 0; j < mo; j++) str += view8[j].toString(2) + ",";
        if (view8.length > 4) {
          str += "---|32位：---";
          var data = pack.slice(mo);
          var view32 = new Uint32Array(data);
          for (var i = 0; i < view32.length; i++) str += view32[i].toString(2) + ",";
        }
        console.log(view32.length + "----------------------, " + str);
      }
    };
    var ws = null;
    net.Connect = function() {
      if (net.conneting) return;
      if (ws) {
        console.log("------ws Connect find ws != null. " + ws.readyState + ", " + ws.url);
        ws.onopen = function(event) {
          console.log("---close ws onopen---. " + ws.readyState + ", " + ws.url);
        };
        ws.onmessage = function(event) {
          console.log("---close ws onmessage---. " + ws.readyState + ", " + ws.url);
        };
        ws.onerror = function(event) {
          console.log("---close ws onerror---. " + ws.readyState + ", " + ws.url);
        };
        ws.onclose = function(event) {
          console.log("---close ws onclose---. " + ws.readyState + ", " + ws.url);
        };
        ws.close();
        ws = null;
        return;
      }
      net.lastMsgTime = new Date();
      net.conneting = true;
      var IP_ = net.ServerIp;
      var PORT_ = net.ServerPort[net.indexPort];
      var connectStr = "ws://" + IP_ + ":" + PORT_;
      console.log("------ws Connect str = " + connectStr);
      setTimeout(function() {
        ws = new WebSocket(connectStr);
        ws.binaryType = "arraybuffer";
        ws.onopen = function(event) {
          this.connectNum = 0;
          console.log("------ws onopen net.loginOk is " + net.loginOk);
          net.conneting = false;
          net.isActive = true;
          net.loginOk;
        };
        ws.onmessage = function(event) {
          net.lastMsgTime = new Date();
          net.waitGatewayHeartbeatNum = 0;
          setTimeout(function() {
            var rsp;
            var len = event.data.byteLength;
            try {
              console.log("msg data size " + event.data.byteLength);
              rsp = net.OnRecvMsg(event.data);
              if (null == rsp) {
                net.printNetDataInfo(event.data, null);
                return;
              }
            } catch (err) {
              console.log("CATCH err");
              net.printNetDataInfo(event.data, err);
              return;
            }
            try {
              console.log("---\x3eRecv cmd:" + net.MsgCmd[rsp.cmd] + ",Msg：" + JSON.stringify(rsp));
              var callback = onMsgList[rsp.cmd];
              callback || (callback = net["On" + net.MsgCmd[rsp.cmd]]);
              callback && callback(rsp.msg);
            } catch (error) {
              console.error("------ onmessage callback find  logic error:  " + rsp.cmd + ", " + error.stack);
              console.error("---\x3eRecv cmd:" + net.MsgCmd[rsp.cmd] + "，Msg：" + JSON.stringify(rsp));
            }
          }, 100);
        };
        ws.onerror = function(event) {
          console.log("---ws onerror---. ");
          net.conneting = false;
          ws.close();
          console.log("lianjieshibai");
        };
        ws.onclose = function(event) {
          console.log("---ws onclose---. ");
          net.conneting = false;
          ws = null;
          net.isActive = false;
          if (net.loginOk) {
            net.loginOk = false;
            cc.director.getScene().getChildByName("Canvas").getChildByName("WindowLayer").getComponent("WindowLayer").openTips("1003");
            cc.director.getScene().getChildByName("Canvas").getChildByName("MainLayer").getComponent("Player").resetGame(2);
          } else if (net.indexPort < net.ServerPort.length) {
            net.Connect();
            net.indexPort++;
          } else net.indexPort = 0;
        };
      }.bind(this), 0);
    };
    net.getWSState = function() {
      if (null == ws) return WebSocket.CLOSED;
      return ws.readyState;
    };
    net.close = function() {
      console.log("net.Close------\x3e");
      ws && ws.close();
    };
    var UserStatus = {
      Offline: 0,
      Out: 1,
      Logout: 2,
      Delegated: 3,
      InArena: 4,
      InRoom: 5,
      WaitReenter: 6,
      Sit: 7,
      Ready: 8,
      Playing: 9,
      OnPhone: 10
    };
    net.UserStatus = UserStatus;
    module.exports = net;
    cc._RF.pop();
  }, {
    bytebuffer: "bytebuffer",
    protobuf: "protobuf"
  } ],
  protobuf: [ function(require, module, exports) {
    (function(process) {
      "use strict";
      cc._RF.push(module, "bfc28/cJvlPB6f/v4Fm9mom", "protobuf");
      "use strict";
      var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
        return typeof obj;
      } : function(obj) {
        return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
      (function(global, factory) {
        "function" === typeof define && define["amd"] ? define([ "bytebuffer" ], factory) : "function" === typeof require && "object" === ("undefined" === typeof module ? "undefined" : _typeof(module)) && module && module["exports"] ? module["exports"] = factory(require("bytebuffer"), true) : (global["dcodeIO"] = global["dcodeIO"] || {})["ProtoBuf"] = factory(global["dcodeIO"]["ByteBuffer"]);
      })(void 0, function(ByteBuffer, isCommonJS) {
        var ProtoBuf = {};
        ProtoBuf.ByteBuffer = ByteBuffer;
        ProtoBuf.Long = ByteBuffer.Long || null;
        ProtoBuf.VERSION = "5.0.1";
        ProtoBuf.WIRE_TYPES = {};
        ProtoBuf.WIRE_TYPES.VARINT = 0;
        ProtoBuf.WIRE_TYPES.BITS64 = 1;
        ProtoBuf.WIRE_TYPES.LDELIM = 2;
        ProtoBuf.WIRE_TYPES.STARTGROUP = 3;
        ProtoBuf.WIRE_TYPES.ENDGROUP = 4;
        ProtoBuf.WIRE_TYPES.BITS32 = 5;
        ProtoBuf.PACKABLE_WIRE_TYPES = [ ProtoBuf.WIRE_TYPES.VARINT, ProtoBuf.WIRE_TYPES.BITS64, ProtoBuf.WIRE_TYPES.BITS32 ];
        ProtoBuf.TYPES = {
          int32: {
            name: "int32",
            wireType: ProtoBuf.WIRE_TYPES.VARINT,
            defaultValue: 0
          },
          uint32: {
            name: "uint32",
            wireType: ProtoBuf.WIRE_TYPES.VARINT,
            defaultValue: 0
          },
          sint32: {
            name: "sint32",
            wireType: ProtoBuf.WIRE_TYPES.VARINT,
            defaultValue: 0
          },
          int64: {
            name: "int64",
            wireType: ProtoBuf.WIRE_TYPES.VARINT,
            defaultValue: ProtoBuf.Long ? ProtoBuf.Long.ZERO : void 0
          },
          uint64: {
            name: "uint64",
            wireType: ProtoBuf.WIRE_TYPES.VARINT,
            defaultValue: ProtoBuf.Long ? ProtoBuf.Long.UZERO : void 0
          },
          sint64: {
            name: "sint64",
            wireType: ProtoBuf.WIRE_TYPES.VARINT,
            defaultValue: ProtoBuf.Long ? ProtoBuf.Long.ZERO : void 0
          },
          bool: {
            name: "bool",
            wireType: ProtoBuf.WIRE_TYPES.VARINT,
            defaultValue: false
          },
          double: {
            name: "double",
            wireType: ProtoBuf.WIRE_TYPES.BITS64,
            defaultValue: 0
          },
          string: {
            name: "string",
            wireType: ProtoBuf.WIRE_TYPES.LDELIM,
            defaultValue: ""
          },
          bytes: {
            name: "bytes",
            wireType: ProtoBuf.WIRE_TYPES.LDELIM,
            defaultValue: null
          },
          fixed32: {
            name: "fixed32",
            wireType: ProtoBuf.WIRE_TYPES.BITS32,
            defaultValue: 0
          },
          sfixed32: {
            name: "sfixed32",
            wireType: ProtoBuf.WIRE_TYPES.BITS32,
            defaultValue: 0
          },
          fixed64: {
            name: "fixed64",
            wireType: ProtoBuf.WIRE_TYPES.BITS64,
            defaultValue: ProtoBuf.Long ? ProtoBuf.Long.UZERO : void 0
          },
          sfixed64: {
            name: "sfixed64",
            wireType: ProtoBuf.WIRE_TYPES.BITS64,
            defaultValue: ProtoBuf.Long ? ProtoBuf.Long.ZERO : void 0
          },
          float: {
            name: "float",
            wireType: ProtoBuf.WIRE_TYPES.BITS32,
            defaultValue: 0
          },
          enum: {
            name: "enum",
            wireType: ProtoBuf.WIRE_TYPES.VARINT,
            defaultValue: 0
          },
          message: {
            name: "message",
            wireType: ProtoBuf.WIRE_TYPES.LDELIM,
            defaultValue: null
          },
          group: {
            name: "group",
            wireType: ProtoBuf.WIRE_TYPES.STARTGROUP,
            defaultValue: null
          }
        };
        ProtoBuf.MAP_KEY_TYPES = [ ProtoBuf.TYPES["int32"], ProtoBuf.TYPES["sint32"], ProtoBuf.TYPES["sfixed32"], ProtoBuf.TYPES["uint32"], ProtoBuf.TYPES["fixed32"], ProtoBuf.TYPES["int64"], ProtoBuf.TYPES["sint64"], ProtoBuf.TYPES["sfixed64"], ProtoBuf.TYPES["uint64"], ProtoBuf.TYPES["fixed64"], ProtoBuf.TYPES["bool"], ProtoBuf.TYPES["string"], ProtoBuf.TYPES["bytes"] ];
        ProtoBuf.ID_MIN = 1;
        ProtoBuf.ID_MAX = 536870911;
        ProtoBuf.convertFieldsToCamelCase = false;
        ProtoBuf.populateAccessors = true;
        ProtoBuf.populateDefaults = true;
        ProtoBuf.Util = function() {
          var Util = {};
          Util.IS_NODE = !!("object" === ("undefined" === typeof process ? "undefined" : _typeof(process)) && process + "" === "[object process]" && !process["browser"]);
          Util.XHR = function() {
            var XMLHttpFactories = [ function() {
              return new XMLHttpRequest();
            }, function() {
              return new ActiveXObject("Msxml2.XMLHTTP");
            }, function() {
              return new ActiveXObject("Msxml3.XMLHTTP");
            }, function() {
              return new ActiveXObject("Microsoft.XMLHTTP");
            } ];
            var xhr = null;
            for (var i = 0; i < XMLHttpFactories.length; i++) {
              try {
                xhr = XMLHttpFactories[i]();
              } catch (e) {
                continue;
              }
              break;
            }
            if (!xhr) throw Error("XMLHttpRequest is not supported");
            return xhr;
          };
          Util.fetch = function(path, callback) {
            callback && "function" != typeof callback && (callback = null);
            if (Util.IS_NODE) {
              var fs = require("fs");
              if (callback) fs.readFile(path, function(err, data) {
                callback(err ? null : "" + data);
              }); else try {
                return fs.readFileSync(path);
              } catch (e) {
                return null;
              }
            } else {
              var xhr = Util.XHR();
              xhr.open("GET", path, !!callback);
              xhr.setRequestHeader("Accept", "text/plain");
              "function" === typeof xhr.overrideMimeType && xhr.overrideMimeType("text/plain");
              if (!callback) {
                xhr.send(null);
                if (200 == xhr.status || 0 == xhr.status && "string" === typeof xhr.responseText) return xhr.responseText;
                return null;
              }
              xhr.onreadystatechange = function() {
                if (4 != xhr.readyState) return;
                200 == xhr.status || 0 == xhr.status && "string" === typeof xhr.responseText ? callback(xhr.responseText) : callback(null);
              };
              if (4 == xhr.readyState) return;
              xhr.send(null);
            }
          };
          Util.toCamelCase = function(str) {
            return str.replace(/_([a-zA-Z])/g, function($0, $1) {
              return $1.toUpperCase();
            });
          };
          return Util;
        }();
        ProtoBuf.Lang = {
          DELIM: /[\s\{\}=;:\[\],'"\(\)<>]/g,
          RULE: /^(?:required|optional|repeated|map)$/,
          TYPE: /^(?:double|float|int32|uint32|sint32|int64|uint64|sint64|fixed32|sfixed32|fixed64|sfixed64|bool|string|bytes)$/,
          NAME: /^[a-zA-Z_][a-zA-Z_0-9]*$/,
          TYPEDEF: /^[a-zA-Z][a-zA-Z_0-9]*$/,
          TYPEREF: /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)+$/,
          FQTYPEREF: /^(?:\.[a-zA-Z][a-zA-Z_0-9]*)+$/,
          NUMBER: /^-?(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+|([0-9]*(\.[0-9]*)?([Ee][+-]?[0-9]+)?)|inf|nan)$/,
          NUMBER_DEC: /^(?:[1-9][0-9]*|0)$/,
          NUMBER_HEX: /^0[xX][0-9a-fA-F]+$/,
          NUMBER_OCT: /^0[0-7]+$/,
          NUMBER_FLT: /^([0-9]*(\.[0-9]*)?([Ee][+-]?[0-9]+)?|inf|nan)$/,
          BOOL: /^(?:true|false)$/i,
          ID: /^(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+)$/,
          NEGID: /^\-?(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+)$/,
          WHITESPACE: /\s/,
          STRING: /(?:"([^"\\]*(?:\\.[^"\\]*)*)")|(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g,
          STRING_DQ: /(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g,
          STRING_SQ: /(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g
        };
        ProtoBuf.DotProto = function(ProtoBuf, Lang) {
          var DotProto = {};
          var Tokenizer = function Tokenizer(proto) {
            this.source = proto + "";
            this.index = 0;
            this.line = 1;
            this.stack = [];
            this._stringOpen = null;
          };
          var TokenizerPrototype = Tokenizer.prototype;
          TokenizerPrototype._readString = function() {
            var re = '"' === this._stringOpen ? Lang.STRING_DQ : Lang.STRING_SQ;
            re.lastIndex = this.index - 1;
            var match = re.exec(this.source);
            if (!match) throw Error("unterminated string");
            this.index = re.lastIndex;
            this.stack.push(this._stringOpen);
            this._stringOpen = null;
            return match[1];
          };
          TokenizerPrototype.next = function() {
            if (this.stack.length > 0) return this.stack.shift();
            if (this.index >= this.source.length) return null;
            if (null !== this._stringOpen) return this._readString();
            var repeat, prev, next;
            do {
              repeat = false;
              while (Lang.WHITESPACE.test(next = this.source.charAt(this.index))) {
                "\n" === next && ++this.line;
                if (++this.index === this.source.length) return null;
              }
              if ("/" === this.source.charAt(this.index)) {
                ++this.index;
                if ("/" === this.source.charAt(this.index)) {
                  while ("\n" !== this.source.charAt(++this.index)) if (this.index == this.source.length) return null;
                  ++this.index;
                  ++this.line;
                  repeat = true;
                } else {
                  if ("*" !== (next = this.source.charAt(this.index))) return "/";
                  do {
                    "\n" === next && ++this.line;
                    if (++this.index === this.source.length) return null;
                    prev = next;
                    next = this.source.charAt(this.index);
                  } while ("*" !== prev || "/" !== next);
                  ++this.index;
                  repeat = true;
                }
              }
            } while (repeat);
            if (this.index === this.source.length) return null;
            var end = this.index;
            Lang.DELIM.lastIndex = 0;
            var delim = Lang.DELIM.test(this.source.charAt(end++));
            if (!delim) while (end < this.source.length && !Lang.DELIM.test(this.source.charAt(end))) ++end;
            var token = this.source.substring(this.index, this.index = end);
            '"' !== token && "'" !== token || (this._stringOpen = token);
            return token;
          };
          TokenizerPrototype.peek = function() {
            if (0 === this.stack.length) {
              var token = this.next();
              if (null === token) return null;
              this.stack.push(token);
            }
            return this.stack[0];
          };
          TokenizerPrototype.skip = function(expected) {
            var actual = this.next();
            if (actual !== expected) throw Error("illegal '" + actual + "', '" + expected + "' expected");
          };
          TokenizerPrototype.omit = function(expected) {
            if (this.peek() === expected) {
              this.next();
              return true;
            }
            return false;
          };
          TokenizerPrototype.toString = function() {
            return "Tokenizer (" + this.index + "/" + this.source.length + " at line " + this.line + ")";
          };
          DotProto.Tokenizer = Tokenizer;
          var Parser = function Parser(source) {
            this.tn = new Tokenizer(source);
            this.proto3 = false;
          };
          var ParserPrototype = Parser.prototype;
          ParserPrototype.parse = function() {
            var topLevel = {
              name: "[ROOT]",
              package: null,
              messages: [],
              enums: [],
              imports: [],
              options: {},
              services: []
            };
            var token, head = true, weak;
            try {
              while (token = this.tn.next()) switch (token) {
               case "package":
                if (!head || null !== topLevel["package"]) throw Error("unexpected 'package'");
                token = this.tn.next();
                if (!Lang.TYPEREF.test(token)) throw Error("illegal package name: " + token);
                this.tn.skip(";");
                topLevel["package"] = token;
                break;

               case "import":
                if (!head) throw Error("unexpected 'import'");
                token = this.tn.peek();
                ("public" === token || (weak = "weak" === token)) && this.tn.next();
                token = this._readString();
                this.tn.skip(";");
                weak || topLevel["imports"].push(token);
                break;

               case "syntax":
                if (!head) throw Error("unexpected 'syntax'");
                this.tn.skip("=");
                "proto3" === (topLevel["syntax"] = this._readString()) && (this.proto3 = true);
                this.tn.skip(";");
                break;

               case "message":
                this._parseMessage(topLevel, null);
                head = false;
                break;

               case "enum":
                this._parseEnum(topLevel);
                head = false;
                break;

               case "option":
                this._parseOption(topLevel);
                break;

               case "service":
                this._parseService(topLevel);
                break;

               case "extend":
                this._parseExtend(topLevel);
                break;

               default:
                throw Error("unexpected '" + token + "'");
              }
            } catch (e) {
              e.message = "Parse error at line " + this.tn.line + ": " + e.message;
              throw e;
            }
            delete topLevel["name"];
            return topLevel;
          };
          Parser.parse = function(source) {
            return new Parser(source).parse();
          };
          function mkId(value, mayBeNegative) {
            var id = -1, sign = 1;
            if ("-" == value.charAt(0)) {
              sign = -1;
              value = value.substring(1);
            }
            if (Lang.NUMBER_DEC.test(value)) id = parseInt(value); else if (Lang.NUMBER_HEX.test(value)) id = parseInt(value.substring(2), 16); else {
              if (!Lang.NUMBER_OCT.test(value)) throw Error("illegal id value: " + (sign < 0 ? "-" : "") + value);
              id = parseInt(value.substring(1), 8);
            }
            id = sign * id | 0;
            if (!mayBeNegative && id < 0) throw Error("illegal id value: " + (sign < 0 ? "-" : "") + value);
            return id;
          }
          function mkNumber(val) {
            var sign = 1;
            if ("-" == val.charAt(0)) {
              sign = -1;
              val = val.substring(1);
            }
            if (Lang.NUMBER_DEC.test(val)) return sign * parseInt(val, 10);
            if (Lang.NUMBER_HEX.test(val)) return sign * parseInt(val.substring(2), 16);
            if (Lang.NUMBER_OCT.test(val)) return sign * parseInt(val.substring(1), 8);
            if ("inf" === val) return Infinity * sign;
            if ("nan" === val) return NaN;
            if (Lang.NUMBER_FLT.test(val)) return sign * parseFloat(val);
            throw Error("illegal number value: " + (sign < 0 ? "-" : "") + val);
          }
          ParserPrototype._readString = function() {
            var value = "", token, delim;
            do {
              delim = this.tn.next();
              if ("'" !== delim && '"' !== delim) throw Error("illegal string delimiter: " + delim);
              value += this.tn.next();
              this.tn.skip(delim);
              token = this.tn.peek();
            } while ('"' === token || '"' === token);
            return value;
          };
          ParserPrototype._readValue = function(mayBeTypeRef) {
            var token = this.tn.peek(), value;
            if ('"' === token || "'" === token) return this._readString();
            this.tn.next();
            if (Lang.NUMBER.test(token)) return mkNumber(token);
            if (Lang.BOOL.test(token)) return "true" === token.toLowerCase();
            if (mayBeTypeRef && Lang.TYPEREF.test(token)) return token;
            throw Error("illegal value: " + token);
          };
          ParserPrototype._parseOption = function(parent, isList) {
            var token = this.tn.next(), custom = false;
            if ("(" === token) {
              custom = true;
              token = this.tn.next();
            }
            if (!Lang.TYPEREF.test(token)) throw Error("illegal option name: " + token);
            var name = token;
            if (custom) {
              this.tn.skip(")");
              name = "(" + name + ")";
              token = this.tn.peek();
              if (Lang.FQTYPEREF.test(token)) {
                name += token;
                this.tn.next();
              }
            }
            this.tn.skip("=");
            this._parseOptionValue(parent, name);
            isList || this.tn.skip(";");
          };
          function setOption(options, name, value) {
            if ("undefined" === typeof options[name]) options[name] = value; else {
              Array.isArray(options[name]) || (options[name] = [ options[name] ]);
              options[name].push(value);
            }
          }
          ParserPrototype._parseOptionValue = function(parent, name) {
            var token = this.tn.peek();
            if ("{" !== token) setOption(parent["options"], name, this._readValue(true)); else {
              this.tn.skip("{");
              while ("}" !== (token = this.tn.next())) {
                if (!Lang.NAME.test(token)) throw Error("illegal option name: " + name + "." + token);
                this.tn.omit(":") ? setOption(parent["options"], name + "." + token, this._readValue(true)) : this._parseOptionValue(parent, name + "." + token);
              }
            }
          };
          ParserPrototype._parseService = function(parent) {
            var token = this.tn.next();
            if (!Lang.NAME.test(token)) throw Error("illegal service name at line " + this.tn.line + ": " + token);
            var name = token;
            var svc = {
              name: name,
              rpc: {},
              options: {}
            };
            this.tn.skip("{");
            while ("}" !== (token = this.tn.next())) if ("option" === token) this._parseOption(svc); else {
              if ("rpc" !== token) throw Error("illegal service token: " + token);
              this._parseServiceRPC(svc);
            }
            this.tn.omit(";");
            parent["services"].push(svc);
          };
          ParserPrototype._parseServiceRPC = function(svc) {
            var type = "rpc", token = this.tn.next();
            if (!Lang.NAME.test(token)) throw Error("illegal rpc service method name: " + token);
            var name = token;
            var method = {
              request: null,
              response: null,
              request_stream: false,
              response_stream: false,
              options: {}
            };
            this.tn.skip("(");
            token = this.tn.next();
            if ("stream" === token.toLowerCase()) {
              method["request_stream"] = true;
              token = this.tn.next();
            }
            if (!Lang.TYPEREF.test(token)) throw Error("illegal rpc service request type: " + token);
            method["request"] = token;
            this.tn.skip(")");
            token = this.tn.next();
            if ("returns" !== token.toLowerCase()) throw Error("illegal rpc service request type delimiter: " + token);
            this.tn.skip("(");
            token = this.tn.next();
            if ("stream" === token.toLowerCase()) {
              method["response_stream"] = true;
              token = this.tn.next();
            }
            method["response"] = token;
            this.tn.skip(")");
            token = this.tn.peek();
            if ("{" === token) {
              this.tn.next();
              while ("}" !== (token = this.tn.next())) {
                if ("option" !== token) throw Error("illegal rpc service token: " + token);
                this._parseOption(method);
              }
              this.tn.omit(";");
            } else this.tn.skip(";");
            "undefined" === typeof svc[type] && (svc[type] = {});
            svc[type][name] = method;
          };
          ParserPrototype._parseMessage = function(parent, fld) {
            var isGroup = !!fld, token = this.tn.next();
            var msg = {
              name: "",
              fields: [],
              enums: [],
              messages: [],
              options: {},
              services: [],
              oneofs: {}
            };
            if (!Lang.NAME.test(token)) throw Error("illegal " + (isGroup ? "group" : "message") + " name: " + token);
            msg["name"] = token;
            if (isGroup) {
              this.tn.skip("=");
              fld["id"] = mkId(this.tn.next());
              msg["isGroup"] = true;
            }
            token = this.tn.peek();
            "[" === token && fld && this._parseFieldOptions(fld);
            this.tn.skip("{");
            while ("}" !== (token = this.tn.next())) if (Lang.RULE.test(token)) this._parseMessageField(msg, token); else if ("oneof" === token) this._parseMessageOneOf(msg); else if ("enum" === token) this._parseEnum(msg); else if ("message" === token) this._parseMessage(msg); else if ("option" === token) this._parseOption(msg); else if ("service" === token) this._parseService(msg); else if ("extensions" === token) msg.hasOwnProperty("extensions") ? msg["extensions"] = msg["extensions"].concat(this._parseExtensionRanges()) : msg["extensions"] = this._parseExtensionRanges(); else if ("reserved" === token) this._parseIgnored(); else if ("extend" === token) this._parseExtend(msg); else {
              if (!Lang.TYPEREF.test(token)) throw Error("illegal message token: " + token);
              if (!this.proto3) throw Error("illegal field rule: " + token);
              this._parseMessageField(msg, "optional", token);
            }
            this.tn.omit(";");
            parent["messages"].push(msg);
            return msg;
          };
          ParserPrototype._parseIgnored = function() {
            while (";" !== this.tn.peek()) this.tn.next();
            this.tn.skip(";");
          };
          ParserPrototype._parseMessageField = function(msg, rule, type) {
            if (!Lang.RULE.test(rule)) throw Error("illegal message field rule: " + rule);
            var fld = {
              rule: rule,
              type: "",
              name: "",
              options: {},
              id: 0
            };
            var token;
            if ("map" === rule) {
              if (type) throw Error("illegal type: " + type);
              this.tn.skip("<");
              token = this.tn.next();
              if (!Lang.TYPE.test(token) && !Lang.TYPEREF.test(token)) throw Error("illegal message field type: " + token);
              fld["keytype"] = token;
              this.tn.skip(",");
              token = this.tn.next();
              if (!Lang.TYPE.test(token) && !Lang.TYPEREF.test(token)) throw Error("illegal message field: " + token);
              fld["type"] = token;
              this.tn.skip(">");
              token = this.tn.next();
              if (!Lang.NAME.test(token)) throw Error("illegal message field name: " + token);
              fld["name"] = token;
              this.tn.skip("=");
              fld["id"] = mkId(this.tn.next());
              token = this.tn.peek();
              "[" === token && this._parseFieldOptions(fld);
              this.tn.skip(";");
            } else {
              type = "undefined" !== typeof type ? type : this.tn.next();
              if ("group" === type) {
                var grp = this._parseMessage(msg, fld);
                if (!/^[A-Z]/.test(grp["name"])) throw Error("illegal group name: " + grp["name"]);
                fld["type"] = grp["name"];
                fld["name"] = grp["name"].toLowerCase();
                this.tn.omit(";");
              } else {
                if (!Lang.TYPE.test(type) && !Lang.TYPEREF.test(type)) throw Error("illegal message field type: " + type);
                fld["type"] = type;
                token = this.tn.next();
                if (!Lang.NAME.test(token)) throw Error("illegal message field name: " + token);
                fld["name"] = token;
                this.tn.skip("=");
                fld["id"] = mkId(this.tn.next());
                token = this.tn.peek();
                "[" === token && this._parseFieldOptions(fld);
                this.tn.skip(";");
              }
            }
            msg["fields"].push(fld);
            return fld;
          };
          ParserPrototype._parseMessageOneOf = function(msg) {
            var token = this.tn.next();
            if (!Lang.NAME.test(token)) throw Error("illegal oneof name: " + token);
            var name = token, fld;
            var fields = [];
            this.tn.skip("{");
            while ("}" !== (token = this.tn.next())) {
              fld = this._parseMessageField(msg, "optional", token);
              fld["oneof"] = name;
              fields.push(fld["id"]);
            }
            this.tn.omit(";");
            msg["oneofs"][name] = fields;
          };
          ParserPrototype._parseFieldOptions = function(fld) {
            this.tn.skip("[");
            var token, first = true;
            while ("]" !== (token = this.tn.peek())) {
              first || this.tn.skip(",");
              this._parseOption(fld, true);
              first = false;
            }
            this.tn.next();
          };
          ParserPrototype._parseEnum = function(msg) {
            var enm = {
              name: "",
              values: [],
              options: {}
            };
            var token = this.tn.next();
            if (!Lang.NAME.test(token)) throw Error("illegal name: " + token);
            enm["name"] = token;
            this.tn.skip("{");
            while ("}" !== (token = this.tn.next())) if ("option" === token) this._parseOption(enm); else {
              if (!Lang.NAME.test(token)) throw Error("illegal name: " + token);
              this.tn.skip("=");
              var val = {
                name: token,
                id: mkId(this.tn.next(), true)
              };
              token = this.tn.peek();
              "[" === token && this._parseFieldOptions({
                options: {}
              });
              this.tn.skip(";");
              enm["values"].push(val);
            }
            this.tn.omit(";");
            msg["enums"].push(enm);
          };
          ParserPrototype._parseExtensionRanges = function() {
            var ranges = [];
            var token, range, value;
            do {
              range = [];
              while (true) {
                token = this.tn.next();
                switch (token) {
                 case "min":
                  value = ProtoBuf.ID_MIN;
                  break;

                 case "max":
                  value = ProtoBuf.ID_MAX;
                  break;

                 default:
                  value = mkNumber(token);
                }
                range.push(value);
                if (2 === range.length) break;
                if ("to" !== this.tn.peek()) {
                  range.push(value);
                  break;
                }
                this.tn.next();
              }
              ranges.push(range);
            } while (this.tn.omit(","));
            this.tn.skip(";");
            return ranges;
          };
          ParserPrototype._parseExtend = function(parent) {
            var token = this.tn.next();
            if (!Lang.TYPEREF.test(token)) throw Error("illegal extend reference: " + token);
            var ext = {
              ref: token,
              fields: []
            };
            this.tn.skip("{");
            while ("}" !== (token = this.tn.next())) if (Lang.RULE.test(token)) this._parseMessageField(ext, token); else {
              if (!Lang.TYPEREF.test(token)) throw Error("illegal extend token: " + token);
              if (!this.proto3) throw Error("illegal field rule: " + token);
              this._parseMessageField(ext, "optional", token);
            }
            this.tn.omit(";");
            parent["messages"].push(ext);
            return ext;
          };
          ParserPrototype.toString = function() {
            return "Parser at line " + this.tn.line;
          };
          DotProto.Parser = Parser;
          return DotProto;
        }(ProtoBuf, ProtoBuf.Lang);
        ProtoBuf.Reflect = function(ProtoBuf) {
          var Reflect = {};
          var T = function T(builder, parent, name) {
            this.builder = builder;
            this.parent = parent;
            this.name = name;
            this.className;
          };
          var TPrototype = T.prototype;
          TPrototype.fqn = function() {
            var name = this.name, ptr = this;
            do {
              ptr = ptr.parent;
              if (null == ptr) break;
              name = ptr.name + "." + name;
            } while (true);
            return name;
          };
          TPrototype.toString = function(includeClass) {
            return (includeClass ? this.className + " " : "") + this.fqn();
          };
          TPrototype.build = function() {
            throw Error(this.toString(true) + " cannot be built directly");
          };
          Reflect.T = T;
          var Namespace = function Namespace(builder, parent, name, options, syntax) {
            T.call(this, builder, parent, name);
            this.className = "Namespace";
            this.children = [];
            this.options = options || {};
            this.syntax = syntax || "proto2";
          };
          var NamespacePrototype = Namespace.prototype = Object.create(T.prototype);
          NamespacePrototype.getChildren = function(type) {
            type = type || null;
            if (null == type) return this.children.slice();
            var children = [];
            for (var i = 0, k = this.children.length; i < k; ++i) this.children[i] instanceof type && children.push(this.children[i]);
            return children;
          };
          NamespacePrototype.addChild = function(child) {
            var other;
            if (other = this.getChild(child.name)) if (other instanceof Message.Field && other.name !== other.originalName && null === this.getChild(other.originalName)) other.name = other.originalName; else {
              if (!(child instanceof Message.Field && child.name !== child.originalName && null === this.getChild(child.originalName))) throw Error("Duplicate name in namespace " + this.toString(true) + ": " + child.name);
              child.name = child.originalName;
            }
            this.children.push(child);
          };
          NamespacePrototype.getChild = function(nameOrId) {
            var key = "number" === typeof nameOrId ? "id" : "name";
            for (var i = 0, k = this.children.length; i < k; ++i) if (this.children[i][key] === nameOrId) return this.children[i];
            return null;
          };
          NamespacePrototype.resolve = function(qn, excludeNonNamespace) {
            var part = "string" === typeof qn ? qn.split(".") : qn, ptr = this, i = 0;
            if ("" === part[i]) {
              while (null !== ptr.parent) ptr = ptr.parent;
              i++;
            }
            var child;
            do {
              do {
                if (!(ptr instanceof Reflect.Namespace)) {
                  ptr = null;
                  break;
                }
                child = ptr.getChild(part[i]);
                if (!child || !(child instanceof Reflect.T) || excludeNonNamespace && !(child instanceof Reflect.Namespace)) {
                  ptr = null;
                  break;
                }
                ptr = child;
                i++;
              } while (i < part.length);
              if (null != ptr) break;
              if (null !== this.parent) return this.parent.resolve(qn, excludeNonNamespace);
            } while (null != ptr);
            return ptr;
          };
          NamespacePrototype.qn = function(t) {
            var part = [], ptr = t;
            do {
              part.unshift(ptr.name);
              ptr = ptr.parent;
            } while (null !== ptr);
            for (var len = 1; len <= part.length; len++) {
              var qn = part.slice(part.length - len);
              if (t === this.resolve(qn, t instanceof Reflect.Namespace)) return qn.join(".");
            }
            return t.fqn();
          };
          NamespacePrototype.build = function() {
            var ns = {};
            var children = this.children;
            for (var i = 0, k = children.length, child; i < k; ++i) {
              child = children[i];
              child instanceof Namespace && (ns[child.name] = child.build());
            }
            Object.defineProperty && Object.defineProperty(ns, "$options", {
              value: this.buildOpt()
            });
            return ns;
          };
          NamespacePrototype.buildOpt = function() {
            var opt = {}, keys = Object.keys(this.options);
            for (var i = 0, k = keys.length; i < k; ++i) {
              var key = keys[i], val = this.options[keys[i]];
              opt[key] = val;
            }
            return opt;
          };
          NamespacePrototype.getOption = function(name) {
            if ("undefined" === typeof name) return this.options;
            return "undefined" !== typeof this.options[name] ? this.options[name] : null;
          };
          Reflect.Namespace = Namespace;
          var Element = function Element(type, resolvedType, isMapKey, syntax, name) {
            this.type = type;
            this.resolvedType = resolvedType;
            this.isMapKey = isMapKey;
            this.syntax = syntax;
            this.name = name;
            if (isMapKey && ProtoBuf.MAP_KEY_TYPES.indexOf(type) < 0) throw Error("Invalid map key type: " + type.name);
          };
          var ElementPrototype = Element.prototype;
          function mkDefault(type) {
            "string" === typeof type && (type = ProtoBuf.TYPES[type]);
            if ("undefined" === typeof type.defaultValue) throw Error("default value for type " + type.name + " is not supported");
            if (type == ProtoBuf.TYPES["bytes"]) return new ByteBuffer(0);
            return type.defaultValue;
          }
          Element.defaultFieldValue = mkDefault;
          function mkLong(value, unsigned) {
            if (value && "number" === typeof value.low && "number" === typeof value.high && "boolean" === typeof value.unsigned && value.low === value.low && value.high === value.high) return new ProtoBuf.Long(value.low, value.high, "undefined" === typeof unsigned ? value.unsigned : unsigned);
            if ("string" === typeof value) return ProtoBuf.Long.fromString(value, unsigned || false, 10);
            if ("number" === typeof value) return ProtoBuf.Long.fromNumber(value, unsigned || false);
            throw Error("not convertible to Long");
          }
          ElementPrototype.toString = function() {
            return (this.name || "") + (this.isMapKey ? "map" : "value") + " element";
          };
          ElementPrototype.verifyValue = function(value) {
            var self = this;
            function fail(val, msg) {
              throw Error("Illegal value for " + self.toString(true) + " of type " + self.type.name + ": " + val + " (" + msg + ")");
            }
            switch (this.type) {
             case ProtoBuf.TYPES["int32"]:
             case ProtoBuf.TYPES["sint32"]:
             case ProtoBuf.TYPES["sfixed32"]:
              ("number" !== typeof value || value === value && value % 1 !== 0) && fail("undefined" === typeof value ? "undefined" : _typeof(value), "not an integer");
              return value > 4294967295 ? 0 | value : value;

             case ProtoBuf.TYPES["uint32"]:
             case ProtoBuf.TYPES["fixed32"]:
              ("number" !== typeof value || value === value && value % 1 !== 0) && fail("undefined" === typeof value ? "undefined" : _typeof(value), "not an integer");
              return value < 0 ? value >>> 0 : value;

             case ProtoBuf.TYPES["int64"]:
             case ProtoBuf.TYPES["sint64"]:
             case ProtoBuf.TYPES["sfixed64"]:
              if (ProtoBuf.Long) try {
                return mkLong(value, false);
              } catch (e) {
                fail("undefined" === typeof value ? "undefined" : _typeof(value), e.message);
              } else fail("undefined" === typeof value ? "undefined" : _typeof(value), "requires Long.js");

             case ProtoBuf.TYPES["uint64"]:
             case ProtoBuf.TYPES["fixed64"]:
              if (ProtoBuf.Long) try {
                return mkLong(value, true);
              } catch (e) {
                fail("undefined" === typeof value ? "undefined" : _typeof(value), e.message);
              } else fail("undefined" === typeof value ? "undefined" : _typeof(value), "requires Long.js");

             case ProtoBuf.TYPES["bool"]:
              "boolean" !== typeof value && fail("undefined" === typeof value ? "undefined" : _typeof(value), "not a boolean");
              return value;

             case ProtoBuf.TYPES["float"]:
             case ProtoBuf.TYPES["double"]:
              "number" !== typeof value && fail("undefined" === typeof value ? "undefined" : _typeof(value), "not a number");
              return value;

             case ProtoBuf.TYPES["string"]:
              "string" === typeof value || value && value instanceof String || fail("undefined" === typeof value ? "undefined" : _typeof(value), "not a string");
              return "" + value;

             case ProtoBuf.TYPES["bytes"]:
              if (ByteBuffer.isByteBuffer(value)) return value;
              return ByteBuffer.wrap(value, "base64");

             case ProtoBuf.TYPES["enum"]:
              var values = this.resolvedType.getChildren(ProtoBuf.Reflect.Enum.Value);
              for (i = 0; i < values.length; i++) {
                if (values[i].name == value) return values[i].id;
                if (values[i].id == value) return values[i].id;
              }
              if ("proto3" === this.syntax) {
                ("number" !== typeof value || value === value && value % 1 !== 0) && fail("undefined" === typeof value ? "undefined" : _typeof(value), "not an integer");
                (value > 4294967295 || value < 0) && fail("undefined" === typeof value ? "undefined" : _typeof(value), "not in range for uint32");
                return value;
              }
              fail(value, "not a valid enum value");

             case ProtoBuf.TYPES["group"]:
             case ProtoBuf.TYPES["message"]:
              value && "object" === ("undefined" === typeof value ? "undefined" : _typeof(value)) || fail("undefined" === typeof value ? "undefined" : _typeof(value), "object expected");
              if (value instanceof this.resolvedType.clazz) return value;
              if (value instanceof ProtoBuf.Builder.Message) {
                var obj = {};
                for (var i in value) value.hasOwnProperty(i) && (obj[i] = value[i]);
                value = obj;
              }
              return new this.resolvedType.clazz(value);
            }
            throw Error("[INTERNAL] Illegal value for " + this.toString(true) + ": " + value + " (undefined type " + this.type + ")");
          };
          ElementPrototype.calculateLength = function(id, value) {
            if (null === value) return 0;
            var n;
            switch (this.type) {
             case ProtoBuf.TYPES["int32"]:
              return value < 0 ? ByteBuffer.calculateVarint64(value) : ByteBuffer.calculateVarint32(value);

             case ProtoBuf.TYPES["uint32"]:
              return ByteBuffer.calculateVarint32(value);

             case ProtoBuf.TYPES["sint32"]:
              return ByteBuffer.calculateVarint32(ByteBuffer.zigZagEncode32(value));

             case ProtoBuf.TYPES["fixed32"]:
             case ProtoBuf.TYPES["sfixed32"]:
             case ProtoBuf.TYPES["float"]:
              return 4;

             case ProtoBuf.TYPES["int64"]:
             case ProtoBuf.TYPES["uint64"]:
              return ByteBuffer.calculateVarint64(value);

             case ProtoBuf.TYPES["sint64"]:
              return ByteBuffer.calculateVarint64(ByteBuffer.zigZagEncode64(value));

             case ProtoBuf.TYPES["fixed64"]:
             case ProtoBuf.TYPES["sfixed64"]:
              return 8;

             case ProtoBuf.TYPES["bool"]:
              return 1;

             case ProtoBuf.TYPES["enum"]:
              return ByteBuffer.calculateVarint32(value);

             case ProtoBuf.TYPES["double"]:
              return 8;

             case ProtoBuf.TYPES["string"]:
              n = ByteBuffer.calculateUTF8Bytes(value);
              return ByteBuffer.calculateVarint32(n) + n;

             case ProtoBuf.TYPES["bytes"]:
              if (value.remaining() < 0) throw Error("Illegal value for " + this.toString(true) + ": " + value.remaining() + " bytes remaining");
              return ByteBuffer.calculateVarint32(value.remaining()) + value.remaining();

             case ProtoBuf.TYPES["message"]:
              n = this.resolvedType.calculate(value);
              return ByteBuffer.calculateVarint32(n) + n;

             case ProtoBuf.TYPES["group"]:
              n = this.resolvedType.calculate(value);
              return n + ByteBuffer.calculateVarint32(id << 3 | ProtoBuf.WIRE_TYPES.ENDGROUP);
            }
            throw Error("[INTERNAL] Illegal value to encode in " + this.toString(true) + ": " + value + " (unknown type)");
          };
          ElementPrototype.encodeValue = function(id, value, buffer) {
            if (null === value) return buffer;
            switch (this.type) {
             case ProtoBuf.TYPES["int32"]:
              value < 0 ? buffer.writeVarint64(value) : buffer.writeVarint32(value);
              break;

             case ProtoBuf.TYPES["uint32"]:
              buffer.writeVarint32(value);
              break;

             case ProtoBuf.TYPES["sint32"]:
              buffer.writeVarint32ZigZag(value);
              break;

             case ProtoBuf.TYPES["fixed32"]:
              buffer.writeUint32(value);
              break;

             case ProtoBuf.TYPES["sfixed32"]:
              buffer.writeInt32(value);
              break;

             case ProtoBuf.TYPES["int64"]:
             case ProtoBuf.TYPES["uint64"]:
              buffer.writeVarint64(value);
              break;

             case ProtoBuf.TYPES["sint64"]:
              buffer.writeVarint64ZigZag(value);
              break;

             case ProtoBuf.TYPES["fixed64"]:
              buffer.writeUint64(value);
              break;

             case ProtoBuf.TYPES["sfixed64"]:
              buffer.writeInt64(value);
              break;

             case ProtoBuf.TYPES["bool"]:
              "string" === typeof value ? buffer.writeVarint32("false" === value.toLowerCase() ? 0 : !!value) : buffer.writeVarint32(value ? 1 : 0);
              break;

             case ProtoBuf.TYPES["enum"]:
              buffer.writeVarint32(value);
              break;

             case ProtoBuf.TYPES["float"]:
              buffer.writeFloat32(value);
              break;

             case ProtoBuf.TYPES["double"]:
              buffer.writeFloat64(value);
              break;

             case ProtoBuf.TYPES["string"]:
              buffer.writeVString(value);
              break;

             case ProtoBuf.TYPES["bytes"]:
              if (value.remaining() < 0) throw Error("Illegal value for " + this.toString(true) + ": " + value.remaining() + " bytes remaining");
              var prevOffset = value.offset;
              buffer.writeVarint32(value.remaining());
              buffer.append(value);
              value.offset = prevOffset;
              break;

             case ProtoBuf.TYPES["message"]:
              var bb = new ByteBuffer().LE();
              this.resolvedType.encode(value, bb);
              buffer.writeVarint32(bb.offset);
              buffer.append(bb.flip());
              break;

             case ProtoBuf.TYPES["group"]:
              this.resolvedType.encode(value, buffer);
              buffer.writeVarint32(id << 3 | ProtoBuf.WIRE_TYPES.ENDGROUP);
              break;

             default:
              throw Error("[INTERNAL] Illegal value to encode in " + this.toString(true) + ": " + value + " (unknown type)");
            }
            return buffer;
          };
          ElementPrototype.decode = function(buffer, wireType, id) {
            if (wireType != this.type.wireType) throw Error("Unexpected wire type for element");
            var value, nBytes;
            switch (this.type) {
             case ProtoBuf.TYPES["int32"]:
              return 0 | buffer.readVarint32();

             case ProtoBuf.TYPES["uint32"]:
              return buffer.readVarint32() >>> 0;

             case ProtoBuf.TYPES["sint32"]:
              return 0 | buffer.readVarint32ZigZag();

             case ProtoBuf.TYPES["fixed32"]:
              return buffer.readUint32() >>> 0;

             case ProtoBuf.TYPES["sfixed32"]:
              return 0 | buffer.readInt32();

             case ProtoBuf.TYPES["int64"]:
              return buffer.readVarint64();

             case ProtoBuf.TYPES["uint64"]:
              return buffer.readVarint64().toUnsigned();

             case ProtoBuf.TYPES["sint64"]:
              return buffer.readVarint64ZigZag();

             case ProtoBuf.TYPES["fixed64"]:
              return buffer.readUint64();

             case ProtoBuf.TYPES["sfixed64"]:
              return buffer.readInt64();

             case ProtoBuf.TYPES["bool"]:
              return !!buffer.readVarint32();

             case ProtoBuf.TYPES["enum"]:
              return buffer.readVarint32();

             case ProtoBuf.TYPES["float"]:
              return buffer.readFloat();

             case ProtoBuf.TYPES["double"]:
              return buffer.readDouble();

             case ProtoBuf.TYPES["string"]:
              return buffer.readVString();

             case ProtoBuf.TYPES["bytes"]:
              nBytes = buffer.readVarint32();
              if (buffer.remaining() < nBytes) throw Error("Illegal number of bytes for " + this.toString(true) + ": " + nBytes + " required but got only " + buffer.remaining());
              value = buffer.clone();
              value.limit = value.offset + nBytes;
              buffer.offset += nBytes;
              return value;

             case ProtoBuf.TYPES["message"]:
              nBytes = buffer.readVarint32();
              return this.resolvedType.decode(buffer, nBytes);

             case ProtoBuf.TYPES["group"]:
              return this.resolvedType.decode(buffer, -1, id);
            }
            throw Error("[INTERNAL] Illegal decode type");
          };
          ElementPrototype.valueFromString = function(str) {
            if (!this.isMapKey) throw Error("valueFromString() called on non-map-key element");
            switch (this.type) {
             case ProtoBuf.TYPES["int32"]:
             case ProtoBuf.TYPES["sint32"]:
             case ProtoBuf.TYPES["sfixed32"]:
             case ProtoBuf.TYPES["uint32"]:
             case ProtoBuf.TYPES["fixed32"]:
              return this.verifyValue(parseInt(str));

             case ProtoBuf.TYPES["int64"]:
             case ProtoBuf.TYPES["sint64"]:
             case ProtoBuf.TYPES["sfixed64"]:
             case ProtoBuf.TYPES["uint64"]:
             case ProtoBuf.TYPES["fixed64"]:
              return this.verifyValue(str);

             case ProtoBuf.TYPES["bool"]:
              return "true" === str;

             case ProtoBuf.TYPES["string"]:
              return this.verifyValue(str);

             case ProtoBuf.TYPES["bytes"]:
              return ByteBuffer.fromBinary(str);
            }
          };
          ElementPrototype.valueToString = function(value) {
            if (!this.isMapKey) throw Error("valueToString() called on non-map-key element");
            return this.type === ProtoBuf.TYPES["bytes"] ? value.toString("binary") : value.toString();
          };
          Reflect.Element = Element;
          var Message = function Message(builder, parent, name, options, isGroup, syntax) {
            Namespace.call(this, builder, parent, name, options, syntax);
            this.className = "Message";
            this.extensions = void 0;
            this.clazz = null;
            this.isGroup = !!isGroup;
            this._fields = null;
            this._fieldsById = null;
            this._fieldsByName = null;
          };
          var MessagePrototype = Message.prototype = Object.create(Namespace.prototype);
          MessagePrototype.build = function(rebuild) {
            if (this.clazz && !rebuild) return this.clazz;
            var clazz = function(ProtoBuf, T) {
              var fields = T.getChildren(ProtoBuf.Reflect.Message.Field), oneofs = T.getChildren(ProtoBuf.Reflect.Message.OneOf);
              var Message = function Message(values, var_args) {
                ProtoBuf.Builder.Message.call(this);
                for (var i = 0, k = oneofs.length; i < k; ++i) this[oneofs[i].name] = null;
                for (i = 0, k = fields.length; i < k; ++i) {
                  var field = fields[i];
                  this[field.name] = field.repeated ? [] : field.map ? new ProtoBuf.Map(field) : null;
                  !field.required && "proto3" !== T.syntax || null === field.defaultValue || (this[field.name] = field.defaultValue);
                }
                if (arguments.length > 0) {
                  var value;
                  if (1 !== arguments.length || null === values || "object" !== ("undefined" === typeof values ? "undefined" : _typeof(values)) || !("function" !== typeof values.encode || values instanceof Message) || Array.isArray(values) || values instanceof ProtoBuf.Map || ByteBuffer.isByteBuffer(values) || values instanceof ArrayBuffer || ProtoBuf.Long && values instanceof ProtoBuf.Long) for (i = 0, 
                  k = arguments.length; i < k; ++i) "undefined" !== typeof (value = arguments[i]) && this.$set(fields[i].name, value); else this.$set(values);
                }
              };
              var MessagePrototype = Message.prototype = Object.create(ProtoBuf.Builder.Message.prototype);
              MessagePrototype.add = function(key, value, noAssert) {
                var field = T._fieldsByName[key];
                if (!noAssert) {
                  if (!field) throw Error(this + "#" + key + " is undefined");
                  if (!(field instanceof ProtoBuf.Reflect.Message.Field)) throw Error(this + "#" + key + " is not a field: " + field.toString(true));
                  if (!field.repeated) throw Error(this + "#" + key + " is not a repeated field");
                  value = field.verifyValue(value, true);
                }
                null === this[key] && (this[key] = []);
                this[key].push(value);
                return this;
              };
              MessagePrototype.$add = MessagePrototype.add;
              MessagePrototype.set = function(keyOrObj, value, noAssert) {
                if (keyOrObj && "object" === ("undefined" === typeof keyOrObj ? "undefined" : _typeof(keyOrObj))) {
                  noAssert = value;
                  for (var ikey in keyOrObj) keyOrObj.hasOwnProperty(ikey) && "undefined" !== typeof (value = keyOrObj[ikey]) && this.$set(ikey, value, noAssert);
                  return this;
                }
                var field = T._fieldsByName[keyOrObj];
                if (noAssert) this[keyOrObj] = value; else {
                  if (!field) throw Error(this + "#" + keyOrObj + " is not a field: undefined");
                  if (!(field instanceof ProtoBuf.Reflect.Message.Field)) throw Error(this + "#" + keyOrObj + " is not a field: " + field.toString(true));
                  this[field.name] = value = field.verifyValue(value);
                }
                if (field && field.oneof) {
                  var currentField = this[field.oneof.name];
                  if (null !== value) {
                    null !== currentField && currentField !== field.name && (this[currentField] = null);
                    this[field.oneof.name] = field.name;
                  } else currentField === keyOrObj && (this[field.oneof.name] = null);
                }
                return this;
              };
              MessagePrototype.$set = MessagePrototype.set;
              MessagePrototype.get = function(key, noAssert) {
                if (noAssert) return this[key];
                var field = T._fieldsByName[key];
                if (!field || !(field instanceof ProtoBuf.Reflect.Message.Field)) throw Error(this + "#" + key + " is not a field: undefined");
                if (!(field instanceof ProtoBuf.Reflect.Message.Field)) throw Error(this + "#" + key + " is not a field: " + field.toString(true));
                return this[field.name];
              };
              MessagePrototype.$get = MessagePrototype.get;
              for (var i = 0; i < fields.length; i++) {
                var field = fields[i];
                if (field instanceof ProtoBuf.Reflect.Message.ExtensionField) continue;
                T.builder.options["populateAccessors"] && function(field) {
                  var Name = field.originalName.replace(/(_[a-zA-Z])/g, function(match) {
                    return match.toUpperCase().replace("_", "");
                  });
                  Name = Name.substring(0, 1).toUpperCase() + Name.substring(1);
                  var name = field.originalName.replace(/([A-Z])/g, function(match) {
                    return "_" + match;
                  });
                  var setter = function setter(value, noAssert) {
                    this[field.name] = noAssert ? value : field.verifyValue(value);
                    return this;
                  };
                  var getter = function getter() {
                    return this[field.name];
                  };
                  null === T.getChild("set" + Name) && (MessagePrototype["set" + Name] = setter);
                  null === T.getChild("set_" + name) && (MessagePrototype["set_" + name] = setter);
                  null === T.getChild("get" + Name) && (MessagePrototype["get" + Name] = getter);
                  null === T.getChild("get_" + name) && (MessagePrototype["get_" + name] = getter);
                }(field);
              }
              MessagePrototype.encode = function(buffer, noVerify) {
                "boolean" === typeof buffer && (noVerify = buffer, buffer = void 0);
                var isNew = false;
                buffer || (buffer = new ByteBuffer(), isNew = true);
                var le = buffer.littleEndian;
                try {
                  T.encode(this, buffer.LE(), noVerify);
                  return (isNew ? buffer.flip() : buffer).LE(le);
                } catch (e) {
                  buffer.LE(le);
                  throw e;
                }
              };
              Message.encode = function(data, buffer, noVerify) {
                return new Message(data).encode(buffer, noVerify);
              };
              MessagePrototype.calculate = function() {
                return T.calculate(this);
              };
              MessagePrototype.encodeDelimited = function(buffer, noVerify) {
                var isNew = false;
                buffer || (buffer = new ByteBuffer(), isNew = true);
                var enc = new ByteBuffer().LE();
                T.encode(this, enc, noVerify).flip();
                buffer.writeVarint32(enc.remaining());
                buffer.append(enc);
                return isNew ? buffer.flip() : buffer;
              };
              MessagePrototype.encodeAB = function() {
                try {
                  return this.encode().toArrayBuffer();
                } catch (e) {
                  e["encoded"] && (e["encoded"] = e["encoded"].toArrayBuffer());
                  throw e;
                }
              };
              MessagePrototype.toArrayBuffer = MessagePrototype.encodeAB;
              MessagePrototype.encodeNB = function() {
                try {
                  return this.encode().toBuffer();
                } catch (e) {
                  e["encoded"] && (e["encoded"] = e["encoded"].toBuffer());
                  throw e;
                }
              };
              MessagePrototype.toBuffer = MessagePrototype.encodeNB;
              MessagePrototype.encode64 = function() {
                try {
                  return this.encode().toBase64();
                } catch (e) {
                  e["encoded"] && (e["encoded"] = e["encoded"].toBase64());
                  throw e;
                }
              };
              MessagePrototype.toBase64 = MessagePrototype.encode64;
              MessagePrototype.encodeHex = function() {
                try {
                  return this.encode().toHex();
                } catch (e) {
                  e["encoded"] && (e["encoded"] = e["encoded"].toHex());
                  throw e;
                }
              };
              MessagePrototype.toHex = MessagePrototype.encodeHex;
              function cloneRaw(obj, binaryAsBase64, longsAsStrings, resolvedType) {
                if (null === obj || "object" !== ("undefined" === typeof obj ? "undefined" : _typeof(obj))) {
                  if (resolvedType && resolvedType instanceof ProtoBuf.Reflect.Enum) {
                    var name = ProtoBuf.Reflect.Enum.getName(resolvedType.object, obj);
                    if (null !== name) return name;
                  }
                  return obj;
                }
                if (ByteBuffer.isByteBuffer(obj)) return binaryAsBase64 ? obj.toBase64() : obj.toBuffer();
                if (ProtoBuf.Long.isLong(obj)) return longsAsStrings ? obj.toString() : ProtoBuf.Long.fromValue(obj);
                var clone;
                if (Array.isArray(obj)) {
                  clone = [];
                  obj.forEach(function(v, k) {
                    clone[k] = cloneRaw(v, binaryAsBase64, longsAsStrings, resolvedType);
                  });
                  return clone;
                }
                clone = {};
                if (obj instanceof ProtoBuf.Map) {
                  var it = obj.entries();
                  for (var e = it.next(); !e.done; e = it.next()) clone[obj.keyElem.valueToString(e.value[0])] = cloneRaw(e.value[1], binaryAsBase64, longsAsStrings, obj.valueElem.resolvedType);
                  return clone;
                }
                var type = obj.$type, field = void 0;
                for (var i in obj) obj.hasOwnProperty(i) && (type && (field = type.getChild(i)) ? clone[i] = cloneRaw(obj[i], binaryAsBase64, longsAsStrings, field.resolvedType) : clone[i] = cloneRaw(obj[i], binaryAsBase64, longsAsStrings));
                return clone;
              }
              MessagePrototype.toRaw = function(binaryAsBase64, longsAsStrings) {
                return cloneRaw(this, !!binaryAsBase64, !!longsAsStrings, this.$type);
              };
              MessagePrototype.encodeJSON = function() {
                return JSON.stringify(cloneRaw(this, true, true, this.$type));
              };
              Message.decode = function(buffer, length, enc) {
                "string" === typeof length && (enc = length, length = -1);
                "string" === typeof buffer ? buffer = ByteBuffer.wrap(buffer, enc || "base64") : ByteBuffer.isByteBuffer(buffer) || (buffer = ByteBuffer.wrap(buffer));
                var le = buffer.littleEndian;
                try {
                  var msg = T.decode(buffer.LE(), length);
                  buffer.LE(le);
                  return msg;
                } catch (e) {
                  buffer.LE(le);
                  throw e;
                }
              };
              Message.decodeDelimited = function(buffer, enc) {
                "string" === typeof buffer ? buffer = ByteBuffer.wrap(buffer, enc || "base64") : ByteBuffer.isByteBuffer(buffer) || (buffer = ByteBuffer.wrap(buffer));
                if (buffer.remaining() < 1) return null;
                var off = buffer.offset, len = buffer.readVarint32();
                if (buffer.remaining() < len) {
                  buffer.offset = off;
                  return null;
                }
                try {
                  var msg = T.decode(buffer.slice(buffer.offset, buffer.offset + len).LE());
                  buffer.offset += len;
                  return msg;
                } catch (err) {
                  buffer.offset += len;
                  throw err;
                }
              };
              Message.decode64 = function(str) {
                return Message.decode(str, "base64");
              };
              Message.decodeHex = function(str) {
                return Message.decode(str, "hex");
              };
              Message.decodeJSON = function(str) {
                return new Message(JSON.parse(str));
              };
              MessagePrototype.toString = function() {
                return T.toString();
              };
              var $optionsS;
              var $options;
              var $typeS;
              var $type;
              Object.defineProperty && (Object.defineProperty(Message, "$options", {
                value: T.buildOpt()
              }), Object.defineProperty(MessagePrototype, "$options", {
                value: Message["$options"]
              }), Object.defineProperty(Message, "$type", {
                value: T
              }), Object.defineProperty(MessagePrototype, "$type", {
                value: T
              }));
              return Message;
            }(ProtoBuf, this);
            this._fields = [];
            this._fieldsById = {};
            this._fieldsByName = {};
            for (var i = 0, k = this.children.length, child; i < k; i++) {
              child = this.children[i];
              if (child instanceof Enum || child instanceof Message || child instanceof Service) {
                if (clazz.hasOwnProperty(child.name)) throw Error("Illegal reflect child of " + this.toString(true) + ": " + child.toString(true) + " cannot override static property '" + child.name + "'");
                clazz[child.name] = child.build();
              } else if (child instanceof Message.Field) child.build(), this._fields.push(child), 
              this._fieldsById[child.id] = child, this._fieldsByName[child.name] = child; else if (!(child instanceof Message.OneOf) && !(child instanceof Extension)) throw Error("Illegal reflect child of " + this.toString(true) + ": " + this.children[i].toString(true));
            }
            return this.clazz = clazz;
          };
          MessagePrototype.encode = function(message, buffer, noVerify) {
            var fieldMissing = null, field;
            for (var i = 0, k = this._fields.length, val; i < k; ++i) {
              field = this._fields[i];
              val = message[field.name];
              field.required && null === val ? null === fieldMissing && (fieldMissing = field) : field.encode(noVerify ? val : field.verifyValue(val), buffer, message);
            }
            if (null !== fieldMissing) {
              var err = Error("Missing at least one required field for " + this.toString(true) + ": " + fieldMissing);
              err["encoded"] = buffer;
              throw err;
            }
            return buffer;
          };
          MessagePrototype.calculate = function(message) {
            for (var n = 0, i = 0, k = this._fields.length, field, val; i < k; ++i) {
              field = this._fields[i];
              val = message[field.name];
              if (field.required && null === val) throw Error("Missing at least one required field for " + this.toString(true) + ": " + field);
              n += field.calculate(val, message);
            }
            return n;
          };
          function skipTillGroupEnd(expectedId, buf) {
            var tag = buf.readVarint32(), wireType = 7 & tag, id = tag >>> 3;
            switch (wireType) {
             case ProtoBuf.WIRE_TYPES.VARINT:
              do {
                tag = buf.readUint8();
              } while (128 === (128 & tag));
              break;

             case ProtoBuf.WIRE_TYPES.BITS64:
              buf.offset += 8;
              break;

             case ProtoBuf.WIRE_TYPES.LDELIM:
              tag = buf.readVarint32();
              buf.offset += tag;
              break;

             case ProtoBuf.WIRE_TYPES.STARTGROUP:
              skipTillGroupEnd(id, buf);
              break;

             case ProtoBuf.WIRE_TYPES.ENDGROUP:
              if (id === expectedId) return false;
              throw Error("Illegal GROUPEND after unknown group: " + id + " (" + expectedId + " expected)");

             case ProtoBuf.WIRE_TYPES.BITS32:
              buf.offset += 4;
              break;

             default:
              throw Error("Illegal wire type in unknown group " + expectedId + ": " + wireType);
            }
            return true;
          }
          MessagePrototype.decode = function(buffer, length, expectedGroupEndId) {
            "number" !== typeof length && (length = -1);
            var start = buffer.offset, msg = new this.clazz(), tag, wireType, id, field;
            while (buffer.offset < start + length || -1 === length && buffer.remaining() > 0) {
              tag = buffer.readVarint32();
              wireType = 7 & tag;
              id = tag >>> 3;
              if (wireType === ProtoBuf.WIRE_TYPES.ENDGROUP) {
                if (id !== expectedGroupEndId) throw Error("Illegal group end indicator for " + this.toString(true) + ": " + id + " (" + (expectedGroupEndId ? expectedGroupEndId + " expected" : "not a group") + ")");
                break;
              }
              if (!(field = this._fieldsById[id])) {
                switch (wireType) {
                 case ProtoBuf.WIRE_TYPES.VARINT:
                  buffer.readVarint32();
                  break;

                 case ProtoBuf.WIRE_TYPES.BITS32:
                  buffer.offset += 4;
                  break;

                 case ProtoBuf.WIRE_TYPES.BITS64:
                  buffer.offset += 8;
                  break;

                 case ProtoBuf.WIRE_TYPES.LDELIM:
                  var len = buffer.readVarint32();
                  buffer.offset += len;
                  break;

                 case ProtoBuf.WIRE_TYPES.STARTGROUP:
                  while (skipTillGroupEnd(id, buffer)) ;
                  break;

                 default:
                  throw Error("Illegal wire type for unknown field " + id + " in " + this.toString(true) + "#decode: " + wireType);
                }
                continue;
              }
              if (field.repeated && !field.options["packed"]) msg[field.name].push(field.decode(wireType, buffer)); else if (field.map) {
                var keyval = field.decode(wireType, buffer);
                msg[field.name].set(keyval[0], keyval[1]);
              } else {
                msg[field.name] = field.decode(wireType, buffer);
                if (field.oneof) {
                  var currentField = msg[field.oneof.name];
                  null !== currentField && currentField !== field.name && (msg[currentField] = null);
                  msg[field.oneof.name] = field.name;
                }
              }
            }
            for (var i = 0, k = this._fields.length; i < k; ++i) {
              field = this._fields[i];
              if (null === msg[field.name]) if ("proto3" === this.syntax) msg[field.name] = field.defaultValue; else {
                if (field.required) {
                  var err = Error("Missing at least one required field for " + this.toString(true) + ": " + field.name);
                  err["decoded"] = msg;
                  throw err;
                }
                ProtoBuf.populateDefaults && null !== field.defaultValue && (msg[field.name] = field.defaultValue);
              }
            }
            return msg;
          };
          Reflect.Message = Message;
          var Field = function Field(builder, message, rule, keytype, type, name, id, options, oneof, syntax) {
            T.call(this, builder, message, name);
            this.className = "Message.Field";
            this.required = "required" === rule;
            this.repeated = "repeated" === rule;
            this.map = "map" === rule;
            this.keyType = keytype || null;
            this.type = type;
            this.resolvedType = null;
            this.id = id;
            this.options = options || {};
            this.defaultValue = null;
            this.oneof = oneof || null;
            this.syntax = syntax || "proto2";
            this.originalName = this.name;
            this.element = null;
            this.keyElement = null;
            !this.builder.options["convertFieldsToCamelCase"] || this instanceof Message.ExtensionField || (this.name = ProtoBuf.Util.toCamelCase(this.name));
          };
          var FieldPrototype = Field.prototype = Object.create(T.prototype);
          FieldPrototype.build = function() {
            this.element = new Element(this.type, this.resolvedType, false, this.syntax, this.name);
            this.map && (this.keyElement = new Element(this.keyType, void 0, true, this.syntax, this.name));
            "proto3" !== this.syntax || this.repeated || this.map ? "undefined" !== typeof this.options["default"] && (this.defaultValue = this.verifyValue(this.options["default"])) : this.defaultValue = Element.defaultFieldValue(this.type);
          };
          FieldPrototype.verifyValue = function(value, skipRepeated) {
            skipRepeated = skipRepeated || false;
            var self = this;
            function fail(val, msg) {
              throw Error("Illegal value for " + self.toString(true) + " of type " + self.type.name + ": " + val + " (" + msg + ")");
            }
            if (null === value) {
              this.required && fail("undefined" === typeof value ? "undefined" : _typeof(value), "required");
              "proto3" === this.syntax && this.type !== ProtoBuf.TYPES["message"] && fail("undefined" === typeof value ? "undefined" : _typeof(value), "proto3 field without field presence cannot be null");
              return null;
            }
            var i;
            if (this.repeated && !skipRepeated) {
              Array.isArray(value) || (value = [ value ]);
              var res = [];
              for (i = 0; i < value.length; i++) res.push(this.element.verifyValue(value[i]));
              return res;
            }
            if (this.map && !skipRepeated) {
              if (value instanceof ProtoBuf.Map) return value;
              value instanceof Object || fail("undefined" === typeof value ? "undefined" : _typeof(value), "expected ProtoBuf.Map or raw object for map field");
              return new ProtoBuf.Map(this, value);
            }
            !this.repeated && Array.isArray(value) && fail("undefined" === typeof value ? "undefined" : _typeof(value), "no array expected");
            return this.element.verifyValue(value);
          };
          FieldPrototype.hasWirePresence = function(value, message) {
            if ("proto3" !== this.syntax) return null !== value;
            if (this.oneof && message[this.oneof.name] === this.name) return true;
            switch (this.type) {
             case ProtoBuf.TYPES["int32"]:
             case ProtoBuf.TYPES["sint32"]:
             case ProtoBuf.TYPES["sfixed32"]:
             case ProtoBuf.TYPES["uint32"]:
             case ProtoBuf.TYPES["fixed32"]:
              return 0 !== value;

             case ProtoBuf.TYPES["int64"]:
             case ProtoBuf.TYPES["sint64"]:
             case ProtoBuf.TYPES["sfixed64"]:
             case ProtoBuf.TYPES["uint64"]:
             case ProtoBuf.TYPES["fixed64"]:
              return 0 !== value.low || 0 !== value.high;

             case ProtoBuf.TYPES["bool"]:
              return value;

             case ProtoBuf.TYPES["float"]:
             case ProtoBuf.TYPES["double"]:
              return 0 !== value;

             case ProtoBuf.TYPES["string"]:
              return value.length > 0;

             case ProtoBuf.TYPES["bytes"]:
              return value.remaining() > 0;

             case ProtoBuf.TYPES["enum"]:
              return 0 !== value;

             case ProtoBuf.TYPES["message"]:
              return null !== value;

             default:
              return true;
            }
          };
          FieldPrototype.encode = function(value, buffer, message) {
            if (null === this.type || "object" !== _typeof(this.type)) throw Error("[INTERNAL] Unresolved type in " + this.toString(true) + ": " + this.type);
            if (null === value || this.repeated && 0 == value.length) return buffer;
            try {
              if (this.repeated) {
                var i;
                if (this.options["packed"] && ProtoBuf.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) >= 0) {
                  buffer.writeVarint32(this.id << 3 | ProtoBuf.WIRE_TYPES.LDELIM);
                  buffer.ensureCapacity(buffer.offset += 1);
                  var start = buffer.offset;
                  for (i = 0; i < value.length; i++) this.element.encodeValue(this.id, value[i], buffer);
                  var len = buffer.offset - start, varintLen = ByteBuffer.calculateVarint32(len);
                  if (varintLen > 1) {
                    var contents = buffer.slice(start, buffer.offset);
                    start += varintLen - 1;
                    buffer.offset = start;
                    buffer.append(contents);
                  }
                  buffer.writeVarint32(len, start - varintLen);
                } else for (i = 0; i < value.length; i++) buffer.writeVarint32(this.id << 3 | this.type.wireType), 
                this.element.encodeValue(this.id, value[i], buffer);
              } else if (this.map) value.forEach(function(val, key, m) {
                var length = ByteBuffer.calculateVarint32(8 | this.keyType.wireType) + this.keyElement.calculateLength(1, key) + ByteBuffer.calculateVarint32(16 | this.type.wireType) + this.element.calculateLength(2, val);
                buffer.writeVarint32(this.id << 3 | ProtoBuf.WIRE_TYPES.LDELIM);
                buffer.writeVarint32(length);
                buffer.writeVarint32(8 | this.keyType.wireType);
                this.keyElement.encodeValue(1, key, buffer);
                buffer.writeVarint32(16 | this.type.wireType);
                this.element.encodeValue(2, val, buffer);
              }, this); else if (this.hasWirePresence(value, message)) {
                buffer.writeVarint32(this.id << 3 | this.type.wireType);
                this.element.encodeValue(this.id, value, buffer);
              }
            } catch (e) {
              throw Error("Illegal value for " + this.toString(true) + ": " + value + " (" + e + ")");
            }
            return buffer;
          };
          FieldPrototype.calculate = function(value, message) {
            value = this.verifyValue(value);
            if (null === this.type || "object" !== _typeof(this.type)) throw Error("[INTERNAL] Unresolved type in " + this.toString(true) + ": " + this.type);
            if (null === value || this.repeated && 0 == value.length) return 0;
            var n = 0;
            try {
              if (this.repeated) {
                var i, ni;
                if (this.options["packed"] && ProtoBuf.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) >= 0) {
                  n += ByteBuffer.calculateVarint32(this.id << 3 | ProtoBuf.WIRE_TYPES.LDELIM);
                  ni = 0;
                  for (i = 0; i < value.length; i++) ni += this.element.calculateLength(this.id, value[i]);
                  n += ByteBuffer.calculateVarint32(ni);
                  n += ni;
                } else for (i = 0; i < value.length; i++) n += ByteBuffer.calculateVarint32(this.id << 3 | this.type.wireType), 
                n += this.element.calculateLength(this.id, value[i]);
              } else if (this.map) value.forEach(function(val, key, m) {
                var length = ByteBuffer.calculateVarint32(8 | this.keyType.wireType) + this.keyElement.calculateLength(1, key) + ByteBuffer.calculateVarint32(16 | this.type.wireType) + this.element.calculateLength(2, val);
                n += ByteBuffer.calculateVarint32(this.id << 3 | ProtoBuf.WIRE_TYPES.LDELIM);
                n += ByteBuffer.calculateVarint32(length);
                n += length;
              }, this); else if (this.hasWirePresence(value, message)) {
                n += ByteBuffer.calculateVarint32(this.id << 3 | this.type.wireType);
                n += this.element.calculateLength(this.id, value);
              }
            } catch (e) {
              throw Error("Illegal value for " + this.toString(true) + ": " + value + " (" + e + ")");
            }
            return n;
          };
          FieldPrototype.decode = function(wireType, buffer, skipRepeated) {
            var value, nBytes;
            var wireTypeOK = !this.map && wireType == this.type.wireType || !skipRepeated && this.repeated && this.options["packed"] && wireType == ProtoBuf.WIRE_TYPES.LDELIM || this.map && wireType == ProtoBuf.WIRE_TYPES.LDELIM;
            if (!wireTypeOK) throw Error("Illegal wire type for field " + this.toString(true) + ": " + wireType + " (" + this.type.wireType + " expected)");
            if (wireType == ProtoBuf.WIRE_TYPES.LDELIM && this.repeated && this.options["packed"] && ProtoBuf.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) >= 0 && !skipRepeated) {
              nBytes = buffer.readVarint32();
              nBytes = buffer.offset + nBytes;
              var values = [];
              while (buffer.offset < nBytes) values.push(this.decode(this.type.wireType, buffer, true));
              return values;
            }
            if (this.map) {
              var key = Element.defaultFieldValue(this.keyType);
              value = Element.defaultFieldValue(this.type);
              nBytes = buffer.readVarint32();
              if (buffer.remaining() < nBytes) throw Error("Illegal number of bytes for " + this.toString(true) + ": " + nBytes + " required but got only " + buffer.remaining());
              var msgbuf = buffer.clone();
              msgbuf.limit = msgbuf.offset + nBytes;
              buffer.offset += nBytes;
              while (msgbuf.remaining() > 0) {
                var tag = msgbuf.readVarint32();
                wireType = 7 & tag;
                var id = tag >>> 3;
                if (1 === id) key = this.keyElement.decode(msgbuf, wireType, id); else {
                  if (2 !== id) throw Error("Unexpected tag in map field key/value submessage");
                  value = this.element.decode(msgbuf, wireType, id);
                }
              }
              return [ key, value ];
            }
            return this.element.decode(buffer, wireType, this.id);
          };
          Reflect.Message.Field = Field;
          var ExtensionField = function ExtensionField(builder, message, rule, type, name, id, options) {
            Field.call(this, builder, message, rule, null, type, name, id, options);
            this.extension;
          };
          ExtensionField.prototype = Object.create(Field.prototype);
          Reflect.Message.ExtensionField = ExtensionField;
          var OneOf = function OneOf(builder, message, name) {
            T.call(this, builder, message, name);
            this.fields = [];
          };
          Reflect.Message.OneOf = OneOf;
          var Enum = function Enum(builder, parent, name, options, syntax) {
            Namespace.call(this, builder, parent, name, options, syntax);
            this.className = "Enum";
            this.object = null;
          };
          Enum.getName = function(enm, value) {
            var keys = Object.keys(enm);
            for (var i = 0, key; i < keys.length; ++i) if (enm[key = keys[i]] === value) return key;
            return null;
          };
          var EnumPrototype = Enum.prototype = Object.create(Namespace.prototype);
          EnumPrototype.build = function(rebuild) {
            if (this.object && !rebuild) return this.object;
            var enm = new ProtoBuf.Builder.Enum(), values = this.getChildren(Enum.Value);
            for (var i = 0, k = values.length; i < k; ++i) enm[values[i]["name"]] = values[i]["id"];
            Object.defineProperty && Object.defineProperty(enm, "$options", {
              value: this.buildOpt(),
              enumerable: false
            });
            return this.object = enm;
          };
          Reflect.Enum = Enum;
          var Value = function Value(builder, enm, name, id) {
            T.call(this, builder, enm, name);
            this.className = "Enum.Value";
            this.id = id;
          };
          Value.prototype = Object.create(T.prototype);
          Reflect.Enum.Value = Value;
          var Extension = function Extension(builder, parent, name, field) {
            T.call(this, builder, parent, name);
            this.field = field;
          };
          Extension.prototype = Object.create(T.prototype);
          Reflect.Extension = Extension;
          var Service = function Service(builder, root, name, options) {
            Namespace.call(this, builder, root, name, options);
            this.className = "Service";
            this.clazz = null;
          };
          var ServicePrototype = Service.prototype = Object.create(Namespace.prototype);
          ServicePrototype.build = function(rebuild) {
            if (this.clazz && !rebuild) return this.clazz;
            return this.clazz = function(ProtoBuf, T) {
              var Service = function Service(rpcImpl) {
                ProtoBuf.Builder.Service.call(this);
                this.rpcImpl = rpcImpl || function(name, msg, callback) {
                  setTimeout(callback.bind(this, Error("Not implemented, see: https://github.com/dcodeIO/ProtoBuf.js/wiki/Services")), 0);
                };
              };
              var ServicePrototype = Service.prototype = Object.create(ProtoBuf.Builder.Service.prototype);
              var rpc = T.getChildren(ProtoBuf.Reflect.Service.RPCMethod);
              for (var i = 0; i < rpc.length; i++) (function(method) {
                ServicePrototype[method.name] = function(req, callback) {
                  try {
                    try {
                      req = method.resolvedRequestType.clazz.decode(ByteBuffer.wrap(req));
                    } catch (err) {
                      if (!(err instanceof TypeError)) throw err;
                    }
                    if (null === req || "object" !== ("undefined" === typeof req ? "undefined" : _typeof(req))) throw Error("Illegal arguments");
                    req instanceof method.resolvedRequestType.clazz || (req = new method.resolvedRequestType.clazz(req));
                    this.rpcImpl(method.fqn(), req, function(err, res) {
                      if (err) {
                        callback(err);
                        return;
                      }
                      null === res && (res = "");
                      try {
                        res = method.resolvedResponseType.clazz.decode(res);
                      } catch (notABuffer) {}
                      if (!res || !(res instanceof method.resolvedResponseType.clazz)) {
                        callback(Error("Illegal response type received in service method " + T.name + "#" + method.name));
                        return;
                      }
                      callback(null, res);
                    });
                  } catch (err) {
                    setTimeout(callback.bind(this, err), 0);
                  }
                };
                Service[method.name] = function(rpcImpl, req, callback) {
                  new Service(rpcImpl)[method.name](req, callback);
                };
                Object.defineProperty && (Object.defineProperty(Service[method.name], "$options", {
                  value: method.buildOpt()
                }), Object.defineProperty(ServicePrototype[method.name], "$options", {
                  value: Service[method.name]["$options"]
                }));
              })(rpc[i]);
              var $optionsS;
              var $options;
              var $typeS;
              var $type;
              Object.defineProperty && (Object.defineProperty(Service, "$options", {
                value: T.buildOpt()
              }), Object.defineProperty(ServicePrototype, "$options", {
                value: Service["$options"]
              }), Object.defineProperty(Service, "$type", {
                value: T
              }), Object.defineProperty(ServicePrototype, "$type", {
                value: T
              }));
              return Service;
            }(ProtoBuf, this);
          };
          Reflect.Service = Service;
          var Method = function Method(builder, svc, name, options) {
            T.call(this, builder, svc, name);
            this.className = "Service.Method";
            this.options = options || {};
          };
          var MethodPrototype = Method.prototype = Object.create(T.prototype);
          MethodPrototype.buildOpt = NamespacePrototype.buildOpt;
          Reflect.Service.Method = Method;
          var RPCMethod = function RPCMethod(builder, svc, name, request, response, request_stream, response_stream, options) {
            Method.call(this, builder, svc, name, options);
            this.className = "Service.RPCMethod";
            this.requestName = request;
            this.responseName = response;
            this.requestStream = request_stream;
            this.responseStream = response_stream;
            this.resolvedRequestType = null;
            this.resolvedResponseType = null;
          };
          RPCMethod.prototype = Object.create(Method.prototype);
          Reflect.Service.RPCMethod = RPCMethod;
          return Reflect;
        }(ProtoBuf);
        ProtoBuf.Builder = function(ProtoBuf, Lang, Reflect) {
          var Builder = function Builder(options) {
            this.ns = new Reflect.Namespace(this, null, "");
            this.ptr = this.ns;
            this.resolved = false;
            this.result = null;
            this.files = {};
            this.importRoot = null;
            this.options = options || {};
          };
          var BuilderPrototype = Builder.prototype;
          Builder.isMessage = function(def) {
            if ("string" !== typeof def["name"]) return false;
            if ("undefined" !== typeof def["values"] || "undefined" !== typeof def["rpc"]) return false;
            return true;
          };
          Builder.isMessageField = function(def) {
            if ("string" !== typeof def["rule"] || "string" !== typeof def["name"] || "string" !== typeof def["type"] || "undefined" === typeof def["id"]) return false;
            return true;
          };
          Builder.isEnum = function(def) {
            if ("string" !== typeof def["name"]) return false;
            if ("undefined" === typeof def["values"] || !Array.isArray(def["values"]) || 0 === def["values"].length) return false;
            return true;
          };
          Builder.isService = function(def) {
            if ("string" !== typeof def["name"] || "object" !== _typeof(def["rpc"]) || !def["rpc"]) return false;
            return true;
          };
          Builder.isExtend = function(def) {
            if ("string" !== typeof def["ref"]) return false;
            return true;
          };
          BuilderPrototype.reset = function() {
            this.ptr = this.ns;
            return this;
          };
          BuilderPrototype.define = function(namespace) {
            if ("string" !== typeof namespace || !Lang.TYPEREF.test(namespace)) throw Error("illegal namespace: " + namespace);
            namespace.split(".").forEach(function(part) {
              var ns = this.ptr.getChild(part);
              null === ns && this.ptr.addChild(ns = new Reflect.Namespace(this, this.ptr, part));
              this.ptr = ns;
            }, this);
            return this;
          };
          BuilderPrototype.create = function(defs) {
            if (!defs) return this;
            if (Array.isArray(defs)) {
              if (0 === defs.length) return this;
              defs = defs.slice();
            } else defs = [ defs ];
            var stack = [ defs ];
            while (stack.length > 0) {
              defs = stack.pop();
              if (!Array.isArray(defs)) throw Error("not a valid namespace: " + JSON.stringify(defs));
              while (defs.length > 0) {
                var def = defs.shift();
                if (Builder.isMessage(def)) {
                  var obj = new Reflect.Message(this, this.ptr, def["name"], def["options"], def["isGroup"], def["syntax"]);
                  var oneofs = {};
                  def["oneofs"] && Object.keys(def["oneofs"]).forEach(function(name) {
                    obj.addChild(oneofs[name] = new Reflect.Message.OneOf(this, obj, name));
                  }, this);
                  def["fields"] && def["fields"].forEach(function(fld) {
                    if (null !== obj.getChild(0 | fld["id"])) throw Error("duplicate or invalid field id in " + obj.name + ": " + fld["id"]);
                    if (fld["options"] && "object" !== _typeof(fld["options"])) throw Error("illegal field options in " + obj.name + "#" + fld["name"]);
                    var oneof = null;
                    if ("string" === typeof fld["oneof"] && !(oneof = oneofs[fld["oneof"]])) throw Error("illegal oneof in " + obj.name + "#" + fld["name"] + ": " + fld["oneof"]);
                    fld = new Reflect.Message.Field(this, obj, fld["rule"], fld["keytype"], fld["type"], fld["name"], fld["id"], fld["options"], oneof, def["syntax"]);
                    oneof && oneof.fields.push(fld);
                    obj.addChild(fld);
                  }, this);
                  var subObj = [];
                  def["enums"] && def["enums"].forEach(function(enm) {
                    subObj.push(enm);
                  });
                  def["messages"] && def["messages"].forEach(function(msg) {
                    subObj.push(msg);
                  });
                  def["services"] && def["services"].forEach(function(svc) {
                    subObj.push(svc);
                  });
                  def["extensions"] && ("number" === typeof def["extensions"][0] ? obj.extensions = [ def["extensions"] ] : obj.extensions = def["extensions"]);
                  this.ptr.addChild(obj);
                  if (subObj.length > 0) {
                    stack.push(defs);
                    defs = subObj;
                    subObj = null;
                    this.ptr = obj;
                    obj = null;
                    continue;
                  }
                  subObj = null;
                } else if (Builder.isEnum(def)) {
                  obj = new Reflect.Enum(this, this.ptr, def["name"], def["options"], def["syntax"]);
                  def["values"].forEach(function(val) {
                    obj.addChild(new Reflect.Enum.Value(this, obj, val["name"], val["id"]));
                  }, this);
                  this.ptr.addChild(obj);
                } else if (Builder.isService(def)) {
                  obj = new Reflect.Service(this, this.ptr, def["name"], def["options"]);
                  Object.keys(def["rpc"]).forEach(function(name) {
                    var mtd = def["rpc"][name];
                    obj.addChild(new Reflect.Service.RPCMethod(this, obj, name, mtd["request"], mtd["response"], !!mtd["request_stream"], !!mtd["response_stream"], mtd["options"]));
                  }, this);
                  this.ptr.addChild(obj);
                } else {
                  if (!Builder.isExtend(def)) throw Error("not a valid definition: " + JSON.stringify(def));
                  obj = this.ptr.resolve(def["ref"], true);
                  if (obj) def["fields"].forEach(function(fld) {
                    if (null !== obj.getChild(0 | fld["id"])) throw Error("duplicate extended field id in " + obj.name + ": " + fld["id"]);
                    if (obj.extensions) {
                      var valid = false;
                      obj.extensions.forEach(function(range) {
                        fld["id"] >= range[0] && fld["id"] <= range[1] && (valid = true);
                      });
                      if (!valid) throw Error("illegal extended field id in " + obj.name + ": " + fld["id"] + " (not within valid ranges)");
                    }
                    var name = fld["name"];
                    this.options["convertFieldsToCamelCase"] && (name = ProtoBuf.Util.toCamelCase(name));
                    var field = new Reflect.Message.ExtensionField(this, obj, fld["rule"], fld["type"], this.ptr.fqn() + "." + name, fld["id"], fld["options"]);
                    var ext = new Reflect.Extension(this, this.ptr, fld["name"], field);
                    field.extension = ext;
                    this.ptr.addChild(ext);
                    obj.addChild(field);
                  }, this); else if (!/\.?google\.protobuf\./.test(def["ref"])) throw Error("extended message " + def["ref"] + " is not defined");
                }
                def = null;
                obj = null;
              }
              defs = null;
              this.ptr = this.ptr.parent;
            }
            this.resolved = false;
            this.result = null;
            return this;
          };
          function propagateSyntax(parent) {
            parent["messages"] && parent["messages"].forEach(function(child) {
              child["syntax"] = parent["syntax"];
              propagateSyntax(child);
            });
            parent["enums"] && parent["enums"].forEach(function(child) {
              child["syntax"] = parent["syntax"];
            });
          }
          BuilderPrototype["import"] = function(json, filename) {
            var delim = "/";
            if ("string" === typeof filename) {
              ProtoBuf.Util.IS_NODE && (filename = require("path")["resolve"](filename));
              if (true === this.files[filename]) return this.reset();
              this.files[filename] = true;
            } else if ("object" === ("undefined" === typeof filename ? "undefined" : _typeof(filename))) {
              var root = filename.root;
              ProtoBuf.Util.IS_NODE && (root = require("path")["resolve"](root));
              (root.indexOf("\\") >= 0 || filename.file.indexOf("\\") >= 0) && (delim = "\\");
              var fname = root + delim + filename.file;
              if (true === this.files[fname]) return this.reset();
              this.files[fname] = true;
            }
            if (json["imports"] && json["imports"].length > 0) {
              var importRoot, resetRoot = false;
              if ("object" === ("undefined" === typeof filename ? "undefined" : _typeof(filename))) {
                this.importRoot = filename["root"];
                resetRoot = true;
                importRoot = this.importRoot;
                filename = filename["file"];
                (importRoot.indexOf("\\") >= 0 || filename.indexOf("\\") >= 0) && (delim = "\\");
              } else if ("string" === typeof filename) if (this.importRoot) importRoot = this.importRoot; else if (filename.indexOf("/") >= 0) {
                importRoot = filename.replace(/\/[^\/]*$/, "");
                "" === importRoot && (importRoot = "/");
              } else if (filename.indexOf("\\") >= 0) {
                importRoot = filename.replace(/\\[^\\]*$/, "");
                delim = "\\";
              } else importRoot = "."; else importRoot = null;
              for (var i = 0; i < json["imports"].length; i++) if ("string" === typeof json["imports"][i]) {
                if (!importRoot) throw Error("cannot determine import root");
                var importFilename = json["imports"][i];
                if ("google/protobuf/descriptor.proto" === importFilename) continue;
                importFilename = importRoot + delim + importFilename;
                if (true === this.files[importFilename]) continue;
                /\.proto$/i.test(importFilename) && !ProtoBuf.DotProto && (importFilename = importFilename.replace(/\.proto$/, ".json"));
                var contents = ProtoBuf.Util.fetch(importFilename);
                if (null === contents) throw Error("failed to import '" + importFilename + "' in '" + filename + "': file not found");
                /\.json$/i.test(importFilename) ? this["import"](JSON.parse(contents + ""), importFilename) : this["import"](ProtoBuf.DotProto.Parser.parse(contents), importFilename);
              } else filename ? /\.(\w+)$/.test(filename) ? this["import"](json["imports"][i], filename.replace(/^(.+)\.(\w+)$/, function($0, $1, $2) {
                return $1 + "_import" + i + "." + $2;
              })) : this["import"](json["imports"][i], filename + "_import" + i) : this["import"](json["imports"][i]);
              resetRoot && (this.importRoot = null);
            }
            json["package"] && this.define(json["package"]);
            json["syntax"] && propagateSyntax(json);
            var base = this.ptr;
            json["options"] && Object.keys(json["options"]).forEach(function(key) {
              base.options[key] = json["options"][key];
            });
            json["messages"] && (this.create(json["messages"]), this.ptr = base);
            json["enums"] && (this.create(json["enums"]), this.ptr = base);
            json["services"] && (this.create(json["services"]), this.ptr = base);
            json["extends"] && this.create(json["extends"]);
            return this.reset();
          };
          BuilderPrototype.resolveAll = function() {
            var res;
            if (null == this.ptr || "object" === _typeof(this.ptr.type)) return this;
            if (this.ptr instanceof Reflect.Namespace) this.ptr.children.forEach(function(child) {
              this.ptr = child;
              this.resolveAll();
            }, this); else if (this.ptr instanceof Reflect.Message.Field) {
              if (Lang.TYPE.test(this.ptr.type)) this.ptr.type = ProtoBuf.TYPES[this.ptr.type]; else {
                if (!Lang.TYPEREF.test(this.ptr.type)) throw Error("illegal type reference in " + this.ptr.toString(true) + ": " + this.ptr.type);
                res = (this.ptr instanceof Reflect.Message.ExtensionField ? this.ptr.extension.parent : this.ptr.parent).resolve(this.ptr.type, true);
                if (!res) throw Error("unresolvable type reference in " + this.ptr.toString(true) + ": " + this.ptr.type);
                this.ptr.resolvedType = res;
                if (res instanceof Reflect.Enum) {
                  this.ptr.type = ProtoBuf.TYPES["enum"];
                  if ("proto3" === this.ptr.syntax && "proto3" !== res.syntax) throw Error("proto3 message cannot reference proto2 enum");
                } else {
                  if (!(res instanceof Reflect.Message)) throw Error("illegal type reference in " + this.ptr.toString(true) + ": " + this.ptr.type);
                  this.ptr.type = res.isGroup ? ProtoBuf.TYPES["group"] : ProtoBuf.TYPES["message"];
                }
              }
              if (this.ptr.map) {
                if (!Lang.TYPE.test(this.ptr.keyType)) throw Error("illegal key type for map field in " + this.ptr.toString(true) + ": " + this.ptr.keyType);
                this.ptr.keyType = ProtoBuf.TYPES[this.ptr.keyType];
              }
            } else if (this.ptr instanceof ProtoBuf.Reflect.Service.Method) {
              if (!(this.ptr instanceof ProtoBuf.Reflect.Service.RPCMethod)) throw Error("illegal service type in " + this.ptr.toString(true));
              res = this.ptr.parent.resolve(this.ptr.requestName, true);
              if (!res || !(res instanceof ProtoBuf.Reflect.Message)) throw Error("Illegal type reference in " + this.ptr.toString(true) + ": " + this.ptr.requestName);
              this.ptr.resolvedRequestType = res;
              res = this.ptr.parent.resolve(this.ptr.responseName, true);
              if (!res || !(res instanceof ProtoBuf.Reflect.Message)) throw Error("Illegal type reference in " + this.ptr.toString(true) + ": " + this.ptr.responseName);
              this.ptr.resolvedResponseType = res;
            } else if (!(this.ptr instanceof ProtoBuf.Reflect.Message.OneOf) && !(this.ptr instanceof ProtoBuf.Reflect.Extension) && !(this.ptr instanceof ProtoBuf.Reflect.Enum.Value)) throw Error("illegal object in namespace: " + _typeof(this.ptr) + ": " + this.ptr);
            return this.reset();
          };
          BuilderPrototype.build = function(path) {
            this.reset();
            this.resolved || (this.resolveAll(), this.resolved = true, this.result = null);
            null === this.result && (this.result = this.ns.build());
            if (!path) return this.result;
            var part = "string" === typeof path ? path.split(".") : path, ptr = this.result;
            for (var i = 0; i < part.length; i++) {
              if (!ptr[part[i]]) {
                ptr = null;
                break;
              }
              ptr = ptr[part[i]];
            }
            return ptr;
          };
          BuilderPrototype.lookup = function(path, excludeNonNamespace) {
            return path ? this.ns.resolve(path, excludeNonNamespace) : this.ns;
          };
          BuilderPrototype.toString = function() {
            return "Builder";
          };
          Builder.Message = function() {};
          Builder.Enum = function() {};
          Builder.Service = function() {};
          return Builder;
        }(ProtoBuf, ProtoBuf.Lang, ProtoBuf.Reflect);
        ProtoBuf.Map = function(ProtoBuf, Reflect) {
          var Map = function Map(field, contents) {
            if (!field.map) throw Error("field is not a map");
            this.field = field;
            this.keyElem = new Reflect.Element(field.keyType, null, true, field.syntax);
            this.valueElem = new Reflect.Element(field.type, field.resolvedType, false, field.syntax);
            this.map = {};
            Object.defineProperty(this, "size", {
              get: function get() {
                return Object.keys(this.map).length;
              }
            });
            if (contents) {
              var keys = Object.keys(contents);
              for (var i = 0; i < keys.length; i++) {
                var key = this.keyElem.valueFromString(keys[i]);
                var val = this.valueElem.verifyValue(contents[keys[i]]);
                this.map[this.keyElem.valueToString(key)] = {
                  key: key,
                  value: val
                };
              }
            }
          };
          var MapPrototype = Map.prototype;
          function arrayIterator(arr) {
            var idx = 0;
            return {
              next: function next() {
                if (idx < arr.length) return {
                  done: false,
                  value: arr[idx++]
                };
                return {
                  done: true
                };
              }
            };
          }
          MapPrototype.clear = function() {
            this.map = {};
          };
          MapPrototype["delete"] = function(key) {
            var keyValue = this.keyElem.valueToString(this.keyElem.verifyValue(key));
            var hadKey = keyValue in this.map;
            delete this.map[keyValue];
            return hadKey;
          };
          MapPrototype.entries = function() {
            var entries = [];
            var strKeys = Object.keys(this.map);
            for (var i = 0, entry; i < strKeys.length; i++) entries.push([ (entry = this.map[strKeys[i]]).key, entry.value ]);
            return arrayIterator(entries);
          };
          MapPrototype.keys = function() {
            var keys = [];
            var strKeys = Object.keys(this.map);
            for (var i = 0; i < strKeys.length; i++) keys.push(this.map[strKeys[i]].key);
            return arrayIterator(keys);
          };
          MapPrototype.values = function() {
            var values = [];
            var strKeys = Object.keys(this.map);
            for (var i = 0; i < strKeys.length; i++) values.push(this.map[strKeys[i]].value);
            return arrayIterator(values);
          };
          MapPrototype.forEach = function(cb, thisArg) {
            var strKeys = Object.keys(this.map);
            for (var i = 0, entry; i < strKeys.length; i++) cb.call(thisArg, (entry = this.map[strKeys[i]]).value, entry.key, this);
          };
          MapPrototype.set = function(key, value) {
            var keyValue = this.keyElem.verifyValue(key);
            var valValue = this.valueElem.verifyValue(value);
            this.map[this.keyElem.valueToString(keyValue)] = {
              key: keyValue,
              value: valValue
            };
            return this;
          };
          MapPrototype.get = function(key) {
            var keyValue = this.keyElem.valueToString(this.keyElem.verifyValue(key));
            if (!(keyValue in this.map)) return;
            return this.map[keyValue].value;
          };
          MapPrototype.has = function(key) {
            var keyValue = this.keyElem.valueToString(this.keyElem.verifyValue(key));
            return keyValue in this.map;
          };
          return Map;
        }(ProtoBuf, ProtoBuf.Reflect);
        ProtoBuf.loadProto = function(proto, builder, filename) {
          ("string" === typeof builder || builder && "string" === typeof builder["file"] && "string" === typeof builder["root"]) && (filename = builder, 
          builder = void 0);
          return ProtoBuf.loadJson(ProtoBuf.DotProto.Parser.parse(proto), builder, filename);
        };
        ProtoBuf.protoFromString = ProtoBuf.loadProto;
        ProtoBuf.loadProtoFile = function(filename, callback, builder) {
          callback && "object" === ("undefined" === typeof callback ? "undefined" : _typeof(callback)) ? (builder = callback, 
          callback = null) : callback && "function" === typeof callback || (callback = null);
          if (callback) return ProtoBuf.Util.fetch("string" === typeof filename ? filename : filename["root"] + "/" + filename["file"], function(contents) {
            if (null === contents) {
              callback(Error("Failed to fetch file"));
              return;
            }
            try {
              callback(null, ProtoBuf.loadProto(contents, builder, filename));
            } catch (e) {
              callback(e);
            }
          });
          var contents = ProtoBuf.Util.fetch("object" === ("undefined" === typeof filename ? "undefined" : _typeof(filename)) ? filename["root"] + "/" + filename["file"] : filename);
          return null === contents ? null : ProtoBuf.loadProto(contents, builder, filename);
        };
        ProtoBuf.protoFromFile = ProtoBuf.loadProtoFile;
        ProtoBuf.newBuilder = function(options) {
          options = options || {};
          "undefined" === typeof options["convertFieldsToCamelCase"] && (options["convertFieldsToCamelCase"] = ProtoBuf.convertFieldsToCamelCase);
          "undefined" === typeof options["populateAccessors"] && (options["populateAccessors"] = ProtoBuf.populateAccessors);
          return new ProtoBuf.Builder(options);
        };
        ProtoBuf.loadJson = function(json, builder, filename) {
          ("string" === typeof builder || builder && "string" === typeof builder["file"] && "string" === typeof builder["root"]) && (filename = builder, 
          builder = null);
          builder && "object" === ("undefined" === typeof builder ? "undefined" : _typeof(builder)) || (builder = ProtoBuf.newBuilder());
          "string" === typeof json && (json = JSON.parse(json));
          builder["import"](json, filename);
          builder.resolveAll();
          return builder;
        };
        ProtoBuf.loadJsonFile = function(filename, callback, builder) {
          callback && "object" === ("undefined" === typeof callback ? "undefined" : _typeof(callback)) ? (builder = callback, 
          callback = null) : callback && "function" === typeof callback || (callback = null);
          if (callback) return ProtoBuf.Util.fetch("string" === typeof filename ? filename : filename["root"] + "/" + filename["file"], function(contents) {
            if (null === contents) {
              callback(Error("Failed to fetch file"));
              return;
            }
            try {
              callback(null, ProtoBuf.loadJson(JSON.parse(contents), builder, filename));
            } catch (e) {
              callback(e);
            }
          });
          var contents = ProtoBuf.Util.fetch("object" === ("undefined" === typeof filename ? "undefined" : _typeof(filename)) ? filename["root"] + "/" + filename["file"] : filename);
          return null === contents ? null : ProtoBuf.loadJson(JSON.parse(contents), builder, filename);
        };
        return ProtoBuf;
      });
      cc._RF.pop();
    }).call(this, require("_process"));
  }, {
    _process: 6,
    bytebuffer: "bytebuffer",
    fs: void 0,
    path: 5
  } ],
  request: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e34312XjCVCuqg7FEOBilWT", "request");
    "use strict";
    var net = require("net");
    var util = require("util");
    var ServerType = net.ServerType;
    var md5 = require("MD5");
    net.GatewayHeartbeat = function() {
      var msg = net.MakeMsg("GatewayHeartbeat");
      msg.free = 1;
      net.SendMsg(msg, ServerType.PS, net.RoomId, false);
    };
    net.FastRegister = function() {
      var msg = net.MakeMsg("FastRegisterRequest");
      msg.reg_type = 4;
      net.SendMsg(msg, ServerType.PS);
    };
    net.Login = function(name, password, sLicensekey) {
      var msg = net.MakeMsg("ThreeWayLoginWithDeviceRequest");
      if (null === msg) {
        console.log("msg is null");
        return;
      }
      msg.game_id = net.GameId;
      msg.account = name;
      msg.password_md5 = util.PwdMD5(password);
      msg.authcode = "";
      sLicensekey && (msg.authcode = sLicensekey);
      msg.deviceInfo = util.getDeviceInfo() + "";
      msg.platform = util.getPlatFrom();
      net.SendMsg(msg, ServerType.PS);
    };
    net.confirmAuthCode = function(aAuthCode) {
      var msg = net.MakeMsg("AuthCodeConfirm");
      msg.authcode = aAuthCode;
      net.SendMsg(msg, ServerType.PS);
    };
    net.QueryArenaReq = function() {
      var msg = net.MakeMsg("QueryArenaRequest");
      msg.game_id = net.GameId;
      net.SendMsg(msg, ServerType.PS);
    };
    net.QueryUserTableReq = function() {
      console.log("net.QueryUserTableReq");
      var msg = net.MakeMsg("QueryUserTableReq");
      net.SendMsg(msg, ServerType.MC, net.ArenaId);
    };
    net.QueryArenaReq = function() {
      var msg = net.MakeMsg("QueryArenaRequest");
      msg.game_id = net.GameId;
      net.SendMsg(msg, ServerType.PS);
    };
    net.EnterArenaReq = function(arenaId, gameVersion) {
      var msg = net.MakeMsg("UserEnterMCReq");
      msg.cur_version = gameVersion.curVersion;
      msg.min_version = gameVersion.minVersion;
      msg.max_version = gameVersion.maxVersion;
      net.SendMsg(msg, ServerType.MC, arenaId);
    };
    net.HallEnterRoomReq = function() {
      var msg = net.MakeMsg("HallEnterRoomReq");
      net.SendMsg(msg, ServerType.MC, net.ArenaId);
    };
    net.HallSitInGSReq = function(uid, roomId) {
      var msg = net.MakeMsg("HallSitInGSReq");
      msg.user_dbid = uid;
      net.SendMsg(msg, ServerType.GS, roomId);
    };
    net.CertificaitonLoginReq = function() {
      var msg = net.MakeMsg("CertificaitonLoginReq");
      msg.game_id = net.GameId;
      net.SendMsg(msg, ServerType.PS);
    };
    net.HallGsReadyReq = function() {
      console.log("kaishile", net.RoomId);
      var msg = net.MakeMsg("HallGsReadyReq");
      net.SendMsg(msg, ServerType.GS, net.RoomId);
    };
    net.RequestAttack = function(score, ratio, type) {
      console.log("房间号", net.RoomId);
      var msg = net.MakeMsg("RequestAttack");
      msg.Score = score;
      msg.Ratio = ratio;
      msg.Type = type;
      msg.IsHighMode = false;
      net.SendMsg(msg, ServerType.GD, net.RoomId);
    };
    net.RequestAdditional = function(id, data) {
      var msg = net.MakeMsg("RequestAdditional");
      msg.Id = id;
      msg.Data = data;
      net.SendMsg(msg, ServerType.GD, net.RoomId);
    };
    net.RequestGameServerTime = function() {
      var msg = net.MakeMsg("RequestGameServerTime");
      msg.bNewTime = true;
      net.SendMsg(msg, ServerType.GD, net.RoomId);
    };
    net.UserLogoutReq = function() {
      var msg = net.MakeMsg("UserLogoutReq");
      msg.game_id = net.GameId;
      msg.platform = 0;
      net.SendMsg(msg, ServerType.PS, net.RoomId);
    };
    net.ticketExchangeGoldReq = function(userid, ticket, callBack) {
      var sAddress = "http://mapi.qpgame.com/Services/api.ashx";
      var handle = "userticketchargecoin";
      var SECURITY_KEY = "E8FE168AD73Fqp*s$yGAME";
      var sign = handle + userid + ticket + net.GameId + 0 + SECURITY_KEY;
      var url = cc.js.formatStr("%s?handle=%s&uid=%d&gameid=%s&ticket=%s&datatype=json&sign=%s&exchangetype=0", sAddress, handle, userid, net.GameId, ticket, md5.hex_md5(sign));
      net.sendRequest(url, callBack);
    };
    net.sendRequest = function(url, callBack) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (4 == xhr.readyState && xhr.status >= 200 && xhr.status < 400) {
          var result = xhr.responseText;
          callBack && callBack(result);
        }
      };
      xhr.open("GET", url, true);
      xhr.send();
    };
    cc._RF.pop();
  }, {
    MD5: "MD5",
    net: "net",
    util: "util"
  } ],
  response: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4dc67bNjq1Pgpupw8vcSO2/", "response");
    "use strict";
    var net = require("net");
    var config = require("config");
    var SUCCESS = 1;
    net.OnAuthCodeConfirmRst = function(rsp) {
      rsp.result == SUCCESS;
    };
    net.OnFastRegisterResponse = function(rsp) {
      if (rsp.result == SUCCESS) {
        config.Instance.account = rsp.name;
        config.Instance.pwd = rsp.password;
        cc.sys.isNative && cc.director.getScene().getChildByName("Canvas").getChildByName("LoginLayer").getComponent("LoginLayer").saveNewData(rsp.name, rsp.password);
        console.log("kuaisuzhucechenggong ", rsp.name, rsp.password);
      } else cc.director.getScene().getChildByName("Canvas").getChildByName("WindowLayer").getComponent("WindowLayer").openTips("1004", "注册失败,请稍后再试！");
    };
    net.OnGatewayHeartbeat = function(rsp) {
      net.waitGatewayHeartbeatNum = 0;
    };
    net.OnQueryArenaResponse = function(rsp) {
      console.log("OnQueryArenaResponse", rsp.arena_info[0].id);
      net.ArenaId = rsp.arena_info[0].id;
      var config = require("config");
      net.EnterArenaReq(net.ArenaId, config.Version);
    };
    net.OnUserEnterMCRsp = function(rsp) {
      console.log("OnUserEnterMCRsp+++++++++++++++++++" + rsp.result);
      rsp.result == SUCCESS && net.HallEnterRoomReq();
    };
    net.OnHallSitInGSRsp = function(rsp) {
      if (rsp.ret_code == SUCCESS) {
        console.log("kaishile 11111");
        net.HallGsReadyReq();
      } else cc.error("错误001");
    };
    net.OnUserEnterTableRsp = function(rsp) {
      console.log("+++++++++++++++++++++++++++++++++++++");
    };
    net.OnRefreshUserMoneyRsp = function(rsp) {};
    net.OnSyncSomeOneAdditional = function(rsp) {
      if (rsp && rsp.Data && rsp.Id == globalCfg.respDataId.poker) {
        var data = rsp.Data.replace(/&/g, '"');
        console.log(data);
        var obj = JSON.parse(data);
        for (var key in obj) {
          UserManager.User.beiIndex == Number(key) && cc.director.getScene().getChildByName("Canvas").getChildByName("MainLayer").getComponent("Player").addPoker(obj[key] || {});
          UserManager.User.pokerList[key] = obj[key] || {};
        }
      }
    };
    net.OnSyncInitAdditional = function(rsp) {
      rsp && UserManager.User.synInitPlayer(rsp.Data);
    };
    net.OnSyncInitMoney = function(rsp) {
      console.log("登录同步金币");
      if (rsp) {
        UserManager.User.setMoney(rsp.Money);
        UserManager.User.oldMoney = rsp.Money;
        UserManager.User.currentMoney = rsp.Money;
      }
    };
    net.OnResponseGameServerTime = function(rsp) {
      console.log("登录同步时间");
    };
    net.OnResponseAdditional = function(rsp) {};
    net.OnHeartbeat = function(rsp) {};
    net.OnUserLogoutRsp = function(rsp) {
      console.log("退出成功");
    };
    net.OnS2CSendMessage = function(rsp) {
      if (rsp) {
        rsp.showTime = Math.min(5, rsp.showTime || 3);
        "1" == rsp.showType ? cc.director.getScene().getChildByName("Canvas").getChildByName("WindowLayer").getComponent("WindowLayer").openTips("1006", rsp.message) : "2" == rsp.showType ? cc.director.getScene().getChildByName("Canvas").getChildByName("WindowLayer").getComponent("WindowLayer").openTips("1006", rsp.message, function() {
          net.loginOk = false;
          cc.director.getScene().getChildByName("Canvas").getChildByName("WindowLayer").getComponent("WindowLayer").removeAll();
          cc.director.getScene().getChildByName("Global").getComponent("Function").loginOut(2);
        }, function() {
          var url = cc.js.formatStr(globalCfg.tAntiAddictionAddressInfo, UserManager.User.id, UserManager.User.certification);
          cc.sys.openURL(url);
          net.loginOk = false;
          cc.director.getScene().getChildByName("Canvas").getChildByName("WindowLayer").getComponent("WindowLayer").removeAll();
          cc.director.getScene().getChildByName("Global").getComponent("Function").loginOut(2);
        }) : cc.director.getScene().getChildByName("Canvas").getChildByName("WindowLayer").getComponent("WindowLayer").openTips("1006", rsp.message, null, null, rsp.showTime);
      }
    };
    net.OnRefreshUserDianJuanRsp = function(rsp) {
      rsp && UserManager.User.setVolume(Number(rsp.money));
    };
    net.OnNotifyWebChargeSuccess = function(rsp) {
      if (UserManager.User.payId) {
        cc.director.getScene().getChildByName("Canvas").getChildByName("AnimationLayer").getComponent("AnimationLayer").playPayDianjuan();
        var currntGK = 10 * (UserManager.User.bigGuanka - 1) + UserManager.User.smallGuanka;
        var gem = globalCfg.BuyGemCfg[UserManager.User.payId];
        currntGK > 10 && ("1001" == UserManager.User.payId ? gem += 1 * Math.pow(1.1, currntGK - 1) * .1 : "1002" == UserManager.User.payId ? gem += 1 * Math.pow(1.1, currntGK - 1) * .3 : "1003" == UserManager.User.payId ? gem += 1 * Math.pow(1.1, currntGK - 1) * .6 : "1004" == UserManager.User.payId ? gem += 1 * Math.pow(1.1, currntGK - 1) + 1 * Math.pow(1.1, currntGK) * .5 : "1005" == UserManager.User.payId ? gem += 1 * Math.pow(1.1, currntGK - 1) * (1 - Math.pow(1.1, 2)) / (1 - 1.1) : "1006" == UserManager.User.payId ? gem += 1 * Math.pow(1.1, currntGK - 1) * (1 - Math.pow(1.1, 5)) / (1 - 1.1) : "1007" == UserManager.User.payId ? gem += 1 * Math.pow(1.1, currntGK - 1) * (1 - Math.pow(1.1, 15)) / (1 - 1.1) : "1008" == UserManager.User.payId && (gem += 1 * Math.pow(1.1, currntGK - 1) * (1 - Math.pow(1.1, 40)) / (1 - 1.1)));
        UserManager.User.setGemNum(UserManager.User.getGemNum() + Math.round(gem));
        cc.director.getScene().getChildByName("Canvas").getChildByName("MainLayer").getComponent("Player").updateGem();
        UserManager.User.payId = null;
        if (Number(rsp.dianJuan) > 0 && !UserManager.User.audtoDuiHuan) {
          var msg = cc.js.formatStr("恭喜您获得%d点券，是否立即兑换为%d金币", Number(rsp.dianJuan), 2e3 * Number(rsp.dianJuan));
          cc.director.getScene().getChildByName("Canvas").getChildByName("WindowLayer").getComponent("WindowLayer").openTips("1006", msg, function() {}, function() {
            net.ticketExchangeGoldReq(UserManager.User.id, Number(rsp.dianJuan), function(data) {
              if (data) {
                var result = JSON.parse(data);
                if (0 == result.result.value) {
                  var _msg = "兑换成功，获得" + result.result.data.ChargeValue + "金币！";
                  cc.director.getScene().getChildByName("Canvas").getChildByName("WindowLayer").getComponent("WindowLayer").openTips("1006", _msg, null, null, 2);
                } else cc.director.getScene().getChildByName("Canvas").getChildByName("WindowLayer").getComponent("WindowLayer").openTips("1006", result.result.message, null, null, 2);
              }
            });
          });
        }
      }
    };
    cc._RF.pop();
  }, {
    config: "config",
    net: "net"
  } ],
  util: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9aeae1BQ2VIiJ8i1D2qkr9p", "util");
    "use strict";
    var md5 = require("MD5");
    var base64 = require("base64");
    function GetQueryString(name) {
      try {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (null != r) return unescape(r[2]);
        return null;
      } catch (err) {
        console.error("--------GetQueryString error:" + err);
        return null;
      }
    }
    function random(min, max) {
      return Math.round(Math.random() * (max - min)) + min;
    }
    function int(v) {
      return Math.floor(v);
    }
    var c = new Array(30);
    var jiang = 0;
    var jiao = null;
    function pushJiao(card) {
      card += 10;
      for (var i = 0; i < jiao.length; i++) if (jiao[i] == card) return;
      jiao.push(card);
    }
    function PwdMD5(str) {
      return md5.hex_md5(base64.base64encode(md5.hex_md5(str.toLowerCase())));
    }
    function xlrHttp(url, call) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (4 == xhr.readyState && xhr.status >= 200 && xhr.status < 400) {
          var response = xhr.responseText;
          call(response);
          xhr = null;
        }
      };
      xhr.open("GET", url, true);
      xhr.send();
    }
    function Http(url, callback, target) {
      cc.loader.load(url, function(err, tex) {
        if (err) {
          console.log("------ " + err);
          return;
        }
        var newframe = new cc.SpriteFrame(tex);
        callback(target, newframe);
      });
    }
    var RV = 0;
    function setRotation(r) {
      RV = r;
    }
    function convertVector2(v2) {
      switch (RV) {
       case 90:
        var nv = cc.v2(-v2.y, -v2.x);
        return nv;

       case 180:
        var nv = cc.v2(-v2.x, v2.y);
        return nv;

       case 270:
        var nv = cc.v2(v2.y, v2.x);
        return nv;

       default:
        return v2;
      }
    }
    var preTick = 0;
    function checkClickRate() {
      var cur = new Date().getTime();
      if (cur - preTick < 250) return true;
      preTick = cur;
      return false;
    }
    var gBtnOn = false;
    function setBtnOn(b) {
      gBtnOn = b;
    }
    function bBtnOn() {
      return gBtnOn;
    }
    var uIconMap = {};
    function addIconCache(uid, node, iconUrl, spriteFrame) {
      if (null == uid) return false;
      var it = uIconMap[uid];
      if (null == it) {
        it = {};
        it.node = node;
        it.iconUrl = iconUrl;
        it.spriteFrame = spriteFrame;
        uIconMap[uid] = it;
      } else {
        if (node) {
          console.log("user " + uid + " node name " + node.parent.name);
          it.node = node;
        }
        iconUrl && (it.url = iconUrl);
        if (null != it.spriteFrame) {
          console.log("user " + uid + " set icon to " + node.parent.name);
          if (node) {
            var sp = it.node.getComponent(cc.Sprite);
            sp.spriteFrame = it.spriteFrame;
            it.node.active = true;
          }
          return true;
        }
        if (spriteFrame) {
          console.log("set new spriteFrame --\x3e user " + uid);
          it.spriteFrame = null;
          it.spriteFrame = spriteFrame;
        }
      }
      return false;
    }
    function removeFromIconCache(uid) {
      var it = uIconMap[uid];
      if (it) {
        it.node = null;
        it.url = null;
      }
      uIconMap[uid] = null;
    }
    var company = [ "", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ];
    function numConversion(num) {
      var str = "";
      for (var i = 300; i > 0; i--) if (num >= Math.pow(10, 3 * i)) {
        if (i > 26) {
          str = (num / Math.pow(10, 3 * i)).toFixed(1);
          str += company[Math.floor(i / 26)];
          str += company[i % 26 + 1];
        } else {
          str = (num / Math.pow(10, 3 * i)).toFixed(1);
          str += company[i];
        }
        return str;
      }
      return Math.round(num) + "";
    }
    function lengthUTF8(len) {
      var bytes = new Array();
      for (var i = 0; i < len; i++) bytes.push(255);
      return bytes;
    }
    function getDeviceInfo() {
      if (cc.sys.platform == cc.sys.ANDROID) return jsb.reflection.callStaticMethod("org/cocos2dx/lib/Cocos2dxActivity", "GetIMEI", "()Ljava/lang/String;");
      if (cc.sys.os != cc.sys.OS_IOS || !cc.sys.isNative) return "{$BRAND$:$Microsoft$, $DEVICE$:$Windows$}";
      var ret = jsb.reflection.callStaticMethod("RootViewController", "DeviceInfo");
      if (ret) return ret;
    }
    var UNKNOWN = 1;
    var IOS = 2;
    var ANDROID = 3;
    function getPlatFrom() {
      return cc.sys.platform;
    }
    module.exports = {
      random: random,
      PwdMD5: PwdMD5,
      GetQueryString: GetQueryString,
      Http: Http,
      xlrHttp: xlrHttp,
      setRotation: setRotation,
      convertVector2: convertVector2,
      checkClickRate: checkClickRate,
      setBtnOn: setBtnOn,
      bBtnOn: bBtnOn,
      addIconCache: addIconCache,
      removeFromIconCache: removeFromIconCache,
      numConversion: numConversion,
      getDeviceInfo: getDeviceInfo,
      getPlatFrom: getPlatFrom
    };
    cc._RF.pop();
  }, {
    MD5: "MD5",
    base64: "base64"
  } ],
  xxtea: [ function(require, module, exports) {
    (function(Buffer) {
      "use strict";
      cc._RF.push(module, "a6539TOmqJLUJdVQt56aljq", "xxtea");
      "use strict";
      var delta = 2654435769;
      function toUint8Array(v, includeLength) {
        var length = v.length;
        var n = length << 2;
        if (includeLength) {
          var m = v[length - 1];
          n -= 4;
          if (m < n - 3 || m > n) return null;
          n = m;
        }
        var bytes = new Uint8Array(n);
        for (var i = 0; i < n; ++i) bytes[i] = v[i >> 2] >> ((3 & i) << 3);
        return bytes;
      }
      function toUint32Array(bytes, includeLength) {
        var length = bytes.length;
        var n = length >> 2;
        0 !== (3 & length) && ++n;
        var v;
        if (includeLength) {
          v = new Uint32Array(n + 1);
          v[n] = length;
        } else v = new Uint32Array(n);
        for (var i = 0; i < length; ++i) v[i >> 2] |= bytes[i] << ((3 & i) << 3);
        return v;
      }
      function mx(sum, y, z, p, e, k) {
        return (z >>> 5 ^ y << 2) + (y >>> 3 ^ z << 4) ^ (sum ^ y) + (k[3 & p ^ e] ^ z);
      }
      function fixk(k) {
        if (k.length < 16) {
          var key = new Uint8Array(16);
          key.set(k);
          k = key;
        }
        return k;
      }
      function encryptUint32Array(v, k) {
        var length = v.length;
        var n = length - 1;
        var y, z, sum, e, p, q;
        z = v[n];
        sum = 0;
        for (q = 0 | Math.floor(6 + 52 / length); q > 0; --q) {
          sum += delta;
          e = sum >>> 2 & 3;
          for (p = 0; p < n; ++p) {
            y = v[p + 1];
            z = v[p] += mx(sum, y, z, p, e, k);
          }
          y = v[0];
          z = v[n] += mx(sum, y, z, p, e, k);
        }
        return v;
      }
      function decryptUint32Array(v, k) {
        var length = v.length;
        var n = length - 1;
        var y, z, sum, e, p, q;
        y = v[0];
        q = Math.floor(6 + 52 / length);
        for (sum = q * delta; 0 !== sum; sum -= delta) {
          e = sum >>> 2 & 3;
          for (p = n; p > 0; --p) {
            z = v[p - 1];
            y = v[p] -= mx(sum, y, z, p, e, k);
          }
          z = v[n];
          y = v[0] -= mx(sum, y, z, p, e, k);
        }
        return v;
      }
      function stringToBytes(str) {
        var n = str.length;
        var bytes = new Uint8Array(3 * n);
        var length = 0;
        for (var i = 0; i < n; i++) {
          var codeUnit = str.charCodeAt(i);
          if (codeUnit < 128) bytes[length++] = codeUnit; else if (codeUnit < 2048) {
            bytes[length++] = 192 | codeUnit >> 6;
            bytes[length++] = 128 | 63 & codeUnit;
          } else if (codeUnit < 55296 || codeUnit > 57343) {
            bytes[length++] = 224 | codeUnit >> 12;
            bytes[length++] = 128 | codeUnit >> 6 & 63;
            bytes[length++] = 128 | 63 & codeUnit;
          } else {
            if (i + 1 < n) {
              var nextCodeUnit = str.charCodeAt(i + 1);
              if (codeUnit < 56320 && 56320 <= nextCodeUnit && nextCodeUnit <= 57343) {
                var rune = 65536 + ((1023 & codeUnit) << 10 | 1023 & nextCodeUnit);
                bytes[length++] = 240 | rune >> 18;
                bytes[length++] = 128 | rune >> 12 & 63;
                bytes[length++] = 128 | rune >> 6 & 63;
                bytes[length++] = 128 | 63 & rune;
                i++;
                continue;
              }
            }
            cc.error("Malformed string");
          }
        }
        return bytes.subarray(0, length);
      }
      function toShortString(bytes, n) {
        var charCodes = new Uint16Array(n);
        var i = 0, off = 0;
        for (var len = bytes.length; i < n && off < len; i++) {
          var unit = bytes[off++];
          switch (unit >> 4) {
           case 0:
           case 1:
           case 2:
           case 3:
           case 4:
           case 5:
           case 6:
           case 7:
            charCodes[i] = unit;
            break;

           case 12:
           case 13:
            off < len ? charCodes[i] = (31 & unit) << 6 | 63 & bytes[off++] : cc.error("Unfinished UTF-8 octet sequence");
            break;

           case 14:
            off + 1 < len ? charCodes[i] = (15 & unit) << 12 | (63 & bytes[off++]) << 6 | 63 & bytes[off++] : cc.error("Unfinished UTF-8 octet sequence");
            break;

           case 15:
            if (off + 2 < len) {
              var rune = ((7 & unit) << 18 | (63 & bytes[off++]) << 12 | (63 & bytes[off++]) << 6 | 63 & bytes[off++]) - 65536;
              if (0 <= rune && rune <= 1048575) {
                charCodes[i++] = rune >> 10 & 1023 | 55296;
                charCodes[i] = 1023 & rune | 56320;
              } else cc.error("Character outside valid Unicode range: 0x" + rune.toString(16));
            } else cc.error("Unfinished UTF-8 octet sequence");
            break;

           default:
            cc.error("Bad UTF-8 encoding 0x" + unit.toString(16));
          }
        }
        i < n && (charCodes = charCodes.subarray(0, i));
        return String.fromCharCode.apply(String, charCodes);
      }
      function toLongString(bytes, n) {
        var buf = [];
        var charCodes = new Uint16Array(32768);
        var i = 0, off = 0;
        for (var len = bytes.length; i < n && off < len; i++) {
          var unit = bytes[off++];
          switch (unit >> 4) {
           case 0:
           case 1:
           case 2:
           case 3:
           case 4:
           case 5:
           case 6:
           case 7:
            charCodes[i] = unit;
            break;

           case 12:
           case 13:
            off < len ? charCodes[i] = (31 & unit) << 6 | 63 & bytes[off++] : cc.error("Unfinished UTF-8 octet sequence");
            break;

           case 14:
            off + 1 < len ? charCodes[i] = (15 & unit) << 12 | (63 & bytes[off++]) << 6 | 63 & bytes[off++] : cc.error("Unfinished UTF-8 octet sequence");
            break;

           case 15:
            if (off + 2 < len) {
              var rune = ((7 & unit) << 18 | (63 & bytes[off++]) << 12 | (63 & bytes[off++]) << 6 | 63 & bytes[off++]) - 65536;
              if (0 <= rune && rune <= 1048575) {
                charCodes[i++] = rune >> 10 & 1023 | 55296;
                charCodes[i] = 1023 & rune | 56320;
              } else cc.error("Character outside valid Unicode range: 0x" + rune.toString(16));
            } else cc.error("Unfinished UTF-8 octet sequence");
            break;

           default:
            cc.error("Bad UTF-8 encoding 0x" + unit.toString(16));
          }
          if (i >= 32766) {
            var size = i + 1;
            buf.push(String.fromCharCode.apply(String, charCodes.subarray(0, size)));
            n -= size;
            i = -1;
          }
        }
        i > 0 && buf.push(String.fromCharCode.apply(String, charCodes.subarray(0, i)));
        return buf.join("");
      }
      function toString(bytes) {
        var n = bytes.length;
        if (0 === n) return "";
        return n < 65535 ? toShortString(bytes, n) : toLongString(bytes, n);
      }
      function encrypt(data, key) {
        "string" === typeof data && (data = stringToBytes(data));
        "string" === typeof key && (key = stringToBytes(key));
        if (void 0 === data || null === data || 0 === data.length) return data;
        return toUint8Array(encryptUint32Array(toUint32Array(data, true), toUint32Array(fixk(key), false)), false);
      }
      function encryptToString(data, key) {
        return encrypt(data, key);
      }
      function decrypt(data, key) {
        "string" === typeof data && (data = new Buffer(data, "base64"));
        "string" === typeof key && (key = stringToBytes(key));
        if (void 0 === data || null === data || 0 === data.length) return data;
        return toUint8Array(decryptUint32Array(toUint32Array(data, false), toUint32Array(fixk(key), false)), true);
      }
      function decryptToString(data, key) {
        return toString(decrypt(data, key));
      }
      module.exports = {
        decryptToString: decryptToString,
        stringToBytes: stringToBytes,
        encryptToString: encryptToString
      };
      cc._RF.pop();
    }).call(this, require("buffer").Buffer);
  }, {
    buffer: 2
  } ]
}, {}, [ "EnemyBase", "Enemy_Multi", "Enemy_NonMulti", "GameController", "GameFlags", "GameModel", "GameView", "UserClickButtonEvents", "CatchingMsgItemPool", "LoadingBarControl", "MiniHintOnLoading", "EnterRoom", "MallController", "MallFlags", "MallModel", "MallView", "VoucherManager", "MD5", "base64", "bytebuffer", "config", "long", "msgcmd", "net", "protobuf", "request", "response", "util", "xxtea", "NetTest", "BtnEventsController", "Game", "GameStatus", "Notification", "Player", "PlayerInput", "Star", "UIView" ]);