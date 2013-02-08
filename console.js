/**
 * Simple console to buffer headless log statements
 * and then add them to a buffer to be read.
 */

var console = window.console;

module.exports = function Console () {
  this.buffer = [];
};


Console.prototype.log = function () {
  this.buffer.push.apply(null, arguments);

  if (console) console.log.apply(console, arguments);
};


Console.prototype.read = function () {
  var buffer = this.buffer;
  this.buffer = [];

  return buffer;
};


