const fs = require('fs');
const minify = require('minify');
const outputDir = './dist/';
const moveFiles = [
    './_dev/js/TLImageViewer.js',
    './_dev/css/TLImageViewer.css',
]

moveFiles.forEach((inputFilePath) => {
    const paths = inputFilePath.split('/');
    const fileName = paths[paths.length - 1];
    const outputPath = `${outputDir}${fileName}`;

    fs.copyFile(inputFilePath, outputPath, (err) => {
        if (err) {
            throw err;
        }

        minify(outputPath).then((data) => {
            fs.writeFile(outputPath, data, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        });
    });
})