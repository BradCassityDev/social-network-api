const { User } = require('../models/index');

const userController = {
    // GET /api/users - Get all users
    getAllUsers(req, res) {
        User.find({})
            .then(userData => res.json(userData))
            .catch(err => res.status(400).json(err));
    },

    // GET /api/users/:userId - Get single user
    getSingleUser({ params }, res) {
        User.findOne({ _id: params.id })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user found with that id!' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.status(400).json(err))
    },

    // POST - Create user
    createUser({ body }, res) {
        User.create(body)
            .then(userData => res.json(userData))
            .catch(err => res.status(400).json(err));
    },

    // PUT - Update user
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(userData => {
                if(!userData) {
                    res.status(404).json({ message: 'No user found by this id!' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.status(400).json(err));
    },

    // DELETE - Delete user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(userData => {
                if(!userData) {
                    res.status(404).json({ message: 'No user found with that id!' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.status(400).json(err));
    }
};

module.exports = userController;