const pdfMake = require("pdfmake/build/pdfmake");
const pdfFonts = require("pdfmake/build/vfs_fonts");
pdfMake.vfs = pdfFonts.pdfMake.vfs;
const fs = require("fs");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM("");
const htmlToPdfMake = require("html-to-pdfmake");
const axios = require("axios");

async function imageUrlToBase64(url) {
  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer",
    });

    const contentType = response.headers["content-type"];

    const base64String = `data:${contentType};base64,${Buffer.from(
      response.data
    ).toString("base64")}`;

    return base64String;
  } catch (err) {
    console.log(err);
  }
}

async function replaceImageUrlsWithBase64(html) {
  const dom = new JSDOM(html);
  const images = dom.window.document.querySelectorAll("img");

  for (let img of images) {
    const src = img.getAttribute("src");
    if (src.startsWith("http")) {
      // Kiểm tra nếu src là một URL
      const base64String = await imageUrlToBase64(src);
      img.setAttribute("src", base64String);
    }
  }

  return dom.serialize(); // Trả về HTML đã được cập nhật
}

const HTML = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <title>Invoice template - Bootstrap 3</title>
  </head>
  <body>
    <div id="app" class="container invoice page">
      <img
        src="https://vcdn-giaitri.vnecdn.net/2023/07/31/hanoi-10-1690819668-8726-1690819791.jpg"
        alt=""
        style="width: 100%;"
      />
    </div>

    <!-- Scripts -->
  </body>
</html>
`;

async function htmlPDFTest() {
  let updatedHTML = await replaceImageUrlsWithBase64(HTML);

  const html = htmlToPdfMake(updatedHTML, {
    window,
  });

  const docDefinition = {
    content: [html],
  };

  const pdfDocGenerator = pdfMake.createPdf(docDefinition);
  return new Promise((resolve, reject) => {
    pdfDocGenerator.getBase64(
      (base64) => {
        fs.writeFileSync("example-image.pdf", base64.toString(), "base64");
        resolve(base64);
      },
      function (error) {
        reject(error);
      }
    );
  });
}

module.exports = {
  htmlPDFTest,
};
