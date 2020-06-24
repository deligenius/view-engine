var exports = {},
    _dewExec = false;
function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  exports.isatty = function () {
    return false;
  };

  function ReadStream() {
    throw new Error('tty.ReadStream is not implemented');
  }

  exports.ReadStream = ReadStream;

  function WriteStream() {
    throw new Error('tty.WriteStream is not implemented');
  }

  exports.WriteStream = WriteStream;
  return exports;
}

const exports$1 = dew();
const ReadStream = exports$1.ReadStream, WriteStream = exports$1.WriteStream, isatty = exports$1.isatty;

export default exports$1;
export { ReadStream, WriteStream, isatty };
