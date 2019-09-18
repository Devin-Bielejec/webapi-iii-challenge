// code away!
const express = require("express");

const server = expres();

const logger = (req, res, next) => {
    console.log(
        `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get("Origin")}`
    )   
}

server.use(logger);


