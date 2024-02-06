require("dotenv").config();
const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const wkhtmltopdf = require("wkhtmltopdf");
const path = require("path");
const { htmlToPdfBase64, exportHtml } = require("./utils/html-to-pdf");

const app = express();

//setting middleware
app.use(express.static(path.join(__dirname, "..")));

// init middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.post("/stream", (req, res, next) => {
  wkhtmltopdf(
    "https://vuduong97.github.io/template-html",
    {
      output: "out.pdf",
      pageSize: "letter",
      ignore: [
        /QFont::setPixelSize/,
        /Warning: Received createRequest signal/,
        /SSL/,
      ],
      debug: true,
      disableSmartShrinking: true,
      javascriptDelay: 10000,
    },
    function (err, stream) {
      if (err) {
        return res.status(500).json({
          message: "Lỗi trong quá trình tạo PDF",
        });
      }
      // Khi PDF đã được tạo xong và không có lỗi, trả về cho client
      return res.status(200).json({
        message: "Welcome Fan TipJS!",
      });
    }
  );
});

app.post("/stream2", async (req, res, next) => {
  const dpi = 270;
  const ts = new Date().getTime();
  const outFile = path.join(
    __dirname,
    "..",
    "public",
    `out_dpi${dpi}_${ts}.pdf`
  );
  console.log("🏆 ~ app.post ~ outFile:", outFile);

  const url = "https://vuduong97.github.io/template-html";
  const options = {
    dpi,
    pageSize: "letter",
    ignore: [
      /QFont::setPixelSize/,
      /Warning: Received createRequest signal/,
      /SSL/,
    ],
    debug: true,
    disableSmartShrinking: true,
    javascriptDelay: 10000, // to avoid: Warning: Received createRequest signal on a disposed ResourceObject's NetworkAccessManager. This might be an indication of an iframe taking too long to load.
  };
  try {
    await exportHtml(url, outFile, options);

    console.log("🏆 ~ app.post ~ outFile:", outFile);

    console.log("INFO: Promise fulfilled  - Async code terminated");

    return res.status(200).json({
      message: "Welcome Fan TipJS!",
    });
  } catch (error) {
    console.log(`ERROR: Handle rejected promise: '${error}' !!!`);
  }
});

app.use("/", (req, res, next) => {
  return res.status(200).json({
    message: "Welcome Fan TipJS!",
  });
});

// handling error

module.exports = app;
