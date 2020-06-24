import './util-c86b84df.js';
import './process.js';
import './buffer.js';
import './string_decoder-a044d0fd.js';
import './events.js';
import './chunk-147c6ebb.js';
import _http from './http.js';
import './punycode.js';
import _url from './url.js';
import './querystring.js';

var exports = {},
    _dewExec = false;

var _global = typeof self !== "undefined" ? self : global;

function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  var http = _http;
  var url = _url;
  var https = exports;

  for (var key in http) {
    if (http.hasOwnProperty(key)) https[key] = http[key];
  }

  https.request = function (params, cb) {
    params = validateParams(params);
    return http.request.call(this || _global, params, cb);
  };

  https.get = function (params, cb) {
    params = validateParams(params);
    return http.get.call(this || _global, params, cb);
  };

  function validateParams(params) {
    if (typeof params === 'string') {
      params = url.parse(params);
    }

    if (!params.protocol) {
      params.protocol = 'https:';
    }

    if (params.protocol !== 'https:') {
      throw new Error('Protocol "' + params.protocol + '" not supported. Expected "https:"');
    }

    return params;
  }

  return exports;
}

const exports$1 = dew();
const Agent = exports$1.Agent, ClientRequest = exports$1.ClientRequest, IncomingMessage = exports$1.IncomingMessage, METHODS = exports$1.METHODS, STATUS_CODES = exports$1.STATUS_CODES, get = exports$1.get, globalAgent = exports$1.globalAgent, request = exports$1.request;

export default exports$1;
export { Agent, ClientRequest, IncomingMessage, METHODS, STATUS_CODES, get, globalAgent, request };
