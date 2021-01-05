const { sequelize } = require("./models");

(async function initializeConnection() {
  await sequelize.sync({ force: true });
})();
