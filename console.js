/**
 * Simple console to buffer headless log statements
 * and then add them to a buffer to be read.
 */

var console = window.console;

var logger = function (type) {
  return function () {
    this.buffer.push({ type : type, args : arguments });

    if (console && console[type]) console[type].apply(console, arguments);
  };
};

var Console = module.exports = function Console () {
  this.buffer = [];
};

Console.prototype.log   = logger('log');
Console.prototype.warn  = logger('warn');
Console.prototype.info  = logger('info');
Console.prototype.error = logger('error');

Console.prototype.read = function () {
  var buffer = this.buffer;
  this.buffer = [];

  return buffer;
};


