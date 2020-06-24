import _events from './events.js';

var exports = {},
    _dewExec = false;
function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  exports = function () {
    // Import Events
    var events = _events; // Export Domain

    var domain = {};

    domain.createDomain = domain.create = function () {
      var d = new events.EventEmitter();

      function emitError(e) {
        d.emit('error', e);
      }

      d.add = function (emitter) {
        emitter.on('error', emitError);
      };

      d.remove = function (emitter) {
        emitter.removeListener('error', emitError);
      };

      d.bind = function (fn) {
        return function () {
          var args = Array.prototype.slice.call(arguments);

          try {
            fn.apply(null, args);
          } catch (err) {
            emitError(err);
          }
        };
      };

      d.intercept = function (fn) {
        return function (err) {
          if (err) {
            emitError(err);
          } else {
            var args = Array.prototype.slice.call(arguments, 1);

            try {
              fn.apply(null, args);
            } catch (err) {
              emitError(err);
            }
          }
        };
      };

      d.run = function (fn) {
        try {
          fn();
        } catch (err) {
          emitError(err);
        }

        return this;
      };

      d.dispose = function () {
        this.removeAllListeners();
        return this;
      };

      d.enter = d.exit = function () {
        return this;
      };

      return d;
    };

    return domain;
  }.call(exports);

  return exports;
}

const exports$1 = dew();
const create = exports$1.create, createDomain = exports$1.createDomain;

export default exports$1;
export { create, createDomain };
