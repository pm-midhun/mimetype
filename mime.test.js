const getMimetype = require("./index");

test("Check type of package json file", ()=>{
    getMimetype('./package.json').then(data=>{
        expect(data).toBe(" application/json");
    }).catch(console.log)
})