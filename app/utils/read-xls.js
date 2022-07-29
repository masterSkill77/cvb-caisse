const readXlsxFile = require("read-excel-file/node");
const fs = require("fs");

module.exports = function (filename, schema) {
  return new Promise((resolve, reject) => {
    readXlsxFile(fs.createReadStream(filename), { schema })
      .then(({ rows, error }) => {
        resolve(rows);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
