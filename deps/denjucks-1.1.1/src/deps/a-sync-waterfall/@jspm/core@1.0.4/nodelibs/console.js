import { a as _util } from './util-c86b84df.js';
import './process.js';
import _assert from './assert.js';

var exports = {},
    _dewExec = false;
function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  exports = now;

  function now() {
    return new Date().getTime();
  }

  return exports;
}

var exports$1 = {},
    _dewExec$1 = false;

var _global = typeof self !== "undefined" ? self : global;

function dew$1() {
  if (_dewExec$1) return exports$1;
  _dewExec$1 = true;

  /*global window, global*/
  var util = _util;
  var assert = _assert;

  var now = dew();

  var slice = Array.prototype.slice;
  var console;
  var times = {};

  if (typeof _global !== "undefined" && _global.console) {
    console = _global.console;
  } else if (typeof window !== "undefined" && window.console) {
    console = window.console;
  } else {
    console = {};
  }

  var functions = [[log, "log"], [info, "info"], [warn, "warn"], [error, "error"], [time, "time"], [timeEnd, "timeEnd"], [trace, "trace"], [dir, "dir"], [consoleAssert, "assert"]];

  for (var i = 0; i < functions.length; i++) {
    var tuple = functions[i];
    var f = tuple[0];
    var name = tuple[1];

    if (!console[name]) {
      console[name] = f;
    }
  }

  exports$1 = console;

  function log() {}

  function info() {
    console.log.apply(console, arguments);
  }

  function warn() {
    console.log.apply(console, arguments);
  }

  function error() {
    console.warn.apply(console, arguments);
  }

  function time(label) {
    times[label] = now();
  }

  function timeEnd(label) {
    var time = times[label];

    if (!time) {
      throw new Error("No such label: " + label);
    }

    var duration = now() - time;
    console.log(label + ": " + duration + "ms");
  }

  function trace() {
    var err = new Error();
    err.name = "Trace";
    err.message = util.format.apply(null, arguments);
    console.error(err.stack);
  }

  function dir(object) {
    console.log(util.inspect(object) + "\n");
  }

  function consoleAssert(expression) {
    if (!expression) {
      var arr = slice.call(arguments, 1);
      assert.ok(false, util.format.apply(null, arr));
    }
  }

  return exports$1;
}

const exports$2 = dew$1();
const assert = exports$2.assert, clear = exports$2.clear, context = exports$2.context, count = exports$2.count, countReset = exports$2.countReset, debug = exports$2.debug, dir = exports$2.dir, dirxml = exports$2.dirxml, error = exports$2.error, group = exports$2.group, groupCollapsed = exports$2.groupCollapsed, groupEnd = exports$2.groupEnd, info = exports$2.info, log = exports$2.log, memory = exports$2.memory, profile = exports$2.profile, profileEnd = exports$2.profileEnd, table = exports$2.table, time = exports$2.time, timeEnd = exports$2.timeEnd, timeStamp = exports$2.timeStamp, trace = exports$2.trace, warn = exports$2.warn;

export default exports$2;
export { assert, clear, context, count, countReset, debug, dir, dirxml, error, group, groupCollapsed, groupEnd, info, log, memory, profile, profileEnd, table, time, timeEnd, timeStamp, trace, warn };
