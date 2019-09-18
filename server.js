const express = 'express';

const server = express();

server.use(logger);

//custom middleware

const logger = (req, res, next) => {
  console.log(
      `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get("Origin")}`
  )   

  next();
}


const validateUserId = (req, res, next) => {
  const { id } = req.params;
  id ? req.user = { id } : res.status(400).json({message: "invalid user id"})
  next();
}

const validateUser = (req, res, next) => {
  req.body ? null : res.status(400).json({message: "missing user data"})

  req.body.name ? null : res.status(400).json({message: "missing required name field"});

  next();
}

const validatePost = (req, res, next) => {
  req.body ? req.body.name ? null 
  : res.status(400).json({message: "missing required name field"}) 
  : res.status(400).json({message: "missing user data"})
}



server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});






module.exports = server;
