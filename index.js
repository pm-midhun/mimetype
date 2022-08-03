const os = require('os');
const LinuxAdapter = require('./adapters/linux');
const WindowsAdapter = require('./adapters/windows');

/**
 * Mimetype function.
 */
function Mimetype() {
  this._os = os.type();
  switch (this._os) {
    case 'Linux':
      this.adapter = new LinuxAdapter();
      break;
    case 'Windows_NT':
      this.adapter = new WindowsAdapter();
      break;
    default:
      this.adapter = null;
      break;
  }
}


Mimetype.prototype.getMimetype = function(filePath, cb = null) {
  const promise = new Promise((resolve, reject) =>{
    try {
      this.adapter.getMimetype(filePath).then(resolve).catch(reject);
    } catch (err) {
      const error = new Error('We don\'t support for the OS: '+this._os);
      reject(error.message);
    }
  });
  if (cb) {
    return promise.then(function(res) {
      return cb(null, res);
    }).catch(cb);
  } else {
    return promise;
  }
};


module.exports = new Mimetype();
