const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const events = [];

// The evenmt bus takes a single request and forwards it to all of the services.
app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  // Posts Service
  axios.post("http://localhost:4000/events", event).catch((err) => {
    console.log(err.message);
  });
  // Comments Service
  axios.post("http://localhost:4001/events", event).catch((err) => {
    console.log(err.message);
  });
  // Query seervice
  axios.post("http://localhost:4002/events", event).catch((err) => {
    console.log(err.message);
  });
  //Moderation Service
  axios.post("http://localhost:4003/events", event).catch((err) => {
    console.log(err.message);
  });
  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
