const exec = require("child_process").exec;

function LinuxAdapter () {}

LinuxAdapter.prototype.trimResponse = function (response) {
    let [mimetype] = response.split(": ").reverse();
    return mimetype.replace(/\n/g, '');
}

LinuxAdapter.prototype.getMimetype = function(filePath) {
    const that = this;
    return new Promise(function(resolve, reject){
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
    })    
}

module.exports = LinuxAdapter;