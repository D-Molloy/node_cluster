const cluster = require("cluster");

//the first instance of the cluster will be the `Cluster Manager` and cluster.isMaster === true
// once we start forking off Worker Instances, isMaster will be set to false
// console.log(cluster.isMaster);

// Is the file being executed in master mode?
if (cluster.isMaster) {
  //cause index.js to be executed again, but in child/slave mode
  cluster.fork();
} else {
  //I'm a child, I'm going to act like a server and do nothing else
  const express = require("express");
  const app = express();

  //doWork simulates doing a lot of work for a specific duration (ms)
  const doWork = duration => {
    const start = Date.now();
    while (Date.now() - start < duration) {}
  };

  app.get("/", (req, res) => {
    doWork(5000);
    res.send("hi there");
  });

  app.listen(3000);
}
