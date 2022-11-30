"use strict";
const testFolder = './databases';
const fs = require('fs');
const ciba = fs.readdirSync(testFolder);
console.log(ciba);
//.forEach(fileName => {
//  console.log(fileName, 5);
//});
