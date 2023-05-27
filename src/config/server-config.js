const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  DBNAME: process.env.DBNAME,
  DBUSER: process.env.DBUSERNAME,
  DBPASS: process.env.DBPASS,
  JWT_EXPIRY: process.env.JWT_EXPIRY,
  JWT_SECRET: process.env.JWT_SECRET,
};
