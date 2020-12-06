const router = require('express').Router();
const {
    getAllThoughts,
    getSingleThought,
    createThought,
    createReaction,
    updateThought,
    deleteThought,
    deleteReaction
} = require('../../controllers/thought-controllers');

router.route('/')
    .get()
    .post();

module.exports = router;