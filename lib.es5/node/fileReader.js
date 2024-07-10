"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _nodeFs = require("node:fs");
var _isStream = _interopRequireDefault(require("is-stream"));
var _BufferSource = _interopRequireDefault(require("./sources/BufferSource.js"));
var _FileSource = _interopRequireDefault(require("./sources/FileSource.js"));
var _StreamSource = _interopRequireDefault(require("./sources/StreamSource.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
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
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var FileReader = exports.default = /*#__PURE__*/function () {
  function FileReader() {
    _classCallCheck(this, FileReader);
  }
  return _createClass(FileReader, [{
    key: "openFile",
    value: function openFile(input, chunkSize) {
      if (Buffer.isBuffer(input)) {
        return Promise.resolve(new _BufferSource.default(input));
      }
      if (input instanceof _nodeFs.ReadStream && input.path != null) {
        return (0, _FileSource.default)(input);
      }
      if (_isStream.default.readable(input)) {
        chunkSize = Number(chunkSize);
        if (!Number.isFinite(chunkSize)) {
          return Promise.reject(new Error('cannot create source for stream without a finite value for the `chunkSize` option; specify a chunkSize to control the memory consumption'));
        }
        return Promise.resolve(new _StreamSource.default(input));
      }
      return Promise.reject(new Error('source object may only be an instance of Buffer or Readable in this environment'));
    }
  }]);
}();