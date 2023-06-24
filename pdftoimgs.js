const { fromPath } = require("pdf2pic");
const { mkdirsSync } = require("fs-extra");
const rimraf = require("rimraf");

const specimen1 = "./data/data.pdf";

const outputDirectory = "./output";

rimraf.sync(outputDirectory);

mkdirsSync(outputDirectory);

const baseOptions = {
    saveFilename: "data",
    width: 2550,
    height: 3300,
    density: 330,
    quality: 100,
    savePath: outputDirectory
};

const convert = fromPath(specimen1, baseOptions);

convert.bulk(-1);