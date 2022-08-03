# @hoooman/mimetype

We can get the mime type of files by using this package, This package is using linux mimetype librabry.

## Usage


Install the dependencies.

```sh
npm i @hoooman/mimetype
```

Example

```sh
const getMimetype = require("@hoooman/mimetype");

getMimetype("./test.jpeg", function(err, mimeType){
    console.log(err);
    console.log(mimeType);
})

getMimetype("./test.jpeg")
.then(res=>console.log(res))
.catch(err=> console.log(err))
```
