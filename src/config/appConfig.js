require("dotenv").config();
const urlDomain = `localhost`;
const protocol = `http`;
const portApp = process.env.APPPORT || 3000;
const urlApplication = `${protocol}://${urlDomain}:${portApp}`;

module.exports = {
  portApp,
  urlDomain,
  protocol,
  urlApplication,
};
