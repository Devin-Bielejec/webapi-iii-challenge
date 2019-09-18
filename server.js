require("dotenv").config();

const express = require('express');
const server = express();
server.use(express.json());

const userRoutes = require("./users/userRouter");
const postRoutes = require("./posts/postRouter");

const logger = (req, res, next) => {
  console.log(
      `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get("Origin")}`
  )   

  next();
}

server.use(logger);

server.use("/users", userRoutes);
server.use("/posts", postRoutes);
//custom middleware

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

const port = process.env.PORT;

server.listen(port, () => console.log(`Running on port ${port}`))