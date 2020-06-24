var exports = {},
    _dewExec = false;
function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  exports.endianness = function () {
    return 'LE';
  };

  exports.hostname = function () {
    if (typeof location !== 'undefined') {
      return location.hostname;
    } else return '';
  };

  exports.loadavg = function () {
    return [];
  };

  exports.uptime = function () {
    return 0;
  };

  exports.freemem = function () {
    return Number.MAX_VALUE;
  };

  exports.totalmem = function () {
    return Number.MAX_VALUE;
  };

  exports.cpus = function () {
    return [];
  };

  exports.type = function () {
    return 'Browser';
  };

  exports.release = function () {
    if (typeof navigator !== 'undefined') {
      return navigator.appVersion;
    }

    return '';
  };

  exports.networkInterfaces = exports.getNetworkInterfaces = function () {
    return {};
  };

  exports.arch = function () {
    return 'javascript';
  };

  exports.platform = function () {
    return 'browser';
  };

  exports.tmpdir = exports.tmpDir = function () {
    return '/tmp';
  };

  exports.EOL = '\n';

  exports.homedir = function () {
    return '/';
  };

  return exports;
}

const exports$1 = dew();
const EOL = exports$1.EOL, arch = exports$1.arch, cpus = exports$1.cpus, endianness = exports$1.endianness, freemem = exports$1.freemem, getNetworkInterfaces = exports$1.getNetworkInterfaces, homedir = exports$1.homedir, hostname = exports$1.hostname, loadavg = exports$1.loadavg, networkInterfaces = exports$1.networkInterfaces, platform = exports$1.platform, release = exports$1.release, tmpDir = exports$1.tmpDir, tmpdir = exports$1.tmpdir, totalmem = exports$1.totalmem, type = exports$1.type, uptime = exports$1.uptime;

export default exports$1;
export { EOL, arch, cpus, endianness, freemem, getNetworkInterfaces, homedir, hostname, loadavg, networkInterfaces, platform, release, tmpDir, tmpdir, totalmem, type, uptime };
