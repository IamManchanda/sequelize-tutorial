const express = require("express");
const { sequelize, User, Post } = require("./models");

const app = express();
app.use(express.json());

app.post("/users", async function createUser(req, res) {
  const { name, email, role } = req.body;
  try {
    let user;
    try {
      user = await User.create({ name, email, role });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong.",
    });
  }
});

app.get("/users", async function readUsers(_req, res) {
  try {
    const users = await User.findAll();
    return res.json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong.",
    });
  }
});

app.get("/users/:uuid", async function findUser(req, res) {
  const { uuid } = req.params;

  try {
    const user = await User.findOne({
      where: { uuid },
      include: ["posts"],
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong.",
    });
  }
});

app.delete("/users/:uuid", async function deleteUser(req, res) {
  const { uuid } = req.params;

  try {
    const user = await User.findOne({
      where: { uuid },
    });
    await user.destroy();
    return res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong.",
    });
  }
});

app.put("/users/:uuid", async function updateUser(req, res) {
  const { uuid } = req.params;
  const { name, email, role } = req.body;

  try {
    const user = await User.findOne({
      where: { uuid },
    });
    user.name = name;
    user.email = email;
    user.role = role;
    await user.save();
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong.",
    });
  }
});

app.post("/posts", async function createPost(req, res) {
  const { userUuid, body } = req.body;

  try {
    const user = await User.findOne({
      where: {
        uuid: userUuid,
      },
    });
    const post = await Post.create({
      body,
      userId: user.id,
    });
    return res.json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong.",
    });
  }
});

app.get("/posts", async function readPosts(_req, res) {
  try {
    const posts = await Post.findAll({
      include: ["user"],
    });
    return res.json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong.",
    });
  }
});

app.listen({ port: 5000 }, async function bootApp() {
  console.log("Server listening on http://localhost:5000");
  await sequelize.authenticate();
  console.log("Database connection successful");
});
