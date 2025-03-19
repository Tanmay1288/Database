const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chats.js"); // Ensure this path is correct

app.set("view", path.join(__dirname, "views"));
app.set("view engine", "ejs");

main()
  .then(() => {
    console.log("connection successful");
    app.listen(8080, () => {
      console.log("Server listening on port 8080");
    });

    let Chat1 = new Chat({
      from: "neha",
      to: "priya",
      msg: "send me your notes",
      created_at: new Date() // Corrected here
    });

    Chat1.save().then((res) => {
      console.log(res);
    });
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

app.get("/chats", async (req, res) => {
  let chats = await Chat.find();  // Corrected: use `Chat` instead of `chats`
  res.render("index.ejs", { chats });  // Render the view with chats
});

app.get("/", (req, res) => {
  res.send("Root is working");
});
