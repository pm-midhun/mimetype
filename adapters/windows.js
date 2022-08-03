function WindowsAdapter() {}
WindowsAdapter.prototype.trimResponse = function (response) {
    let [mimetypeWithName] = response.split(";");
    let [mimetype] = mimetypeWithName.split(": ").reverse();
    return mimetype.replace(/\n/g, '');
}

WindowsAdapter.prototype.getMimetype = function (filePath) {
    const that = this;
    return new Promise(function (resolve, reject) {
        exec(`file -i ${filePath}`, function (error, stdout, stderr) {
            if (error) {
                reject("Not supported");
            }
            if (stdout) {
                if (stdout.includes("not found")) {
                    reject("Not supported");
                } else {
                    resolve(that.trimResponse(stdout))
                }

            }
            if (stderr) {
                reject("Not supported");
            }
        });
    })

}

module.exports = WindowsAdapter;