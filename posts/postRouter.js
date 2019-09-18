const express = require('express');
const db = require("./postDb");

const router = express.Router();

//get the posts
router.get('/', (req, res) => {
    db.get()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(500).json({error: "Server Error while getting posts"}))
});

//get posts by id
router.get('/:id', validatePostId, (req, res) => {
});

//delete posts by id
router.delete('/:id', validatePostId, (req, res) => {
    const { id } = req.params;

    db.remove(id)
    .then(msg => res.status(200).json({message: "Deleted!"}))
    .catch(error => res.status(500).json({error: "Server error when deleting"}))
});

//update by id
router.put('/:id', validatePostId, (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    console.log(id, text);
    db.update(id, {text})
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json({error: "Server error while updating the post"}))
});

// custom middleware

function validatePostId(req, res, next) {
    const { id } = req.params;

    db.getById(id)
    .then( posts => null)
    .catch(error => res.status(404).json({error: "Id not found"}))

    next();
};

module.exports = router;