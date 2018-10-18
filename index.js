const crypto = require("crypto");
const express = require("express");
const PORT = 3000;

//  START USING PM2
// >pm2 start index.js -i 0
// -i 0 - let PM2 figure out how many instances to start (the # of instances should be equal to the # of logical cores)

// > pm2 list - status check
// > pm2 show index.js - detailed info about a set of children
// > pm2 monit - inspect logs from a particular process

// STOP RUNNING CHILDREN > pm2 delete index (filename)

const app = express();

app.get("/", (req, res) => {
  crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
    res.send("hi there");
  });
});

app.get("/fast", (req, res) => {
  res.send("This was fast!");
});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
