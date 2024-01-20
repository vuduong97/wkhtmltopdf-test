"use strict";

const mongoose = require("mongoose");

const connectString = `mongodb+srv://ddtvu:GncxzMKuLAtzoyeB@tipjs.clav8qf.mongodb.net/shopDEV`;

mongoose
  .connect(connectString)
  .then((_) => console.log("Connected Mongodb Success"))
  .catch((err) => console.log(`Error Connect!`));

// dev
if (1 === 0) {
  mongoose.set("debug", true);
  mongoose.set("debug", { color: true });
}

module.exports = mongoose;
