const Adapter = require('./adapter');
/**
 * LinuxAdapter Class.
 */
class LinuxAdapter extends Adapter {
/**
 * @param {string} file  Path of file;
 * @return {string} The command used for identify the mimetype.
 */
  getCommand(file) {
    return `mimetype ${file}`;
  }

  /**
 * @param {*} resolve Promise Resolve.
 * @param {*} reject Promise Reject.
 * @return {function} Callback Function.
 */
  getCallbackHandler(resolve, reject) {
    return (error, stdout, stderr) => {
      if (error) {
        reject('Mimetype is not installed');
      }
      if (stdout) {
        if (stdout.includes('not found')) {
          reject('Mimetype is not installed');
        } else {
          resolve(this.returnMimetypeFromResponse(stdout));
        }
      }
      if (stderr) {
        reject('Mimetype: Error occurred while processing.');
      }
    };
  }

  /**
 *
 * @param {*} response String.
 * @return {string} Mimetype.
 */
  returnMimetypeFromResponse(response) {
    const [mimetype] = response.split(': ').reverse();
    return mimetype.replace(/\n/g, '');
  }
}

module.exports = LinuxAdapter;
