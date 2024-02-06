const wkhtmltopdf = require("wkhtmltopdf");
const fs = require("fs");

function htmlToPdfBase64(input) {
  return new Promise((resolve, reject) => {
    const chunks = [];

    wkhtmltopdf(input, {
      output: "out.pdf",
      pageSize: "A4",
      debug: true,
    })
      .on("data", (chunk) => {
        chunks.push(chunk);
      })
      .on("end", () => {
        const pdfBuffer = Buffer.concat(chunks);
        const base64String = pdfBuffer.toString("base64");
        resolve(base64String);
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

function exportHtml(url, file, options) {
  return new Promise((resolve, reject) => {
    wkhtmltopdf(url, options, (err, stream) => {
      if (err) {
        reject(err);
      } else {
        stream.pipe(fs.createWriteStream(file));
        resolve();
      }
    });
  });
}

module.exports = {
  htmlToPdfBase64,
  exportHtml,
};
