const express = require("express");
const { sequelize, User } = require("./models");

const app = express();
app.use(express.json());

app.post("/users", async function createUser(req, res) {
  const { name, email, role } = req.body;
  try {
    const user = await User.create({ name, email, role });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong, Internal Server Error.",
    });
  }
});

app.listen({ port: 5000 }, async function bootApp() {
  console.log("Server listening on http://localhost:5000");
  console.log("Database sync started");
  await sequelize.sync({ force: true });
  console.log("Database sync completed");
});
