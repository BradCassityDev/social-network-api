const { User, Thought } = require('../models/index');

const thoughtController = {
    // GET - Get all thoughts
    getAllThoughts(req, res) {

    },

    // GET - Get single thought
    getSingleThought({ params }, res) {

    },

    // POST - Create thought
    createThought(req, res) {

    },

    // POST - Create Reaction
    createReaction({ params, body }, res) {

    },

    // PUT - Update thought
    updateThought({ params, body }, res) {

    },

    // DELETE - Delete thought
    deleteThought({ params }, res) {

    }, 

    // DELETE - Delete a reaction
    deleteReaction({ params, body }) {

    }
};

module.exports = thoughtController;