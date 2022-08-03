const exec = require("child_process").exec;

function Mimetype() {}

Mimetype.prototype.trimResponse = function (response) {
    let [mimetype] = response.split(": ").reverse();
    return mimetype;
}

Mimetype.prototype.getMimetype = function (filePath) {
    const that = this;
    return new Promise(function (resolve, reject) {
        exec(`mimetype ${filePath}`, function (error, stdout, stderr) {
            if (error) {
                reject("Mimetype is not installed");
            }
            if (stdout) {
                if (stdout.includes("not found")) {
                    reject("Mimetype is not installed");
                } else {
                    resolve(that.trimResponse(stdout))
                }

            }
            if (stderr) {
                reject("Mimetype: Error occurred while processing.");
            }
        });
    });
}

function getMimetype (filePath, cb = null) {
    let promise = new Promise(function (resolve, reject) {
        let mimeTypeFactory = new Mimetype();
        mimeTypeFactory.getMimetype(filePath).then(resolve).catch(reject)

    });
    if (cb) {
        return promise.then(function (res) {
            return cb(null, res)
        }).catch(cb);
    } else {
        return promise
    }
}

module.exports = getMimetype;

