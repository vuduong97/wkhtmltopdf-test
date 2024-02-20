require("dotenv").config();
const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const wkhtmltopdf = require("wkhtmltopdf");
const path = require("path");
const { htmlPDFTest } = require("./utils/html-to-pdfmake");
const { htmlPuppeteer } = require("./utils/html-puppeteer");

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
  const buffer = await htmlPDFTest();

  return res.status(200).json({
    message: "Welcome Fan TipJS!",
    data: buffer,
  });
});

app.post("/stream3", async (req, res, next) => {
  await htmlPuppeteer();

  return res.status(200).json({
    message: "Welcome Fan TipJS!",
    // data: buffer,
  });
});

app.use("/", (req, res, next) => {
  return res.status(200).json({
    message: "Welcome Fan TipJS!",
  });
});

// handling error

module.exports = app;
