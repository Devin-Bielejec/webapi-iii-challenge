const express = require('express');
const server = express();
server.use(express.json());

const userRoutes = require("./users/userRouter");

server.use("/users", userRoutes);
//custom middleware

const logger = (req, res, next) => {
  console.log(
      `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get("Origin")}`
  )   

  next();
}

server.use(logger);


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

server.listen(5000, () => console.log("API API API API API "))