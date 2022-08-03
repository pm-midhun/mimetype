const exec = require('child_process').exec;
/**
 * Abstract Adapter Class.
 */
class Adapter {
  /**
 * Find mimetype of file.
 * @param {String} filePath The path of file.
 * @return {Promise} Return a promise.
 */
  getMimetype(filePath) {
    return new Promise((resolve, reject) => {
      const command = this.getCommand(filePath);
      const cb = this.getCallbackHandler(resolve, reject);
      exec(command, cb);
    });
  }
}


module.exports = Adapter;
