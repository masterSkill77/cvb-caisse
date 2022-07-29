// const readXlsxFile = require("read-excel-file/node");
const fs = require("fs");
var XLSX = require("xlsx");

module.exports = function (filename) {
  const workbook = XLSX.readFile(filename);
  const { SheetNames: sheetNames } = workbook;
  // console.log(XLSX.utils.decode_col(workbook.Sheets[sheetNames[0]]));
  return XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]);
  // var obj = xlsx.parse(fs.readFileSync(filename)); // parses a file
  // return obj[0].data;
  // return new Promise((resolve, reject) => {
  //   readXlsxFile("app/uploads/file.xlsx")
  //     .then(({ rows, error }) => {
  //       console.log(rows);
  //       resolve(rows);
  //     })
  //     .catch((error) => {
  //       reject(error);
  //     });
  // });
};

// var obj = xlsx.parse(fs.readFileSync(__dirname + "/myFile.xlsx"));
