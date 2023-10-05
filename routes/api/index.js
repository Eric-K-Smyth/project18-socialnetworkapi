const router = require('express').Router();
const reactionRoutes = require('./reaction-routes');
const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./user-routes');
// An index for all of the routes to pass though
router.use('/reactions', reactionRoutes);
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;