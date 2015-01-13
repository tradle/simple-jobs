
'use strict';

var assert = require('assert');

function Jobs() {
  this._jobs = {};
}

Jobs.prototype.add = function(name, fn, interval) {
  assert(typeof name !== 'undefined' && 
         typeof fn !== 'undefined' && 
         typeof interval !== 'undefined', 
         'parameters name, fn and interval are all required');

  if (this._jobs[name]) throw new Error('job with name "' + name + '" already exists');

  this._jobs[name] = {
    id: setInterval(fn, interval)
  }
}

Jobs.prototype.remove = function(name) {
  var job = this._jobs[name];
  if (job) {
    clearInterval(job.id);
    delete this._jobs[name];
  }
}

Jobs.prototype.has = function(name) {
  return !!this._jobs[name];
}

Jobs.prototype.clear = function() {
  for (var name in this._jobs) {
    this.remove(name);
  }
}

module.exports = Jobs;