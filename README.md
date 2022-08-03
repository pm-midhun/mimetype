# @hoooman/mimetype

We can get the mime type of files by using this package, This package is using linux mimetype librabry.

## Usage


Install the dependencies.

```sh
npm i @hoooman/mimetype
```

Example

```sh
const mimetype = require("@hoooman/mimetype");

mimetype.getMimetype("./test.jpeg", function(err, mimeType){
    console.log(err);
    console.log(mimeType);
})

mimetype.getMimetype("./test.jpeg")
.then(res=>console.log(res))
.catch(err=> console.log(err))
```
