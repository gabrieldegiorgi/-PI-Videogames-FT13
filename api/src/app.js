const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const server = express();
const cors = require("cors");

require("./db.js");
server.name = "API";

server.use(cors());

server.use(express.urlencoded({ extended: true, limit: "50mb" }));
server.use(express.json({ limit: "50mb" }));
server.use(cookieParser());

server.use(morgan("dev")); //MOrgan me da mas info sobre las solicitudes HTTP: GET, POST, PUT, DELETE

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
/* 
server.use(
	cors({ 
		origin: "http://localhost:3000/",
		credentials: true,
		methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
		allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'], 
  })
);
server.use(function(req,res,next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
 */
server.use("/", routes);
// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
