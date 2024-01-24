require("dotenv").config();
const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const wkhtmltopdf = require("wkhtmltopdf");
const path = require("path");

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

// init db
// require("./db/init.mongodb");
// const { checkOverLoad } = require("./helpers/check.connect");
// checkOverLoad();

// init routes

// app.use("/", require("./routes"));
app.get("/test", async (req, res) => {
  const query = req.query;
  const { url } = query;
  console.log("🏆 ~ app.get ~ query:", query);

  if (!url) {
    return res.status(400).send("Missing url");
  }

  let count = 0;
  const buffer = await new Promise((resolve, reject) => {
    wkhtmltopdf(
      url,
      {
        // enableLocalFileAccess: true,
        // debugJavascript: true,
        // disableJavascript: true,
        pageSize: "A4",
        debug: true,
      },
      (error, stream) => {
        if (error) {
          console.log("🏆 ~ generatePdfFromHtml ~ error:", error);
          reject(error);
        } else {
          const chunks = [];
          stream.on("data", (chunk) => {
            console.log(`🏆 ~ stream.on ~ chunk ${count}: `, chunk);
            count++;
            return chunks.push(chunk);
          });
          stream.on("end", () => resolve(Buffer.concat(chunks)));
          stream.on("error", (err) => {
            console.log("error", err);
            reject(err);
          });
        }
      }
    );
  });

  console.log("🏆 ~ buffer ~ buffer:", buffer);

  // await new Promise((resolve) => setTimeout(resolve, 3000));

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": 'attachment; filename="example.pdf"',
  });
  res.send(buffer);

  // return res.status(200).json({
  //   message: "Build pdf success!",
  // });
});

app.use("/123", (req, res, next) => {
  wkhtmltopdf("https://vuduong97.github.io/template-html/", {
    output: "out.pdf",
    pageSize: "A4",
    debug: true,
  });

  return res.status(200).json({
    message: "Welcome Fan TipJS!",
  });
});

app.use("/", (req, res, next) => {
  return res.status(200).json({
    message: "Welcome Fan TipJS!",
  });
});

// handling error

module.exports = app;
