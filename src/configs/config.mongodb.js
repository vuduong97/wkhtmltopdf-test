"use strict";

// level 0
const dev = {
  app: {
    port: process.env.DEV_APP_PORT || 3052,
  },
  db: {
    host: process.env.DEV_DB_HOST || "localhost",
    username: process.env.DEV_DB_USERNAME || "root",
    password: process.env.DEV_DB_PASSWORD || "root",
    db_name: process.env.DEV_DB_NAME || "shopDEV",
  },
};

const pro = {
  app: {
    port: process.env.PRO_APP_PORT || 3055,
  },
  db: {
    host: process.env.PRO_DB_HOST || "localhost",
    username: process.env.PRO_DB_USERNAME || "root",
    password: process.env.PRO_DB_PASSWORD || "root",
    db_name: process.env.PRO_DB_NAME || "shopPRO",
  },
};

const config = { dev, pro };
const env = process.env.NODE_ENV || "dev";

module.exports = config[env];
