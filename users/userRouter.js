const express = require('express');

const db = require("./userDb");
const postdb = require("../posts/postDb");

const router = express.Router();

router.post('/', validateUser, (req, res) => {
    db.insert(req.body)
    .then(user => res.status(200).json(user))
    .catch(err => {
        res.status(500).json({error: "Server Error inserting user"})
    })
});

//insert user by id??? so confused by this one
router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
    db.insert(req.body)
    .then(user => res.status(200).json(user))
    .catch(err => {
        res.status(500).json({error: "Server Error inserting user"})
    })
});

//get users
router.get('/', (req, res) => {
    db.get()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(500).json({error: "Error retrieving users"}))
});

//get user by id
router.get('/:id', validateUserId, (req, res) => {
    const { id } = req.params;
    db.getById(id)
    .then(user => res.status(200).json(user))
    .catch(error => res.status(500).json({error: "Error retrieving user"}))
});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
    const { id } = req.params;
    db.getById(id)
    .then( (users) => {
        console.log(users);
        users === undefined ? res.status(400).json({message: "user id not found"}) : req.user = { id };
    })
    .catch(err => res.status(500).json({message: "Server error retrieving id"}))
    next();
};

function validateUser(req, res, next) {
    console.log("here");
    console.log(req.body);
    req.body ? null : res.status(400).json({message: "missing user data"})
    req.body.name ? null : res.status(400).json({message: "missing required name field"});
    next();
};

function validatePost(req, res, next) {
    req.body ? req.body.name ? null 
    : res.status(400).json({message: "missing required name field"}) 
    : res.status(400).json({message: "missing user data"})
};

module.exports = router;
