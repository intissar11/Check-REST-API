const express = require("express");
const connectDB = require("./config/connectDB");

require("dotenv").config({ path: "./config/.env" });

const Schema = require("./models/User");
const app = express();
app.use(express.json());
connectDB();

app.post("/users/post", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = new Schema({ name, email, password });
    await newUser.save();
    res.send(newUser);
  } catch (error) {
    console.error(error);
  }
});
app.get("/users/get", async (req, res) => {
  try {
    const users = await Schema.find();
    res.send(users);
  } catch (error) {
    console.error(error);
  }
});
app.get("/users/get/:id", async (req, res) => {
  try {
    const users = await Schema.findById(req.params.id);
    res.send(users);
  } catch (error) {
    console.error(error);
  }
});
app.put("/users/put/:id", async (req, res) => {
  try {
    const editedUser = await Schema.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    res.send(editedUser);
  } catch (error) {
    console.error(error);
  }
});
app.delete("/users/delete/:id", async (req, res) => {
  try {
    const badSchema = await Schema.findByIdAndDelete(req.params.id);
    res.send(`${badSchema.name} is Gone !`);
  } catch (error) {
    console.error(error);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) =>
  err ? console.error(err) : console.log(`server is running on port ${PORT}`)
);
