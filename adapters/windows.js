const Adapter = require('./adapter');
/**
 * WindowsAdapter Class.
 */
class WindowsAdapter extends Adapter {
  /**
 * @param {string} file  Path of file;
 * @return {string} The command used for identify the mimetype.
 */
  getCommand(file) {
    return `file -i ${file}`;
  }
  /**
 * @param {*} resolve Promise Resolve.
 * @param {*} reject Promise Reject.
 * @return {function} Callback Function.
 */
  getCallbackHandler(resolve, reject) {
    return (error, stdout, stderr) => {
      if (error) {
        reject('Not supported');
      }
      if (stdout) {
        if (stdout.includes('not found')) {
          reject('Not supported');
        } else {
          resolve(that.returnMimetypeFromResponse(stdout));
        }
      }
      if (stderr) {
        reject('Not supported');
      }
    };
  }
  /**
 *
 * @param {*} response String.
 * @return {string} Mimetype.
 */
  returnMimetypeFromResponse(response) {
    const [mimetypeWithName] = response.split(';');
    const [mimetype] = mimetypeWithName.split(': ').reverse();
    return mimetype.replace(/\n/g, '');
  }
}
module.exports = WindowsAdapter;
