const { User, Thought } = require('../models/index');

const thoughtController = {
    // GET - Get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .then(thoughtData => res.json(thoughtData))
            .catch(err => res.status(400).json(err));
    },

    // GET - Get single thought
    getSingleThought({ params }, res) {
        Thought.find({ _id: params.thoughtId })
            .then(thoughtData => res.json(thoughtData))
            .catch(err => res.status(400).json(err));
    },

    // POST - Create thought
    createThought({ body }, res) {
        console.log('here');
        Thought.create({
            thoughtText: body.thoughtText,
            username: body.username
        })
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(userData => {
                if(!userData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => {
                console.log('error');
                res.status(400).json(err);
            });
    },

    // POST - Create Reaction
    createReaction({ params, body }, res) {
        console.log('create reaction');
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(userData => {
                if(!userData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.json(err));
    },

    // PUT - Update thought
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true })
            .then(thoughtData => {
                if(!thoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    // DELETE - Delete thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(thoughtData => {
                if (!thoughtData) {
                    return res.status(404).json({ message: 'No thought with this id!' });
                }
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thoughts: params.thoughtId } },
                    { new: true }
                );
            })    
            .then(userData => {
                if(!userData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.json(err));
    }, 

    // DELETE - Delete a reaction
    deleteReaction({ params }, res) {
        console.log(params);
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { _id: params.reactionId } } },
            { new: true }
        )
            .then(thoughtData => {
                if(!thoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.status(400).json(err));
    }
};

module.exports = thoughtController;