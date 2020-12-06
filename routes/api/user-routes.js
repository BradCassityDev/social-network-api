const router = require('express').Router();
const { getAllUsers, getSingleUser, createUser, updateUser, deleteUser } = require('../../controllers/user-conrtollers');

// /api/users
router.route('/')
    .get(getAllUsers)
    .post(createUser);

// /api/users/:id
router.route('/:id')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;