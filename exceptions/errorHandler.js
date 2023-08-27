const fs = require("fs");

module.exports = (err) => {
  const logMessage = `${new Date().toISOString()}: ${err.stack}\n`;

  fs.appendFile("./exceptions/errors.log", logMessage, (err) => {
    if (err) {
      console.error("Erro ao escrever no arquivo de log:", err);
    }
  });
  return;
};
