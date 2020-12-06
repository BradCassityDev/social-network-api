const router = require('express').Router();

// Import user and thought api routes
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// Use user and thought routes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;