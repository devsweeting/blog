const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
// make sure it's always sent as json
app.use(bodyParser.json());
app.use(cors());

// temp storage for all created posts
const posts = {};

// return all of the created posts
app.get("/posts", (req, res) => {
  res.send(posts);
});

// creates a new post
app.post("/posts", async (req, res) => {
  // sets a random id for the blog post
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };

  // sends the event to the event bus
  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: { id, title },
  });

  console.log(title, id);

  // te;ll the user we successfully created the post and lets return it.
  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Received event", req.body.type);

  res.send({});
});

app.listen(4000, () => {
  console.log("Listening on 4000");
});
