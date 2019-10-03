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

//insert post by user id
router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
    console.log(req.body);
    const { text } = req.body;
    const { id } = req.params;
    const post = { user_id: id, text }
    console.log(post);
    postdb.insert(post)
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json({message: "Server Error"}))
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

//get posts of user id
router.get('/:id/posts', validateUserId, (req, res) => {
    db.getUserPosts(req.params)
    .then( posts => res.status(200).json(posts))
    .catch(err => res.status(500).json({error: "There was a problem retrieving the user posts from the server"}))
});

router.delete('/:id', validateUserId, (req, res) => {
    const { id } = req.params;

    db.remove(id)
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({message: "Server Error while deleting"}))
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    db.update(id, {name})
    .then(users => {
        res.status(200).json(users);
    })
        .catch(err => res.status(500).json({message: "Server error while updating"}))
});

function validateUserId(req, res, next) {
    const { id } = req.params;
    db.getById(id)
    .then( (users) => {
        users === undefined ? res.status(400).json({message: "user id not found"}) : req.user = { id };
    })
    .catch(err => res.status(500).json({message: "Server error retrieving id"}))
    next();
};

function validateUser(req, res, next) {
    req.body ? null : res.status(400).json({message: "missing user data"})
    req.body.name ? null : res.status(400).json({message: "missing required name field"});
    next();
};

function validatePost(req, res, next) {
    req.body ? req.body.text ? null 
    : res.status(400).json({message: "missing required text field"}) 
    : res.status(400).json({message: "missing user data"})

    next();
};

module.exports = router;
