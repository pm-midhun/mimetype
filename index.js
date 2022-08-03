const exec = require("child_process").exec;
const os = require("os");
const LinuxAdapter = require("./adapters/linux");
const WindowsAdapter = require("./adapters/windows");


function Mimetype() {
    let _os = os.type();
    switch (_os) {
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


Mimetype.prototype.getMimetype = function (filePath, cb = null) {
    let that = this;
    let promise = new Promise(function (resolve, reject) {
        if(that.adapter === null){
            reject("Mimetype does't support this OS");
        }
        that.adapter.getMimetype(filePath).then(resolve).catch(reject)
    });
    if (cb) {
        return promise.then(function (res) {
            return cb(null, res)
        }).catch(cb);
    } else {
        return promise
    }
}


module.exports = new Mimetype();