const app = require("./src/App.js");
const port = require("./src/config/appConfig.js").portApp;

app.listen(port, () => {
  console.log(`Server is running in port ${port} `);
});
