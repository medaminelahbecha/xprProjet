const program = require("commander");
const fs = require("fs");
const  path = require('path')
const textractScan = require("./textractUtils");

program.version("0.0.1").description("Textract Lab");

module.exports = async (filePath) => {
    let data = fs.readFileSync(filePath);
    let pathname = path.extname(filePath)
    const results = await textractScan(data ,pathname);
    return results
}
  


