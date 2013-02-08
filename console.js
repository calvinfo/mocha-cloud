/**
 * Simple console to buffer headless log statements
 * and then add them to a buffer. Overrides console.log
 * and other log statements, then the buffer is read
 * by the mocha-cloud runner.
 */

// Keep a reference to our window.console.
var console = window.console;


var logger = function (level) {
  return function () {
    this.buffer.push({ level : level, args : arguments });

    if (console && console[level]) console[level].apply(console, arguments);
  };
};


var Console = module.exports = function Console () {
  this.buffer = [];
};

if (console) Console.prototype = console;

Console.prototype.log   = logger('log');
Console.prototype.warn  = logger('warn');
Console.prototype.info  = logger('info');
Console.prototype.error = logger('error');
Console.prototype.debug = logger('debug');


/**
 * Returns the buffer of logged messages
 *
 * [{
 *   level : 'log',
 *   args  : ['my', 'log', 'call']
 * }]
 *
 * @return {Array} buffer
 */
Console.prototype.read = function () {
  var buffer = this.buffer;
  this.buffer = [];

  return buffer;
};