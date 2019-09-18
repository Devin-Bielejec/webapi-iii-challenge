const express = require('express');
const db = require("./postDb");

const router = express.Router();

//get the posts
router.get('/', (req, res) => {
    db.get()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(500).json({error: "Server Error while getting posts"}))
});

router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;