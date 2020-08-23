const { runLoaders } = require('loader-runner');
const fs = require('fs');
const path = require('path');

runLoaders({
    resource: path.join(__dirname,'./src/index.css'),
    loaders: [
           path.join(__dirname, './src/spritLoader.js'),
    ],
    context: {
        emitFile: () => {}
    },
    readResource: fs.readFile.bind(fs)
}, (err, result) => {
    err ? console.log(err) : console.log(result);
});